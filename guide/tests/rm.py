import asyncio, json, sys
from playwright.async_api import async_playwright
URL="http://localhost:8765/"
ARGS=["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream","--use-file-for-fake-video-capture=/home/claude/tests/fake/scene.y4m"]
LAND=None
NOTILES=False
async def mock(route):
    url=route.request.url
    if url.endswith('/styles/liberty'):
        style={"version":8,"sources":{"openmaptiles":{"type":"vector","tiles":["https://tiles.openfreemap.org/planet/test/{z}/{x}/{y}.pbf"],"maxzoom":14,"attribution":"© OpenFreeMap © OpenMapTiles Data from OpenStreetMap"},
               "land":{"type":"geojson","data":LAND}},
               "layers":[{"id":"bg","type":"background","paint":{"background-color":"#a9cfe0"}},
                         {"id":"land","type":"fill","source":"land","paint":{"fill-color":"#f2efe6"}},
                         {"id":"land-l","type":"line","source":"land","paint":{"line-color":"#9db8c6","line-width":1.2}},
                         {"id":"omt-water","type":"fill","source":"openmaptiles","source-layer":"water","paint":{"fill-color":"#a9cfe0"}}]}
        await route.fulfill(status=200,content_type="application/json",body=json.dumps(style),headers={"Access-Control-Allow-Origin":"*"})
    elif NOTILES:
        await route.abort()
    else:
        await route.fulfill(status=200,body=b"",content_type="application/x-protobuf",headers={"Access-Control-Allow-Origin":"*"})
