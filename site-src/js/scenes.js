import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, rm } from "./util.js";

/* The scene kit, as code (the loop's grammar, shared): a paused timeline scrubbed by scroll,
   beats switched at `cuts`, the status pill and the rail kept in step.
   The CSS default is the final frame; `build` rewinds the stage and writes the timeline,
   and may return a function that runs on every update with the playhead time. */
function scene(track, { cuts, state, build }) {
  const beats = $$("[data-beat]", track);
  const rail = $(".scene-rail", track);
  const stage = $("[data-stage]", track);
  const pill = $(".ls-status", stage);
  const pillText = $("[data-ls-status]", stage);
  const names = JSON.parse(stage.dataset.status);

  gsap.set(stage, { transformPerspective: 1500, rotateX: 7, rotateY: -6, scale: 0.94 });
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
  tl.to(stage, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: "none" }, 0);
  const each = build(tl, $, track) || (() => {});
  const total = tl.duration();
  const edges = [0, ...cuts, total];

  let cur = -1;
  let shown = "";
  const sync = () => {
    const t = tl.time();
    let b = 0;
    while (b < cuts.length && t >= cuts[b]) b++;
    const f = Math.min(1, (t - edges[b]) / (edges[b + 1] - edges[b]));
    rail.style.setProperty("--p", ((b + f) / beats.length).toFixed(3));
    if (b !== cur) {
      cur = b;
      beats.forEach((el, i) => el.classList.toggle("on", i === b));
    }
    const [s, k] = state(t, b);
    if (`${s}:${k}` !== shown) {
      shown = `${s}:${k}`;
      pill.dataset.lsState = String(s);
      pillText.textContent = names[k];
    }
    each(t, b);
  };
  tl.eventCallback("onUpdate", sync);
  sync();
  // starts while the plate is still coming up, so the first product builds as it enters
  ScrollTrigger.create({ trigger: track, start: "top 65%", end: "bottom bottom", scrub: 0.35, animation: tl });
}

// a number that counts up with the scrub and keeps its own format ("1,284", "R$ 8,6 mil", "1.9%")
function counter(el) {
  const final = el.textContent;
  const m = final.match(/\d[\d.,]*/);
  if (!m) return () => {};
  const raw = m[0];
  const digits = raw.replace(/\D/g, "");
  const pre = final.slice(0, m.index);
  const post = final.slice(m.index + raw.length);
  return (p) => {
    if (p >= 1) return void (el.textContent = final);
    const d = String(Math.round(+digits * p)).padStart(digits.length, "0");
    let out = "";
    for (let i = raw.length - 1, k = d.length - 1; i >= 0; i--) out = (/\d/.test(raw[i]) ? d[k--] : raw[i]) + out;
    while (/^0(\d|[.,]\d{3}(?!\d))/.test(out)) out = out.replace(/^0[.,]?/, ""); // no "0,013"; keeps "0.9"
    el.textContent = pre + out + post;
  };
}

// a pointer that travels in stage units (cqi) and clicks
function pointer(tl, cur) {
  const svg = $("svg", cur);
  return {
    show: (at, x, y) => tl.set(cur, { "--cx": x, "--cy": y }, at).to(cur, { opacity: 1, duration: 0.06 }, at),
    move: (at, x, y, d = 0.16) => tl.to(cur, { "--cx": x, "--cy": y, duration: d, ease: "power2.inOut" }, at),
    click: (at, target) => {
      tl.to(svg, { scale: 0.78, duration: 0.03, ease: "power2.in" }, at).to(svg, { scale: 1, duration: 0.06 }, at + 0.03);
      if (target) tl.to(target, { scale: 0.92, duration: 0.03, ease: "power2.in" }, at).to(target, { scale: 1, duration: 0.08, ease: "back.out(3)" }, at + 0.03);
    },
    hide: (at) => tl.to(cur, { opacity: 0, duration: 0.06 }, at),
  };
}

/* ---------------------------------------------------- plate 03: one canvas, four products */
const S_CUTS = [1.1, 2.2, 3.3];
const S_LIVE = [0.75, 1.85, 2.98, 4.12];
const S_SHEET = 4.25;

