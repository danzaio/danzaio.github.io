// mapa desenhado (reserva sem internet): contorno da costa, muralhas, ilha, rótulos e o desenho em buildMap()
const COAST=P([[42.6455,18.0880],[42.6446,18.0915],[42.6434,18.0955],[42.6423,18.0980],[42.6415,18.0996],[42.6412,18.1010],[42.6414,18.1022],[42.6411,18.1032],[42.6407,18.1037],[42.64035,18.10405],[42.64012,18.10445],[42.6403,18.1049],[42.6407,18.1052],[42.64102,18.10545],[42.6409,18.1058],[42.64058,18.10612],[42.6401,18.1065],[42.6396,18.1071],[42.6392,18.1080],[42.6389,18.1092],[42.6389,18.1103],[42.6391,18.1114],[42.6393,18.1122],[42.6396,18.1128],[42.6400,18.1124],[42.6404,18.1121],[42.6408,18.11205],[42.6412,18.1123],[42.6415,18.1129],[42.6414,18.1138],[42.6415,18.1150],[42.6413,18.1162],[42.6405,18.1185],[42.6395,18.1210],[42.6384,18.1236],[42.6371,18.1262],[42.6355,18.1284],[42.6340,18.1298],[42.6331,18.1312],[42.6322,18.1336],[42.6311,18.1372],[42.6302,18.1420],[42.6298,18.1470]]);
const WALL=P([[42.6429,18.1085],[42.64265,18.10965],[42.6424,18.1106],[42.64215,18.11155],[42.6419,18.1119],[42.6415,18.11225],[42.64105,18.1120],[42.6405,18.11185],[42.6400,18.11195],[42.6396,18.11225],[42.63925,18.1113],[42.6391,18.1101],[42.63915,18.1089],[42.6394,18.1079],[42.6399,18.1070],[42.64075,18.10635],[42.6413,18.1066],[42.64178,18.1071],[42.6424,18.10765]]);
function lokrum(){const c=xy(42.6272,18.1194),a=800,b=290,th=146*toR,ux=Math.sin(th),uy=-Math.cos(th),vx=-uy,vy=ux,pts=[];
 for(let i=0;i<40;i++){const t=i/40*2*Math.PI,r=1+.07*Math.sin(3*t+1)+.04*Math.sin(7*t+2)+.03*Math.cos(11*t);
  const A=a*Math.cos(t)*r*(Math.cos(t)<0?0.97:1.0),B=b*Math.sin(t)*r*(Math.cos(t)<0?1.12:0.92);pts.push([c[0]+ux*A+vx*B,c[1]+uy*A+vy*B])}return pts}
