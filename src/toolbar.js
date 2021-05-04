jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        container: false,
        badge: false,
        title: false,
        items: [],

        more: {
            container: null,
            items: [],
            content:"expand_more"
        }
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! el && options.app && options.app.el) {
        el = document.createElement('div');
        options.app.el.appendChild(el);
    }

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            if (element != elements[i]) {
                elements[i].classList.remove('jtoolbar-selected');
            }
        }
        element.classList.add('jtoolbar-selected');
    }

    obj.hide = function() {
        jSuites.animation.slideBottom(el, 0, function() {
            el.style.display = 'none';
        });
    }

    obj.show = function() {
        el.style.display = '';
        jSuites.animation.slideBottom(el, 1);
    }

    obj.get = function() {
        return el;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        el.innerHTML = '';
    }

    var toggleState = function() {
        if (this.classList.contains('jtoolbar-active')) {
            this.classList.remove('jtoolbar-active');
        } else {
            this.classList.add('jtoolbar-active');
        }
    }

    var widthToolbar = 0;
    var toolbarItemMore = null;

    obj.create = function(items) {
        // Reset anything in the toolbar
        toolbarContent.innerHTML = '';
        // Init width Toolbar
        widthToolbar = 0;
        // Init container for more
        obj.options.more.items = [];

        // Create elements in the toolbar
        for (var i = 0; i < items.length; i++) {
            var toolbarItem = document.createElement('div');
            toolbarItem.classList.add('jtoolbar-item');

            if (items[i].width) {
                toolbarItem.style.width = parseInt(items[i].width) + 'px'; 
            }

            if (items[i].k) {
                toolbarItem.k = items[i].k;
            }

            if (items[i].tooltip) {
                toolbarItem.setAttribute('title', items[i].tooltip);
            }

            // Id
            if (items[i].id) {
                toolbarItem.setAttribute('id', items[i].id);
            }

            // Selected
            if (items[i].state) {
                toolbarItem.toggleState = toggleState;
            }

            if (items[i].active) {
                toolbarItem.classList.add('jtoolbar-active');
            }

            if (items[i].type == 'select' || items[i].type == 'dropdown') {
                if (typeof(items[i].onchange) == 'function') {
                    // Event for picker has different arguments
                    items[i].onchange = (function(o) {
                        return function(a,b,c,d) {
                            o(el, obj, a, c, d);
                            // Close toolbarMore
                            if( obj.options.more.container ) {
                                obj.options.more.container.content.style.display="none";
                            }
                        }
                    })(items[i].onchange);
                }
                jSuites.picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            } else if (items[i].type == 'label') {
                toolbarItem.classList.add('jtoolbar-label');
                toolbarItem.innerHTML = items[i].content;
            } else {
                // Material icons
                var toolbarIcon = document.createElement('i');
                if (typeof(items[i].class) === 'undefined') {
                toolbarIcon.classList.add('material-icons');
                } else {
                    var c = items[i].class.split(' ');
                    for (var j = 0; j < c.length; j++) {
                        toolbarIcon.classList.add(c[j]);
                    }
                }
                toolbarIcon.innerHTML = items[i].content ? items[i].content : '';
                toolbarItem.appendChild(toolbarIcon);

                // Badge options
                if (obj.options.badge == true) {
                    var toolbarBadge = document.createElement('div');
                    toolbarBadge.classList.add('jbadge');
                    var toolbarBadgeContent = document.createElement('div');
                    toolbarBadgeContent.innerHTML = items[i].badge ? items[i].badge : '';
                    toolbarBadge.appendChild(toolbarBadgeContent);
                    toolbarItem.appendChild(toolbarBadge);
                }

                // Title
                if (items[i].title) {
                    if (obj.options.title == true) {
                        var toolbarTitle = document.createElement('span');
                        toolbarTitle.innerHTML = items[i].title;
                        toolbarItem.appendChild(toolbarTitle);
                    } else {
                        toolbarItem.setAttribute('title', items[i].title);
                    }
                }

                if (obj.options.app && items[i].route) {
                    // Route
                    toolbarItem.route = items[i].route;
                    // Onclick for route
                    toolbarItem.onclick = function() {
                        obj.options.app.pages(this.route);
                    }
                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true
                    });
                }
            }

            if (items[i].onclick) {
                    toolbarItem.onclick = (function (a) {
                        return function () {
                            items[a].onclick(el, obj, this);
                        };
                    })(i);
                }
            
            // Attach parameter item in DOMElement
            toolbarItem.item = items[i];

            toolbarContent.appendChild(toolbarItem);
        }

        createButtonMore();
        setTimeout(function () {
            obj.update();
        }, 10);
    }

    /**
     * Create Button more with Sub Items
     */
    function createButtonMore() {
        // Add button more
        toolbarItemMore = document.createElement('div');
        toolbarItemMore.classList.add('jtoolbar-item');
        toolbarItemMore.classList.add('jtoolbar-item-more');
        var toolbarIconMore = document.createElement('i');
        if (typeof(obj.options.more.class) === 'undefined') {
            toolbarIconMore.classList.add('material-icons');
        } else {
            var c = obj.options.more.class.split(' ');
            for (var j = 0; j < c.length; j++) {
                toolbarIconMore.classList.add(c[j]);
            }
        }
        toolbarIconMore.style.fontSize = "medium";
        toolbarIconMore.innerHTML = obj.options.more.content ? obj.options.more.content : '';
        toolbarItemMore.appendChild(toolbarIconMore);

        // create container
        obj.options.more.container = document.createElement('div');
        obj.options.more.container.classList.add('jtoolbar-more');
        obj.options.more.container.setAttribute('tabindex', '900');
        toolbarItemMore.appendChild(obj.options.more.container);

        // Create content in container
        obj.options.more.container.content = document.createElement('div');
        obj.options.more.container.content.classList.add('jtoolbar-more-content');
        obj.options.more.container.appendChild(obj.options.more.container.content);

        // OnBlur of container
        document.addEventListener("mouseup", function(e) {
            if( obj.options.more.container ) {
                if(!e.target.classList.contains("jtoolbar-item-more") && !toolbarItemMore.contains(e.target)) {
                    obj.options.more.container.content.style.display="none";
                }
            }
        });

        // Onclick on button more
        toolbarItemMore.onclick = function (e) {
            if(e.target.classList.contains("jtoolbar-item-more") || e.target.parentNode.classList.contains("jtoolbar-item-more") ) {
                if(obj.options.more.container.content.style.display=="none") {
                    obj.options.more.container.content.style.display="block";
                } else {
                    obj.options.more.container.content.style.display="none";
                }
            }
            e.preventDefault();
        };

        // Insert button on toolbar
        toolbarContent.appendChild(toolbarItemMore);
        toolbarItemMore.style.display = "none";
    }

    /**
     * Update toolbar on resize
     */
    obj.update = function() {

        // Move all item in more in toolbar
        for(var indexToolbarItem = 0;  indexToolbarItem < obj.options.more.items.length; indexToolbarItem++) {
            var toolbarItem = obj.options.more.items[indexToolbarItem].ref; 
            toolbarContent.insertBefore(toolbarItem, toolbarItemMore);
        }

        // Reset var
        obj.options.more.items = [];
        var toolbarItems = toolbarContent.children;
        var widthElement = el.parentNode.tagName == "BODY" ? window.innerWidth : el.parentNode.clientWidth;

        widthToolbar = 0; 

        // Hide all item
        for(var indexToolbarItem = 0;  indexToolbarItem < toolbarItems.length; indexToolbarItem++) {
            var toolbarItem = toolbarItems[indexToolbarItem]; 
            toolbarItem.style.display = "none";
        }                    

        // Show item by item and when toolbar is size max, move item in toolbarMore
        var countToolbarItem = toolbarItems.length;
        for(var indexToolbarItem = 0;  indexToolbarItem < countToolbarItem; indexToolbarItem++) {
            var toolbarItem = toolbarItems[indexToolbarItem];

            // Show item and calc width
            var previousWidth = toolbarContent.offsetWidth;
            toolbarItem.style.display = "block";
            var newWidth = toolbarContent.offsetWidth;

            // If item button more, not moving test
            if(toolbarItem.classList.contains("jtoolbar-item-more")) {
                continue;
            }

            // Add width in withToolbar
            var widthItem = newWidth-previousWidth;
            widthToolbar += widthItem;

            // If window width is less than width to toolbar
            
            if(widthElement < (widthToolbar+30)) {
                // Moving item in toolbarmore
                obj.options.more.container.content.appendChild(toolbarItem);

                // Recreate new onclick
                var newItemMore = Object.assign({}, toolbarItem.item);
                newItemMore.ref = toolbarItem;
                if(newItemMore.type == 'divisor') {
                    toolbarItem.style.display = "none";
                }
                if(newItemMore.onclick) {
                    newItemMore.onclick = (function (a) {
                        return function () {
                            toolbarContent.children[a].onclick();
                        };
                    })(indexToolbarItem);
                }

                // Push in array of all item in moretoolbar
                obj.options.more.items.push(newItemMore);

                // Adjust index loop
                countToolbarItem--;
                indexToolbarItem--;
            }
        };

        // Manage show button more
        toolbarItemMore.style.display = "none";
        if(obj.options.more.items.length>0) {
            toolbarItemMore.style.display = "block";
        }
    }

    el.classList.add('jtoolbar');

    if (obj.options.container == true) {
        el.classList.add('jtoolbar-container');
    }

    el.innerHTML = '';
    el.onclick = function(e) {
        var element = jSuites.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }
    }

    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);

    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    }

    obj.create(obj.options.items);

    el.toolbar = obj;

    // On resize with update toolbar for toolbarMore
    window.addEventListener('resize', function(e) {
        obj.update();
    });

    return obj;
});