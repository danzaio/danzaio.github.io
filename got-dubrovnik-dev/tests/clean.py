import asyncio, sys
from playwright.async_api import async_playwright
URL="http://localhost:8765/"
lang=sys.argv[1] if len(sys.argv)>1 else 'en'
HIDE="#toast{display:none!important}"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream","--use-file-for-fake-video-capture=/home/claude/tests/fake/scene.y4m"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, locale='en-US',
              geolocation={"latitude":42.6397,"longitude":18.1094,"accuracy":15}, permissions=["geolocation","camera"])
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(URL+"?lang="+lang); await pg.wait_for_timeout(1300)
        await pg.screenshot(path=f"C_{lang}_tour0.png")
        await pg.click("#tNext"); await pg.wait_for_timeout(500); await pg.screenshot(path=f"C_{lang}_tour1.png")
        await pg.evaluate("endTour()")
        await pg.add_style_tag(content=HIDE)
        # posição realista: perto da Escadaria Jesuíta, seguindo para Stradun
        await ctx.set_geolocation({"latitude":42.64112,"longitude":18.10905,"accuracy":8})
        await pg.evaluate("startGPS(true)"); await pg.wait_for_timeout(1200)
        await pg.evaluate("S.heading=300;S.headingSrc='live'")
        await pg.evaluate("go('mapa'); requestAnimationFrame(()=>{resizeMap();fitOld()})"); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f"C_{lang}_map.png")
        
        try:
            await pg.click("#zLayer"); await pg.wait_for_timeout(500)
        except Exception: pass
        await pg.screenshot(path=f"C_{lang}_map_photos.png")
        await pg.evaluate("openLoc('jesuit')"); await pg.wait_for_timeout(600); await pg.screenshot(path=f"C_{lang}_sheet.png")
        await pg.evaluate("closeSheet(); openPhoto('p-shame1')"); await pg.wait_for_timeout(700); await pg.screenshot(path=f"C_{lang}_photo.png")
        await pg.evaluate("document.querySelector('#sheet .sbody, #sheet')&&0")
        await pg.evaluate("(()=>{const el=document.querySelector('#plSvg')||document.querySelector('#sheet svg.planner');if(el)el.scrollIntoView({block:'center'})})()"); await pg.wait_for_timeout(400)
        await pg.screenshot(path=f"C_{lang}_planner.png")
        await ctx.set_geolocation({"latitude":42.64090,"longitude":18.10530,"accuracy":6}); await pg.wait_for_timeout(1500)
        await pg.evaluate("closeSheet(); S.heading=LBY&&PH.find(p=>p.id==='p-redkeep').dir+4;S.headingSrc='live';S.tilt={b:89,g:0.5}; openCam('p-redkeep')"); await pg.wait_for_timeout(2000); await pg.screenshot(path=f"C_{lang}_cam.png")
        await ctx.set_geolocation({"latitude":42.64112,"longitude":18.10905,"accuracy":8}); await pg.wait_for_timeout(300)
        await pg.click("#camX"); await pg.wait_for_timeout(300)
        await pg.evaluate("S.heading=262;S.tilt={b:88,g:1}; openCam(null,true)"); await pg.wait_for_timeout(1800); await pg.screenshot(path=f"C_{lang}_ar.png")
        await pg.click("#camX"); await pg.wait_for_timeout(300)
        for v in ['locais','bussola','fotos','mais']:
            await pg.evaluate(f"go('{v}')"); await pg.wait_for_timeout(500); await pg.screenshot(path=f"C_{lang}_{v}.png")
        await pg.evaluate("guide('vergonha',0)"); await pg.wait_for_timeout(700); await pg.screenshot(path=f"C_{lang}_guide.png")
        await pg.evaluate("closeSheet(); go('mais'); quizState={i:0,ok:0}; renderQuiz(); document.querySelector('#quizCard').scrollIntoView({block:'center'})"); await pg.wait_for_timeout(300)
        await pg.click("#quizCard .qopt >> nth=1"); await pg.wait_for_timeout(300); await pg.screenshot(path=f"C_{lang}_quiz.png")
        print(lang,'errs',errs)
        await b.close()
asyncio.run(main())