function buildServices(tl, $, track) {
  const q = (s) => $(s, track);
  const qq = (s) => $$(s, track);
  const body = q("[data-sv-body]");
  const L = qq("[data-sv-l]");
  const sweep = q("[data-sweep]");

  body.classList.remove("is-sheet");
  gsap.set(L, { scale: 1 });
  gsap.set(L[0], { clipPath: "inset(0% 0% 0% -15%)" });
  gsap.set(L.slice(1), { clipPath: "inset(0% 115% 0% 0%)" });
  gsap.set(sweep, { "--sx": -26 });
  // a lime halftone band crosses the stage; the old product leaves behind it, the next one arrives
  const swap = (a, b, at, d = 0.32) =>
    tl
      .fromTo(sweep, { "--sx": -26 }, { "--sx": 104, duration: d, ease: "none", immediateRender: false }, at)
      .fromTo(a, { clipPath: "inset(0% 0% 0% -15%)" }, { clipPath: "inset(0% 0% 0% 115%)", duration: d, ease: "none", immediateRender: false }, at)
      .fromTo(b, { clipPath: "inset(0% 115% 0% 0%)" }, { clipPath: "inset(0% -15% 0% 0%)", duration: d, ease: "none", immediateRender: false }, at);

  /* 01 SaaS */
  const side = q("[data-ss-side]");
  const kpis = qq("[data-ss-kpi]");
  const counts = qq("[data-count]").map(counter);
  const chart = q("[data-ss-chart]");
  const line = q("[data-ss-line]");
  const area = q("[data-ss-area]");
  const rows = qq("[data-ss-row]");
  const pills = qq("[data-ss-pill]");
  gsap.set(side, { xPercent: -125 });
  gsap.set(kpis, { autoAlpha: 0, yPercent: 40 });
  gsap.set(chart, { clipPath: "inset(0% 100% 0% 0%)" });
  gsap.set(line, { clipPath: "inset(0% 100% 0% 0%)" });
  gsap.set(area, { opacity: 0 });
  gsap.set(rows, { autoAlpha: 0, xPercent: 12 });
  gsap.set(pills, { autoAlpha: 0, scale: 0.4 });
  const cp = { p: 0 };
  const paint = () => counts.forEach((f) => f(cp.p));
  paint();
  tl.to(side, { xPercent: 0, duration: 0.32, ease: "power3.out" }, 0.05)
    .to(kpis, { autoAlpha: 1, yPercent: 0, duration: 0.26, stagger: 0.07 }, 0.18)
    .to(cp, { p: 1, duration: 0.5, ease: "power2.out", onUpdate: paint }, 0.24)
    .to(chart, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.26 }, 0.3)
    .to(line, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power1.inOut" }, 0.42)
    .to(area, { opacity: 1, duration: 0.3 }, 0.55)
    .to(rows, { autoAlpha: 1, xPercent: 0, duration: 0.22, stagger: 0.08 }, 0.42)
    .to(pills, { autoAlpha: 1, scale: 1, duration: 0.18, stagger: 0.07, ease: "back.out(2.2)" }, 0.6);

  /* 02 Mobile */
  swap(L[0], L[1], S_CUTS[0] - 0.12);
  const phone = q("[data-sm-phone]");
  const map = q("[data-sm-map]");
  const route = q("[data-sm-route]");
  const van = q("[data-sm-van]");
  const cards = qq("[data-sm-card]");
  const notif = q("[data-sm-notif]");
  const tap = q("[data-sm-tap]");
  const os = qq("[data-sm-os] span");
  const len = route.getTotalLength();
  const vp = { p: 0 };
  const drive = () => {
    const pt = route.getPointAtLength(len * vp.p);
    van.setAttribute("cx", pt.x.toFixed(1));
    van.setAttribute("cy", pt.y.toFixed(1));
  };
  gsap.set(phone, { autoAlpha: 0, yPercent: 40 });
  gsap.set(map, { clipPath: "inset(0% 0% 100% 0%)" });
  gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
  gsap.set(cards, { autoAlpha: 0, y: 14 });
  gsap.set(notif, { autoAlpha: 0, xPercent: -40, scale: 0.85 });
  gsap.set(tap, { autoAlpha: 0, scale: 0.2 });
  gsap.set(os, { autoAlpha: 0, y: 10 });
  drive();
  tl.to(phone, { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: "power3.out" }, 1.1)
    .to(map, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28 }, 1.18)
    .to(cards, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.08 }, 1.3)
    .to(route, { strokeDashoffset: 0, duration: 0.34, ease: "power1.inOut" }, 1.36)
    .to(vp, { p: 1, duration: 0.44, ease: "power1.inOut", onUpdate: drive }, 1.42)
    .to(notif, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.26, ease: "back.out(1.6)" }, 1.62)
    .to(tap, { autoAlpha: 1, scale: 1.5, duration: 0.08 }, 1.72)
    .to(tap, { autoAlpha: 0, duration: 0.14 }, 1.8)
    .to(os, { autoAlpha: 1, y: 0, duration: 0.18, stagger: 0.06 }, 1.74);

  /* 03 Commerce */
  swap(L[1], L[2], S_CUTS[1] - 0.12);
  const top = q("[data-sc-top]");
  const prod = q("[data-sc-prod]");
  const add = q("[data-sc-add]");
  const cart = q("[data-sc-cart]");
  const pay = q("[data-sc-pay]");
  const badge = q("[data-sc-badge]");
  const plus = q("[data-sc-plus]");
  const receipt = q("[data-sc-receipt]");
  const shopCur = pointer(tl, q(".sv-l2 [data-cur]"));
  gsap.set(top, { autoAlpha: 0, yPercent: -60 });
  gsap.set(prod, { autoAlpha: 0, yPercent: 10 });
  gsap.set(cart, { xPercent: 112 });
  gsap.set(badge, { scale: 0 });
  gsap.set(plus, { opacity: 0, "--fx": 35, "--fy": 38 });
  gsap.set(receipt, { autoAlpha: 0, yPercent: 50, rotate: -8 });
  tl.to(top, { autoAlpha: 1, yPercent: 0, duration: 0.24 }, 2.22).to(prod, { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: "power3.out" }, 2.28);
  shopCur.show(2.4, 46, 58);
  shopCur.move(2.4, 36, 41.5, 0.16);
  shopCur.click(2.58, add);
  tl.to(plus, { opacity: 1, duration: 0.03 }, 2.6)
    .to(plus, { "--fx": 92.4, "--fy": 3.4, duration: 0.16, ease: "power2.inOut" }, 2.6)
    .to(plus, { opacity: 0, duration: 0.04 }, 2.76)
    .to(badge, { scale: 1, duration: 0.14, ease: "back.out(3)" }, 2.76)
    .to(cart, { xPercent: 0, duration: 0.3, ease: "power3.out" }, 2.66);
  shopCur.move(2.78, 76, 31.5, 0.14);
  shopCur.click(2.93, pay);
  tl.to(receipt, { autoAlpha: 1, yPercent: 0, rotate: 3, duration: 0.22, ease: "back.out(1.6)" }, 2.98);
  shopCur.hide(3.08);

  /* 04 AI */
  swap(L[2], L[3], S_CUTS[2] - 0.12);
  const nodes = qq("[data-sa-node]");
  const edges = qq("[data-sa-edge]");
  const lines = qq("[data-sa-ln]");
  const ok = q("[data-sa-ok]");
  const approved = q("[data-sa-approved]");
  gsap.set(nodes, { autoAlpha: 0, scale: 0.5 });
  gsap.set(edges, { clipPath: "inset(-50% 100% -50% 0%)" });
  gsap.set(lines, { clipPath: "inset(0% 100% 0% 0%)" });
  gsap.set(ok, { autoAlpha: 0, yPercent: 25 });
  gsap.set(approved, { autoAlpha: 0, scale: 2.2, rotate: -10 });
  const pop = (els, at) => tl.to(els, { autoAlpha: 1, scale: 1, duration: 0.12, ease: "back.out(2.4)" }, at);
  // every edge runs left to right, so a clip that opens rightward draws it
  const draw = (els, at, d) => tl.to(els, { clipPath: "inset(-50% 0% -50% 0%)", duration: d, ease: "power1.inOut" }, at);
  pop(nodes[0], 3.42);
  draw(edges[0], 3.48, 0.1);
  pop(nodes[1], 3.56);
  draw(edges.slice(1, 3), 3.62, 0.14);
  pop(nodes.slice(2, 4), 3.74);
  draw(edges.slice(3), 3.82, 0.12);
  pop(nodes[4], 3.92);
  [3.46, 3.6, 3.76, 3.9, 4.0].forEach((at, i) => tl.to(lines[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.1, ease: "steps(16)" }, at));
  tl.to(ok, { autoAlpha: 1, yPercent: 0, duration: 0.2, ease: "power3.out" }, 3.95).to(approved, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.16, ease: "power4.in" }, 4.08);

  /* finale: the four products laid out as one proof sheet */
  tl.to(L[3], { scale: 0.47, duration: 0.28, ease: "power3.inOut" }, S_SHEET);
  tl.set(L.slice(0, 3), { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 0, scale: 0.36 }, S_SHEET + 0.12);
  tl.to(L.slice(0, 3), { autoAlpha: 1, scale: 0.47, duration: 0.2, stagger: 0.06, ease: "back.out(1.5)" }, S_SHEET + 0.12);
  tl.to({}, { duration: 0.1 }, 4.65);

  return (t) => {
    pay.classList.toggle("is-paid", t >= 2.94);
    body.classList.toggle("is-sheet", t >= S_SHEET + 0.1);
  };
}

