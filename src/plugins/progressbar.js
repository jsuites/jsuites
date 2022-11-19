jSuites.progressbar = (function(el, options) {
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
});