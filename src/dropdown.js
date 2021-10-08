jSuites.dropdown = (function(el, options) {
    var obj = {};
    obj.options = {};

    // If the element is a SELECT tag, create a configuration object
    if (el.tagName == 'SELECT') {
        var ret = jSuites.dropdown.extractFromDom(el, options);
        el = ret.el;
        options = ret.options;
    }

    // Default configuration
    var defaults = {
        url: null,
        data: [],
        multiple: false,
        autocomplete: false,
        type: null,
        width: null,
        opened: false,
        value: null,
        placeholder: '',
        position: false,
        onchange: null,
        onload: null,
        onopen: null,
        onclose: null,
        onblur: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Global container
    if (! jSuites.dropdown.current) {
        jSuites.dropdown.current = null;
    }

    // Containers
    obj.items = [];
    obj.groups = [];
    obj.selected = [];

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
                el.style.minWidth = obj.options.width;
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
        var keyTimer = null;
        header.addEventListener('keyup', function(e) {
            if (keyTimer) {
                clearTimeout(keyTimer);
            }
            keyTimer = setTimeout(function() {
                obj.find(header.value);
                keyTimer = null;
            }, 500);

            if (! el.classList.contains('jdropdown-focus')) {
                if (e.which > 65) {
                    obj.open();
                }
            }
        });
    } else {
        header.setAttribute('readonly', 'readonly');
    }

    // Place holder
    if (! obj.options.placeholder && el.getAttribute('placeholder')) {
        obj.options.placeholder = el.getAttribute('placeholder');
    }

    if (obj.options.placeholder) {
        header.setAttribute('placeholder', obj.options.placeholder);
    }

    // Append elements
    containerHeader.appendChild(header);
    if (obj.options.type == 'searchbar') {
        containerHeader.appendChild(closeButton);
    } else {
        container.appendChild(closeButton);
    }
    container.appendChild(content);
    el.appendChild(containerHeader);
    el.appendChild(container);
    el.appendChild(backdrop);

    /**
     * Init dropdown
     */
    obj.init = function() {
        if (obj.options.url) {
            jSuites.ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data) {
                        // Set data
                        obj.setData(data);
                        // Set value
                        if (obj.options.value != null) {
                            obj.setValue(obj.options.value);
                        }
                        // Onload method
                        if (typeof(obj.options.onload) == 'function') {
                            obj.options.onload(el, obj, data);
                        }
                    }
                }
            });
        } else {
            // Set data
            obj.setData();
            // Set value
            if (obj.options.value != null) {
                obj.setValue(obj.options.value);
            }
            // Onload
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data);
            }
        }

        // Open dropdown
        if (obj.options.opened == true) {
            obj.open();
        }
    }

    obj.getUrl = function() {
        return obj.options.url;
    }

    obj.setUrl = function(url) {
        obj.options.url = url;

        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                obj.setData(data);
            }
        });
    }

    /**
     * Create a new item
     */
    obj.createItem = function(data) {
        // Create item
        var item = {};
        item.element = document.createElement('div');
        item.element.className = 'jdropdown-item';
        item.value = data.id;
        item.text = data.name;
        item.textLowerCase = '' + data.name.toLowerCase();

        // Image
        if (data.image) {
            var image = document.createElement('img');
            image.className = 'jdropdown-image';
            image.src = data.image;
            if (! data.title) {
               image.classList.add('jdropdown-image-small');
            }
            item.element.appendChild(image);
        }

        // Set content
        var node = document.createElement('div');
        node.className = 'jdropdown-description';
        node.innerHTML = data.name;

        // Title
        if (data.title) {
            var title = document.createElement('div');
            title.className = 'jdropdown-title';
            title.innerHTML = data.title;
            node.appendChild(title);
        }

        // Add node to item
        item.element.appendChild(node);

        return item;
    }

    obj.setData = function(data) {
        // Update data
        if (data) {
            obj.options.data = data;
        }

        // Data
        var data = obj.options.data;

        // Remove content from the DOM
        container.removeChild(content);

        // Make sure the content container is blank
        content.innerHTML = '';

        // Reset
        obj.reset();

        // Reset items
        obj.items = [];

        // Helpers
        var items = [];
        var groups = [];

        // Create elements
        if (data.length) {
            // Prepare data
            for (var i = 0; i < data.length; i++) {
                // Compatibility
                if (typeof(data[i]) != 'object') {
                    // Correct format
                    obj.options.data[i] = data[i] = { id: data[i], name: data[i] };
                }

                // Process groups
                if (data[i].group) {
                    if (! groups[data[i].group]) {
                        groups[data[i].group] = [];
                    }
                    groups[data[i].group].push(i);
                } else {
                    items.push(i);
                }
            }

            // Groups
            var groupNames = Object.keys(groups);

            // Append groups in case exists
            if (groupNames.length > 0) {
                for (var i = 0; i < groupNames.length; i++) {
                    // Group container
                    var group = document.createElement('div');
                    group.className = 'jdropdown-group';
                    // Group name
                    var groupName = document.createElement('div');
                    groupName.className = 'jdropdown-group-name';
                    groupName.innerHTML = groupNames[i];
                    // Group arrow
                    var groupArrow = document.createElement('i');
                    groupArrow.className = 'jdropdown-group-arrow jdropdown-group-arrow-down';
                    groupName.appendChild(groupArrow);
                    // Group items
                    var groupContent = document.createElement('div');
                    groupContent.className = 'jdropdown-group-items';
                    for (var j = 0; j < groups[groupNames[i]].length; j++) {
                        var item = obj.createItem(data[groups[groupNames[i]][j]]);
                        groupContent.appendChild(item.element);
                        // Items
                        obj.items.push(item);
                    }
                    // Group itens
                    group.appendChild(groupName);
                    group.appendChild(groupArrow);
                    group.appendChild(groupContent);
                    content.appendChild(group);
                }
            }

            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = obj.createItem(data[items[i]]);
                    obj.items.push(item);
                    content.appendChild(item.element);
                }
            }

            // Create the Indexes
            for (var i = 0; i < obj.items.length; i++) {
                obj.items[i].element.setAttribute('data-index', i);
            }
        }

        // Re-insert the content to the container
        container.appendChild(content);
    }

    obj.getText = function(asArray) {
        // Result
        var result = [];
        // Append options
        for (var i = 0; i < obj.selected.length; i++) {
            if (obj.items[obj.selected[i]]) {
                result.push(obj.items[obj.selected[i]].text);
            }
        }

        if (asArray) {
            return result;
        } else {
            return result.join('; ');
        }
    }

    obj.getValue = function(asArray) {
        // Result
        var result = [];
        // Append options
        for (var i = 0; i < obj.selected.length; i++) {
            if (obj.items[obj.selected[i]]) {
                result.push(obj.items[obj.selected[i]].value);
            }
        }

        if (asArray) {
            return result;
        } else {
            return result.join(';');
        }
    }

    obj.setValue = function(value) {
        // Remove values
        for (var i = 0; i < obj.selected.length; i++) {
            obj.items[obj.selected[i]].element.classList.remove('jdropdown-selected')
        } 

        // Reset selected
        obj.selected = [];

        // Set values
        if (value != null) {
            if (Array.isArray(value)) {
                for (var i = 0; i < obj.items.length; i++) {
                    for (var j = 0; j < value.length; j++) {
                        if (obj.items[i].value == value[j]) {
                            // Keep index of the selected item
                            obj.selected.push(i);
                            // Visual selection
                            obj.items[i].element.classList.add('jdropdown-selected');
                        }
                    }
                }
            } else {
                for (var i = 0; i < obj.items.length; i++) {
                    if (obj.items[i].value == value) {
                        // Keep index of the selected item
                        obj.selected.push(i);
                        // Visual selection
                        obj.items[i].element.classList.add('jdropdown-selected');
                    }
                }
            }
        }

        // Update labels
        obj.updateLabel();
    }

    obj.selectIndex = function(index) {
        // Only select those existing elements
        if (obj.items && obj.items[index]) {
            var index = index = parseInt(index);
            // Current selection
            var oldValue = obj.getValue();
            var oldLabel = obj.getText();

            // Remove cursor style
            if (obj.currentIndex != null) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
            // Set cursor style
            obj.items[index].element.classList.add('jdropdown-cursor');

            // Update cursor position
            obj.currentIndex = index;

            // Focus behaviour
            if (! obj.options.multiple) {
                // Unselect option
                if (obj.items[index].element.classList.contains('jdropdown-selected')) {
                    // Reset selected
                    obj.resetSelected();
                } else {
                    // Reset selected
                    obj.resetSelected();
                    // Update selected item
                    obj.items[index].element.classList.add('jdropdown-selected');
                    // Add to the selected list
                    obj.selected.push(index);
                    // Close
                    obj.close();
                }
            } else {
                // Toggle option
                if (obj.items[index].element.classList.contains('jdropdown-selected')) {
                    obj.items[index].element.classList.remove('jdropdown-selected');
                    // Remove from selected list
                    var indexToRemove = obj.selected.indexOf(index);
                    // Remove select
                    obj.selected.splice(indexToRemove, 1);
                } else {
                    // Select element
                    obj.items[index].element.classList.add('jdropdown-selected');
                    // Add to the selected list
                    obj.selected.push(index);
                }

                // Update labels for multiple dropdown
                if (! obj.options.autocomplete) {
                    obj.updateLabel();
                }
            }

            // Current selection
            var newValue = obj.getValue();
            var newLabel = obj.getText();

            // Events
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, index, oldValue, newValue, oldLabel, newLabel);
            }
        }
    }

    obj.selectItem = function(item) {
        if (jSuites.dropdown.current) {
            var index = item.getAttribute('data-index');
            if (index != null) {
                obj.selectIndex(index);
            }
        }
    }

    obj.find = function(str) {
        // Force lowercase
        var str = str ? str.toLowerCase() : null;

        // Append options
        for (var i = 0; i < obj.items.length; i++) {
            if (str == null || obj.items[i].textLowerCase.indexOf(str) != -1) {
                obj.items[i].element.style.display = '';
            } else {
                if (obj.selected.indexOf(i) == -1) {
                    obj.items[i].element.style.display = 'none';
                } else {
                    obj.items[i].element.style.display = '';
                }
            }
        }

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
        /*for (var i = 0; i < obj.groups.length; i++) {
            if (numVisibleItems(obj.groups[i].querySelectorAll('.jdropdown-item'))) {
                obj.groups[i].children[0].style.display = '';
            } else {
                obj.groups[i].children[0].style.display = 'none';
            }
        }*/
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
                    jSuites.slideBottom(container, 1);
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

            // Set cursor for the first or first selected element
            var cursor = (obj.selected && obj.selected[0]) ? obj.selected[0] : 0;
            obj.updateCursor(cursor);

            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                const rect = el.getBoundingClientRect();
                const rectContainer = container.getBoundingClientRect();

                if (obj.options.position) {
                    container.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = '';
                        container.style.bottom = (window.innerHeight - rect.top ) + 1 + 'px';
                    } else {
                        container.style.top = rect.bottom + 'px';
                        container.style.bottom = '';
                    }
                    container.style.left = rect.left + 'px';
                } else {
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = '';
                        container.style.bottom = rect.height + 1 + 'px';
                    } else {
                        container.style.top = '';
                        container.style.bottom = '';
                    }
                }

                container.style.minWidth = rect.width + 'px';
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
            obj.resetCursor();
            // Update labels
            obj.updateLabel();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Blur
            if (header.blur) {
                header.blur();
            }
            // Remove focus
            el.classList.remove('jdropdown-focus');
        }

        return obj.getValue();
    }

    /**
     * Update position cursor
     */
    obj.updateCursor = function(index) {
        // Set new cursor
        if (obj.items && obj.items[index] && obj.items[index].element) {
            // Reset cursor
            obj.resetCursor();

            // Set new cursor
            obj.items[index].element.classList.add('jdropdown-cursor');

            // Update position
            obj.currentIndex = parseInt(index);
    
            // Update scroll to the cursor element
            var container = content.scrollTop;
            var element = obj.items[obj.currentIndex].element;
            content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
        }
    }

    /**
     * Reset cursor
     */
    obj.resetCursor = function() {
        // Remove current cursor
        if (obj.currentIndex != null) {
            // Remove visual cursor
            if (obj.items && obj.items[obj.currentIndex]) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
            // Reset cursor
            obj.currentIndex = null;
        }
    }

    /**
     * Reset cursor
     */
    obj.resetSelected = function() {
        // Unselected all
        if (obj.selected) {
            // Remove visual selection
            for (var i = 0; i < obj.selected.length; i++) {
                if (obj.items[obj.selected[i]]) {
                    obj.items[obj.selected[i]].element.classList.remove('jdropdown-selected');
                }
            }
            // Reset current selected items
            obj.selected = [];
        }
    }

    /**
     * Reset cursor and selected items
     */
    obj.reset = function() {
        // Reset cursor
        obj.resetCursor();

        // Reset selected
        obj.resetSelected();

        // Update labels
        obj.updateLabel();
    }

    /**
     * First visible item
     */
    obj.firstVisible = function() {
        var newIndex = null;
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    /**
     * Navigation
     */
    obj.first = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items[i].element.style.display != 'none') {
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
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items[i].element.style.display != 'none') {
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
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items[i].element.style.display != 'none') {
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
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    if (! jSuites.dropdown.hasEvents) {
        if ('ontouchsend' in document.documentElement === true) {
            document.addEventListener('touchsend', jSuites.dropdown.mouseup);
        } else {
            document.addEventListener('mouseup', jSuites.dropdown.mouseup);
        }
        document.addEventListener('keydown', jSuites.dropdown.onkeydown);

        jSuites.dropdown.hasEvents = true;
    }

    // Start dropdown
    obj.init();

    // Keep object available from the node
    el.dropdown = obj;

    return obj;
});

