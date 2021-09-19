;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Animation = factory();
}(this, (function () {

    'use strict';

    var P = {};

    P.slideLeft = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-left-in');
            setTimeout(function() {
                element.classList.remove('slide-left-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-left-out');
            setTimeout(function() {
                element.classList.remove('slide-left-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    P.slideRight = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-right-in');
            setTimeout(function() {
                element.classList.remove('slide-right-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-right-out');
            setTimeout(function() {
                element.classList.remove('slide-right-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    P.slideTop = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-top-in');
            setTimeout(function() {
                element.classList.remove('slide-top-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-top-out');
            setTimeout(function() {
                element.classList.remove('slide-top-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        }
    }

    P.slideBottom = function(element, direction, done) {
        if (direction == true) {
            element.classList.add('slide-bottom-in');
            setTimeout(function() {
                element.classList.remove('slide-bottom-in');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('slide-bottom-out');
            setTimeout(function() {
                element.classList.remove('slide-bottom-out');
                if (typeof(done) == 'function') {
                    done();
                }
            }, 100);
        }
    }

    P.fadeIn = function(element, done) {
        element.style.display = '';
        element.classList.add('fade-in');
        setTimeout(function() {
            element.classList.remove('fade-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 2000);
    }

    P.fadeOut = function(element, done) {
        element.classList.add('fade-out');
        setTimeout(function() {
            element.style.display = 'none';
            element.classList.remove('fade-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 1000);
    }

    return P;
})));