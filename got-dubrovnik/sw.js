// Porto Real — cache offline. Página: rede primeiro (pega atualizações), cache se estiver sem internet.
const V = 'porto-real-v10';
const TILES = 'porto-real-tiles-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './lib/maplibre-gl.js', './lib/maplibre-gl.css'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
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
  if (url.origin !== location.origin) return;
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
