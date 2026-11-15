# v9: take escolhido por missão (episódio certo + link direto para a cena)
import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block")
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour()")
        rows=await pg.evaluate("PH.map(p=>{const s=phScene(p),k=TAKE[p.id];return [p.id,k?('T'+k[0]+'E'+k[1]):'-',s?('S'+s[0]+'E'+s[1]+' '+s[2]):'sem cena',k?(s&&s[0]===k[0]&&s[1]===k[1]):null,takeURL(p)||'(busca)']})")
        for r in rows: print(r)
        print("TAKE sem missão:",await pg.evaluate("Object.keys(TAKE).filter(k=>!PH.find(p=>p.id===k))"))
        for lg in ["pt","en","de"]:
            await pg.evaluate(f"setLang('{lg}');openPhoto('p-redkeep')"); await pg.wait_for_timeout(400)
            print(lg,(await pg.inner_text("#st-p-redkeep")).replace("\n"," | ")[:330])
        await pg.evaluate("setLang('pt');openPhoto('p-redkeep');$('#st-p-redkeep').scrollIntoView()"); await pg.wait_for_timeout(300); await pg.screenshot(path="Y_take.png")
        print("ERRS",errs); await b.close()
asyncio.run(main())
