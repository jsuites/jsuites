/**
 * (c) jTools Element template render
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Template renderer
 */

jApp.template = (function(el, options) {
    options.getData = function(pageNumber, query) {
        // Node container
        var container = '';

        // Filter data
        if (query) {
            var test = function(obj, query) {
                for (var key in obj) {
                    var value = obj[key];

                    if ((''+value).toLowerCase().search(query) >= 0) {
                        return true;
                    }
                }
                return false;
            }

            var data = options.data.filter(function(item) {
                return test(item, query);
            });
        } else {
            var data = options.data;
        }

        // Method filter
        if (options.filter) {
            data = options.filter(data);
        }

        if (! data.length) {
            container.innerHTML = 'No records found';
        } else {
            var component = options.template[Object.keys(options.template)[0]];

            if (options.pagination) {
                if (! pageNumber) {
                    pageNumber = 1;
                }
                var quantityPerPage = options.pagination;
                startNumber = (options.pagination * (pageNumber - 1));
                finalNumber = (options.pagination * (pageNumber - 1)) + options.pagination;

                if (data.length < finalNumber) {
                    finalNumber = data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = data.length;
            }

            // Append itens
            for (var i = startNumber; i < finalNumber; i++) {
                container += component(data[i]).trim();
            }

            // Create pagination
            if (options.pagination && data.length > options.pagination) {
                // Pagination container
                var pagination = document.createElement('div');
                pagination.className = 'jtemplate-pagination';

                var quantyOfPages = parseInt(data.length / options.pagination);

                if (pageNumber < 6) {
                    startNumber = 1;
                    finalNumber = quantyOfPages < 10 ? quantyOfPages + 1 : 10;
                } else if (quantyOfPages - pageNumber < 6) {
                    startNumber = quantyOfPages - 9;
                    finalNumber = quantyOfPages;
                } else {
                    startNumber = pageNumber - 4;
                    finalNumber = pageNumber + 5;
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

                    if (pageNumber == i) {
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

                container = pagination.outerHTML + container;
            }
        }

        return container;
    };

    if (options.search) {
        var searchContainer = document.createElement('div');
        searchContainer.className = 'jtemplate-results';
        var searchInput = document.createElement('input');
        searchInput.onkeyup = function(e) {
            el.innerHTML = options.getData(1, this.value.toLowerCase());
        }
        searchContainer.appendChild(searchInput);
        el.parentNode.insertBefore(searchContainer, el);
    }

    options.reset = function() {
        el.innerHTML = '';
    }

    options.refresh = function() {
        el.innerHTML = options.render();
    }

    if (options.url) {
        fetch(options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    options.data = data;

                    el.innerHTML = options.render();
                })
            });
    } else {
        el.innerHTML = options.render();
    }

    el.addEventListener('mousedown', (e) => {
        if (e.path[1].classList.contains('jtemplate-pagination')) {
            var index = e.path[0].innerText;
            if (index == '<') {
                el.innerHTML = options.getData(1);
            } else if (index == '>') {
                el.innerHTML = options.getData(e.path[0].getAttribute('title'));
            } else {
                el.innerHTML = options.getData(parseInt(index));
            }
        }
        e.preventDefault();
    });

    el.template = options;

    return options;
});