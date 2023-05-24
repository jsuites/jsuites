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
            element.classList.add('slide-left-in');
            setTimeout(function () {
                element.classList.remove('slide-left-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-left-out');
            setTimeout(function () {
                element.classList.remove('slide-left-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideRight = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('slide-right-in');
            setTimeout(function () {
                element.classList.remove('slide-right-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-right-out');
            setTimeout(function () {
                element.classList.remove('slide-right-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideTop = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('slide-top-in');
            setTimeout(function () {
                element.classList.remove('slide-top-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-top-out');
            setTimeout(function () {
                element.classList.remove('slide-top-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideBottom = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('slide-bottom-in');
            setTimeout(function () {
                element.classList.remove('slide-bottom-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-bottom-out');
            setTimeout(function () {
                element.classList.remove('slide-bottom-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 100);
        }
    }
    
    Component.fadeIn = function (element, done) {
        element.style.display = '';
        element.classList.add('fade-in');
        setTimeout(function () {
            element.classList.remove('fade-in');
            if (typeof (done) == 'function') {
                done();
            }
        }, 2000);
    }
    
    Component.fadeOut = function (element, done) {
        element.classList.add('fade-out');
        setTimeout(function () {
            element.style.display = 'none';
            element.classList.remove('fade-out');
            if (typeof (done) == 'function') {
                done();
            }
        }, 1000);
    }

    return Component;
}

export default Animation();