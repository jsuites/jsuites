jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        badge: false,
        title: false,
        items: [],
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! el && options.app && options.app.el) {
        el = document.createElement('div');
        options.app.el.appendChild(el);
    }

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            if (element != elements[i]) {
                elements[i].classList.remove('jtoolbar-selected');
            }
        }
        element.classList.add('jtoolbar-selected');
    }

    obj.hide = function() {
        jSuites.animation.slideBottom(el, 0, function() {
            el.style.display = 'none';
        });
    }

    obj.show = function() {
        el.style.display = '';
        jSuites.animation.slideBottom(el, 1);
    }

    obj.get = function() {
        return el;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        el.innerHTML = '';
    }

    obj.create = function(items) {
        // Reset anything in the toolbar
        toolbarContent.innerHTML = '';
        // Create elements in the toolbar
        for (var i = 0; i < items.length; i++) {
            var toolbarItem = document.createElement('div');
            toolbarItem.classList.add('jtoolbar-item');

            if (items[i].width) {
                toolbarItem.style.width = parseInt(items[i].width) + 'px'; 
            }

            if (items[i].k) {
                toolbarItem.k = items[i].k;
            }

            if (items[i].tooltip) {
                toolbarItem.setAttribute('title', items[i].tooltip);
            }

            // Id
            if (items[i].id) {
                toolbarItem.setAttribute('id', items[i].id);
            }

            if (! items[i].type || items[i].type == 'i') {
                // Material icons
                var toolbarIcon = document.createElement('i');
                toolbarIcon.classList.add('material-icons');
                toolbarIcon.innerHTML = items[i].content ? items[i].content : '';
                toolbarItem.appendChild(toolbarIcon);

                // Badge options
                if (obj.options.badge == true) {
                    var toolbarBadge = document.createElement('div');
                    toolbarBadge.classList.add('jbadge');
                    var toolbarBadgeContent = document.createElement('div');
                    toolbarBadgeContent.innerHTML = items[i].badge ? items[i].badge : '';
                    toolbarBadge.appendChild(toolbarBadgeContent);
                    toolbarItem.appendChild(toolbarBadge);
                }

                // Title
                if (items[i].title) {
                    if (obj.options.title == true) {
                        var toolbarTitle = document.createElement('span');
                        toolbarTitle.innerHTML = items[i].title;
                        toolbarItem.appendChild(toolbarTitle);
                    } else {
                        toolbarItem.setAttribute('title', items[i].title);
                    }
                }

                if (obj.options.app && items[i].route) {
                    // Route
                    toolbarItem.route = items[i].route;
                    // Onclick for route
                    toolbarItem.onclick = function() {
                        options.app.pages(this.route);
                    }

                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true,
                        onenter: function() {
                            obj.selectItem(this.toolbarItem);
                        }
                    });
                } else if (items[i].onclick) {
                    toolbarItem.onclick = (function (a) {
                        var b = a;
                        return function () {
                            items[b].onclick(el, obj, this);
                        };
                    })(i);
                }
            } else if (items[i].type == 'select' || items[i].type == 'dropdown') {
                if (typeof(items[i].onchange) == 'function') {
                    // Event for picker has different arguments
                    items[i].onchange = (function(o) {
                        return function(a,b,c,d) {
                            o(el, obj, a, c, d);
                        }
                    })(items[i].onchange);
                }
                jSuites.picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            }

            toolbarContent.appendChild(toolbarItem);
        }
    }

    el.classList.add('jtoolbar');

    el.innerHTML = '';
    el.onclick = function(e) {
        var element = jSuites.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }
    }

    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);

    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    }

    obj.create(obj.options.items);

    el.toolbar = obj;

    return obj;
});