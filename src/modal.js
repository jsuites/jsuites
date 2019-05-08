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

    if (options) {
        obj.options = options;
    }

    el.classList.add('jmodal');

    var container = document.createElement('div');
    for (var i = 0; i < el.children.length; i++) {
        container.appendChild(el.children[i]);
    }
    el.appendChild(container);

    if (! obj.options.closed) {
        el.style.display = 'block';
    }

    obj.open = function() {
        el.style.display = 'block';

        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        } 
    }

    obj.close = function() {
        el.style.display = 'none';

        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
    }

    el.addEventListener('mousedown', (e) => {
        obj.position = [];

        if (e.path[0].classList.contains('jmodal')) {
            setTimeout(function() {
                if (e.target.clientWidth - e.offsetX < 50 && e.offsetY < 50) {
                    obj.close();
                } else {
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
                    ];
                }
            }, 100);
        }
    });

    el.addEventListener('mousemove', (e) => {
        if (obj.position) {
            if (e.which == 1 || e.which == 3) {
                el.style.top = obj.position[1] - (obj.position[3] - e.clientY) + (e.clientHeight / 2) + 'px';
                el.style.left = obj.position[0] - (obj.position[2] - e.clientX) + (e.clientWidth / 2)  + 'px';
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