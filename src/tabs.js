jSuites.tabs = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
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
    el.classList.add('jtabs');

    // Elements
    var headers = el.children[0];
    var content = el.children[1];
    headers.classList.add('jtabs-headers');
    content.classList.add('jtabs-content');

    // Set value
    obj.open = function(index) {
        for (var i = 0; i < headers.children.length; i++) {
            headers.children[i].classList.remove('jtabs-selected');
            content.children[i].classList.remove('jtabs-selected');
        }

        headers.children[index].classList.add('jtabs-selected');
        content.children[index].classList.add('jtabs-selected');
    }

    // Events
    headers.addEventListener("click", function(e) {
        var index = Array.prototype.indexOf.call(headers.children, e.target);
        if (index >= 0) {
            obj.open(index);
        }
    });

    obj.open(0);

    el.tabs = obj;

    return obj;
});