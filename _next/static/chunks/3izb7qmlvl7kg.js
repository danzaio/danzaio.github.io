(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,52740,e=>{"use strict";var t=e.i(43476),r=e.i(71645),o=e.i(75157);let a={colorful:{dark:{h:[{color:[255,50,100],op:.38},{color:[40,180,220],op:.35},{color:[50,200,80],op:.38},{color:[180,40,240],op:.35},{color:[255,160,30],op:.38},{color:[100,70,255],op:.35}],v:[{color:[40,140,255],op:.38},{color:[240,50,180],op:.35},{color:[30,185,170],op:.38},{color:[255,120,40],op:.38},{color:[100,70,255],op:.35},{color:[50,200,80],op:.38}]},light:{h:[{color:[200,30,70],op:.28},{color:[20,140,180],op:.24},{color:[30,160,50],op:.28},{color:[140,20,200],op:.24},{color:[210,120,10],op:.28},{color:[70,40,210],op:.24}],v:[{color:[20,100,210],op:.28},{color:[200,30,140],op:.24},{color:[15,145,130],op:.28},{color:[210,90,20],op:.28},{color:[70,40,210],op:.24},{color:[30,160,50],op:.28}]}},mono:{dark:{h:[{color:[200,200,200],op:.16},{color:[180,180,180],op:.13},{color:[190,190,190],op:.16},{color:[175,175,175],op:.13},{color:[195,195,195],op:.16},{color:[185,185,185],op:.13}],v:[{color:[185,185,185],op:.16},{color:[170,170,170],op:.13},{color:[195,195,195],op:.16},{color:[180,180,180],op:.13},{color:[190,190,190],op:.16},{color:[175,175,175],op:.13}]},light:{h:[{color:[90,90,90],op:.13},{color:[110,110,110],op:.1},{color:[80,80,80],op:.13},{color:[100,100,100],op:.1},{color:[85,85,85],op:.13},{color:[95,95,95],op:.1}],v:[{color:[100,100,100],op:.13},{color:[80,80,80],op:.1},{color:[90,90,90],op:.13},{color:[110,110,110],op:.1},{color:[85,85,85],op:.13},{color:[95,95,95],op:.1}]}},ocean:{dark:{h:[{color:[100,80,255],op:.38},{color:[60,140,255],op:.35},{color:[80,100,220],op:.38},{color:[130,70,255],op:.35},{color:[50,120,230],op:.38},{color:[110,90,240],op:.35}],v:[{color:[70,130,255],op:.38},{color:[120,80,240],op:.35},{color:[90,110,230],op:.38},{color:[60,100,255],op:.35},{color:[140,100,255],op:.38},{color:[80,120,220],op:.35}]},light:{h:[{color:[60,50,180],op:.28},{color:[40,100,210],op:.24},{color:[50,70,190],op:.28},{color:[90,50,200],op:.24},{color:[30,80,200],op:.28},{color:[70,60,210],op:.24}],v:[{color:[50,90,220],op:.28},{color:[80,60,200],op:.24},{color:[60,80,210],op:.28},{color:[40,70,200],op:.24},{color:[100,80,230],op:.28},{color:[55,85,195],op:.24}]}},sunset:{dark:{h:[{color:[255,100,60],op:.38},{color:[255,180,50],op:.35},{color:[255,80,80],op:.38},{color:[255,140,40],op:.35},{color:[255,200,60],op:.38},{color:[255,120,50],op:.35}],v:[{color:[255,160,70],op:.38},{color:[255,90,60],op:.35},{color:[255,200,50],op:.38},{color:[255,70,70],op:.35},{color:[255,150,40],op:.38},{color:[255,100,80],op:.35}]},light:{h:[{color:[200,70,30],op:.28},{color:[210,140,20],op:.24},{color:[190,50,50],op:.28},{color:[200,100,20],op:.24},{color:[220,160,30],op:.28},{color:[195,80,25],op:.24}],v:[{color:[210,120,40],op:.28},{color:[190,60,40],op:.24},{color:[220,160,25],op:.28},{color:[185,45,45],op:.24},{color:[200,110,20],op:.28},{color:[195,75,50],op:.24}]}}};function n(e){let t=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",e),()=>t.removeEventListener("change",e)}function i(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function l(e,t){return Math.exp(-(e*e)/(2*t*t))}function s({rows:e,cols:r,dividerStroke:a="var(--border)",className:n,...i}){return(0,t.jsxs)("svg",{"aria-hidden":!0,className:(0,o.cn)("pointer-events-none absolute inset-0 z-1 h-full w-full",n),preserveAspectRatio:"none",role:"presentation",...i,children:[Array.from({length:e-1},(r,o)=>{let n=`${(o+1)/e*100}%`;return(0,t.jsx)("line",{stroke:a,strokeWidth:1,x1:"0",x2:"100%",y1:n,y2:n},`h-${e}-${n}`)}),Array.from({length:r-1},(e,o)=>{let n=`${(o+1)/r*100}%`;return(0,t.jsx)("line",{stroke:a,strokeWidth:1,x1:n,x2:n,y1:"0",y2:"100%"},`v-${r}-${n}`)})]})}let c=(0,r.forwardRef)(function({className:e,style:r,borderRadius:a,...n},i){return(0,t.jsx)("canvas",{"aria-hidden":!0,className:(0,o.cn)("pointer-events-none absolute inset-0 z-2 h-full w-full",e),ref:i,style:{borderRadius:a,...r},...n})});function u({className:e,...r}){return(0,t.jsx)("div",{className:(0,o.cn)("relative z-3",e),"data-slot":"grid-beam-content",...r})}e.s(["GridBeam",0,function({children:e,className:d,style:f,borderRadius:p,rows:h,cols:g,colorVariant:m,theme:x,active:v,duration:b,strength:y,breathe:w,..._}){let{canvasRef:M,rows:k,cols:C}=function({rows:e=3,cols:t=4,colorVariant:o="colorful",theme:s="dark",active:c=!0,duration:u=3,strength:d=1,breathe:f=!0}){var p;let h,g,m=Math.max(2,e),x=Math.max(2,t),v=(0,r.useRef)(null),[b,y]=(0,r.useState)(!1),[w,_]=(0,r.useState)(null),M=(0,r.useRef)(c),k=(h=(0,r.useSyncExternalStore)(n,i,()=>"light"),"auto"===s?h:s),C=(0,r.useMemo)(()=>{let e;return(e=a[o])?e[k]??a.colorful.dark:a.colorful.dark},[o,k]);return(0,r.useEffect)(()=>{if(M.current&&!c){y(!0),_(performance.now());let e=window.setTimeout(()=>y(!1),700);return M.current=c,()=>window.clearTimeout(e)}M.current=c},[c]),p={rows:m,cols:x,palette:C,active:c,fadingOut:b,fadeStart:w,duration:u,strength:d,breathe:f},g=(0,r.useEffectEvent)(()=>p),(0,r.useEffect)(()=>{let e=v.current;if(!e)return;let t=e.getContext("2d",{alpha:!0});if(!t)return;let r=window.devicePixelRatio||1,o=()=>{let o=e.getBoundingClientRect();e.width=o.width*r,e.height=o.height*r,t.setTransform(r,0,0,r,0,0)};o();let a=new ResizeObserver(o);a.observe(e);let n=performance.now(),i=null,s=r=>{let{rows:o,cols:a,palette:c,active:u,fadingOut:d,fadeStart:f,duration:p,strength:h,breathe:m}=g(),x=e.getBoundingClientRect(),v=x.width,b=x.height;if(t.clearRect(0,0,v,b),!(u||d)){i=requestAnimationFrame(s);return}let y=(r-n)/1e3,w=1;if(d&&f){if((w=Math.max(0,1-(r-f)/600))<=0){i=requestAnimationFrame(s);return}}else{var _;u&&(w=(_=Math.min(1,y/.8))*_*(3-2*_))}let M=v/a,k=b/o,C=w*h,S=m?.85+.3*Math.sin(1.4*y)+.1*Math.sin(2.3*y):1,R=(e,t,r,o)=>`rgba(${e},${t},${r},${Math.max(0,o).toFixed(4)})`;for(let e=1;e<o;e++){let r=e*k,o=c.h[e%c.h.length],[a,n,i]=o.color,l=o.op,s=(y*(1+e%3*.12)/p+(.21*e+e%2*.35))%1*v,u=.6*M*S,d=t.createRadialGradient(s,r,0,s,r,u);d.addColorStop(0,R(a,n,i,.3*l*C)),d.addColorStop(.4,R(a,n,i,.12*l*C)),d.addColorStop(1,"transparent"),t.save(),t.scale(1,4/u),t.fillStyle=d,t.beginPath(),t.arc(s,r*u/4,u,0,2*Math.PI),t.fill(),t.restore();let f=.55*M*S,h=t.createLinearGradient(s-f,r,s+f,r);h.addColorStop(0,"transparent"),h.addColorStop(.12,R(a,n,i,.4*l*C)),h.addColorStop(.35,R(Math.min(255,a+60),Math.min(255,n+60),Math.min(255,i+60),.8*l*C)),h.addColorStop(.5,R(Math.min(255,a+100),Math.min(255,n+100),Math.min(255,i+100),l*C)),h.addColorStop(.65,R(Math.min(255,a+60),Math.min(255,n+60),Math.min(255,i+60),.8*l*C)),h.addColorStop(.88,R(a,n,i,.4*l*C)),h.addColorStop(1,"transparent"),t.strokeStyle=h,t.lineWidth=1.5,t.beginPath(),t.moveTo(s-f,r),t.lineTo(s+f,r),t.stroke()}for(let e=1;e<a;e++){let r=e*M,o=c.v[e%c.v.length],[a,n,i]=o.color,l=o.op,s=(y*(1+e%3*.1)/(1.2*p)+(.26*e+e%2*.4))%1*b,u=.6*k*S,d=t.createRadialGradient(r,s,0,r,s,u);d.addColorStop(0,R(a,n,i,.3*l*C)),d.addColorStop(.4,R(a,n,i,.12*l*C)),d.addColorStop(1,"transparent"),t.save(),t.scale(4/u,1),t.fillStyle=d,t.beginPath(),t.arc(r*u/4,s,u,0,2*Math.PI),t.fill(),t.restore();let f=.55*k*S,h=t.createLinearGradient(r,s-f,r,s+f);h.addColorStop(0,"transparent"),h.addColorStop(.12,R(a,n,i,.4*l*C)),h.addColorStop(.35,R(Math.min(255,a+60),Math.min(255,n+60),Math.min(255,i+60),.8*l*C)),h.addColorStop(.5,R(Math.min(255,a+100),Math.min(255,n+100),Math.min(255,i+100),l*C)),h.addColorStop(.65,R(Math.min(255,a+60),Math.min(255,n+60),Math.min(255,i+60),.8*l*C)),h.addColorStop(.88,R(a,n,i,.4*l*C)),h.addColorStop(1,"transparent"),t.strokeStyle=h,t.lineWidth=1.5,t.beginPath(),t.moveTo(r,s-f),t.lineTo(r,s+f),t.stroke()}for(let e=1;e<o;e++)for(let r=1;r<a;r++){let o=r*M,a=e*k,n=(y*(1+e%3*.12)/p+(.21*e+e%2*.35))%1*v,i=(y*(1+r%3*.1)/(1.2*p)+(.26*r+r%2*.4))%1*b,s=l((n-o)/M,.25)*l((i-a)/k,.25);if(s>.05){let n=c.h[e%c.h.length],i=c.v[r%c.v.length],l=Math.floor((n.color[0]+i.color[0])/2),u=Math.floor((n.color[1]+i.color[1])/2),d=Math.floor((n.color[2]+i.color[2])/2),f=3.5*Math.sqrt(s),p=.6*s*C,h=t.createRadialGradient(o,a,0,o,a,f);h.addColorStop(0,R(Math.min(255,l+140),Math.min(255,u+140),Math.min(255,d+140),p)),h.addColorStop(.5,R(l,u,d,.4*p)),h.addColorStop(1,"transparent"),t.fillStyle=h,t.beginPath(),t.arc(o,a,f,0,2*Math.PI),t.fill()}}i=requestAnimationFrame(s)};return i=requestAnimationFrame(s),()=>{null!==i&&cancelAnimationFrame(i),a.disconnect()}},[v]),{canvasRef:v,palette:C,resolvedScheme:k,rows:m,cols:x,fadingOut:b,fadeStart:w}}({rows:h,cols:g,colorVariant:m,theme:x,active:v,duration:b,strength:y,breathe:w});return(0,t.jsxs)("div",{className:(0,o.cn)("relative overflow-hidden",d),"data-slot":"grid-beam",style:{borderRadius:p,...f},..._,children:[(0,t.jsx)(s,{cols:C,rows:k}),(0,t.jsx)(c,{borderRadius:p,ref:M}),(0,t.jsx)(u,{children:e})]})}])},25913,e=>{"use strict";var t=e.i(7670);let r=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,o=t.clsx;e.s(["cva",0,(e,t)=>a=>{var n;if((null==t?void 0:t.variants)==null)return o(e,null==a?void 0:a.class,null==a?void 0:a.className);let{variants:i,defaultVariants:l}=t,s=Object.keys(i).map(e=>{let t=null==a?void 0:a[e],o=null==l?void 0:l[e];if(null===t)return null;let n=r(t)||r(o);return i[e][n]}),c=a&&Object.entries(a).reduce((e,t)=>{let[r,o]=t;return void 0===o||(e[r]=o),e},{});return o(e,s,null==t||null==(n=t.compoundVariants)?void 0:n.reduce((e,t)=>{let{class:r,className:o,...a}=t;return Object.entries(a).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...l,...c}[t]):({...l,...c})[t]===r})?[...e,r,o]:e},[]),null==a?void 0:a.class,null==a?void 0:a.className)}])},40604,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let o={chromatic:{name:"chromatic",modes:{dark:{colors:["#000000","#aae8ff","#c5fe9e","#f7888d","#0d0d0d","#fffdc3","#007cff"],alphas:[1,1,1,1,1,1,1],direction:80,speed:1.2,intensity:2,scale:1.6,softness:.18,distortion:.3,complexity:.68,shape:1,blur:1,vignette:.26,vigOpacity:.6,shaderOpacity:1},light:{colors:["#ffffff","#ffffff","#ffffff","#ffb3b3","#adadad","#f5ff70","#007cff"],alphas:[1,1,1,1,1,1,1],direction:80,speed:1.2,intensity:2,scale:2.5,softness:.18,distortion:.3,complexity:.68,shape:1,blur:1,vignette:.24,vigOpacity:.16,shaderOpacity:1}}},silver:{name:"silver",modes:{dark:{colors:["#000000","#dedede","#747270","#e5e5e5","#0d0d0d","#ffffff","#e6e6e6"],alphas:[1,1,1,1,1,1,1],direction:80,speed:1.2,intensity:2,scale:2.5,softness:.18,distortion:.3,complexity:.68,shape:1,blur:1,vignette:.26,vigOpacity:.6,shaderOpacity:.88},light:{colors:["#f6f6f6","#ffffff","#ffffff","#f7f7f7","#c9c9c9","#d0d0d0","#d1d1d1"],alphas:[1,1,1,1,1,1,1],direction:80,speed:1.2,intensity:2,scale:2.5,softness:.18,distortion:.3,complexity:.68,shape:1,blur:1,vignette:.2,vigOpacity:.26,shaderOpacity:1}}},gold:{name:"gold",modes:{dark:{colors:["#000000","#ffffff","#ffffff","#f7d488","#0d0d0d","#fffdc3","#ffffff"],alphas:[1,1,1,1,1,1,1],direction:80,speed:1,intensity:2,scale:2.5,softness:.18,distortion:.3,complexity:.68,shape:1,blur:1,vignette:.26,vigOpacity:.6,shaderOpacity:.92},light:{colors:["#fff8e1","#fffbe0","#ffffff","#fff6d6","#d2c7a7","#dcd2bc","#f9f7e5"],alphas:[1,1,1,1,1,1,1],direction:80,speed:1.2,intensity:2,scale:2.5,softness:.18,distortion:.3,complexity:.68,shape:1,blur:1,vignette:.22,vigOpacity:.24,shaderOpacity:1}}}},a=`
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`,n=`
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1, u_color2, u_color3, u_color4, u_color5, u_color6, u_color7;
  uniform float u_alpha1, u_alpha2, u_alpha3, u_alpha4, u_alpha5, u_alpha6, u_alpha7;
  uniform float u_intensity, u_scale, u_direction;
  uniform float u_softness, u_distortion, u_complexity, u_shape;
  uniform float u_vignette, u_vigOpacity, u_blur, u_shaderOpacity;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p, float oct) {
    float val = 0.0, amp = 0.5;
    int n = int(oct);
    for (int i = 0; i < 7; i++) {
      if (i >= n) break;
      val += amp * snoise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return val;
  }

  float nfbm(vec2 p) { return fbm(p, 3.0 + u_complexity * 4.0); }

  /* 5-stop palette used by effect 1 (Plasma) — direct port of \`palette\` from
   * the canonical engine. Stops at t = 0, 0.25, 0.5, 0.75, 1.0. */
  vec3 palette(float t) {
    t = clamp(t, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    float k = 64.0;
    float w1 = u_alpha1 * exp(-k * t * t);
    float w2 = u_alpha2 * exp(-k * (t - 0.25) * (t - 0.25));
    float w3 = u_alpha3 * exp(-k * (t - 0.5)  * (t - 0.5));
    float w4 = u_alpha4 * exp(-k * (t - 0.75) * (t - 0.75));
    float w5 = u_alpha5 * exp(-k * (t - 1.0)  * (t - 1.0));
    float total = w1 + w2 + w3 + w4 + w5 + 0.0001;
    return (u_color1 * w1 + u_color2 * w2 + u_color3 * w3 +
            u_color4 * w4 + u_color5 * w5) / total;
  }

  /* Per-pixel alpha that re-introduces transparency when the user dials any
   * palette stop's alpha below 1. Same \`paletteAlpha\` from the canonical
   * engine. With every preset shipping all-1 alphas, this returns ~1 for every
   * pixel — but mirroring it keeps custom-preset behaviour identical. */
  float paletteAlpha(float t) {
    t = clamp(t, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    float k = 64.0;
    float w1 = u_alpha1 * exp(-k * t * t);
    float w2 = u_alpha2 * exp(-k * (t - 0.25) * (t - 0.25));
    float w3 = u_alpha3 * exp(-k * (t - 0.5)  * (t - 0.5));
    float w4 = u_alpha4 * exp(-k * (t - 0.75) * (t - 0.75));
    float w5 = u_alpha5 * exp(-k * (t - 1.0)  * (t - 1.0));
    float totalW = w1 + w2 + w3 + w4 + w5 + 0.0001;
    float rawW = exp(-k * t * t)
               + exp(-k * (t - 0.25) * (t - 0.25))
               + exp(-k * (t - 0.5)  * (t - 0.5))
               + exp(-k * (t - 0.75) * (t - 0.75))
               + exp(-k * (t - 1.0)  * (t - 1.0))
               + 0.0001;
    return totalW / rawW;
  }

  vec2 warp(vec2 p, float t) {
    float str = u_distortion * 2.0;
    return vec2(
      nfbm(p + vec2(t * 0.1, 0.0)),
      nfbm(p + vec2(0.0, t * 0.12) + 5.0)
    ) * str;
  }

  /* Plasma: four sine bands warped by an FBM field, mapped through the
   * 5-stop palette. Identical to effect 1 in the canonical engine. */
  vec3 computeEffect(vec2 uv, float aspect, float t, float dist, float cpx) {
    vec2 p = (uv - 0.5) * u_scale;
    p.x *= aspect;
    p += vec2(cos(u_direction), sin(u_direction)) * t * 0.15;

    float freq = 3.0 + cpx * 8.0;
    float val = 0.0;
    val += sin(p.x * freq + t);
    val += sin(p.y * freq + t * 1.3);
    val += sin((p.x + p.y) * freq * 0.7 + t * 0.7);
    val += sin(length(p) * freq * 0.8 - t * 1.5);
    vec2 w = warp(p, t);
    val += (w.x + w.y) * dist;
    val = val * 0.2 * u_intensity + 0.5;

    return palette(clamp(val, 0.0, 1.0));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    float t = u_time;          // JS already multiplied u_time by preset.speed.
    float dist = u_distortion;
    float cpx = u_complexity;

    /* 5-tap cross blur (center + cardinal offsets). The chromatic/silver/gold
     * presets all ship with blur=1 so this path is always active. 5 taps
     * instead of the canonical engine's 9 saves ~44% fragment work; the
     * perceptual difference is nil because the output is already soft from
     * the plasma's low spatial frequency and CSS blur on reflections. */
    vec3 col;
    if (u_blur < 0.01) {
      col = computeEffect(uv, aspect, t, dist, cpx);
    } else {
      float r = u_blur * 0.02;
      col  = computeEffect(uv,                  aspect, t, dist, cpx) * 0.4;
      col += computeEffect(uv + vec2( r, 0.0),  aspect, t, dist, cpx) * 0.15;
      col += computeEffect(uv + vec2(-r, 0.0),  aspect, t, dist, cpx) * 0.15;
      col += computeEffect(uv + vec2(0.0,  r),  aspect, t, dist, cpx) * 0.15;
      col += computeEffect(uv + vec2(0.0, -r),  aspect, t, dist, cpx) * 0.15;
    }

    /* Gamma punch — adds the contrast pop that defines the chromatic
     * highlights. From the canonical engine: \`col = pow(col, vec3(1.3))\`. */
    col = pow(col, vec3(1.3));

    /* Vignette — soft edge darkening so corners read as recessed. The 40-px
     * scale at the bottom of the formula is hard-coded in the canonical
     * engine; we keep it for visual parity. */
    float edgeDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float vigPx = 40.0 / min(u_resolution.x, u_resolution.y);
    float vigRange = vigPx * (1.0 + u_vignette * 3.0);
    float vig = edgeDist * edgeDist / (vigRange * vigRange);
    vig = smoothstep(0.0, 1.0, vig);
    col *= mix(1.0, vig, u_vignette * u_vigOpacity);

    /* Per-pixel alpha. With all-1 alphas the formula collapses to ~1 but the
     * computation matches the canonical engine so custom presets behave the
     * same. */
    float colorAlpha = (u_alpha1 + u_alpha2 + u_alpha3 + u_alpha4 + u_alpha5) / 5.0;
    if (colorAlpha < 0.999) {
      vec3 c1d = col - u_color1, c2d = col - u_color2, c3d = col - u_color3,
           c4d = col - u_color4, c5d = col - u_color5;
      float prox1 = exp(-8.0 * dot(c1d, c1d));
      float prox2 = exp(-8.0 * dot(c2d, c2d));
      float prox3 = exp(-8.0 * dot(c3d, c3d));
      float prox4 = exp(-8.0 * dot(c4d, c4d));
      float prox5 = exp(-8.0 * dot(c5d, c5d));
      float pTotal = prox1 + prox2 + prox3 + prox4 + prox5 + 0.0001;
      colorAlpha = (prox1 * u_alpha1 + prox2 * u_alpha2 + prox3 * u_alpha3 +
                    prox4 * u_alpha4 + prox5 * u_alpha5) / pTotal;
    }
    float alpha = colorAlpha;

    /* Touch the unused-at-effect-1 uniforms so GL drivers that complain about
     * declared-but-unread uniforms (some Mali / Adreno builds do) keep them
     * live. The contribution is provably zero. */
    alpha += 0.0 * (u_softness + u_shape +
                    u_alpha6 + u_alpha7 +
                    u_color6.x + u_color7.x);

    gl_FragColor = vec4(col, alpha * u_shaderOpacity);
  }
`;function i(e,t,r){let o=e.createShader(t);if(!o)throw Error("metal-fx: gl.createShader returned null");if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(o);throw e.deleteShader(o),Error(`metal-fx: shader compile failed: ${t??"(no info log)"}`)}return o}let l=null,s=null,c=["u_resolution","u_time","u_color1","u_color2","u_color3","u_color4","u_color5","u_color6","u_color7","u_alpha1","u_alpha2","u_alpha3","u_alpha4","u_alpha5","u_alpha6","u_alpha7","u_intensity","u_scale","u_direction","u_softness","u_distortion","u_complexity","u_shape","u_vignette","u_vigOpacity","u_blur","u_shaderOpacity"];function u(e){e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);let t=i(e,e.VERTEX_SHADER,a),r=i(e,e.FRAGMENT_SHADER,n),o=function(e,t,r){let o=e.createProgram();if(!o)throw Error("metal-fx: gl.createProgram returned null");if(e.attachShader(o,t),e.attachShader(o,r),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o);throw e.deleteProgram(o),Error(`metal-fx: program link failed: ${t??"(no info log)"}`)}return o}(e,t,r);e.useProgram(o);let l=e.createBuffer();if(!l)throw Error("metal-fx: gl.createBuffer returned null");e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let s=e.getAttribLocation(o,"a_position");e.enableVertexAttribArray(s),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0);let u={};for(let t of c)u[t]=e.getUniformLocation(o,t);return{program:o,buffer:l,uniforms:u}}function d(){let e,t;if(l)return l;let r=Math.min(2,"u">typeof window&&window.devicePixelRatio||1),a=Math.round(96*r),n="u">typeof OffscreenCanvas;if(n)t=(e=new OffscreenCanvas(a,a)).getContext("webgl",{alpha:!0,premultipliedAlpha:!1,antialias:!1});else{let r=document.createElement("canvas");r.width=a,r.height=a,t=r.getContext("webgl",{alpha:!0,premultipliedAlpha:!1,antialias:!1,preserveDrawingBuffer:!0})??r.getContext("experimental-webgl"),e=r}if(!t)throw Error("metal-fx: WebGL not supported");let{program:i,buffer:c,uniforms:d}=u(t);return e.addEventListener("webglcontextlost",e=>{e.preventDefault(),l&&(l.contextLost=!0)},!1),e.addEventListener("webglcontextrestored",()=>{if(!l)return;let e=u(l.gl);l.program=e.program,l.buffer=e.buffer,l.uniforms=e.uniforms,l.presetDirty=!0,l.contextLost=!1,null==s||s()},!1),l={glCanvas:e,gl:t,program:i,buffer:c,uniforms:d,preset:o.chromatic.modes.dark,presetDirty:!0,contextLost:!1,useOffscreen:n,frameBitmap:null,startMs:performance.now(),pausedMs:0,pausedAtMs:null,rafId:0,dpr:r,instances:new Set,frameCount:0,glowQueue:[],glowIdx:0,glowSkip:0,glowPixels:new Uint8Array(a*a*4),glowPixelsW:a,glowPixelsH:a}}let f=0;function p(){if(!l)return;let e=performance.now();if(e-f<1500)return;f=e;let{gl:t,glCanvas:r}=l,o=r.width,a=r.height;(l.glowPixelsW!==o||l.glowPixelsH!==a)&&(l.glowPixelsW=o,l.glowPixelsH=a,l.glowPixels=new Uint8Array(o*a*4)),t.readPixels(0,0,o,a,t.RGBA,t.UNSIGNED_BYTE,l.glowPixels)}let h={bx:0,by:0};function g(e,t,r){if(!l)return h.bx=0,h.by=0,h;let{glCanvas:o}=l,a=o.width,n=o.height,i=e.dpr,s=e.cssWidth*i,c=e.cssHeight*i,u=a/(140*i)*s/e.shaderScale,d=n/(40*i)*c/e.shaderScale;u>a&&(u=a),d>n&&(d=n);let f=(n-d)/2,p=(a-u)/2+t/e.cssWidth*u,g=f+r/e.cssHeight*d;return h.bx=Math.round(p),h.by=Math.round(n-1-g),h}let m={r:0,g:0,b:0,lum:0,count:0};function x(e,t,r,o,a,n){let i=Math.max(1,0|n),l=Math.max(0,o-i),s=Math.min(t,o+i+1),c=Math.max(0,a-i),u=Math.min(r,a+i+1);m.r=0,m.g=0,m.b=0,m.lum=0,m.count=0;for(let r=c;r<u;r++){let o=r*t;for(let t=l;t<s;t++){let r=(o+t)*4;m.r+=e[r],m.g+=e[r+1],m.b+=e[r+2],m.lum+=(.2126*e[r]+.7152*e[r+1]+.0722*e[r+2])/255,m.count++}}return m}let v={r:255,g:255,b:255};function b(e,t,r,o){if(!l)return 0;p();let a=g(e,t,r),n=x(l.glowPixels,l.glowPixelsW,l.glowPixelsH,a.bx,a.by,o);return n.count>0?n.lum/n.count:0}function y(e,t){let r=!1;void 0!==t.cssWidth&&t.cssWidth!==e.cssWidth&&(e.cssWidth=t.cssWidth,r=!0),void 0!==t.cssHeight&&t.cssHeight!==e.cssHeight&&(e.cssHeight=t.cssHeight,r=!0),void 0!==t.cornerRadius&&(e.cornerRadius=t.cornerRadius),void 0!==t.scale&&(e.scale=t.scale),void 0!==t.kind&&t.kind!==e.kind&&(e.kind=t.kind,void 0===t.shaderScale&&(e.shaderScale=("circle"===t.kind?1.3:1.6)*e.scale),void 0===t.ringCssPx&&(e.ringCssPx=("circle"===t.kind?2:1)*e.scale)),void 0!==t.shaderScale&&(e.shaderScale=t.shaderScale),void 0!==t.ringCssPx&&(e.ringCssPx=t.ringCssPx),void 0!==t.opacityMul&&(e.opacityMul=t.opacityMul),void 0!==t.paused&&t.paused!==e.paused&&(e.paused=t.paused,t.paused||!l||0!==l.rafId||null!==l.pausedAtMs||l.contextLost||C()),r&&_(e)}s=()=>{l&&l.instances.size>0&&null===l.pausedAtMs&&C()},"u">typeof document&&document.addEventListener("visibilitychange",()=>{!l||null!==l.pausedAtMs||l.contextLost||(document.hidden?S():l.instances.size>0&&C())});let w=null;function _(e){e.dpr="u">typeof window&&window.devicePixelRatio||1;let t=Math.max(1,Math.round(e.cssWidth*e.dpr)),r=Math.max(1,Math.round(e.cssHeight*e.dpr));e.canvas.width!==t&&(e.canvas.width=t),e.canvas.height!==r&&(e.canvas.height=r)}let M=0;function k(e){var t;if(!l)return;if(l.contextLost){l.rafId=0;return}let r=!1;for(let e of l.instances)if(e.visible&&(!e.paused||!e.everCopied)){r=!0;break}if(!r){l.rafId=0;return}if(l.rafId=requestAnimationFrame(k),!(e-M<66)){for(let r of(M=e,function(e){if(!l)return;let{gl:t,uniforms:r,preset:o,glCanvas:a}=l,n=(e-l.startMs-l.pausedMs)/1e3*o.speed;t.viewport(0,0,a.width,a.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),l.presetDirty&&function(){if(!l)return;let{gl:e,uniforms:t,preset:r,glCanvas:o}=l;t.u_resolution&&e.uniform2f(t.u_resolution,o.width,o.height);for(let o=0;o<7;o++){let a=t[`u_color${o+1}`];if(a){let[t,n,i]=function(e){let t=e.replace("#","");return 3===t.length&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]}(r.colors[o]);e.uniform3f(a,t,n,i)}let n=t[`u_alpha${o+1}`];n&&e.uniform1f(n,r.alphas[o])}t.u_intensity&&e.uniform1f(t.u_intensity,r.intensity),t.u_scale&&e.uniform1f(t.u_scale,r.scale),t.u_direction&&e.uniform1f(t.u_direction,r.direction*Math.PI/180),t.u_softness&&e.uniform1f(t.u_softness,r.softness),t.u_distortion&&e.uniform1f(t.u_distortion,r.distortion),t.u_complexity&&e.uniform1f(t.u_complexity,r.complexity),t.u_shape&&e.uniform1f(t.u_shape,r.shape),t.u_vignette&&e.uniform1f(t.u_vignette,r.vignette),t.u_vigOpacity&&e.uniform1f(t.u_vigOpacity,r.vigOpacity),t.u_blur&&e.uniform1f(t.u_blur,r.blur),t.u_shaderOpacity&&e.uniform1f(t.u_shaderOpacity,r.shaderOpacity),l.presetDirty=!1}(),r.u_time&&t.uniform1f(r.u_time,n),t.drawArrays(t.TRIANGLES,0,6),l.frameCount++}(e),l.useOffscreen&&(l.glowQueue.length>0&&p(),null==(t=l.frameBitmap)||t.close(),l.frameBitmap=l.glCanvas.transferToImageBitmap()),l.instances))r.visible&&(r.paused&&r.everCopied||(function(e){var t;if(!l)return;let r=l.frameBitmap??l.glCanvas,o=e.dpr,a=e.canvas.width,n=e.canvas.height;if(a<1||n<1)return;let i=l.glCanvas.width,s=l.glCanvas.height,c=i/(140*o)*a/e.shaderScale,u=s/(40*o)*n/e.shaderScale;c>i&&(c=i),u>s&&(u=s);let d=Math.max(0,(i-c)/2),f=Math.max(0,(s-u)/2);if(e.ctx.clearRect(0,0,a,n),e.opacityMul<1&&(e.ctx.globalAlpha=e.opacityMul),e.ctx.drawImage(r,d,f,c,u,0,0,a,n),e.opacityMul<1&&(e.ctx.globalAlpha=1),function(e){let{ctx:t,dpr:r,canvas:o}=e,a=e.ringCssPx*r,n=o.width,i=o.height,l=Math.max(0,(e.cornerRadius-e.ringCssPx)*r);t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="#000",t.beginPath(),t.roundRect(a,a,n-2*a,i-2*a,l),t.fill(),t.restore()}(e),e.onFirstCopy){let t=e.onFirstCopy;e.onFirstCopy=void 0,t()}null==(t=e.onAfterFrame)||t.call(e)}(r),r.everCopied=!0));if(w&&l.glowQueue.length>0&&++l.glowSkip%1==0){let t=l.glowQueue;l.glowIdx>=t.length&&(l.glowIdx=0);let r=t[l.glowIdx];r.visible&&!r.paused&&w(r,e),l.glowIdx++}}}function C(){l&&0===l.rafId&&(l.rafId=requestAnimationFrame(k))}function S(){l&&(0!==l.rafId&&cancelAnimationFrame(l.rafId),l.rafId=0)}let R=e=>e,T=e=>e*e*(3-2*e);function $(e,t,r,o=R){return{from:e,to:t,dur:r,ease:o,startMs:-1,val:e,done:!1}}function E(e,t){e.startMs=t,e.val=e.from,e.done=!1}function P(e,t){if(e.done||e.startMs<0)return e.val;let r=Math.min(1,(t-e.startMs)/e.dur);return e.val=e.from+(e.to-e.from)*e.ease(r),r>=1&&(e.done=!0),e.val}let O=1/3*4,A=1/3*2,I=1/3*2,F=1/3*1.35,L=1/3*13;function N(e,t,r){let o=Math.max(0,Math.min(r,Math.min(e,t)/2));return 2*Math.max(0,e-2*o)+2*Math.max(0,t-2*o)+2*Math.PI*o}function z(e,t,r,o){return"circle"===o?2*Math.PI*Math.max(0,Math.min(r,Math.min(e,t)/2)):N(e,t,r)}function B(e,t,r,o,a,n,i,l){let s=l||{x:0,y:0},c=Math.max(0,Math.min(o,Math.min(t,r)/2));if("circle"===i){let o=2*Math.PI*c;if(o<=1e-4)return s.x=.5*t,s.y=.5*r,s;let i=-Math.PI/2+(e=(e%o+o)%o)/o*Math.PI*2,l=Math.max(0,c-a+n);return s.x=.5*t+l*Math.cos(i),s.y=.5*r+l*Math.sin(i),s}let u=Math.max(0,t-2*c),d=Math.max(0,r-2*c),f=Math.PI*c/2,p=2*(u+d)+4*f,h=Math.max(0,c-a+n),g=e=(e%p+p)%p;if(g<u)return s.x=c+g,s.y=a-n,s;if((g-=u)<f){let e=-Math.PI/2+Math.PI/2*(f>0?g/f:0);return s.x=t-c+h*Math.cos(e),s.y=c+h*Math.sin(e),s}if((g-=f)<d)return s.x=t-a+n,s.y=c+g,s;if((g-=d)<f){let e=Math.PI/2*(f>0?g/f:0);return s.x=t-c+h*Math.cos(e),s.y=r-c+h*Math.sin(e),s}if((g-=f)<u)return s.x=t-c-g,s.y=r-a+n,s;if((g-=u)<f){let e=Math.PI/2+Math.PI/2*(f>0?g/f:0);return s.x=c+h*Math.cos(e),s.y=r-c+h*Math.sin(e),s}if((g-=f)<d)return s.x=a-n,s.y=r-c-g,s;g-=d;let m=Math.PI+Math.PI/2*(f>0?g/f:0);return s.x=c+h*Math.cos(m),s.y=c+h*Math.sin(m),s}function W(e,t){let r=2*e/t,o="";for(let a=0;a<=t;a++){let t=-e+a*r;o+=(0===a?"M ":"L ")+t.toFixed(3)+" 0 "}return o}let H={x:0,y:0},D={x:0,y:0};function j(e,t,r){let o=Math.max(0,Math.min(1,(r-e)/(t-e)));return o*o*(3-2*o)}let G=1/3,U=0,q={x:0,y:0};function V(e,t){let r=`mfxg_${++U}`,o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("class","metal-fx-glow-svg"),o.setAttribute("preserveAspectRatio","none"),o.setAttribute("viewBox",`0 0 ${t.width} ${t.height}`),o.innerHTML=function(e,t){let{width:r,height:o,cornerRadius:a}=e,n=e.scale??1,i="circle"===e.kind?2:1,l=Math.max(0,a-i),s=(-200*n).toFixed(0),c=(540*n).toFixed(0),u=(440*n).toFixed(0),d=`x="${s}" y="${s}" width="${c}" height="${u}"`,f=`${d} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"`,p=e=>(e*n).toFixed(3),h=e=>(e*n).toFixed(3);return`<defs><filter id="${t}_bXl" ${f}><feGaussianBlur stdDeviation="${h(8.4)}"/></filter><filter id="${t}_bLg" ${f}><feGaussianBlur stdDeviation="${h(4.8)}"/></filter><filter id="${t}_bMd" ${f}><feGaussianBlur stdDeviation="${h(2.1)}"/></filter><filter id="${t}_bSm" ${f}><feGaussianBlur stdDeviation="${h(.9)}"/></filter><filter id="${t}_ebO" ${f}><feGaussianBlur stdDeviation="${h(I)}"/></filter><filter id="${t}_ebC" ${f}><feGaussianBlur stdDeviation="${h(F)}"/></filter><radialGradient id="${t}_fg" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="white"/><stop offset="0.30" stop-color="white"/><stop offset="0.65" stop-color="#404040"/><stop offset="1" stop-color="black"/></radialGradient><mask id="${t}_fm" maskUnits="userSpaceOnUse" ${d}><rect ${d} fill="black"/><circle id="${t}_fc" cx="0" cy="0" r="${(L*n).toFixed(3)}" fill="url(#${t}_fg)"/></mask><mask id="${t}_rm" maskUnits="userSpaceOnUse" ${d}><rect ${d} fill="#808080"/><rect x="0" y="0" width="${r}" height="${o}" rx="${a}" ry="${a}" fill="white"/><rect x="${i}" y="${i}" width="${r-2*i}" height="${o-2*i}" rx="${l}" ry="${l}" fill="black"/></mask></defs><g id="${t}_h" mask="url(#${t}_rm)" opacity="0"><rect ${d} fill="none" pointer-events="none"/><g id="${t}_hI" stroke="white"><path id="${t}_pXl" stroke-width="${p(26.4)}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.385" filter="url(#${t}_bXl)"/><path id="${t}_pLg" stroke-width="${p(15.6)}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.595" filter="url(#${t}_bLg)"/><path id="${t}_pMd" stroke-width="${p(7.2)}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.70" filter="url(#${t}_bMd)"/><path id="${t}_pSm" stroke-width="${p(3)}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.70" filter="url(#${t}_bSm)"/></g></g><g id="${t}_e" mask="url(#${t}_rm)" opacity="0"><rect ${d} fill="none" pointer-events="none"/><g mask="url(#${t}_fm)"><g id="${t}_eI" stroke="white"><path id="${t}_eO" stroke-width="${p(O)}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.85" filter="url(#${t}_ebO)"/><path id="${t}_eC" stroke-width="${p(A)}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="1.0" filter="url(#${t}_ebC)"/></g></g></g>`}(t,r),e.appendChild(o);let a=e=>o.querySelector(`#${r}_${e}`),n=a("h"),i=a("hI"),l=a("e"),s=a("eI"),c=a("fc"),u=z(t.width,t.height,t.cornerRadius,t.kind)/N(140,40,20),d=Math.max(1,7.8*u),f=Math.max(.6,9.13952*G*u),p=W(d,16),h=W(f,8),g=[a("pXl"),a("pLg"),a("pMd"),a("pSm")],m=[a("eO"),a("eC")];for(let e of g)e.setAttribute("d",p);for(let e of m)e.setAttribute("d",h);return i.style.transformOrigin="0 0",s.style.transformOrigin="0 0",i.style.willChange="transform",s.style.willChange="transform",i.style.transition="transform 100ms linear",s.style.transition="transform 100ms linear",n.style.willChange="opacity",l.style.willChange="opacity",n.style.transition="opacity 100ms linear",l.style.transition="opacity 100ms linear",c.style.willChange="transform",{svg:o,haloGroup:n,haloInner:i,extraGroup:l,extraInner:s,fadeCircle:c,width:t.width,height:t.height,cornerRadius:t.cornerRadius,kind:t.kind,scale:t.scale??1,perim:function(e){let t=z(e.width,e.height,e.cornerRadius,e.kind),r=1.5*(e.scale??1),o=[];for(let a=0;a<16;a++){let n=a/16*t,i=B(n,e.width,e.height,e.cornerRadius,r,0,e.kind);o.push({x:i.x,y:i.y,arc:n})}return o}(t),currentIdx:0,appearedAt:0,glowOpacity:0,relocTween:null,relocNextIdx:-1,wanderS:0,wanderTargetS:0,wanderFrames:0,tintFrom:{r:255,g:255,b:255},tintTarget:{r:255,g:255,b:255},tintTween:null,tintHoldUntil:0,lastHaloStroke:"",lastExtraStroke:""}}let X=new Set(["INPUT","TEXTAREA","SELECT","OPTION"]);function Q(e,t,r,o,a,n){let i=Math.max(0,Math.min(n,.5*o,.5*a)),l=e.roundRect;"function"==typeof l?l.call(e,t,r,o,a,i):(e.moveTo(t+i,r),e.lineTo(t+o-i,r),e.quadraticCurveTo(t+o,r,t+o,r+i),e.lineTo(t+o,r+a-i),e.quadraticCurveTo(t+o,r+a,t+o-i,r+a),e.lineTo(t+i,r+a),e.quadraticCurveTo(t,r+a,t,r+a-i),e.lineTo(t,r+i),e.quadraticCurveTo(t,r,t+i,r))}function Y(e,t,r,o,a){a.flipX||a.flipY?(e.save(),a.flipX&&(e.translate(a.x+a.w,0),e.scale(-1,1)),a.flipY&&(e.translate(0,a.y+a.h),e.scale(1,-1)),e.drawImage(t,0,0,r,o,a.flipX?0:a.x,a.flipY?0:a.y,a.w,a.h),e.restore()):e.drawImage(t,0,0,r,o,a.x,a.y,a.w,a.h)}function K(e,t,r,o,a,n,i){let l=0|i;if(l<1||o<=2*l||a<=2*l){e.beginPath(),Q(e,t,r,o,a,n),e.clip();return}e.beginPath(),Q(e,t,r,o,a,n),Q(e,t+l,r+l,o-2*l,a-2*l,Math.max(0,n-l)),e.clip("evenodd")}function J(e){let t=getComputedStyle(e),r=[parseFloat(t.borderTopLeftRadius)||0,parseFloat(t.borderTopRightRadius)||0,parseFloat(t.borderBottomRightRadius)||0,parseFloat(t.borderBottomLeftRadius)||0].filter(e=>e>0);return r.length?Math.min.apply(null,r):0}function Z(e){let t=getComputedStyle(e),r=Math.max(parseFloat(t.borderTopWidth)||0,parseFloat(t.borderRightWidth)||0,parseFloat(t.borderBottomWidth)||0,parseFloat(t.borderLeftWidth)||0),o=0,a=0,n=t.boxShadow;if(n&&"none"!==n){let e=n.replace(/rgba?\([^)]*\)/g,e=>e.replace(/,/g,"\0")).split(/,\s*/),t=1/0,r=1/0;for(let o of e){let e=o.match(/-?\d+(?:\.\d+)?px/g);if(!e||e.length<4)continue;let a=parseFloat(e[3]);a>0&&(/\binset\b/.test(o)?a<t&&(t=a):a<r&&(r=a))}Number.isFinite(t)&&(o=t),Number.isFinite(r)&&(a=r)}let i=Math.max(r,a);return{width:Math.max(r,o,a)||1,outerCssPx:i}}function ee(e){e.cornerRadius=J(e.el);let t=Z(e.el);e.hairlineWidth=t.width,e.hairlineOuterCssPx=t.outerCssPx}let et=new Set,er=!1,eo=0;function ea(){er||(er=!0,typeof requestAnimationFrame>"u"||requestAnimationFrame(e=>{er=!1,e-eo<66||(eo=e,function(){if(0===et.size)return;let e="u">typeof window&&window.devicePixelRatio||1,t=new Map;for(let a of et){var r,o;let n,i,l,s,c=a.el.getBoundingClientRect(),u=t.get(a.anchorEl);if(u||(u=a.anchorEl.getBoundingClientRect(),t.set(a.anchorEl,u)),c.width<1||c.height<1||u.width<1||u.height<1)continue;if((Math.min((r=u).bottom,c.bottom)-Math.max(r.top,c.top)<1||Math.max(r.left-c.right,c.left-r.right,0)>32)&&!(!(Math.min((o=u).right,c.right)-Math.max(o.left,c.left)<1)&&32>=Math.max(o.top-c.bottom,c.top-o.bottom,0))){1!==a.canvas.width&&(a.canvas.width=1,a.canvas.height=1),1!==a.strokeCanvas.width&&(a.strokeCanvas.width=1,a.strokeCanvas.height=1);continue}let d=a.anchor.canvas,f=0|d.width,p=0|d.height;if(f<4||p<4)continue;let h=(u.left+u.right)*.5,g=(u.top+u.bottom)*.5,m=(c.left+c.right)*.5,x=(c.top+c.bottom)*.5,v=h-m,b=g-x,y=Math.max(u.left-c.right,c.left-u.right,0)>=Math.max(u.top-c.bottom,c.top-u.bottom,0),w=1-Math.min(1,function(e,t){let r=Math.max(e.left-t.right,t.left-e.right,0),o=Math.max(e.top-t.bottom,t.top-e.bottom,0);return Math.sqrt(r*r+o*o)}(u,c)/12),_=Math.min(3.6,(.55+.44999999999999996*(w=w*w*(3-2*w)))*1.3*.7),M=a.anchor.scale??1,k=Math.max(1,Math.round(Math.max(+M,a.hairlineWidth)*e)),C=Math.max(1,Math.round(Math.max(+M,a.hairlineWidth)*e)),S=a.hairlineOuterCssPx;a.wrap.style.inset=`${-S}px`,a.wrap.style.borderRadius=`${Math.max(0,a.cornerRadius)}px`;let R=Math.max(1,Math.round((c.width+2*S)*e)),T=Math.max(1,Math.round((c.height+2*S)*e));a.canvas.width!==R&&(a.canvas.width=R),a.canvas.height!==T&&(a.canvas.height=T),a.strokeCanvas.width!==R&&(a.strokeCanvas.width=R),a.strokeCanvas.height!==T&&(a.strokeCanvas.height=T);let $=a.ctx;$.setTransform(1,0,0,1,0,0),$.clearRect(0,0,R,T);let E=a.strokeCtx;E.setTransform(1,0,0,1,0,0),E.clearRect(0,0,R,T);let P=Math.min(12*e,Math.max(R,T));y?(n=v>0?R:0,l=v>0?R-P:P,i=.5*T,s=.5*T):(i=b>0?T:0,s=b>0?T-P:P,n=.5*R,l=.5*R);let O=$.createLinearGradient(n,i,l,s);O.addColorStop(0,"rgba(0,0,0,1)"),O.addColorStop(.5,"rgba(0,0,0,0.85)"),O.addColorStop(1,"rgba(0,0,0,0)");let A=Math.max(1,Math.round(235*Math.max(.1,f/e/140)*e)),I,F,L,N,z=!1,B=!1;if(y){let t=Math.max(u.top,c.top),r=Math.min(u.bottom,c.bottom);z=!0,I=v>0?R-A:0,F=Math.round((t-c.top+S)*e),L=A,N=Math.max(1,Math.round((r-t)*e))}else{let t=Math.max(u.left,c.left),r=Math.min(u.right,c.right);B=!0,I=Math.round((t-c.left+S)*e),F=b>0?T-A:0,L=Math.max(1,Math.round((r-t)*e)),N=A}let W={x:I,y:F,w:L,h:N,flipX:z,flipY:B},H={x:0,y:0,w:R,h:T,r:Math.max(0,a.cornerRadius*e)};(function(e,t,r,o,a,n,i,l,s,c,u){let d=Math.max(1,Math.round(24*u)),f=Math.max(0,i),p=!0;for(let i=0;i<3&&f>1e-4;i++){let i=Math.min(1,f);e.save(),function(e,t,r,o,a,n,i){if(o<=2*i||a<=2*i){e.beginPath(),Q(e,t,r,o,a,n),e.clip();return}e.beginPath(),Q(e,t,r,o,a,n),Q(e,t+i,r+i,o-2*i,a-2*i,Math.max(0,n-i)),e.clip("evenodd")}(e,c.x,c.y,c.w,c.h,c.r,d),e.globalCompositeOperation=p?"source-over":"lighter",p=!1,e.globalAlpha=i,Y(e,t,r,o,s),e.globalAlpha=1,e.globalCompositeOperation="destination-in",e.fillStyle=l,e.fillRect(0,0,a,n),e.restore(),f-=i}})($,d,f,p,R,T,Math.min(3.6,2.535*_*.35),O,W,H,e),function(e,t,r,o,a,n,i,l,s,c,u){let d=.52*l,f=!0;for(let l=0;l<3&&d>1e-4;l++){let l=Math.min(1,d);e.save(),K(e,i.x,i.y,i.w,i.h,i.r,s),e.globalCompositeOperation=f?"source-over":"lighter",f=!1,e.globalAlpha=l,Y(e,t,r,o,u),e.globalAlpha=1,e.globalCompositeOperation="destination-in",e.fillStyle=c,e.fillRect(0,0,a,n),e.restore(),d-=l}}(E,d,f,p,R,T,H,_,k,O,W),function(e,t,r,o,a,n,i,l){let s=e.createLinearGradient(o,a,n,i);s.addColorStop(0,`rgba(255,255,255,${l.toFixed(3)})`),s.addColorStop(.5,`rgba(255,255,255,${(.45*l).toFixed(3)})`),s.addColorStop(1,"rgba(255,255,255,0)"),e.save(),K(e,t.x,t.y,t.w,t.h,t.r,r),e.globalCompositeOperation="lighter",e.lineWidth=2*r,e.strokeStyle=s,e.beginPath(),Q(e,t.x,t.y,t.w,t.h,t.r),e.stroke(),e.restore()}(E,H,C,n,i,l,s,Math.min(.85,.044*_)),$.globalCompositeOperation="source-over",E.globalCompositeOperation="source-over"}}())}))}let en="metal-fx-styles",ei=`
.metal-fx-root {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
  overflow: visible;
  background: #272727;
  color: #f8f8f8;
}
.metal-fx-root[data-theme='light'] {
  background: #ffffff;
  color: #1d1d1d;
}

.metal-fx-root::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  box-shadow: inset 0 0 50px 0 rgba(255, 255, 255, 0.02);
}
.metal-fx-root[data-theme='light']::before {
  box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.02);
}

.metal-fx-root::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 4;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.metal-fx-root[data-theme='light']::after {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}
/* Circle variant gets a thicker outer rim than the button variant. */
.metal-fx-root[data-variant='circle']::after {
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}
.metal-fx-root[data-theme='light'][data-variant='circle']::after {
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.06);
}

.metal-fx-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
}

/* The inner spacer — defines the inset geometry where the metal ring meets
   the interior (3 px for Button, 1-2 px for Circle) and carries the Circle dark
   hairline ('box-shadow: inset' rules below). Intentionally transparent so
   the wrapper's background propagates through to the punched shader centre,
   giving consumers a single surface tone to override. See "Single-surface
   background" in the file header for the rationale. */
.metal-fx-inner {
  position: absolute;
  inset: 3px;
  border-radius: inherit;
  z-index: 1;
  pointer-events: none;
}

.metal-fx-root[data-variant='button'][data-shape='pill'] .metal-fx-inner {
  border-radius: calc(var(--mfx-radius, 20px) - 3px);
}
.metal-fx-root[data-variant='button'][data-shape='circle'] .metal-fx-inner {
  border-radius: calc(var(--mfx-radius, 16px) - 3px);
}
.metal-fx-root[data-variant='circle'][data-shape='pill'] .metal-fx-inner {
  inset: 0;
  border-radius: var(--mfx-radius, 20px);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.45);
}
.metal-fx-root[data-variant='circle'][data-shape='circle'] .metal-fx-inner {
  inset: 0;
  border-radius: var(--mfx-radius, 16px);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.45);
}
/* Circle-variant hairline alpha — light mode.
   Source-of-truth: index.html L2261-2267. The 0.45-alpha black inset that
   reads as a single-pixel frame against the dark interior is too heavy
   on a #ffffff inner: it ends up looking like a hard 2-px black ring
   against the iridescent shader. Suppressed entirely (alpha 0) — the
   shader's own iridescent rim already defines the silhouette in light
   mode, so an extra dark hairline only competes with it. The rule is
   kept (rather than deleted) as a tunable hook in case a future variant
   wants to re-introduce a soft edge. NOTE: we keep the dark-mode inset
   and border-radius values because — unlike index.html — our renderer
   does NOT overscan the canvas in light mode, so there is no 1-px gap
   between inner element and shader to compensate for. */
