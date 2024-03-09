function Animation() {
    const Component = {
        loading: {}
    }
    
    Component.loading.show = function(timeout) {
        if (! Component.loading.element) {
            Component.loading.element = document.createElement('div');
            Component.loading.element.className = 'jloading';
        }
        document.body.appendChild(Component.loading.element);
    
        // Max timeout in seconds
        if (timeout > 0) {
            setTimeout(function() {
                Component.loading.hide();
            }, timeout * 1000)
        }
    }
    
    Component.loading.hide = function() {
        if (Component.loading.element && Component.loading.element.parentNode) {
            document.body.removeChild(Component.loading.element);
        }
    }
    
    Component.slideLeft = function (element, direction, done) {
        if (direction == true) {
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
    
    Component.slideRight = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-right-in');
            setTimeout(function () {
                element.classList.remove('jslide-right-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-right-out');
            setTimeout(function () {
                element.classList.remove('jslide-right-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideTop = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-top-in');
            setTimeout(function () {
                element.classList.remove('jslide-top-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-top-out');
            setTimeout(function () {
                element.classList.remove('jslide-top-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideBottom = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-bottom-in');
            setTimeout(function () {
                element.classList.remove('jslide-bottom-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-bottom-out');
            setTimeout(function () {
                element.classList.remove('jslide-bottom-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 100);
        }
    }
    
    Component.fadeIn = function (element, done) {
        element.style.display = '';
        element.classList.add('jfade-in');
        setTimeout(function () {
            element.classList.remove('jfade-in');
            if (typeof (done) == 'function') {
                done();
            }
        }, 2000);
    }
    
    Component.fadeOut = function (element, done) {
        element.classList.add('jfade-out');
        setTimeout(function () {
            element.style.display = 'none';
            element.classList.remove('jfade-out');
            if (typeof (done) == 'function') {
                done();
            }
        }, 1000);
    }

    return Component;
}

export default Animation();