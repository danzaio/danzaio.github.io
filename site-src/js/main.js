import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, data, root, rm, fine, clamp, lerp } from "./util.js";
import { scroller } from "./scroller.js";
import { theme } from "./theme.js";
import { initHeroGL } from "./gl.js";
import { initTerminal } from "./terminal.js";
import { initPalette } from "./palette.js";
import { loadGitHub, timeAgo } from "./github.js";
import { fmt } from "./util.js";

gsap.registerPlugin(ScrollTrigger);
scroller.init(gsap, ScrollTrigger);

const desktop = "(min-width: 901px)";

/* ---------------------------------------------------------------- helpers */
function splitChars(el) {
  const text = el.textContent;
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    if (ch === " ") {
      frag.append(" ");
      continue;
    }
    const s = document.createElement("span");
    s.className = "ch";
    s.textContent = ch;
    frag.append(s);
  }
  el.append(frag);
  return $$(".ch", el);
}
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = "";
  const out = [];
  words.forEach((w, i) => {
    const s = document.createElement("span");
    s.className = "w";
    s.textContent = w;
    el.append(s);
    out.push(s);
    if (i < words.length - 1) el.append(" ");
  });
  return out;
}

/* ------------------------------------------------------------------ nav */
const header = $("[data-header]");
const menu = $("[data-mobile-menu]");
const menuBtn = $("[data-menu-toggle]");
let menuOpen = false;
const palEl = $("[data-palette]");

function setMenu(open) {
  menuOpen = open;
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  open ? scroller.stop() : scroller.start();
  if (open) header.classList.remove("is-hidden");
}
menuBtn.addEventListener("click", () => setMenu(!menuOpen));

function goto(href) {
  if (href === "#top") return scroller.to(0);
  const el = $(href);
  if (!el) return;
  scroller.to(el, { offset: href === "#method" ? 0 : -84 });
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute("href");
  if (href.length < 2) return;
  e.preventDefault();
  if (menuOpen) setMenu(false);
  goto(href);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) setMenu(false);
});

theme.api = null;
const toggleTheme = (origin) => theme.toggle(origin);
$("[data-theme-toggle]").addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
});
document.addEventListener("keydown", (e) => {
  const tag = (e.target.tagName || "").toLowerCase();
  if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey && tag !== "input" && tag !== "textarea") toggleTheme();
});

const api = { theme: { get: () => theme.get(), set: (t) => theme.set(t), toggle: toggleTheme }, goto, stop: () => scroller.stop(), start: () => scroller.start() };
initPalette({ ...api, theme: { toggle: toggleTheme } });
initTerminal($("[data-terminal]"), api);

/* ------------------------------------------------------ simple behaviours */
$$("[data-swatch]").forEach((b) =>
  b.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.swatch);
    } catch {}
    const s = $("span", b);
    const old = s.textContent;
    s.textContent = data.ui.copied;
    b.classList.add("copied");
    setTimeout(() => {
      s.textContent = old;
      b.classList.remove("copied");
    }, 1200);
  })
);
$$("[data-spot]").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

loadGitHub()
  .then((g) => {
    const ul = $("[data-gh]");
    const c = data.contact;
    const items = [fmt(c.repos, g.repos), fmt(c.followers, g.followers)];
    if (g.pushName) items.push(fmt(c.push, g.pushName, timeAgo(g.pushAt)));
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.append(li);
    });
    ul.hidden = false;
  })
  .catch(() => {});

/* --------------------------------------------------- hero (no motion path) */
const heroMain = $("[data-hero]");
let gl = null;
if (!rm && (navigator.hardwareConcurrency || 4) > 2) gl = initHeroGL($("[data-hero-gl]"), heroMain);
if (!gl) heroMain.classList.add("no-gl");

