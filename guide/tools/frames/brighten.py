#!/usr/bin/env python3
"""Clareia frames escuros (vídeos 4K HDR desenhados num canvas SDR saem apagados).
uso: brighten.py arquivo.jpg [...]   (sobrescreve; alvo de brilho médio 0.42)"""
import sys, numpy as np
from PIL import Image, ImageOps
for p in sys.argv[1:]:
    im = ImageOps.autocontrast(Image.open(p).convert('RGB'), cutoff=(0.3, 0.3))
    a = np.asarray(im).astype(float) / 255; m = a.mean()
    if m < 0.36:
        a = a ** (np.log(0.42) / np.log(max(m, 1e-3)))
    out = Image.fromarray((a * 255).clip(0, 255).astype('uint8'))
    out.save(p, quality=88, optimize=True, progressive=True)
    print(f'{p}: brilho {m:.2f} -> {np.asarray(out).mean()/255:.2f}')
