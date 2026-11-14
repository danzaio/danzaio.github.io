import { gsap } from "gsap";
import { $, data, rm, fine, clamp } from "./util.js";

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

// where each screenshot is anchored when it is cropped to the card (x, y in 0..1)
const ANCHOR = { omp: [0.5, 0.4], atlas: [0, 0], zoo: [0, 0], client: [0, 0] };
const HOLD = 4.4;
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#*+=<>";

// Text resolves left to right out of random glyphs (mono type, so the width never moves).
export function scramble(el, text, duration = 0.6) {
  const o = { p: 0 };
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

// Hero card: the four projects cycle with a halftone wipe. Returns null (and leaves the still image) without WebGL.
export function initReel(card) {
  if (!card) return null;
  const canvas = $("[data-reel-gl]", card);
  const items = data.work;
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
    console.warn("[reel]", e.message);
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
  const load = (i) =>
    new Promise((res, rej) => {
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
    });

  const st = { cur: 0, next: 0, p: 0, lens: 0, mx: 0, my: 0, busy: false };
  let dpr = 1, w = 2, h = 2, need = false, live = false, onScreen = true, hover = false;

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
    const a = tex[st.cur], b = tex[st.next] || a;
    if (!a) return;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a.t);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, b.t);
    gl.uniform4fv(u.fitA, fit(st.cur));
    gl.uniform4fv(u.fitB, fit(tex[st.next] ? st.next : st.cur));
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

  /* ----- labels */
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

  /* ----- the cycle */
  let hold = null;
  const arm = () => {
    hold?.kill();
    hold = gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: HOLD, ease: "none", onComplete: advance });
    if (!onScreen || hover || document.hidden) hold.pause();
  };
  function advance() {
    const n = (st.cur + 1) % items.length;
    if (!tex[n] || st.busy) return void arm();
    st.busy = true;
    st.next = n;
    label(n);
    gsap.to(st, {
      p: 1,
      duration: 1.25,
      ease: "power2.inOut",
      onUpdate: draw,
      onComplete() {
        st.cur = n;
        st.p = 0;
        st.busy = false;
        render();
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

  /* ----- pointer: pause the cycle and show the halftone lens */
  if (fine) {
    const lensTo = gsap.quickTo(st, "lens", { duration: 0.45, ease: "power3.out", onUpdate: draw });
    card.addEventListener("pointerenter", () => {
      hover = true;
      gate();
      lensTo(1);
    });
    card.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      st.mx = clamp(e.clientX - r.left, 0, r.width);
      st.my = clamp(e.clientY - r.top, 0, r.height);
      draw();
    });
    card.addEventListener("pointerleave", () => {
      hover = false;
      gate();
      lensTo(0);
    });
  }

  /* ----- start: first picture as soon as it decodes, the rest once the page is settled */
  load(0)
    .then(() => {
      resize();
      canvas.classList.add("is-live");
      live = true;
      return Promise.all(items.slice(1).map((_, i) => load(i + 1)));
    })
    .then(() => arm())
    .catch(() => {
      if (!live) canvas.remove();
    });

  return { next: advance };
}
