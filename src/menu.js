jSuites.menu = (function(el, options) {
    var obj = {};

    obj.show = function() {
        el.style.display = 'block';
        jSuites.animation.slideLeft(el, 1);
    }

    obj.hide = function() {
        jSuites.animation.slideLeft(el, 0, function() {
            el.style.display = '';
        });
    }

    obj.load = function() {
        if (localStorage) {
            var menu = el.querySelectorAll('nav');
            var selected = null;
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove('selected');
                if (menu[i].getAttribute('data-id')) {
                    var state = localStorage.getItem('jmenu-' + menu[i].getAttribute('data-id'));
                    if (state == 1) {
                        menu[i].classList.add('selected');
                    }
                }
            }
            var href = window.location.pathname;
            if (href) {
                var menu = document.querySelector('.jmenu a[href="'+ href +'"]');
                if (menu) {
                    menu.classList.add('selected');
                }
            }
        }
    }

    obj.select = function(o, e) {
        if (o.tagName == 'NAV') {
            var m = el.querySelectorAll('nav');
            for (var i = 0; i < m.length; i++) {
                m[i].style.display = 'none';
            }
            o.style.display = '';
            o.classList.add('selected');
        } else {
            var m = el.querySelectorAll('nav a');
            for (var i = 0; i < m.length; i++) {
                m[i].classList.remove('selected');
            }
            o.classList.add('selected');

            // Better navigation
            if (options && options.collapse == true) {
                if (o.classList.contains('show')) {
                    m = el.querySelectorAll('nav');
                    for (var i = 0; i < m.length; i++) {
                        m[i].style.display = '';
                    }
                    o.style.display = 'none';
                } else {
                    m = el.querySelectorAll('nav');
                    for (var i = 0; i < m.length; i++) {
                        m[i].style.display = 'none';
                    }

                    m = el.querySelector('.show');
                    if (m) {
                        m.style.display = 'block';
                    }

                    m = jSuites.findElement(o.parentNode, 'selected');
                    if (m) {
                        m.style.display = '';
                    }
                }
            }
        }

        if (options && typeof(options.onclick) == 'function') {
            options.onclick(obj, e);
        }

        // Close menu if is oped
        if (jSuites.getWindowWidth() < 800) {
            obj.hide();
        }
    }

    var action = function(e) {
        if (e.target.tagName == 'H2') {
            if (e.target.parentNode.classList.contains('selected')) {
                e.target.parentNode.classList.remove('selected');
                localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 0);
            } else {
                e.target.parentNode.classList.add('selected');
                localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 1);
            }
        } else if (e.target.tagName == 'A') {
            // Mark link as selected
            obj.select(e.target, e);
        }
    }

    if ('ontouchstart' in document.documentElement === true) {
        el.addEventListener('touchsend', action);
    } else {
        el.addEventListener('mouseup', action);
    }

    // Add close action
    var i = document.createElement('i');
    i.className = 'material-icons small-screen-only close';
    i.innerText = 'close';
    i.onclick = function() {
        obj.hide();
    }
    el.appendChild(i);

    // Add menu class
    el.classList.add('jmenu');

    // Load state
    obj.load();

    if (options && typeof(options.onload) == 'function') {
        options.onload(el);
    }

    // Keep reference
    el.menu = obj;

    return obj;
});
