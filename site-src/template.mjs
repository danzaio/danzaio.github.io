import { CONTENT, PROJECTS, SITE } from "./content.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const svg = (inner, cls = "ico", extra = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${inner}</svg>`;

const I = {
  ur: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
  up: svg('<path d="M12 19V5M5 12l7-7 7 7"/>'),
  down: svg('<path d="M12 5v14M5 12l7 7 7-7"/>'),
  star: svg('<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/>', "ico ico-star"),
  moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', "ico ico-moon"),
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', "ico ico-sun"),
  gh: svg('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'),
  term: svg('<path d="M4 17l6-6-6-6M12 19h8"/>'),
  win: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>'),
  phone: svg('<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>'),
  bag: svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>'),
  bot: svg('<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 14h.01M15 14h.01M9 17.5h6"/><circle cx="12" cy="3" r="1"/>'),
  menu: svg('<path d="M4 8h16M4 16h16"/>', "ico ico-menu"),
  x: svg('<path d="M6 6l12 12M18 6 6 18"/>', "ico ico-x"),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
};

const arrowInline = `<svg class="tag-arrow" viewBox="0 0 24 12" width="22" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 6h20M16 1l5 5-5 5"/></svg>`;
const tagHtml = (parts) => parts.map(esc).join(arrowInline);

const pad = (n) => String(n).padStart(2, "0");

