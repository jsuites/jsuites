jSuites.sorting = (function(el, options) {
    el.classList.add('jsorting');

    el.addEventListener('dragstart', function(e) {
        e.target.classList.add('jsorting_dragging');
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();

        if (getElement(e.target) && ! e.target.classList.contains('jsorting')) {
            if (e.target.clientHeight / 2 > e.offsetY) {
                e.path[0].style.borderTop = '1px dotted red';
                e.path[0].style.borderBottom = '';
            } else {
                e.path[0].style.borderTop = '';
                e.path[0].style.borderBottom = '1px dotted red';
            }
        }
    });

    el.addEventListener('dragleave', function(e) {
        e.path[0].style.borderTop = '';
        e.path[0].style.borderBottom = '';
    });

    el.addEventListener('dragend', function(e) {
        e.path[1].querySelector('.jsorting_dragging').classList.remove('jsorting_dragging');
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();

        if (getElement(e.target) && ! e.target.classList.contains('jsorting')) {
            var element = e.path[1].querySelector('.jsorting_dragging');

            if (e.target.clientHeight / 2 > e.offsetY) {
                e.path[1].insertBefore(element, e.path[0]);
            } else {
                e.path[1].insertBefore(element, e.path[0].nextSibling);
            }
        }

        e.path[0].style.borderTop = '';
        e.path[0].style.borderBottom = '';
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
        el.children[i].setAttribute('draggable', 'true');
    };

    return el;
});