# Arquitetura

O guia é **um app web de página única** (HTML + CSS + JS puro, sem framework e sem etapa de
compilação de código), que também roda dentro de um **app Android nativo** (Capacitor).
Para servir a várias franquias, o código foi dividido em duas partes:

- **core**: o motor do app (mapa, GPS, bússola, câmera, missões, idiomas, offline…), igual
  para todas as franquias;
- **franquia**: o conteúdo (lugares, cenas, textos, cores, ícones, frames).

Um script junta as duas partes e gera a pasta publicada.

```
guide/
  core/
    index.html          app inteiro, com marcadores onde entra o conteúdo da franquia
    sw.js               service worker (cache offline), com tokens da franquia
    lib/                MapLibre GL (mapa real), copiado para a saída
    brand-keys.json     chaves de texto que toda franquia precisa preencher
  franchises/
    got-dubrovnik/      franquia de Game of Thrones em Dubrovnik (a referência)
      franchise.json    id, pasta de saída, versão, nome do cache, idiomas, app nativo
      fragments/        pedaços de código/conteúdo que entram nos marcadores do core
      assets/           ícones, manifest, og.png, frames/ — copiados para a raiz da saída
    _template/          ponto de partida para uma franquia nova
  tools/
    build.py            monta franquia → pasta publicada (e --check para o CI)
    frames/             ferramentas de captura e tratamento das cenas
  tests/                testes automáticos (Playwright) — ver TESTING.md
  docs/                 esta documentação

got-dubrovnik/          SAÍDA do build (publicada e empacotada no APK). Não editar à mão.
got-dubrovnik-native/   casca Android (Capacitor) — ver RELEASE.md
.github/workflows/      build do APK + teste no emulador; testes web
```

## Fluxo de build

```
guide/core/index.html ─┐
guide/core/sw.js ──────┼─ build.py <id> ─→ <out>/index.html, sw.js, lib/, + assets da franquia
franchises/<id>/ ──────┘
```

- `<!--@frag NOME-->` e `/*@frag NOME*/` (sozinhos numa linha) viram o conteúdo de
  `fragments/NOME`. Marcador sem fragmento, ou fragmento sem marcador, é **erro** de build.
- `/*@auto sw-frames*/` vira a lista das imagens de `assets/frames/` para o cache offline.
- `@@CACHE@@` e `@@SW_VERSION@@` vêm do `franchise.json`.
- O build confere que `25-ui-brand.js` tem todas as chaves de `core/brand-keys.json` em todos os idiomas.
- `build.py <id> --check` monta numa pasta temporária e compara com a saída: o CI falha se
  alguém editou a saída à mão ou esqueceu de rodar o build.
- A saída é sincronizada no lugar (a pasta não é apagada), então um servidor de teste aberto
  nela continua funcionando.

A separação foi feita de forma mecânica e conferida: o primeiro build gerou o app
**byte a byte igual** à v13; depois os textos e dados em execução foram comparados nos 6 idiomas.

## Fragmentos da franquia

| arquivo | conteúdo | obrigatório |
| --- | --- | --- |
| `01-head.html` | `<title>`, meta description, Open Graph, Twitter, hreflang, ícones, nome do app | sim |
| `02-timezone.js` | `TZ` — fuso da cidade (horários do sol, relógio) | sim |
| `03-hosted-url.js` | `HOSTED_URL` — endereço publicado (links de compartilhar) | sim |
| `04-hooks.js` | `FX` — lugares que o core usa por função (entrada, alvo padrão da bússola, excursão longe…) | sim |
| `10-data.js` | `CATS`, `L` (lugares), `LBY`, `PH` (missões de foto), `ROUTES`, `CUR` (curiosidades), `QUIZ` — em português | sim |
| `20-content-i18n.js` | `TRB.<idioma>` — tradução de todo o conteúdo do `10-data.js` | sim (um bloco por idioma além do pt) |
| `25-ui-brand.js` | textos da interface que citam a franquia (nome, cidade, ingressos, ajuda…) | sim, todas as chaves |
| `30-map-anchor.js` | `LAT0, LON0, MX, MY` — origem e escala do mapa desenhado | sim |
| `31-map-art.js` | `COAST`, `WALL`, `lokrum()`, `LABELS` — desenho do mapa ilustrado (reserva sem internet) | sim (pode ser mínimo) |
| `40-outlines.js` | `OUT` — contorno de cada missão para a guia da câmera | sim (pode ser `{}`) |
| `50-frames.js` | `FR`, `LFR`, `HOJE`, `HSRC` — cenas que vêm no app (ver FRAMES.md) | sim (pode ser vazio) |
| `60-takes.js` | `KLD`, `TAKE` — take escolhido de cada missão e link da página da cena | sim (pode ser vazio) |
| `61-clips.js` | `YT`, `TNOTE` — clipes no segundo do take, avisos por missão | sim (pode ser vazio) |
| `70-air.js` | `RT`, `AIR` — lugares que pedem transporte (sem rota a pé) | sim |
| `71-issues.js` | `ISSUES` — onde cai o "avisar erro" | sim |
| `72-altitudes.js` | `ALT` — altitude aproximada de cada lugar (AR) | sim |

Os números deixam espaço para fragmentos novos sem renomear os antigos.

### `FX` — ganchos por função

