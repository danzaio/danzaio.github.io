import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, data, rm, fine, clamp } from "./util.js";

/* ==========================================================================
   The wipe engine: one WebGL canvas, the project screenshots as textures, and a
   halftone wipe between any two of them. Two drivers use it:
   - initReel: the hero card cycles on a timer
   - initWorkStage: the pinned work section, where scroll scrubs the wipe
   Both leave the still <img> in place when WebGL or motion is off.
   ========================================================================== */

const VERT = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision mediump float;
varying vec2 v;
uniform sampler2D tA,tB;
uniform vec2 uRes;uniform float uDpr;
uniform vec4 uFitA,uFitB;
uniform float uP;
uniform vec2 uMouse;uniform float uLens;
uniform vec3 uInk,uLime;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 img(sampler2D t,vec4 f,vec2 uv){return texture2D(t,uv*f.xy+f.zw).rgb;}
void main(){
  vec2 frag=gl_FragCoord.xy;
  vec2 uv=vec2(v.x,1.-v.y);
  vec3 A=img(tA,uFitA,uv);
  vec3 B=img(tB,uFitB,uv);
  // wipe: the next picture grows out of a dot grid, bottom-left first, each cell slightly out of step
  float cell=18.*uDpr;
  vec2 g=floor(frag/cell);
  vec2 c=(g+.5)*cell;
  float sweep=(c.x/uRes.x)*.55+(c.y/uRes.y)*.45;
  float local=clamp((uP*1.75-sweep*.6-h(g)*.15)/.55,0.,1.);
  float r=local*cell*.78;
  float d=length(frag-c);
  float m=(1.-smoothstep(r-1.,r+1.,d))*step(.001,local);
  float rim=m*smoothstep(r-2.8*uDpr,r-1.3*uDpr,d)*step(local,.985);
  vec3 col=mix(A,B,m);
  col=mix(col,uLime,rim);
  // lens: under the pointer the picture reads as ink halftone on lime
  float lens=smoothstep(150.*uDpr,96.*uDpr,distance(frag,uMouse))*uLens;
  if(lens>0.){
    float lc=9.*uDpr;
    vec2 cc=(floor(frag/lc)+.5)*lc;
    vec2 cuv=vec2(cc.x/uRes.x,1.-cc.y/uRes.y);
    vec3 s=mix(img(tA,uFitA,cuv),img(tB,uFitB,cuv),step(.5,uP));
    float lum=dot(s,vec3(.299,.587,.114));
    float rr=lc*.7*(1.-lum*.92);
    float dotm=1.-smoothstep(rr-1.,rr+1.,length(frag-cc));
    col=mix(col,mix(uLime,uInk,dotm),lens);
  }
  gl_FragColor=vec4(col,1.);
}`;

// where each screenshot is anchored when it is cropped (x, y in 0..1)
const ANCHOR = { omp: [0.5, 0.4], atlas: [0, 0], zoo: [0, 0], client: [0, 0] };
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#*+=<>";

// Text resolves left to right out of random glyphs (mono type, so the width never moves).
export function scramble(el, text, duration = 0.6) {
  const o = { p: 0 };
  gsap.killTweensOf(el.__scr || {});
  el.__scr = o;
  return gsap.to(o, {
    p: 1,
    duration,
    ease: "none",
    onUpdate() {
      const k = Math.floor(o.p * text.length);
      let s = text.slice(0, k);
      for (let i = k; i < text.length; i++) s += text[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
      el.textContent = s;
    },
    onComplete() {
      el.textContent = text;
    },
  });
}

export function createWipe(canvas, items) {
  if (!canvas || rm || items.length < 2) return null;
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
  } catch (e) {
    console.warn("[wipe]", e.message);
    return null;
  }
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(prog, n);
  const u = { res: U("uRes"), dpr: U("uDpr"), fitA: U("uFitA"), fitB: U("uFitB"), p: U("uP"), mouse: U("uMouse"), lens: U("uLens") };
  gl.uniform1i(U("tA"), 0);
  gl.uniform1i(U("tB"), 1);
  gl.uniform3f(U("uInk"), 0.082, 0.086, 0.07);
  gl.uniform3f(U("uLime"), 0.788, 1, 0.184);

  const tex = items.map(() => null);
  const pending = items.map(() => null);
  const load = (i) =>
    (pending[i] ||= new Promise((res, rej) => {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        tex[i] = { t, a: im.naturalWidth / im.naturalHeight };
        res();
      };
      im.onerror = rej;
      im.src = "/assets/site/img/" + items[i].img;
    }));

  const st = { a: 0, b: 0, p: 0, lens: 0, mx: 0, my: 0 };
  let dpr = 1, w = 2, h = 2, need = false;

  const fit = (i) => {
    const ia = tex[i].a;
    const ca = w / h;
    const [ax, ay] = ANCHOR[items[i].id] || [0.5, 0];
    if (ia > ca) {
      const sx = ca / ia;
      return [sx, 1, (1 - sx) * ax, 0];
    }
    const sy = ia / ca;
    return [1, sy, 0, (1 - sy) * ay];
  };
  const render = () => {
    const ai = tex[st.a] ? st.a : tex[st.b] ? st.b : -1;
    if (ai < 0) return;
    const bi = tex[st.b] ? st.b : ai;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex[ai].t);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, tex[bi].t);
    gl.uniform4fv(u.fitA, fit(ai));
    gl.uniform4fv(u.fitB, fit(bi));
    gl.uniform1f(u.p, st.p);
    gl.uniform1f(u.lens, st.lens);
    gl.uniform2f(u.mouse, st.mx * dpr, h - st.my * dpr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const draw = () => (need = true);
  gsap.ticker.add(() => {
    if (!need) return;
    need = false;
    render();
  });
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = Math.max(2, Math.round(r.width * dpr));
    h = Math.max(2, Math.round(r.height * dpr));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.res, w, h);
    gl.uniform1f(u.dpr, dpr);
    render();
  };
  new ResizeObserver(resize).observe(canvas);

  const eng = {
    live: false,
    has: (i) => !!tex[i],
    // first picture as soon as it decodes, then the rest
    start(first = 0) {
      st.a = st.b = first;
      return load(first)
        .then(() => {
          resize();
          canvas.classList.add("is-live");
          eng.live = true;
          return Promise.all(items.map((_, i) => load(i)));
        })
        .catch(() => {
          if (!eng.live) canvas.remove();
          throw new Error("wipe textures");
        });
    },
    set(a, b, p) {
      if (a === st.a && b === st.b && p === st.p) return;
      st.a = a;
      st.b = b;
      st.p = p;
      draw();
    },
    // pointer lens over a host element (fine pointers only)
    lens(host, onHover) {
      if (!fine) return;
      const lensTo = gsap.quickTo(st, "lens", { duration: 0.45, ease: "power3.out", onUpdate: draw });
      host.addEventListener("pointerenter", () => {
        onHover?.(true);
        lensTo(1);
      });
      host.addEventListener("pointermove", (e) => {
        const r = canvas.getBoundingClientRect();
        st.mx = clamp(e.clientX - r.left, 0, r.width);
        st.my = clamp(e.clientY - r.top, 0, r.height);
        draw();
      });
      host.addEventListener("pointerleave", () => {
        onHover?.(false);
        lensTo(0);
      });
    },
  };
  return eng;
}

/* ------------------------------------------------- driver 1: the hero reel */
const HOLD = 4.4;
export function initReel(card) {
  if (!card) return null;
  const items = data.work;
  const eng = createWipe($("[data-reel-gl]", card), items);
  if (!eng) return null;

  const nEl = $("[data-reel-n]", card);
  const tEl = $("[data-reel-title]", card);
  const kEl = $("[data-reel-kicker]", card);
  const bar = $("[data-reel-bar]", card);
  const label = (i) => {
    const it = items[i];
    nEl.textContent = String(i + 1).padStart(2, "0");
    scramble(tEl, it.title.toUpperCase(), 0.55);
    scramble(kEl, it.kicker.toUpperCase(), 0.75);
    card.href = it.live || it.repo;
    card.setAttribute("aria-label", `${it.title}. ${it.kicker}`);
  };

  let cur = 0, busy = false, onScreen = true, hover = false, hold = null;
  const arm = () => {
    hold?.kill();
    hold = gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: HOLD, ease: "none", onComplete: advance });
    gate();
  };
  function advance() {
    const n = (cur + 1) % items.length;
    if (!eng.has(n) || busy) return void arm();
    busy = true;
    label(n);
    const o = { p: 0 };
    gsap.to(o, {
      p: 1,
      duration: 1.25,
      ease: "power2.inOut",
      onUpdate: () => eng.set(cur, n, o.p),
      onComplete() {
        cur = n;
        busy = false;
        eng.set(n, n, 0);
        arm();
      },
    });
  }
  const gate = () => {
    if (!hold) return;
    if (onScreen && !hover && !document.hidden) hold.resume();
    else hold.pause();
  };
  new IntersectionObserver(([en]) => {
    onScreen = en.isIntersecting;
    gate();
  }).observe(card);
  document.addEventListener("visibilitychange", gate);
  eng.lens(card, (on) => {
    hover = on;
    gate();
  });
  eng.start(0).then(arm, () => {});
  return { next: advance };
}

/* --------------------------------------- driver 2: the pinned work stage */
// Scroll position maps to a pair of projects and a wipe amount: hold, wipe, hold.
export function initWorkStage(root, scrollTo) {
  const track = $("[data-wk]", root);
  const stage = $("[data-wk-stage]", root);
  if (!track || !stage || rm) return null;
  const items = data.work;
  const n = items.length;
  const rows = $$("[data-wk-item]", root);
  const img = $("[data-wk-img]", stage);
  const urlEl = $("[data-wk-url]", stage);
  const nEl = $("[data-wk-n]", stage);
  const meter = $$(".wk-meter i", stage);
  const wide = matchMedia("(min-width: 901px)");
  let eng = null;
  let st = null;
  let cur = 0;

  const ensure = () => {
    if (eng || !wide.matches) return;
    eng = createWipe($("[data-wk-gl]", stage), items);
    if (!eng) return;
    // textures load once the section gets near
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        eng.start(cur).then(() => st && update(st), () => (eng = null));
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(stage);
    eng.lens(stage);
  };
  ensure();
  wide.addEventListener?.("change", ensure);

  const activate = (i) => {
    if (i === cur) return;
    cur = i;
    rows.forEach((r, k) => r.classList.toggle("on", k === i));
    nEl.textContent = String(i + 1).padStart(2, "0");
    scramble(urlEl, items[i].url, 0.5);
    if (!eng?.live) img.src = "/assets/site/img/" + items[i].img;
  };
  // progress 0..1 -> f 0..n-1, with a little extra hold on the first and last project
  const fOf = (p) => clamp(p * (n - 1 + 0.6) - 0.3, 0, n - 1);
  const pOf = (f) => (f + 0.3) / (n - 1 + 0.6);
  function update(self) {
    if (!wide.matches) return;
    const f = fOf(self.progress);
    const a = Math.min(n - 2, Math.floor(f));
    const p = clamp((f - a - 0.3) / 0.4, 0, 1);
    eng?.live && eng.set(a, a + 1, p);
    meter.forEach((m, k) => m.style.setProperty("--f", clamp(f - k + 1, 0, 1).toFixed(3)));
    activate(p > 0.5 ? a + 1 : a);
  }
  st = ScrollTrigger.create({ trigger: track, start: "top top", end: "bottom bottom", onUpdate: update, onRefresh: update });

  // a row click (or keyboard focus inside a row) scrolls to that project's hold position
  const go = (i) => {
    if (!wide.matches || !st) return;
    scrollTo(st.start + pOf(i) * (st.end - st.start));
  };
  rows.forEach((r, i) => {
    r.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      go(i);
    });
    r.addEventListener("focusin", () => i !== cur && go(i));
  });
  return { go };
}
