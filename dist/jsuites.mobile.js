jSuites.app = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        path: 'views',
        onbeforechangepage: null,
        onchangepage: null,
        onbeforecreatepage: null,
        oncreatepage: null,
        onerrorpage: null,
        onloadpage: null,
        toolbar: null,
        route: null,
        detachHiddenPages: false
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // App
    el.classList.add('japp');

    // Toolbar
    var toolbar = document.createElement('div');

    obj.setToolbar = function(o) {
        if (o) {
            obj.options.toolbar = o;
        }
        // Force application
        obj.options.toolbar.app = obj;
        // Set toolbar
        obj.toolbar = jSuites.toolbar(toolbar, obj.options.toolbar);
        // Add to the DOM
        el.appendChild(toolbar);
    }

    obj.hideToolbar = function() {
        if (toolbar.style.display == '') {
           toolbar.style.display = 'none';
        }
    }

    obj.showToolbar = function() {
        if (toolbar.style.display == 'none') {
            toolbar.style.display = '';
        }
    }

    /**
     * Page identification
     */
    var ident = function(route) {
        return route.split('?')[0].replace(/\/\d+$/g, '')
    }

    /**
     * Pages
     */
    obj.pages = function() {
        /**
         * Create or access a page
         */
        var component = function(route, o, callback) {
            var options = {};

            if (o) {
                if (typeof(o) == 'object') {
                    var options = o;
                } else {
                    if (! callback && typeof(o) == 'function') {
                        callback = o;
                    }
                }
            }

            if (typeof(obj.options.route) == 'function') {
                route = obj.options.route(route, options);
            }

            if (route === false) {
                console.error('JSUITES: Permission denied');
            } else {
                // Query string does not make part in the route
                options.ident = ident(route);
                // Current Route
                options.route = route;

                // If exists just open
                if (component.container[options.ident]) {
                    component.show(component.container[options.ident], options, callback);
                } else {
                    // Closed
                    options.closed = options.closed ? 1 : 0;

                    // New page url
                    if (! options.url) {
                        options.url = obj.options.path + options.ident + '.html';
                    }

                    // Create new page
                    var page = component.create(options, callback);

                    // Container
                    component.container[options.ident] = page;
                }
            }
        }

        /**
         * Create a new page
         */
        component.create = function(o, callback) {
            // Create page
            var page = document.createElement('div');
            page.classList.add('page');

            // Keep options
            page.options = o ? o : {};

            // Create page overwrite
            var ret = null;
            if (typeof(obj.options.onbeforecreatepage) == 'function') {
                var ret = obj.options.onbeforecreatepage(obj, page);
                if (ret === false) {
                    return false;
                }
            }

            var updateDOM = function() {
                // Always hidden when created
                page.style.display = 'none';

                // Remove to avoid id conflicts
                if (component.current && obj.options.detachHiddenPages == true) {
                    while (component.element.children[0]) {
                        component.element.children[0].parentNode.removeChild(component.element.children[0]);
                    }
                }

                if (! component.current) {
                    component.element.appendChild(page);
                } else {
                    component.element.insertBefore(page, component.current.nextSibling);
                }
            }

            // URL
            if (o.url.indexOf('?') == -1) {
                var url = o.url + '?';
            } else {
                var url = o.url + '&';
            }

            jSuites.ajax({
                url: url + 'ts=' + new Date().getTime(),
                method: 'GET',
                dataType: 'html',
                queue: true,
                success: function(result) {
                    if (! page.parentNode) {
                        // Update DOM
                        updateDOM();
                    }

                    // Open page
                    page.innerHTML = result;

                    // Get javascript
                    try {
                        parseScript(page);
                    } catch (e) {
                        console.log(e);
                    }

                    // Create page overwrite
                    if (typeof(obj.options.oncreatepage) == 'function') {
                        obj.options.oncreatepage(obj, page, result);
                    }

                    // Push to refresh controls
                    if (typeof(page.options.onpush) == 'function') {
                        jSuites.refresh(page, page.options.onpush);
                    }

                    // Navbar
                    if (page.querySelector('.navbar')) {
                        page.classList.add('with-navbar');
                    }

                    // Global onload callback
                    if (typeof(obj.options.onloadpage) == 'function') {
                        obj.options.onloadpage(obj, page);
                    }

                    // Specific online callback
                    if (typeof(o.onload) == 'function') {
                        o.onload(page);
                    }

                    // Show page
                    if (! page.options.closed) {
                        component.show(page, o, callback);
                    }
                },
                error: function(a,b) {
                    if (typeof(obj.options.onerrorpage) == 'function') {
                        obj.options.onerrorpage(obj, page, a, b);
                    }

                    component.destroy(page);
                }
            });

            return page;
        }

        component.show = function(page, o, callback) {
            if (o) {
                if (o.onenter) {
                    page.options.onenter = o.onenter;
                }
                if (o.onleave) {
                    page.options.onleave = o.onleave;
                }
                if (o.route) {
                    page.options.route = o.route;
                }
            }

            // Add history
            if (! o || ! o.ignoreHistory) {
                // Route
                if (o && o.route) {
                    var route = o.route;
                }  else {
                    var route = page.options.route;
                }
                // Add history
                window.history.pushState({ route: route }, page.options.title, route);
            }

            var pageIsReady = function() {
                if (component.current) {
                    component.current.style.display = 'none';

                    if (component.current && obj.options.detachHiddenPages == true) {
                        if (component.current.parentNode) {
                            component.current.parentNode.removeChild(component.current);
                        }
                    }
                }

                // New page
                if (typeof(obj.options.onchangepage) == 'function') {
                    obj.options.onchangepage(obj, page, component.current, o);
                }

                // Enter event
                if (typeof(page.options.onenter) == 'function') {
                    page.options.onenter(obj, page, component.current);
                }

                // Callback
                if (typeof(callback) == 'function') {
                    callback(obj, page);
                }

                // Current page
                component.current = page;
            }

            // Append page in case was detached
            if (! page.parentNode) {
                component.element.appendChild(page);
            }

            if (component.current) {
                if (component.current != page) {
                    // Show page
                    page.style.display = '';

                    var a = Array.prototype.indexOf.call(component.element.children, component.current);
                    var b = Array.prototype.indexOf.call(component.element.children, page);

                    // Before leave the page
                    if (typeof(obj.options.onbeforechangepage) == 'function') {
                        var ret = obj.options.onbeforechangepage(obj, component.current, page, o);
                        if (ret === false) {
                            return false;
                        }
                    }

                    // Leave event
                    if (typeof(page.options.onleave) == 'function') {
                        page.options.onleave(obj, component.current);
                    }

                    // Animation only on mobile
                    var rect = component.element.getBoundingClientRect();

                    // Move to the top
                    window.scrollTo({ top: 0 });

                    // Page is ready
                    if (rect.width < 800 && obj.options.detachHiddenPages == false) {
                        jSuites.animation.slideLeft(component.element, (a < b ? 0 : 1), function() {
                            if (component.current != page) {
                                pageIsReady();
                            }
                        });
                    } else {
                        if (component.current != page) {
                            pageIsReady();
                        }
                    }
                } else {
                    // New page
                    if (typeof(obj.options.onchangepage) == 'function') {
                        obj.options.onchangepage(obj, page, component.current, o);
                    }

                    // Enter event
                    if (typeof(page.options.onenter) == 'function') {
                        page.options.onenter(obj, page, component.current);
                    }

                    // Page is the same but should execute the callback anyway
                    if (typeof(callback) == 'function') {
                        callback(obj, page);
                    }
                }
            } else {
                // Show
                page.style.display = '';

                // Page is ready
                pageIsReady();
            }

            // Select toolbar item
            if (page.options.toolbarItem) {
                obj.toolbar.selectItem(page.options.toolbarItem);
            }
        }

        /**
         * Get a page by route
         */
        component.get = function(route) {
            var key = ident(route);
            if (component.container[key]) {
                return component.container[key]; 
            }
        }

        /**
         * Reset the page container
         */
        component.reset = function() {
            // Container
            component.element.innerHTML = '';
            // Current
            component.current = null;
        }

        /**
         * Reset the page container
         */
        component.destroy = function(page) {
            if (page) {
                if (page.parentNode) {
                    page.remove();
                }
                delete component.container[page.options.ident];
            } else {
                // Reset container
                component.reset();
                // Destroy references
                component.container = {};
            }
        }

        /**
         * Page container controller
         */
        component.container = {};

        /**
         * Pages DOM container
         */
        var pagesContainer = el.querySelector('.pages');
        if (pagesContainer) {
            component.element = pagesContainer;
        } else {
            component.element = document.createElement('div');
            component.element.className = 'pages';
        }

        // Prefetched content
        if (el.innerHTML) {
            // Create with the prefetched content
            var page = document.createElement('div');
            page.classList.add('page');
            while (el.childNodes[0]) {
                page.appendChild(el.childNodes[0]);
            }
            if (el.innerHTML) {
                var div = document.createElement('div');
                div.innerHTML = component.element.innerHTML;
                page.appendChild(div);
            }
            // Container
            var route = window.location.pathname;
            var i = ident(route);
            component.container[i] = page;

            // Keep options
            page.options = {
                route: route,
                ident: i
            };

            // Current page
            component.current = page;

            // Place the page to the right container
            if (! component.current) {
                component.element.appendChild(page);
            } else {
                component.element.insertBefore(page, component.current.nextSibling);
            }

            // Create page overwrite
            if (typeof(obj.options.oncreatepage) == 'function') {
                obj.options.oncreatepage(obj, page, null);
            }
        }

        // Append page container to the application
        el.appendChild(component.element);

        return component;
    }();

    /**
     * Panel methods
     */
    obj.panel = function() {
        var panel = null;

        var component = function(route, o) {
            if (! panel) {
                // Create element
                panel = document.createElement('div');
                panel.classList.add('panel');
                panel.classList.add('panel-left');
                panel.style.display = 'none';

                // Bind to the app
                el.appendChild(panel);
            }

            // Remote content
            if (route) {
                // URL
                if (! o) {
                    o = {};
                }
                if (! o.url) {
                    o.url = obj.options.path + route + '.html';
                }
                // Route
                o.route = route;
                // Panel
                panel.options = o;

                // Request remote data
                jSuites.ajax({
                    url: o.url,
                    method: 'GET',
                    dataType: 'html',
                    success: function(result) {
                        // Create page overwrite
                        var ret = null;
                        if (typeof(obj.options.oncreatepage) == 'function') {
                            ret = obj.options.oncreatepage(obj, panel, result);
                        }

                        // Ignore create page actions 
                        if (ret !== false) {
                            // Open page
                            panel.innerHTML = result;
                            // Get javascript
                            parseScript(page);
                        }
                    }
                });
            } else {
                component.show();
            }
        }

        component.show = function() {
            // Show panel
            if (panel && panel.style.display == 'none') {
                panel.style.display = '';
                // Add animation
                if (panel.classList.contains('panel-left')) {
                    jSuites.animation.slideLeft(panel, 1);
                } else {
                    jSuites.animation.slideRight(panel, 1);
                }
            }
        }

        component.hide = function() {
            if (panel && panel.style.display == '') {
                // Animation
                if (panel.classList.contains('panel-left')) {
                    jSuites.animation.slideLeft(panel, 0, function() {
                        panel.style.display = 'none';
                    });
                } else {
                    jSuites.animation.slideRight(panel, 0, function() {
                        panel.animation.style.display = 'none';
                    });
                }
            }
        }

        component.get = function() {
            return panel;
        }

        component.destroy = function() {
            el.removeChild(panel);
            panel = null;
        }

        return component;
    }();

    // Actionsheet
    obj.actionsheet = jSuites.actionsheet(el, obj);

    /*
     * Parse javascript from an element
     */
    var parseScript = function(element) {
        // Get javascript
        var script = element.getElementsByTagName('script');
        // Run possible inline scripts
        for (var i = 0; i < script.length; i++) {
            // Get type
            var type = script[i].getAttribute('type');
            if (! type || type == 'text/javascript' || type == 'text/loader') {
                eval(script[i].text);
            }
        }
    }

    var controlSwipeLeft = function(e) {
        var element = jSuites.findElement(e.target, 'option');

        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 100,
                behavior: 'smooth'
            });
        } else {
            obj.panel.hide();
        }
    }

    var controlSwipeRight = function(e) {
        var element = jSuites.findElement(e.target, 'option');
        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            obj.panel.show();
        }
    }

    var action = null;

    var clicked = function(e) {
        // Grouped options
        if (e.target.classList.contains('option-title')) {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
            } else {
                e.target.classList.add('selected');
            }
        }

        // Grouped buttons
        if (e.target.parentNode && e.target.parentNode.classList && e.target.parentNode.classList.contains('jbuttons-group')) {
            for (var j = 0; j < e.target.parentNode.children.length; j++) {
                e.target.parentNode.children[j].classList.remove('selected');
            }
            e.target.classList.add('selected');
        }

        // App links
        var tmp = jSuites.findElement(e.target, function(el) {
            return el.tagName == 'A' && el.getAttribute('href') ? el : false;
        });

        if (tmp) {
            var h = tmp.getAttribute('href');
            if (h.substr(0,2) == '//' || h.substr(0,4) == 'http' || tmp.classList.contains('link')) {
                action = null;
            } else {
                action = {
                    element: tmp,
                    target: e.target,
                };

                setTimeout(function() {
                    action = null;
                }, 400);
            }
        }
    }

    var actionDown = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }

        if (mouseButton < 2) {
            clicked(e);
        }
    }

    var actionUp = function(e) {
        obj.actionsheet.close();
        // Action
        if (action) {
            var h = action.element.getAttribute('href');
            if (h == '#back') {
                window.history.back();
            } else if (h == '#panel') {
                obj.panel();
            } else {
                obj.pages(h);
            }
            e.preventDefault();
            action  = null;
        }
    }

    el.addEventListener('swipeleft', controlSwipeLeft);
    el.addEventListener('swiperight', controlSwipeRight);

    if ('ontouchstart' in document.documentElement === true) {
        document.addEventListener('touchstart', actionDown);
        document.addEventListener('touchend', actionUp);
    } else {
        document.addEventListener('mousedown', actionDown);
        document.addEventListener('click', actionUp);
    }

    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (obj.pages.get(e.state.route)) {
                obj.pages(e.state.route, { ignoreHistory: true });
            } else {
                window.location.href = e.state.route;
            }
        } else {
            window.location.reload();
        }
    }

    if (obj.options.toolbar) {
        obj.setToolbar();
    }

    el.app = obj;

    return obj;
});

