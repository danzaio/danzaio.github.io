import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, data, root, rm, fine, clamp, lerp, fmt } from "./util.js";
import { scroller } from "./scroller.js";
import { theme } from "./theme.js";
import { initHeroGL } from "./gl.js";
import { initLoop } from "./loop.js";
import { sceneBuilders } from "./scenes.js";
import { initReel, initWorkStage, scramble } from "./reel.js";
import { initTerminal } from "./terminal.js";
import { initPalette } from "./palette.js";
import { loadGitHub, timeAgo } from "./github.js";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
scroller.init(gsap, ScrollTrigger);

const buzz = (ms = 8) => {
  try {
    if (!rm) navigator.vibrate?.(ms);
  } catch {}
};

/* ---------------------------------------------------------------- helpers */
// Chars are grouped per WORD (each word is its own clip box) so the title can wrap on narrow screens.
function splitChars(el) {
  const text = el.textContent;
  el.textContent = "";
  const wd = document.createElement("span");
  wd.className = "wd";
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "ch";
    s.textContent = ch;
    wd.append(s);
  }
  el.append(wd);
  return $$(".ch", el);
}
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = "";
  return words.map((w, i) => {
    const s = document.createElement("span");
    s.className = "w";
    s.textContent = w;
    el.append(s);
    if (i < words.length - 1) el.append(" ");
    return s;
  });
}

/* ------------------------------------------------------------------ nav */
const header = $("[data-header]");
const dock = $("[data-dock]");
const menu = $("[data-mobile-menu]");
const menuBtn = $("[data-menu-toggle]");
const palEl = $("[data-palette]");
let menuOpen = false;
let menuTl = null;

