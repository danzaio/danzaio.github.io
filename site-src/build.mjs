// Builds the home page (EN + PT-BR) from site-src/ into the repo root.
//   node build.mjs           one-off build (minified)
//   node build.mjs --watch   rebuild on change (unminified, with sourcemap for debugging)
import { build } from "esbuild";
import { mkdir, writeFile, watch } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const watching = process.argv.includes("--watch");

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
    minify: !watching,
    sourcemap: watching,
    legalComments: "none",
    logLevel: "warning",
  });
  await build({
    entryPoints: { main: path.join(here, "css/main.css") },
    outdir: path.join(root, "assets/site"),
    bundle: false,
    minify: !watching,
    loader: { ".css": "css" },
    logLevel: "warning",
  });
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
