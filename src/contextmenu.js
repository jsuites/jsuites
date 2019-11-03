jSuites.contextmenu = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        items:null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    obj.menu = document.createElement('ul');
    obj.menu.classList.add('jcontextmenu');
    obj.menu.setAttribute('tabindex', '900');

    /**
     * Open contextmenu
     */
    obj.open = function(e, items) {
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
                    itemContainer.onmouseup = obj.options.items[i].onclick;
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

        // Coordinates
        if (e.target) {
            var x = e.clientX;
            var y = e.clientY;
        } else {
            var x = e.x;
            var y = e.y;
        }

        obj.menu.classList.add('jcontextmenu-focus');
        obj.menu.focus();

        const rect = obj.menu.getBoundingClientRect();

        if (window.innerHeight < y + rect.height) {
            obj.menu.style.top = (y - rect.height) + 'px';
        } else {
            obj.menu.style.top = y + 'px';
        }

        if (window.innerWidth < x + rect.width) {
            obj.menu.style.left = (x - rect.width) + 'px';
        } else {
            obj.menu.style.left = x + 'px';
        }
    }

    /**
     * Close menu
     */
    obj.close = function() {
        obj.menu.classList.remove('jcontextmenu-focus');
    }

    el.addEventListener("click", function(e) {
        obj.close();
    });

    obj.menu.addEventListener('blur', function(e) {
        obj.close();
    });

    window.addEventListener("mousewheel", function() {
        obj.close();
    });

    el.appendChild(obj.menu);
    el.contextmenu = obj;

    return obj;
});