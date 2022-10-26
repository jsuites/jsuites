/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Javascript pull-to-refresh
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
        var pullToRefresh = null;

        // Page touch move
        var pageTouchMove = function(e, page) {
            if (typeof(page.options.onpull) == 'function') {
                if (page.scrollTop < 5) {
                    if (! touchPosition) {
                        touchPosition = {};
                        touchPosition.x = e.touches[0].clientX;
                        touchPosition.y = e.touches[0].clientY;
                    }

                    var height = e.touches[0].clientY - touchPosition.y;
                    if (height > 70) {
                        if (! pullToRefresh.classList.contains('ready')) {
                            pullToRefresh.classList.add('ready');
                        }
                    } else {
                        if (pullToRefresh.classList.contains('ready')) {
                            pullToRefresh.classList.remove('ready');
                        }
                        pullToRefresh.style.height = height + 'px';

                        if (height > 20) {
                            if (! pullToRefresh.classList.contains('holding')) {
                                pullToRefresh.classList.add('holding');
                                page.insertBefore(pullToRefresh, page.firstChild);
                            }
                        }
                    }
                }
            }
        }

        // Page touch end
        var pageTouchEnd = function(e, page) {
            if (typeof(page.options.onpull) == 'function') {
                // Remove holding
                pullToRefresh.classList.remove('holding');
                // Refresh or not refresh
                if (! pullToRefresh.classList.contains('ready')) {
                    // Reset and not refresh
                    pullToRefresh.style.height = '';
                    obj.hide();
                } else {
                    pullToRefresh.classList.remove('ready');
                    // Loading indication
                    setTimeout(function() {
                        obj.hide();
                    }, 1000);

                    // Refresh
                    if (typeof(page.options.onpull) == 'function') {
                        page.options.onpull(page);
                    }
                }
            }
        }

        var obj = function(element, callback) {
            if (! pullToRefresh) {
                pullToRefresh = document.createElement('div');
                pullToRefresh.className = 'jrefresh';
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
                element.options.onpull = callback;
            }
        }

        obj.hide = function() {
            if (pullToRefresh.parentNode) {
                pullToRefresh.parentNode.removeChild(pullToRefresh);
            }
            touchPosition = null;
        }

        return obj;
    })();

})));