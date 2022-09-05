jSuites.modal = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        onopen: null,
        onclose: null,
        closed: false,
        width: null,
        height: null,
        title: null,
        padding: null,
        backdrop: true,
        icon: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Title
    if (! obj.options.title && el.getAttribute('title')) {
        obj.options.title = el.getAttribute('title');
    }

    var temp = document.createElement('div');
    while (el.children[0]) {
        temp.appendChild(el.children[0]);
    }

    obj.title = document.createElement('div');
    obj.title.className = 'jmodal_title';
    if (obj.options.icon) {
        obj.title.setAttribute('data-icon', obj.options.icon);
    }

    obj.content = document.createElement('div');
    obj.content.className = 'jmodal_content';
    obj.content.innerHTML = el.innerHTML;

    while (temp.children[0]) {
        obj.content.appendChild(temp.children[0]);
    }

    obj.container = document.createElement('div');
    obj.container.className = 'jmodal';
    obj.container.appendChild(obj.title);
    obj.container.appendChild(obj.content);

    if (obj.options.padding) {
        obj.content.style.padding = obj.options.padding;
    }
    if (obj.options.width) {
        obj.container.style.width = obj.options.width;
    }
    if (obj.options.height) {
        obj.container.style.height = obj.options.height;
    }
    if (obj.options.title) {
        obj.title.innerText = obj.options.title;
    }

    el.innerHTML = '';
    el.style.display = 'none';
    el.appendChild(obj.container);

    // Backdrop
    if (obj.options.backdrop) {
        var backdrop = document.createElement('div');
        backdrop.className = 'jmodal_backdrop';
        backdrop.onclick = function () {
            obj.close();
        }
        el.appendChild(backdrop);
    }

    obj.open = function() {
        el.style.display = 'block';
        // Fullscreen
        var rect = obj.container.getBoundingClientRect();
        if (jSuites.getWindowWidth() < rect.width) {
            obj.container.style.top = '';
            obj.container.style.left = '';
            obj.container.classList.add('jmodal_fullscreen');
            jSuites.animation.slideBottom(obj.container, 1);
        } else {
            if (obj.options.backdrop) {
                backdrop.style.display = 'block';
            }
        }
        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el, obj);
        }
    }

    obj.resetPosition = function() {
        obj.container.style.top = '';
        obj.container.style.left = '';
    }

    obj.isOpen = function() {
        return el.style.display != 'none' ? true : false;
    }

    obj.close = function() {
        if (obj.isOpen()) {
            el.style.display = 'none';
            if (obj.options.backdrop) {
                // Backdrop
                backdrop.style.display = '';
            }
            // Remove fullscreen class
            obj.container.classList.remove('jmodal_fullscreen');
            // Event
            if (typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    if (! jSuites.modal.hasEvents) {
        //  Position
        var tracker = null;

        document.addEventListener('keydown', function(e) {
            if (e.which == 27) {
                var modals = document.querySelectorAll('.jmodal');
                for (var i = 0; i < modals.length; i++) {
                    modals[i].parentNode.modal.close();
                }
            }
        });

        document.addEventListener('mouseup', function(e) {
            var item = jSuites.findElement(e.target, 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    item.parentNode.modal.close();
                }
            }

            if (tracker) {
                tracker.element.style.cursor = 'auto';
                tracker = null;
            }
        });

        document.addEventListener('mousedown', function(e) {
            var item = jSuites.findElement(e.target, 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    // Do nothing
                } else {
                    if (y - rect.top < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if ( window.getSelection ) {
                            window.getSelection().removeAllRanges();
                        }

                        tracker = {
                            left: rect.left,
                            top: rect.top,
                            x: e.clientX,
                            y: e.clientY,
                            width: rect.width,
                            height: rect.height,
                            element: item,
                        }
                    }
                }
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (tracker) {
                e = e || window.event;
                if (e.buttons) {
                    var mouseButton = e.buttons;
                } else if (e.button) {
                    var mouseButton = e.button;
                } else {
                    var mouseButton = e.which;
                }

                if (mouseButton) {
                    tracker.element.style.top = (tracker.top + (e.clientY - tracker.y) + (tracker.height / 2)) + 'px';
                    tracker.element.style.left = (tracker.left + (e.clientX - tracker.x) + (tracker.width / 2)) + 'px';
                    tracker.element.style.cursor = 'move';
                } else {
                    tracker.element.style.cursor = 'auto';
                }
            }
        });

        jSuites.modal.hasEvents = true;
    }

    if (obj.options.url) {
        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'text/html',
            success: function(data) {
                obj.content.innerHTML = data;

                if (! obj.options.closed) {
                    obj.open();
                }
            }
        });
    } else {
        if (! obj.options.closed) {
            obj.open();
        }
    }

    // Keep object available from the node
    el.modal = obj;

    return obj;
});
