import { $, $$, data, fmt, sleep, rm } from "./util.js";
import { loadGitHub, timeAgo } from "./github.js";

const T = data.term;
const ASCII = [" ____   _____ ", "|  _ \\ |__  / ", "| | | |  / /  ", "| |_| | / /_  ", "|____/ /____| "];

export function initTerminal(root, api) {
  const body = $("[data-term-body]", root);
  const form = $("[data-term-form]", root);
  const input = $("[data-term-input]", root);
  body.setAttribute("data-lenis-prevent", "");
  const caret = Object.assign(document.createElement("span"), { className: "caret" });
  const hist = [];
  let hi = 0;
  let chain = Promise.resolve();
  let started = false;
  const t0 = performance.now();

  const scrollEnd = () => (body.scrollTop = body.scrollHeight);
  const row = (cls = "") => {
    const d = document.createElement("div");
    d.className = "row " + cls;
    const tn = document.createTextNode("");
    d.append(tn);
    body.append(d);
    d.append(caret);
    return { d, tn };
  };
  async function type(text, cls = "", speed = 8) {
    const { tn } = row(cls);
    if (rm || text.length > 170) {
      tn.data = text;
      return scrollEnd();
    }
    for (let i = 1; i <= text.length; i++) {
      tn.data = text.slice(0, i);
      if (i % 3 === 0) scrollEnd();
      await sleep(speed);
    }
    scrollEnd();
  }
  const line = (text, cls = "") => {
    const { tn } = row(cls);
    tn.data = text;
    scrollEnd();
  };

  const projectBy = (q) => {
    q = (q || "").toLowerCase();
    return data.work.find((p) => p.aliases.includes(q));
  };

  async function neofetch() {
    const nf = T.neofetch;
    const info = [
      "danzaio@workbench",
      "-----------------",
      `role    ${nf.role}`,
      `focus   ${nf.focus}`,
      `stack   ${nf.stack}`,
      `${nf.theme.padEnd(7)} ${api.theme.get()}`,
      `${nf.uptime.padEnd(7)} ${Math.max(1, Math.round((performance.now() - t0) / 60000))} min`,
    ];
    for (let i = 0; i < info.length; i++) {
      const a = (ASCII[i] || "").padEnd(16, " ");
      line(a + info[i], i < 5 && i > 1 ? "fetch" : "dim");
      if (!rm) await sleep(40);
    }
  }

  const cmds = {
    help: async () => {
      await type(T.help);
      await type(T.helpMore, "dim");
    },
    about: () => type(T.about),
    work: () => type(T.work),
    stack: () => type(T.stack),
    now: () => type(T.now),
    contact: () => type(T.contact),
    whoami: () => type(T.whoami),
    neofetch,
    theme: async (arg) => {
      const a = (arg || "").toLowerCase();
      if (a !== "paper" && a !== "ink") return type(T.themeUsage, "err");
      api.theme.set(a);
      await type(fmt(T.themeNow, a));
    },
    open: async (arg) => {
      const p = projectBy(arg);
      if (!p) return type(T.openUsage, "err");
      await type(fmt(T.opening, p.title));
      window.open(p.live || p.repo, "_blank", "noopener");
    },
    github: async () => {
      await type(T.githubLoading, "dim");
      try {
        const g = await loadGitHub();
        await type(fmt(T.githubOk, g.repos, g.followers, g.pushName ? `${g.pushName} · ${timeAgo(g.pushAt)}` : "—"));
      } catch {
        await type(T.githubFail, "err");
      }
    },
    clear: async () => {
      body.textContent = "";
    },
  };

  async function run(raw) {
    const text = raw.trim();
    if (!text) return;
    const c = row("cmd");
    c.tn.data = "";
    const ps = Object.assign(document.createElement("span"), { className: "ps", textContent: data.ui ? $(".term-prompt", root).textContent + " " : "$ " });
    c.d.insertBefore(ps, c.tn);
    c.tn.data = text;
    scrollEnd();
    const [name, ...rest] = text.split(/\s+/);
    const key = name.toLowerCase();
    if (key === "sudo") {
      if ((rest[0] || "").toLowerCase() === "hire-me") {
        await type(T.sudo);
        window.open(data.github, "_blank", "noopener");
      } else await type(fmt(T.notFound, text), "err");
      return;
    }
    const fn = cmds[key];
    if (!fn) return void (await type(fmt(T.notFound, name), "err"));
    await fn(rest.join(" "));
  }
  const enqueue = (s) => {
    hist.push(s);
    hi = hist.length;
    chain = chain.then(() => run(s)).catch(() => {});
    return chain;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = "";
    enqueue(v);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      hi = Math.max(0, hi - 1);
      input.value = hist[hi] || "";
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hi = Math.min(hist.length, hi + 1);
      input.value = hist[hi] || "";
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = input.value.toLowerCase();
      if (!v) return;
      const hit = [...Object.keys(cmds), "sudo hire-me"].find((k) => k.startsWith(v));
      if (hit) input.value = hit;
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      body.textContent = "";
    }
  });
  $$("[data-chip]", root).forEach((b) => b.addEventListener("click", () => enqueue(b.dataset.chip)));
  body.addEventListener("click", () => {
    if (!getSelection().toString() && matchMedia("(hover:hover)").matches) input.focus({ preventScroll: true });
  });

  // Boot sequence runs once, when the console scrolls into view.
  async function boot() {
    if (started) return;
    started = true;
    if (!rm) for (const l of T.boot) { line(l, "dim"); await sleep(220); }
    await type(T.welcome);
  }
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        chain = chain.then(boot);
      }
    },
    { threshold: 0.35 }
  );
  io.observe(root);
  return { run: enqueue };
}



