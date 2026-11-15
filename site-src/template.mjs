import { CONTENT, PROJECTS, SITE } from "./content.mjs";

// Home v4: a proof sheet. Every section is a plate with a slug line and crop marks.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const svg = (inner, cls = "ico", extra = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${inner}</svg>`;

const I = {
  ur: svg('<path d="M7 17 17 7M8 7h9v9"/>', "ico ico-ur"),
  up: svg('<path d="M12 19V5M5 12l7-7 7 7"/>'),
  down: svg('<path d="M12 5v14M5 12l7 7 7-7"/>'),
  moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', "ico ico-moon"),
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', "ico ico-sun"),
  gh: svg('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'),
  term: svg('<path d="M4 17l6-6-6-6M12 19h8"/>'),
  bag: svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>'),
  menu: svg('<path d="M4 8h16M4 16h16"/>', "ico ico-menu"),
  x: svg('<path d="M6 6l12 12M18 6 6 18"/>', "ico ico-x"),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
};
// registration mark: the printer's target, used as the page's bullet
const REG = `<svg class="reg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="6.5"/><path d="M12 .5v23M.5 12h23"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/></svg>`;
const CBAR = `<span class="cbar" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`;

const arrowInline = `<svg class="tag-arrow" viewBox="0 0 24 12" width="22" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 6h20M16 1l5 5-5 5"/></svg>`;
const tagHtml = (parts) => parts.map(esc).join(arrowInline);
const pad = (n) => String(n).padStart(2, "0");
const ext = `target="_blank" rel="noopener"`;

/* ----------------------------------------------------------------- pieces */
function slug(c, num, label) {
  return `<div class="slug section-label">${REG}<span class="num">${num}</span><span class="lbl">${esc(label)}</span><i class="rule" aria-hidden="true"></i><span class="pn">${esc(c.ui.plate)} ${num} / 06</span>${CBAR}</div>`;
}
function secHead(title, lead, id) {
  return `<header class="sec-head"><h2 class="sec-title" id="${id}" data-scrub>${esc(title)}</h2><p class="sec-lead" data-fade>${esc(lead)}</p></header>`;
}

function top(c) {
  const alt = c.lang === "en" ? "pt-BR" : "en";
  const links = [...c.nav, { href: "#contact", label: c.contactLabel }];
  return `<header class="top" data-header>
    <div class="top-in shell">
      <a class="brand" href="#top" data-cursor="TOP"><span class="mark" aria-hidden="true">DZ</span><span class="brand-name">Danzaio<span>${esc(c.hero.year)}</span></span></a>
      <span class="top-sec" aria-hidden="true"><b></b><span data-top-txt>00 / ${esc(c.ui.index)}</span></span>
      <div class="top-act">
        <button class="kbd-btn" type="button" data-palette-open aria-label="${esc(c.ui.palette)}"><span data-kbd aria-hidden="true">Ctrl K</span></button>
        <a class="lang-link" href="${c.altPath}" hreflang="${alt}" lang="${alt}" title="${esc(c.ui.switchLang)}">${c.altCode}</a>
        <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="${esc(c.ui.theme)}">${I.moon}${I.sun}</button>
        <a class="btn btn-lime btn-sm contact-btn" href="${SITE.github}" ${ext} data-magnetic><span>${esc(c.contactLabel)}</span>${I.ur}</a>
        <button class="icon-btn menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(c.ui.menu)}">${I.menu}${I.x}</button>
      </div>
    </div>
    <div class="progress" aria-hidden="true"><i data-progress></i></div>
  </header>
  <nav class="dock" data-dock aria-label="Sections">${c.nav.map((n, i) => `<a href="${n.href}" data-nav aria-label="${esc(n.label)}"><b>${pad(i + 1)}</b><span>${esc(n.label)}</span></a>`).join("")}<a class="dock-go" href="#contact" data-nav aria-label="${esc(c.contactLabel)}"><b>06</b><span>${esc(c.contactLabel)}</span>${I.ur}</a></nav>
  <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
    <nav aria-label="Mobile">${links.map((n, i) => `<a href="${n.href}" data-mm-link><span class="mm-n">${pad(i + 1)}</span>${esc(n.label)}</a>`).join("")}</nav>
    <div class="mm-foot">
      <a class="mm-lang" href="${c.altPath}" hreflang="${alt}" lang="${alt}"><b>${esc(c.altLabel)}</b><span>${c.altCode}</span></a>
      <button class="mm-pal" type="button" data-mm-palette>${esc(c.ui.palette)}</button>
    </div>
  </div>`;
}