jSuites.actionsheet = (function(el, component) {
    var obj = function(options) {
        // Reset container
        actionContent.innerHTML = '';

        // Create new elements
        for (var i = 0; i < options.length; i++) {
            var actionGroup = document.createElement('div');
            actionGroup.className = 'jactionsheet-group';

            for (var j = 0; j < options[i].length; j++) {
                var v = options[i][j];
                var actionItem = document.createElement('div');
                var actionInput = document.createElement('input');
                actionInput.type = 'button';
                actionInput.value = v.title;
                if (v.className) {
                    actionInput.className = v.className; 
                }
                if (v.onclick) {
                    actionInput.event = v.onclick; 
                    actionInput.onclick = function() {
                        this.event(component, this);
                    }
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

        // Animation
        jSuites.animation.slideBottom(actionContent, true);
    }

    obj.close = function() {
        if (actionsheet.style.display != 'none') {
            // Remove any existing actionsheet
            jSuites.animation.slideBottom(actionContent, false, function() {
                actionsheet.style.display = 'none';
            });
        }
    }

    obj.get = function() {
        return actionsheet;
    }

    // Init action sheet
    var actionsheet = document.createElement('div');
    actionsheet.className = 'jactionsheet';
    actionsheet.style.display = 'none';

    var actionContent = document.createElement('div');
    actionContent.className = 'jactionsheet-content';
    actionsheet.appendChild(actionContent);

    // Append actionsheet container to the application
    el.appendChild(actionsheet);

    el.actionsheet = obj;

    return obj;
});

jSuites.dialog = (function() {
    var obj = {};
    obj.options = {};

    var dialog = null;
    var dialogTitle = null;
    var dialogHeader = null;
    var dialogMessage = null;
    var dialogFooter = null;
    var dialogContainer = null;
    var dialogConfirm = null;
    var dialogConfirmButton = null;
    var dialogCancel = null;
    var dialogCancelButton = null;

    obj.open = function(options) {
        if (! jSuites.dialog.hasEvents) {
            obj.init();

            jSuites.dialog.hasEvents = true;
        }
        obj.options = options;

        if (obj.options.title) {
            dialogTitle.innerHTML = obj.options.title;
        }

        if (obj.options.message) {
            dialogMessage.innerHTML = obj.options.message;
        }

        if (! obj.options.confirmLabel) {
            obj.options.confirmLabel = 'OK';
        }
        dialogConfirmButton.value = obj.options.confirmLabel;

        if (! obj.options.cancelLabel) {
            obj.options.cancelLabel = 'Cancel';
        }
        dialogCancelButton.value = obj.options.cancelLabel;

        if (obj.options.type == 'confirm') {
            dialogCancelButton.parentNode.style.display = '';
        } else {
            dialogCancelButton.parentNode.style.display = 'none';
        }

        // Append element to the app
        dialog.style.opacity = 100;

        // Append to the page
        if (jSuites.el) {
            jSuites.el.appendChild(dialog);
        } else {
            document.body.appendChild(dialog);
        }

        // Focus
        dialog.focus();

        // Show
        setTimeout(function() {
            dialogContainer.style.opacity = 100;
        }, 0);
    }

    obj.close = function() {
        dialog.style.opacity = 0;
        dialogContainer.style.opacity = 0;
        setTimeout(function() {
            dialog.remove();
        }, 100);
    }

    obj.init = function() {
        dialog = document.createElement('div');
        dialog.setAttribute('tabindex', '901');
        dialog.className = 'jdialog';
        dialog.id = 'dialog';

        dialogHeader = document.createElement('div');
        dialogHeader.className = 'jdialog-header';

        dialogTitle = document.createElement('div');
        dialogTitle.className = 'jdialog-title';
        dialogHeader.appendChild(dialogTitle);

        dialogMessage = document.createElement('div');
        dialogMessage.className = 'jdialog-message';
        dialogHeader.appendChild(dialogMessage);

        dialogFooter = document.createElement('div');
        dialogFooter.className = 'jdialog-footer';

        dialogContainer = document.createElement('div');
        dialogContainer.className = 'jdialog-container';
        dialogContainer.appendChild(dialogHeader);
        dialogContainer.appendChild(dialogFooter);

        // Confirm
        dialogConfirm = document.createElement('div');
        dialogConfirmButton = document.createElement('input');
        dialogConfirmButton.value = obj.options.confirmLabel;
        dialogConfirmButton.type = 'button';
        dialogConfirmButton.onclick = function() {
            if (typeof(obj.options.onconfirm) == 'function') {
                obj.options.onconfirm();
            }
            obj.close();
        };
        dialogConfirm.appendChild(dialogConfirmButton);
        dialogFooter.appendChild(dialogConfirm);

        // Cancel
        dialogCancel = document.createElement('div');
        dialogCancelButton = document.createElement('input');
        dialogCancelButton.value = obj.options.cancelLabel;
        dialogCancelButton.type = 'button';
        dialogCancelButton.onclick = function() {
            if (typeof(obj.options.oncancel) == 'function') {
                obj.options.oncancel();
            }
            obj.close();
        }
        dialogCancel.appendChild(dialogCancelButton);
        dialogFooter.appendChild(dialogCancel);

        // Dialog
        dialog.appendChild(dialogContainer);

        document.addEventListener('keydown', function(e) {
            if (e.which == 13) {
                if (typeof(obj.options.onconfirm) == 'function') {
                    jSuites.dialog.options.onconfirm();
                }
                obj.close();
            } else if (e.which == 27) {
                obj.close();
            }
        });
    }

    return obj;
})();

jSuites.confirm = (function(message, onconfirm) {
    if (jSuites.getWindowWidth() < 800) {
        jSuites.dialog.open({
            type: 'confirm',
            message: message,
            title: 'Confirmation',
            onconfirm: onconfirm,
        });
    } else {
        if (confirm(message)) {
            onconfirm();
        }
    }
});


jSuites.refresh = (function(el, options) {
    // Controls
    var touchPosition = null;
    var pushToRefresh = null;

    // Page touch move
    var pageTouchMove = function(e, page) {
        if (typeof(page.options.onpush) == 'function') {
            if (page.scrollTop < 5) {
                if (! touchPosition) {
                    touchPosition = {};
                    touchPosition.x = e.touches[0].clientX;
                    touchPosition.y = e.touches[0].clientY;
                }

                var height = e.touches[0].clientY - touchPosition.y;
                if (height > 70) {
                    if (! pushToRefresh.classList.contains('ready')) {
                        pushToRefresh.classList.add('ready');
                    }
                } else {
                    if (pushToRefresh.classList.contains('ready')) {
                        pushToRefresh.classList.remove('ready');
                    }
                    pushToRefresh.style.height = height + 'px';

                    if (height > 20) {
                        if (! pushToRefresh.classList.contains('holding')) {
                            pushToRefresh.classList.add('holding');
                            page.insertBefore(pushToRefresh, page.firstChild);
                        }
                    }
                }
            }
        }
    }

    // Page touch end
    var pageTouchEnd = function(e, page) {
        if (typeof(page.options.onpush) == 'function') {
            // Remove holding
            pushToRefresh.classList.remove('holding');
            // Refresh or not refresh
            if (! pushToRefresh.classList.contains('ready')) {
                // Reset and not refresh
                pushToRefresh.style.height = '';
                obj.hide();
            } else {
                pushToRefresh.classList.remove('ready');
                // Loading indication
                setTimeout(function() {
                    obj.hide();
                }, 1000);

                // Refresh
                if (typeof(page.options.onpush) == 'function') {
                    page.options.onpush(page);
                }
            }
        }
    }

    var obj = function(element, callback) {
        if (! pushToRefresh) {
            pushToRefresh = document.createElement('div');
            pushToRefresh.className = 'jrefresh';
        }

        element.addEventListener('touchmove', function(e) {
            pageTouchMove(e, element);
        });
        element.addEventListener('touchend', function(e) {
            pageTouchEnd(e, element);
        });
        if (! element.options) {
            element.options = {};
        }
        if (typeof(callback) == 'function') {
            element.options.onpush = callback;
        }
    }

    obj.hide = function() {
        if (pushToRefresh.parentNode) {
            pushToRefresh.parentNode.removeChild(pushToRefresh);
        }
        touchPosition = null;
    }

    return obj;
})();
