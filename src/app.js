var jSuites = function(options) {
    var obj = {}

    // Find root element
    obj.el = document.querySelector('.japp');

    // Backdrop
    obj.backdrop = document.createElement('div');
    obj.backdrop.classList.add('jbackdrop');

    obj.guid = function() {
        var guid = '';
        for (var i = 0; i < 32; i++) {
            guid += Math.floor(Math.random()*0xF).toString(0xF);
        }
        return guid;
    }

    obj.getWindowWidth = function() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x;
    }

    obj.getWindowHeight = function() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return  y;
    }

    obj.getPosition = function(e) {
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY;
        } else {
            var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }

        return [ x, y ];
    }

    obj.click = function(el) {
        if (el.click) {
            el.click();
        } else {
            var evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            el.dispatchEvent(evt);
        }
    }

    obj.getElement = function(element, className) {
        var foundElement = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains(className)) {
                    foundElement = element;
                }
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return foundElement;
    }

    obj.getLinkElement = function(element) {
        var targetElement = false;

        function path (element) {
            if ((element.tagName == 'A' || element.tagName == 'DIV') && element.getAttribute('data-href')) {
                targetElement = element;
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return targetElement;
    }

    obj.getFormElements = function(formObject) {
        var ret = {};

        if (formObject) {
            var elements = formObject.querySelectorAll("input, select, textarea");
        } else {
            var elements = document.querySelectorAll("input, select, textarea");
        }

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                ret[name] = value;
            }
        }

        return ret;
    }

    obj.exists = function(url, __callback) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status) {
            __callback(http.status);
        }
    }

    obj.getFiles = function(element) {
        if (! element) {
            console.error('No element defined in the arguments of your method');
        }

        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            var data = [];
            for (var i = 0; i < files.length; i++) {
                var file = {};

                var src = files[i].getAttribute('src');

                if (files[i].classList.contains('jremove')) {
                    file.remove = 1;
                } else {
                    if (src.substr(0,4) == 'data') {
                        file.content = src.substr(src.indexOf(',') + 1);
                        file.extension = files[i].getAttribute('data-extension');
                    } else {
                        file.file = src;
                        file.extension = files[i].getAttribute('data-extension');
                        if (! file.extension) {
                            file.extension =  src.substr(src.lastIndexOf('.') + 1);
                        }
                        if (jSuites.files[file.file]) {
                            file.content = jSuites.files[file.file];
                        }
                    }

                    // Optional file information
                    if (files[i].getAttribute('data-name')) {
                        file.name = files[i].getAttribute('data-name');
                    }

                    if (files[i].getAttribute('data-file')) {
                        file.file = files[i].getAttribute('data-file');
                    }

                    if (files[i].getAttribute('data-size')) {
                        file.size = files[i].getAttribute('data-size');
                    }

                    if (files[i].getAttribute('data-date')) {
                        file.date = files[i].getAttribute('data-date');
                    }

                    if (files[i].getAttribute('data-cover')) {
                        file.cover = files[i].getAttribute('data-cover');
                    }
                }

                // TODO SMALL thumbs?

                data[i] = file;
            }

            return data;
        }
    }

    obj.ajax = function(options) {
        if (! options.data) {
            options.data = {};
        }

        if (options.type) {
            options.method = options.type;
        }

        if (options.data) {
            var data = [];
            var keys = Object.keys(options.data);

            if (keys.length) {
                for (var i = 0; i < keys.length; i++) {
                    if (typeof(options.data[keys[i]]) == 'object') {
                        var o = options.data[keys[i]];
                        for (var j = 0; j < o.length; j++) {
                            if (typeof(o[j]) == 'string') {
                                data.push(keys[i] + '[' + j + ']=' + encodeURIComponent(o[j]));
                            } else {
                                var prop = Object.keys(o[j]);
                                for (var z = 0; z < prop.length; z++) {
                                    data.push(keys[i] + '[' + j + '][' + prop[z] + ']=' + encodeURIComponent(o[j][prop[z]]));
                                }
                            }
                        }
                    } else {
                        data.push(keys[i] + '=' + encodeURIComponent(options.data[keys[i]]));
                    }
                }
            }

            if (options.method == 'GET' && data.length > 0) {
                if (options.url.indexOf('?') < 0) {
                    options.url += '?';
                }
                options.url += data.join('&');
            }
        }

        var httpRequest = new XMLHttpRequest();
        httpRequest.open(options.method, options.url, true);

        if (options.method == 'POST') {
            httpRequest.setRequestHeader('Accept', 'application/json');
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            if (options.dataType == 'json') {
                httpRequest.setRequestHeader('Content-Type', 'text/json');
            }
        }

        // No cache
        httpRequest.setRequestHeader('pragma', 'no-cache');
        httpRequest.setRequestHeader('cache-control', 'no-cache');

        httpRequest.onload = function() {
            if (httpRequest.status === 200) {
                if (options.dataType == 'json') {
                    var result = JSON.parse(httpRequest.responseText);
                } else {
                    var result = httpRequest.responseText;
                }

                if (options.success && typeof(options.success) == 'function') {
                    options.success(result);
                }
            } else {
                if (options.error && typeof(options.error) == 'function') {
                    options.error(httpRequest.responseText);
                }
            }

            // Global complete method
            if (options.multiple && options.multiple.length) {
                // Get index of this request in the container
                var index = options.multiple[options.multiple.indexOf(httpRequest)];
                // Remove from the ajax requests container
                options.multiple.splice(index, 1);
                // Last one?
                if (! options.multiple.length) {
                    if (options.complete && typeof(options.complete) == 'function') {
                        options.complete(result);
                    }
                }
            }
        }

        if (data) {
            httpRequest.send(data.join('&'));
        } else {
            httpRequest.send();
        }

        return httpRequest;
    }

    obj.slideLeft = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-left-in');
            setTimeout(function() {
                element.classList.remove('slide-left-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-left-out');
            setTimeout(function() {
                element.classList.remove('slide-left-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    obj.slideRight = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-right-in');
            setTimeout(function() {
                element.classList.remove('slide-right-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-right-out');
            setTimeout(function() {
                element.classList.remove('slide-right-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    obj.slideTop = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-top-in');
            setTimeout(function() {
                element.classList.remove('slide-top-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-top-out');
            setTimeout(function() {
                element.classList.remove('slide-top-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    obj.slideBottom = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-bottom-in');
            setTimeout(function() {
                element.classList.remove('slide-bottom-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-bottom-out');
            setTimeout(function() {
                element.classList.remove('slide-bottom-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 100);
        }
    }

    obj.fadeIn = function(element, done) {
        element.classList.add('fade-in');
        setTimeout(function() {
            element.classList.remove('fade-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 2000);
    }

    obj.fadeOut = function(element, done) {
        element.classList.add('fade-out');
        setTimeout(function() {
            element.classList.remove('fade-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 1000);
    }

    obj.keyDownControls = function(e) {
        if (e.which == 27) {
            var nodes = document.querySelectorAll('.jmodal');
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].modal.close();
                }
            }

            var nodes = document.querySelectorAll('.jslider');
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].slider.close();
                }
            }

            if (document.querySelector('.jdialog')) {
                jSuites.dialog.close();
            }
        } else if (e.which == 13) {
            if (document.querySelector('.jdialog')) {
                if (typeof(jSuites.dialog.options.onconfirm) == 'function') {
                    jSuites.dialog.options.onconfirm();
                }
                jSuites.dialog.close();
            }
        }

        // Verify mask
        if (jSuites.mask) {
            jSuites.mask.apply(e);
        }
    }

    obj.actionUpControl = function(e) {
        var element = null;
        if (element = jSuites.getLinkElement(e.target)) {
            var link = element.getAttribute('data-href');
            if (link == '#back') {
                window.history.back();
            } else if (link == '#panel') {
                jSuites.panel();
            } else {
                jSuites.pages(link);
            }
        }
    }

    var controlSwipeLeft = function(e) {
        var element = jSuites.getElement(e.target, 'option');

        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 100,
                behavior: 'smooth'
            });
        } else {
            var element = jSuites.getElement(e.target, 'jcalendar');
            if (element && jSuites.calendar.current) {
                jSuites.calendar.current.prev();
            } else {
                var element = jSuites.panel.get();
                if (element) {
                    if (element.style.display != 'none') {
                        jSuites.panel.close();
                    }
                }
            }
        }
    }

    var controlSwipeRight = function(e) {
        var element = jSuites.getElement(e.target, 'option');
        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            var element = jSuites.getElement(e.target, 'jcalendar');
            if (element && jSuites.calendar.current) {
                jSuites.calendar.current.next();
            } else {
                var element = jSuites.panel.get();
                if (element) {
                    if (element.style.display == 'none') {
                        jSuites.panel();
                    }
                }
            }
        }
    }

    // Create page container
    document.addEventListener('swipeleft', controlSwipeLeft);
    document.addEventListener('swiperight', controlSwipeRight);
    document.addEventListener('keydown', obj.keyDownControls);

    if ('ontouchend' in document.documentElement === true) {
        document.addEventListener('touchend', obj.actionUpControl);
    } else {
        document.addEventListener('mouseup', obj.actionUpControl);
    }

    // Pop state control
    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (jSuites.pages.get(e.state.route)) {
                jSuites.pages(e.state.route, { ignoreHistory:true });
            }
        }
    }

    return obj;
}();

jSuites.files = [];