// --- service card illustrations (decorative) ---------------------------------
const ART = {
  saas: `<svg class="art art-saas" viewBox="0 0 200 120" aria-hidden="true"><g class="bars"><rect x="12" y="84" width="22" height="30" rx="3"/><rect x="48" y="66" width="22" height="48" rx="3"/><rect x="84" y="48" width="22" height="66" rx="3"/><rect x="120" y="30" width="22" height="84" rx="3"/><rect x="156" y="8" width="22" height="106" rx="3" class="hot"/></g><path class="trend" d="M12 78 48 60 84 42 120 24 156 4" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  mobile: `<svg class="art art-mobile" viewBox="0 0 160 160" aria-hidden="true"><g class="rings"><circle cx="80" cy="80" r="26"/><circle cx="80" cy="80" r="26"/><circle cx="80" cy="80" r="26"/></g><rect x="56" y="30" width="48" height="100" rx="10" class="phone"/><rect x="64" y="44" width="32" height="6" rx="3" class="ln"/><rect x="64" y="58" width="32" height="22" rx="4" class="ln"/><rect x="64" y="88" width="20" height="5" rx="2.5" class="ln"/><circle cx="80" cy="118" r="5" class="knob"/></svg>`,
  commerce: `<svg class="art art-commerce" viewBox="0 0 160 120" aria-hidden="true"><g class="coins"><ellipse cx="96" cy="96" rx="34" ry="10"/><ellipse cx="96" cy="84" rx="34" ry="10"/><ellipse cx="96" cy="72" rx="34" ry="10"/><ellipse cx="96" cy="60" rx="34" ry="10" class="top"/></g><path class="cart" d="M10 22h14l10 46h54M30 40h66" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="42" cy="82" r="5" class="wheel"/><circle cx="78" cy="82" r="5" class="wheel"/></svg>`,
  ai: `<svg class="art art-ai" viewBox="0 0 360 360" aria-hidden="true"><circle class="o-ring" cx="220" cy="220" r="130"/><circle class="o-core" cx="220" cy="220" r="86"/><g class="orbit orbit-a"><circle cx="220" cy="90" r="9"/></g><g class="orbit orbit-b"><circle cx="350" cy="220" r="6"/></g><g class="orbit orbit-c"><circle cx="220" cy="350" r="5"/></g></svg>`,
};
const CAP_ICON = { saas: I.win, mobile: I.phone, commerce: I.bag, ai: I.bot };

// --- sections -----------------------------------------------------------------
function sectionHead(num, label, title, lead, id) {
  return `<header class="section-head">
    <div class="section-label"><span class="num">${num}</span><i class="rule"></i><span class="lbl">${esc(label)}</span></div>
    <h2 class="section-title"${id ? ` id="${id}"` : ""} data-scrub>${esc(title)}</h2>
    <p class="section-lead" data-fade>${esc(lead)}</p>
  </header>`;
}

function header(c) {
  const nav = c.nav.map((n) => `<a href="${n.href}" data-nav>${esc(n.label)}</a>`).join("");
  return `<header class="site-header" data-header>
    <div class="bar">
      <a class="brand" href="#top" data-cursor="TOP"><span class="mark" aria-hidden="true">DZ</span><span class="brand-name">Danzaio</span></a>
      <nav class="desktop-nav" aria-label="Primary">${nav}</nav>
      <div class="bar-actions">
        <button class="kbd-btn" type="button" data-palette-open aria-label="${esc(c.ui.palette)}"><span class="kbd" data-kbd aria-hidden="true">Ctrl K</span></button>
        <a class="lang-link" href="${c.altPath}" hreflang="${c.lang === "en" ? "pt-BR" : "en"}" lang="${c.lang === "en" ? "pt-BR" : "en"}" title="${esc(c.ui.switchLang)}">${c.altCode}</a>
        <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="${esc(c.ui.theme)}">${I.moon}${I.sun}</button>
        <a class="btn btn-lime btn-sm contact-btn" href="${SITE.github}" target="_blank" rel="noopener" data-magnetic><span>${esc(c.contactLabel)}</span>${I.ur}</a>
        <button class="icon-btn menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(c.ui.menu)}">${I.menu}${I.x}</button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
    <nav aria-label="Mobile">${c.nav.map((n, i) => `<a href="${n.href}" data-mm-link><span class="mm-n">${pad(i + 1)}</span>${esc(n.label)}</a>`).join("")}<a href="${SITE.github}" target="_blank" rel="noopener" data-mm-link><span class="mm-n">${pad(c.nav.length + 1)}</span>${esc(c.contactLabel)}</a></nav>
    <div class="mm-foot">
      <a class="mm-lang" href="${c.altPath}" hreflang="${c.lang === "en" ? "pt-BR" : "en"}" lang="${c.lang === "en" ? "pt-BR" : "en"}"><b>${esc(c.altLabel)}</b><span>${c.altCode}</span></a>
      <button class="mm-pal" type="button" data-mm-palette>${esc(c.ui.palette)}</button>
    </div>
  </div>`;
}

function hero(c) {
  const h = c.hero;
  const p0 = PROJECTS[0];
  const tiles = h.tiles
    .map(
      (t, i) => `<a class="tile tile-${["paper", "lime", "ink"][i]}" href="${t.href}" data-cursor="${esc(c.ui.view)}">
        <b class="tile-k">${esc(t.k)}</b>
        <span class="tile-t"><em>${esc(t.a)}</em><small>${esc(t.b)}</small></span>
        <i class="tile-dash" aria-hidden="true"></i>
        <span class="tile-go" aria-hidden="true">${I.down}</span>
      </a>`
    )
    .join("");
  return `<section id="top" class="hero shell" aria-labelledby="hero-title">
    <div class="hero-grid">
      <div class="hero-main card" data-hero>
        <canvas class="hero-gl" data-hero-gl aria-hidden="true"></canvas>
        <div class="hero-meta"><span>${esc(h.eyebrow.toUpperCase())}</span><i class="rule"></i><span>${esc(h.role.toUpperCase())}</span></div>
        <h1 id="hero-title" class="hero-title" aria-label="${esc(h.line1 + " " + h.line2)}">
          <span class="line" aria-hidden="true"><span class="ln-in" data-split="chars">${esc(h.line1)}</span></span>
          <span class="line" aria-hidden="true"><span class="hl"><span class="ln-in" data-split="chars">${esc(h.line2)}</span></span></span>
        </h1>
        <p class="hero-sub" data-hero-in>${esc(h.sub)}</p>
        <div class="hero-cta" data-hero-in>
          <a class="btn btn-ink" href="#work" data-magnetic><span>${esc(h.cta1)}</span>${I.ur}</a>
          <a class="btn btn-line" href="${SITE.github}" target="_blank" rel="noopener" data-magnetic>${I.gh}<span>${esc(h.cta2)}</span></a>
        </div>
        <a class="hero-scroll" href="#capabilities" aria-label="${esc(c.ui.scroll)}"><span>${esc(c.ui.scroll)}</span>${I.down}</a>
      </div>
      <a class="hero-card card tone-ink" href="${p0.repo}" target="_blank" rel="noopener" data-tilt data-cursor="${esc(c.ui.open)}" data-hero-card>
        <span class="badge">01 / 04</span>
        <span class="hero-card-img"><img src="/assets/site/img/${p0.img}" width="${p0.imgW}" height="${p0.imgH}" alt="Oh My Pi terminal coding agent" fetchpriority="high" decoding="async"/></span>
        <span class="arrow-chip" aria-hidden="true">${I.ur}</span>
        <span class="hero-card-foot"><b>${esc(h.cardLabel.toUpperCase())}</b><span>${esc(h.cardMeta.toUpperCase())}</span></span>
      </a>
      <div class="tiles" data-tiles>${tiles}</div>
    </div>
  </section>`;
}

function marquee(c) {
  const group = c.marquee.map((w) => `<span class="mq-item">${esc(w)}</span>${I.star}`).join("");
  return `<div class="marquee" data-marquee aria-hidden="true">
    <div class="marquee-rot">
      <div class="marquee-track"><div class="marquee-group">${group}</div><div class="marquee-group">${group}</div><div class="marquee-group">${group}</div></div>
    </div>
  </div>`;
}

function services(c) {
  const s = c.services;
  const cards = s.items
    .map(
      (it, i) => `<article id="cap-${it.id === "commerce" ? "commerce" : it.id}" class="cap cap-${it.id}" data-spot data-reveal>
        <span class="cap-icon">${CAP_ICON[it.id]}</span>
        <span class="cap-num">${pad(i + 1)}</span>
        ${ART[it.id]}
        <div class="cap-body"><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div>
        <span class="cap-tag">${tagHtml(it.tag)}</span>
      </article>`
    )
    .join("");
  return `<section id="capabilities" class="section shell services" aria-labelledby="services-title">
    ${sectionHead(s.num, s.label, s.title, s.lead, "services-title")}
    <div class="bento" data-bento>${cards}</div>
    <div class="bento-nav" aria-hidden="true"><span class="bn-count"><b data-bn-cur>01</b> / ${pad(s.items.length)}</span><span class="bn-dots">${s.items.map((_, i) => `<i${i === 0 ? " class=\"on\"" : ""}></i>`).join("")}</span></div>
  </section>`;
}

function work(c) {
  const w = c.work;
  const total = pad(PROJECTS.length);
  const items = PROJECTS.map((p, i) => {
    const t = w.items[i];
    const links = `<a class="btn btn-ink btn-sm" href="${p.repo}" target="_blank" rel="noopener" data-magnetic><span>${esc(c.ui.repo)}</span>${I.ur}</a>${
      p.live ? `<a class="btn btn-line btn-sm" href="${p.live}" target="_blank" rel="noopener" data-magnetic><span>${esc(c.ui.live)}</span>${I.ur}</a>` : ""
    }`;
    return `<article class="proj tone-${p.tone}" style="--i:${i}" data-proj>
      <div class="proj-inner">
        <div class="proj-info">
          <div class="proj-top"><span>${pad(i + 1)} / ${total}</span><span>${esc(t.kicker.toUpperCase())}</span></div>
          <h3 class="proj-title">${esc(t.title)}</h3>
          <p class="proj-text">${esc(t.text)}</p>
          <dl class="why"><dt>${esc(c.ui.why.toUpperCase())}</dt><dd>${esc(t.why)}</dd></dl>
          <div class="proj-links">${links}</div>
        </div>
        <a class="proj-shot" href="${p.live || p.repo}" target="_blank" rel="noopener" data-tilt data-cursor="${esc(c.ui.open)}">
          <span class="frame${p.tall ? " is-tall" : ""}">
            <span class="frame-bar"><i></i><i></i><i></i><span class="url" aria-hidden="true">${esc(p.url)}</span></span>
            <span class="frame-body"><img src="/assets/site/img/${p.img}" width="${p.imgW}" height="${p.imgH}" alt="${esc(t.title)} screenshot" loading="lazy" decoding="async"/></span>
          </span>
          <span class="arrow-chip" aria-hidden="true">${I.ur}</span>
        </a>
      </div>
    </article>`;
  }).join("");
  return `<section id="work" class="section shell work" aria-labelledby="work-title">
    ${sectionHead(w.num, w.label, w.title, w.lead, "work-title")}
    <div class="stack" data-stack>${items}</div>
  </section>`;
}

function system(c) {
  const s = c.system;
  const chips = s.chips.map((x) => `<button type="button" class="chip" data-chip="${esc(x)}">${esc(x)}</button>`).join("");
  const stack = s.stack
    .map((x, i) => `<li data-stack-row><span class="n">${pad(i + 1)}</span><div><b>${esc(x.t)}</b><span>${esc(x.d)}</span></div><i class="dash" aria-hidden="true"></i></li>`)
    .join("");
  const sw = ["paper", "ink", "lime", "orange"]
    .map((k, i) => `<button type="button" class="swatch sw-${k}" data-swatch="${["#f1eee4", "#151612", "#c9ff2f", "#ff5d2c"][i]}" aria-label="${esc(s.swatchNames[i])}"><span>${esc(s.swatchNames[i])}</span></button>`)
    .join("");
  return `<section id="system" class="section shell system" aria-labelledby="system-title">
    ${sectionHead(s.num, s.label, s.title, s.lead, "system-title")}
    <div class="system-grid">
      <div class="term card" data-terminal>
        <div class="term-bar"><span class="term-title">${I.term}<span>${esc(s.consoleTitle.toUpperCase())}</span></span><span class="term-path">${esc(s.consolePath)}</span></div>
        <div class="term-body" data-term-body role="log" aria-live="polite" tabindex="0"></div>
        <div class="term-chips" aria-label="Quick commands">${chips}</div>
        <form class="term-form" data-term-form autocomplete="off">
          <label class="term-prompt" for="term-in">${esc(s.prompt)}</label>
          <input id="term-in" data-term-input type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${esc(s.placeholder)}"/>
          <button class="term-send" type="submit" aria-label="${esc(s.send)}">${I.up}</button>
        </form>
      </div>
      <aside class="stack-panel card" aria-labelledby="stack-title">
        <div class="stack-head"><h3 id="stack-title">${esc(s.stackTitle)}</h3><span class="count">04 / 04</span></div>
        <ol class="stack-list">${stack}</ol>
        <div class="swatches">${sw}</div>
      </aside>
    </div>
  </section>`;
}

