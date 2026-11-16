import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block")
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour()")
        print(await pg.evaluate("PH.map(p=>p.id.replace('p-','')+' '+(clipAt(p)||'busca')).join(' | ')"))
        for lg in ["pt","en","es","de","fr","it"]:
            await pg.evaluate(f"setLang('{lg}')"); bad=[]
            for pid in await pg.evaluate("PH.map(p=>p.id)"):
                await pg.evaluate(f"openPhoto('{pid}')"); await pg.wait_for_timeout(120)
                tx=await pg.inner_text(f"#st-{pid}")
                if 'undefined' in tx or 'tnRoofs' in tx or 'clipAtL' in tx or 'stillHaveN' in tx: bad.append(pid)
            await pg.evaluate("openPhoto('p-roofs')"); await pg.wait_for_timeout(150)
            print(lg,"bad:",bad,"|",(await pg.inner_text("#st-p-roofs")).replace("\n"," | ")[-330:])
        print("ERRS",errs); await b.close()
asyncio.run(main())
