/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Javascript push-to-refresh
 *
 * MIT License
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.refresh = factory();
}(this, (function () {

    'use strict';

    return (function(el, options) {
        // Controls
        var touchPosition = null;
        var pushToRefresh = null;

        // Page touch move
        var pageTouchMove = function(e, page) {
            if (typeof(page.options.onpush) == 'function') {
                if (page.scrollTop < 5) {
                    if (! touchPosition) {
                        touchPosition = {};
                        touchPosition.x = e.touches[0].clientX;
                        touchPosition.y = e.touches[0].clientY;
                    }

                    var height = e.touches[0].clientY - touchPosition.y;
                    if (height > 70) {
                        if (! pushToRefresh.classList.contains('ready')) {
                            pushToRefresh.classList.add('ready');
                        }
                    } else {
                        if (pushToRefresh.classList.contains('ready')) {
                            pushToRefresh.classList.remove('ready');
                        }
                        pushToRefresh.style.height = height + 'px';

                        if (height > 20) {
                            if (! pushToRefresh.classList.contains('holding')) {
                                pushToRefresh.classList.add('holding');
                                page.insertBefore(pushToRefresh, page.firstChild);
                            }
                        }
                    }
                }
            }
        }

        // Page touch end
        var pageTouchEnd = function(e, page) {
            if (typeof(page.options.onpush) == 'function') {
                // Remove holding
                pushToRefresh.classList.remove('holding');
                // Refresh or not refresh
                if (! pushToRefresh.classList.contains('ready')) {
                    // Reset and not refresh
                    pushToRefresh.style.height = '';
                    obj.hide();
                } else {
                    pushToRefresh.classList.remove('ready');
                    // Loading indication
                    setTimeout(function() {
                        obj.hide();
                    }, 1000);

                    // Refresh
                    if (typeof(page.options.onpush) == 'function') {
                        page.options.onpush(page);
                    }
                }
            }
        }

        var obj = function(element, callback) {
            if (! pushToRefresh) {
                pushToRefresh = document.createElement('div');
                pushToRefresh.className = 'jrefresh';
            }

            element.addEventListener('touchmove', function(e) {
                pageTouchMove(e, element);
            });
            element.addEventListener('touchend', function(e) {
                pageTouchEnd(e, element);
            });
            if (! element.options) {
                element.options = {};
            }
            if (typeof(callback) == 'function') {
                element.options.onpush = callback;
            }
        }

        obj.hide = function() {
            if (pushToRefresh.parentNode) {
                pushToRefresh.parentNode.removeChild(pushToRefresh);
            }
            touchPosition = null;
        }

        return obj;
    })();

})));