import dictionary from './utils/dictionary';
import tracking from './utils/tracking';
import helpers from './utils/helpers';
import path from './utils/path';
import sorting from './utils/sorting';
import lazyLoading from './utils/lazyloading';

import ajax from './plugins/ajax';
import animation from './plugins/animation';
import calendar from './plugins/calendar';
import color from './plugins/color';
import contextmenu from './plugins/contextmenu';
import dropdown from './plugins/dropdown';
import editor from './plugins/editor';
import floating from './plugins/floating';
import form from './plugins/form';
import mask from './plugins/mask';
import modal from './plugins/modal';
import notification from './plugins/notification';
import palette from './plugins/palette';
import picker from './plugins/picker';
import progressbar from './plugins/progressbar';
import rating from './plugins/rating';
import search from './plugins/search';
import slider from './plugins/slider';
import tabs from './plugins/tabs';
import tags from './plugins/tags';
import toolbar from './plugins/toolbar';
import upload from './plugins/upload';
import validations from './plugins/validations';

import sha512 from '../packages/sha512';

import './style/core.css';
import './style/animation.css';
import './style/calendar.css';
import './style/color.css';
import './style/contextmenu.css';
import './style/dropdown.css';
import './style/editor.css';
import './style/floating.css';
import './style/modal.css';
import './style/notification.css';
import './style/picker.css';
import './style/progressbar.css';
import './style/rating.css';
import './style/search.css';
import './style/slider.css';
import './style/tabs.css';
import './style/tags.css';
import './style/toolbar.css';

var jSuites = {
    /** Current version */
    version: '5.0.0',
    /** Bind new extensions to Jsuites */
    setExtensions: function(o) {
        if (typeof(o) == 'object') {
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                jSuites[k[i]] = o[k[i]];
            }
        }
    },
    // Helpers
    tracking,
    ...dictionary,
    ...helpers,
    path,
    sorting,
    lazyLoading,
    // Plugins
    ajax,
    animation,
    calendar,
    color,
    contextmenu,
    dropdown,
    editor,
    floating,
    form,
    mask,
    modal,
    notification,
    palette,
    picker,
    progressbar,
    rating,
    search,
    slider,
    tabs,
    tags,
    toolbar,
    upload,
    validations,
}

// Legacy
jSuites.image = upload;
jSuites.image.create = function(data) {
    var img = document.createElement('img');
    img.setAttribute('src', data.file);
    img.className = 'jfile';
    img.setAttribute('tabindex', -1);
    img.content = data;

    return img;
}

jSuites.tracker = form;
jSuites.loading = animation.loading;
jSuites.sha512 = sha512;


