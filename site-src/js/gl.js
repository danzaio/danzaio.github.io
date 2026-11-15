import { gsap } from "gsap";
import { clamp } from "./util.js";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision mediump float;
uniform vec2 uRes;uniform float uDpr;uniform float uTime;
uniform vec2 uMouse;uniform float uPower;
uniform vec3 uClick;
uniform vec3 uInk;uniform vec3 uAccent;uniform float uDark;uniform float uPortrait;
uniform float uText;uniform float uGain;uniform vec4 uQ;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){
  float cell=15.*uDpr;
  vec2 g=floor(gl_FragCoord.xy/cell);
  vec2 c=(g+.5)*cell;
  vec2 uv=c/uRes;
  float asp=uRes.x/uRes.y;
  float f=n(vec2(uv.x*asp,uv.y)*3.2+vec2(uTime*.06,-uTime*.035));
  f=f*.62+n(vec2(uv.x*asp,uv.y)*8.-vec2(uTime*.05,uTime*.02))*.38;
  float shape=smoothstep(.38,.9,f);
  // quiet box (uv from bottom-left: x0,y0,x1,y1) with soft edges, so the field stays out from under the copy
  float txt=smoothstep(uQ.x-.08,uQ.x+.02,uv.x)*smoothstep(uQ.z+.1,uQ.z-.04,uv.x)*smoothstep(uQ.y-.08,uQ.y+.03,uv.y)*smoothstep(uQ.w+.08,uQ.w-.03,uv.y)*uText;
  shape*=1.-.85*txt;
  float d=distance(c,uMouse);
  float infl=smoothstep(260.*uDpr,0.,d)*uPower;
  float ct=uClick.z;
  float ring=0.;
  if(ct>=0.){float rd=distance(c,uClick.xy);float front=ct*520.*uDpr;
    ring=exp(-pow((rd-front)/(34.*uDpr),2.))*exp(-ct*1.5);}
  float rad=cell*(.07+.28*shape+.36*infl+.3*ring);
  float dist=length(gl_FragCoord.xy-c);
  float a=1.-smoothstep(rad-.9*uDpr,rad+.9*uDpr,dist);
  float base=(.16+.26*shape)*(1.-.9*txt)*uGain;
  float lift=1.+.9*uDark;
  float alpha=min(1.,a*(base*lift+.62*infl*(1.-.75*txt)*lift+.5*ring*lift));
  vec3 col=mix(uInk,uAccent,clamp(infl*1.5+ring,0.,1.));
  gl_FragColor=vec4(col*alpha,alpha);
}`;

// most fragments one field canvas may shade per frame (~2560x1250)
const MAX_PX = 3.2e6;
// the dot fields drift slowly: 60 renders a second look the same as 120 and halve their GPU time;
// the canvas itself still moves with the page at the display's full rate (compositor)
// (13.5 ms: every 2nd tick at 120/144 Hz, every tick at 60 Hz)
const FIELD_MS = 13.5;

const hex = (s) => {
  s = s.trim().replace("#", "");
  if (s.length === 3) s = s.replace(/./g, (m) => m + m);
  const n = parseInt(s, 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Reactive halftone field (hero, and the contact card). Returns null when WebGL is unavailable.
// opts: ink / accent = CSS custom property names, text = 0..1 strength of the hero's quiet zone under the title,
// gain = idle dot strength, dark = force the brighter dark-surface mix.
export function initHeroGL(canvas, host, opts = {}) {
  const o = { ink: "--ink", accent: "--orange", text: 1, gain: 1, dark: null, quiet: [0, 0.12, 0.45, 0.62], quietP: [0, 0.38, 1.2, 0.7], ...opts };
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
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
    console.warn("[hero-gl]", e.message);
    return null;
  }
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(prog, n);
  const u = { res: U("uRes"), dpr: U("uDpr"), time: U("uTime"), mouse: U("uMouse"), power: U("uPower"), click: U("uClick"), ink: U("uInk"), accent: U("uAccent"), dark: U("uDark"), portrait: U("uPortrait"), q: U("uQ") };
  gl.uniform1f(U("uText"), o.text);
  gl.uniform1f(U("uGain"), o.gain);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let dpr = 1, w = 0, h = 0;
  const m = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4, power: 0.0, tp: 0.0, last: 0 };
  let click = { x: 0, y: 0, t0: -1 };
  let visible = true;
  let running = false;
  const css = getComputedStyle(document.documentElement);
  const colors = () => {
    gl.uniform3fv(u.ink, hex(css.getPropertyValue(o.ink)));
    gl.uniform3fv(u.accent, hex(css.getPropertyValue(o.accent)));
    gl.uniform1f(u.dark, o.dark ?? (document.documentElement.dataset.theme === "ink" ? 1 : 0));
  };
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    // pixel budget: a full-screen field on a hi-DPI screen shaded 4-5 million fragments per frame
    dpr = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(MAX_PX / Math.max(1, r.width * r.height)));
    w = Math.max(2, Math.round(r.width * dpr));
    h = Math.max(2, Math.round(r.height * dpr));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.res, w, h);
    gl.uniform1f(u.dpr, dpr);
    gl.uniform1f(u.portrait, w / h < 0.9 ? 1 : 0);
    gl.uniform4fv(u.q, w / h < 0.9 ? o.quietP : o.quiet);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  colors();
  window.addEventListener("dz:theme", colors);

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    m.tx = (e.clientX - r.left) / r.width;
    m.ty = (e.clientY - r.top) / r.height;
    m.tp = 1;
    m.last = performance.now();
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", () => (m.tp = 0));
  host.addEventListener("pointerdown", (e) => {
    const r = canvas.getBoundingClientRect();
    click = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, t0: performance.now() };
  });

  // Touch: pointermove is cancelled the moment the finger starts scrolling the page, but a passive
  // touchmove keeps firing, so the halftone follows the finger WHILE you scroll (no preventDefault).
  const onTouch = (e) => {
    const t = e.touches[0];
    if (!t) return;
    const r = canvas.getBoundingClientRect();
    m.tx = (t.clientX - r.left) / r.width;
    m.ty = (t.clientY - r.top) / r.height;
    m.tp = 1;
    m.last = performance.now();
  };
  host.addEventListener("touchstart", (e) => {
    onTouch(e);
    const t = e.touches[0];
    if (t) {
      const r = canvas.getBoundingClientRect();
      click = { x: (t.clientX - r.left) / r.width, y: (t.clientY - r.top) / r.height, t0: performance.now() };
    }
  }, { passive: true });
  host.addEventListener("touchmove", onTouch, { passive: true });
  host.addEventListener("touchend", () => (m.tp = 0.35), { passive: true });

  // Scroll nudges the field too: a quick flick sends a ripple through the dots.
  let lastY = scrollY;
  let lastRipple = 0;
  const onScroll = () => {
    const y = scrollY;
    const dy = Math.abs(y - lastY);
    lastY = y;
    const now = performance.now();
    if (dy > 38 && now - lastRipple > 700) {
      const r = canvas.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        click = { x: 0.5, y: Math.min(0.9, Math.max(0.1, 0.5 - r.top / r.height * 0.5)), t0: now };
        lastRipple = now;
      }
    }
  };
  if (matchMedia("(hover:none)").matches) window.addEventListener("scroll", onScroll, { passive: true });

  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
  io.observe(canvas);

  const t0 = performance.now();
  let lastDraw = 0;
  const frame = () => {
    if (!visible || document.hidden) return;
    const now = performance.now();
    const dt = now - lastDraw;
    if (dt < FIELD_MS) return;
    lastDraw = now;
    const t = (now - t0) / 1000;
    // idle drift so touch devices / idle mice still see life
    if (now - m.last > 2200) {
      m.tx = 0.5 + Math.cos(t * 0.35) * 0.32;
      m.ty = 0.5 + Math.sin(t * 0.5) * 0.28;
      m.tp = 0.3;
    }
    // same easing as before, from the real time since the last draw (frames are skipped now)
    const k = 1 - Math.pow(0.0015, Math.min(dt, 100) / 1000);
    m.x += (m.tx - m.x) * k;
    m.y += (m.ty - m.y) * k;
    m.power += (m.tp - m.power) * (k * 0.7);
    gl.uniform1f(u.time, t);
    gl.uniform2f(u.mouse, m.x * w, (1 - m.y) * h);
    gl.uniform1f(u.power, clamp(m.power, 0, 1));
    const ct = click.t0 < 0 ? -1 : (now - click.t0) / 1000;
    gl.uniform3f(u.click, click.x * w, (1 - click.y) * h, ct > 3 ? -1 : ct);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const start = () => {
    if (running) return;
    running = true;
    gsap.ticker.add(frame);
  };
  start();
  return {
    destroy() {
      running = false;
      gsap.ticker.remove(frame);
      ro.disconnect();
      io.disconnect();
    },
  };
}





