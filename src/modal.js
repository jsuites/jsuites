/**
 * (c) jTools Modal page
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Modal page
 */

jApp.modal = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        // Events
        onopen:null,
        onclose:null,
        closed:false,
        width:null,
        height:null,
        title:null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.classList.add('jmodal');

    if (obj.options.title) {
        el.setAttribute('title', obj.options.title);
    }
    if (obj.options.width) {
        el.style.width = obj.options.width;
    }
    if (obj.options.height) {
        el.style.height = obj.options.height;
    }

    var container = document.createElement('div');
    for (var i = 0; i < el.children.length; i++) {
        container.appendChild(el.children[i]);
    }
    el.appendChild(container);

    // Title
    if (! el.getAttribute('title')) {
        el.classList.add('no-title');
    }

    if (! obj.options.closed) {
        el.style.display = 'block';
    }

    obj.open = function() {
        el.style.display = 'block';

        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
        // Backdrop
        document.body.appendChild(jApp.backdrop);
    }

    obj.close = function() {
        el.style.display = 'none';

        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
        // Backdrop
        jApp.backdrop.remove();
    }

    el.addEventListener('mousedown', (e) => {
        obj.position = [];

        if (e.path[0].classList.contains('jmodal')) {
            setTimeout(function() {
                if (e.target.clientWidth - e.offsetX < 50 && e.offsetY < 50) {
                    obj.close();
                } else {
                    if (el.getAttribute('title') && e.offsetY < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if ( window.getSelection ) {
                            window.getSelection().removeAllRanges();
                        }

                        var rect = el.getBoundingClientRect();
                        obj.position = [
                            rect.left,
                            rect.top,
                            e.clientX,
                            e.clientY,
                            rect.width,
                            rect.height,
                        ];
                    }
                }
            }, 100);
        }
    });

    el.addEventListener('mousemove', (e) => {
        if (obj.position) {
            if (e.which == 1 || e.which == 3) {
                el.style.top = obj.position[1] + (e.clientY - obj.position[3]) + (obj.position[5] / 2);
                el.style.left = obj.position[0] + (e.clientX - obj.position[2]) + (obj.position[4] / 2);
                el.style.cursor = 'move';
            } else {
                el.style.cursor = 'auto';
            }
        }
    });

    el.addEventListener('mouseup', (e) => {
        obj.position = [];

        el.style.cursor = 'auto';
    });

    el.modal = obj;

    return obj;
});