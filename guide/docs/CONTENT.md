# Padrão de conteúdo

Como escrever lugares, missões, roteiros, curiosidades, quiz e textos de marca, em português e
nos outros 5 idiomas. A franquia de GoT em Dubrovnik é o exemplo de referência para cada campo.

## Princípios

- **Útil na rua.** Quem lê está em pé, no sol, com o celular numa mão. Frases curtas, a informação
  prática primeiro (onde ficar, para onde apontar, que horas ir).
- **Verificado.** Coordenada conferida no satélite; preço e horário com o ano e de fonte oficial;
  cena com temporada/episódio certos. Na dúvida, não afirme.
- **Escrito por nós.** Pesquise em vários sites, mas reescreva tudo com palavras próprias.
  Não copie trechos de blogs, guias ou da wiki da franquia.
- **De fã.** Sem logo oficial, sem dizer que é oficial; o "Sobre" deixa claro que não tem ligação com o estúdio.
- **Spoiler.** O app tem a opção de esconder o que acontece nas cenas; escreva a cena de forma que
  o título do episódio + o lugar façam sentido mesmo escondidos.

## Campos, um por um

### Lugar (`L`)

| campo | como escrever | exemplo (GoT) |
| --- | --- | --- |
| `name` | nome como o turista procura, no idioma do texto | Forte Lovrijenac |
| `hr` | nome local, na língua do país | Tvrđava Lovrijenac |
| `got` | papel na franquia, curto (vira subtítulo) | A Fortaleza Vermelha |
| `scenes` | `[temporada, episódio, 'título original', 'o que acontece']`, 1–2 frases | `[2,1,'The North Remembers','Torneio do dia do nome…']` |
| `real` | o que é de verdade: o que, de quando, por que ir. 1–2 frases | Fortaleza num rochedo de 37 m… |
| `curios` | 1–3 curiosidades de gravação, cada uma uma frase | A cerimônia foi gravada em Belfast… |
| `tips` | 2–3 dicas práticas: preço/ingresso, tempo de caminhada, onde fica o ponto exato | Grátis e aberto o tempo todo. |
| `lat, lon` | 5 casas decimais, no ponto de onde se vê o que aparece na tela | 42.64073, 18.10441 |

Título de episódio fica no original (inglês), em todos os idiomas.

### Missão de foto (`PH`)

| campo | como escrever |
| --- | --- |
| `title` | nome curto e memorável da foto ("O olhar de Cersei") |
| `stand` / `tgt` | onde ficar / para onde apontar — confira no satélite; a bússola e a câmera usam os dois |
| `lens` | `0,5×`, `1×`, `2×` ou combinações ("1× ou 2×"). O core lê o começo (`0,5`/`2×`/resto = 1×) |
| `orient` | começa com `Vertical` ou `Horizontal` (o core lê essas palavras no português) |
| `where` | onde ficar, com uma referência fácil ("encostado no parapeito leste") |
| `how` | como enquadrar: terços, o que entra, o que corta |
| `best` | melhor horário e por quê (o app calcula o sol, mas diga a lógica: "sol do oeste às costas") |
| `recreate` | como recriar a cena com quem está junto; leve e divertido |
| `sk` | desenho da guia da câmera (valores existentes no core: veja os usados em got-dubrovnik) |

### Roteiro, curiosidade, quiz

- **Roteiro**: `name`, `time` ("6–8 h com muralhas"), `stops` na ordem a pé, `desc` em 1–2 frases.
- **Curiosidade**: `[emoji, frase]` sobre a franquia na cidade como um todo.
- **Quiz**: `[pergunta, [4 opções], índice da certa, explicação curta]`. Opções plausíveis; a
  explicação ensina algo que não estava na pergunta. 10–15 perguntas.

### Textos de marca (`25-ui-brand.js`)

As 60 chaves de `core/brand-keys.json`: nome do guia (`brand`, `brandTitle`, `brandSub`, `docTitle`),
quiz (`quizTitle`, `rank1`…), ingressos (`ticketsTitle`, `tk1`…`tk9`, `ticketsNote`), ajuda e regras
(`helpHTML`, `rulesHTML`), "Sobre" (`aboutP`, `sourcesP`), compartilhar (`shareTitle`, `shareText`,
`shareCardT`), tutorial (`tour0t`, `tour0p`, `tour2p`, `tour6p`, `tour9p`), modo teste (`simDesc`, `simOn`),
nomes das categorias (`cat_*`, `catS_*`), dicas de luz e temporada (`lNightD`, `lowSeasonBox`…).

- O nome do guia muda por idioma quando a franquia tem nome traduzido (Porto Real / King's Landing /
  Desembarco del Rey / Königsmund / Port-Réal / Approdo del Re).
- `brand` precisa caber no topo em 320 px: até ~14 caracteres em caixa alta.
- `{0}`, `{1}` são trocados por números/nomes: mantenha-os na tradução.
- HTML permitido só onde a chave já tem (`helpHTML`, `aboutP`…): `<b>`, `<li>`, `<br>`.

## Idiomas

- **Base em português** (`10-data.js`); os outros em `20-content-i18n.js` (`TRB.<idioma>`), campo a campo.
- Traduza o sentido, não a palavra: cada idioma com o nome que os fãs daquele país usam
  (Fortaleza Vermelha / Red Keep / Fortaleza Roja / Roter Bergfried / Donjon Rouge / Fortezza Rossa).
- Nomes de lugares reais: use a forma conhecida no idioma (Pile Gate, Puerta de Pile, Pile-Tor…).
- Unidades e números no formato do idioma (o core formata distâncias e horas sozinho).
- Confira sobra de português: `python3 guide/tests/run_all.py --only i18n` (franquia GoT) ou revisão manual.

## Fontes e créditos

- Liste as fontes que você usou no `sourcesP` ("Fontes") e nos créditos das cenas (`frCredit`, `HSRC`).
- Preço e horário: site oficial, com o ano no título ("Ingressos e horários (2026)").
- Frames e fotos de terceiros: só em repositório privado, para uso pessoal (FRAMES.md).
