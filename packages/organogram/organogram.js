/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.organogram = factory();
}(this, (function () {

    'use strict';

    if (! jSuites && typeof(require) === 'function') {
        var jSuites = require('jsuites');
        require('jsuites/dist/jsuites.css');
    }

    return (function(el, options) {
        if (el.organogram) {
            return el.organogram.setOptions(options, reset);
        }

        var obj = {};
        obj.options = {};

        // Defines the state to deal with mouse events 
        var state = {
            x: 0,
            y: 0,
            initialWidth: 0,
            initialTop: 100,
            fingerDistance: 0,
            mobileDown: false,
            scaling: false,
            scale: 1,
        }

        var getRoleById = function(id) {
           for (var i = 0; i < obj.options.roles.length; i++) {
               if (id == obj.options.roles[i].id) {
                   return obj.options.roles[i];
               }
           }
           return false;
        }

        var getContent = function(node) {
            var role = node.role;
            var color = node.color || 'lightgreen';
            if (obj.options.roles && node.role >= 0) {
                var o = getRoleById(node.role);
                if (o) {
                    role = o.name;
                    var color = o.color;
                }
            }

            return `<div class="jorg-user-status" style="background:${color}"></div>
                <div class="jorg-user-info">
                    <div class='jorg-user-img'><img src="${node.img}" ondragstart="return false" /></div>
                    <div class='jorg-user-content'><span>${node.name}</span><span>${role}</span></div>
                </div>`;
        }

        // Creates the shape of a node to be added to the organogram chart tree
        var mountNodes = function(node, container) {
            var li = document.createElement('li');
            var span = document.createElement('span');
            span.className = 'jorg-tf-nc';
            span.innerHTML = getContent(node);
            span.setAttribute('id', node.id);
            var ul = document.createElement('ul');
            li.appendChild(span);
            li.appendChild(ul);
            container.appendChild(li);

            return ul;
        }

        // Return the render mode ( vertical or horizontal )
        var getRenderMode = function(container) {
            if (container.parentNode == el) {
                return 'horizontal';
            }
            if (container.children.length > 1) {
                for (var i = 0; i < container.children.length; i ++) {
                    if (Array.from(container.children[i].children).find(element => element.tagName == 'UL')) {
                        return 'horizontal';
                    }
                }
                return 'vertical';
            }
            return 'vertical';
        }

        // Node visibility feature
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
                ul.children[0].style.width = state.initialWidth + 'px';
            });
        }

        // Renders the organogram
        var render = function (parent, container) {
            for (var i = 0; i < obj.options.data.length; i ++) {
                if (obj.options.data[i].parent === parent) {
                    var ul = mountNodes(obj.options.data[i], container);
                    render(obj.options.data[i].id, ul);
                }
            }

            // Check render mode / vertical / horizontal
            var mode = getRenderMode(container);

            if (mode == 'vertical' && obj.options.vertical) {
                container.previousElementSibling.classList.add('jorg-after-none');
                container.classList.add('jorg-vertical');
            } else {
                container.classList.add('jorg-horizontal');
            }

            if (! container.childNodes.length) {
                container.remove();
            } else if (container.previousElementSibling) {
                setNodeVisibility(container.previousElementSibling);
            }
        }

        // Sets the full screen mode
        var setFullScreenMode = function(e) {
            var windowScrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            if (el.classList.contains('fullscreen-mode')) {
                el.classList.remove('fullscreen-mode');
                document.body.classList.remove('jorg-hide-scrollbars');
                el.style.top = '0px';
                e.target.innerText ='slideshow';
            } else {
                el.classList.add('fullscreen-mode');
                document.body.classList.add('jorg-hide-scrollbars');
                el.style.top = windowScrollTop + 'px';
                e.target.innerText ='close_fullscreen';
            }
        }

        // Deals with zoom in and zoom out in the organogram
        var zoom = function(e) {
            e = event || window.event;
            // Current zoom
            var currentZoom = state.scale = el.children[0].style.zoom * 1;
            var prevWidth = el.children[0].offsetWidth;
            var prevHeight = el.children[0].offsetHeight;
            var widthVar, heightVar;
            // Action
            if (e.target.classList.contains('jorg-zoom-in') || e.deltaY < 0) {
                el.children[0].style.zoom = currentZoom + obj.options.zoom;
                widthVar = prevWidth - el.children[0].offsetWidth;
                heightVar = prevHeight - el.children[0].offsetHeight;
                el.children[0].scrollLeft += (widthVar/2)
                el.children[0].scrollTop += (heightVar/2)
            } else if (currentZoom > .5) {
                el.children[0].style.zoom = state.scale = currentZoom - obj.options.zoom;
                widthVar = el.children[0].offsetWidth - prevWidth;
                heightVar = el.children[0].offsetHeight - prevHeight;
                el.children[0].scrollLeft -= (widthVar/2);
                el.children[0].scrollTop -= (heightVar/2);
            }
            e.preventDefault();
        }

        // Finds a node in the organogram chart by a node propertie
        var findNode = function(o) {
            if (o && typeof o == 'object') {
                var keys = Object.keys(o);
                for (var i = 0; i < keys.length; i ++) {
                    var property = keys[i];
                    var node = obj.options.data.find(node => node[property] == o[property]);
                    if (node) {
                        return Array.prototype.slice.call(document.querySelectorAll('.jorg-tf-nc')).find(n => n.getAttribute('id') == node.id);
                    } else {
                        continue;
                    }
                }
            }
            return 0;
        }

        //
        var setInitialPosition = function() {
            ul.children[0].style.left = (ul.clientWidth / 2  - ul.children[0].clientWidth / 2) + 'px';
            ul.children[0].style.top = '100px';
        }

        //
        var setInitialWidth = function() {
            state.initialWidth = ul.children[0].clientWidth;
        }

        //
        var animateOnSearch = function(newLeft, newTop) {
            ul.classList.add('jorg-search-animation');
            ul.onanimationend = function(e) {
                if (e.animationName == 'jorg-searching-hide') {
                    ul.children[0].style.left = newLeft + 'px';
                    ul.children[0].style.top = newTop + 'px';
                    ul.classList.remove('jorg-search-animation');
                    ul.classList.add('jorg-searching-visible');
                }else if(e.animationName == 'jorg-searching-visible') {
                    ul.classList.remove('jorg-searching-visible');
                }
            }
        }

        /**
         * Set the options
         * @param {object} options
         */
        obj.setOptions = function(options, reset) {
            // Default configuration
            var defaults = {
                data: null,
                url: null,
                zoom: 0.1,
                width: 800,
                height: 600,
                search: true,
                searchPlaceholder: 'Search',
                vertical: false,
                roles: null,
                // Events
                onload: null,
                onchange: null,
                onclick: null
            };

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                        obj.options[property] = defaults[property];
                    }
                }
            }

            // Show search box
            if (obj.options.search) {
                el.appendChild(search);
            } else {
                el.removeChild(search);
            }

            // Make sure correct format
            obj.options.width = parseInt(obj.options.width);
            obj.options.height = parseInt(obj.options.height);

            // Update placeholder
            search.placeholder = obj.options.searchPlaceholder;

            // Set default dimensions
            if (options.width || options.height) {
                obj.setDimensions(obj.options.width, obj.options.height);
            }

            // Only execute when is not the first time
            if (el.organogram) {
                if (options.vertical === true || options.vertical === false || options.roles) {
                    obj.refresh();
                }
            }
        }

        /**
         * Reset roles
         */
        obj.setRoles = function(roles) {
            if (roles) {
                obj.options.roles = roles;
                obj.refresh();
            }
        }

        /**
         * Refreshes the organozation chart
         */
        obj.update = function() {
            el.children[0].innerHTML = '';
            render(0,el.children[0]);
        }

        /**
         * applies a zoom in the organization chart
         */
        obj.zoom = function(scale) {
            if (scale < .5 ) {
                scale = .5;
            }
            ul.style.zoom = state.scale = scale;
        }

        /**
         * Reset the organogram chart tree
         */
        obj.refresh = function() {
            el.children[0].innerHTML = '';
            render(0,el.children[0]);
            setInitialPosition();
            setInitialWidth();
        }

        /**
         * Show or hide childrens of a node
         */
        obj.show = function(id) {
            var node = findNode({ id: id });
            // Check if the node exists and if it has an icon
            if (node && node.lastChild) {
                // Click on the icon
                node.lastChild.click();
            }
        }

        /**
         * Appends a new element in the organogram chart
         */
        obj.addItem = function(item) {
            if (typeof item == 'object' && item.hasOwnProperty('id') && item.hasOwnProperty('parent') && ! isNaN(item.parent) && ! isNaN(item.id)) {
                var findedParent = obj.options.data.find(function(node) {
                    if (node.id == item.parent) {
                        return true;
                    }
                    return false;
                });

                if (findedParent) {
                    obj.options.data.push(item);
                    
                    obj.refresh();

                    if (typeof obj.options.onchange == 'function') {
                        obj.options.onchange(el, obj);
                    }
                }
                else {
                    console.log('cannot add this item');
                }
            }
        }

        /**
         * Removes a item from the organogram chart
         */
        obj.removeItem = function(item) {
            if (obj.options.data.length && obj.options.data.find(function(node) {
                return node.id == item.id;
            })) {
                var itemChildrenList = obj.options.data.filter(function(node) {
                    if (node.parent == item.id) {
                        return true;
                    }
                    return false;
                });

                if (itemChildrenList.length) {
                    for (var i = 0; i < itemChildrenList.length; i ++) {
                        obj.options.data.splice(obj.options.data.indexOf(itemChildrenList[i], 1));
                    }
                }
                obj.options.data.splice(obj.options.data.indexOf(item), 1);
                obj.refresh();
            }
        }

        /**
         * Sets a new value for the data array and re-render the organogram.
         */
        obj.setData = function(data) {
            if (typeof(data) == 'object') {
                obj.options.data = data;
                obj.refresh();
            }
        }

        /**
         * Search for any item with the string and centralize it.
         */
        obj.search = function(str) {
           var input = str.toLowerCase();

           if (options) {
                var data = obj.options.data;
                var searchedNode = data.find(node => node.name.toLowerCase() == input);
                if (searchedNode) {
                    var node = findNode({ id: searchedNode.id });
                    // Got to the node position
                    if (node) {
                        var nodeRect = node.getBoundingClientRect();
                        var ulRect = ul.getBoundingClientRect();
                        var tm = (nodeRect.top - ulRect.top) - (ul.clientHeight / 2) + (node.clientHeight / 2)
                        var lm = (nodeRect.left - ulRect.left) - (ul.clientWidth / 2) + (node.clientWidth / 2);
                        var newTop = (parseFloat(ul.children[0].style.top) - tm);
                        var newLeft = (parseFloat(ul.children[0].style.left) - lm);
                        animateOnSearch(newLeft, newTop);
                    }
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

        var pinchStart = function(e) {
            state.fingerDistance = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
        }

        var pinchMove = function(e) {
            e.preventDefault();

            var dist2 = Math.hypot(e.touches[0].pageX - e.touches[1].pageX,e.touches[0].pageY - e.touches[1].pageY);

            if (dist2 > state.fingerDistance) {
                var dif =  dist2 - state.fingerDistance;
                var newZoom = state.scale + state.scale * dif * 0.0025;
                if (newZoom <= 5.09) {
                   obj.zoom(newZoom);
                   document.getElementById('info').textContent = newZoom;
                }
            }

            if (dist2 < state.fingerDistance) {
                var dif =  state.fingerDistance - dist2;
                var newZoom = state.scale - state.scale * dif * 0.0025;
                if (newZoom >= 0.1) {
                   obj.zoom(newZoom);
                   document.getElementById('info').textContent = newZoom;
                }
            }
            state.fingerDistance = dist2;
        }

        var moveListener = function(e){
            e = e || window.event;
            e.preventDefault();

            if (! state.scaling) {
                var currentX = e.clientX || e.pageX || e.changedTouches[0].pageX || e.changedTouches[0].clientX;
                var currentY = e.clientY || e.pageY || e.changedTouches[0].pageY || e.changedTouches[0].clientY;
                if (e.which || state.mobileDown) {
                    var x = state.x - currentX;
                    var y = (state.y - currentY);
                    var zoomFactor = ul.style.zoom <= 1 ? 1 + (1 - ul.style.zoom) : 1 - (ul.style.zoom - 1) < .5 ? .5 : 1 - (ul.style.zoom - 1);
                    ul.children[0].style.left = -(state.scrollLeft + x * zoomFactor)   + 'px';
                    ul.children[0].style.top = (state.scrollTop + y * zoomFactor * -1)   + 'px';
                }
            }
            
            if (state.scaling) {
                pinchMove(e);
            }
        }

        var touchListener = function(e) {
            e = e || window.event;

            if (e.changedTouches) {
                state.mobileDown = true;
            }

            state.x = e.clientX || e.pageX || e.changedTouches[0].pageX || e.changedTouches[0].clientX;
            state.y = e.clientY || e.pageY || e.changedTouches[0].pageY || e.changedTouches[0].clientY;
            state.scrollLeft = - 1 * parseFloat(ul.children[0].style.left) || 0;
            state.scrollTop = parseFloat(ul.children[0].style.top);

            if (e.touches) {
                if(e.touches.length == 2) {
                    state.scaling = true;
                    pinchStart(e);
                }
            }
        }

        var touchEnd = function(e) {
            state.mobileDown = false;
            if (state.scaling) {
                state.scaling = false;
            }
        }

        var ul = null;
        var search = null;
        var zoomContainer = null;
        var zoomIn = null;
        var zoomOut = null;
        var fullscreen = null;

        var init = function() {
            // Create zoom action
            zoomContainer = document.createElement('div');
            zoomContainer.className = 'jorg-zoom-container';
            obj.zoomContainer = zoomContainer;

            zoomIn = document.createElement('i');
            zoomIn.className = 'jorg-zoom-in material-icons jorg-action';
            zoomIn.innerHTML = "add_box";

            zoomOut = document.createElement('i');
            zoomOut.className = 'jorg-zoom-out material-icons jorg-action';
            zoomOut.innerHTML = "indeterminate_check_box";

            fullscreen = document.createElement('i');
            fullscreen.className = 'jorg-fullscreen material-icons jorg-action';
            fullscreen.title = 'Fullscreen';
            fullscreen.innerHTML = "slideshow";

            zoomContainer.appendChild(fullscreen);
            zoomContainer.appendChild(zoomIn);
            zoomContainer.appendChild(zoomOut);

            zoomIn.addEventListener('click', zoom);
            zoomOut.addEventListener('click', zoom);
            fullscreen.addEventListener('click', setFullScreenMode);

            // Create container
            ul = document.createElement('ul');

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

            search = document.createElement('input');
            search.type = 'text';
            search.classList.add('jorg-search');
            search.onkeyup = function(e) {
                obj.search(e.target.value);
            }
            search.onblur = function(e) {
                e.target.value = '';
            }

            // Event handlers
            ul.addEventListener('wheel', zoom);
            ul.addEventListener('mousemove', moveListener);
            ul.addEventListener('touchmove', moveListener);
            ul.addEventListener('touchstart', touchListener);
            ul.addEventListener('touchend', touchEnd);
            ul.addEventListener('mousedown', touchListener);

            el.addEventListener('click', function(e) {
                if (typeof(obj.options.onclick) == 'function') {
                    obj.options.onclick(el, obj, e);
                }
            });

            obj.setOptions(options);

            // Create
            var create = function() {
                render(0, ul);
                setInitialPosition();
                setInitialWidth();
                // Set default dimensions
                obj.setDimensions(obj.options.width, obj.options.height);

                if (typeof obj.options.onload == 'function') {
                    obj.options.onload(el, obj);
                }
            }

            // Loading data
            if (obj.options.url) {
                jSuites.ajax({
                    url: obj.options.url,
                    method: 'GET',
                    dataType: 'json',
                    success: function(result) {
                        obj.options.data = result;

                        create();
                    }
                });
            } else if (obj.options.data && obj.options.data.length) {
                create();
            }

            el.organogram = obj;
        }

        init();

        return obj;
    });
})));