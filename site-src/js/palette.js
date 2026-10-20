import { $, $$, data, isMac } from "./util.js";

export function initPalette(api) {
  const el = $("[data-palette]");
  const input = $("[data-palette-input]", el);
  const list = $("[data-palette-list]", el);
  const empty = $("[data-palette-empty]", el);
  list.setAttribute("data-lenis-prevent", "");
  const G = data.ui.paletteGroups;

  const items = [
    ...data.nav.map((n) => ({ g: G.go, label: n.label, hint: n.href, run: () => api.goto(n.href) })),
    { g: G.go, label: data.contact.cta || "Contact", hint: "#contact", run: () => api.goto("#contact") },
    ...data.work.map((p) => ({ g: G.proj, label: p.title, hint: "↗", kw: p.aliases.join(" "), run: () => window.open(p.live || p.repo, "_blank", "noopener") })),
    { g: G.act, label: data.ui.theme, hint: "T", kw: "theme dark light ink paper tema", run: (o) => api.theme.toggle(o) },
    { g: G.act, label: data.ui.switchLang, hint: data.lang === "en" ? "PT" : "EN", kw: "language idioma lang", run: () => (location.href = $(".lang-link").href) },
    { g: G.act, label: "GitHub", hint: "↗", kw: "github contact contato", run: () => window.open(data.github, "_blank", "noopener") },
  ];
  // the "contact" label comes from the visible button text so it is localized
  items[data.nav.length].label = $(".contact-btn span")?.textContent || "Contact";

  let shown = [];
  let sel = 0;
  let lastFocus = null;

  function render() {
    const q = input.value.trim().toLowerCase();
    shown = items.filter((i) => !q || (i.label + " " + (i.kw || "") + " " + i.g).toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    list.textContent = "";
    let g = "";
    shown.forEach((it, idx) => {
      if (it.g !== g) {
        g = it.g;
        const h = document.createElement("li");
        h.className = "pal-group";
        h.setAttribute("role", "presentation");
        h.textContent = g;
        list.append(h);
      }
      const li = document.createElement("li");
      li.className = "pal-item";
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", idx === sel ? "true" : "false");
      li.dataset.i = idx;
      const a = document.createElement("span");
      a.textContent = it.label;
      const b = document.createElement("small");
      b.textContent = it.hint || "";
      li.append(a, b);
      list.append(li);
    });
    empty.hidden = shown.length > 0;
  }
  function mark() {
    $$(".pal-item", list).forEach((li) => {
      const on = Number(li.dataset.i) === sel;
      li.setAttribute("aria-selected", on ? "true" : "false");
      if (on) li.scrollIntoView({ block: "nearest" });
    });
  }
  function open() {
    if (!el.hidden) return;
    lastFocus = document.activeElement;
    el.hidden = false;
    input.value = "";
    sel = 0;
    render();
    api.stop();
    requestAnimationFrame(() => input.focus());
  }
  function close() {
    if (el.hidden) return;
    el.hidden = true;
    api.start();
    lastFocus?.focus?.({ preventScroll: true });
  }
  function exec(i) {
    const it = shown[i];
    if (!it) return;
    close();
    setTimeout(() => it.run({ x: innerWidth / 2, y: innerHeight / 3 }), 60);
  }

  input.addEventListener("input", () => {
    sel = 0;
    render();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sel = (sel + 1) % Math.max(1, shown.length);
      mark();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sel = (sel - 1 + shown.length) % Math.max(1, shown.length);
      mark();
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(sel);
    } else if (e.key === "Tab") e.preventDefault();
  });
  list.addEventListener("click", (e) => {
    const li = e.target.closest(".pal-item");
    if (li) exec(Number(li.dataset.i));
  });
  list.addEventListener("pointermove", (e) => {
    const li = e.target.closest(".pal-item");
    if (li && Number(li.dataset.i) !== sel) {
      sel = Number(li.dataset.i);
      mark();
    }
  });
  $$("[data-palette-close]", el).forEach((n) => n.addEventListener("click", close));
  $$("[data-palette-open]").forEach((b) => b.addEventListener("click", open));
  const kbd = $("[data-kbd]");
  if (kbd) kbd.textContent = isMac ? "⌘ K" : "Ctrl K";

  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && tag !== "input" && tag !== "textarea")) {
      e.preventDefault();
      el.hidden ? open() : close();
    } else if (e.key === "Escape") close();
  });
  return { open, close };
}
