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
    el.classList.add('jpicker');

    /**
     * Create floating picker
     */
    obj.init = function() {
        // Dropdown Header
        var dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');
        dropdownHeader.setAttribute('tabindex', '900');

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        }

        // Start value
        dropdownHeader.innerHTML = obj.options.value && obj.options.data[obj.options.value] ? obj.options.data[obj.options.value] : '<div><br/></div>';
        dropdownHeader.onclick = function(e) {
            // Open picker
            el.classList.add('jpicker-focus');

            const rectHeader = dropdownHeader.getBoundingClientRect();
            const rectContent = dropdownContent.getBoundingClientRect();

            if (window.innerHeight < rectHeader.bottom + rectContent.height) {
                dropdownContent.style.marginTop = -1 * (rectContent.height + 4) + 'px';
            } else {
                dropdownContent.style.marginTop = rectHeader.height + 2 + 'px';
            }
        }
        dropdownHeader.onblur = function() {
            setTimeout(function() {
                el.classList.remove('jpicker-focus');
            }, 250);
        }

        // Dropdown content
        var dropdownContent = document.createElement('div');
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

            // Render type
            if (typeof(obj.options.render) == 'function') {
                var label = obj.options.render(obj.options.data[keys[i]]);
            } else {
                var label = obj.options.data[keys[i]];
            }
            dropdownItem.innerHTML = label;

            // Onchange
            dropdownItem.onclick = function() {
                // Update label
                dropdownHeader.innerHTML = this.innerHTML;
                // Call method
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, obj, this.v, this.k);
                }
            }

            // Append
            dropdownContent.appendChild(dropdownItem);
        }
    }

    obj.init();

    el.picker = obj;

    return obj;
});
