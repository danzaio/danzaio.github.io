# Franquia nova, passo a passo

Como fazer um guia novo (ex.: Harry Potter em Londres, O Senhor dos Anéis na Nova Zelândia,
Star Wars em Dubrovnik/Tunísia) no mesmo padrão do de Game of Thrones em Dubrovnik.
O core não muda: você só escreve a pasta da franquia.

**Tempo realista:** 1 dia para o esqueleto funcionando com 5–8 lugares; 2–4 dias para chegar ao
nível do de GoT (20 lugares, 15 missões com cenas, 6 idiomas revisados).

## 0. Decidir o escopo

- **Cidade** e **franquia**. Funciona melhor com locações a pé de um centro (cidade velha, bairro),
  mais algumas excursões.
- **Lista de lugares**: 8 a 25. Para cada um: nome, coordenada exata (do ponto onde se vê o que
  aparece na tela), cenas (temporada/episódio ou filme), o que é na vida real.
- **Missões de foto**: 6 a 15, nos lugares mais fotogênicos. Cada uma com o ponto exato onde
  ficar (`stand`), para onde apontar (`tgt`), lente e orientação.
- **Roteiros**: 1 dia a pé, um temático (como a Caminhada da Vergonha), um de excursões.

Pesquise antes de escrever (ver CONTENT.md): sites de locação, blogs com antes e depois, mapas.
Confira cada coordenada no mapa de satélite.

## 1. Criar a pasta

```bash
cp -r guide/franchises/_template guide/franchises/hp-londres
```

Edite `franchise.json`:

| campo | o que é |
| --- | --- |
| `id` | igual ao nome da pasta (`hp-londres`) |
| `out` | pasta publicada na raiz do repositório (`hp-londres`) |
| `appVersion` | versão mostrada em "Sobre" |
| `cache` | nome do cache offline (`hp-londres`) — **único** por franquia |
| `swVersion` | suba 1 a cada publicação (força o celular a baixar a versão nova) |
| `store` | prefixo do armazenamento local (`hpl_`) — **único** por franquia no mesmo domínio |
| `idb` | nome do banco local dos prints (`hplondres`) — **único** |
| `hostedUrl` | endereço publicado, com `/` no fim |
| `languages` | `["pt","en","es","de","fr","it"]` — o core tem os 6 |
| `native` | `null` até ter app Android (ver RELEASE.md) |

## 2. Preencher os fragmentos

Siga a ordem: cada passo já dá para ver no navegador.

1. **`10-data.js`** — lugares (`L`), missões (`PH`), roteiros, curiosidades, quiz, em português.
   Os campos estão comentados no modelo e descritos em ARCHITECTURE.md → Modelo de dados.
   - `n` = número no mapa (ordem do roteiro de 1 dia).
   - `cat` usa as 4 chaves fixas (`cidade`, `muralhas`, `arredores`, `excursao`); os nomes mostrados vêm de `25-ui-brand.js`.
   - `lens` começa com `0,5×`, `1×` ou `2×`; `orient` começa com `Vertical` ou `Horizontal`.
2. **`04-hooks.js`** — `FX`: lugar de entrada, alvo padrão da bússola, excursão longe (ou `null`)…
3. **`02-timezone.js`**, **`03-hosted-url.js`**, **`71-issues.js`**.
4. **`30-map-anchor.js`** — centro do mapa desenhado: `LAT0, LON0` no centro da área;
   `MX = 111320 × cos(LAT0)`, `MY = 111087`.
5. **`70-air.js`** (lugares com barco/teleférico/carro) e **`72-altitudes.js`** (altitude aproximada; o radar AR usa).
6. **`25-ui-brand.js`** — os textos de marca. O modelo traz cada chave com `TODO — ex.:` e o texto
   da franquia de GoT, para mostrar o que ela é. Reescreva **todas**, nos 6 idiomas. O build
   recusa chave faltando e avisa enquanto sobrar `TODO`.
7. **`01-head.html`**, **`05-brand.html`** (logo do topo), **`06-theme.css`** (cores, opcional).
8. **`assets/`** — `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (com margem de 20%),
   `apple-touch-icon.png` (180), `og.png` (1200×630), `manifest.webmanifest`.
9. **`20-content-i18n.js`** — traduções do conteúdo (`TRB.en`, `TRB.es`…). O que faltar cai no português.
10. **`31-map-art.js`** — mapa desenhado de reserva. O modelo tem só mar e um retângulo de terra.
    Desenhe a costa/rio e os rótulos se der tempo (exemplo completo na de GoT).
11. **`40-outlines.js`** — contorno de cada missão para a guia da câmera (opcional, mas ajuda muito).
12. **Cenas** — `50-frames.js`, `60-takes.js`, `61-clips.js` e `assets/frames/`. Siga FRAMES.md.

## 3. Ver e testar

```bash
python3 guide/tools/build.py hp-londres --to /tmp/hp && (cd /tmp/hp && python3 -m http.server 8765)
# abra http://localhost:8765/?lang=pt  — use o 🧪 Modo teste para "andar" pela cidade

python3 guide/tests/run_all.py --franchise hp-londres          # smoke nos 6 idiomas, sem erro
python3 guide/tools/frames/check.py hp-londres                  # cenas registradas = arquivos
```

Confira à mão, em cada idioma:
- topo (nome cabe em 320 px de largura?), mapa, lista de lugares, ficha de cada lugar;
- cada missão: guia na câmera, contorno, melhor luz, take da cena;
- roteiros no mapa, quiz até o fim, "Sobre", "Ajuda", ingressos;
- modo teste perto de cada lugar (aviso de chegada) e longe (atalho da excursão).

## 4. Publicar

```bash
python3 guide/tools/build.py hp-londres        # gera a pasta hp-londres/ na raiz
git add guide/franchises/hp-londres hp-londres && git commit
```

Para o app Android, duplique `got-dubrovnik-native/` e o workflow (RELEASE.md).
Registre no CHANGELOG.md.

## 5. Checklist antes de chamar de pronta

- [ ] Coordenadas conferidas no satélite (lugares **e** `stand`/`tgt` das missões).
- [ ] Todos os textos de marca reescritos, nenhum `TODO` (`build.py` não avisa nada).
- [ ] 6 idiomas sem sobra de português (`i18n.py` adaptado, ou revisão manual).
- [ ] Preços e horários com o ano e a fonte; links oficiais.
- [ ] Cenas: créditos em `HSRC`/textos de crédito; repositório **privado** enquanto tiver frames.
- [ ] Smoke passando no Chrome e no WebKit; testado no celular de verdade, na rua.
- [ ] `og.png` e ícones próprios (sem logo oficial da franquia).
- [ ] "Sobre" diz que é guia de fã, não oficial, sem ligação com o estúdio.
