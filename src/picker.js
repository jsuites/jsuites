jSuites.picker = (function(el, options) {
    // Already created, update options
    if (el.picker) {
        return el.picker.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'picker' };
    obj.options = {};

    var dropdownHeader = null;
    var dropdownContent = null;

    /**
     * Create the content options
     */
    var createContent = function() {
        dropdownContent.innerHTML = '';

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
                    obj.options.onchange.call(obj, el, obj, 'reserved', this.v, this.k);
                }
            }

            // Append
            dropdownContent.appendChild(dropdownItem);
        }
    }

    /**
     * Set or reset the options for the picker
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            value: 0,
            data: null,
            render: null,
            onchange: null,
            onselect: null,
            onopen: null,
            onclose: null,
            onload: null,
            width: null,
            header: true,
            right: false,
            content: false,
            columns: null,
        }

        // Legacy purpose only
        if (options && options.options) {
            options.data = options.options;
        }

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Start using the options
        if (obj.options.header === false) {
            dropdownHeader.style.display = 'none';
        } else {
            dropdownHeader.style.display = '';
        }

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        } else {
            dropdownHeader.style.width = '';
        }

        if (obj.options.columns > 0) {
            dropdownContent.classList.add('jpicker-columns');
            dropdownContent.style.width =  obj.options.width ? obj.options.width : 36 * obj.options.columns + 'px';
        }

        if (isNaN(obj.options.value)) {
            obj.options.value = '0';
        }

        // Create list from data
        createContent();

        // Set value
        obj.setValue(obj.options.value);

        // Set options all returns the own instance
        return obj;
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    obj.setValue = function(v) {
        // Set label
        obj.setLabel(v);

        // Update value
        obj.options.value = String(v);

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

        if (dropdownContent.children[v].getAttribute('type') !== 'generic') {
            obj.close();
        }
    }

    obj.getLabel = function(v) {
        var label = obj.options.data[v] || null;
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label);
        }
        return label;
    }

    obj.setLabel = function(v) {
        if (obj.options.content) {
            var label = '<i class="material-icons">' + obj.options.content + '</i>';
        } else {
            var label = obj.getLabel(v);
        }

        dropdownHeader.innerHTML = label;
    }

    obj.open = function() {
        if (! el.classList.contains('jpicker-focus')) {
            // Start tracking the element
            jSuites.tracking(obj, true);

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

            if (typeof obj.options.onopen == 'function') {
                obj.options.onopen(el, obj);
            }
        }
    }

    obj.close = function() {
        if (el.classList.contains('jpicker-focus')) {
            el.classList.remove('jpicker-focus');

            // Start tracking the element
            jSuites.tracking(obj, false);

            if (typeof obj.options.onclose == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    /**
     * Create floating picker
     */
    var init = function() {
        // Class
        el.classList.add('jpicker');
        el.setAttribute('tabindex', '900');

        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');
        dropdownHeader.onmouseup = function(e) {
            if (! el.classList.contains('jpicker-focus')) {
                obj.open();
            } else {
                obj.close();
            }
        }

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.classList.add('jpicker-content');

        // Append content and header
        el.appendChild(dropdownHeader);
        el.appendChild(dropdownContent);

        // Default value
        el.value = options.value || 0;

        // Set options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change
        el.change = obj.setValue;

        // Reference
        el.picker = obj;
    }

    init();

    return obj;
});