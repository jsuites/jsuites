
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jSuites = factory();
}(this, (function () {

var jSuites;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 195:
/***/ (function(module) {

/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Organogram
 *
 * MIT License
 */

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    return (function(str) {
        function int64(msint_32, lsint_32) {
            this.highOrder = msint_32;
            this.lowOrder = lsint_32;
        }

        var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
            new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
            new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
            new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

        var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
            new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
            new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
            new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
            new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
            new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
            new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
            new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
            new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
            new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
            new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
            new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
            new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
            new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
            new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
            new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
            new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
            new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
            new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
            new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
            new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
            new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
            new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
            new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
            new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
            new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
            new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
            new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
            new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
            new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
            new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
            new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
            new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
            new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
            new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
            new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
            new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
            new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
            new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
            new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        var charsize = 8;

        function utf8_encode(str) {
            return unescape(encodeURIComponent(str));
        }

        function str2binb(str) {
            var bin = [];
            var mask = (1 << charsize) - 1;
            var len = str.length * charsize;

            for (var i = 0; i < len; i += charsize) {
                bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
            }

            return bin;
        }

        function binb2hex(binarray) {
            var hex_tab = "0123456789abcdef";
            var str = "";
            var length = binarray.length * 4;
            var srcByte;

            for (var i = 0; i < length; i += 1) {
                srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
                str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
            }

            return str;
        }

        function safe_add_2(x, y) {
            var lsw, msw, lowOrder, highOrder;

            lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
            msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
            lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
            msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
            highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            return new int64(highOrder, lowOrder);
        }

        function safe_add_4(a, b, c, d) {
            var lsw, msw, lowOrder, highOrder;

            lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
            msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
            lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
            msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
            highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            return new int64(highOrder, lowOrder);
        }

        function safe_add_5(a, b, c, d, e) {
            var lsw, msw, lowOrder, highOrder;

            lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
            msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
            lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
            msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
            highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            return new int64(highOrder, lowOrder);
        }

        function maj(x, y, z) {
            return new int64(
                (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
                (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
            );
        }

        function ch(x, y, z) {
            return new int64(
                (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
                (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
            );
        }

        function rotr(x, n) {
            if (n <= 32) {
                return new int64(
                    (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
                    (x.lowOrder >>> n) | (x.highOrder << (32 - n))
                );
            } else {
                return new int64(
                    (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
                    (x.highOrder >>> n) | (x.lowOrder << (32 - n))
                );
            }
        }

        function sigma0(x) {
            var rotr28 = rotr(x, 28);
            var rotr34 = rotr(x, 34);
            var rotr39 = rotr(x, 39);

            return new int64(
                rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
                rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
            );
        }

        function sigma1(x) {
            var rotr14 = rotr(x, 14);
            var rotr18 = rotr(x, 18);
            var rotr41 = rotr(x, 41);

            return new int64(
                rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
                rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
            );
        }

        function gamma0(x) {
            var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7);

            return new int64(
                rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
                rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
            );
        }

        function gamma1(x) {
            var rotr19 = rotr(x, 19);
            var rotr61 = rotr(x, 61);
            var shr6 = shr(x, 6);

            return new int64(
                rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
                rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
            );
        }

        function shr(x, n) {
            if (n <= 32) {
                return new int64(
                    x.highOrder >>> n,
                    x.lowOrder >>> n | (x.highOrder << (32 - n))
                );
            } else {
                return new int64(
                    0,
                    x.highOrder << (32 - n)
                );
            }
        }

        var str = utf8_encode(str);
        var strlen = str.length*charsize;
        str = str2binb(str);

        str[strlen >> 5] |= 0x80 << (24 - strlen % 32);
        str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

        for (var i = 0; i < str.length; i += 32) {
            a = H[0];
            b = H[1];
            c = H[2];
            d = H[3];
            e = H[4];
            f = H[5];
            g = H[6];
            h = H[7];

            for (var j = 0; j < 80; j++) {
                if (j < 16) {
                    W[j] = new int64(str[j*2 + i], str[j*2 + i + 1]);
                } else {
                    W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]);
                }

                T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
                T2 = safe_add_2(sigma0(a), maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add_2(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add_2(T1, T2);
            }

            H[0] = safe_add_2(a, H[0]);
            H[1] = safe_add_2(b, H[1]);
            H[2] = safe_add_2(c, H[2]);
            H[3] = safe_add_2(d, H[3]);
            H[4] = safe_add_2(e, H[4]);
            H[5] = safe_add_2(f, H[5]);
            H[6] = safe_add_2(g, H[6]);
            H[7] = safe_add_2(h, H[7]);
        }

        var binarray = [];
        for (var i = 0; i < H.length; i++) {
            binarray.push(H[i].highOrder);
            binarray.push(H[i].lowOrder);
        }

        return binb2hex(binarray);
    });

})));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ jsuites; }
});

;// CONCATENATED MODULE: ./src/utils/dictionary.js
// Update dictionary
var setDictionary = function(d) {
    if (! document.dictionary) {
        document.dictionary = {}
    }
    // Replace the key into the dictionary and append the new ones
    var t = null;
    var i = null;
    var k = Object.keys(d);
    for (i = 0; i < k.length; i++) {
        document.dictionary[k[i]] = d[k[i]];
    }
}

// Translate
var translate = function(t) {
    if (typeof(document) !== "undefined" && document.dictionary) {
        return document.dictionary[t] || t;
    } else {
        return t;
    }
}


/* harmony default export */ var dictionary = ({ setDictionary, translate });
;// CONCATENATED MODULE: ./src/utils/tracking.js
 const Tracking = function(component, state) {
    if (state === true) {
        window['jSuitesStateControl'] = window['jSuitesStateControl'].filter(function(v) {
            return v !== null;
        });

        // Start after all events
        setTimeout(function() {
            window['jSuitesStateControl'].push(component);
        }, 0);

    } else {
        var index = window['jSuitesStateControl'].indexOf(component);
        if (index >= 0) {
            window['jSuitesStateControl'].splice(index, 1);
        }
    }
}

/* harmony default export */ var tracking = (Tracking);
;// CONCATENATED MODULE: ./src/utils/helpers.js
var Helpers = {};

// Two digits
Helpers.two = function(value) {
    value = '' + value;
    if (value.length == 1) {
        value = '0' + value;
    }
    return value;
}

Helpers.focus = function(el) {
    if (el.textContent.length) {
        // Handle contenteditable elements
        const range = document.createRange();
        const sel = window.getSelection();

        let node = el;
        // Go as deep as possible to the last text node
        while (node.lastChild) node = node.lastChild;
        // Ensure it's a text node
        if (node.nodeType === Node.TEXT_NODE) {
            range.setStart(node, node.length);
        } else {
            range.setStart(node, node.childNodes.length);
        }
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        el.scrollLeft = el.scrollWidth;
    }
}

Helpers.isNumeric = (function (num) {
    if (typeof(num) === 'string') {
        num = num.trim();
    }
    return !isNaN(num) && num !== null && num !== '';
});

Helpers.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

Helpers.getNode = function() {
    var node = document.getSelection().anchorNode;
    if (node) {
        return (node.nodeType == 3 ? node.parentNode : node);
    } else {
        return null;
    }
}
/**
 * Generate hash from a string
 */
Helpers.hash = function(str) {
    var hash = 0, i, chr;

    if (str.length === 0) {
        return hash;
    } else {
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            if (chr > 32) {
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
        }
    }
    return hash;
}

/**
 * Generate a random color
 */
Helpers.randomColor = function(h) {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = [], c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb.push(("00" + c).substr(c.length));
    }

    // Return hex
    if (h == true) {
        return '#' + Helpers.two(rgb[0].toString(16)) + Helpers.two(rgb[1].toString(16)) + Helpers.two(rgb[2].toString(16));
    }

    return rgb;
}

Helpers.getWindowWidth = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x;
}

Helpers.getWindowHeight = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return  y;
}

Helpers.getPosition = function(e) {
    if (e.changedTouches && e.changedTouches[0]) {
        var x = e.changedTouches[0].pageX;
        var y = e.changedTouches[0].pageY;
    } else {
        var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    return [ x, y ];
}

Helpers.click = function(el) {
    if (el.click) {
        el.click();
    } else {
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    }
}

Helpers.findElement = function(element, condition) {
    var foundElement = false;

    function path (element) {
        if (element && ! foundElement) {
            if (typeof(condition) == 'function') {
                foundElement = condition(element)
            } else if (typeof(condition) == 'string') {
                if (element.classList && element.classList.contains(condition)) {
                    foundElement = element;
                }
            }
        }

        if (element.parentNode && ! foundElement) {
            path(element.parentNode);
        }
    }

    path(element);

    return foundElement;
}

/* harmony default export */ var helpers = (Helpers);
;// CONCATENATED MODULE: ./src/utils/path.js
const isValidPathObj = function(o) {
    return typeof o === 'object' || typeof o === 'function';
}

function Path(pathString, value, remove) {
    // Ensure the path is a valid, non-empty string
    if (typeof pathString !== 'string' || pathString.length === 0) {
        return undefined;
    }

    // Split the path into individual keys and filter out empty keys
    const keys = pathString.split('.');
    if (keys.length === 0) {
        return undefined;
    }

    // Start with the root object
    let currentObject = this;

    // Read mode: retrieve a value
    if (typeof value === 'undefined' && typeof remove === 'undefined') {
        // Traverse all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            // Check if the current object is valid and has the key
            if (
                currentObject != null &&
                isValidPathObj(currentObject) &&
                Object.prototype.hasOwnProperty.call(currentObject, key)
            ) {
                currentObject = currentObject[key];
            } else {
                // Return undefined if the path is invalid or currentObject is null/undefined
                return undefined;
            }
        }
        // Return the final value
        return currentObject;
    }

    // Write mode: set or delete a value
    // Traverse all keys except the last one
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // Check if the current object is invalid (null/undefined or non-object)
        if (currentObject == null || ! isValidPathObj(currentObject)) {
            console.warn(`Cannot set value: path '${pathString}' blocked by invalid object at '${key}'`);
            return false;
        }

        // If the key exists but is null/undefined or a non-object, replace it with an empty object
        if (
            Object.prototype.hasOwnProperty.call(currentObject, key) &&
            (currentObject[key] == null || ! isValidPathObj(currentObject[key]))
        ) {
            currentObject[key] = {};
        } else if (!Object.prototype.hasOwnProperty.call(currentObject, key)) {
            // If the key doesn't exist, create an empty object
            currentObject[key] = {};
        }

        // Move to the next level
        currentObject = currentObject[key];
    }

    // Handle the final key
    const finalKey = keys[keys.length - 1];

    // Check if the current object is valid for setting/deleting
    if (currentObject == null || ! isValidPathObj(currentObject)) {
        return false;
    }

    // Delete the property if remove is true
    if (remove === true) {
        if (Object.prototype.hasOwnProperty.call(currentObject, finalKey)) {
            delete currentObject[finalKey];
            return true;
        }
        return false; // Nothing to delete
    }

    // Set the value
    currentObject[finalKey] = value;
    return true;
}
;// CONCATENATED MODULE: ./src/utils/sorting.js
function Sorting(el, options) {
    var obj = {};
    obj.options = {};

    var defaults = {
        pointer: null,
        direction: null,
        ondragstart: null,
        ondragend: null,
        ondrop: null,
    }

    var dragElement = null;

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.classList.add('jsorting');

    el.addEventListener('dragstart', function(e) {
        let target = e.target;
        if (target.nodeType === 3) {
            if (target.parentNode.getAttribute('draggable') === 'true') {
                target = target.parentNode;
            } else {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }

        if (target.getAttribute('draggable') === 'true') {
            let position = Array.prototype.indexOf.call(target.parentNode.children, target);
            dragElement = {
                element: target,
                o: position,
                d: position
            }
            target.style.opacity = '0.25';

            if (typeof (obj.options.ondragstart) == 'function') {
                obj.options.ondragstart(el, target, e);
            }

            e.dataTransfer.setDragImage(target,0,0);
        }
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (getElement(e.target)) {
                if (e.target.getAttribute('draggable') == 'true' && dragElement.element != e.target) {
                    if (!obj.options.direction) {
                        var condition = e.target.clientHeight / 2 > e.offsetY;
                    } else {
                        var condition = e.target.clientWidth / 2 > e.offsetX;
                    }

                    if (condition) {
                        e.target.parentNode.insertBefore(dragElement.element, e.target);
                    } else {
                        e.target.parentNode.insertBefore(dragElement.element, e.target.nextSibling);
                    }

                    dragElement.d = Array.prototype.indexOf.call(e.target.parentNode.children, dragElement.element);
                }
            }
        }
    });

    el.addEventListener('dragleave', function(e) {
        e.preventDefault();
    });

    el.addEventListener('dragend', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (typeof(obj.options.ondragend) == 'function') {
                obj.options.ondragend(el, dragElement.element, e);
            }

            // Cancelled put element to the original position
            if (dragElement.o < dragElement.d) {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o]);
            } else {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o].nextSibling);
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (dragElement.o !== dragElement.d) {
                if (typeof (obj.options.ondrop) == 'function') {
                    obj.options.ondrop(el, dragElement.o, dragElement.d, dragElement.element, e.target, e);
                }
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    var getElement = function(element) {
        var sorting = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('jsorting')) {
                    sorting = true;
                }
            }

            if (! sorting) {
                path(element.parentNode);
            }
        }

        path(element);

        return sorting;
    }

    for (var i = 0; i < el.children.length; i++) {
        if (! el.children[i].hasAttribute('draggable')) {
            el.children[i].setAttribute('draggable', 'true');
        }
    }

    el.val = function() {
        var id = null;
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            if (id = el.children[i].getAttribute('data-id')) {
                data.push(id);
            }
        }
        return data;
    }

    return el;
}
;// CONCATENATED MODULE: ./src/utils/lazyloading.js
function LazyLoading(el, options) {
    var obj = {}

    // Mandatory options
    if (! options.loadUp || typeof(options.loadUp) != 'function') {
        options.loadUp = function() {
            return false;
        }
    }
    if (! options.loadDown || typeof(options.loadDown) != 'function') {
        options.loadDown = function() {
            return false;
        }
    }
    // Timer ms
    if (! options.timer) {
        options.timer = 100;
    }

    // Timer
    var timeControlLoading = null;

    // Controls
    var scrollControls = function(e) {
        if (timeControlLoading == null) {
            var event = false;
            var scrollTop = el.scrollTop;
            if (el.scrollTop + (el.clientHeight * 2) >= el.scrollHeight) {
                if (options.loadDown()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop - (el.clientHeight);
                    }
                    event = true;
                }
            } else if (el.scrollTop <= el.clientHeight) {
                if (options.loadUp()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop + (el.clientHeight);
                    }
                    event = true;
                }
            }

            timeControlLoading = setTimeout(function() {
                timeControlLoading = null;
            }, options.timer);

            if (event) {
                if (typeof(options.onupdate) == 'function') {
                    options.onupdate();
                }
            }
        }
    }

    // Onscroll
    el.onscroll = function(e) {
        scrollControls(e);
    }

    el.onwheel = function(e) {
        scrollControls(e);
    }

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/ajax.js
function Ajax() {
    var Component = (function(options, complete) {
        if (Array.isArray(options)) {
            // Create multiple request controller
            var multiple = {
                instance: [],
                complete: complete,
            }

            if (options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    options[i].multiple = multiple;
                    multiple.instance.push(Component(options[i]));
                }
            }

            return multiple;
        }

        if (! options.data) {
            options.data = {};
        }

        if (options.type) {
            options.method = options.type;
        }

        // Default method
        if (! options.method) {
            options.method = 'GET';
        }

        // Default type
        if (! options.dataType) {
            options.dataType = 'json';
        }

        if (options.data) {
            // Parse object to variables format
            var parseData = function (value, key) {
                var vars = [];
                if (value) {
                    var keys = Object.keys(value);
                    if (keys.length) {
                        for (var i = 0; i < keys.length; i++) {
                            if (key) {
                                var k = key + '[' + keys[i] + ']';
                            } else {
                                var k = keys[i];
                            }

                            if (value[k] instanceof FileList) {
                                vars[k] = value[keys[i]];
                            } else if (value[keys[i]] === null || value[keys[i]] === undefined) {
                                vars[k] = '';
                            } else if (typeof(value[keys[i]]) == 'object') {
                                var r = parseData(value[keys[i]], k);
                                var o = Object.keys(r);
                                for (var j = 0; j < o.length; j++) {
                                    vars[o[j]] = r[o[j]];
                                }
                            } else {
                                vars[k] = value[keys[i]];
                            }
                        }
                    }
                }

                return vars;
            }

            var d = parseData(options.data);
            var k = Object.keys(d);

            // Data form
            if (options.method == 'GET') {
                if (k.length) {
                    var data = [];
                    for (var i = 0; i < k.length; i++) {
                        data.push(k[i] + '=' + encodeURIComponent(d[k[i]]));
                    }

                    if (options.url.indexOf('?') < 0) {
                        options.url += '?';
                    }
                    options.url += data.join('&');
                }
            } else {
                var data = new FormData();
                for (var i = 0; i < k.length; i++) {
                    if (d[k[i]] instanceof FileList) {
                        if (d[k[i]].length) {
                            for (var j = 0; j < d[k[i]].length; j++) {
                                data.append(k[i], d[k[i]][j], d[k[i]][j].name);
                            }
                        }
                    } else {
                        data.append(k[i], d[k[i]]);
                    }
                }
            }
        }

        var httpRequest = new XMLHttpRequest();
        httpRequest.open(options.method, options.url, true);

        if (options.requestedWith) {
            httpRequest.setRequestHeader('X-Requested-With', options.requestedWith);
        } else {
            if (options.requestedWith !== false) {
                httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        }

        // Content type
        if (options.contentType) {
            httpRequest.setRequestHeader('Content-Type', options.contentType);
        }

        // Headers
        if (options.method === 'POST') {
            httpRequest.setRequestHeader('Accept', 'application/json');
        } else {
            if (options.dataType === 'blob') {
                httpRequest.responseType = "blob";
            } else {
                if (! options.contentType) {
                    if (options.dataType === 'json') {
                        httpRequest.setRequestHeader('Content-Type', 'text/json');
                    } else if (options.dataType === 'html') {
                        httpRequest.setRequestHeader('Content-Type', 'text/html');
                    }
                }
            }
        }

        // No cache
        if (options.cache !== true) {
            httpRequest.setRequestHeader('pragma', 'no-cache');
            httpRequest.setRequestHeader('cache-control', 'no-cache');
        }

        // Authentication
        if (options.withCredentials === true) {
            httpRequest.withCredentials = true
        }

        // Before send
        if (typeof(options.beforeSend) == 'function') {
            options.beforeSend(httpRequest);
        }

        // Before send
        if (typeof(Component.beforeSend) == 'function') {
            Component.beforeSend(httpRequest);
        }

        if (document.ajax && typeof(document.ajax.beforeSend) == 'function') {
            document.ajax.beforeSend(httpRequest);
        }

        httpRequest.onerror = function() {
            if (options.error && typeof(options.error) == 'function') {
                options.error({
                    message: 'Network error: Unable to reach the server.',
                    status: 0
                });
            }
        }

        httpRequest.ontimeout = function() {
            if (options.error && typeof(options.error) == 'function') {
                options.error({
                    message: 'Request timed out after ' + httpRequest.timeout + 'ms.',
                    status: 0
                });
            }
        }

        httpRequest.onload = function() {
            if (httpRequest.status >= 200 && httpRequest.status < 300) {
                if (options.dataType === 'json') {
                    try {
                        var result = JSON.parse(httpRequest.responseText);

                        if (options.success && typeof(options.success) == 'function') {
                            options.success(result);
                        }
                    } catch(err) {
                        if (options.error && typeof(options.error) == 'function') {
                            options.error(err, result);
                        }
                    }
                } else {
                    if (options.dataType === 'blob') {
                        var result = httpRequest.response;
                    } else {
                        var result = httpRequest.responseText;
                    }

                    if (options.success && typeof(options.success) == 'function') {
                        options.success(result);
                    }
                }
            } else {
                if (options.error && typeof(options.error) == 'function') {
                    options.error(httpRequest.responseText, httpRequest.status);
                }
            }

            // Global queue
            if (Component.queue && Component.queue.length > 0) {
                Component.send(Component.queue.shift());
            }

            // Global complete method
            if (Component.requests && Component.requests.length) {
                // Get index of this request in the container
                var index = Component.requests.indexOf(httpRequest);
                // Remove from the ajax requests container
                Component.requests.splice(index, 1);
                // Deprecated: Last one?
                if (! Component.requests.length) {
                    // Object event
                    if (options.complete && typeof(options.complete) == 'function') {
                        options.complete(result);
                    }
                }
                // Group requests
                if (options.group) {
                    if (Component.oncomplete && typeof(Component.oncomplete[options.group]) == 'function') {
                        if (! Component.pending(options.group)) {
                            Component.oncomplete[options.group]();
                            Component.oncomplete[options.group] = null;
                        }
                    }
                }
                // Multiple requests controller
                if (options.multiple && options.multiple.instance) {
                    // Get index of this request in the container
                    var index = options.multiple.instance.indexOf(httpRequest);
                    // Remove from the ajax requests container
                    options.multiple.instance.splice(index, 1);
                    // If this is the last one call method complete
                    if (! options.multiple.instance.length) {
                        if (options.multiple.complete && typeof(options.multiple.complete) == 'function') {
                            options.multiple.complete(result);
                        }
                    }
                }
            }
        }

        // Keep the options
        httpRequest.options = options;
        // Data
        httpRequest.data = data;

        // Queue
        if (options.queue === true && Component.requests.length > 0) {
            Component.queue.push(httpRequest);
        } else {
            Component.send(httpRequest)
        }

        return httpRequest;
    });

    Component.send = function(httpRequest) {
        if (httpRequest.data) {
            if (Array.isArray(httpRequest.data)) {
                httpRequest.send(httpRequest.data.join('&'));
            } else {
                httpRequest.send(httpRequest.data);
            }
        } else {
            httpRequest.send();
        }

        Component.requests.push(httpRequest);
    }

    Component.exists = function(url, __callback) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status) {
            __callback(http.status);
        }
    }

    Component.pending = function(group) {
        var n = 0;
        var o = Component.requests;
        if (o && o.length) {
            for (var i = 0; i < o.length; i++) {
                if (! group || group == o[i].options.group) {
                    n++
                }
            }
        }
        return n;
    }

    Component.oncomplete = {};
    Component.requests = [];
    Component.queue = [];

    return Component
}

/* harmony default export */ var ajax = (Ajax());
;// CONCATENATED MODULE: ./src/plugins/animation.js
function Animation() {
    const Component = {
        loading: {}
    }
    
    Component.loading.show = function(timeout) {
        if (! Component.loading.element) {
            Component.loading.element = document.createElement('div');
            Component.loading.element.className = 'jloading';
        }
        document.body.appendChild(Component.loading.element);
    
        // Max timeout in seconds
        if (timeout > 0) {
            setTimeout(function() {
                Component.loading.hide();
            }, timeout * 1000)
        }
    }
    
    Component.loading.hide = function() {
        if (Component.loading.element && Component.loading.element.parentNode) {
            document.body.removeChild(Component.loading.element);
        }
    }
    
    Component.slideLeft = function (element, direction, done) {
        if (direction == true) {
            element.classList.add('jslide-left-in');
            setTimeout(function () {
                element.classList.remove('jslide-left-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-left-out');
            setTimeout(function () {
                element.classList.remove('jslide-left-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideRight = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-right-in');
            setTimeout(function () {
                element.classList.remove('jslide-right-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-right-out');
            setTimeout(function () {
                element.classList.remove('jslide-right-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideTop = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-top-in');
            setTimeout(function () {
                element.classList.remove('jslide-top-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-top-out');
            setTimeout(function () {
                element.classList.remove('jslide-top-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideBottom = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-bottom-in');
            setTimeout(function () {
                element.classList.remove('jslide-bottom-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-bottom-out');
            setTimeout(function () {
                element.classList.remove('jslide-bottom-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 100);
        }
    }
    
    Component.fadeIn = function (element, done) {
        element.style.display = '';
        element.classList.add('jfade-in');
        setTimeout(function () {
            element.classList.remove('jfade-in');
            if (typeof (done) == 'function') {
                done();
            }
        }, 2000);
    }
    
    Component.fadeOut = function (element, done) {
        element.classList.add('jfade-out');
        setTimeout(function () {
            element.style.display = 'none';
            element.classList.remove('jfade-out');
            if (typeof (done) == 'function') {
                done();
            }
        }, 1000);
    }

    return Component;
}

/* harmony default export */ var animation = (Animation());
;// CONCATENATED MODULE: ./src/utils/helpers.date.js



function HelpersDate() {
    var Component = {};

    Component.now = function (date, dateOnly) {
        var y = null;
        var m = null;
        var d = null;
        var h = null;
        var i = null;
        var s = null;

        if (Array.isArray(date)) {
            y = date[0];
            m = date[1];
            d = date[2];
            h = date[3];
            i = date[4];
            s = date[5];
        } else {
            if (! date) {
                date = new Date();
            }
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            i = date.getMinutes();
            s = date.getSeconds();
        }

        if (dateOnly == true) {
            return helpers.two(y) + '-' + helpers.two(m) + '-' + helpers.two(d);
        } else {
            return helpers.two(y) + '-' + helpers.two(m) + '-' + helpers.two(d) + ' ' + helpers.two(h) + ':' + helpers.two(i) + ':' + helpers.two(s);
        }
    }

    Component.toArray = function (value) {
        var date = value.split(((value.indexOf('T') !== -1) ? 'T' : ' '));
        var time = date[1];
        var date = date[0].split('-');
        var y = parseInt(date[0]);
        var m = parseInt(date[1]);
        var d = parseInt(date[2]);
        var h = 0;
        var i = 0;

        if (time) {
            time = time.split(':');
            h = parseInt(time[0]);
            i = parseInt(time[1]);
        }
        return [y, m, d, h, i, 0];
    }

    var excelInitialTime = Date.UTC(1900, 0, 0);
    var excelLeapYearBug = Date.UTC(1900, 1, 29);
    var millisecondsPerDay = 86400000;

    /**
     * Date to number
     */
    Component.dateToNum = function (jsDate) {
        if (typeof (jsDate) === 'string') {
            jsDate = new Date(jsDate + '  GMT+0');
        }
        var jsDateInMilliseconds = jsDate.getTime();
        if (jsDateInMilliseconds >= excelLeapYearBug) {
            jsDateInMilliseconds += millisecondsPerDay;
        }
        jsDateInMilliseconds -= excelInitialTime;

        return jsDateInMilliseconds / millisecondsPerDay;
    }

    /**
     * Number to date
     *
     * IMPORTANT: Excel incorrectly considers 1900 to be a leap year
     */
    Component.numToDate = function (excelSerialNumber) {
        var jsDateInMilliseconds = excelInitialTime + excelSerialNumber * millisecondsPerDay;
        if (jsDateInMilliseconds >= excelLeapYearBug) {
            jsDateInMilliseconds -= millisecondsPerDay;
        }

        const d = new Date(jsDateInMilliseconds);

        var date = [
            d.getUTCFullYear(),
            d.getUTCMonth() + 1,
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
        ];

        return Component.now(date);
    }

    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    Object.defineProperty(Component, 'weekdays', {
        get: function () {
            return weekdays.map(function(v) {
                return dictionary.translate(v);
            });
        },
    });

    Object.defineProperty(Component, 'weekdaysShort', {
        get: function () {
            return weekdays.map(function(v) {
                return dictionary.translate(v).substring(0,3);
            });
        },
    });

    Object.defineProperty(Component, 'months', {
        get: function () {
            return months.map(function(v) {
                return dictionary.translate(v);
            });
        },
    });

    Object.defineProperty(Component, 'monthsShort', {
        get: function () {
            return months.map(function(v) {
                return dictionary.translate(v).substring(0,3);
            });
        },
    });

    return Component;
}

/* harmony default export */ var helpers_date = (HelpersDate());
;// CONCATENATED MODULE: ./src/plugins/mask.js
/*
 Add '*' as a valid symbol
 Formats such as 'DD"th of "MMMM", "YYYY'
 Conditional masking
 (000) 00000-00
 $ (#,##0.00);$ (-#,##0.00)
 $ (-#,##0.00)
 j.mask.render(0, { mask: 'mm:ss.0' }
 j.mask.render(0, { mask: '[h]:mm:ss' }, true)
 */



function Mask() {
    // Currency
    const tokens = {
        // Text
        text: [ '@', '&' ],
        // Number
        fraction: [ '#{0,1}.*?\\?+\\/[0-9?]+' ],
        // Currency tokens
        currency: [ '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?' ],
        // Scientific
        scientific: [ '[0#]+([.,]{1}0*#*)?E{1}\\+0+' ],
        // Percentage
        percentage: [ '[0#]+([.,]{1}0*#*)?%' ],
        // Number
        numeric: [ '[0#]+([.,]{1}0*#*)?', '#+' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'MONTH', 'MON', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'S', 'Y', 'M', 'I' ],
        // Other
        general: [ 'A', '0', '\\?', '\\*', ',,M', ',,,B', '[0-9a-zA-Z\\$]+', '_\\(', '_\\)', '\\(', '\\)', '_-', '.']
    }

    // Labels
    const weekDaysFull = helpers_date.weekdays;
    const weekDays = helpers_date.weekdaysShort;
    const monthsFull = helpers_date.months;
    const months = helpers_date.monthsShort;

    // Helpers

    /**
    * Returns if the given value is considered blank
    */
    const isBlank = function(v) {
        return v === null || v === '' || typeof(v) === 'undefined';
    }

    /**
    * Receives a string from a method type and returns if it's a numeric method
    */
    const isNumeric = function(t) {
        return t === 'currency' || t === 'percentage' || t === '' || t === 'numeric';
    }

    const adjustPrecision = function(num) {
        if (typeof num === 'number' && ! Number.isInteger(num)) {
            const v = num.toString().split('.');

            if (v[1] && v[1].length > 10) {
                let t0 = 0;
                const t1 = v[1][v[1].length - 2];

                if (t1 == 0 || t1 == 9) {
                    for (let i = v[1].length - 2; i > 0; i--) {
                        if (t0 >= 0 && v[1][i] == t1) {
                            t0++;
                            if (t0 > 6) {
                                break;
                            }
                        } else {
                            t0 = 0;
                            break;
                        }
                    }

                    if (t0) {
                        return parseFloat(parseFloat(num).toFixed(v[1].length - 1));
                    }
                }
            }
        }

        return num;
    }

    /**
     * Get the decimal defined in the mask configuration
     */
    const getDecimal = function(v) {
        let decimal;
        if (this.decimal) {
            decimal = this.decimal;
        } else {
            if (this.locale) {
                let t = Intl.NumberFormat(this.locale).format(1.1);
                decimal = t[1];
            } else {
                if (! v) {
                    v = this.mask;
                }

                // Fixed regex: 0* means zero or more 0s before decimal separator
                let e = new RegExp('0*([,.])0+', 'ig');
                let t = e.exec(v);
                if (t && t[1] && t[1].length === 1) {
                    decimal = t[1];
                } else {
                    // Try the second pattern for # formats
                    e = new RegExp('#{1}(.{1})#+', 'ig');
                    t = e.exec(v);
                    if (t && t[1] && t[1].length === 1) {
                        if (t[1] === ',') {
                            decimal = '.';
                        } else if (t[1] === "'" || t[1] === '.') {
                            decimal = ',';
                        }
                    }
                }

                if (! decimal) {
                    decimal = '1.1'.toLocaleString().substring(1, 2);
                }
            }
        }

        if (decimal) {
            return decimal;
        } else {
            return null;
        }
    }

    /**
     * Caret position getter
     * `this` in this function should be the element with a caret
     */
    const getCaretPosition = function(editableDiv) {
        let caretPos = 0;
        let sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            let range = sel.getRangeAt(0);
            let preRange = range.cloneRange();
            preRange.selectNodeContents(editableDiv);
            preRange.setEnd(range.endContainer, range.endOffset);
            caretPos = preRange.toString().length;
        }
        return caretPos;
    }

    /**
     * Caret position getter
     * `this` in this function should be the element with a caret
     */
    const getCaret = function(el) {
        if (el.tagName === 'DIV') {
            return getCaretPosition(el);
        } else {
            return el.selectionStart;
        }
    }

    /**
     * Caret position setter
     * `this` should be the element (input/textarea or contenteditable div)
     */
    const setCaret = function(index) {
        if (typeof index !== 'number') index = Number(index) || 0;

        // Inputs/Textareas
        if (this.tagName !== 'DIV' || this.isContentEditable !== true) {
            const n = this.value ?? '';
            if (index < 0) index = 0;
            if (index > n.length) index = n.length;
            this.focus();
            this.selectionStart = index;
            this.selectionEnd = index;
            return;
        }

        // Contenteditable DIV
        const el = /** @type {HTMLElement} */ (this);
        const totalLen = (el.textContent || '').length;

        if (index < 0) index = 0;
        if (index > totalLen) index = totalLen;

        const sel = window.getSelection();
        if (!sel) return;

        const range = document.createRange();
        el.focus();

        // Empty element → ensure a text node to place the caret into
        if (totalLen === 0) {
            if (!el.firstChild) el.appendChild(document.createTextNode(''));
            // place at start
            range.setStart(el.firstChild, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        // If caret is at the very end, this is fastest/cleanest
        if (index === totalLen) {
            range.selectNodeContents(el);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        // Walk text nodes to find the node that contains the index-th character
        const walker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    // skip empty/whitespace-only nodes if you want; or just accept all text
                    return node.nodeValue ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        let pos = 0;
        let node = walker.nextNode();
        while (node) {
            const nextPos = pos + node.nodeValue.length;
            if (index <= nextPos) {
                const offset = index - pos; // char offset within this text node
                range.setStart(node, offset);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return;
            }
            pos = nextPos;
            node = walker.nextNode();
        }

        // Fallback: collapse at end if something unexpected happened
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    /**
     * Methods to deal with different types of data
     */
    const parseMethods = {
        'FIND': function(v, a) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            // TODO: tratar eventos
            if (this.event && this.event.inputType && this.event.inputType.indexOf('delete') > -1) {
                this.values[this.index] += v;
                return;
            }
            let pos = 0;
            let count = 0;
            let value = (this.values[this.index] + v).toLowerCase();
            for (let i = 0; i < a.length; i++) {
                if (a[i].toLowerCase().indexOf(value) === 0) {
                    pos = i;
                    count++;
                }
            }
            if (count > 1) {
                this.values[this.index] += v;
            } else if (count === 1) {
                // Jump a number of chars
                let t = (a[pos].length - this.values[this.index].length) - 1;
                this.position += t;
                this.values[this.index] = a[pos];
                this.index++;
                return pos;
            }
        },
        'YEAR': function(v, s) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) <= 10) {
                if (this.values[this.index].length < s) {
                    this.values[this.index] += v;
                }
            }
            if (this.values[this.index].length === s) {
                let y = new Date().getFullYear().toString();
                if (s === 2) {
                    y = y.substring(0,2) + this.values[this.index];
                } else if (s === 3) {
                    y = y.substring(0,1) + this.values[this.index];
                } else if (s === 4) {
                    y = this.values[this.index];
                }
                this.date[0] = y;
                this.index++;
            }
        },
        'YYYY': function(v) {
            parseMethods.YEAR.call(this, v, 4);
        },
        'YYY': function(v) {
            parseMethods.YEAR.call(this, v, 3);
        },
        'YY': function(v) {
            parseMethods.YEAR.call(this, v, 2);
        },
        'MMMMM': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            let value = (this.values[this.index] + v).toLowerCase();
            for (var i = 0; i < monthsFull.length; i++) {
                if (monthsFull[i][0].toLowerCase().indexOf(value) === 0) {
                    this.values[this.index] = monthsFull[i][0];
                    this.date[1] = i + 1;
                    this.index++;
                    break;
                }
            }
        },
        'MMMM': function(v) {
            let ret = parseMethods.FIND.call(this, v, monthsFull);
            if (typeof(ret) !== 'undefined') {
                this.date[1] = ret + 1;
            }
        },
        'MMM': function(v) {
            let ret = parseMethods.FIND.call(this, v, months);
            if (typeof(ret) !== 'undefined') {
                this.date[1] = ret + 1;
            }
        },
        'MM': function(v, single) {
            const commit = () => {
                this.date[1] = this.values[this.index];
                this.index++;
            }

            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    if (! single) {
                        v = '0' + v;
                    }
                    this.values[this.index] = v;
                    commit();
                } else if (parseInt(v) < 2) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[1] = this.values[this.index] += v;
                    commit();
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.date[1] = this.values[this.index] += v;
                    commit();
                } else {
                    let test = parseInt(this.values[this.index]);
                    if (test > 0 && test <= 12) {
                        commit();
                        return false;
                    }
                }
            }
        },
        'M': function(v) {
            return parseMethods['MM'].call(this, v, true);
        },
        'MONTH': function(v) {
            return parseMethods['MMMM'].call(this, v);
        },
        'MON': function(v) {
            return parseMethods['MMM'].call(this, v);
        },
        'DDDD': function(v) {
            return parseMethods.FIND.call(this, v, weekDaysFull);
        },
        'DDD': function(v) {
            return parseMethods.FIND.call(this, v, weekDays);
        },
        'DD': function(v, single) {
            const commit = () => {
                this.date[2] = this.values[this.index];
                this.index++;
            }

            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 3 && parseInt(v) < 10) {
                    if (! single) {
                        v = '0' + v;
                    }
                    this.values[this.index] = v;
                    commit();
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 3 && parseInt(v) < 2) {
                    this.values[this.index] += v;
                    commit();
                } else if ((this.values[this.index] == 1 || this.values[this.index] == 2) && parseInt(v) < 10) {
                    this.values[this.index] += v;
                    commit();
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.values[this.index] += v;
                    commit();
                } else {
                    let test = parseInt(this.values[this.index]);
                    if (test > 0 && test <= 31) {
                        commit();
                        return false;
                    }
                }
            }
        },
        'D': function(v) {
            return parseMethods['DD'].call(this, v, true);
        },
        'DY': function(v) {
            return parseMethods['DDD'].call(this, v);
        },
        'DAY': function(v) {
            return parseMethods['DDDD'].call(this, v);
        },
        'HH12': function(v, two) {
            let test = false;
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    if (two) {
                        v = 0 + v;
                    }
                    this.date[3] = this.values[this.index] = v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[3] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] < 1 && parseInt(v) < 10) {
                    this.date[3] = this.values[this.index] += v;
                    this.index++;
                } else {
                    test = true;
                }
            }

            // Re-test
            if (test === true) {
                var t = parseInt(this.values[this.index]);
                if (t >= 0 && t <= 12) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    return false;
                }
            }
        },
        'HH24': function(v, two) {
            let test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    if (parseInt(v) > 2 && parseInt(v) < 10) {
                        if (two) {
                            v = 0 + v;
                        }
                        this.date[3] = this.values[this.index] = v;
                        this.index++;
                    } else if (parseInt(v) < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] == 2 && parseInt(v) < 4) {
                        if (! two && this.values[this.index] === '0') {
                            this.values[this.index] = '';
                        }
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] < 2 && parseInt(v) < 10) {
                        if (! two && this.values[this.index] === '0') {
                            this.values[this.index] = '';
                        }
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        test = true;
                    }
                }
            } else {
                test = true;
            }

            // Re-test
            if (test === true) {
                var t = parseInt(this.values[this.index]);
                if (t >= 0 && t < 24) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    return false;
                }
            }
        },
        'HH': function(v) {
            parseMethods['HH24'].call(this, v, 1);
        },
        'H': function(v) {
            parseMethods['HH24'].call(this, v, 0);
        },
        '\\[H\\]': function(v) {
            if (this.values[this.index] == undefined) {
                this.values[this.index] = '';
            }
            if (v.match(/[0-9]/g)) {
                this.date[3] = this.values[this.index] += v;
            } else {
                if (this.values[this.index].match(/[0-9]/g)) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    return false;
                }
            }
        },
        'N60': function(v, i, two) {
            let test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    if (parseInt(v) > 5 && parseInt(v) < 10) {
                        if (two) {
                            v = '0' + v;
                        }
                        this.date[i] = this.values[this.index] = v;
                        this.index++;
                    } else if (parseInt(v) < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] < 6 && parseInt(v) < 10) {
                        if (! two && this.values[this.index] === '0') {
                            this.values[this.index] = '';
                        }
                        this.date[i] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        test = true;
                    }
                }
            } else {
                test = true;
            }

            // Re-test
            if (test === true) {
                var t = parseInt(this.values[this.index]);
                if (t >= 0 && t < 60) {
                    this.date[i] = this.values[this.index];
                    this.index++;
                    return false;
                }
            }
        },
        'MI': function(v) {
            parseMethods.N60.call(this, v, 4, true);
        },
        'SS': function(v) {
            parseMethods.N60.call(this, v, 5, true);
        },
        'I': function(v) {
            parseMethods.N60.call(this, v, 4, false);
        },
        'S': function(v) {
            parseMethods.N60.call(this, v, 5, false);
        },
        'AM/PM': function(v) {
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }

            if (this.values[this.index] === '') {
                if (v.match(/a/i) && this.date[3] < 13) {
                    this.values[this.index] += 'A';
                } else if (v.match(/p/i)) {
                    this.values[this.index] += 'P';
                }
            } else if (this.values[this.index] === 'A' || this.values[this.index] === 'P') {
                this.values[this.index] += 'M';
                this.index++;
            }
        },
        'WD': function(v) {
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) < 7) {
                this.values[this.index] = v;
            }
            if (this.values[this.index].length == 1) {
                this.index++;
            }
        },
        // Numeric Methods
        '[0#]+([.,]{1}0*#*)?': function(v) {
            if (v === '.' && inputIsANumber(this.raw)) {
                v = this.decimal;
            }

            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }

            if (v === '-') {
                // Transform the number into negative if it is not already
                if (this.values[this.index][0] != '-') {
                    this.values[this.index] = '-' + this.values[this.index];
                }
            } else if (v === '+') {
                // Transform the number into positive if it is negative
                if (this.values[this.index][0] == '-') {
                    this.values[this.index] = this.values[this.index].replace('-', '');
                }
            } else if (v == '0') {
                // Only adds zero if there's a non-zero number before
                if (this.values[this.index] != '0' && this.values[this.index] != '-0') {
                    this.values[this.index] += v;
                }
            } else if (v > 0 && v < 10) {
                // Verify if there's a zero to remove it, avoiding left zeros
                if (this.values[this.index] == '0' || this.values[this.index] == '-0') {
                    this.values[this.index] = this.values[this.index].replace('0', '');
                }
                this.values[this.index] += v;
            } else if (v === this.decimal) {
                // Only adds decimal when there's a number value on its left
                if (! this.values[this.index].includes(this.decimal)) {
                    if (! this.values[this.index].replace('-', '').length) {
                        this.values[this.index] += '0';
                    }
                    this.values[this.index] += this.decimal;
                }
            } else if (v === "\u200B") {
                this.values[this.index] += v;
            }

        },
        '[0#]+([.,]{1}0*#*)?%': function(v) {
            parseMethods['[0#]+([.,]{1}0*#*)?'].call(this, v);

            // Adds the % only if it has a number value
            if (this.values[this.index].match(/[\-0-9]/g)) {
                if (this.values[this.index].indexOf('%') !== -1) {
                    this.values[this.index] = this.values[this.index].replaceAll('%', '');
                }
                this.values[this.index] += '%';
            } else {
                this.values[this.index] = '';
            }
        },
        '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?': function(v) {
            // Process first the number
            parseMethods['[0#]+([.,]{1}0*#*)?'].call(this, v, true);
            // Create the separators
            let separator = this.tokens[this.index].substring(1,2);


            let currentValue = this.values[this.index];
            // Remove existing separators and negative sign
            currentValue = currentValue.replaceAll(separator, '');
            // Process separators
            let val = currentValue.split(this.decimal);
            if (val[0].length > 3) {
                let number = [];
                let count = 0;
                for (var j = val[0].length - 1; j >= 0 ; j--) {
                    let c = val[0][j];
                    if (c >= 0 && c <= 9) {
                        if (count && ! (count % 3)) {
                            number.unshift(separator);
                        }
                        count++;
                    }
                    number.unshift(c);
                }
                val[0] = number.join('');
            }
            // Reconstruct the value
            this.values[this.index] = val.join(this.decimal);
        },
        '[0#]+([.,]{1}0*#*)?E{1}\\+0+': function(v) {
            parseMethods['[0#]+([.,]{1}0*#*)?'].call(this, v);
        },
        '#{0,1}.*?\\?+\\/[0-9?]+': function (v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            // Current token
            const token = this.tokens[this.index]; // e.g. "# ?/?", "?/2", "# ??/16"
            // Current value
            let cur = this.values[this.index];
            // Parse RHS of mask to decide denominator rule
            const rhsRaw = (token.split('/')[1] || '').replace(/\s+/g, '');
            // allowDen: "?" for any, or a fixed number string like "2","4","8","16","32"
            const allowDen = /^\d+$/.test(rhsRaw) ? rhsRaw : /^\?+$/.test(rhsRaw) ? '?' : '?';

            // Only accept digits / space / slash; ignore everything else
            if (!(/[0-9\/ ]/.test(v))) {
                return;
            }

            // If we already have a slash and denominator is fixed but not yet appended,
            // auto-complete immediately regardless of what the user typed now.
            const hasSlashNow = cur.includes('/');
            if (hasSlashNow && allowDen !== '?') {
                const afterSlash = cur.slice(cur.indexOf('/') + 1);
                if (afterSlash.length === 0) {
                    this.values[this.index] = cur + allowDen;
                    this.index++; // move to next token
                    return;
                }
            }

            // Empty -> only digits
            if (cur.length === 0) {
                if (/\d/.test(v)) this.values[this.index] = v;
                return;
            }

            const hasSpace = cur.includes(' ');
            const hasSlash = cur.includes('/');
            const last = cur[cur.length - 1];

            // Space rules: only one must be before slash, must follow a digit
            if (v === ' ') {
                if (!hasSpace && !hasSlash && /\d/.test(last)) {
                    this.values[this.index] = cur + ' ';
                }
                return;
            }

            // Slash rules
            if (v === '/') {
                // only one slash, not right after a space, and must follow a digit
                if (!hasSlash && last !== ' ' && /\d/.test(last)) {
                    if (allowDen === '?') {
                        // any denominator → just adds slash
                        this.values[this.index] = cur + '/';
                    } else {
                        // fixed denominator → add slash + denom immediately and advance
                        this.values[this.index] = cur + '/' + allowDen;
                        this.index++; // conclude this token
                    }
                }
                return;
            }

            // Digit rules
            if (/\d/.test(v)) {
                if (!hasSlash) {
                    // Before slash: digits always fine
                    this.values[this.index] = cur + v;
                    return;
                }

                // After slash
                if (allowDen === '?') {
                    // Any denominator
                    this.values[this.index] = cur + v;
                    return;
                }

                // Fixed denominator: normally we auto-complete at slash time,
                // but if somehow we're mid-entry, enforce the prefix and advance when complete.
                const afterSlash = cur.slice(cur.indexOf('/') + 1);
                const nextDen = afterSlash + v;
                if (allowDen.startsWith(nextDen)) {
                    this.values[this.index] = cur + v;
                    if (nextDen.length === allowDen.length) {
                        this.index++;
                    }
                }
            }
        },
        '[0-9a-zA-Z\\$]+': function(v) {
            // Token to be added to the value
            let word = this.tokens[this.index];
            // Value
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (v === null) {
                let size = this.values[this.index].length;
                v = word.substring(size, size+1);
            }
            // Add the value
            this.values[this.index] += v;
            // Only if caret is before the change
            let current = this.values[this.index].replace('\u200B','');
            // Add token to the values
            if (current !== word.substring(0,current.length)) {
                this.values[this.index] = word;
                // Next token to process
                this.index++;
                return false;
            } else if (current === word) {
                // Next token to process
                this.index++;
            }
        },
        'A': function(v) {
            return parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        'a': function(v) {
            return parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        '.': function(v) {
            return parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        '&': function(v) {
            if (v.match(/^[a-zA-Z ]+$/)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '\\*': function(v) {
            this.values[this.index] = '';
            this.index++;
            return false;
        },
        'C': function(v) {
            parseMethods['&'].call(this, v);
        },
        // General Methods
        '0': function(v) {
            if (v.match(/[0-9]/g)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '9': function(v) {
            parseMethods['0'].call(this, v);
        },
        '#': function(v) {
            parseMethods['0'].call(this, v);
        },
        'L': function(v) {
            if (v.match(/[a-zA-Z]/gi)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '\\?': function(v) {
            if (v.match(/[1-9]/g)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '@': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            this.values[this.index] += v;
        },
        '_\\(': function(v) {
            this.values[this.index] = ' ';
            this.index++;
            return false;
        },
        '_\\)': function(v) {
            this.values[this.index] = ' ';
            this.index++;
            return false;
        },
        '\\(': function(v) {
            if (this.type === 'currency' && this.parenthesisForNegativeNumbers) {
                this.values[this.index] = '';
            } else {
                this.values[this.index] = '(';
            }
            this.index++;
            return false;
        },
        '\\)': function(v) {
            if (this.type === 'currency' && this.parenthesisForNegativeNumbers) {
                this.values[this.index] = '';
            } else {
                this.values[this.index] = ')';
            }
            this.index++;
            return false;
        },
        '_-': function(v) {
            this.values[this.index] = ' ';
            this.index++;
            return false;
        },
        ',,M': function(v) {
            this.values[this.index] = 'M';
            this.index++;
            return false;
        },
        ',,,B': function(v) {
            this.values[this.index] = 'B';
            this.index++;
            return false;
        }
    }

    const extractDate = function() {
        let v = '';
        if (! (this.date[0] && this.date[1] && this.date[2]) && (this.date[3] || this.date[4])) {
            if (this.mask.toLowerCase().indexOf('[h]') !== -1) {
                v = parseInt(this.date[3]);
            } else {
                let h = parseInt(this.date[3]);
                if (h < 13 && this.values.indexOf('PM') !== -1) {
                    v = (h+12) % 24;
                } else {
                    v = h % 24;
                }
            }
            if (this.date[4]) {
                v += parseFloat(this.date[4] / 60);
            }
            if (this.date[5]) {
                v += parseFloat(this.date[5] / 3600);
            }
            v /= 24;
        } else if (this.date[0] || this.date[1] || this.date[2] || this.date[3] || this.date[4] || this.date[5]) {
            if (this.date[0] && this.date[1] && ! this.date[2]) {
                this.date[2] = 1;
            }
            var t = helpers_date.now(this.date);
            v = helpers_date.dateToNum(t);
        }

        if (isNaN(v)) {
            v = '';
        }

        return v;
    }

    // Types TODO: Generate types so we can garantee that text,scientific, numeric,percentage, current are not duplicates. If they are, it will be general or broken.

    const getTokens = function(str) {
        const expressions = [].concat(tokens.fraction, tokens.currency, tokens.datetime, tokens.percentage, tokens.scientific, tokens.numeric, tokens.text, tokens.general);
        // Expression to extract all tokens from the string
        return str.match(new RegExp(expressions.join('|'), 'gi'));
    }

    /**
     * Get the method of one given token
     */
    const getMethod = function(str, temporary) {
        str = str.toString().toUpperCase();
        const types = Object.keys(tokens);

        // Check for datetime mask
        let datetime = true;
        for (let i = 0; i < temporary.length; i++) {
            let type = temporary[i].type;
            if (! (type === 'datetime' || type === 'general')) {
                datetime = false;
            }
        }

        // Remove date time from the possible types
        if (datetime !== true) {
            let index = types.indexOf('datetime');
            types.splice(index, 1);
        }

        // Get the method based on the token
        for (let i = 0; i < types.length; i++) {
            let type = types[i];

            for (let j = 0; j < tokens[type].length; j++) {
                let e = new RegExp('^' + tokens[type][j] + '$', 'gi'); // Anchor regex
                let r = str.match(e);
                if (r) {
                    return { type: type, method: tokens[type][j] }
                }
            }
        }
    }

    const fixMinuteToken = function(t) {
        for (let i = 0; i < t.length; i++) {
            if (t[i] === 'M' || t[i] === 'MM') {
                // Not a month, correct to minutes
                if ((t[i - 1] && t[i - 1].indexOf('H') >= 0) ||
                    (t[i - 2] && t[i - 2].indexOf('H') >= 0) ||
                    (t[i + 1] && t[i + 1].indexOf('S') >= 0) ||
                    (t[i + 2] && t[i + 2].indexOf('S') >= 0)) {
                    // Apply minute token
                    t[i] = t[i] === 'M' ? 'I': 'MI';
                }
            }
        }
    }

    /**
     * Identify each method for each token
     */
    const getMethodsFromTokens = function(t) {
        // Uppercase
        t = t.map(v => {
            return v.toString().toUpperCase();
        });

        // Compatibility with Excel
        fixMinuteToken(t);

        let result = [];
        for (let i = 0; i < t.length; i++) {
            var m = getMethod(t[i], result);
            if (m) {
                result.push(m);
            } else {
                result.push(null);
            }
        }
        return result;
    }

    const getMethodByPosition = function(control) {
        let methodName;
        if (control.methods[control.index] && typeof(control.value[control.position]) !== 'undefined') {
            methodName = control.methods[control.index].method;
        }

        if (methodName && typeof(parseMethods[methodName]) === 'function') {
            return parseMethods[methodName];
        }

        return false;
    }

    const processPaddingZeros = function(token, value, decimal) {
        if (! value) {
            return value;
        }
        let m = token.split(decimal);
        let desiredNumOfPaddingZeros = m[0].match(/[0]+/g);
        if (desiredNumOfPaddingZeros[0]) {
            desiredNumOfPaddingZeros = desiredNumOfPaddingZeros[0].length
            let v = value.toString().split(decimal);
            let len = v[0].length;
            if (desiredNumOfPaddingZeros > len) {
                v[0] = v[0].padStart(desiredNumOfPaddingZeros, '0');
                return v.join(decimal);
            }
        }
    }

    const processNumOfPaddingZeros = function(control) {
        let negativeSignal = false;
        control.methods.forEach((method, k) => {
            if (method.type === 'numeric' || method.type === 'percentage' || method.type === 'scientific') {
                let ret = processPaddingZeros(control.tokens[k], control.values[k], control.decimal);
                if (ret) {
                    control.values[k] = ret;
                }
            }

            if (control.type === 'currency' && control.parenthesisForNegativeNumbers === true) {
                if (method.type === 'currency') {
                    if (control.values[k].toString().includes('-')) {
                        control.values[k] = control.values[k].replace('-', '');

                        negativeSignal = true;
                    }
                }
            }
        });


        if (control.type === 'currency' && control.parenthesisForNegativeNumbers === true && negativeSignal) {
            control.methods.forEach((method, k) => {
                if (! control.values[k] && control.tokens[k] === '(') {
                    control.values[k] = '(';
                } else if (! control.values[k] && control.tokens[k] === ')') {
                    control.values[k] = ')';
                }
            });
        }
    }

    const getValue = function(control) {
        return control.values.join('');
    }

    const inputIsANumber = function(num) {
        if (typeof(num) === 'string') {
            num = num.trim();
        }
        return !isNaN(num) && num !== null && num !== '';
    }

    const getType = function(control) {
        // Mask type
        let type = 'general';
        // Process other types
        for (var i = 0; i < control.methods.length; i++) {
            let m = control.methods[i];
            if (m && m.type !== 'general' && m.type !== type) {
                if (type === 'general') {
                    type = m.type;
                }  else {
                    type = 'general';
                    break;
                }
            }
        }
        return type;
    }

    const isNumber = function(num) {
        if (typeof(num) === 'string') {
            num = num.replace("\u200B", "").trim();
        }
        return !isNaN(num) && num !== null && num !== '';
    }

    // TODO, get negative mask automatically based on the input sign?

    const getConfig = function(config, value) {
        // Internal default control of the mask system
        const control = {
            // Mask options
            options: {},
            // New values for each token found
            values: [],
            // Token position
            index: 0,
            // Character position
            position: 0,
            // Date raw values
            date: [0,0,0,0,0,0],
            // Raw number for the numeric values
            number: 0,
        }

        if (typeof(value) === 'undefined' || value === null) {
            value = '';
        }

        // Value to be masked
        control.value = value.toString();
        control.raw = value;


        // Options defined by the user
        if (typeof(config) == 'string') {
            // Mask
            control.mask = config;
        } else if (config) {
            // Mask
            let k = Object.keys(config);
            for (var i = 0; i < k.length; i++) {
                control[k[i]] = config[k[i]];
            }
        }

        // Controls of Excel that should be ignored
        if (control.mask) {
            let d = control.mask.split(';');
            // Mask
            let mask = d[0];

            if (typeof(value) === 'number' || isNumber(value)) {
                if (Number(value) < 0 && d[1]) {
                    mask = d[1];
                } else if (Number(value) === 0 && d[2]) {
                    mask = d[2];
                }
            } else {
                if (d[3]) {
                    mask = d[3];
                }
            }
            // Cleaning the mask
            mask = mask.replace(new RegExp('"', 'mgi'), "");
            // Parenthesis
            let reg = /(?<!_)\((?![^()]*_)([^'"]*?)\)/g;
            if (mask.match(reg)) {
                control.parenthesisForNegativeNumbers = true;
            }
            // Match brackets that should be removed (NOT the time format codes)
            reg = /\[(?!(?:s|ss|h|hh|m|mm)\])([^\]]*)\]/g;
            if (mask.match(reg)) {
                mask = mask.replace(reg, ''); // Removes brackets and content
            }
            // Get only the first mask for now and remove
            control.mask = mask;
            // Get tokens which are the methods for parsing
            control.tokens = getTokens(control.mask);
            // Get methods from the tokens
            control.methods = getMethodsFromTokens(control.tokens);
            // Type
            control.type = getType(control);
        }

        // Decimal
        control.decimal = getDecimal.call(control);

        return control;
    }

    const toPlainString = function(num) {
        // Convert number to string if it isn't already
        num = String(num);

        // If it's not in exponential form, return as-is
        if (!/e/i.test(num)) return num;

        // Decompose scientific notation
        const [coefficient, exponent] = num.toLowerCase().split('e');
        const exp = parseInt(exponent, 10);

        // Handle sign
        const sign = coefficient[0] === '-' ? '-' : '';
        const [intPart, fracPart = ''] = coefficient.replace('-', '').split('.');

        const digits = intPart + fracPart;
        const decimalPos = intPart.length;

        let newPos = decimalPos + exp;

        if (newPos <= 0) {
            // Decimal point moves left
            return sign + '0.' + '0'.repeat(-newPos) + digits;
        } else if (newPos >= digits.length) {
            // Decimal point moves right, add trailing zeros
            return sign + digits + '0'.repeat(newPos - digits.length);
        } else {
            // Decimal point moves into the number
            return sign + digits.slice(0, newPos) + '.' + digits.slice(newPos);
        }
    };

    const adjustNumberOfDecimalPlaces = function(config, value) {
        let temp = value;
        let mask = config.mask;
        let expo;

        if (config.type === 'scientific') {
            mask = config.mask.toUpperCase().split('E')[0];

            let numOfDecimalPlaces = mask.split(config.decimal);
            numOfDecimalPlaces = numOfDecimalPlaces[1].match(/[0#]+/g);
            numOfDecimalPlaces = numOfDecimalPlaces[0]?.length ?? 0;
            temp = temp.toExponential(numOfDecimalPlaces);
            expo = temp.toString().split('e+');
            temp = Number(expo[0]);
        }

        if (mask.indexOf(config.decimal) === -1) {
            // No decimal places
            if (! Number.isInteger(temp)) {
                temp = temp.toFixed(0);
            }
        } else {
            // Length of the decimal
            let mandatoryDecimalPlaces = mask.split(config.decimal);
            mandatoryDecimalPlaces = mandatoryDecimalPlaces[1].match(/0+/g);
            if (mandatoryDecimalPlaces) {
                mandatoryDecimalPlaces = mandatoryDecimalPlaces[0].length;
            } else {
                mandatoryDecimalPlaces = 0;
            }
            // Amount of decimal
            let numOfDecimalPlaces = temp.toString().split(config.decimal)
            numOfDecimalPlaces = numOfDecimalPlaces[1]?.length ?? 0;
            // Necessary adjustment
            let necessaryAdjustment = 0;
            if (numOfDecimalPlaces < mandatoryDecimalPlaces) {
                necessaryAdjustment = mandatoryDecimalPlaces;
            } else {
                // Optional
                let optionalDecimalPlaces = mask.split(config.decimal);
                optionalDecimalPlaces = optionalDecimalPlaces[1].match(/[0#]+/g);
                if (optionalDecimalPlaces) {
                    optionalDecimalPlaces = optionalDecimalPlaces[0].length;
                    if (numOfDecimalPlaces > optionalDecimalPlaces) {
                        necessaryAdjustment = optionalDecimalPlaces;
                    }
                }
            }
            // Adjust decimal numbers if applicable
            if (necessaryAdjustment) {
                let t = temp.toFixed(necessaryAdjustment);
                let n = temp.toString().split('.');
                let fraction = n[1];
                if (fraction && fraction.length > necessaryAdjustment && fraction[fraction.length - 1] === '5') {
                    t = parseFloat(n[0] + '.' + fraction + '1').toFixed(necessaryAdjustment);
                }
                temp = t;
            }
        }

        if (config.type === 'scientific') {
            let ret = processPaddingZeros(mask, temp, config.decimal);
            if (ret) {
                temp = ret;
            }
            expo[0] = temp;

            mask = config.mask.toUpperCase().split('E+')[1];
            ret = processPaddingZeros(mask, expo[1], config.decimal);
            if (ret) {
                expo[1] = ret;
            }

            temp = expo.join('e+');
        }

        return temp;
    }

    const formatFraction = function(value, mask) {
        let maxDenominator;
        let fixedDenominator = null;
        let allowWholeNumber = true;

        // Check for fixed denominator like # ?/8 or ?/8
        const fixed = mask.match(/\/(\d+)/);
        if (fixed) {
            fixedDenominator = parseInt(fixed[1], 10);
            maxDenominator = fixedDenominator;
        } else {
            // Determine based on question marks in mask
            const match = mask.match(/\?\/(\?+)/);
            if (match) {
                maxDenominator = Math.pow(10, match[1].length) - 1;
            } else {
                maxDenominator = 9; // Default for # ?/? or ?/?
            }
        }
        // Check if mask allows whole number (e.g., ?/? or ?/8 implies no whole number)
        allowWholeNumber = mask.includes('#');

        // If we have a fixed denominator, use it exactly (don't simplify)
        if (fixedDenominator) {
            const isNegative = value < 0;
            const absValue = Math.abs(value);
            const numerator = Math.round(absValue * fixedDenominator);

            // For masks like ?/8, always output as pure fraction (no whole number)
            if (!allowWholeNumber) {
                return isNegative ? `-${numerator}/${fixedDenominator}` : `${numerator}/${fixedDenominator}`;
            }

            // For masks like # ?/8, allow whole number
            const whole = Math.floor(numerator / fixedDenominator);
            const remainder = numerator % fixedDenominator;
            if (remainder === 0) {
                return isNegative ? `-${whole}` : `${whole}`;
            }
            if (whole === 0) {
                return isNegative ? `-${numerator}/${fixedDenominator}` : `${numerator}/${fixedDenominator}`;
            }
            return isNegative ? `-${whole} ${remainder}/${fixedDenominator}` : `${whole} ${remainder}/${fixedDenominator}`;
        }

        // Use continued fractions algorithm for better approximation
        function continuedFraction(value, maxDenom) {
            if (value === 0) return [0, 1];
            let sign = value < 0 ? -1 : 1;
            value = Math.abs(value);
            let whole = Math.floor(value);
            let frac = value - whole;
            if (frac === 0) return [sign * whole, 1];

            let h1 = 1, h2 = 0;
            let k1 = 0, k2 = 1;
            let x = frac;
            while (k1 <= maxDenom) {
                let a = Math.floor(x);
                let h0 = a * h1 + h2;
                let k0 = a * k1 + k2;
                if (k0 > maxDenom) break;
                h2 = h1; h1 = h0;
                k2 = k1; k1 = k0;
                if (Math.abs(x - a) < 1e-10) break;
                x = 1 / (x - a);
            }

            // Add the whole part back only if allowed
            let finalNum = sign * (allowWholeNumber ? whole * k1 + h1 : Math.round(value * k1));
            let finalDen = k1;
            return [finalNum, finalDen];
        }

        const [numerator, denominator] = continuedFraction(value, maxDenominator);

        // Handle the result
        const isNegative = numerator < 0;
        const absNumerator = Math.abs(numerator);
        const whole = allowWholeNumber ? Math.floor(absNumerator / denominator) : 0;
        const remainder = absNumerator % denominator;
        const sign = isNegative ? '-' : '';

        if (remainder === 0) {
            return `${sign}${whole || 0}`;
        }
        if (whole === 0 || !allowWholeNumber) {
            return `${sign}${absNumerator}/${denominator}`;
        }
        return `${sign}${whole} ${remainder}/${denominator}`;
    }

    const extractDateAndTime = function(value) {
        value = '' + value.substring(0,19);
        let splitStr = (value.indexOf('T') !== -1) ? 'T' : ' ';
        value = value.split(splitStr);

        let y = null;
        let m = null;
        let d = null;
        let h = '0';
        let i = '0';
        let s = '0';

        if (! value[1]) {
            if (value[0].indexOf(':') !== -1) {
                value[0] = value[0].split(':');
                h = value[0][0];
                i = value[0][1];
                s = value[0][2];
            } else {
                value[0] = value[0].split('-');
                y = value[0][0];
                m = value[0][1];
                d = value[0][2];
            }
        } else {
            value[0] = value[0].split('-');
            y = value[0][0];
            m = value[0][1];
            d = value[0][2];

            value[1] = value[1].split(':');
            h = value[1][0];
            i = value[1][1];
            s = value[1][2];
        }

        return [y,m,d,h,i,s];
    }

    const Component = function(str, config, returnObject) {
        // Get configuration
        const control = getConfig(config, str);

        if (control.locale) {
            // Process the locale
        } else if (control.mask) {
            // Walk every character on the value
            let method;
            while (method = getMethodByPosition(control)) {
                // Get the method name to handle the current token
                let ret = method.call(control, control.value[control.position]);
                // Next position
                if (ret !== false) {
                    control.position++;
                }
            }

            // Move index
            if (control.methods[control.index]) {
                let type = control.methods[control.index].type;
                if (isNumeric(type) && control.methods[++control.index]) {
                    let next;
                    while (next = control.methods[control.index]) {
                        if (control.methods[control.index].type === 'general') {
                            let method = control.methods[control.index].method;
                            if (method && typeof(parseMethods[method]) === 'function') {
                                parseMethods[method].call(control, null);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        control.value = getValue(control);

        if (returnObject) {
            return control;
        } else {
            return control.value;
        }
    }

    // Helper: Compare rendered value to original input
    const testMask = function(mask, value, original) {
        const rendered = Component.render(value, { mask }, true);
        return rendered.replace(/\s/g, '') === original.replace(/\s/g, '');
    }

    const autoCastingFractions = function(value) {
        const fractionPattern = /^\s*(-?\d+\s+)?(-?\d+)\/(\d+)\s*$/;
        const fractionMatch = value.match(fractionPattern);
        if (fractionMatch) {
            const sign = value.trim().startsWith('-') ? -1 : 1;
            const whole = fractionMatch[1] ? Math.abs(parseInt(fractionMatch[1])) : 0;
            const numerator = Math.abs(parseInt(fractionMatch[2]));
            const denominator = parseInt(fractionMatch[3]);

            if (denominator === 0) return null;

            const decimalValue = sign * (whole + (numerator / denominator));

            // Determine the mask
            let mask;
            if ([2, 4, 8, 16, 32].includes(denominator)) {
                mask = whole !== 0 ? `# ?/${denominator}` : `?/${denominator}`;
            } else if (denominator <= 9) {
                mask = whole !== 0 ? '# ?/?' : '?/?';
            } else {
                mask = whole !== 0 ? '# ??/??' : '??/??';
            }

            if (testMask(mask, decimalValue, value.trim())) {
                return { mask, value: decimalValue };
            }
        }
        return null;
    }

    const autoCastingPercent = function(value) {
        const percentPattern = /^\s*([+-]?\d+(?:[.,]\d+)?)%\s*$/;
        const percentMatch = value.match(percentPattern);
        if (percentMatch) {
            const rawNumber = percentMatch[1].replace(',', '.');
            const decimalValue = parseFloat(rawNumber) / 100;

            const decimalPart = rawNumber.split('.')[1];
            const decimalPlaces = decimalPart ? decimalPart.length : 0;
            const mask = decimalPlaces > 0 ? `0.${'0'.repeat(decimalPlaces)}%` : '0%';

            if (testMask(mask, decimalValue, value.trim())) {
                return { mask: mask, value: decimalValue };
            }
        }
        return null;
    }

    const autoCastingDates = function(value) {
        if (!value || typeof value !== 'string') {
            return null;
        }

        // Smart pattern detection based on the structure of the string

        // 1. Analyze the structure to determine possible formats
        const analyzeStructure = function(str) {
            const patterns = [];

            // Check for date with forward slashes: XX/XX/XXXX or XX/XX/XX
            if (str.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/)) {
                const parts = str.split('/');
                const p1 = parseInt(parts[0]);
                const p2 = parseInt(parts[1]);
                const p3 = parseInt(parts[2]);

                // Determine likely format based on values
                if (p1 <= 12 && p2 <= 31 && p2 > 12) {
                    // Likely mm/dd/yyyy
                    patterns.push('mm/dd/yyyy', 'mm/dd/yy', 'm/d/yyyy', 'm/d/yy');
                } else if (p1 <= 31 && p2 <= 12 && p1 > 12) {
                    // Likely dd/mm/yyyy
                    patterns.push('dd/mm/yyyy', 'dd/mm/yy', 'd/m/yyyy', 'd/m/yy');
                } else if (p1 <= 12 && p2 <= 12) {
                    // Ambiguous - could be either, use locale preference
                    const locale = navigator.language || 'en-US';
                    if (locale.startsWith('en-US')) {
                        patterns.push('mm/dd/yyyy', 'dd/mm/yyyy', 'mm/dd/yy', 'dd/mm/yy');
                    } else {
                        patterns.push('dd/mm/yyyy', 'mm/dd/yyyy', 'dd/mm/yy', 'mm/dd/yy');
                    }
                }

                // Add variations
                if (p3 < 100) {
                    patterns.push('dd/mm/yy', 'mm/dd/yy', 'd/m/yy', 'm/d/yy');
                } else {
                    patterns.push('dd/mm/yyyy', 'mm/dd/yyyy', 'd/m/yyyy', 'm/d/yyyy');
                }
            }

            // Check for date with dashes: XX-XX-XXXX
            else if (str.match(/^\d{1,2}-\d{1,2}-\d{2,4}$/)) {
                const parts = str.split('-');
                const p1 = parseInt(parts[0]);
                const p2 = parseInt(parts[1]);
                const p3 = parseInt(parts[2]);

                if (p1 <= 12 && p2 <= 31 && p2 > 12) {
                    patterns.push('mm-dd-yyyy', 'mm-dd-yy', 'm-d-yyyy', 'm-d-yy');
                } else if (p1 <= 31 && p2 <= 12 && p1 > 12) {
                    patterns.push('dd-mm-yyyy', 'dd-mm-yy', 'd-m-yyyy', 'd-m-yy');
                } else {
                    patterns.push('dd-mm-yyyy', 'mm-dd-yyyy', 'dd-mm-yy', 'mm-dd-yy');
                }
            }

            // Check for ISO format: YYYY-MM-DD
            else if (str.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                patterns.push('yyyy-mm-dd', 'yyyy-m-d');
            }

            // Check for format: YYYY/MM/DD
            else if (str.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
                patterns.push('yyyy/mm/dd', 'yyyy/m/d');
            }

            // Check for dates with month names
            else if (str.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)) {
                // DD Mon YYYY or DD Month YYYY
                if (str.match(/^\d{1,2}\s+\w+\s+\d{2,4}$/i)) {
                    patterns.push('dd mmm yyyy', 'dd mmmm yyyy', 'd mmm yyyy', 'd mmmm yyyy',
                        'dd mmm yy', 'dd mmmm yy', 'd mmm yy', 'd mmmm yy');
                }
                // Mon DD, YYYY or Month DD, YYYY
                else if (str.match(/^\w+\s+\d{1,2},?\s+\d{2,4}$/i)) {
                    patterns.push('mmm dd, yyyy', 'mmmm dd, yyyy', 'mmm d, yyyy', 'mmmm d, yyyy',
                        'mmm dd yyyy', 'mmmm dd yyyy', 'mmm d yyyy', 'mmmm d yyyy');
                }
                // DD-Mon-YYYY
                else if (str.match(/^\d{1,2}-\w+-\d{2,4}$/i)) {
                    patterns.push('dd-mmm-yyyy', 'dd-mmmm-yyyy', 'd-mmm-yyyy', 'd-mmmm-yyyy',
                        'dd-mmm-yy', 'dd-mmmm-yy', 'd-mmm-yy', 'd-mmmm-yy');
                }
            }

            // Check for weekday formats
            else if (str.match(/^(mon|tue|wed|thu|fri|sat|sun)/i)) {
                if (str.match(/^\w+,\s+\d{1,2}\s+\w+\s+\d{4}$/i)) {
                    patterns.push('ddd, dd mmm yyyy', 'ddd, d mmm yyyy',
                        'dddd, dd mmmm yyyy', 'dddd, d mmmm yyyy');
                }
            }

            // Check for datetime formats
            else if (str.includes(' ') && str.match(/\d{1,2}:\d{2}/)) {
                const parts = str.split(' ');
                if (parts.length >= 2) {
                    const datePart = parts[0];
                    const timePart = parts.slice(1).join(' ');

                    // Determine date format
                    let dateMasks = [];
                    if (datePart.includes('/')) {
                        dateMasks = ['dd/mm/yyyy', 'mm/dd/yyyy', 'd/m/yyyy', 'm/d/yyyy'];
                    } else if (datePart.includes('-')) {
                        if (datePart.match(/^\d{4}-/)) {
                            dateMasks = ['yyyy-mm-dd', 'yyyy-m-d'];
                        } else {
                            dateMasks = ['dd-mm-yyyy', 'mm-dd-yyyy', 'd-m-yyyy', 'm-d-yyyy'];
                        }
                    }

                    // Determine time format
                    let timeMasks = [];
                    if (timePart.match(/\d{1,2}:\d{2}:\d{2}/)) {
                        timeMasks = ['hh:mm:ss', 'h:mm:ss'];
                    } else {
                        timeMasks = ['hh:mm', 'h:mm'];
                    }

                    // Add AM/PM variants if present
                    if (timePart.match(/[ap]m/i)) {
                        timeMasks = timeMasks.map(t => t + ' am/pm');
                    }

                    // Combine date and time masks
                    for (const dateMask of dateMasks) {
                        for (const timeMask of timeMasks) {
                            patterns.push(`${dateMask} ${timeMask}`);
                        }
                    }
                }
            }

            // Check for time-only formats
            else if (str.match(/^\d{1,2}:\d{2}(:\d{2})?(\s*(am|pm))?$/i)) {
                if (str.match(/:\d{2}:\d{2}/)) {
                    patterns.push('hh:mm:ss', 'h:mm:ss');
                    if (str.match(/[ap]m/i)) {
                        patterns.push('hh:mm:ss am/pm', 'h:mm:ss am/pm');
                    }
                } else {
                    patterns.push('hh:mm', 'h:mm');
                    if (str.match(/[ap]m/i)) {
                        patterns.push('hh:mm am/pm', 'h:mm am/pm');
                    }
                }
            }

            // Check for extended hour format [h]:mm:ss
            else if (str.match(/^\[?\d+\]?:\d{2}:\d{2}$/)) {
                patterns.push('[h]:mm:ss');
            }

            return [...new Set(patterns)]; // Remove duplicates
        };

        // Get candidate masks based on the string structure
        const candidateMasks = analyzeStructure(value);

        // If no patterns detected, try some common formats as fallback
        if (candidateMasks.length === 0) {
            const locale = navigator.language || 'en-US';
            if (locale.startsWith('en-US')) {
                candidateMasks.push(
                    'mm/dd/yyyy', 'mm-dd-yyyy', 'yyyy-mm-dd',
                    'mm/dd/yy', 'mm-dd-yy',
                    'hh:mm:ss', 'hh:mm', 'h:mm am/pm'
                );
            } else {
                candidateMasks.push(
                    'dd/mm/yyyy', 'dd-mm-yyyy', 'yyyy-mm-dd',
                    'dd/mm/yy', 'dd-mm-yy',
                    'hh:mm:ss', 'hh:mm', 'h:mm'
                );
            }
        }

        // Try each candidate mask
        for (const mask of candidateMasks) {
            try {
                // Use Component.extractDateFromString to parse the date
                const isoDate = Component.extractDateFromString(value, mask);

                if (isoDate && isoDate !== '') {
                    // Parse the ISO date string to components
                    const parts = isoDate.split(' ');
                    const dateParts = parts[0].split('-');
                    const timeParts = parts[1] ? parts[1].split(':') : ['0', '0', '0'];

                    const year = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]);
                    const day = parseInt(dateParts[2]);
                    const hour = parseInt(timeParts[0]);
                    const minute = parseInt(timeParts[1]);
                    const second = parseInt(timeParts[2]);

                    // Validate the date components
                    if (year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31 &&
                        hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60) {

                        // Convert to Excel serial number
                        const excelNumber = helpers_date.dateToNum(isoDate);

                        // Verify by rendering back
                        const rendered = Component.render(excelNumber, { mask: mask }, true);

                        // Case-insensitive comparison for month names
                        if (rendered.toLowerCase() === value.toLowerCase()) {
                            return {
                                mask: mask,
                                value: excelNumber,
                            };
                        }
                    }
                }
            } catch (e) {
            }
        }

        // No matching format found
        return null;
    };

    const autoCastingCurrency = function (input) {
        if (typeof input !== 'string') return null;

        const original = input.trim();

        const isNegative = /^\s*[-(]/.test(original);
        const hasParens = /^\s*\(.+\)\s*$/.test(original);
        let value = original.replace(/[()\-]/g, '').trim();

        // Known symbols
        const knownSymbols = ['$', '€', '£', '¥', '₹', '₽', '₩', '₫', 'R$', 'CHF', 'AED'];
        let symbol = '';

        for (let s of knownSymbols) {
            const escaped = s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`^${escaped}(\\s?)`);
            const match = value.match(regex);
            if (match) {
                symbol = s + (match[1] || '');
                value = value.replace(regex, '');
                break;
            }
        }

        // Generic symbol/prefix (e.g., "U$", "US$")
        if (!symbol) {
            const prefixMatch = value.match(/^([^\d\s.,-]{1,4})(\s?)/);
            if (prefixMatch) {
                symbol = prefixMatch[1] + (prefixMatch[2] || '');
                value = value.replace(prefixMatch[0], '');
            }
        }

        // Code suffix (e.g., USD, BRL)
        const codeMatch = value.match(/([A-Z]{3})$/);
        if (codeMatch) {
            value = value.replace(codeMatch[1], '').trim();
            if (!symbol) symbol = codeMatch[1] + ' ';
        }

        value = value.replace(/\s+/g, '');

        // Infer separators
        let group = ',', decimal = '.';

        if (value.includes(',') && value.includes('.')) {
            const lastComma = value.lastIndexOf(',');
            const lastDot = value.lastIndexOf('.');
            if (lastComma > lastDot) {
                group = '.';
                decimal = ',';
            } else {
                group = ',';
                decimal = '.';
            }
        } else if (value.includes('.')) {
            const parts = value.split('.');
            const lastPart = parts[parts.length - 1];
            if (/^\d{3}$/.test(lastPart)) {
                group = '.';
                decimal = ',';
            } else {
                group = ',';
                decimal = '.';
            }
        } else if (value.includes(',')) {
            const parts = value.split(',');
            const lastPart = parts[parts.length - 1];
            if (/^\d{3}$/.test(lastPart)) {
                group = ',';
                decimal = '.';
            } else {
                group = '.';
                decimal = ',';
            }
        }

        // Normalize and parse
        const normalized = value
            .replace(new RegExp(`\\${group}`, 'g'), '')
            .replace(decimal, '.');

        const parsed = parseFloat(normalized);
        if (isNaN(parsed)) return null;

        const finalValue = isNegative ? -parsed : parsed;

        // Build dynamic group + decimal mask
        const decimalPlaces = normalized.includes('.') ? normalized.split('.')[1].length : 0;
        const maskDecimal = decimalPlaces ? decimal + '0'.repeat(decimalPlaces) : '';
        const groupMask = '#' + group + '##0';
        let mask = `${symbol}${groupMask}${maskDecimal}`;

        if (isNegative) {
            mask = hasParens ? `(${mask})` : `-${mask}`;
        }

        return {
            mask,
            value: finalValue
        };
    }

    const autoCastingNumber = function (input) {
        // If you currently support numeric inputs directly, keep this:
        if (typeof input === 'number' && Number.isFinite(input)) {
            return { mask: '0', value: input };
        }

        if (typeof input !== 'string') {
            return null;
        }

        // Keep YOUR existing cleaning/parsing here:
        // (example placeholders; keep your real code)
        const sRaw = input.trim();                 // <= use only trim here
        // e.g. your current validation:
        if (!/^[+-]?\d+$/.test(sRaw)) {
            return null;
        }

        const sign = /^[+-]/.test(sRaw) ? sRaw[0] : '';
        const digitsClean = (sign ? sRaw.slice(1) : sRaw); // keep as you already do

        // ***** NEW: mask derived from RAW leading zeros only *****
        const rawDigits = sign ? sRaw.slice(1) : sRaw;     // no extra cleaning here
        const m = rawDigits.match(/^0+/);
        const leadingZeros = m ? m[0].length : 0;

        const mask = leadingZeros > 0 ? '0'.repeat(rawDigits.length) : '0';

        // Your existing numeric value (from the cleaned digits)
        const value = Number(sign + digitsClean);

        return { mask, value };
    };

    const autoCastingScientific = function(input) {
        if (typeof input !== 'string') return null;

        const original = input.trim();

        // Match scientific notation: 1e3, -2.5E-4, etc.
        const sciPattern = /^[-+]?\d*\.?\d+[eE][-+]?\d+$/;
        if (!sciPattern.test(original)) return null;

        const parsed = parseFloat(original);
        if (isNaN(parsed)) return null;

        // Extract parts to determine mask
        const [coefficient, exponent] = original.toLowerCase().split('e');
        const decimalPlaces = coefficient.includes('.') ? coefficient.split('.')[1].length : 0;
        const mask = `0${decimalPlaces ? '.' + '0'.repeat(decimalPlaces) : ''}E+00`;

        return {
            mask,
            value: parsed
        };
    }

    const autoCastingTime = function (input) {
        if (typeof input !== 'string') return null;
        const original = input.trim();

        // hh:mm[:ss][ am/pm]
        const m = original.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(am|pm))?$/i);
        if (!m) return null;

        let h = parseInt(m[1], 10);
        const i = parseInt(m[2], 10);
        const s = m[3] ? parseInt(m[3], 10) : 0;
        const mer = m[4] && m[4].toLowerCase();

        // basic range checks
        if (i > 59 || s > 59) return null;
        if (mer) {
            if (h < 1 || h > 12) return null;
            if (mer === 'pm' && h < 12) h += 12;
            if (mer === 'am' && h === 12) h = 0;
        } else {
            if (h > 23) return null;
        }

        // Excel serial for time-of-day = hours/24 + minutes/1440 + seconds/86400
        const excel = (h + i / 60 + s / 3600) / 24;

        // Build mask according to how user typed it
        const hourToken = m[1].length === 1 ? 'h' : 'hh';
        const base = s !== 0 || m[3] ? `${hourToken}:mm:ss` : `${hourToken}:mm`;
        const mask = mer ? `${base} am/pm` : base;

        // Verify we can render back exactly what the user typed
        if (testMask(mask, excel, original)) {            // uses Component.render under the hood
            return { mask: mask, value: excel};
        }

        // Try alternate hour width if needed
        const altHour = hourToken === 'hh' ? 'h' : 'hh';
        const alt = mer
            ? `${altHour}${base.slice(hourToken.length)} am/pm`
            : `${altHour}${base.slice(hourToken.length)}`;

        if (testMask(alt, excel, original)) {
            return { mask: alt, value: excel };
        }

        return null;
    };

    const ParseValue = function(v, config) {
        if (v === '') return '';

        const decimal = config.decimal || '.';

        v = ('' + v).split(decimal);

        // Detect negative sign
        let signal = v[0].includes('-');

        v[0] = v[0].match(/[0-9]+/g);
        if (v[0]) {
            if (signal) v[0].unshift('-');
            v[0] = v[0].join('');
        } else {
            v[0] = signal ? '-' : '';
        }

        if (v[1] !== undefined) {
            v[1] = v[1].match(/[0-9]+/g);
            v[1] = v[1] ? v[1].join('') : '';
        }

        return v[0] || v[1] ? v : '';
    }

    const Extract = function(v, config) {
        const parsed = ParseValue(v, config);
        if (parsed) {
            if (parsed[0] === '-') {
                parsed[0] = '-0';
            }
            return parseFloat(parsed.join('.'));
        }
        return null;
    }

    /**
     * Try to get which mask that can transform the number in that format
     */
    Component.autoCasting = function(value, returnObject) {
        const methods = [
            autoCastingDates,        // Most structured, the least ambiguous
            autoCastingTime,
            autoCastingFractions,    // Specific pattern with slashes
            autoCastingPercent,      // Recognizable with "%"
            autoCastingScientific,
            autoCastingNumber,       // Only picks up basic digits, decimals, leading 0s
            autoCastingCurrency,     // Complex formats, but recognizable
        ];

        for (let method of methods) {
            const test = method(value);
            if (test) {
                return test;
            }
        }

        return null;
    }

    Component.extract = function(value, options, returnObject) {
        if (!value || typeof options !== 'object') return value;

        // Get decimal, group, type, etc.
        const config = getConfig(options, value);
        const type = config.type;

        let result;
        let o = options;

        if (type === 'text') {
            result = value;
        } else if (type === 'general') {
            result = Component(value, options);
        } else if (type === 'datetime') {
            if (value instanceof Date) {
                value = Component.getDateString(value, config.mask);
            }

            o = Component(value, options, true);

            result = typeof o.value === 'number' ? o.value : extractDate.call(o);
        } else if (type === 'scientific') {
            result = typeof value === 'string' ? Number(value) : value;
        } else if (type === 'fraction') {
            // Parse a fraction string according to the mask (supports mixed "# ?/d" or simple "?/d")
            const mask = config.mask;

            // Detect fixed denominator (e.g. "# ?/16" or "?/8")
            const fixedDenMatch = mask.match(/\/\s*(\d+)\s*$/);
            const fixedDen = fixedDenMatch ? parseInt(fixedDenMatch[1], 10) : null;

            // Whether a mask allows a whole part (e.g. "# ?/?")
            const allowWhole = mask.includes('#');

            let s = ('' + value).trim();
            if (! s) {
                result = null;
            } else {
                // Allow leading parentheses or '-' for negatives
                let sign = 1;
                if (/^\(.*\)$/.test(s)) {
                    sign = -1;
                    s = s.slice(1, -1).trim();
                }
                if (/^\s*-/.test(s)) {
                    sign = -1;
                    s = s.replace(/^\s*-/, '').trim();
                }

                let out = null;

                if (s.includes('/')) {
                    // sign? (whole )? numerator / denominator
                    // Examples:
                    //  "1 1/2" => whole=1, num=1, den=2
                    //  "1/2"   => whole=undefined, num=1, den=2
                    const m = s.match(/^\s*(?:(\d+)\s+)?(\d+)\s*\/\s*(\d+)\s*$/);
                    if (m) {
                        const whole = allowWhole && m[1] ? parseInt(m[1], 10) : 0;
                        const num = parseInt(m[2], 10);
                        let den = parseInt(m[3], 10);

                        // If mask fixes the denominator, enforce it
                        if (fixedDen) den = fixedDen;

                        if (den !== 0) {
                            out = sign * (whole + num / den);
                        }
                    }
                } else {
                    // No slash → treats as a plain number (e.g., whole only)
                    const plain = Number(s.replace(',', '.'));
                    if (!Number.isNaN(plain)) {
                        out = sign * Math.abs(plain);
                    }
                }

                result = out;
            }
        } else {
            // Default fallback — numeric/currency/percent/etc.
            result = Extract(value, config);
            // Adjust percent
            if (type === 'percentage' && ('' + value).indexOf('%') !== -1) {
                result = result / 100;
            }
        }

        o.value = result;

        if (! o.type && type) {
            o.type = type;
        }

        return returnObject ? o : result;
    };

    // TODO: We have a large number like 1000000 and I want format it to 1,00 or 1M or… (display million/thousands/full numbers). In the excel we can do that with custom format cell “0,00..” However, when I tried applying similar formatting with the mask cell of Jspreadsheet, it didn't work. Could you advise how we can achieve this?

    Component.render = function(value, options, fullMask) {
        // Nothing to render
        if (value === '' || value === undefined || value === null) {
            return '';
        }

        // Config
        const config = getConfig(options, value);

        // Percentage
        if (config.type === 'datetime') {
            var t = Component.getDateString(value, config.mask);
            if (t) {
                value = t;
            } else {
                return '';
            }
        } else if (config.type === 'text') {
            // Parse number
            if (typeof(value) === 'number') {
                value = value.toString();
            }
        } else {
            if (config.type === 'percentage') {
                if (typeof(value) === 'string' && value.indexOf('%') !== -1) {
                    value = value.replace('%', '');
                } else {
                    value = adjustPrecision(Number(value) * 100);
                }
            } else {
                if (config.mask.includes(',,M')) {
                    if (typeof(value) === 'string' && value.indexOf('M') !== -1) {
                        value = value.replace('M', '');
                    } else {
                        value = Number(value) / 1000000;
                    }
                } else if (config.mask.includes(',,,B')) {
                    if (typeof(value) === 'string' && value.indexOf('B') !== -1) {
                        value = value.replace('B', '');
                    } else {
                        value = Number(value) / 1000000000;
                    }
                }
            }

            if (typeof(value) === 'string' && isNumber(value)) {
                value = Number(value);
            }

            if (typeof value === 'number') {
                // Temporary value
                let temp = value;

                if (config.type === 'fraction') {
                    temp = formatFraction(value, config.mask);
                } else {
                    if (fullMask) {
                        temp = adjustNumberOfDecimalPlaces(config, value);

                        if (config.type === 'scientific') {
                            return temp;
                        }
                    }
                }

                value = toPlainString(temp);

                if (config.decimal === ',') {
                    value = value.replace('.', config.decimal);
                }
            }
        }

        // Process mask
        let control = Component(value, options, true);
        // Complement render
        if (fullMask) {
            processNumOfPaddingZeros(control);
        }

        return getValue(control);
    }

    // Helper to extract date from a string
    Component.extractDateFromString = function (date, format) {
        let o = Component(date, { mask: format }, true);

        // Check if in format Excel (Need difference with format date or type detected is numeric)
        if (date > 0 && Number(date) == date && (o.values.join("") !== o.value || o.type == "numeric")) {
            var d = new Date(Math.round((date - 25569) * 86400 * 1000));
            return d.getFullYear() + "-" + helpers.two(d.getMonth()) + "-" + helpers.two(d.getDate()) + ' 00:00:00';
        }

        let complete = false;

        if (o.values && o.values.length === o.tokens.length && o.values[o.values.length - 1].length >= o.tokens[o.tokens.length - 1].length) {
            complete = true;
        }

        if (o.date[0] && o.date[1] && (o.date[2] || complete)) {
            if (!o.date[2]) {
                o.date[2] = 1;
            }

            return o.date[0] + '-' + helpers.two(o.date[1]) + '-' + helpers.two(o.date[2]) + ' ' + helpers.two(o.date[3]) + ':' + helpers.two(o.date[4]) + ':' + helpers.two(o.date[5]);
        }

        return '';
    }

    Component.getDateString = function(value, options) {
        if (! options) {
            options = {};
        }

        // Labels
        let format;

        if (options && typeof(options) == 'object') {
            if (options.format) {
                format = options.format;
            } else if (options.mask) {
                format = options.mask;
            }
        } else {
            format = options;
        }

        if (! format) {
            format = 'YYYY-MM-DD';
        }

        format = format.toUpperCase();

        // Date instance
        if (value instanceof Date) {
            value = helpers_date.now(value);
        } else if (helpers.isNumeric(value)) {
            value = helpers_date.numToDate(value);
        }

        // Tokens
        let tokens = ['DAY', 'WD', 'DDDD', 'DDD', 'DD', 'D', 'Q', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'YYYY', 'YYY', 'YY', 'Y', 'MONTH', 'MON', 'MMMMM', 'MMMM', 'MMM', 'MM', 'M', '.'];

        // Expression to extract all tokens from the string
        let e = new RegExp(tokens.join('|'), 'gi');
        // Extract
        let t = format.match(e);

        // Compatibility with Excel
        fixMinuteToken(t);

        // Object
        const o = {
            tokens: t
        }

        // Value
        if (value) {
            try {
                // Data
                o.data = extractDateAndTime(value);

                if (o.data[1] && o.data[1] > 12) {
                    throw new Error('Invalid date');
                } else if (o.data[4] && o.data[4] > 59) {
                    throw new Error('Invalid date');
                } else if (o.data[5] && o.data[5] > 59) {
                    throw new Error('Invalid date');
                } else if (o.data[0] != null && o.data[1] != null) {
                    let day = new Date(o.data[0], o.data[1], 0).getDate();
                    if (o.data[2] > day) {
                        throw new Error('Invalid date');
                    }
                }

                // Value
                o.value = [];

                // Calendar instance
                let calendar = new Date(o.data[0], o.data[1] - 1, o.data[2], o.data[3], o.data[4], o.data[5]);

                // Get method
                const get = function (i) {
                    // Token
                    let t = this.tokens[i];

                    // Case token
                    let s = t.toUpperCase();
                    let v = null;

                    if (s === 'YYYY') {
                        v = this.data[0];
                    } else if (s === 'YYY') {
                        v = this.data[0].substring(1, 4);
                    } else if (s === 'YY') {
                        v = this.data[0].substring(2, 4);
                    } else if (s === 'Y') {
                        v = this.data[0].substring(3, 4);
                    } else if (t === 'MON') {
                        v = helpers_date.months[calendar.getMonth()].substr(0, 3).toUpperCase();
                    } else if (t === 'mon') {
                        v = helpers_date.months[calendar.getMonth()].substr(0, 3).toLowerCase();
                    } else if (t === 'MONTH') {
                        v = helpers_date.months[calendar.getMonth()].toUpperCase();
                    } else if (t === 'month') {
                        v = helpers_date.months[calendar.getMonth()].toLowerCase();
                    } else if (s === 'MMMMM') {
                        v = helpers_date.months[calendar.getMonth()].substr(0, 1);
                    } else if (s === 'MMMM' || t === 'Month') {
                        v = helpers_date.months[calendar.getMonth()];
                    } else if (s === 'MMM' || t == 'Mon') {
                        v = helpers_date.months[calendar.getMonth()].substr(0, 3);
                    } else if (s === 'MM') {
                        v = helpers.two(this.data[1]);
                    } else if (s === 'M') {
                        v = calendar.getMonth() + 1;
                    } else if (t === 'DAY') {
                        v = helpers_date.weekdays[calendar.getDay()].toUpperCase();
                    } else if (t === 'day') {
                        v = helpers_date.weekdays[calendar.getDay()].toLowerCase();
                    } else if (s === 'DDDD' || t == 'Day') {
                        v = helpers_date.weekdays[calendar.getDay()];
                    } else if (s === 'DDD') {
                        v = helpers_date.weekdays[calendar.getDay()].substr(0, 3);
                    } else if (s === 'DD') {
                        v = helpers.two(this.data[2]);
                    } else if (s === 'D') {
                        v = parseInt(this.data[2]);
                    } else if (s === 'Q') {
                        v = Math.floor((calendar.getMonth() + 3) / 3);
                    } else if (s === 'HH24' || s === 'HH') {
                        v = this.data[3]%24;
                        if (this.tokens.indexOf('AM/PM') !== -1) {
                            if (v > 12) {
                                v -= 12;
                            } else if (v == '0' || v == '00') {
                                v = 12;
                            }
                        }
                        v = helpers.two(v);
                    } else if (s === 'HH12') {
                        v = this.data[3]%24;
                        if (v > 12) {
                            v = helpers.two(v - 12);
                        } else {
                            v = helpers.two(v);
                        }
                    } else if (s === 'H') {
                        v = this.data[3]%24;
                        if (this.tokens.indexOf('AM/PM') !== -1) {
                            if (v > 12) {
                                v -= 12;
                            } else if (v == '0' || v == '00') {
                                v = 12;
                            }
                        }
                    } else if (s === '[H]') {
                        v = this.data[3];
                    } else if (s === 'MI') {
                        v = helpers.two(this.data[4]);
                    } else if (s === 'I') {
                        v = parseInt(this.data[4]);
                    } else if (s === 'SS') {
                        v = helpers.two(this.data[5]);
                    } else if (s === 'S') {
                        v = parseInt(this.data[5]);
                    } else if (s === 'MS') {
                        v = calendar.getMilliseconds();
                    } else if (s === 'AM/PM') {
                        if (this.data[3] >= 12) {
                            v = 'PM';
                        } else {
                            v = 'AM';
                        }
                    } else if (s === 'WD') {
                        v = helpers_date.weekdays[calendar.getDay()];
                    }

                    if (v === null) {
                        this.value[i] = this.tokens[i];
                    } else {
                        this.value[i] = v;
                    }
                }

                for (let i = 0; i < o.tokens.length; i++) {
                    get.call(o, i);
                }

                value = o.value.join('');
            } catch (e) {
                value = '';
            }
        }

        return value;
    }

    Component.oninput = function(e) {
        // Element
        let element = e.target;
        // Property
        let property = 'value';
        // Get the value of the input
        if (element.tagName !== 'INPUT') {
            property = 'textContent';
        }
        // Value
        let value = element[property];
        // Get the mask
        let mask = element.getAttribute('data-mask');
        // Keep the current caret position
        let caret = getCaret(element);
        if (caret) {
            value = value.substring(0, caret) + "\u200B" + value.substring(caret);
        }

        // Run mask
        let result = Component(value, { mask: mask }, true);

        // New value
        let newValue = result.values.join('');
        // Apply the result back to the element
        if (newValue !== value && ! e.inputType.includes('delete')) {
            // Set the caret to the position before transformation
            let caret = newValue.indexOf("\u200B");
            if (caret !== -1) {
                // Apply value
                element[property] = newValue.replace("\u200B", "");
                // Set caret
                setCaret.call(element, caret);
            } else {
                // Apply value
                element[property] = newValue;
            }
        }
    }

    return Component;
}

/* harmony default export */ var mask = (Mask());

;// CONCATENATED MODULE: ./src/plugins/calendar.js







function Calendar() {
    var Component = (function (el, options) {
        // Already created, update options
        if (el.calendar) {
            return el.calendar.setOptions(options, true);
        }

        // New instance
        var obj = {type: 'calendar'};
        obj.options = {};

        // Date
        obj.date = null;

        /**
         * Update options
         */
        obj.setOptions = function (options, reset) {
            // Default configuration
            var defaults = {
                // Render type: [ default | year-month-picker ]
                type: 'default',
                // Restrictions
                validRange: null,
                // Starting weekday - 0 for sunday, 6 for saturday
                startingDay: null,
                // Date format
                format: 'DD/MM/YYYY',
                // Allow keyboard date entry
                readonly: true,
                // Today is default
                today: false,
                // Show timepicker
                time: false,
                // Show the reset button
                resetButton: true,
                // Placeholder
                placeholder: '',
                // Translations can be done here
                months: helpers_date.monthsShort,
                monthsFull: helpers_date.months,
                weekdays: helpers_date.weekdays,
                textDone: dictionary.translate('Done'),
                textReset: dictionary.translate('Reset'),
                textUpdate: dictionary.translate('Update'),
                // Value
                value: null,
                // Fullscreen (this is automatic set for screensize < 800)
                fullscreen: false,
                // Create the calendar closed as default
                opened: false,
                // Events
                onopen: null,
                onclose: null,
                onchange: null,
                onupdate: null,
                // Internal mode controller
                mode: null,
                position: null,
                // Data type
                dataType: null,
                // Controls
                controls: true,
                // Auto select
                autoSelect: true,
            }

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof (obj.options[property]) == 'undefined' || reset === true) {
                        obj.options[property] = defaults[property];
                    }
                }
            }

            // Reset button
            if (obj.options.resetButton == false) {
                calendarReset.style.display = 'none';
            } else {
                calendarReset.style.display = '';
            }

            // Readonly
            if (obj.options.readonly) {
                el.setAttribute('readonly', 'readonly');
            } else {
                el.removeAttribute('readonly');
            }

            // Placeholder
            if (obj.options.placeholder) {
                el.setAttribute('placeholder', obj.options.placeholder);
            } else {
                el.removeAttribute('placeholder');
            }

            if (helpers.isNumeric(obj.options.value) && obj.options.value > 0) {
                obj.options.value = Component.numToDate(obj.options.value);
                // Data type numeric
                obj.options.dataType = 'numeric';
            }

            // Texts
            calendarReset.innerHTML = obj.options.textReset;
            calendarConfirm.innerHTML = obj.options.textDone;
            calendarControlsUpdateButton.innerHTML = obj.options.textUpdate;

            // Define mask
            if (obj.options.format) {
                el.setAttribute('data-mask', obj.options.format.toLowerCase());
            }

            // Value
            if (!obj.options.value && obj.options.today) {
                var value = Component.now();
            } else {
                var value = obj.options.value;
            }

            // Set internal date
            if (value) {
                // Force the update
                obj.options.value = null;
                // New value
                obj.setValue(value);
            }

            return obj;
        }

        /**
         * Open the calendar
         */
        obj.open = function (value) {
            if (!calendar.classList.contains('jcalendar-focus')) {
                if (!calendar.classList.contains('jcalendar-inline')) {
                    // Current
                    Component.current = obj;
                    // Start tracking
                    tracking(obj, true);
                    // Create the days
                    obj.getDays();
                    // Render months
                    if (obj.options.type == 'year-month-picker') {
                        obj.getMonths();
                    }
                    // Get time
                    if (obj.options.time) {
                        calendarSelectHour.value = obj.date[3];
                        calendarSelectMin.value = obj.date[4];
                    }

                    // Show calendar
                    calendar.classList.add('jcalendar-focus');

                    // Get the position of the corner helper
                    if (helpers.getWindowWidth() < 800 || obj.options.fullscreen) {
                        calendar.classList.add('jcalendar-fullsize');
                        // Animation
                        animation.slideBottom(calendarContent, 1);
                    } else {
                        calendar.classList.remove('jcalendar-fullsize');

                        var rect = el.getBoundingClientRect();
                        var rectContent = calendarContent.getBoundingClientRect();

                        if (obj.options.position) {
                            calendarContainer.style.position = 'fixed';
                            if (window.innerHeight < rect.bottom + rectContent.height) {
                                calendarContainer.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                            } else {
                                calendarContainer.style.top = (rect.top + rect.height + 2) + 'px';
                            }
                            calendarContainer.style.left = rect.left + 'px';
                        } else {
                            if (window.innerHeight < rect.bottom + rectContent.height) {
                                var d = -1 * (rect.height + rectContent.height + 2);
                                if (d + rect.top < 0) {
                                    d = -1 * (rect.top + rect.height);
                                }
                                calendarContainer.style.top = d + 'px';
                            } else {
                                calendarContainer.style.top = 2 + 'px';
                            }

                            if (window.innerWidth < rect.left + rectContent.width) {
                                var d = window.innerWidth - (rect.left + rectContent.width + 20);
                                calendarContainer.style.left = d + 'px';
                            } else {
                                calendarContainer.style.left = '0px';
                            }
                        }
                    }

                    // Events
                    if (typeof (obj.options.onopen) == 'function') {
                        obj.options.onopen(el);
                    }
                }
            }
        }

        obj.close = function (ignoreEvents, update) {
            if (obj.options.autoSelect !== true && typeof(update) === 'undefined') {
                update = false;
            }
            if (calendar.classList.contains('jcalendar-focus')) {
                if (update !== false) {
                    var element = calendar.querySelector('.jcalendar-selected');

                    if (typeof (update) == 'string') {
                        var value = update;
                    } else if (!element || element.classList.contains('jcalendar-disabled')) {
                        var value = obj.options.value
                    } else {
                        var value = obj.getValue();
                    }

                    obj.setValue(value);
                } else {
                    let value = obj.options.value || '';
                    obj.options.value = null;
                    obj.setValue(value)
                }

                // Events
                if (!ignoreEvents && typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el);
                }
                // Hide
                calendar.classList.remove('jcalendar-focus');
                // Stop tracking
                tracking(obj, false);
                // Current
                Component.current = null;
            }

            return obj.options.value;
        }

        obj.prev = function () {
            // Check if the visualization is the days picker or years picker
            if (obj.options.mode == 'years') {
                obj.date[0] = obj.date[0] - 12;

                // Update picker table of days
                obj.getYears();
            } else if (obj.options.mode == 'months') {
                obj.date[0] = parseInt(obj.date[0]) - 1;
                // Update picker table of months
                obj.getMonths();
            } else {
                // Go to the previous month
                if (obj.date[1] < 2) {
                    obj.date[0] = obj.date[0] - 1;
                    obj.date[1] = 12;
                } else {
                    obj.date[1] = obj.date[1] - 1;
                }

                // Update picker table of days
                obj.getDays();
            }
        }

        obj.next = function () {
            // Check if the visualization is the days picker or years picker
            if (obj.options.mode == 'years') {
                obj.date[0] = parseInt(obj.date[0]) + 12;

                // Update picker table of days
                obj.getYears();
            } else if (obj.options.mode == 'months') {
                obj.date[0] = parseInt(obj.date[0]) + 1;
                // Update picker table of months
                obj.getMonths();
            } else {
                // Go to the previous month
                if (obj.date[1] > 11) {
                    obj.date[0] = parseInt(obj.date[0]) + 1;
                    obj.date[1] = 1;
                } else {
                    obj.date[1] = parseInt(obj.date[1]) + 1;
                }

                // Update picker table of days
                obj.getDays();
            }
        }

        /**
         * Set today
         */
        obj.setToday = function () {
            // Today
            var value = new Date().toISOString().substr(0, 10);
            // Change value
            obj.setValue(value);
            // Value
            return value;
        }

        obj.setValue = function (val) {
            if (!val) {
                val = '' + val;
            }
            // Values
            var newValue = val;
            var oldValue = obj.options.value;

            if (oldValue != newValue) {
                // Set label
                if (!newValue) {
                    obj.date = null;
                    var val = '';
                    el.classList.remove('jcalendar_warning');
                    el.title = '';
                } else {
                    var value = obj.setLabel(newValue, obj.options);
                    var date = newValue.split(' ');
                    if (!date[1]) {
                        date[1] = '00:00:00';
                    }
                    var time = date[1].split(':')
                    var date = date[0].split('-');
                    var y = parseInt(date[0]);
                    var m = parseInt(date[1]);
                    var d = parseInt(date[2]);
                    var h = parseInt(time[0]);
                    var i = parseInt(time[1]);
                    obj.date = [y, m, d, h, i, 0];
                    var val = obj.setLabel(newValue, obj.options);

                    // Current selection day
                    var current = Component.now(new Date(y, m - 1, d), true);

                    // Available ranges
                    if (obj.options.validRange) {
                        if (!obj.options.validRange[0] || current >= obj.options.validRange[0]) {
                            var test1 = true;
                        } else {
                            var test1 = false;
                        }

                        if (!obj.options.validRange[1] || current <= obj.options.validRange[1]) {
                            var test2 = true;
                        } else {
                            var test2 = false;
                        }

                        if (!(test1 && test2)) {
                            el.classList.add('jcalendar_warning');
                            el.title = dictionary.translate('Date outside the valid range');
                        } else {
                            el.classList.remove('jcalendar_warning');
                            el.title = '';
                        }
                    } else {
                        el.classList.remove('jcalendar_warning');
                        el.title = '';
                    }
                }

                // New value
                obj.options.value = newValue;

                if (typeof (obj.options.onchange) == 'function') {
                    obj.options.onchange(el, newValue, oldValue);
                }

                // Lemonade JS
                if (el.value != val) {
                    el.value = val;
                    if (typeof (el.oninput) == 'function') {
                        el.oninput({
                            type: 'input',
                            target: el,
                            value: el.value
                        });
                    }
                }
            }

            if (obj.date) {
                obj.getDays();
                // Render months
                if (obj.options.type == 'year-month-picker') {
                    obj.getMonths();
                }
            }
        }

        obj.getValue = function () {
            if (obj.date) {
                if (obj.options.time) {
                    return helpers.two(obj.date[0]) + '-' + helpers.two(obj.date[1]) + '-' + helpers.two(obj.date[2]) + ' ' + helpers.two(obj.date[3]) + ':' + helpers.two(obj.date[4]) + ':' + helpers.two(0);
                } else {
                    return helpers.two(obj.date[0]) + '-' + helpers.two(obj.date[1]) + '-' + helpers.two(obj.date[2]) + ' ' + helpers.two(0) + ':' + helpers.two(0) + ':' + helpers.two(0);
                }
            } else {
                return "";
            }
        }

        /**
         *  Calendar
         */
        obj.update = function (element, v) {
            if (element.classList.contains('jcalendar-disabled')) {
                // Do nothing
            } else {
                var elements = calendar.querySelector('.jcalendar-selected');
                if (elements) {
                    elements.classList.remove('jcalendar-selected');
                }
                element.classList.add('jcalendar-selected');

                if (element.classList.contains('jcalendar-set-month')) {
                    obj.date[1] = v;
                    obj.date[2] = 1; // first day of the month
                } else {
                    obj.date[2] = element.innerText;
                }

                if (!obj.options.time) {
                    obj.close(null, true);
                } else {
                    obj.date[3] = calendarSelectHour.value;
                    obj.date[4] = calendarSelectMin.value;
                }
            }

            // Update
            updateActions();
        }

        /**
         * Set to blank
         */
        obj.reset = function () {
            // Close calendar
            obj.setValue('');
            obj.date = null;
            obj.close(false, false);
        }

        /**
         * Get calendar days
         */
        obj.getDays = function () {
            // Mode
            obj.options.mode = 'days';

            // Setting current values in case of NULLs
            var date = new Date();

            // Current selection
            var year = obj.date && helpers.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());
            var month = obj.date && helpers.isNumeric(obj.date[1]) ? obj.date[1] : parseInt(date.getMonth()) + 1;
            var day = obj.date && helpers.isNumeric(obj.date[2]) ? obj.date[2] : parseInt(date.getDate());
            var hour = obj.date && helpers.isNumeric(obj.date[3]) ? obj.date[3] : parseInt(date.getHours());
            var min = obj.date && helpers.isNumeric(obj.date[4]) ? obj.date[4] : parseInt(date.getMinutes());

            // Selection container
            obj.date = [year, month, day, hour, min, 0];

            // Update title
            calendarLabelYear.innerHTML = year;
            calendarLabelMonth.innerHTML = obj.options.months[month - 1];

            // Current month and Year
            var isCurrentMonthAndYear = (date.getMonth() == month - 1) && (date.getFullYear() == year) ? true : false;
            var currentDay = date.getDate();

            // Number of days in the month
            var date = new Date(year, month, 0, 0, 0);
            var numberOfDays = date.getDate();

            // First day
            var date = new Date(year, month - 1, 0, 0, 0);
            var firstDay = date.getDay() + 1;

            // Index value
            var index = obj.options.startingDay || 0;

            // First of day relative to the starting calendar weekday
            firstDay = firstDay - index;

            // Reset table
            calendarBody.innerHTML = '';

            // Weekdays Row
            var row = document.createElement('tr');
            row.setAttribute('align', 'center');
            calendarBody.appendChild(row);

            // Create weekdays row
            for (var i = 0; i < 7; i++) {
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-weekday')
                cell.innerHTML = obj.options.weekdays[index].substr(0, 1);
                row.appendChild(cell);
                // Next week day
                index++;
                // Restart index
                if (index > 6) {
                    index = 0;
                }
            }

            // Index of days
            var index = 0;
            var d = 0;

            // Calendar table
            for (var j = 0; j < 6; j++) {
                // Reset cells container
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                row.style.height = '34px';

                // Create cells
                for (var i = 0; i < 7; i++) {
                    // Create cell
                    var cell = document.createElement('td');
                    cell.classList.add('jcalendar-set-day');

                    if (index >= firstDay && index < (firstDay + numberOfDays)) {
                        // Day cell
                        d++;
                        cell.innerHTML = d;

                        // Selected
                        if (d == day) {
                            cell.classList.add('jcalendar-selected');
                        }

                        // Current selection day is today
                        if (isCurrentMonthAndYear && currentDay == d) {
                            cell.style.fontWeight = 'bold';
                        }

                        // Current selection day
                        var current = Component.now(new Date(year, month - 1, d), true);

                        // Available ranges
                        if (obj.options.validRange) {
                            if (!obj.options.validRange[0] || current >= obj.options.validRange[0]) {
                                var test1 = true;
                            } else {
                                var test1 = false;
                            }

                            if (!obj.options.validRange[1] || current <= obj.options.validRange[1]) {
                                var test2 = true;
                            } else {
                                var test2 = false;
                            }

                            if (!(test1 && test2)) {
                                cell.classList.add('jcalendar-disabled');
                            }
                        }
                    }
                    // Day cell
                    row.appendChild(cell);
                    // Index
                    index++;
                }

                // Add cell to the calendar body
                calendarBody.appendChild(row);
            }

            // Show time controls
            if (obj.options.time) {
                calendarControlsTime.style.display = '';
            } else {
                calendarControlsTime.style.display = 'none';
            }

            // Update
            updateActions();
        }

        obj.getMonths = function () {
            // Mode
            obj.options.mode = 'months';

            // Loading month labels
            var months = obj.options.months;

            // Value
            var value = obj.options.value;

            // Current date
            var date = new Date();
            var currentYear = parseInt(date.getFullYear());
            var currentMonth = parseInt(date.getMonth()) + 1;
            var selectedYear = obj.date && helpers.isNumeric(obj.date[0]) ? obj.date[0] : currentYear;
            var selectedMonth = obj.date && helpers.isNumeric(obj.date[1]) ? obj.date[1] : currentMonth;

            // Update title
            calendarLabelYear.innerHTML = obj.date[0];
            calendarLabelMonth.innerHTML = months[selectedMonth - 1];

            // Table
            var table = document.createElement('table');
            table.setAttribute('width', '100%');

            // Row
            var row = null;

            // Calendar table
            for (var i = 0; i < 12; i++) {
                if (!(i % 4)) {
                    // Reset cells container
                    var row = document.createElement('tr');
                    row.setAttribute('align', 'center');
                    table.appendChild(row);
                }

                // Create cell
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-set-month');
                cell.setAttribute('data-value', i + 1);
                cell.innerText = months[i];

                if (obj.options.validRange) {
                    var current = selectedYear + '-' + helpers.two(i + 1);
                    if (!obj.options.validRange[0] || current >= obj.options.validRange[0].substr(0, 7)) {
                        var test1 = true;
                    } else {
                        var test1 = false;
                    }

                    if (!obj.options.validRange[1] || current <= obj.options.validRange[1].substr(0, 7)) {
                        var test2 = true;
                    } else {
                        var test2 = false;
                    }

                    if (!(test1 && test2)) {
                        cell.classList.add('jcalendar-disabled');
                    }
                }

                if (i + 1 == selectedMonth) {
                    cell.classList.add('jcalendar-selected');
                }

                if (currentYear == selectedYear && i + 1 == currentMonth) {
                    cell.style.fontWeight = 'bold';
                }

                row.appendChild(cell);
            }

            calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
            calendarBody.children[0].children[0].appendChild(table);

            // Update
            updateActions();
        }

        obj.getYears = function () {
            // Mode
            obj.options.mode = 'years';

            // Current date
            var date = new Date();
            var currentYear = date.getFullYear();
            var selectedYear = obj.date && helpers.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());

            // Array of years
            var y = [];
            for (var i = 0; i < 25; i++) {
                y[i] = parseInt(obj.date[0]) + (i - 12);
            }

            // Assembling the year tables
            var table = document.createElement('table');
            table.setAttribute('width', '100%');

            for (var i = 0; i < 25; i++) {
                if (!(i % 5)) {
                    // Reset cells container
                    var row = document.createElement('tr');
                    row.setAttribute('align', 'center');
                    table.appendChild(row);
                }

                // Create cell
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-set-year');
                cell.innerText = y[i];

                if (selectedYear == y[i]) {
                    cell.classList.add('jcalendar-selected');
                }

                if (currentYear == y[i]) {
                    cell.style.fontWeight = 'bold';
                }

                row.appendChild(cell);
            }

            calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
            calendarBody.firstChild.firstChild.appendChild(table);

            // Update
            updateActions();
        }

        obj.setLabel = function (value, mixed) {
            return Component.getDateString(value, mixed);
        }

        obj.fromFormatted = function (value, format) {
            return Component.extractDateFromString(value, format);
        }

        var mouseUpControls = function (e) {
            var element = helpers.findElement(e.target, 'jcalendar-container');
            if (element) {
                var action = e.target.className;

                // Object id
                if (action == 'jcalendar-prev') {
                    obj.prev();
                } else if (action == 'jcalendar-next') {
                    obj.next();
                } else if (action == 'jcalendar-month') {
                    obj.getMonths();
                } else if (action == 'jcalendar-year') {
                    obj.getYears();
                } else if (action == 'jcalendar-set-year') {
                    obj.date[0] = e.target.innerText;
                    if (obj.options.type == 'year-month-picker') {
                        obj.getMonths();
                    } else {
                        obj.getDays();
                    }
                } else if (e.target.classList.contains('jcalendar-set-month')) {
                    var month = parseInt(e.target.getAttribute('data-value'));
                    if (obj.options.type == 'year-month-picker') {
                        obj.update(e.target, month);
                    } else {
                        obj.date[1] = month;
                        obj.getDays();
                    }
                } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update' || action == 'jcalendar-close') {
                    obj.close(null, true);
                } else if (action == 'jcalendar-backdrop') {
                    obj.close(false, false);
                } else if (action == 'jcalendar-reset') {
                    obj.reset();
                } else if (e.target.classList.contains('jcalendar-set-day') && e.target.innerText) {
                    obj.update(e.target);
                }
            } else {
                obj.close(false, false);
            }
        }

        var keyUpControls = function (e) {
            if (e.target.value && e.target.value.length > 3) {
                var test = Component.extractDateFromString(e.target.value, obj.options.format);
                if (test) {
                    obj.setValue(test);
                }
            }
        }

        // Update actions button
        var updateActions = function () {
            var currentDay = calendar.querySelector('.jcalendar-selected');

            if (currentDay && currentDay.classList.contains('jcalendar-disabled')) {
                calendarControlsUpdateButton.setAttribute('disabled', 'disabled');
                calendarSelectHour.setAttribute('disabled', 'disabled');
                calendarSelectMin.setAttribute('disabled', 'disabled');
            } else {
                calendarControlsUpdateButton.removeAttribute('disabled');
                calendarSelectHour.removeAttribute('disabled');
                calendarSelectMin.removeAttribute('disabled');
            }

            // Event
            if (typeof (obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
            }
        }

        var calendar = null;
        var calendarReset = null;
        var calendarConfirm = null;
        var calendarContainer = null;
        var calendarContent = null;
        var calendarLabelYear = null;
        var calendarLabelMonth = null;
        var calendarTable = null;
        var calendarBody = null;

        var calendarControls = null;
        var calendarControlsTime = null;
        var calendarControlsUpdate = null;
        var calendarControlsUpdateButton = null;
        var calendarSelectHour = null;
        var calendarSelectMin = null;

        var init = function () {
            // Get value from initial element if that is an input
            if (el.tagName == 'INPUT' && el.value) {
                options.value = el.value;
            }

            // Calendar DOM elements
            calendarReset = document.createElement('div');
            calendarReset.className = 'jcalendar-reset';

            calendarConfirm = document.createElement('div');
            calendarConfirm.className = 'jcalendar-confirm';

            calendarControls = document.createElement('div');
            calendarControls.className = 'jcalendar-controls'
            calendarControls.style.borderBottom = '1px solid #ddd';
            calendarControls.appendChild(calendarReset);
            calendarControls.appendChild(calendarConfirm);

            calendarContainer = document.createElement('div');
            calendarContainer.className = 'jcalendar-container';
            calendarContent = document.createElement('div');
            calendarContent.className = 'jcalendar-content';
            calendarContainer.appendChild(calendarContent);

            // Main element
            if (el.tagName == 'DIV') {
                calendar = el;
                calendar.classList.add('jcalendar-inline');
            } else {
                // Add controls to the screen
                calendarContent.appendChild(calendarControls);

                calendar = document.createElement('div');
                calendar.className = 'jcalendar';
            }
            calendar.classList.add('jcalendar-container');
            calendar.appendChild(calendarContainer);

            // Table container
            var calendarTableContainer = document.createElement('div');
            calendarTableContainer.className = 'jcalendar-table';
            calendarContent.appendChild(calendarTableContainer);

            // Previous button
            var calendarHeaderPrev = document.createElement('td');
            calendarHeaderPrev.setAttribute('colspan', '2');
            calendarHeaderPrev.className = 'jcalendar-prev';

            // Header with year and month
            calendarLabelYear = document.createElement('span');
            calendarLabelYear.className = 'jcalendar-year';
            calendarLabelMonth = document.createElement('span');
            calendarLabelMonth.className = 'jcalendar-month';

            var calendarHeaderTitle = document.createElement('td');
            calendarHeaderTitle.className = 'jcalendar-header';
            calendarHeaderTitle.setAttribute('colspan', '3');
            calendarHeaderTitle.appendChild(calendarLabelMonth);
            calendarHeaderTitle.appendChild(calendarLabelYear);

            var calendarHeaderNext = document.createElement('td');
            calendarHeaderNext.setAttribute('colspan', '2');
            calendarHeaderNext.className = 'jcalendar-next';

            var calendarHeader = document.createElement('thead');
            var calendarHeaderRow = document.createElement('tr');
            calendarHeaderRow.appendChild(calendarHeaderPrev);
            calendarHeaderRow.appendChild(calendarHeaderTitle);
            calendarHeaderRow.appendChild(calendarHeaderNext);
            calendarHeader.appendChild(calendarHeaderRow);

            calendarTable = document.createElement('table');
            calendarBody = document.createElement('tbody');
            calendarTable.setAttribute('cellpadding', '0');
            calendarTable.setAttribute('cellspacing', '0');
            calendarTable.appendChild(calendarHeader);
            calendarTable.appendChild(calendarBody);
            calendarTableContainer.appendChild(calendarTable);

            calendarSelectHour = document.createElement('select');
            calendarSelectHour.className = 'jcalendar-select';
            calendarSelectHour.onchange = function () {
                obj.date[3] = this.value;

                // Event
                if (typeof (obj.options.onupdate) == 'function') {
                    obj.options.onupdate(el, obj.getValue());
                }
            }

                for (var i = 0; i < 24; i++) {
                    var element = document.createElement('option');
                    element.value = i;
                    element.innerHTML = helpers.two(i);
                    calendarSelectHour.appendChild(element);
                }

            calendarSelectMin = document.createElement('select');
            calendarSelectMin.className = 'jcalendar-select';
            calendarSelectMin.onchange = function () {
                obj.date[4] = this.value;

                // Event
                if (typeof (obj.options.onupdate) == 'function') {
                    obj.options.onupdate(el, obj.getValue());
                }
            }

            for (var i = 0; i < 60; i++) {
                var element = document.createElement('option');
                element.value = i;
                element.innerHTML = helpers.two(i);
                calendarSelectMin.appendChild(element);
            }

            // Footer controls
            var calendarControlsFooter = document.createElement('div');
            calendarControlsFooter.className = 'jcalendar-controls';

            calendarControlsTime = document.createElement('div');
            calendarControlsTime.className = 'jcalendar-time';
            calendarControlsTime.style.maxWidth = '140px';
            calendarControlsTime.appendChild(calendarSelectHour);
            calendarControlsTime.appendChild(calendarSelectMin);

            calendarControlsUpdateButton = document.createElement('button');
            calendarControlsUpdateButton.setAttribute('type', 'button');
            calendarControlsUpdateButton.className = 'jcalendar-update';

            calendarControlsUpdate = document.createElement('div');
            calendarControlsUpdate.style.flexGrow = '10';
            calendarControlsUpdate.appendChild(calendarControlsUpdateButton);
            calendarControlsFooter.appendChild(calendarControlsTime);

            // Only show the update button for input elements
            if (el.tagName == 'INPUT') {
                calendarControlsFooter.appendChild(calendarControlsUpdate);
            }

            calendarContent.appendChild(calendarControlsFooter);

            var calendarBackdrop = document.createElement('div');
            calendarBackdrop.className = 'jcalendar-backdrop';
            calendar.appendChild(calendarBackdrop);

            // Handle events
            el.addEventListener("keyup", keyUpControls);

            // Add global events
            calendar.addEventListener("swipeleft", function (e) {
                animation.slideLeft(calendarTable, 0, function () {
                    obj.next();
                    animation.slideRight(calendarTable, 1);
                });
                e.preventDefault();
                e.stopPropagation();
            });

            calendar.addEventListener("swiperight", function (e) {
                animation.slideRight(calendarTable, 0, function () {
                    obj.prev();
                    animation.slideLeft(calendarTable, 1);
                });
                e.preventDefault();
                e.stopPropagation();
            });

            if ('ontouchend' in document.documentElement === true) {
                calendar.addEventListener("touchend", mouseUpControls);
                el.addEventListener("touchend", obj.open);
            } else {
                calendar.addEventListener("mouseup", mouseUpControls);
                el.addEventListener("mouseup", obj.open);
            }

            // Global controls
            if (!Component.hasEvents) {
                // Execute only one time
                Component.hasEvents = true;
                // Enter and Esc
                document.addEventListener("keydown", Component.keydown);
            }

            // Set configuration
            obj.setOptions(options);

            // Append element to the DOM
            if (el.tagName == 'INPUT') {
                el.parentNode.insertBefore(calendar, el.nextSibling);
                // Add properties
                el.setAttribute('autocomplete', 'off');
                // Element
                el.classList.add('jcalendar-input');
                // Value
                el.value = obj.setLabel(obj.getValue(), obj.options);
            } else {
                // Get days
                obj.getDays();
                // Hour
                if (obj.options.time) {
                    calendarSelectHour.value = obj.date[3];
                    calendarSelectMin.value = obj.date[4];
                }
            }

            // Default opened
            if (obj.options.opened == true) {
                obj.open();
            }

            // Controls
            if (obj.options.controls == false) {
                calendarContainer.classList.add('jcalendar-hide-controls');
            }

            // Change method
            el.change = obj.setValue;

            // Global generic value handler
            el.val = function (val) {
                if (val === undefined) {
                    return obj.getValue();
                } else {
                    obj.setValue(val);
                }
            }

            // Keep object available from the node
            el.calendar = calendar.calendar = obj;
        }

        init();

        return obj;
    });

    Component.keydown = function (e) {
        var calendar = null;
        if (calendar = Component.current) {
            if (e.which == 13) {
                // ENTER
                calendar.close(false, true);
            } else if (e.which == 27) {
                // ESC
                calendar.close(false, false);
            }
        }
    }

    Component.prettify = function (d, texts) {
        if (!texts) {
            var texts = {
                justNow: 'Just now',
                xMinutesAgo: '{0}m ago',
                xHoursAgo: '{0}h ago',
                xDaysAgo: '{0}d ago',
                xWeeksAgo: '{0}w ago',
                xMonthsAgo: '{0} mon ago',
                xYearsAgo: '{0}y ago',
            }
        }

        if (d.indexOf('GMT') === -1 && d.indexOf('Z') === -1) {
            d += ' GMT';
        }

        var d1 = new Date();
        var d2 = new Date(d);
        var total = parseInt((d1 - d2) / 1000 / 60);

        String.prototype.format = function (o) {
            return this.replace('{0}', o);
        }

        if (total == 0) {
            var text = texts.justNow;
        } else if (total < 90) {
            var text = texts.xMinutesAgo.format(total);
        } else if (total < 1440) { // One day
            var text = texts.xHoursAgo.format(Math.round(total / 60));
        } else if (total < 20160) { // 14 days
            var text = texts.xDaysAgo.format(Math.round(total / 1440));
        } else if (total < 43200) { // 30 days
            var text = texts.xWeeksAgo.format(Math.round(total / 10080));
        } else if (total < 1036800) { // 24 months
            var text = texts.xMonthsAgo.format(Math.round(total / 43200));
        } else { // 24 months+
            var text = texts.xYearsAgo.format(Math.round(total / 525600));
        }

        return text;
    }

    Component.prettifyAll = function () {
        var elements = document.querySelectorAll('.prettydate');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute('data-date')) {
                elements[i].innerHTML = Component.prettify(elements[i].getAttribute('data-date'));
            } else {
                if (elements[i].innerHTML) {
                    elements[i].setAttribute('title', elements[i].innerHTML);
                    elements[i].setAttribute('data-date', elements[i].innerHTML);
                    elements[i].innerHTML = Component.prettify(elements[i].innerHTML);
                }
            }
        }
    }

    Component.now = helpers_date.now;
    Component.toArray = helpers_date.toArray;
    Component.dateToNum = helpers_date.dateToNum
    Component.numToDate = helpers_date.numToDate;
    Component.weekdays = helpers_date.weekdays;
    Component.months = helpers_date.months;
    Component.weekdaysShort = helpers_date.weekdaysShort;
    Component.monthsShort = helpers_date.monthsShort;

    // Legacy shortcut
    Component.extractDateFromString = mask.extractDateFromString;
    Component.getDateString = mask.getDateString;

    return Component;
}

/* harmony default export */ var calendar = (Calendar());
;// CONCATENATED MODULE: ./src/plugins/palette.js
// More palettes https://coolors.co/ or https://gka.github.io/palettes/#/10|s|003790,005647,ffffe0|ffffe0,ff005e,93003a|1|1

function Palette() {

    var palette = {
        material: [
            ["#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1"],
            ["#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc"],
            ["#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5"],
            ["#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae"],
            ["#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c"],
            ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"],
            ["#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a"],
            ["#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"],
            ["#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f"],
            ["#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"],
        ],
        fire: [
            ["0b1a6d", "840f38", "b60718", "de030b", "ff0c0c", "fd491c", "fc7521", "faa331", "fbb535", "ffc73a"],
            ["071147", "5f0b28", "930513", "be0309", "ef0000", "fa3403", "fb670b", "f9991b", "faad1e", "ffc123"],
            ["03071e", "370617", "6a040f", "9d0208", "d00000", "dc2f02", "e85d04", "f48c06", "faa307", "ffba08"],
            ["020619", "320615", "61040d", "8c0207", "bc0000", "c82a02", "d05203", "db7f06", "e19405", "efab00"],
            ["020515", "2d0513", "58040c", "7f0206", "aa0000", "b62602", "b94903", "c57205", "ca8504", "d89b00"],
        ],
        baby: [
            ["eddcd2", "fff1e6", "fde2e4", "fad2e1", "c5dedd", "dbe7e4", "f0efeb", "d6e2e9", "bcd4e6", "99c1de"],
            ["e1c4b3", "ffd5b5", "fab6ba", "f5a8c4", "aacecd", "bfd5cf", "dbd9d0", "baceda", "9dc0db", "7eb1d5"],
            ["daa990", "ffb787", "f88e95", "f282a9", "8fc4c3", "a3c8be", "cec9b3", "9dbcce", "82acd2", "649dcb"],
            ["d69070", "ff9c5e", "f66770", "f05f8f", "74bbb9", "87bfae", "c5b993", "83aac3", "699bca", "4d89c2"],
            ["c97d5d", "f58443", "eb4d57", "e54a7b", "66a9a7", "78ae9c", "b5a67e", "7599b1", "5c88b7", "4978aa"],
        ],
        chart: [
            ['#C1D37F', '#4C5454', '#FFD275', '#66586F', '#D05D5B', '#C96480', '#95BF8F', '#6EA240', '#0F0F0E', '#EB8258', '#95A3B3', '#995D81'],
        ],
    }

    var Component = function (o) {
        // Otherwise get palette value
        if (palette[o]) {
            return palette[o];
        } else {
            return palette.material;
        }
    }

    Component.get = function (o) {
        // Otherwise get palette value
        if (palette[o]) {
            return palette[o];
        } else {
            return palette;
        }
    }

    Component.set = function (o, v) {
        palette[o] = v;
    }

    return Component;
}

/* harmony default export */ var palette = (Palette());
;// CONCATENATED MODULE: ./src/plugins/tabs.js




function Tabs(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: [],
        position: null,
        allowCreate: false,
        allowChangePosition: false,
        onclick: null,
        onload: null,
        onchange: null,
        oncreate: null,
        ondelete: null,
        onbeforecreate: null,
        onchangeposition: null,
        animation: false,
        hideHeaders: false,
        padding: null,
        palette: null,
        maxWidth: null,
    }

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jtabs');

    var prev = null;
    var next = null;
    var border = null;

    // Helpers
    const setBorder = function(index) {
        if (obj.options.animation) {
            setTimeout(function() {
                let rect = obj.headers.children[index].getBoundingClientRect();

                if (obj.options.palette === 'modern') {
                    border.style.width = rect.width - 4 + 'px';
                    border.style.left = obj.headers.children[index].offsetLeft + 2 + 'px';
                } else {
                    border.style.width = rect.width + 'px';
                    border.style.left = obj.headers.children[index].offsetLeft + 'px';
                }

                if (obj.options.position === 'bottom') {
                    border.style.top = '0px';
                } else {
                    border.style.bottom = '0px';
                }
            }, 50);
        }
    }

    var updateControls = function(x) {
        if (typeof(obj.headers.scrollTo) == 'function') {
            obj.headers.scrollTo({
                left: x,
                behavior: 'smooth',
            });
        } else {
            obj.headers.scrollLeft = x;
        }

        if (x <= 1) {
            prev.classList.add('disabled');
        } else {
            prev.classList.remove('disabled');
        }

        if (x >= obj.headers.scrollWidth - obj.headers.offsetWidth) {
            next.classList.add('disabled');
        } else {
            next.classList.remove('disabled');
        }

        if (obj.headers.scrollWidth <= obj.headers.offsetWidth) {
            prev.style.display = 'none';
            next.style.display = 'none';
        } else {
            prev.style.display = '';
            next.style.display = '';
        }
    }

    obj.setBorder = setBorder;

    // Set value
    obj.open = function(index) {
        // This is to force safari to update the children
        const items = Array.from(obj.content.children);
        if (! obj.content.children[index]) {
            return;
        }

        var previous = null;
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                // Current one
                previous = i;
            }
            // Remote selected
            obj.headers.children[i].classList.remove('jtabs-selected');
            obj.headers.children[i].removeAttribute('aria-selected')
            if (obj.content.children[i]) {
                obj.content.children[i].classList.remove('jtabs-selected');
            }
        }

        obj.headers.children[index].classList.add('jtabs-selected');
        obj.headers.children[index].setAttribute('aria-selected', 'true')

        if (obj.content.children[index]) {
            obj.content.children[index].classList.add('jtabs-selected');
        }

        if (previous != index && typeof(obj.options.onchange) == 'function') {
            if (obj.content.children[index]) {
                obj.options.onchange(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        }

        // Hide
        if (obj.options.hideHeaders == true && (obj.headers.children.length < 3 && obj.options.allowCreate == false)) {
            obj.headers.parentNode.style.display = 'none';
        } else {
            obj.headers.parentNode.style.display = '';

            var x1 = obj.headers.children[index].offsetLeft;
            var x2 = x1 + obj.headers.children[index].offsetWidth;
            var r1 = obj.headers.scrollLeft;
            var r2 = r1 + obj.headers.offsetWidth;

            if (! (r1 <= x1 && r2 >= x2)) {
                // Out of the viewport
                updateControls(x1 - 1);
            }

            // Set border
            setBorder(index);
        }
    }

    obj.selectIndex = function(a) {
        var index = Array.prototype.indexOf.call(obj.headers.children, a);
        if (index >= 0) {
            obj.open(index);
        }

        return index;
    }

    obj.rename = function(i, title) {
        if (! title) {
            title = prompt('New title', obj.headers.children[i].innerText);
        }
        obj.headers.children[i].innerText = title;
        setBorder(obj.getActive());
    }

    obj.create = function(title, url) {
        if (typeof(obj.options.onbeforecreate) == 'function') {
            var ret = obj.options.onbeforecreate(el, title);
            if (ret === false) {
                return false;
            } else {
                title = ret;
            }
        }

        var div = obj.appendElement(title);

        if (typeof(obj.options.oncreate) == 'function') {
            obj.options.oncreate(el, div)
        }

        setBorder(obj.getActive());

        return div;
    }

    obj.remove = function(index) {
        return obj.deleteElement(index);
    }

    obj.nextNumber = function() {
        var num = 0;
        for (var i = 0; i < obj.headers.children.length; i++) {
            var tmp = obj.headers.children[i].innerText.match(/[0-9].*/);
            if (tmp > num) {
                num = parseInt(tmp);
            }
        }
        if (! num) {
            num = 1;
        } else {
            num++;
        }

        return num;
    }

    obj.deleteElement = function(index) {
        let current = obj.getActive();

        if (! obj.headers.children[index]) {
            return false;
        } else {
            obj.headers.removeChild(obj.headers.children[index]);
            obj.content.removeChild(obj.content.children[index]);
        }

        if (current === index) {
            obj.open(0);
        } else {
            let current = obj.getActive() || 0;
            setBorder(current);
        }

        if (typeof(obj.options.ondelete) == 'function') {
            obj.options.ondelete(el, index)
        }
    }

    obj.appendElement = function(title, cb, openTab, position) {
        if (! title) {
            var title = prompt('Title?', '');
        }

        if (title) {
            let headerId = helpers.guid();
            let contentId = helpers.guid();
            // Add content
            var div = document.createElement('div');
            div.setAttribute('id', contentId);
            div.setAttribute('role', 'tabpanel');
            div.setAttribute('aria-labelledby', headerId);

            // Add headers
            var h = document.createElement('div');
            h.setAttribute('id', headerId);
            h.setAttribute('role', 'tab');
            h.setAttribute('aria-controls', contentId);

            h.innerHTML = title;
            h.content = div;

            if (typeof(position) === 'undefined') {
                obj.content.appendChild(div);
                obj.headers.insertBefore(h, obj.headers.lastChild);
            } else {
                let r = obj.content.children[position];
                if (r) {
                    obj.content.insertBefore(div, r);
                } else {
                    obj.content.appendChild(div);
                }
                r = obj.headers.children[position] || obj.headers.lastChild;
                obj.headers.insertBefore(h, r);
            }

            // Sortable
            if (obj.options.allowChangePosition) {
                h.setAttribute('draggable', 'true');
            }

            // Open new tab
            if (openTab !== false) {
                // Open new tab
                obj.selectIndex(h);
            }

            // Callback
            if (typeof(cb) == 'function') {
                cb(div, h);
            }

            // Return element
            return div;
        }
    }

    obj.getActive = function() {
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                return i;
            }
        }
        return false;
    }

    obj.updateContent = function(position, newContent) {
        if (typeof newContent !== 'string') {
            var contentItem = newContent;
        } else {
            var contentItem = document.createElement('div');
            contentItem.innerHTML = newContent;
        }

        if (obj.content.children[position].classList.contains('jtabs-selected')) {
            newContent.classList.add('jtabs-selected');
        }

        obj.content.replaceChild(newContent, obj.content.children[position]);

        setBorder();
    }

    obj.updatePosition = function(f, t, ignoreEvents, openTab) {
        // Ondrop update position of content
        if (f > t) {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t]);
        } else {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t].nextSibling);
        }

        // Open destination tab
        if (openTab !== false) {
            obj.open(t);
        } else {
            const activeIndex = obj.getActive();

            if (t < activeIndex) {
                obj.setBorder(activeIndex);
            }
        }

        // Call event
        if (! ignoreEvents && typeof(obj.options.onchangeposition) == 'function') {
            obj.options.onchangeposition(obj.headers, f, t);
        }
    }

    obj.move = function(f, t, ignoreEvents, openTab) {
        if (f > t) {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t]);
        } else {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t].nextSibling);
        }

        obj.updatePosition(f, t, ignoreEvents, openTab);
    }

    obj.setBorder = setBorder;

    obj.init = function() {
        el.innerHTML = '';

        // Make sure the component is blank
        obj.headers = document.createElement('div');
        obj.content = document.createElement('div');
        obj.headers.classList.add('jtabs-headers');
        obj.headers.setAttribute('role', 'tablist');
        obj.content.classList.add('jtabs-content');
        obj.content.setAttribute('role', 'region');
        obj.content.setAttribute('aria-label', 'Tab Panels');

        if (obj.options.palette) {
            el.classList.add('jtabs-modern');
        } else {
            el.classList.remove('jtabs-modern');
        }

        // Padding
        if (obj.options.padding) {
            obj.content.style.padding = parseInt(obj.options.padding) + 'px';
        }

        // Header
        var header = document.createElement('div');
        header.className = 'jtabs-headers-container';
        header.appendChild(obj.headers);
        if (obj.options.maxWidth) {
            header.style.maxWidth = parseInt(obj.options.maxWidth) + 'px';
        }

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jtabs-controls';
        controls.setAttribute('draggable', 'false');
        header.appendChild(controls);

        // Append DOM elements
        if (obj.options.position == 'bottom') {
            el.appendChild(obj.content);
            el.appendChild(header);
        } else {
            el.appendChild(header);
            el.appendChild(obj.content);
        }

        // New button
        if (obj.options.allowCreate == true) {
            var add = document.createElement('div');
            add.className = 'jtabs-add';
            add.onclick = function() {
                obj.create();
            }
            controls.appendChild(add);
        }

        prev = document.createElement('div');
        prev.className = 'jtabs-prev';
        prev.onclick = function() {
            updateControls(obj.headers.scrollLeft - obj.headers.offsetWidth);
        }
        controls.appendChild(prev);

        next = document.createElement('div');
        next.className = 'jtabs-next';
        next.onclick = function() {
            updateControls(obj.headers.scrollLeft + obj.headers.offsetWidth);
        }
        controls.appendChild(next);

        // Data
        for (var i = 0; i < obj.options.data.length; i++) {
            // Title
            if (obj.options.data[i].titleElement) {
                var headerItem = obj.options.data[i].titleElement;
            } else {
                var headerItem = document.createElement('div');
            }
            // Icon
            if (obj.options.data[i].icon) {
                var iconContainer = document.createElement('div');
                var icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.innerHTML = obj.options.data[i].icon;
                iconContainer.appendChild(icon);
                headerItem.appendChild(iconContainer);
            }
            // Title
            if (obj.options.data[i].title) {
                var title = document.createTextNode(obj.options.data[i].title);
                headerItem.appendChild(title);
            }
            // Width
            if (obj.options.data[i].width) {
                headerItem.style.width = obj.options.data[i].width;
            }
            // Content
            if (obj.options.data[i].contentElement) {
                var contentItem = obj.options.data[i].contentElement;
            } else {
                var contentItem = document.createElement('div');
                contentItem.innerHTML = obj.options.data[i].content;
            }
            obj.headers.appendChild(headerItem);
            obj.content.appendChild(contentItem);
        }

        // Animation
        border = document.createElement('div');
        border.className = 'jtabs-border';
        obj.headers.appendChild(border);

        if (obj.options.animation) {
            el.classList.add('jtabs-animation');
        }

        // Events
        obj.headers.addEventListener("click", function(e) {
            if (e.target.parentNode.classList.contains('jtabs-headers')) {
                var target = e.target;
            } else {
                if (e.target.tagName == 'I') {
                    var target = e.target.parentNode.parentNode;
                } else {
                    var target = e.target.parentNode;
                }
            }

            var index = obj.selectIndex(target);

            if (typeof(obj.options.onclick) == 'function') {
                obj.options.onclick(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        });

        obj.headers.addEventListener("contextmenu", function(e) {
            obj.selectIndex(e.target);
        });

        if (obj.headers.children.length) {
            // Open first tab
            obj.open(0);
        }

        // Update controls
        updateControls(0);

        if (obj.options.allowChangePosition == true) {
            Sorting(obj.headers, {
                direction: 1,
                ondrop: function(a,b,c) {
                    obj.updatePosition(b,c);
                },
            });
        }

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }
    }

    // Loading existing nodes as the data
    if (el.children[0] && el.children[0].children.length) {
        // Create from existing elements
        for (var i = 0; i < el.children[0].children.length; i++) {
            var item = obj.options.data && obj.options.data[i] ? obj.options.data[i] : {};

            if (el.children[1] && el.children[1].children[i]) {
                item.titleElement = el.children[0].children[i];
                item.contentElement = el.children[1].children[i];
            } else {
                item.contentElement = el.children[0].children[i];
            }

            obj.options.data[i] = item;
        }
    }

    // Remote controller flag
    var loadingRemoteData = false;

    // Create from data
    if (obj.options.data) {
        // Append children
        for (var i = 0; i < obj.options.data.length; i++) {
            if (obj.options.data[i].url) {
                ajax({
                    url: obj.options.data[i].url,
                    type: 'GET',
                    dataType: 'text/html',
                    index: i,
                    success: function(result) {
                        obj.options.data[this.index].content = result;
                    },
                    complete: function() {
                        obj.init();
                    }
                });

                // Flag loading
                loadingRemoteData = true;
            }
        }
    }

    if (! loadingRemoteData) {
        obj.init();
    }

    el.tabs = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/color.js






function Color(el, options) {
    // Already created, update options
    if (el.color) {
        return el.color.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'color' };
    obj.options = {};

    var container = null;
    var backdrop = null;
    var content = null;
    var resetButton = null;
    var closeButton = null;
    var tabs = null;
    var jsuitesTabs = null;

    /**
     * Update options
     */
    obj.setOptions = function(options, reset) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {string} placeholder - The default instruction text on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onclose - Method to be execute when the element is closed
         * @property {string} doneLabel - Label for button done
         * @property {string} resetLabel - Label for button reset
         * @property {string} resetValue - Value for button reset
         * @property {Bool} showResetButton - Active or note for button reset - default false
         */
        var defaults = {
            placeholder: '',
            value: null,
            onopen: null,
            onclose: null,
            onchange: null,
            closeOnChange: true,
            palette: null,
            position: null,
            doneLabel: 'Done',
            resetLabel: 'Reset',
            fullscreen: false,
            opened: false,
        }

        if (! options) {
            options = {};
        }

        if (options && ! options.palette) {
            // Default palette
            options.palette = palette();
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Update the text of the controls, if they have already been created
        if (resetButton) {
            resetButton.innerHTML = obj.options.resetLabel;
        }
        if (closeButton) {
            closeButton.innerHTML = obj.options.doneLabel;
        }

        // Update the pallete
        if (obj.options.palette && jsuitesTabs) {
            jsuitesTabs.updateContent(0, table());
        }

        // Value
        if (typeof obj.options.value === 'string') {
            el.value = obj.options.value;
            if (el.tagName === 'INPUT') {
                el.style.color = el.value;
                el.style.backgroundColor = el.value;
            }
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        } else {
            if (el.getAttribute('placeholder')) {
                el.removeAttribute('placeholder');
            }
        }

        return obj;
    }

    obj.select = function(color) {
        // Remove current selected mark
        var selected = container.querySelector('.jcolor-selected');
        if (selected) {
            selected.classList.remove('jcolor-selected');
        }

        // Mark cell as selected
        if (obj.values[color]) {
            obj.values[color].classList.add('jcolor-selected');
        }

        obj.options.value = color;
    }

    /**
     * Open color pallete
     */
    obj.open = function() {
        if (! container.classList.contains('jcolor-focus')) {
            // Start tracking
            tracking(obj, true);

            // Show color picker
            container.classList.add('jcolor-focus');

            // Select current color
            if (obj.options.value) {
                obj.select(obj.options.value);
            }

            // Reset margin
            content.style.marginTop = '';
            content.style.marginLeft = '';

            var rectContent = content.getBoundingClientRect();
            var availableWidth = helpers.getWindowWidth();
            var availableHeight = helpers.getWindowHeight();

            if (availableWidth < 800 || obj.options.fullscreen == true) {
                content.classList.add('jcolor-fullscreen');
                animation.slideBottom(content, 1);
                backdrop.style.display = 'block';
            } else {
                if (content.classList.contains('jcolor-fullscreen')) {
                    content.classList.remove('jcolor-fullscreen');
                    backdrop.style.display = '';
                }

                if (obj.options.position) {
                    content.style.position = 'fixed';
                } else {
                    content.style.position = '';
                }

                if (rectContent.left + rectContent.width > availableWidth) {
                    content.style.marginLeft = -1 * (rectContent.left + rectContent.width - (availableWidth - 20)) + 'px';
                }
                if (rectContent.top + rectContent.height > availableHeight) {
                    content.style.marginTop = -1 * (rectContent.top + rectContent.height - (availableHeight - 20)) + 'px';
                }
            }


            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el, obj);
            }

            jsuitesTabs.setBorder(jsuitesTabs.getActive());

            // Update sliders
            if (obj.options.value) {
                var rgb = HexToRgb(obj.options.value);

                rgbInputs.forEach(function(rgbInput, index) {
                    rgbInput.value = rgb[index];
                    rgbInput.dispatchEvent(new Event('input'));
                });
            }
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (container.classList.contains('jcolor-focus')) {
            // Remove focus
            container.classList.remove('jcolor-focus');
            // Make sure backdrop is hidden
            backdrop.style.display = '';
            // Call related events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el, obj);
            }
            // Stop  the object
            tracking(obj, false);
        }

        return obj.options.value;
    }

    /**
     * Set value
     */
    obj.setValue = function(color) {
        if (! color) {
            color = '';
        }

        if (color != obj.options.value) {
            obj.options.value = color;
            slidersResult = color;

            // Remove current selecded mark
            obj.select(color);

            // Onchange
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, color, obj);
            }

            // Changes
            if (el.value != obj.options.value) {
                // Set input value
                el.value = obj.options.value;
                if (el.tagName === 'INPUT') {
                    el.style.color = el.value;
                    el.style.backgroundColor = el.value;
                }

                // Element onchange native
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }

            if (obj.options.closeOnChange == true) {
                obj.close();
            }
        }
    }

    /**
     * Get value
     */
    obj.getValue = function() {
        return obj.options.value;
    }

    var backdropClickControl = false;

    // Converts a number in decimal to hexadecimal
    var decToHex = function(num) {
        var hex = num.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    // Converts a color in rgb to hexadecimal
    var rgbToHex = function(r, g, b) {
        return "#" + decToHex(r) + decToHex(g) + decToHex(b);
    }

    // Converts a number in hexadecimal to decimal
    var hexToDec = function(hex) {
        return parseInt('0x' + hex);
    }

    // Converts a color in hexadecimal to rgb
    var HexToRgb = function(hex) {
        return [hexToDec(hex.substr(1, 2)), hexToDec(hex.substr(3, 2)), hexToDec(hex.substr(5, 2))]
    }

    var table = function() {
        // Content of the first tab
        var tableContainer = document.createElement('div');
        tableContainer.className = 'jcolor-grid';

        // Cells
        obj.values = [];

        // Table pallete
        var t = document.createElement('table');
        t.setAttribute('cellpadding', '7');
        t.setAttribute('cellspacing', '0');

        for (var j = 0; j < obj.options.palette.length; j++) {
            var tr = document.createElement('tr');
            for (var i = 0; i < obj.options.palette[j].length; i++) {
                var td = document.createElement('td');
                var color = obj.options.palette[j][i];
                if (color.length < 7 && color.substr(0,1) !== '#') {
                    color = '#' + color;
                }
                td.style.backgroundColor = color;
                td.setAttribute('data-value', color);
                td.innerHTML = '';
                tr.appendChild(td);

                // Selected color
                if (obj.options.value == color) {
                    td.classList.add('jcolor-selected');
                }

                // Possible values
                obj.values[color] = td;
            }
            t.appendChild(tr);
        }

        // Append to the table
        tableContainer.appendChild(t);

        return tableContainer;
    }

    // Canvas where the image will be rendered
    var canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 160;
    var context = canvas.getContext("2d");

    var resizeCanvas = function() {
        // Specifications necessary to correctly obtain colors later in certain positions
        var m = tabs.firstChild.getBoundingClientRect();
        canvas.width = m.width - 14;
        gradient()
    }

    var gradient = function() {
        var g = context.createLinearGradient(0, 0, canvas.width, 0);
        // Create color gradient
        g.addColorStop(0,    "rgb(255,0,0)");
        g.addColorStop(0.15, "rgb(255,0,255)");
        g.addColorStop(0.33, "rgb(0,0,255)");
        g.addColorStop(0.49, "rgb(0,255,255)");
        g.addColorStop(0.67, "rgb(0,255,0)");
        g.addColorStop(0.84, "rgb(255,255,0)");
        g.addColorStop(1,    "rgb(255,0,0)");
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
        g = context.createLinearGradient(0, 0, 0, canvas.height);
        g.addColorStop(0,   "rgba(255,255,255,1)");
        g.addColorStop(0.5, "rgba(255,255,255,0)");
        g.addColorStop(0.5, "rgba(0,0,0,0)");
        g.addColorStop(1,   "rgba(0,0,0,1)");
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    var hsl = function() {
        var element = document.createElement('div');
        element.className = "jcolor-hsl";

        var point = document.createElement('div');
        point.className = 'jcolor-point';

        var div = document.createElement('div');
        div.appendChild(canvas);
        div.appendChild(point);
        element.appendChild(div);

        // Moves the marquee point to the specified position
        var update = function(buttons, x, y) {
            if (buttons === 1) {
                var rect = element.getBoundingClientRect();
                var left = x - rect.left;
                var top = y - rect.top;
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left > rect.width) {
                    left = rect.width;
                }
                if (top > rect.height) {
                    top = rect.height;
                }
                point.style.left = left + 'px';
                point.style.top = top + 'px';
                var pixel = context.getImageData(left, top, 1, 1).data;
                slidersResult = rgbToHex(pixel[0], pixel[1], pixel[2]);
            }
        }

        // Applies the point's motion function to the div that contains it
        element.addEventListener('mousedown', function(e) {
            update(e.buttons, e.clientX, e.clientY);
        });

        element.addEventListener('mousemove', function(e) {
            update(e.buttons, e.clientX, e.clientY);
        });

        element.addEventListener('touchmove', function(e) {
            update(1, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        });

        return element;
    }

    var slidersResult = '';

    var rgbInputs = [];

    var changeInputColors = function() {
        if (slidersResult !== '') {
            for (var j = 0; j < rgbInputs.length; j++) {
                var currentColor = HexToRgb(slidersResult);

                currentColor[j] = 0;

                var newGradient = 'linear-gradient(90deg, rgb(';
                newGradient += currentColor.join(', ');
                newGradient += '), rgb(';

                currentColor[j] = 255;

                newGradient += currentColor.join(', ');
                newGradient += '))';

                rgbInputs[j].style.backgroundImage = newGradient;
            }
        }
    }

    var sliders = function() {
        // Content of the third tab
        var slidersElement = document.createElement('div');
        slidersElement.className = 'jcolor-sliders';

        var slidersBody = document.createElement('div');

        // Creates a range-type input with the specified name
        var createSliderInput = function(name) {
            var inputContainer = document.createElement('div');
            inputContainer.className = 'jcolor-sliders-input-container';

            var label = document.createElement('label');
            label.innerText = name;

            var subContainer = document.createElement('div');
            subContainer.className = 'jcolor-sliders-input-subcontainer';

            var input = document.createElement('input');
            input.type = 'range';
            input.min = 0;
            input.max = 255;
            input.value = 0;

            input.setAttribute('aria-label', "Color value");
            input.setAttribute('aria-valuemin', "0");
            input.setAttribute('aria-valuemax', "255");
            input.setAttribute('aria-valuenow', "0");

            inputContainer.appendChild(label);
            subContainer.appendChild(input);

            var value = document.createElement('div');
            value.innerText = input.value;

            input.addEventListener('input', function() {
                value.innerText = input.value;
            });

            subContainer.appendChild(value);
            inputContainer.appendChild(subContainer);

            slidersBody.appendChild(inputContainer);

            return input;
        }

        // Creates red, green and blue inputs
        rgbInputs = [
            createSliderInput('Red'),
            createSliderInput('Green'),
            createSliderInput('Blue'),
        ];

        slidersElement.appendChild(slidersBody);

        // Element that prints the current color
        var slidersResultColor = document.createElement('div');
        slidersResultColor.className = 'jcolor-sliders-final-color';

        var resultElement = document.createElement('div');
        resultElement.style.visibility = 'hidden';
        resultElement.innerText = 'a';
        slidersResultColor.appendChild(resultElement)

        // Update the element that prints the current color
        var updateResult = function() {
            var resultColor = rgbToHex(parseInt(rgbInputs[0].value), parseInt(rgbInputs[1].value), parseInt(rgbInputs[2].value));

            resultElement.innerText = resultColor;
            resultElement.style.color = resultColor;
            resultElement.style.removeProperty('visibility');

            slidersResult = resultColor;
        }

        // Apply the update function to color inputs
        rgbInputs.forEach(function(rgbInput) {
            rgbInput.addEventListener('input', function() {
                updateResult();
                changeInputColors();
            });
        });

        slidersElement.appendChild(slidersResultColor);

        return slidersElement;
    }

    var init = function() {
        // Initial options
        obj.setOptions(options);

        // Add a proper input tag when the element is an input
        if (el.tagName == 'INPUT') {
            el.classList.add('jcolor-input');
            el.readOnly = true;
        }

        // Table container
        container = document.createElement('div');
        container.className = 'jcolor';

        // Table container
        backdrop = document.createElement('div');
        backdrop.className = 'jcolor-backdrop';
        container.appendChild(backdrop);

        // Content
        content = document.createElement('div');
        content.className = 'jcolor-content';

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jcolor-controls';
        content.appendChild(controls);

        // Reset button
        resetButton  = document.createElement('div');
        resetButton.className = 'jcolor-reset';
        resetButton.innerHTML = obj.options.resetLabel;
        controls.appendChild(resetButton);

        // Close button
        closeButton  = document.createElement('div');
        closeButton.className = 'jcolor-close';
        closeButton.innerHTML = obj.options.doneLabel;
        controls.appendChild(closeButton);

        // Element that will be used to create the tabs
        tabs = document.createElement('div');
        content.appendChild(tabs);

        // Starts the jSuites tabs component
        jsuitesTabs = Tabs(tabs, {
            animation: true,
            data: [
                {
                    title: 'Grid',
                    contentElement: table(),
                },
                {
                    title: 'Spectrum',
                    contentElement: hsl(),
                },
                {
                    title: 'Sliders',
                    contentElement: sliders(),
                }
            ],
            onchange: function(element, instance, index) {
                if (index === 1) {
                    resizeCanvas();
                } else {
                    var color = slidersResult !== '' ? slidersResult : obj.getValue();

                    if (index === 2 && color) {
                        var rgb = HexToRgb(color);

                        rgbInputs.forEach(function(rgbInput, index) {
                            rgbInput.value = rgb[index];
                            rgbInput.dispatchEvent(new Event('input'));
                        });
                    }
                }
            },
            palette: 'modern',
        });

        container.appendChild(content);

        // Insert picker after the element
        if (el.tagName == 'INPUT') {
            el.parentNode.insertBefore(container, el.nextSibling);
        } else {
            el.appendChild(container);
        }

        container.addEventListener("click", function(e) {
            if (e.target.tagName == 'TD') {
                var value = e.target.getAttribute('data-value');
                if (value) {
                    obj.setValue(value);
                }
            } else if (e.target.classList.contains('jcolor-reset')) {
                obj.setValue('');
                obj.close();
            } else if (e.target.classList.contains('jcolor-close')) {
                if (jsuitesTabs.getActive() > 0) {
                    obj.setValue(slidersResult);
                }
                obj.close();
            } else if (e.target.classList.contains('jcolor-backdrop')) {
                obj.close();
            } else {
                obj.open();
            }
        });

        /**
         * If element is focus open the picker
         */
        el.addEventListener("mouseup", function(e) {
            obj.open();
        });

        // If the picker is open on the spectrum tab, it changes the canvas size when the window size is changed
        window.addEventListener('resize', function() {
            if (container.classList.contains('jcolor-focus') && jsuitesTabs.getActive() == 1) {
                resizeCanvas();
            }
        });

        // Default opened
        if (obj.options.opened == true) {
            obj.open();
        }

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Keep object available from the node
        el.color = obj;

        // Container shortcut
        container.color = obj;
    }

    obj.toHex = function(rgb) {
        var hex = function(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        if (rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) {
                return rgb;
            } else {
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                if (rgb && rgb.length) {
                    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                } else {
                    return "";
                }
            }
        }
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/contextmenu.js



function Contextmenu() {

    var Component = function(el, options) {
        // New instance
        var obj = {type: 'contextmenu'};
        obj.options = {};

        // Default configuration
        var defaults = {
            items: null,
            onclick: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Class definition
        el.classList.add('jcontextmenu');

        /**
         * Open contextmenu
         */
        obj.open = function (e, items) {
            if (items) {
                // Update content
                obj.options.items = items;
                // Create items
                obj.create(items);
            }

            // Close current contextmenu
            if (Component.current) {
                Component.current.close();
            }

            // Add to the opened components monitor
            tracking(obj, true);

            // Show context menu
            el.classList.add('jcontextmenu-focus');

            // Current
            Component.current = obj;

            // Coordinates
            if ((obj.options.items && obj.options.items.length > 0) || el.children.length) {
                if (e.target) {
                    if (e.changedTouches && e.changedTouches[0]) {
                        x = e.changedTouches[0].clientX;
                        y = e.changedTouches[0].clientY;
                    } else {
                        var x = e.clientX;
                        var y = e.clientY;
                    }
                } else {
                    var x = e.x;
                    var y = e.y;
                }

                var rect = el.getBoundingClientRect();

                if (window.innerHeight < y + rect.height) {
                    var h = y - rect.height;
                    if (h < 0) {
                        h = 0;
                    }
                    el.style.top = h + 'px';
                } else {
                    el.style.top = y + 'px';
                }

                if (window.innerWidth < x + rect.width) {
                    if (x - rect.width > 0) {
                        el.style.left = (x - rect.width) + 'px';
                    } else {
                        el.style.left = '10px';
                    }
                } else {
                    el.style.left = x + 'px';
                }
            }
        }

        obj.isOpened = function () {
            return el.classList.contains('jcontextmenu-focus') ? true : false;
        }

        /**
         * Close menu
         */
        obj.close = function () {
            if (el.classList.contains('jcontextmenu-focus')) {
                el.classList.remove('jcontextmenu-focus');
            }
            tracking(obj, false);
        }

        /**
         * Create items based on the declared objectd
         * @param {object} items - List of object
         */
        obj.create = function (items) {
            // Update content
            el.innerHTML = '';

            // Add header contextmenu
            var itemHeader = createHeader();
            el.appendChild(itemHeader);

            // Append items
            for (var i = 0; i < items.length; i++) {
                var itemContainer = createItemElement(items[i]);
                el.appendChild(itemContainer);
            }
        }

        /**
         * createHeader for context menu
         * @private
         * @returns {HTMLElement}
         */
        function createHeader() {
            var header = document.createElement('div');
            header.classList.add("header");
            header.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            var title = document.createElement('a');
            title.classList.add("title");
            title.innerHTML = dictionary.translate("Menu");

            header.appendChild(title);

            var closeButton = document.createElement('a');
            closeButton.classList.add("close");
            closeButton.innerHTML = dictionary.translate("close");
            closeButton.addEventListener("click", function (e) {
                obj.close();
            });

            header.appendChild(closeButton);

            return header;
        }

        /**
         * Private function for create a new Item element
         * @param {type} item
         * @returns {jsuitesL#15.jSuites.contextmenu.createItemElement.itemContainer}
         */
        function createItemElement(item) {
            if (item.type && (item.type == 'line' || item.type == 'divisor')) {
                var itemContainer = document.createElement('hr');
            } else {
                var itemContainer = document.createElement('div');
                var itemText = document.createElement('a');
                itemText.innerHTML = item.title;

                if (item.tooltip) {
                    itemContainer.setAttribute('title', item.tooltip);
                }

                if (item.icon) {
                    itemContainer.setAttribute('data-icon', item.icon);
                }

                if (item.id) {
                    itemContainer.id = item.id;
                }

                if (item.disabled) {
                    itemContainer.className = 'jcontextmenu-disabled';
                } else if (item.onclick) {
                    itemContainer.method = item.onclick;
                    itemContainer.addEventListener("mousedown", function (e) {
                        e.preventDefault();
                    });
                    itemContainer.addEventListener("mouseup", function (e) {
                        // Execute method
                        this.method(this, e);
                    });
                }
                itemContainer.appendChild(itemText);

                if (item.submenu) {
                    var itemIconSubmenu = document.createElement('span');
                    itemIconSubmenu.innerHTML = "&#9658;";
                    itemContainer.appendChild(itemIconSubmenu);
                    itemContainer.classList.add('jcontexthassubmenu');
                    var el_submenu = document.createElement('div');
                    // Class definition
                    el_submenu.classList.add('jcontextmenu');
                    // Focusable
                    el_submenu.setAttribute('tabindex', '900');

                    // Append items
                    var submenu = item.submenu;
                    for (var i = 0; i < submenu.length; i++) {
                        var itemContainerSubMenu = createItemElement(submenu[i]);
                        el_submenu.appendChild(itemContainerSubMenu);
                    }

                    itemContainer.appendChild(el_submenu);
                } else if (item.shortcut) {
                    var itemShortCut = document.createElement('span');
                    itemShortCut.innerHTML = item.shortcut;
                    itemContainer.appendChild(itemShortCut);
                }
            }
            return itemContainer;
        }

        if (typeof (obj.options.onclick) == 'function') {
            el.addEventListener('click', function (e) {
                obj.options.onclick(obj, e);
            });
        }

        // Create items
        if (obj.options.items) {
            obj.create(obj.options.items);
        }

        window.addEventListener("mousewheel", function () {
            obj.close();
        });

        el.contextmenu = obj;

        return obj;
    }

    return Component;
}

/* harmony default export */ var contextmenu = (Contextmenu());
;// CONCATENATED MODULE: ./src/plugins/dropdown.js







function Dropdown() {

    var Component = (function (el, options) {
        // Already created, update options
        if (el.dropdown) {
            return el.dropdown.setOptions(options, true);
        }

        // New instance
        var obj = {type: 'dropdown'};
        obj.options = {};

        // Success
        var success = function (data, val) {
            // Set data
            if (data && data.length) {
                // Sort
                if (obj.options.sortResults !== false) {
                    if (typeof obj.options.sortResults == "function") {
                        data.sort(obj.options.sortResults);
                    } else {
                        data.sort(sortData);
                    }
                }

                obj.setData(data);
            }

            // Onload method
            if (typeof (obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data, val);
            }

            // Set value
            if (val) {
                applyValue(val);
            }

            // Component value
            if (val === undefined || val === null) {
                obj.options.value = '';
            }
            el.value = obj.options.value;

            // Open dropdown
            if (obj.options.opened == true) {
                obj.open();
            }
        }


        // Default sort
        var sortData = function (itemA, itemB) {
            var testA, testB;
            if (typeof itemA == "string") {
                testA = itemA;
            } else {
                if (itemA.text) {
                    testA = itemA.text;
                } else if (itemA.name) {
                    testA = itemA.name;
                }
            }

            if (typeof itemB == "string") {
                testB = itemB;
            } else {
                if (itemB.text) {
                    testB = itemB.text;
                } else if (itemB.name) {
                    testB = itemB.name;
                }
            }

            if (typeof testA == "string" || typeof testB == "string") {
                if (typeof testA != "string") {
                    testA = "" + testA;
                }
                if (typeof testB != "string") {
                    testB = "" + testB;
                }
                return testA.localeCompare(testB);
            } else {
                return testA - testB;
            }
        }

        /**
         * Reset the options for the dropdown
         */
        var resetValue = function () {
            // Reset value container
            obj.value = {};
            // Remove selected
            for (var i = 0; i < obj.items.length; i++) {
                if (obj.items[i].selected == true) {
                    if (obj.items[i].element) {
                        obj.items[i].element.classList.remove('jdropdown-selected')
                    }
                    obj.items[i].selected = null;
                }
            }
            // Reset options
            obj.options.value = '';
            // Reset value
            el.value = '';
        }

        /**
         * Apply values to the dropdown
         */
        var applyValue = function (values) {
            // Reset the current values
            resetValue();

            // Read values
            if (values !== null) {
                if (!values) {
                    if (typeof (obj.value['']) !== 'undefined') {
                        obj.value[''] = '';
                    }
                } else {
                    if (!Array.isArray(values)) {
                        values = ('' + values).split(';');
                    }
                    for (var i = 0; i < values.length; i++) {
                        obj.value[values[i]] = '';
                    }
                }
            }

            // Update the DOM
            for (var i = 0; i < obj.items.length; i++) {
                if (typeof (obj.value[Value(i)]) !== 'undefined') {
                    if (obj.items[i].element) {
                        obj.items[i].element.classList.add('jdropdown-selected')
                    }
                    obj.items[i].selected = true;

                    // Keep label
                    obj.value[Value(i)] = Text(i);
                }
            }

            // Global value
            obj.options.value = Object.keys(obj.value).join(';');

            // Update labels
            obj.header.value = obj.getText();
        }

        // Get the value of one item
        var Value = function (k, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'value';
            } else {
                var property = 'id';
            }

            if (obj.items[k]) {
                if (v !== undefined) {
                    return obj.items[k].data[property] = v;
                } else {
                    return obj.items[k].data[property];
                }
            }

            return '';
        }

        // Get the label of one item
        var Text = function (k, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'text';
            } else {
                var property = 'name';
            }

            if (obj.items[k]) {
                if (v !== undefined) {
                    return obj.items[k].data[property] = v;
                } else {
                    return obj.items[k].data[property];
                }
            }

            return '';
        }

        var getValue = function () {
            return Object.keys(obj.value);
        }

        var getText = function () {
            var data = [];
            var k = Object.keys(obj.value);
            for (var i = 0; i < k.length; i++) {
                data.push(obj.value[k[i]]);
            }
            return data;
        }

        obj.setOptions = function (options, reset) {
            if (!options) {
                options = {};
            }

            // Default configuration
            var defaults = {
                url: null,
                data: [],
                format: 0,
                multiple: false,
                autocomplete: false,
                remoteSearch: false,
                lazyLoading: false,
                type: null,
                width: null,
                maxWidth: null,
                opened: false,
                value: null,
                placeholder: '',
                newOptions: false,
                position: false,
                onchange: null,
                onload: null,
                onopen: null,
                onclose: null,
                onfocus: null,
                onblur: null,
                oninsert: null,
                onbeforeinsert: null,
                onsearch: null,
                onbeforesearch: null,
                sortResults: false,
                autofocus: false,
                prompt: null,
                allowEmpty: true,
            }

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof (obj.options[property]) == 'undefined' || reset === true) {
                        obj.options[property] = defaults[property];
                    }
                }
            }

            // Force autocomplete search
            if (obj.options.remoteSearch == true || obj.options.type === 'searchbar') {
                obj.options.autocomplete = true;
            }

            // New options
            if (obj.options.newOptions == true) {
                obj.header.classList.add('jdropdown-add');
            } else {
                obj.header.classList.remove('jdropdown-add');
            }

            // Autocomplete
            if (obj.options.autocomplete == true) {
                obj.header.removeAttribute('readonly');
            } else {
                obj.header.setAttribute('readonly', 'readonly');
            }

            // Place holder
            if (obj.options.placeholder) {
                obj.header.setAttribute('placeholder', obj.options.placeholder);
            } else {
                obj.header.removeAttribute('placeholder');
            }

            // Remove specific dropdown typing to add again
            el.classList.remove('jdropdown-searchbar');
            el.classList.remove('jdropdown-picker');
            el.classList.remove('jdropdown-list');

            if (obj.options.type == 'searchbar') {
                el.classList.add('jdropdown-searchbar');
            } else if (obj.options.type == 'list') {
                el.classList.add('jdropdown-list');
            } else if (obj.options.type == 'picker') {
                el.classList.add('jdropdown-picker');
            } else {
                if (helpers.getWindowWidth() < 800) {
                    if (obj.options.autocomplete) {
                        el.classList.add('jdropdown-searchbar');
                        obj.options.type = 'searchbar';
                    } else {
                        el.classList.add('jdropdown-picker');
                        obj.options.type = 'picker';
                    }
                } else {
                    if (obj.options.width) {
                        el.style.width = obj.options.width;
                        el.style.minWidth = obj.options.width;
                    } else {
                        el.style.removeProperty('width');
                        el.style.removeProperty('min-width');
                    }

                    el.classList.add('jdropdown-default');
                    obj.options.type = 'default';
                }
            }

            // Close button
            if (obj.options.type == 'searchbar') {
                containerHeader.appendChild(closeButton);
            } else {
                container.insertBefore(closeButton, container.firstChild);
            }

            // Load the content
            if (obj.options.url && !options.data) {
                ajax({
                    url: obj.options.url,
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            success(data, obj.options.value);
                        }
                    }
                });
            } else {
                success(obj.options.data, obj.options.value);
            }

            // Return the instance
            return obj;
        }

        // Helpers
        var containerHeader = null;
        var container = null;
        var content = null;
        var closeButton = null;
        var resetButton = null;
        var backdrop = null;

        var keyTimer = null;

        /**
         * Init dropdown
         */
        var init = function () {
            // Do not accept null
            if (!options) {
                options = {};
            }

            // If the element is a SELECT tag, create a configuration object
            if (el.tagName == 'SELECT') {
                var ret = Component.extractFromDom(el, options);
                el = ret.el;
                options = ret.options;
            }

            // Place holder
            if (!options.placeholder && el.getAttribute('placeholder')) {
                options.placeholder = el.getAttribute('placeholder');
            }

            // Value container
            obj.value = {};
            // Containers
            obj.items = [];
            obj.groups = [];
            // Search options
            obj.search = '';
            obj.results = null;

            // Create dropdown
            el.classList.add('jdropdown');

            // Header container
            containerHeader = document.createElement('div');
            containerHeader.className = 'jdropdown-container-header';

            // Header
            obj.header = document.createElement('input');
            obj.header.className = 'jdropdown-header jss_object';
            obj.header.type = 'text';
            obj.header.setAttribute('autocomplete', 'off');
            obj.header.onfocus = function () {
                if (typeof (obj.options.onfocus) == 'function') {
                    obj.options.onfocus(el);
                }
            }

            obj.header.onblur = function () {
                if (typeof (obj.options.onblur) == 'function') {
                    obj.options.onblur(el);
                }
            }

            obj.header.onkeyup = function (e) {
                if (obj.options.autocomplete == true && !keyTimer) {
                    if (obj.search != obj.header.value.trim()) {
                        keyTimer = setTimeout(function () {
                            obj.find(obj.header.value.trim());
                            keyTimer = null;
                        }, 400);
                    }

                    if (!el.classList.contains('jdropdown-focus')) {
                        obj.open();
                    }
                } else {
                    if (!obj.options.autocomplete) {
                        obj.next(e.key);
                    }
                }
            }

            // Global controls
            if (!Component.hasEvents) {
                // Execute only one time
                Component.hasEvents = true;
                // Enter and Esc
                document.addEventListener("keydown", Component.keydown);
            }

            // Container
            container = document.createElement('div');
            container.className = 'jdropdown-container';

            // Dropdown content
            content = document.createElement('div');
            content.className = 'jdropdown-content';

            // Close button
            closeButton = document.createElement('div');
            closeButton.className = 'jdropdown-close';
            closeButton.textContent = 'Done';

            // Reset button
            resetButton = document.createElement('div');
            resetButton.className = 'jdropdown-reset';
            resetButton.textContent = 'x';
            resetButton.onclick = function () {
                obj.reset();
                obj.close();
            }

            // Create backdrop
            backdrop = document.createElement('div');
            backdrop.className = 'jdropdown-backdrop';

            // Append elements
            containerHeader.appendChild(obj.header);

            container.appendChild(content);
            el.appendChild(containerHeader);
            el.appendChild(container);
            el.appendChild(backdrop);

            // Set the otiptions
            obj.setOptions(options);

            if ('ontouchsend' in document.documentElement === true) {
                el.addEventListener('touchsend', Component.mouseup);
            } else {
                el.addEventListener('mouseup', Component.mouseup);
            }

            // Lazyloading
            if (obj.options.lazyLoading == true) {
                LazyLoading(content, {
                    loadUp: obj.loadUp,
                    loadDown: obj.loadDown,
                });
            }

            content.onwheel = function (e) {
                e.stopPropagation();
            }

            // Change method
            el.change = obj.setValue;

            // Global generic value handler
            el.val = function (val) {
                if (val === undefined) {
                    return obj.getValue(obj.options.multiple ? true : false);
                } else {
                    obj.setValue(val);
                }
            }

            // Keep object available from the node
            el.dropdown = obj;
        }

        /**
         * Get the current remote source of data URL
         */
        obj.getUrl = function () {
            return obj.options.url;
        }

        /**
         * Set the new data from a remote source
         * @param {string} url - url from the remote source
         * @param {function} callback - callback when the data is loaded
         */
        obj.setUrl = function (url, callback) {
            obj.options.url = url;

            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    obj.setData(data);
                    // Callback
                    if (typeof (callback) == 'function') {
                        callback(obj);
                    }
                }
            });
        }

        /**
         * Set ID for one item
         */
        obj.setId = function (item, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'value';
            } else {
                var property = 'id';
            }

            if (typeof (item) == 'object') {
                item[property] = v;
            } else {
                obj.items[item].data[property] = v;
            }
        }

        const add = function(title, id) {
            if (! title) {
                let current = obj.options.autocomplete == true ? obj.header.value : '';
                title = prompt(dictionary.translate('Add A New Option'), current);
                if (! title) {
                    return false;
                }
            }

            // Id
            if (! id) {
                id = helpers.guid();
            }

            // Create new item
            if (!obj.options.format) {
                var item = {
                    value: id,
                    text: title,
                }
            } else {
                var item = {
                    id: id,
                    name: title,
                }
            }

            // Callback
            if (typeof (obj.options.onbeforeinsert) == 'function') {
                let ret = obj.options.onbeforeinsert(obj, item);
                if (ret === false) {
                    return false;
                } else if (ret) {
                    item = ret;
                }
            }

            // Add item to the main list
            obj.options.data.push(item);

            // Create DOM
            var newItem = obj.createItem(item);

            // Append DOM to the list
            content.appendChild(newItem.element);

            // Callback
            if (typeof (obj.options.oninsert) == 'function') {
                obj.options.oninsert(obj, item, newItem);
            }

            // Show content
            if (content.style.display == 'none') {
                content.style.display = '';
            }

            // Search?
            if (obj.results) {
                obj.results.push(newItem);
            }

            return item;
        }

        /**
         * Add a new item
         * @param {string} title - title of the new item
         * @param {string} id - value/id of the new item
         */
        obj.add = function (title, id) {
            if (typeof (obj.options.prompt) == 'function') {
                return obj.options.prompt.call(obj, add);
            }
            return add(title, id);
        }

        /**
         * Create a new item
         */
        obj.createItem = function (data, group, groupName) {
            // Keep the correct source of data
            if (!obj.options.format) {
                if (!data.value && data.id !== undefined) {
                    data.value = data.id;
                    //delete data.id;
                }
                if (!data.text && data.name !== undefined) {
                    data.text = data.name;
                    //delete data.name;
                }
            } else {
                if (!data.id && data.value !== undefined) {
                    data.id = data.value;
                    //delete data.value;
                }
                if (!data.name && data.text !== undefined) {
                    data.name = data.text
                    //delete data.text;
                }
            }

            // Create item
            var item = {};
            item.element = document.createElement('div');
            item.element.className = 'jdropdown-item';
            item.element.indexValue = obj.items.length;
            item.data = data;

            // Groupd DOM
            if (group) {
                item.group = group;
            }

            // Id
            if (data.id) {
                item.element.setAttribute('id', data.id);
            }

            // Disabled
            if (data.disabled == true) {
                item.element.setAttribute('data-disabled', true);
            }

            // Tooltip
            if (data.tooltip) {
                item.element.setAttribute('title', data.tooltip);
            }

            // Image
            if (data.image) {
                var image = document.createElement('img');
                image.className = 'jdropdown-image';
                image.src = data.image;
                if (!data.title) {
                    image.classList.add('jdropdown-image-small');
                }
                item.element.appendChild(image);
            } else if (data.icon) {
                var icon = document.createElement('span');
                icon.className = "jdropdown-icon material-icons";
                icon.innerText = data.icon;
                if (!data.title) {
                    icon.classList.add('jdropdown-icon-small');
                }
                if (data.color) {
                    icon.style.color = data.color;
                }
                item.element.appendChild(icon);
            } else if (data.color) {
                var color = document.createElement('div');
                color.className = 'jdropdown-color';
                color.style.backgroundColor = data.color;
                item.element.appendChild(color);
            }

            // Set content
            if (!obj.options.format) {
                var text = data.text;
            } else {
                var text = data.name;
            }

            var node = document.createElement('div');
            node.className = 'jdropdown-description';
            node.textContent = text || '&nbsp;';

            // Title
            if (data.title) {
                var title = document.createElement('div');
                title.className = 'jdropdown-title';
                title.innerText = data.title;
                node.appendChild(title);
            }

            // Set content
            if (!obj.options.format) {
                var val = data.value;
            } else {
                var val = data.id;
            }

            // Value
            if (obj.value[val]) {
                item.element.classList.add('jdropdown-selected');
                item.selected = true;
            }

            // Keep DOM accessible
            obj.items.push(item);

            // Add node to item
            item.element.appendChild(node);

            return item;
        }

        obj.appendData = function (data) {
            // Create elements
            if (data.length) {
                // Helpers
                var items = [];
                var groups = [];

                // Prepare data
                for (var i = 0; i < data.length; i++) {
                    // Process groups
                    if (data[i].group) {
                        if (!groups[data[i].group]) {
                            groups[data[i].group] = [];
                        }
                        groups[data[i].group].push(i);
                    } else {
                        items.push(i);
                    }
                }

                // Number of items counter
                var counter = 0;

                // Groups
                var groupNames = Object.keys(groups);

                // Append groups in case exists
                if (groupNames.length > 0) {
                    for (var i = 0; i < groupNames.length; i++) {
                        // Group container
                        var group = document.createElement('div');
                        group.className = 'jdropdown-group';
                        // Group name
                        var groupName = document.createElement('div');
                        groupName.className = 'jdropdown-group-name';
                        groupName.textContent = groupNames[i];
                        // Group arrow
                        var groupArrow = document.createElement('i');
                        groupArrow.className = 'jdropdown-group-arrow jdropdown-group-arrow-down';
                        groupName.appendChild(groupArrow);
                        // Group items
                        var groupContent = document.createElement('div');
                        groupContent.className = 'jdropdown-group-items';
                        for (var j = 0; j < groups[groupNames[i]].length; j++) {
                            var item = obj.createItem(data[groups[groupNames[i]][j]], group, groupNames[i]);

                            if (obj.options.lazyLoading == false || counter < 200) {
                                groupContent.appendChild(item.element);
                                counter++;
                            }
                        }
                        // Group itens
                        group.appendChild(groupName);
                        group.appendChild(groupContent);
                        // Keep group DOM
                        obj.groups.push(group);
                        // Only add to the screen if children on the group
                        if (groupContent.children.length > 0) {
                            // Add DOM to the content
                            content.appendChild(group);
                        }
                    }
                }

                if (items.length) {
                    for (var i = 0; i < items.length; i++) {
                        var item = obj.createItem(data[items[i]]);
                        if (obj.options.lazyLoading == false || counter < 200) {
                            content.appendChild(item.element);
                            counter++;
                        }
                    }
                }
            }
        }

        obj.setData = function (data) {
            // Reset current value
            resetValue();

            // Make sure the content container is blank
            content.textContent = '';

            // Reset
            obj.header.value = '';

            // Reset items and values
            obj.items = [];

            // Prepare data
            if (data && data.length) {
                for (var i = 0; i < data.length; i++) {
                    // Compatibility
                    if (typeof (data[i]) != 'object') {
                        // Correct format
                        if (!obj.options.format) {
                            data[i] = {
                                value: data[i],
                                text: data[i]
                            }
                        } else {
                            data[i] = {
                                id: data[i],
                                name: data[i]
                            }
                        }
                    }
                }

                // Append data
                obj.appendData(data);

                // Update data
                obj.options.data = data;
            } else {
                // Update data
                obj.options.data = [];
            }

            obj.close();
        }

        obj.getData = function () {
            return obj.options.data;
        }

        /**
         * Get position of the item
         */
        obj.getPosition = function (val) {
            for (var i = 0; i < obj.items.length; i++) {
                if (Value(i) == val) {
                    return i;
                }
            }
            return false;
        }

        /**
         * Get dropdown current text
         */
        obj.getText = function (asArray) {
            // Get value
            var v = getText();
            // Return value
            if (asArray) {
                return v;
            } else {
                return v.join('; ');
            }
        }

        /**
         * Get dropdown current value
         */
        obj.getValue = function (asArray) {
            // Get value
            var v = getValue();
            // Return value
            if (asArray) {
                return v;
            } else {
                return v.join(';');
            }
        }

        /**
         * Change event
         */
        var change = function (oldValue) {
            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof (el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }

            // Events
            if (typeof (obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, oldValue, obj.options.value);
            }
        }

        /**
         * Set value
         */
        obj.setValue = function (newValue) {
            // Current value
            var oldValue = obj.getValue();
            // New value
            if (Array.isArray(newValue)) {
                newValue = newValue.join(';')
            }

            if (oldValue !== newValue) {
                // Set value
                applyValue(newValue);

                // Change
                change(oldValue);
            }
        }

        obj.resetSelected = function () {
            obj.setValue(null);
        }

        obj.selectIndex = function (index, force) {
            // Make sure is a number
            var index = parseInt(index);

            // Only select those existing elements
            if (obj.items && obj.items[index] && (force === true || obj.items[index].data.disabled !== true)) {
                // Reset cursor to a new position
                obj.setCursor(index, false);

                // Behaviour
                if (!obj.options.multiple) {
                    // Update value
                    if (obj.items[index].selected) {
                        if (obj.options.allowEmpty !== false) {
                            obj.setValue(null);
                        }
                    } else {
                        obj.setValue(Value(index));
                    }

                    // Close component
                    obj.close();
                } else {
                    // Old value
                    var oldValue = obj.options.value;

                    // Toggle option
                    if (obj.items[index].selected) {
                        obj.items[index].element.classList.remove('jdropdown-selected');
                        obj.items[index].selected = false;

                        delete obj.value[Value(index)];
                    } else {
                        // Select element
                        obj.items[index].element.classList.add('jdropdown-selected');
                        obj.items[index].selected = true;

                        // Set value
                        obj.value[Value(index)] = Text(index);
                    }

                    // Global value
                    obj.options.value = Object.keys(obj.value).join(';');

                    // Update labels for multiple dropdown
                    if (obj.options.autocomplete == false) {
                        obj.header.value = getText().join('; ');
                    }

                    // Events
                    change(oldValue);
                }
            }
        }

        obj.selectItem = function (item) {
            obj.selectIndex(item.indexValue);
        }

        var exists = function (k, result) {
            for (var j = 0; j < result.length; j++) {
                if (!obj.options.format) {
                    if (result[j].value == k) {
                        return true;
                    }
                } else {
                    if (result[j].id == k) {
                        return true;
                    }
                }
            }
            return false;
        }

        obj.find = function (str) {
            if (obj.search == str.trim()) {
                return false;
            }

            // Search term
            obj.search = str;

            // Reset index
            obj.setCursor();

            // Remove nodes from all groups
            if (obj.groups.length) {
                for (var i = 0; i < obj.groups.length; i++) {
                    obj.groups[i].lastChild.textContent = '';
                }
            }

            // Remove all nodes
            content.textContent = '';

            // Remove current items in the remote search
            if (obj.options.remoteSearch == true) {
                // Reset results
                obj.results = null;
                // URL
                var url = obj.options.url;

                // Ajax call
                let o = {
                    url: url,
                    method: 'GET',
                    data: { q: str },
                    dataType: 'json',
                    success: function (result) {
                        // Reset items
                        obj.items = [];

                        // Add the current selected items to the results in case they are not there
                        var current = Object.keys(obj.value);
                        if (current.length) {
                            for (var i = 0; i < current.length; i++) {
                                if (!exists(current[i], result)) {
                                    if (!obj.options.format) {
                                        result.unshift({value: current[i], text: obj.value[current[i]]});
                                    } else {
                                        result.unshift({id: current[i], name: obj.value[current[i]]});
                                    }
                                }
                            }
                        }
                        // Append data
                        obj.appendData(result);
                        // Show or hide results
                        if (!result.length) {
                            content.style.display = 'none';
                        } else {
                            content.style.display = '';
                        }

                        if (typeof(obj.options.onsearch) === 'function') {
                            obj.options.onsearch(obj, result);
                        }
                    }
                }

                if (typeof(obj.options.onbeforesearch) === 'function') {
                    let ret = obj.options.onbeforesearch(obj, o);
                    if (ret === false) {
                        return;
                    } else if (typeof(ret) === 'object') {
                        o = ret;
                    }
                }

                // Remote search
                ajax(o);
            } else {
                // Search terms
                str = new RegExp(str, 'gi');

                // Reset search
                var results = [];

                // Append options
                for (var i = 0; i < obj.items.length; i++) {
                    // Item label
                    var label = Text(i);
                    // Item title
                    var title = obj.items[i].data.title || '';
                    // Group name
                    var groupName = obj.items[i].data.group || '';
                    // Synonym
                    var synonym = obj.items[i].data.synonym || '';
                    if (synonym) {
                        synonym = synonym.join(' ');
                    }

                    if (str == null || obj.items[i].selected == true || label.toString().match(str) || title.match(str) || groupName.match(str) || synonym.match(str)) {
                        results.push(obj.items[i]);
                    }
                }

                if (!results.length) {
                    content.style.display = 'none';

                    // Results
                    obj.results = null;
                } else {
                    content.style.display = '';

                    // Results
                    obj.results = results;

                    // Show 200 items at once
                    var number = results.length || 0;

                    // Lazyloading
                    if (obj.options.lazyLoading == true && number > 200) {
                        number = 200;
                    }

                    for (var i = 0; i < number; i++) {
                        if (obj.results[i].group) {
                            if (!obj.results[i].group.parentNode) {
                                content.appendChild(obj.results[i].group);
                            }
                            obj.results[i].group.lastChild.appendChild(obj.results[i].element);
                        } else {
                            content.appendChild(obj.results[i].element);
                        }
                    }
                }
            }

            // Auto focus
            if (obj.options.autofocus == true) {
                obj.first();
            }
        }

        obj.open = function () {
            // Focus
            if (!el.classList.contains('jdropdown-focus')) {
                // Current dropdown
                Component.current = obj;

                // Start tracking
                tracking(obj, true);

                // Add focus
                el.classList.add('jdropdown-focus');

                // Animation
                if (helpers.getWindowWidth() < 800) {
                    if (obj.options.type == null || obj.options.type == 'picker') {
                        animation.slideBottom(container, 1);
                    }
                }

                // Filter
                if (obj.options.autocomplete == true) {
                    obj.header.value = obj.search;
                    obj.header.focus();
                }

                // Set cursor for the first or first selected element
                var k = getValue();
                if (k[0]) {
                    var cursor = obj.getPosition(k[0]);
                    if (cursor !== false) {
                        obj.setCursor(cursor);
                    }
                }

                // Container Size
                if (!obj.options.type || obj.options.type == 'default') {
                    var rect = el.getBoundingClientRect();
                    var rectContainer = container.getBoundingClientRect();

                    if (obj.options.position) {
                        container.style.position = 'fixed';
                        if (window.innerHeight < rect.bottom + rectContainer.height) {
                            container.style.top = '';
                            container.style.bottom = (window.innerHeight - rect.top) + 1 + 'px';
                        } else {
                            container.style.top = rect.bottom + 'px';
                            container.style.bottom = '';
                        }
                        container.style.left = rect.left + 'px';
                    } else {
                        if (window.innerHeight < rect.bottom + rectContainer.height) {
                            container.style.top = '';
                            container.style.bottom = rect.height + 1 + 'px';
                        } else {
                            container.style.top = '';
                            container.style.bottom = '';
                        }
                    }

                    container.style.minWidth = rect.width + 'px';

                    if (obj.options.maxWidth) {
                        container.style.maxWidth = obj.options.maxWidth;
                    }

                    if (!obj.items.length && obj.options.autocomplete == true) {
                        content.style.display = 'none';
                    } else {
                        content.style.display = '';
                    }
                }
            }

            // Events
            if (typeof (obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }
        }

        obj.close = function (ignoreEvents) {
            if (el.classList.contains('jdropdown-focus')) {
                // Update labels
                obj.header.value = obj.getText();
                // Remove cursor
                obj.setCursor();
                // Events
                if (!ignoreEvents && typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el);
                }
                // Blur
                if (obj.header.blur) {
                    obj.header.blur();
                }
                // Remove focus
                el.classList.remove('jdropdown-focus');
                // Start tracking
                tracking(obj, false);
                // Current dropdown
                Component.current = null;
            }

            return obj.getValue();
        }

        /**
         * Set cursor
         */
        obj.setCursor = function (index, setPosition) {
            // Remove current cursor
            if (obj.currentIndex != null) {
                // Remove visual cursor
                if (obj.items && obj.items[obj.currentIndex]) {
                    obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
                }
            }

            if (index == undefined) {
                obj.currentIndex = null;
            } else {
                index = parseInt(index);

                // Cursor only for visible items
                if (obj.items[index].element.parentNode) {
                    obj.items[index].element.classList.add('jdropdown-cursor');
                    obj.currentIndex = index;

                    // Update scroll to the cursor element
                    if (setPosition !== false && obj.items[obj.currentIndex].element) {
                        var container = content.scrollTop;
                        var element = obj.items[obj.currentIndex].element;
                        content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
                    }
                }
            }
        }

        // Compatibility
        obj.resetCursor = obj.setCursor;
        obj.updateCursor = obj.setCursor;

        /**
         * Reset cursor and selected items
         */
        obj.reset = function () {
            // Reset cursor
            obj.setCursor();

            // Reset selected
            obj.setValue(null);
        }

        /**
         * First available item
         */
        obj.first = function () {
            if (obj.options.lazyLoading === true) {
                obj.loadFirst();
            }

            var items = content.querySelectorAll('.jdropdown-item');
            if (items.length) {
                var newIndex = items[0].indexValue;
                obj.setCursor(newIndex);
            }
        }

        /**
         * Last available item
         */
        obj.last = function () {
            if (obj.options.lazyLoading === true) {
                obj.loadLast();
            }

            var items = content.querySelectorAll('.jdropdown-item');
            if (items.length) {
                var newIndex = items[items.length - 1].indexValue;
                obj.setCursor(newIndex);
            }
        }

        obj.next = function (letter) {
            var newIndex = null;

            if (letter) {
                if (letter.length == 1) {
                    // Current index
                    var current = obj.currentIndex || -1;
                    // Letter
                    letter = letter.toLowerCase();

                    var e = null;
                    var l = null;
                    var items = content.querySelectorAll('.jdropdown-item');
                    if (items.length) {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].indexValue > current) {
                                if (e = obj.items[items[i].indexValue]) {
                                    if (l = e.element.innerText[0]) {
                                        l = l.toLowerCase();
                                        if (letter == l) {
                                            newIndex = items[i].indexValue;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        obj.setCursor(newIndex);
                    }
                }
            } else {
                if (obj.currentIndex == undefined || obj.currentIndex == null) {
                    obj.first();
                } else {
                    var element = obj.items[obj.currentIndex].element;

                    var next = element.nextElementSibling;
                    if (next) {
                        if (next.classList.contains('jdropdown-group')) {
                            next = next.lastChild.firstChild;
                        }
                        newIndex = next.indexValue;
                    } else {
                        if (element.parentNode.classList.contains('jdropdown-group-items')) {
                            if (next = element.parentNode.parentNode.nextElementSibling) {
                                if (next.classList.contains('jdropdown-group')) {
                                    next = next.lastChild.firstChild;
                                } else if (next.classList.contains('jdropdown-item')) {
                                    newIndex = next.indexValue;
                                } else {
                                    next = null;
                                }
                            }

                            if (next) {
                                newIndex = next.indexValue;
                            }
                        }
                    }

                    if (newIndex !== null) {
                        obj.setCursor(newIndex);
                    }
                }
            }
        }

        obj.prev = function () {
            var newIndex = null;

            if (obj.currentIndex === null) {
                obj.first();
            } else {
                var element = obj.items[obj.currentIndex].element;

                var prev = element.previousElementSibling;
                if (prev) {
                    if (prev.classList.contains('jdropdown-group')) {
                        prev = prev.lastChild.lastChild;
                    }
                    newIndex = prev.indexValue;
                } else {
                    if (element.parentNode.classList.contains('jdropdown-group-items')) {
                        if (prev = element.parentNode.parentNode.previousElementSibling) {
                            if (prev.classList.contains('jdropdown-group')) {
                                prev = prev.lastChild.lastChild;
                            } else if (prev.classList.contains('jdropdown-item')) {
                                newIndex = prev.indexValue;
                            } else {
                                prev = null
                            }
                        }

                        if (prev) {
                            newIndex = prev.indexValue;
                        }
                    }
                }
            }

            if (newIndex !== null) {
                obj.setCursor(newIndex);
            }
        }

        obj.loadFirst = function () {
            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            // Show 200 items at once
            var number = results.length || 0;

            // Lazyloading
            if (obj.options.lazyLoading == true && number > 200) {
                number = 200;
            }

            // Reset container
            content.textContent = '';

            // First 200 items
            for (var i = 0; i < number; i++) {
                if (results[i].group) {
                    if (!results[i].group.parentNode) {
                        content.appendChild(results[i].group);
                    }
                    results[i].group.lastChild.appendChild(results[i].element);
                } else {
                    content.appendChild(results[i].element);
                }
            }

            // Scroll go to the begin
            content.scrollTop = 0;
        }

        obj.loadLast = function () {
            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            // Show first page
            var number = results.length;

            // Max 200 items
            if (number > 200) {
                number = number - 200;

                // Reset container
                content.textContent = '';

                // First 200 items
                for (var i = number; i < results.length; i++) {
                    if (results[i].group) {
                        if (!results[i].group.parentNode) {
                            content.appendChild(results[i].group);
                        }
                        results[i].group.lastChild.appendChild(results[i].element);
                    } else {
                        content.appendChild(results[i].element);
                    }
                }

                // Scroll go to the begin
                content.scrollTop = content.scrollHeight;
            }
        }

        obj.loadUp = function () {
            var test = false;

            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            var items = content.querySelectorAll('.jdropdown-item');
            var fistItem = items[0].indexValue;
            fistItem = obj.items[fistItem];
            var index = results.indexOf(fistItem) - 1;

            if (index > 0) {
                var number = 0;

                while (index > 0 && results[index] && number < 200) {
                    if (results[index].group) {
                        if (!results[index].group.parentNode) {
                            content.insertBefore(results[index].group, content.firstChild);
                        }
                        results[index].group.lastChild.insertBefore(results[index].element, results[index].group.lastChild.firstChild);
                    } else {
                        content.insertBefore(results[index].element, content.firstChild);
                    }

                    index--;
                    number++;
                }

                // New item added
                test = true;
            }

            return test;
        }

        obj.loadDown = function () {
            var test = false;

            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            var items = content.querySelectorAll('.jdropdown-item');
            var lastItem = items[items.length - 1].indexValue;
            lastItem = obj.items[lastItem];
            var index = results.indexOf(lastItem) + 1;

            if (index < results.length) {
                var number = 0;
                while (index < results.length && results[index] && number < 200) {
                    if (results[index].group) {
                        if (!results[index].group.parentNode) {
                            content.appendChild(results[index].group);
                        }
                        results[index].group.lastChild.appendChild(results[index].element);
                    } else {
                        content.appendChild(results[index].element);
                    }

                    index++;
                    number++;
                }

                // New item added
                test = true;
            }

            return test;
        }

        init();

        return obj;
    });

    Component.keydown = function (e) {
        var dropdown = null;
        if (dropdown = Component.current) {
            if (e.which == 13 || e.which == 9) {  // enter or tab
                if (dropdown.header.value && dropdown.currentIndex == null && dropdown.options.newOptions) {
                    // if they typed something in, but it matched nothing, and newOptions are allowed, start that flow
                    dropdown.add();
                } else {
                    // Quick Select/Filter
                    if (dropdown.currentIndex == null && dropdown.options.autocomplete == true && dropdown.header.value != "") {
                        dropdown.find(dropdown.header.value);
                    }
                    dropdown.selectIndex(dropdown.currentIndex);
                }
            } else if (e.which == 38) {  // up arrow
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex > 0) {
                    dropdown.prev();
                }
                e.preventDefault();
            } else if (e.which == 40) {  // down arrow
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                    dropdown.next();
                }
                e.preventDefault();
            } else if (e.which == 36) {
                dropdown.first();
                if (!e.target.classList.contains('jdropdown-header')) {
                    e.preventDefault();
                }
            } else if (e.which == 35) {
                dropdown.last();
                if (!e.target.classList.contains('jdropdown-header')) {
                    e.preventDefault();
                }
            } else if (e.which == 27) {
                dropdown.close();
            } else if (e.which == 33) {  // page up
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex > 0) {
                    for (var i = 0; i < 7; i++) {
                        dropdown.prev()
                    }
                }
                e.preventDefault();
            } else if (e.which == 34) {  // page down
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                    for (var i = 0; i < 7; i++) {
                        dropdown.next()
                    }
                }
                e.preventDefault();
            }
        }
    }

    Component.mouseup = function (e) {
        var element = helpers.findElement(e.target, 'jdropdown');
        if (element) {
            var dropdown = element.dropdown;
            if (e.target.classList.contains('jdropdown-header')) {
                if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                    var rect = element.getBoundingClientRect();

                    if (e.changedTouches && e.changedTouches[0]) {
                        var x = e.changedTouches[0].clientX;
                        var y = e.changedTouches[0].clientY;
                    } else {
                        var x = e.clientX;
                        var y = e.clientY;
                    }

                    if (rect.width - (x - rect.left) < 30) {
                        if (e.target.classList.contains('jdropdown-add')) {
                            dropdown.add();
                        } else {
                            dropdown.close();
                        }
                    } else {
                        if (dropdown.options.autocomplete == false) {
                            dropdown.close();
                        }
                    }
                } else {
                    dropdown.open();
                }
            } else if (e.target.classList.contains('jdropdown-group-name')) {
                var items = e.target.nextSibling.children;
                if (e.target.nextSibling.style.display != 'none') {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].style.display != 'none') {
                            dropdown.selectItem(items[i]);
                        }
                    }
                }
            } else if (e.target.classList.contains('jdropdown-group-arrow')) {
                if (e.target.classList.contains('jdropdown-group-arrow-down')) {
                    e.target.classList.remove('jdropdown-group-arrow-down');
                    e.target.classList.add('jdropdown-group-arrow-up');
                    e.target.parentNode.nextSibling.style.display = 'none';
                } else {
                    e.target.classList.remove('jdropdown-group-arrow-up');
                    e.target.classList.add('jdropdown-group-arrow-down');
                    e.target.parentNode.nextSibling.style.display = '';
                }
            } else if (e.target.classList.contains('jdropdown-item')) {
                dropdown.selectItem(e.target);
            } else if (e.target.classList.contains('jdropdown-image')) {
                dropdown.selectItem(e.target.parentNode);
            } else if (e.target.classList.contains('jdropdown-description')) {
                dropdown.selectItem(e.target.parentNode);
            } else if (e.target.classList.contains('jdropdown-title')) {
                dropdown.selectItem(e.target.parentNode.parentNode);
            } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
                dropdown.close();
            }
        }
    }

    Component.extractFromDom = function (el, options) {
        // Keep reference
        var select = el;
        if (!options) {
            options = {};
        }
        // Prepare configuration
        if (el.getAttribute('multiple') && (!options || options.multiple == undefined)) {
            options.multiple = true;
        }
        if (el.getAttribute('placeholder') && (!options || options.placeholder == undefined)) {
            options.placeholder = el.getAttribute('placeholder');
        }
        if (el.getAttribute('data-autocomplete') && (!options || options.autocomplete == undefined)) {
            options.autocomplete = true;
        }
        if (!options || options.width == undefined) {
            options.width = el.offsetWidth;
        }
        if (el.value && (!options || options.value == undefined)) {
            options.value = el.value;
        }
        if (!options || options.data == undefined) {
            options.data = [];
            for (var j = 0; j < el.children.length; j++) {
                if (el.children[j].tagName == 'OPTGROUP') {
                    for (var i = 0; i < el.children[j].children.length; i++) {
                        options.data.push({
                            value: el.children[j].children[i].value,
                            text: el.children[j].children[i].textContent,
                            group: el.children[j].getAttribute('label'),
                        });
                    }
                } else {
                    options.data.push({
                        value: el.children[j].value,
                        text: el.children[j].textContent,
                    });
                }
            }
        }
        if (!options || options.onchange == undefined) {
            options.onchange = function (a, b, c, d) {
                if (options.multiple == true) {
                    if (obj.items[b].classList.contains('jdropdown-selected')) {
                        select.options[b].setAttribute('selected', 'selected');
                    } else {
                        select.options[b].removeAttribute('selected');
                    }
                } else {
                    select.value = d;
                }
            }
        }
        // Create DIV
        var div = document.createElement('div');
        el.parentNode.insertBefore(div, el);
        el.style.display = 'none';
        el = div;

        return {el: el, options: options};
    }

    return Component;
}

/* harmony default export */ var dropdown = (Dropdown());
;// CONCATENATED MODULE: ./src/plugins/picker.js



function Picker(el, options) {
    // Already created, update options
    if (el.picker) {
        return el.picker.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'picker' };
    obj.options = {};

    var dropdownHeader = null;
    var dropdownContent = null;

    /**
     * The element passed is a DOM element
     */
    var isDOM = function(o) {
        return (o instanceof Element || o instanceof HTMLDocument);
    }

    /**
     * Create the content options
     */
    var createContent = function() {
        dropdownContent.innerHTML = '';

        // Create items
        var keys = Object.keys(obj.options.data);

        // Go though all options
        for (var i = 0; i < keys.length; i++) {
            // Item
            var dropdownItem = document.createElement('div');
            dropdownItem.classList.add('jpicker-item');
            dropdownItem.setAttribute('role', 'option');
            dropdownItem.k = keys[i];
            dropdownItem.v = obj.options.data[keys[i]];
            // Label
            var item = obj.getLabel(keys[i], dropdownItem);
            if (isDOM(item)) {
                dropdownItem.appendChild(item);
            } else {
                dropdownItem.innerHTML = item;
            }
            // Append
            dropdownContent.appendChild(dropdownItem);
        }
    }

    /**
     * Set or reset the options for the picker
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            value: 0,
            data: null,
            render: null,
            onchange: null,
            onmouseover: null,
            onselect: null,
            onopen: null,
            onclose: null,
            onload: null,
            width: null,
            header: true,
            right: false,
            bottom: false,
            content: false,
            columns: null,
            grid: null,
            height: null,
        }

        // Legacy purpose only
        if (options && options.options) {
            options.data = options.options;
        }

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Start using the options
        if (obj.options.header === false) {
            dropdownHeader.style.display = 'none';
        } else {
            dropdownHeader.style.display = '';
        }

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        } else {
            dropdownHeader.style.width = '';
        }

        // Height
        if (obj.options.height) {
            dropdownContent.style.maxHeight = obj.options.height + 'px';
            dropdownContent.style.overflow = 'scroll';
        } else {
            dropdownContent.style.overflow = '';
        }

        if (obj.options.columns > 0) {
            if (! obj.options.grid) {
                dropdownContent.classList.add('jpicker-columns');
                dropdownContent.style.width = obj.options.width ? obj.options.width : 36 * obj.options.columns + 'px';
            } else {
                dropdownContent.classList.add('jpicker-grid');
                dropdownContent.style.gridTemplateColumns = 'repeat(' + obj.options.grid + ', 1fr)';
            }
        }

        if (isNaN(parseInt(obj.options.value))) {
            obj.options.value = 0;
        }

        // Create list from data
        createContent();

        // Set value
        obj.setValue(obj.options.value);

        // Set options all returns the own instance
        return obj;
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    obj.setValue = function(k, e) {
        // Set label
        obj.setLabel(k);

        // Update value
        obj.options.value = String(k);

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.oninput) == 'function') {
                el.oninput({
                    type: 'input',
                    target: el,
                    value: el.value
                });
            }
        }

        if (dropdownContent.children[k] && dropdownContent.children[k].getAttribute('type') !== 'generic') {
            obj.close();
        }

        // Call method
        if (e) {
            if (typeof (obj.options.onchange) == 'function') {
                var v = obj.options.data[k];

                obj.options.onchange(el, obj, v, v, k, e);
            }
        }
    }

    obj.getLabel = function(v, item) {
        var label = obj.options.data[v] || null;
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label, item);
        }
        return label;
    }

    obj.setLabel = function(v) {
        var item;

        if (obj.options.content) {
            item = '<i class="material-icons">' + obj.options.content + '</i>';
        } else {
            item = obj.getLabel(v, null);
        }
        // Label
        if (isDOM(item)) {
            dropdownHeader.innerHTML = '';
            dropdownHeader.appendChild(item);
        } else {
            dropdownHeader.innerHTML = item;
        }
    }

    obj.open = function() {
        if (! el.classList.contains('jpicker-focus')) {
            // Start tracking the element
            tracking(obj, true);

            // Open picker
            el.classList.add('jpicker-focus');
            el.focus();

            var top = 0;
            var left = 0;

            dropdownContent.style.marginLeft = '';

            var rectHeader = dropdownHeader.getBoundingClientRect();
            var rectContent = dropdownContent.getBoundingClientRect();

            if (window.innerHeight < rectHeader.bottom + rectContent.height || obj.options.bottom) {
                top = -1 * (rectContent.height + 4);
            } else {
                top = rectHeader.height + 4;
            }

            if (obj.options.right === true) {
                left = -1 * rectContent.width + rectHeader.width;
            }

            if (rectContent.left + left < 0) {
                left = left + rectContent.left + 10;
            }
            if (rectContent.left + rectContent.width > window.innerWidth) {
                left = -1 * (10 + rectContent.left + rectContent.width - window.innerWidth);
            }

            dropdownContent.style.marginTop = parseInt(top) + 'px';
            dropdownContent.style.marginLeft = parseInt(left) + 'px';

            //dropdownContent.style.marginTop
            if (typeof obj.options.onopen == 'function') {
                obj.options.onopen(el, obj);
            }
        }
    }

    obj.close = function() {
        if (el.classList.contains('jpicker-focus')) {
            el.classList.remove('jpicker-focus');

            // Start tracking the element
            tracking(obj, false);

            if (typeof obj.options.onclose == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    /**
     * Create floating picker
     */
    var init = function() {
        let id = helpers.guid();

        // Class
        el.classList.add('jpicker');
        el.setAttribute('role', 'combobox');
        el.setAttribute('aria-haspopup', 'listbox');
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-controls', id);
        el.setAttribute('tabindex', '0');
        el.onmousedown = function(e) {
            if (! el.classList.contains('jpicker-focus')) {
                obj.open();
            }
        }

        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.setAttribute('id', id);
        dropdownContent.setAttribute('role', 'listbox');
        dropdownContent.classList.add('jpicker-content');
        dropdownContent.onclick = function(e) {
            var item = helpers.findElement(e.target, 'jpicker-item');
            if (item) {
                if (item.parentNode === dropdownContent) {
                    // Update label
                    obj.setValue(item.k, e);
                }
            }
        }
        // Append content and header
        el.appendChild(dropdownHeader);
        el.appendChild(dropdownContent);

        // Default value
        el.value = options.value || 0;

        // Set options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.picker = obj;
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/toolbar.js





function Toolbar(el, options) {
    // New instance
    var obj = { type:'toolbar' };
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        container: false,
        badge: false,
        title: false,
        responsive: false,
        maxWidth: null,
        bottom: true,
        items: [],
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! el && options.app && options.app.el) {
        el = document.createElement('div');
        options.app.el.appendChild(el);
    }

    // Arrow
    var toolbarArrow = document.createElement('div');
    toolbarArrow.classList.add('jtoolbar-item');
    toolbarArrow.classList.add('jtoolbar-arrow');

    var toolbarFloating = document.createElement('div');
    toolbarFloating.classList.add('jtoolbar-floating');
    toolbarArrow.appendChild(toolbarFloating);

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            if (element != elements[i]) {
                elements[i].classList.remove('jtoolbar-selected');
            }
        }
        element.classList.add('jtoolbar-selected');
    }

    obj.hide = function() {
        animation.slideBottom(el, 0, function() {
            el.style.display = 'none';
        });
    }

    obj.show = function() {
        el.style.display = '';
        animation.slideBottom(el, 1);
    }

    obj.get = function() {
        return el;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        el.innerHTML = '';
    }

    obj.update = function(a, b) {
        for (var i = 0; i < toolbarContent.children.length; i++) {
            // Toolbar element
            var toolbarItem = toolbarContent.children[i];
            // State management
            if (typeof(toolbarItem.updateState) == 'function') {
                toolbarItem.updateState(el, obj, toolbarItem, a, b);
            }
        }
        for (var i = 0; i < toolbarFloating.children.length; i++) {
            // Toolbar element
            var toolbarItem = toolbarFloating.children[i];
            // State management
            if (typeof(toolbarItem.updateState) == 'function') {
                toolbarItem.updateState(el, obj, toolbarItem, a, b);
            }
        }
    }

    obj.create = function(items) {
        // Reset anything in the toolbar
        toolbarContent.innerHTML = '';
        // Create elements in the toolbar
        for (var i = 0; i < items.length; i++) {
            var toolbarItem = document.createElement('div');
            toolbarItem.classList.add('jtoolbar-item');

            if (items[i].width) {
                toolbarItem.style.width = parseInt(items[i].width) + 'px'; 
            }

            if (items[i].k) {
                toolbarItem.k = items[i].k;
            }

            if (items[i].tooltip) {
                toolbarItem.setAttribute('title', items[i].tooltip);
                toolbarItem.setAttribute('aria-label', items[i].tooltip);
            }

            // Id
            if (items[i].id) {
                toolbarItem.setAttribute('id', items[i].id);
            }

            // Selected
            if (items[i].updateState) {
                toolbarItem.updateState = items[i].updateState;
            }

            if (items[i].active) {
                toolbarItem.classList.add('jtoolbar-active');
            }

            if (items[i].disabled) {
                toolbarItem.classList.add('jtoolbar-disabled');
            }

            if (items[i].type == 'select' || items[i].type == 'dropdown') {
                Picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            } else if (items[i].type == 'label') {
                toolbarItem.classList.add('jtoolbar-label');
                toolbarItem.innerHTML = items[i].content;
            } else {
                // Material icons
                var toolbarIcon = document.createElement('i');
                if (typeof(items[i].class) === 'undefined') {
                    toolbarIcon.classList.add('material-icons');
                } else {
                    var c = items[i].class.split(' ');
                    for (var j = 0; j < c.length; j++) {
                        toolbarIcon.classList.add(c[j]);
                    }
                }
                toolbarIcon.innerHTML = items[i].content ? items[i].content : '';
                toolbarItem.setAttribute('role', 'button');
                toolbarItem.appendChild(toolbarIcon);

                // Badge options
                if (obj.options.badge == true) {
                    var toolbarBadge = document.createElement('div');
                    toolbarBadge.classList.add('jbadge');
                    var toolbarBadgeContent = document.createElement('div');
                    toolbarBadgeContent.innerHTML = items[i].badge ? items[i].badge : '';
                    toolbarBadge.appendChild(toolbarBadgeContent);
                    toolbarItem.appendChild(toolbarBadge);
                }

                // Title
                if (items[i].title) {
                    if (obj.options.title == true) {
                        var toolbarTitle = document.createElement('span');
                        toolbarTitle.innerHTML = items[i].title;
                        toolbarItem.appendChild(toolbarTitle);
                    } else {
                        toolbarItem.setAttribute('title', items[i].title);
                    }
                }

                if (obj.options.app && items[i].route) {
                    // Route
                    toolbarItem.route = items[i].route;
                    // Onclick for route
                    toolbarItem.onclick = function() {
                        obj.options.app.pages(this.route);
                    }
                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true
                    });
                }

                // Render
                if (typeof(items[i].render) === 'function') {
                    items[i].render(toolbarItem, items[i]);
                }
            }

            if (items[i].onclick) {
                toolbarItem.onclick = items[i].onclick.bind(items[i], el, obj, toolbarItem);
            }

            toolbarContent.appendChild(toolbarItem);
        }

        // Fits to the page
        setTimeout(function() {
            obj.refresh();
        }, 0);
    }

    obj.open = function() {
        toolbarArrow.classList.add('jtoolbar-arrow-selected');

        var rectElement = el.getBoundingClientRect();
        var rect = toolbarFloating.getBoundingClientRect();
        if (rect.bottom > window.innerHeight || obj.options.bottom) {
            toolbarFloating.style.bottom = '0';
        } else {
            toolbarFloating.style.removeProperty('bottom');
        }

        toolbarFloating.style.right = '0';

        toolbarArrow.children[0].focus();
        // Start tracking
        tracking(obj, true);
    }

    obj.close = function() {
        toolbarArrow.classList.remove('jtoolbar-arrow-selected')
        // End tracking
        tracking(obj, false);
    }

    obj.refresh = function() {
        if (obj.options.responsive == true) {
            // Width of the c
            var rect = el.parentNode.getBoundingClientRect();
            if (! obj.options.maxWidth) {
                obj.options.maxWidth = rect.width;
            }
            // Available parent space
            var available = parseInt(obj.options.maxWidth);
            // Remove arrow
            if (toolbarArrow.parentNode) {
                toolbarArrow.parentNode.removeChild(toolbarArrow);
            }
            // Move all items to the toolbar
            while (toolbarFloating.firstChild) {
                toolbarContent.appendChild(toolbarFloating.firstChild);
            }
            // Toolbar is larger than the parent, move elements to the floating element
            if (available < toolbarContent.offsetWidth) {
                // Give space to the floating element
                available -= 50;
                // Move to the floating option
                while (toolbarContent.lastChild && available < toolbarContent.offsetWidth) {
                    toolbarFloating.insertBefore(toolbarContent.lastChild, toolbarFloating.firstChild);
                }
            }
            // Show arrow
            if (toolbarFloating.children.length > 0) {
                toolbarContent.appendChild(toolbarArrow);
            }
        }
    }

    obj.setReadonly = function(state) {
        state = state ? 'add' : 'remove';
        el.classList[state]('jtoolbar-disabled');
    }

    el.onclick = function(e) {
        var element = helpers.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }

        if (e.target.classList.contains('jtoolbar-arrow')) {
            obj.open();
        }
    }

    window.addEventListener('resize', function() {
        obj.refresh();
    });

    // Toolbar
    el.classList.add('jtoolbar');
    // Reset content
    el.innerHTML = '';
    // Container
    if (obj.options.container == true) {
        el.classList.add('jtoolbar-container');
    }
    // Content
    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);
    // Special toolbar for mobile applications
    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    }
    // Create toolbar
    obj.create(obj.options.items);
    // Shortcut
    el.toolbar = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/editor.js





function Editor() {
    var Component = (function(el, options) {
        // New instance
        var obj = { type:'editor' };
        obj.options = {};

        // Default configuration
        var defaults = {
            // Load data from a remove location
            url: null,
            // Initial HTML content
            value: '',
            // Initial snippet
            snippet: null,
            // Add toolbar
            toolbar: true,
            toolbarOnTop: false,
            // Website parser is to read websites and images from cross domain
            remoteParser: null,
            // Placeholder
            placeholder: null,
            // Parse URL
            filterPaste: true,
            // Accept drop files
            dropZone: true,
            dropAsSnippet: false,
            acceptImages: true,
            acceptFiles: false,
            maxFileSize: 5000000,
            allowImageResize: true,
            // Style
            maxHeight: null,
            height: null,
            focus: false,
            // Events
            onclick: null,
            onfocus: null,
            onblur: null,
            onload: null,
            onkeyup: null,
            onkeydown: null,
            onchange: null,
            extensions: null,
            type: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Private controllers
        var editorTimer = null;
        var editorAction = null;
        var files = [];

        // Keep the reference for the container
        obj.el = el;

        if (typeof(obj.options.onclick) == 'function') {
            el.onclick = function(e) {
                obj.options.onclick(el, obj, e);
            }
        }

        // Prepare container
        el.classList.add('jeditor-container');

        // Snippet
        var snippet = document.createElement('div');
        snippet.className = 'jsnippet';
        snippet.setAttribute('contenteditable', false);

        // Toolbar
        var toolbar = document.createElement('div');
        toolbar.className = 'jeditor-toolbar';

        obj.editor = document.createElement('div');
        obj.editor.setAttribute('contenteditable', true);
        obj.editor.setAttribute('spellcheck', false);
        obj.editor.classList.add('jeditor');

        // Placeholder
        if (obj.options.placeholder) {
            obj.editor.setAttribute('data-placeholder', obj.options.placeholder);
        }

        // Max height
        if (obj.options.maxHeight || obj.options.height) {
            obj.editor.style.overflowY = 'auto';

            if (obj.options.maxHeight) {
                obj.editor.style.maxHeight = obj.options.maxHeight;
            }
            if (obj.options.height) {
                obj.editor.style.height = obj.options.height;
            }
        }

        // Set editor initial value
        if (obj.options.url) {
            ajax({
                url: obj.options.url,
                dataType: 'html',
                success: function(result) {
                    obj.editor.innerHTML = result;

                    Component.setCursor(obj.editor, obj.options.focus == 'initial' ? true : false);
                }
            })
        } else {
            if (obj.options.value) {
                obj.editor.innerHTML = obj.options.value;
            } else {
                // Create from existing elements
                for (var i = 0; i < el.children.length; i++) {
                    obj.editor.appendChild(el.children[i]);
                }
            }
        }

        // Make sure element is empty
        el.innerHTML = '';

        /**
         * Onchange event controllers
         */
        var change = function(e) {
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, e);
            }

            // Update value
            obj.options.value = obj.getData();

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        /**
         * Extract images from a HTML string
         */
        var extractImageFromHtml = function(html) {
            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addImage(img[i].src);
                }
            }
        }

        /**
         * Insert node at caret
         */
        var insertNodeAtCaret = function(newNode) {
            var sel, range;

            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    var selectedText = range.toString();
                    range.deleteContents();
                    range.insertNode(newNode);
                    // move the cursor after element
                    range.setStartAfter(newNode);
                    range.setEndAfter(newNode);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }

        var updateTotalImages = function() {
            var o = null;
            if (o = snippet.children[0]) {
                // Make sure is a grid
                if (! o.classList.contains('jslider-grid')) {
                    o.classList.add('jslider-grid');
                }
                // Quantify of images
                var number = o.children.length;
                // Set the configuration of the grid
                o.setAttribute('data-number', number > 4 ? 4 : number);
                // Total of images inside the grid
                if (number > 4) {
                    o.setAttribute('data-total', number - 4);
                } else {
                    o.removeAttribute('data-total');
                }
            }
        }

        /**
         * Append image to the snippet
         */
        var appendImage = function(image) {
            if (! snippet.innerHTML) {
                obj.appendSnippet({});
            }
            snippet.children[0].appendChild(image);
            updateTotalImages();
        }

        /**
         * Append snippet
         * @Param object data
         */
        obj.appendSnippet = function(data) {
            // Reset snippet
            snippet.innerHTML = '';

            // Attributes
            var a = [ 'image', 'title', 'description', 'host', 'url' ];

            for (var i = 0; i < a.length; i++) {
                var div = document.createElement('div');
                div.className = 'jsnippet-' + a[i];
                div.setAttribute('data-k', a[i]);
                snippet.appendChild(div);
                if (data[a[i]]) {
                    if (a[i] == 'image') {
                        if (! Array.isArray(data.image)) {
                            data.image = [ data.image ];
                        }
                        for (var j = 0; j < data.image.length; j++) {
                            var img = document.createElement('img');
                            img.src = data.image[j];
                            div.appendChild(img);
                        }
                    } else {
                        div.innerHTML = data[a[i]];
                    }
                }
            }

            obj.editor.appendChild(document.createElement('br'));
            obj.editor.appendChild(snippet);
        }

        /**
         * Set editor value
         */
        obj.setData = function(o) {
            if (typeof(o) == 'object') {
                obj.editor.innerHTML = o.content;
            } else {
                obj.editor.innerHTML = o;
            }

            if (obj.options.focus) {
                Component.setCursor(obj.editor, true);
            }

            // Reset files container
            files = [];
        }

        obj.getFiles = function() {
            var f = obj.editor.querySelectorAll('.jfile');
            var d = [];
            for (var i = 0; i < f.length; i++) {
                if (files[f[i].src]) {
                    d.push(files[f[i].src]);
                }
            }
            return d;
        }

        obj.getText = function() {
            return obj.editor.innerText;
        }

        /**
         * Get editor data
         */
        obj.getData = function(json) {
            if (! json) {
                var data = obj.editor.innerHTML;
            } else {
                var data = {
                    content : '',
                }

                // Get snippet
                if (snippet.innerHTML) {
                    var index = 0;
                    data.snippet = {};
                    for (var i = 0; i < snippet.children.length; i++) {
                        // Get key from element
                        var key = snippet.children[i].getAttribute('data-k');
                        if (key) {
                            if (key == 'image') {
                                if (! data.snippet.image) {
                                    data.snippet.image = [];
                                }
                                // Get all images
                                for (var j = 0; j < snippet.children[i].children.length; j++) {
                                    data.snippet.image.push(snippet.children[i].children[j].getAttribute('src'))
                                }
                            } else {
                                data.snippet[key] = snippet.children[i].innerHTML;
                            }
                        }
                    }
                }

                // Get files
                var f = Object.keys(files);
                if (f.length) {
                    data.files = [];
                    for (var i = 0; i < f.length; i++) {
                        data.files.push(files[f[i]]);
                    }
                }

                // Get content
                var d = document.createElement('div');
                d.innerHTML = obj.editor.innerHTML;
                var s = d.querySelector('.jsnippet');
                if (s) {
                    s.remove();
                }

                var text = d.innerHTML;
                text = text.replace(/<br>/g, "\n");
                text = text.replace(/<\/div>/g, "<\/div>\n");
                text = text.replace(/<(?:.|\n)*?>/gm, "");
                data.content = text.trim();

                // Process extensions
                processExtensions('getData', data);
            }

            return data;
        }

        // Reset
        obj.reset = function() {
            obj.editor.innerHTML = '';
            snippet.innerHTML = '';
            files = [];
        }

        obj.addPdf = function(data) {
            if (data.result.substr(0,4) != 'data') {
                console.error('Invalid source');
            } else {
                var canvas = document.createElement('canvas');
                canvas.width = 60;
                canvas.height = 60;

                var img = new Image();
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    var newImage = document.createElement('img');
                    newImage.src = window.URL.createObjectURL(blob);
                    newImage.title = data.name;
                    newImage.className = 'jfile pdf';

                    files[newImage.src] = {
                        file: newImage.src,
                        extension: 'pdf',
                        content: data.result,
                    }

                    //insertNodeAtCaret(newImage);
                    document.execCommand('insertHtml', false, newImage.outerHTML);
                });
            }
        }

        obj.addImage = function(src, asSnippet) {
            if (! obj.options.acceptImages) {
                return;
            }

            if (! src) {
                src = '';
            }

            if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
                console.error('remoteParser not defined in your initialization');
            } else {
                // This is to process cross domain images
                if (src.substr(0,4) == 'data') {
                    var extension = src.split(';')
                    extension = extension[0].split('/');
                    extension = extension[1];
                } else {
                    var extension = src.substr(src.lastIndexOf('.') + 1);
                    // Work for cross browsers
                    src = obj.options.remoteParser + src;
                }

                var img = new Image();

                img.onload = function onload() {
                    var canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob(function(blob) {
                        var newImage = document.createElement('img');
                        newImage.src = window.URL.createObjectURL(blob);
                        newImage.classList.add('jfile');
                        newImage.setAttribute('tabindex', '900');
                        newImage.setAttribute('width', img.width);
                        newImage.setAttribute('height', img.height);
                        files[newImage.src] = {
                            file: newImage.src,
                            extension: extension,
                            content: canvas.toDataURL(),
                        }

                        if (obj.options.dropAsSnippet || asSnippet) {
                            appendImage(newImage);
                            // Just to understand the attachment is part of a snippet
                            files[newImage.src].snippet = true;
                        } else {
                            //insertNodeAtCaret(newImage);
                            document.execCommand('insertHtml', false, newImage.outerHTML);
                        }

                        change();
                    });
                };

                img.src = src;
            }
        }

        obj.addFile = function(files) {
            var reader = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].size > obj.options.maxFileSize) {
                    alert('The file is too big');
                } else {
                    // Only PDF or Images
                    var type = files[i].type.split('/');

                    if (type[0] == 'image') {
                        type = 1;
                    } else if (type[1] == 'pdf') {
                        type = 2;
                    } else {
                        type = 0;
                    }

                    if (type) {
                        // Create file
                        reader[i] = new FileReader();
                        reader[i].index = i;
                        reader[i].type = type;
                        reader[i].name = files[i].name;
                        reader[i].date = files[i].lastModified;
                        reader[i].size = files[i].size;
                        reader[i].addEventListener("load", function (data) {
                            // Get result
                            if (data.target.type == 2) {
                                if (obj.options.acceptFiles == true) {
                                    obj.addPdf(data.target);
                                }
                            } else {
                                obj.addImage(data.target.result);
                            }
                        }, false);

                        reader[i].readAsDataURL(files[i])
                    } else {
                        alert('The extension is not allowed');
                    }
                }
            }
        }

        // Destroy
        obj.destroy = function() {
            obj.editor.removeEventListener('mouseup', editorMouseUp);
            obj.editor.removeEventListener('mousedown', editorMouseDown);
            obj.editor.removeEventListener('mousemove', editorMouseMove);
            obj.editor.removeEventListener('keyup', editorKeyUp);
            obj.editor.removeEventListener('keydown', editorKeyDown);
            obj.editor.removeEventListener('dragstart', editorDragStart);
            obj.editor.removeEventListener('dragenter', editorDragEnter);
            obj.editor.removeEventListener('dragover', editorDragOver);
            obj.editor.removeEventListener('drop', editorDrop);
            obj.editor.removeEventListener('paste', editorPaste);
            obj.editor.removeEventListener('blur', editorBlur);
            obj.editor.removeEventListener('focus', editorFocus);

            el.editor = null;
            el.classList.remove('jeditor-container');

            toolbar.remove();
            snippet.remove();
            obj.editor.remove();
        }

        obj.upload = function() {
            helpers.click(obj.file);
        }

        // Valid tags
        const validTags = [
            'html','body','address','span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'blockquote',
            'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'hr', 'br', 'img',
            'figure', 'picture', 'figcaption', 'iframe', 'table', 'thead', 'tbody', 'tfoot', 'tr',
            'th', 'td', 'caption', 'u', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
            'input', 'textarea', 'select', 'option', 'button', 'label', 'fieldset',
            'legend', 'audio', 'video', 'abbr', 'cite', 'kbd', 'section', 'article',
            'nav', 'aside', 'header', 'footer', 'main', 'details', 'summary', 'svg', 'line', 'source'
        ];
        // Valid properties
        const validProperty = ['width', 'height', 'align', 'border', 'src', 'tabindex'];
        // Valid CSS attributes
        const validStyle = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin'];

        const parse = function(element) {
            // Remove elements that are not white-listed
            if (element.tagName && validTags.indexOf(element.tagName.toLowerCase()) === -1) {
                if (element.innerText) {
                    element.innerHTML = element.innerText;
                }
            }
            // Remove attributes
            if (element.attributes && element.attributes.length) {
                let style = null;
                // Process style attribute
                let elementStyle = element.getAttribute('style');
                if (elementStyle) {
                    style = [];
                    let t = elementStyle.split(';');
                    for (let j = 0; j < t.length; j++) {
                        let v = t[j].trim().split(':');
                        if (validStyle.indexOf(v[0].trim()) >= 0) {
                            let k = v.shift();
                            v = v.join(':');
                            style.push(k + ':' + v);
                        }
                    }
                }
                // Process image
                if (element.tagName.toUpperCase() === 'IMG') {
                    if (! obj.options.acceptImages || !element.src) {
                        element.parentNode.removeChild(element);
                    } else {
                        // Check if is data
                        element.setAttribute('tabindex', '900');
                        // Check attributes for persistence
                        obj.addImage(element.src);
                    }
                }
                // Remove attributes
                let attr = [];
                for (let i = 0; i < element.attributes.length; i++) {
                    attr.push(element.attributes[i].name);
                }
                if (attr.length) {
                    attr.forEach(function (v) {
                        if (validProperty.indexOf(v) === -1) {
                            element.removeAttribute(v);
                        } else {
                            // Protection XSS
                            if (element.attributes && element.attributes[i] && element.attributes[i].value.indexOf('<') !== -1) {
                                element.attributes[i].value.replace('<', '&#60;');
                            }
                        }
                    });
                }
                element.style = '';
                // Add valid style
                if (style && style.length) {
                    element.setAttribute('style', style.join(';'));
                }
            }
            // Parse children
            if (element.children.length) {
                for (let i = element.children.length; i > 0; i--) {
                    parse(element.children[i - 1]);
                }
            }
        }

        var select = function(e) {
            var s = window.getSelection()
            var r = document.createRange();
            r.selectNode(e);
            s.addRange(r)
        }

        var filter = function(data) {
            if (data) {
                data = data.replace(new RegExp('<!--(.*?)-->', 'gsi'), '');
            }
            var parser = new DOMParser();
            var d = parser.parseFromString(data, "text/html");
            parse(d);
            var div = document.createElement('div');
            div.innerHTML = d.firstChild.innerHTML;
            return div;
        }

        var editorPaste = function(e) {
            if (obj.options.filterPaste == true) {
                if (e.clipboardData || e.originalEvent.clipboardData) {
                    var html = (e.originalEvent || e).clipboardData.getData('text/html');
                    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                    var file = (e.originalEvent || e).clipboardData.files
                } else if (window.clipboardData) {
                    var html = window.clipboardData.getData('Html');
                    var text = window.clipboardData.getData('Text');
                    var file = window.clipboardData.files
                }

                if (file.length) {
                    // Paste a image from the clipboard
                    obj.addFile(file);
                } else {
                    if (! html) {
                        html = text.split('\r\n');
                        if (! e.target.innerText) {
                            html.map(function(v) {
                                var d = document.createElement('div');
                                d.innerText = v;
                                obj.editor.appendChild(d);
                            });
                        } else {
                            html = html.map(function(v) {
                                return '<div>' + v + '</div>';
                            });
                            document.execCommand('insertText', false, html.join(''));
                        }
                    } else {
                        var d = filter(html);
                        // Paste to the editor
                        //insertNodeAtCaret(d);
                        document.execCommand('insertHtml', false, d.innerHTML);
                    }
                }

                e.preventDefault();
            }
        }

        var editorDragStart = function(e) {
            if (editorAction && editorAction.e) {
                e.preventDefault();
            }
        }

        var editorDragEnter = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                el.classList.add('jeditor-dragging');
                e.preventDefault();
            }
        }

        var editorDragOver = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                if (editorTimer) {
                    clearTimeout(editorTimer);
                }

                editorTimer = setTimeout(function() {
                    el.classList.remove('jeditor-dragging');
                }, 100);
                e.preventDefault();
            }
        }

        var editorDrop = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                // Position caret on the drop
                var range = null;
                if (document.caretRangeFromPoint) {
                    range=document.caretRangeFromPoint(e.clientX, e.clientY);
                } else if (e.rangeParent) {
                    range=document.createRange();
                    range.setStart(e.rangeParent,e.rangeOffset);
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                sel.anchorNode.parentNode.focus();

                var html = (e.originalEvent || e).dataTransfer.getData('text/html');
                var text = (e.originalEvent || e).dataTransfer.getData('text/plain');
                var file = (e.originalEvent || e).dataTransfer.files;

                if (file.length) {
                    obj.addFile(file);
                } else if (text) {
                    extractImageFromHtml(html);
                }

                el.classList.remove('jeditor-dragging');
                e.preventDefault();
            }
        }

        var editorBlur = function(e) {
            // Process extensions
            processExtensions('onevent', e);
            // Apply changes
            change(e);
            // Blur
            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el, obj, e);
            }
        }

        var editorFocus = function(e) {
            // Focus
            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el, obj, e);
            }
        }

        var editorKeyUp = function(e) {
            if (! obj.editor.innerHTML) {
                obj.editor.innerHTML = '<div><br></div>';
            }
            if (typeof(obj.options.onkeyup) == 'function') {
                obj.options.onkeyup(el, obj, e);
            }
        }

        var editorKeyDown = function(e) {
            // Process extensions
            processExtensions('onevent', e);

            if (e.key == 'Delete') {
                if (e.target.tagName == 'IMG') {
                    var parent = e.target.parentNode;
                    select(e.target);
                    if (parent.classList.contains('jsnippet-image')) {
                        updateTotalImages();
                    }
                }
            }

            if (typeof(obj.options.onkeydown) == 'function') {
                obj.options.onkeydown(el, obj, e);
            }
        }

        var editorMouseUp = function(e) {
            if (editorAction && editorAction.e) {
                editorAction.e.classList.remove('resizing');

                if (editorAction.e.changed == true) {
                    var image = editorAction.e.cloneNode()
                    image.width = parseInt(editorAction.e.style.width) || editorAction.e.getAttribute('width');
                    image.height = parseInt(editorAction.e.style.height) || editorAction.e.getAttribute('height');
                    editorAction.e.style.width = '';
                    editorAction.e.style.height = '';
                    select(editorAction.e);
                    document.execCommand('insertHtml', false, image.outerHTML);
                }
            }

            editorAction = false;
        }

        var editorMouseDown = function(e) {
            var close = function(snippet) {
                var rect = snippet.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 40 && e.clientY - rect.top < 40) {
                    snippet.innerHTML = '';
                    snippet.remove();
                }
            }

            if (e.target.tagName == 'IMG') {
                if (e.target.style.cursor) {
                    var rect = e.target.getBoundingClientRect();
                    editorAction = {
                        e: e.target,
                        x: e.clientX,
                        y: e.clientY,
                        w: rect.width,
                        h: rect.height,
                        d: e.target.style.cursor,
                    }

                    if (! e.target.getAttribute('width')) {
                        e.target.setAttribute('width', rect.width)
                    }

                    if (! e.target.getAttribute('height')) {
                        e.target.setAttribute('height', rect.height)
                    }

                    var s = window.getSelection();
                    if (s.rangeCount) {
                        for (var i = 0; i < s.rangeCount; i++) {
                            s.removeRange(s.getRangeAt(i));
                        }
                    }

                    e.target.classList.add('resizing');
                } else {
                    editorAction = true;
                }
            } else {
                if (e.target.classList.contains('jsnippet')) {
                    close(e.target);
                } else if (e.target.parentNode.classList.contains('jsnippet')) {
                    close(e.target.parentNode);
                }

                editorAction = true;
            }
        }

        var editorMouseMove = function(e) {
            if (e.target.tagName == 'IMG' && ! e.target.parentNode.classList.contains('jsnippet-image') && obj.options.allowImageResize == true) {
                if (e.target.getAttribute('tabindex')) {
                    var rect = e.target.getBoundingClientRect();
                    if (e.clientY - rect.top < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'nw-resize';
                        } else {
                            e.target.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'sw-resize';
                        } else {
                            e.target.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'w-resize';
                    } else {
                        e.target.style.cursor = '';
                    }
                }
            }

            // Move
            if (e.which == 1 && editorAction && editorAction.d) {
                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'se-resize') {
                    editorAction.e.style.width = (editorAction.w + (e.clientX - editorAction.x));

                    if (e.shiftKey) {
                        var newHeight = (e.clientX - editorAction.x) * (editorAction.h / editorAction.w);
                        editorAction.e.style.height = editorAction.h + newHeight;
                    } else {
                        var newHeight =  null;
                    }
                }

                if (! newHeight) {
                    if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                        if (! e.shiftKey) {
                            editorAction.e.style.height = editorAction.h + (e.clientY - editorAction.y);
                        }
                    }
                }

                editorAction.e.changed = true;
            }
        }

        var processExtensions = function(method, data) {
            if (obj.options.extensions) {
                var ext = Object.keys(obj.options.extensions);
                if (ext.length) {
                    for (var i = 0; i < ext.length; i++)
                        if (obj.options.extensions[ext[i]] && typeof(obj.options.extensions[ext[i]][method]) == 'function') {
                            obj.options.extensions[ext[i]][method].call(obj, data);
                        }
                }
            }
        }

        var loadExtensions = function() {
            if (obj.options.extensions) {
                var ext = Object.keys(obj.options.extensions);
                if (ext.length) {
                    for (var i = 0; i < ext.length; i++) {
                        if (obj.options.extensions[ext[i]] && typeof (obj.options.extensions[ext[i]]) == 'function') {
                            obj.options.extensions[ext[i]] = obj.options.extensions[ext[i]](el, obj);
                        }
                    }
                }
            }
        }

        document.addEventListener('mouseup', editorMouseUp);
        document.addEventListener('mousemove', editorMouseMove);
        obj.editor.addEventListener('mousedown', editorMouseDown);
        obj.editor.addEventListener('keyup', editorKeyUp);
        obj.editor.addEventListener('keydown', editorKeyDown);
        obj.editor.addEventListener('dragstart', editorDragStart);
        obj.editor.addEventListener('dragenter', editorDragEnter);
        obj.editor.addEventListener('dragover', editorDragOver);
        obj.editor.addEventListener('drop', editorDrop);
        obj.editor.addEventListener('paste', editorPaste);
        obj.editor.addEventListener('focus', editorFocus);
        obj.editor.addEventListener('blur', editorBlur);

        // Append editor to the container
        el.appendChild(obj.editor);
        // Snippet
        if (obj.options.snippet) {
            obj.appendSnippet(obj.options.snippet);
        }

        // Add toolbar
        if (obj.options.toolbar) {
            // Default toolbar configuration
            if (Array.isArray(obj.options.toolbar)) {
                var toolbarOptions = {
                    container: true,
                    responsive: true,
                    items: obj.options.toolbar
                }
            } else if (obj.options.toolbar === true) {
                var toolbarOptions = {
                    container: true,
                    responsive: true,
                    items: [],
                }
            } else {
                var toolbarOptions = obj.options.toolbar;
            }

            // Default items
            if (! (toolbarOptions.items && toolbarOptions.items.length)) {
                toolbarOptions.items = Component.getDefaultToolbar(obj);
            }

            if (obj.options.toolbarOnTop) {
                // Add class
                el.classList.add('toolbar-on-top');
                // Append to the DOM
                el.insertBefore(toolbar, el.firstChild);
            } else {
                // Add padding to the editor
                obj.editor.style.padding = '15px';
                // Append to the DOM
                el.appendChild(toolbar);
            }

            // Create toolbar
            Toolbar(toolbar, toolbarOptions);

            toolbar.addEventListener('click', function() {
                obj.editor.focus();
            })
        }

        // Upload file
        obj.file = document.createElement('input');
        obj.file.style.display = 'none';
        obj.file.type = 'file';
        obj.file.setAttribute('accept', 'image/*');
        obj.file.onchange = function() {
            obj.addFile(this.files);
        }
        el.appendChild(obj.file);

        // Focus to the editor
        if (obj.options.focus) {
            Component.setCursor(obj.editor, obj.options.focus == 'initial' ? true : false);
        }

        // Change method
        el.change = obj.setData;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                // Data type
                var o = el.getAttribute('data-html') === 'true' ? false : true;
                return obj.getData(o);
            } else {
                obj.setData(val);
            }
        }

        loadExtensions();

        el.editor = obj;

        // Onload
        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj, obj.editor);
        }

        return obj;
    });

    Component.setCursor = function(element, first) {
        element.focus();
        document.execCommand('selectAll');
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        if (first == true) {
            var node = range.startContainer;
            var size = 0;
        } else {
            var node = range.endContainer;
            var size = node.length;
        }
        range.setStart(node, size);
        range.setEnd(node, size);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    Component.getDefaultToolbar = function(obj) {

        var color = function(a,b,c) {
            if (! c.color) {
                var t = null;
                var colorPicker = Color(c, {
                    onchange: function(o, v) {
                        if (c.k === 'color') {
                            document.execCommand('foreColor', false, v);
                        } else {
                            document.execCommand('backColor', false, v);
                        }
                    }
                });
                c.color.open();
            }
        }

        var items = [];

        items.push({
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        });

        items.push({
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        });

        items.push({
            type: 'divisor'
        });

        if (obj.options.toolbarOnTop) {
            items.push({
                type: 'select',
                width: '140px',
                options: ['Default', 'Verdana', 'Arial', 'Courier New'],
                render: function (e) {
                    return '<span style="font-family:' + e + '">' + e + '</span>';
                },
                onchange: function (a,b,c,d,e) {
                    document.execCommand("fontName", false, d);
                }
            });

            items.push({
                type: 'select',
                content: 'format_size',
                options: ['x-small', 'small', 'medium', 'large', 'x-large'],
                render: function (e) {
                    return '<span style="font-size:' + e + '">' + e + '</span>';
                },
                onchange: function (a,b,c,d,e) {
                    //var html = `<span style="font-size: ${c}">${text}</span>`;
                    //document.execCommand('insertHtml', false, html);
                    document.execCommand("fontSize", false, parseInt(e)+1);
                    //var f = window.getSelection().anchorNode.parentNode
                    //f.removeAttribute("size");
                    //f.style.fontSize = d;
                }
            });

            items.push({
                type: 'select',
                options: ['format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify'],
                render: function (e) {
                    return '<i class="material-icons">' + e + '</i>';
                },
                onchange: function (a,b,c,d,e) {
                    var options = ['JustifyLeft','justifyCenter','justifyRight','justifyFull'];
                    document.execCommand(options[e]);
                }
            });

            items.push({
                type: 'divisor'
            });

            items.push({
                content: 'format_color_text',
                k: 'color',
                onclick: color,
            });

            items.push({
                content: 'format_color_fill',
                k: 'background-color',
                onclick: color,
            });
        }

        items.push({
            content: 'format_bold',
            onclick: function(a,b,c) {
                document.execCommand('bold');

                if (document.queryCommandState("bold")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_italic',
            onclick: function(a,b,c) {
                document.execCommand('italic');

                if (document.queryCommandState("italic")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_underline',
            onclick: function(a,b,c) {
                document.execCommand('underline');

                if (document.queryCommandState("underline")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            type:'divisor'
        });

        items.push({
            content: 'format_list_bulleted',
            onclick: function(a,b,c) {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_list_numbered',
            onclick: function(a,b,c) {
                document.execCommand('insertOrderedList');

                if (document.queryCommandState("insertOrderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_indent_increase',
            onclick: function(a,b,c) {
                document.execCommand('indent', true, null);

                if (document.queryCommandState("indent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_indent_decrease',
            onclick: function() {
                document.execCommand('outdent');

                if (document.queryCommandState("outdent")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        });

        if (obj.options.toolbarOnTop) {
            items.push({
                type: 'divisor'
            });

            items.push({
                content: 'photo',
                onclick: function () {
                    obj.upload();
                }
            });

            items.push({
                type: 'select',
                content: 'table_view',
                columns: 8,
                grid: 8,
                right: true,
                options: [
                    '0x0', '1x0', '2x0', '3x0', '4x0', '5x0', '6x0', '7x0',
                    '0x1', '1x1', '2x1', '3x1', '4x1', '5x1', '6x1', '7x1',
                    '0x2', '1x2', '2x2', '3x2', '4x2', '5x2', '6x2', '7x2',
                    '0x3', '1x3', '2x3', '3x3', '4x3', '5x3', '6x3', '7x3',
                    '0x4', '1x4', '2x4', '3x4', '4x4', '5x4', '6x4', '7x4',
                    '0x5', '1x5', '2x5', '3x5', '4x5', '5x5', '6x5', '7x5',
                    '0x6', '1x6', '2x6', '3x6', '4x6', '5x6', '6x6', '7x6',
                    '0x7', '1x7', '2x7', '3x7', '4x7', '5x7', '6x7', '7x7',
                ],
                render: function (e, item) {
                    if (item) {
                        item.onmouseover = this.onmouseover;
                        e = e.split('x');
                        item.setAttribute('data-x', e[0]);
                        item.setAttribute('data-y', e[1]);
                    }
                    var element = document.createElement('div');
                    item.style.margin = '1px';
                    item.style.border = '1px solid #ddd';
                    return element;
                },
                onmouseover: function (e) {
                    var x = parseInt(e.target.getAttribute('data-x'));
                    var y = parseInt(e.target.getAttribute('data-y'));
                    for (var i = 0; i < e.target.parentNode.children.length; i++) {
                        var element = e.target.parentNode.children[i];
                        var ex = parseInt(element.getAttribute('data-x'));
                        var ey = parseInt(element.getAttribute('data-y'));
                        if (ex <= x && ey <= y) {
                            element.style.backgroundColor = '#cae1fc';
                            element.style.borderColor = '#2977ff';
                        } else {
                            element.style.backgroundColor = '';
                            element.style.borderColor = '#ddd';
                        }
                    }
                },
                onchange: function (a, b, c) {
                    c = c.split('x');
                    var table = document.createElement('table');
                    var tbody = document.createElement('tbody');
                    for (var y = 0; y <= c[1]; y++) {
                        var tr = document.createElement('tr');
                        for (var x = 0; x <= c[0]; x++) {
                            var td = document.createElement('td');
                            td.innerHTML = '';
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody);
                    table.setAttribute('width', '100%');
                    table.setAttribute('cellpadding', '6');
                    table.setAttribute('cellspacing', '0');
                    document.execCommand('insertHTML', false, table.outerHTML);
                }
            });
        }

        return items;
    }

    return Component;
}

/* harmony default export */ var editor = (Editor());

;// CONCATENATED MODULE: ./src/plugins/floating.js
function Floating() {
    var Component = (function (el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            type: 'big',
            title: 'Untitled',
            width: 510,
            height: 472,
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Private methods

        var setContent = function () {
            var temp = document.createElement('div');
            while (el.children[0]) {
                temp.appendChild(el.children[0]);
            }

            obj.content = document.createElement('div');
            obj.content.className = 'jfloating_content';
            obj.content.innerHTML = el.innerHTML;

            while (temp.children[0]) {
                obj.content.appendChild(temp.children[0]);
            }

            obj.container = document.createElement('div');
            obj.container.className = 'jfloating';
            obj.container.appendChild(obj.content);

            if (obj.options.title) {
                obj.container.setAttribute('title', obj.options.title);
            } else {
                obj.container.classList.add('no-title');
            }

            // validate element dimensions
            if (obj.options.width) {
                obj.container.style.width = parseInt(obj.options.width) + 'px';
            }

            if (obj.options.height) {
                obj.container.style.height = parseInt(obj.options.height) + 'px';
            }

            el.innerHTML = '';
            el.appendChild(obj.container);
        }

        var setEvents = function () {
            if (obj.container) {
                obj.container.addEventListener('click', function (e) {
                    var rect = e.target.getBoundingClientRect();

                    if (e.target.classList.contains('jfloating')) {
                        if (e.changedTouches && e.changedTouches[0]) {
                            var x = e.changedTouches[0].clientX;
                            var y = e.changedTouches[0].clientY;
                        } else {
                            var x = e.clientX;
                            var y = e.clientY;
                        }

                        if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                            setTimeout(function () {
                                obj.close();
                            }, 100);
                        } else {
                            obj.setState();
                        }
                    }
                });
            }
        }

        var setType = function () {
            obj.container.classList.add('jfloating-' + obj.options.type);
        }

        obj.state = {
            isMinized: false,
        }

        obj.setState = function () {
            if (obj.state.isMinized) {
                obj.container.classList.remove('jfloating-minimized');
            } else {
                obj.container.classList.add('jfloating-minimized');
            }
            obj.state.isMinized = !obj.state.isMinized;
        }

        obj.close = function () {
            Components.elements.splice(Component.elements.indexOf(obj.container), 1);
            obj.updatePosition();
            el.remove();
        }

        obj.updatePosition = function () {
            for (var i = 0; i < Component.elements.length; i++) {
                var floating = Component.elements[i];
                var prevFloating = Component.elements[i - 1];
                floating.style.right = i * (prevFloating ? prevFloating.offsetWidth : floating.offsetWidth) * 1.01 + 'px';
            }
        }

        obj.init = function () {
            // Set content into root
            setContent();

            // Set dialog events
            setEvents();

            // Set dialog type
            setType();

            // Update floating position
            Component.elements.push(obj.container);
            obj.updatePosition();

            el.floating = obj;
        }

        obj.init();

        return obj;
    });

    Component.elements = [];

    return Component;
}

/* harmony default export */ var floating = (Floating());
;// CONCATENATED MODULE: ./src/plugins/validations.js


function Validations() {
    /**
     * Options: Object,
     * Properties:
     * Constraint,
     * Reference,
     * Value
     */

    const isNumeric = function(num) {
        return !isNaN(num) && num !== null && (typeof num !== 'string' || num.trim() !== '');
    }

    const numberCriterias = {
        'between': function(value, range) {
            return value >= range[0] && value <= range[1];
        },
        'not between': function(value, range) {
            return value < range[0] || value > range[1];
        },
        '<': function(value, range) {
            return value < range[0];
        },
        '<=': function(value, range) {
            return value <= range[0];
        },
        '>': function(value, range) {
            return value > range[0];
        },
        '>=': function(value, range) {
            return value >= range[0];
        },
        '=': function(value, range) {
            return value == range[0];
        },
        '!=': function(value, range) {
            return value != range[0];
        },
    }

    const dateCriterias = {
        'valid date': function() {
            return true;
        },
        '=': function(value, range) {
            return value === range[0];
        },
        '!=': function(value, range) {
            return value !== range[0];
        },
        '<': function(value, range) {
            return value < range[0];
        },
        '<=': function(value, range) {
            return value <= range[0];
        },
        '>': function(value, range) {
            return value > range[0];
        },
        '>=': function(value, range) {
            return value >= range[0];
        },
        'between': function(value, range) {
            return value >= range[0] && value <= range[1];
        },
        'not between': function(value, range) {
            return value < range[0] || value > range[1];
        },
    }

    const textCriterias = {
        'contains': function(value, range) {
            return value.includes(range[0]);
        },
        'not contains': function(value, range) {
            return !value.includes(range[0]);
        },
        'begins with': function(value, range) {
            return value.startsWith(range[0]);
        },
        'ends with': function(value, range) {
            return value.endsWith(range[0]);
        },
        '=': function(value, range) {
            return value === range[0];
        },
        '!=': function(value, range) {
            return value !== range[0];
        },
        'valid email': function(value) {
            var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

            return pattern.test(value);
        },
        'valid url': function(value) {
            var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);

            return pattern.test(value);
        },
    }

    // Component router
    const component = function(value, options) {
        if (typeof(component[options.type]) === 'function') {
            if (options.allowBlank && (typeof value === 'undefined' || value === '' || value === null)) {
                return true;
            }
            return component[options.type].call(this, value, options);
        }
        return null;
    }
    
    component.url = function(data) {
        var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);
        return pattern.test(data) ? true : false;
    }

    component.email = function(data) {
        var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        return data && pattern.test(data) ? true : false;
    }
    
    component.required = function(data) {
        return data && data.trim() ? true : false;
    }

    component.empty = function(data) {
        return typeof data === 'undefined' || data === null || (typeof data === 'string' && !data.toString().trim());
    }

    component['not exist'] = component.empty;

    component.notEmpty = function(data) {
        return !component.empty(data);
    }

    component.exist = component.notEmpty;

    component.number = function(data, options) {
       if (! isNumeric(data)) {
           return false;
       }

       if (!options || !options.criteria) {
           return true;
       }

       if (!numberCriterias[options.criteria]) {
           return false;
       }

       let values = options.value.map(function(num) {
          return parseFloat(num);
       })

       return numberCriterias[options.criteria](data, values);
   };

    component.login = function(data) {
        let pattern = new RegExp(/^[a-zA-Z0-9._-]+$/);
        return data && pattern.test(data) ? true : false;
    }

    component.list = function(data, options) {
        let dataType = typeof data;
        if (dataType !== 'string' && dataType !== 'number') {
            return false;
        }
        let list;
        if (typeof(options.value[0]) === 'string') {
            if (options.source) {
                list = options.source;
            } else {
                list = options.value[0].split(',');
            }
        } else {
            list = options.value[0];
        }

        if (! Array.isArray(list)) {
            return false;
        } else {
            let validOption = list.findIndex(function (item) {
                return item == data;
            });

            return validOption > -1;
        }
    }

    const getCurrentDateWithoutTime = function() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    const relativeDates = {
        'one year ago': function() {
            let date = getCurrentDateWithoutTime();

            date.setFullYear(date.getFullYear() - 1);

            return date;
        },
        'one month ago': function() {
            let date = getCurrentDateWithoutTime();

            date.setMonth(date.getMonth() - 1);

            return date;
        },
        'one week ago': function() {
            let date = getCurrentDateWithoutTime();

            date.setDate(date.getDate() - 7);

            return date;
        },
        yesterday: function() {
            let date = getCurrentDateWithoutTime();

            date.setDate(date.getDate() - 1);

            return date;
        },
        today: getCurrentDateWithoutTime,
        tomorrow: function() {
            let date = getCurrentDateWithoutTime();

            date.setDate(date.getDate() + 1);

            return date;
        },
    };

    component.date = function(data, options) {
        if (isNumeric(data) && data > 0 && data < 1000000) {
            data = helpers_date.numToDate(data);
        }

        if (new Date(data) == 'Invalid Date') {
            return false;
        }

        if (!options || !options.criteria) {
            return true;
        }

        if (!dateCriterias[options.criteria]) {
            return false;
        }

        let values = options.value.map(function(date) {
            if (typeof date === 'string' && relativeDates[date]) {
                return relativeDates[date]().getTime();
            }

            return new Date(date).getTime();
        });

        return dateCriterias[options.criteria](new Date(data).getTime(), values);
    }

    component.text = function(data, options) {
        if (typeof data === 'undefined' || data === null) {
            data = '';
        } else if (typeof data !== 'string') {
            return false;
        }

        if (!options || !options.criteria) {
            return true;
        }

        if (!textCriterias[options.criteria]) {
            return false;
        }

        return textCriterias[options.criteria](data, options.value);
    }

    component.textLength = function(data, options) {
        let textLength;
        if (typeof data === 'string') {
            textLength = data.length;
        } else if (typeof data !== 'undefined' && data !== null && typeof data.toString === 'function') {
            textLength = data.toString().length;
        } else {
            textLength = 0;
        }

        return component.number(textLength, options);
    }

    component.time = function(data, options) {
       if (! isNumeric(data)) {
           return false;
       }

       if (!options || !options.criteria) {
           return true;
       }

       if (!numberCriterias[options.criteria]) {
           return false;
       }

       let values = options.value.map(function(num) {
          return parseInt(parseFloat(num) * 10**17) / 10**17;
       })

       return numberCriterias[options.criteria](parseInt(parseFloat(data) * 10**17) / 10**17, values);
   };

    return component;
}

/* harmony default export */ var validations = (Validations());
;// CONCATENATED MODULE: ./src/plugins/form.js




function Form() {
    var Component = (function(el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            url: null,
            message: 'Are you sure? There are unsaved information in your form',
            ignore: false,
            currentHash: null,
            submitButton:null,
            validations: null,
            onbeforeload: null,
            onload: null,
            onbeforesave: null,
            onsave: null,
            onbeforeremove: null,
            onremove: null,
            onerror: function(el, message) {
                alert(message);
            }
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Validations
        if (! obj.options.validations) {
            obj.options.validations = {};
        }

        // Submit Button
        if (! obj.options.submitButton) {
            obj.options.submitButton = el.querySelector('input[type=submit]');
        }

        if (obj.options.submitButton && obj.options.url) {
            obj.options.submitButton.onclick = function() {
                obj.save();
            }
        }

        if (! obj.options.validations.email) {
            obj.options.validations.email = validations.email;
        }

        if (! obj.options.validations.length) {
            obj.options.validations.length = validations.length;
        }

        if (! obj.options.validations.required) {
            obj.options.validations.required = validations.required;
        }

        obj.setUrl = function(url) {
            obj.options.url = url;
        }

        obj.load = function() {
            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                queue: true,
                success: function(data) {
                    // Overwrite values from the backend
                    if (typeof(obj.options.onbeforeload) == 'function') {
                        var ret = obj.options.onbeforeload(el, data);
                        if (ret) {
                            data = ret;
                        }
                    }
                    // Apply values to the form
                    Component.setElements(el, data);
                    // Onload methods
                    if (typeof(obj.options.onload) == 'function') {
                        obj.options.onload(el, data);
                    }
                }
            });
        }

        obj.save = function() {
            var test = obj.validate();

            if (test) {
                obj.options.onerror(el, test);
            } else {
                var data = Component.getElements(el, true);

                if (typeof(obj.options.onbeforesave) == 'function') {
                    var data = obj.options.onbeforesave(el, data);

                    if (data === false) {
                        return;
                    }
                }

                ajax({
                    url: obj.options.url,
                    method: 'POST',
                    dataType: 'json',
                    data: data,
                    success: function(result) {
                        if (typeof(obj.options.onsave) == 'function') {
                            obj.options.onsave(el, data, result);
                        }
                    }
                });
            }
        }

        obj.remove = function() {
            if (typeof(obj.options.onbeforeremove) == 'function') {
                var ret = obj.options.onbeforeremove(el, obj);
                if (ret === false) {
                    return false;
                }
            }

            ajax({
                url: obj.options.url,
                method: 'DELETE',
                dataType: 'json',
                success: function(result) {
                    if (typeof(obj.options.onremove) == 'function') {
                        obj.options.onremove(el, obj, result);
                    }

                    obj.reset();
                }
            });
        }

        var addError = function(element) {
            // Add error in the element
            element.classList.add('error');
            // Submit button
            if (obj.options.submitButton) {
                obj.options.submitButton.setAttribute('disabled', true);
            }
            // Return error message
            var error = element.getAttribute('data-error') || 'There is an error in the form';
            element.setAttribute('title', error);
            return error;
        }

        var delError = function(element) {
            var error = false;
            // Remove class from this element
            element.classList.remove('error');
            element.removeAttribute('title');
            // Get elements in the form
            var elements = el.querySelectorAll("input, select, textarea, div[name]");
            // Run all elements
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getAttribute('data-validation')) {
                    if (elements[i].classList.contains('error')) {
                        error = true;
                    }
                }
            }

            if (obj.options.submitButton) {
                if (error) {
                    obj.options.submitButton.setAttribute('disabled', true);
                } else {
                    obj.options.submitButton.removeAttribute('disabled');
                }
            }
        }

        obj.validateElement = function(element) {
            // Test results
            var test = false;
            // Value
            var value = Component.getValue(element);
            // Validation
            var validation = element.getAttribute('data-validation');
            // Parse
            if (typeof(obj.options.validations[validation]) == 'function' && ! obj.options.validations[validation](value, element)) {
                // Not passed in the test
                test = addError(element);
            } else {
                if (element.classList.contains('error')) {
                    delError(element);
                }
            }

            return test;
        }

        obj.reset = function() {
            // Get elements in the form
            var name = null;
            var elements = el.querySelectorAll("input, select, textarea, div[name]");
            // Run all elements
            for (var i = 0; i < elements.length; i++) {
                if (name = elements[i].getAttribute('name')) {
                    if (elements[i].type == 'checkbox' || elements[i].type == 'radio') {
                        elements[i].checked = false;
                    } else {
                        if (typeof(elements[i].val) == 'function') {
                            elements[i].val('');
                        } else {
                            elements[i].value = '';
                        }
                    }
                }
            }
        }

        // Run form validation
        obj.validate = function() {
            var test = [];
            // Get elements in the form
            var elements = el.querySelectorAll("input, select, textarea, div[name]");
            // Run all elements
            for (var i = 0; i < elements.length; i++) {
                // Required
                if (elements[i].getAttribute('data-validation')) {
                    var res = obj.validateElement(elements[i]);
                    if (res) {
                        test.push(res);
                    }
                }
            }
            if (test.length > 0) {
                return test.join('<br>');
            } else {
                return false;
            }
        }

        // Check the form
        obj.getError = function() {
            // Validation
            return obj.validation() ? true : false;
        }

        // Return the form hash
        obj.setHash = function() {
            return obj.getHash(Component.getElements(el));
        }

        // Get the form hash
        obj.getHash = function(str) {
            var hash = 0, i, chr;

            if (str.length === 0) {
                return hash;
            } else {
                for (i = 0; i < str.length; i++) {
                  chr = str.charCodeAt(i);
                  hash = ((hash << 5) - hash) + chr;
                  hash |= 0;
                }
            }

            return hash;
        }

        // Is there any change in the form since start tracking?
        obj.isChanged = function() {
            var hash = obj.setHash();
            return (obj.options.currentHash != hash);
        }

        // Restart tracking
        obj.resetTracker = function() {
            obj.options.currentHash = obj.setHash();
            obj.options.ignore = false;
        }

        // Ignore flag
        obj.setIgnore = function(ignoreFlag) {
            obj.options.ignore = ignoreFlag ? true : false;
        }

        // Start tracking in one second
        setTimeout(function() {
            obj.options.currentHash = obj.setHash();
        }, 1000);

        // Validations
        el.addEventListener("keyup", function(e) {
            if (e.target.getAttribute('data-validation')) {
                obj.validateElement(e.target);
            }
        });

        // Alert
        if (! Component.hasEvents) {
            window.addEventListener("beforeunload", function (e) {
                if (obj.isChanged() && obj.options.ignore == false) {
                    var confirmationMessage =  obj.options.message? obj.options.message : "\o/";

                    if (confirmationMessage) {
                        if (typeof e == 'undefined') {
                            e = window.event;
                        }

                        if (e) {
                            e.returnValue = confirmationMessage;
                        }

                        return confirmationMessage;
                    } else {
                        return void(0);
                    }
                }
            });

            Component.hasEvents = true;
        }

        el.form = obj;

        return obj;
    });

    // Get value from one element
    Component.getValue = function(element) {
        var value = null;
        if (element.type == 'checkbox') {
            if (element.checked == true) {
                value = element.value || true;
            }
        } else if (element.type == 'radio') {
            if (element.checked == true) {
                value = element.value;
            }
        } else if (element.type == 'file') {
            value = element.files;
        } else if (element.tagName == 'select' && element.multiple == true) {
            value = [];
            var options = element.querySelectorAll("options[selected]");
            for (var j = 0; j < options.length; j++) {
                value.push(options[j].value);
            }
        } else if (typeof(element.val) == 'function') {
            value = element.val();
        } else {
            value = element.value || '';
        }

        return value;
    }

    // Get form elements
    Component.getElements = function(el, asArray) {
        var data = {};
        var name = null;
        var elements = el.querySelectorAll("input, select, textarea, div[name]");

        for (var i = 0; i < elements.length; i++) {
            if (name = elements[i].getAttribute('name')) {
                data[name] = Component.getValue(elements[i]) || '';
            }
        }

        return asArray == true ? data : JSON.stringify(data);
    }

    //Get form elements
    Component.setElements = function(el, data) {
        var name = null;
        var value = null;
        var elements = el.querySelectorAll("input, select, textarea, div[name]");
        for (var i = 0; i < elements.length; i++) {
            // Attributes
            var type = elements[i].getAttribute('type');
            if (name = elements[i].getAttribute('name')) {
                // Transform variable names in pathname
                name = name.replace(new RegExp(/\[(.*?)\]/ig), '.$1');
                value = null;
                // Seach for the data in the path
                if (name.match(/\./)) {
                    var tmp = Path.call(data, name) || '';
                    if (typeof(tmp) !== 'undefined') {
                        value = tmp;
                    }
                } else {
                    if (typeof(data[name]) !== 'undefined') {
                        value = data[name];
                    }
                }
                // Set the values
                if (value !== null) {
                    if (type == 'checkbox' || type == 'radio') {
                        elements[i].checked = value ? true : false;
                    } else if (type == 'file') {
                        // Do nothing
                    } else {
                        if (typeof (elements[i].val) == 'function') {
                            elements[i].val(value);
                        } else {
                            elements[i].value = value;
                        }
                    }
                }
            }
        }
    }

    return Component;
}

/* harmony default export */ var plugins_form = (Form());
;// CONCATENATED MODULE: ./src/plugins/modal.js




function Modal() {

    var Events = function() {
        //  Position
        var tracker = null;

        var keyDown = function (e) {
            if (e.which == 27) {
                var modals = document.querySelectorAll('.jmodal');
                for (var i = 0; i < modals.length; i++) {
                    modals[i].parentNode.modal.close();
                }
            }
        }

        var mouseUp = function (e) {
            let element = e.composedPath();
            var item = helpers.findElement(element[0], 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    item.parentNode.modal.close();
                }
            }

            if (tracker) {
                tracker.element.style.cursor = 'auto';
                tracker = null;
            }
        }

        var mouseDown = function (e) {
            let element = e.composedPath();
            var item = helpers.findElement(element[0], 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    // Do nothing
                } else {
                    if (y - rect.top < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        }

                        tracker = {
                            left: rect.left,
                            top: rect.top,
                            x: e.clientX,
                            y: e.clientY,
                            width: rect.width,
                            height: rect.height,
                            element: item,
                        }
                    }
                }
            }
        }

        var mouseMove = function (e) {
            if (tracker) {
                e = e || window.event;
                if (e.buttons) {
                    var mouseButton = e.buttons;
                } else if (e.button) {
                    var mouseButton = e.button;
                } else {
                    var mouseButton = e.which;
                }

                if (mouseButton) {
                    tracker.element.style.top = (tracker.top + (e.clientY - tracker.y) + (tracker.height / 2)) + 'px';
                    tracker.element.style.left = (tracker.left + (e.clientX - tracker.x) + (tracker.width / 2)) + 'px';
                    tracker.element.style.cursor = 'move';
                } else {
                    tracker.element.style.cursor = 'auto';
                }
            }
        }

        document.addEventListener('keydown', keyDown);
        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mousemove', mouseMove);
    }

    var Component = (function (el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            url: null,
            onopen: null,
            onclose: null,
            onload: null,
            closed: false,
            width: null,
            height: null,
            title: null,
            padding: null,
            backdrop: true,
            icon: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Title
        if (!obj.options.title && el.getAttribute('title')) {
            obj.options.title = el.getAttribute('title');
        }

        var temp = document.createElement('div');
        while (el.children[0]) {
            temp.appendChild(el.children[0]);
        }

        obj.title = document.createElement('div');
        obj.title.className = 'jmodal_title';
        if (obj.options.icon) {
            obj.title.setAttribute('data-icon', obj.options.icon);
        }

        obj.content = document.createElement('div');
        obj.content.className = 'jmodal_content';
        obj.content.innerHTML = el.innerHTML;

        while (temp.children[0]) {
            obj.content.appendChild(temp.children[0]);
        }

        obj.container = document.createElement('div');
        obj.container.className = 'jmodal';
        obj.container.appendChild(obj.title);
        obj.container.appendChild(obj.content);

        if (obj.options.padding) {
            obj.content.style.padding = obj.options.padding;
        }
        if (obj.options.width) {
            obj.container.style.width = obj.options.width;
        }
        if (obj.options.height) {
            obj.container.style.height = obj.options.height;
        }
        if (obj.options.title) {
            var title = document.createElement('h4');
            title.innerText = obj.options.title;
            obj.title.appendChild(title);
        }

        el.innerHTML = '';
        el.style.display = 'none';
        el.appendChild(obj.container);

        // Backdrop
        if (obj.options.backdrop) {
            var backdrop = document.createElement('div');
            backdrop.className = 'jmodal_backdrop';
            backdrop.onclick = function () {
                obj.close();
            }
            el.appendChild(backdrop);
        }

        obj.open = function () {
            el.style.display = 'block';
            // Fullscreen
            var rect = obj.container.getBoundingClientRect();
            if (helpers.getWindowWidth() < rect.width) {
                obj.container.style.top = '';
                obj.container.style.left = '';
                obj.container.classList.add('jmodal_fullscreen');
                animation.slideBottom(obj.container, 1);
            } else {
                if (obj.options.backdrop) {
                    backdrop.style.display = 'block';
                }
            }
            // Event
            if (typeof (obj.options.onopen) == 'function') {
                obj.options.onopen(el, obj);
            }
        }

        obj.resetPosition = function () {
            obj.container.style.top = '';
            obj.container.style.left = '';
        }

        obj.isOpen = function () {
            return el.style.display != 'none' ? true : false;
        }

        obj.close = function () {
            if (obj.isOpen()) {
                el.style.display = 'none';
                if (obj.options.backdrop) {
                    // Backdrop
                    backdrop.style.display = '';
                }
                // Remove fullscreen class
                obj.container.classList.remove('jmodal_fullscreen');
                // Event
                if (typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el, obj);
                }
            }
        }

        if (obj.options.url) {
            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'text/html',
                success: function (data) {
                    obj.content.innerHTML = data;

                    if (!obj.options.closed) {
                        obj.open();
                    }

                    if (typeof (obj.options.onload) === 'function') {
                        obj.options.onload(obj);
                    }
                }
            });
        } else {
            if (!obj.options.closed) {
                obj.open();
            }

            if (typeof (obj.options.onload) === 'function') {
                obj.options.onload(obj);
            }
        }

        // Keep object available from the node
        el.modal = obj;

        // Create events when the first modal is create only
        Events();

        // Execute the events only once
        Events = function() {};

        return obj;
    });

    return Component;
}

/* harmony default export */ var modal = (Modal());
;// CONCATENATED MODULE: ./src/plugins/notification.js



function Notification() {
    var Component = function (options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            icon: null,
            name: 'Notification',
            date: null,
            error: null,
            title: null,
            message: null,
            timeout: 4000,
            autoHide: true,
            closeable: true,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        var notification = document.createElement('div');
        notification.className = 'jnotification';

        if (obj.options.error) {
            notification.classList.add('jnotification-error');
        }

        var notificationContainer = document.createElement('div');
        notificationContainer.className = 'jnotification-container';
        notification.appendChild(notificationContainer);

        var notificationHeader = document.createElement('div');
        notificationHeader.className = 'jnotification-header';
        notificationContainer.appendChild(notificationHeader);

        var notificationImage = document.createElement('div');
        notificationImage.className = 'jnotification-image';
        notificationHeader.appendChild(notificationImage);

        if (obj.options.icon) {
            var notificationIcon = document.createElement('img');
            notificationIcon.src = obj.options.icon;
            notificationImage.appendChild(notificationIcon);
        }

        var notificationName = document.createElement('div');
        notificationName.className = 'jnotification-name';
        notificationName.innerHTML = obj.options.name;
        notificationHeader.appendChild(notificationName);

        if (obj.options.closeable == true) {
            var notificationClose = document.createElement('div');
            notificationClose.className = 'jnotification-close';
            notificationClose.onclick = function () {
                obj.hide();
            }
            notificationHeader.appendChild(notificationClose);
        }

        var notificationDate = document.createElement('div');
        notificationDate.className = 'jnotification-date';
        notificationHeader.appendChild(notificationDate);

        var notificationContent = document.createElement('div');
        notificationContent.className = 'jnotification-content';
        notificationContainer.appendChild(notificationContent);

        if (obj.options.title) {
            var notificationTitle = document.createElement('div');
            notificationTitle.className = 'jnotification-title';
            notificationTitle.innerHTML = obj.options.title;
            notificationContent.appendChild(notificationTitle);
        }

        var notificationMessage = document.createElement('div');
        notificationMessage.className = 'jnotification-message';
        notificationMessage.innerHTML = obj.options.message;
        notificationContent.appendChild(notificationMessage);

        obj.show = function () {
            document.body.appendChild(notification);
            if (helpers.getWindowWidth() > 800) {
                animation.fadeIn(notification);
            } else {
                animation.slideTop(notification, 1);
            }
        }

        obj.hide = function () {
            if (helpers.getWindowWidth() > 800) {
                animation.fadeOut(notification, function () {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                        if (notificationTimeout) {
                            clearTimeout(notificationTimeout);
                        }
                    }
                });
            } else {
                animation.slideTop(notification, 0, function () {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                        if (notificationTimeout) {
                            clearTimeout(notificationTimeout);
                        }
                    }
                });
            }
        };

        obj.show();

        if (obj.options.autoHide == true) {
            var notificationTimeout = setTimeout(function () {
                obj.hide();
            }, obj.options.timeout);
        }

        if (helpers.getWindowWidth() < 800) {
            notification.addEventListener("swipeup", function (e) {
                obj.hide();
                e.preventDefault();
                e.stopPropagation();
            });
        }

        return obj;
    }

    Component.isVisible = function () {
        var j = document.querySelector('.jnotification');
        return j && j.parentNode ? true : false;
    }

    return Component;
}

/* harmony default export */ var notification = (Notification());
;// CONCATENATED MODULE: ./src/plugins/progressbar.js
function Progressbar(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        value: 0,
        onchange: null,
        width: null,
    };

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jprogressbar');
    el.setAttribute('tabindex', 1);
    el.setAttribute('data-value', obj.options.value);

    var bar = document.createElement('div');
    bar.style.width = obj.options.value + '%';
    bar.style.color = '#fff';
    el.appendChild(bar);

    if (obj.options.width) {
        el.style.width = obj.options.width;
    }

    // Set value
    obj.setValue = function(value) {
        value = parseInt(value);
        obj.options.value = value;
        bar.style.width = value + '%';
        el.setAttribute('data-value', value + '%');

        if (value < 6) {
            el.style.color = '#000';
        } else {
            el.style.color = '#fff';
        }

        // Update value
        obj.options.value = value;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, value);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.oninput) == 'function') {
                el.oninput({
                    type: 'input',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    var action = function(e) {
        if (e.which) {
            // Get target info
            var rect = el.getBoundingClientRect();

            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            obj.setValue(Math.round((x - rect.left) / rect.width * 100));
        }
    }

    // Events
    if ('touchstart' in document.documentElement === true) {
        el.addEventListener('touchstart', action);
        el.addEventListener('touchend', action);
    } else {
        el.addEventListener('mousedown', action);
        el.addEventListener("mousemove", action);
    }

    // Change
    el.change = obj.setValue;

    // Global generic value handler
    el.val = function(val) {
        if (val === undefined) {
            return obj.getValue();
        } else {
            obj.setValue(val);
        }
    }

    // Reference
    el.progressbar = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/rating.js
function Rating(el, options) {
    // Already created, update options
    if (el.rating) {
        return el.rating.setOptions(options, true);
    }

    // New instance
    var obj = {};
    obj.options = {};

    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            number: 5,
            value: 0,
            tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
            onchange: null,
        };

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Make sure the container is empty
        el.innerHTML = '';

        // Add elements
        for (var i = 0; i < obj.options.number; i++) {
            var div = document.createElement('div');
            div.setAttribute('data-index', (i + 1))
            div.setAttribute('title', obj.options.tooltip[i])
            el.appendChild(div);
        }

        // Selected option
        if (obj.options.value) {
            for (var i = 0; i < obj.options.number; i++) {
                if (i < obj.options.value) {
                    el.children[i].classList.add('jrating-selected');
                }
            }
        }

        return obj;
    }

    // Set value
    obj.setValue = function(index) {
        for (var i = 0; i < obj.options.number; i++) {
            if (i < index) {
                el.children[i].classList.add('jrating-selected');
            } else {
                el.children[i].classList.remove('jrating-over');
                el.children[i].classList.remove('jrating-selected');
            }
        }

        obj.options.value = index;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, index);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.oninput) == 'function') {
                el.oninput({
                    type: 'input',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    var init = function() {
        // Start plugin
        obj.setOptions(options);

        // Class
        el.classList.add('jrating');

        // Events
        el.addEventListener("click", function(e) {
            var index = e.target.getAttribute('data-index');
            if (index != undefined) {
                if (index == obj.options.value) {
                    obj.setValue(0);
                } else {
                    obj.setValue(index);
                }
            }
        });

        el.addEventListener("mouseover", function(e) {
            var index = e.target.getAttribute('data-index');
            for (var i = 0; i < obj.options.number; i++) {
                if (i < index) {
                    el.children[i].classList.add('jrating-over');
                } else {
                    el.children[i].classList.remove('jrating-over');
                }
            }
        });

        el.addEventListener("mouseout", function(e) {
            for (var i = 0; i < obj.options.number; i++) {
                el.children[i].classList.remove('jrating-over');
            }
        });

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.rating = obj;
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/search.js



function Search(el, options) {
    if (el.search) {
        return el.search;
    }

    var index =  null;

    var select = function(e) {
        if (e.target.classList.contains('jsearch_item')) {
            var element = e.target;
        } else {
            var element = e.target.parentNode;
        }

        obj.selectIndex(element);
        e.preventDefault();
    }

    var createList = function(data) {
        if (typeof(obj.options.onsearch) == 'function') {
            var ret = obj.options.onsearch(obj, data);
            if (ret) {
                data = ret;
            }
        }

        // Reset container
        container.innerHTML = '';
        // Print results
        if (! data.length) {
            // Show container
            el.style.display = '';
        } else {
            // Show container
            el.style.display = 'block';

            // Show items (only 10)
            var len = data.length < 11 ? data.length : 10;
            for (var i = 0; i < len; i++) {
                if (typeof(data[i]) == 'string') {
                    var text = data[i];
                    var value = data[i];
                } else {
                    // Legacy
                    var text = data[i].text;
                    if (! text && data[i].name) {
                        text = data[i].name;
                    }
                    var value = data[i].value;
                    if (! value && data[i].id) {
                        value = data[i].id;
                    }
                }

                var div = document.createElement('div');
                div.setAttribute('data-value', value);
                div.setAttribute('data-text', text);
                div.className = 'jsearch_item';

                if (data[i].id) {
                    div.setAttribute('id', data[i].id)
                }

                if (obj.options.forceSelect && i == 0) {
                    div.classList.add('selected');
                }
                var img = document.createElement('img');
                if (data[i].image) {
                    img.src = data[i].image;
                } else {
                    img.style.display = 'none';
                }
                div.appendChild(img);

                var item = document.createElement('div');
                item.innerHTML = text;
                div.appendChild(item);

                // Append item to the container
                container.appendChild(div);
            }
        }
    }

    var execute = function(str) {
        if (str != obj.terms) {
            // New terms
            obj.terms = str;
            // New index
            if (obj.options.forceSelect) {
                index = 0;
            } else {
                index = null;
            }
            // Array or remote search
            if (Array.isArray(obj.options.data)) {
                var test = function(o) {
                    if (typeof(o) == 'string') {
                        if ((''+o).toLowerCase().search(str.toLowerCase()) >= 0) {
                            return true;
                        }
                    } else {
                        for (var key in o) {
                            var value = o[key];
                            if ((''+value).toLowerCase().search(str.toLowerCase()) >= 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                var results = obj.options.data.filter(function(item) {
                    return test(item);
                });

                // Show items
                createList(results);
            } else {
                // Get remove results
                ajax({
                    url: obj.options.data + str,
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        // Show items
                        createList(data);
                    }
                });
            }
        }
    }

    // Search timer
    var timer = null;

    // Search methods
    var obj = function(str) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            execute(str);
        }, 500);
    }
    if(options.forceSelect === null) {
        options.forceSelect = true;
    }
    obj.options = {
        data: options.data || null,
        input: options.input || null,
        searchByNode: options.searchByNode || null,
        onselect: options.onselect || null,
        forceSelect: options.forceSelect,
        onsearch: options.onsearch || null,
        onbeforesearch: options.onbeforesearch || null,
    };

    obj.selectIndex = function(item) {
        var id = item.getAttribute('id');
        var text = item.getAttribute('data-text');
        var value = item.getAttribute('data-value');
        var image = item.children[0].src || '';
        // Onselect
        if (typeof(obj.options.onselect) == 'function') {
            obj.options.onselect(obj, text, value, id, image);
        }
        // Close container
        obj.close();
    }

    obj.open = function() {
        el.style.display = 'block';
    }

    obj.close = function() {
        if (timer) {
            clearTimeout(timer);
        }
        // Current terms
        obj.terms = '';
        // Remove results
        container.innerHTML = '';
        // Hide
        el.style.display = '';
    }

    obj.isOpened = function() {
        return el.style.display ? true : false;
    }

    obj.keydown = function(e) {
        if (obj.isOpened()) {
            if (e.key == 'Enter') {
                // Enter
                if (index!==null && container.children[index]) {
                    obj.selectIndex(container.children[index]);
                    e.preventDefault();
                } else {
                    obj.close();
                }
            } else if (e.key === 'ArrowUp') {
                // Up
                if (index!==null && container.children[0]) {
                    container.children[index].classList.remove('selected');
                    if(!obj.options.forceSelect && index === 0) {
                        index = null;
                    } else {
                        index = Math.max(0, index-1);
                        container.children[index].classList.add('selected');
                    }
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                // Down
                if(index == null) {
                    index = -1;
                } else {
                    container.children[index].classList.remove('selected');
                }
                if (index < 9 && container.children[index+1]) {
                    index++;
                }
                container.children[index].classList.add('selected');
                e.preventDefault();
            }
        }
    }

    obj.keyup = function(e) {
        if (! obj.options.searchByNode && obj.options.input) {
            if (obj.options.input.tagName === 'DIV') {
                var terms = obj.options.input.innerText;
            } else {
                var terms = obj.options.input.value;
            }
        } else {
            // Current node
            var node = helpers.getNode();
            if (node) {
                var terms = node.innerText;
            }
        }

        if (typeof(obj.options.onbeforesearch) == 'function') {
            var ret = obj.options.onbeforesearch(obj, terms);
            if (ret) {
                terms = ret;
            } else {
                if (ret === false) {
                    // Ignore event
                    return;
                }
            }
        }

        obj(terms);
    }

    obj.blur = function(e) {
        obj.close();
    }

    // Add events
    if (obj.options.input) {
        obj.options.input.addEventListener("keyup", obj.keyup);
        obj.options.input.addEventListener("keydown", obj.keydown);
        obj.options.input.addEventListener("blur", obj.blur);
    }

    // Append element
    var container = document.createElement('div');
    container.classList.add('jsearch_container');
    container.onmousedown = select;
    el.appendChild(container);

    el.classList.add('jsearch');
    el.search = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/slider.js
function Slider(el, options) {
    var obj = {};
    obj.options = {};
    obj.currentImage = null;

    if (options) {
        obj.options = options;
    }

    // Focus
    el.setAttribute('tabindex', '900')

    // Items
    obj.options.items = [];

    if (! el.classList.contains('jslider')) {
        el.classList.add('jslider');
        el.classList.add('unselectable');

        if (obj.options.height) {
            el.style.minHeight = parseInt(obj.options.height) + 'px';
        }
        if (obj.options.width) {
            el.style.width = parseInt(obj.options.width) + 'px';
        }
        if (obj.options.grid) {
            el.classList.add('jslider-grid');
            var number = el.children.length;
            if (number > 4) {
                el.setAttribute('data-total', number - 4);
            }
            el.setAttribute('data-number', (number > 4 ? 4 : number));
        }

        // Add slider counter
        var counter = document.createElement('div');
        counter.classList.add('jslider-counter');

        // Move children inside
        if (el.children.length > 0) {
            // Keep children items
            for (var i = 0; i < el.children.length; i++) {
                obj.options.items.push(el.children[i]);
                
                // counter click event
                var item = document.createElement('div');
                item.onclick = function() {
                    var index = Array.prototype.slice.call(counter.children).indexOf(this);
                    obj.show(obj.currentImage = obj.options.items[index]);
                }
                counter.appendChild(item);
            }
        }
        // Add caption
        var caption = document.createElement('div');
        caption.className = 'jslider-caption';

        // Add close buttom
        var controls = document.createElement('div');
        var close = document.createElement('div');
        close.className = 'jslider-close';
        close.innerHTML = '';
        
        close.onclick = function() {
            obj.close();
        }
        controls.appendChild(caption);
        controls.appendChild(close);
    }

    obj.updateCounter = function(index) {
        for (var i = 0; i < counter.children.length; i ++) {
            if (counter.children[i].classList.contains('jslider-counter-focus')) {
                counter.children[i].classList.remove('jslider-counter-focus');
                break;
            }
        }
        counter.children[index].classList.add('jslider-counter-focus');
    }

    obj.show = function(target) {
        if (! target) {
            var target = el.children[0];
        }

        // Focus element
        el.classList.add('jslider-focus');
        el.classList.remove('jslider-grid');
        el.appendChild(controls);
        el.appendChild(counter);

        // Update counter
        var index = obj.options.items.indexOf(target);
        obj.updateCounter(index);

        // Remove display
        for (var i = 0; i < el.children.length; i++) {
            el.children[i].style.display = '';
        }
        target.style.display = 'block';

        // Is there any previous
        if (target.previousElementSibling) {
            el.classList.add('jslider-left');
        } else {
            el.classList.remove('jslider-left');
        }

        // Is there any next
        if (target.nextElementSibling && target.nextElementSibling.tagName == 'IMG') {
            el.classList.add('jslider-right');
        } else {
            el.classList.remove('jslider-right');
        }

        obj.currentImage = target;

        // Vertical image
        if (obj.currentImage.offsetHeight > obj.currentImage.offsetWidth) {
            obj.currentImage.classList.add('jslider-vertical');
        }

        controls.children[0].innerText = obj.currentImage.getAttribute('title');
    }

    obj.open = function() {
        obj.show();

        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function() {
        // Remove control classes
        el.classList.remove('jslider-focus');
        el.classList.remove('jslider-left');
        el.classList.remove('jslider-right');
        // Show as a grid depending on the configuration
        if (obj.options.grid) {
            el.classList.add('jslider-grid');
        }
        // Remove display
        for (var i = 0; i < el.children.length; i++) {
            el.children[i].style.display = '';
        }
        // Remove controls from the component
        counter.remove();
        controls.remove();
        // Current image
        obj.currentImage = null;
        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
    }

    obj.reset = function() {
        el.innerHTML = '';
    }

    obj.next = function() {
        var nextImage = obj.currentImage.nextElementSibling;
        if (nextImage && nextImage.tagName === 'IMG') {
            obj.show(obj.currentImage.nextElementSibling);
        }
    }
    
    obj.prev = function() {
        if (obj.currentImage.previousElementSibling) {
            obj.show(obj.currentImage.previousElementSibling);
        }
    }

    var mouseUp = function(e) {
        // Open slider
        if (e.target.tagName == 'IMG') {
            obj.show(e.target);
        } else if (! e.target.classList.contains('jslider-close') && ! (e.target.parentNode.classList.contains('jslider-counter') || e.target.classList.contains('jslider-counter'))){
            // Arrow controls
            var offsetX = e.offsetX || e.changedTouches[0].clientX;
            if (e.target.clientWidth - offsetX < 40) {
                // Show next image
                obj.next();
            } else if (offsetX < 40) {
                // Show previous image
                obj.prev();
            }
        }
    }

    if ('ontouchend' in document.documentElement === true) {
        el.addEventListener('touchend', mouseUp);
    } else {
        el.addEventListener('mouseup', mouseUp);
    }

    // Add global events
    el.addEventListener("swipeleft", function(e) {
        obj.next();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener("swiperight", function(e) {
        obj.prev();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            obj.close();
        }
    });

    el.slider = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/tags.js




function Tags(el, options) {
    // Redefine configuration
    if (el.tags) {
        return el.tags.setOptions(options, true);
    }

    var obj = { type:'tags' };
    obj.options = {};

    // Limit
    var limit = function() {
        return obj.options.limit && el.children.length >= obj.options.limit ? true : false;
    }

    // Search helpers
    var search = null;
    var searchContainer = null;

    obj.setOptions = function(options, reset) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {number} limit - Max number of tags inside the element
         * @property {string} search - The URL for suggestions
         * @property {string} placeholder - The default instruction text on the element
         * @property {validation} validation - Method to validate the tags
         * @property {requestCallback} onbeforechange - Method to be execute before any changes on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onfocus - Method to be execute when on focus
         * @property {requestCallback} onblur - Method to be execute when on blur
         * @property {requestCallback} onload - Method to be execute when the element is loaded
         */
        var defaults = {
            value: '',
            limit: null,
            search: null,
            placeholder: null,
            validation: null,
            onbeforepaste: null,
            onbeforechange: null,
            onremoveitem: null,
            onlimit: null,
            onchange: null,
            onfocus: null,
            onblur: null,
            onload: null,
        }

        // Loop through though the default configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('data-placeholder', obj.options.placeholder);
        } else {
            el.removeAttribute('data-placeholder');
        }
        el.placeholder = obj.options.placeholder;

        // Update value
        obj.setValue(obj.options.value);

        // Validate items
        filter();

        // Create search box
        if (obj.options.search) {
            if (! searchContainer) {
                searchContainer = document.createElement('div');
                el.parentNode.insertBefore(searchContainer, el.nextSibling);

                // Create container
                search = Search(searchContainer, {
                    data: obj.options.search,
                    onselect: function(a,b,c) {
                        obj.selectIndex(b,c);
                    }
                });
            }
        } else {
            if (searchContainer) {
                search = null;
                searchContainer.remove();
                searchContainer = null;
            }
        }

        return obj;
    }

    /**
     * Add a new tag to the element
     * @param {(?string|Array)} value - The value of the new element
     */
    obj.add = function(value, focus) {
        if (typeof(obj.options.onbeforechange) == 'function') {
            var ret = obj.options.onbeforechange(el, obj, obj.options.value, value);
            if (ret === false) {
                return false;
            } else { 
                if (ret != null) {
                    value = ret;
                }
            }
        }

        // Make sure search is closed
        if (search) {
            search.close();
        }

        if (limit()) {
            if (typeof(obj.options.onlimit) == 'function') {
                obj.options.onlimit(obj, obj.options.limit);
            } else {
                alert(dictionary.translate('You reach the limit number of entries') + ' ' + obj.options.limit);
            }
        } else {
            // Get node
            var node = helpers.getNode();

            if (node && node.parentNode && node.parentNode.classList.contains('jtags') &&
                node.nextSibling && (! (node.nextSibling.innerText && node.nextSibling.innerText.trim()))) {
                div = node.nextSibling;
            } else {
                // Remove not used last item
                if (el.lastChild) {
                    if (! el.lastChild.innerText.trim()) {
                        el.removeChild(el.lastChild);
                    }
                }

                // Mix argument string or array
                if (! value || typeof(value) == 'string') {
                    var div = createElement(value, value, node);
                } else {
                    for (var i = 0; i <= value.length; i++) {
                        if (! limit()) {
                            if (! value[i] || typeof(value[i]) == 'string') {
                                var t = value[i] || '';
                                var v = null;
                            } else {
                                var t = value[i].text;
                                var v = value[i].value;
                            }

                            // Add element
                            var div = createElement(t, v);
                        }
                    }
                }

                // Change
                change();
            }

            // Place caret
            if (focus) {
                setFocus(div);
            }
        }
    }

    obj.setLimit = function(limit) {
        obj.options.limit = limit;
        var n = el.children.length - limit;
        while (el.children.length > limit) {
            el.removeChild(el.lastChild);
        }
    }

    // Remove a item node
    obj.remove = function(node) {
        // Remove node
        node.parentNode.removeChild(node);
        // Make sure element is not blank
        if (! el.children.length) {
            obj.add('', true);
        } else {
            change();
        }

        if (typeof(obj.options.onremoveitem) == 'function') {
            obj.options.onremoveitem(el, obj, node);
        }
    }

    /**
     * Get all tags in the element
     * @return {Array} data - All tags as an array
     */
    obj.getData = function() {
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            // Get value
            var text = el.children[i].innerText.replace("\n", "");
            // Get id
            var value = el.children[i].getAttribute('data-value');
            if (! value) {
                value = text;
            }
            // Item
            if (text || value) {
                data.push({ text: text, value: value });
            }
        }
        return data;
    }

    /**
     * Get the value of one tag. Null for all tags
     * @param {?number} index - Tag index number. Null for all tags.
     * @return {string} value - All tags separated by comma
     */
    obj.getValue = function(index) {
        var value = null;

        if (index != null) {
            // Get one individual value
            value = el.children[index].getAttribute('data-value');
            if (! value) {
                value = el.children[index].innerText.replace("\n", "");
            }
        } else {
            // Get all
            var data = [];
            for (var i = 0; i < el.children.length; i++) {
                value = el.children[i].innerText.replace("\n", "");
                if (value) {
                    data.push(obj.getValue(i));
                }
            }
            value = data.join(',');
        }

        return value;
    }

    /**
     * Set the value of the element based on a string separeted by (,|;|\r\n)
     * @param {mixed} value - A string or array object with values
     */
    obj.setValue = function(mixed) {
        if (! mixed) {
            obj.reset();
        } else {
            if (el.value != mixed) {
                if (Array.isArray(mixed)) {
                    obj.add(mixed);
                } else {
                    // Remove whitespaces
                    var text = (''+mixed).trim();
                    // Tags
                    var data = extractTags(text);
                    // Reset
                    el.innerHTML = '';
                    // Add tags to the element
                    obj.add(data);
                }
            }
        }
    }

    /**
     * Reset the data from the element
     */
    obj.reset = function() {
        // Empty class
        el.classList.add('jtags-empty');
        // Empty element
        el.innerHTML = '<div></div>';
        // Execute changes
        change();
    }

    /**
     * Verify if all tags in the element are valid
     * @return {boolean}
     */
    obj.isValid = function() {
        var test = 0;
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].classList.contains('jtags_error')) {
                test++;
            }
        }
        return test == 0 ? true : false;
    }

    /**
     * Add one element from the suggestions to the element
     * @param {object} item - Node element in the suggestions container
     */ 
    obj.selectIndex = function(text, value) {
        var node = helpers.getNode();
        if (node) {
            // Append text to the caret
            node.innerText = text;
            // Set node id
            if (value) {
                node.setAttribute('data-value', value);
            }
            // Remove any error
            node.classList.remove('jtags_error');
            if (! limit()) {
                // Add new item
                obj.add('', true);
            }
        }
    }

    /**
     * Search for suggestions
     * @param {object} node - Target node for any suggestions
     */
    obj.search = function(node) {
        // Search for
        var terms = node.innerText;
    }

    // Destroy tags element
    obj.destroy = function() {
        // Bind events
        el.removeEventListener('mouseup', tagsMouseUp);
        el.removeEventListener('keydown', tagsKeyDown);
        el.removeEventListener('keyup', tagsKeyUp);
        el.removeEventListener('paste', tagsPaste);
        el.removeEventListener('focus', tagsFocus);
        el.removeEventListener('blur', tagsBlur);

        // Remove element
        el.parentNode.removeChild(el);
    }

    var setFocus = function(node) {
        if (el.children.length) {
            var range = document.createRange();
            var sel = window.getSelection();
            if (! node) {
                var node = el.childNodes[el.childNodes.length-1];
            }
            range.setStart(node, node.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            el.scrollLeft = el.scrollWidth;
        }
    }

    var createElement = function(label, value, node) {
        var div = document.createElement('div');
        div.textContent = label ? label : '';
        if (value) {
            div.setAttribute('data-value', value);
        }

        if (node && node.parentNode.classList.contains('jtags')) {
            el.insertBefore(div, node.nextSibling);
        } else {
            el.appendChild(div);
        }

        return div;
    }

    var change = function() {
        // Value
        var value = obj.getValue();

        if (value != obj.options.value) {
            obj.options.value = value;
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, obj.options.value);
            }

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        filter();
    }

    /**
     * Filter tags
     */
    var filter = function() {
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].tagName === 'DIV') {
                // Create label design
                if (!obj.getValue(i)) {
                    el.children[i].classList.remove('jtags_label');
                } else {
                    el.children[i].classList.add('jtags_label');

                    // Validation in place
                    if (typeof (obj.options.validation) == 'function') {
                        if (obj.getValue(i)) {
                            if (!obj.options.validation(el.children[i], el.children[i].innerText, el.children[i].getAttribute('data-value'))) {
                                el.children[i].classList.add('jtags_error');
                            } else {
                                el.children[i].classList.remove('jtags_error');
                            }
                        } else {
                            el.children[i].classList.remove('jtags_error');
                        }
                    } else {
                        el.children[i].classList.remove('jtags_error');
                    }
                }
            }
        }

        isEmpty();
    }

    var isEmpty = function() {
        // Can't be empty
        if (! el.innerText.trim()) {
            if (! el.children.length || el.children[0].tagName === 'BR') {
                el.innerHTML = '';
                setFocus(createElement());
            }
        } else {
            el.classList.remove('jtags-empty');
        }
    }

    /**
     * Extract tags from a string
     * @param {string} text - Raw string
     * @return {Array} data - Array with extracted tags
     */
    var extractTags = function(text) {
        /** @type {Array} */
        var data = [];

        /** @type {string} */
        var word = '';

        // Remove whitespaces
        text = text.trim();

        if (text) {
            for (var i = 0; i < text.length; i++) {
                if (text[i] == ',' || text[i] == ';' || text[i] == '\n') {
                    if (word) {
                        data.push(word.trim());
                        word = '';
                    }
                } else {
                    word += text[i];
                }
            }

            if (word) {
                data.push(word);
            }
        }

        return data;
    }

    /** @type {number} */
    var anchorOffset = 0;

    /**
     * Processing event keydown on the element
     * @param e {object}
     */
    var tagsKeyDown = function(e) {
        // Anchoroffset
        anchorOffset = window.getSelection().anchorOffset;

        // Verify if is empty
        isEmpty();

        // Comma
        if (e.key === 'Tab'  || e.key === ';' || e.key === ',') {
            var n = window.getSelection().anchorOffset;
            if (n > 1) {
                if (limit()) {
                    if (typeof(obj.options.onlimit) == 'function') {
                        obj.options.onlimit(obj, obj.options.limit)
                    }
                } else {
                    obj.add('', true);
                }
            }
            e.preventDefault();
        } else if (e.key == 'Enter') {
            if (! search || ! search.isOpened()) {
                var n = window.getSelection().anchorOffset;
                if (n > 1) {
                    if (! limit()) {
                        obj.add('', true);
                    }
                }
                e.preventDefault();
            }
        } else if (e.key == 'Backspace') {
            // Back space - do not let last item to be removed
            if (el.children.length == 1 && window.getSelection().anchorOffset < 1) {
                e.preventDefault();
            }
        }

        // Search events
        if (search) {
            search.keydown(e);
        }

        // Verify if is empty
        isEmpty();
    }

    /**
     * Processing event keyup on the element
     * @param e {object}
     */
    var tagsKeyUp = function(e) {
        if (e.which == 39) {
            // Right arrow
            var n = window.getSelection().anchorOffset;
            if (n > 1 && n == anchorOffset) {
                obj.add('', true);
            }
        } else if (e.which == 13 || e.which == 38 || e.which == 40) {
            e.preventDefault();
        } else {
            if (search) {
                search.keyup(e);
            }
        }

        filter();
    }

    /**
     * Processing event paste on the element
     * @param e {object}
     */
    var tagsPaste =  function(e) {
        if (e.clipboardData || e.originalEvent.clipboardData) {
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            var text = window.clipboardData.getData('Text');
        }

        var data = extractTags(text);

        if (typeof(obj.options.onbeforepaste) == 'function') {
            var ret = obj.options.onbeforepaste(el, obj, data);
            if (ret === false) {
                e.preventDefault();
                return false;
            } else {
                if (ret) {
                    data = ret;
                }
            }
        }

        if (data.length > 1) {
            obj.add(data, true);
            e.preventDefault();
        } else if (data[0]) {
            document.execCommand('insertText', false, data[0])
            e.preventDefault();
        }
    }

    /**
     * Processing event mouseup on the element
     * @param e {object}
     */
    var tagsMouseUp = function(e) {
        if (e.target.parentNode && e.target.parentNode.classList.contains('jtags')) {
            if (e.target.classList.contains('jtags_label') || e.target.classList.contains('jtags_error')) {
                var rect = e.target.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 16) {
                    obj.remove(e.target);
                }
            }
        }

        // Set focus in the last item
        if (e.target == el) {
            setFocus();
        }
    }

    var tagsFocus = function() {
        if (! el.classList.contains('jtags-focus')) {
            if (! el.children.length || obj.getValue(el.children.length - 1)) {
                if (! limit()) {
                    createElement('');
                }
            }

            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el, obj, obj.getValue());
            }

            el.classList.add('jtags-focus');
        }
    }

    var tagsBlur = function() {
        if (el.classList.contains('jtags-focus')) {
            if (search) {
                search.close();
            }

            for (var i = 0; i < el.children.length - 1; i++) {
                // Create label design
                if (! obj.getValue(i)) {
                    el.removeChild(el.children[i]);
                }
            }

            change();

            el.classList.remove('jtags-focus');

            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el, obj, obj.getValue());
            }
        }
    }

    var init = function() {
        // Bind events
        if ('touchend' in document.documentElement === true) {
            el.addEventListener('touchend', tagsMouseUp);
        } else {
            el.addEventListener('mouseup', tagsMouseUp);
        }

        el.addEventListener('keydown', tagsKeyDown);
        el.addEventListener('keyup', tagsKeyUp);
        el.addEventListener('paste', tagsPaste);
        el.addEventListener('focus', tagsFocus);
        el.addEventListener('blur', tagsBlur);

        // Editable
        el.setAttribute('contenteditable', true);

        // Prepare container
        el.classList.add('jtags');

        // Initial options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change methods
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        el.tags = obj;
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/upload.js




function Upload(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        type: 'image',
        extension: '*',
        input: false,
        minWidth: false,
        maxWidth: null,
        maxHeight: null,
        maxJpegSizeBytes: null, // For example, 350Kb would be 350000
        onchange: null,
        multiple: false,
        remoteParser: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Multiple
    if (obj.options.multiple == true) {
        el.setAttribute('data-multiple', true);
    }

    // Container
    el.content = [];

    // Upload icon
    el.classList.add('jupload');

    if (obj.options.input == true) {
        el.classList.add('input');
    }

    obj.add = function(data) {
        // Reset container for single files
        if (obj.options.multiple == false) {
            el.content = [];
            el.innerText = '';
        }

        // Append to the element
        if (obj.options.type == 'image') {
            var img = document.createElement('img');
            img.setAttribute('src', data.file);
            img.setAttribute('tabindex', -1);
            if (! el.getAttribute('name')) {
                img.className = 'jfile';
                img.content = data;
            }
            el.appendChild(img);
        } else {
            if (data.name) {
                var name = data.name;
            } else {
                var name = data.file;
            }
            var div = document.createElement('div');
            div.innerText = name || obj.options.type;
            div.classList.add('jupload-item');
            div.setAttribute('tabindex', -1);
            el.appendChild(div);
        }

        if (data.content) {
            data.file = helpers.guid();
        }

        // Push content
        el.content.push(data);

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, data);
        }
    }

    obj.addFromFile = function(file) {
        var type = file.type.split('/');
        if (type[0] == obj.options.type) {
            var readFile = new FileReader();
            readFile.addEventListener("load", function (v) {
                var data = {
                    file: v.srcElement.result,
                    extension: file.name.substr(file.name.lastIndexOf('.') + 1),
                    name: file.name,
                    size: file.size,
                    lastmodified: file.lastModified,
                    content: v.srcElement.result,
                }

                obj.add(data);
            });

            readFile.readAsDataURL(file);
        } else {
            alert(dictionary.translate('This extension is not allowed'));
        }
    }

    obj.addFromUrl = function(src) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                var type = extension[0].replace('data:','');
                if (type == obj.options.type) {
                    var data = {
                        file: src,
                        name: '',
                        extension: extension[1],
                        content: src,
                    }
                    obj.add(data);
                } else {
                    alert(obj.options.text.extensionNotAllowed);
                }
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
                // Get remove content
                ajax({
                    url: src,
                    type: 'GET',
                    dataType: 'blob',
                    success: function(data) {
                        //add(extension[0].replace('data:',''), data);
                    }
                })
            }
        }
    }

    var getDataURL = function(canvas, type) {
        var compression = 0.92;
        var lastContentLength = null;
        var content = canvas.toDataURL(type, compression);
        while (obj.options.maxJpegSizeBytes && type === 'image/jpeg' &&
               content.length > obj.options.maxJpegSizeBytes && content.length !== lastContentLength) {
            // Apply the compression
            compression *= 0.9;
            lastContentLength = content.length;
            content = canvas.toDataURL(type, compression);
        }
        return content;
    }

    var mime = obj.options.type + '/' + obj.options.extension;
    var input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('accept', mime);
    input.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    // Allow multiple files
    if (obj.options.multiple == true) {
        input.setAttribute('multiple', true);
    }

    var current = null;

    el.addEventListener("click", function(e) {
        current = null;
        if (! el.children.length || e.target === el) {
            helpers.click(input);
        } else {
            if (e.target.parentNode == el) {
                current = e.target;
            }
        }
    });

    el.addEventListener("dblclick", function(e) {
        helpers.click(input);
    });

    el.addEventListener('dragenter', function(e) {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    el.addEventListener('keydown', function(e) {
        if (current && e.which == 46) {
            var index = Array.prototype.indexOf.call(el.children, current);
            if (index >= 0) {
                el.content.splice(index, 1);
                current.remove();
                current = null;
            }
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (file.length) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else if (html) {
            if (obj.options.multiple == false) {
                el.innerText = '';
            }

            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addFromUrl(img[i].src);
                }
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.val = function(val) {
        if (val === undefined) {
            return el.content && el.content.length ? el.content : null;
        } else {
            // Reset
            el.innerText = '';
            el.content = [];

            if (val) {
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (typeof(val[i]) == 'string') {
                            obj.add({ file: val[i] });
                        } else {
                            obj.add(val[i]);
                        }
                    }
                } else if (typeof(val) == 'string') {
                    obj.add({ file: val });
                }
            }
        }
    }

    el.upload = el.image = obj;

    return obj;
}

// EXTERNAL MODULE: ./packages/sha512/sha512.js
var sha512 = __webpack_require__(195);
var sha512_default = /*#__PURE__*/__webpack_require__.n(sha512);
;// CONCATENATED MODULE: ./src/jsuites.js




















































var jSuites = {
    // Helpers
    ...dictionary,
    ...helpers,
    /** Current version */
    version: '5.12.0',
    /** Bind new extensions to Jsuites */
    setExtensions: function(o) {
        if (typeof(o) == 'object') {
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                jSuites[k[i]] = o[k[i]];
            }
        }
    },
    tracking: tracking,
    path: Path,
    sorting: Sorting,
    lazyLoading: LazyLoading,
    // Plugins
    ajax: ajax,
    animation: animation,
    calendar: calendar,
    color: Color,
    contextmenu: contextmenu,
    dropdown: dropdown,
    editor: editor,
    floating: floating,
    form: plugins_form,
    mask: mask,
    modal: modal,
    notification: notification,
    palette: palette,
    picker: Picker,
    progressbar: Progressbar,
    rating: Rating,
    search: Search,
    slider: Slider,
    tabs: Tabs,
    tags: Tags,
    toolbar: Toolbar,
    upload: Upload,
    validations: validations,
}

// Legacy
jSuites.image = Upload;
jSuites.image.create = function(data) {
    var img = document.createElement('img');
    img.setAttribute('src', data.file);
    img.className = 'jfile';
    img.setAttribute('tabindex', -1);
    img.content = data;

    return img;
}

jSuites.tracker = plugins_form;
jSuites.loading = animation.loading;
jSuites.sha512 = (sha512_default());


/** Core events */
const Events = function() {

    if (typeof(window['jSuitesStateControl']) === 'undefined') {
        window['jSuitesStateControl'] = [];
    } else {
        // Do nothing
        return;
    }

    const find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.component && DOMElement.component == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }

    const isOpened = function(e) {
        let state = window['jSuitesStateControl'];
        if (state && state.length > 0) {
            for (let i = 0; i < state.length; i++) {
                if (state[i] && ! find(e, state[i])) {
                    state[i].close();
                }
            }
        }
    }

    // Width of the border
    let cornerSize = 15;

    // Current element
    let element = null;

    // Controllers
    let editorAction = false;

    // Event state
    let state = {
        x: null,
        y: null,
    }

    // Tooltip element
    let tooltip = document.createElement('div')
    tooltip.classList.add('jtooltip');

    const isWebcomponent = function(e) {
        return e && (e.shadowRoot || (e.tagName && e.tagName.includes('-')));
    }

    const getElement = function(e) {
        let d;
        let element;
        // Which component I am clicking
        let path = e.path || (e.composedPath && e.composedPath());

        // If path available get the first element in the chain
        if (path) {
            element = path[0];
            // Adjustment sales force
            if (element && isWebcomponent(element) && ! element.shadowRoot && e.toElement) {
                element = e.toElement;
            }
        } else {
            // Try to guess using the coordinates
            if (e.target && isWebcomponent(e.target)) {
                d = e.target.shadowRoot;
            } else {
                d = document;
            }
            // Get the first target element
            element = d.elementFromPoint(x, y);
        }
        return element;
    }

    // Events
    const mouseDown = function(e) {
        // Verify current components tracking
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
        } else {
            var x = e.clientX;
            var y = e.clientY;
        }

        let element = getElement(e);
        // Editable
        let editable = element && element.tagName === 'DIV' && element.getAttribute('contentEditable');
        // Check if this is the floating
        let item = jSuites.findElement(element, 'jpanel');
        // Jfloating found
        if (item && ! item.classList.contains("readonly") && ! editable) {
            // Keep the tracking information
            let rect = item.getBoundingClientRect();
            let angle = 0;
            if (item.style.rotate) {
                // Extract the angle value from the match and convert it to a number
                angle = parseFloat(item.style.rotate);
            }
            let action = 'move';
            if (element.getAttribute('data-action')) {
                action = element.getAttribute('data-action');
            } else {
                if (item.style.cursor) {
                    action = 'resize';
                } else {
                    item.style.cursor = 'move';
                }
            }

            // Action
            editorAction = {
                action: action,
                a: angle,
                e: item,
                x: x,
                y: y,
                l: rect.left,
                t: rect.top,
                b: rect.bottom,
                r: rect.right,
                w: rect.width,
                h: rect.height,
                d: item.style.cursor,
                actioned: false,
            }
            // Make sure width and height styling is OK
            if (! item.style.width) {
                item.style.width = rect.width + 'px';
            }
            if (! item.style.height) {
                item.style.height = rect.height + 'px';
            }
        } else {
            // No floating action found
            editorAction = false;
        }

        isOpened(element);

        focus(e);
    }

    const calculateAngle = function(x1, y1, x2, y2, x3, y3) {
        // Calculate dx and dy for the first line
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        // Calculate dx and dy for the second line
        const dx2 = x3 - x1;
        const dy2 = y3 - y1;
        // Calculate the angle for the first line
        let angle1 = Math.atan2(dy1, dx1);
        // Calculate the angle for the second line
        let angle2 = Math.atan2(dy2, dx2);
        // Calculate the angle difference in radians
        let angleDifference = angle2 - angle1;
        // Convert the angle difference to degrees
        angleDifference = angleDifference * (180 / Math.PI);
        // Normalize the angle difference to be within [0, 360) degrees
        if (angleDifference < 0) {
            angleDifference += 360;
        }
        return angleDifference;
    }

    const mouseUp = function(e) {
        if (editorAction && editorAction.e) {
            if (typeof(editorAction.e.refresh) == 'function' && state.actioned) {
                editorAction.e.refresh();
            }
            editorAction.e.style.cursor = '';
        }

        // Reset
        state = {
            x: null,
            y: null,
        }

        editorAction = false;
    }

    const mouseMove = function(e) {
        if (editorAction) {
            let x = e.clientX || e.pageX;
            let y = e.clientY || e.pageY;

            if (state.x == null && state.y == null) {
                state.x = x;
                state.y = y;
            }

            // Action on going
            if (editorAction.action === 'move') {
                var dx = x - state.x;
                var dy = y - state.y;
                var top = editorAction.e.offsetTop + dy;
                var left = editorAction.e.offsetLeft + dx;

                // Update position
                editorAction.e.style.top = top + 'px';
                editorAction.e.style.left = left + 'px';

                // Update element
                if (typeof (editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('position', top, left);
                }
            } else if (editorAction.action === 'rotate') {
                let ox = editorAction.l+editorAction.w/2;
                let oy = editorAction.t+editorAction.h/2;
                let angle = calculateAngle(ox, oy, editorAction.x, editorAction.y, x, y);
                angle = angle + editorAction.a % 360;
                angle = Math.round(angle / 2) * 2;
                editorAction.e.style.rotate = `${angle}deg`;
                // Update element
                if (typeof (editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('rotate', angle);
                }
            } else if (editorAction.action === 'resize') {
                let top = null;
                let left = null;
                let width = null;
                let height = null;

                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'se-resize') {
                    width = editorAction.e.offsetWidth + (x - state.x);

                    if (e.shiftKey) {
                        height = editorAction.e.offsetHeight + (x - state.x) * (editorAction.e.offsetHeight / editorAction.e.offsetWidth);
                    }
                } else if (editorAction.d === 'w-resize' || editorAction.d == 'nw-resize'|| editorAction.d == 'sw-resize') {
                    left = editorAction.e.offsetLeft + (x - state.x);
                    width = editorAction.e.offsetLeft + editorAction.e.offsetWidth - left;

                    if (e.shiftKey) {
                        height = editorAction.e.offsetHeight - (x - state.x) * (editorAction.e.offsetHeight / editorAction.e.offsetWidth);
                    }
                }

                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                    if (! height) {
                        height = editorAction.e.offsetHeight + (y - state.y);
                    }
                } else if (editorAction.d === 'n-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'nw-resize') {
                    top = editorAction.e.offsetTop + (y - state.y);
                    height = editorAction.e.offsetTop + editorAction.e.offsetHeight - top;
                }

                if (top) {
                    editorAction.e.style.top = top + 'px';
                }
                if (left) {
                    editorAction.e.style.left = left + 'px';
                }
                if (width) {
                    editorAction.e.style.width = width + 'px';
                }
                if (height) {
                    editorAction.e.style.height = height + 'px';
                }

                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('dimensions', width, height);
                }
            }

            state.x = x;
            state.y = y;
        } else {
            let element = getElement(e);
            // Resize action
            let item = jSuites.findElement(element, 'jpanel');
            // Found eligible component
            if (item) {
                // Resizing action
                let controls = item.classList.contains('jpanel-controls');
                if (controls) {
                    let position = element.getAttribute('data-position');
                    if (position) {
                        item.style.cursor = position;
                    } else {
                        item.style.cursor = '';
                    }
                } else if (item.getAttribute('tabindex')) {
                    let rect = item.getBoundingClientRect();
                    //console.log(e.clientY - rect.top, rect.width - (e.clientX - rect.left), cornerSize)
                    if (e.clientY - rect.top < cornerSize) {
                        if (rect.width - (e.clientX - rect.left) < cornerSize) {
                            item.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < cornerSize) {
                            item.style.cursor = 'nw-resize';
                        } else {
                            item.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < cornerSize) {
                        if (rect.width - (e.clientX - rect.left) < cornerSize) {
                            item.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < cornerSize) {
                            item.style.cursor = 'sw-resize';
                        } else {
                            item.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'w-resize';
                    } else {
                        item.style.cursor = '';
                    }
                }
            }
        }
    }

    let position = ['n','ne','e','se','s','sw','w','nw','rotate'];
    position.forEach(function(v, k) {
        position[k] = document.createElement('div');
        position[k].classList.add('jpanel-action');
        if (v === 'rotate') {
            position[k].setAttribute('data-action', 'rotate');
        } else {
            position[k].setAttribute('data-action', 'resize');
            position[k].setAttribute('data-position', v + '-resize');
        }
    });

    let currentElement;

    const focus = function(e) {
        let element = getElement(e);
        // Check if this is the floating
        let item = jSuites.findElement(element, 'jpanel');
        if (item && ! item.classList.contains("readonly") && item.classList.contains('jpanel-controls')) {
            item.append(...position);

            if (! item.classList.contains('jpanel-rotate')) {
                position[position.length-1].remove();
            }

            currentElement = item;
        } else {
            blur(e);
        }
    }

    const blur = function(e) {
        if (currentElement) {
            position.forEach(function(v) {
                v.remove();
            });
            currentElement = null;
        }
    }

    const mouseOver = function(e) {
        let element = getElement(e);
        var message = element.getAttribute('data-tooltip');
        if (message) {
            // Instructions
            tooltip.innerText = message;

            // Position
            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';
            document.body.appendChild(tooltip);
        } else if (tooltip.innerText) {
            tooltip.innerText = '';
            document.body.removeChild(tooltip);
        }
    }

    const contextMenu = function(e) {
        var item = document.activeElement;
        if (item && typeof(item.contextmenu) == 'function') {
            // Create edition
            item.contextmenu(e);

            e.preventDefault();
            e.stopImmediatePropagation();
        } else {
            // Search for possible context menus
            item = jSuites.findElement(e.target, function(o) {
                return o.tagName && o.getAttribute('aria-contextmenu-id');
            });

            if (item) {
                var o = document.querySelector('#' + item);
                if (! o) {
                    console.error('JSUITES: contextmenu id not found: ' + item);
                } else {
                    o.contextmenu.open(e);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }
    }

    const keyDown = function(e) {
        let item = document.activeElement;
        if (item) {
            if (e.key === "Delete" && typeof(item.delete) == 'function') {
                item.delete();
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }

        let state = window['jSuitesStateControl'];
        if (state && state.length > 0) {
            item = state[state.length - 1];
            if (item) {
                if (e.key === "Escape" && typeof(item.isOpened) == 'function' && typeof(item.close) == 'function') {
                    if (item.isOpened()) {
                        item.close();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            }
        }
    }

    const input = function(e) {
        if (e.target.getAttribute('data-mask') || e.target.mask) {
            jSuites.mask.oninput(e);
        }
    }

    document.addEventListener('focusin', focus);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', mouseOver);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('contextmenu', contextMenu);
    document.addEventListener('input', input);
}

if (typeof(document) !== "undefined") {
    Events();
}

/* harmony default export */ var jsuites = (jSuites);
}();
jSuites = __webpack_exports__["default"];
/******/ })()
;

    return jSuites;
})));