# Testes

Testes automáticos com Playwright num Chrome de verdade (e no WebKit, o motor do Safari).
Eles abrem o guia, clicam, trocam idioma, ligam a câmera falsa, simulam GPS e imprimem o que viram.

## Rodar

```bash
pip install playwright pillow numpy        # e ffmpeg para a câmera falsa
python3 guide/tests/run_all.py             # tudo, na franquia got-dubrovnik (≈6 min com -j 4)
python3 guide/tests/run_all.py --only v15,v16
python3 guide/tests/run_all.py --franchise _template          # só o smoke (serve para qualquer franquia)
python3 guide/tests/run_all.py --engine webkit --only smoke   # Safari (precisa: python -m playwright install webkit)
```

O runner:
1. monta a franquia numa pasta temporária (`build.py --to`);
2. serve essa pasta numa porta livre;
3. roda cada script numa cópia adaptada: `localhost:8765` vira a porta da rodada e `/home/claude/tests/`
   vira a pasta de prints;
4. compara a saída de cada um com o **gabarito** (`tests/golden/<franquia>/<script>.out`).

Um teste **passa** quando termina com código 0, não registra erro de página (`ERRS []`,
`erros: nenhum`) e a saída normalizada é igual ao gabarito. Imagens `data:`, endereços `blob:`,
a porta e o código dos erros de rede (`net::ERR_…`) são trocados por marcadores antes de comparar.
O que falhar roda de novo, sozinho, uma vez; se passar, aparece "(passou na 2ª tentativa)" —
sinal de teste com espera fixa demais, que vale corrigir.

### Mudou algo de propósito?

Quando uma mudança altera de propósito o que um teste imprime:

```bash
python3 guide/tests/run_all.py --only v16          # mostra o diff contra o gabarito
python3 guide/tests/run_all.py --only v16 --update # depois de conferir que a diferença é a esperada
```

Commit o gabarito novo junto com a mudança. **Nunca** rode `--update` sem ler o diff.

## No GitHub

`.github/workflows/guide-tests.yml`, a cada push que mexe em `guide/` ou na pasta publicada:

| job | confere |
| --- | --- |
| build | `build.py --all --check` (saída em dia com core + franquia), `frames/check.py`, modelo monta |
| got-dubrovnik (Chrome) | todos os testes contra o gabarito |
| template (Chrome) | smoke no `_template` |
| got-dubrovnik (Safari engine) | smoke no WebKit com cara de iPhone |

Os gabaritos foram gravados num Chrome **sem internet** (só `localhost`): sem rotas reais pelas
ruas, sem tiles, sem fontes do Google. No CI, um proxy morto (`HTTP(S)_PROXY=127.0.0.1:9`,
`NO_PROXY=localhost`) deixa o Chrome igual. Se falhar, os prints da rodada ficam como artefato do job.

O APK tem o próprio workflow (`native-android.yml`): monta, instala no emulador, toca em algumas
telas (`got-dubrovnik-native/smoke.sh`) e publica prints e log na release `android-latest`.

## Os scripts

| script | o que confere |
| --- | --- |
| `smoke.py [chromium\|webkit]` | **qualquer franquia**: 6 idiomas, todas as abas, lugar, missão, modo teste, câmera; nenhum erro |
| `full.py` | tutorial, modo teste, todos os lugares e fotos, câmera, rotas, quiz, offline |
| `small.py` | tela pequena, tema escuro, dentro de iframe (modo artefato do Claude) |
| `i18n.py [langs]` | todas as telas em cada idioma; acusa sobra de português e chave faltando |
| `rm.py mock\|notiles\|fallback` | mapa real com tiles falsos; reserva no mapa desenhado |
| `v6.py` | agrupamento de pinos, rotas pelas ruas (roteador falso), contornos, guia de foto, comparação |
| `nav.py` | navegação a pé no app e a seta de virar no AR |
| `st.py` | take da cena: canto, guia por cima, exportar lado a lado |
| `v7.py` | links por lugar, avisar erro, voz (falsa), baixar viagem com service worker de verdade + recarregar offline, cartão de conquista |
| `v8.py` | colar print, opacidade na câmera, editor de encaixe e exportação |
| `v9.py` | take escolhido por missão: episódio certo e link direto da cena |
| `v10.py` | clipes no segundo exato, importar vários prints de uma vez, pacote de takes |
| `v11.py` | vários prints por missão no IndexedDB: migração, limite, persistência, pacote v1/v2, sem IndexedDB |
| `v12.py` | trocar de take dentro da câmera e do encaixe |
| `v13.py` | todos os cartões de missão nos 6 idiomas; lista de clipes |
| `v14.py` | take ao vivo: player do YouTube parado no segundo (player falso com o mesmo protocolo) |
| `v15.py` | frames que vêm com o app: cartão, visor, ocultar, persistência, ficha do lugar, câmera |
| `v16.py` | antes e depois: Cena \| Hoje no cartão, visor, ficha do lugar e câmera |
| `hdr.py` | cabeçalho e nome da cidade cabendo em várias larguras |
| `clean.py <lang>`, `og.py` | geram prints limpos e a imagem de compartilhar (não são testes; o runner pula) |

### Escrever um teste novo

- Copie a estrutura de um `vNN.py` recente: abre em `http://localhost:8765/?lang=pt`, bloqueia
  `tiles.openfreemap.org`, finge YouTube/roteador quando precisa, imprime o que conferiu e termina com
  `print("ERRS", errs)`.
- Imprima **valores**, não "ok": o gabarito pega qualquer mudança.
- Nada de horário de agora ou data de hoje na saída (o sol muda todo dia): fixe a data ou não imprima.
- Nada de medida em pixel nem tamanho de arquivo exato: mudam com as fontes do sistema e a versão do
  Chrome. Imprima o que importa ("cabe", `tamanho > 20000`).
- Espere pelo resultado (`wait_for_function("window._saved")`), não por um tempo fixo: com 4 testes
  em paralelo, 1,2 s às vezes não bastam.
- Prints vão para `/home/claude/tests/` (o runner troca pela pasta da rodada).
- Rode `--only seu_teste --update`, confira o `.out` gerado e commit.

## Coisas que só se testam no aparelho

- **ARCore (navegação AR nativa)**: precisa de celular com ARCore e da chave do Google Cloud.
- **Bússola de verdade e GPS andando**: o modo teste simula, mas vale uma volta real.
- **Safari no iPhone**: o WebKit do CI pega erros de JavaScript e de layout; câmera e
  orientação só no aparelho.
