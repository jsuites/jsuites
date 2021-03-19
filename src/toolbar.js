jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        container: false,
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

    // Arrow
    var toolbarArrow = document.createElement('div');
    toolbarArrow.classList.add('jtoolbar-item');
    toolbarArrow.classList.add('jtoolbar-arrow');

    var toolbarFloating = document.createElement('div');
    toolbarFloating.classList.add('jtoolbar-floating');
    toolbarArrow.appendChild(toolbarFloating);

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

    var toggleState = function() {
        if (this.classList.contains('jtoolbar-active')) {
            this.classList.remove('jtoolbar-active');
        } else {
            this.classList.add('jtoolbar-active');
        }
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

            // Selected
            if (items[i].state) {
                toolbarItem.toggleState = toggleState;
            }

            if (items[i].active) {
                toolbarItem.classList.add('jtoolbar-active');
            }

            if (items[i].type == 'select' || items[i].type == 'dropdown') {
                jSuites.picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            } else if (items[i].type == 'label') {
                toolbarItem.classList.add('jtoolbar-label');
                toolbarItem.innerHTML = items[i].content;
            } else {
                // Material icons
                var toolbarIcon = document.createElement('i');
                if (typeof(items[i].class) === 'undefined') {
                    toolbarIcon.classList.add('material-icons');
                } else {
                    var c = items[i].class.split(' ');
                    for (var j = 0; j < c.length; j++) {
                        toolbarIcon.classList.add(c[j]);
                    }
                }
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
                        obj.options.app.pages(this.route);
                    }
                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true
                    });
                }
            }

            if (items[i].onclick) {
                toolbarItem.onclick = items[i].onclick.bind(items[i], el, obj, toolbarItem);
            }

            toolbarContent.appendChild(toolbarItem);
        }
    }

    obj.resize = function() {
        el.style.width = el.parentNode.offsetWidth;

        toolbarContent.appendChild(toolbarArrow);
    }

    el.classList.add('jtoolbar');

    if (obj.options.container == true) {
        el.classList.add('jtoolbar-container');
    }

    el.innerHTML = '';
    el.onclick = function(e) {
        var element = jSuites.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }

        if (e.target.classList.contains('jtoolbar-arrow')) {
            e.target.classList.add('jtoolbar-arrow-selected');
            e.target.children[0].focus();
        }
    }

    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);

    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    } else {
        // Not a mobile version
    }

    obj.create(obj.options.items);

    el.toolbar = obj;

    return obj;
});