/* ------------------------------------------------------------- plate 05: three gates */
const P_CUTS = [1.1, 2.2];
const P_PASS = [0.95, 2.0, 3.0];

function buildProcess(tl, $, track) {
  const q = (s) => $(s, track);
  const qq = (s) => $$(s, track);
  const gates = qq("[data-pr-gate]");
  const words = qq(".mw");
  const checks = qq("[data-pr-check]");
  const appRows = qq("[data-pr-row]");
  const cta = q("[data-pr-cta]");
  const toast = q("[data-pr-toast]");
  const log = qq("[data-pr-log]");
  const ask = q("[data-pr-ask]");
  const approve = q("[data-pr-approve]");
  const del = q("[data-pr-del]");
  const add = q("[data-pr-add]");
  const bar = q("[data-pr-bar]");
  const pass = q("[data-pr-pass]");
  const stamp = q("[data-pr-stamp]");
  const cur = pointer(tl, q("[data-cur]"));

  gsap.set(appRows, { autoAlpha: 0, xPercent: -8 });
  gsap.set(toast, { autoAlpha: 0, yPercent: 70 });
  gsap.set(log, { autoAlpha: 0, xPercent: -6 });
  gsap.set(ask, { autoAlpha: 0, yPercent: 30 });
  gsap.set(del, { autoAlpha: 0 });
  gsap.set(add, { autoAlpha: 0, xPercent: -10 });
  gsap.set(bar, { scaleX: 0 });
  gsap.set(pass, { autoAlpha: 0, scale: 0.6 });
  gsap.set(stamp, { autoAlpha: 0, scale: 2.4, rotate: -22 });

  /* 01 Use: a visitor sets an alert without anyone walking them through it */
  tl.to(appRows, { autoAlpha: 1, xPercent: 0, duration: 0.22, stagger: 0.07 }, 0.1);
  cur.show(0.42, 24, 52);
  cur.move(0.48, 40, 10, 0.24);
  cur.click(0.74, cta);
  tl.to(toast, { autoAlpha: 1, yPercent: 0, duration: 0.22, ease: "back.out(1.8)" }, 0.8);
  /* 02 Operate: the run is visible, a human signs off the refund */
  tl.to(log, { autoAlpha: 1, xPercent: 0, duration: 0.16, stagger: 0.1 }, 1.2).to(ask, { autoAlpha: 1, yPercent: 0, duration: 0.24, ease: "power3.out" }, 1.55);
  cur.move(1.62, 88, 31.5, 0.18);
  cur.click(1.82, approve);
  cur.hide(2.0);
  /* 03 Change: a one-line diff, the suite re-runs green, stamped */
  tl.to(del, { autoAlpha: 1, duration: 0.16 }, 2.3)
    .to(add, { autoAlpha: 1, xPercent: 0, duration: 0.2 }, 2.42)
    .to(bar, { scaleX: 1, duration: 0.35, ease: "none" }, 2.55)
    .to(pass, { autoAlpha: 1, scale: 1, duration: 0.16, ease: "back.out(2)" }, 2.92)
    .to(stamp, { autoAlpha: 1, scale: 1, rotate: -6, duration: 0.18, ease: "power4.in" }, 3.08)
    .to({}, { duration: 0.12 }, 3.28);

  return (t, b) => {
    gates[0].classList.toggle("ghost", t < 0.06);
    gates[1].classList.toggle("ghost", t < 1.14);
    gates[2].classList.toggle("ghost", t < 2.24);
    gates.forEach((g, i) => g.classList.toggle("pass", t >= P_PASS[i]));
    checks.forEach((c, i) => c.classList.toggle("on", t >= P_PASS[i]));
    words.forEach((w, i) => w.classList.toggle("on", i <= b));
    cta.classList.toggle("is-set", t >= 0.76);
    approve.classList.toggle("is-ok", t >= 1.84);
  };
}

