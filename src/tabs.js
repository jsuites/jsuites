jSuites.tabs = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: null,
        position: null,
        allowCreate: false,
        allowChangePosition: false,
        onclick: null,
        onload: null,
        onchange: null,
        oncreate: null,
        ondelete: null,
        onbeforecreate: null,
        onchangeposition: null,
        animation: false,
        hideHeaders: false
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
            var rect = obj.headers.children[index].getBoundingClientRect();
            var rectContent = obj.content.children[index].getBoundingClientRect();
            border.style.width = rect.width + 'px';
            border.style.left = (rect.left - rectContent.left) + 'px';
            border.style.top = rect.height + 'px';
        }
    }

    // Set value
    obj.open = function(index) {
        var previous = null;
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                // Current one
                previous = i;
                // Remote selected
                obj.headers.children[i].classList.remove('jtabs-selected');
                if (obj.content.children[i]) {
                    obj.content.children[i].classList.remove('jtabs-selected');
                }
            }
        }

        obj.headers.children[index].classList.add('jtabs-selected');
        if (obj.content.children[index]) {
            obj.content.children[index].classList.add('jtabs-selected');
        }

        if (previous != index && typeof(obj.options.onchange) == 'function') {
            if (obj.content.children[index]) {
                obj.options.onchange(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        }

        if (obj.content.children[index]) {
            if (typeof(obj.options.onclick) == 'function') {
                obj.options.onclick(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        }

        // Hide
        if (obj.options.hideHeaders == true && (obj.headers.children.length < 2 && obj.options.allowCreate == false)) {
            obj.headers.style.display = 'none';
        } else {
            obj.headers.style.display = '';
            // Set border
            if (obj.options.animation == true) {
                setTimeout(function() {
                    setBorder(index);
                }, 100);
            }
        }
    }

    obj.selectIndex = function(a) {
        var index = Array.prototype.indexOf.call(obj.headers.children, a);
        if (index >= 0) {
            obj.open(index);
        }
    }

    obj.create = function(title) {
        if (typeof(obj.options.onbeforecreate) == 'function') {
            var ret = obj.options.onbeforecreate();
            if (ret === false) {
                return false;
            } else {
                title = ret;
            }
        }

        var div = obj.appendElement(title);

        if (typeof(obj.options.oncreate) == 'function') {
            obj.options.oncreate(el, div)
        }

        return div;
    }

    obj.nextNumber = function() {
        var num = 0;
        for (var i = 0; i < obj.headers.children.length; i++) {
            var tmp = obj.headers.children[i].innerText.match(/[0-9].*/);
            if (tmp > num) {
                num = parseInt(tmp);
            }
        }
        if (! num) {
            num = 1;
        } else {
            num++;
        }

        return num;
    }

    obj.deleteElement = function(index) {
        if (! obj.headers.children[index]) {
            return false;
        } else {
            obj.headers.removeChild(obj.headers.children[index]);
            obj.content.removeChild(obj.content.children[index]);
        }

        obj.open(0);

        if (typeof(obj.options.ondelete) == 'function') {
            obj.options.ondelete(el, index)
        }
    }

    obj.appendElement = function(title) {
        if (! title) {
            var title = prompt('Title?', '');
        }

        if (title) {
            // Add content
            var div = document.createElement('div');
            obj.content.appendChild(div);

            // Add headers
            var header = document.createElement('div');
            header.innerHTML = title;
            header.content = div;
            if (obj.options.allowCreate) {
                obj.headers.insertBefore(header, obj.headers.lastChild);
            } else {
                obj.headers.appendChild(header);
            }
            // Sortable
            if (obj.options.allowChangePosition) {
                header.setAttribute('draggable', 'true');
            }
            // Open new tab
            obj.selectIndex(header);

            // Return element
            return div;
        }
    }

    obj.init = function() {
        // New
        if (obj.options.allowCreate == true) {
            var add = document.createElement('i');
            add.className = 'jtabs-add';
            add.setAttribute('draggable', 'false');
            obj.headers.appendChild(add);
        }

        // Events
        obj.headers.addEventListener("click", function(e) {
            if (e.target.tagName == 'DIV') {
                obj.selectIndex(e.target);
            } else {
                obj.create();
            }
        });

        obj.headers.addEventListener("contextmenu", function(e) {
            if (e.target.tagName == 'DIV') {
                obj.selectIndex(e.target);
            }
        });

        if (obj.headers.children.length) {
            obj.open(0);
        }

        if (obj.options.allowChangePosition == true) {
            jSuites.sorting(obj.headers, {
                direction: 1,
                ondrop: function(a,b,c,d,e,f) {
                    // Ondrop update position of content
                    if (b > c) {
                        obj.content.insertBefore(obj.content.children[b], obj.content.children[c]);
                    } else {
                        obj.content.insertBefore(obj.content.children[b], obj.content.children[c].nextSibling);
                    }
                    // Open destination tab
                    obj.open(c);
                    // Call event
                    if (typeof(obj.options.onchangeposition) == 'function') {
                        obj.options.onchangeposition(a,b,c,d,e,f);
                    }
                },
            });
        }
    }

    // Create from data
    if (obj.options.data) {
        // Make sure the component is blank
        el.innerHTML = '';
        obj.headers = document.createElement('div');
        obj.content = document.createElement('div');
        obj.headers.classList.add('jtabs-headers');
        obj.content.classList.add('jtabs-content');
        el.appendChild(obj.headers);
        el.appendChild(obj.content);

        for (var i = 0; i < obj.options.data.length; i++) {
            var headersItem = document.createElement('div');
            obj.headers.appendChild(headersItem);
            var contentItem = document.createElement('div');
            obj.content.appendChild(contentItem);

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

                            obj.init();
                            obj.open(0);
                        }
                    }
                });
            }
        }
    } else if (el.children[0] && el.children[1]) {
        // Create from existing elements
        obj.headers = el.children[0];
        obj.content = el.children[1];
        obj.headers.classList.add('jtabs-headers');
        obj.content.classList.add('jtabs-content');
        obj.init();
    } else {
        el.innerHTML = '';
        obj.headers = document.createElement('div');
        obj.content = document.createElement('div');
        obj.headers.classList.add('jtabs-headers');
        obj.content.classList.add('jtabs-content');
        el.appendChild(obj.headers);
        el.appendChild(obj.content);
        obj.init();
    }

    el.tabs = obj;

    return obj;
});