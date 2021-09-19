;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Rating = factory();
}(this, (function () {

    var P = (function (el, options) {
        // Already created, update options
        if (el.rating) {
            return el.rating.setOptions(options, true);
        }

        // New instance
        var obj = {};
        obj.options = {};

        obj.setOptions = function (options, reset) {
            // Default configuration
            var defaults = {
                number: 5,
                value: 0,
                tooltip: ['Very bad', 'Bad', 'Average', 'Good', 'Very good'],
                onchange: null,
            };

            // Loop through the initial configuration
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof (obj.options[property]) == 'undefined' || reset === true) {
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
        obj.setValue = function (index) {
            for (var i = 0; i < obj.options.number; i++) {
                if (i < index) {
                    el.children[i].classList.add('jrating-selected');
                } else {
                    el.children[i].classList.remove('jrating-over');
                    el.children[i].classList.remove('jrating-selected');
                }
            }

            obj.options.value = index;

            if (typeof (obj.options.onchange) == 'function') {
                obj.options.onchange(el, index);
            }

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof (el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        obj.getValue = function () {
            return obj.options.value;
        }

        var init = function () {
            // Start plugin
            obj.setOptions(options);

            // Class
            el.classList.add('jrating');

            // Events
            el.addEventListener("click", function (e) {
                var index = e.target.getAttribute('data-index');
                if (index != undefined) {
                    if (index == obj.options.value) {
                        obj.setValue(0);
                    } else {
                        obj.setValue(index);
                    }
                }
            });

            el.addEventListener("mouseover", function (e) {
                var index = e.target.getAttribute('data-index');
                for (var i = 0; i < obj.options.number; i++) {
                    if (i < index) {
                        el.children[i].classList.add('jrating-over');
                    } else {
                        el.children[i].classList.remove('jrating-over');
                    }
                }
            });

            el.addEventListener("mouseout", function (e) {
                for (var i = 0; i < obj.options.number; i++) {
                    el.children[i].classList.remove('jrating-over');
                }
            });

            // Change
            el.change = obj.setValue;

            // Global generic value handler
            el.val = function (val) {
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
    });

    return P;
})));