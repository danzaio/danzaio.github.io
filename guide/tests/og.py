import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        pg = await b.new_page(viewport={"width":1200,"height":630}, device_scale_factor=1)
        await pg.goto("file:///home/claude/tests/og.html"); await pg.wait_for_timeout(600)
        await pg.screenshot(path="/home/claude/porto-real/og.png")
        await b.close()
asyncio.run(main())