/* --------------------------------------------------------- plate 04: the stack assembles */
const B_CUTS = [1.0, 2.0, 3.0];
const B_LAND = [0.4, 1.3, 2.3, 3.25];
const B_READY = 3.85;

function buildBench(tl, $, track) {
  const q = (s) => $(s, track);
  const qq = (s) => $$(s, track);
  const plates = qq("[data-wb-plate]");
  const chips = plates.map((p) => $$("[data-wb-chip]", p));
  const lines = qq("[data-wb-ln]"); // command, four layer lines, ready
  const con = q("[data-wb-con]");
  const rule = q("[data-wb-rule]");
  const ticks = qq("[data-wb-tick]");
  const bar = q("[data-wb-bar]");
  const stamp = q("[data-wb-stamp]");
  const type = (el, at, n) => tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.16, ease: `steps(${n})` }, at);

  gsap.set(con, { clipPath: "inset(0% 0% 100% 0%)" });
  gsap.set(lines, { clipPath: "inset(0% 100% 0% 0%)" });
  gsap.set(plates, { autoAlpha: 0, yPercent: -60, scale: 1.04 });
  gsap.set(chips.flat(), { autoAlpha: 0, y: 6 });
  gsap.set(rule, { scaleY: 0 });
  gsap.set(ticks, { autoAlpha: 0, scale: 0.3 });
  gsap.set(bar, { scaleX: 0 });
  gsap.set(stamp, { autoAlpha: 0, scale: 2.4, rotate: -22 });

  // the console opens and the command runs; the build bar fills across the whole scene
  tl.to(con, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.25, ease: "power2.inOut" }, 0.05).to(bar, { scaleX: 1, duration: B_READY - 0.3, ease: "none" }, 0.25);
  type(lines[0], 0.2, 14);
  // one layer per beat: it lands in its slot, its parts arrive, the log confirms it
  plates.forEach((p, i) => {
    tl.to(p, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.26, ease: "back.out(1.4)" }, B_LAND[i]).to(chips[i], { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.05 }, B_LAND[i] + 0.18);
    type(lines[i + 1], B_LAND[i] + 0.22, 20);
  });
  // proof closes it: the rule runs down the stack, every layer ticks, ready, stamped
  tl.to(rule, { scaleY: 1, duration: 0.3, ease: "power1.inOut" }, 3.45).to(ticks, { autoAlpha: 1, scale: 1, duration: 0.1, stagger: 0.07, ease: "back.out(2.4)" }, 3.5);
  type(lines[5], 3.7, 18);
  tl.to(stamp, { autoAlpha: 1, scale: 1, rotate: -6, duration: 0.18, ease: "power4.in" }, B_READY).to({}, { duration: 0.15 }, B_READY + 0.2);
}

export function initScenes() {
  if (rm) return;
  const wb = $('[data-scene="bench"]');
  if (wb) scene(wb, { cuts: B_CUTS, build: buildBench, state: (t, b) => (t >= B_READY ? [3, 2] : b === 3 ? [1, 1] : [2, 0]) });
  const sv = $('[data-scene="services"]');
  if (sv) scene(sv, { cuts: S_CUTS, build: buildServices, state: (t, b) => (t >= S_SHEET + 0.15 ? [3, 4] : [t >= S_LIVE[b] ? 3 : 2, b]) });
  const pr = $('[data-scene="method"]');
  if (pr) scene(pr, { cuts: P_CUTS, build: buildProcess, state: (t, b) => (b === 0 ? [1, 0] : b === 1 ? [2, 1] : t < 2.92 ? [1, 0] : [3, 2]) });
}
