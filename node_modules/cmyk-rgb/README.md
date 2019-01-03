# cmyk-rgb
Convert CMYK color to RGB


### Installation

	'npm install cmyk-rgb'

### Server-side usage

```javascript
var cmykRgb = require('cmyk-rgb');

cmykRgb([0.5, 0.3, 0.6, 0]); 
// returns [128, 179, 102]
```

### Clone the repo

git clone https://github.com/luthraG/cmyk-rgb.git

### Examples

```javascript
var cmykRgb = require('cmyk-rgb');

// Valid values for cmyk colors
cmykRgb([0.5, 0.3, 0.6, 0]); 
// returns [128, 179, 102]

// All zeros for cmyk colors
cmykRgb([0,0,0,0]]); 
// returns [255, 255, 255]

// Values greater than 1 for cmyk colors
cmykRgb([12, 13, 14, 15]]); 
// returns [0, 0, 0]

// Values lesser than 0 for cmyk colors
cmykRgb([-12, 13, -14, 0.5]]); 
// returns [128, 0, 128]
```


### License(MIT)

Copyright (c) 2015 [Gaurav Luthra](luthra.zenith@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.