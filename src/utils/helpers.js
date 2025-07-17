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

export default Helpers;