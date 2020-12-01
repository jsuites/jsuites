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
        onloadpage: null,
        toolbar: null,
        detachHiddenPages: true
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

    obj.setToolbar = function(toolbar) {
        if (toolbar) {
            obj.options.toolbar = toolbar;
        }
        var toolbar = document.createElement('div');
        obj.toolbar = jSuites.toolbar(toolbar, {
            app: obj,
            items: obj.options.toolbar,
        });
        el.appendChild(toolbar);
    }

    /**
     * Pages
     */
    obj.pages = function() {
        /**
         * Create or access a page
         */
        var component = function(route, o, callback) {
            // Page options
            if (o && typeof(o) == 'object') {
                var options = o;
            } else {
                var options = {};
                if (! callback && typeof(o) == 'function') {
                    callback = o;
                }
            }

            // If exists just open
            if (component.container[route]) {
                component.show(component.container[route], options, callback);
            } else {
                // Create a new page
                if (! route) {
                    console.error('JSUITES: Error, no route provided');
                } else {
                    // Closed
                    options.closed = options.closed ? 1 : 0;
                    // Keep Route
                    options.route = route;

                    // New page url
                    if (! options.url) {
                        options.url = obj.options.path + route + '.html';
                    }

                    // Create new page
                    component.create(options, callback);
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

            // Container
            component.container[o.route] = page;

            // Keep options
            page.options = o ? o : {};

            var updateDOM = function() {
                // Remove to avoid id conflicts
                if (component.current && obj.options.detachHiddenPages == true) {
                    while (pages.children[0]) {
                        pages.children[0].parentNode.removeChild(pages.children[0]);
                    }
                }

                if (! component.current) {
                    pages.appendChild(page);
                } else {
                    pages.insertBefore(page, component.current.nextSibling);
                }
            }

            // Create page overwrite
            var ret = null;
            if (typeof(obj.options.onbeforecreatepage) == 'function') {
                var ret = obj.options.onbeforecreatepage(obj, page);
                if (ret === false) {
                    return false;
                }
            }

            jSuites.ajax({
                url: o.url,
                method: 'GET',
                dataType: 'html',
                success: function(result) {
                    // Update DOM
                    updateDOM();

                    // Create page overwrite
                    var ret = null;
                    if (typeof(obj.options.oncreatepage) == 'function') {
                        ret = obj.options.oncreatepage(obj, page, result);
                    }

                    // Push to refresh controls
                    if (typeof(page.options.onpush) == 'function') {
                        jSuites.refresh(page, page.options.onpush);
                    }

                    // Ignore create page actions 
                    if (ret !== false) {
                        // Open page
                        page.innerHTML = result;
                        // Get javascript
                        try {
                            parseScript(page);
                        } catch (e) {
                            console.log(e);
                        }
                    }

                    // Navbar
                    if (page.querySelector('.navbar')) {
                        page.classList.add('with-navbar');
                    }

                    // Global onload callback
                    if (typeof(obj.options.onloadpage) == 'function') {
                        obj.options.onloadpage(page);
                    }

                    // Specific online callback
                    if (typeof(o.onload) == 'function') {
                        o.onload(page);
                    }

                    // Always hidden
                    page.style.display = 'none';

                    // Show page
                    if (! page.options.closed) {
                        component.show(page, o, callback);
                    }
                }
            });

            return page;
        }

        component.show = function(page, o, callback) {
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
                    obj.options.onchangepage(obj, component.current, page, o);
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
                pages.appendChild(page);
            }

            if (component.current) {
                if (component.current != page) {
                    // Show page
                    page.style.display = '';

                    var a = Array.prototype.indexOf.call(pages.children, component.current);
                    var b = Array.prototype.indexOf.call(pages.children, page);

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
                    var rect = pages.getBoundingClientRect();

                    if (rect.width < 800) {
                        window.scrollTo({ top: 0 });
                        jSuites.animation.slideLeft(pages, (a < b ? 0 : 1), function() {
                            if (component.current != page) {
                                pageIsReady();
                            }
                        });
                    } else {
                        if (component.current != page) {
                            pageIsReady();
                        }
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

            // Add history
            if (! o || ! o.ignoreHistory) {
                // Add history
                window.history.pushState({ route: page.options.route }, page.options.title, page.options.route);
            }
        }

        /**
         * Get a page by route
         */
        component.get = function(route) {
            if (component.container[route]) {
                return component.container[route]; 
            }
        }

        /**
         * Destroy a page
         */
        component.destroy = function() {
            // TODO: create a destroy method
        }

        /**
         * Page container controller
         */
        component.container = {};

        /**
         * Pages DOM container
         */
        var pages = el.querySelector('.pages');
        if (! pages) {
            pages = document.createElement('div');
            pages.className = 'pages';
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
                div.innerHTML = pages.innerHTML;
                page.appendChild(div);
            }
            // Container
            var route = window.location.pathname;
            component.container[route] = page;

            // Keep options
            page.options = {};
            page.options.route = route;

            // Current page
            component.current = page;

            // Place the page to the right container
            if (! component.current) {
                pages.appendChild(page);
            } else {
                pages.insertBefore(page, component.current.nextSibling);
            }
        }

        // Append page container to the application
        el.appendChild(pages);

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
    obj.actionsheet = jSuites.actionsheet(el);

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

    var actionElement = null;

    var actionDown = function(e) {
        // Grouped options
        if (e.target.classList.contains('option-title')) {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
            } else {
                e.target.classList.add('selected');
            }
        }

        // Grouped buttons
        if (e.target.parentNode.classList.contains('jbuttons-group')) {
            for (var j = 0; j < e.target.parentNode.children.length; j++) {
                e.target.parentNode.children[j].classList.remove('selected');
            }
            e.target.classList.add('selected');
        }

        // App links
        actionElement = jSuites.findElement(e.target, function(e) {
            return e.tagName == 'A' && e.getAttribute('href') ? e : false;
        });

        if (actionElement) {
            var link = actionElement.getAttribute('href');
            if (link == '#back') {
                window.history.back();
            } else if (link == '#panel') {
                obj.panel();
            } else {
                if (actionElement.classList.contains('link')) {
                    actionElement = null;
                } else {
                    obj.pages(link);
                }
            }
        }
    }

    var actionUp = function(e) {
        obj.actionsheet.close();

        if (actionElement) {
            e.preventDefault();
            actionElement = null;
        }
    }

    el.addEventListener('swipeleft', controlSwipeLeft);
    el.addEventListener('swiperight', controlSwipeRight);

    if ('ontouchstart' in document.documentElement === true) {
        document.addEventListener('touchstart', actionDown);
        document.addEventListener('touchend', actionUp);
    } else {
        document.addEventListener('mousedown', actionDown);
        document.addEventListener('click', function(e) {
            actionUp(e);
        });
    }

    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (obj.pages.get(e.state.route)) {
                obj.pages(e.state.route, { ignoreHistory: true });
            }
        }
    }

    if (obj.options.toolbar) {
        obj.setToolbar();
    }

    el.app = obj;

    return obj;
});

jSuites.actionsheet = (function(el, options) {
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