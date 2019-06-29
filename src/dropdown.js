/**
 * (c) 2013 jDropdown
 * http://www.github.com/paulhodel/jdropdown
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Custom dropdowns
 */

jSuites.dropdown = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.items = [];
    obj.groups = [];

    if (options) {
        obj.options = options;
    }

    // Global container
    if (! jSuites.dropdown.current) {
        jSuites.dropdown.current = null;
    }

    // Default configuration
    var defaults = {
        data: [],
        multiple: false,
        autocomplete: false,
        type:null,
        width:null,
        opened:false,
        onchange:null,
        onopen:null,
        onclose:null,
        onblur:null,
        value:null,
        placeholder:'',
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Create dropdown
    el.classList.add('jdropdown');
 
    if (obj.options.type == 'searchbar') {
        el.classList.add('jdropdown-searchbar');
    } else if (obj.options.type == 'list') {
        el.classList.add('jdropdown-list');
    } else if (obj.options.type == 'picker') {
        el.classList.add('jdropdown-picker');
    } else {
        if (jSuites.getWindowWidth() < 800) {
            el.classList.add('jdropdown-picker');
            obj.options.type = 'picker';
        } else {
            if (obj.options.width) {
                el.style.width = obj.options.width;
            }
            el.classList.add('jdropdown-default');
            obj.options.type = 'default';
        }
    }

    // Header container
    var containerHeader = document.createElement('div');
    containerHeader.className = 'jdropdown-container-header';

    // Header
    var header = document.createElement('input');
    header.className = 'jdropdown-header';
    if (typeof(obj.options.onblur) == 'function') {
        header.onblur = function() {
            obj.options.onblur(el);
        }
    }

    // Container
    var container = document.createElement('div');
    container.className = 'jdropdown-container';

    // Dropdown content
    var content = document.createElement('div');
    content.className = 'jdropdown-content';

    // Close button
    var closeButton  = document.createElement('div');
    closeButton.className = 'jdropdown-close';
    closeButton.innerHTML = 'Done';

    // Create backdrop
    var backdrop  = document.createElement('div');
    backdrop.className = 'jdropdown-backdrop';

    // Autocomplete
    if (obj.options.autocomplete == true) {
        el.setAttribute('data-autocomplete', true);

        // Handler
        header.addEventListener('keyup', function(e) {
            obj.find(header.value);
        });
    } else {
        header.setAttribute('readonly', 'readonly');
    }

    // Place holder
    if (obj.options.placeholder) {
        header.setAttribute('placeholder', obj.options.placeholder);
    }

    // Append elements
    containerHeader.appendChild(header);
    container.appendChild(closeButton);
    container.appendChild(content);
    el.appendChild(containerHeader);
    el.appendChild(container);
    el.appendChild(backdrop);

    obj.init = function() {
        if (obj.options.url) {
            fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
                .then(function(data) {
                    data.json().then(function(data) {
                        if (data) {
                            obj.options.data = data;
                            obj.setData();
                        }
                    })
                });
        } else {
            obj.setData();
        }

        // Values
        obj.setValue(obj.options.value);

        if (obj.options.opened == true) {
            obj.open();
        }

        // Fix width - Workaround important to get the correct width
        if (obj.options.type == 'default') {
            setTimeout(function() {
                container.style.minWidth = header.outerWidth;
            }, 0);
        }
    }

    obj.setUrl = function(url) {
        obj.options.url = url;
        fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    obj.setData(data);
                })
            });
    }

    obj.setData = function(data) {
        if (data) {
            obj.options.data = data;
        } else {
            var data = obj.options.data;
        }

        // Make sure the content container is blank
        content.innerHTML = '';

        // Containers
        var items = [];
        var groups = [];

        // Foreach in the data to create all items
        if (data.length) {
            data.forEach(function(v, k) {
                // Compatibility
                if (typeof(v) != 'object') {
                    var value = v;
                    v = {}
                    v.id = value;
                    v.name = value;

                    // Fix array
                    obj.options.data[k] = v;
                }

                // Create item
                items[k] = document.createElement('div');
                items[k].className = 'jdropdown-item';
                items[k].value = v.id;
                items[k].text = v.name;

                // Image
                if (v.image) {
                    var image = document.createElement('img');
                    image.className = 'jdropdown-image';
                    image.src = v.image;
                    if (! v.title) {
                       image.classList.add('jdropdown-image-small');
                    }
                    items[k].appendChild(image);
                }

                // Set content
                var node = document.createElement('div');
                node.className = 'jdropdown-description';
                node.innerHTML = v.name;
                items[k].appendChild(node);

                // Title
                if (v.title) {
                    var title = document.createElement('div');
                    title.className = 'jdropdown-title';
                    title.innerHTML = v.title;
                    node.appendChild(title);
                }

                // Append to the container
                if (v.group) {
                    if (! groups[v.group]) {
                        groups[v.group] = document.createElement('div');
                        groups[v.group].className = 'jdropdown-group-items';
                    }
                    groups[v.group].appendChild(items[k]);
                } else {
                    content.appendChild(items[k]);
                }
            });

            // Append groups in case exists
            if (Object.keys(groups).length > 0) {
                Object.keys(groups).forEach(function(v, k) {
                    var group = document.createElement('div');
                    group.className = 'jdropdown-group';
                    group.innerHTML = '<div class="jdropdown-group-name">' + v + '<i class="jdropdown-group-arrow jdropdown-group-arrow-down"></i></div>';
                    group.appendChild(groups[v]);
                    obj.groups.push(group);
                    content.appendChild(group);
                });
            }

            // Add index property
            var items = content.querySelectorAll('.jdropdown-item');
            [...items].forEach(function(v, k) {
                obj.items[k] = v;
                v.setAttribute('data-index', k);
            });
        }

        // Reset value
        obj.setValue(obj.options.value ? obj.options.value : '');
    }

    obj.getText = function(asArray) {
        // Result
        var result = [];
        // Get selected items
        var items = el.querySelectorAll('.jdropdown-selected');
        // Append options
        [...items].forEach(function(v) {
            result.push(v.text);
        });

        if (asArray) {
            return result
        } else {
            return result.join('; ');
        }
    }

    obj.getValue = function(asArray) {
        // Result
        var result = [];
        // Get selected items
        var items = el.querySelectorAll('.jdropdown-selected');
        // Append options
        [...items].forEach(function(v) {
            result.push(v.value);
        });

        if (asArray) {
            return result;
        } else {
            return result.join(';');
        }
    }

    obj.setValue = function(value) {
        // Remove values
        var items = el.querySelectorAll('.jdropdown-selected');
        for (var j = 0; j < items.length; j++) {
            items[j].classList.remove('jdropdown-selected')
        } 

        // Set values
        if (value) {
            if (typeof(value.forEach) == 'function') {
                for (var i = 0; i < obj.items.length; i++) {
                    value.forEach(function(val) {
                        if (obj.items[i].value == val) {
                            obj.items[i].classList.add('jdropdown-selected');
                        }
                    });
                }
            } else {
                for (var i = 0; i < obj.items.length; i++) {
                    if (obj.items[i].value == value) {
                        obj.items[i].classList.add('jdropdown-selected');
                    }
                }
            }
        }

        // Update labels
        obj.updateLabel();
    }

    obj.selectIndex = function(index) {
        // Focus behaviour
        if (! obj.options.multiple) {
            // Update selected item
            obj.items.forEach(function(v) {
                v.classList.remove('jdropdown-cursor');
                v.classList.remove('jdropdown-selected');
            });
            obj.items[index].classList.add('jdropdown-selected');
            obj.items[index].classList.add('jdropdown-cursor');
            // Close
            obj.close();
        } else {
            // Toggle option
            if (obj.items[index].classList.contains('jdropdown-selected')) {
                obj.items[index].classList.remove('jdropdown-selected');
                obj.items[index].classList.remove('jdropdown-cursor');
            } else {
                obj.items.forEach(function(v) {
                    v.classList.remove('jdropdown-cursor');
                });
                obj.items[index].classList.add('jdropdown-selected');
                obj.items[index].classList.add('jdropdown-cursor');
            }
            // Update cursor position
            obj.currentIndex = index;

            // Update labels for multiple dropdown
            if (! obj.options.autocomplete) {
                obj.updateLabel();
            }
        }

        // Events
        if (typeof(obj.options.onchange) == 'function') {
            var oldValue = obj.getValue();
            var newValue = obj.items[index].value;

            obj.options.onchange(el, index, oldValue, newValue);
        }
    }

    obj.selectItem = function(item) {
        var index = item.getAttribute('data-index');
        if (jSuites.dropdown.current) {
            obj.selectIndex(item.getAttribute('data-index'));
        } else {
            // List
            if (obj.options.type == 'list') {
                if (! obj.options.multiple) {
                    obj.items.forEach(function(k, v) {
                        v.classList.remove('jdropdown-cursor');
                        v.classList.remove('jdropdown-selected');
                    });
                    obj.items[index].classList.add('jdropdown-selected');
                    obj.items[index].classList.add('jdropdown-cursor');
                } else {
                    // Toggle option
                    if (obj.items[index].classList.contains('jdropdown-selected')) {
                        obj.items[index].classList.remove('jdropdown-selected');
                        obj.items[index].classList.remove('jdropdown-cursor');
                    } else {
                        obj.items.forEach(function(v) {
                            v.classList.remove('jdropdown-cursor');
                        });
                        obj.items[index].classList.add('jdropdown-selected');
                        obj.items[index].classList.add('jdropdown-cursor');
                    }
                    // Update cursor position
                    obj.currentIndex = index;
                }
            }
        }
    }

    obj.find = function(str) {
        // Append options
        for (var i = 0; i < obj.items.length; i++) {
            if (str == null || obj.items[i].classList.contains('jdropdown-selected') || obj.items[i].innerHTML.toLowerCase().indexOf(str.toLowerCase()) != -1) {
                obj.items[i].style.display = '';
            } else {
                obj.items[i].style.display = 'none';
            }
        };

        var numVisibleItems = function(items) {
            var visible = 0;
            for (var j = 0; j < items.length; j++) {
                if (items[j].style.display != 'none') {
                    visible++;
                }
            }
            return visible;
        }

        // Hide groups
        for (var i = 0; i < obj.groups.length; i++) {
            if (numVisibleItems(obj.groups[i].querySelectorAll('.jdropdown-item'))) {
                obj.groups[i].children[0].style.display = '';
            } else {
                obj.groups[i].children[0].style.display = 'none';
            }
        }
    }

    obj.updateLabel = function() {
        // Update label
        header.value = obj.getText();
    }

    obj.open = function() {
        if (jSuites.dropdown.current != el) {
            if (jSuites.dropdown.current) {
                jSuites.dropdown.current.dropdown.close();
            }
            jSuites.dropdown.current = el;
        }

        // Focus
        if (! el.classList.contains('jdropdown-focus')) {
            // Add focus
            el.classList.add('jdropdown-focus');

            // Animation
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.type == null || obj.options.type == 'picker') {
                    container.classList.add('slide-bottom-in');
                }
            }

            // Filter
            if (obj.options.autocomplete == true) {
                // Redo search
                obj.find();
                // Clear search field
                header.value = '';
                header.focus();
            }

            // Selected
            var selected = el.querySelector('.jdropdown-selected');
            // Update cursor position
            if (selected) {
                obj.updateCursor(selected.getAttribute('data-index'));
            }
            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                const rect = el.getBoundingClientRect();
                const rectContainer = container.getBoundingClientRect();
                container.style.minWidth = rect.width + 'px';
                container.style.maxWidth = '100%';

                if (obj.options.position) {
                    container.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = (rect.top - rectContainer.height - 2) + 'px';
                    } else {
                        container.style.top = (rect.top + rect.height + 1) + 'px';
                    }
                } else {
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = (-1 * (rectContainer.height)) + 'px';
                    } else {
                        container.style.top = '';
                    }
                }
            }
        }

        // Events
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function(ignoreEvents) {
        if (jSuites.dropdown.current) {
            // Remove controller
            jSuites.dropdown.current = null
            // Remove cursor
            var cursor = el.querySelector('.jdropdown-cursor');
            if (cursor) {
                cursor.classList.remove('jdropdown-cursor');
            }
            // Update labels
            obj.updateLabel();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Reset
            obj.currentIndex = null;
            // Blur
            header.blur();
            // Remove focus
            el.classList.remove('jdropdown-focus');
        }

        return obj.getValue();
    }

    obj.reset = function() {
        // Remove current cursor
        var cursor = el.querySelector('.jdropdown-cursor');
        if (cursor) {
            cursor.classList.remove('jdropdown-cursor');
        }
        // Unselected all
        obj.items.forEach(function(v) {
            v.classList.remove('jdropdown-selected');
        });
        // Update labels
        obj.updateLabel();
    }

    obj.first = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items[i].style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.last = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.options.data.length; i++) {
            if (obj.items[i].style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.next = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.options.data.length; i++) {
            if (obj.items[i].style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.prev = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items[i].style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.updateCursor = function(index) {
        // Update cursor
        if (obj.items[obj.currentIndex]) {
            obj.items[obj.currentIndex].classList.remove('jdropdown-cursor');
        }
        if (obj.items && obj.items[index]) {
            obj.items[index].classList.add('jdropdown-cursor');

            // Update position
            obj.currentIndex = parseInt(index);
    
            // Update scroll
            var container = content.scrollTop;
            var element = obj.items[obj.currentIndex];
            content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
        }
    }

    if (! jSuites.dropdown.hasEvents) {
        document.addEventListener('click', jSuites.dropdown.onclick);
        document.addEventListener('keydown', jSuites.dropdown.onkeydown);

        jSuites.dropdown.hasEvents = true;
    }

    // Start dropdown
    obj.init();

    // Keep object available from the node
    el.dropdown = obj;

    return obj;
});

jSuites.dropdown.onclick = function(e) {
    var element = jSuites.getElement(e.target, 'jdropdown');
    if (element) {
        var dropdown = element.dropdown;
        if (e.target.classList.contains('jdropdown-header')) {
            if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                dropdown.close();
            } else {
                dropdown.open();
            }
        } else if (e.target.classList.contains('jdropdown-group-name')) {
            var items = e.target.nextSibling.children;
            if (e.target.nextSibling.style.display != 'none') {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].style.display != 'none') {
                        dropdown.selectItem(items[i]);
                    }
                }
            }
        } else if (e.target.classList.contains('jdropdown-group-arrow')) {
            if (e.target.classList.contains('jdropdown-group-arrow-down')) {
                e.target.classList.remove('jdropdown-group-arrow-down');
                e.target.classList.add('jdropdown-group-arrow-up');
                e.target.parentNode.nextSibling.style.display = 'none';
            } else {
                e.target.classList.remove('jdropdown-group-arrow-up');
                e.target.classList.add('jdropdown-group-arrow-down');
                e.target.parentNode.nextSibling.style.display = '';
            }
        } else if (e.target.classList.contains('jdropdown-item')) {
            dropdown.selectItem(e.target);
        } else if (e.target.classList.contains('jdropdown-image')) {
            dropdown.selectIndex(e.target.parentNode.getAttribute('data-index'));
        } else if (e.target.classList.contains('jdropdown-description')) {
            dropdown.selectIndex(e.target.parentNode.getAttribute('data-index'));
        } else if (e.target.classList.contains('jdropdown-title')) {
            dropdown.selectIndex(e.target.parentNode.parentNode.getAttribute('data-index'));
        } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
            // Close
            dropdown.close();
        }

        e.stopPropagation();
        e.preventDefault();
    } else {
        if (jSuites.dropdown.current) {
            jSuites.dropdown.current.dropdown.close();
        }
    }
}


// Keydown controls
jSuites.dropdown.onkeydown = function(e) {
    if (jSuites.dropdown.current) {
        // Element
        var element = jSuites.dropdown.current.dropdown;
        // Index
        var index = element.currentIndex;

        if (e.shiftKey) {

        } else {
            if (e.which == 13 || e.which == 35 || e.which == 36 || e.which == 38 || e.which == 40) {
                // Move cursor
                if (e.which == 13) {
                    element.selectIndex(index)
                } else if (e.which == 38) {
                    if (index == null) {
                        element.updateCursor(0);
                    } else if (index > 0) {
                        element.prev();
                    }
                } else if (e.which == 40) {
                    if (index == null) {
                        element.updateCursor(0);
                    } else if (index + 1 < element.options.data.length) {
                        element.next();
                    }
                } else if (e.which == 36) {
                    element.first();
                } else if (e.which == 35) {
                    element.last();
                }

                e.stopPropagation();
                e.preventDefault();
            }
        }
    }
}