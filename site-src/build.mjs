// Builds the home page (EN + PT-BR) from site-src/ into the repo root.
//   node build.mjs           one-off build (minified)
//   node build.mjs --watch   rebuild on change (unminified, with sourcemap for debugging)
//   node build.mjs --dev     one-off unminified build (readable stacks in profiles); never commit its output
import { build, transform } from "esbuild";
import { mkdir, readFile, writeFile, watch } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const watching = process.argv.includes("--watch");
const dev = watching || process.argv.includes("--dev");
const CSS = ["base.css", "chrome.css", "hero.css", "loop.css", "work.css", "services.css", "bench.css", "process.css", "contact.css"];

async function run() {
  const t0 = performance.now();
  // template + content are imported fresh each run (cache-busted) so watch mode sees edits
  const q = `?t=${Date.now()}`;
  const { render } = await import(`./template.mjs${q}`);
  await mkdir(path.join(root, "pt-br"), { recursive: true });
  await writeFile(path.join(root, "index.html"), render("en"));
  await writeFile(path.join(root, "pt-br", "index.html"), render("pt"));

  await build({
    entryPoints: { app: path.join(here, "js/main.js") },
    outdir: path.join(root, "assets/site"),
    bundle: true,
    format: "iife",
    target: ["es2020"],
    minify: !dev,
    sourcemap: dev,
    legalComments: "none",
    logLevel: "warning",
  });
  // CSS: one file per plate, concatenated in page order, then minified into assets/site/main.css
  const css = (await Promise.all(CSS.map((f) => readFile(path.join(here, "css", f), "utf8")))).join("\n");
  const out = await transform(css, { loader: "css", minify: !dev, logLevel: "warning" });
  await writeFile(path.join(root, "assets/site/main.css"), out.code);
  console.log(`built in ${Math.round(performance.now() - t0)}ms`);
}

await run().catch((e) => {
  console.error(e);
  if (!watching) process.exit(1);
});

if (watching) {
  let timer;
  const kick = () => {
    clearTimeout(timer);
    timer = setTimeout(() => run().catch((e) => console.error(e.message)), 120);
  };
  for (const dir of [here, path.join(here, "js"), path.join(here, "css")]) {
    (async () => {
      for await (const ev of watch(dir)) {
        if (/\.(m?js|css)$/.test(ev.filename || "") && !/node_modules/.test(ev.filename)) kick();
      }
    })();
  }
  console.log("watching site-src …");
}
