# Publicar (web e Android)

## Ciclo de uma mudança

1. Edite `guide/core/` (motor) ou `guide/franchises/<id>/` (conteúdo). **Nunca** a pasta publicada.
2. Monte: `python3 guide/tools/build.py <id>` (ou `--all`).
3. Teste: `python3 guide/tests/run_all.py` (ver TESTING.md). Mudou saída de propósito → `--update` depois de ler o diff.
4. Suba a versão:
   - `appVersion` no `franchise.json` (aparece em "Sobre") quando há novidade para quem usa;
   - `swVersion` **sempre** que publicar algo que o celular precisa baixar de novo (o service worker
     só troca o cache quando o nome muda).
5. Anote no `CHANGELOG.md`.
6. Commit com a pasta da franquia **e** a pasta publicada juntas; push.
   O CI confere que a pasta publicada está em dia (`build.py --check`), roda os testes e gera o APK.

## Web

A pasta publicada (ex.: `got-dubrovnik/`) é estática: qualquer hospedagem serve.

| opção | custo | quem vê | observação |
| --- | --- | --- | --- |
| GitHub Pages, repo público | grátis | todo mundo | só sem frames de terceiros |
| GitHub Pages, repo privado | GitHub Pro (US$4/mês) | quem tiver o link | o site fica público mesmo com o repo privado |
| Cloudflare Pages + Access | grátis (até 50 pessoas) | só quem você liberar por e-mail | precisa de conta Cloudflare; deploy por workflow |
| Artefato privado do Claude | — | só o dono | mapa, GPS, câmera e service worker ficam bloqueados: serve só para ver cenas |

**Situação atual (nov/2026):** o repositório `danzaio.github.io` está privado (por causa dos frames)
e o Pages saiu do ar. A versão completa está no APK. A galeria de cenas está publicada como
artefato privado do Claude.

## Android

`got-dubrovnik-native/` é uma casca Capacitor 7 em volta da pasta publicada.

- `.github/workflows/native-android.yml`, a cada push que mexe no guia:
  1. confere que `got-dubrovnik/` está em dia com `guide/`;
  2. `npm ci`, copia a pasta publicada para `www/`, `npx cap sync android`, `./gradlew assembleDebug`;
  3. publica `got-dubrovnik.apk` na release **`android-latest`** (pré-lançamento, sempre a última);
  4. instala num emulador Android 14, toca em algumas telas (`smoke.sh`) e anexa os prints
     (`emu_*.png`) e o log (`emu_log.txt`) na mesma release.
- **Instalar:** abrir a release no celular (logado no GitHub, o repo é privado), baixar o APK,
  permitir instalar pelo navegador.
- Build local: `cd got-dubrovnik-native && npm ci && mkdir -p www && cp -r ../got-dubrovnik/* www/ && npx cap sync android && cd android && ./gradlew assembleDebug`
  (o sandbox do Claude não alcança o Maven do Google; o build roda no CI).

### Nativo (plugin `ArNav`)

| método | faz |
| --- | --- |
| `isAvailable` / `start` | navegação AR com ARCore Geospatial (`ArNavActivity`); precisa da chave do Google Cloud |
| `speak` / `stopSpeak` | voz do TextToSpeech do sistema (o navegador do Android às vezes não fala) |

Detalhes que já quebraram e estão resolvidos no manifest:
- `<queries>` para o serviço de TTS (Android 11+ esconde os pacotes);
- `EmojiCompatInitializer` desligado: o primeiro boot do emulador derrubava o app quando o
  Google Play Services reiniciava (DEPENDENCY DIED). O `smoke.sh` ainda espera 75 s e reabre o app se ele cair.

### App nativo para uma franquia nova

1. Copie `got-dubrovnik-native/` para `<id>-native/`; troque `appId` e `appName` em `capacitor.config.json`
   e o pacote Java (`com/danzaio/<id>`), e `applicationId` em `android/app/build.gradle`.
2. Copie o workflow, trocando a pasta, o nome do APK e a tag da release.
3. Preencha `native` no `franchise.json` (documentação; o build não usa).

## iPhone

Sem app nativo por enquanto. O guia web funciona no Safari (o WebKit roda no CI). Quando houver
hospedagem, "Adicionar à Tela de Início" instala como app, com offline.
