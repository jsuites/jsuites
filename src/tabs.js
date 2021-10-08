jSuites.tabs = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: null,
        allowCreate: false,
        onload: null,
        onchange: null,
        oncreate: null,
        animation: false,
        create: null,
        autoName: false,
        prefixName: '',
        hideHeaders: false,
    };

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jtabs');

    if (obj.options.animation == true) {
        // Border
        var border = document.createElement('div');
        border.className = 'jtabs-border';
        el.appendChild(border);

        var setBorder = function(index) {
            var rect = headers.children[index].getBoundingClientRect();
            var rectContent = content.children[index].getBoundingClientRect();
            border.style.width = rect.width + 'px';
            border.style.left = (rect.left - rectContent.left) + 'px';
            border.style.top = rect.height + 'px';
        }
    }

    // Set value
    obj.open = function(index) {
        for (var i = 0; i < headers.children.length; i++) {
            headers.children[i].classList.remove('jtabs-selected');
            if (content.children[i]) {
                content.children[i].classList.remove('jtabs-selected');
            }
        }

        headers.children[index].classList.add('jtabs-selected');
        if (content.children[index]) {
            content.children[index].classList.add('jtabs-selected');
        }

        // Hide
        if (obj.options.hideHeaders == true && (headers.children.length < 2 && obj.options.allowCreate == false)) {
            headers.style.display = 'none';
        } else {
            headers.style.display = '';
            // Set border
            if (obj.options.animation == true) {
                setTimeout(function() {
                    setBorder(index);
                }, 100);
            }
        }
    }

    obj.selectIndex = function(a) {
        var index = Array.prototype.indexOf.call(headers.children, a);
        if (index >= 0) {
            obj.open(index);
        }
    }

    obj.create = function(title, div) {
        if (typeof(obj.options.create) == 'function') {
            obj.options.create();
        } else {
            obj.appendElement(title, div);

            if (typeof(obj.options.oncreate) == 'function') {
                obj.options.oncreate(el, div)
            }
        }
    }

    obj.appendElement = function(title, div) {
        if (! title) {
            if (obj.options.autoName == true) {
                var title = obj.options.prefixName;
                title += ' ' + (parseInt(content.children.length) + 1);
            } else {
                var title = prompt('Title?', '');
            }
        }

        if (title) {
            // Add headers
            var header = document.createElement('div');
            header.innerHTML = title;
            if (obj.options.allowCreate) {
                headers.insertBefore(header, headers.lastChild);
            } else {
                headers.appendChild(header);
            }

            // Add content
            if (! div) {
                var div = document.createElement('div');
            }
            content.appendChild(div);

            // Open new tab
            obj.selectIndex(header);
        }
    }

    // Create from data
    if (obj.options.data) {
        // Make sure the component is blank
        el.innerHTML = '';
        var headers = document.createElement('div');
        var content = document.createElement('div');
        headers.classList.add('jtabs-headers');
        content.classList.add('jtabs-content');
        el.appendChild(headers);
        el.appendChild(content);

        for (var i = 0; i < obj.options.data.length; i++) {
            var headersItem = document.createElement('div');
            headers.appendChild(headersItem);
            var contentItem = document.createElement('div');
            content.appendChild(contentItem);

            headersItem.innerHTML = obj.options.data[i].title;
            if (obj.options.data[i].content) {
                contentItem.innerHTML = obj.options.data[i].content;
            } else if (obj.options.data[i].url) {
                jSuites.ajax({
                    url: obj.options.data[i].url,
                    type: 'GET',
                    success: function(result) {
                        contentItem.innerHTML = result;
                    },
                    complete: function() {
                        if (typeof(obj.options.onload) == 'function') {
                            obj.options.onload(el);

                            obj.open(0);
                        }
                    }
                });
            }
        }
    } else if (el.children[0] && el.children[1]) {
        // Create from existing elements
        var headers = el.children[0];
        var content = el.children[1];
        headers.classList.add('jtabs-headers');
        content.classList.add('jtabs-content');
    } else {
        el.innerHTML = '';
        var headers = document.createElement('div');
        var content = document.createElement('div');
        headers.classList.add('jtabs-headers');
        content.classList.add('jtabs-content');
        el.appendChild(headers);
        el.appendChild(content);
    }

    // New
    if (obj.options.allowCreate == true) {
        var add = document.createElement('i');
        add.className = 'jtabs-add';
        headers.appendChild(add);
    }

    // Events
    headers.addEventListener("click", function(e) {
        if (e.target.tagName == 'DIV') {
            obj.selectIndex(e.target);
        } else {
            obj.create();
        }
    });

    if (headers.children.length) {
        obj.open(0);
    }

    el.tabs = obj;

    return obj;
});