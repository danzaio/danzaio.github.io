# Teste rápido que serve para QUALQUER franquia: abre o guia em cada idioma, passa por todas as abas,
# abre um lugar, uma missão, a câmera e o quiz, e falha se a página der erro de JavaScript.
# uso: python3 smoke.py [chromium|webkit]     (o runner troca localhost:8765 pelo servidor certo)
import asyncio, sys, os
from playwright.async_api import async_playwright
ENGINE = sys.argv[1] if len(sys.argv) > 1 else "chromium"
BASE = "http://localhost:8765/"
STEPS = ["openLoc(L[0].id)", "closeSheet()", "openPhoto(PH[0].id)", "closeSheet()", "go('lista')", "go('bussola')",
         "go('fotos')", "go('mais')", "go('mapa')", "setSim(true,FX.entry)", "openLoc(FX.entry)", "closeSheet()", "setSim(false)"]

async def main():
    async with async_playwright() as p:
        if ENGINE == "webkit":
            b = await p.webkit.launch()
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=3, is_mobile=True, has_touch=True,
                                      service_workers="block",
                                      user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1")
        else:
            b = await p.chromium.launch(executable_path=os.environ.get("CHROME", "/usr/bin/google-chrome"),
                                        args=["--no-sandbox", "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"])
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True,
                                      service_workers="block", permissions=["camera"])
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        await ctx.route("https://routing.openstreetmap.de/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
        info = None
        for lang in ["pt", "en", "es", "de", "fr", "it"]:
            await pg.goto(f"{BASE}?lang={lang}"); await pg.wait_for_timeout(1300)
            if info is None:
                info = await pg.evaluate("({places:L.length,missions:PH.length,routes:ROUTES.length,quiz:QUIZ.length,frames:Object.values(FR).reduce((a,x)=>a+x.length,0),brand:t('brand')})")
            await pg.evaluate("try{endTour()}catch(e){}")
            for js in STEPS:
                try:
                    await pg.evaluate(js); await pg.wait_for_timeout(200)
                except Exception as e:
                    errs.append(f"{lang} {js}: {str(e)[:140]}")
            title = await pg.title()
            if not title or title == "docTitle":
                errs.append(f"{lang}: sem título")
        # câmera (só no Chromium, que tem câmera falsa) e quiz
        await pg.goto(f"{BASE}?lang=pt"); await pg.wait_for_timeout(1000); await pg.evaluate("try{endTour()}catch(e){}")
        if ENGINE != "webkit":
            await pg.evaluate("openCam(PH[0].id)"); await pg.wait_for_timeout(1500)
            if not await pg.evaluate("CAM.on"): errs.append("câmera não abriu")
            await pg.evaluate("closeCam()") if await pg.evaluate("typeof closeCam==='function'") else await pg.click("#camX")
        await pg.evaluate("go('mais')"); await pg.wait_for_timeout(300)
        sobre = await pg.evaluate("""(async()=>{const a=document.querySelector('a[href^="privacy.html"]');const r=a?await fetch('privacy.html'):null;
          return {privacidade:!!a&&r.ok, creditos:document.querySelectorAll('.cred li').length, versao:/· v\\d+<\\/p>/.test(document.body.innerHTML)}})()""")
        if not sobre["privacidade"]: errs.append("sem política de privacidade")
        if not sobre["versao"]: errs.append("sem versão no Sobre")
        print("engine:", ENGINE)
        print("conteúdo:", info)
        print("sobre:", sobre)
        print("erros:", errs if errs else "nenhum")
        await b.close()
        sys.exit(1 if errs else 0)

asyncio.run(main())
