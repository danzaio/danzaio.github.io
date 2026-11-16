// Captura de frames do YouTube pelo Chrome (Claude in Chrome ou DevTools). Ver guide/docs/FRAMES.md.
//
// Por que em duas páginas: tirar print da página do vídeo trava o Chrome (o renderizador
// do player congela a captura). Então: (1) na página do vídeo, desenha cada segundo num
// canvas e guarda como JPEG no localStorage de youtube.com; (2) abre youtube.com/robots.txt
// (mesma origem, página leve), mostra cada frame no tamanho real no canto e tira o print.
//
// PASSO 1 — em https://www.youtube.com/watch?v=ID  (troque TS pelos segundos do take)
const TS = [55, 19];
{
  const sl = ms => new Promise(r => setTimeout(r, ms));
  let v, p;
  for (let i = 0; i < 80; i++) {            // espera o player (e pula anúncio, se houver)
    p = document.querySelector('#movie_player'); v = document.querySelector('#movie_player video');
    const ad = document.querySelector('#movie_player.ad-showing');
    if (ad) { const s = document.querySelector('.ytp-skip-ad-button,.ytp-ad-skip-button,.ytp-ad-skip-button-modern'); if (s) s.click(); }
    else if (v && v.readyState >= 1 && v.videoWidth && p && p.getAvailableQualityLevels && p.getAvailableQualityLevels().length) break;
    await sl(500);
  }
  const best = p.getAvailableQualityLevels()[0];   // força a maior qualidade disponível
  p.setPlaybackQualityRange(best, best); try { p.setPlaybackQuality(best) } catch (e) {}
  v.muted = true; v.play();
  const want = { hd2160: 3840, hd1440: 2560, hd1080: 1920, hd720: 1280, large: 854, medium: 640 }[best] || 640;
  for (let i = 0; i < 24 && v.videoWidth < want; i++) await sl(500);
  v.pause();
  for (const k of Object.keys(localStorage)) if (k.startsWith('__f')) localStorage.removeItem(k);
  const out = []; let n = 0;
  for (const T of TS) {
    await new Promise(res => { v.addEventListener('seeked', res, { once: true }); v.currentTime = T; });
    await sl(900);
    const W = Math.min(1280, v.videoWidth), H = Math.round(W * v.videoHeight / v.videoWidth); // 1080p/4K reduzidos ficam mais nítidos que 720p
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(v, 0, 0, W, H);
    localStorage.setItem('__f' + n, c.toDataURL('image/jpeg', 0.95));
    out.push([T, v.videoWidth, v.videoHeight, +v.currentTime.toFixed(2)]); n++;
  }
  try { p.stopVideo() } catch (e) {}
  JSON.stringify({ best, out, title: document.title });
}

// PASSO 2 — em https://www.youtube.com/robots.txt
// window.__show(i, 0) mostra o frame i colado no topo; __show(i, 1) colado no fundo.
// Se a janela tiver menos de 720 px de altura, tire os dois prints e junte com stitch.py.
window.__show = async (i, b) => {
  while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
  document.documentElement.style.background = '#000';
  document.body.style.cssText = 'margin:0;background:#000;overflow:hidden;cursor:none';
  const im = new Image(); im.src = localStorage.getItem('__f' + i); await im.decode();
  im.style.cssText = 'position:fixed;left:0;top:' + (b ? innerHeight - im.naturalHeight : 0) + 'px;width:' + im.naturalWidth + 'px;height:' + im.naturalHeight + 'px';
  document.body.appendChild(im);
  return JSON.stringify([i, b, im.naturalWidth, im.naturalHeight, innerHeight]);
};
// Depois: passe o mouse no canto (fora da imagem) e tire o print salvando em disco.
// Ao terminar, limpe: for (const k of Object.keys(localStorage)) if (k.startsWith('__f')) localStorage.removeItem(k)
