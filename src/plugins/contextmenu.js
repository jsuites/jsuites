import Tracking from '../utils/tracking';
import Dictionary from '../utils/dictionary';

function Contextmenu() {

    var Component = function(el, options) {
        // New instance
        var obj = {type: 'contextmenu'};
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

        /**
         * Open contextmenu
         */
        obj.open = function (e, items) {
            if (items) {
                // Update content
                obj.options.items = items;
                // Create items
                obj.create(items);
            }

            // Close current contextmenu
            if (Component.current) {
                Component.current.close();
            }

            // Add to the opened components monitor
            Tracking(obj, true);

            // Show context menu
            el.classList.add('jcontextmenu-focus');

            // Current
            Component.current = obj;

            // Coordinates
            if ((obj.options.items && obj.options.items.length > 0) || el.children.length) {
                if (e.target) {
                    if (e.changedTouches && e.changedTouches[0]) {
                        x = e.changedTouches[0].clientX;
                        y = e.changedTouches[0].clientY;
                    } else {
                        var x = e.clientX;
                        var y = e.clientY;
                    }
                } else {
                    var x = e.x;
                    var y = e.y;
                }

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

        obj.isOpened = function () {
            return el.classList.contains('jcontextmenu-focus') ? true : false;
        }

        /**
         * Close menu
         */
        obj.close = function () {
            if (el.classList.contains('jcontextmenu-focus')) {
                el.classList.remove('jcontextmenu-focus');
            }
            Tracking(obj, false);
        }

        /**
         * Create items based on the declared objectd
         * @param {object} items - List of object
         */
        obj.create = function (items) {
            // Update content
            el.innerHTML = '';

            // Add header contextmenu
            var itemHeader = createHeader();
            el.appendChild(itemHeader);

            // Append items
            for (var i = 0; i < items.length; i++) {
                var itemContainer = createItemElement(items[i]);
                el.appendChild(itemContainer);
            }
        }

        /**
         * createHeader for context menu
         * @private
         * @returns {HTMLElement}
         */
        function createHeader() {
            var header = document.createElement('div');
            header.classList.add("header");
            header.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            var title = document.createElement('a');
            title.classList.add("title");
            title.innerHTML = Dictionary.translate("Menu");

            header.appendChild(title);

            var closeButton = document.createElement('a');
            closeButton.classList.add("close");
            closeButton.innerHTML = Dictionary.translate("close");
            closeButton.addEventListener("click", function (e) {
                obj.close();
            });

            header.appendChild(closeButton);

            return header;
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
                    itemContainer.addEventListener("mousedown", function (e) {
                        e.preventDefault();
                    });
                    itemContainer.addEventListener("mouseup", function (e) {
                        // Execute method
                        this.method(this, e);
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

                    // Submenu positioning logic:
                    // Case 1: Default (enough space to the right) - submenu opens to the right of the parent menu item.
                    // Case 2: Not enough space to the right, but enough to the left - submenu opens to the left of the parent menu item.
                    // Case 3: Not enough space on either side (e.g., very narrow viewport) - submenu opens below the parent menu item.
                    itemContainer.addEventListener('mouseenter', function () {
                        // Reset to default
                        el_submenu.style.left = '';
                        el_submenu.style.right = '';
                        el_submenu.style.minWidth = itemContainer.offsetWidth + 'px';

                        // Temporarily show submenu to measure
                        el_submenu.style.display = 'block';
                        el_submenu.style.opacity = '0';
                        el_submenu.style.pointerEvents = 'none';

                        // Use getBoundingClientRect to determine position
                        var parentRect = itemContainer.getBoundingClientRect();
                        var submenuRect = el_submenu.getBoundingClientRect();
                        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

                        // Calculate the right edge if rendered to the right
                        var rightEdge = parentRect.right + submenuRect.width;
                        var leftEdge = parentRect.left - submenuRect.width;

                        // If rendering to the right would overflow, render to the left
                        if (rightEdge > viewportWidth && leftEdge >= 0) {
                            el_submenu.style.left = 'auto';
                            el_submenu.style.right = '99%';
                        } 
                        // If both right and left would overflow, render to the right of the left border (worst case)
                        else if (rightEdge > viewportWidth && leftEdge < 0) {
                            el_submenu.style.left = '32px';
                            el_submenu.style.right = 'auto';
                            el_submenu.style.top = '100%';
                        }
                        // Default: render to the right
                        else {
                            el_submenu.style.left = '99%';
                            el_submenu.style.right = 'auto';
                        }

                        // Restore visibility
                        el_submenu.style.opacity = '';
                        el_submenu.style.pointerEvents = '';
                        el_submenu.style.display = '';
                    });

                    // Also reset submenu position on mouseleave to avoid stale styles
                    itemContainer.addEventListener('mouseleave', function () {
                        el_submenu.style.left = '';
                        el_submenu.style.right = '';
                        el_submenu.style.minWidth = '';
                    });
                } else if (item.shortcut) {
                    var itemShortCut = document.createElement('span');
                    itemShortCut.innerHTML = item.shortcut;
                    itemContainer.appendChild(itemShortCut);
                }
            }
            return itemContainer;
        }

        if (typeof (obj.options.onclick) == 'function') {
            el.addEventListener('click', function (e) {
                obj.options.onclick(obj, e);
            });
        }

        // Create items
        if (obj.options.items) {
            obj.create(obj.options.items);
        }

        window.addEventListener("mousewheel", function () {
            obj.close();
        });

        el.contextmenu = obj;

        return obj;
    }

    return Component;
}

export default Contextmenu();