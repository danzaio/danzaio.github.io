import asyncio, base64, json
from playwright.async_api import async_playwright
from PIL import Image
im=Image.open('/home/claude/tests/fake/scene.png').crop((0,560,1080,1280)).resize((720,480));im.save('/tmp/still.jpg',quality=80)
U='data:image/jpeg;base64,'+base64.b64encode(open('/tmp/still.jpg','rb').read()).decode()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream","--use-file-for-fake-video-capture=/home/claude/tests/fake/scene.y4m"])
        ctx=await b.new_context(viewport={"width":390,"height":844},device_scale_factor=2,is_mobile=True,has_touch=True,geolocation={"latitude":42.6409,"longitude":18.1053,"accuracy":6},permissions=["geolocation","camera"])
        pg=await ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt");await pg.wait_for_timeout(1200)
        await pg.evaluate("endTour();setMapMode('drawn');startGPS(true)");await pg.wait_for_timeout(1000)
        await pg.evaluate("openPhoto('p-redkeep')");await pg.wait_for_timeout(600);await pg.evaluate("$('#st-p-redkeep').scrollIntoView({block:'center'})");await pg.wait_for_timeout(300);await pg.screenshot(path="S_studio0.png")
        print("search:",await pg.evaluate("$('#st-p-redkeep a').href"))
        await pg.evaluate("store.set('still_p-redkeep',{u:%s,w:720,h:480});stillUI('p-redkeep')"%json.dumps(U));await pg.wait_for_timeout(300);await pg.screenshot(path="S_studio1.png")
        await pg.evaluate("closeSheet();S.heading=PH.find(p=>p.id==='p-redkeep').dir+3;S.headingSrc='live';S.tilt={b:89,g:.5};openCam('p-redkeep')");await pg.wait_for_timeout(2000);await pg.screenshot(path="S_cam1.png")
        await pg.click("#camGh");await pg.wait_for_timeout(1900);print("ghost:",await pg.evaluate("CAM.ghost"));await pg.screenshot(path="S_cam2.png")
        await pg.click("#camStill");await pg.wait_for_timeout(300);await pg.click("#camStill")
        await pg.click("#camShot");await pg.wait_for_timeout(1200);await pg.click("#camX");await pg.wait_for_timeout(300)
        fid=await pg.evaluate("DB.all().then(a=>a[0].id)");await pg.evaluate(f"viewFoto({json.dumps(fid)})");await pg.wait_for_timeout(500)
        await pg.click("#sbsB");await pg.wait_for_timeout(1500);await pg.screenshot(path="S_sbs.png")
        print("errs",errs);await b.close()
asyncio.run(main())
