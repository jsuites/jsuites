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
        remoteSearch: false,
        lazyLoading: false,
        type: null,
        width: null,
        maxWidth: null,
        opened: false,
        value: null,
        placeholder: '',
        newOptions: false,
        position: false,
        onchange: null,
        onload: null,
        onopen: null,
        onclose: null,
        onfocus: null,
        onblur: null,
        oninsert: null,
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

    // Force autocomplete search
    if (obj.options.remoteSearch == true) {
        obj.options.autocomplete = true;
    }

    // Containers
    obj.items = [];
    obj.groups = [];
    obj.value = [];

    // Search options
    obj.search = '';
    obj.results = null;
    obj.numOfItems = 0;

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
    obj.header = document.createElement('input');
    obj.header.className = 'jdropdown-header';
    obj.header.setAttribute('autocomplete', 'off');
    if (typeof(obj.options.onfocus) == 'function') {
        obj.header.onfocus = function() {
            obj.options.onfocus(el);
        }
    }
    if (typeof(obj.options.onblur) == 'function') {
        obj.header.onblur = function() {
            obj.options.onblur(el);
        }
    }
    
    if (obj.options.newOptions == true) {
        obj.header.classList.add('jdropdown-add');
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

    // Reset button
    var resetButton  = document.createElement('div');
    resetButton.className = 'jdropdown-reset';
    resetButton.innerHTML = 'x';
    resetButton.onclick = function() {
        obj.reset();
        obj.close();
    }

    // Create backdrop
    var backdrop  = document.createElement('div');
    backdrop.className = 'jdropdown-backdrop';

    // Autocomplete
    if (obj.options.autocomplete == true) {
        el.setAttribute('data-autocomplete', true);

        // Handler
        var keyTimer = null;
        obj.header.addEventListener('keyup', function(e) {
            if (! keyTimer) {
                if (obj.search != obj.header.value.trim()) {
                    keyTimer = setTimeout(function() {
                        obj.find(obj.header.value.trim());
                        keyTimer = null;
                    }, 400);
                }

                if (! el.classList.contains('jdropdown-focus')) {
                    obj.open();
                }
            }
        });
    } else {
        obj.header.setAttribute('readonly', 'readonly');
    }

    // Place holder
    if (! obj.options.placeholder && el.getAttribute('placeholder')) {
        obj.options.placeholder = el.getAttribute('placeholder');
    }

    if (obj.options.placeholder) {
        obj.header.setAttribute('placeholder', obj.options.placeholder);
    }

    // Append elements
    containerHeader.appendChild(obj.header);
    if (obj.options.type == 'searchbar') {
        containerHeader.appendChild(closeButton);
    } else {
        container.appendChild(closeButton);
    }
    if (! obj.options.type || obj.options.type == 'default') {
        //containerHeader.appendChild(resetButton);
    }
    container.appendChild(content);
    el.appendChild(containerHeader);
    el.appendChild(container);
    el.appendChild(backdrop);

    var filter = function(a) {
        return a.filter(function(v) {
            return v;
        });
    }

    /**
     * Init dropdown
     */
    obj.init = function() {
        if (obj.options.url && ! obj.options.data.length) {
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
            var data = [];
            if (obj.options.data.length) {
                for (var j = 0; j < obj.options.data.length; j++) {
                    data.push(obj.options.data[j]); 
                }
            }
            // Set data
            obj.setData(data);
            // Set value
            if (obj.options.value != null) {
                obj.setValue(obj.options.value);
            }
            // Onload
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj, obj.options.data);
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
     * Add a new item
     */
    obj.add = function(title) {
        if (! title) {
            var current = obj.options.autocomplete == true ? obj.header.value : '';
            var title = prompt('Text', current);
            if (! title) {
                return false;
            }
        }

        // Create new item
        var item = {
            value: jSuites.guid(),
            text: title,
        };

        // Add item to the main list
        obj.options.data.push(item);

        var newItem = obj.createItem(item);

        // Append DOM to the list
        content.appendChild(newItem.element);

        // Callback
        if (typeof(obj.options.oninsert) == 'function') {
            obj.options.oninsert(obj, newItem, item)
        }

        // Show content
        if (content.style.display == 'none') {
            content.style.display = '';
        }

        return item;
    }

    /**
     * Create a new item
     */
    obj.createItem = function(data, group, groupName) {
        if (typeof(data.text) == 'undefined' && data.name) {
            data.text = data.name;
        }
        if (typeof(data.value) == 'undefined' && data.id) {
            data.value = data.id;
        }
        // Create item
        var item = {};
        item.element = document.createElement('div');
        item.element.className = 'jdropdown-item';
        item.element.indexValue = obj.items.length;
        item.value = data.value;
        item.text = data.text;

        // Id
        if (data.id) {
            item.element.setAttribute('id', data.id);
        }

        // Group reference
        if (group) {
            item.group = group;
            item.groupName = groupName;
        }

        // Image
        if (data.image) {
            var image = document.createElement('img');
            image.className = 'jdropdown-image';
            image.src = data.image;
            if (! data.title) {
               image.classList.add('jdropdown-image-small');
            }
            item.element.appendChild(image);
        } else if (data.color) {
            var color = document.createElement('div');
            color.className = 'jdropdown-color';
            color.style.backgroundColor = data.color;
            item.element.appendChild(color);
        }

        // Set content
        var node = document.createElement('div');
        node.className = 'jdropdown-description';
        if (data.text) {
            node.innerText = data.text;
        } else {
            node.innerHTML = '&nbsp;'; 
        }

        // Title
        if (data.title) {
            var title = document.createElement('div');
            title.className = 'jdropdown-title';
            title.innerText = data.title;
            node.appendChild(title);

            // Keep text reference
            item.title = data.title;
        }

        // Value
        if (obj.value && obj.value[data.value]) {
            item.element.classList.add('jdropdown-selected');
            item.selected = true;
        }

        // Keep DOM accessible
        obj.items.push(item);

        // Add node to item
        item.element.appendChild(node);

        return item;
    }

    obj.appendData = function(data) {
        // Create elements
        if (data.length) {
            // Reset counter
            obj.numOfItems = 0;

            // Helpers
            var items = [];
            var groups = [];

            // Prepare data
            for (var i = 0; i < data.length; i++) {
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
                        var item = obj.createItem(data[groups[groupNames[i]][j]], group, groupNames[i]);

                        if (obj.options.lazyLoading == false || obj.numOfItems < 200) {
                            groupContent.appendChild(item.element);
                            obj.numOfItems++;
                        }
                    }
                    // Group itens
                    group.appendChild(groupName);
                    group.appendChild(groupContent);
                    // Keep group DOM
                    obj.groups.push(group);
                    // Only add to the screen if children on the group
                    if (groupContent.children.length > 0) {
                        // Add DOM to the content
                        content.appendChild(group);
                    }
                }
            }

            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = obj.createItem(data[items[i]]);
                    if (obj.options.lazyLoading == false || obj.numOfItems < 200) {
                        content.appendChild(item.element);
                        obj.numOfItems++;
                    }
                }
            }
        }
    }

    obj.setData = function(data) {
        // Prepare data
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                // Compatibility
                if (typeof(data[i]) != 'object') {
                    // Correct format
                    data[i] = {
                        value: data[i],
                        text: data[i]
                    }
                }
            }

            // Make sure the content container is blank
            content.innerHTML = '';

            // Reset
            obj.reset();

            // Reset items
            obj.items = [];

            // Append data
            obj.appendData(data);
        }

        // Update data
        obj.options.data = data;
    }

    /**
     * Get position of the item
     */
    obj.getPosition = function(value) {
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].value == value) {
                return i;
            }
        }

        return 0;
    }

    /**
     * Get dropdown current text
     */
    obj.getText = function(asArray) {
        var v = [];
        var k = Object.keys(obj.value);
        for (var i = 0; i < k.length; i++) {
            v.push(obj.value[k[i]]);
        }
        if (asArray) {
            return v;
        } else {
            return v.join('; ');
        }
    }

    /**
     * Get dropdown current value
     */
    obj.getValue = function(asArray) {
        if (asArray) {
            return Object.keys(obj.value);
        } else {
            return Object.keys(obj.value).join(';');
        }
    }

    obj.setValue = function(value) {
        var setValue = function(item, value) {
            if (obj.items[item].value == value) {
                if (obj.items[item].element) {
                    obj.items[item].element.classList.add('jdropdown-selected');
                }
                obj.items[item].selected = true;

                // Push to the values container
                obj.value[value] = obj.items[item].text;
            }
        }

        // Old value
        var oldValue = obj.getValue();

        // Remove selected
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].selected == true) {
                if (obj.items[i].element) {
                    obj.items[i].element.classList.remove('jdropdown-selected')
                }
                obj.items[i].selected = null;
            }
        } 

        // Reset
        obj.value = [];

        // Set values
        if (value !== null) {
            if (! Array.isArray(value)) {
                for (var i = 0; i < obj.items.length; i++) {
                    setValue(i, value);
                }
            } else {
                for (var i = 0; i < obj.items.length; i++) {
                    for (var j = 0; j < value.length; j++) {
                        setValue(i, value[j]);
                    }
                }
            }
        }

        // New value
        var newValue = obj.getValue();

        if (oldValue != newValue) {
            // Label
            obj.header.value = obj.getText();

            // Value
            obj.options.value = obj.getValue();

            // Element value
            el.value = obj.options.value;

            // Events
            if (typeof(el.onchange) == 'function') {
                el.onchange({ type: 'change', target: this });
            }
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, null, oldValue, obj.options.value);
            }
        }
    }

    obj.resetSelected = function() {
        obj.setValue(null);
    } 

    obj.selectIndex = function(index) {
        // Make sure is a number
        var index = parseInt(index);

        // Only select those existing elements
        if (obj.items && obj.items[index]) {
            // Current selection
            var oldValue = obj.getValue();

            // Reset cursor to a new position
            obj.setCursor(index, false);

            // Behaviour
            if (! obj.options.multiple) {
                // Update value
                if (! obj.value[obj.items[index].value]) {
                    obj.setValue(obj.items[index].value);
                } else {
                    obj.setValue(null);
                }
                obj.close();
            } else {
                // Toggle option
                if (obj.items[index].selected) {
                    obj.items[index].element.classList.remove('jdropdown-selected');
                    obj.items[index].selected = false;
                    // Remove from selected list
                    delete obj.value[obj.items[index].value];
                } else {
                    // Select element
                    obj.items[index].element.classList.add('jdropdown-selected');
                    obj.items[index].selected = true;
                    // Add to the selected list
                    obj.value[obj.items[index].value] = obj.items[index].text;
                }

                // Update labels for multiple dropdown
                if (! obj.options.autocomplete) {
                    obj.header.value = obj.getText();
                }

                // Events
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, index, oldValue, obj.getValue());
                }
            }
        }
    }

    obj.selectItem = function(item) {
        if (jSuites.dropdown.current) {
            obj.selectIndex(item.indexValue);
        }
    }

    obj.find = function(str) {
        if (obj.search == str.trim()) {
            return false;
        }

        // Search term
        obj.search = str;

        // Results
        obj.numOfItems = 0;

        // Remove current items in the remote search
        if (obj.options.remoteSearch == true) {
            obj.currentIndex = null;
            obj.results = null;
            jSuites.ajax({
                url: obj.options.url + '?q=' + str,
                method: 'GET',
                dataType: 'json',
                success: function(result) {
                    // Reset items
                    obj.items = [];
                    content.innerHTML = '';
                    obj.appendData(result);

                    if (! result.length) {
                        content.style.display = 'none';
                    } else {
                        content.style.display = '';
                    }
                }
            });
        } else {
            // Search terms
            str = new RegExp(str, 'gi');

            // Reset search
            obj.results = [];

            // Append options
            for (var i = 0; i < obj.items.length; i++) {
                // Item label
                var label = obj.items[i].text;
                // Item title
                var title = obj.items[i].title || '';
                // Group name
                var groupName = obj.items[i].groupName || '';

                if (str == null || obj.value[obj.items[i].value] != undefined || label.match(str) || title.match(str) || groupName.match(str)) {
                    obj.results.push(obj.items[i]);

                    if (obj.items[i].group && obj.items[i].group.children[1].children[0]) {
                        // Remove all nodes
                        while (obj.items[i].group.children[1].children[0]) {
                            obj.items[i].group.children[1].removeChild(obj.items[i].group.children[1].children[0]);
                        }
                    }
                }
            }

            // Remove all nodes
            while (content.children[0]) {
                content.removeChild(content.children[0]);
            }

            // Show 200 items at once
            var number = obj.results.length || 0;

            // Lazyloading
            if (obj.options.lazyLoading == true && number > 200) {
                number = 200;
            }

            for (var i = 0; i < number; i++) {
                if (obj.results[i].group) {
                    if (! obj.results[i].group.parentNode) {
                        content.appendChild(obj.results[i].group);
                    }
                    obj.results[i].group.children[1].appendChild(obj.results[i].element);
                } else {
                    content.appendChild(obj.results[i].element);
                }
                obj.numOfItems++;
            }

            if (! obj.results.length) {
                content.style.display = 'none';
            } else {
                content.style.display = '';
            }
        }
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
                    jSuites.animation.slideBottom(container, 1);
                }
            }

            // Filter
            if (obj.options.autocomplete == true) {
                obj.header.value = obj.search;
                obj.header.focus();
            }

            // Set cursor for the first or first selected element
            var k = Object.keys(obj.value);
            if (k[0]) {
                var cursor = obj.getPosition(k[0]);
                if (cursor) {
                    obj.setCursor(cursor);
                }
            }

            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                var rect = el.getBoundingClientRect();
                var rectContainer = container.getBoundingClientRect();

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

                if (obj.options.maxWidth) {
                    container.style.maxWidth = obj.options.maxWidth;
                }

                if (! obj.items.length && obj.options.autocomplete == true) {
                    content.style.display = 'none';
                } else {
                    content.style.display = '';
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
            obj.setCursor();
            // Update labels
            obj.header.value = obj.getText();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Blur
            if (obj.header.blur) {
                obj.header.blur();
            }
            // Remove focus
            el.classList.remove('jdropdown-focus');
        }

        return obj.getValue();
    }

    /**
     * Set cursor
     */
    obj.setCursor = function(index, setPosition) {
        // Remove current cursor
        if (obj.currentIndex != null) {
            // Remove visual cursor
            if (obj.items && obj.items[obj.currentIndex]) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
        }

        if (index == undefined) {
            obj.currentIndex = null;
        } else {
            parseInt(index);

            obj.items[index].element.classList.add('jdropdown-cursor');
            obj.currentIndex = index;

            // Update scroll to the cursor element
            if (setPosition !== false && obj.items[obj.currentIndex].element) {
                var container = content.scrollTop;
                var element = obj.items[obj.currentIndex].element;
                content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
            }
        }
    }

    // Compatibility
    obj.resetCursor = obj.setCursor;
    obj.updateCursor = obj.setCursor;

    /**
     * Reset cursor and selected items
     */
    obj.reset = function() {
        // Reset cursor
        obj.setCursor();

        // Reset selected
        obj.setValue(null);
    }

    /**
     * First visible item
     */
    obj.firstVisible = function() {
        var newIndex = null;
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    /**
     * Navigation
     */
    obj.first = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && obj.items[i].element.style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    obj.last = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && obj.items[i].element.style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    obj.next = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode) {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    obj.prev = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode) {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    obj.loadUp = function() {
        return false;
    }

    obj.loadDown = function() {
        var test = false;

        // Search
        if (obj.results) {
            var results = obj.results;
        } else {
            var results = obj.items;
        }

        if (results.length > obj.numOfItems) {
            var numberOfItems = obj.numOfItems;
            var number = results.length - numberOfItems;
            if (number > 200) {
                number = 200;
            }

            for (var i = numberOfItems; i < numberOfItems + number; i++) {
                if (results[i].group) {
                    if (! results[i].group.parentNode) {
                        content.appendChild(results[i].group);
                    }
                    results[i].group.children[2].appendChild(results[i].element);
                } else {
                    content.appendChild(results[i].element);
                }

                obj.numOfItems++;
            }

            // New item added
            test = true;
        }

        return test;
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

    // Lazyloading
    if (obj.options.lazyLoading == true) {
        jSuites.lazyLoading(content, {
            loadUp: obj.loadUp,
            loadDown: obj.loadDown,
        });
    }

    // Start dropdown
    obj.init();

    // Keep object available from the node
    el.dropdown = obj;
    el.change = obj.setValue;

    return obj;
});

