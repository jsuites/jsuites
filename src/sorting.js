jSuites.sorting = (function(el, options) {
    var obj = {};
    obj.options = {};

    var defaults = {
        pointer: null,
        direction: null,
        ondragstart: null,
        ondragend: null,
        ondrop: null,
    }

    var dragElement = null;

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.classList.add('jsorting');

    el.addEventListener('dragstart', function(e) {
        var position = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        dragElement = {
            element: e.target,
            o: position,
            d: position
        }
        e.target.style.opacity = '0.25';

        if (typeof(obj.options.ondragstart) == 'function') {
            obj.options.ondragstart(el, e.target, e);
        }
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();

        if (getElement(e.target) && dragElement) {
            if (e.target.getAttribute('draggable') == 'true' && dragElement.element != e.target) {
                if (! obj.options.direction) {
                    var condition = e.target.clientHeight / 2 > e.offsetY;
                } else {
                    var condition = e.target.clientWidth / 2 > e.offsetX;
                }

                if (condition) {
                    e.target.parentNode.insertBefore(dragElement.element, e.target);
                } else {
                    e.target.parentNode.insertBefore(dragElement.element, e.target.nextSibling);
                }

                dragElement.d = Array.prototype.indexOf.call(e.target.parentNode.children, dragElement.element);
            }
        }
    });

    el.addEventListener('dragleave', function(e) {
        e.preventDefault();
    });

    el.addEventListener('dragend', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (typeof(obj.options.ondragend) == 'function') {
                obj.options.ondragend(el, dragElement.element, e);
            }

            // Cancelled put element to the original position
            if (dragElement.o < dragElement.d) {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o]);
            } else {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o].nextSibling);
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();

        if (dragElement && (dragElement.o != dragElement.d)) {
            if (typeof(obj.options.ondrop) == 'function') {
                obj.options.ondrop(el, dragElement.o, dragElement.d, dragElement.element, e.target, e);
            }
        }

        dragElement.element.style.opacity = '';
        dragElement = null;
    });

    var getElement = function(element) {
        var sorting = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('jsorting')) {
                    sorting = true;
                }
            }

            if (! sorting) {
                path(element.parentNode);
            }
        }

        path(element);

        return sorting;
    }

    for (var i = 0; i < el.children.length; i++) {
        if (! el.children[i].hasAttribute('draggable')) {
            el.children[i].setAttribute('draggable', 'true');
        }
    }

    el.val = function() {
        var id = null;
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            if (id = el.children[i].getAttribute('data-id')) {
                data.push(id);
            }
        }
        return data;
    }

    return el;
});