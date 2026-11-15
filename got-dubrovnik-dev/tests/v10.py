# v10: clipe no segundo certo + importar vários takes de uma vez + pacote de takes
import asyncio, os, json
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw
os.makedirs('/tmp/takes',exist_ok=True)
FILES=[]
for i,(nm,col) in enumerate([('torneio.png','#c9a36b'),('IMG_0042.png','#8fb0c9'),('shame1 escada.jpg','#b9a08a'),('qualquer.png','#99b38f')]):
    im=Image.new('RGB',(1280,720),col);d=ImageDraw.Draw(im);d.rectangle([400,250,880,720],fill='#333');d.text((60,60),nm,fill='#fff');p='/tmp/takes/'+nm;im.save(p);FILES.append(p)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block", accept_downloads=True)
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour();go('fotos')"); await pg.wait_for_timeout(500)
        print("clips:",await pg.evaluate("PH.map(p=>p.id+' '+(clipAt(p)||'-')+' '+(YT[p.id]?clipURL(p).replace('https://www.youtube.com/watch',''):'busca')).join(' | ')"))
        print("YT sem missão:",await pg.evaluate("Object.keys(YT).filter(k=>!PH.find(p=>p.id===k))"))
        print("card:",(await pg.inner_text("#takesCard")).replace("\n"," | ")[:230])
        async with pg.expect_file_chooser() as fc: await pg.click("#tkMany")
        await (await fc.value).set_files(FILES); await pg.wait_for_timeout(600)
        print("palpites:",await pg.evaluate("[...document.querySelectorAll('#tkRows select')].map(s=>s.value)")); await pg.screenshot(path="Z_assign.png")
        await pg.click("#tkSave"); await pg.wait_for_timeout(1500)
        print("depois:",await pg.evaluate("[takesN(),PH.filter(p=>stillGet(p.id)).map(p=>p.id),$('#toast').textContent]"),(await pg.inner_text("#takesCard")).split("\n")[1])
        await pg.evaluate("$('#takesCard').scrollIntoView()"); await pg.screenshot(path="Z_card.png")
        # exportar o pacote, apagar tudo e importar de volta
        await pg.evaluate("(()=>{saveBlob=(b,n)=>{window._pk=b;window._pkn=n}})()"); await pg.click("#tkExp"); await pg.wait_for_timeout(300)
        txt=await pg.evaluate("_pk.text()"); open('/tmp/takes/pack.json','w').write(txt); print("pacote:",await pg.evaluate("_pkn"),len(txt)//1024,"KB",list(json.loads(txt)['stills'].keys()))
        await pg.evaluate("PH.forEach(p=>store.set('still_'+p.id,null));takesUI()"); print("zerado:",await pg.evaluate("takesN()"))
        async with pg.expect_file_chooser() as fc: await pg.click("#tkImp")
        await (await fc.value).set_files('/tmp/takes/pack.json'); await pg.wait_for_timeout(800)
        print("importado:",await pg.evaluate("[takesN(),$('#toast').textContent]"))
        open('/tmp/takes/bad.json','w').write('{"stills":{"p-torneio":{"u":"javascript:alert(1)"},"x":{"u":"data:image/png;base64,AAAA"}}}')
        await pg.evaluate("PH.forEach(p=>store.set('still_'+p.id,null));takesUI()")
        async with pg.expect_file_chooser() as fc: await pg.click("#tkImp")
        await (await fc.value).set_files('/tmp/takes/bad.json'); await pg.wait_for_timeout(600); print("pacote ruim:",await pg.evaluate("takesN()"))
        await pg.evaluate("openPhoto('p-torneio')"); await pg.wait_for_timeout(400); print("missão:",(await pg.inner_text("#st-p-torneio")).replace("\n"," | ")[150:520])
        await pg.evaluate("$('#st-p-torneio').scrollIntoView()"); await pg.screenshot(path="Z_mission.png")
        print("ERRS",errs); await b.close()
asyncio.run(main())
