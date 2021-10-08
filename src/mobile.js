jSuites.mobile = (function(el, options) {
    var obj = {};
    obj.options = {};

    if (jSuites.el) {
        jSuites.el.addEventListener('mousedown', function(e) {
            if (e.target.classList.contains('option-title')) {
                if (e.target.classList.contains('selected')) {
                    e.target.classList.remove('selected');
                } else {
                    e.target.classList.add('selected');
                }
            }
        });
    }

    return obj;
})();

jSuites.pages = (function() {
    var container = null;
    var current = null;

    // Create a page
    var createPage = function(options, callback) {
        // Create page
        var page = document.createElement('div');
        page.classList.add('page');

        // Always hidden
        page.style.display = 'none';

        // Keep options
        page.options = options ? options : {};

        if (! current) {
            container.appendChild(page);
        } else {
            container.insertBefore(page, current.nextSibling);
        }

        jSuites.ajax({
            url: page.options.url,
            method: 'GET',
            success: function(result) {
                // Push to refresh controls
                jSuites.refresh(page, page.options.onpush);

                // Open page
                page.innerHTML = result;
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
                // Set title
                page.setTitle = function(text) {
                    this.children[0].children[0].children[1].innerHTML = text;
                }
                // Show page
                if (! page.options.closed) {
                    showPage(page);
                }
                // Onload callback
                if (typeof(page.options.onload) == 'function') {
                    page.options.onload(page);
                }
                // Force callback
                if (typeof(callback) == 'function') {
                    callback(page);
                }
            }
        });

        return page;
    }

    var showPage = function(page, ignoreHistory, callback) {
        if (current) {
            if (current == page) {
                current = page;
            } else {
                // Keep scroll in the top
                window.scrollTo({ top: 0 });

                // Show page
                page.style.display = '';

                var a = Array.prototype.indexOf.call(container.children, current);
                var b = Array.prototype.indexOf.call(container.children, page);

                // Leave
                if (typeof(current.options.onleave) == 'function') {
                    current.options.onleave(current, page, ignoreHistory);
                }

                jSuites.slideLeft(container, (a < b ? 0 : 1), function() {
                    current.style.display = 'none';
                    current = page;
                });

                // Enter
                if (typeof(page.options.onenter) == 'function') {
                    page.options.onenter(page, current, ignoreHistory);
                }
            }
        } else {
            // Show
            page.style.display = '';

            // Keep current
            current = page;

            // Enter
            if (typeof(page.options.onenter) == 'function') {
                page.options.onenter(page);
            }
        }

        // Add history
        if (! ignoreHistory) {
            // Add history
            window.history.pushState({ route: page.options.route }, page.options.title, page.options.route);
        }

        // Callback
        if (typeof(callback) == 'function') {
            callback(page);
        }
    }

    // Init method
    var obj = function(route, mixed) {

        // Create page container
        if (! container) {
            container = document.querySelector('.pages');
            if (! container) {
                container = document.createElement('div');
                container.className = 'pages';
            }

            // Append container to the application
            if (jSuites.el) {
                jSuites.el.appendChild(container);
            } else {
                document.body.appendChild(container);
            }
        }

        if (! obj.pages[route]) {
            if (! route) {
                alert('Error, no route provided');
            } else {
                if (typeof(mixed) == 'function') {
                    var options = {};
                    var callback = mixed;
                } else {
                    // Page options
                    var options = mixed ? mixed : {};
                }

                // Closed
                options.closed = mixed && mixed.closed ? 1 : 0;
                // Keep Route
                options.route = route;

                // New page url
                if (! options.url) {
                    var routePath = route.split('#');
                    options.url = jSuites.pages.path + routePath[0] + '.html';
                }
                // Title
                if (! options.title) {
                    options.title = 'Untitled';
                }

                // Create new page
                obj.pages[route] = createPage(options, callback ? callback : null);
            }
        } else {
            // Update config
            if (mixed) {
                // History
                var ignoreHistory = 0;

                if (typeof(mixed) == 'function') {
                    var callback = mixed;
                } else {
                    if (typeof(mixed.onenter) == 'function') {
                        obj.pages[route].options.onenter = mixed.onenter;
                    }
                    if (typeof(mixed.onleave) == 'function') {
                        obj.pages[route].options.onleave = mixed.onleave;
                    }

                    // Ignore history
                    ignoreHistory = mixed.ignoreHistory ? 1 : 0; 
                }
            }

            showPage(obj.pages[route], ignoreHistory, callback ? callback : null);
        }
    }

    obj.pages = {};

    // Get page
    obj.get = function(route) {
        if (obj.pages[route]) {
            return obj.pages[route]; 
        }
    }

    obj.getContainer = function() {
        return container;
    }

    obj.destroy = function() {
        // Current is null
        current = null;
        // Destroy containers
        obj.pages = {};
        // Reset container
        if (container) {
            container.innerHTML = '';
        }
    }

    return obj;
})();

// Path
jSuites.pages.path = 'pages';