if (rm) {
  $$(".cap").forEach((c) => c.classList.add("in"));
  document.documentElement.classList.add("is-ready");
  $$("[data-tilt]").forEach((a) => a.removeAttribute("data-tilt"));
} else {
  /* ===================================================== motion path ===== */
  const chars = $$("[data-split='chars']").flatMap(splitChars);
  gsap.set(chars, { yPercent: 118, rotate: 7, transformOrigin: "0% 100%" });
  gsap.set(".hl", { "--hl": 0 });
  gsap.set(".site-header .bar", { opacity: 0, y: -24 });
  gsap.set(".hero-meta, .hero-scroll", { opacity: 0 });
  gsap.set("[data-hero-in]", { opacity: 0, y: 26 });
  gsap.set("[data-hero-card]", { opacity: 0, clipPath: "inset(100% 0% 0% 0% round 12px)" });
  gsap.set(".tile", { opacity: 0, y: 34 });

  function entrance() {
    root.classList.add("is-ready");
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        $(".hero-title").classList.add("done");
        gsap.set("[data-hero-in], .tile", { clearProps: "transform" });
        gsap.set("[data-hero-card]", { clearProps: "clipPath" });
      },
    });
    tl.to(chars, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.04 }, 0)
      .to(".hl", { "--hl": 1, duration: 0.9, ease: "power3.inOut" }, 0.5)
      .to(".site-header .bar", { opacity: 1, y: 0, duration: 0.9 }, 0.1)
      .to(".hero-meta, .hero-scroll", { opacity: 1, duration: 0.8 }, 0.25)
      .to("[data-hero-in]", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.5)
      .to("[data-hero-card]", { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 12px)", duration: 1.1, ease: "power3.inOut" }, 0.15)
      .to(".tile", { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.55);
  }

  /* ----- preloader */
  (function intro() {
    if (!root.classList.contains("intro")) return void gsap.delayedCall(0.05, entrance);
    const pl = $("[data-preloader]");
    const cnt = $("[data-pl-count]");
    const bar = $("[data-pl-bar]");
    scroller.stop();
    const o = { v: 0 };
    gsap
      .timeline({
        onComplete() {
          root.classList.remove("intro");
          gsap.set(pl, { display: "none" });
          if (!menuOpen) scroller.start();
          try {
            sessionStorage.setItem("dz-intro", "1");
          } catch {}
        },
      })
      .to(o, {
        v: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate() {
          cnt.textContent = String(Math.round(o.v)).padStart(3, "0");
          bar.style.transform = `scaleX(${o.v / 100})`;
        },
      })
      .to(pl, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "+=0.12")
      .add(entrance, "-=0.55");
  })();

  /* ----- hero letter play (fine pointers) */
  if (fine) {
    chars.forEach((ch) => {
      ch.addEventListener("pointerenter", () => {
        if (!$(".hero-title").classList.contains("done")) return;
        gsap.killTweensOf(ch);
        gsap
          .timeline()
          .to(ch, { yPercent: -14, rotate: gsap.utils.random(-7, 7), duration: 0.18, ease: "power2.out" })
          .to(ch, { yPercent: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1,.35)" });
      });
    });
  }
  /* ----- header, progress, active nav */
  const prog = gsap.quickSetter($("[data-progress]"), "scaleX");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      prog(self.progress);
      if (menuOpen || !palEl.hidden) return;
      if (self.direction === 1 && self.scroll() > 480) header.classList.add("is-hidden");
      else if (self.direction === -1) header.classList.remove("is-hidden");
    },
  });
  $$("[data-nav]").forEach((a) => {
    const sec = $(a.getAttribute("href"));
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => (self.isActive ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")),
    });
  });

  /* ----- marquee: loops and reacts to scroll velocity */
  const mq = $("[data-marquee] .marquee-track");
  if (mq) {
    const tw = gsap.to(mq, { xPercent: -33.3333, ease: "none", duration: 26, repeat: -1 });
    let last = scrollY;
    let ts = 1;
    gsap.ticker.add(() => {
      const y = scrollY;
      const v = y - last;
      last = y;
      ts = lerp(ts, 1 + clamp(v * 0.12, -9, 12), 0.08);
      tw.timeScale(ts);
    });
  }
  /* ----- scrubbed word reveals + fades */
  $$("[data-scrub]").forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 86%", end: "bottom 58%", scrub: true } });
  });
  $$("[data-fade]").forEach((el) => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  /* ----- services cards */
  const caps = $$(".cap");
  gsap.set(caps, { opacity: 0, y: 64 });
  ScrollTrigger.batch(caps, {
    start: "top 92%",
    once: true,
    onEnter: (batch) =>
      batch.forEach((el, i) =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.95, delay: i * 0.09, ease: "power3.out", clearProps: "transform", onStart: () => el.classList.add("in") })
      ),
  });

  /* ----- desktop only: stacked project cards + pinned method */
  const mm = gsap.matchMedia();
  mm.add(desktop, () => {
    const projs = $$("[data-proj]");
    projs.forEach((p, i) => {
      const next = projs[i + 1];
      if (!next) return;
      gsap.to(p, {
        scale: 0.94,
        ease: "none",
        scrollTrigger: { trigger: next, start: "top 92%", end: () => `top ${78 + (i + 1) * 16}px`, scrub: true },
      });
    });

    const method = $("[data-method]");
    const steps = $$(".step", method);
    const words = $$(".mw", method);
    const bar = $("[data-method-bar]", method);
    const count = $("[data-method-count]", method);
    let cur = -1;
    const set = (i) => {
      if (i === cur) return;
      cur = i;
      steps.forEach((s, k) => s.classList.toggle("on", k === i));
      words.forEach((w, k) => w.classList.toggle("on", k <= i));
      count.textContent = `${String(i + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
    };
    set(0);
    ScrollTrigger.create({
      trigger: method,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        bar.style.setProperty("--p", self.progress.toFixed(3));
        set(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
      },
    });
    return () => {
      cur = -1;
      steps.forEach((s) => s.classList.remove("on"));
    };
  });

  /* ----- tall screenshot auto-scrolls inside its browser frame */
  $$(".frame.is-tall").forEach((frame) => {
    const tw = gsap.fromTo(frame, { "--shot": 0 }, { "--shot": 1, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1, repeatDelay: 0.8, paused: true });
    ScrollTrigger.create({ trigger: frame, start: "top 90%", end: "bottom 10%", onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });

  /* ----- pointer layer (cursor, magnetic, tilt) */
  if (fine) {
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    const label = $(".cursor-label");
    const dx = gsap.quickSetter(dot, "x", "px");
    const dy = gsap.quickSetter(dot, "y", "px");
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    window.addEventListener(
      "pointermove",
      (e) => {
        if (!root.classList.contains("has-cursor")) {
          gsap.set(ring, { x: e.clientX, y: e.clientY });
          root.classList.add("has-cursor");
        }
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      },
      { passive: true }
    );
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor],a,button,[role=option]");
      const txt = t?.dataset.cursor;
      ring.classList.toggle("is-label", !!txt);
      ring.classList.toggle("is-link", !!t && !txt);
      if (txt) label.textContent = txt.toUpperCase();
    });
    document.addEventListener("pointerdown", () => ring.classList.add("is-down"));
    document.addEventListener("pointerup", () => ring.classList.remove("is-down"));
    document.documentElement.addEventListener("pointerleave", () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 }));
    document.documentElement.addEventListener("pointerenter", () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 }));

    $$("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1,.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1,.45)" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      el.addEventListener("pointerleave", () => {
        xTo(0);
        yTo(0);
      });
    });

    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", ((px - 0.5) * 9).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - py) * 7).toFixed(2) + "deg");
        el.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
        el.classList.add("is-tilting");
      });
      el.addEventListener("pointerleave", () => {
        el.classList.remove("is-tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  } else {
    $$("[data-tilt]").forEach((el) => el.removeAttribute("data-tilt"));
  }
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", () => setTimeout(refresh, 150));
}

console.log("%cDZ%c  built by hand — try Ctrl K, or type help in the console section.", "background:#c9ff2f;color:#151612;font-weight:800;padding:2px 8px;border-radius:4px", "color:inherit");



