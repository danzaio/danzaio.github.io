import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, rm } from "./util.js";

// Pinned scroll scene: one sentence becomes a wireframe, then an interface, then a shipped product.
// The CSS default is the final frame (so no-JS and reduced motion get a finished picture);
// this file rewinds it and lets scroll play it forward. Timeline time 0..4 = Idea, Plan, Build, Proof.
export function initLoop() {
  const track = $("[data-loop]");
  if (!track || rm) return;
  const q = (s) => $(s, track);
  const qq = (s) => $$(s, track);

  const stage = q("[data-loop-stage]");
  const note = q("[data-ls-note]");
  const app = q("[data-ls-app]");
  const boxes = qq("[data-ls-box]");
  const tags = qq("[data-ls-tag]");
  const fills = qq("[data-ls-fill]");
  const bars = qq("[data-ls-bars] rect");
  const trend = q("[data-ls-trend]");
  const rows = qq("[data-ls-row]");
  const code = q("[data-ls-code]");
  const codeIn = q("[data-ls-codein]");
  const build = q("[data-ls-build]");
  const phone = q("[data-ls-phone]");
  const notif = q("[data-ls-notif]");
  const checks = qq("[data-ls-check]");
  const stamp = q("[data-ls-stamp]");
  const dots = q("[data-ls-dots]");
  const beats = qq("[data-beat]");
  const rail = q("[data-loop-rail]");
  const status = q(".ls-status");
  const statusText = q("[data-ls-status]");
  const names = JSON.parse(stage.dataset.status);

  /* ----- the sentence types itself once, when the scene first comes into view */
  const chars = [];
  (function split(node) {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType !== 3) return void split(n);
      const frag = document.createDocumentFragment();
      for (const ch of n.textContent) {
        if (ch === " ") {
          frag.append(" ");
          continue;
        }
        const s = document.createElement("span");
        s.className = "c";
        s.textContent = ch;
        frag.append(s);
        chars.push(s);
      }
      n.replaceWith(frag);
    });
  })(q("[data-ls-idea]"));
  note.classList.add("pre");
  gsap.set(chars, { opacity: 0 });
  let typed = false;
  const type = () => {
    if (typed) return;
    typed = true;
    gsap.to(chars, { opacity: 1, duration: 0.01, stagger: 0.026, ease: "none", onComplete: () => note.classList.remove("pre") });
  };
  ScrollTrigger.create({ trigger: track, start: "top 62%", once: true, onEnter: type });

  /* ----- rewind to the first frame */
  const OPEN = "inset(-60% -60% -60% -60%)"; // generous, so labels that overhang a box are not clipped
  const SHUT = "inset(-60% 160% -60% -60%)";
  app.classList.remove("is-built");
  gsap.set(stage, { transformPerspective: 1500, rotateY: -10, rotateX: 5, scale: 0.93 });
  gsap.set(note, { "--nx": 14, "--ny": 13.5, "--ns": 1, "--nr": -2 });
  gsap.set(app, { autoAlpha: 0, "--sh": 0 });
  gsap.set(boxes, { clipPath: SHUT });
  gsap.set(tags, { autoAlpha: 0, scale: 0.6 });
  gsap.set(fills, { autoAlpha: 0, scale: 0.7 });
  gsap.set(bars, { scaleY: 0 });
  gsap.set(trend, { strokeDashoffset: 1 });
  gsap.set(rows, { autoAlpha: 0, xPercent: -8 });
  gsap.set(code, { autoAlpha: 0, xPercent: 45 });
  gsap.set(build, { scaleX: 0 });
  gsap.set(phone, { yPercent: 135 });
  gsap.set(notif, { autoAlpha: 0, yPercent: -45 });
  gsap.set(checks, { autoAlpha: 0, y: 10 });
  gsap.set(stamp, { autoAlpha: 0, scale: 2.4, rotate: -22 });
  gsap.set(dots, { opacity: 0.6 });

  /* ----- one timeline, scrubbed by scroll */
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
  tl.to(stage, { rotateY: 0, rotateX: 0, scale: 1, duration: 3.6, ease: "none" }, 0)
    .to(dots, { opacity: 0, duration: 2.6, ease: "none" }, 1)
    // 1 PLAN: the note docks as a chip, the wireframe draws, labels land
    .to(note, { "--nx": 0, "--ny": 0, "--ns": 0.4, "--nr": 0, duration: 0.6, ease: "power2.inOut" }, 0.7)
    .to(app, { autoAlpha: 1, duration: 0.15 }, 1)
    .to(boxes, { clipPath: OPEN, duration: 0.36, stagger: 0.09 }, 1.06)
    .to(tags, { autoAlpha: 1, scale: 1, duration: 0.2, stagger: 0.09, ease: "back.out(2)" }, 1.42)
    // 2 BUILD: labels leave, real parts fill in, code streams beside it
    .to(tags, { autoAlpha: 0, scale: 0.8, duration: 0.14, ease: "power2.in" }, 2)
    .to(code, { autoAlpha: 1, xPercent: 0, duration: 0.3 }, 2)
    .to(codeIn, { yPercent: -46, duration: 0.92, ease: "none" }, 2.02)
    .to(build, { scaleX: 1, duration: 0.88, ease: "none" }, 2.04)
    .to(fills, { autoAlpha: 1, scale: 1, duration: 0.24, stagger: 0.06, ease: "back.out(1.8)" }, 2.14)
    .to(bars, { scaleY: 1, duration: 0.34, stagger: 0.045, ease: "power3.out" }, 2.3)
    .to(trend, { strokeDashoffset: 0, duration: 0.4, ease: "power1.inOut" }, 2.46)
    .to(rows, { autoAlpha: 1, xPercent: 0, duration: 0.24, stagger: 0.08 }, 2.46)
    // 3 PROOF: code steps aside, the phone gets the alert, checks land, the stamp hits
    .to(code, { autoAlpha: 0, xPercent: 45, duration: 0.24, ease: "power2.in" }, 2.9)
    .to(phone, { yPercent: 0, duration: 0.42, ease: "power3.out" }, 3.04)
    .to(checks, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.1 }, 3.28)
    .to(notif, { autoAlpha: 1, yPercent: 0, duration: 0.26, ease: "back.out(1.6)" }, 3.36)
    .to(stamp, { autoAlpha: 1, scale: 1, rotate: -6, duration: 0.18, ease: "power4.in" }, 3.6)
    .to(app, { "--sh": 1, duration: 0.18, ease: "power3.out" }, 3.78)
    .to({}, { duration: 0.04 }, 3.96);

  let cur = -1;
  const sync = () => {
    const t = tl.time();
    app.classList.toggle("is-built", t >= 2.14);
    rail.style.setProperty("--p", (t / 4).toFixed(3));
    const b = t < 0.92 ? 0 : t < 1.96 ? 1 : t < 3 ? 2 : 3;
    if (b === cur) return;
    cur = b;
    beats.forEach((el, i) => el.classList.toggle("on", i === b));
    status.dataset.lsState = String(b);
    statusText.textContent = names[b];
    if (b > 0) type(); // arrived past the first beat without the entry trigger (anchor jump)
  };
  tl.eventCallback("onUpdate", sync);
  sync();

  ScrollTrigger.create({ trigger: track, start: "top top", end: "bottom bottom", scrub: 0.35, animation: tl });
}
