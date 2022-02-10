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

        var flagDrawStarted = false;

        // Default configuration
        var defaults = {
            width: '100%',
            height: '120px',
            type: 'array',
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
                if(obj.options.type == "array") {
                    coordinates = JSON.parse(JSON.stringify(c));
                    if(!Array.isArray(coordinates)) {
                        coordinates = [];
                    }
                    if(!Array.isArray(c)) {
                        return false;
                    }
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
                    dispatchOnChange();
                } else if(obj.options.type == "base64") {
                    loadImage(c, function() {
                        coordinates = c;
                        dispatchOnChange();
                    });
                }
            }
        }

        obj.getValue = function() {
            return coordinates;
        }

         /**
         * get base64 of signature
         * @public
         * @returns string base64
         */
        obj.getImage = function() {
            return canvas.toDataURL();
        }
        
        
        
        /**
         * Write text like signature
         * @public
         * @param {string} text 
         * @param {string} fontFamily 
         * @param {int} fontSize 
         */
        obj.write = function(text, fontFamily = "Cursive", fontSize = 30) {
            obj.reset();

            /**
             * WARNING : You need load before your font family in HTMLElement (div) into document.body to use after here.
             */
            
            if(text) {
                ctx.font = `${ fontSize }px "${fontFamily}"`;
                ctx.textBaseline = 'top';
                ctx.fillText(text,10,parseInt((parseInt(obj.options.height)-parseInt(fontSize)+5)/2));  
            } 
            obj.setValue(obj.getImage());
        }


        obj.reset = function() {
            coordinates = [];
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        obj.resize = function() {
            resize();
        }

        var dispatchOnChange = function() {
            if(obj.options.onchange && typeof obj.options.onchange == "function") {
                obj.options.onchange(el, coordinates, obj);
            }
        }

        var loadImage = function(d, callback) {                    
            var image = new Image();
            image.onload = function() {
                obj.reset();
                ctx.drawImage(image, 0, 0);
                if(callback && typeof callback == "function") {
                    callback();
                }
            };
            image.src = d;
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

            if(obj.options.type == "array") {
                coordinates.push([ x, y ]);
            }
            flagDrawStarted = true;
        }

        var resize = function() {
            ctx.canvas.width = el.offsetWidth;
            ctx.canvas.height = el.offsetHeight;

            obj.setValue(coordinates);
        }

        var draw = function(e) {
            if (x == null || obj.options.readonly == true || !flagDrawStarted) {
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

                // Disable moving windows
                if (e.cancelable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }

        var finalize = function() {
            if(!flagDrawStarted) {
                return false;
            }
            x = null;
            y = null;

            if(obj.options.type == "array") {
                coordinates.push('1');
            } else if(obj.options.type == "base64") {
                coordinates = obj.getImage();
            }
            dispatchOnChange();
            flagDrawStarted = false;
        }

        window.addEventListener('resize', resize);

        if ('ontouchmove' in document.documentElement === true) {
            el.addEventListener('touchstart', setPosition, { passive:false });
            el.addEventListener('touchmove', draw, { passive:false });
            document.addEventListener('touchend', finalize, { passive:false });
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