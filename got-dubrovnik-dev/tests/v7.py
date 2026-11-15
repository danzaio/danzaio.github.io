# v7: link por locação, avisar erro, voz, baixar para a viagem, cartão de conquista
import asyncio, json, re
from playwright.async_api import async_playwright
URL="http://localhost:8765/"
ARGS=["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"]
HITS={"tile":0,"glyph":0,"sprite":0,"style":0}
async def mock(route):
    url=route.request.url;H={"Access-Control-Allow-Origin":"*"}
    if url.endswith('/styles/liberty'):
        HITS["style"]+=1
        style={"version":8,"glyphs":"https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf","sprite":"https://tiles.openfreemap.org/sprites/ofm_f384/ofm",
               "sources":{"openmaptiles":{"type":"vector","url":"https://tiles.openfreemap.org/planet"}},
               "layers":[{"id":"bg","type":"background","paint":{"background-color":"#a9cfe0"}},
                         {"id":"lbl","type":"symbol","source":"openmaptiles","source-layer":"place","layout":{"text-field":"{name}","text-font":["Noto Sans Regular"]}}]}
        await route.fulfill(status=200,content_type="application/json",body=json.dumps(style),headers=H)
    elif url.endswith('/planet'):
        await route.fulfill(status=200,content_type="application/json",headers=H,body=json.dumps({"tilejson":"3.0.0","tiles":["https://tiles.openfreemap.org/planet/test/{z}/{x}/{y}.pbf"],"maxzoom":14,"vector_layers":[{"id":"place","fields":{}}]}))
    elif '/fonts/' in url: HITS["glyph"]+=1; await route.fulfill(status=200,body=b"",content_type="application/x-protobuf",headers=H)
    elif '/sprites/' in url: HITS["sprite"]+=1; await route.fulfill(status=200,body=b"{}" if url.endswith('json') else b"",content_type="application/json" if url.endswith('json') else "image/png",headers=H)
    else: HITS["tile"]+=1; await route.fulfill(status=200,body=b"",content_type="application/x-protobuf",headers=H)
async def router(route):
    m=re.search(r"/foot/([^?]+)",route.request.url);pts=[list(map(float,q.split(","))) for q in m.group(1).split(";")];a,b=pts[0],pts[-1];mid=[b[0],a[1]]
    js={"code":"Ok","routes":[{"distance":abs(a[0]-b[0])*82020+abs(a[1]-b[1])*111087,"geometry":{"coordinates":[a,mid,b]},"legs":[{"steps":[
      {"name":"Stradun","maneuver":{"type":"depart","location":a}},{"name":"Od Puča","maneuver":{"type":"turn","modifier":"right","location":mid}},{"name":"","maneuver":{"type":"arrive","location":b}}]}]}]}
    await route.fulfill(status=200,content_type="application/json",headers={"Access-Control-Allow-Origin":"*"},body=json.dumps(js))
