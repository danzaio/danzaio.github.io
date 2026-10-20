import { gsap } from "gsap";
import { clamp } from "./util.js";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision mediump float;
uniform vec2 uRes;uniform float uDpr;uniform float uTime;
uniform vec2 uMouse;uniform float uPower;
uniform vec3 uClick;
uniform vec3 uInk;uniform vec3 uAccent;uniform float uDark;
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
  float txt=smoothstep(.62,.12,uv.y)*smoothstep(1.,.45,uv.x);
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
  float base=(.16+.26*shape)*(1.-.9*txt);
  float alpha=a*(base+.62*infl*(1.-.75*txt)+.5*ring);
  vec3 col=mix(uInk,uAccent,clamp(infl*1.5+ring,0.,1.));
  gl_FragColor=vec4(col*alpha,alpha);
}`;

const hex = (s) => {
  s = s.trim().replace("#", "");
  if (s.length === 3) s = s.replace(/./g, (m) => m + m);
  const n = parseInt(s, 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Reactive halftone field behind the hero. Returns null when WebGL is unavailable.
export function initHeroGL(canvas, host) {
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
  const u = { res: U("uRes"), dpr: U("uDpr"), time: U("uTime"), mouse: U("uMouse"), power: U("uPower"), click: U("uClick"), ink: U("uInk"), accent: U("uAccent"), dark: U("uDark") };
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let dpr = 1, w = 0, h = 0;
  const m = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4, power: 0.0, tp: 0.0, last: 0 };
  let click = { x: 0, y: 0, t0: -1 };
  let visible = true;
  let running = false;
  const css = getComputedStyle(document.documentElement);
  const colors = () => {
    gl.uniform3fv(u.ink, hex(css.getPropertyValue("--ink")));
    gl.uniform3fv(u.accent, hex(css.getPropertyValue("--orange")));
    gl.uniform1f(u.dark, document.documentElement.dataset.theme === "ink" ? 1 : 0);
  };
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

  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
  io.observe(canvas);

  const t0 = performance.now();
  const frame = () => {
    if (!visible || document.hidden) return;
    const now = performance.now();
    const t = (now - t0) / 1000;
    // idle drift so touch devices / idle mice still see life
    if (now - m.last > 2200) {
      m.tx = 0.5 + Math.cos(t * 0.35) * 0.32;
      m.ty = 0.5 + Math.sin(t * 0.5) * 0.28;
      m.tp = 0.3;
    }
    const k = 1 - Math.pow(0.0015, gsap.ticker.deltaRatio() / 60);
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



