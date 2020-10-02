jSuites.organogram = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: null,
        zoom: 1,
        width: 800,
        height: 600,
        search: true,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    var state = {
        x: 0,
        y: 0
    }

    var mountNodes = function(node, container) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.className = 'jorg-tf-nc';
        span.innerHTML = `<div class="jorg-user-status" style="background:${node.status}"></div><div class="jorg-user-info"><div class='jorg-user-img'><img src="${node.img}"/></div><div class='jorg-user-content'><span>${node.name}</span><span>${node.role}</span></div>`;
        span.setAttribute('id',node.id);
        var ul = document.createElement('ul');
        li.appendChild(span);
        li.appendChild(ul);
        container.appendChild(li);
        return ul;
    }

    var setNodeVisibility = function(node) {
        var className = "jorg-node-icon";
        var icon = document.createElement('div');
        var ulNode = node.nextElementSibling;
        node.appendChild(icon);

        if (ulNode) {
            icon.className = className + ' remove';
        } else {
            icon.className = className + ' plus'
            return ;
        }

        icon.addEventListener('click', function(e) {

            if (node.nextElementSibling.style.display == 'none') {
                node.nextElementSibling.style.display = 'inline-flex';
                node.removeAttribute('visibility');
                e.target.className = className + ' remove';
            } else {
                node.nextElementSibling.style.display = 'none';
                node.setAttribute('visibility','hidden');
                e.target.className = className + ' plus';
            }
        });
    }

    // Updates tree container dimensions
    var updateTreeContainerDimensions = function(){
        var treeContainer = ul.children[0];
        treeContainer.style.width = treeContainer.offsetWidth * 3 + 'px';
        treeContainer.style.height = treeContainer.offsetHeight * 3 + 'px'
    }

    var render = function (parent, container) {
        for (var i = 0; i < obj.options.data.length; i ++) {
            if (obj.options.data[i].parent === parent) {
                var ul = mountNodes(obj.options.data[i],container);
                render(obj.options.data[i].id, ul);
            }
        }

        if (! container.childNodes.length) {
            container.remove();
        } else {
            if (container.previousElementSibling) {
                setNodeVisibility(container.previousElementSibling);
            }
        }

        if (parent === obj.options.data.length) {
            updateTreeContainerDimensions();
            
            var topLevelNode = findNode({ parent: 0 });
            topLevelNode.scrollIntoView({
                behavior: "auto",
                block: "center" || "start",
                inline: "center" || "start"
            });
            return 0;
        }
    }

    var zoom = function(e) {
        e = event || window.event;

        // Current zoom
        var currentZoom = el.children[0].style.zoom * 1;

        // Action
        if (e.target.classList.contains('jorg-zoom-in') || e.deltaY < 0) {
            el.children[0].style.zoom = currentZoom + 0.05;
        } else if (currentZoom > .5) {
            el.children[0].style.zoom = currentZoom - 0.05;
        }
        e.preventDefault();
    }

    var findNode = function(options){
        if(options) {
            for(property in options){
                var node = obj.options.data.find(node => node[property] === options[property]);
                if(node){
                    return Array.prototype.slice.call(document.querySelectorAll('.jorg-tf-nc'))
                    .find(n => n.getAttribute('id') == node.id);
                }else{
                    continue ;
                }
            }
        }
        return 0;
    }

    obj.refresh = function() {
        el.children[0].innerHTML = '';
        render(0,el.children[0]);
    }

    obj.show = function(id) {
        var node = findNode({ id: id });
        setNodeVisibility(node);
        return node;
    }

    /**
     * Search for any item with the string and centralize it.
     */
    obj.search = function(str) {
       var input = str.toLowerCase();
       
       if(options) {
            var data = obj.options.data;
            var searchedNode = data.find(node => node.name.toLowerCase() === input);
            
            if(searchedNode) {
                var node = findNode({ id: searchedNode.id });
                node.scrollIntoView({
                    behavior: "smooth" || "auto",
                    block: "center" || "start",
                    inline: "center" || "start"
                });
            }
        }
    }

    /**
     * Change the organogram dimensions
     */
    obj.setDimensions = function(width, height) {
        el.style.width = width + 'px';
        el.style.height = height + 'px';
    }

    // Create zoom action
    var zoomContainer = document.createElement('div');
    zoomContainer.className = 'jorg-zoom-container';

    var zoomIn = document.createElement('div');
    zoomIn.className = 'jorg-zoom-in';

    var zoomOut = document.createElement('div');
    zoomOut.className = 'jorg-zoom-out';

    zoomContainer.appendChild(zoomIn);
    zoomContainer.appendChild(zoomOut);

    zoomIn.addEventListener('click', zoom);
    zoomOut.addEventListener('click', zoom);

    // Create container
    var ul = document.createElement('ul');

    // Default zoom
    if (! ul.style.zoom) {
        ul.style.zoom = '1';
    }

    // Default classes
    el.classList.add('jorg');
    el.classList.add('jorg-tf-tree');
    el.classList.add('jorg-unselectable');
    ul.classList.add('jorg-disable-scrollbars');

    // Append elements
    el.appendChild(ul);
    el.appendChild(zoomContainer);

    // Set default dimensions
    obj.setDimensions(obj.options.width, obj.options.height);

    // Handle search
    if (obj.options.search) {
        var search = document.createElement('input');
        search.type = 'text';
        search.classList.add('jorg-search');
        el.appendChild(search);

        search.onkeyup = function(e) {
            obj.search(e.target.value);
        }
    }

    // Event handlers
    ul.addEventListener('wheel', zoom);

    ul.addEventListener('mousemove', function(e){
        e = event || window.event;

        var currentX = e.clientX || e.pageX;
        var currentY = e.clientY || e.pageY;

        if (e.which) {
            var x = state.x - currentX;
            var y = state.y - currentY;
            ul.scrollLeft = state.scrollLeft + x;
            ul.scrollTop = state.scrollTop + y;
        }
    });

    ul.addEventListener('mousedown', function(e){
        e = event || window.event;

        state.x = e.clientX || e.pageX;
        state.y = e.clientY || e.pageY;
        state.scrollLeft = ul.scrollLeft;
        state.scrollTop = ul.scrollTop;
    });

    render(0,ul);
    
    return el.organogram = obj;

});