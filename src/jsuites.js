import '@lemonadejs/studio';

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
import '@lemonadejs/studio/dist/style.css';

var jSuites = {
    // Helpers
    ...dictionary,
    ...helpers,
    /** Current version */
    version: '6.0.0-beta.22',
    /** Bind new extensions to Jsuites */
    setExtensions: function(o) {
        if (typeof(o) == 'object') {
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                jSuites[k[i]] = o[k[i]];
            }
        }
    },
    tracking: tracking,
    path: path,
    sorting: sorting,
    lazyLoading: lazyLoading,
    // Plugins
    ajax: ajax,
    animation: animation,
    calendar: calendar,
    color: color,
    contextmenu: contextmenu,
    dropdown: dropdown,
    editor: editor,
    floating: floating,
    form: form,
    mask: mask,
    modal: modal,
    notification: notification,
    palette: palette,
    picker: picker,
    progressbar: progressbar,
    rating: rating,
    search: search,
    slider: slider,
    tabs: tabs,
    tags: tags,
    toolbar: toolbar,
    upload: upload,
    validations: validations,
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
const Events = function() {

    if (typeof(window['jSuitesStateControl']) === 'undefined') {
        window['jSuitesStateControl'] = [];
    } else {
        // Do nothing
        return;
    }

    const find = function(DOMElement, component) {
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

    const isOpened = function(e) {
        let state = window['jSuitesStateControl'];
        if (state && state.length > 0) {
            for (let i = 0; i < state.length; i++) {
                if (state[i] && ! find(e, state[i])) {
                    state[i].close();
                }
            }
        }
    }

    // Width of the border
    let cornerSize = 15;

    // Current element
    let element = null;

    // Controllers
    let editorAction = false;

    // Event state
    let state = {
        x: null,
        y: null,
    }

    // Tooltip element
    let tooltip = document.createElement('div')
    tooltip.classList.add('jtooltip');

    const isWebcomponent = function(e) {
        return e && (e.shadowRoot || (e.tagName && e.tagName.includes('-')));
    }

    const getElement = function(e) {
        let d;
        let element;
        // Which component I am clicking
        let path = e.path || (e.composedPath && e.composedPath());

        // If path available get the first element in the chain
        if (path) {
            element = path[0];
            // Adjustment sales force
            if (element && isWebcomponent(element) && ! element.shadowRoot && e.toElement) {
                element = e.toElement;
            }
        } else {
            // Try to guess using the coordinates
            if (e.target && isWebcomponent(e.target)) {
                d = e.target.shadowRoot;
            } else {
                d = document;
            }
            // Get the first target element
            element = d.elementFromPoint(x, y);
        }
        return element;
    }

    // Events
    const mouseDown = function(e) {
        // Verify current components tracking
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
        } else {
            var x = e.clientX;
            var y = e.clientY;
        }

        let element = getElement(e);
        // Editable
        let editable = element && element.tagName === 'DIV' && element.getAttribute('contentEditable');
        // Check if this is the floating
        let item = jSuites.findElement(element, 'jpanel');
        // Jfloating found
        if (item && ! item.classList.contains("readonly") && ! editable) {
            // Keep the tracking information
            let rect = item.getBoundingClientRect();
            let angle = 0;
            if (item.style.rotate) {
                // Extract the angle value from the match and convert it to a number
                angle = parseFloat(item.style.rotate);
            }
            let action = 'move';
            if (element.getAttribute('data-action')) {
                action = element.getAttribute('data-action');
            } else {
                if (item.style.cursor) {
                    action = 'resize';
                } else {
                    item.style.cursor = 'move';
                }
            }

            // Action
            editorAction = {
                action: action,
                a: angle,
                e: item,
                x: x,
                y: y,
                l: rect.left,
                t: rect.top,
                b: rect.bottom,
                r: rect.right,
                w: rect.width,
                h: rect.height,
                d: item.style.cursor,
                actioned: false,
            }
            // Make sure width and height styling is OK
            if (! item.style.width) {
                item.style.width = rect.width + 'px';
            }
            if (! item.style.height) {
                item.style.height = rect.height + 'px';
            }
        } else {
            // No floating action found
            editorAction = false;
        }

        isOpened(element);

        focus(e);
    }

    const calculateAngle = function(x1, y1, x2, y2, x3, y3) {
        // Calculate dx and dy for the first line
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        // Calculate dx and dy for the second line
        const dx2 = x3 - x1;
        const dy2 = y3 - y1;
        // Calculate the angle for the first line
        let angle1 = Math.atan2(dy1, dx1);
        // Calculate the angle for the second line
        let angle2 = Math.atan2(dy2, dx2);
        // Calculate the angle difference in radians
        let angleDifference = angle2 - angle1;
        // Convert the angle difference to degrees
        angleDifference = angleDifference * (180 / Math.PI);
        // Normalize the angle difference to be within [0, 360) degrees
        if (angleDifference < 0) {
            angleDifference += 360;
        }
        return angleDifference;
    }

    const mouseUp = function(e) {
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

    const mouseMove = function(e) {
        if (editorAction) {
            let x = e.clientX || e.pageX;
            let y = e.clientY || e.pageY;

            if (state.x == null && state.y == null) {
                state.x = x;
                state.y = y;
            }

            // Action on going
            if (editorAction.action === 'move') {
                var dx = x - state.x;
                var dy = y - state.y;
                var top = editorAction.e.offsetTop + dy;
                var left = editorAction.e.offsetLeft + dx;

                // Update position
                editorAction.e.style.top = top + 'px';
                editorAction.e.style.left = left + 'px';

                // Update element
                if (typeof (editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('position', top, left);
                }
            } else if (editorAction.action === 'rotate') {
                let ox = editorAction.l+editorAction.w/2;
                let oy = editorAction.t+editorAction.h/2;
                let angle = calculateAngle(ox, oy, editorAction.x, editorAction.y, x, y);
                angle = angle + editorAction.a % 360;
                angle = Math.round(angle / 2) * 2;
                editorAction.e.style.rotate = `${angle}deg`;
                // Update element
                if (typeof (editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('rotate', angle);
                }
            } else if (editorAction.action === 'resize') {
                let top = null;
                let left = null;
                let width = null;
                let height = null;

                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'se-resize') {
                    width = editorAction.e.offsetWidth + (x - state.x);

                    if (e.shiftKey) {
                        height = editorAction.e.offsetHeight + (x - state.x) * (editorAction.e.offsetHeight / editorAction.e.offsetWidth);
                    }
                } else if (editorAction.d === 'w-resize' || editorAction.d == 'nw-resize'|| editorAction.d == 'sw-resize') {
                    left = editorAction.e.offsetLeft + (x - state.x);
                    width = editorAction.e.offsetLeft + editorAction.e.offsetWidth - left;

                    if (e.shiftKey) {
                        height = editorAction.e.offsetHeight - (x - state.x) * (editorAction.e.offsetHeight / editorAction.e.offsetWidth);
                    }
                }

                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                    if (! height) {
                        height = editorAction.e.offsetHeight + (y - state.y);
                    }
                } else if (editorAction.d === 'n-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'nw-resize') {
                    top = editorAction.e.offsetTop + (y - state.y);
                    height = editorAction.e.offsetTop + editorAction.e.offsetHeight - top;
                }

                if (top) {
                    editorAction.e.style.top = top + 'px';
                }
                if (left) {
                    editorAction.e.style.left = left + 'px';
                }
                if (width) {
                    editorAction.e.style.width = width + 'px';
                }
                if (height) {
                    editorAction.e.style.height = height + 'px';
                }

                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('dimensions', width, height);
                }
            }

            state.x = x;
            state.y = y;
        } else {
            let element = getElement(e);
            // Resize action
            let item = jSuites.findElement(element, 'jpanel');
            // Found eligible component
            if (item) {
                // Resizing action
                let controls = item.classList.contains('jpanel-controls');
                if (controls) {
                    let position = element.getAttribute('data-position');
                    if (position) {
                        item.style.cursor = position;
                    } else {
                        item.style.cursor = '';
                    }
                } else if (item.getAttribute('tabindex')) {
                    let rect = item.getBoundingClientRect();
                    //console.log(e.clientY - rect.top, rect.width - (e.clientX - rect.left), cornerSize)
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

    let position = ['n','ne','e','se','s','sw','w','nw','rotate'];
    position.forEach(function(v, k) {
        position[k] = document.createElement('div');
        position[k].classList.add('jpanel-action');
        if (v === 'rotate') {
            position[k].setAttribute('data-action', 'rotate');
        } else {
            position[k].setAttribute('data-action', 'resize');
            position[k].setAttribute('data-position', v + '-resize');
        }
    });

    let currentElement;

    const focus = function(e) {
        let element = getElement(e);
        // Check if this is the floating
        let item = jSuites.findElement(element, 'jpanel');
        if (item && ! item.classList.contains("readonly") && item.classList.contains('jpanel-controls')) {
            item.append(...position);

            if (! item.classList.contains('jpanel-rotate')) {
                position[position.length-1].remove();
            }

            currentElement = item;
        } else {
            blur(e);
        }
    }

    const blur = function(e) {
        if (currentElement) {
            position.forEach(function(v) {
                v.remove();
            });
            currentElement = null;
        }
    }

    const mouseOver = function(e) {
        let element = getElement(e);
        var message = element.getAttribute('data-tooltip');
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

    const contextMenu = function(e) {
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

    const keyDown = function(e) {
        let item = document.activeElement;
        if (item) {
            if (e.key === "Delete" && typeof(item.delete) == 'function') {
                item.delete();
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }

        let state = window['jSuitesStateControl'];
        if (state && state.length > 0) {
            item = state[state.length - 1];
            if (item) {
                if (e.key === "Escape" && typeof(item.isOpened) == 'function' && typeof(item.close) == 'function') {
                    if (item.isOpened()) {
                        item.close();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            }
        }
    }

    const input = function(e) {
        if (e.target.getAttribute('data-mask') || e.target.mask) {
            jSuites.mask.oninput(e);
        }
    }

    document.addEventListener('focusin', focus);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', mouseOver);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('contextmenu', contextMenu);
    document.addEventListener('input', input);
}

if (typeof(document) !== "undefined") {
    Events();
}

export default jSuites;