/* ------------------------------------------------------------- the cover */
function hero(c) {
  const h = c.hero;
  const p0 = PROJECTS[0];
  const w0 = c.work.items[0];
  const nf = c.system.term.neofetch;
  const words = h.line2.split(" ");
  const last = words.pop();
  const first = words.join(" ");
  const meta = [
    [h.metaK[0], h.role],
    [h.metaK[1], nf.focus],
    [h.metaK[2], nf.stack],
  ];
  return `<section id="top" class="hero" aria-labelledby="hero-title" data-hero>
    <canvas class="hero-gl" data-hero-gl aria-hidden="true"></canvas>
    <div class="hero-in shell">
      <div class="slug" data-hero-in>${REG}<span class="num">${esc(c.ui.proof)}</span><span class="lbl">${esc(h.eyebrow)}</span><i class="rule" aria-hidden="true"></i><span class="pn">${esc(h.year)}</span>${CBAR}</div>
      <div class="hero-copy">
        <h1 id="hero-title" class="hero-title" aria-label="${esc(h.line1 + " " + h.line2)}">
          <span class="l1" aria-hidden="true" data-ht-host><span class="ht-word" data-ht>${esc(h.line1)}</span><span class="ht-solid" data-ht-solid>${esc(h.line1)}</span></span>
          <span class="l2" aria-hidden="true">${first ? `<span class="ln-in" data-split="chars">${esc(first)}</span> ` : ""}<span class="hl"><span class="ln-in" data-split="chars">${esc(last)}</span></span></span>
        </h1>
        <p class="hero-sub" data-hero-in>${esc(h.sub)}</p>
        <div class="hero-cta" data-hero-in>
          <a class="btn btn-ink" href="#work" data-magnetic><span>${esc(h.cta1)}</span>${I.ur}</a>
          <a class="btn btn-line" href="${SITE.github}" ${ext} data-magnetic>${I.gh}<span>${esc(h.cta2)}</span></a>
        </div>
      </div>
      <a class="reel cm" href="${p0.repo}" ${ext} aria-label="${esc(w0.title + ". " + w0.kicker)}" data-reel data-tilt data-cursor="${esc(c.ui.open)}">
        <span class="reel-head"><span class="reel-live"><i></i>${esc(h.reel)}</span><span><b data-reel-n>01</b> / ${pad(PROJECTS.length)}</span></span>
        <span class="reel-img"><img src="/assets/site/img/${p0.img}" width="${p0.imgW}" height="${p0.imgH}" alt="" fetchpriority="high" decoding="async"/><canvas class="wipe-gl" data-reel-gl aria-hidden="true"></canvas></span>
        <span class="reel-foot"><b data-reel-title>${esc(w0.title.toUpperCase())}</b><span data-reel-kicker>${esc(w0.kicker.toUpperCase())}</span><span class="arrow-chip" aria-hidden="true">${I.ur}</span><i class="reel-bar" data-reel-bar aria-hidden="true"></i></span>
      </a>
      <div class="hero-foot" data-hero-in>${meta.map(([k, v]) => `<dl><dt>${esc(k)}</dt><dd>${esc(v)}</dd></dl>`).join("")}<a class="hero-scroll" href="#loop">${REG}<span>${esc(c.ui.scroll)}</span></a></div>
    </div>
  </section>`;
}

function strip(c) {
  const group = c.marquee.map((w, i) => `<span class="st-item${i % 2 ? " ht-word" : ""}">${esc(w)}</span>${REG}`).join("");
  return `<div class="strip" data-strip aria-hidden="true"><div class="strip-track"><div class="strip-group">${group}</div><div class="strip-group">${group}</div><div class="strip-group">${group}</div></div></div>`;
}

/* -------------------------------------------- plate 01: the loop (kept from v3) */
const CODE = [
  '<i>// price-watch.ts</i>',
  '<b>const</b> deal = <b>await</b> feed.watch(sku)',
  '<b>if</b> (deal.drop >= rule.min) {',
  '  <b>await</b> notify(user, deal)',
  '}',
  '',
  '<b>export const</b> checkout =',
  '  stripe.session({ mode: <u>"payment"</u> })',
  '',
  '<i>// alerts.test.ts</i>',
  'test(<u>"alert fires on a real drop"</u>, () => {',
  '  expect(sent).toBe(<b>true</b>)',
  '})',
  '',
  '<em>✓ auth</em>',
  '<em>✓ price feed</em>',
  '<em>✓ alerts</em>',
  '<em>✓ checkout</em>',
]
  .map((l) => `<span>${l || "&nbsp;"}</span>`)
  .join("");

