# v12: trocar de take dentro da câmera e dentro do encaixe
import asyncio
from playwright.async_api import async_playwright
ARGS=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream"]
MK="""async(col,txt)=>{const c=document.createElement('canvas');c.width=640;c.height=360;const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,640,360);x.fillStyle='#222';x.fillRect(200,120,240,240);x.fillStyle='#fff';x.font='60px sans-serif';x.fillText(txt,30,80);return await new Promise(r=>c.toBlob(r,'image/png'))}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block", permissions=["camera"])
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour()")
        for c,t in [('#c9a36b','ABERTO'),('#8fb0c9','CLOSE'),('#99b38f','TRES')]:
            await pg.evaluate("async([c,t])=>{const mk="+MK+";await setStill('p-bokar',await mk(c,t),true)}",[c,t])
        await pg.evaluate("openCam('p-bokar')"); await pg.wait_for_timeout(2500)
        print("cam:",await pg.evaluate("[$('#camTk').style.display,$('#camTk').textContent,CAM.ghost,$('#camGhost')&&$('#camGhost').getAttribute('href').length]")); await pg.screenshot(path="K_cam1.png")
        u1=await pg.evaluate("$('#camGhost').getAttribute('href')")
        await pg.click("#camTk"); await pg.wait_for_timeout(300)
        u2=await pg.evaluate("$('#camGhost').getAttribute('href')"); print("trocou:",u1!=u2,await pg.inner_text("#camTk")); await pg.screenshot(path="K_cam2.png")
        await pg.click("#camTk"); await pg.click("#camTk"); await pg.wait_for_timeout(200); print("ciclo:",await pg.inner_text("#camTk"))
        await pg.click("#camX"); await pg.wait_for_timeout(300)
        await pg.evaluate("openCam('p-torneio')"); await pg.wait_for_timeout(1500); print("sem take:",await pg.evaluate("[$('#camTk').style.display,$('#camStill').style.display]")); await pg.click("#camX")
        await pg.evaluate("async()=>{const mk="+MK+";await DB.put({id:'f1',ph:'p-bokar',loc:'bokar',ts:Date.now(),blob:await mk('#7fa0b8','EU')})}")
        await pg.evaluate("viewFoto('f1')"); await pg.wait_for_timeout(400); await pg.click("#fitB"); await pg.wait_for_timeout(500)
        print("encaixe miniaturas:",await pg.evaluate("document.querySelectorAll('#modalBox [data-tk]').length"))
        b1=await pg.evaluate("$('#fitS').style.backgroundImage.length"); await pg.click("#modalBox [data-tk='0']"); await pg.wait_for_timeout(600)
        print("trocou no encaixe:",await pg.evaluate("[TK.m['p-bokar'].a,document.querySelector('#modalBox .tkth.on').dataset.tk]")); await pg.screenshot(path="K_fit.png")
        print("ERRS",errs); await b.close()
asyncio.run(main())
