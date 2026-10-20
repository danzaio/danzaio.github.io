import sharp from "sharp";
const jobs = [
  ["omp-hero", 1500, 82],
  ["domain-atlas", 1400, 82],
  ["client-tool", 1094, 82],
];
for (const [n, w, q] of jobs) {
  await sharp(`../projects/${n}.png`).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toFile(`../assets/site/img/${n}.webp`);
}
// tall screenshot: keep top 1900px (the scroll-in-frame effect shows the first screens)
await sharp("../projects/prompt-injection-zoo.png").extract({ left: 0, top: 0, width: 1440, height: 2400 }).resize({ width: 1200 }).webp({ quality: 80 }).toFile("../assets/site/img/prompt-injection-zoo.webp");
console.log("images ok");