O core nunca cita um lugar pelo id. Quando precisa de "o portão principal" ou "a excursão
longe do centro", lê do `FX`:

```js
const FX={
 entry:'pile',              // onde o modo teste começa; lugar padrão sem GPS
 target:'jesuit',           // alvo padrão da bússola
 far:'trsteno',farLabel:'Trsteno', // fora do mapa desenhado, com atalho no mapa (null = nenhum)
 boatFrom:{lokrum:'oldport'},      // navegar até o embarque em vez do destino
 airWalk:['srd'],           // lugares de AIR que ainda dá para ir a pé
 fitOld:[...],              // enquadramento do "centro" no mapa desenhado
 compassMarks:[...],        // referências no horizonte da bússola
 bell:'jesuit'              // botão especial do lugar (sino da Caminhada da Vergonha); null = sem
};
```

## Modelo de dados (resumo)

- **Lugar** (`L[]`): `id, n` (número no mapa), `cat` (chave de `CATS`), `name, hr` (nome
  local), `got` (papel na série), `lat, lon`, `scenes:[[temporada,episódio,'título','o que acontece']]`,
  `real`, `curios[]`, `tips[]`. Opcionais: `ticket`, `hours`, `photo` etc.
- **Missão de foto** (`PH[]`): `id:'p-…', loc, title, stand:[lat,lon]` (onde ficar),
  `tgt:[lat,lon]` (para onde apontar), `sk` (desenho da guia), `lens, orient, where, how, best, recreate`.
- **Roteiro** (`ROUTES[]`): `id, name, time, stops:[ids], desc`.
- **Curiosidade** (`CUR[]`): `[emoji, texto]`. **Quiz** (`QUIZ[]`): `[pergunta, [opções], certa, explicação]`.
- **Tradução** (`TRB.en` etc.): mesmas estruturas por id (`L.gradac.name`, `PH['p-torneio'].title`, `R.dia.name`, `CUR[i]`, `QUIZ[i]`, `LABELS`).
  O português fica no `10-data.js`; os outros idiomas sobrescrevem campo a campo.

## Textos da interface

- `UI.<idioma>` no core: ~400 textos neutros, nos 6 idiomas (pt, en, es, de, fr, it).
- `25-ui-brand.js` na franquia: as 51 chaves que citam franquia, cidade ou série
  (`brand`, `docTitle`, `quizTitle`, `tk1`…, `helpHTML`, `aboutP`…). Lista em `core/brand-keys.json`.
- `t('chave', ...args)` procura no idioma atual, depois em inglês, depois em português; `{0}` `{1}` são trocados pelos argumentos.
- Elementos com `data-i18n="chave"` são preenchidos na troca de idioma.

## Estado no aparelho

- `localStorage` com prefixo `pr_`: `lang, theme, pos, sim, trip, visited, target, calib,
  quizBest, mapMode, voice, toured, welcomed, offlineAt, tilesWarm, nospoil, frHide`, e por
  missão `ref_<id>`, `fit_<id>`, `tksel_<id>`, `rt_<rota>`.
- IndexedDB `portoreal` (fotos da pessoa) e `portoreal-takes` (até 4 prints por missão).
- Nada sai do aparelho: sem conta, sem servidor, sem análise.

## Serviços externos

| serviço | para quê | sem ele |
| --- | --- | --- |
| tiles.openfreemap.org | mapa real (vetorial) | cai no mapa desenhado (`31-map-art.js`) |
| routing.openstreetmap.de | rotas a pé pelas ruas | linha reta |
| youtube-nocookie.com | clipe do take tocando no app | botão abre o YouTube |
| fonts.googleapis.com | fontes | fontes do sistema |
| sites de locação (KLD) | link "ver o take" | — |

O service worker guarda a página, o MapLibre, os ícones e todos os frames (`porto-real-vNN`)
e, separado, os tiles já vistos ou baixados no "preparar para a viagem" (`porto-real-tiles-v1`).
No app nativo (`?native=1`) ele só guarda tiles, porque o resto já vem no pacote.

## App nativo

`got-dubrovnik-native/` é uma casca Capacitor 7: o build copia a pasta publicada para `www/`.
Extras nativos no plugin `ArNav` (Java): navegação AR com ARCore Geospatial (`ArNavActivity`)
e voz pelo TextToSpeech do sistema. Detalhes em RELEASE.md.

## Acoplamentos que ainda existem

Coisas do core que ainda supõem algo da franquia atual. Para franquias parecidas (cidade
a pé, lugares com cenas) não atrapalham:

- O desenho do mapa ilustrado em `buildMap()` espera `COAST`, `WALL`, `lokrum()` e `LABELS`;
  uma cidade sem muralha ou ilha precisa de versões mínimas (`[]` e uma função vazia).
- As categorias de lugar (`CATS`) têm cores fixas no CSS (`--c-cidade`, `--c-muralhas`,
  `--c-arredores`, `--c-excursao`). Uma franquia pode reaproveitar as 4 chaves com outros nomes.
- O botão especial `FX.bell` chama `shameBell()` (sino + texto "Vergonha!").
- Os desenhos de guia da câmera (`sk:'fort'|'stairs'|…`) são um conjunto fixo no core.
- Os nomes do cache e do IndexedDB (`porto-real…`, `portoreal…`) são os mesmos para todas:
  em domínios diferentes não colidem; no mesmo domínio, troque `cache` no `franchise.json`.
