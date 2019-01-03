var ratify = require('node-ratify');

'use strict';
module.exports = function (cmyk) {
	
	if (!ratify.isArray(cmyk)) {
		throw new TypeError('Expected an array');
	}

	var cyan    = cmyk[0],
		magenta = cmyk[1],
		yellow  = cmyk[2],
		black   = cmyk[3];

	if (!ratify.isNumeric(cyan) || !ratify.isNumeric(magenta) ||
		!ratify.isNumeric(yellow) || !ratify.isNumeric(black)) {
		throw new TypeError('Invalid cmyk color value');
	}

	cyan    = parseFloat(cyan);
	magenta = parseFloat(magenta);
	yellow  = parseFloat(yellow);
	black   = parseFloat(black);

	if (black > 1) {
		black = 1;
	} else { 
		if (cyan > 1)
			cyan = 1;
		if (magenta > 1)
			magenta = 1;
		if (yellow > 1)
			yellow = 1;
	}

	if (cyan < 0)
		cyan = 0;
	if (magenta < 0)
		magenta = 0;
	if (yellow < 0)
		yellow = 0;
	if (black < 0)
		black = 0;

	var red   = 255,
		green = 255,
		blue  = 255;

	var blackFactor = (1 - black);

	red   = Math.ceil(255 * (1 - cyan) * blackFactor);
	green = Math.ceil(255 * (1 - magenta) * blackFactor);
	blue  = Math.ceil(255 * (1 - yellow) * blackFactor);

	return [red, green, blue];
};