import Helpers from '../utils/helpers';
import Dictionary from '../utils/dictionary';
import Tracking from '../utils/tracking';
import Animation from './animation';
import Ajax from './ajax';
import lazyLoading from '../utils/lazyloading';

function Dropdown() {

    var Component = (function (el, options) {
        // Already created, update options
        if (el.dropdown) {
            return el.dropdown.setOptions(options, true);
        }

        // New instance
        var obj = {type: 'dropdown'};
        obj.options = {};

        // Success
        var success = function (data, val) {
            // Set data
            if (data && data.length) {
                // Sort
                if (obj.options.sortResults !== false) {
                    if (typeof obj.options.sortResults == "function") {
                        data.sort(obj.options.sortResults);
                    } else {
                        data.sort(sortData);
                    }
                }

                obj.setData(data);
            }

            // Onload method
            if (typeof (obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data, val);
            }

            // Set value
            if (val) {
                applyValue(val);
            }

            // Component value
            if (val === undefined || val === null) {
                obj.options.value = '';
            }
            el.value = obj.options.value;

            // Open dropdown
            if (obj.options.opened == true) {
                obj.open();
            }
        }


        // Default sort
        var sortData = function (itemA, itemB) {
            var testA, testB;
            if (typeof itemA == "string") {
                testA = itemA;
            } else {
                if (itemA.text) {
                    testA = itemA.text;
                } else if (itemA.name) {
                    testA = itemA.name;
                }
            }

            if (typeof itemB == "string") {
                testB = itemB;
            } else {
                if (itemB.text) {
                    testB = itemB.text;
                } else if (itemB.name) {
                    testB = itemB.name;
                }
            }

            if (typeof testA == "string" || typeof testB == "string") {
                if (typeof testA != "string") {
                    testA = "" + testA;
                }
                if (typeof testB != "string") {
                    testB = "" + testB;
                }
                return testA.localeCompare(testB);
            } else {
                return testA - testB;
            }
        }

        /**
         * Reset the options for the dropdown
         */
        var resetValue = function () {
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
            // Reset value
            el.value = '';
        }

        /**
         * Apply values to the dropdown
         */
        var applyValue = function (values) {
            // Reset the current values
            resetValue();

            // Read values
            if (values !== null) {
                if (!values) {
                    if (typeof (obj.value['']) !== 'undefined') {
                        obj.value[''] = '';
                    }
                } else {
                    if (!Array.isArray(values)) {
                        values = ('' + values).split(';');
                    }
                    for (var i = 0; i < values.length; i++) {
                        obj.value[values[i]] = '';
                    }
                }
            }

            // Update the DOM
            for (var i = 0; i < obj.items.length; i++) {
                if (typeof (obj.value[Value(i)]) !== 'undefined') {
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

            // Update labels
            obj.header.value = obj.getText();
        }

        // Get the value of one item
        var Value = function (k, v) {
            // Legacy purposes
            if (!obj.options.format) {
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
        var Text = function (k, v) {
            // Legacy purposes
            if (!obj.options.format) {
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

        var getValue = function () {
            return Object.keys(obj.value);
        }

        var getText = function () {
            var data = [];
            var k = Object.keys(obj.value);
            for (var i = 0; i < k.length; i++) {
                data.push(obj.value[k[i]]);
            }
            return data;
        }

        obj.setOptions = function (options, reset) {
            if (!options) {
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
                onbeforeinsert: null,
                sortResults: false,
                autofocus: false,
            }

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof (obj.options[property]) == 'undefined' || reset === true) {
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
                if (Helpers.getWindowWidth() < 800) {
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
            if (obj.options.url && !options.data) {
                Ajax({
                    url: obj.options.url,
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            success(data, obj.options.value);
                        }
                    }
                });
            } else {
                success(obj.options.data, obj.options.value);
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
        var init = function () {
            // Do not accept null
            if (!options) {
                options = {};
            }

            // If the element is a SELECT tag, create a configuration object
            if (el.tagName == 'SELECT') {
                var ret = Component.extractFromDom(el, options);
                el = ret.el;
                options = ret.options;
            }

            // Place holder
            if (!options.placeholder && el.getAttribute('placeholder')) {
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

            // Create dropdown
            el.classList.add('jdropdown');

            // Header container
            containerHeader = document.createElement('div');
            containerHeader.className = 'jdropdown-container-header';

            // Header
            obj.header = document.createElement('input');
            obj.header.className = 'jdropdown-header jss_object';
            obj.header.type = 'text';
            obj.header.setAttribute('autocomplete', 'off');
            obj.header.onfocus = function () {
                if (typeof (obj.options.onfocus) == 'function') {
                    obj.options.onfocus(el);
                }
            }

            obj.header.onblur = function () {
                if (typeof (obj.options.onblur) == 'function') {
                    obj.options.onblur(el);
                }
            }

            obj.header.onkeyup = function (e) {
                if (obj.options.autocomplete == true && !keyTimer) {
                    if (obj.search != obj.header.value.trim()) {
                        keyTimer = setTimeout(function () {
                            obj.find(obj.header.value.trim());
                            keyTimer = null;
                        }, 400);
                    }

                    if (!el.classList.contains('jdropdown-focus')) {
                        obj.open();
                    }
                } else {
                    if (!obj.options.autocomplete) {
                        obj.next(e.key);
                    }
                }
            }

            // Global controls
            if (!Component.hasEvents) {
                // Execute only one time
                Component.hasEvents = true;
                // Enter and Esc
                document.addEventListener("keydown", Component.keydown);
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
            resetButton.onclick = function () {
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
                el.addEventListener('touchsend', Component.mouseup);
            } else {
                el.addEventListener('mouseup', Component.mouseup);
            }

            // Lazyloading
            if (obj.options.lazyLoading == true) {
                lazyLoading(content, {
                    loadUp: obj.loadUp,
                    loadDown: obj.loadDown,
                });
            }

            content.onwheel = function (e) {
                e.stopPropagation();
            }

            // Change method
            el.change = obj.setValue;

            // Global generic value handler
            el.val = function (val) {
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
        obj.getUrl = function () {
            return obj.options.url;
        }

        /**
         * Set the new data from a remote source
         * @param {string} url - url from the remote source
         * @param {function} callback - callback when the data is loaded
         */
        obj.setUrl = function (url, callback) {
            obj.options.url = url;

            Ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    obj.setData(data);
                    // Callback
                    if (typeof (callback) == 'function') {
                        callback(obj);
                    }
                }
            });
        }

        /**
         * Set ID for one item
         */
        obj.setId = function (item, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'value';
            } else {
                var property = 'id';
            }

            if (typeof (item) == 'object') {
                item[property] = v;
            } else {
                obj.items[item].data[property] = v;
            }
        }

        /**
         * Add a new item
         * @param {string} title - title of the new item
         * @param {string} id - value/id of the new item
         */
        obj.add = function (title, id) {
            if (!title) {
                var current = obj.options.autocomplete == true ? obj.header.value : '';
                var title = prompt(Dictionary.translate('Add A New Option'), current);
                if (!title) {
                    return false;
                }
            }

            // Id
            if (!id) {
                id = Helpers.guid();
            }

            // Create new item
            if (!obj.options.format) {
                var item = {
                    value: id,
                    text: title,
                }
            } else {
                var item = {
                    id: id,
                    name: title,
                }
            }

            // Callback
            if (typeof (obj.options.onbeforeinsert) == 'function') {
                var ret = obj.options.onbeforeinsert(obj, item);
                if (ret === false) {
                    return false;
                } else if (ret) {
                    item = ret;
                }
            }

            // Add item to the main list
            obj.options.data.push(item);

            // Create DOM
            var newItem = obj.createItem(item);

            // Append DOM to the list
            content.appendChild(newItem.element);

            // Callback
            if (typeof (obj.options.oninsert) == 'function') {
                obj.options.oninsert(obj, item, newItem);
            }

            // Show content
            if (content.style.display == 'none') {
                content.style.display = '';
            }

            // Search?
            if (obj.results) {
                obj.results.push(newItem);
            }

            return item;
        }

        /**
         * Create a new item
         */
        obj.createItem = function (data, group, groupName) {
            // Keep the correct source of data
            if (!obj.options.format) {
                if (!data.value && data.id !== undefined) {
                    data.value = data.id;
                    //delete data.id;
                }
                if (!data.text && data.name !== undefined) {
                    data.text = data.name;
                    //delete data.name;
                }
            } else {
                if (!data.id && data.value !== undefined) {
                    data.id = data.value;
                    //delete data.value;
                }
                if (!data.name && data.text !== undefined) {
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

            // Tooltip
            if (data.tooltip) {
                item.element.setAttribute('title', data.tooltip);
            }

            // Image
            if (data.image) {
                var image = document.createElement('img');
                image.className = 'jdropdown-image';
                image.src = data.image;
                if (!data.title) {
                    image.classList.add('jdropdown-image-small');
                }
                item.element.appendChild(image);
            } else if (data.icon) {
                var icon = document.createElement('span');
                icon.className = "jdropdown-icon material-icons";
                icon.innerText = data.icon;
                if (!data.title) {
                    icon.classList.add('jdropdown-icon-small');
                }
                if (data.color) {
                    icon.style.color = data.color;
                }
                item.element.appendChild(icon);
            } else if (data.color) {
                var color = document.createElement('div');
                color.className = 'jdropdown-color';
                color.style.backgroundColor = data.color;
                item.element.appendChild(color);
            }

            // Set content
            if (!obj.options.format) {
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
            if (!obj.options.format) {
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

        obj.appendData = function (data) {
            // Create elements
            if (data.length) {
                // Helpers
                var items = [];
                var groups = [];

                // Prepare data
                for (var i = 0; i < data.length; i++) {
                    // Process groups
                    if (data[i].group) {
                        if (!groups[data[i].group]) {
                            groups[data[i].group] = [];
                        }
                        groups[data[i].group].push(i);
                    } else {
                        items.push(i);
                    }
                }

                // Number of items counter
                var counter = 0;

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

                            if (obj.options.lazyLoading == false || counter < 200) {
                                groupContent.appendChild(item.element);
                                counter++;
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
                        if (obj.options.lazyLoading == false || counter < 200) {
                            content.appendChild(item.element);
                            counter++;
                        }
                    }
                }
            }
        }

        obj.setData = function (data) {
            // Reset current value
            resetValue();

            // Make sure the content container is blank
            content.innerHTML = '';

            // Reset
            obj.header.value = '';

            // Reset items and values
            obj.items = [];

            // Prepare data
            if (data && data.length) {
                for (var i = 0; i < data.length; i++) {
                    // Compatibility
                    if (typeof (data[i]) != 'object') {
                        // Correct format
                        if (!obj.options.format) {
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

                // Append data
                obj.appendData(data);

                // Update data
                obj.options.data = data;
            } else {
                // Update data
                obj.options.data = [];
            }

            obj.close();
        }

        obj.getData = function () {
            return obj.options.data;
        }

        /**
         * Get position of the item
         */
        obj.getPosition = function (val) {
            for (var i = 0; i < obj.items.length; i++) {
                if (Value(i) == val) {
                    return i;
                }
            }
            return false;
        }

        /**
         * Get dropdown current text
         */
        obj.getText = function (asArray) {
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
        obj.getValue = function (asArray) {
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
        var change = function (oldValue) {
            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof (el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }

            // Events
            if (typeof (obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, oldValue, obj.options.value);
            }
        }

        /**
         * Set value
         */
        obj.setValue = function (newValue) {
            // Current value
            var oldValue = obj.getValue();
            // New value
            if (Array.isArray(newValue)) {
                newValue = newValue.join(';')
            }

            if (oldValue !== newValue) {
                // Set value
                applyValue(newValue);

                // Change
                change(oldValue);
            }
        }

        obj.resetSelected = function () {
            obj.setValue(null);
        }

        obj.selectIndex = function (index, force) {
            // Make sure is a number
            var index = parseInt(index);

            // Only select those existing elements
            if (obj.items && obj.items[index] && (force === true || obj.items[index].data.disabled !== true)) {
                // Reset cursor to a new position
                obj.setCursor(index, false);

                // Behaviour
                if (!obj.options.multiple) {
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

        obj.selectItem = function (item) {
            obj.selectIndex(item.indexValue);
        }

        var exists = function (k, result) {
            for (var j = 0; j < result.length; j++) {
                if (!obj.options.format) {
                    if (result[j].value == k) {
                        return true;
                    }
                } else {
                    if (result[j].id == k) {
                        return true;
                    }
                }
            }
            return false;
        }

        obj.find = function (str) {
            if (obj.search == str.trim()) {
                return false;
            }

            // Search term
            obj.search = str;

            // Reset index
            obj.setCursor();

            // Remove nodes from all groups
            if (obj.groups.length) {
                for (var i = 0; i < obj.groups.length; i++) {
                    obj.groups[i].lastChild.innerHTML = '';
                }
            }

            // Remove all nodes
            content.innerHTML = '';

            // Remove current items in the remote search
            if (obj.options.remoteSearch == true) {
                // Reset results
                obj.results = null;
                // URL
                var url = obj.options.url + (obj.options.url.indexOf('?') > 0 ? '&' : '?') + 'q=' + str;
                // Remote search
                Ajax({
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                    success: function (result) {
                        // Reset items
                        obj.items = [];

                        // Add the current selected items to the results in case they are not there
                        var current = Object.keys(obj.value);
                        if (current.length) {
                            for (var i = 0; i < current.length; i++) {
                                if (!exists(current[i], result)) {
                                    if (!obj.options.format) {
                                        result.unshift({value: current[i], text: obj.value[current[i]]});
                                    } else {
                                        result.unshift({id: current[i], name: obj.value[current[i]]});
                                    }
                                }
                            }
                        }
                        // Append data
                        obj.appendData(result);
                        // Show or hide results
                        if (!result.length) {
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
                var results = [];

                // Append options
                for (var i = 0; i < obj.items.length; i++) {
                    // Item label
                    var label = Text(i);
                    // Item title
                    var title = obj.items[i].data.title || '';
                    // Group name
                    var groupName = obj.items[i].data.group || '';
                    // Synonym
                    var synonym = obj.items[i].data.synonym || '';
                    if (synonym) {
                        synonym = synonym.join(' ');
                    }

                    if (str == null || obj.items[i].selected == true || label.match(str) || title.match(str) || groupName.match(str) || synonym.match(str)) {
                        results.push(obj.items[i]);
                    }
                }

                if (!results.length) {
                    content.style.display = 'none';

                    // Results
                    obj.results = null;
                } else {
                    content.style.display = '';

                    // Results
                    obj.results = results;

                    // Show 200 items at once
                    var number = results.length || 0;

                    // Lazyloading
                    if (obj.options.lazyLoading == true && number > 200) {
                        number = 200;
                    }

                    for (var i = 0; i < number; i++) {
                        if (obj.results[i].group) {
                            if (!obj.results[i].group.parentNode) {
                                content.appendChild(obj.results[i].group);
                            }
                            obj.results[i].group.lastChild.appendChild(obj.results[i].element);
                        } else {
                            content.appendChild(obj.results[i].element);
                        }
                    }
                }
            }

            // Auto focus
            if (obj.options.autofocus == true) {
                obj.first();
            }
        }

        obj.open = function () {
            // Focus
            if (!el.classList.contains('jdropdown-focus')) {
                // Current dropdown
                Component.current = obj;

                // Start tracking
                Tracking(obj, true);

                // Add focus
                el.classList.add('jdropdown-focus');

                // Animation
                if (Helpers.getWindowWidth() < 800) {
                    if (obj.options.type == null || obj.options.type == 'picker') {
                        Animation.slideBottom(container, 1);
                    }
                }

                // Filter
                if (obj.options.autocomplete == true) {
                    obj.header.value = obj.search;
                    obj.header.focus();
                }

                // Set cursor for the first or first selected element
                var k = getValue();
                if (k[0]) {
                    var cursor = obj.getPosition(k[0]);
                    if (cursor !== false) {
                        obj.setCursor(cursor);
                    }
                }

                // Container Size
                if (!obj.options.type || obj.options.type == 'default') {
                    var rect = el.getBoundingClientRect();
                    var rectContainer = container.getBoundingClientRect();

                    if (obj.options.position) {
                        container.style.position = 'fixed';
                        if (window.innerHeight < rect.bottom + rectContainer.height) {
                            container.style.top = '';
                            container.style.bottom = (window.innerHeight - rect.top) + 1 + 'px';
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

                    if (!obj.items.length && obj.options.autocomplete == true) {
                        content.style.display = 'none';
                    } else {
                        content.style.display = '';
                    }
                }
            }

            // Events
            if (typeof (obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }
        }

        obj.close = function (ignoreEvents) {
            if (el.classList.contains('jdropdown-focus')) {
                // Update labels
                obj.header.value = obj.getText();
                // Remove cursor
                obj.setCursor();
                // Events
                if (!ignoreEvents && typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el);
                }
                // Blur
                if (obj.header.blur) {
                    obj.header.blur();
                }
                // Remove focus
                el.classList.remove('jdropdown-focus');
                // Start tracking
                Tracking(obj, false);
                // Current dropdown
                Component.current = null;
            }

            return obj.getValue();
        }

        /**
         * Set cursor
         */
        obj.setCursor = function (index, setPosition) {
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
                index = parseInt(index);

                // Cursor only for visible items
                if (obj.items[index].element.parentNode) {
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
        }

        // Compatibility
        obj.resetCursor = obj.setCursor;
        obj.updateCursor = obj.setCursor;

        /**
         * Reset cursor and selected items
         */
        obj.reset = function () {
            // Reset cursor
            obj.setCursor();

            // Reset selected
            obj.setValue(null);
        }

        /**
         * First available item
         */
        obj.first = function () {
            if (obj.options.lazyLoading === true) {
                obj.loadFirst();
            }

            var items = content.querySelectorAll('.jdropdown-item');
            if (items.length) {
                var newIndex = items[0].indexValue;
                obj.setCursor(newIndex);
            }
        }

        /**
         * Last available item
         */
        obj.last = function () {
            if (obj.options.lazyLoading === true) {
                obj.loadLast();
            }

            var items = content.querySelectorAll('.jdropdown-item');
            if (items.length) {
                var newIndex = items[items.length - 1].indexValue;
                obj.setCursor(newIndex);
            }
        }

        obj.next = function (letter) {
            var newIndex = null;

            if (letter) {
                if (letter.length == 1) {
                    // Current index
                    var current = obj.currentIndex || -1;
                    // Letter
                    letter = letter.toLowerCase();

                    var e = null;
                    var l = null;
                    var items = content.querySelectorAll('.jdropdown-item');
                    if (items.length) {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].indexValue > current) {
                                if (e = obj.items[items[i].indexValue]) {
                                    if (l = e.element.innerText[0]) {
                                        l = l.toLowerCase();
                                        if (letter == l) {
                                            newIndex = items[i].indexValue;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        obj.setCursor(newIndex);
                    }
                }
            } else {
                if (obj.currentIndex == undefined || obj.currentIndex == null) {
                    obj.first();
                } else {
                    var element = obj.items[obj.currentIndex].element;

                    var next = element.nextElementSibling;
                    if (next) {
                        if (next.classList.contains('jdropdown-group')) {
                            next = next.lastChild.firstChild;
                        }
                        newIndex = next.indexValue;
                    } else {
                        if (element.parentNode.classList.contains('jdropdown-group-items')) {
                            if (next = element.parentNode.parentNode.nextElementSibling) {
                                if (next.classList.contains('jdropdown-group')) {
                                    next = next.lastChild.firstChild;
                                } else if (next.classList.contains('jdropdown-item')) {
                                    newIndex = next.indexValue;
                                } else {
                                    next = null;
                                }
                            }

                            if (next) {
                                newIndex = next.indexValue;
                            }
                        }
                    }

                    if (newIndex !== null) {
                        obj.setCursor(newIndex);
                    }
                }
            }
        }

        obj.prev = function () {
            var newIndex = null;

            if (obj.currentIndex === null) {
                obj.first();
            } else {
                var element = obj.items[obj.currentIndex].element;

                var prev = element.previousElementSibling;
                if (prev) {
                    if (prev.classList.contains('jdropdown-group')) {
                        prev = prev.lastChild.lastChild;
                    }
                    newIndex = prev.indexValue;
                } else {
                    if (element.parentNode.classList.contains('jdropdown-group-items')) {
                        if (prev = element.parentNode.parentNode.previousElementSibling) {
                            if (prev.classList.contains('jdropdown-group')) {
                                prev = prev.lastChild.lastChild;
                            } else if (prev.classList.contains('jdropdown-item')) {
                                newIndex = prev.indexValue;
                            } else {
                                prev = null
                            }
                        }

                        if (prev) {
                            newIndex = prev.indexValue;
                        }
                    }
                }
            }

            if (newIndex !== null) {
                obj.setCursor(newIndex);
            }
        }

        obj.loadFirst = function () {
            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            // Show 200 items at once
            var number = results.length || 0;

            // Lazyloading
            if (obj.options.lazyLoading == true && number > 200) {
                number = 200;
            }

            // Reset container
            content.innerHTML = '';

            // First 200 items
            for (var i = 0; i < number; i++) {
                if (results[i].group) {
                    if (!results[i].group.parentNode) {
                        content.appendChild(results[i].group);
                    }
                    results[i].group.lastChild.appendChild(results[i].element);
                } else {
                    content.appendChild(results[i].element);
                }
            }

            // Scroll go to the begin
            content.scrollTop = 0;
        }

        obj.loadLast = function () {
            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            // Show first page
            var number = results.length;

            // Max 200 items
            if (number > 200) {
                number = number - 200;

                // Reset container
                content.innerHTML = '';

                // First 200 items
                for (var i = number; i < results.length; i++) {
                    if (results[i].group) {
                        if (!results[i].group.parentNode) {
                            content.appendChild(results[i].group);
                        }
                        results[i].group.lastChild.appendChild(results[i].element);
                    } else {
                        content.appendChild(results[i].element);
                    }
                }

                // Scroll go to the begin
                content.scrollTop = content.scrollHeight;
            }
        }

        obj.loadUp = function () {
            var test = false;

            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            var items = content.querySelectorAll('.jdropdown-item');
            var fistItem = items[0].indexValue;
            fistItem = obj.items[fistItem];
            var index = results.indexOf(fistItem) - 1;

            if (index > 0) {
                var number = 0;

                while (index > 0 && results[index] && number < 200) {
                    if (results[index].group) {
                        if (!results[index].group.parentNode) {
                            content.insertBefore(results[index].group, content.firstChild);
                        }
                        results[index].group.lastChild.insertBefore(results[index].element, results[index].group.lastChild.firstChild);
                    } else {
                        content.insertBefore(results[index].element, content.firstChild);
                    }

                    index--;
                    number++;
                }

                // New item added
                test = true;
            }

            return test;
        }

        obj.loadDown = function () {
            var test = false;

            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            var items = content.querySelectorAll('.jdropdown-item');
            var lastItem = items[items.length - 1].indexValue;
            lastItem = obj.items[lastItem];
            var index = results.indexOf(lastItem) + 1;

            if (index < results.length) {
                var number = 0;
                while (index < results.length && results[index] && number < 200) {
                    if (results[index].group) {
                        if (!results[index].group.parentNode) {
                            content.appendChild(results[index].group);
                        }
                        results[index].group.lastChild.appendChild(results[index].element);
                    } else {
                        content.appendChild(results[index].element);
                    }

                    index++;
                    number++;
                }

                // New item added
                test = true;
            }

            return test;
        }

        init();

        return obj;
    });

    Component.keydown = function (e) {
        var dropdown = null;
        if (dropdown = Component.current) {
            if (e.which == 13 || e.which == 9) {  // enter or tab
                if (dropdown.header.value && dropdown.currentIndex == null && dropdown.options.newOptions) {
                    // if they typed something in, but it matched nothing, and newOptions are allowed, start that flow
                    dropdown.add();
                } else {
                    // Quick Select/Filter
                    if (dropdown.currentIndex == null && dropdown.options.autocomplete == true && dropdown.header.value != "") {
                        dropdown.find(dropdown.header.value);
                    }
                    dropdown.selectIndex(dropdown.currentIndex);
                }
            } else if (e.which == 38) {  // up arrow
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex > 0) {
                    dropdown.prev();
                }
                e.preventDefault();
            } else if (e.which == 40) {  // down arrow
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                    dropdown.next();
                }
                e.preventDefault();
            } else if (e.which == 36) {
                dropdown.first();
                if (!e.target.classList.contains('jdropdown-header')) {
                    e.preventDefault();
                }
            } else if (e.which == 35) {
                dropdown.last();
                if (!e.target.classList.contains('jdropdown-header')) {
                    e.preventDefault();
                }
            } else if (e.which == 27) {
                dropdown.close();
            } else if (e.which == 33) {  // page up
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex > 0) {
                    for (var i = 0; i < 7; i++) {
                        dropdown.prev()
                    }
                }
                e.preventDefault();
            } else if (e.which == 34) {  // page down
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                    for (var i = 0; i < 7; i++) {
                        dropdown.next()
                    }
                }
                e.preventDefault();
            }
        }
    }

    Component.mouseup = function (e) {
        var element = Helpers.findElement(e.target, 'jdropdown');
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

    Component.extractFromDom = function (el, options) {
        // Keep reference
        var select = el;
        if (!options) {
            options = {};
        }
        // Prepare configuration
        if (el.getAttribute('multiple') && (!options || options.multiple == undefined)) {
            options.multiple = true;
        }
        if (el.getAttribute('placeholder') && (!options || options.placeholder == undefined)) {
            options.placeholder = el.getAttribute('placeholder');
        }
        if (el.getAttribute('data-autocomplete') && (!options || options.autocomplete == undefined)) {
            options.autocomplete = true;
        }
        if (!options || options.width == undefined) {
            options.width = el.offsetWidth;
        }
        if (el.value && (!options || options.value == undefined)) {
            options.value = el.value;
        }
        if (!options || options.data == undefined) {
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
        if (!options || options.onchange == undefined) {
            options.onchange = function (a, b, c, d) {
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

        return {el: el, options: options};
    }

    return Component;
}

export default Dropdown();