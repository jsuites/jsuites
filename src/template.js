/**
 * (c) jTools Element template render
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Template renderer
 */

jSuites.template = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url:null,
        data:null,
        filter:null,
        search:null,
        pagination:null,
        template:null,
        onchange:null,
        pageNumber:0,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Reset content
    el.innerHTML = '';

    // Input search
    if (obj.options.search) {
        var searchContainer = document.createElement('div');
        searchContainer.className = 'jtemplate-results';
        var searchInput = document.createElement('input');
        searchInput.onkeyup = function(e) {
            obj.getData(1, this.value.toLowerCase());
        }
        searchContainer.appendChild(searchInput);
        el.appendChild(searchContainer);
    }

    // Pagination container
    if (obj.options.pagination) {
        var pagination = document.createElement('div');
        pagination.className = 'jtemplate-pagination';
        el.appendChild(pagination);
    }

    // Content
    var container = document.createElement('div');
    container.className = 'jtemplate-content';
    el.appendChild(container);

    // Default getData method
    obj.getData = function(pageNumber, query) {
        // Page number
        obj.options.pageNumber = pageNumber ? pageNumber : 0;

        // Filter data
        if (query) {
            var test = function(o, query) {
                for (var key in o) {
                    var value = o[key];

                    if ((''+value).toLowerCase().search(query) >= 0) {
                        return true;
                    }
                }
                return false;
            }

            var data = obj.options.data.filter(function(item) {
                return test(item, query);
            });
        } else {
            var data = obj.options.data;
        }

        // Method filter
        if (obj.options.filter) {
            var data = obj.options.filter(data);
        }

        if (! data.length) {
            container.innerHTML = 'No records found';
        } else {
            // Reset content
            container.innerHTML = '';

            // Create pagination
            if (obj.options.pagination && data.length > obj.options.pagination) {
                // Update pagination
                obj.updatePagination(data);

                var startNumber = (obj.options.pagination * obj.options.pageNumber);
                var finalNumber = (obj.options.pagination * obj.options.pageNumber) + obj.options.pagination;

                if (data.length < finalNumber) {
                    var finalNumber = obj.options.data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = data.length;
            }

            // Append itens
            var content = document.createElement('div');
            for (var i = startNumber; i < finalNumber; i++) {
                content.innerHTML = obj.options.template[Object.keys(obj.options.template)[0]](data[i]);
                content.children[0].dataReference = data[i]; 
                container.appendChild(content.children[0]);
            }
        }
    }

    obj.updatePagination = function(data) {
        // Data
        if (! data) {
            var data = obj.options.data;
        }

        // Reset pagination container
        pagination.innerHTML = '';

        // Number of pages
        var quantyOfPages = parseInt(data.length / obj.options.pagination);

        // Controllers
        if (obj.options.pageNumber < 6) {
            var startNumber = 1;
            var finalNumber = quantyOfPages < 10 ? quantyOfPages + 1 : 10;
        } else if (quantyOfPages - obj.options.pageNumber < 6) {
            var startNumber = quantyOfPages - 9;
            var finalNumber = quantyOfPages;
        } else {
            var startNumber = obj.options.pageNumber - 4;
            var finalNumber = obj.options.pageNumber + 5;
        }

        // First
        if (startNumber > 1) {
            var paginationItem = document.createElement('div');
            paginationItem.innerHTML = '<';
            paginationItem.title = 1;
            pagination.appendChild(paginationItem);
        }

        // Get page links
        for (var i = startNumber; i <= finalNumber; i++) {
            var paginationItem = document.createElement('div');
            paginationItem.innerHTML = i;
            pagination.appendChild(paginationItem);

            if (obj.options.pageNumber == i - 1) {
                paginationItem.style.fontWeight = 'bold';
            }
        }

        // Last
        if (finalNumber < quantyOfPages) {
            var paginationItem = document.createElement('div');
            paginationItem.innerHTML = '>';
            paginationItem.title = quantyOfPages;
            pagination.appendChild(paginationItem);
        }
    }

    /**
     * Add a new item
     */
    obj.addItem = function(data, beginOfDataSet) {
        // Append itens
        var content = document.createElement('div');
        // Append data
        if (beginOfDataSet) {
            obj.options.data.unshift(data);
        } else {
            obj.options.data.push(data);
        }
        // Get content
        content.innerHTML = obj.options.template[Object.keys(options.template)[0]](data);
        // Add animation
        content.children[0].classList.add('fade-in');
        // Add and do the animation
        if (beginOfDataSet) {
            container.prepend(content.children[0]);
        } else {
            container.append(content.children[0]);
        }
        // Onchange method
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj.options.data);
        }
    }

    obj.removeItem = function(element) {
        if (Array.prototype.indexOf.call(container.children, element) > -1) {
            // Remove data from array
            var index = obj.options.data.indexOf(element.dataReference);
            if (index > -1) {
                obj.options.data.splice(index, 1);
            }
            // Remove element from DOM
            element.classList.add('fade-out');
            setTimeout(function() {
                element.remove();
            }, 1000);
        } else {
            console.error('Element not found');
        }
    }

    obj.setData = function(data) {
        if (data) {
            obj.options.data = data;
        }
        // Render new data
        obj.getData();

        // Onchange method
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj.options.data);
        }
    }

    if (obj.options.url) {
        fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    // Load data
                    obj.setData(data);
                })
            });
    } else {
        obj.getData();
    }

    el.addEventListener('mousedown', function(e) {
        if (e.path[1].classList.contains('jtemplate-pagination')) {
            var index = e.target.innerText;
            if (index == '<') {
                obj.getData(0);
            } else if (index == '>') {
                obj.getData(e.target.getAttribute('title'));
            } else {
                obj.getData(parseInt(index)-1);
            }
            e.preventDefault();
        }
    });

    el.template = obj;

    return obj;
});