#!/usr/bin/env bash
# Installs the APK on the CI emulator, walks through a few screens by tapping, saves screenshots + crash log.
set -x
P=com.danzaio.gotdubrovnik
mkdir -p shots
adb install -r app.apk
for p in ACCESS_FINE_LOCATION ACCESS_COARSE_LOCATION CAMERA; do adb shell pm grant $P android.permission.$p; done
adb emu geo fix 18.10905 42.64112
adb logcat -c
adb shell am start -n $P/.MainActivity
sleep 40
size=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | tail -1); W=${size%x*}; H=${size#*x}
shot(){ adb exec-out screencap -p > shots/emu_$1.png; echo "$1 alive=$(adb shell pidof $P) top=$(adb shell dumpsys activity activities | grep -m1 ResumedActivity | grep -oE '[A-Za-z0-9_.]+/[A-Za-z0-9_.$]+')" >> shots/emu_log.txt; }
tap(){ adb shell input tap $(( W * $1 / 1000 )) $(( H * $2 / 1000 )); sleep ${3:-5}; }
: > shots/emu_log.txt
shot 1_first
tap 170 665 6          # "Skip tutorial"
adb emu geo fix 18.10905 42.64112; sleep 10
shot 2_map_gps
tap 300 955 5; shot 3_places      # Places tab
tap 400 360 6; shot 4_place_sheet # first place in the list
tap 500 340 12; shot 5_walk_nav   # "Walk there" button (y 0.32-0.36; 0.39 hit the Maps links and opened Chrome)
tap 700 955 5; shot 6_photos      # Photos tab
tap 900 955 5; shot 7_more        # More tab
# second launch: the map now goes through the service worker (offline tile cache); it must still open
adb shell am force-stop $P; sleep 2
adb shell am start -n $P/.MainActivity; sleep 25
shot 8_relaunch
adb shell dumpsys activity exit-info $P | head -40 >> shots/emu_log.txt
adb logcat -d -b crash | tail -60 >> shots/emu_log.txt
adb logcat -d | grep -iE "FATAL|Process: $P|Capacitor|ArNav|render process|RenderProcessGone|chromium|cr_|libc  *: Fatal|DEBUG   :|lowmemory|am_kill|Killing .*gotdubrovnik" | grep -v "Expected value to be of type number" | tail -120 >> shots/emu_log.txt
exit 0