jSuites.dropdown.hasEvents = false;

jSuites.dropdown.mouseup = function(e) {
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
            if (e.which == 13 || e.which == 27 || e.which == 35 || e.which == 36 || e.which == 38 || e.which == 40) {
                // Move cursor
                if (e.which == 13) {
                    element.selectIndex(index)
                } else if (e.which == 38) {
                    if (index == null) {
                        element.firstVisible();
                    } else if (index > 0) {
                        element.prev();
                    }
                } else if (e.which == 40) {
                    if (index == null) {
                        element.firstVisible();
                    } else if (index + 1 < element.options.data.length) {
                        element.next();
                    }
                } else if (e.which == 36) {
                    element.first();
                } else if (e.which == 35) {
                    element.last();
                } else if (e.which == 27) {
                    element.close();
                }

                e.stopPropagation();
                e.preventDefault();
            }
        }
    }
}

jSuites.dropdown.extractFromDom = function(el, options) {
    // Keep reference
    var select = el;
    if (! options) {
        options = {};
    }
    // Prepare configuration
    if (el.getAttribute('multiple') && (! options || options.multiple == undefined)) {
        options.multiple = true;
    }
    if (el.getAttribute('placeholder') && (! options || options.placeholder == undefined)) {
        options.placeholder = el.getAttribute('placeholder');
    }
    if (el.getAttribute('data-autocomplete') && (! options || options.autocomplete == undefined)) {
        options.autocomplete = true;
    }
    if (! options || options.width == undefined) {
        options.width = el.offsetWidth;
    }
    if (el.value && (! options || options.value == undefined)) {
        options.value = el.value;
    }
    if (! options || options.data == undefined) {
        options.data = [];
        for (var j = 0; j < el.children.length; j++) {
            if (el.children[j].tagName == 'OPTGROUP') {
                for (var i = 0; i < el.children[j].children.length; i++) {
                    options.data.push({
                        id: el.children[j].children[i].value,
                        name: el.children[j].children[i].innerHTML,
                        group: el.children[j].getAttribute('label'),
                    });
                }
            } else {
                options.data.push({
                    id: el.children[j].value,
                    name: el.children[j].innerHTML,
                });
            }
        }
    }
    if (! options || options.onchange == undefined) {
        options.onchange = function(a,b,c,d) {
            if (options.multiple == true) {
                if (obj.items[b].classList.contains('jdropdown-selected')) {
                    select.options[b].setAttribute('selected', 'selected');
                } else {
                    select.options[b].removeAttribute('selected');
                }
            } else {
                select.value = d;
            }
        }
    }
    // Create DIV
    var div = document.createElement('div');
    el.parentNode.insertBefore(div, el);
    el.style.display = 'none';
    el = div;

    return { el:el, options:options };
}