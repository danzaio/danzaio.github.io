# GoT Dubrovnik — casca nativa (Android)

Casca Capacitor 7 em volta do guia publicado em `../got-dubrovnik/` (gerado por
`guide/tools/build.py got-dubrovnik` a partir de `guide/core` + `guide/franchises/got-dubrovnik`).
Os arquivos web são copiados para `www/` no build, então a fonte é uma só.

Build (feito pelo GitHub Actions a cada push que mexe no guia):

    python3 ../guide/tools/build.py got-dubrovnik --check
    npm ci
    mkdir -p www && cp -r ../got-dubrovnik/* www/
    npx cap sync android
    cd android && ./gradlew assembleDebug

O APK sai na release `android-latest`. Plugin nativo `ArNav`: navegação AR (ARCore Geospatial,
precisa de chave do Google Cloud) e voz do sistema. Detalhes em `guide/docs/RELEASE.md`.
