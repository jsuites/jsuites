jSuites.mobile = (function(el, options) {
    var obj = {};
    obj.options = {};

    return obj;
});

jSuites.page = (function(route, options) {
    if (! route) {
        console.error('It is not possible to create a page without a route');
        return;
    }

    if (jSuites.page.items && jSuites.page.items[route]) {
        var obj = jSuites.page.items[route];
        obj.show();
        return obj;
    }

    var obj = {};
    obj.options = options || {};

    // Default configuration
    var defaults = {
        closed:false,
        route:null,
        toolbar:null,
        toolbarItem:null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    obj.options.route = route;

    // Base path where the views are stored
    if (! jSuites.page.path) {
        jSuites.page.path = 'pages';
    }
    // If no defined path for this file get the default
    if (! obj.options.path) {
        obj.options.path = (jSuites.page.path + route + '.html');
    }
    if (! obj.options.title) {
        obj.options.title = 'Untitled';
    }

    // Create page container
    if (! jSuites.page.container) {
        jSuites.page.container = document.createElement('div');
        jSuites.page.container.className = 'pages';
        if (jSuites.el) {
            jSuites.el.appendChild(jSuites.page.container);
        } else {
            document.body.appendChild(jSuites.page.container);
        }

        // If there is no element yet, can't be closed
        obj.options.closed = false;
    }

    // Create page
    var page = document.createElement('div');

    // Class
    if (obj.options.panel) {
        page.classList.add('panel');
        page.classList.add(obj.options.panel);
    } else {
        page.classList.add('page');
    }

    // Panel goes in the main element
    if (obj.options.panel) {
        //jSuites.el.appendChild(page);
    } else {
        if (! jSuites.page.current) {
            jSuites.page.container.appendChild(page);
        } else {
            jSuites.page.container.insertBefore(page, jSuites.page.current.nextSibling);
        }
    }

    // Keep page in the container
    if (! jSuites.page.items) {
        jSuites.page.items = [];
    }
    jSuites.page.items[route] = obj;

    // Load content
    obj.create = function() {
        var parse = function(html) {
            // Content
            page.innerHTML = html;
            // Default
            if (obj.options.closed == true) {
                page.style.display = 'none';
            } else {
                obj.show();
            }
        }

        fetch(obj.options.path).then(function(data) {
            data.text().then(function(result) {
                // Open
                parse(result);
                // Get javascript
                var script = page.getElementsByTagName('script');
                // Run possible inline scripts
                for (var i = 0; i < script.length; i++) {
                    // Get type
                    var type = script[i].getAttribute('type');
                    if (! type || type == 'text/javascript') {
                        eval(script[i].innerHTML);
                    }
                }
            })
        });
    };

    obj.show = function(historyDirection) {
        if (jSuites.page.current) {
            if (jSuites.page.current == page) {
                jSuites.page.current = page;
            } else {
                if (page.classList.contains('panel')) {
                } else {
                    page.style.display = '';

                    var a = Array.prototype.indexOf.call(jSuites.page.container.children, jSuites.page.current);
                    var b = Array.prototype.indexOf.call(jSuites.page.container.children, page);

                    if (a < b) {
                        jSuites.page.container.classList.add('slide-left-out');
                    } else {
                        jSuites.page.container.classList.add('slide-left-in');
                    }

                    setTimeout(function(){
                        jSuites.page.current.style.display = 'none';
                        jSuites.page.current = page;
                        jSuites.page.container.classList.remove('slide-left-out');
                        jSuites.page.container.classList.remove('slide-left-in');
                    }, 400);
                }
            }
        } else {
            // Show
            page.style.display = '';
            // Keep current
            jSuites.page.current = page;
        }

        // Add history
        if (! historyDirection) {
            // Add history
            window.history.pushState({ route:route }, obj.options.title, obj.options.route);
        }
    }

    obj.create();

    return obj;
});

jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = options;

    var toolbar = document.createElement('div');
    toolbar.classList.add('jtoolbar');
    toolbar.onclick = function(e) {
        var element = jSuites.getElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }
    }

    var toolbarContent = document.createElement('div');
    toolbar.appendChild(toolbarContent);

    for (var i = 0; i < options.items.length; i++) {
        var toolbarItem = document.createElement('div');
        toolbarItem.classList.add('jtoolbar-item');
        if (options.items[i].route) {
            toolbarItem.setAttribute('data-href', options.items[i].route);
            jSuites.page(options.items[i].route, {
                closed: i == 0 ? false : true,
                toolbar:obj,
                toolbarItem:toolbarItem,
            });
            // First item should be selected
            if (i == 0) {
                toolbarItem.classList.add('selected');
            }
        }

        if (options.items[i].icon) {
            var toolbarIcon = document.createElement('i');
            toolbarIcon.classList.add('material-icons');
            toolbarIcon.innerHTML = options.items[i].icon;
            toolbarItem.appendChild(toolbarIcon);
        }

        if (options.items[i].badge) {
            var toolbarBadge = document.createElement('div');
            toolbarBadge.classList.add('badge');
            var toolbarBadgeContent = document.createElement('div');
            toolbarBadgeContent.innerHTML = options.items[i].badge;
            toolbarBadge.appendChild(toolbarBadgeContent);
            toolbarItem.appendChild(toolbarBadge);
        }

        if (options.items[i].title) {
            var toolbarTitle = document.createElement('span');
            toolbarTitle.innerHTML = options.items[i].title;
            toolbarItem.appendChild(toolbarTitle);
        }

        toolbarContent.appendChild(toolbarItem);
    }

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected');
        }
        element.classList.add('selected');
    }

    obj.get = function() {
        return toolbar;
    }

    el.toolbar = obj;

    el.appendChild(toolbar);

    return obj;
});

jSuites.actionsheet = (function() {
    var obj = {};
    obj.options = {};

     var actionsheet = document.createElement('div');
     actionsheet.className = 'jactionsheet';

    var actionContent = document.createElement('div');
    actionContent.className = 'jactionsheet-content';
    actionsheet.appendChild(actionContent);

    obj.open = function(options) {
       obj.options = options;

       obj.options.groups.forEach(function(group) {
            var actionGroup = document.createElement('div');
            actionGroup.className = 'jactionsheet-group';

            group.forEach(function(v) {
                var actionItem = document.createElement('div');
                var actionInput = document.createElement('input');
                actionInput.type = 'button';
                actionInput.value = v.title;
                if (v.className) {
                    actionInput.className = v.className; 
                }
                if (v.onclick) {
                    actionInput.onclick = v.onclick; 
                }
                actionItem.appendChild(actionInput);
                actionGroup.appendChild(actionItem);
            });

            actionContent.appendChild(actionGroup);
        });

        // Append
        actionsheet.style.opacity = 100;
        jSuites.el.appendChild(actionsheet);

        // Animation
        actionContent.classList.add('slide-bottom-in');
    }

    obj.close = function() {
        actionsheet.style.opacity = 0;
        // Remove any existing actionsheet
        actionContent.classList.add('slide-bottom-out');

        // Wait for the animation and remove any actionsheet
        setTimeout(function() {
            actionsheet.remove();
        }, 400);
    }

    return obj;
})();