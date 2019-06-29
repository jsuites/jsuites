var jSuites = function(options) {
    var obj = {}

    // Find root element
    obj.el = document.querySelector('.app');

    // Backdrop
    obj.backdrop = document.createElement('div');
    obj.backdrop.classList.add('jbackdrop');

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
            var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }

        return [ x, y ];
    }

    obj.click = function(el) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
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

    obj.getFiles = function(element) {
        if (! element) {
            console.error('No element defined in the arguments of your method');
        }
        // Clear current data
        var inputs = element.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].remove();
        }

        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var extension = files[i].getAttribute('data-name').toLowerCase().split('.');
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][name]');
                input.value = files[i].getAttribute('data-name').toLowerCase()
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][extension]');
                input.value = extension[1];
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][size]');
                input.value = files[i].getAttribute('data-size');
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][lastmodified]');
                input.value = files[i].getAttribute('data-lastmodified');
                files[i].parentNode.appendChild(input);

                if (files[i].getAttribute('data-cover')) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'files[' + i + '][cover]');
                    input.value = 1;
                    files[i].parentNode.appendChild(input);
                }

                // File thumbs
                var content = files[i].getAttribute('data-thumbs');

                if (content) {
                    if (content.substr(0,4) == 'data') {
                        var content = files[i].getAttribute('data-thumbs').split(',');

                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][thumbs]');
                        input.value = content[1];
                        files[i].parentNode.appendChild(input);
                    } else {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][thumbs]');
                        input.value = content;
                        files[i].parentNode.appendChild(input);
                    }
                }

                // File content
                var content = files[i].getAttribute('src');

                if (content.substr(0,4) == 'data') {
                    var content = files[i].getAttribute('src').split(',');

                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'files[' + i + '][content]');
                    input.value = content[1];
                    files[i].parentNode.appendChild(input);
                } else {
                    if (files[i].classList.contains('jremove')) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][remove]');
                        input.value = 1;
                        files[i].parentNode.appendChild(input);
                    }
                }
            }
        }
    }

    obj.ajax = function(postOptions) {
        if (! postOptions.data) {
            postOptions.data = {};
        }
        postOptions.data = new URLSearchParams(postOptions.data);

        // Remote call
        fetch(postOptions.url, {
            method: postOptions.method ? postOptions.method : 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
            body: postOptions.data
        })
        .then(function(data) {
            data.json().then(function(result) {
                if (postOptions.success && typeof(postOptions.success) == 'function') {
                    postOptions.success(result);
                }
            })
        });
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

    obj.actionDownControl = function(e) {
        jSuites.touchTracker = jSuites.getPosition(e);
        setTimeout(function() {
            jSuites.touchTracker = null;
        }, 300);
    }

    obj.actionUpControl = function(e) {
        var position = jSuites.getPosition(e);

        if (jSuites.touchTracker && (position[0] - jSuites.touchTracker[0]) > 100) {
            // Left
            var event = new CustomEvent("swipeleft");
            document.dispatchEvent(event);
        } else if (jSuites.touchTracker && (jSuites.touchTracker[0] - position[0]) > 100) {
            // Right
            var event = new CustomEvent("swiperight");
            document.dispatchEvent(event);
        } else {
            var element = null;
            if (element = jSuites.getLinkElement(e.target)) {
                var link = element.getAttribute('data-href');
                if (link == 'back') {
                    window.history.back();
                } else {
                    jSuites.page(link);
                }
            }
        }
    }

    // Add events
    document.addEventListener('touchstart', obj.actionDownControl);
    document.addEventListener('touchend', obj.actionUpControl);
    document.addEventListener('keydown', obj.keyDownControls);

    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (jSuites.page && jSuites.page.items && jSuites.page.items[e.state.route]) {
                jSuites.page.items[e.state.route].show(true);
                // Verify toolbar bind with this page
                if (jSuites.page.items[e.state.route].options.toolbar) {
                    jSuites.page.items[e.state.route].options.toolbar.selectItem(jSuites.page.items[e.state.route].options.toolbarItem);
                }
            }
        }
    }

    obj.touchTracker = null;

    return obj;
}();