.metal-fx-root[data-theme='light'][data-variant='circle'][data-shape='pill'] .metal-fx-inner,
.metal-fx-root[data-theme='light'][data-variant='circle'][data-shape='circle'] .metal-fx-inner {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0);
}

/* ─── Combined glow SVG (z=3) ──────────────────────────────────────────────
   Single SVG per instance that holds BOTH the wide-halo group
   (#mfx_haloTravel) and the catch-light group (#mfx_extraTravel), exactly
   mirroring canonical's _buildGlowSvgInner (index.html L8078). One
   mix-blend-mode: screen lifts the combined composite onto the shader
   ring; per-frame opacity attributes on each inner group still drive the
   independent fade-in / fade-out cycles for the halo and the catch-light.

   Why a single SVG: the circle variant anchors halo + catch-light at the same
   perimeter point, so they overlap in the bright zone. Two separately-
   screened SVGs would double-screen the overlap (A + B + C - AB - AC -
   BC + ABC instead of A + B + C - AB - AC once both groups composite
   in source-over inside one SVG and then screen against the host once).
   That overlap looked muted versus canonical specifically on the circle
   variant where both layers travel together.

   Source-of-truth opacity: #btnGlowSvg drops to 0.7 in dark and 0.2746 in
   light (index.html L632/L643). */
