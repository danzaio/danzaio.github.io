// Cache offline do guia. Página: rede primeiro (pega atualizações), cache se estiver sem internet.
const V = '@@CACHE@@-v@@SW_VERSION@@';
// dentro do app Android os arquivos já vêm no pacote: ali o service worker só guarda o mapa
const NATIVE = new URL(self.location.href).searchParams.has('native');
const TILES = '@@CACHE@@-tiles-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './lib/maplibre-gl.js', './lib/maplibre-gl.css',
  './lib/fonts/fonts.css', './lib/fonts/inter-latin-ext-400-normal.woff2', './lib/fonts/inter-latin-400-normal.woff2', './lib/fonts/inter-latin-ext-500-normal.woff2', './lib/fonts/inter-latin-500-normal.woff2', './lib/fonts/inter-latin-ext-600-normal.woff2', './lib/fonts/inter-latin-600-normal.woff2', './lib/fonts/inter-latin-ext-700-normal.woff2', './lib/fonts/inter-latin-700-normal.woff2', './lib/fonts/cinzel-latin-ext-600-normal.woff2', './lib/fonts/cinzel-latin-600-normal.woff2', './lib/fonts/cinzel-latin-ext-700-normal.woff2', './lib/fonts/cinzel-latin-700-normal.woff2', './lib/fonts/cinzel-latin-ext-900-normal.woff2', './lib/fonts/cinzel-latin-900-normal.woff2',
  // frames da série que vêm com o app (uso pessoal)
/*@auto sw-frames*/
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