function method(c) {
  const m = c.method;
  const parts = m.titleParts.map((p, i) => (i % 2 === 1 ? `<span class="mw" data-mw="${(i - 1) / 2}">${esc(p)}</span>` : esc(p))).join("");
  const steps = m.steps
    .map(
      (s, i) => `<li class="step" data-step="${i}">
        <span class="step-n">${pad(i + 1)}</span>
        <div class="step-main"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>
        <span class="step-tag">${esc(s.tag.toUpperCase())}</span>
      </li>`
    )
    .join("");
  return `<section id="method" class="method" aria-labelledby="method-title">
    <div class="method-track" data-method>
      <div class="method-sticky shell">
        <div class="method-left">
          <div class="section-label"><span class="num">${m.num}</span><i class="rule"></i><span class="lbl">${esc(m.label)}</span></div>
          <h2 id="method-title" class="method-title">${parts}</h2>
          <p class="section-lead" data-fade>${esc(m.lead)}</p>
        </div>
        <div class="method-right">
          <ol class="steps">${steps}</ol>
          <div class="method-progress" aria-hidden="true"><i data-method-bar></i><span data-method-count>01 / 03</span></div>
        </div>
      </div>
    </div>
    <div class="quote shell">
      <blockquote><p class="quote-big" data-scrub>${esc(m.quote)}</p></blockquote>
      <p class="quote-sub" data-fade>${esc(m.quoteSub)}</p>
    </div>
  </section>`;
}

