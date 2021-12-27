/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Signature pad
 *
 * MIT License
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.signature = factory();

    if (typeof(jSuites) !== 'undefined') {
        jSuites.signature = global.signature;
    }
}(this, (function () {

    'use strict';

    return (function(el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            width: '100%',
            height: '120px',
            lineWidth: 3,
            onchange: null,
            value: null,
            readonly: false,
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        el.style.width = obj.options.width;
        el.style.height = obj.options.height;
        el.classList.add('jsignature');

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        el.appendChild(canvas);

        // Position
        var x = null;
        var y = null;

        // Coordinates
        var coordinates = [];

        obj.setValue = function(c) {
            obj.reset();

            if (c && c.length) {
                // Set the coordinates
                coordinates = JSON.parse(JSON.stringify(c));

                var t = c.shift();
                var p = null;
                ctx.beginPath();
                ctx.lineWidth = obj.options.lineWidth;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#000';
                ctx.moveTo(t[0], t[1]);

                while (t = c.shift()) {
                    if (t == 1) {
                        t = c.shift();
                        if (Array.isArray(t)) {
                            ctx.moveTo(t[0], t[1]);
                        }
                    }
                    if (Array.isArray(t)) {
                        ctx.lineTo(t[0], t[1]);
                        ctx.stroke();
                    }
                }
            }
        }

        obj.getValue = function() {
            return coordinates;
        }

        obj.reset = function() {
            coordinates = [];
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        obj.resize = function() {
            resize();
        }

        var setPosition = function(e) {
            // Mark position
            if (e.changedTouches && e.changedTouches[0]) {
                var rect = e.target.getBoundingClientRect();
                x = e.changedTouches[0].clientX - rect.x;
                y = e.changedTouches[0].clientY - rect.y;
            } else {
                x = e.offsetX;
                y = e.offsetY;
            }

            coordinates.push([ x, y ]);
        }

        var resize = function() {
            ctx.canvas.width = el.offsetWidth;
            ctx.canvas.height = el.offsetHeight;

            obj.setValue(coordinates);
        }

        var draw = function(e) {
            if (x == null || obj.options.readonly == true) {
                return false;
            } else {
                e = e || window.event;
                if (e.buttons) {
                    var mouseButton = e.buttons;
                } else if (e.button) {
                    var mouseButton = e.button;
                } else {
                    var mouseButton = e.which;
                }

                ctx.beginPath();
                ctx.lineWidth = obj.options.lineWidth;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#000';
                ctx.moveTo(x, y);
                setPosition(e);
                ctx.lineTo(x, y);
                ctx.stroke();

                e.preventDefault();
                e.stopPropagation();
            }
        }

        var finalize = function() {
            x = null;
            y = null;

            coordinates.push('1');
        }

        window.addEventListener('resize', resize);

        if ('ontouchmove' in document.documentElement === true) {
            el.addEventListener('touchstart', setPosition);
            el.addEventListener('touchmove', draw);
            document.addEventListener('touchend', finalize);
        } else {
            el.addEventListener('mousedown', setPosition);
            el.addEventListener('mousemove', draw);
            document.addEventListener('mouseup', finalize);
        }

        resize();

        if (obj.options.value) {
            obj.setValue(obj.options.value);
        }

        el.signature = obj;

        el.val = function(v) {
            if (typeof(v) === 'undefined') {
                return obj.getValue();
            } else {
                obj.setValue(v);
            }
        }

        return obj;
    });
})));