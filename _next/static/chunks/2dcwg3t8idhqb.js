(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95416,41647,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(88653),o=e.i(46932),a=e.i(47414),s=e.i(74008),n=e.i(76859),l=e.i(47834),h=e.i(65566);function u(e,t){[...t].reverse().forEach(i=>{let r=e.getVariant(i);r&&(0,l.setTarget)(e,r),e.variantChildren&&e.variantChildren.forEach(e=>{u(e,t)})})}function c(){let e=!1,t=new Set,i={subscribe:e=>(t.add(e),()=>void t.delete(e)),start(i,r){(0,h.invariant)(e,"controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");let o=[];return t.forEach(e=>{o.push((0,n.animateVisualElement)(e,i,{transitionOverride:r}))}),Promise.all(o)},set:i=>((0,h.invariant)(e,"controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."),t.forEach(e=>{var t,r;t=e,Array.isArray(r=i)?u(t,r):"string"==typeof r?u(t,[r]):(0,l.setTarget)(t,r)})),stop(){t.forEach(e=>{e.values.forEach(e=>e.stop())})},mount:()=>(e=!0,()=>{e=!1,i.stop()})};return i}let d=function(){let e=(0,a.useConstant)(c);return(0,s.useIsomorphicLayoutEffect)(e.mount,[]),e},p=i.default.memo(()=>(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",children:[(0,t.jsx)("filter",{id:"noise",children:(0,t.jsx)("feTurbulence",{type:"fractalNoise",baseFrequency:"0.65",numOctaves:"3",stitchTiles:"stitch"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",filter:"url(#noise)"})]}));p.displayName="NoiseSVG";let f=({opacity:e})=>(0,t.jsx)("div",{className:"absolute inset-0 h-full w-full mix-blend-overlay",style:{opacity:e},children:(0,t.jsx)(p,{})}),m=i.default.memo(({gradients:e,animationDuration:r})=>{let a=d();return(0,i.useEffect)(()=>{a.start({background:e.map(e=>`radial-gradient(circle at ${e.centerX}% ${e.centerY}%, ${e.stops.map(e=>`${e.color} ${e.position}%`).join(", ")})`),transition:{duration:r,repeat:1/0,repeatType:"reverse",ease:"linear"}})},[a,e,r]),(0,t.jsx)(o.motion.div,{className:"absolute inset-0 h-full w-full",animate:a})});m.displayName="Gradient";let x=i.default.memo(({dotSize:e,dotSpacing:r,dotOpacity:o,waveIntensity:a,waveRadius:s,dotColor:n,glowColor:l,performance:h,mousePos:u})=>{let c=(0,i.useRef)(null),d=(0,i.useRef)(null),p=(0,i.useCallback)((t,i)=>{let{width:c,height:d}=t.canvas;t.clearRect(0,0,c,d);let p={low:{skip:3},medium:{skip:2},high:{skip:1}}[h].skip,f=Math.ceil(c/r),m=Math.ceil(d/r),x=u.x*c,g=u.y*d;for(let h=0;h<f;h+=p)for(let u=0;u<m;u+=p){let c=h*r,d=u*r,p=c-x,f=d-g,m=Math.sqrt(p*p+f*f),v=c,_=d;if(m<s){let r=Math.pow(1-m/s,2),n=Math.atan2(f,p),h=Math.sin(.05*m-.005*i)*a*r;v+=Math.cos(n)*h,_+=Math.sin(n)*h;let u=e*(1+r),c=t.createRadialGradient(v,_,0,v,_,u);c.addColorStop(0,l.replace("1)",`${o*(1+r)})`)),c.addColorStop(1,l.replace("1)","0)")),t.fillStyle=c}else t.fillStyle=n.replace("1)",`${o})`);t.beginPath(),t.arc(v,_,e/2,0,2*Math.PI),t.fill()}},[e,r,o,a,s,n,l,h,u]);return(0,i.useEffect)(()=>{let e=c.current;if(!e)return;let t=e.getContext("2d");if(!t)return;let i=()=>{e.width=window.innerWidth,e.height=window.innerHeight};i(),window.addEventListener("resize",i);let r=0,o=e=>{e-r>16&&(p(t,e),r=e),d.current=requestAnimationFrame(o)};return d.current=requestAnimationFrame(o),()=>{window.removeEventListener("resize",i),d.current&&cancelAnimationFrame(d.current)}},[p]),(0,t.jsx)("canvas",{ref:c,className:"absolute inset-0 h-full w-full bg-gray-100",style:{mixBlendMode:"multiply"}})});x.displayName="DotCanvas";let g=i.default.memo(({glowColor:e,mousePos:i})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"absolute w-40 h-40 rounded-full pointer-events-none",style:{background:`radial-gradient(circle, ${e.replace("1)","0.2)")} 0%, ${e.replace("1)","0)")} 70%)`,left:`${100*i.x}%`,top:`${100*i.y}%`,transform:"translate(-50%, -50%)",filter:"blur(10px)"}}),(0,t.jsx)("div",{className:"absolute w-20 h-20 rounded-full pointer-events-none",style:{background:`radial-gradient(circle, ${e.replace("1)","0.4)")} 0%, ${e.replace("1)","0)")} 70%)`,left:`${100*i.x}%`,top:`${100*i.y}%`,transform:"translate(-50%, -50%)"}})]}));g.displayName="MouseGlow";let v=[{stops:[{color:"#FFD6A5",position:0},{color:"#FFADAD",position:25},{color:"#FFC6FF",position:50},{color:"transparent",position:75}],centerX:50,centerY:50},{stops:[{color:"#A0C4FF",position:0},{color:"#BDB2FF",position:25},{color:"#CAFFBF",position:50},{color:"transparent",position:75}],centerX:60,centerY:40},{stops:[{color:"#9BF6FF",position:0},{color:"#FDFFB6",position:25},{color:"#FFAFCC",position:50},{color:"transparent",position:75}],centerX:40,centerY:60}];e.s(["CanvasFractalGrid",0,function({dotSize:e=4,dotSpacing:a=20,dotOpacity:s=.3,gradientAnimationDuration:n=20,waveIntensity:l=30,waveRadius:h=200,gradients:u=v,dotColor:c="rgba(100, 100, 255, 1)",glowColor:d="rgba(100, 100, 255, 1)",enableNoise:p=!0,noiseOpacity:_=.03,enableMouseGlow:b=!0,initialPerformance:w="medium",enableGradient:y=!1}){let S=(0,i.useRef)(null),{isMobile:U,isTablet:R}=(()=>{let[e,t]=(0,i.useState)({width:0,height:0});return(0,i.useEffect)(()=>{let e=()=>{t({width:window.innerWidth,height:window.innerHeight})};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),{isMobile:e.width<768,isTablet:e.width>=768&&e.width<1024,isDesktop:e.width>=1024}})(),{performance:z}=((e="medium")=>{let[t,r]=(0,i.useState)(e),[o,a]=(0,i.useState)(60);return(0,i.useEffect)(()=>{let e,t=0,i=globalThis.performance.now(),r=o=>{t++,o-i>1e3&&(a(Math.round(1e3*t/(o-i))),t=0,i=o),e=requestAnimationFrame(r)};return e=requestAnimationFrame(r),()=>cancelAnimationFrame(e)},[]),(0,i.useEffect)(()=>{let e=o<30?"low":o<50?"medium":"high";if(e===t)return;let i=requestAnimationFrame(()=>{r(e)});return()=>cancelAnimationFrame(i)},[o,t]),{performance:t,fps:o}})(w),[B,V]=(0,i.useState)({x:0,y:0}),E=(0,i.useCallback)(e=>{let{clientX:t,clientY:i}=e,{left:r,top:o,width:a,height:s}=S.current?.getBoundingClientRect()??{left:0,top:0,width:0,height:0};V({x:(t-r)/a,y:(i-o)/s})},[]);(0,i.useEffect)(()=>(window.addEventListener("mousemove",E),()=>window.removeEventListener("mousemove",E)),[E]);let A=(0,i.useMemo)(()=>U?.75*e:R?.9*e:e,[U,R,e]),j=(0,i.useMemo)(()=>U?1.5*a:R?1.25*a:a,[U,R,a]);return(0,t.jsx)(r.AnimatePresence,{children:(0,t.jsxs)(o.motion.div,{ref:S,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5,ease:"easeOut"},className:"absolute inset-0 overflow-hidden w-full h-full",children:[y&&(0,t.jsx)(m,{gradients:u,animationDuration:n}),y&&(0,t.jsx)(o.motion.div,{className:"absolute inset-0 h-full w-full",style:{background:"radial-gradient(circle, transparent, #FFFFFF)",backgroundSize:"100% 100%",backgroundPosition:"center",mixBlendMode:"overlay"},animate:{backgroundPosition:`${100*B.x}% ${100*B.y}%`}}),(0,t.jsx)(x,{dotSize:A,dotSpacing:j,dotOpacity:s,waveIntensity:l,waveRadius:h,dotColor:c,glowColor:d,performance:z,mousePos:B}),p&&(0,t.jsx)(f,{opacity:_}),b&&(0,t.jsx)(g,{glowColor:d,mousePos:B})]},"landing-animation")})}],95416);var _=t;let b=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,w=8294400;class y{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=(function(){let e=navigator.userAgent.toLowerCase();return e.includes("safari")&&!e.includes("chrome")&&!e.includes("android")})();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(e,t,i,r,o=0,a=0,s=2,n=w,l=[]){if(e?.nodeType===1)this.parentElement=e;else throw Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){const e=this.ownerDocument.createElement("style");e.innerHTML=U,e.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(e)}const h=this.ownerDocument.createElement("canvas");this.canvasElement=h,this.parentElement.prepend(h),this.fragmentShader=t,this.providedUniforms=i,this.mipmaps=l,this.currentFrame=a,this.minPixelRatio=s,this.maxPixelCount=n;const u=h.getContext("webgl2",r);if(!u)throw Error("Paper Shaders: WebGL is not supported in this browser");this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(o),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}initProgram=()=>{let e=function(e,t,i){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),o=r?r.precision:null;o&&o<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let a=S(e,e.VERTEX_SHADER,t),s=S(e,e.FRAGMENT_SHADER,i);if(!a||!s)return null;let n=e.createProgram();return n?(e.attachShader(n,a),e.attachShader(n,s),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))?(e.detachShader(n,a),e.detachShader(n,s),e.deleteShader(a),e.deleteShader(s),n):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(n)),e.deleteProgram(n),e.deleteShader(a),e.deleteShader(s),null):null}(this.gl,b,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([t,i])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),i instanceof HTMLImageElement){let i=`${t}AspectRatio`;e[i]=this.gl.getUniformLocation(this.program,i)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];void 0!==t&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,i=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let o=Math.max(1,this.minPixelRatio/i);e=this.parentDevicePixelWidth*o*r,t=this.parentDevicePixelHeight*o*r}else{var o;let a,s,n=Math.max(i,this.minPixelRatio)*r;this.isSafari&&(n*=Math.max(1,(o=this.ownerDocument,(s=Math.round(100*(a=outerWidth/((visualViewport?.scale??1)*(visualViewport?.width??window.innerWidth)+(window.innerWidth-o.documentElement.clientWidth)))))%5==0?s/100:33===s?1/3:67===s?2/3:133===s?4/3:a))),e=Math.round(this.parentWidth)*n,t=Math.round(this.parentHeight)*n}let a=Math.min(1,Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t)),s=Math.round(e*a),n=Math.round(t*a),l=s/Math.round(this.parentWidth);(this.canvasElement.width!==s||this.canvasElement.height!==n||this.renderScale!==l)&&(this.renderScale=l,this.canvasElement.width=s,this.canvasElement.height=n,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(null===this.program)return void console.warn("Tried to render before program or gl was initialized");let t=e-this.lastRenderTime;this.lastRenderTime=e,0!==this.currentSpeed&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,.001*this.currentFrame),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),0!==this.currentSpeed?this.requestRender():this.rafId=null};requestRender=()=>{null!==this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||0===t.naturalWidth)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let i=this.textures.get(e);i&&this.gl.deleteTexture(i),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let o=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||null===o)return void console.error("Paper Shaders: WebGL error when uploading texture:",a);this.textures.set(e,o);let s=this.uniformLocations[e];if(s){this.gl.uniform1i(s,r);let i=`${e}AspectRatio`,o=this.uniformLocations[i];if(o){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(o,e)}}};areUniformValuesEqual=(e,t)=>e===t||!!(Array.isArray(e)&&Array.isArray(t))&&e.length===t.length&&e.every((e,i)=>this.areUniformValuesEqual(e,t[i]));setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let i=t;if(t instanceof HTMLImageElement&&(i=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],i))return;this.uniformCache[e]=i;let r=this.uniformLocations[e];if(!r)return void console.warn(`Uniform location for ${e} not found`);if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let i=null,o=null;if(void 0!==t[0]&&Array.isArray(t[0])){let r=t[0].length;if(!t.every(e=>e.length===r))return void console.warn(`All child arrays must be the same length for ${e}`);i=t.flat(),o=r}else o=(i=t).length;switch(o){case 2:this.gl.uniform2fv(r,i);break;case 3:this.gl.uniform3fv(r,i);break;case 4:this.gl.uniform4fv(r,i);break;case 9:this.gl.uniformMatrix3fv(r,!1,i);break;case 16:this.gl.uniformMatrix4fv(r,!1,i);break;default:console.warn(`Unsupported uniform array length: ${o}`)}}else"number"==typeof t?this.gl.uniform1f(r,t):"boolean"==typeof t?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.setCurrentSpeed(this.ownerDocument.hidden?0:e)};setCurrentSpeed=e=>{this.currentSpeed=e,null===this.rafId&&0!==e&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),null!==this.rafId&&0===e&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=w)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.setCurrentSpeed(this.ownerDocument.hidden?0:this.speed)};dispose=()=>{this.hasBeenDisposed=!0,null!==this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}}function S(e,t,i){let r=e.createShader(t);return r?(e.shaderSource(r,i),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null):null}let U=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function R(e){if(e.naturalWidth<1024&&e.naturalHeight<1024){if(e.naturalWidth<1||e.naturalHeight<1)return;let t=e.naturalWidth/e.naturalHeight;e.width=Math.round(t>1?1024*t:1024),e.height=Math.round(t>1?1024:1024/t)}}async function z(e){let t={},i=[];return Object.entries(e).forEach(([e,r])=>{if("string"==typeof r){let o=r||"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";if(!(e=>{try{if(e.startsWith("/"))return!0;return new URL(e),!0}catch{return!1}})(o))return void console.warn(`Uniform "${e}" has invalid URL "${o}". Skipping image loading.`);let a=new Promise((i,r)=>{let a=new Image;(e=>{try{if(e.startsWith("/"))return!1;return new URL(e,window.location.origin).origin!==window.location.origin}catch{return!1}})(o)&&(a.crossOrigin="anonymous"),a.onload=()=>{R(a),t[e]=a,i()},a.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${o}`),r()},a.src=o});i.push(a)}else r instanceof HTMLImageElement&&R(r),t[e]=r}),await Promise.all(i),t}let B=(0,i.forwardRef)(function({fragmentShader:e,uniforms:r,webGlContextAttributes:o,speed:a=0,frame:s=0,width:n,height:l,minPixelRatio:h,maxPixelCount:u,mipmaps:c,style:d,...p},f){var m;let x,g,[v,_]=(0,i.useState)(!1),b=(0,i.useRef)(null),w=(0,i.useRef)(null),S=(0,i.useRef)(o);(0,i.useEffect)(()=>((async()=>{let t=await z(r);b.current&&!w.current&&(w.current=new y(b.current,e,t,S.current,a,s,h,u,c),_(!0))})(),()=>{w.current?.dispose(),w.current=null}),[e]),(0,i.useEffect)(()=>{let e=!1;return(async()=>{let t=await z(r);e||w.current?.setUniforms(t)})(),()=>{e=!0}},[r,v]),(0,i.useEffect)(()=>{w.current?.setSpeed(a)},[a,v]),(0,i.useEffect)(()=>{w.current?.setMaxPixelCount(u)},[u,v]),(0,i.useEffect)(()=>{w.current?.setMinPixelRatio(h)},[h,v]),(0,i.useEffect)(()=>{w.current?.setFrame(s)},[s,v]);let U=(m=[b,f],x=i.useRef(void 0),g=i.useCallback(e=>{let t=m.map(t=>{if(null!=t){if("function"==typeof t){let i=t(e);return"function"==typeof i?i:()=>{t(null)}}return t.current=e,()=>{t.current=null}}});return()=>{t.forEach(e=>e?.())}},m),i.useMemo(()=>m.every(e=>null==e)?null:e=>{x.current&&(x.current(),x.current=void 0),null!=e&&(x.current=g(e))},m));return(0,t.jsx)("div",{ref:U,style:void 0!==n||void 0!==l?{width:"string"==typeof n&&!1===isNaN(+n)?+n:n,height:"string"==typeof l&&!1===isNaN(+l)?+l:l,...d}:d,...p})});function V(e){if(Array.isArray(e))return 4===e.length?e:3===e.length?[...e,1]:A;if("string"!=typeof e)return A;let t,i,r,o=1;if(e.startsWith("#")){var a;[t,i,r,o]=(3===(a=(a=e).replace(/^#/,"")).length&&(a=a.split("").map(e=>e+e).join("")),6===a.length&&(a+="ff"),[parseInt(a.slice(0,2),16)/255,parseInt(a.slice(2,4),16)/255,parseInt(a.slice(4,6),16)/255,parseInt(a.slice(6,8),16)/255])}else if(e.startsWith("rgb")){let a;[t,i,r,o]=(a=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i))?[parseInt(a[1]??"0")/255,parseInt(a[2]??"0")/255,parseInt(a[3]??"0")/255,void 0===a[4]?1:parseFloat(a[4])]:[0,0,0,1]}else{let a;if(!e.startsWith("hsl"))return console.error("Unsupported color format",e),A;[t,i,r,o]=function(e){let t,i,r,[o,a,s,n]=e,l=o/360,h=a/100,u=s/100;if(0===a)t=i=r=u;else{let e=(e,t,i)=>(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e,o=u<.5?u*(1+h):u+h-u*h,a=2*u-o;t=e(a,o,l+1/3),i=e(a,o,l),r=e(a,o,l-1/3)}return[t,i,r,n]}((a=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i))?[parseInt(a[1]??"0"),parseInt(a[2]??"0"),parseInt(a[3]??"0"),void 0===a[4]?1:parseFloat(a[4])]:[0,0,0,1])}return[E(t,0,1),E(i,0,1),E(r,0,1),E(o,0,1)]}B.displayName="ShaderMount";let E=(e,t,i)=>Math.min(Math.max(e,t),i),A=[0,0,0,1],j=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,F=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,P=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,C=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,T=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${C}
${j}
${F}
${P}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,M={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},D={random:1,"2x2":2,"4x4":3,"8x8":4},k={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},L={none:0,contain:1,cover:2},I={name:"Default",params:{...k,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}},N=(0,i.memo)(function({speed:e=I.params.speed,frame:i=I.params.frame,colorBack:r=I.params.colorBack,colorFront:o=I.params.colorFront,shape:a=I.params.shape,type:s=I.params.type,pxSize:n,size:l=void 0===n?I.params.size:n,fit:h=I.params.fit,scale:u=I.params.scale,rotation:c=I.params.rotation,originX:d=I.params.originX,originY:p=I.params.originY,offsetX:f=I.params.offsetX,offsetY:m=I.params.offsetY,worldWidth:x=I.params.worldWidth,worldHeight:g=I.params.worldHeight,...v}){let _={u_colorBack:V(r),u_colorFront:V(o),u_shape:M[a],u_type:D[s],u_pxSize:l,u_fit:L[h],u_scale:u,u_rotation:c,u_offsetX:f,u_offsetY:m,u_originX:d,u_originY:p,u_worldWidth:x,u_worldHeight:g};return(0,t.jsx)(B,{...v,speed:e,frame:i,fragmentShader:T,uniforms:_})});var O=e.i(75157);e.i(19805),e.i(69095),(0,e.i(25913).cva)("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",{variants:{variant:{default:"bg-primary text-primary-foreground [a]:hover:bg-primary/80",secondary:"bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",destructive:"bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",outline:"border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",ghost:"hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",link:"text-primary underline-offset-4 hover:underline"}},defaultVariants:{variant:"default"}});var W=e.i(19455);let H=i.memo(N),$={width:1280,height:720,colorBack:"#000000",colorFront:"#00b3ff",shape:"swirl",type:"4x4",size:2,speed:1,scale:.6},X={colorBack:"#00000000",colorFront:"#00b3ff",shape:"swirl",size:2,speed:.85,scale:.52,type:"4x4",style:{height:"100%",width:"100%"}},G={label:"Check it out today ",href:"https://aisdkagents.com",target:"_blank",rel:"noopener noreferrer"},Y=(0,_.jsxs)(_.Fragment,{children:["Full-stack vercel ai sdk patterns for workflows, tool calling, and agent orchestration. Built with"," ",(0,_.jsx)("span",{className:"font-medium tracking-tight",children:"ai sdk v6"})," and"," ",(0,_.jsx)("span",{className:"font-medium tracking-tight",children:"shadcn/ui"}),".",(0,_.jsx)("span",{className:"hidden sm:inline",children:" Headless, themable, practical."})]}),q=[{name:"Next.js",version:"v16",icon:function(e){let t=i.useId(),r=`${t}-mask`,o=`${t}-paint0`,a=`${t}-paint1`;return(0,_.jsxs)("svg",{fill:"none",height:"1em",viewBox:"0 0 180 180",width:"1em",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,_.jsx)("title",{children:"Next.js"}),(0,_.jsx)("mask",{height:180,id:r,maskUnits:"userSpaceOnUse",style:{maskType:"alpha"},width:180,x:0,y:0,children:(0,_.jsx)("circle",{cx:90,cy:90,fill:"black",r:90})}),(0,_.jsxs)("g",{mask:`url(#${r})`,children:[(0,_.jsx)("circle",{cx:90,cy:90,fill:"black",r:87,stroke:"white",strokeWidth:6}),(0,_.jsx)("path",{d:"M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z",fill:`url(#${o})`}),(0,_.jsx)("rect",{fill:`url(#${a})`,height:72,width:12,x:115,y:54})]}),(0,_.jsxs)("defs",{children:[(0,_.jsxs)("linearGradient",{gradientUnits:"userSpaceOnUse",id:o,x1:109,x2:144.5,y1:116.5,y2:160.5,children:[(0,_.jsx)("stop",{stopColor:"white"}),(0,_.jsx)("stop",{offset:1,stopColor:"white",stopOpacity:0})]}),(0,_.jsxs)("linearGradient",{gradientUnits:"userSpaceOnUse",id:a,x1:121,x2:120.799,y1:54,y2:106.875,children:[(0,_.jsx)("stop",{stopColor:"white"}),(0,_.jsx)("stop",{offset:1,stopColor:"white",stopOpacity:0})]})]})]})}},{name:"AI SDK",version:"v6",icon:function(e){return(0,_.jsxs)("svg",{color:"currentcolor","data-testid":"geist-icon",height:"1em",strokeLinejoin:"round",viewBox:"0 0 16 16",width:"1em",...e,children:[(0,_.jsx)("title",{children:"AI SDK"}),(0,_.jsx)("path",{d:"M2.5.5V0h1v.5a2 2 0 002 2H6v1h-.5a2 2 0 00-2 2V6h-1v-.5a2 2 0 00-2-2H0v-1h.5a2 2 0 002-2zM14.5 4.5V5h-1v-.5a1 1 0 00-1-1H12v-1h.5a1 1 0 001-1V1h1v.5a1 1 0 001 1h.5v1h-.5a1 1 0 00-1 1zM8.407 4.93L8.5 4h1l.093.93a5 5 0 004.478 4.477L15 9.5v1l-.93.093a5 5 0 00-4.477 4.478L9.5 16h-1l-.093-.93a5 5 0 00-4.478-4.477L3 10.5v-1l.93-.093A5 5 0 008.406 4.93z",fill:"currentColor"})]})}}],K=i.createContext(void 0);function Q(){let e=i.useContext(K);if(!e)throw Error("HeroDithering components must be used within HeroDitheringRoot");return e}let Z=i.forwardRef(({className:e,children:t,srTitle:r="AI SDK Agents",title:o=(0,_.jsx)("span",{className:"font-pixel-square",children:"AI SDK Agents"}),subtitle:a="Copy and Paste",description:s=Y,showCta:n=!0,ctaProps:l,renderCta:h,showBadges:u=!0,techStack:c=q,renderBadge:d,desktopShaderProps:p,mobileShaderProps:f,...m},x)=>{let g=i.useMemo(()=>({...G,...l}),[l]),v=i.useMemo(()=>({...$,...p}),[p]),b=i.useMemo(()=>({...X,...f,style:{...X.style,...f?.style}}),[f]),w=i.useMemo(()=>({srTitle:r,title:o,subtitle:a,description:s,showCta:n,mergedCtaProps:g,renderCta:h,showBadges:u,techStack:c,renderBadge:d,mergedDesktopShaderProps:v,mergedMobileShaderProps:b}),[r,o,a,s,n,g,h,u,c,d,v,b]);return(0,_.jsx)(K.Provider,{value:w,children:(0,_.jsxs)("section",{className:(0,O.cn)("relative h-full w-full overflow-hidden",e),"data-slot":"hero-dithering-root",ref:x,...m,children:[(0,_.jsx)("h1",{className:"sr-only",children:r}),t]})})});function J({label:e,href:t,target:i,rel:r,onClick:o,className:a,buttonClassName:s}){return(0,_.jsx)("div",{className:(0,O.cn)("flex items-center justify-center gap-4 pb-4 md:pb-0",a),"data-slot":"hero-dithering-cta",children:(0,_.jsx)(W.Button,{className:(0,O.cn)("font-pixel-square",s),size:"lg",render:(0,_.jsx)("a",{href:t,onClick:o,rel:r,target:i}),nativeButton:!1,children:e})})}Z.displayName="HeroDitheringRoot",e.s(["HeroDitheringActions",0,function({className:e,showCta:t,ctaProps:i,renderCta:r,children:o,...a}){let s=Q(),n=t??s.showCta,l={...s.mergedCtaProps,...i},h=r??s.renderCta;if(!n)return null;let u=(0,_.jsx)(J,{...l});return(0,_.jsx)("div",{className:(0,O.cn)("flex justify-center lg:justify-start",e),"data-slot":"hero-dithering-cta-wrap",...a,children:o??(h?h(u):u)})},"HeroDitheringContainer",0,function({className:e,...t}){return(0,_.jsx)("div",{className:(0,O.cn)("container relative z-10 grid gap-6 pb-16 sm:gap-8 sm:pb-20 lg:grid-cols-[1fr_minmax(300px,500px)] lg:items-center lg:gap-12 lg:pb-24 xl:grid-cols-[1fr_1fr]",e),"data-slot":"hero-dithering-container",...t})},"HeroDitheringContent",0,function({className:e,...t}){return(0,_.jsx)("div",{className:(0,O.cn)("flex flex-col justify-center gap-4 text-balance sm:gap-5 sm:px-4 md:px-8 lg:gap-6 lg:pr-0 lg:pl-4 xl:pl-8 2xl:pl-0",e),"data-slot":"hero-dithering-content",...t})},"HeroDitheringDescription",0,function({className:e,description:t,descriptionClassName:i,children:r,...o}){let a=Q(),s=t??a.description;return(0,_.jsx)("div",{className:(0,O.cn)("mx-auto max-w-xl pb-2 text-center sm:pb-4 lg:mx-0 lg:max-w-none lg:pb-0 lg:text-left",e),"data-slot":"hero-dithering-description-wrap",...o,children:r??(0,_.jsx)("p",{className:(0,O.cn)("mt-0 mb-0 font-sans text-foreground/70 text-sm sm:text-base md:text-foreground/80 lg:text-lg xl:text-xl",i),"data-slot":"hero-dithering-description",children:s})})},"HeroDitheringHeading",0,function({className:e,title:t,subtitle:i,headingClassName:r,children:o,...a}){let s=Q(),n=t??s.title,l=i??s.subtitle;return(0,_.jsx)("div",{className:(0,O.cn)("pt-4 text-center sm:pt-6 lg:pt-0 lg:text-left",e),"data-slot":"hero-dithering-heading-wrap",...a,children:o??(0,_.jsx)("div",{className:"relative",children:(0,_.jsxs)("h2",{className:(0,O.cn)("relative mb-0 text-balance font-medium font-pixel-circle text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl lg:tracking-[-0.06em] xl:text-6xl 2xl:text-7xl",r),"data-slot":"hero-dithering-heading",children:[n," ",(0,_.jsx)("br",{}),l]})})})},"HeroDitheringMobileVisual",0,function({className:e,mobileShaderProps:t,...i}){let r=Q(),o={...r.mergedMobileShaderProps,...t,style:{...r.mergedMobileShaderProps.style,...t?.style}};return(0,_.jsxs)("div",{className:(0,O.cn)("pointer-events-none absolute inset-x-0 -bottom-24 -z-10 h-[360px] overflow-hidden lg:hidden",e),"data-slot":"hero-dithering-mobile",...i,children:[(0,_.jsx)("div",{className:"absolute inset-x-0 top-0 z-10 h-56 bg-gradient-to-b from-background via-background/95 to-transparent"}),(0,_.jsx)(H,{...o})]})},"HeroDitheringRoot",0,Z,"HeroDitheringVisual",0,function({className:e,desktopClassName:t,desktopShaderProps:i,...r}){let o={...Q().mergedDesktopShaderProps,...i};return(0,_.jsx)("div",{className:(0,O.cn)("relative hidden h-[350px] lg:block lg:h-[400px] xl:h-[500px]",e),"data-slot":"hero-dithering-visual",...r,children:(0,_.jsx)("div",{className:(0,O.cn)("absolute inset-0 flex items-center justify-center overflow-hidden rounded-full",t),"data-slot":"hero-dithering-desktop",children:(0,_.jsx)(H,{...o})})})}],41647)}]);