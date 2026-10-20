import Lenis from "lenis";
import { rm, $ } from "./util.js";

// Thin wrapper so the rest of the code does not care whether smooth scrolling is on.
export const scroller = {
  lenis: null,
  init(gsap, ScrollTrigger) {
    if (rm) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
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
