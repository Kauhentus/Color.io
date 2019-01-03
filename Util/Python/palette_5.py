from PIL import Image, ImageDraw
import sys

r1 = int(sys.argv[1])
g1 = int(sys.argv[2])
b1 = int(sys.argv[3])
r2 = int(sys.argv[4])
g2 = int(sys.argv[5])
b2 = int(sys.argv[6])
r3 = int(sys.argv[7])
g3 = int(sys.argv[8])
b3 = int(sys.argv[9])
r4 = int(sys.argv[10])
g4 = int(sys.argv[11])
b4 = int(sys.argv[12])
r5 = int(sys.argv[13])
g5 = int(sys.argv[14])
b5 = int(sys.argv[15])
token = sys.argv[16]

img = Image.new('RGB', (1280, 256))
d = ImageDraw.Draw(img)
d.rectangle((0, 0, 256, 256), (r1, g1, b1), None)
d.rectangle((256, 0, 512, 256), (r2, g2, b2), None)
d.rectangle((512, 0, 768, 256), (r3, g3, b3), None)
d.rectangle((768, 0, 1024, 256), (r4, g4, b4), None)
d.rectangle((1024, 0, 1280, 256), (r5, g5, b5), None)
img.save('./temp/' + str(token) + '.png')
print('done')