async def main(mode):
    global LAND
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True,
              geolocation={"latitude":42.64112,"longitude":18.10905,"accuracy":12}, permissions=["geolocation","camera"])
        # extrai o litoral do mapa desenhado p/ o estilo de teste
        pg0=await ctx.new_page(); await pg0.goto(URL+"?lang=en"); await pg0.wait_for_timeout(500)
        LAND=await pg0.evaluate("""(()=>{const c=COAST.map(([x,y])=>{const p=ll(x,y);return [p.lon,p.lat]});const ring=[[17.9,42.75],...c,[18.2,42.75],[17.9,42.75]];
           const lk=lokrum().map(([x,y])=>{const p=ll(x,y);return [p.lon,p.lat]});lk.push(lk[0]);
           return {type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[ring]}},{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[lk]}}]}})()""")
        await pg0.close()
        global NOTILES
        NOTILES=(mode=='notiles')
        if mode in ('mock','notiles'): await ctx.route("https://tiles.openfreemap.org/**", mock)
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        pg.on("console", lambda m: errs.append(m.type+": "+m.text[:160]) if m.type=="error" and "fonts.g" not in m.text and "404" not in m.text and "ERR_" not in m.text else None)
        await pg.add_init_script("window._ev=[];const _i=setInterval(()=>{if(window.RM&&RM.map){clearInterval(_i);RM.map.on('error',e=>window._ev.push([e.sourceId||null,!!e.tile,String(e.error&&e.error.message).slice(0,80)]))}},20)")
        await pg.goto(URL+"?lang=en"); await pg.wait_for_timeout(2500)
        print(mode,"webgl:",await pg.evaluate("webglOK()"),"rm-on:",await pg.evaluate("document.body.classList.contains('rm-on')"),"markers:",await pg.evaluate("document.querySelectorAll('.rmk').length"))
        # tour passo 2 (pinos)
        await pg.click("#tNext"); await pg.wait_for_timeout(400); await pg.click("#tNext"); await pg.wait_for_timeout(900)
        await pg.screenshot(path=f"R_{mode}_tour2.png")
        await pg.evaluate("endTour()")
        await pg.evaluate("startGPS(true)"); await pg.wait_for_timeout(1200)
        await pg.screenshot(path=f"R_{mode}_map.png")
        if mode!='mock':
            await pg.wait_for_timeout(3000); print("errs-ev:",await pg.evaluate("window._ev||[]"));print("later rm-on:",await pg.evaluate("[document.body.classList.contains('rm-on'),RM.tok,RM.terr]"))
            print("errs:",errs[:5]); await b.close(); return
        print("me:",await pg.evaluate("!!RM.me"),"acc feats:",await pg.evaluate("RM.map.getSource('rm-acc').serialize().data.features.length"))
        await pg.evaluate("RM.map.jumpTo({zoom:16.3,center:[18.1092,42.6410]})"); await pg.wait_for_timeout(600)
        print("labels shown:",await pg.evaluate("document.querySelector('#rmap').classList.contains('lbl')"))
        await pg.screenshot(path=f"R_{mode}_z16.png")
        # seguir / bússola
        await pg.evaluate("S.heading=120;S.headingSrc='live';drawMe()")
        await pg.click("#zMe"); await pg.wait_for_timeout(700); f1=await pg.evaluate("[S.follow,RM.head]")
        await pg.click("#zMe"); await pg.wait_for_timeout(700); f2=await pg.evaluate("[S.follow,RM.head,Math.round(RM.map.getBearing())]")
        await pg.evaluate("S.heading=150;drawMe()"); await pg.wait_for_timeout(300); b2=await pg.evaluate("Math.round(RM.map.getBearing())")
        await pg.screenshot(path=f"R_{mode}_head.png")
        await pg.click("#zMe"); await pg.wait_for_timeout(700); f3=await pg.evaluate("[S.follow,RM.head]")
        print("zMe cycle:",f1,f2,"bearing after turn:",b2,f3)
        await pg.click("#z3D"); await pg.wait_for_timeout(900); print("pitch:",await pg.evaluate("Math.round(RM.map.getPitch())"),"north visible:",await pg.evaluate("getComputedStyle($('#zNorth')).display"))
        await pg.screenshot(path=f"R_{mode}_3d.png")
        await pg.click("#zNorth"); await pg.wait_for_timeout(700); print("after north:",await pg.evaluate("[Math.round(RM.map.getBearing()),Math.round(RM.map.getPitch()),getComputedStyle($('#zNorth')).display]"))
        # pino -> ficha
        await pg.evaluate("fitOld(true)"); await pg.wait_for_timeout(300)
        await pg.evaluate("RM.mk.jesuit.getElement().click()"); await pg.wait_for_timeout(800)
        print("sheet:",(await pg.inner_text("#sheet h2"))[:40]); await pg.screenshot(path=f"R_{mode}_sheet.png")
        await pg.evaluate("closeSheet()")
        # fotos
        await pg.click("#zLayer"); await pg.wait_for_timeout(500); print("photo markers:",await pg.evaluate("document.querySelectorAll('.rph').length"),"fans:",await pg.evaluate("RM.map.getSource('rm-fan').serialize().data.features.length"))
        await pg.screenshot(path=f"R_{mode}_photos.png")
        await pg.click("#zLayer"); await pg.wait_for_timeout(200)
        # rota
        await pg.evaluate("showRoute('vergonha')"); await pg.wait_for_timeout(900); print("route pts:",await pg.evaluate("RM.map.getSource('rm-route').serialize().data.features[0].geometry.coordinates.length"))
        await pg.screenshot(path=f"R_{mode}_route.png")
        await pg.evaluate("S.route=null;drawRoute()")
        # modo teste: toque no mapa anda
        await pg.evaluate("setSim(true)"); await pg.wait_for_timeout(300)
        await pg.evaluate("RM.map.jumpTo({center:[18.1100,42.6405],zoom:16})"); await pg.wait_for_timeout(400)
        box=await pg.evaluate("(()=>{const r=$('#rmap').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]})()")
        await pg.mouse.click(box[0]-40,box[1]+20); await pg.wait_for_timeout(900)
        print("sim tap pos:",await pg.evaluate("[S.posSrc,S.pos.lat.toFixed(5),S.pos.lon.toFixed(5)]"))
        # planejador com mini mapa
        await pg.evaluate("openPhoto('p-redkeep')"); await pg.wait_for_timeout(1500)
        await pg.evaluate("$('#plSvg').scrollIntoView({block:'center'})"); await pg.wait_for_timeout(500)
        print("planner map:",await pg.evaluate("[!!PLM,$('#plMap').classList.contains('on'),$('#plSvg').innerHTML.includes('#world')]"))
        await pg.screenshot(path=f"R_{mode}_planner.png")
        await pg.evaluate("closeSheet()"); print("PLM after close:",await pg.evaluate("PLM"))
        # idioma
        await pg.evaluate("setLang('de')"); await pg.wait_for_timeout(600)
        # modo ilustrado e volta
        await pg.evaluate("setMapMode('drawn')"); await pg.wait_for_timeout(500); d1=await pg.evaluate("[document.body.classList.contains('rm-on'),!!RM.map]")
        await pg.evaluate("setMapMode('real')"); await pg.wait_for_timeout(2500); d2=await pg.evaluate("[document.body.classList.contains('rm-on'),document.querySelectorAll('.rmk').length]")
        print("drawn:",d1,"real again:",d2)
        print("errs:",errs[:8])
        await b.close()
asyncio.run(main(sys.argv[1] if len(sys.argv)>1 else 'mock'))
