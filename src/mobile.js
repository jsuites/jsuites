jApp.mobile = (function(el, options) {
    var obj = {};
    obj.options = {};

    return obj;
});

jApp.page = (function(route, options) {
    if (! route) {
        console.error('It is not possible to create a page without a route');
        return;
    }

    if (jApp.page.items && jApp.page.items[route]) {
        var obj = jApp.page.items[route];
        obj.show();
        return obj;
    }

    var obj = {};
    obj.options = options || {};

    // Default configuration
    var defaults = {
        closed:false,
        route:null,
    };

    // Loop through our object
    for (var prop in defaults) {
        if (options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    obj.options.route = route;

    // Base path where the views are stored
    if (! jApp.page.path) {
        jApp.page.path = 'pages';
    }
    // If no defined path for this file get the default
    if (! obj.options.path) {
        obj.options.path = (jApp.page.path + route + '.html');
    }
    if (! obj.options.title) {
        obj.options.title = 'Untitled';
    }
    var page = document.createElement('div');

    // Class
    if (obj.options.panel) {
        page.classList.add('panel');
        page.classList.add(obj.options.panel);
    } else {
        page.classList.add('page');
    }

    // Container
    if (! jApp.page.container) {
        jApp.page.container = document.createElement('div');
        jApp.page.container.className = 'pages';
        jApp.el.appendChild(jApp.page.container);
    }

    // Index
    var index = jApp.page.container.children.length;
    page.setAttribute('data-index', index);

    // Panel goes in the main element
    if (obj.options.panel) {
        //jApp.el.appendChild(page);
    } else {
        jApp.page.container.appendChild(page);
    }

    // Keep page in the container
    if (! jApp.page.items) {
        jApp.page.items = [];
    }
    jApp.page.items[route] = obj;

    // Load content
    obj.create = function() {
        var parse = function(result) {
            jApp.loading.hide();

            page.innerHTML = result;
            obj.show();
        }

        jApp.loading.show();
        $(page).load(obj.options.path, parse);
    };

    obj.show = function(ignoreEntry) {
        if (jApp.page.current) {
            if (jApp.page.current == page) {
                jApp.page.current = page;
            } else {
                if (page.classList.contains('panel')) {
                } else {
                    var a = parseInt(jApp.page.current.getAttribute('data-index'));
                    var b = parseInt(page.getAttribute('data-index'));
                    page.style.display = '';
                    if (a < b) {
                        jApp.page.container.classList.add('slide-left-out');
                    } else {
                        jApp.page.container.classList.add('slide-left-in');
                    }

                    setTimeout(function(){
                        jApp.page.current.style.display = 'none';
                        jApp.page.current = page;
                        jApp.page.container.classList.remove('slide-left-out');
                        jApp.page.container.classList.remove('slide-left-in');
                    }, 400);
                }
            }
        } else {
            jApp.page.current = page;
        }

        if (! ignoreEntry) {
            // Add history
            history.pushState({ route:route }, obj.options.title, obj.options.route);
        }
    }

    obj.create();

    return obj;
});

jApp.toolbar = (function(el, options) {
    var obj = {};
    obj.options = options;

    var toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    toolbar.onclick = function(e) {
        var element = toolbarContent.children;
        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove('selected');
        }
        if (element = getElement(e.target)) {
            element.classList.add('selected');
        }
    }

    var toolbarContent = document.createElement('div');
    toolbar.appendChild(toolbarContent);

    for (var i = 0; i < options.items.length; i++) {
        var toolbarItem = document.createElement('div');
        toolbarItem.classList.add('toolbar-item');
        var toolbarLink = document.createElement('a');
        if (options.items[i].route) {
            toolbarLink.setAttribute('data-href', options.items[i].route);
           // jApp.page(options.items[i].route, {
           //     closed:true,
           //});
        }

        if (options.items[i].icon) {
            var toolbarIcon = document.createElement('i');
            toolbarIcon.classList.add('material-icons');
            toolbarIcon.innerHTML = options.items[i].icon;
            toolbarLink.appendChild(toolbarIcon);
        }
        if (options.items[i].badge) {
            var toolbarBadge = document.createElement('div');
            toolbarBadge.classList.add('badge');
            var toolbarBadgeContent = document.createElement('div');
            toolbarBadgeContent.innerHTML = options.items[i].badge;
            toolbarBadge.appendChild(toolbarBadgeContent);
            toolbarLink.appendChild(toolbarBadge);
        }
        if (options.items[i].title) {
            var toolbarTitle = document.createElement('span');
            toolbarTitle.innerHTML = options.items[i].title;
            toolbarLink.appendChild(toolbarTitle);
        }

        toolbarItem.appendChild(toolbarLink);
        toolbarContent.appendChild(toolbarItem);
    }

    var getElement = function(element) {
        var item = null;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('toolbar-item')) {
                    item = element;
                }
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return item;
    }

    el.appendChild(toolbar);

    return obj;
});

jApp.actionsheet = (function() {
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
        jApp.el.appendChild(actionsheet);

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