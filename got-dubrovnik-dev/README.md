# GoT Dubrovnik — dev notes

Test scripts for the guide in `../got-dubrovnik` (Playwright + Chrome). They were written for a
sandbox with these assumptions; adjust paths when running elsewhere:

- the guide is served at `http://localhost:8765/` (`python3 -m http.server 8765` inside `got-dubrovnik/`)
- Chrome at `/usr/bin/google-chrome`; screenshots are written to `/home/claude/tests/`
- fake camera feed: `ffmpeg -loop 1 -i fake/scene.png -t 1 -r 10 -pix_fmt yuv420p fake/scene.y4m`
- `small.py` needs `_frame_test.html` next to index.html: a page with an iframe pointing at `index.html?lang=en`

| script | what it checks |
| --- | --- |
| `full.py` | tutorial, test mode, all places/photos, camera, routes, quiz, offline |
| `small.py` | small screen, dark theme, running inside an iframe (Claude artifact mode) |
| `i18n.py [langs]` | every screen in each language; flags Portuguese leftovers and missing keys |
| `rm.py mock\\|notiles\\|fallback` | real map with mocked tiles; fallback to the illustrated map |
| `v6.py` | pin clusters, street routes (mock router), outlines, photo guide, compare slider |
| `nav.py` | in-app walking navigation and the AR turn arrow (mock router) |
| `st.py` | scene still: inset, overlay, side-by-side export |
| `v7.py` | place links, report link, voice (mock speech), trip download with a real service worker + offline reload, conquest card |
| `v8.py` | paste a still from the clipboard, still opacity in the camera, photo-to-still match editor and export |
| `v9.py` | chosen take per mission: right episode and direct link to the scene |
| `v10.py` | clip links at the exact second, bulk still import with mission assignment, still pack export/import |
| `clean.py <lang>` | clean screenshots for sharing; `og.py` renders the social preview image |
