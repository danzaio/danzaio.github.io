#!/usr/bin/env bash
# Installs the APK on the CI emulator, walks through a few screens and saves screenshots + crash log.
set -x
P=com.danzaio.gotdubrovnik
mkdir -p shots
adb install -r app.apk
adb shell pm grant $P android.permission.ACCESS_FINE_LOCATION
adb shell pm grant $P android.permission.ACCESS_COARSE_LOCATION
adb shell pm grant $P android.permission.CAMERA
adb emu geo fix 18.10905 42.64112
adb logcat -c
adb shell am start -n $P/.MainActivity
sleep 40
shot(){ adb exec-out screencap -p > shots/emu_$1.png; }
size=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | tail -1); W=${size%x*}; H=${size#*x}
shot 1_first
# "skip tutorial" sits at the left of the tutorial card; tap by text position found via UI dump
adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1; adb pull /sdcard/ui.xml shots/ui1.txt >/dev/null 2>&1
tapText(){ python3 - "$1" <<'PY'
import re,sys,subprocess
x=open('shots/ui1.txt',encoding='utf8',errors='ignore').read()
m=re.search(r'text="[^"]*'+re.escape(sys.argv[1])+r'[^"]*"[^>]*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"',x)
if m:
    a=list(map(int,m.groups()));subprocess.run(['adb','shell','input','tap',str((a[0]+a[2])//2),str((a[1]+a[3])//2)]);print('tapped',sys.argv[1])
else: print('not found',sys.argv[1])
PY
}
tapText "Skip tutorial"; sleep 6; shot 2_map
adb emu geo fix 18.10905 42.64112; sleep 8; shot 3_gps
adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1; adb pull /sdcard/ui.xml shots/ui1.txt >/dev/null 2>&1
tapText "Places"; sleep 4; shot 4_places
adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1; adb pull /sdcard/ui.xml shots/ui1.txt >/dev/null 2>&1
tapText "Photos"; sleep 4; shot 5_photos
adb logcat -d -s AndroidRuntime:E Capacitor:* Capacitor/Console:* chromium:E | tail -150 > shots/emu_log.txt
adb shell dumpsys package $P | grep -E "versionName|granted=true" | head -12 >> shots/emu_log.txt
exit 0
