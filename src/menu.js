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
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove('selected');
                if (menu[i].getAttribute('data-id')) {
                    var state = localStorage.getItem('jmenu-' + menu[i].getAttribute('data-id'));
                    if (state === null || state == 1) {
                        menu[i].classList.add('selected');
                    }
                }
            }
            var href = localStorage.getItem('jmenu-href');
            if (href) {
                var menu = document.querySelector('.jmenu a[href="'+ href +'"]');
                if (menu) {
                    menu.classList.add('selected');
                }
            }
        }
    }

    obj.select = function(o) {
        var menu = el.querySelectorAll('nav a');
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove('selected');
        }
        o.classList.add('selected');
    }

    var actionDown = function(e) {
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
            obj.select(e.target);
            // Keep the refernce in case load the page again
            localStorage.setItem('jmenu-href', e.target.getAttribute('href'));
            // Close menu if is oped
            obj.hide();
        }
    }

    if ('ontouchstart' in document.documentElement === true) {
        el.addEventListener('touchstart', actionDown);
    } else {
        el.addEventListener('mousedown', actionDown);
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

    /*var h1 = window.innerHeight;
    var h2 = el.offsetTop;

    // Add the scroll
    jSuites.scroll(el, {
        //height: (h1 - h2) + 'px'
        height: '1000px',
    });*/

    // Load state
    obj.load();

    // Keep reference
    el.menu = obj;

    return obj;
});
