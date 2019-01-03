# rgb-cmyk
Convert RGB color to CMYK

### Installation

	'npm install rgb-cmyk'

### Server-side usage

```javascript
var rgbCmyk = require('rgb-cmyk');

rgbCmyk([0,0,0]);
// returns [0, 0, 0, 1]
```

### Clone the repo

git clone [Repository](https://github.com/luthraG/rgb-cmyk.git)


### Examples

```javascript
var rgbCmyk = require('rgb-cmyk');

// Valid values for rgb colors
rgbCmyk(['9.3', '0.7', '0.21']);
// returns [0, 0.925, 0.977, 0.964]

// All zeros for rgb colors
rgbCmyk([0,0,0]]); 
// returns [0, 0, 0, 1]

// Values greater than 255 for rgb colors
rgbCmyk([256, 261, 45]) 
// returns [0, 0, 0.824, 0]

// Values lesser than 0 for rgb colors
rgbCmyk([-251, 13, -39]);
// returns [1, 0, 1, 0.949]
```

### Related
[cmyk-rgb](https://github.com/luthraG/cmyk-rgb.git)

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