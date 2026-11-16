import sys, numpy as np
from PIL import Image
# usage: blocks.py prefix shot.jpg [x0 x1]  -> saves prefix-N.jpg for each full image block in column
pre, shot = sys.argv[1:3]
x0 = int(sys.argv[3]) if len(sys.argv) > 3 else 246
x1 = int(sys.argv[4]) if len(sys.argv) > 4 else 950
im = Image.open(shot).convert('RGB'); a = np.asarray(im).astype(int)
col = a[:, x0+4:x1-4]
# a row is "image" if it isn't near-uniform light background
row_img = (col.std(axis=(1,2)) > 12) | (col.mean(axis=(1,2)) < 200)
H = a.shape[0]; runs = []; s = None
for y in range(H + 1):
    v = row_img[y] if y < H else False
    if v and s is None: s = y
    if not v and s is not None:
        runs.append((s, y)); s = None
n = 0
for s, e in runs:
    if e - s < 150: continue
    full = s > 0 and e < H
    print(f'block y={s}..{e} h={e-s} full={full}')
    if not full: continue
    n += 1
    out = f'{pre}-{n}.jpg'
    im.crop((x0, s, x1, e)).save(out, quality=90)
    print(' ->', out)
