import { data } from "./util.js";

const KEY = "dz-gh-v1";
const TTL = 10 * 60 * 1000;

export function timeAgo(iso) {
  const a = data.contact.ago;
  const s = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}${a.m}`;
  if (s < 86400) return `${Math.round(s / 3600)}${a.h}`;
  if (s < 86400 * 45) return `${Math.round(s / 86400)}${a.d}`;
  return `${Math.round(s / (86400 * 30))}${a.mo}`;
}

// Public GitHub data only (no token). Cached for 10 min to stay far below the unauthenticated rate limit.
export async function loadGitHub() {
  try {
    const c = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (c && Date.now() - c.t < TTL) return c.v;
  } catch {}
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 6000);
  try {
    const opt = { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } };
    const [u, r] = await Promise.all([
      fetch("https://api.github.com/users/danzaio", opt),
      fetch("https://api.github.com/users/danzaio/repos?sort=pushed&per_page=1", opt),
    ]);
    if (!u.ok || !r.ok) throw new Error("gh " + u.status + "/" + r.status);
    const user = await u.json();
    const repos = await r.json();
    const v = {
      repos: user.public_repos,
      followers: user.followers,
      pushName: repos[0]?.name || "",
      pushAt: repos[0]?.pushed_at || "",
    };
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), v }));
    } catch {}
    return v;
  } finally {
    clearTimeout(to);
  }
}
