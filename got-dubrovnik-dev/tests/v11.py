# v11: vários takes por missão, guardados em IndexedDB; migração do formato antigo; persistência após recarregar
import asyncio, json
from playwright.async_api import async_playwright
MK="""async(col,txt)=>{const c=document.createElement('canvas');c.width=640;c.height=360;const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,640,360);x.fillStyle='#222';x.fillRect(200,120,240,240);x.fillStyle='#fff';x.font='60px sans-serif';x.fillText(txt,30,80);return await new Promise(r=>c.toBlob(r,'image/png'))}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block")
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500)
        # formato antigo no localStorage -> migra para o IndexedDB ao abrir
        await pg.evaluate("async()=>{const mk="+MK+";const bl=await mk('#a55','VELHO');const u=await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(bl)});store.set('still_p-bokar',{u,w:640,h:360})}")
        print("chave antiga:",await pg.evaluate("Object.keys(localStorage).filter(k=>k.includes('still'))"))
        await pg.reload(); await pg.wait_for_timeout(1800); await pg.evaluate("endTour()")
        print("migrado:",await pg.evaluate("[TK.ok,!!TK.db,stillList('p-bokar').length,store.get('still_p-bokar',null)]"))
        # quatro takes numa missão, o quinto substitui o ativo
        for i,c in enumerate(['#c9a36b','#8fb0c9','#99b38f','#b08fc9','#c98f8f']):
            await pg.evaluate("async([c,t])=>{const mk="+MK+";await setStill('p-torneio',await mk(c,t),true)}",[c,'T'+str(i+1)])
            print(i+1,await pg.evaluate("[stillList('p-torneio').length,TK.m['p-torneio'].a]"))
        await pg.evaluate("openPhoto('p-torneio')"); await pg.wait_for_timeout(400)
        print("miniaturas:",await pg.evaluate("[document.querySelectorAll('#st-p-torneio .tkth').length,document.querySelectorAll('#st-p-torneio .tkth.on').length]"))
        a0=await pg.evaluate("stillGet('p-torneio').u.length")
        await pg.click("#st-p-torneio .tkth:nth-child(2)"); await pg.wait_for_timeout(200)
        print("escolheu 2:",await pg.evaluate("TK.m['p-torneio'].a"),"links:",await pg.evaluate("[...document.querySelectorAll('#st-p-torneio a')].map(a=>a.textContent.trim())"))
        await pg.evaluate("$('#st-p-torneio').scrollIntoView()"); await pg.screenshot(path="K_multi.png")
        await pg.evaluate("[...document.querySelectorAll('#st-p-torneio button')].find(b=>b.textContent.includes('✕')).click()"); await pg.wait_for_timeout(200)
        print("removeu:",await pg.evaluate("[stillList('p-torneio').length,TK.m['p-torneio'].a]"))
        # o mesmo arquivo duas vezes não duplica
        await pg.evaluate("async()=>{const mk="+MK+";const bl=await mk('#123','DUP');await setStill('p-pile',bl,true);await setStill('p-pile',bl,true)}"); print("sem duplicar:",await pg.evaluate("stillList('p-pile').length"))
        # persiste após recarregar
        await pg.reload(); await pg.wait_for_timeout(1800)
        print("após recarregar:",await pg.evaluate("[stillList('p-torneio').length,TK.m['p-torneio'].a,stillList('p-bokar').length,stillList('p-pile').length,takesN()]"))
        # câmera e encaixe usam o take ativo
        await pg.evaluate("async()=>{const mk="+MK+";const bl=await mk('#7fa0b8','EU');await DB.put({id:'f1',ph:'p-torneio',loc:'lovr',ts:Date.now(),blob:bl})}")
        await pg.evaluate("viewFoto('f1')"); await pg.wait_for_timeout(400); print("viewer:",await pg.evaluate("[!!$('#fitB'),!!$('#sbsB')]"))
        await pg.click("#fitB"); await pg.wait_for_timeout(500)
        print("encaixe usa o ativo:",await pg.evaluate("$('#fitS').style.backgroundImage.length===('url(\"'+stillGet('p-torneio').u+'\")').length"))
        # pacote v2 leva todos os takes; importa também o formato v1
        await pg.evaluate("closeModal();go('fotos')"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{saveBlob=(b,n)=>{window._pk=b}})()"); await pg.click("#tkExp"); await pg.wait_for_timeout(300)
        pk=json.loads(await pg.evaluate("_pk.text()")); print("pacote v",pk['v'],{k:len(v) for k,v in pk['stills'].items()})
        open('/tmp/takes_v2.json','w').write(json.dumps(pk)); one=pk['stills']['p-bokar'][0]; open('/tmp/takes_v1.json','w').write(json.dumps({'v':1,'stills':{'p-arena':one}}))
        await pg.evaluate("PH.forEach(p=>{while(stillList(p.id).length)stillDel(p.id,0)});takesUI()")
        for f in ['/tmp/takes_v2.json','/tmp/takes_v1.json']:
            async with pg.expect_file_chooser() as fc: await pg.click("#tkImp")
            await (await fc.value).set_files(f); await pg.wait_for_timeout(700)
            print("importou",f[-7:],await pg.evaluate("[takesN(),PH.map(p=>stillList(p.id).length).join('')]"))
        # sem IndexedDB: cai para o localStorage
        pg2=await ctx.new_page(); await pg2.add_init_script("Object.defineProperty(window,'indexedDB',{get(){throw new Error('blocked')}})")
        await pg2.goto("http://localhost:8765/?lang=pt"); await pg2.wait_for_timeout(1500)
        await pg2.evaluate("async()=>{const mk="+MK+";await setStill('p-arena',await mk('#456','LS'),true)}")
        print("sem IDB:",await pg2.evaluate("[TK.ok,!!TK.db,stillList('p-arena').length,!!store.get('still_p-arena',null)]"))
        print("ERRS",errs); await b.close()
asyncio.run(main())
