jSuites.tags = (function(el, options) {
    // Redefine configuration
    if (el.classList.contains('jtags')) {
        return el.tags.setOptions(options);
    }

    var obj = {};
    obj.options = {};

    // Search helpers
    var searchContainer = null;
    var searchTerms = null;
    var searchIndex = 0;
    var searchTimer = 0;

    obj.setOptions = function(options) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {number} limit - Max number of tags inside the element
         * @property {string} search - The URL for suggestions
         * @property {string} placeholder - The default instruction text on the element
         * @property {validation} validation - Method to validate the tags
         * @property {requestCallback} onbeforechange - Method to be execute before any changes on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onfocus - Method to be execute when on focus
         * @property {requestCallback} onblur - Method to be execute when on blur
         * @property {requestCallback} onload - Method to be execute when the element is loaded
         */
        var defaults = {
            value: null,
            limit: null,
            limitMessage: 'The limit of entries is: ',
            search: null,
            placeholder: null,
            validation: null,
            onbeforechange: null,
            onchange: null,
            onfocus: null,
            onblur: null,
            onload: null,
            colors: null,
        }

        // Loop through though the default configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('data-placeholder', obj.options.placeholder);
        } else {
            el.removeAttribute('data-placeholder');
        }
        el.placeholder = obj.options.placeholder;

        // Make sure element is empty
        if (obj.options.value && obj.options.value != el.value) {
            obj.setValue(obj.options.value);
        }
    }

    /**
     * Add a new tag to the element
     * @param {(?string|Array)} value - The value of the new element
     */
    obj.add = function(value, focus) {
        if (typeof(obj.options.onbeforechange) == 'function') {
            var v = obj.options.onbeforechange(el, obj, value);
            if (v != null) {
                value = v;
            }
        }

        // Close search
        if (searchContainer) {
            searchContainer.style.display = '';
        }

        if (obj.options.limit > 0 && el.children.length >= obj.options.limit) {
            alert(obj.options.limitMessage + ' ' + obj.options.limit);
        } else {
            // Get node
            var node = getSelectionStart();

            // Mix argument string or array
            if (! value || typeof(value) == 'string') {
                var div = document.createElement('div');
                div.innerHTML = value ? value : '<br>';
                div.setAttribute('data-value', value);
                if (node && node.parentNode.classList.contains('jtags')) {
                    el.insertBefore(div, node.nextSibling);
                } else {
                    el.appendChild(div);
                }
            } else {
                if (node && node.parentNode.classList.contains('jtags')) {
                    if (! node.innerText.replace("\n", "")) {
                        el.removeChild(node);
                    }
                }

                for (var i = 0; i <= value.length; i++) {
                    if (! obj.options.limit || el.children.length < obj.options.limit) {
                        var div = document.createElement('div');
                        if (! value[i] || typeof(value[i]) == 'string') {
                            var t = value[i] || '';
                            var v = t;
                            if (! t) {
                                t = '<br>';
                            }
                        } else {
                            var t = value[i].text;
                            var v = value[i].value;
                        }
                        div.innerHTML = t;
                        div.setAttribute('data-value', v);
                        el.appendChild(div);
                    }
                }
            }

            // Place caret
            if (focus) {
                setTimeout(function() {
                    jSuites.focus(div);
                }, 0);
            }

            // Filter
            filter();

            // Change
            change();
        }
    }

    // Remove a item node
    obj.remove = function(node) {
        // Remove node
        node.parentNode.removeChild(node);
        if (! el.children.length) {
            obj.add('');
        }
    }

    /**
     * Get all tags in the element
     * @return {Array} data - All tags as an array
     */
    obj.getData = function() {
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            // Get value
            var text = el.children[i].innerText.replace("\n", "");
            // Get id
            var value = el.children[i].getAttribute('data-value');
            if (! value) {
                value = text;
            }
            // Item
            if (text || value) {
                data.push({ text: text, value: value });
            }
        }
        return data;
    }

    /**
     * Get the value of one tag. Null for all tags
     * @param {?number} index - Tag index number. Null for all tags.
     * @return {string} value - All tags separated by comma
     */
    obj.getValue = function(index) {
        var value = null;

        if (index != null) {
            // Get one individual value
            value = el.children[index].getAttribute('data-value');
            if (! value) {
                value = el.children[index].innerText.replace("\n", "");
            }
        } else {
            // Get all
            var data = [];
            for (var i = 0; i < el.children.length; i++) {
                value = el.children[i].innerText.replace("\n", "");
                if (value) {
                    data.push(obj.getValue(i));
                }
            }
            value = data.join(',');
        }

        return value;
    }

    /**
     * Set the value of the element based on a string separeted by (,|;|\r\n)
     * @param {mixed} value - A string or array object with values
     */
    obj.setValue = function(mixed) {
        if (! mixed) {
            obj.reset();
        } else {
            if (Array.isArray(mixed)) {
                obj.add(mixed);
            } else {
                // Remove whitespaces
                var text = (''+mixed).trim();
                // Tags
                var data = extractTags(text);
                // Reset
                el.innerHTML = '';
                // Add tags to the element
                obj.add(data);
            }
        }
    }

    /**
     * Reset the data from the element
     */
    obj.reset = function() {
        // Empty class
        el.classList.add('jtags-empty');
        // Empty element
        el.innerHTML = '<div><br></div>';
        // Execute changes
        change();
    }

    /**
     * Verify if all tags in the element are valid
     * @return {boolean}
     */
    obj.isValid = function() {
        var test = 0;
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].classList.contains('jtags_error')) {
                test++;
            }
        }
        return test == 0 ? true : false;
    }

    /**
     * Add one element from the suggestions to the element
     * @param {object} item - Node element in the suggestions container
     */ 
    obj.selectIndex = function(item) {
        // Reset terms
        searchTerms = '';
        var node = getSelectionStart();
        // Append text to the caret
        node.innerText = item.getAttribute('data-text');
        // Set node id
        if (item.getAttribute('data-value')) {
            node.setAttribute('data-value', item.getAttribute('data-value'));
        }
        // Close container
        if (searchContainer) {
            searchContainer.style.display = '';
            searchContainer.innerHTML = '';
        }
        // Remove any error
        node.classList.remove('jtags_error');
        // Add new item
        obj.add('', true);
    }

    /**
     * Search for suggestions
     * @param {object} node - Target node for any suggestions
     */
    obj.search = function(node) {
        // Create and append search container to the DOM
        if (! searchContainer) {
            var div = document.createElement('div');
            div.style.position = 'relative';
            el.parentNode.insertBefore(div, el.nextSibling);

            // Create container
            searchContainer = document.createElement('div');
            searchContainer.classList.add('jtags_search');
            div.appendChild(searchContainer);

            var click = function(e) {
                if (e.target.classList.contains('jtags_search_item')) {
                    var element = e.target;
                } else {
                    var element = e.target.parentNode;
                }

                obj.selectIndex(element);
            }

            // Bind events
            if ('touchstart' in document.documentElement === true) {
                searchContainer.addEventListener('touchstart', click);
            } else {
                searchContainer.addEventListener('mousedown', click);
            }
        }

        // Search for
        var terms = node.innerText;

        // Search
        if (terms != searchTerms) {
            // Terms
            searchTerms = terms;
            // Reset index
            searchIndex = 0;

            // If the search option is an array, perform a search on that array
            if (Array.isArray(obj.options.search)) {
                var data = [];

                var i = 0;
                while (i < obj.options.search.length && data.length <= 10) {
                    if (obj.options.search[i].includes(searchTerms)) {
                        data.push(obj.options.search[i]);
                    }

                    i++;
                }

                // Reset container
                searchContainer.innerHTML = '';

                // Print results
                if (! data.length) {
                    // Hide container
                    searchContainer.style.display = '';
                } else {
                    // Show container
                    searchContainer.style.display = 'block';

                    // Show items
                    var len = data.length < 11 ? data.length : 10;
                    for (var i = 0; i < len; i++) {
                        var text;
                        var value

                        if (typeof data[i] === "string") {
                            text = data[i];
                            value = data[i];
                        } else {
                            text = data[1].text;
                            value = data[1].value;
                        }

                        var div = document.createElement('div');
                        div.setAttribute('data-value', value);
                        div.setAttribute('data-text', text);
                        div.className = 'jtags_search_item';

                        if (i == 0) {
                            div.classList.add('selected');
                        }

                        var item = document.createElement('div');
                        item.innerHTML = text;
                        div.appendChild(item);
                        // Append item to the container
                        searchContainer.appendChild(div);
                    }
                }

            // If the search option is a string, make a request using that string as a url
            } else {
                // Get remove results
                jSuites.ajax({
                    url: obj.options.search + searchTerms,
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        // Reset container
                        searchContainer.innerHTML = '';

                        // Print results
                        if (! data.length) {
                            // Show container
                            searchContainer.style.display = '';
                        } else {
                            // Show container
                            searchContainer.style.display = 'block';

                            // Show items
                            var len = data.length < 11 ? data.length : 10;
                            for (var i = 0; i < len; i++) {
                                // Legacy
                                var text = data[i].text;
                                if (! text && data[i].name) {
                                    text = data[i].name;
                                }
                                var value = data[i].value;
                                if (! value && data[i].id) {
                                    value = data[i].id;
                                }

                                var div = document.createElement('div');
                                div.setAttribute('data-value', value);
                                div.setAttribute('data-text', text);
                                div.className = 'jtags_search_item';

                                if (i == 0) {
                                    div.classList.add('selected');
                                }
                                var img = document.createElement('img');
                                if (data[i].image) {
                                    img.src = data[i].image;
                                } else {
                                    img.style.display = 'none';
                                }
                                div.appendChild(img);

                                var item = document.createElement('div');
                                item.innerHTML = text;
                                div.appendChild(item);
                                // Append item to the container
                                searchContainer.appendChild(div);
                            }
                        }
                    }
                });
            }
        }
    }

    // Destroy tags element
    obj.destroy = function() {
        // Bind events
        el.removeEventListener('mouseup', tagsMouseUp);
        el.removeEventListener('keydown', tagsKeyDown);
        el.removeEventListener('keyup', tagsKeyUp);
        el.removeEventListener('paste', tagsPaste);
        el.removeEventListener('focus', tagsFocus);
        el.removeEventListener('blur', tagsBlur);
        // Remove element
        el.parentNode.removeChild(el);
    }

    var change = function() {
        // Value
        obj.options.value = obj.getValue();

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj, obj.options.value);
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
     * Filter tags
     */
    var filter = function() {
        for (var i = 0; i < el.children.length; i++) {
            // Create label design
            if (! obj.getValue(i)) {
                el.children[i].classList.remove('jtags_label');
            } else {
                el.children[i].classList.add('jtags_label');

                // Validation in place
                if (typeof(obj.options.validation) == 'function') {
                    if (obj.getValue(i)) {
                        if (! obj.options.validation(el.children[i], el.children[i].innerText, el.children[i].getAttribute('data-value'))) {
                            el.children[i].classList.add('jtags_error');
                        } else {
                            el.children[i].classList.remove('jtags_error');
                        }
                    } else {
                        el.children[i].classList.remove('jtags_error');
                    }
                }
            }
        }
    }

    /**
     * Selection
     */
    var getSelectionStart = function() {
        var node = document.getSelection().anchorNode;
        if (node) {
            return (node.nodeType == 3 ? node.parentNode : node);
        } else {
            return null;
        }
    }

    /**
     * Extract tags from a string
     * @param {string} text - Raw string
     * @return {Array} data - Array with extracted tags
     */
    var extractTags = function(text) {
        /** @type {Array} */
        var data = [];

        /** @type {string} */
        var word = '';

        // Remove whitespaces
        text = text.trim();

        if (text) {
            for (var i = 0; i < text.length; i++) {
                if (text[i] == ',' || text[i] == ';' || text[i] == '\n') {
                    if (word) {
                        data.push(word.trim());
                        word = '';
                    }
                } else {
                    word += text[i];
                }
            }

            if (word) {
                data.push(word);
            }
        }

        return data;
    }

    /** @type {number} */
    var anchorOffset = 0;

    /**
     * Processing event keydown on the element
     * @param e {object}
     */
    var tagsKeyDown = function(e) {
        // Anchoroffset
        anchorOffset = window.getSelection().anchorOffset;

        // If starts blank create the first element
        if (! el.children.length) {
            var div = document.createElement('div');
            div.innerHTML = '<div><br/></div>';
            el.appendChild(div);
        }
        // Comma
        if (e.key === 'Tab'  || e.key === ';' || e.key === ',') {
            var n = window.getSelection().anchorOffset;
            if (n > 1) {
                if (! obj.options.limit || el.children.length < obj.options.limit) {
                    obj.add('', true);
                }
            }
            e.preventDefault();
        } else if (e.key == 'Enter') {
            // Enter
            if (searchContainer && searchContainer.style.display != '') {
                obj.selectIndex(searchContainer.children[searchIndex]);
            } else {
                var n = window.getSelection().anchorOffset;
                if (n > 1) {
                    if (! obj.options.limit || el.children.length < obj.options.limit) {
                        obj.add('', true);
                    }
                }
            }
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            // Up
            if (searchContainer && searchContainer.style.display != '') {
                searchContainer.children[searchIndex].classList.remove('selected');
                if (searchIndex > 0) {
                    searchIndex--;
                }
                searchContainer.children[searchIndex].classList.add('selected');
                e.preventDefault();
            }
        } else if (e.key === 'ArrowDown') {
            // Down
            if (searchContainer && searchContainer.style.display != '') {
                searchContainer.children[searchIndex].classList.remove('selected');
                if (searchIndex < 9) {
                    searchIndex++;
                }
                searchContainer.children[searchIndex].classList.add('selected');
                e.preventDefault();
            }
        } else if (e.key == 'Backspace') {
            // Back space - do not let last item to be removed
            if (el.children.length == 1 && window.getSelection().anchorOffset < 1) {
                e.preventDefault();
            }
        }
    }

    var getFocusedNode = function () {
        var node = document.getSelection().anchorNode;
        return (node.nodeType == 3 ? node.parentNode : node);
     }

    /**
     * Processing event keyup on the element
     * @param e {object}
     */
    var tagsKeyUp = function(e) {
        if (e.which == 39) {
            // Right arrow
            var n = window.getSelection().anchorOffset;
            if (n > 1 && n == anchorOffset) {
                obj.add('', true);
            }
        } else if (e.which == 13 || e.which == 38 || e.which == 40) {
            e.preventDefault();
        } else if (e.which == 8) {
            // Back space - add a new element just in case is blank
            if (! el.innerHTML) {
                obj.add('', true);
            }
            e.preventDefault();
        } else if (e.which == 46) {
            // Verify content and don't let blank element
            if (! el.children.length) {
                var div = document.createElement('div');
                div.innerHTML = '<div><br/></div>';
                el.appendChild(div);
            }
            e.preventDefault();
        } else {
            if (searchTimer) {
                clearTimeout(searchTimer);
            }

            searchTimer = setTimeout(function() {
                // Current node
                var node = getFocusedNode();
                if (node) {
                    // Search
                    if (obj.options.search) {
                        obj.search(node);
                    }
                }
                searchTimer = null;
            }, 300);
        }

        filter();
    }

    /**
     * Processing event paste on the element
     * @param e {object}
     */
    var tagsPaste =  function(e) {
        if (e.clipboardData || e.originalEvent.clipboardData) {
            var html = (e.originalEvent || e).clipboardData.getData('text/html');
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            var html = window.clipboardData.getData('Html');
            var text = window.clipboardData.getData('Text');
        }

        obj.setValue(text);
        e.preventDefault();
    }

    /**
     * Processing event mouseup on the element
     * @param e {object}
     */
    var tagsMouseUp = function(e) {
        if (e.target.parentNode && e.target.parentNode.classList.contains('jtags')) {
            if (e.target.classList.contains('jtags_label') || e.target.classList.contains('jtags_error')) {
                var rect = e.target.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 16) {
                    obj.remove(e.target);
                }
            }
        }

        if (searchContainer) {
            searchContainer.style.display = '';
        }
    }

    /**
     * Processing event focus on the element
     * @param e {object}
     */
    var tagsFocus = function(e) {
        if (! el.children.length || obj.getValue(el.children.length - 1)) {
            if (! obj.options.limit || el.children.length < obj.options.limit) {
                var div = document.createElement('div');
                div.innerHTML = '<br>';
                el.appendChild(div);
            }
        }

        if (typeof(obj.options.onfocus) == 'function') {
            obj.options.onfocus(el, obj, obj.getValue());
        }

        el.classList.add('jtags-focus');
    }

    /**
     * Processing event blur on the element
     * @param e {object}
     */
    var tagsBlur = function(e) {
        if (searchContainer) {
            setTimeout(function() {
                searchContainer.style.display = '';
            }, 200);
        }

        for (var i = 0; i < el.children.length - 1; i++) {
            // Create label design
            if (! obj.getValue(i)) {
                el.removeChild(el.children[i]);
            }
        }

        if (typeof(obj.options.onblur) == 'function') {
            obj.options.onblur(el, obj, obj.getValue());
        }

        change();

        // Focus CSS
        el.classList.remove('jtags-focus');

        // Empty CSS
        if (el.children[0].innerText.trim()) {
            el.classList.remove('jtags-empty');
        } else {
            el.classList.add('jtags-empty');
        }
    }

    var init = function() {
        // Initial options
        obj.setOptions(options);
        // Force initial value
        obj.setValue(obj.options.value);

        // Bind events
        if ('touchend' in document.documentElement === true) {
            el.addEventListener('touchend', tagsMouseUp);
        } else {
            el.addEventListener('mouseup', tagsMouseUp);
        }

        el.addEventListener('keydown', tagsKeyDown);
        el.addEventListener('keyup', tagsKeyUp);
        el.addEventListener('paste', tagsPaste);
        el.addEventListener('focus', tagsFocus);
        el.addEventListener('blur', tagsBlur);

        // Prepare container
        el.classList.add('jtags');
        el.setAttribute('contenteditable', true);
        el.setAttribute('spellcheck', false);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change methods
        el.change = obj.setValue;

        el.tags = obj;
    }

    init();

    return obj;
});