function contact(c) {
  const k = c.contact;
  const tick = Array.from({ length: 8 }, () => `<span>${esc(k.ticker)}</span>${I.star}`).join("");
  return `<section id="contact" class="contact shell" aria-labelledby="contact-title">
    <div class="contact-card" data-spot>
      <div class="contact-body">
        <h2 id="contact-title" class="contact-title" data-scrub>${esc(k.title)}</h2>
        <div class="contact-cols">
          <div class="contact-copy">
            <p>${esc(k.text)}</p>
            <p class="contact-note">${esc(k.note.toUpperCase())}</p>
            <ul class="gh-stats" data-gh hidden></ul>
          </div>
          <a class="cta-orb" href="${SITE.github}" target="_blank" rel="noopener" data-magnetic data-cursor="GO"><span class="cta-label">${esc(k.cta)}</span>${I.ur}</a>
        </div>
      </div>
      <div class="contact-ticker" aria-hidden="true"><div class="ct-track"><div class="ct-group">${tick}</div><div class="ct-group">${tick}</div></div></div>
    </div>
  </section>`;
}

function footer(c) {
  return `<footer class="site-footer shell">
    <div class="foot-brand"><span class="mark">DZ</span><b>Danzaio</b></div>
    <p>${esc(c.footer.tag)}</p>
    <nav class="foot-nav" aria-label="Footer"><a href="${SITE.github}" target="_blank" rel="noopener">${esc(c.footer.github)}</a><a href="#top" data-top>${esc(c.footer.top)}</a></nav>
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

function preloader() {
  return `<div class="preloader" data-preloader aria-hidden="true">
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
    work: c.work.items.map((t, i) => ({ ...PROJECTS[i], title: t.title })),
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
${preloader()}
<div class="grain" aria-hidden="true"></div>
<div class="progress" aria-hidden="true"><i data-progress></i></div>
<div class="cursor" aria-hidden="true"><i class="cursor-dot"></i><i class="cursor-ring"><span class="cursor-label"></span></i></div>
${header(c)}
<main id="main">
${hero(c)}
${marquee(c)}
${services(c)}
${work(c)}
${system(c)}
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





