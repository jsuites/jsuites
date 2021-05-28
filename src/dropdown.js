jSuites.dropdown = (function(el, options) {
    // Already created, update options
    if (el.dropdown) {
        return el.dropdown.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'dropdown' };
    obj.options = {};

    // Success
    var success = function(data, val) {
        // Sort
        if(obj.options.sortResults!==false) {
            if(typeof obj.options.sortResults == "function") {
                data.sort(obj.options.sortResults);
            } else {
                data.sort(sortData);
            }
        }
        
        // Set data
        if (data) {
            obj.setData(data);

            // Onload method
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data, val);
            }
        }

        // Set value
        applyValue(val);

        // Component value
        el.value = obj.options.value;

        // Open dropdown
        if (obj.options.opened == true) {
            obj.open();
        }
    }
    
    // Default sort
    var sortData = function(itemA, itemB) {
        var testA, testB;
        if(typeof itemA == "string") {
            testA = itemA;
        } else {
            if(itemA.text) {
                testA = itemA.text;
            } else if(itemA.name) {
                testA = itemA.name;
            }
        }
        
        if(typeof itemB == "string") {
            testB = itemB;
        } else {
            if(itemB.text) {
                testB = itemB.text;
            } else if(itemB.name) {
                testB = itemB.name;
            }
        }
        
        if(typeof testA == "string" || typeof testB == "string") {
            if(typeof testA != "string") { testA = ""+testA; }
            if(typeof testB != "string") { testB = ""+testB; }
            return testA.localeCompare(testB);
        } else {
            return testA - testB;
        }
    }

    /**
     * Reset the options for the dropdown
     */
    var resetValue = function() {
        // Reset value container
        obj.value = {};
        // Remove selected
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].selected == true) {
                if (obj.items[i].element) {
                    obj.items[i].element.classList.remove('jdropdown-selected')
                }
                obj.items[i].selected = null;
            }
        }
        // Reset options
        obj.options.value = '';
    }

    /**
     * Apply values to the dropdown
     */
    var applyValue = function(values) {
        // Reset the current values
        resetValue();

        // Read values
        if (values) {
            if (! Array.isArray(values)) {
                values = (''+values).split(';');
            }
            for (var i = 0; i < values.length; i++) {
                obj.value[values[i]] = '';
            }
            // Update the DOM
            for (var i = 0; i < obj.items.length; i++) {
                if (typeof(obj.value[Value(i)]) !== 'undefined') {
                    if (obj.items[i].element) {
                        obj.items[i].element.classList.add('jdropdown-selected')
                    }
                    obj.items[i].selected = true;

                    // Keep label
                    obj.value[Value(i)] = Text(i);
                }
            }

            // Global value
            obj.options.value = Object.keys(obj.value).join(';');
        }

        // Update labels
        obj.header.value = obj.getText();
    }

    // Get the value of one item
    var Value = function(k, v) {
        // Legacy purposes
        if (! obj.options.format) {
            var property = 'value';
        } else {
            var property = 'id';
        }

        if (obj.items[k]) {
            if (v !== undefined) {
                return obj.items[k].data[property] = v;
            } else {
                return obj.items[k].data[property];
            }
        }

        return '';
    }

    // Get the label of one item
    var Text = function(k, v) {
        // Legacy purposes
        if (! obj.options.format) {
            var property = 'text';
        } else {
            var property = 'name';
        }

        if (obj.items[k]) {
            if (v !== undefined) {
                return obj.items[k].data[property] = v;
            } else {
                return obj.items[k].data[property];
            }
        }

        return '';
    }

    var getValue = function() {
        return Object.keys(obj.value);
    }

    var getText = function() {
        var data = [];
        var k = Object.keys(obj.value);
        for (var i = 0; i < k.length; i++) {
            data.push(obj.value[k[i]]);
        }
        return data;
    }

    obj.setOptions = function(options, reset) {
        if (! options) {
            options = {};
        }

        // Default configuration
        var defaults = {
            url: null,
            data: [],
            format: 0,
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
            sortResults: false,
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Force autocomplete search
        if (obj.options.remoteSearch == true || obj.options.type === 'searchbar') {
            obj.options.autocomplete = true;
        }

        // New options
        if (obj.options.newOptions == true) {
            obj.header.classList.add('jdropdown-add');
        } else {
            obj.header.classList.remove('jdropdown-add');
        }

        // Autocomplete
        if (obj.options.autocomplete == true) {
            obj.header.removeAttribute('readonly');
        } else {
            obj.header.setAttribute('readonly', 'readonly');
        }

        // Place holder
        if (obj.options.placeholder) {
            obj.header.setAttribute('placeholder', obj.options.placeholder);
        } else {
            obj.header.removeAttribute('placeholder');
        }

        // Remove specific dropdown typing to add again
        el.classList.remove('jdropdown-searchbar');
        el.classList.remove('jdropdown-picker');
        el.classList.remove('jdropdown-list');

        if (obj.options.type == 'searchbar') {
            el.classList.add('jdropdown-searchbar');
        } else if (obj.options.type == 'list') {
            el.classList.add('jdropdown-list');
        } else if (obj.options.type == 'picker') {
            el.classList.add('jdropdown-picker');
        } else {
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.autocomplete) {
                    el.classList.add('jdropdown-searchbar');
                    obj.options.type = 'searchbar';
                } else {
                    el.classList.add('jdropdown-picker');
                    obj.options.type = 'picker';
                }
            } else {
                if (obj.options.width) {
                    el.style.width = obj.options.width;
                    el.style.minWidth = obj.options.width;
                } else {
                    el.style.removeProperty('width');
                    el.style.removeProperty('min-width');
                }

                el.classList.add('jdropdown-default');
                obj.options.type = 'default';
            }
        }

        // Close button
        if (obj.options.type == 'searchbar') {
            containerHeader.appendChild(closeButton);
        } else {
            container.insertBefore(closeButton, container.firstChild);
        }

        // Load the content
        if (options.url && ! options.data) {
            jSuites.ajax({
                url: options.url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data) {
                        success(data, options.value);
                    }
                }
            });
        } else {
            success(options.data, options.value);
        }

        // Return the instance
        return obj;
    }

    // Helpers
    var containerHeader = null;
    var container = null;
    var content = null;
    var closeButton = null;
    var resetButton = null;
    var backdrop = null;

    var keyTimer = null;

    /**
     * Init dropdown
     */
    var init = function() {
        // Do not accept null
        if (! options) {
            options = {};
        }

        // If the element is a SELECT tag, create a configuration object
        if (el.tagName == 'SELECT') {
            var ret = jSuites.dropdown.extractFromDom(el, options);
            el = ret.el;
            options = ret.options;
        }

        // Place holder
        if (! options.placeholder && el.getAttribute('placeholder')) {
            options.placeholder = el.getAttribute('placeholder');
        }

        // Value container
        obj.value = {};
        // Containers
        obj.items = [];
        obj.groups = [];
        // Search options
        obj.search = '';
        obj.results = null;
        obj.numOfItems = 0;

        // Create dropdown
        el.classList.add('jdropdown');

        // Header container
        containerHeader = document.createElement('div');
        containerHeader.className = 'jdropdown-container-header';

        // Header
        obj.header = document.createElement('input');
        obj.header.className = 'jdropdown-header';
        obj.header.setAttribute('autocomplete', 'off');
        obj.header.onfocus = function() {
            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el);
            }
        }

        obj.header.onblur = function() {
            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el);
            }
        }

        obj.header.onkeyup = function(e) {
            if (obj.options.autocomplete == true && ! keyTimer) {
                if (obj.search != obj.header.value.trim()) {
                    keyTimer = setTimeout(function() {
                        obj.find(obj.header.value.trim());
                        keyTimer = null;
                    }, 400);
                }

                if (! el.classList.contains('jdropdown-focus')) {
                    obj.open();
                }
            } else {
                if (! obj.options.autocomplete) {
                    obj.next(e.key);
                }
            }
        }

        // Global controls
        if (! jSuites.dropdown.hasEvents) {
            // Execute only one time
            jSuites.dropdown.hasEvents = true;
            // Enter and Esc
            document.addEventListener("keydown", jSuites.dropdown.keydown);
        }

        // Container
        container = document.createElement('div');
        container.className = 'jdropdown-container';

        // Dropdown content
        content = document.createElement('div');
        content.className = 'jdropdown-content';

        // Close button
        closeButton = document.createElement('div');
        closeButton.className = 'jdropdown-close';
        closeButton.innerHTML = 'Done';

        // Reset button
        resetButton = document.createElement('div');
        resetButton.className = 'jdropdown-reset';
        resetButton.innerHTML = 'x';
        resetButton.onclick = function() {
            obj.reset();
            obj.close();
        }

        // Create backdrop
        backdrop = document.createElement('div');
        backdrop.className = 'jdropdown-backdrop';

        // Append elements
        containerHeader.appendChild(obj.header);

        container.appendChild(content);
        el.appendChild(containerHeader);
        el.appendChild(container);
        el.appendChild(backdrop);

        // Set the otiptions
        obj.setOptions(options);

        if ('ontouchsend' in document.documentElement === true) {
            el.addEventListener('touchsend', jSuites.dropdown.mouseup);
        } else {
            el.addEventListener('mouseup', jSuites.dropdown.mouseup);
        }

        // Lazyloading
        if (obj.options.lazyLoading == true) {
            jSuites.lazyLoading(content, {
                loadUp: obj.loadUp,
                loadDown: obj.loadDown,
            });
        }

        // Change method
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue(obj.options.multiple ? true : false);
            } else {
                obj.setValue(val);
            }
        }

        // Keep object available from the node
        el.dropdown = obj;
    }

    /**
     * Get the current remote source of data URL
     */
    obj.getUrl = function() {
        return obj.options.url;
    }

    /**
     * Set the new data from a remote source
     * @param {string} url - url from the remote source
     */
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
     * Set ID for one item
     */
    obj.setId = function(item, v) {
        // Legacy purposes
        if (! obj.options.format) {
            var property = 'value';
        } else {
            var property = 'id';
        }

        if (typeof(item) == 'object') {
            item[property] = v;
        } else {
            obj.items[item].data[property] = v;
        }
    }

    /**
     * Add a new item
     * @param {string} title - title of the new item
     */
    obj.add = function(title) {
        if (! title) {
            var current = obj.options.autocomplete == true ? obj.header.value : '';
            var title = prompt('Text', current);
            if (! title) {
                return false;
            }
        }

        // Id
        var id = jSuites.guid()

        // Create new item
        if (! obj.options.format) {
            var item = {
                value: id,
                text: title,
            }
        } else {
            var item = {
                id: id,
                name: title,
            };
        }

        // Add item to the main list
        obj.options.data.push(item);

        // Create DOM
        var newItem = obj.createItem(item);

        // Append DOM to the list
        content.appendChild(newItem.element);

        // Callback
        if (typeof(obj.options.oninsert) == 'function') {
            obj.options.oninsert(obj, item, item)
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
        // Keep the correct source of data
        if (! obj.options.format) {
            if (! data.value && data.id !== undefined) {
                data.value = data.id;
                //delete data.id;
            }
            if (! data.text && data.name !== undefined) {
                data.text = data.name;
                //delete data.name;
            }
        } else {
            if (! data.id && data.value !== undefined) {
                data.id = data.value;
                //delete data.value;
            }
            if (! data.name && data.text !== undefined) {
                data.name = data.text
                //delete data.text;
            }
        }

        // Create item
        var item = {};
        item.element = document.createElement('div');
        item.element.className = 'jdropdown-item';
        item.element.indexValue = obj.items.length;
        item.data = data;

        // Groupd DOM
        if (group) {
            item.group = group; 
        }

        // Id
        if (data.id) {
            item.element.setAttribute('id', data.id);
        }
        
        // Disabled
        if (data.disabled == true) {
            item.element.setAttribute('data-disabled', true);
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
        if (! obj.options.format) {
            var text = data.text;
        } else {
            var text = data.name;
        }

        var node = document.createElement('div');
        node.className = 'jdropdown-description';
        node.innerHTML = text || '&nbsp;'; 

        // Title
        if (data.title) {
            var title = document.createElement('div');
            title.className = 'jdropdown-title';
            title.innerText = data.title;
            node.appendChild(title);
        }

        // Set content
        if (! obj.options.format) {
            var val = data.value;
        } else {
            var val = data.id;
        }

        // Value
        if (obj.value[val]) {
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
                    if (! obj.options.format) {
                        data[i] = {
                            value: data[i],
                            text: data[i]
                        }
                    } else {
                        data[i] = {
                            id: data[i],
                            name: data[i]
                        }
                    }
                }
            }

            // Reset current value
            resetValue();

            // Make sure the content container is blank
            content.innerHTML = '';

            // Reset
            obj.header.value = '';

            // Reset items and values
            obj.items = [];

            // Append data
            obj.appendData(data);

            // Update data
            obj.options.data = data;
        }
    }

    obj.getData = function() {
        return obj.options.data;
    }

    /**
     * Get position of the item
     */
    obj.getPosition = function(val) {
        for (var i = 0; i < obj.items.length; i++) {
            if (Value(i) == val) {
                return i;
            }
        }
        return 0;
    }

    /**
     * Get dropdown current text
     */
    obj.getText = function(asArray) {
        // Get value
        var v = getText();
        // Return value
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
        // Get value
        var v = getValue();
        // Return value
        if (asArray) {
            return v;
        } else {
            return v.join(';');
        }
    }

    /**
     * Change event
     */
    var change = function(oldValue) {
        // Events
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj, oldValue, obj.options.value);
        }

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

    /**
     * Set value
     */
    obj.setValue = function(newValue) {
        // Current value
        var oldValue = getValue();
        // New value
        if (Array.isArray(newValue)) {
            newValue = newValue.join(';')
        }

        if (oldValue != newValue) {
            // Set value
            applyValue(newValue);

            // Change
            change(oldValue);
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
            // Reset cursor to a new position
            obj.setCursor(index, false);

            // Behaviour
            if (! obj.options.multiple) {
                // Update value
                if (obj.items[index].selected) {
                    obj.setValue(null);
                } else {
                    obj.setValue(Value(index));
                }

                // Close component
                obj.close();
            } else {
                // Old value
                var oldValue = obj.options.value;

                // Toggle option
                if (obj.items[index].selected) {
                    obj.items[index].element.classList.remove('jdropdown-selected');
                    obj.items[index].selected = false;

                    delete obj.value[Value(index)];
                } else {
                    // Select element
                    obj.items[index].element.classList.add('jdropdown-selected');
                    obj.items[index].selected = true;

                    // Set value
                    obj.value[Value(index)] = Text(index);
                }

                // Global value
                obj.options.value = Object.keys(obj.value).join(';');

                // Update labels for multiple dropdown
                if (obj.options.autocomplete == false) {
                    obj.header.value = getText().join('; ');
                }

                // Events
                change(oldValue);
            }
        }
    }

    obj.selectItem = function(item) {
        obj.selectIndex(item.indexValue);
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
                var label = Text(i);
                // Item title
                var title = obj.items[i].data.title || '';
                // Group name
                var groupName = obj.items[i].data.group || '';

                if (str == null || obj.items[i].selected == true || label.match(str) || title.match(str) || groupName.match(str)) {
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
        // Focus
        if (! el.classList.contains('jdropdown-focus')) {
            // Current dropdown
            jSuites.dropdown.current = obj;

            // Start tracking
            jSuites.tracking(obj, true);

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
            var k = Object.keys(getValue());
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
        if (el.classList.contains('jdropdown-focus')) {
            // Update labels
            obj.header.value = obj.getText();
            // Remove cursor
            obj.setCursor();
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
            // Start tracking
            jSuites.tracking(obj, false);
            // Current dropdown
            jSuites.dropdown.current = null;
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

    var next = function(index, letter) {
        for (var i = index; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && (! letter || (''+Text(i)).substr(0,1).toLowerCase() == letter)) {
                return i;
            }
        }

        return null;
    }

    obj.next = function(letter) {
        if (letter && letter.length == 1) {
            letter = letter.toLowerCase();
        }

        if (obj.currentIndex === null) {
            var index = obj.currentIndex = 0;
        } else {
            var index = obj.currentIndex + 1;
        }

        // Try to find the next from the current position
        var newIndex = next(index, letter);

        if (newIndex == null && letter) {
            // Trying to find from the begining
            newIndex = next(0, letter);
            // Did not find
            if (newIndex == null) {
                return false;
            }
        }

        // Set cursor
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

    init();

    return obj;
});

jSuites.dropdown.keydown = function(e) {
    var dropdown = null;
    if (dropdown = jSuites.dropdown.current) {
        if (e.which == 13) {
            // Quick Select/Filter
            if(dropdown.currentIndex == null && dropdown.options.autocomplete == true && dropdown.header.value!="") {
                dropdown.find(dropdown.header.value);
            }
            dropdown.selectIndex(dropdown.currentIndex);
        } else if (e.which == 38) {
            if (dropdown.currentIndex == null) {
                dropdown.firstVisible();
            } else if (dropdown.currentIndex > 0) {
                dropdown.prev();
            }
            e.preventDefault();
        } else if (e.which == 40) {
            if (dropdown.currentIndex == null) {
                dropdown.firstVisible();
            } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                dropdown.next();
            }
            e.preventDefault();
        } else if (e.which == 36) {
            dropdown.first();
        } else if (e.which == 35) {
            dropdown.last();
        } else if (e.which == 27) {
            dropdown.close();
        }
    }
}

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
