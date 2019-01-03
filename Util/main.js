const cmyk_rgb = require('cmyk-rgb');
const rgb_cmyk = require('rgb-cmyk');

module.exports = class {
    constructor () {

    }

    hex_2_hex(hex_str){
        return hex_str;
    };
    hex_2_rgb(hex_str){
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex_str = hex_str.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_str);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)
        ] : null;
    };

    hex_2_int(_hex_str){
        let hex_str = _hex_str;
        if(hex_str[0] == '#') hex_str = hex_str.substring(1);
        return parseInt(hex_str, 16).toString();
    };

    hex_2_hsl(hex_str){
        let rgb = this.hex_2_rgb(hex_str);
        if(rgb == null) return null;
        return this.rgb_2_hsl(rgb);
    };

    hex_2_hsv(hex_str){
        let rgb = this.hex_2_rgb(hex_str);
        if(rgb == null) return null;
        return this.rgb_2_hsv(rgb);
    };

    hex_2_cmyk(hex_str){
        let computedC = 0;
        let computedM = 0;
        let computedY = 0;
        let computedK = 0;
       
        let hex = hex_str;
        hex = (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;
       
        if (hex.length != 6) return null;
        if (/[0-9a-f]{6}/i.test(hex) != true) return null;
       
        let r = parseInt(hex.substring(0,2),16); 
        let g = parseInt(hex.substring(2,4),16); 
        let b = parseInt(hex.substring(4,6),16); 
       
        // BLACK
        if (r==0 && g==0 && b==0) {
         computedK = 1;
         return [0,0,0,1];
        }
       
        computedC = 1 - (r/255);
        computedM = 1 - (g/255);
        computedY = 1 - (b/255);
       
        var minCMY = Math.min(computedC,Math.min(computedM,computedY));
       
        computedC = (computedC - minCMY) / (1 - minCMY) ;
        computedM = (computedM - minCMY) / (1 - minCMY) ;
        computedY = (computedY - minCMY) / (1 - minCMY) ;
        computedK = minCMY;
       
        return [Math.round(computedC * 1000) / 1000, Math.round(computedM * 1000) / 1000, Math.round(computedY * 1000) / 1000, Math.round(computedK * 1000) / 1000];
    };

    rgb_2_hex(rgb_arr){
        let valid = true;
        rgb_arr.forEach(value => {
            if(!(0 <= value && value <= 255)){
                valid = false;
            }
        });

        if(valid){
            function toHex(n) {
                n = parseInt(n,10);
                if (isNaN(n)) return "00";
                n = Math.max(0,Math.min(n,255));
                return "0123456789ABCDEF".charAt((n-n%16)/16)
                    + "0123456789ABCDEF".charAt(n%16);
            }
            return toHex(rgb_arr[0])+toHex(rgb_arr[1])+toHex(rgb_arr[2]);
        } else {
            return null;
        }
    };

    rgb_2_rgb(rgb_arr){
        return rgb_arr;
    };

    rgb_2_int(rgb_arr){
        let hex = this.rgb_2_hex(rgb_arr);
        if(hex == null) return null;
        return this.hex_2_int(hex);
    };

    rgb_2_hsl(rgb_arr){
        let valid = true;
        rgb_arr.forEach(value => {
            if(!(0 <= value && value <= 255)){
                valid = false;
            }
        });

        if(valid){  
            var R = rgb_arr[0]/255;
            var G = rgb_arr[1]/255;
            var B = rgb_arr[2]/255;
            var Cmax = Math.max(R,G,B);
            var Cmin = Math.min(R,G,B);
            var delta = Cmax - Cmin;
            var L = (Cmax + Cmin) / 2;
            var S = 0;
            var H = 0;

            if (delta !== 0) {
                S = delta / (1 - Math.abs((2*L) - 1));

                switch (Cmax) {
                    case R:
                        H = ((G - B) / delta) % 6;
                        break;
                    case G:
                        H = ((B - R) / delta) + 2;
                        break;
                    case B:
                        H = ((R - G) / delta) + 4;
                        break;
                }
                H *= 60;
            }

            // Convert negative angles from Hue
            while (H < 0) {
                H += 360;
            }

            return [Math.round(H), Math.round(S * 100), Math.round(L * 100)];
        } else {
            return null;
        }
    };

    rgb_2_hsv(rgb_arr){
        let valid = true;
        rgb_arr.forEach(value => {
            if(!(0 <= value && value <= 255)){
                valid = false;
            }
        });

        if(valid){  
            var rr, gg, bb,
            r = rgb_arr[0] / 255,
            g = rgb_arr[1] / 255,
            b = rgb_arr[2] / 255,
            h, s,
            v = Math.max(r, g, b),
            diff = v - Math.min(r, g, b),
            diffc = function(c){
                return (v - c) / 6 / diff + 1 / 2;
            };

            if (diff == 0) {
                h = s = 0;
            } else {
                s = diff / v;
                rr = diffc(r);
                gg = diffc(g);
                bb = diffc(b);

                if (r === v) {
                    h = bb - gg;
                }else if (g === v) {
                    h = (1 / 3) + rr - bb;
                }else if (b === v) {
                    h = (2 / 3) + gg - rr;
                }
                if (h < 0) {
                    h += 1;
                }else if (h > 1) {
                    h -= 1;
                }
            }

            return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
        } else {
            return null;
        }
    };

    rgb_2_cmyk(rgb_arr){
        let valid = true;
        rgb_arr.map(value => {
            if(!(0 <= value && value <= 255)){
                valid = false;
            }
        });

        if(valid){
            return rgb_cmyk(rgb_arr);
        }  else {
            return null;
        }
    };

    int_2_hex(int){
        let s = "000000" + parseInt(int).toString(16);
        return s.substr(s.length - 6);
    };
    
    int_2_rgb(_int){
        //if (typeof int !== 'number') return null;
        let int = parseInt(_int);
        if (Math.floor(int) !== int) return null;
        if (int < 0 || int > 16777215) return null;

        var red = int >> 16;
        var green = int - (red << 16) >> 8;
        var blue = int - (red << 16) - (green << 8);

        return [red, green, blue];
    };

    int_2_int(int){
        return int;
    };

    int_2_hsl(int){
        let rgb = this.int_2_rgb(int);
        if(rgb == null) return null;
        return this.rgb_2_hsl(rgb);
    };

    int_2_hsv(int){
        let rgb = this.int_2_rgb(int);
        if(rgb == null) return null;
        return this.rgb_2_hsv(rgb);
    };

    int_2_cmyk(int){
        let rgb = this.int_2_rgb(int);
        if(rgb == null) return null;
        return this.rgb_2_cmyk(rgb);
    };

    hsl_2_hex(hsl_arr){
        let rgb = this.hsl_2_rgb(hsl_arr);
        if(rgb == null) return null;
        return this.rgb_2_hex(rgb);
    };

    hsl_2_rgb(hsl_arr){
        let valid = true;
        if(0 > hsl_arr[0] || hsl_arr[0] > 360) valid = false;
        else if(0 > hsl_arr[1] || hsl_arr[1] > 100) valid = false;
        else if(0 > hsl_arr[2] || hsl_arr[2] > 100) valid = false;

        if(valid){  
            let r, g, b;
            let h = hsl_arr[0] / 360, s = hsl_arr[1] / 100, l = hsl_arr[2] / 100;

            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }
            
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
            
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            
            return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];  
        } else {
            return null;
        }
    };

    hsl_2_int(hsl_arr){
        let rgb = this.hsl_2_rgb(hsl_arr);
        if(rgb == null) return null;
        return this.rgb_2_int(rgb);
    };

    hsl_2_hsl(hsl_arr){
        return hsl_arr;
    };

    hsl_2_hsv(hsl_arr){
        let rgb = this.hsl_2_rgb(hsl_arr);
        if(rgb == null) return null;
        return this.rgb_2_hsv(rgb);
    };

    hsl_2_cmyk(hsl_arr){
        let rgb = this.hsl_2_rgb(hsl_arr);
        if(rgb == null) return null;
        return this.rgb_2_cmyk(rgb);
    };

    hsv_2_hex(hsv_arr){
        let rgb = this.hsv_2_rgb(hsv_arr);
        if(rgb == null) return null;
        return this.rgb_2_hex(rgb);
    };
    hsv_2_rgb(hsv_arr){
        let valid = true;
        if(0 > hsv_arr[0] || hsv_arr[0] > 360) valid = false;
        else if(0 > hsv_arr[1] || hsv_arr[1] > 100) valid = false;
        else if(0 > hsv_arr[2] || hsv_arr[2] > 100) valid = false;

        if(valid){
            var r, g, b, i, f, p, q, t;
            let h = hsv_arr[0] / 360, s = hsv_arr[1] / 100, v = hsv_arr[2] / 100;
            
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        } else {
            return null;
        }
    };

    hsv_2_int(hsv_arr){
        let rgb = this.hsv_2_rgb(hsv_arr);
        if(rgb == null) return null;
        return this.rgb_2_int(rgb);
    };

    hsv_2_hsl(hsv_arr){
        let rgb = this.hsv_2_rgb(hsv_arr);
        if(rgb == null) return null;
        return this.rgb_2_hsl(rgb);
    };

    hsv_2_hsv(hsv_arr){
        return hsv_arr;
    };

    hsv_2_cmyk(hsv_arr){
        let rgb = this.hsv_2_rgb(hsv_arr);
        if(rgb == null) return null;
        return this.rgb_2_cmyk(rgb);
    };

    cmyk_2_hex(cmyk_arr){
        let rgb = this.cmyk_2_rgb(cmyk_arr);
        if(rgb == null) return null;
        return this.rgb_2_hex(rgb);
    };
    cmyk_2_rgb(cmyk_arr){
        let valid = true;
        cmyk_arr.forEach(value => {
            if(!(0 <= value && value <= 1)){
                valid = false;
            }
        });

        if(valid){
            return cmyk_rgb(cmyk_arr);
        } else {
            return null;
        }
    };

    cmyk_2_int(cmyk_arr){
        let rgb = this.cmyk_2_rgb(cmyk_arr);
        if(rgb == null) return null;
        return this.rgb_2_int(rgb);
    };

    cmyk_2_hsl(cmyk_arr){
        let rgb = this.cmyk_2_rgb(cmyk_arr);
        if(rgb == null) return null;
        return this.rgb_2_hsl(rgb);
    };

    cmyk_2_hsv(cmyk_arr){
        let rgb = this.cmyk_2_rgb(cmyk_arr);
        if(rgb == null) return null;
        return this.rgb_2_hsv(rgb);
    };

    cmyk_2_cmyk(cmyk_arr){
        return cmyk_arr;
    };
}
// credits:
// https://gist.github.com/mjackson/5311256