;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Core = factory();
}(this, (function () {

    'use strict';

    // jSuites version
    var version = '5.0.0';

    /**
     * Find a valid jSuites component upwards in the three
     */
    var find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }

    /**
     * Instance is opened
     */
    var isOpened = function(e) {
        if (P.current.length > 0) {
            for (var i = 0; i < P.current.length; i++) {
                if (P.current[i] && ! find(e.target, P.current[i])) {
                    P.current[i].close();
                }
            }
        }
    }

    // Plugin object
    var P = { version };

    // Tracking controllers
    P.current = [];

    // Dictionary
    P.dictionary = {};

    /**
     * Tracking open instances
     * @param component
     * @param state
     */
    P.tracking = function(component, state) {
        if (state == true) {
            P.current = P.current.filter(function(v) {
                return v !== null;
            });

            // Start after all events
            setTimeout(function() {
                P.current.push(component);
            }, 0);

        } else {
            var index = P.current.indexOf(component);
            if (index >= 0) {
                P.current[index] = null;
            }
        }
    }

    /**
     * Get or set a property from a JSON from a string.
     */
    P.path = function(str, val) {
        str = str.split('.');
        if (str.length) {
            var o = this;
            var p = null;
            while (str.length > 1) {
                // Get the property
                p = str.shift();
                // Check if the property exists
                if (o.hasOwnProperty(p)) {
                    o = o[p];
                } else {
                    // Property does not exists
                    if (val === undefined) {
                        return undefined;
                    } else {
                        // Create the property
                        o[p] = {};
                        // Next property
                        o = o[p];
                    }
                }
            }
            // Get the property
            p = str.shift();
            // Set or get the value
            if (val !== undefined) {
                o[p] = val;
                // Success
                return true;
            } else {
                // Return the value
                return o[p];
            }
        }
        // Something went wrong
        return false;
    }

    // Update dictionary
    P.setDictionary = function(d) {
        P.dictionary = d;

        // Translations
        /*var t = null;
        for (var i = 0; i < jSuites.calendar.weekdays.length; i++) {
            t =  jSuites.translate(jSuites.calendar.weekdays[i]);
            if (jSuites.calendar.weekdays[i]) {
                jSuites.calendar.weekdays[i] = t;
                jSuites.calendar.weekdaysShort[i] = t.substr(0,3);
            }
        }
        for (var i = 0; i < jSuites.calendar.months.length; i++) {
            t = jSuites.translate(jSuites.calendar.months[i]);
            if (t) {
                jSuites.calendar.months[i] = t;
                jSuites.calendar.monthsShort[i] = t.substr(0,3);
            }
        }*/
    }

    // Translate
    P.translate = function(t) {
        return P.dictionary[t] || t;
    }

    P.focus = function (el) {
        if (el.innerText.length) {
            var range = document.createRange();
            var sel = window.getSelection();
            var node = el.childNodes[el.childNodes.length - 1];
            range.setStart(node, node.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            el.scrollLeft = el.scrollWidth;
        }
    }

    P.isNumeric = (function (num) {
        return !isNaN(num) && num !== null && num !== '';
    });

    P.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    P.getNode = function () {
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
    P.hash = function (str) {
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
    P.randomColor = function (h) {
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
        if (h === true) {
            return '#' + P.two(rgb[0].toString(16)) + P.two(rgb[1].toString(16)) + P.two(rgb[2].toString(16));
        }

        return rgb;
    }

    /**
     * Get the window width
     * @returns {number}
     */
    P.getWindowWidth = function () {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x;
    }

    /**
     * Get the window height
     * @returns {number}
     */
    P.getWindowHeight = function () {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        return y;
    }

    /**
     * Get the position of the mouse
     * @param e
     * @returns {[(number|number|*), (number|number|*)]}
     */
    P.getPosition = function (e) {
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY;
        } else {
            var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }

        return [x, y];
    }

    /**
     * Trigger a click event on the element
     * @param {HTMLElement}
     */
    P.click = function (el) {
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

    /**
     * Find a DOM element in the three
     * @param {HTMLElement}
     * @param condition
     * @returns {boolean}
     */
    P.findElement = function (element, condition) {
        var foundElement = false;

        function path(element) {
            if (element && !foundElement) {
                if (typeof (condition) == 'function') {
                    foundElement = condition(element)
                } else if (typeof (condition) == 'string') {
                    if (element.classList && element.classList.contains(condition)) {
                        foundElement = element;
                    }
                }
            }

            if (element.parentNode && !foundElement) {
                path(element.parentNode);
            }
        }

        path(element);

        return foundElement;
    }

    /**
     * Two digits
     * @param value
     * @returns {string}
     */
    P.two = function (value) {
        value = '' + value;
        if (value.length == 1) {
            value = '0' + value;
        }
        return value;
    }

    // jSuites click controllers
    if (typeof(document) !== "undefined") {
        document.addEventListener("click", isOpened);
    }

    return P;

})));
