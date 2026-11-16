# v8: colar o take, transparência na câmera, encaixe da foto no take
import asyncio
from playwright.async_api import async_playwright
ARGS=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream","--use-file-for-fake-video-capture=/home/claude/tests/fake/scene.y4m"]
MK="""async(col,txt,w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,w,h);x.fillStyle='#333';x.fillRect(w*.3,h*.35,w*.4,h*.65);x.fillRect(w*.1,h*.6,w*.15,h*.4);x.fillStyle='#fff';x.font=(h/8)+'px sans-serif';x.fillText(txt,w*.08,h*.2);return await new Promise(r=>c.toBlob(r,'image/png'))}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block", permissions=["clipboard-read","clipboard-write","camera"])
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour()")
        pid=await pg.evaluate("PH[0].id")
        await pg.evaluate(f"openPhoto('{pid}')"); await pg.wait_for_timeout(500)
        print("card:",(await pg.inner_text(f"#st-{pid}")).replace("\n"," | ")[:260]); await pg.evaluate(f"$('#st-{pid}').scrollIntoView()"); await pg.screenshot(path="X_still_empty.png")
        # colar sem imagem copiada
        await pg.evaluate("navigator.clipboard.writeText('nada')"); await pg.evaluate(f"pasteStill('{pid}')"); await pg.wait_for_timeout(400)
        print("sem imagem:",await pg.evaluate(f"[!!stillGet('{pid}'),$('#toast').textContent.slice(0,40)]"))
        # copiar uma imagem e colar
        await pg.evaluate("async()=>{const mk="+MK+";const bl=await mk('#c9a36b','TAKE',800,450);await navigator.clipboard.write([new ClipboardItem({'image/png':bl})])}")
        await pg.evaluate(f"pasteStill('{pid}')"); await pg.wait_for_timeout(700)
        print("colado:",await pg.evaluate(f"(()=>{{const s=stillGet('{pid}');return s&&[s.w,s.h,CAM.ghost]}})()")); await pg.screenshot(path="X_still_have.png")
        # câmera: take por cima com transparência ajustável
        await pg.evaluate(f"closeSheet();openCam('{pid}')"); await pg.wait_for_timeout(2500)
        print("cam:",await pg.evaluate("[CAM.ghost,$('#camOp').style.display,$('#camGhost')&&$('#camGhost').getAttribute('opacity')]"))
        await pg.evaluate("(()=>{const o=$('#camOp');o.value=80;o.dispatchEvent(new Event('input'))})()"); print("op80:",await pg.evaluate("$('#camGhost').getAttribute('opacity')")); await pg.screenshot(path="X_cam.png")
        await pg.click("#camGh"); await pg.wait_for_timeout(300); print("guia seguinte:",await pg.evaluate("[CAM.ghost,$('#camOp').style.display]"))
        await pg.click("#camX"); await pg.wait_for_timeout(300)
        # foto no álbum e encaixe
        await pg.evaluate("async()=>{const mk="+MK+";const bl=await mk('#7fa0b8','EU',900,1200);await DB.put({id:'f1',ph:PH[0].id,loc:PH[0].loc,ts:Date.now(),blob:bl})}")
        await pg.evaluate("viewFoto('f1')"); await pg.wait_for_timeout(500); print("viewer:",await pg.evaluate("[!!$('#fitB'),!!$('#sbsB')]"))
        await pg.click("#fitB"); await pg.wait_for_timeout(600); await pg.screenshot(path="X_fit1.png")
        box=await pg.evaluate("(()=>{const r=$('#fitS').getBoundingClientRect();return [r.x,r.y,r.width,r.height]})()")
        await pg.mouse.move(box[0]+box[2]*.7,box[1]+box[3]*.5); await pg.mouse.down(); await pg.mouse.move(box[0]+box[2]*.5,box[1]+box[3]*.4,steps=4); await pg.mouse.up()
        await pg.evaluate("(()=>{const z=$('#fitZ');z.value=180;z.dispatchEvent(new Event('input'));z.dispatchEvent(new Event('change'));const w=$('#fitW');w.value=40;w.dispatchEvent(new Event('input'))})()"); await pg.wait_for_timeout(300)
        print("fit:",await pg.evaluate("store.get('fit_f1')"),await pg.evaluate("$('#fitI').style.clipPath")); await pg.screenshot(path="X_fit2.png")
        await pg.click("#fitM"); await pg.wait_for_timeout(300); print("blend:",await pg.evaluate("[$('#fitI').style.opacity,$('#fitL').style.display,$('#fitWl').textContent]")); await pg.screenshot(path="X_fit3.png")
        await pg.click("#fitM")
        await pg.evaluate("(()=>{window._saved=null;saveBlob=(b,n)=>{window._saved=[b.size,n];window._blob=b}})()"); await pg.click("#fitSave"); await pg.wait_for_timeout(1200)
        print("salvo:",await pg.evaluate("_saved"))
        data=await pg.evaluate("async()=>{const r=new FileReader();return await new Promise(res=>{r.onload=()=>res(r.result);r.readAsDataURL(_blob)})}")
        import base64; open("X_match.jpg","wb").write(base64.b64decode(data.split(",")[1]))
        await pg.click("#fitBack"); await pg.wait_for_timeout(400); print("voltou:",await pg.evaluate("!!$('#fitB')"))
        # foto sem take: aviso com atalho
        await pg.evaluate("async()=>{const mk="+MK+";const bl=await mk('#7fa0b8','EU2',900,1200);await DB.put({id:'f2',ph:PH[1].id,loc:PH[1].loc,ts:Date.now(),blob:bl})}")
        await pg.evaluate("viewFoto('f2')"); await pg.wait_for_timeout(400); print("sem take:",await pg.evaluate("[!!$('#fitB'),!!$('#fitAdd'),!!$('#fitPaste')]")); await pg.screenshot(path="X_notake.png")
        for lg in ["en","es","de","fr","it"]:
            await pg.evaluate(f"setLang('{lg}');openFit('f1')"); await pg.wait_for_timeout(350); print(lg,(await pg.inner_text("#modalBox")).replace("\n"," | ")[:170])
        print("ERRS",errs); await b.close()
asyncio.run(main())
