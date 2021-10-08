var jSuites = function(options) {
    var obj = {}

    obj.init = function() {
        // Loading modules
        var modules = document.querySelectorAll('[data-autoload]');
        for (var i = 0; i < modules.length; i++) {
            var m = modules[i].getAttribute('data-autoload');
            if (typeof(window[m]) == 'function') {
                window[m](modules[i]);
            }
        }
    }

    obj.keyDownControls = function(e) {
        if (e.which == 27) {
            var nodes = document.querySelectorAll('.jslider');
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].slider.close();
                }
            }

            if (document.querySelector('.jdialog')) {
                jSuites.dialog.close();
            }
        } else if (e.which == 13) {
            if (document.querySelector('.jdialog')) {
                if (typeof(jSuites.dialog.options.onconfirm) == 'function') {
                    jSuites.dialog.options.onconfirm();
                }
                jSuites.dialog.close();
            }
        }
    }

    var actionUpControl = function(e) {
        if (jSuites.el) {
            var element = jSuites.findElement(e.target, function(e) {
                return (e.tagName == 'A' || e.tagName == 'DIV') && e.getAttribute('data-href') ? true : false;
            });

            if (element) {
                var link = element.getAttribute('data-href');
                if (link == '#back') {
                    window.history.back();
                } else if (link == '#panel') {
                    jSuites.panel();
                } else {
                    jSuites.pages(link);
                }
            }
        }
    }

    var controlSwipeLeft = function(e) {
        var element = jSuites.findElement(e.target, 'option');

        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 100,
                behavior: 'smooth'
            });
        } else {
            var element = jSuites.findElement(e.target, 'jcalendar');
            if (element && jSuites.calendar.current) {
                jSuites.calendar.current.prev();
            } else {
                if (jSuites.panel) {
                    var element = jSuites.panel.get();
                    if (element) {
                        if (element.style.display != 'none') {
                            jSuites.panel.close();
                        }
                    }
                }
            }
        }
    }

    var controlSwipeRight = function(e) {
        var element = jSuites.findElement(e.target, 'option');
        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            var element = jSuites.findElement(e.target, 'jcalendar');
            if (element && jSuites.calendar.current) {
                jSuites.calendar.current.next();
            } else {
                if (jSuites.panel) {
                    var element = jSuites.panel.get();
                    if (element) {
                        if (element.style.display == 'none') {
                            jSuites.panel();
                        }
                    }
                }
            }
        }
    }



    // Create page container
    document.addEventListener('swipeleft', controlSwipeLeft);
    document.addEventListener('swiperight', controlSwipeRight);
    document.addEventListener('keydown', obj.keyDownControls);

    if ('ontouchend' in document.documentElement === true) {
        document.addEventListener('touchend', actionUpControl);
    } else {
        document.addEventListener('mouseup', actionUpControl);
    }



    // Pop state control
    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (jSuites.pages.get(e.state.route)) {
                jSuites.pages(e.state.route, { ignoreHistory:true });
            }
        }
    }

    return obj;
};
