# v14: take ao vivo (player do YouTube embutido, parado no segundo certo) — com um player de mentira que fala o mesmo protocolo
import asyncio, json
from playwright.async_api import async_playwright
ARGS=["--no-sandbox","--use-fake-device-for-media-stream","--use-fake-ui-for-media-stream"]
FAKE="""<!doctype html><body style="margin:0;background:#234;color:#fff;font:20px sans-serif"><div id=o>player</div><script>
const q=new URLSearchParams(location.search);let st=-1,t=+q.get('start')||0,par=null,log=[];
const say=o=>{if(par)par.postMessage(JSON.stringify(o),'*')};const info=()=>say({event:'infoDelivery',info:{playerState:st,currentTime:t}});
const show=()=>{document.getElementById('o').textContent='state '+st+' t='+t+' '+log.join(',')};
addEventListener('message',e=>{let d;try{d=JSON.parse(e.data)}catch(_){return}par=e.source;
 if(d.event==='listening'){say({event:'onReady'});say({event:'initialDelivery',info:{playerState:st,currentTime:t}})}
 if(d.event==='command'){log.push(d.func);if(d.func==='playVideo'){if(location.pathname.includes('BROKEN')){say({event:'onError',info:150});return}st=1;t+=0.4;info();say({event:'onStateChange',info:1})}
  if(d.func==='pauseVideo'){st=2;info()}if(d.func==='seekTo'){t=d.args[0];info()}}show()});show()</script>"""
MK="""async(col,txt)=>{const c=document.createElement('canvas');c.width=600;c.height=800;const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,600,800);x.fillStyle='#fff';x.font='60px sans-serif';x.fillText(txt,30,80);return await new Promise(r=>c.toBlob(r,'image/png'))}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True, service_workers="block", permissions=["camera"])
        await ctx.route("https://tiles.openfreemap.org/**", lambda r: r.abort())
        reqs=[]
        async def yt(route): reqs.append(route.request.url); await route.fulfill(status=200,content_type="text/html",body=FAKE)
        await ctx.route("https://www.youtube-nocookie.com/**", yt)
        pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8765/?lang=pt"); await pg.wait_for_timeout(1500); await pg.evaluate("endTour()")
        st="(s)=>{const f=document.querySelector(s+' .ytbox iframe');return f?[f.dataset.ready,f.dataset.state,f.dataset.time,f.dataset.frozen,f.dataset.at]:null}"
        # missão: botões 📺 abrem o player dentro do cartão e ele para no segundo do take
        await pg.evaluate("openPhoto('p-bokar')"); await pg.wait_for_timeout(400)
        print("botões:",await pg.evaluate("[...document.querySelectorAll('#st-p-bokar .row > *')].map(a=>a.textContent.trim())"))
        await pg.click("#st-p-bokar button:has-text('1:34')"); await pg.wait_for_timeout(1500)
        print("missão:",await pg.evaluate(st,"#ytc-p-bokar"),"|",reqs[-1].split('/embed/')[1][:95])
        await pg.evaluate("$('#ytc-p-bokar').scrollIntoView()"); await pg.screenshot(path="Y_mission.png")
        await pg.click("#st-p-bokar button:has-text('2:15')"); await pg.wait_for_timeout(1300); print("outro momento:",await pg.evaluate(st,"#ytc-p-bokar"),await pg.evaluate("document.querySelectorAll('#sheet iframe').length"))
        await pg.evaluate("(()=>{const f=document.querySelector('#ytc-p-bokar iframe');f.dataset.time='';ytCmd(f,'seekTo',[200,true])})()"); await pg.wait_for_timeout(300)
        await pg.click("#ytc-p-bokar button:has-text('Voltar')"); await pg.wait_for_timeout(400); print("voltar ao frame:",await pg.evaluate(st,"#ytc-p-bokar"))
        await pg.evaluate("closeSheet()"); print("fechou, iframes:",await pg.evaluate("document.querySelectorAll('iframe').length"))
        # erro do player -> link para o YouTube
        await pg.evaluate("YT['p-pile']=[['BROKEN',12]];openPhoto('p-pile')"); await pg.wait_for_timeout(300); await pg.click("#st-p-pile button:has-text('0:12')"); await pg.wait_for_timeout(1500)
        print("erro:",(await pg.inner_text("#ytc-p-pile")).replace("\n"," | ")[:120]); await pg.evaluate("closeSheet()")
        # sem internet
        await ctx.set_offline(True); await pg.evaluate("openPhoto('p-bokar')"); await pg.wait_for_timeout(300); await pg.click("#st-p-bokar button:has-text('1:34')"); await pg.wait_for_timeout(300)
        print("offline:",await pg.evaluate("[$('#toast').textContent,document.querySelectorAll('iframe').length]")); await ctx.set_offline(False); await pg.evaluate("closeSheet()")
        # foto pronta: take em cima da foto
        await pg.evaluate("async()=>{const mk="+MK+";await DB.put({id:'f1',ph:'p-bokar',loc:'bokar',ts:Date.now(),blob:await mk('#7fa0b8','EU')})}")
        await pg.evaluate("viewFoto('f1')"); await pg.wait_for_timeout(400); await pg.click("#modalBox button:has-text('1:34')"); await pg.wait_for_timeout(1500)
        print("foto:",await pg.evaluate(st,"#vfYT"),"ordem ok:",await pg.evaluate("$('#vfYT').getBoundingClientRect().top<$('#vfImg').getBoundingClientRect().top")); await pg.screenshot(path="Y_photo.png")
        await pg.evaluate("closeModal()"); print("fechou modal, iframes:",await pg.evaluate("document.querySelectorAll('iframe').length"))
        # câmera: 📺 mostra o player no canto, toca de novo troca de momento, depois fecha
        await pg.evaluate("openCam('p-bokar')"); await pg.wait_for_timeout(2200); print("cam botão:",await pg.evaluate("[$('#camYTb').style.display,$('#camYTb').textContent]"))
        await pg.click("#camYTb"); await pg.wait_for_timeout(1500); print("cam 1:",await pg.evaluate(st,"#camYT"),await pg.inner_text("#camYTb"),await pg.evaluate("Math.round($('#camYT').getBoundingClientRect().width)")); await pg.screenshot(path="Y_cam.png")
        await pg.click("#camYTb"); await pg.wait_for_timeout(1300); print("cam 2:",await pg.evaluate(st,"#camYT"),await pg.inner_text("#camYTb"))
        await pg.click("#camYTb"); await pg.wait_for_timeout(400); print("cam off:",await pg.evaluate("[$('#camYT').style.display,document.querySelectorAll('iframe').length,$('#camYTb').textContent]"))
        await pg.click("#camYTb"); await pg.wait_for_timeout(600); await pg.click("#camX"); await pg.wait_for_timeout(300); print("fechou câmera:",await pg.evaluate("document.querySelectorAll('iframe').length"))
        await pg.evaluate("openCam('p-srd')"); await pg.wait_for_timeout(1200); print("missão sem clipe:",await pg.evaluate("$('#camYTb').style.display")); await pg.click("#camX")
        print("ERRS",errs); await b.close()
asyncio.run(main())