jSuites.dropdown.hasEvents = false;

jSuites.dropdown.mouseup = function(e) {
    var element = jSuites.findElement(e.target, 'jdropdown');
    if (element) {
        var dropdown = element.dropdown;
        if (e.target.classList.contains('jdropdown-header')) {
            if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                var rect = element.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 30) {
                    if (e.target.classList.contains('jdropdown-add')) {
                        dropdown.add();
                    } else {
                        dropdown.close();
                    }
                } else {
                    if (dropdown.options.autocomplete == false) {
                        dropdown.close();
                    }
                }
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
            dropdown.selectItem(e.target.parentNode);
        } else if (e.target.classList.contains('jdropdown-description')) {
            dropdown.selectItem(e.target.parentNode);
        } else if (e.target.classList.contains('jdropdown-title')) {
            dropdown.selectItem(e.target.parentNode.parentNode);
        } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
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

        if (! e.shiftKey) {
            if (e.which == 13 || e.which == 27 || e.which == 35 || e.which == 36 || e.which == 38 || e.which == 40) {
                // Move cursor
                if (e.which == 13) {
                    element.selectIndex(index);
                } else if (e.which == 38) {
                    if (index == null) {
                        element.firstVisible();
                    } else if (index > 0) {
                        element.prev();
                    }
                } else if (e.which == 40) {
                    if (index == null) {
                        element.firstVisible();
                    } else if (index + 1 < element.items.length) {
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
                        value: el.children[j].children[i].value,
                        text: el.children[j].children[i].innerHTML,
                        group: el.children[j].getAttribute('label'),
                    });
                }
            } else {
                options.data.push({
                    value: el.children[j].value,
                    text: el.children[j].innerHTML,
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