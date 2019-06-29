/**
 * (c) jSuites modal
 * https://github.com/paulhodel/jsuites
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Modal
 */

jSuites.modal = (function(el, options) {
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
        if (options && options.hasOwnProperty(property)) {
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
        document.body.appendChild(jSuites.backdrop);

        // Current
        jSuites.modal.current = el;
    }

    obj.close = function() {
        el.style.display = 'none';

        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
        // Backdrop
        jSuites.backdrop.remove();

        // Current
        jSuites.modal.current = null;
    }

    if (! jSuites.modal.hasEvents) {
        jSuites.modal.current = el;

        document.addEventListener('mousedown', jSuites.modal.mouseDownControls);
        document.addEventListener('mousemove', jSuites.modal.mouseMoveControls);
        document.addEventListener('mouseup', jSuites.modal.mouseUpControls);

        jSuites.modal.hasEvents = true;
    }

    // Keep object available from the node
    el.modal = obj;

    return obj;
});

jSuites.modal.current = null;
jSuites.modal.position = null;

jSuites.modal.mouseUpControls = function(e) {
    if (jSuites.modal.current) {
        jSuites.modal.current.style.cursor = 'auto';
    }
    jSuites.modal.position = null;
}

jSuites.modal.mouseMoveControls = function(e) {
    if (jSuites.modal.current && jSuites.modal.position) {
        if (e.which == 1 || e.which == 3) {
            var position = jSuites.modal.position;
            jSuites.modal.current.style.top = (position[1] + (e.clientY - position[3]) + (position[5] / 2)) + 'px';
            jSuites.modal.current.style.left = (position[0] + (e.clientX - position[2]) + (position[4] / 2)) + 'px';
            jSuites.modal.current.style.cursor = 'move';
        } else {
            jSuites.modal.current.style.cursor = 'auto';
        }
    }
}

jSuites.modal.mouseDownControls = function(e) {
    jSuites.modal.position = [];

    if (e.target.classList.contains('jmodal')) {
        setTimeout(function() {

            var rect = e.target.getBoundingClientRect();
            if (rect.width - (e.clientX - rect.left) < 50 && e.clientY - rect.top < 50) {
                e.target.modal.close();
            } else {
                if (e.target.getAttribute('title') && e.clientY - rect.top < 50) {
                    if (document.selection) {
                        document.selection.empty();
                    } else if ( window.getSelection ) {
                        window.getSelection().removeAllRanges();
                    }

                    jSuites.modal.position = [
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
}