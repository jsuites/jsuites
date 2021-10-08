jSuites.picker = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        value: null,
        data: null,
        render: null,
        onchange: null,
        width: null,
        header: true,
        right: false,
        content: false,
    };

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Legacy purpose only
    if (options.options) {
        obj.options.data = options.options;
    }

    // Default value
    if (obj.options.value === null) {
        obj.options.value = Object.keys(obj.options.data)[0];
    }

    var dropdownHeader = null;
    var dropdownContent = null;

    // Class
    el.classList.add('jpicker');
    el.setAttribute('tabindex', '900');

    /**
     * Create floating picker
     */
    obj.init = function() {
        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');

        if (obj.options.header === false) {
            dropdownHeader.style.display = 'none';
        }

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        }

        // Start value
        dropdownHeader.innerHTML = obj.options.value && obj.options.data[obj.options.value] ? obj.options.data[obj.options.value] : '<div><br/></div>';

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.classList.add('jpicker-content');
        el.appendChild(dropdownHeader);
        el.appendChild(dropdownContent);

        // Create items
        var keys = Object.keys(obj.options.data);

        // Go though all options
        for (var i = 0; i < keys.length; i++) {
            // Item
            var dropdownItem = document.createElement('div');
            dropdownItem.k = keys[i];
            dropdownItem.v = obj.options.data[keys[i]];
            // Label
            dropdownItem.innerHTML = obj.getLabel(keys[i]);
            // Onchange
            dropdownItem.onclick = function() {
                // Update label
                obj.setValue(this.k);

                // Call method
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, obj, this.v, this.k);
                }
            }

            // Append
            dropdownContent.appendChild(dropdownItem);
        }

        // Initial value
        obj.setValue(obj.options.value);
    }

    obj.setValue = function(v) {
        if (obj.options.content) {
            var label = '<i class="material-icons">' + obj.options.content + '</i>';
        } else {
            var label = obj.getLabel(v);
        }
        dropdownHeader.innerHTML = label;

        // Update value
        obj.options.value = label;

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getLabel = function(v) {
        var label = obj.options.data[v];
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label);
        }
        return label;
    }

    obj.open = function() {
        // Open picker
        el.classList.add('jpicker-focus');
        el.focus();

        var rectHeader = dropdownHeader.getBoundingClientRect();
        var rectContent = dropdownContent.getBoundingClientRect();

        if (window.innerHeight < rectHeader.bottom + rectContent.height) {
            dropdownContent.style.marginTop = -1 * (rectContent.height + 4) + 'px';
        } else {
            dropdownContent.style.marginTop = rectHeader.height + 2 + 'px';
        }

        if (obj.options.right === true) {
            dropdownContent.style.marginLeft = -1 * rectContent.width + 24 + 'px';
        }
    }

    el.onclick = function() {
        if (! el.classList.contains('jpicker-focus')) {
            obj.open();
        } else {
            el.classList.remove('jpicker-focus')
        }
    }

    el.onblur = function() {
        setTimeout(function() {
            el.classList.remove('jpicker-focus');
        }, 250);
    }

    obj.init();

    // Change
    el.change = obj.setValue;

    // Reference
    el.picker = obj;

    return obj;
});