/** Core events */
var Events = function() {

    document.jsuitesComponents = [];

    var find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.component && DOMElement.component == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }

    var isOpened = function(e) {
        if (document.jsuitesComponents && document.jsuitesComponents.length > 0) {
            for (var i = 0; i < document.jsuitesComponents.length; i++) {
                if (document.jsuitesComponents[i] && ! find(e, document.jsuitesComponents[i])) {
                    document.jsuitesComponents[i].close();
                }
            }
        }
    }

    // Width of the border
    var cornerSize = 15;

    // Current element
    var element = null;

    // Controllers
    var editorAction = false;

    // Event state
    var state = {
        x: null,
        y: null,
    }

    // Tooltip element
    var tooltip = document.createElement('div')
    tooltip.classList.add('jtooltip');

    // Events
    var mouseDown = function(e) {
        // Check if this is the floating
        var item = jSuites.findElement(e.target, 'jpanel');
        // Jfloating found
        if (item && ! item.classList.contains("readonly")) {
            // Add focus to the chart container
            item.focus();
            // Keep the tracking information
            var rect = e.target.getBoundingClientRect();
            editorAction = {
                e: item,
                x: e.clientX,
                y: e.clientY,
                w: rect.width,
                h: rect.height,
                d: item.style.cursor,
                resizing: item.style.cursor ? true : false,
                actioned: false,
            }

            // Make sure width and height styling is OK
            if (! item.style.width) {
                item.style.width = rect.width + 'px';
            }

            if (! item.style.height) {
                item.style.height = rect.height + 'px';
            }

            // Remove any selection from the page
            var s = window.getSelection();
            if (s.rangeCount) {
                for (var i = 0; i < s.rangeCount; i++) {
                    s.removeRange(s.getRangeAt(i));
                }
            }

            e.preventDefault();
            e.stopPropagation();
        } else {
            // No floating action found
            editorAction = false;
        }

        // Verify current components tracking
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
        } else {
            var x = e.clientX;
            var y = e.clientY;
        }

        // Which component I am clicking
        var path = e.path || (e.composedPath && e.composedPath());

        // If path available get the first element in the chain
        if (path) {
            element = path[0];
        } else {
            // Try to guess using the coordinates
            if (e.target && e.target.shadowRoot) {
                var d = e.target.shadowRoot;
            } else {
                var d = document;
            }
            // Get the first target element
            element = d.elementFromPoint(x, y);
        }

        isOpened(element);
    }

    var mouseUp = function(e) {
        if (editorAction && editorAction.e) {
            if (typeof(editorAction.e.refresh) == 'function' && state.actioned) {
                editorAction.e.refresh();
            }
            editorAction.e.style.cursor = '';
        }

        // Reset
        state = {
            x: null,
            y: null,
        }

        editorAction = false;
    }

    var mouseMove = function(e) {
        if (editorAction) {
            var x = e.clientX || e.pageX;
            var y = e.clientY || e.pageY;

            // Action on going
            if (! editorAction.resizing) {
                if (state.x == null && state.y == null) {
                    state.x = x;
                    state.y = y;
                }

                var dx = x - state.x;
                var dy = y - state.y;
                var top = editorAction.e.offsetTop + dy;
                var left = editorAction.e.offsetLeft + dx;

                // Update position
                editorAction.e.style.top = top + 'px';
                editorAction.e.style.left = left + 'px';
                editorAction.e.style.cursor = "move";

                state.x = x;
                state.y = y;


                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('position', top, left);
                }
            } else {
                var width = null;
                var height = null;

                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'se-resize') {
                    // Update width
                    width = editorAction.w + (x - editorAction.x);
                    editorAction.e.style.width = width + 'px';

                    // Update Height
                    if (e.shiftKey) {
                        var newHeight = (x - editorAction.x) * (editorAction.h / editorAction.w);
                        height = editorAction.h + newHeight;
                        editorAction.e.style.height = height + 'px';
                    } else {
                        var newHeight = false;
                    }
                }

                if (! newHeight) {
                    if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                        height = editorAction.h + (y - editorAction.y);
                        editorAction.e.style.height = height + 'px';
                    }
                }

                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('dimensions', width, height);
                }
            }
        } else {
            // Resizing action
            var item = jSuites.findElement(e.target, 'jpanel');
            // Found eligible component
            if (item) {
                if (item.getAttribute('tabindex')) {
                    var rect = item.getBoundingClientRect();
                    if (e.clientY - rect.top < cornerSize) {
                        if (rect.width - (e.clientX - rect.left) < cornerSize) {
                            item.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < cornerSize) {
                            item.style.cursor = 'nw-resize';
                        } else {
                            item.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < cornerSize) {
                        if (rect.width - (e.clientX - rect.left) < cornerSize) {
                            item.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < cornerSize) {
                            item.style.cursor = 'sw-resize';
                        } else {
                            item.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'w-resize';
                    } else {
                        item.style.cursor = '';
                    }
                }
            }
        }
    }

    var mouseOver = function(e) {
        var message = e.target.getAttribute('data-tooltip');
        if (message) {
            // Instructions
            tooltip.innerText = message;

            // Position
            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';
            document.body.appendChild(tooltip);
        } else if (tooltip.innerText) {
            tooltip.innerText = '';
            document.body.removeChild(tooltip);
        }
    }

    var dblClick = function(e) {
        var item = jSuites.findElement(e.target, 'jpanel');
        if (item && typeof(item.dblclick) == 'function') {
            // Create edition
            item.dblclick(e);
        }
    }

    var contextMenu = function(e) {
        var item = document.activeElement;
        if (item && typeof(item.contextmenu) == 'function') {
            // Create edition
            item.contextmenu(e);

            e.preventDefault();
            e.stopImmediatePropagation();
        } else {
            // Search for possible context menus
            item = jSuites.findElement(e.target, function(o) {
                return o.tagName && o.getAttribute('aria-contextmenu-id');
            });

            if (item) {
                var o = document.querySelector('#' + item);
                if (! o) {
                    console.error('JSUITES: contextmenu id not found: ' + item);
                } else {
                    o.contextmenu.open(e);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }
    }

    var keyDown = function(e) {
        var item = document.activeElement;
        if (item) {
            if (e.key == "Delete" && typeof(item.delete) == 'function') {
                item.delete();
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }

        if (document.jsuitesComponents && document.jsuitesComponents.length) {
            if (item = document.jsuitesComponents[document.jsuitesComponents.length - 1]) {
                if (e.key == "Escape" && typeof(item.isOpened) == 'function' && typeof(item.close) == 'function') {
                    if (item.isOpened()) {
                        item.close();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            }
        }
    }

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', mouseOver);
    document.addEventListener('dblclick', dblClick);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('contextmenu', contextMenu);
}

if (typeof(document) !== "undefined" && ! document.jsuitesComponents) {
    Events();
}

export default jSuites;