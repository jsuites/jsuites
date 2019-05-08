jApp.mobile = (function(el, options) {
    var obj = {};
    obj.options = {};

    return obj;
});

jApp.page = (function() {
    var obj = {};

    obj.create = function(options) {
        obj.el = document.createElement('div');
        obj.el.id = options.id;
        jApp.el.appendChild(loading);
    };

    obj.hide = function() {
        loading.remove();
    };

    return obj;
});

jApp.toolbar = (function(el, options) {
    var obj = {};
    obj.options = options;

    var toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    toolbar.onclick = function(e) {
        var element = toolbarContent.children;
        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove('selected');
        }
        if (element = getElement(e.target)) {
            element.classList.add('selected');
        }
    }

    var toolbarContent = document.createElement('div');
    toolbar.appendChild(toolbarContent);

    for (var i = 0; i < options.items.length; i++) {
        var toolbarItem = document.createElement('div');
        toolbarItem.classList.add('toolbar-item');
        var toolbarLink = document.createElement('a');
        //toolbarLink.setAttribute('href', options.items[i].route);

        if (options.items[i].icon) {
            var toolbarIcon = document.createElement('i');
            toolbarIcon.classList.add('material-icons');
            toolbarIcon.innerHTML = options.items[i].icon;
            toolbarLink.appendChild(toolbarIcon);
        }
        if (options.items[i].badge) {
            var toolbarBadge = document.createElement('div');
            toolbarBadge.classList.add('badge');
            var toolbarBadgeContent = document.createElement('div');
            toolbarBadgeContent.innerHTML = options.items[i].badge;
            toolbarBadge.appendChild(toolbarBadgeContent);
            toolbarLink.appendChild(toolbarBadge);
        }
        if (options.items[i].title) {
            var toolbarTitle = document.createElement('span');
            toolbarTitle.innerHTML = options.items[i].title;
            toolbarLink.appendChild(toolbarTitle);
        }

        toolbarItem.appendChild(toolbarLink);
        toolbarContent.appendChild(toolbarItem);
    }

    var getElement = function(element) {
        var item = null;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('toolbar-item')) {
                    item = element;
                }
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return item;
    }

    el.appendChild(toolbar);

    return obj;
});

jApp.actionsheet = (function() {
    var obj = {};
    obj.options = {};

     var actionsheet = document.createElement('div');
     actionsheet.className = 'jactionsheet';

    var actionContent = document.createElement('div');
    actionContent.className = 'jactionsheet-content';
    actionsheet.appendChild(actionContent);

    obj.open = function(options) {
       obj.options = options;

       obj.options.groups.forEach(function(group) {
            var actionGroup = document.createElement('div');
            actionGroup.className = 'jactionsheet-group';

            group.forEach(function(v) {
                var actionItem = document.createElement('div');
                var actionInput = document.createElement('input');
                actionInput.type = 'button';
                actionInput.value = v.title;
                if (v.className) {
                    actionInput.className = v.className; 
                }
                if (v.onclick) {
                    actionInput.onclick = v.onclick; 
                }
                actionItem.appendChild(actionInput);
                actionGroup.appendChild(actionItem);
            });

            actionContent.appendChild(actionGroup);
        });

        // Append
        actionsheet.style.opacity = 100;
        jApp.el.appendChild(actionsheet);

        // Animation
        actionContent.classList.add('slide-bottom-in');
    }

    obj.close = function() {
        actionsheet.style.opacity = 0;
        // Remove any existing actionsheet
        actionContent.classList.add('slide-bottom-out');

        // Wait for the animation and remove any actionsheet
        setTimeout(function() {
            actionsheet.remove();
        }, 400);
    }

    return obj;
})();