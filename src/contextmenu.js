jSuites.contextmenu = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        items: null,
        onclick: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class definition
    el.classList.add('jcontextmenu');
    // Focusable
    el.setAttribute('tabindex', '900');

    /**
     * Open contextmenu
     */
    obj.open = function(e, items) {
        if (items) {
            // Update content
            obj.options.items = items;
            // Create items
            obj.create(items);
        }

        // Coordinates
        if ((obj.options.items && obj.options.items.length > 0) || el.children.length) {
            if (e.target) {
                var x = e.clientX;
                var y = e.clientY;
            } else {
                var x = e.x;
                var y = e.y;
            }

            el.classList.add('jcontextmenu-focus');
            el.focus();

            var rect = el.getBoundingClientRect();

            if (window.innerHeight < y + rect.height) {
                var h = y - rect.height;
                if (h < 0) {
                    h = 0;
                }
                el.style.top = h + 'px';
            } else {
                el.style.top = y + 'px';
            }

            if (window.innerWidth < x + rect.width) {
                if (x - rect.width > 0) {
                    el.style.left = (x - rect.width) + 'px';
                } else {
                    el.style.left = '10px';
                }
            } else {
                el.style.left = x + 'px';
            }
        }
    }

    /**
     * Close menu
     */
    obj.close = function() {
        if (el.classList.contains('jcontextmenu-focus')) {
            el.classList.remove('jcontextmenu-focus');
        }
    }

    /**
     * Create items based on the declared objectd
     * @param {object} items - List of object
     */
    obj.create = function(items) {
        // Update content
        el.innerHTML = '';

        // Append items
        for (var i = 0; i < items.length; i++) {
            var itemContainer = createItemElement(items[i]);
            el.appendChild(itemContainer);
        }
    }
    
    /**
     * Private function for create a new Item element
     * @param {type} item
     * @returns {jsuitesL#15.jSuites.contextmenu.createItemElement.itemContainer}
     */
    function createItemElement(item) {
        if (item.type && (item.type == 'line' || item.type == 'divisor')) {
            var itemContainer = document.createElement('hr');
        } else {
            var itemContainer = document.createElement('div');
            var itemText = document.createElement('a');
            itemText.innerHTML = item.title;

            if (item.tooltip) {
                itemContainer.setAttribute('title', item.tooltip);
            }

            if (item.icon) {
                itemContainer.setAttribute('data-icon', item.icon);
            }

            if (item.id) {
                itemContainer.id = item.id;
            }

            if (item.disabled) {
                itemContainer.className = 'jcontextmenu-disabled';
            } else if (item.onclick) {
                itemContainer.method = item.onclick;
                itemContainer.addEventListener("mousedown", function(e) {
                    e.preventDefault();
                });
                itemContainer.addEventListener("mouseup", function() {
                    // Execute method
                    this.method(this);
                });
            }
            itemContainer.appendChild(itemText);

            if (item.submenu) {
                var itemIconSubmenu = document.createElement('span');
                itemIconSubmenu.innerHTML = "&#9658;";
                itemContainer.appendChild(itemIconSubmenu);
                itemContainer.classList.add('jcontexthassubmenu');
                var el_submenu = document.createElement('div');
                // Class definition
                el_submenu.classList.add('jcontextmenu');
                // Focusable
                el_submenu.setAttribute('tabindex', '900');
                
                // Append items
                var submenu = item.submenu;
                for (var i = 0; i < submenu.length; i++) {
                    var itemContainerSubMenu = createItemElement(submenu[i]);
                    el_submenu.appendChild(itemContainerSubMenu);
                }

                itemContainer.appendChild(el_submenu);
            } else if (item.shortcut) {
                var itemShortCut = document.createElement('span');
                itemShortCut.innerHTML = item.shortcut;
                itemContainer.appendChild(itemShortCut);
            }
        }
        return itemContainer;
    }

    if (typeof(obj.options.onclick) == 'function') {
        el.addEventListener('click', function(e) {
            obj.options.onclick(obj, e);
        });
    }

    // Create items
    if (obj.options.items) {
        obj.create(obj.options.items);
    }

    el.addEventListener('blur', function(e) {
        obj.close();
    });

    if (! jSuites.contextmenu.hasEvents) {
        window.addEventListener("mousewheel", function() {
            obj.close();
        });

        document.addEventListener("contextmenu", function(e) {
            var id = jSuites.contextmenu.getElement(e.target);
            if (id) {
                var element = document.querySelector('#' + id);
                if (! element) {
                    console.error('JSUITES: Contextmenu id not found');
                } else {
                    element.contextmenu.open(e);
                    e.preventDefault();
                }
            }
        });

        jSuites.contextmenu.hasEvents = true;
    }

    el.contextmenu = obj;

    return obj;
});

jSuites.contextmenu.getElement = function(element) {
    var foundId = 0;

    function path (element) {
        if (element.parentNode && element.getAttribute('aria-contextmenu-id')) {
            foundId = element.getAttribute('aria-contextmenu-id')
        } else {
            if (element.parentNode) {
                path(element.parentNode);
            }
        }
    }

    path(element);

    return foundId;
}