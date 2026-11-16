#!/usr/bin/env bash
# Installs the APK on the CI emulator, walks through a few screens by tapping, saves screenshots + crash log.
set -x
P=com.danzaio.gotdubrovnik
mkdir -p shots
adb install -r app.apk
for p in ACCESS_FINE_LOCATION ACCESS_COARSE_LOCATION CAMERA; do adb shell pm grant $P android.permission.$p; done
adb emu geo fix 18.10905 42.64112
adb logcat -c
# emulador recém-ligado: o Play Services ainda reinicia sozinho e derruba quem usa o provedor de fontes dele; espera assentar
sleep 75
adb shell am start -n $P/.MainActivity
sleep 40
EARLY=""
if [ -z "$(adb shell pidof $P)" ]; then EARLY="first launch exited within 40 s; started again"; adb shell am start -n $P/.MainActivity; sleep 30; fi
size=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | tail -1); W=${size%x*}; H=${size#*x}
shot(){ adb exec-out screencap -p > shots/emu_$1.png; echo "$1 alive=$(adb shell pidof $P) top=$(adb shell dumpsys activity activities | grep -m1 ResumedActivity | grep -oE '[A-Za-z0-9_.]+/[A-Za-z0-9_.$]+')" >> shots/emu_log.txt; }
tap(){ adb shell input tap $(( W * $1 / 1000 )) $(( H * $2 / 1000 )); sleep ${3:-5}; }
up(){ adb shell input swipe $(( W / 2 )) $(( H * 80 / 100 )) $(( W / 2 )) $(( H * 30 / 100 )) 400; sleep ${1:-3}; }
# se o app caiu no meio do caminho, reabre (e anota) para os próximos prints não saírem da tela inicial
alive(){ if [ -z "$(adb shell pidof $P)" ]; then echo "app was not running before $1; started again" >> shots/emu_log.txt; adb shell am start -n $P/.MainActivity; sleep 25; fi; }
echo "$EARLY" > shots/emu_log.txt
shot 1_first
tap 170 665 6          # "Skip tutorial"
adb emu geo fix 18.10905 42.64112; sleep 10
shot 2_map_gps
alive 3; tap 300 955 5; shot 3_places      # Places tab
tap 400 360 6; shot 4_place_sheet # first place in the list
tap 919 222 3                     # ✕ closes the sheet (Android's back key would leave the app)
tap 400 685 6; up; up; shot 4b_scenes # 4th place with the GPS fix above (St Dominic Street): sheet scrolled to its gallery of show frames
adb shell am force-stop $P; sleep 2; adb shell am start -n $P/.MainActivity; sleep 25
tap 300 955 5; tap 400 360 6
tap 500 340 12; shot 5_walk_nav   # "Walk there" button (y 0.32-0.36; 0.39 hit the Maps links and opened Chrome)
alive 6; tap 700 955 5; shot 6_photos      # Photos tab
tap 900 955 5; shot 7_more        # More tab
# second launch: the map now goes through the service worker (offline tile cache); it must still open
adb shell am force-stop $P; sleep 2
adb shell am start -n $P/.MainActivity; sleep 25
shot 8_relaunch
adb shell dumpsys activity exit-info $P | head -40 >> shots/emu_log.txt
adb logcat -d -b crash | tail -60 >> shots/emu_log.txt
adb logcat -d | grep -iE "FATAL|Process: $P|Capacitor|ArNav|render process|RenderProcessGone|chromium|cr_|libc  *: Fatal|DEBUG   :|lowmemory|am_kill|Killing .*gotdubrovnik" | grep -v "Expected value to be of type number" | tail -120 >> shots/emu_log.txt
exit 0
