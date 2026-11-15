import asyncio
from playwright.async_api import async_playwright
from PIL import Image
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        shots=[]
        for w in (320,390):
          for lg in ['pt','en','es','de','fr','it']:
            ctx = await b.new_context(viewport={"width":w,"height":640}, device_scale_factor=2, is_mobile=True, has_touch=True,
                  geolocation={"latitude":42.64112,"longitude":18.10905,"accuracy":8}, permissions=["geolocation"])
            pg = await ctx.new_page(); await pg.goto(f"http://localhost:8765/?lang={lg}"); await pg.wait_for_timeout(900)
            await pg.evaluate("endTour(); startGPS(true)"); await pg.wait_for_timeout(900)
            f=f"/tmp/h_{w}_{lg}.png"; await pg.screenshot(path=f, clip={"x":0,"y":0,"width":w,"height":56}); shots.append(f)
            r = await pg.evaluate("(()=>{const b=document.querySelector('.brand b');const r=document.createRange();r.selectNodeContents(b);return [Math.round(r.getBoundingClientRect().width),b.clientWidth,getComputedStyle(b).fontSize]})()")
            print(w,lg,r)
            await ctx.close()
        ims=[Image.open(f) for f in shots]; W=max(i.width for i in ims)
        s=Image.new('RGB',(W,sum(i.height+6 for i in ims)),'#333');y=0
        for i in ims: s.paste(i,(0,y)); y+=i.height+6
        s.save('/tmp/hdr.png'); await b.close()
asyncio.run(main())
