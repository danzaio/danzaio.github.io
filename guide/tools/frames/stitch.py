import sys
from PIL import Image
# usage: stitch.py out.jpg top.jpg bottom.jpg [W H]
out, top, bot = sys.argv[1:4]
W = int(sys.argv[4]) if len(sys.argv) > 4 else 1280
H = int(sys.argv[5]) if len(sys.argv) > 5 else 720
a = Image.open(top).convert('RGB'); b = Image.open(bot).convert('RGB')
vh = a.size[1]
img = Image.new('RGB', (W, H))
img.paste(a.crop((0, 0, W, min(vh, H))), (0, 0))
if H > vh:
    off = H - vh
    img.paste(b.crop((0, vh - off, W, vh)), (0, vh))
img.save(out, quality=88, optimize=True, progressive=True)
print(out, img.size)
