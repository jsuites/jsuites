jSuites.floating = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        type: 'big',
        title: 'Untitled',
        width: 510,
        height: 472,
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Private methods

    var setContent = function() {
        var temp = document.createElement('div');
        while (el.children[0]) {
            temp.appendChild(el.children[0]);
        }

        obj.content = document.createElement('div');
        obj.content.className = 'jfloating_content';
        obj.content.innerHTML = el.innerHTML;

        while (temp.children[0]) {
            obj.content.appendChild(temp.children[0]);
        }

        obj.container = document.createElement('div');
        obj.container.className = 'jfloating';
        obj.container.appendChild(obj.content);

        if (obj.options.title) {
            obj.container.setAttribute('title', obj.options.title);
        } else {
            obj.container.classList.add('no-title');
        }

        // validate element dimensions
        if (obj.options.width) {
            obj.container.style.width = parseInt(obj.options.width) + 'px';
        }

        if (obj.options.height) {
            obj.container.style.height = parseInt(obj.options.height) + 'px';
        }

        el.innerHTML = '';
        el.appendChild(obj.container);
    }

    var setEvents = function() {
        if (obj.container) {
            obj.container.addEventListener('click', function(e) {
                var rect = e.target.getBoundingClientRect();

                if (e.target.classList.contains('jfloating')) {
                    if (e.changedTouches && e.changedTouches[0]) {
                        var x = e.changedTouches[0].clientX;
                        var y = e.changedTouches[0].clientY;
                    } else {
                        var x = e.clientX;
                        var y = e.clientY;
                    }
    
                    if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                        setTimeout(function() {
                            obj.close();
                        }, 100);
                    } else {
                        obj.setState();
                    }
                }
            });
        }
    }

    var setType = function() {
        obj.container.classList.add('jfloating-' + obj.options.type);
    }

    obj.state = {
        isMinized: false,
    }

    obj.setState = function() {
        if (obj.state.isMinized) {
            obj.container.classList.remove('jfloating-minimized');
        } else {
            obj.container.classList.add('jfloating-minimized');
        }
        obj.state.isMinized = ! obj.state.isMinized;
    }

    obj.close = function() {
        jSuites.floating.elements.splice(jSuites.floating.elements.indexOf(obj.container), 1);
        obj.updatePosition();
        el.remove();
    }

    obj.updatePosition = function() {
        for (var i = 0; i < jSuites.floating.elements.length; i ++) {
            var floating = jSuites.floating.elements[i];
            var prevFloating = jSuites.floating.elements[i - 1];
            floating.style.right = i * (prevFloating ? prevFloating.offsetWidth : floating.offsetWidth) * 1.01 + 'px';
        }
    }   

    obj.init = function() {
        // Set content into root
        setContent();

        // Set dialog events
        setEvents();

        // Set dialog type
        setType();

        // Update floating position
        jSuites.floating.elements.push(obj.container);
        obj.updatePosition();

        el.floating = obj;
    }
    
    obj.init();

    return obj;
});

jSuites.floating.elements = [];