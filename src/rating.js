jSuites.rating = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        number:5,
        value:0,
        tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
        onchange:null,
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
    el.classList.add('jrating');

    // Add elements
    for (var i = 0; i < obj.options.number; i++) {
        var div = document.createElement('div');
        div.setAttribute('data-index', (i + 1))
        div.setAttribute('title', obj.options.tooltip[i])
        el.appendChild(div);
    }

    // Set value
    obj.setValue = function(index) {
        for (var i = 0; i < obj.options.number; i++) {
            if (i < index) {
                el.children[i].classList.add('jrating-selected');
            } else {
                el.children[i].classList.remove('jrating-selected');
            }
        }

        obj.options.value = index;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, index);
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    if (obj.options.value) {
        for (var i = 0; i < obj.options.number; i++) {
            if (i < obj.options.value) {
                el.children[i].classList.add('jrating-selected');
            }
        }
    }

    // Events
    el.addEventListener("click", function(e) {
        var index = e.target.getAttribute('data-index');
        if (index == obj.options.value) {
            obj.setValue(0);
        } else {
            obj.setValue(index);
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

    el.rating = obj;

    return obj;
});