/**
 * Contextmenu v1.0.1
 * Author: paul.hodel@gmail.com
 * https://github.com/paulhodel/jtools
 */

jApp.contextmenu = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.options.items = {};

    obj.menu = document.createElement('ul');
    obj.menu.classList.add('jcontextmenu');
    obj.menu.setAttribute('tabindex', '900');
    obj.menu.addEventListener('blur', (e) => {
        obj.menu.classList.remove('jcontextmenu-focus');
    });

    if (typeof(options.onclick) == 'function') {
        obj.menu.onclick = options.onclick;
    }

    /**
     * Open contextmenu
     */
    obj.open = function(e, items) {
        e = e || window.event;

        if (items) {
            obj.options.items = items;
        }

        // Reset content
        obj.menu.innerHTML = '';

        // Append items
        for (var i = 0; i < obj.options.items.length; i++) {
            if (obj.options.items[i].type && obj.options.items[i].type == 'line') {
                var itemContainer = document.createElement('hr');
            } else {
                var itemContainer = document.createElement('li');
                var itemText = document.createElement('a');
                itemText.innerHTML = obj.options.items[i].title;

                if (obj.options.items[i].disabled) {
                    itemContainer.className = 'jcontextmenu-disabled';
                } else if (obj.options.items[i].onclick) {
                    itemContainer.onclick = obj.options.items[i].onclick;
                }
                itemContainer.appendChild(itemText);

                if (obj.options.items[i].shortcut) {
                    var itemShortCut = document.createElement('span');
                    itemShortCut.innerHTML = obj.options.items[i].shortcut;
                    itemContainer.appendChild(itemShortCut);
                }
            }

            obj.menu.appendChild(itemContainer);
        }

        let position = jApp.getPosition(e);

        obj.menu.classList.add('jcontextmenu-focus');
        obj.menu.style.top = position[1];
        obj.menu.style.left = position[0];
        obj.menu.focus();
    }

    /**
     * Close
     */
    obj.close = function() {
        obj.menu.classList.remove('jcontextmenu-focus');
    }

    el.appendChild(obj.menu);
    el.contextmenu = obj;

    return obj;
});