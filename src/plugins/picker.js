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

    const handleKeyDown = function(e) {
        console.log(e.target)
        if (!e.target.classList.contains('jpicker')) {
            return;
        }

        if (!e.target.classList.contains('jpicker-focus')) {
            return;
        }
        
        e.stopPropagation();

        let hover = el.querySelector('.jpicker-hover')

        const moveHover = (direction) => {
            if (!hover) {
                dropdownContent.children[0].classList.add('jpicker-hover');
            } else {
                const nextHovered = direction === 'left' || direction === 'up' ? hover.previousElementSibling : hover.nextElementSibling;
                if (nextHovered) {
                    hover.classList.remove('jpicker-hover');
                    nextHovered.classList.add('jpicker-hover');
                }
            }
        };

        if (e.key === 'Enter') {
            if (hover) {                    
                const mousedownEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                
                hover.dispatchEvent(mousedownEvent);
                hover.click();

                hover.classList.remove('jpicker-hover');
            }
        } else if (e.key === 'ArrowUp') {
            moveHover('up')
        } else if (e.key === 'ArrowDown') {
            moveHover('down')
        } else if (e.key === 'ArrowRight') {
            moveHover('right')
        } else if (e.key === 'ArrowLeft') {
            moveHover('left')
        }
    };

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
            item = '<i class="material-icons">' + obj.options.content + '</i>';
        } else {
            item = obj.getLabel(v, null);
        }
        // Label
        if (isDOM(item)) {
            dropdownHeader.innerHTML = '';
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

            el.addEventListener('keydown', handleKeyDown);
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

        el.removeEventListener('keydown', handleKeyDown);
    }

    /**
     * Create floating picker
     */
    var init = function() {
        // Class
        el.classList.add('jpicker');
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