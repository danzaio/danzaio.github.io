import sys
from PIL import Image
# usage: crop.py out.jpg shot.jpg [W H]
out, shot = sys.argv[1:3]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 1280
H = int(sys.argv[4]) if len(sys.argv) > 4 else 720
im = Image.open(shot).convert('RGB').crop((0, 0, W, H))
im.save(out, quality=88, optimize=True, progressive=True)
print(out, im.size)
