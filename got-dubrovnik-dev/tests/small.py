import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        errs=[]
        # 1) iPhone SE pequeno, tema escuro
        ctx = await b.new_context(viewport={"width":375,"height":667}, device_scale_factor=2, is_mobile=True, has_touch=True, color_scheme="dark")
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        await pg.goto("http://localhost:8765/"); await pg.wait_for_timeout(1300)
        await pg.screenshot(path="s1_tour_dark.png")
        await pg.click("#tSkip"); await pg.evaluate("setSim(true,'lovr'); centerOn(LBY.lovr.lat,LBY.lovr.lon,1.6,true)"); await pg.wait_for_timeout(500)
        await pg.screenshot(path="s2_map_dark.png")
        await pg.evaluate("openLoc('jesuit')"); await pg.wait_for_timeout(500); await pg.screenshot(path="s3_sheet_dark.png")
        await pg.evaluate("closeSheet(); go('bussola')"); await pg.wait_for_timeout(400); await pg.screenshot(path="s4_comp_dark.png")
        await pg.evaluate("openLocModal()"); await pg.wait_for_timeout(300); await pg.screenshot(path="s5_locmodal.png")
        await ctx.close()
        # 2) dentro de iframe (simula o app do Claude)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append("PAGEERROR(frame) "+str(e)))
        await pg.goto("http://localhost:8765/_frame_test.html"); await pg.wait_for_timeout(1500)
        fr = pg.frames[1]
        print("FRAMED:", await fr.evaluate("FRAMED"))
        await fr.click("#tNext"); await pg.wait_for_timeout(400); await pg.screenshot(path="s6_frame_tour.png")
        await fr.evaluate("endTour(); go('mais')"); await pg.wait_for_timeout(300)
        await fr.evaluate("document.getElementById('ajuda').scrollIntoView()"); await pg.wait_for_timeout(200); await pg.screenshot(path="s7_frame_help.png")
        await ctx.close()
        print("\n".join(errs) or "NO ERRORS"); await b.close()
asyncio.run(main())
