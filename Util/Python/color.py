from PIL import Image
import sys

r = sys.argv[1]
g = sys.argv[2]
b = sys.argv[3]
token = sys.argv[4]

img = Image.new('RGB', (256, 256), (int(r), int(g), int(b)))
img.save('./temp/' + str(token) + '.png')
print('done')