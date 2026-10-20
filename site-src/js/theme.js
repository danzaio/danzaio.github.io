import { $, root, rm } from "./util.js";

export const theme = {
  get() {
    return root.dataset.theme === "ink" ? "ink" : "paper";
  },
  set(t) {
    root.dataset.theme = t;
    try {
      localStorage.setItem("dz-theme", t);
    } catch {}
    $("[data-theme-color]")?.setAttribute("content", t === "ink" ? "#151612" : "#f1eee4");
    window.dispatchEvent(new Event("dz:theme"));
  },
  // Circular reveal from the click origin using the View Transitions API (falls back to an instant swap).
  toggle(origin) {
    const next = this.get() === "ink" ? "paper" : "ink";
    if (rm || !document.startViewTransition) return void this.set(next);
    const x = origin?.x ?? innerWidth - 60;
    const y = origin?.y ?? 40;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => this.set(next));
    vt.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 850, easing: "cubic-bezier(.76,0,.24,1)", pseudoElement: "::view-transition-new(root)" }
        )
      )
      .catch(() => {});
    return next;
  },
};