.metal-fx-glow-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 3;
  pointer-events: none;
  opacity: 0.7;
}
.metal-fx-root[data-theme='light'] .metal-fx-glow-svg {
  /* Light-mode 1-px overscan mirrors .btn-glow-svg in metal.html so the
     halo stays glued to the visible silhouette (the shader ring there sits
     1 px outside the host's padding box). */
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  mix-blend-mode: multiply;
  /* Source-of-truth: html[data-theme="light"] #btnGlowSvg { opacity: 0.2746 }
     → −35 % from 0.4225 from the original 0.7 dark-mode opacity. */
  opacity: 0.2746;
  filter: saturate(5.355) brightness(0.78);
}
/* Circle light-mode small variants (e.g. 36\xd736 send button): the geometrically
   shrunk halo loses density when multiplied against #ffffff. Mirror the
   canonical override at index.html L2316 — bump saturation + drop brightness
   so the small glow holds together visually. */
.metal-fx-root[data-variant='circle'][data-shape='circle'][data-theme='light'] .metal-fx-glow-svg {
  filter: saturate(7.5) brightness(0.6);
}

/* The wrapped child — hoisted into z=5 so it sits above every overlay, with
   normalized chrome so consumer button styles don't fight the metal frame. */
.metal-fx-content {
  position: relative;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: none;
}
.metal-fx-content > * {
  pointer-events: auto;
}
.metal-fx-root[data-normalize='true'] .metal-fx-content > * {
  background: transparent !important;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  /* Sizing: we deliberately DO NOT force \`width: 100%; height: 100%\` on the
     child here. That used to be the contract ("the wrapper is the visible
     button surface; the child stretches to fill it"), but it created a cyclic
     percentage dependency: the wrapper is \`inline-flex\` with no intrinsic
     size, .metal-fx-content is \`width/height: 100%\` of the wrapper, and the
     child was \`100%\` of .metal-fx-content. With nothing breaking the cycle,
     icon-only / class-sized children collapsed.

     The new contract: the child sizes itself (intrinsic content, CSS class,
     or inline style — all work), and the wrapper's \`inline-flex\` wraps it
     tightly. Consumers who want a metal frame BIGGER than the child (e.g.
     padding around an icon) size <MetalFx style={{ width, height }}> AND
     explicitly set width/height on the child to fill (or accept that the
     child renders at its intrinsic size, centered).

     Typography is intentionally NOT touched. We used to apply
     \`color: inherit; font: inherit;\` here to "match" the wrapper, but
     \`font: inherit\` is a shorthand that overrides font-family, font-size,
     font-weight, AND line-height on the child — which (a) shrank the
     button height (line-height changes propagate through the flex
     content box) and (b) scaled em-based icons / font-icons inside the
     child to whatever the wrapper inherited. The wrapper now stays out
     of the child's typography entirely; consumers who want typographic
     normalization can apply it themselves on the child element. */
}

