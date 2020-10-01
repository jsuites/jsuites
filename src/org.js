jSuites.org = (function(el,data){

    var obj = {};

    obj.options = {
        zoom: 0.08,
        width: 800,
        height: 600,
    };

    var state = {
        x: 0,
        y: 0
    }

    var mountNodes = function(node,container){
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.className = 'jorg-tf-nc';
        span.innerHTML = `<div class="jorg-user-status" style="background:${node.status}"></div><div class="jorg-user-info"><div class='jorg-user-img'><img src="${node.img}"/></div><div class='jorg-user-content'><span>${node.name}</span><span>${node.role}</span></div>`
        span.setAttribute('id',node.id);
        let ul = document.createElement('ul');
        li.appendChild(span);
        li.appendChild(ul);
        container.appendChild(li);
        return ul;
    }

    var setNodeVisibility = function(node){
        var className = "jorg-node-icon";
        var icon = document.createElement('div');
        var ulNode = node.nextElementSibling;
        node.appendChild(icon);

        if(ulNode){
            icon.className = className + ' remove';
        }else {
            icon.className = className + ' plus'
            return ;
        }

        icon.addEventListener('click', function setIconType(e){
            if(!setIconType.clicks){
                setIconType.clicks = 0;
            }
            
            setIconType.clicks ++;
            
            if(setIconType.clicks % 2 === 0){
                node.nextElementSibling.style.display = 'inline-flex';
                node.removeAttribute('visibility');
                e.target.className = className + ' remove';
            }else {
                node.nextElementSibling.style.display = 'none';
                node.setAttribute('visibility','hidden');
                e.target.className = className + ' plus';
            }
        });
    }

    var render = function (parent,container){
        for(let i = 0; i < data.length; i ++ ) {
            if(data[i].parent === parent) {
                let ul = mountNodes(data[i],container);
                render(data[i].id,ul);
            }
        }

        if(!container.childNodes.length){
            container.remove();
        }else {
            if(container.previousElementSibling){
                //setNodeVisibility(container.previousElementSibling);
            }
        }
    
        if(parent === data.length) {
            return 0;
        }
    }

    var mountZoomNodes = function(){
        var zoomContainer = document.createElement('div');
        zoomContainer.className = 'jorg-zoom-container';

        var zoomIn = document.createElement('div');
        zoomIn.className = 'jorg-zoom-in';
        zoomIn.setAttribute('zoomType','jorg-zoom-in')

        var zoomOut = document.createElement('div');
        zoomOut.className = 'jorg-zoom-out';

        zoomContainer.appendChild(zoomIn);
        zoomContainer.appendChild(zoomOut);

        zoomIn.addEventListener('click',zoom);
        zoomOut.addEventListener('click',zoom);

        return zoomContainer;
    }

    var zoom = function(e){

        e = event || window.event;

        if(!el.children[0].style.zoom) {
            el.children[0].style.zoom = '1';
        }

        var currentZoom = el.children[0].style.zoom * 1;
        
        if(e.target.getAttribute('zoomType') == 'jorg-zoom-in' || e.deltaY < 0) {
            el.children[0].style.zoom = currentZoom + obj.options.zoom
        }else {
            if(currentZoom > .5){
                el.children[0].style.zoom = currentZoom - obj.options.zoom
            }
        }
      
    }

    obj.refresh = function(){
        el.children[0].innerHTML = '';
        render(0,el.children[0]);
    }

    obj.show = function(id) {
        var node = Array.prototype.slice.call(document.querySelectorAll('.jorg-tf-nc'))
        .find(node => node.getAttribute('id') == id);
        setNodeVisibility(node);
        return node;
    }

    obj.setDimensions = function(width = obj.options.width,height = obj.options.height){
        el.style.width = width + 'px';
        el.style.height = height + 'px';
    }

    var ul = document.createElement('ul');
    var zoomContainer = mountZoomNodes();
    
    obj.setDimensions();
    el.appendChild(ul);
    el.appendChild(zoomContainer);

    ul.addEventListener('wheel', zoom);

    ul.addEventListener('mousemove', function(e){
        e = event || window.event;

        var currentX = e.clientX || e.pageX;
        var currentY = e.clientY || e.pageY;

        if(e.which){
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

    el.classList.add('jorg');
    el.classList.add('jorg-tf-tree');
    el.classList.add('jorg-unselectable');
    ul.classList.add('jorg-disable-scrollbars')

    return obj;

});