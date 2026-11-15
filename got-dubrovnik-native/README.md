# GoT Dubrovnik — native shell (Android)

Capacitor wrapper around the web guide in `../got-dubrovnik`. The web files are
copied into `www/` at build time, so there is a single source for the app.

Build (done by GitHub Actions on every push that touches the guide):

    npm ci
    mkdir -p www && cp -r ../got-dubrovnik/* www/
    npx cap sync android
    cd android && ./gradlew assembleDebug

The APK is published under Releases as `android-latest`.

Planned native-only modules: AR walking path and building outlines with the
ARCore Geospatial API (needs a Google Cloud API key), background arrival alerts.