[data-metal-fx-reflection] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  z-index: 0;
  isolation: isolate;
}
.metal-fx-reflection-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  filter: blur(4px) saturate(1.2) brightness(1.58);
}
.metal-fx-reflection-stroke-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  filter: saturate(1.35) brightness(1.75);
}
/* Hosts that participate as reflection targets need positioning + isolation
   so the wrap composites only against the host (not the parent stack). The
   wrap injects these inline as well, but stating them here keeps reflections
   working on hosts that already have other inline styles applied. */
[data-metal-fx-reflect-host] {
  isolation: isolate;
}
`,el=!1;!function(){if(el||typeof document>"u")return;if(document.getElementById(en)){el=!0;return}let e=document.createElement("style");e.id=en,e.textContent=ei,document.head.appendChild(e),el=!0}();let es={position:"absolute",inset:0,width:"100%",height:"100%"},ec={position:"absolute",inset:3},eu={position:"absolute",inset:0,pointerEvents:"none",zIndex:3,borderRadius:"inherit"},ed=new Map;w=(e,t)=>{let r=ed.get(e);r&&function(e,t,r,o,a="dark"){var n,i,s,c,u;let d,f,h,{width:m,height:y,cornerRadius:w,perim:_}=e;if(0===_.length)return;let M=-1,k=e.currentIdx,C=0;for(let r=0;r<_.length;r++){let o=_[r],a=b(t,o.x,o.y,2);a>M&&(M=a,k=r),r===e.currentIdx&&(C=a)}let S=e.appearedAt>0&&r-e.appearedAt<3e3,R=.34+.51*j(.08,.32,C),O=!S&&M-C>.05;if(!e.relocTween||e.relocTween.done)if(0===e.appearedAt)e.currentIdx=k,e.appearedAt=r,e.wanderS=0,e.wanderTargetS=0,e.wanderFrames=0,e.relocTween=$(0,R,1500,T),E(e.relocTween,r);else if(null!=(n=e.relocTween)&&n.done&&0===e.relocTween.to){e.currentIdx=e.relocNextIdx,e.appearedAt=r,e.wanderS=0,e.wanderTargetS=0,e.wanderFrames=0;let o=_[e.currentIdx];e.relocTween=$(0,.34+.51*j(.08,.32,b(t,o.x,o.y,2)),1500,T),E(e.relocTween,r)}else O?(e.relocNextIdx=k,e.relocTween=$(e.glowOpacity,0,1500,T),E(e.relocTween,r)):e.glowOpacity+=(R-e.glowOpacity)*.00875;e.relocTween&&(e.glowOpacity=P(e.relocTween,r)),e.glowOpacity=Math.max(0,Math.min(1,e.glowOpacity));let A=z(m,y,w,e.kind)/N(140,40,20);e.wanderFrames++>=120&&(e.wanderTargetS=15*A*(2*Math.random()-1),e.wanderFrames=0),e.wanderS+=(e.wanderTargetS-e.wanderS)*.0075;let I=_[e.currentIdx].arc+e.wanderS,F=1.5*e.scale;B(I,m,y,w,F,0,e.kind,q);let L=q.x,W=q.y,G=(B(I-.1,m,y,w,F,0,i=e.kind,H),B(I+.1,m,y,w,F,0,i,D),Math.atan2(D.y-H.y,D.x-H.x)),U=`translate(${L.toFixed(3)}px,${W.toFixed(3)}px) rotate(${G.toFixed(4)}rad)`;e.haloInner.style.transform=U,B(I,m,y,w,F,A*e.scale,e.kind,q),e.extraInner.style.transform=`translate(${q.x.toFixed(3)}px,${q.y.toFixed(3)}px) rotate(${G.toFixed(4)}rad)`,e.fadeCircle.style.transform=`translate(${q.x.toFixed(3)}px,${q.y.toFixed(3)}px)`;let V="light"===a,X=V?function(e,t,r){if(!l)return v.r=255,v.g=255,v.b=255,v;p();let o=g(e,t,r),{glowPixels:a,glowPixelsW:n,glowPixelsH:i}=l,s=Math.max(0,o.bx-2),c=Math.min(n,o.bx+2+1),u=Math.max(0,o.by-2),d=Math.min(i,o.by+2+1),f=-1;v.r=255,v.g=255,v.b=255;for(let e=u;e<d;e++){let t=e*n;for(let e=s;e<c;e++){let r=(t+e)*4,o=a[r],n=a[r+1],i=a[r+2],l=Math.max(o,n,i),s=Math.min(o,n,i),c=(l>0?(l-s)/l:0)*(.35+l/255*.65);c>f&&(f=c,v.r=o,v.g=n,v.b=i)}}return v}(t,L,W):function(e,t,r){if(!l)return v.r=255,v.g=255,v.b=255,v;p();let o=g(e,t,r),a=x(l.glowPixels,l.glowPixelsW,l.glowPixelsH,o.bx,o.by,2);return 0===a.count?(v.r=255,v.g=255,v.b=255):(v.r=a.r/a.count,v.g=a.g/a.count,v.b=a.b/a.count),v}(t,L,W);e.tintTween?e.tintTween.done&&(V?(e.tintFrom={r:e.tintFrom.r+(e.tintTarget.r-e.tintFrom.r)*e.tintTween.val,g:e.tintFrom.g+(e.tintTarget.g-e.tintFrom.g)*e.tintTween.val,b:e.tintFrom.b+(e.tintTarget.b-e.tintFrom.b)*e.tintTween.val},e.tintTarget={...X},e.tintTween=$(0,1,400),E(e.tintTween,r)):r>=e.tintHoldUntil&&(e.tintFrom={...e.tintTarget},e.tintTarget={...X},e.tintTween=$(0,1,400),E(e.tintTween,r),e.tintHoldUntil=r+2e3)):(e.tintFrom={...X},e.tintTarget={...X},e.tintTween=$(0,1,400),E(e.tintTween,r),e.tintHoldUntil=V?0:r+2e3),P(e.tintTween,r);let Q=e.tintTween.val;if(V)d=Math.round(e.tintFrom.r+(e.tintTarget.r-e.tintFrom.r)*Q),f=Math.round(e.tintFrom.g+(e.tintTarget.g-e.tintFrom.g)*Q),h=Math.round(e.tintFrom.b+(e.tintTarget.b-e.tintFrom.b)*Q);else{let t=e.tintFrom.r+(e.tintTarget.r-e.tintFrom.r)*Q,r=e.tintFrom.g+(e.tintTarget.g-e.tintFrom.g)*Q,o=e.tintFrom.b+(e.tintTarget.b-e.tintFrom.b)*Q,a=Math.max(t,r,o)||1;d=Math.round(t/a*255),f=Math.round(r/a*255),h=Math.round(o/a*255)}let Y=`rgb(${d},${f},${h})`;if(Y!==e.lastHaloStroke&&(e.lastHaloStroke=Y,e.haloInner.style.stroke=Y),V){let t,r,o,a=(r=(t=Math.max(s=d/255,c=f/255,u=h/255))-Math.min(s,c,u),o=0,0!==r&&(o=(t===s?((c-u)/r+6)%6:t===c?(u-s)/r+2:(s-c)/r+4)/6),[o,0===t?0:r/t,t]),[n,i,l]=function(e,t,r){let o=Math.floor(6*e),a=6*e-o,n=r*(1-t),i=r*(1-a*t),l=r*(1-(1-a)*t),s=0,c=0,u=0;switch(o%6){case 0:s=r,c=l,u=n;break;case 1:s=i,c=r,u=n;break;case 2:s=n,c=r,u=l;break;case 3:s=n,c=i,u=r;break;case 4:s=l,c=n,u=r;break;case 5:s=r,c=n,u=i}return[Math.round(255*s),Math.round(255*c),Math.round(255*u)]}(a[0],Math.min(1,2.625*a[1]),Math.max(.31,1.008*a[2])),p=`rgb(${n},${i},${l})`;p!==e.lastExtraStroke&&(e.lastExtraStroke=p,e.extraInner.style.stroke=p)}else"#ffffff"!==e.lastExtraStroke&&(e.lastExtraStroke="#ffffff",e.extraInner.style.stroke="#ffffff");let K=Math.max(0,Math.min(1,o));e.haloGroup.style.opacity=(.8*e.glowOpacity*K).toFixed(3),e.extraGroup.style.opacity=Math.min(1,3.51*e.glowOpacity*K).toFixed(3)}(r.handles,e,t,e.opacityMul,r.themeRef.current)};let ef=(0,r.forwardRef)(function({children:e,variant:a="button",preset:n="chromatic",theme:i="auto",strength:s=1,paused:c=!1,borderRadius:u,normalizeHostStyles:f=!0,reflectionTargets:p,disableGlow:h=!1,shaderScale:g,ringCssPx:m,scale:x=1,className:v,style:b,...w},M){let k=(0,r.useRef)(null),R=(0,r.useRef)(null),T=(0,r.useRef)(null),$=(0,r.useRef)(null),E=(0,r.useRef)(null),P=(0,r.useRef)(null),O=(0,r.useRef)("dark"),A=(0,r.useRef)(0),[I,F]=(0,r.useState)(!1),L=function(e){let[t,o]=(0,r.useState)(()=>"auto"!==e?e:typeof window>"u"||!window.matchMedia||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");return(0,r.useEffect)(()=>{if("auto"!==e)return void o(e);if(typeof window>"u"||!window.matchMedia)return;let t=window.matchMedia("(prefers-color-scheme: dark)"),r=()=>o(t.matches?"dark":"light");return r(),t.addEventListener("change",r),()=>t.removeEventListener("change",r)},[e]),t}(i);O.current=L;let N="circle"===a?"circle":"pill";(0,r.useImperativeHandle)(M,()=>k.current,[]);let z=(e,t)=>"circle"===N?Math.min(e,t)/2:Math.min("number"==typeof u?u:(()=>{var e;let t=null==(e=$.current)?void 0:e.firstElementChild;if(t){let e=parseFloat(getComputedStyle(t).borderTopLeftRadius);if(Number.isFinite(e)&&e>0)return e}return A.current})(),Math.min(e,t)/2);(0,r.useEffect)(()=>{let e;(e=d()).preset=o[n].modes[L],e.presetDirty=!0},[n,L]),(0,r.useEffect)(()=>{let e=E.current;e&&y(e,{paused:c})},[c]),(0,r.useEffect)(()=>{let e=E.current;if(!e)return;let t={};void 0!==g&&(t.shaderScale=g),void 0!==m&&(t.ringCssPx=m),void 0!==x&&(t.scale=x),Object.keys(t).length>0&&y(e,t)},[g,m,x]),(0,r.useLayoutEffect)(()=>{var e;let t=R.current,r=k.current,o=T.current;if(!t||!r)return;{let e=parseFloat(getComputedStyle(r).borderTopLeftRadius);A.current=Number.isFinite(e)?e:0}let a=()=>{let e=r.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),o=Math.max(1,Math.round(e.height));return{cssWidth:t,cssHeight:o,cornerRadius:z(t,o)}},n=a();E.current=function(e){let t=d(),r=e.hostCanvas.getContext("2d",{alpha:!0});if(!r)throw Error("metal-fx: canvas 2D context unavailable");let o=e.scale??1,a={canvas:e.hostCanvas,ctx:r,cssWidth:e.cssWidth,cssHeight:e.cssHeight,cornerRadius:e.cornerRadius,kind:e.kind,ringCssPx:e.ringCssPx??("circle"===e.kind?2:1)*o,shaderScale:e.shaderScale??("circle"===e.kind?1.3:1.6)*o,opacityMul:e.opacityMul??1,visible:!0,paused:e.paused??!1,everCopied:!1,dpr:"u">typeof window&&window.devicePixelRatio||1,scale:o,onAfterFrame:e.onAfterFrame,onFirstCopy:e.onFirstCopy};return _(a),t.instances.add(a),0===t.rafId&&null===t.pausedAtMs&&C(),a}({hostCanvas:t,cssWidth:n.cssWidth,cssHeight:n.cssHeight,cornerRadius:n.cornerRadius,kind:N,paused:c,shaderScale:g,ringCssPx:m,scale:x,onFirstCopy:()=>F(!0)}),r.style.setProperty("--mfx-radius",`${n.cornerRadius}px`),r.style.borderRadius=`${n.cornerRadius}px`,o&&(P.current=V(o,{width:n.cssWidth,height:n.cssHeight,cornerRadius:n.cornerRadius,kind:N,scale:x}));let i=0,s=new ResizeObserver(()=>{0===i&&(i=requestAnimationFrame(()=>{i=0;let e=a(),t=E.current;t&&(y(t,{cssWidth:e.cssWidth,cssHeight:e.cssHeight,cornerRadius:e.cornerRadius}),r.style.setProperty("--mfx-radius",`${e.cornerRadius}px`),r.style.borderRadius=`${e.cornerRadius}px`,o&&(o.innerHTML="",P.current=V(o,{width:e.cssWidth,height:e.cssHeight,cornerRadius:e.cornerRadius,kind:N,scale:x}),t&&P.current&&ed.set(t,{handles:P.current,themeRef:O})))}))});s.observe(r);let u=null;return"u">typeof IntersectionObserver&&(u=new IntersectionObserver(e=>{let t=E.current;if(t)for(let o of e){var r;t.visible=r=o.isIntersecting,r&&l&&0===l.rafId&&null===l.pausedAtMs&&!l.contextLost&&C()}},{rootMargin:"64px"})).observe(r),E.current&&P.current&&(ed.set(E.current,{handles:P.current,themeRef:O}),e=E.current,l&&(l.glowQueue.includes(e)||l.glowQueue.push(e))),()=>{s.disconnect(),null==u||u.disconnect(),0!==i&&cancelAnimationFrame(i);let e=E.current;e&&(ed.delete(e),function(e){if(!l)return;let t=l.glowQueue.indexOf(e);-1!==t&&l.glowQueue.splice(t,1)}(e),function(e){if(!l)return;l.instances.delete(e);let t=l.glowQueue.indexOf(e);-1!==t&&l.glowQueue.splice(t,1),0===l.instances.size&&(S(),function(){var e;if(!l)return;let{gl:t,program:r,buffer:o,frameBitmap:a}=l;try{null==a||a.close(),t.deleteBuffer(o),t.deleteProgram(r),null==(e=t.getExtension("WEBGL_lose_context"))||e.loseContext()}catch{}l=null}())}(e)),E.current=null,P.current=null,o&&(o.innerHTML="")}},[N]),(0,r.useEffect)(()=>{let e=E.current;e&&y(e,{opacityMul:Math.max(0,Math.min(1,s))})},[s,a]),(0,r.useEffect)(()=>{let e=E.current,t=k.current;if(!e||!t||!p||"dark"!==L)return;e.onAfterFrame=ea;let r=p.flatMap(e=>e.current?[e.current]:[]);for(let o of r)!function(e,t,r){if(typeof document>"u"||X.has(e.tagName))return;for(let t of et)if(t.el===e)return t;let o=document.createElement("div");o.setAttribute("data-metal-fx-reflection",""),o.setAttribute("aria-hidden","true");let a=document.createElement("canvas");a.className="metal-fx-reflection-canvas";let n=a.getContext("2d",{alpha:!0});if(!n)return;let i=document.createElement("canvas");i.className="metal-fx-reflection-stroke-canvas";let l=i.getContext("2d",{alpha:!0});if(!l)return;o.appendChild(a),o.appendChild(i);let s=getComputedStyle(e),c=!1;"static"===s.position&&(e.style.position="relative",c=!0);let u=!1;"isolate"!==s.isolation&&(e.style.isolation="isolate",u=!0),e.setAttribute("data-metal-fx-reflect-host",""),e.insertBefore(o,e.firstChild);let d=Z(e),f={el:e,anchor:t,anchorEl:r,wrap:o,canvas:a,ctx:n,strokeCanvas:i,strokeCtx:l,cornerRadius:J(e),hairlineWidth:d.width,hairlineOuterCssPx:d.outerCssPx,appliedPositionRelative:c,appliedIsolation:u,resizeObserver:null,mutationObserver:null};"u">typeof ResizeObserver&&(f.resizeObserver=new ResizeObserver(()=>ee(f)),f.resizeObserver.observe(f.el)),"u">typeof MutationObserver&&(f.mutationObserver=new MutationObserver(()=>ee(f)),f.mutationObserver.observe(f.el,{attributes:!0,attributeFilter:["style","class"]})),et.add(f)}(o,e,t);return()=>{for(let t of(e.onAfterFrame=void 0,r))!function(e){for(let t of et)if(t.el===e){(function(e){var t,r;null==(t=e.resizeObserver)||t.disconnect(),e.resizeObserver=null,null==(r=e.mutationObserver)||r.disconnect(),e.mutationObserver=null})(t),t.canvas.width=0,t.canvas.height=0,t.strokeCanvas.width=0,t.strokeCanvas.height=0,t.wrap.parentNode===t.el&&t.el.removeChild(t.wrap),t.el.removeAttribute("data-metal-fx-reflect-host"),t.appliedPositionRelative&&(t.el.style.position=""),t.appliedIsolation&&(t.el.style.isolation=""),et.delete(t);return}}(t)}},[p,L]),(0,r.useEffect)(()=>{let e=k.current,t=E.current;if(!e||!t)return;let r=z(t.cssWidth,t.cssHeight);y(t,{cornerRadius:r}),e.style.setProperty("--mfx-radius",`${r}px`),e.style.borderRadius=`${r}px`},[u,L,a,N]);let B=(0,r.useMemo)(()=>({...b,"--mfx-strength":String(Math.min(1,Math.max(0,s))),opacity:+!!I,visibility:I?"visible":"hidden",transition:I?"opacity 0.15s ease-out":"none"}),[b,s,I]);return(0,t.jsxs)("div",{...w,ref:k,className:v?`metal-fx-root ${v}`:"metal-fx-root","data-variant":a,"data-shape":N,"data-theme":L,"data-paused":c?"true":void 0,"data-normalize":f?"true":"false",style:B,children:[(0,t.jsx)("canvas",{ref:R,className:"metal-fx-canvas",style:es}),(0,t.jsx)("div",{className:"metal-fx-inner","aria-hidden":"true",style:ec}),(0,t.jsx)("div",{ref:T,"aria-hidden":"true",style:{...eu,display:h?"none":void 0}}),(0,t.jsx)("div",{ref:$,className:"metal-fx-content",children:e})]})});ef.displayName="MetalFx",e.s(["MetalFx",0,ef])},29315,93733,e=>{"use strict";let t;function r(){return"u">typeof window}function o(e){return i(e)?(e.nodeName||"").toLowerCase():"#document"}function a(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function n(e){var t;return null==(t=(i(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function i(e){return!!r()&&(e instanceof Node||e instanceof a(e).Node)}function l(e){return!!r()&&(e instanceof Element||e instanceof a(e).Element)}function s(e){return!!r()&&(e instanceof HTMLElement||e instanceof a(e).HTMLElement)}function c(e){return!(!r()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof a(e).ShadowRoot)}function u(e){let{overflow:t,overflowX:r,overflowY:o,display:a}=v(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+r)&&"inline"!==a&&"contents"!==a}function d(e){try{if(e.matches(":popover-open"))return!0}catch(e){}try{return e.matches(":modal")}catch(e){return!1}}let f=/transform|translate|scale|rotate|perspective|filter/,p=/paint|layout|strict|content/,h=e=>!!e&&"none"!==e;function g(e){let t=l(e)?v(e):e;return h(t.transform)||h(t.translate)||h(t.scale)||h(t.rotate)||h(t.perspective)||!m()&&(h(t.backdropFilter)||h(t.filter))||f.test(t.willChange||"")||p.test(t.contain||"")}function m(){return null==t&&(t="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),t}function x(e){return/^(html|body|#document)$/.test(o(e))}function v(e){return a(e).getComputedStyle(e)}function b(e){if("html"===o(e))return e;let t=e.assignedSlot||e.parentNode||c(e)&&e.host||n(e);return c(t)?t.host:t}function y(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}e.s(["getComputedStyle",0,v,"getContainingBlock",0,function(e){let t=b(e);for(;s(t)&&!x(t);){if(g(t))return t;if(d(t))break;t=b(t)}return null},"getDocumentElement",0,n,"getFrameElement",0,y,"getNodeName",0,o,"getNodeScroll",0,function(e){return l(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}},"getOverflowAncestors",0,function e(t,r,o){var n;void 0===r&&(r=[]),void 0===o&&(o=!0);let i=function e(t){let r=b(t);return x(r)?t.ownerDocument?t.ownerDocument.body:t.body:s(r)&&u(r)?r:e(r)}(t),l=i===(null==(n=t.ownerDocument)?void 0:n.body),c=a(i);if(!l)return r.concat(i,e(i,[],o));{let t=y(c);return r.concat(c,c.visualViewport||[],u(i)?i:[],t&&o?e(t):[])}},"getParentNode",0,b,"getWindow",0,a,"isContainingBlock",0,g,"isElement",0,l,"isHTMLElement",0,s,"isLastTraversableNode",0,x,"isNode",0,i,"isOverflowElement",0,u,"isShadowRoot",0,c,"isTableElement",0,function(e){return/^(table|td|th)$/.test(o(e))},"isTopLayer",0,d,"isWebKit",0,m],29315);let w={...e.i(71645)};e.s(["SafeReact",0,w],93733)},30628,e=>{"use strict";var t=e.i(71645);let r={};e.s(["useRefWithInit",0,function(e,o){let a=t.useRef(r);return a.current===r&&(a.current=e(o)),a}])},76477,977,e=>{"use strict";e.i(47167);var t=e.i(93733),r=e.i(30628);let o=t.SafeReact.useInsertionEffect,a=o&&o!==t.SafeReact.useLayoutEffect?o:e=>e();function n(){let e={next:void 0,callback:i,trampoline:(...t)=>e.callback?.(...t),effect:()=>{e.callback=e.next}};return e}function i(){}e.s(["useStableCallback",0,function(e){let t=(0,r.useRefWithInit)(n).current;return t.next=e,a(t.effect),t.trampoline}],76477);var l=e.i(71645);let s="u">typeof document?l.useLayoutEffect:()=>{};e.s(["useIsoLayoutEffect",0,s],977)},19805,22522,67805,e=>{"use strict";function t(e,t){return e&&!t?e:!e&&t?t:e||t?{...e,...t}:void 0}e.s(["mergeObjects",0,t],22522);let r={};function o(e){return i(e)?{...l(e,r)}:function(e){let t={...e};for(let e in t){let r=t[e];n(e,r)&&(t[e]=s(r))}return t}(e)}function a(e,r){return i(r)?l(r,e):function(e,r){if(!r)return e;for(let o in r){let a=r[o];switch(o){case"style":e[o]=t(e.style,a);break;case"className":e[o]=u(e.className,a);break;default:n(o,a)?e[o]=function(e,t){return t?e?(...r)=>{let o=r[0];if(d(o)){c(o);let a=t(...r);return o.baseUIHandlerPrevented||e?.(...r),a}let a=t(...r);return e?.(...r),a}:s(t):e}(e[o],a):e[o]=a}}return e}(e,r)}function n(e,t){let r=e.charCodeAt(0),o=e.charCodeAt(1),a=e.charCodeAt(2);return 111===r&&110===o&&a>=65&&a<=90&&("function"==typeof t||void 0===t)}function i(e){return"function"==typeof e}function l(e,t){return i(e)?e(t):e??r}function s(e){return e?(...t)=>{let r=t[0];return d(r)&&c(r),e(...t)}:e}function c(e){return e.preventBaseUIHandler=()=>{e.baseUIHandlerPrevented=!0},e}function u(e,t){return t?e?t+" "+e:t:e}function d(e){return null!=e&&"object"==typeof e&&"nativeEvent"in e}e.s(["makeEventPreventable",0,c,"mergeClassNames",0,u,"mergeProps",0,function(e,t,r,n,i){if(!r&&!n&&!i&&!e)return o(t);let l=o(e);return t&&(l=a(l,t)),r&&(l=a(l,r)),n&&(l=a(l,n)),i&&(l=a(l,i)),l},"mergePropsN",0,function(e){if(0===e.length)return r;if(1===e.length)return o(e[0]);let t=o(e[0]);for(let r=1;r<e.length;r+=1)t=a(t,e[r]);return t}],19805);let f=function(e,...t){let r=new URL("https://base-ui.com/production-error");return r.searchParams.set("code",e.toString()),t.forEach(e=>r.searchParams.append("args[]",e)),`Base UI error #${e}; visit ${r} for the full message.`};e.s(["default",0,f],67805)},53402,e=>{"use strict";e.i(47167);var t=e.i(71645),r=e.i(29315),o=e.i(76477),a=e.i(977),n=e.i(19805),i=e.i(67805);let l=t.createContext(void 0);function s(e){return(0,r.isHTMLElement)(e)&&"BUTTON"===e.tagName}e.s(["useButton",0,function(e={}){let{disabled:r=!1,focusableWhenDisabled:c,tabIndex:u=0,native:d=!0,composite:f}=e,p=t.useRef(null),h=function(e=!1){let r=t.useContext(l);if(void 0===r&&!e)throw Error((0,i.default)(16));return r}(!0),g=f??void 0!==h,{props:m}=function(e){let{focusableWhenDisabled:r,disabled:o,composite:a=!1,tabIndex:n=0,isNativeButton:i}=e,l=a&&!1!==r,s=a&&!1===r;return{props:t.useMemo(()=>{let e={onKeyDown(e){o&&r&&"Tab"!==e.key&&e.preventDefault()}};return a||(e.tabIndex=n,!i&&o&&(e.tabIndex=r?n:-1)),(i&&(r||l)||!i&&o)&&(e["aria-disabled"]=o),i&&(!r||s)&&(e.disabled=o),e},[a,o,r,l,s,i,n])}}({focusableWhenDisabled:c,disabled:r,composite:g,tabIndex:u,isNativeButton:d}),x=t.useCallback(()=>{let e=p.current;s(e)&&g&&r&&void 0===m.disabled&&e.disabled&&(e.disabled=!1)},[r,m.disabled,g]);return(0,a.useIsoLayoutEffect)(x,[x]),{getButtonProps:t.useCallback((e={})=>{let{onClick:t,onMouseDown:o,onKeyUp:a,onKeyDown:i,onPointerDown:l,...c}=e;return(0,n.mergeProps)({onClick(e){r?e.preventDefault():t?.(e)},onMouseDown(e){r||o?.(e)},onKeyDown(e){var o;if(r||((0,n.makeEventPreventable)(e),i?.(e),e.baseUIHandlerPrevented))return;let a=e.target===e.currentTarget,l=e.currentTarget,c=s(l),u=!d&&(o=l,!!(o?.tagName==="A"&&o?.href)),f=a&&(d?c:!u),p="Enter"===e.key,h=" "===e.key,m=l.getAttribute("role"),x=m?.startsWith("menuitem")||"option"===m||"gridcell"===m;if(a&&g&&h){if(e.defaultPrevented&&x)return;e.preventDefault(),u||d&&c?(l.click(),e.preventBaseUIHandler()):f&&(t?.(e),e.preventBaseUIHandler());return}f&&(!d&&(h||p)&&e.preventDefault(),!d&&p&&t?.(e))},onKeyUp(e){r||(((0,n.makeEventPreventable)(e),a?.(e),e.target===e.currentTarget&&d&&g&&s(e.currentTarget)&&" "===e.key)?e.preventDefault():!e.baseUIHandlerPrevented&&(e.target!==e.currentTarget||d||g||" "!==e.key||t?.(e)))},onPointerDown(e){r?e.preventDefault():l?.(e)}},d?{type:"button"}:{role:"button"},m,c)},[r,m,g,d]),buttonRef:(0,o.useStableCallback)(e=>{p.current=e,x()})}}],53402)},69095,26292,35423,17514,e=>{"use strict";e.i(47167);var t=e.i(67805),r=e.i(71645),o=e.i(30628);function a(e,t,r,a){var n,s,c,u,d;let f=(0,o.useRefWithInit)(i).current;return n=f,s=e,c=t,u=r,d=a,(n.refs[0]!==s||n.refs[1]!==c||n.refs[2]!==u||n.refs[3]!==d)&&l(f,[e,t,r,a]),f.callback}function n(e){var t,r;let a=(0,o.useRefWithInit)(i).current;return t=a,r=e,(t.refs.length!==r.length||t.refs.some((e,t)=>e!==r[t]))&&l(a,e),a.callback}function i(){return{callback:null,cleanup:null,refs:[]}}function l(e,t){if(e.refs=t,t.every(e=>null==e)){e.callback=null;return}e.callback=r=>{if(e.cleanup&&(e.cleanup(),e.cleanup=null),null!=r){let o=Array(t.length).fill(null);for(let e=0;e<t.length;e+=1){let a=t[e];if(null!=a)switch(typeof a){case"function":{let t=a(r);"function"==typeof t&&(o[e]=t);break}case"object":a.current=r}}e.cleanup=()=>{for(let e=0;e<t.length;e+=1){let r=t[e];if(null!=r)switch(typeof r){case"function":{let t=o[e];"function"==typeof t?t():r(null);break}case"object":r.current=null}}}}}}e.s(["useMergedRefs",0,a,"useMergedRefsN",0,n],26292);let s=parseInt(r.version,10);function c(e){return s>=e}function u(e){if(!r.isValidElement(e))return null;let t=e.props;return(c(19)?t?.ref:e.ref)??null}e.s(["isReactVersionAtLeast",0,c],35423);var d=e.i(22522);Object.freeze([]);let f=Object.freeze({});e.s(["EMPTY_OBJECT",0,f,"NOOP",0,function(){}],17514);var p=e.i(19805);let h=Symbol.for("react.lazy");e.s(["useRenderElement",0,function(e,o,i={}){let l=o.render,s=function(e,t={}){var r;let{className:o,style:i,render:l}=e,{state:s=f,ref:c,props:h,stateAttributesMapping:g,enabled:m=!0}=t,x=m?"function"==typeof o?o(s):o:void 0,v=m?"function"==typeof i?i(s):i:void 0,b=m?function(e,t){let r={};for(let o in e){let a=e[o];if(t?.hasOwnProperty(o)){let e=t[o](a);null!=e&&Object.assign(r,e);continue}!0===a?r[`data-${o.toLowerCase()}`]="":a&&(r[`data-${o.toLowerCase()}`]=a.toString())}return r}(s,g):f,y=m&&h?Array.isArray(r=h)?(0,p.mergePropsN)(r):(0,p.mergeProps)(void 0,r):void 0,w=m?(0,d.mergeObjects)(b,y)??{}:f;return("u">typeof document&&(m?Array.isArray(c)?w.ref=n([w.ref,u(l),...c]):w.ref=a(w.ref,u(l),c):a(null,null)),m)?(void 0!==x&&(w.className=(0,p.mergeClassNames)(w.className,x)),void 0!==v&&(w.style=(0,d.mergeObjects)(w.style,v)),w):f}(o,i);return!1===i.enabled?null:function(e,o,a,n){if(o){if("function"==typeof o)return o(a,n);let e=(0,p.mergeProps)(a,o.props);e.ref=a.ref;let t=o;return t?.$$typeof===h&&(t=r.Children.toArray(o)[0]),r.cloneElement(t,e)}if(e&&"string"==typeof e){var i,l;return i=e,l=a,"button"===i?(0,r.createElement)("button",{type:"button",...l,key:l.key}):"img"===i?(0,r.createElement)("img",{alt:"",...l,key:l.key}):r.createElement(i,l)}throw Error((0,t.default)(8))}(e,l,s,i.state??f)}],69095)},72472,e=>{"use strict";var t=e.i(71645),r=e.i(53402),o=e.i(69095);let a=t.forwardRef(function(e,t){let{render:a,className:n,disabled:i=!1,focusableWhenDisabled:l=!1,nativeButton:s=!0,style:c,...u}=e,{getButtonProps:d,buttonRef:f}=(0,r.useButton)({disabled:i,focusableWhenDisabled:l,native:s});return(0,o.useRenderElement)("button",e,{state:{disabled:i},ref:[t,f],props:[u,d]})});e.s(["Button",0,a])},19455,e=>{"use strict";var t=e.i(43476),r=e.i(72472),o=e.i(25913),a=e.i(75157);let n=(0,o.cva)("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/80",outline:"border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",secondary:"bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",ghost:"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",destructive:"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",xs:"h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",sm:"h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",lg:"h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",icon:"size-8","icon-xs":"size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3","icon-sm":"size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg","icon-lg":"size-9"}},defaultVariants:{variant:"default",size:"default"}});e.s(["Button",0,function({className:e,variant:o="default",size:i="default",...l}){return(0,t.jsx)(r.Button,{"data-slot":"button",className:(0,a.cn)(n({variant:o,size:i,className:e})),...l})}])},41513,e=>{"use strict";var t=e.i(43476),r=e.i(71645),o=e.i(25913),a=e.i(40604),n=e.i(75157),i=e.i(19455);let l=(0,o.cva)("transition-colors",{variants:{variant:{default:"bg-primary! text-primary-foreground! hover:bg-primary/80!",outline:"bg-background! text-foreground! hover:bg-input/50! dark:bg-input/30!",secondary:"bg-secondary! text-secondary-foreground! hover:bg-secondary/80!",ghost:"bg-transparent! text-foreground! hover:bg-muted/50! dark:hover:bg-muted/50!",destructive:"bg-destructive/10! text-destructive! hover:bg-destructive/20! dark:bg-destructive/20! dark:hover:bg-destructive/30!",link:"bg-transparent! text-primary!"}},defaultVariants:{variant:"default"}}),s=(0,r.forwardRef)(function({metalVariant:e="button",metalFxClassName:r,metalFxStyle:o,preset:s="chromatic",theme:c="auto",strength:u=.9,paused:d,borderRadius:f,disableGlow:p,reflectionTargets:h,shaderScale:g,ringCssPx:m,scale:x,normalizeHostStyles:v=!0,variant:b="default",className:y,...w},_){return(0,t.jsx)(a.MetalFx,{borderRadius:f,className:(0,n.cn)("overflow-visible! inline-flex w-fit min-w-0 flex-col items-stretch leading-none","relative isolate before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-1 before:ring-border/70 before:ring-inset dark:before:ring-border/80",v&&l({variant:b}),r),disableGlow:p,normalizeHostStyles:v,paused:d,preset:s,ref:_,reflectionTargets:h,ringCssPx:m,scale:x,shaderScale:g,strength:u,style:o,theme:c,variant:e,children:(0,t.jsx)(i.Button,{className:(0,n.cn)(v&&"border-0! bg-transparent! shadow-none! hover:bg-transparent! aria-expanded:bg-transparent!",y),variant:b,...w})})});s.displayName="MetalButton",(0,r.forwardRef)(function({size:e="icon-sm",metalVariant:r="circle",className:o,...a},i){return(0,t.jsx)(s,{className:(0,n.cn)("leading-none! [&_svg]:block [&_svg]:shrink-0",o),metalVariant:r,ref:i,size:e,...a})}).displayName="MetalIconButton",e.s(["MetalButton",0,s])},20783,e=>{"use strict";var t=e.i(71645);function r(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function o(...e){return t=>{let o=!1,a=e.map(e=>{let a=r(e,t);return o||"function"!=typeof a||(o=!0),a});if(o)return()=>{for(let t=0;t<a.length;t++){let o=a[t];"function"==typeof o?o():r(e[t],null)}}}}e.s(["composeRefs",0,o,"useComposedRefs",0,function(...e){return t.useCallback(o(...e),e)}])},91918,e=>{"use strict";var t=e.i(71645),r=e.i(20783);function o(e){let o=t.forwardRef((o,a)=>{var l;let f,p,{children:h,...g}=o,m=null,x=!1,v=[];s(h)&&"function"==typeof d&&(h=d(h._payload)),t.Children.forEach(h,e=>{var r;if(r=e,t.isValidElement(r)&&"function"==typeof r.type&&"__radixId"in r.type&&r.type.__radixId===n){x=!0;let t="child"in e.props?e.props.child:e.props.children;s(t)&&"function"==typeof d&&(t=d(t._payload)),m=i(e,t),v.push(m?.props?.children)}else v.push(e)}),m?m=t.cloneElement(m,void 0,v):!x&&1===t.Children.count(h)&&t.isValidElement(h)&&(m=h);let b=m?(l=m,(p=(f=Object.getOwnPropertyDescriptor(l.props,"ref")?.get)&&"isReactWarning"in f&&f.isReactWarning)?l.ref:(p=(f=Object.getOwnPropertyDescriptor(l,"ref")?.get)&&"isReactWarning"in f&&f.isReactWarning)?l.props.ref:l.props.ref||l.ref):void 0,y=(0,r.useComposedRefs)(a,b);if(!m){if(h||0===h)throw Error(x?u(e):c(e));return h}let w=function(e,t){let r={...t};for(let o in t){let a=e[o],n=t[o];/^on[A-Z]/.test(o)?a&&n?r[o]=(...e)=>{let t=n(...e);return a(...e),t}:a&&(r[o]=a):"style"===o?r[o]={...a,...n}:"className"===o&&(r[o]=[a,n].filter(Boolean).join(" "))}return{...e,...r}}(g,m.props??{});return m.type!==t.Fragment&&(w.ref=a?y:b),t.cloneElement(m,w)});return o.displayName=`${e}.Slot`,o}var a=o("Slot"),n=Symbol.for("radix.slottable"),i=(e,r)=>{if("child"in e.props){let r=e.props.child;return t.isValidElement(r)?t.cloneElement(r,void 0,e.props.children(r.props.children)):null}return t.isValidElement(r)?r:null},l=Symbol.for("react.lazy");function s(e){var t;return null!=e&&"object"==typeof e&&"$$typeof"in e&&e.$$typeof===l&&"_payload"in e&&"object"==typeof(t=e._payload)&&null!==t&&"then"in t}var c=e=>`${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,u=e=>`${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,d=t[" use ".trim().toString()];e.s(["Slot",0,a,"createSlot",0,o])},69340,34620,e=>{"use strict";var t=e.i(71645),r=globalThis?.document?t.useLayoutEffect:()=>{};e.s(["useLayoutEffect",0,r],34620),t[" useEffectEvent ".trim().toString()],t[" useInsertionEffect ".trim().toString()];var o=t[" useInsertionEffect ".trim().toString()]||r;Symbol("RADIX:SYNC_STATE"),e.s(["useControllableState",0,function({prop:e,defaultProp:r,onChange:a=()=>{},caller:n}){let[i,l,s]=function({defaultProp:e,onChange:r}){let[a,n]=t.useState(e),i=t.useRef(a),l=t.useRef(r);return o(()=>{l.current=r},[r]),t.useEffect(()=>{i.current!==a&&(l.current?.(a),i.current=a)},[a,i]),[a,n,l]}({defaultProp:r,onChange:a}),c=void 0!==e,u=c?e:i;{let r=t.useRef(void 0!==e);t.useEffect(()=>{let e=r.current;if(e!==c){let t=c?"controlled":"uncontrolled";console.warn(`${n} is changing from ${e?"controlled":"uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`)}r.current=c},[c,n])}return[u,t.useCallback(t=>{if(c){let r="function"==typeof t?t(e):t;r!==e&&s.current?.(r)}else l(t)},[c,e,l,s])]}],69340)},49382,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let o={dots:"bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.4)_1px,transparent_0)] bg-[length:8px_8px]",grid:"bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[length:12px_12px]",noise:"bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.25)_1px,transparent_0)] bg-[length:6px_6px]",crosshatch:"bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px),repeating-linear-gradient(-45deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]",diagonal:"bg-[repeating-linear-gradient(-45deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_1px,transparent_1px,transparent_6px)]",scatteredDots:"bg-[radial-gradient(circle_at_3px_7px,rgba(0,0,0,0.3)_1px,transparent_0),radial-gradient(circle_at_11px_2px,rgba(0,0,0,0.3)_1px,transparent_0),radial-gradient(circle_at_7px_12px,rgba(0,0,0,0.3)_1px,transparent_0)] bg-[length:16px_16px]",halftone:"bg-[radial-gradient(circle,rgba(0,0,0,0.4)_25%,transparent_25%)] bg-[length:10px_10px] bg-[position:0_0,5px_5px]",triangular:"bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,0,0,0.3)_0deg_120deg,transparent_120deg_240deg,rgba(0,0,0,0.3)_240deg_360deg)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]",chevron:"bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.2)_0px,rgba(0,0,0,0.2)_2px,transparent_2px,transparent_8px),repeating-linear-gradient(-45deg,rgba(0,0,0,0.2)_0px,rgba(0,0,0,0.2)_2px,transparent_2px,transparent_8px)]",paperGrain:"bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(0,0,0,0.1)_0px,transparent_1px,transparent_4px),repeating-linear-gradient(45deg,rgba(0,0,0,0.05)_0px,transparent_1px,transparent_5px)]",horizontalLines:"bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_4px)]",verticalLines:"bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_4px)]",none:""},a={dots:1,grid:1,noise:1,crosshatch:1,diagonal:1,scatteredDots:1,halftone:1,triangular:1,chevron:1,paperGrain:1,horizontalLines:1,verticalLines:1,none:0};e.s(["TextureOverlay",0,function({texture:e,opacity:n,className:i}){if("none"===e)return null;let l=n??a[e],s=o[e];return(0,t.jsx)("div",{className:(0,r.cn)("absolute inset-0 pointer-events-none",s,i),style:{opacity:l}})}])}]);