SPEECH="""window.SP=[];window.SHARED=[];
try{Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){SP.push('#cancel')},speak(u){SP.push(u.text);setTimeout(()=>u.onend&&u.onend(),4000)},getVoices(){return []}}})}catch(e){}
window.SpeechSynthesisUtterance=function(t){this.text=t};
try{Object.defineProperty(navigator,'share',{configurable:true,value:o=>{SHARED.push(o);return Promise.resolve()}})}catch(e){}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block")
        await ctx.add_init_script(SPEECH)
        await ctx.route("https://tiles.openfreemap.org/**", mock); await ctx.route("https://routing.openstreetmap.de/**", router)
        errs=[]
        # 1) link direto para uma locação: abre a ficha, não começa o tutorial
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        await pg.goto(URL+"?lang=en&loc=jesuit"); await pg.wait_for_timeout(2500)
        print("deeplink:",await pg.evaluate("[S.sel,$('#sheet').classList.contains('open'),!!document.querySelector('.tour.on,#tour.on'),$('#sheet h2').textContent]"))
        await pg.screenshot(path="W_deeplink.png")
        # 2) ouvir a cena / parar
        await pg.click("#listenB"); await pg.wait_for_timeout(300)
        print("listen:",await pg.evaluate("[VOICE.listen,$('#listenB').textContent,SP.length,SP.slice(0,3).map(s=>s.slice(0,60))]"))
        await pg.click("#listenB"); await pg.wait_for_timeout(200); print("stop:",await pg.evaluate("[VOICE.listen,$('#listenB').textContent,SP[SP.length-1]]"))
        # 3) compartilhar o lugar e avisar erro
        await pg.evaluate("shareLoc('jesuit')"); print("share:",await pg.evaluate("SHARED[0]"))
        print("report:",await pg.evaluate("[...document.querySelectorAll('#sheet a')].map(a=>a.href).filter(h=>h.includes('issues'))[0]"))
        await pg.evaluate("$('#sheet .sbody,#sheetBody,#sheet').scrollTop=9999"); await pg.screenshot(path="W_sheet_bottom.png")
        await pg.goto(URL+"?lang=pt&loc=naoexiste"); await pg.wait_for_timeout(1500); print("bad loc:",await pg.evaluate("[S.sel,$('#sheet').classList.contains('open')]"))
        # 4) voz na navegação
        await pg.goto(URL+"?lang=pt"); await pg.wait_for_timeout(2000)
        await pg.evaluate("endTour();setSim(true,'pile')"); await pg.wait_for_timeout(2500)
        await pg.evaluate("startNav('jesuit')"); await pg.wait_for_timeout(1500)
        print("nav sem voz:",await pg.evaluate("[VOICE.on,SP.filter(s=>s!=='#cancel')]"),"btn:",await pg.inner_text("#navV"))
        await pg.click("#navV"); await pg.wait_for_timeout(1800)
        print("voz ligada:",await pg.evaluate("[VOICE.on,store.get('voice'),SP.filter(s=>s!=='#cancel')]"),"btn:",await pg.inner_text("#navV")); await pg.screenshot(path="W_nav_voice.png")
        await pg.evaluate("SP.length=0;setManualPos({lat:LBY.pile.lat,lon:LBY.jesuit.lon-0.00012},null,true)"); await pg.wait_for_timeout(500)
        print("na virada:",await pg.evaluate("SP.filter(s=>s!=='#cancel')"),"|",(await pg.inner_text("#navBar")).replace("\n"," | "))
        await pg.evaluate("setManualPos({lat:LBY.pile.lat,lon:LBY.jesuit.lon-0.00011},null,true)"); await pg.wait_for_timeout(300)
        print("sem repetir:",await pg.evaluate("SP.filter(s=>s!=='#cancel').length"))
        await pg.evaluate("SP.length=0;setManualPos({lat:LBY.jesuit.lat+0.00005,lon:LBY.jesuit.lon},null,true)"); await pg.wait_for_timeout(500)
        print("chegada:",await pg.evaluate("[!!NAV,SP.filter(s=>s!=='#cancel')]"))
        # 5) cartão de conquista (vazio, com lugares, com fotos e quiz)
        await pg.evaluate("go('locais')"); await pg.wait_for_timeout(300); await pg.screenshot(path="W_locais.png")
        await pg.evaluate("S.visited=new Set();openConquest()"); await pg.wait_for_timeout(1500); await pg.screenshot(path="W_cq_empty.png"); await pg.evaluate("closeModal()")
        await pg.evaluate("S.visited=new Set(L.slice(0,9).map(l=>l.id));store.set('quizBest',8);openConquest()"); await pg.wait_for_timeout(1500); await pg.screenshot(path="W_cq_names.png")
        print("cq:",await pg.evaluate("[!!$('#modalBox img'),!!$('#cqSave')]")); await pg.evaluate("closeModal()")
        await pg.evaluate("""(async()=>{for(let i=0;i<5;i++){const c=document.createElement('canvas');c.width=600;c.height=800;const x=c.getContext('2d');x.fillStyle=['#7a9','#a97','#79a','#aa7','#97a'][i];x.fillRect(0,0,600,800);x.fillStyle='#fff';x.font='80px sans-serif';x.fillText('foto '+(i+1),150,400);
          const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',.8));await DB.put({id:'t'+i,ph:PH[i].id,loc:PH[i].loc,ts:Date.now()-i*1000,blob})}})()""")
        await pg.evaluate("openConquest()"); await pg.wait_for_timeout(1800); await pg.screenshot(path="W_cq_photos.png"); await pg.evaluate("closeModal()")
        # 6) quiz guarda a melhor nota
        await pg.evaluate("store.set('quizBest',2);go('mais');quizState={i:QUIZ.length,ok:7};renderQuiz()"); print("quizBest:",await pg.evaluate("store.get('quizBest')"))
        # 7) cartão da viagem em todos os idiomas (sem service worker aqui: o download avisa a falha)
        for lg in ["pt","en","es","de","fr","it"]:
            await pg.evaluate(f"setLang('{lg}');go('mais')"); await pg.wait_for_timeout(250)
            txt=await pg.inner_text("#tripCard"); miss=await pg.evaluate("(document.body.innerText.match(/\\b(trip|cq|voice)[A-Z][A-Za-z]+\\b/g)||[])")
            print(lg,"trip:",txt.replace("\n"," | ")[:150],"| faltando:",miss)
            await pg.evaluate("$('#tripCard').scrollIntoView()"); await pg.screenshot(path=f"W_trip_{lg}.png")
            await pg.evaluate("openLoc('jesuit')"); await pg.wait_for_timeout(250); await pg.screenshot(path=f"W_sheet_{lg}.png"); await pg.evaluate("closeSheet()")
        await pg.close()
        # 8) baixar para a viagem, com service worker de verdade
        ctx2 = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        await ctx2.route("https://tiles.openfreemap.org/**", mock); await ctx2.route("https://routing.openstreetmap.de/**", router)
        pg = await ctx2.new_page(); pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        await pg.goto(URL+"?lang=pt"); await pg.wait_for_timeout(3000); await pg.evaluate("endTour();go('mais')"); await pg.wait_for_timeout(1500)
        print("sw controla:",await pg.evaluate("[!!navigator.serviceWorker.controller,RM.on]"))
        for k in HITS: HITS[k]=0
        await pg.evaluate("$('#tripCard').scrollIntoView()"); await pg.click("#tripDl"); await pg.wait_for_timeout(300); await pg.screenshot(path="W_trip_dl.png")
        for _ in range(60):
            await pg.wait_for_timeout(500)
            if await pg.evaluate("TRIPP==null"): break
        print("download:",await pg.evaluate("[!!store.get('offlineAt'),$('#tripCard').innerText.replace(/\\n/g,' | ').slice(0,140)]"),"pedidos:",HITS)
        print("caches:",await pg.evaluate("(async()=>{const o={};for(const k of await caches.keys())o[k]=(await (await caches.open(k)).keys()).length;return o})()"))
        await pg.screenshot(path="W_trip_done.png")
        # offline: recarrega sem rede e o app abre com o mapa em cache
        await ctx2.unroute("https://tiles.openfreemap.org/**"); await ctx2.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        await ctx2.set_offline(True); await pg.reload(); await pg.wait_for_timeout(3500)
        print("offline:",await pg.evaluate("[document.title.slice(0,20),RM.on,L.length]")); await pg.screenshot(path="W_offline.png")
        await ctx2.set_offline(False); await ctx2.close()
        # 9) iPhone: instalar primeiro, baixar depois; navegador de dentro de app avisa
        for name,ua in [("ios","Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"),("insta","Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0")]:
            c3=await b.new_context(viewport={"width":390,"height":844},device_scale_factor=2,is_mobile=True,has_touch=True,user_agent=ua,service_workers="block")
            await c3.route("https://tiles.openfreemap.org/**", mock); pg=await c3.new_page(); pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
            await pg.goto(URL+"?lang=en"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour();go('mais')"); await pg.wait_for_timeout(300)
            print(name,":",(await pg.inner_text("#tripCard")).replace("\n"," | ")[:260]); await pg.evaluate("$('#tripCard').scrollIntoView()"); await pg.screenshot(path=f"W_trip_{name}.png"); await c3.close()
        print("ERRS",errs)
        await b.close()
asyncio.run(main())
