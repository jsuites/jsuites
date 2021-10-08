jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = options;

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected');
        }
        element.classList.add('selected');
    }

    obj.hide = function() {
        jSuites.slideBottom(toolbar, 0, function() {
            toolbar.style.display = 'none';
        });
    }

    obj.show = function() {
        toolbar.style.display = '';
        jSuites.slideBottom(toolbar, 1);
    }

    obj.get = function() {
        return toolbar;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        toolbar = null;
    }

    var toolbar = document.createElement('div');
    toolbar.classList.add('jtoolbar');
    toolbar.onclick = function(e) {
        var element = jSuites.getElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }
    }

    var toolbarContent = document.createElement('div');
    toolbar.appendChild(toolbarContent);

    for (var i = 0; i < options.items.length; i++) {
        var toolbarItem = document.createElement('div');
        toolbarItem.classList.add('jtoolbar-item');
        if (options.items[i].route) {
            toolbarItem.setAttribute('data-href', options.items[i].route);
            jSuites.pages(options.items[i].route, {
                closed: true,
                onenter: function() {
                    obj.selectItem(toolbarItem);
                }
            });
        }

        if (options.items[i].icon) {
            var toolbarIcon = document.createElement('i');
            toolbarIcon.classList.add('material-icons');
            toolbarIcon.innerHTML = options.items[i].icon;
            toolbarItem.appendChild(toolbarIcon);
        }

        var toolbarBadge = document.createElement('div');
        toolbarBadge.classList.add('jbadge');
        var toolbarBadgeContent = document.createElement('div');
        toolbarBadgeContent.innerHTML = options.items[i].badge ? options.items[i].badge : '';
        toolbarBadge.appendChild(toolbarBadgeContent);
        toolbarItem.appendChild(toolbarBadge);

        if (options.items[i].title) {
            var toolbarTitle = document.createElement('span');
            toolbarTitle.innerHTML = options.items[i].title;
            toolbarItem.appendChild(toolbarTitle);
        }

        toolbarContent.appendChild(toolbarItem);
    }

    el.toolbar = obj;

    el.appendChild(toolbar);

    return obj;
});