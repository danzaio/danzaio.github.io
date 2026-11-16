import asyncio, re, sys
from playwright.async_api import async_playwright
URL="http://localhost:8765/"
LANGS=sys.argv[1:] or ['en','pt','es','de','fr','it']
PT_LEFT=re.compile(r"ã|õ|ção|ções|\bvocê\b|\bVocê\b|\bnão\b|\bLigar\b|\bFechar\b|\bposição\b")
KEYLIKE=re.compile(r"\b(?:[a-z]+[A-Z][A-Za-z0-9]*|cat_[a-z]+|catS_[a-z]+|theme_[a-z]+|tk\d+|tour\d+[tpf])\b")
ALLOW_KEYLIKE={'iPhone','iOS','YouTube','McDonald'}
async def collect(pg):
    return await pg.evaluate("document.body.innerText")
async def run(lang,p,b):
    ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=1, is_mobile=True, has_touch=True, locale='en-US',
          geolocation={"latitude":42.6397,"longitude":18.1094,"accuracy":15}, permissions=["geolocation","camera"])
    pg = await ctx.new_page(); errs=[]
    pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
    pg.on("console", lambda m: errs.append(m.type+": "+m.text) if m.type=="error" and "fonts.g" not in m.text and "ERR_" not in m.text else None)
    await pg.goto(URL+"?lang="+lang); await pg.wait_for_timeout(1200)
    texts=[]
    n = await pg.evaluate("TOUR.length")
    for i in range(n):
        texts.append(await pg.inner_text("#tourCard"))
        if i==0: await pg.screenshot(path=f"/home/claude/tests/L_{lang}_tour0.png")
        if i < n-1: await pg.click("#tNext"); await pg.wait_for_timeout(380)
    await pg.evaluate("endTour()")
    await pg.evaluate("setSim(true); setManualPos({lat:42.6397,lon:18.1094},'x',true)"); await pg.wait_for_timeout(400)
    texts.append(await collect(pg))
    await pg.screenshot(path=f"/home/claude/tests/L_{lang}_map.png")
    for v in ['locais','bussola','fotos','mais']:
        await pg.evaluate(f"go('{v}')"); await pg.wait_for_timeout(350); texts.append(await collect(pg))
        await pg.screenshot(path=f"/home/claude/tests/L_{lang}_{v}.png")
    await pg.evaluate("go('mapa')")
    for lid in await pg.evaluate("L.map(l=>l.id)"):
        await pg.evaluate(f"openLoc('{lid}')"); await pg.wait_for_timeout(40); texts.append(await pg.inner_text("#sheet"))
    await pg.evaluate("openLoc('jesuit')"); await pg.wait_for_timeout(300); await pg.screenshot(path=f"/home/claude/tests/L_{lang}_sheet.png")
    for pid in await pg.evaluate("PH.map(p=>p.id)"):
        await pg.evaluate(f"openPhoto('{pid}')"); await pg.wait_for_timeout(60); texts.append(await pg.inner_text("#sheet"))
    await pg.evaluate("openPhoto('p-shame1')"); await pg.wait_for_timeout(500); await pg.screenshot(path=f"/home/claude/tests/L_{lang}_photo.png")
    await pg.evaluate("closeSheet()")
    for fn in ["openLocModal()","openLangModal()"]:
        await pg.evaluate(fn); await pg.wait_for_timeout(250); texts.append(await collect(pg)); await pg.evaluate("closeModal()")
    for r in await pg.evaluate("ROUTES.map(r=>[r.id,r.stops.length])"):
        await pg.evaluate(f"guide('{r[0]}',0)"); await pg.wait_for_timeout(120); texts.append(await collect(pg))
        await pg.evaluate(f"guideArrive('{r[0]}',{r[1]-1})"); await pg.wait_for_timeout(120); texts.append(await collect(pg))
    await pg.evaluate("closeSheet(); go('mais'); quizState={i:0,ok:0}; renderQuiz()")
    for i in range(10):
        await pg.click("#quizCard .qopt >> nth=1"); await pg.wait_for_timeout(40); texts.append(await pg.inner_text("#quizCard")); await pg.click("#qNext"); await pg.wait_for_timeout(40)
    texts.append(await pg.inner_text("#quizCard"))
    # camera + AR
    await pg.evaluate("S.heading=200;S.headingSrc='live';S.tilt={b:88,g:1}; openCam('p-shame1')"); await pg.wait_for_timeout(1500)
    texts.append(await collect(pg)); await pg.screenshot(path=f"/home/claude/tests/L_{lang}_cam.png")
    await pg.click("#camX"); await pg.wait_for_timeout(250)
    await pg.evaluate("openCam(null,true)"); await pg.wait_for_timeout(1400)
    texts.append(await collect(pg)); await pg.screenshot(path=f"/home/claude/tests/L_{lang}_ar.png")
    await pg.click("#camX"); await pg.wait_for_timeout(250)
    await pg.evaluate("go('bussola')"); await pg.wait_for_timeout(200)
    try:
        await pg.click("#calBtn"); await pg.wait_for_timeout(250); texts.append(await collect(pg)); await pg.evaluate("closeModal()")
    except Exception as e: pass
    blob="\n".join(texts)
    left = sorted(set(m.group(0) for m in PT_LEFT.finditer(blob))) if lang!='pt' else []
    keys = sorted(set(k for k in KEYLIKE.findall(blob) if k not in ALLOW_KEYLIKE))
    bad = [s for s in ['${','undefined','NaN','null'] if s in blob]
    ctxs=[]
    for w in left[:6]:
        i=blob.find(w); ctxs.append(blob[max(0,i-50):i+40].replace("\n"," / "))
    print(f"[{lang}] chars={len(blob)} errs={errs[:3]} PT-left={left[:12]} keylike={keys[:12]} bad={bad}")
    for c in ctxs: print("   ..", c)
    await ctx.close()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream"])
        for l in LANGS: await run(l,p,b)
        await b.close()
asyncio.run(main())
