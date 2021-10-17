/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Signature pad
 *
 * MIT License
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.template = factory();
}(this, (function () {

    'use strict';

    // Load jSuites
    if (typeof(jSuites) == 'undefined') {
        if (typeof(require) === 'function') {
            var jSuites = require('jsuites');
        } else if (window.jSuites) {
            var jSuites = window.jSuites;
        } else {
            var jSuites = null;
        }
    }

    var Plugin = (function (el, options) {
        // Update configuration
        if (el.classList.contains('jtemplate')) {
            return el.template.setOptions(options);
        }

        var obj = {};
        obj.options = {};

        // Search controls
        var pageNumber = 0;
        var searchTimer = null;
        var searchResults = null;

        // Parse events inside the template
        var parse = function (element) {
            // Attributes
            var attr = {};

            if (element.attributes && element.attributes.length) {
                for (var i = 0; i < element.attributes.length; i++) {
                    attr[element.attributes[i].name] = element.attributes[i].value;
                }
            }

            // Keys
            var k = Object.keys(attr);

            if (k.length) {
                for (var i = 0; i < k.length; i++) {
                    // Parse events
                    if (k[i].substring(0, 2) == 'on') {
                        // Get event
                        var event = k[i].toLowerCase();
                        var value = attr[k[i]];

                        // Get action
                        element.removeAttribute(event);
                        if (!element.events) {
                            element.events = []
                        }

                        // Keep method to the event
                        element[k[i].substring(2)] = value;
                        if (obj.options.version == 2) {
                            element[event] = function (e) {
                                Function('template', 'e', element[e.type]).call(element, obj.options.template, e);
                            }
                        } else {
                            element[event] = function (e) {
                                Function('e', 'element', element[e.type]).call(obj.options.template, e, element);
                            }
                        }
                    }
                }
            }

            // Check the children
            if (element.children.length) {
                for (var i = 0; i < element.children.length; i++) {
                    parse(element.children[i]);
                }
            }
        }

        /**
         * Set the options
         */
        obj.setOptions = function () {
            // Default configuration
            var defaults = {
                version: null,
                url: null,
                data: null,
                total: null,
                filter: null,
                template: null,
                render: null,
                noRecordsFound: 'No records found',
                containerClass: null,
                // Searchable
                search: null,
                searchInput: true,
                searchPlaceHolder: '',
                searchValue: '',
                // Remote search
                remoteData: false,
                // Pagination page number of items
                pagination: null,
                // Events
                onload: null,
                onupdate: null,
                onchange: null,
                onsearch: null,
                onclick: null,
                oncreateitem: null,
            }

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else if (typeof (obj.options[property]) === 'undefined') {
                    obj.options[property] = defaults[property];
                }
            }

            // Pagination container
            if (obj.options.pagination) {
                el.insertBefore(pagination, el.firstChild);
            } else {
                if (pagination && pagination.parentNode) {
                    el.removeChild(pagination);
                }
            }


            // Input search
            if (obj.options.search && obj.options.searchInput == true) {
                el.insertBefore(searchContainer, el.firstChild);
                // Input value
                obj.searchInput.value = obj.options.searchValue;
            } else {
                if (searchContainer && searchContainer.parentNode) {
                    el.removeChild(searchContainer);
                }
            }

            // Search placeholder
            if (obj.options.searchPlaceHolder) {
                obj.searchInput.setAttribute('placeholder', obj.options.searchPlaceHolder);
            } else {
                obj.searchInput.removeAttribute('placeholder');
            }

            // Class for the container
            if (obj.options.containerClass) {
                container.classList.add(obj.options.containerClass);
            }
        }

        /**
         * Contains the cache of local data loaded
         */
        obj.cache = [];

        /**
         * Append data to the template and add to the DOMContainer
         * @param data
         * @param contentDOMContainer
         */
        obj.setContent = function (a, b) {
            // Get template
            var c = obj.options.template[Object.keys(obj.options.template)[0]](a, obj);
            // Process events
            if ((c instanceof Element || c instanceof HTMLDocument)) {
                b.appendChild(c);
            } else {
                b.innerHTML = c;
            }

            parse(b);

            // Oncreate a new item
            if (typeof (obj.options.oncreateitem) == 'function') {
                obj.options.oncreateitem(el, obj, b.children[0], a);
            }
        }

        /**
         * Add a new option in the data
         */
        obj.addItem = function (data, beginOfDataSet) {
            // Append itens
            var content = document.createElement('div');
            // Append data
            if (beginOfDataSet) {
                obj.options.data.unshift(data);
            } else {
                obj.options.data.push(data);
            }
            // If is empty remove indication
            if (container.classList.contains('jtemplate-empty')) {
                container.classList.remove('jtemplate-empty');
                container.innerHTML = '';
            }
            // Get content
            obj.setContent(data, content);
            // Add animation
            jSuites.animation.fadeIn(content.children[0]);
            // Add and do the animation
            if (beginOfDataSet) {
                container.prepend(content.children[0]);
            } else {
                container.append(content.children[0]);
            }
            // Onchange method
            if (typeof (obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj.options.data);
            }
        }

        /**
         * Remove the item from the data
         */
        obj.removeItem = function (element) {
            if (Array.prototype.indexOf.call(container.children, element) > -1) {
                // Remove data from array
                var index = obj.options.data.indexOf(element.dataReference);
                if (index > -1) {
                    obj.options.data.splice(index, 1);
                }
                // Remove element from DOM
                jSuites.animation.fadeOut(element, function () {
                    element.parentNode.removeChild(element);

                    if (!container.innerHTML) {
                        container.classList.add('jtemplate-empty');
                        container.innerHTML = obj.options.noRecordsFound;
                    }
                });
            } else {
                console.error('Element not found');
            }
        }
        /**
         * Reset the data of the element
         */
        obj.setData = function (data) {
            if (data) {
                // Current page number
                pageNumber = 0;
                // Reset search
                obj.options.searchValue = '';
                // Set data
                obj.options.data = data;
                // Reset any search results
                searchResults = null;

                // Render new data
                obj.render();

                // Onchange method
                if (typeof (obj.options.onchange) == 'function') {
                    obj.options.onchange(el, obj.options.data);
                }
            }
        }

        /**
         * Get the current page number
         */
        obj.getPage = function () {
            return pageNumber;
        }

        /**
         * Append data to the component
         */
        obj.appendData = function (data, p) {
            if (p) {
                pageNumber = p;
            }

            var execute = function (data) {
                // Concat data
                obj.options.data.concat(data);

                var startNumber = 0;
                var finalNumber = data.length;
                // Append itens
                var content = document.createElement('div');
                for (var i = startNumber; i < finalNumber; i++) {
                    obj.setContent(data[i], content)
                    content.children[0].dataReference = data[i];
                    container.appendChild(content.children[0]);
                }

            }

            if (obj.options.url && obj.options.remoteData == true) {
                // URL
                var url = obj.options.url;
                // Data
                var ajaxData = {};
                // Options for backend search
                if (obj.options.remoteData) {
                    // Search value
                    if (obj.options.searchValue) {
                        ajaxData.q = obj.options.searchValue;
                    }
                    // Page number
                    if (pageNumber) {
                        ajaxData.p = pageNumber;
                    }
                    // Number items per page
                    if (obj.options.pagination) {
                        ajaxData.t = obj.options.pagination;
                    }
                }
                // Remote loading
                jSuites.ajax({
                    url: url,
                    method: 'GET',
                    data: ajaxData,
                    dataType: 'json',
                    success: function (data) {
                        execute(data);
                    }
                });
            } else {
                if (!obj.options.data) {
                    console.log('TEMPLATE: no data or external url defined');
                } else {
                    execute(data);
                }
            }
        }

        obj.renderTemplate = function () {
            // Data container
            var data = searchResults ? searchResults : obj.options.data;

            // Data filtering
            if (typeof (obj.options.filter) == 'function') {
                data = obj.options.filter(data);
            }

            // Reset pagination container
            pagination.innerHTML = '';

            if (!data.length) {
                container.innerHTML = obj.options.noRecordsFound;
                container.classList.add('jtemplate-empty');
            } else {
                // Reset content
                container.classList.remove('jtemplate-empty');

                // Create pagination
                if (obj.options.pagination && data.length > obj.options.pagination) {
                    var startNumber = (obj.options.pagination * pageNumber);
                    var finalNumber = (obj.options.pagination * pageNumber) + obj.options.pagination;

                    if (data.length < finalNumber) {
                        var finalNumber = data.length;
                    }
                } else {
                    var startNumber = 0;
                    var finalNumber = data.length;
                }

                // Append itens
                var content = document.createElement('div');
                for (var i = startNumber; i < finalNumber; i++) {
                    // Check if cache obj contains the element
                    if (!data[i].element) {
                        obj.setContent(data[i], content);
                        content.children[0].dataReference = data[i];
                        data[i].element = content.children[0];
                        // append element into cache
                        obj.cache.push(data[i]);
                        container.appendChild(content.children[0]);
                    } else {
                        container.appendChild(data[i].element);
                    }
                }

                if (obj.options.total) {
                    var numberOfPages = Math.ceil(obj.options.total / obj.options.pagination);
                } else {
                    var numberOfPages = Math.ceil(data.length / obj.options.pagination);
                }

                // Update pagination
                if (obj.options.pagination > 0 && numberOfPages > 1) {
                    // Controllers
                    if (pageNumber < 6) {
                        var startNumber = 0;
                        var finalNumber = numberOfPages < 10 ? numberOfPages : 10;
                    } else if (numberOfPages - pageNumber < 5) {
                        var startNumber = numberOfPages - 9;
                        var finalNumber = numberOfPages;
                        if (startNumber < 0) {
                            startNumber = 0;
                        }
                    } else {
                        var startNumber = pageNumber - 4;
                        var finalNumber = pageNumber + 5;
                    }

                    // First
                    if (startNumber > 0) {
                        var paginationItem = document.createElement('div');
                        paginationItem.innerHTML = '<';
                        paginationItem.title = 0;
                        pagination.appendChild(paginationItem);
                    }

                    // Get page links
                    for (var i = startNumber; i < finalNumber; i++) {
                        var paginationItem = document.createElement('div');
                        paginationItem.innerHTML = (i + 1);
                        pagination.appendChild(paginationItem);

                        if (pageNumber == i) {
                            paginationItem.style.fontWeight = 'bold';
                            paginationItem.style.textDecoration = 'underline';
                        }
                    }

                    // Last
                    if (finalNumber < numberOfPages) {
                        var paginationItem = document.createElement('div');
                        paginationItem.innerHTML = '>';
                        paginationItem.title = numberOfPages - 1;
                        pagination.appendChild(paginationItem);
                    }
                }
            }
        }

        obj.render = function (p, forceLoad) {
            // Update page number
            if (p !== undefined) {
                pageNumber = p;
            }

            // Render data into template
            var execute = function () {
                // Render new content
                if (typeof (obj.options.render) == 'function') {
                    container.innerHTML = obj.options.render(obj);
                } else {
                    container.innerHTML = '';
                }

                // Load data
                obj.renderTemplate();

                // On Update
                if (typeof (obj.options.onupdate) == 'function') {
                    obj.options.onupdate(el, obj, pageNumber);
                }

                if (forceLoad) {
                    // Onload
                    if (typeof (obj.options.onload) == 'function') {
                        obj.options.onload(el, obj, pageNumber);
                    }
                }
            }

            if (obj.options.url && (obj.options.remoteData == true || forceLoad)) {
                // URL
                var url = obj.options.url;
                // Data
                var ajaxData = {};
                // Options for backend search
                if (obj.options.remoteData) {
                    // Search value
                    if (obj.options.searchValue) {
                        ajaxData.q = obj.options.searchValue;
                    }
                    // Page number
                    if (pageNumber) {
                        ajaxData.p = pageNumber;
                    }
                    // Number items per page
                    if (obj.options.pagination) {
                        ajaxData.t = obj.options.pagination;
                    }
                }
                // Remote loading
                jSuites.ajax({
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                    data: ajaxData,
                    success: function (data) {
                        // Search and keep data in the client side
                        if (data.hasOwnProperty("total")) {
                            obj.options.total = data.total;
                            obj.options.data = data.data;
                        } else {
                            obj.options.total = null;
                            obj.options.data = data;
                        }

                        // Load data for the user
                        execute();
                    }
                });
            } else {
                if (!obj.options.data) {
                    console.log('TEMPLATE: no data or external url defined');
                } else {
                    // Load data for the user
                    execute();
                }
            }
        }

        obj.search = function (query) {
            // Page number
            pageNumber = 0;
            // Search query
            obj.options.searchValue = query ? query : '';

            // Filter data
            if (obj.options.remoteData == true || !query) {
                searchResults = null;
            } else {
                var test = function (o, query) {
                    for (var key in o) {
                        var value = o[key];

                        if (('' + value).toLowerCase().search(query) >= 0) {
                            return true;
                        }
                    }
                    return false;
                }

                searchResults = obj.options.data.filter(function (item) {
                    return test(item, query);
                });
            }

            obj.render(0);

            if (typeof (obj.options.onsearch) == 'function') {
                obj.options.onsearch(el, obj, query);
            }
        }

        obj.refresh = function () {
            obj.cache = [];
            obj.render();
        }

        obj.reload = function () {
            obj.cache = [];
            obj.render(0, true);
        }

        /**
         * Events
         */
        el.addEventListener('mousedown', function (e) {
            if (e.target.parentNode.classList.contains('jtemplate-pagination')) {
                var index = e.target.innerText;
                if (index == '<') {
                    obj.render(0);
                } else if (index == '>') {
                    obj.render(e.target.getAttribute('title'));
                } else {
                    obj.render(parseInt(index) - 1);
                }
                e.preventDefault();
            }
        });

        el.addEventListener('mouseup', function (e) {
            if (typeof (obj.options.onclick) == 'function') {
                obj.options.onclick(el, obj, e);
            }
        });

        // Reset content
        el.innerHTML = '';

        // Container
        var container = document.createElement('div');
        container.classList.add('jtemplate-content');
        el.appendChild(container);

        // Pagination container
        var pagination = document.createElement('div');
        pagination.className = 'jtemplate-pagination';

        // Search DOM elements
        var searchContainer = document.createElement('div');
        searchContainer.className = 'jtemplate-results';
        obj.searchInput = document.createElement('input');
        obj.searchInput.onkeyup = function (e) {
            // Clear current trigger
            if (searchTimer) {
                clearTimeout(searchTimer);
            }
            // Prepare search
            searchTimer = setTimeout(function () {
                obj.search(obj.searchInput.value.toLowerCase());
                searchTimer = null;
            }, 300)
        }
        searchContainer.appendChild(obj.searchInput);

        // Set the options
        obj.setOptions(options);

        // Keep the reference in the DOM container
        el.template = obj;

        // Render data
        obj.render(0, true);

        return obj;
    });

    if (window.jSuites) {
        jSuites.setExtensions({ template: Plugin });
    }

    return Plugin;
})));