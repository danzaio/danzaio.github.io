# Home page source (danzaio.github.io)

The home page (`/` and `/pt-br/`) is generated from this folder. Everything else in the repo
(`/work`, `/lab`, `/notes`, `/contact`, `/deadlock`, `/riftplus`, ...) is untouched legacy output.

    cd site-src
    npm install
    node build.mjs            # one-off, minified -> ../index.html, ../pt-br/index.html, ../assets/site/{app.js,main.css}
    node build.mjs --watch    # rebuild on save (unminified + sourcemap)

- `content.mjs`  all copy, EN + PT-BR (single source of truth)
- `template.mjs` HTML for both languages
- `css/main.css` design system (paper / ink themes)
- `js/`          GSAP + ScrollTrigger + Lenis, WebGL hero (no three.js), terminal, command palette
- `images.mjs`   regenerates the optimized screenshots in `assets/site/img/` from `projects/*.png`

Preview: any static server from the repo root, e.g. `npx http-server . -p 4173 -c-1`.
