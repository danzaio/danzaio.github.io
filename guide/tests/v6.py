import re
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

async def router(route):
    m=re.search(r"/foot/([^?]+)",route.request.url);pts=[list(map(float,q.split(","))) for q in m.group(1).split(";")]
    coords=[];legs=[]
    for a,b in zip(pts,pts[1:]):
        mid=[a[0],b[1]]; coords+= [a,mid,b]
        d=(abs(a[0]-b[0])*82020+abs(a[1]-b[1])*111087); legs.append({"distance":d})
    await route.fulfill(status=200,content_type="application/json",headers={"Access-Control-Allow-Origin":"*"},body=json.dumps({"code":"Ok","routes":[{"legs":legs,"geometry":{"coordinates":coords}}]}))
async def main():
    global LAND
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True,
              geolocation={"latitude":42.64090,"longitude":18.10530,"accuracy":6}, permissions=["geolocation","camera"])
        pg0=await ctx.new_page(); await pg0.goto(URL+"?lang=en"); await pg0.wait_for_timeout(500)
        LAND=await pg0.evaluate("""(()=>{const c=COAST.map(([x,y])=>{const p=ll(x,y);return [p.lon,p.lat]});const ring=[[17.9,42.75],...c,[18.2,42.75],[17.9,42.75]];return {type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[ring]}}]}})()""")
        await pg0.close()
        await ctx.route("https://tiles.openfreemap.org/**", mock); await ctx.route("https://routing.openstreetmap.de/**", router)
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        await pg.goto(URL+"?lang=en"); await pg.wait_for_timeout(2500)
        await pg.click("#tNext"); await pg.wait_for_timeout(300); await pg.click("#tNext"); await pg.wait_for_timeout(900); await pg.screenshot(path="V_tour.png")
        await pg.evaluate("endTour();startGPS(true)"); await pg.wait_for_timeout(4500)
        print("clusters:",await pg.evaluate("[RM.cl.length,[...document.querySelectorAll('.rmk')].filter(e=>e.style.display!=='none').length,RM.map.getZoom().toFixed(1)]"))
        await pg.evaluate("fitOld(true)"); await pg.wait_for_timeout(500); await pg.screenshot(path="V_cluster.png")
        await pg.evaluate("document.querySelector('.rcl').click()"); await pg.wait_for_timeout(1200)
        print("after cluster tap:",await pg.evaluate("[RM.cl.length,RM.map.getZoom().toFixed(1)]"))
        print("routes:",await pg.evaluate("Object.keys(RT).map(k=>k+':'+RT[k].line.length+':'+JSON.stringify(RT[k].legs.slice(0,3)))"))
        await pg.evaluate("showRoute('qarth')"); await pg.wait_for_timeout(1200); await pg.screenshot(path="V_route.png")
        await pg.evaluate("S.route=null;drawRoute();go('mais')"); await pg.wait_for_timeout(500)
        print("legs txt:",(await pg.evaluate("[...document.querySelectorAll('.leg')].slice(0,2).map(e=>e.innerText).join(' | ')")))
        await pg.evaluate("go('fotos')"); await pg.wait_for_timeout(600); await pg.evaluate("document.querySelector('#pc-p-torneio').scrollIntoView()"); await pg.wait_for_timeout(300); await pg.screenshot(path="V_fotos.png")
        await pg.evaluate("S.heading=PH.find(p=>p.id==='p-redkeep').dir+3;S.headingSrc='live';S.tilt={b:89,g:.5};openCam('p-redkeep')"); await pg.wait_for_timeout(2000); await pg.screenshot(path="V_cam.png")
        await pg.click("#camShot"); await pg.wait_for_timeout(1200); await pg.click("#camX"); await pg.wait_for_timeout(400)
        fid=await pg.evaluate("DB.all().then(a=>a[0].id)")
        await pg.evaluate(f"viewFoto({json.dumps(fid)})"); await pg.wait_for_timeout(700); await pg.screenshot(path="V_view.png")
        await pg.click("#refB"); await pg.wait_for_timeout(900); print("ref:",await pg.evaluate("(()=>{const r=refGet('p-redkeep');return r&&[r.w,r.h,r.u.length>20000]})()"))
        await pg.evaluate("closeModal();openCam('p-redkeep')"); await pg.wait_for_timeout(1800); print("ghost mode:",await pg.evaluate("[CAM.ghost,document.querySelector('#camGhost').tagName]")); await pg.screenshot(path="V_cam2.png")
        await pg.click("#camGh"); g1=await pg.evaluate("CAM.ghost"); await pg.click("#camGh"); g2=await pg.evaluate("CAM.ghost"); await pg.click("#camGh"); print("cycle:",g1,g2,await pg.evaluate("CAM.ghost"))
        await pg.click("#camX")
        print("errs:",errs[:6]); await b.close()
asyncio.run(main())
