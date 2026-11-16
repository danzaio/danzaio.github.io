#!/usr/bin/env python3
"""Confere as cenas de uma franquia: cada entrada de FR/LFR/HOJE do 50-frames.js existe em
assets/frames com o tamanho declarado, e não sobra imagem sem uso.
uso: python3 guide/tools/frames/check.py got-dubrovnik"""
import os, re, sys, json, subprocess
from PIL import Image
G = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
fid = sys.argv[1] if len(sys.argv) > 1 else 'got-dubrovnik'
fd = os.path.join(G, 'franchises', fid)
src = open(os.path.join(fd, 'fragments', '50-frames.js'), encoding='utf-8').read()
js = src + '\nconsole.log(JSON.stringify({FR:typeof FR!=="undefined"?FR:{},LFR:typeof LFR!=="undefined"?LFR:{},HOJE:typeof HOJE!=="undefined"?HOJE:{},HSRC:typeof HSRC!=="undefined"?HSRC:{}}))'
d = json.loads(subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout)
want = {}
for grp in ('FR', 'LFR'):
    for k, arr in d[grp].items():
        for n, w, h in arr: want[n] = (w, h, f'{grp}.{k}')
for k, (n, w, h, s) in d['HOJE'].items():
    want[n] = (w, h, f'HOJE.{k}')
    if s not in d['HSRC']: print(f'✗ HOJE.{k}: fonte "{s}" não está em HSRC')
    if k not in want and not any(k == f[0] for arr in list(d['FR'].values()) + list(d['LFR'].values()) for f in arr):
        print(f'✗ HOJE.{k}: não há cena {k} em FR/LFR')
ad = os.path.join(fd, 'assets', 'frames'); have = set(os.listdir(ad)) if os.path.isdir(ad) else set()
bad = 0
for n, (w, h, where) in sorted(want.items()):
    f = n + '.jpg'
    if f not in have: print(f'✗ {where}: falta frames/{f}'); bad += 1; continue
    sz = Image.open(os.path.join(ad, f)).size
    if sz != (w, h): print(f'✗ {where}: frames/{f} é {sz[0]}x{sz[1]}, declarado {w}x{h}'); bad += 1
orph = sorted(have - {n + '.jpg' for n in want})
for f in orph: print(f'⚠ frames/{f} não é usado'); 
print(f'{"✓" if not bad else "✗"} {len(want)} imagens declaradas, {bad} com problema, {len(orph)} sobrando')
sys.exit(1 if bad else 0)