function setMenu(open) {
  if (open === menuOpen) return;
  menuOpen = open;
  menuBtn.setAttribute("aria-expanded", String(open));
  buzz(10);
  menuTl?.kill();
  const links = $$(".mobile-menu nav a, .mm-foot > *", menu);
  const r = menuBtn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  if (open) {
    menu.hidden = false;
    scroller.stop();
    header.classList.remove("is-hidden");
    if (rm) return;
    const rad = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    menuTl = gsap
      .timeline()
      .fromTo(menu, { clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${rad}px at ${cx}px ${cy}px)`, duration: 0.75, ease: "power3.inOut" }, 0)
      .fromTo(links, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", stagger: 0.06 }, 0.28);
  } else {
    scroller.start();
    if (rm) return void (menu.hidden = true);
    menuTl = gsap
      .timeline({
        onComplete() {
          menu.hidden = true;
          gsap.set([menu, ...links], { clearProps: "all" });
        },
      })
      .to(links, { y: -16, opacity: 0, duration: 0.25, ease: "power2.in", stagger: 0.025 }, 0)
      .to(menu, { clipPath: `circle(0px at ${cx}px ${cy}px)`, duration: 0.55, ease: "power3.inOut" }, 0.12);
  }
}
menuBtn.addEventListener("click", () => setMenu(!menuOpen));

const PINNED = ["#loop", "#services", "#bench", "#method"];
// an absolute y, so Lenis (which subtracts the html scroll-padding for elements) and the native path agree:
// pinned scenes land flush with the top, other sections leave room for the bar
function goto(href, opts = {}) {
  if (href === "#top") return scroller.to(0, opts);
  const el = $(href);
  if (!el) return;
  const y = el.getBoundingClientRect().top + scrollY - (PINNED.includes(href) ? 0 : 72);
  scroller.to(Math.max(0, Math.round(y)), opts);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute("href");
  if (href.length < 2) return;
  e.preventDefault();
  if (menuOpen) setMenu(false);
  goto(href);
  // the address bar follows the jump, so a section link can be copied and shared
  try {
    history.replaceState(null, "", href === "#top" ? location.pathname + location.search : href);
  } catch {}
});

/* back to top: appears after the cover, its ring fills with the page */
{
  const up = $("[data-to-top]");
  // round controls that can scroll under its corner: it steps aside for them
  const avoid = $$(".bw-arrow, [data-idea-go]");
  if (up) {
    // geometry is measured only when the layout changes (never inside a frame: that forced a reflow per frame)
    let max = 1, vh = innerHeight, btn = null, spots = [];
    // page-relative boxes of the round controls (they ride their scenes, so they are re-read near the end)
    const readSpots = () => {
      const y = scrollY;
      spots = avoid.map((el) => {
        const a = el.getBoundingClientRect();
        return { l: a.left, r: a.right, t: a.top + y, b: a.bottom + y };
      });
    };
    const measure = () => {
      vh = innerHeight;
      max = Math.max(1, document.documentElement.scrollHeight - vh);
      const b = up.getBoundingClientRect();
      btn = { l: b.left - 12, r: b.right + 12, t: b.top - 12, b: b.bottom + 12 };
      readSpots();
    };
    let raf = 0, lastP = "", lastOn = null;
    const paint = () => {
      raf = 0;
      if (!btn) measure();
      const y = scroller.y();
      const clash = spots.some((s) => s.r > btn.l && s.l < btn.r && s.b - y > btn.t && s.t - y < btn.b);
      const on = y > vh * 1.1 && !clash;
      if (on !== lastOn) up.classList.toggle("on", (lastOn = on));
      const p = Math.min(1, y / max).toFixed(3);
      if (p !== lastP) up.style.setProperty("--p", (lastP = p));
    };
    // scroll events run before this frame's animation writes, so reading layout here costs no extra reflow
    addEventListener(
      "scroll",
      () => {
        if (btn && scroller.y() > max - vh * 2.5) readSpots();
        raf ||= requestAnimationFrame(paint);
      },
      { passive: true }
    );
    new ResizeObserver(() => {
      measure();
      paint();
    }).observe(document.body);
    addEventListener("resize", () => (btn = null), { passive: true });
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) setMenu(false);
});

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
const palette = initPalette({ ...api, theme: { toggle: toggleTheme } });
$("[data-mm-palette]")?.addEventListener("click", () => {
  setMenu(false);
  setTimeout(() => palette.open(), 420);
});
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

/* ----------------------------------------------------- contact: idea.txt takes the visitor's sentence */
// "Start a project" opens the GitHub profile; a written idea goes along on the clipboard, and the note says so
const idea = $("[data-idea]");
const ideaIn = $("[data-idea-input]");
const ideaGo = $("[data-idea-go]");
if (idea && ideaIn && ideaGo) {
  const msg = $("[data-idea-copied]", idea);
  let msgT;
  ideaGo.addEventListener("click", () => {
    const t = ideaIn.value.trim();
    if (!t || !navigator.clipboard) return;
    navigator.clipboard.writeText(t).then(
      () => {
        msg.textContent = msg.dataset.msg;
        clearTimeout(msgT);
        msgT = setTimeout(() => (msg.textContent = ""), 5000);
      },
      () => {}
    );
  });
  ideaIn.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    if (ideaIn.value.trim()) ideaGo.click();
  });
}

loadGitHub()
  .then((g) => {
    const ul = $("[data-gh]");
    const c = data.contact;
    const items = [fmt(c.repos, g.repos)];
    if (g.followers >= 50) items.push(fmt(c.followers, g.followers)); // a small count reads as a weakness, so it stays out until it helps
    if (g.pushName) items.push(fmt(c.push, g.pushName, timeAgo(g.pushAt)));
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.append(li);
    });
    ul.hidden = false;
    // the chips land whenever the API answers, often after the last layout refresh: re-measure once, or the
    // contact scene's triggers stay ~90 px short
    requestAnimationFrame(() => ScrollTrigger.refresh());
  })
  .catch(() => {});

/* ----------------------------------------------------- the closing word fills its row */
{
  const bw = $("[data-bigword] .bw");
  if (bw) {
    const fit = () => {
      const host = bw.parentElement;
      const arrow = $(".bw-arrow", host);
      const room = host.clientWidth - (arrow && arrow.offsetParent ? arrow.offsetWidth + (parseFloat(getComputedStyle(host).columnGap) || 0) : 0);
      const cur = parseFloat(getComputedStyle(bw).getPropertyValue("--fit")) || 13;
      const w = bw.getBoundingClientRect().width;
      if (w > 0) bw.style.setProperty("--fit", ((cur * room) / w).toFixed(3));
    };
    document.fonts.ready.then(fit);
    let t;
    addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(fit, 150);
    });
  }
}

/* ----------------------------------------------------- the cover's dot field */
const hero = $("[data-hero]");
let heroGL = null;
if (!rm && (navigator.hardwareConcurrency || 4) > 2) {
  // quiet boxes keep the field out from under the headline (uv from bottom-left: x0, y0, x1, y1)
  heroGL = initHeroGL($("[data-hero-gl]"), hero, { quiet: [0, 0.1, 0.6, 0.93], quietP: [0, 0.42, 1.2, 0.98], gain: 0.9 });
}
if (!heroGL) hero.classList.add("no-gl");

if (rm) {
  root.classList.add("is-ready");
  $$("[data-tilt]").forEach((a) => a.removeAttribute("data-tilt"));
} else {
  /* ===================================================== motion path ===== */
  const title = $(".hero-title");
  const chars = $$("[data-split='chars']").flatMap(splitChars);
  const dots = $("[data-ht]");
  const reel = $("[data-reel]");
  gsap.set(chars, { yPercent: 118, rotate: 6, transformOrigin: "0% 100%" });
  gsap.set(".hl", { "--hl": 0 });
  gsap.set(dots, { "--dr": "0em" });
  gsap.set(".top-in", { opacity: 0, y: -18 });
  gsap.set("[data-hero-in]", { opacity: 0, y: 24 });
  gsap.set(reel, { clipPath: "inset(100% 0% 0% 0%)" });

  function entrance() {
    root.classList.add("is-ready");
    gsap
      .timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          title.classList.add("done");
          gsap.set("[data-hero-in]", { clearProps: "transform" });
          gsap.set(reel, { clearProps: "clipPath" });
        },
      })
      // the raw idea prints in as a dot screen, then the executable line snaps up crisp
      .to(dots, { "--dr": "0.021em", duration: 1.3, ease: "power2.out" }, 0)
      .to(chars, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.035 }, 0.35)
      .to(".hl", { "--hl": 1, duration: 0.9, ease: "power3.inOut" }, 0.9)
      .to(".top-in", { opacity: 1, y: 0, duration: 0.9 }, 0.1)
      .to("[data-hero-in]", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.6)
      .to(reel, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, 0.3)
      .add(() => reel.classList.add("cm-in"), 0.9);
  }

  /* ----- preloader: counts up, then the lime sheet breaks into the dot screen. Once per device per week
     (it was every new session, 2.7 s with scrolling locked: Dan 15/11 "slow first load") */
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
            localStorage.setItem("dz-intro-at", String(Date.now()));
          } catch {}
        },
      })
      .to(o, {
        v: 100,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate() {
          cnt.textContent = String(Math.round(o.v)).padStart(3, "0");
          bar.style.transform = `scaleX(${o.v / 100})`;
        },
      })
      .fromTo(pl, { "--pr": "19px" }, { "--pr": "0px", duration: 0.65, ease: "power2.inOut" }, "+=0.05")
      .add(entrance, "-=0.5");
  })();

  /* ----- "Ideas" turns solid under the pointer: the idea becomes executable where you touch it */
  if (fine) {
    const host = $("[data-ht-host]");
    const solid = $("[data-ht-solid]");
    const sx = gsap.quickSetter(solid, "--sx", "px");
    const sy = gsap.quickSetter(solid, "--sy", "px");
    const copy = $(".hero-copy");
    copy.addEventListener("pointermove", (e) => {
      const r = host.getBoundingClientRect();
      sx(e.clientX - r.left);
      sy(e.clientY - r.top);
    });
    copy.addEventListener("pointerenter", () => title.classList.contains("done") && gsap.to(solid, { "--sr": "1.1em", duration: 0.6, ease: "power3.out" }));
    copy.addEventListener("pointerleave", () => gsap.to(solid, { "--sr": "0em", duration: 0.5, ease: "power2.inOut" }));
    chars.forEach((ch) => {
      ch.addEventListener("pointerenter", () => {
        if (!title.classList.contains("done")) return;
        gsap.killTweensOf(ch);
        gsap
          .timeline()
          .to(ch, { yPercent: -14, rotate: gsap.utils.random(-7, 7), duration: 0.18, ease: "power2.out" })
          .to(ch, { yPercent: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1,.35)" });
      });
    });
  }

  /* ----- top bar (progress, hide on the way down), dock (after the cover) */
  const prog = gsap.quickSetter($("[data-progress]"), "scaleX");
  // the cover's height, read on layout refreshes only (reading it per scroll frame forced a reflow)
  let heroH = hero.offsetHeight;
  ScrollTrigger.addEventListener("refresh", () => (heroH = hero.offsetHeight));
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      prog(self.progress);
      const y = self.scroll();
      dock.classList.toggle("on", y > heroH * 0.55);
      if (menuOpen || !palEl.hidden) return;
      if (self.direction === 1 && y > 480) header.classList.add("is-hidden");
      else if (self.direction === -1) header.classList.remove("is-hidden");
    },
  });

  /* ----- current section: the dock lights it, the top bar names it */
  const topTxt = $("[data-top-txt]");
  let active = null;
  const setSec = (href) => {
    if (href === active) return;
    active = href;
    $$("[data-nav]").forEach((a) => (a.getAttribute("href") === href ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
    const s = data.sections.find((x) => x[0] === href);
    if (topTxt) scramble(topTxt, s ? `${s[1]} / ${s[2]}` : data.top, 0.5);
  };
  data.sections.forEach(([href]) => {
    const sec = $(href);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => (self.isActive ? setSec(href) : active === href && setSec(null)),
    });
  });

  /* ----- strip: loops, and scroll velocity pushes it */
  const strip = $("[data-strip] .strip-track");
  if (strip) {
    const tw = gsap.to(strip, { xPercent: -33.3333, ease: "none", duration: 30, repeat: -1 });
    let last = scroller.y();
    let ts = 1;
    gsap.ticker.add(() => {
      const y = scroller.y();
      const v = y - last;
      last = y;
      ts = lerp(ts, 1 + clamp(v * 0.12, -9, 12), 0.08);
      tw.timeScale(ts);
    });
  }

  gsap.delayedCall(root.classList.contains("intro") ? 2.3 : 1.6, () => initReel(reel));

  /* ----- the scroll scenes are built off the critical path: one per idle slot after the first paint, in page
     order, and any scene the visitor gets near (1.2 screens) is built on the spot. Built up front they cost
     ~0.8 s of main thread before the first frame on a 4x-throttled phone (style reads inside gsap.set). */
  {
    const jobs = [
      [$("[data-loop]"), initLoop],
      [$("#work"), () => initWorkStage($("#work"), (y) => scroller.to(y))],
      ...sceneBuilders(),
    ]
      .filter(([el]) => el)
      .sort(([a], [b]) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .map(([el, fn]) => {
        const job = { done: false };
        const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && job.run(), { rootMargin: "120% 0px" });
        job.run = () => {
          if (job.done) return;
          job.done = true;
          io.disconnect();
          fn();
        };
        io.observe(el);
        return job;
      });
    // 250 ms cap per slot: with 500 the queue was still building scenes during the first swipes on a slow phone
    const idle = (cb) => (window.requestIdleCallback ? requestIdleCallback(cb, { timeout: 250 }) : setTimeout(cb, 40));
    const next = () => {
      const job = jobs.find((j) => !j.done);
      if (!job) return;
      job.run();
      idle(next);
    };
    requestAnimationFrame(() => idle(next));
  }

  /* ----- contact: the dot field returns for the close (created only when it gets near) */
  {
    const cg = $("[data-contact-gl]");
    if (cg && (navigator.hardwareConcurrency || 4) > 2) {
      const io = new IntersectionObserver(
        ([en]) => {
          if (!en.isIntersecting) return;
          io.disconnect();
          if (!initHeroGL(cg, $("[data-contact]"), { ink: "--paper-static", accent: "--lime", text: 0, gain: 0.5, dark: 1 })) cg.remove();
        },
        { rootMargin: "500px" }
      );
      io.observe(cg);
    }
  }

  /* ----- idea.txt comes back: the loop's note flies in, its sentence is erased, the empty note waits */
  if (idea) {
    const ghost = $("[data-idea-ghost]", idea);
    const parts = [...ghost.children];
    const full = parts.map((p) => p.textContent);
    const total = full.reduce((n, s) => n + s.length, 0);
    const st = { n: total };
    let shownN = -1;
    const paint = () => {
      const n = Math.round(st.n);
      if (n !== shownN) {
        shownN = n;
        let left = n;
        parts.forEach((p, i) => {
          p.textContent = full[i].slice(0, Math.max(0, Math.min(full[i].length, left)));
          left -= full[i].length;
        });
      }
      idea.classList.toggle("is-ghost", n > 0 && !ideaIn.value);
    };
    ideaIn.addEventListener("input", paint);
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(idea, { scale: 0.55, rotation: -9, xPercent: -16, yPercent: 26, autoAlpha: 0 }, { scale: 1, rotation: -2, xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out" }, 0)
      .fromTo(st, { n: total }, { n: 0, duration: 0.36, ease: "none", onUpdate: paint }, 0.42)
      .fromTo(ideaGo, { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.16, ease: "back.out(2)" }, 0.84)
      .to({}, { duration: 0.02 }, 0.98);
    paint();
    ScrollTrigger.create({ trigger: idea.parentElement, start: "top 95%", end: "bottom 72%", scrub: 0.4, animation: tl }); // the wrapper never moves, so the trigger stays put
  }

  /* ----- crop marks draw in as each plate arrives */
  $$(".cm").forEach((el) => {
    if (el === reel) return;
    ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => el.classList.add("cm-in") });
  });

  /* ----- screenshots in the list arrive through a growing dot grid */
  $$(".wk-shot img").forEach((img) => {
    if (!img.offsetParent) return; // hidden while the work stage is pinned
    img.classList.add("ht");
    gsap.fromTo(
      img,
      { "--hr": "0px" },
      { "--hr": "13px", duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: img.closest(".frame"), start: "top 85%", once: true }, onComplete: () => img.classList.remove("ht") }
    );
  });

  /* ----- slug labels resolve out of random glyphs once, as they enter */
  $$(".section-label .lbl").forEach((el) => {
    const text = el.textContent;
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => scramble(el, text, 0.7) });
  });

  /* ----- scrubbed word reveals + fades */
  $$("[data-scrub]").forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 86%", end: "bottom 58%", scrub: true } });
  });
  $$("[data-fade]").forEach((el) => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  /* ----- the raw idea prints solid as the cover scrolls away (what the lens does by hand, for touch too) */
  if (dots) gsap.fromTo(dots, { "--dr": "0.021em" }, { "--dr": "0.042em", ease: "none", immediateRender: false, scrollTrigger: { trigger: hero, start: "top top", end: "65% top", scrub: 0.4 } });

  /* ----- the closing word prints from a fine screen to solid ink */
  {
    const bw = $(".bw");
    if (bw) gsap.fromTo(bw, { "--dr": "0.012em" }, { "--dr": "0.042em", ease: "none", scrollTrigger: { trigger: bw, start: "top 92%", end: "bottom 88%", scrub: 0.4 } });
  }

  /* ----- tall screenshot auto-scrolls inside its browser frame */
  $$(".frame.is-tall").forEach((frame) => {
    const tw = gsap.fromTo(frame, { "--shot": 0 }, { "--shot": 1, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1, repeatDelay: 0.8, paused: true });
    ScrollTrigger.create({ trigger: frame, start: "top 90%", end: "bottom 10%", onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });

  /* ----- pointer layer (label chip, magnetic, tilt); the system cursor is never replaced */
  if (fine) {
    const ring = $(".cursor-ring");
    const label = $(".cursor-label");
    const rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    let seen = false;
    window.addEventListener(
      "pointermove",
      (e) => {
        if (!seen) {
          gsap.set(ring, { x: e.clientX, y: e.clientY });
          seen = true;
        }
        rx(e.clientX);
        ry(e.clientY);
      },
      { passive: true }
    );
    document.addEventListener("pointerover", (e) => {
      const txt = e.target.closest("[data-cursor]")?.dataset.cursor;
      ring.classList.toggle("is-label", !!txt);
      if (txt) label.textContent = txt.toUpperCase();
    });
    root.addEventListener("pointerleave", () => ring.classList.remove("is-label"));

    $$("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1,.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1,.45)" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
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
        el.style.setProperty("--ry", ((px - 0.5) * 7).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - py) * 5).toFixed(2) + "deg");
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
    // touch: the reel picture drifts with scroll instead of tilting under a pointer
    const img = $(".reel-img img");
    if (img) gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: reel, start: "top bottom", end: "bottom top", scrub: true } });
  }

  /* off-screen plates skip style, layout and paint (content-visibility): without it the whole ~29k px page was
     re-layerized every frame. Each plate keeps its measured height, so nothing moves; ScrollTrigger measures
     with the containment lifted (refreshInit), and the heights are re-read after every refresh. */
  if (CSS.supports?.("content-visibility", "auto")) {
    // (not the footer: paint containment would clip its logo's crosshair ticks, and it is 155 px)
    const plates = $$("main > section");
    const px = (cs, k) => parseFloat(cs[k]) || 0;
    ScrollTrigger.addEventListener("refreshInit", () => plates.forEach((s) => (s.style.contentVisibility = "")));
    ScrollTrigger.addEventListener("refresh", () => {
      // all reads first, then all writes (no layout between plates)
      const hs = plates.map((s) => {
        const cs = getComputedStyle(s);
        // contain-intrinsic-size is the content box: padding and border come on top
        return s.getBoundingClientRect().height - px(cs, "paddingTop") - px(cs, "paddingBottom") - px(cs, "borderTopWidth") - px(cs, "borderBottomWidth");
      });
      plates.forEach((s, i) => {
        s.style.containIntrinsicSize = `auto ${hs[i].toFixed(2)}px`;
        s.style.contentVisibility = "auto";
      });
    });
  }

  /* arriving on /#section: the pins grow the page after the browser's own jump, so land again after each
     layout refresh, until the visitor scrolls by hand */
  let deep = /^#[\w-]+$/.test(location.hash) && $(location.hash) ? location.hash : null;
  const own = () => (deep = null);
  ["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, own, { once: true, passive: true }));
  const land = () => {
    if (!deep) return;
    scroller.lenis?.resize();
    goto(deep, { immediate: true, force: true });
  };
  const refresh = () => {
    ScrollTrigger.refresh();
    land();
  };
  requestAnimationFrame(refresh);
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", () => setTimeout(refresh, 150));
}

console.log("%cDZ%c  proof sheet, built by hand. Try Ctrl K, or type help in the workbench.", "background:#c9ff2f;color:#151612;font-weight:800;padding:2px 8px;border-radius:4px", "color:inherit");