// Panel
jSuites.panel = (function() {
    // No initial panel declared
    var panel = null;

    var obj = function(route) {
        if (! panel) {
            obj.create(jSuites.pages.path + route + '.html');
        }

        // Show panel
        panel.style.display = '';

        // Add animation
        if (panel.classList.contains('panel-left')) {
            jSuites.slideLeft(panel, 1);
        } else {
            jSuites.slideRight(panel, 1);
        }
    }

    obj.create = function(route) {
        if (! panel) {
            // Create element
            panel = document.createElement('div');
            panel.classList.add('panel');
            panel.classList.add('panel-left');
            panel.style.display = 'none';

            // Bind to the app
            if (jSuites.el) {
                jSuites.el.appendChild(panel);
            } else {
                document.body.appendChild(panel);
            }
        }

        // Remote content
        if (route) {
	        var url = jSuites.pages.path + route + '.html';

            jSuites.ajax({
                url: url,
                method: 'GET',
                success: function(result) {
                    // Set content
                    panel.innerHTML = result;
                    // Get javascript
                    var script = panel.getElementsByTagName('script');
                    // Run possible inline scripts
                    for (var i = 0; i < script.length; i++) {
                        // Get type
                        var type = script[i].getAttribute('type');
                        if (! type || type == 'text/javascript') {
                            eval(script[i].innerHTML);
                        }
                    }
                }
            });
        }
    }

    obj.close = function() {
        if (panel) {
            // Animation
            if (panel.classList.contains('panel-left')) {
                jSuites.slideLeft(panel, 0, function() {
                    panel.style.display = 'none';
                });
            } else {
                jSuites.slideRight(panel, 0, function() {
                    panel.style.display = 'none';
                });
            }
        }
    }

    obj.get = function() {
        return panel;
    }

    obj.destroy = function() {
        panel.remove();
        panel = null;
    }

    return obj;
})();

jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = options;

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected');
        }
        element.classList.add('selected');
    }

    obj.hide = function() {
        jSuites.slideBottom(toolbar, 0, function() {
            toolbar.style.display = 'none';
        });
    }

    obj.show = function() {
        toolbar.style.display = '';
        jSuites.slideBottom(toolbar, 1);
    }

    obj.get = function() {
        return toolbar;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        toolbar = null;
    }

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
            jSuites.pages(options.items[i].route, {
                closed: true,
                onenter: function() {
                    obj.selectItem(toolbarItem);
                }
            });
        }

        if (options.items[i].icon) {
            var toolbarIcon = document.createElement('i');
            toolbarIcon.classList.add('material-icons');
            toolbarIcon.innerHTML = options.items[i].icon;
            toolbarItem.appendChild(toolbarIcon);
        }

        var toolbarBadge = document.createElement('div');
        toolbarBadge.classList.add('jbadge');
        var toolbarBadgeContent = document.createElement('div');
        toolbarBadgeContent.innerHTML = options.items[i].badge ? options.items[i].badge : '';
        toolbarBadge.appendChild(toolbarBadgeContent);
        toolbarItem.appendChild(toolbarBadge);

        if (options.items[i].title) {
            var toolbarTitle = document.createElement('span');
            toolbarTitle.innerHTML = options.items[i].title;
            toolbarItem.appendChild(toolbarTitle);
        }

        toolbarContent.appendChild(toolbarItem);
    }

    el.toolbar = obj;

    el.appendChild(toolbar);

    return obj;
});

jSuites.actionsheet = (function() {
    var actionsheet = document.createElement('div');
    actionsheet.className = 'jactionsheet';
    actionsheet.style.display = 'none';

    var actionContent = document.createElement('div');
    actionContent.className = 'jactionsheet-content';
    actionsheet.appendChild(actionContent);

    var obj = function(options) {
        if (options) {
            obj.options = options;
        }

        // Reset container
        actionContent.innerHTML = '';

        // Create new elements
        for (var i = 0; i < obj.options.length; i++) {
            var actionGroup = document.createElement('div');
            actionGroup.className = 'jactionsheet-group';

            for (var j = 0; j < obj.options[i].length; j++) {
                var v = obj.options[i][j];
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
                if (v.action == 'cancel') {
                    actionInput.style.color = 'red';
                }
                actionItem.appendChild(actionInput);
                actionGroup.appendChild(actionItem);
            }

            actionContent.appendChild(actionGroup);
        }

        // Show
        actionsheet.style.display = '';

        // Append
        jSuites.el.appendChild(actionsheet);

        // Animation
        jSuites.slideBottom(actionContent, true);
    }

    obj.close = function() {
        if (actionsheet.style.display != 'none') {
            // Remove any existing actionsheet
            jSuites.slideBottom(actionContent, false, function() {
                actionsheet.remove();
                actionsheet.style.display = 'none';
            });
        }
    }

    var mouseUp = function(e) {
        obj.close();
    }

    actionsheet.addEventListener('mouseup', mouseUp);

    obj.options = {};

    return obj;
})();