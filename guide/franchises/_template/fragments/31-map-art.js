// mapa desenhado (reserva sem internet). Mínimo: mar, um retângulo de terra e os grupos que o core usa.
// Para desenhar a cidade de verdade, veja franchises/got-dubrovnik/fragments/31-map-art.js.
const LABELS=[
 {t:'TODO Centro',lat:38.7110,lon:-9.1360,c:'',s:12.5}
];
function buildMap(){
 const svg=MAP.svg,a=xy(38.7300,-9.1700),b=xy(38.6990,-9.1000);
 svg.innerHTML=`<g id="world"><rect class="m-sea" x="-6000" y="-6000" width="12000" height="12000"/>
 <rect class="m-land" x="${f1(a[0])}" y="${f1(a[1])}" width="${f1(b[0]-a[0])}" height="${f1(b[1]-a[1])}"/>
 </g><g id="gRoute"></g><g id="gLabels"></g><g id="gPhotos"></g><g id="gMarkers"></g><g id="gMe"></g>`;
 $('#gLabels').innerHTML=LABELS.map(l=>{const p=xy(l.lat,l.lon);return `<g class="cs" data-x="${f1(p[0])}" data-y="${f1(p[1])}"><text class="lbl ${l.c}" font-size="${l.s}" text-anchor="middle">${esc(l.t)}</text></g>`}).join('');
 drawMarkers();drawPhotos();
}
