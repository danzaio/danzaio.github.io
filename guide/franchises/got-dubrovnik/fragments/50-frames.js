// Frames da série embutidos (pasta frames/): © HBO, só para uso pessoal deste guia — tirar antes de distribuir o app.
// Fontes: YouTube (clipes da cena, no segundo do take), weseektravel.com / sceen-it.com (capturas da cena por locação)
// e os antes-e-depois de Bored Panda (schmollywood1) e Greta's Travels (cena + foto de hoje do mesmo ângulo).
const FR={'p-torneio':[['p-torneio-1',1280,720],['p-torneio-2',1280,720],['w-lovr1',1280,685]],'p-redkeep':[['w-pilebay',1280,695],['p-redkeep-1',1280,720],['p-redkeep-2',1280,720],['w-westpier',1280,684],['bp-pier',704,344],['p-redkeep-3',1280,720]],'p-bokar':[['p-bokar-2',1280,720],['w-bokar',1280,693],['p-bokar-1',1280,720]],'p-purple':[['w-purple',1280,664],['p-purple-1',1280,720]],'p-pile':[['g-riot',540,406],['w-pile',1280,684]],'p-roofs':[['w-minceta',1262,681],['w-kingslanding',1172,681]],'p-shame1':[['bp-jesuit',704,341],['w-shame',1224,682]],'p-shame2':[['w-shame',1224,682],['bp-jesuit',704,341]],'p-market':[['w-market',941,523],['w-domsteps',1261,682]],'p-arena':[['w-belvedere',1280,658],['p-arena-1',1280,720],['p-arena-2',1280,720]],'p-olenna':[['w-trsteno',1280,667],['p-olenna-1',1280,720],['p-olenna-2',1280,720],['bp-pond',704,338],['bp-stairs',704,342]],'p-srd':[['w-kingslanding',1172,681]]};
// cenas extras por locação (aparecem na ficha do lugar, além das das missões de lá)
const LFR={'walls':[['w-walls',1280,690]],'reitor':[['w-reitor',1143,682]],'lokrum':[['w-lokrum',1280,681]],'pilebay':[['w-westharbour',1280,694]],'lovr':[['w-lovr2',1280,692],['bp-arcades',704,341]],'domsteps':[['w-domsteps',1261,682]]};
// "hoje": foto do lugar como está agora, tirada do mesmo ângulo da cena (antes e depois) — [arquivo, largura, altura, fonte]
const HOJE={'w-pilebay':['h-pilebay',704,343,'bp'],'w-westharbour':['h-westharbour',704,344,'bp'],'w-minceta':['h-minceta',704,465,'bp'],'w-lovr1':['h-lovr1',540,404,'gt'],'w-shame':['h-shame',540,404,'gt'],
 'bp-pier':['bp-pier-hoje',704,342,'bp'],'bp-jesuit':['bp-jesuit-hoje',704,344,'bp'],'bp-arcades':['bp-arcades-hoje',704,346,'bp'],'bp-pond':['bp-pond-hoje',704,337,'bp'],'bp-stairs':['bp-stairs-hoje',704,342,'bp'],'g-riot':['g-riot-hoje',540,404,'gt']};
const HSRC={bp:'Bored Panda · schmollywood1',gt:"Greta's Travels"};
// quem fez cada imagem — aparece em Mais › Sobre › Créditos das imagens (r: scenes | today | clips)
const CREDITS=[
 {n:'HBO / Warner Bros. Discovery — Game of Thrones',u:'https://www.hbo.com/game-of-thrones',r:['scenes']},
 {n:'Bored Panda · schmollywood1',u:'https://www.boredpanda.com/game-of-thrones-filming-locations-before-after/',r:['scenes','today']},
 {n:"Greta's Travels",u:'https://gretastravels.com/game-of-thrones-filming-set-in-dubrovnik/',r:['scenes','today']},
 {n:'We Seek Travel',u:'https://weseektravel.com/',r:['scenes']},
 {n:'Sceen-it',u:'https://www.sceen-it.com/',r:['scenes']},
 {n:'YouTube (clipes de cada cena, nos canais indicados no app)',u:'https://www.youtube.com/',r:['clips']}
];
