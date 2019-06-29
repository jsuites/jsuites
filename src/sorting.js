/**
 * (c) jTools v1.0.1 - Element sorting
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Element drag and drop sorting
 */

jSuites.sorting = (function(el, options) {
    el.classList.add('jsorting');

    el.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging');
    });

    el.addEventListener('dragover', (e) => {
        e.preventDefault();

        if (e.target.clientHeight / 2 > e.offsetY) {
            e.path[0].style.borderTop = '1px dotted #ccc';
            e.path[0].style.borderBottom = '';
        } else {
            e.path[0].style.borderTop = '';
            e.path[0].style.borderBottom = '1px dotted #ccc';
        }
    });

    el.addEventListener('dragleave', (e) => {
        e.path[0].style.borderTop = '';
        e.path[0].style.borderBottom = '';
    });

    el.addEventListener('dragend', (e) => {
        e.path[1].querySelector('.dragging').classList.remove('dragging');
    });

    el.addEventListener('drop', (e) => {
        var element = e.path[1].querySelector('.dragging');

        if (e.target.clientHeight / 2 > e.offsetY) {
            e.path[1].insertBefore(element, e.path[0]);
        } else {
            e.path[1].insertBefore(element, e.path[0].nextSibling);
        }

        e.path[0].style.borderTop = '';
        e.path[0].style.borderBottom = '';
    });

    [...el.children].forEach(function(v) {
        v.setAttribute('draggable', 'true');
    });

    return el;
});