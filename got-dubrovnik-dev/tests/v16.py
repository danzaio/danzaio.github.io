# v16 (app v13): antes e depois — cenas com foto de hoje do mesmo ângulo, cenas novas, troca Cena/Hoje no cartão, no visor, na ficha e na câmera
import asyncio
from playwright.async_api import async_playwright
ARGS=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream"]
OUT="/home/claude/tests/"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block", permissions=["camera"])
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        await ctx.route("https://www.youtube-nocookie.com/**", lambda r: r.fulfill(status=200,content_type="text/html",body="<p>yt</p>"))
        pg = await ctx.new_page(); errs=[]; bad=[]
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("response", lambda r: bad.append(r.url) if "/frames/" in r.url and r.status!=200 else None)
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour()")
        # cada cena e cada foto de hoje existe e tem o tamanho declarado
        res=await pg.evaluate("""async()=>{const all=new Map();Object.values(FR).concat(Object.values(LFR)).forEach(a=>a.forEach(f=>all.set(f[0],[f[1],f[2]])));Object.values(HOJE).forEach(h=>all.set(h[0],[h[1],h[2]]));
          const out=[];for(const [n,[w,h]] of all){const r=await new Promise(res=>{const i=new Image();i.onload=()=>res([i.naturalWidth,i.naturalHeight]);i.onerror=()=>res(null);i.src=frU(n)});out.push([n,!!r&&r[0]===w&&r[1]===h])}return out}""")
        print("arquivos:",len(res),"ok" if all(x[1] for x in res) else [x for x in res if not x[1]])
        print("HOJE sem cena correspondente:",await pg.evaluate("Object.keys(HOJE).filter(k=>!Object.values(FR).concat(Object.values(LFR)).some(a=>a.some(f=>f[0]===k)))"))
        print("missões com antes e depois:",await pg.evaluate("PH.filter(p=>stillList(p.id).some(x=>x.hu)).map(p=>p.id+':'+stillList(p.id).filter(x=>x.hu).length).join(' ')"))
        print("frames por missão:",await pg.evaluate("PH.map(p=>p.id+':'+stillList(p.id).length).join(' ')"))
        # cartão: a 1ª cena da Fortaleza Vermelha tem foto de hoje -> aparece a troca
        info="(id)=>{const e=document.querySelector('#st-'+id);const big=e&&e.querySelector('.tkbig img');return {big:big?big.getAttribute('src'):null,seg:e?[...e.querySelectorAll('.seg button')].map(x=>x.textContent.trim()+(x.classList.contains('on')?'*':'')):[],tag:e&&e.querySelector('.tktag')?.textContent,hj:e?e.querySelectorAll('.tkth.hj').length:0}}"
        await pg.evaluate("openPhoto('p-redkeep')"); await pg.wait_for_timeout(700)
        print("redkeep:",await pg.evaluate(info,"p-redkeep"))
        await pg.evaluate("$('#st-p-redkeep').scrollIntoView()"); await pg.screenshot(path=OUT+"H_scene.png")
        await pg.click("#st-p-redkeep .seg button >> nth=1"); await pg.wait_for_timeout(400)
        r=await pg.evaluate(info,"p-redkeep"); print("depois de Hoje:",r)
        print("img hoje carregou:",await pg.evaluate("(()=>{const i=$('#st-p-redkeep .tkbig img');return [i.naturalWidth,i.complete]})()"))
        await pg.evaluate("$('#st-p-redkeep').scrollIntoView()"); await pg.screenshot(path=OUT+"H_today.png")
        # visor mostra as duas, com crédito da foto
        await pg.click("#st-p-redkeep .tkbig"); await pg.wait_for_timeout(500)
        print("visor:",await pg.evaluate("[[...$$('#modalBox img')].map(i=>i.getAttribute('src')),$('#modalBox').innerText.includes('schmollywood1'),$('#modalBox').innerText.includes('HBO')]"))
        await pg.screenshot(path=OUT+"H_view.png"); await pg.evaluate("closeModal()")
        # escolher uma cena sem foto de hoje esconde a troca; voltar mostra de novo
        await pg.click("#st-p-redkeep .tkth >> nth=1"); await pg.wait_for_timeout(300); print("cena sem hoje:",await pg.evaluate(info,"p-redkeep"))
        await pg.click("#st-p-redkeep .tkth >> nth=0"); await pg.wait_for_timeout(300); print("volta:",(await pg.evaluate(info,"p-redkeep"))["seg"])
        await pg.evaluate("closeSheet()")
        # missões que antes não tinham cena boa
        for mid in ["p-shame1","p-pile","p-olenna","p-arena"]:
            await pg.evaluate(f"openPhoto('{mid}')"); await pg.wait_for_timeout(500); print(mid,await pg.evaluate(info,mid)); await pg.evaluate("closeSheet()")
        await pg.evaluate("openPhoto('p-shame1')"); await pg.wait_for_timeout(500); await pg.click("#st-p-shame1 .seg button >> nth=1"); await pg.wait_for_timeout(400)
        await pg.evaluate("$('#st-p-shame1').scrollIntoView()"); await pg.screenshot(path=OUT+"H_shame.png"); await pg.evaluate("closeSheet()")
        # ficha do lugar: miniatura marcada e visor com as duas
        await pg.evaluate("openLoc('lovr')"); await pg.wait_for_timeout(900)
        print("ficha lovr:",await pg.evaluate("[...document.querySelectorAll('#sheet .lfr button')].map(b=>b.querySelector('img').getAttribute('src').slice(7)+(b.classList.contains('hj')?' 📷':''))"))
        await pg.click("#sheet .lfr button.hj >> nth=0"); await pg.wait_for_timeout(400); print("ficha visor:",await pg.evaluate("[...$$('#modalBox img')].map(i=>i.getAttribute('src'))"))
        await pg.evaluate("closeModal();closeSheet()")
        # câmera: botão Cena/Hoje troca o canto e a guia por cima
        await pg.evaluate("HV['p-redkeep']=0;stillPick('p-redkeep',0);openCam('p-redkeep')"); await pg.wait_for_timeout(2200)
        cam="[$('#camHj').style.display,$('#camHj').textContent,$('#camStill').style.backgroundImage.slice(5,40),$('#camGhost')?.getAttribute('href')||'']"
        print("câmera:",await pg.evaluate(cam))
        for i in range(3):
            await pg.click("#camGh"); await pg.wait_for_timeout(250)
            if await pg.evaluate("CAM.ghost")==3: break
        print("guia take:",await pg.evaluate(cam))
        await pg.click("#camHj"); await pg.wait_for_timeout(300); print("câmera hoje:",await pg.evaluate(cam)); await pg.screenshot(path=OUT+"H_cam.png")
        await pg.click("#camTk"); await pg.wait_for_timeout(300); print("próximo take (sem hoje):",await pg.evaluate(cam))
        await pg.click("#camX")
        # textos novos nos 6 idiomas
        for lg in ["pt","en","es","de","fr","it"]:
            miss=await pg.evaluate("(lg)=>['frScene','frToday','frTodayTag','frTodayBy','frHasToday'].filter(k=>!UI[lg][k])",lg)
            if miss: print(lg,"faltando:",miss)
        await pg.goto("http://localhost:8765/?lang=fr"); await pg.wait_for_timeout(1400); await pg.evaluate("try{endTour()}catch(e){}"); await pg.evaluate("openPhoto('p-roofs')"); await pg.wait_for_timeout(500)
        print("fr:",await pg.evaluate(info,"p-roofs")); await pg.evaluate("$('#st-p-roofs').scrollIntoView()"); await pg.screenshot(path=OUT+"H_fr.png")
        print("versão:",await pg.evaluate("document.body.innerHTML.includes('· v13')"))
        print("frames com erro:",bad); print("ERRS",errs); await b.close()
asyncio.run(main())
