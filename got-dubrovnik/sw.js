// Porto Real — cache offline. Página: rede primeiro (pega atualizações), cache se estiver sem internet.
const V = 'porto-real-v17';
// dentro do app Android os arquivos já vêm no pacote: ali o service worker só guarda o mapa
const NATIVE = new URL(self.location.href).searchParams.has('native');
const TILES = 'porto-real-tiles-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './lib/maplibre-gl.js', './lib/maplibre-gl.css',
  // frames da série que vêm com o app (uso pessoal)
  './frames/p-bokar-1.jpg', './frames/p-bokar-2.jpg', './frames/p-purple-1.jpg', './frames/p-redkeep-1.jpg', './frames/p-redkeep-2.jpg', './frames/p-redkeep-3.jpg', './frames/p-torneio-1.jpg', './frames/p-torneio-2.jpg', './frames/w-belvedere.jpg', './frames/w-bokar.jpg', './frames/w-domsteps.jpg', './frames/w-kingslanding.jpg', './frames/w-lokrum.jpg', './frames/w-lovr1.jpg', './frames/w-lovr2.jpg', './frames/w-market.jpg', './frames/w-minceta.jpg', './frames/w-pile.jpg', './frames/w-pilebay.jpg', './frames/w-purple.jpg', './frames/w-reitor.jpg', './frames/w-shame.jpg', './frames/w-trsteno.jpg', './frames/w-walls.jpg', './frames/w-westharbour.jpg', './frames/w-westpier.jpg'];
self.addEventListener('install', e => {
  e.waitUntil((NATIVE ? Promise.resolve() : caches.open(V).then(c => c.addAll(CORE))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // fontes do Google: cache primeiro
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(V).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }
      catch (err) { return hit || Response.error(); }
    }));
    return;
  }
  // mapa real (OpenFreeMap): estilo/TileJSON rede primeiro; tiles, fontes e ícones cache primeiro — assim o que já foi visto abre sem internet
  if (url.hostname === 'tiles.openfreemap.org') {
    const fresh = url.pathname.startsWith('/styles/') || /^\/planet\/?$/.test(url.pathname);
    e.respondWith(caches.open(TILES).then(async c => {
      if (fresh) {
        try { const res = await fetch(req); if (res.ok) c.put(req, res.clone()); return res; }
        catch (err) { return (await c.match(req)) || Response.error(); }
      }
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok) c.put(req, res.clone()); return res; }
      catch (err) { return Response.error(); }
    }));
    return;
  }
  if (NATIVE || url.origin !== location.origin) return;
  // navegação e arquivos do app: rede primeiro, cache de reserva
  e.respondWith((async () => {
    const c = await caches.open(V);
    try {
      const res = await fetch(req);
      if (res.ok) c.put(req.mode === 'navigate' ? './index.html' : req, res.clone());
      return res;
    } catch (err) {
      return (await c.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? await c.match('./index.html') : undefined) || Response.error();
    }
  })());
});