const LABELS=[
 {t:'MAR ADRIÁTICO',lat:42.6345,lon:18.1050,c:'sea',s:15},
 {t:'Cidade Velha',lat:42.64095,lon:18.1095,c:'',s:12.5},
 {t:'LOKRUM',lat:42.6296,lon:18.1172,c:'',s:14},
 {t:'Monte Srđ',lat:42.6512,lon:18.1060,c:'',s:13},
 {t:'Porto Velho',lat:42.64045,lon:18.1140,c:'sea',s:10},
 {t:'Baía de Pile',lat:42.6400,lon:18.1055,c:'sea',s:9.5},
 {t:'Ploče',lat:42.6428,lon:18.1160,c:'',s:10.5},
 {t:'Pile',lat:42.6430,lon:18.1050,c:'',s:10.5},
 {t:'Sv. Jakov',lat:42.6378,lon:18.1272,c:'',s:10.5}
];
function buildMap(){
 const svg=MAP.svg,c0=COAST[0],cN=COAST[COAST.length-1];
 const land=`M-6000,-6000L-6000,${f1(c0[1])}L${f1(c0[0])},${f1(c0[1])}`+curve(COAST,false)+`L6000,${f1(cN[1])}L6000,-6000Z`;
 const srd=xy(42.6503,18.1108);let contours='';
 [[1300,560],[1050,450],[820,350],[600,255],[400,170],[220,95]].forEach(([rx,ry],i)=>{contours+=`<ellipse class="m-contour" cx="${f1(srd[0]+i*8)}" cy="${f1(srd[1]+i*14)}" rx="${rx}" ry="${ry}" transform="rotate(-8 ${f1(srd[0])} ${f1(srd[1])})"/>`});
 const roads=[
  P([[42.6426,18.0990],[42.6424,18.1020],[42.6423,18.1040],[42.6420,18.1060],[42.6419,18.1068]]),
  P([[42.6419,18.1068],[42.6427,18.1072],[42.6436,18.1090],[42.6434,18.1112],[42.6428,18.1130],[42.6424,18.1150],[42.6418,18.1172],[42.6406,18.1205],[42.6393,18.1235],[42.6378,18.1268],[42.6360,18.1292],[42.6346,18.1310],[42.6332,18.1330],[42.6322,18.1370]])];
 let roadsS=roads.map(r=>`<path class="m-roadc" d="${pathC(r,false)}"/><path class="m-road" d="${pathC(r,false)}"/>`).join('');
 // ruas internas
 const st=(a,b)=>{const p=xy(a[0],a[1]),q=xy(b[0],b[1]);return `<line class="m-street" x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}"/>`};
 let streets=st([42.6421,18.10805],[42.64158,18.1106])+st([42.64122,18.1078],[42.64062,18.1101])+st([42.6409,18.1081],[42.64035,18.1099]);
 [[18.1081,0],[18.1088,0],[18.1094,0],[18.1100,0]].forEach(([lo])=>{const a=[42.6420-(lo-18.1081)*0.21,lo],b=[42.6400-(lo-18.1081)*0.21,lo+0.0002];streets+=st(a,b)});
 const strA=xy(42.64166,18.10748),strB=xy(42.64103,18.11042);
 // árvores de Gradac / Lokrum
 let trees='';const tc=(lat,lon,r)=>{const p=xy(lat,lon);trees+=`<circle class="m-tree" cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r}"/>`};
 tc(42.64215,18.1018,70);tc(42.6424,18.1006,55);tc(42.6265,18.1205,230);tc(42.6295,18.1180,150);tc(42.6240,18.1235,150);
 const fort=(pts)=>`<path class="m-fort" d="${pathL(P(pts),true)}"/>`;
 const circ=(lat,lon,r)=>{const p=xy(lat,lon);return `<circle class="m-fort" cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r}"/>`};
 const cabA=xy(42.6443,18.1095),cabB=xy(42.6488,18.1104);
 const brk=P([[42.6398,18.1129],[42.6402,18.1137],[42.6405,18.1140]]);
 svg.innerHTML=`<defs><pattern id="waves" width="90" height="60" patternUnits="userSpaceOnUse"><path class="m-waves" d="M5 20q10-8 20 0t20 0M50 48q10-8 20 0t20 0"/></pattern>
 <pattern id="roof" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-22)"><line class="m-hatch" x1="0" y1="0" x2="0" y2="9"/></pattern></defs>
 <g id="world"><rect class="m-sea" x="-6000" y="-6000" width="12000" height="12000"/><rect x="-6000" y="-6000" width="12000" height="12000" fill="url(#waves)"/>
 <path class="m-land" d="${land}"/>${contours}<path class="m-island" d="${pathC(lokrum(),true)}"/>${trees}
 <path class="m-fort" d="${pathL(brk,false)}" style="fill:none;stroke-width:3"/>
 ${roadsS}
 <line class="m-cable" x1="${f1(cabA[0])}" y1="${f1(cabA[1])}" x2="${f1(cabB[0])}" y2="${f1(cabB[1])}"/>
 <path class="m-old" d="${pathL(WALL,true)}"/><path d="${pathL(WALL,true)}" fill="url(#roof)"/>
 ${streets}<line class="m-stradun" x1="${f1(strA[0])}" y1="${f1(strA[1])}" x2="${f1(strB[0])}" y2="${f1(strB[1])}"/>
 <path class="m-wallo" d="${pathL(WALL,true)}" vector-effect="non-scaling-stroke"/><path class="m-wall" d="${pathL(WALL,true)}" vector-effect="non-scaling-stroke"/>
 ${fort([[42.64108,18.10418],[42.64098,18.10474],[42.64042,18.10452]])}
 ${circ(42.64094,18.10618,13)}${circ(42.6429,18.1085,12)}
 ${fort([[42.64232,18.11205],[42.64222,18.11262],[42.64185,18.11255],[42.6419,18.11205]])}
 ${fort([[42.6398,18.1120],[42.63975,18.1129],[42.6394,18.1127],[42.63945,18.1119]])}
 </g><g id="gRoute"></g><g id="gLabels"></g><g id="gPhotos"></g><g id="gMarkers"></g><g id="gMe"></g>`;
 // rótulos (tamanho constante)
 $('#gLabels').innerHTML=LABELS.map(l=>{const p=xy(l.lat,l.lon);return `<g class="cs" data-x="${f1(p[0])}" data-y="${f1(p[1])}"><text class="lbl ${l.c}" font-size="${l.s}" text-anchor="middle">${esc(l.t)}</text></g>`}).join('');
 drawMarkers();drawPhotos();
}
