jSuites.app = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Path
    obj.el = el;
    obj.options.path = 'pages';

    // Global elements
    var panel = null;

    var actionsheet = document.createElement('div');
    actionsheet.className = 'jactionsheet';
    actionsheet.style.display = 'none';

    var actionContent = document.createElement('div');
    actionContent.className = 'jactionsheet-content';
    actionsheet.appendChild(actionContent);

    // Page container
    var pages = document.querySelector('.pages');
    if (! pages) {
        pages = document.createElement('div');
        pages.className = 'pages';
        el.appendChild(pages);
    }

    // App
    el.classList.add('japp');

    // Jsuites
    document.body.classList.add('jsuites');

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
            if (! type || type == 'text/javascript') {
                eval(script[i].innerHTML);
            }
        }
    }

    /**
     * Pages
     */
    obj.pages = function(route, mixed) {
        if (! obj.pages.container[route]) {
            if (! route) {
                console.error('JSUITES: Error, no route provided');
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
                    options.url = obj.options.path + routePath[0] + '.html';
                }
                // Title
                if (! options.title) {
                    options.title = 'Untitled';
                }

                // Create new page
                obj.pages.container[route] = obj.pages.create(options, callback ? callback : null);
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
                        obj.pages.container[route].options.onenter = mixed.onenter;
                    }
                    if (typeof(mixed.onleave) == 'function') {
                        obj.pages.container[route].options.onleave = mixed.onleave;
                    }

                    // Ignore history
                    ignoreHistory = mixed.ignoreHistory ? 1 : 0; 
                }
            }

            obj.pages.show(obj.pages.container[route], ignoreHistory, callback ? callback : null);
        }
    }

    // Container
    obj.pages.container = {};

    /**
     * Show one page
     */
    obj.pages.show = function(page, ignoreHistory, callback) {
        if (obj.page) {
            if (obj.page != page) {
                // Keep scroll in the top
                window.scrollTo({ top: 0 });

                // Show page
                page.style.display = '';

                var a = Array.prototype.indexOf.call(pages.children, obj.page);
                var b = Array.prototype.indexOf.call(pages.children, page);

                // Leave
                if (typeof(obj.page.options.onleave) == 'function') {
                    obj.page.options.onleave(obj.page, page, ignoreHistory);
                }

                jSuites.animation.slideLeft(pages, (a < b ? 0 : 1), function() {
                    obj.page.style.display = 'none';
                    obj.page = page;
                });

                // Enter
                if (typeof(page.options.onenter) == 'function') {
                    page.options.onenter(page, obj.page, ignoreHistory);
                }
            }
        } else {
            // Show
            page.style.display = '';

            // Enter
            if (typeof(page.options.onenter) == 'function') {
                page.options.onenter(page);
            }

            // Keep current
            obj.page = page;
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

    /**
     * Create a new page
     */
    obj.pages.create = function(options, callback) {
        // Create page
        var page = document.createElement('div');
        page.classList.add('page');

        // Always hidden
        page.style.display = 'none';

        // Keep options
        page.options = options ? options : {};

        if (! obj.page) {
            pages.appendChild(page);
        } else {
            pages.insertBefore(page, obj.page.nextSibling);
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
                parseScript(page);
                // Set title
                page.setTitle = function(text) {
                    this.children[0].children[0].children[1].innerHTML = text;
                }
                // Show page
                if (! page.options.closed) {
                    obj.pages.show(page);
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

    // Get page
    obj.pages.get = function(route) {
        if (obj.pages.container[route]) {
            return obj.pages.container[route]; 
        }
    }

    obj.pages.destroy = function() {
        // Current is null
        obj.page = null;
        // Destroy containers
        obj.pages.container = {};
        // Reset container
        if (pages) {
            pages.innerHTML = '';
        }
    }


    /**
     * Panel methods
     */
    obj.panel = function(route, options) {
        if (! panel) {
            // Create element
            panel = document.createElement('div');
            panel.classList.add('panel');
            panel.classList.add('panel-left');
            panel.style.display = 'none';

            // Bind to the app
            el.appendChild(panel);

            // Remote content
            if (route) {
                var url = obj.options.path + route + '.html';

                jSuites.ajax({
                    url: url,
                    method: 'GET',
                    success: function(result) {
                        // Set content
                        panel.innerHTML = result;
                        // Parse scripts
                        parseScript(panel);
                        // Visible?
                        if (! options || ! options.closed) {
                            // Show panel
                            obj.panel.show();
                        }
                    }
                });
            } else {
                obj.panel.show();
            }
        } else {
            obj.panel.show();
        }
    }

    obj.panel.show = function() {
        // Show panel
        panel.style.display = '';

        // Add animation
        if (panel.classList.contains('panel-left')) {
            jSuites.animation.slideLeft(panel, 1);
        } else {
            jSuites.animation.slideRight(panel, 1);
        }
    }

    obj.panel.hide = function() {
        if (panel) {
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

    obj.panel.get = function() {
        return panel;
    }

    obj.panel.destroy = function() {
        el.removeChild(panel);
        panel = null;
    }

    obj.actionsheet = function(options) {
        if (options) {
            obj.actionsheet.options = options;
        }

        // Reset container
        actionContent.innerHTML = '';

        // Create new elements
        for (var i = 0; i < obj.actionsheet.options.length; i++) {
            var actionGroup = document.createElement('div');
            actionGroup.className = 'jactionsheet-group';

            for (var j = 0; j < obj.actionsheet.options[i].length; j++) {
                var v = obj.actionsheet.options[i][j];
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
        el.appendChild(panel);

        // Animation
        jSuites.animation.slideBottom(actionContent, true);
    }

    obj.actionsheet.close = function() {
        if (actionsheet.style.display != 'none') {
            // Remove any existing actionsheet
            jSuites.animation.slideBottom(actionContent, false, function() {
                actionsheet.remove();
                actionsheet.style.display = 'none';
            });
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
            if (panel && panel.style.display != 'none') {
                obj.panel.hide();
            }
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
            if (panel && panel.style.display == 'none') {
                obj.panel.show();
            }
        }
    }

    var actionDown = function(e) {
        // Close any actionsheet if is opened
        if (! actionsheet.style.display) {
            obj.actionsheet.close()
        }

        // Grouped options
        if (e.target.classList.contains('option-title')) {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
            } else {
                e.target.classList.add('selected');
            }
        }

        // App links
        var element = jSuites.findElement(e.target, function(e) {
            return (e.tagName == 'A' || e.tagName == 'DIV') && e.getAttribute('data-href') ? e : false;
        });

        if (element) {
            var link = element.getAttribute('data-href');
            if (link == '#back') {
                window.history.back();
            } else if (link == '#panel') {
                obj.panel();
            } else {
                obj.pages(link);
            }
        }
    }

    el.addEventListener('swipeleft', controlSwipeLeft);
    el.addEventListener('swiperight', controlSwipeRight);

    if ('ontouchstart' in document.documentElement === true) {
        document.addEventListener('touchstart', actionDown);
    } else {
        document.addEventListener('mousedown', actionDown);
    }

    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (obj.pages.get(e.state.route)) {
                obj.pages(e.state.route, { ignoreHistory:true });
            }
        }
    }

    el.app = obj;

    return obj;
});
