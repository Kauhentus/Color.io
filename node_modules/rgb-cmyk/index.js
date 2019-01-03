var ratify = require('node-ratify');

'use strict';
module.exports = function (rgb) {
	
	if (!ratify.isArray(rgb)) {
		throw new TypeError('Expected an array');
	}

	var red   = rgb[0],
		green = rgb[1],
		blue  = rgb[2];

	if (!ratify.isNumeric(red) || !ratify.isNumeric(green) ||
		!ratify.isNumeric(blue)) {
		throw new TypeError('Invalid rgb color value');
	}

	red   = parseFloat(red);
	green = parseFloat(green);
	blue  = parseFloat(blue);

	if (red > 255)
		red = 255;
	if (green > 255)
		green = 255;
	if (blue > 255)
		blue = 255;

	if (red < 0)
		red = 0;
	if (green < 0)
		green = 0;
	if (blue < 0)
		blue = 0;

	var redDash   = 255,
		greenDash = 255,
		blueDash  = 255;

	redDash   = red / 255;
	greenDash = green / 255;
	blueDash  = blue / 255 ;

	var cyan    = 0,
		magenta = 0,
		yellow  = 0,
		black   = 0;

	black = (1 - Math.max(redDash, greenDash, blueDash));
	var blackFactor = (1 - black);

	if (blackFactor === 0)
		blackFactor = 1;

	cyan    = (1 - redDash - black) / blackFactor;
	magenta = (1 - greenDash - black) / blackFactor;
	yellow  = (1 - blueDash - black) / blackFactor;	

	return [parseFloat(cyan).toFixed(3), parseFloat(magenta).toFixed(3), parseFloat(yellow).toFixed(3), parseFloat(black).toFixed(3)];
};