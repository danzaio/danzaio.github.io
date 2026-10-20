export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
export const fmt = (s, ...a) => s.replace(/\{(\d+)\}/g, (_, i) => a[i]);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

export const data = JSON.parse(document.getElementById("dz-data").textContent);
export const root = document.documentElement;
export const rm = root.classList.contains("rm");
export const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
export const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
