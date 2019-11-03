jSuites.search = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        placeholder: 'Search',
        onchange: null
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
    el.classList.add('jsearch');

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', obj.options.placeholder);

    input.addEventListener("keypress", function(e) {
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(e, input.value);
        }
    });

    input.addEventListener("focus", function(e) {
        //document.body.appendChild(jSuites.backdrop);
    });

    input.addEventListener("blur", function(e) {
        //document.body.removeChild(jSuites.backdrop);
    });

    el.appendChild(input);

    el.search = obj;

    return obj;
});