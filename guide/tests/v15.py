# v15: frames da série embutidos (pasta frames/) — missão, ficha do lugar, câmera, encaixe, lado a lado, ocultar/voltar, prints próprios
import asyncio, json
from playwright.async_api import async_playwright
ARGS=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream"]
MK="""async(col,txt)=>{const c=document.createElement('canvas');c.width=600;c.height=800;const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,600,800);x.fillStyle='#fff';x.font='60px sans-serif';x.fillText(txt,30,80);return await new Promise(r=>c.toBlob(r,'image/png'))}"""
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
        # todas as imagens do manifesto existem e carregam
        res=await pg.evaluate("""async()=>{const all=new Set();Object.values(FR).concat(Object.values(LFR)).forEach(a=>a.forEach(f=>all.add(JSON.stringify(f))));const out=[];
          for(const s of all){const f=JSON.parse(s);const r=await new Promise(res=>{const i=new Image();i.onload=()=>res([i.naturalWidth,i.naturalHeight]);i.onerror=()=>res(null);i.src=frU(f[0])});out.push([f[0],r&&r[0]===f[1]&&r[1]===f[2]])}return out}""")
        print("manifesto:",len(res),"ok" if all(x[1] for x in res) else [x for x in res if not x[1]])
        print("missões com frames:",await pg.evaluate("PH.filter(p=>stillList(p.id).some(x=>x.b)).map(p=>p.id+':'+stillList(p.id).length).join(' ')"))
        print("sem frame:",await pg.evaluate("PH.filter(p=>!stillList(p.id).length).map(p=>p.id).join(' ')"))
        # cartão da missão: imagem grande + miniaturas
        await pg.evaluate("openPhoto('p-torneio')"); await pg.wait_for_timeout(700)
        info="(id)=>{const e=document.querySelector('#st-'+id);const big=e&&e.querySelector('.tkbig img');return {big:big?[big.getAttribute('src'),big.naturalWidth,Math.round(big.getBoundingClientRect().width)]:null,tag:e&&e.querySelector('.tktag')?.textContent,cnt:e&&e.querySelector('span.small.muted')?.textContent,th:e?e.querySelectorAll('.tkth').length:0,btns:e?[...e.querySelectorAll('.row > *')].map(a=>a.textContent.trim()):[]}}"
        print("torneio:",await pg.evaluate(info,"p-torneio"))
        await pg.evaluate("$('#st-p-torneio').scrollIntoView()"); await pg.screenshot(path=OUT+"F_mission.png")
        await pg.click("#st-p-torneio .tkth >> nth=2"); await pg.wait_for_timeout(300); print("escolheu 3º:",(await pg.evaluate(info,"p-torneio"))["tag"])
        await pg.click("#st-p-torneio .tkbig"); await pg.wait_for_timeout(400); print("visor:",await pg.evaluate("[$('#modalBox img')?.getAttribute('src'),$('#modalBox img')?.naturalWidth,$('#modalBox').innerText.includes('HBO')]")); await pg.screenshot(path=OUT+"F_view.png"); await pg.evaluate("closeModal()")
        await pg.evaluate("closeSheet()")
        # a escolha sobrevive a recarregar
        await pg.reload(); await pg.wait_for_timeout(1500); await pg.evaluate("try{endTour()}catch(e){}")
        print("depois de recarregar:",await pg.evaluate("[TK.m['p-torneio'].a,stillGet('p-torneio').u]"))
        # ocultar um frame e trazer de volta
        await pg.evaluate("openPhoto('p-bokar')"); await pg.wait_for_timeout(500); n0=(await pg.evaluate(info,"p-bokar"))["th"]
        await pg.click("#st-p-bokar button:has-text('Ocultar')"); await pg.wait_for_timeout(300); print("ocultar:",n0,"->",(await pg.evaluate(info,"p-bokar"))["th"],await pg.evaluate("[...FRH]"))
        await pg.evaluate("closeSheet()"); await pg.reload(); await pg.wait_for_timeout(1500); await pg.evaluate("try{endTour()}catch(e){}")
        print("oculto continua oculto:",await pg.evaluate("stillList('p-bokar').length"))
        await pg.evaluate("go('fotos')"); await pg.wait_for_timeout(400); print("aba fotos:",(await pg.inner_text("#takesCard")).replace("\n"," | ")[:260])
        await pg.click("#takesCard button:has-text('Mostrar de novo')"); await pg.wait_for_timeout(300); print("voltou:",await pg.evaluate("[stillList('p-bokar').length,FRH.size,store.get('frHide',[]).length]"))
        await pg.evaluate("$('#takesCard').scrollIntoView()"); await pg.screenshot(path=OUT+"F_takes.png")
        # print próprio soma com os da série; exportar leva só os seus
        await pg.evaluate("async()=>{const mk="+MK+";await setStill('p-purple',await mk('#b04','MEU'),true)}"); await pg.wait_for_timeout(300)
        print("purple:",await pg.evaluate("[stillList('p-purple').map(x=>x.b||'meu'),TK.m['p-purple'].a,stillUserN('p-purple')]"))
        await pg.evaluate("openPhoto('p-purple')"); await pg.wait_for_timeout(400); print("purple cartão:",await pg.evaluate(info,"p-purple")); await pg.evaluate("closeSheet()")
        await pg.reload(); await pg.wait_for_timeout(1500); await pg.evaluate("try{endTour()}catch(e){}")
        print("purple recarregado:",await pg.evaluate("[stillList('p-purple').map(x=>x.b||'meu'),TK.m['p-purple'].a]"))
        exp=await pg.evaluate("(()=>{const o={stills:{}};PH.forEach(p=>{const s=tkUser(TK.m[p.id]);if(s.length)o.stills[p.id]=s.length});return o})()"); print("exporta:",exp)
        # apagar o print volta para os frames
        await pg.evaluate("openPhoto('p-purple')"); await pg.wait_for_timeout(300); await pg.click("#st-p-purple button:has-text('Remover')"); await pg.wait_for_timeout(200)
        print("removeu print:",await pg.evaluate("[stillList('p-purple').length,stillUserN('p-purple'),FRH.size]")); await pg.evaluate("closeSheet()")
        # 4 prints no máximo, os frames não contam
        await pg.evaluate("async()=>{const mk="+MK+";for(const c of ['#111','#222','#333','#444','#555'])await setStill('p-pile',await mk(c,c),true)}"); print("limite:",await pg.evaluate("[stillList('p-pile').length,stillUserN('p-pile'),stillList('p-pile').filter(x=>x.b).length]"))
        # ficha do lugar: galeria de cenas
        await pg.evaluate("openLoc('lovr')"); await pg.wait_for_timeout(900)
        print("ficha lovr:",await pg.evaluate("[...document.querySelectorAll('#sheet .lfr img')].map(i=>[i.getAttribute('src').slice(7),i.naturalWidth>0])"))
        await pg.evaluate("$('#sheet .lfr').scrollIntoView({block:'center'})"); await pg.screenshot(path=OUT+"F_loc.png")
        await pg.click("#sheet .lfr button >> nth=1"); await pg.wait_for_timeout(300); print("ficha visor:",await pg.evaluate("$('#modalBox img')?.getAttribute('src')")); await pg.evaluate("closeModal();closeSheet()")
        print("lugares com cenas:",await pg.evaluate("Object.values(LBY).filter(l=>locFrames(l.id).length).map(l=>l.id+':'+locFrames(l.id).length).join(' ')"))
        # modo sem spoiler: galeria borrada até tocar
        await pg.evaluate("S.spoil=true;openLoc('walls')"); await pg.wait_for_timeout(500); hid=await pg.evaluate("$('#sheet .lfr').classList.contains('hide')")
        await pg.click("#sheet .lfr button"); await pg.wait_for_timeout(200); print("spoiler:",hid,"->",await pg.evaluate("[$('#sheet .lfr').classList.contains('hide'),!!$('#modalBox img')]"))
        await pg.evaluate("S.spoil=false;closeSheet()")
        # câmera: frame no canto e GUIA por cima
        await pg.evaluate("openCam('p-torneio')"); await pg.wait_for_timeout(2200)
        print("câmera:",await pg.evaluate("[$('#camStill').style.display,$('#camStill').style.backgroundImage,$('#camTk').textContent]"))
        for i in range(3):
            await pg.click("#camGh"); await pg.wait_for_timeout(250)
            if await pg.evaluate("CAM.ghost")==3: break
        print("guia take:",await pg.evaluate("[CAM.ghost,$('#camOp').style.display]")); await pg.screenshot(path=OUT+"F_cam.png")
        await pg.click("#camTk"); await pg.wait_for_timeout(200); print("troca take na câmera:",await pg.evaluate("[TK.m['p-torneio'].a,$('#camTk').textContent]")); await pg.click("#camX")
        # encaixe e lado a lado com um frame da série (canvas não pode ficar "sujo")
        await pg.evaluate("async()=>{const mk="+MK+";await DB.put({id:'f1',ph:'p-bokar',loc:'bokar',ts:Date.now(),blob:await mk('#7fa0b8','EU')})}")
        await pg.evaluate("viewFoto('f1')"); await pg.wait_for_timeout(500); print("foto: botões",await pg.evaluate("[!!$('#fitB'),!!$('#sbsB')]"))
        sbs=await pg.evaluate("async()=>{const o=(await DB.all()).find(x=>x.id==='f1');const r=await makeSBS(o,PH.find(x=>x.id==='p-bokar'));return r?(typeof r==='string'?r.slice(0,22):Object.keys(r).join(',')):String(r)}"); print("lado a lado:",sbs)
        await pg.click("#fitB"); await pg.wait_for_timeout(900); await pg.screenshot(path=OUT+"F_fit.png")
        print("encaixe:",await pg.evaluate("[!!$('#modalBox canvas'),$$('#modalBox [data-tk]').length]"))
        await pg.evaluate("closeModal()")
        # outros idiomas: nenhuma chave nova faltando
        for lg in ["en","es","de","fr","it"]:
            miss=await pg.evaluate("(lg)=>['frCredit','frCount','frMine','frZoom','frTag','frMineTag','frHide','frRestore','takesP','stillHave','stillHaveN'].filter(k=>!UI[lg][k])",lg)
            print(lg,"faltando:",miss)
        await pg.goto("http://localhost:8765/?lang=de"); await pg.wait_for_timeout(1400); await pg.evaluate("try{endTour()}catch(e){}"); await pg.evaluate("openPhoto('p-redkeep')"); await pg.wait_for_timeout(500)
        print("de:",(await pg.evaluate(info,"p-redkeep"))["cnt"],"|",(await pg.evaluate(info,"p-redkeep"))["tag"]); await pg.evaluate("$('#st-p-redkeep').scrollIntoView()"); await pg.screenshot(path=OUT+"F_de.png")
        print("frames com erro:",bad); print("ERRS",errs); await b.close()
asyncio.run(main())
