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

import re
CALLS=[0]
async def router(route):
    CALLS[0]+=1
    m=re.search(r"/foot/([^?]+)",route.request.url);pts=[list(map(float,q.split(","))) for q in m.group(1).split(";")];a,b=pts[0],pts[-1]
    mid=[b[0],a[1]]
    d1=abs(a[0]-b[0])*82020;d2=abs(a[1]-b[1])*111087
    js={"code":"Ok","routes":[{"distance":d1+d2,"geometry":{"coordinates":[a,mid,b]},"legs":[{"steps":[
      {"name":"Stradun","maneuver":{"type":"depart","location":a}},
      {"name":"Od Puča","maneuver":{"type":"turn","modifier":"right","location":mid}},
      {"name":"","maneuver":{"type":"arrive","location":b}}]}]}]}
    await route.fulfill(status=200,content_type="application/json",headers={"Access-Control-Allow-Origin":"*"},body=json.dumps(js))
async def main():
    global LAND
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg0=await ctx.new_page(); await pg0.goto(URL+"?lang=pt"); await pg0.wait_for_timeout(500)
        LAND=await pg0.evaluate("""(()=>{const c=COAST.map(([x,y])=>{const p=ll(x,y);return [p.lon,p.lat]});const ring=[[17.9,42.75],...c,[18.2,42.75],[17.9,42.75]];return {type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[ring]}}]}})()""")
        await pg0.close()
        await ctx.route("https://tiles.openfreemap.org/**", mock); await ctx.route("https://routing.openstreetmap.de/**", router)
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        await pg.goto(URL+"?lang=pt"); await pg.wait_for_timeout(2500)
        await pg.evaluate("endTour();setSim(true,'pile')"); await pg.wait_for_timeout(5000)
        await pg.evaluate("S.heading=100;S.headingSrc='live';openLoc('jesuit')"); await pg.wait_for_timeout(500); await pg.screenshot(path="N_sheet.png")
        c0=CALLS[0]; await pg.evaluate("startNav('jesuit')"); await pg.wait_for_timeout(1500)
        print("nav:",await pg.evaluate("[NAV.real,NAV.steps.length,Math.round(NAV.tot),document.body.classList.contains('nav-on')]"),"bar:",(await pg.inner_text("#navBar")).replace("\n"," | "))
        await pg.screenshot(path="N_start.png")
        await pg.evaluate("S.heading=95;S.headingSrc='live';S.tilt={b:88,g:1}"); await pg.click("#navAR"); await pg.wait_for_timeout(2200)
        print("arnav:",await pg.evaluate("[CAM.on,CAM.ar,$('#arNav').className,$('#arNav').style.display,$('#arNav').innerText]")); await pg.screenshot(path="N_ar1.png")
        await pg.evaluate("S.heading=200"); await pg.wait_for_timeout(500); print("arnav side:",await pg.evaluate("[$('#arNav').className,$('#arNav').innerText]")); await pg.screenshot(path="N_ar2.png")
        await pg.click("#camX"); await pg.wait_for_timeout(400)
        # anda até perto da virada
        await pg.evaluate("setManualPos({lat:LBY.pile.lat,lon:LBY.pile.lon+0.0020},null,true)"); await pg.wait_for_timeout(500)
        print("bar2:",(await pg.inner_text("#navBar")).replace("\n"," | "),"snap:",await pg.evaluate("!!NAV.snap"),"rest pts:",await pg.evaluate("navRest().length"))
        await pg.screenshot(path="N_mid.png")
        # depois da virada
        await pg.evaluate("setManualPos({lat:LBY.pile.lat-0.0010,lon:LBY.jesuit.lon+0.00003},null,true)"); await pg.wait_for_timeout(400)
        print("bar3:",(await pg.inner_text("#navBar")).replace("\n"," | "))
        # fora da rota -> recalcula
        await pg.evaluate("NAV.last=0;setManualPos({lat:42.6412,lon:18.1118},null,true)"); await pg.evaluate("setManualPos({lat:42.6412,lon:18.1119},null,true)"); await pg.wait_for_timeout(900)
        print("router calls during nav:",CALLS[0]-c0,"bar4:",(await pg.inner_text("#navBar")).replace("\n"," | "))
        # chegada
        await pg.evaluate("setManualPos({lat:LBY.jesuit.lat+0.0001,lon:LBY.jesuit.lon},null,true)"); await pg.wait_for_timeout(1500)
        print("ended:",await pg.evaluate("[NAV===null,document.body.classList.contains('nav-on'),$('#sheet').classList.contains('open')]"))
        # longe
        await pg.evaluate("closeSheet();startNav('trsteno')"); await pg.wait_for_timeout(300); print("far:",await pg.evaluate("NAV"))
        # mapa ilustrado, sem rota real
        await ctx.unroute("https://routing.openstreetmap.de/**"); await ctx.route("https://routing.openstreetmap.de/**", lambda r: r.abort())
        await pg.evaluate("setMapMode('drawn');setSim(true,'pile');startNav('stradun')"); await pg.wait_for_timeout(900)
        print("fallback:",await pg.evaluate("[NAV&&NAV.real]"),(await pg.inner_text("#navBar")).replace("\n"," | ")); await pg.screenshot(path="N_fallback.png")
        await pg.click("#navX"); print("stopped:",await pg.evaluate("NAV"))
        print("errs:",errs[:6]); await b.close()
asyncio.run(main())
