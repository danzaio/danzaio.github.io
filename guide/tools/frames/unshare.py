import sys, cv2, numpy as np
# remove the site's share button from the top-right corner of a scene image
for p in sys.argv[1:]:
    im = cv2.imread(p); h, w = im.shape[:2]
    m = np.zeros((h, w), np.uint8)
    cv2.rectangle(m, (w-52, 4), (w-4, 54), 255, -1)
    out = cv2.inpaint(im, m, 9, cv2.INPAINT_TELEA)
    cv2.imwrite(p, out, [cv2.IMWRITE_JPEG_QUALITY, 92])
    print('fixed', p)
