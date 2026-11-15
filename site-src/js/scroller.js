import Lenis from "lenis";
import { rm, $ } from "./util.js";

// The native position, cached from scroll events (they run before rAF, while layout is clean). Reading
// window.scrollY inside a frame after GSAP has written styles forces a style recalc + layout.
// Only needed without Lenis (reduced motion): with Lenis this read ran after ScrollTrigger's callbacks had written
// styles in the same scroll event and forced a style recalc + layout on touch scrolling.
let nativeY = typeof scrollY === "number" ? scrollY : 0;
addEventListener("scroll", () => scroller.lenis || (nativeY = scrollY), { passive: true });

// Thin wrapper so the rest of the code does not care whether smooth scrolling is on.
export const scroller = {
  lenis: null,
  // current scroll position without touching layout
  y() {
    return this.lenis ? this.lenis.animatedScroll : nativeY;
  },
  init(gsap, ScrollTrigger) {
    if (rm) return;
    // Safari (every iOS browser, and Safari on macOS) runs requestAnimationFrame at 60 fps by default, even on
    // 120 Hz ProMotion screens: a JS-smoothed wheel there can never pass 60, while the native scroll runs on the
    // compositor at the screen's rate. Lenis stays (one scroll source for ScrollTrigger), without wheel smoothing.
    const ua = navigator.userAgent;
    const webkit = /AppleWebKit/.test(ua) && !/Chrome|Chromium/.test(ua);
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !webkit,
    });
    // ScrollTrigger reads the position from Lenis instead of window.pageYOffset: its own scroll-event handler
    // read it while styles were dirty, which cost a full style recalc on every scrolled frame
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(v) {
        if (arguments.length) lenis.scrollTo(v, { immediate: true, force: true });
        return lenis.scroll;
      },
      getBoundingClientRect: () => ({ top: 0, left: 0, width: innerWidth, height: innerHeight }),
      pinType: "fixed",
    });
    lenis.on("scroll", ScrollTrigger.update);
    // first in the tick: Lenis writes the scroll position while styles are still clean, before GSAP renders
    // this frame's tweens (after them, the write forced a full style recalc + layout every frame)
    gsap.ticker.add((t) => lenis.raf(t * 1000), false, true);
    gsap.ticker.lagSmoothing(0);
    this.lenis = lenis;
  },
  to(target, opts = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts });
      return;
    }
    const el = typeof target === "string" ? $(target) : target;
    if (typeof target === "number") window.scrollTo({ top: target, behavior: rm ? "auto" : "smooth" });
    else if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + (opts.offset || 0), behavior: rm ? "auto" : "smooth" });
  },
  stop() {
    this.lenis?.stop();
    if (!this.lenis) document.documentElement.style.overflow = "hidden";
  },
  start() {
    this.lenis?.start();
    if (!this.lenis) document.documentElement.style.overflow = "";
  },
};
