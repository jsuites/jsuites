import Helpers from '../utils/helpers';
import Tracking from '../utils/tracking';

export default function Picker(el, options) {
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
     * The element passed is a DOM element
     */
    var isDOM = function(o) {
        return (o instanceof Element || o instanceof HTMLDocument);
    }

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
            dropdownItem.classList.add('jpicker-item');
            dropdownItem.setAttribute('role', 'option');
            dropdownItem.k = keys[i];
            dropdownItem.v = obj.options.data[keys[i]];
            // Label
            var item = obj.getLabel(keys[i], dropdownItem);
            if (isDOM(item)) {
                dropdownItem.appendChild(item);
            } else {
                dropdownItem.innerHTML = item;
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
            onmouseover: null,
            onselect: null,
            onopen: null,
            onclose: null,
            onload: null,
            width: null,
            header: true,
            right: false,
            bottom: false,
            content: false,
            columns: null,
            grid: null,
            height: null,
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

        // Height
        if (obj.options.height) {
            dropdownContent.style.maxHeight = obj.options.height + 'px';
            dropdownContent.style.overflow = 'scroll';
        } else {
            dropdownContent.style.overflow = '';
        }

        if (obj.options.columns > 0) {
            if (! obj.options.grid) {
                dropdownContent.classList.add('jpicker-columns');
                dropdownContent.style.width = obj.options.width ? obj.options.width : 36 * obj.options.columns + 'px';
            } else {
                dropdownContent.classList.add('jpicker-grid');
                dropdownContent.style.gridTemplateColumns = 'repeat(' + obj.options.grid + ', 1fr)';
            }
        }

        if (isNaN(parseInt(obj.options.value))) {
            obj.options.value = 0;
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

    obj.setValue = function(k, e) {
        // Set label
        obj.setLabel(k);

        // Update value
        obj.options.value = String(k);

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

        if (dropdownContent.children[k] && dropdownContent.children[k].getAttribute('type') !== 'generic') {
            obj.close();
        }

        // Call method
        if (e) {
            if (typeof (obj.options.onchange) == 'function') {
                var v = obj.options.data[k];

                obj.options.onchange(el, obj, v, v, k, e);
            }
        }
    }

    obj.getLabel = function(v, item) {
        var label = obj.options.data[v] || null;
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label, item);
        }
        return label;
    }

    obj.setLabel = function(v) {
        var item;

        if (obj.options.content) {
            item = document.createElement('i');
            item.textContent = obj.options.content;
            item.classList.add('material-icons');
        } else {
            item = obj.getLabel(v, null);
        }

        // Label
        if (isDOM(item)) {
            dropdownHeader.textContent = '';
            dropdownHeader.appendChild(item);
        } else {
            dropdownHeader.innerHTML = item;
        }
    }

    obj.open = function() {
        if (! el.classList.contains('jpicker-focus')) {
            // Start tracking the element
            Tracking(obj, true);

            // Open picker
            el.classList.add('jpicker-focus');
            el.focus();

            var top = 0;
            var left = 0;

            dropdownContent.style.marginLeft = '';

            var rectHeader = dropdownHeader.getBoundingClientRect();
            var rectContent = dropdownContent.getBoundingClientRect();

            if (window.innerHeight < rectHeader.bottom + rectContent.height || obj.options.bottom) {
                top = -1 * (rectContent.height + 4);
            } else {
                top = rectHeader.height + 4;
            }

            if (obj.options.right === true) {
                left = -1 * rectContent.width + rectHeader.width;
            }

            if (rectContent.left + left < 0) {
                left = left + rectContent.left + 10;
            }
            if (rectContent.left + rectContent.width > window.innerWidth) {
                left = -1 * (10 + rectContent.left + rectContent.width - window.innerWidth);
            }

            dropdownContent.style.marginTop = parseInt(top) + 'px';
            dropdownContent.style.marginLeft = parseInt(left) + 'px';

            //dropdownContent.style.marginTop
            if (typeof obj.options.onopen == 'function') {
                obj.options.onopen(el, obj);
            }
        }
    }

    obj.close = function() {
        if (el.classList.contains('jpicker-focus')) {
            el.classList.remove('jpicker-focus');

            // Start tracking the element
            Tracking(obj, false);

            if (typeof obj.options.onclose == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    /**
     * Destroy the picker instance and release all resources
     */
    obj.destroy = function() {
        // Close if open (removes from tracking)
        obj.close();

        // Remove event listeners
        el.onmousedown = null;
        if (dropdownContent) {
            dropdownContent.onclick = null;
        }

        // Remove created DOM elements
        if (dropdownHeader && dropdownHeader.parentNode) {
            dropdownHeader.parentNode.removeChild(dropdownHeader);
        }
        if (dropdownContent && dropdownContent.parentNode) {
            dropdownContent.parentNode.removeChild(dropdownContent);
        }

        // Remove classes and attributes from el
        el.classList.remove('jpicker');
        el.classList.remove('jpicker-focus');
        el.removeAttribute('role');
        el.removeAttribute('aria-haspopup');
        el.removeAttribute('aria-expanded');
        el.removeAttribute('aria-controls');
        el.removeAttribute('tabindex');

        // Remove instance properties from el
        delete el.picker;
        delete el.value;
        delete el.change;
        delete el.val;

        // Clear options callbacks to release closures
        if (obj.options) {
            obj.options.onchange = null;
            obj.options.onclose = null;
            obj.options.onopen = null;
            obj.options.onload = null;
            obj.options.onselect = null;
            obj.options.onmouseover = null;
            obj.options.render = null;
        }

        // Clear references
        dropdownHeader = null;
        dropdownContent = null;
    }

    /**
     * Create floating picker
     */
    var init = function() {
        let id = Helpers.guid();

        // Class
        el.classList.add('jpicker');
        el.setAttribute('role', 'combobox');
        el.setAttribute('aria-haspopup', 'listbox');
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-controls', id);
        el.setAttribute('tabindex', '0');
        el.onmousedown = function(e) {
            if (! el.classList.contains('jpicker-focus')) {
                obj.open();
            }
        }

        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.setAttribute('id', id);
        dropdownContent.setAttribute('role', 'listbox');
        dropdownContent.classList.add('jpicker-content');
        dropdownContent.onclick = function(e) {
            var item = Helpers.findElement(e.target, 'jpicker-item');
            if (item) {
                if (item.parentNode === dropdownContent) {
                    // Update label
                    obj.setValue(item.k, e);
                }
            }
        }
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

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.picker = obj;
    }

    init();

    return obj;
}