;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.menu = factory();
}(this, (function () {

    const slideLeft = function (element, direction, done) {
        if (direction) {
            element.classList.add('jslide-left-in');
            setTimeout(function () {
                element.classList.remove('jslide-left-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-left-out');
            setTimeout(function () {
                element.classList.remove('jslide-left-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    const getWindowWidth = function() {
        let w = window;
        let d = document;
        let e = d.documentElement;
        let g = d.getElementsByTagName('body')[0];
        return w.innerWidth || e.clientWidth || g.clientWidth;
    }

    const selectOnLoad = function(adjustScroll) {
        let m = document.querySelectorAll('.jmenu li');
        for (let i = 0; i < m.length; i++) {
            m[i].classList.remove('selected');
        }

        let href = window.location.pathname;
        if (href) {
            let menu = document.querySelector('.jmenu nav a[href="'+ href +'"]');
            if (menu) {
                const container = menu.closest('li');
                if (container) {
                    container.classList.add('selected');
                }

                // Select header
                let item = container;
                while (item && item.parentNode) {
                    if (item.tagName !== 'NAV') {
                        item = item.parentNode;

                        if (item.previousElementSibling?.classList.contains('folder')) {
                            item.previousElementSibling.classList.add('selected');
                        }
                    } else {
                        item = false;
                    }
                }

                // Direct scroll to element
                if (adjustScroll === true) {
                    // Force a small delay to ensure DOM is ready
                    menu.scrollIntoView({ block: 'center' });
                }
            }
        }
    }

    const Plugin = (function(el, options) {
        let obj = {};

        obj.show = function() {
            el.style.display = 'block';
            if (document.body.offsetWidth < 800) {
                slideLeft(el, 1);
            }
        }

        obj.hide = function() {
            if (document.body.offsetWidth < 800) {
                slideLeft(el, 0, function() {
                    el.style.display = 'none';
                });
            } else {
                el.style.display = 'none';
            }
        }

        obj.toggle = function() {
            if (el.offsetWidth) {
                obj.hide();
            } else {
                obj.show();
            }
        }

        obj.load = function() {
            if (options.adjustOnLoad !== false) {
                selectOnLoad(true);
            }
        }

        obj.update = function(adjustScroll) {
            selectOnLoad(adjustScroll);
        }

        obj.select = function(o, e) {

            let m = el.querySelectorAll('li.selected');
            for (let i = 0; i < m.length; i++) {
                m[i].classList.remove('selected');
            }
            o.parentNode.classList.add('selected');

            if (options && typeof(options.onclick) == 'function') {
                options.onclick(obj, e);
            }

            // Close menu if is oped
            if (getWindowWidth() < 800) {
                obj.hide();
            }
        }

        let action = function(e) {
            if (e.target.classList.contains('folder')) {
                if (e.target.classList.contains('selected')) {
                    e.target.classList.remove('selected');
                } else {
                    if (options.toggle === true) {
                        let items = el.querySelectorAll('.folder');
                        items.forEach(item => {
                            item.classList.remove('selected');
                        })
                    }
                    e.target.classList.add('selected');
                }
            } else if (e.target.tagName === 'A') {
                // Mark the link as selected
                obj.select(e.target, e);
            } else {
                // Get target info
                let rect = el.getBoundingClientRect();
                let x;
                let y;

                if (e.changedTouches && e.changedTouches[0]) {
                    x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY;
                } else {
                    x = e.clientX;
                    y = e.clientY;
                }

                const computedStyle = window.getComputedStyle(e.target);
                if (computedStyle.position === 'fixed') {
                    if (rect.width - (x - rect.left) < 45 && (y - rect.top) < 45) {
                        obj.hide();
                    }
                }
            }
        }

        el.addEventListener('click', action);

        // Add menu class
        el.classList.add('jmenu');

        // Load state
        obj.load();

        if (options && typeof(options.onload) == 'function') {
            options.onload(el, obj);
        }

        // Keep reference
        el.menu = obj;

        return obj;
    });

    if (window.jSuites) {
        jSuites.setExtensions({ menu: Plugin });
    }

    return Plugin;

})));