#!/usr/bin/env python3
"""Divide um antes-e-depois vertical (cena em cima, foto de hoje embaixo) na emenda.
uso: split.py composto.jpg cena.jpg hoje.jpg   (procura a emenda entre 40% e 60% da altura)"""
import sys, numpy as np
from PIL import Image
src, a, b = sys.argv[1:4]
im = Image.open(src).convert('RGB'); x = np.asarray(im).astype(int); H = x.shape[0]
d = np.abs(x[1:] - x[:-1]).mean(axis=(1, 2)); lo, hi = int(H * .4), int(H * .6)
r = lo + int(np.argmax(d[lo:hi])) + 1
im.crop((0, 0, im.width, r)).save(a, quality=90); im.crop((0, r, im.width, H)).save(b, quality=90)
print(f'emenda na linha {r}: {a} {im.width}x{r} · {b} {im.width}x{H-r}')
