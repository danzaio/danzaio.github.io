# Changelog

Versões do core e das franquias. A versão de cada franquia é o `appVersion` do `franchise.json`
(aparece em "Sobre"); `swVersion` é o número do cache offline.

## Core

### 2026-11-16 — core separado das franquias
- `guide/core/` (motor) + `guide/franchises/<id>/` (conteúdo) + `guide/tools/build.py`.
  O primeiro build gerou a v13 de GoT byte a byte igual; os textos e dados em execução foram
  comparados nos 6 idiomas, e as 17 baterias de teste deram saída idêntica à v13.
- Ganchos `FX` no lugar de ids de lugar fixos no código (entrada, alvo da bússola, excursão longe,
  barco, sino…).
- 60 textos de marca saíram do core para `25-ui-brand.js` da franquia; o build exige todos.
- Mapa desenhado (`buildMap`) passou para a franquia; logo do topo (`05-brand.html`) e cores
  (`06-theme.css`) viraram fragmentos.
- Nome do cache, prefixo do armazenamento local e nome do IndexedDB por franquia (`cache`,
  `store`, `idb`), para várias franquias no mesmo domínio não misturarem dados.
- `guide/franchises/_template/`: franquia mínima que monta e passa no smoke nos 6 idiomas.
- Testes: `run_all.py` com PASSOU/FALHOU e gabaritos; `smoke.py` para qualquer franquia e para o
  WebKit (Safari); `small.py` consertado (gerava o iframe a partir de um arquivo que não existia).
- CI: `guide-tests.yml` (build em dia, cenas, todos os testes, modelo, WebKit); o workflow do APK
  também confere o build.
- Ferramentas de cenas em `guide/tools/frames/`; documentação em `guide/docs/`.

### 2026-11-17 — prontidão para publicar
- Fontes Inter e Cinzel no `core/lib/fonts` (SIL OFL); o service worker guarda junto.
- `CREDITS` no `50-frames.js` → lista em Sobre; `privacy.html` nos assets de cada franquia, com link no Sobre.
- Token `@@APP_VERSION@@`; o smoke confere privacidade, créditos e versão.
- Testes: nome do cache e versão normalizados nos gabaritos (não quebram a cada versão).

## got-dubrovnik — Porto Real (Game of Thrones em Dubrovnik)

| versão | data | o que entrou |
| --- | --- | --- |
| v14 | 2026-11-17 | fontes embutidas (funcionam sem internet, sem Google Fonts); créditos das imagens em Sobre, com link para cada fonte; política de privacidade (pt/en) para a Play Store; versão no Sobre vem do `franchise.json` |
| v13 | 2026-11-16 | antes e depois: 11 cenas com foto de hoje do mesmo ângulo (Cena \| Hoje no cartão, visor, ficha e câmera); cenas novas da Escadaria Jesuíta, motim no Pile, píer, arcos do Lovrijenac, Trsteno, arena e pérgula |
| v12 | 2026-11-16 | frames da série vêm no app (sites de locação + YouTube), 12 das 15 missões |
| v11 | 2026-11-16 | o take toca dentro do app (player do YouTube parado no segundo) |
| v10 | 2026-11-16 | vários takes por missão (IndexedDB), pacote de takes |
| v9 | 2026-11-15 | clipes no segundo exato; importar vários prints de uma vez |
| — | 2026-11-15 | take escolhido para cada missão (episódio e link da cena) |
| v8 | 2026-11-15 | encaixar a sua foto na cena (editor lado a lado); navegação a pé no app |
| v7 | 2026-11-15 | baixar a viagem (offline), voz, link por lugar, avisar erro, cartão de conquista |
| — | 2026-11-15 | app Android (Capacitor) gerado no CI; tela AR nativa (ARCore Geospatial); seta AR na navegação web |
| v6 | 2026-11-15 | take da cena, contornos reais, rotas pelas ruas, agrupamento de pinos |
| v5 | 2026-11-15 | mapa real (MapLibre + OpenFreeMap) |
| v4 | 2026-11-15 | 6 idiomas |
| v3 | 2026-11-15 | radar AR, planejador de foto com sol, tutorial, modo teste, offline |
| v1–v2 | 2026-11-15 | primeira versão: mapa, lugares, bússola, roteiros, quiz |

### Pendências conhecidas
- Missões sem cena: Stradun e Portão Ploče (só há frames da Caminhada da Vergonha com nudez),
  Trono no Lokrum (réplica, sem cena).
- 3 segundos de clipe aproximados (olhar de Cersei, Ploče, motim no Pile).
- Hospedagem web: Pages fora do ar com o repo privado (ver RELEASE.md).
- Testes que só se fazem no aparelho: ARCore, bússola real, Safari com câmera.