function loop(c) {
  const l = c.loop;
  const total = pad(l.beats.length);
  const beats = l.beats
    .map((b, i) => `<li class="beat" data-beat="${i}"><span class="beat-n">${pad(i + 1)} / ${total}</span><h3>${esc(b.t)}</h3><p>${esc(b.d)}</p></li>`)
    .join("");
  const rail = l.beats.map((b, i) => `<i style="--i:${i}"></i>`).join("");
  const [ia, ib = ""] = l.idea.split(l.ideaMark);
  const idea = `“${esc(ia)}<mark>${esc(l.ideaMark)}</mark>${esc(ib)}”`;
  const rows = [
    ["$129", "−32%", 1],
    ["$48", "−12%", 0],
    ["$310", "−8%", 0],
  ]
    .map(([p, d, hot]) => `<li data-ls-row><i class="th"></i><span class="tx"><i></i><i></i></span><b>${p}</b><em${hot ? ' class="hot"' : ""}>${d}</em></li>`)
    .join("");
  const bars = [34, 46, 40, 58, 52, 74, 92].map((h, i) => `<rect x="${6 + i * 16}" y="${100 - h}" width="11" height="${h}" rx="2"${i === 6 ? ' class="hot"' : ""}/>`).join("");
  const checks = l.checks.map((x) => `<li data-ls-check><b>✓</b>${esc(x)}</li>`).join("");
  return `<section id="loop" class="loop" aria-labelledby="loop-title">
    <div class="scene-track" data-loop>
      <div class="scene-sticky shell">
        <div class="scene-left">
          ${slug(c, l.num, l.label)}
          <h2 id="loop-title" class="scene-title">${esc(l.title)}</h2>
          <ol class="beats">${beats}</ol>
          <div class="scene-rail" data-loop-rail aria-hidden="true">${rail}</div>
        </div>
        <div class="scene-right">
          <div class="ls" data-loop-stage data-status="${esc(JSON.stringify(l.status))}" aria-hidden="true">
            <div class="ls-bar"><i></i><i></i><i></i><span class="ls-file">${esc(l.file)}</span><span class="ls-demo">${esc(l.demo)}</span><span class="ls-status" data-ls-state="3"><b></b><span data-ls-status>${esc(l.status[3])}</span></span></div>
            <div class="ls-body">
              <div class="ls-dots" data-ls-dots></div>
              <div class="ls-note" data-ls-note><span class="ls-k">${esc(l.ideaLabel)}</span><p data-ls-idea>${idea}</p></div>
              <div class="ls-app is-built" data-ls-app>
                <div class="la-top">
                  <span class="la-box la-logo" data-ls-box><i data-ls-fill></i><span class="la-tag" data-ls-tag>${esc(l.tags[0])}</span></span>
                  <span class="la-box la-nav" data-ls-box><i data-ls-fill></i><i data-ls-fill></i><i data-ls-fill></i></span>
                  <span class="la-box la-cta" data-ls-box><b data-ls-fill>${esc(l.cta)}</b><span class="la-tag" data-ls-tag>${esc(l.tags[3])}</span></span>
                </div>
                <div class="la-mid">
                  <div class="la-box la-chart" data-ls-box>
                    <svg viewBox="0 0 120 100" preserveAspectRatio="none"><g data-ls-bars>${bars}</g><path data-ls-trend pathLength="1" d="M8 70 28 58 44 62 60 44 76 48 92 28 112 10"/></svg>
                    <span class="la-tag" data-ls-tag>${esc(l.tags[1])}</span>
                  </div>
                  <div class="la-box la-list" data-ls-box>
                    <ul>${rows}</ul>
                    <span class="la-tag" data-ls-tag>${esc(l.tags[2])}</span>
                  </div>
                </div>
              </div>
              <div class="ls-code" data-ls-code><div class="lc-in" data-ls-codein>${CODE}</div><div class="lc-bar"><i data-ls-build></i></div></div>
              <div class="ls-phone" data-ls-phone>
                <i class="lp-notch"></i>
                <div class="lp-notif" data-ls-notif><span><i></i>${esc(l.notif.app)}</span><strong>${esc(l.notif.title)}</strong><p>${esc(l.notif.body)}</p><em>${esc(l.notif.action)}</em></div>
                <div class="lp-sk"><i></i><i></i><i></i></div>
              </div>
              <ul class="ls-checks">${checks}</ul>
              <div class="ls-stamp" data-ls-stamp>${esc(l.stamp)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ----------------------------------------------------- plate 02: selected work */
function work(c) {
  const w = c.work;
  const total = pad(PROJECTS.length);
  const items = PROJECTS.map((p, i) => {
    const t = w.items[i];
    const links = `<a class="btn btn-ink btn-sm" href="${p.repo}" ${ext} data-magnetic><span>${esc(c.ui.repo)}</span>${I.ur}</a>${
      p.live ? `<a class="btn btn-line btn-sm" href="${p.live}" ${ext} data-magnetic><span>${esc(c.ui.live)}</span>${I.ur}</a>` : ""
    }`;
    return `<li class="wk${i === 0 ? " on" : ""}" data-wk-item="${i}">
      <div class="wk-row"><span class="wk-n">${pad(i + 1)}</span><h3 class="wk-title">${esc(t.title)}</h3><span class="wk-kick">${esc(t.kicker)}</span></div>
      <div class="wk-more"><div class="wk-more-in"><p class="wk-text">${esc(t.text)}</p><dl class="why"><dt>${esc(c.ui.why.toUpperCase())}</dt><dd>${esc(t.why)}</dd></dl><div class="wk-links">${links}</div></div></div>
      <a class="wk-shot" href="${p.live || p.repo}" ${ext} data-cursor="${esc(c.ui.open)}" tabindex="-1"><span class="frame${p.tall ? " is-tall" : ""}"><span class="frame-bar"><i></i><i></i><i></i><span class="url">${esc(p.url)}</span></span><span class="frame-body"><img src="/assets/site/img/${p.img}" width="${p.imgW}" height="${p.imgH}" alt="${esc(t.title)} screenshot" loading="lazy" decoding="async"/></span></span></a>
    </li>`;
  }).join("");
  const p0 = PROJECTS[0];
  return `<section id="work" class="plate work" aria-labelledby="work-title">
    <div class="shell">${slug(c, w.num, w.label)}${secHead(w.title, w.lead, "work-title")}</div>
    <div class="wk-track" data-wk>
      <div class="wk-sticky shell">
        <div class="wk-left"><ol class="wk-list">${items}</ol><p class="wk-hint" aria-hidden="true">${I.down}${esc(w.hint)}</p></div>
        <div class="wk-stage cm" data-wk-stage aria-hidden="true">
          <span class="frame-bar"><i></i><i></i><i></i><span class="url" data-wk-url>${esc(p0.url)}</span><span class="wk-count"><b data-wk-n>01</b> / ${total}</span></span>
          <span class="wk-view"><img data-wk-img src="/assets/site/img/${p0.img}" width="${p0.imgW}" height="${p0.imgH}" alt="" loading="lazy" decoding="async"/><canvas class="wipe-gl" data-wk-gl></canvas></span>
          <span class="wk-meter">${PROJECTS.map(() => "<i></i>").join("")}</span>
        </div>
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------- plate 03: services */
// shared scene parts: the stage's title bar, a beat, the rail, a pointer that clicks
const lsBar = (file, demo, state, label) =>
  `<div class="ls-bar"><i></i><i></i><i></i><span class="ls-file">${esc(file)}</span><span class="ls-demo">${esc(demo)}</span><span class="ls-status" data-ls-state="${state}"><b></b><span data-ls-status>${esc(label)}</span></span></div>`;
const beat = (i, n, kick, word, text, tag) =>
  `<li class="beat" data-beat="${i}"><span class="beat-n">${pad(i + 1)} / ${pad(n)}<i aria-hidden="true"></i>${esc(kick)}</span><h3>${esc(word)}</h3><p>${esc(text)}</p>${tag ? `<span class="beat-tag">${tag}</span>` : ""}</li>`;
const rail = (n) => `<div class="scene-rail" style="--n:${n}" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div>`;
const POINTER = `<span class="sv-cur" data-cur><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 2.5 19.5 11l-6.6 1.9L9.6 19.8z"/></svg></span>`;
const JACKET = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M23 9 32 14l9-5 12 7-4 13-6-3v29H21V26l-6 3-4-13z"/><path d="M32 14v39M27 33h-3M40 33h-3" fill="none"/></svg>`;

function services(c) {
  const s = c.services;
  const v = s.scene;
  const n = s.items.length;
  const beats = s.items.map((it, i) => beat(i, n, it.title, v.status[i], it.text, tagHtml(it.tag)).replace('<li class', `<li id="cap-${it.id}" class`)).join("");
  // SaaS: sidebar, counting KPIs, revenue line, invoices
  const saas = `<div class="ss-side" data-ss-side><span class="ss-brand"><b></b>${esc(v.brand)}</span><ul>${v.nav.map((x, i) => `<li${i ? "" : ' class="on"'}>${esc(x)}</li>`).join("")}</ul><i class="ss-meter"><i></i></i></div>
    <div class="ss-kpis">${v.kpi.map(([k, val]) => `<div class="sv-card ss-kpi" data-ss-kpi><span>${esc(k)}</span><b data-count>${esc(val)}</b></div>`).join("")}</div>
    <div class="sv-card ss-chart" data-ss-chart><span class="sv-k">${esc(v.kpi[1][0])}</span><svg viewBox="0 0 200 100" preserveAspectRatio="none"><path class="g" d="M0 25H200M0 50H200M0 75H200"/><path class="a" data-ss-area d="M0 100V82L25 76 50 80 75 60 100 64 125 44 150 48 175 24 200 12V100Z"/><path class="ln" data-ss-line d="M0 82 25 76 50 80 75 60 100 64 125 44 150 48 175 24 200 12"/></svg></div>
    <div class="sv-card ss-rows"><ul>${v.rows.map(([t, st], i) => `<li data-ss-row><i></i><span>${esc(t)}</span><em class="${i < 2 ? "ok" : "due"}" data-ss-pill>${esc(st)}</em></li>`).join("")}</ul></div>`;
  // Mobile: delivery route, the phone, a push that breaks out of it
  const mob = `<div class="sv-card sm-map" data-sm-map><svg viewBox="0 0 340 400" aria-hidden="true"><path class="road" d="M0 120H340M0 270H340M105 0V400M235 0V400M0 380 340 20"/><path class="rt" data-sm-route d="M48 342C98 318 60 236 150 222S252 160 292 62"/><circle class="pin" cx="48" cy="342" r="10"/><circle class="pin end" cx="292" cy="62" r="12"/><circle class="van" data-sm-van cx="292" cy="62" r="14"/></svg><span class="sm-cap"><b>${esc(v.cards[0][0])}</b>${esc(v.cards[0][1])}</span></div>
    <div class="sm-phone" data-sm-phone><i class="lp-notch"></i><div class="sm-screen"><b class="sm-h">${esc(v.today)}</b>${v.cards.map(([t, st], i) => `<div class="sm-card" data-sm-card><i></i><span><b>${esc(t)}</b>${esc(st)}</span><em style="--w:${i ? 100 : 66}%"></em></div>`).join("")}<div class="sm-promo" data-sm-card><i></i><i></i><i></i></div><span class="sm-tap" data-sm-tap></span><span class="sm-tabs">${v.tabs.map((x, i) => `<span${i === 1 ? ' class="on"' : ""}><i></i>${esc(x)}</span>`).join("")}</span></div></div>
    <div class="sm-notif" data-sm-notif><span><i></i>${esc(v.notif[0])}</span><strong>${esc(v.notif[1])}</strong><p>${esc(v.notif[2])}</p></div>
    <div class="sm-os" data-sm-os><span>iOS</span><span>Android</span></div>`;
  // Commerce: product, add to cart, pay, receipt
  const shop = `<div class="sc-top" data-sc-top><b class="sc-logo"></b><span>Acme</span><span class="sc-bag">${I.bag}<b data-sc-badge>1</b></span></div>
    <div class="sv-card sc-prod" data-sc-prod><div class="sc-img">${JACKET}</div><div class="sc-info"><b>${esc(v.product[0])}</b><span class="sc-price">${esc(v.product[1])}</span><span class="sc-sizes"><i>S</i><i class="on">M</i><i>L</i></span><span class="sc-add" data-sc-add>${esc(v.product[2])}</span></div></div>
    <div class="sv-card sc-cart" data-sc-cart><b class="sc-h">${esc(v.cart[0])}</b><div class="sc-line"><i></i><span>${esc(v.product[0])}<small>M</small></span><b>${esc(v.product[1])}</b></div><div class="sc-sub"><span>${esc(v.cart[1])}</span><b>${esc(v.product[1])}</b></div><span class="sc-pay is-paid" data-sc-pay><span class="a">${esc(v.cart[2])}</span><span class="b">✓ ${esc(v.cart[3])}</span></span></div>
    <div class="sc-receipt" data-sc-receipt><b>✓</b><span>${esc(v.cart[4])}</span><i></i><i></i></div>
    <span class="sc-plus" data-sc-plus>+1</span>${POINTER}`;
  // AI: an agent run drawn as a graph, its log, a human approval
  const NODE = [[9, 16.5], [31, 16.5], [56, 7], [56, 26], [84, 16.5]];
  const EDGE = ["M15.5 16.5H24.5", "M37.5 16.5C44 16.5 43 7 49.5 7", "M37.5 16.5C44 16.5 43 26 49.5 26", "M62.5 7C70 7 70 16.5 77.5 16.5", "M62.5 26C70 26 70 16.5 77.5 16.5"];
  const ai = `<div class="sa-graph"><svg viewBox="0 0 94 33" preserveAspectRatio="none" aria-hidden="true">${EDGE.map((d) => `<path data-sa-edge d="${d}"/>`).join("")}</svg>${v.nodes.map((x, i) => `<span class="sa-node" data-sa-node style="left:${NODE[i][0]}cqi;top:${NODE[i][1]}cqi"><i></i>${esc(x)}</span>`).join("")}</div>
    <div class="sa-log"><span class="sv-k">agent.run</span>${v.log.map((x, i) => `<span class="sa-ln" data-sa-ln><i>${pad(i + 1)}</i>${esc(x)}</span>`).join("")}</div>
    <div class="sa-ok" data-sa-ok><span class="sv-k">${esc(v.nodes[4])}</span><i></i><i></i><i></i><b data-sa-approved>✓ ${esc(v.approve)}</b></div>`;
  const layers = [saas, mob, shop, ai].map((h, i) => `<div class="sv-l sv-l${i}" data-sv-l data-n="${pad(i + 1)}">${h}</div>`).join("");
  return `<section id="services" class="plate services" aria-labelledby="services-title">
    <div class="scene-track" data-scene="services" style="--beats:4.6">
      <div class="scene-sticky shell">
        <div class="scene-left">
          ${slug(c, s.num, s.label)}
          <h2 id="services-title" class="scene-title">${esc(s.title)}</h2>
          <p class="scene-lead">${esc(s.lead)}</p>
          <ol class="beats">${beats}</ol>
          ${rail(n)}
        </div>
        <div class="scene-right">
          <div class="ls sv" data-stage data-status="${esc(JSON.stringify([...v.status, v.done]))}" aria-hidden="true">
            ${lsBar(v.file, v.demo, 3, v.done)}
            <div class="ls-body sv-body is-sheet" data-sv-body>${layers}<i class="sv-sweep" data-sweep></i></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------- plate 04: workbench */
const SWATCH = [
  ["paper", "#F1EEE4"],
  ["ink", "#151612"],
  ["lime", "#C9FF2F"],
  ["orange", "#FF5D2C"],
  ["lilac", "#C6BBEF"],
];
function bench(c) {
  const s = c.system;
  const chips = s.chips.map((x) => `<button type="button" class="chip" data-chip="${esc(x)}">${esc(x)}</button>`).join("");
  const stack = s.stack.map((x, i) => `<li><span class="n">${pad(i + 1)}</span><div><b>${esc(x.t)}</b><span>${esc(x.d)}</span></div></li>`).join("");
  const sw = SWATCH.map(([k, hex], i) => `<button type="button" class="swatch sw-${k}" data-swatch="${hex}" aria-label="${esc(s.swatchNames[i])} ${hex}"><i></i><span>${esc(s.swatchNames[i])}</span><small>${hex}</small></button>`).join("");
  return `<section id="bench" class="plate bench shell" aria-labelledby="bench-title">
    ${slug(c, s.num, s.label)}${secHead(s.title, s.lead, "bench-title")}
    <div class="bench-grid">
      <div class="term cm" data-terminal>
        <div class="term-bar"><span class="term-title">${I.term}<span>${esc(s.consoleTitle.toUpperCase())}</span></span><span class="term-path">${esc(s.consolePath)}</span></div>
        <div class="term-body" data-term-body role="log" aria-live="polite" tabindex="0"></div>
        <div class="term-chips" aria-label="Quick commands">${chips}</div>
        <form class="term-form" data-term-form autocomplete="off">
          <label class="term-prompt" for="term-in">${esc(s.prompt)}</label>
          <input id="term-in" data-term-input type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${esc(s.placeholder)}"/>
          <button class="term-send" type="submit" aria-label="${esc(s.send)}">${I.up}</button>
        </form>
      </div>
      <aside class="spec" aria-labelledby="stack-title">
        <div class="spec-head"><h3 id="stack-title">${esc(s.stackTitle)}</h3><span>${pad(s.stack.length)} / ${pad(s.stack.length)}</span></div>
        <ol class="spec-list">${stack}</ol>
        <div class="cb"><p class="cb-hint">${esc(s.swatchHint)}</p><div class="swatches">${sw}</div></div>
      </aside>
    </div>
  </section>`;
}

/* --------------------------------------------------------- plate 05: process */
function method(c) {
  const m = c.method;
  const v = m.scene;
  const n = m.steps.length;
  const parts = m.titleParts.map((p, i) => (i % 2 === 1 ? `<span class="mw" data-mw="${(i - 1) / 2}">${esc(p)}</span>` : esc(p))).join("");
  const beats = m.steps.map((s, i) => beat(i, n, s.tag, s.t, s.d, "")).join("");
  const tab = (i) => `<span class="pr-tab">${pad(i + 1)} · ${esc(m.steps[i].t)}</span>`;
  const rows = v.rows.map(([p, d], i) => `<li data-pr-row><i class="th"></i><span class="tx"><i></i><i></i></span><b>${esc(p)}</b><em${i ? "" : ' class="hot"'}>${esc(d)}</em></li>`).join("");
  const log = v.log.map(([t, e, x]) => `<li data-pr-log><i>${esc(t)}</i><span>${esc(e)}</span><b>${esc(x)}</b></li>`).join("");
  const checks = v.checks.map((x, i) => `<li class="on" data-pr-check="${i}"><b>✓</b>${esc(x)}</li>`).join("");
  return `<section id="method" class="plate method" aria-labelledby="method-title">
    <div class="scene-track" data-scene="method" style="--beats:3.4">
      <div class="scene-sticky shell">
        <div class="scene-left">
          ${slug(c, m.num, m.label)}
          <h2 id="method-title" class="scene-title">${parts}</h2>
          <p class="scene-lead">${esc(m.lead)}</p>
          <ol class="beats">${beats}</ol>
          ${rail(n)}
        </div>
        <div class="scene-right">
          <div class="ls pr" data-stage data-status="${esc(JSON.stringify(v.status))}" aria-hidden="true">
            ${lsBar(v.file, v.demo, 3, v.status[2])}
            <div class="ls-body pr-body">
              <div class="pr-gate pr-app pass" data-pr-gate>${tab(0)}
                <div class="pa-top"><i class="pa-logo"></i><span class="pa-nav"><i></i><i></i><i></i></span><b class="pa-cta is-set" data-pr-cta>${esc(v.cta)}</b></div>
                <ul class="pa-rows">${rows}</ul>
                <span class="pa-toast" data-pr-toast><b>✓</b>${esc(v.toast)}</span>
              </div>
              <div class="pr-gate pr-ops pass" data-pr-gate>${tab(1)}
                <span class="po-head"><i></i>${esc(v.ops)}</span>
                <ul class="po-log">${log}</ul>
                <div class="po-ask" data-pr-ask><span>${esc(v.ask)}</span><b class="po-btn is-ok" data-pr-approve><span class="a">${esc(v.approve)}</span><span class="b">✓ ${esc(v.approved)}</span></b></div>
              </div>
              <div class="pr-gate pr-diff pass" data-pr-gate>${tab(2)}
                <span class="pd-file">${esc(v.diffFile)}</span>
                <span class="pd-ln del" data-pr-del><i>−</i>${esc(v.minus)}</span>
                <span class="pd-ln add" data-pr-add><i>+</i>${esc(v.plus)}</span>
                <span class="pd-tests"><span>${esc(v.tests)}</span><i><i data-pr-bar></i></i><b data-pr-pass>${esc(v.pass)}</b></span>
              </div>
              <ul class="pr-checks">${checks}</ul>
              <div class="ls-stamp pr-stamp" data-pr-stamp>${esc(v.stamp)}</div>
              ${POINTER}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="quote shell">
      <blockquote><p class="quote-big" data-scrub>${esc(m.quote)}</p></blockquote>
      <p class="quote-sub" data-fade>${esc(m.quoteSub)}</p>
    </div>
  </section>`;
}

/* --------------------------------------------------------- plate 06: contact */
function contact(c) {
  const k = c.contact;
  const fit = (82 / (k.big.length * 0.4)).toFixed(2); // first guess for no-JS; main.js measures and fits it to the row
  return `<section id="contact" class="plate contact" aria-labelledby="contact-title">
    <div class="shell">
      ${slug(c, k.num, k.label)}
      <div class="contact-card cm" data-spot data-contact>
        <div class="contact-clip" aria-hidden="true"><canvas class="contact-gl" data-contact-gl></canvas></div>
        <div class="contact-body">
          <h2 id="contact-title" class="contact-title" data-scrub>${esc(k.title)}</h2>
          <div class="contact-cols">
            <div class="contact-copy">
              <p>${esc(k.text)}</p>
              <p class="contact-note">${esc(k.note)}</p>
              <ul class="gh-stats" data-gh hidden></ul>
            </div>
            <a class="cta-orb" href="${SITE.github}" ${ext} data-magnetic data-cursor="GO"><span class="cta-label">${esc(k.cta)}</span>${I.ur}</a>
          </div>
        </div>
      </div>
      <a class="bigword" href="${SITE.github}" ${ext} data-bigword data-cursor="GO" aria-label="${esc(k.big)} GitHub"><span class="bw ht-word" style="--fit:${fit}">${esc(k.big)}</span><span class="bw-arrow" aria-hidden="true">${I.ur}</span></a>
    </div>
  </section>`;
}

function footer(c) {
  return `<footer class="site-footer shell">
    <div class="foot-brand"><span class="mark" aria-hidden="true">DZ</span><b>Danzaio</b></div>
    <p>${esc(c.footer.tag)}</p>
    <nav class="foot-nav" aria-label="Footer"><a href="${SITE.github}" ${ext}>${esc(c.footer.github)}</a><a href="#top" data-top>${esc(c.footer.top)}</a></nav>
  </footer>`;
}

function palette(c) {
  return `<div class="palette" data-palette hidden role="dialog" aria-modal="true" aria-label="${esc(c.ui.palette)}">
    <div class="palette-backdrop" data-palette-close></div>
    <div class="palette-box">
      <div class="palette-search">${I.search}<input type="text" name="q" data-palette-input placeholder="${esc(c.ui.paletteHint)}" autocomplete="off" spellcheck="false" aria-label="${esc(c.ui.paletteHint)}"/><kbd>Esc</kbd></div>
      <ul class="palette-list" data-palette-list role="listbox"></ul>
      <p class="palette-empty" data-palette-empty hidden>${esc(c.ui.paletteEmpty)}</p>
    </div>
  </div>`;
}

function preloader(c) {
  return `<div class="preloader" data-preloader aria-hidden="true">
    <div class="pl-top"><span>${esc(c.ui.proof)}</span><span>${esc(c.hero.year)}</span></div>
    <div class="pl-inner"><span class="pl-mark">DZ</span><span class="pl-count"><b data-pl-count>000</b><i>%</i></span></div>
    <div class="pl-bar"><i data-pl-bar></i></div>
  </div>`;
}

export function render(lang) {
  const c = CONTENT[lang];
  const url = SITE.origin + c.path;
  const data = {
    lang: c.lang,
    ui: c.ui,
    nav: c.nav,
    term: c.system.term,
    contact: c.contact.gh,
    github: SITE.github,
    top: `00 / ${c.ui.index}`,
    sections: [
      ["#loop", c.loop.num, c.loop.label],
      ["#work", c.work.num, c.work.label],
      ["#services", c.services.num, c.services.label],
      ["#bench", c.system.num, c.system.label],
      ["#method", c.method.num, c.method.label],
      ["#contact", c.contact.num, c.contact.label],
    ],
    work: c.work.items.map((t, i) => ({ ...PROJECTS[i], title: t.title, kicker: t.kicker })),
  };
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Daniel M.",
        alternateName: "Danzaio",
        url: SITE.origin + "/",
        sameAs: [SITE.github],
        jobTitle: "Agentic ML Ops Engineer / FullStack Dev",
        knowsAbout: ["SaaS", "Mobile apps", "E-commerce", "AI agents", "LLM automation", "RAG", "Next.js", "React", "Node.js"],
      },
      { "@type": "WebSite", name: "Danzaio", url: SITE.origin + "/", inLanguage: c.lang === "en" ? "en" : "pt-BR" },
    ],
  };
  const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="${c.lang === "en" ? "en" : "pt-BR"}" data-theme="paper">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE.origin}/">
<link rel="alternate" hreflang="pt-BR" href="${SITE.origin}/pt-br/">
<link rel="alternate" hreflang="x-default" href="${SITE.origin}/">
<meta name="theme-color" content="#f1eee4" data-theme-color>
<meta name="color-scheme" content="light dark">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Danzaio">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.origin}/assets/site/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(c.title)}">
<meta name="twitter:description" content="${esc(c.description)}">
<meta name="twitter:image" content="${SITE.origin}/assets/site/og.png">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="preload" href="/assets/site/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/site/fonts/spacegrotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<script>(function(d){try{var t=localStorage.getItem("dz-theme");if(t==="ink"||t==="paper")d.dataset.theme=t}catch(e){}d.classList.add("js");var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;if(rm)d.classList.add("rm");try{if(!rm&&!sessionStorage.getItem("dz-intro")&&!location.hash)d.classList.add("intro")}catch(e){}})(document.documentElement)</script>
<link rel="stylesheet" href="/assets/site/main.css">
<script type="application/ld+json">${json(ld)}</script>
<script defer src="/assets/site/app.js"></script>
</head>
<body>
<a class="skip" href="#main">${esc(c.ui.skip)}</a>
${preloader(c)}
<div class="grain" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><i class="cursor-ring"><span class="cursor-label"></span></i></div>
${top(c)}
<main id="main">
${hero(c)}
${strip(c)}
${loop(c)}
${work(c)}
${services(c)}
${bench(c)}
${method(c)}
${contact(c)}
</main>
${footer(c)}
${palette(c)}
<script type="application/json" id="dz-data">${json(data)}</script>
</body>
</html>
`;
}
