import asyncio, json
from playwright.async_api import async_playwright
URL="http://localhost:8765/"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True,
              geolocation={"latitude":-23.55,"longitude":-46.63,"accuracy":20}, permissions=["geolocation","camera"])
        pg = await ctx.new_page()
        errs=[]
        pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        pg.on("console", lambda m: errs.append(m.type+": "+m.text) if m.type=="error" and "TUNNEL" not in m.text and "fonts.g" not in m.text else None)
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        # tutorial
        n = await pg.evaluate("TOUR.length")
        for i in range(n):
            await pg.screenshot(path=f"/home/claude/tests/t{i:02d}.png")
            if i < n-1: await pg.click("#tNext"); await pg.wait_for_timeout(500)
        await pg.click("#tGps"); await pg.wait_for_timeout(1500)
        await pg.screenshot(path="/home/claude/tests/u_far.png")
        txt = await pg.inner_text("#mapTop"); print("maptop:", txt.replace("\n"," | ")[:160])
        await pg.click("#farChip"); await pg.wait_for_timeout(700)
        print("sim:", await pg.evaluate("[S.sim,S.posSrc,S.pos&&S.pos.lat.toFixed(4)]"))
        # tap on map near Jesuit stairs to 'walk' there
        await pg.evaluate("centerOn(LBY.jesuit.lat,LBY.jesuit.lon,2,true)"); await pg.wait_for_timeout(300)
        box = await pg.evaluate("(()=>{const r=MAP.svg.getBoundingClientRect();return [r.left+r.width/2, r.top+r.height/2]})()")
        await pg.mouse.click(box[0]+3, box[1]+3); await pg.wait_for_timeout(900)
        print("after tap pos:", await pg.evaluate("[S.posSrc, dist(S.pos,LBY.jesuit).toFixed(1)]"))
        await pg.screenshot(path="/home/claude/tests/u_sim_near.png")
        # todos os locais
        for lid in await pg.evaluate("L.map(l=>l.id)"):
            await pg.evaluate(f"openLoc('{lid}')"); await pg.wait_for_timeout(60)
        await pg.evaluate("closeSheet()")
        # todas as fotos + câmera
        for pid in await pg.evaluate("PH.map(p=>p.id)"):
            await pg.evaluate(f"openPhoto('{pid}')"); await pg.wait_for_timeout(40)
        await pg.evaluate("closeSheet(); go('fotos')"); await pg.wait_for_timeout(400)
        await pg.evaluate("S.heading=200;S.headingSrc='live';S.tilt={b:88,g:1}; openCam('p-srd')"); await pg.wait_for_timeout(1800)
        await pg.screenshot(path="/home/claude/tests/u_cam.png")
        print("lens buttons:", await pg.inner_text("#camLens"))
        await pg.click("#camShot"); await pg.wait_for_timeout(900)
        await pg.click("#camFlip"); await pg.wait_for_timeout(900)
        await pg.click("#camGrid"); await pg.click("#camGh"); await pg.wait_for_timeout(200)
        await pg.click("#camX"); await pg.wait_for_timeout(300)
        print("photos in DB:", await pg.evaluate("DB.all().then(a=>a.length)"))
        # roteiros guiados completos
        for r in await pg.evaluate("ROUTES.map(r=>[r.id,r.stops.length])"):
            await pg.evaluate(f"guide('{r[0]}',0)")
            for i in range(r[1]):
                await pg.evaluate(f"guideArrive('{r[0]}',{i})"); await pg.wait_for_timeout(40)
        print("visited:", await pg.evaluate("S.visited.size"))
        # quiz inteiro
        await pg.evaluate("go('mais'); quizState={i:0,ok:0}; renderQuiz()")
        for i in range(10):
            await pg.click("#quizCard .qopt >> nth=1"); await pg.wait_for_timeout(50); await pg.click("#qNext"); await pg.wait_for_timeout(50)
        print("quiz:", (await pg.inner_text("#quizCard")).replace("\n"," | ")[:80])
        await pg.evaluate("go('mapa'); zoomAt(3)"); await pg.wait_for_timeout(400)
        await pg.screenshot(path="/home/claude/tests/u_labels.png")
        # offline
        sw = await pg.evaluate("navigator.serviceWorker.ready.then(r=>!!r.active)")
        print("sw active:", sw)
        await pg.wait_for_timeout(800)
        await ctx.set_offline(True)
        await pg.reload(); await pg.wait_for_timeout(1500)
        print("offline title:", await pg.title(), "| markers:", await pg.evaluate("document.querySelectorAll('.mk').length"))
        await ctx.set_offline(False)
        print("\n".join(errs) or "NO ERRORS")
        await b.close()
asyncio.run(main())
