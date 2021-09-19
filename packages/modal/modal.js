;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Modal = factory();
}(this, (function () {

    'use strict';

    if (typeof(Animation) == 'undefined' && typeof(require) === 'function') {
        var Animation = require('@jsuites/animation');
    }
    if (typeof(ajax) == 'undefined' && typeof(require) === 'function') {
        var ajax = require('@jsuites/ajax');
    }

    var events = null;
    var current = null;
    var position = null;

    var keyDownControls = function(e) {
        if (e.which == 27) {
            if (current) {
                current.close();
            }
        }
    }

    var mouseUpControls = function(e) {
        if (current) {
            current.container.style.cursor = 'auto';
        }
        position = null;
    }

    var mouseMoveControls = function(e) {
        if (current && position) {
            if (e.which == 1 || e.which == 3) {
                var position = position;
                current.container.style.top = (position[1] + (e.clientY - position[3]) + (position[5] / 2)) + 'px';
                current.container.style.left = (position[0] + (e.clientX - position[2]) + (position[4] / 2)) + 'px';
                current.container.style.cursor = 'move';
            } else {
                current.container.style.cursor = 'auto';
            }
        }
    }

    var mouseDownControls = function(e) {
        position = [];

        if (e.target.classList.contains('jmodal')) {
            setTimeout(function() {
                // Get target info
                var rect = e.target.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    setTimeout(function() {
                        current.close();
                    }, 100);
                } else {
                    if (e.target.getAttribute('title') && (y - rect.top) < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if ( window.getSelection ) {
                            window.getSelection().removeAllRanges();
                        }

                        position = [
                            rect.left,
                            rect.top,
                            e.clientX,
                            e.clientY,
                            rect.width,
                            rect.height,
                        ];
                    }
                }
            }, 100);
        }
    }

    var P = (function(el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            url: null,
            onopen: null,
            onclose: null,
            closed: false,
            width: null,
            height: null,
            title: null,
            padding: null,
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
        if (! obj.options.title && el.getAttribute('title')) {
            obj.options.title = el.getAttribute('title');
        }

        var temp = document.createElement('div');
        while (el.children[0]) {
            temp.appendChild(el.children[0]);
        }

        obj.content = document.createElement('div');
        obj.content.className = 'jmodal_content';
        obj.content.innerHTML = el.innerHTML;

        while (temp.children[0]) {
            obj.content.appendChild(temp.children[0]);
        }

        obj.container = document.createElement('div');
        obj.container.className = 'jmodal';
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
            obj.container.setAttribute('title', obj.options.title);
        } else {
            obj.container.classList.add('no-title');
        }
        el.innerHTML = '';
        el.style.display = 'none';
        el.appendChild(obj.container);

        // Backdrop
        var backdrop = document.createElement('div');
        backdrop.className = 'jmodal_backdrop';
        backdrop.onclick = function() {
            obj.close();
        }
        el.appendChild(backdrop);

        obj.open = function() {
            el.style.display = 'block';
            // Fullscreen
            var rect = obj.container.getBoundingClientRect();
            if (document.body.offsetWidth < rect.width) {
                obj.container.style.top = '';
                obj.container.style.left = '';
                obj.container.classList.add('jmodal_fullscreen');
                Animation.animation.slideBottom(obj.container, 1);
            } else {
                backdrop.style.display = 'block';
            }
            // Current
            current = obj;
            // Event
            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el, obj);
            }
        }

        obj.resetPosition = function() {
            obj.container.style.top = '';
            obj.container.style.left = '';
        }

        obj.isOpen = function() {
            return el.style.display != 'none' ? true : false;
        }

        obj.close = function() {
            el.style.display = 'none';
            // Backdrop
            backdrop.style.display = '';
            // Current
            current = null;
            // Remove fullscreen class
            obj.container.classList.remove('jmodal_fullscreen');
            // Event
            if (typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el, obj);
            }
        }

        if (obj.options.url) {
            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'text/html',
                success: function(data) {
                    obj.content.innerHTML = data;

                    if (! obj.options.closed) {
                        obj.open();
                    }
                }
            });
        } else {
            if (! obj.options.closed) {
                obj.open();
            }
        }

        if (! events) {
            current = obj;

            if ('ontouchstart' in document.documentElement === true) {
                document.addEventListener("touchstart", mouseDownControls);
            } else {
                document.addEventListener('mousedown', mouseDownControls);
                document.addEventListener('mousemove', mouseMoveControls);
                document.addEventListener('mouseup', mouseUpControls);
            }

            document.addEventListener('keydown', keyDownControls);

            events = true;
        }

        // Keep object available from the node
        el.modal = obj;

        return obj;
    });

    return P;
})));