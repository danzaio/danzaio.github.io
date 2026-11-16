/* ============ DADOS: locações ============ */
// Conteúdo base em português. Os outros idiomas ficam em 20-content-i18n.js (TRB).
// As 4 chaves de CATS têm cores no CSS do core: cidade, muralhas, arredores, excursao. Troque só os nomes.
const CATS={cidade:'No centro',muralhas:'Monumentos',arredores:'Arredores',excursao:'Excursões'};
const L=[
{id:'centro',n:1,cat:'cidade',name:'TODO Praça central',hr:'TODO nome local',got:'TODO papel na série/filme',lat:38.70750,lon:-9.13640,
 scenes:[[1,1,'TODO título do episódio','TODO o que acontece na cena, em uma ou duas frases.']],
 real:'TODO o lugar na vida real: o que é, de quando é, por que vale a visita.',
 curios:['TODO curiosidade da gravação.'],
 tips:['TODO dica prática (horário, ingresso, onde ficar).']},
{id:'mirante',n:2,cat:'muralhas',name:'TODO Mirante',hr:'TODO',got:'TODO',lat:38.71390,lon:-9.13330,
 scenes:[[1,2,'TODO','TODO']],
 real:'TODO',
 curios:['TODO'],
 tips:['TODO']}
];

/* ============ DADOS: pontos de foto ============ */
// stand = onde ficar; tgt = para onde apontar. lens começa com '0,5×', '1×' ou '2×'; orient começa com 'Vertical' ou 'Horizontal'
// (o core lê essas palavras em português). sk = desenho da guia: veja os valores usados em got-dubrovnik.
const PH=[
{id:'p-centro',loc:'centro',title:'TODO nome da missão',stand:[38.70720,-9.13650],tgt:[38.70790,-9.13620],sk:'fort',lens:'1×',orient:'Horizontal',
 where:'TODO onde ficar, com uma referência fácil.',
 how:'TODO como enquadrar (terços, o que entra no quadro).',
 best:'TODO melhor horário e por quê.',
 recreate:'TODO como recriar a cena com quem está junto.'}
];

/* ============ DADOS: roteiros ============ */
const ROUTES=[
 {id:'dia',name:'TODO roteiro de 1 dia',time:'TODO 3–4 h',stops:['centro','mirante'],
  desc:'TODO por onde começa, por onde passa, onde termina.'}
];

/* ============ curiosidades e quiz ============ */
const CUR=[
 ['🎬','TODO curiosidade geral da franquia na cidade.']
];
const QUIZ=[
 ['TODO pergunta?',['TODO certa','TODO errada 1','TODO errada 2','TODO errada 3'],0,'TODO explicação curta.']
];
