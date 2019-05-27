var jApp = function(options) {
    var obj = {}

    // Find root element
    obj.el = document.querySelector('.app');
    // Backdrop
    obj.backdrop = document.createElement('div');
    obj.backdrop.classList.add('jbackdrop');

    obj.getWindowWidth = function() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x;
    }

    obj.getWindowHeight = function() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return  y;
    }

    obj.getPosition = function(e) {
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY;
        } else {
            var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }

        return [ x, y ];
    }

    obj.click = function(el) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    }

    obj.getLinkElement = function(element) {
        var targetElement = false;

        function path (element) {
            if (element.tagName == 'A' && element.getAttribute('data-href')) {
                targetElement = element;
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return targetElement;
    }

    obj.getFiles = function(element) {
        if (! element) {
            console.error('No element defined in the arguments of your method');
        }
        // Clear current data
        var inputs = element.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].remove();
        }

        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var extension = files[i].getAttribute('data-name').toLowerCase().split('.');
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][name]');
                input.value = files[i].getAttribute('data-name').toLowerCase()
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][extension]');
                input.value = extension[1];
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][size]');
                input.value = files[i].getAttribute('data-size');
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][lastmodified]');
                input.value = files[i].getAttribute('data-lastmodified');
                files[i].parentNode.appendChild(input);

                if (files[i].getAttribute('data-cover')) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'files[' + i + '][cover]');
                    input.value = 1;
                    files[i].parentNode.appendChild(input);
                }

                // File thumbs
                var content = files[i].getAttribute('data-thumbs');

                if (content) {
                    if (content.substr(0,4) == 'data') {
                        var content = files[i].getAttribute('data-thumbs').split(',');

                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][thumbs]');
                        input.value = content[1];
                        files[i].parentNode.appendChild(input);
                    } else {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][thumbs]');
                        input.value = content;
                        files[i].parentNode.appendChild(input);
                    }
                }

                // File content
                var content = files[i].getAttribute('src');

                if (content.substr(0,4) == 'data') {
                    var content = files[i].getAttribute('src').split(',');

                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'files[' + i + '][content]');
                    input.value = content[1];
                    files[i].parentNode.appendChild(input);
                } else {
                    if (files[i].classList.contains('jremove')) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][remove]');
                        input.value = 1;
                        files[i].parentNode.appendChild(input);
                    }
                }
            }
        }
    }

    obj.touchTracker = null;

    return obj;
}();

window.onpopstate = function(e) {
    if (e.state && e.state.route) {
        if (jApp.page && jApp.page.items && jApp.page.items[e.state.route]) {
            jApp.page.items[e.state.route].show(true);
        }
    }
}

document.addEventListener('keydown', function(e) {
    if (e.which == 27) {
        var nodes = document.querySelectorAll('.jmodal');
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].modal.close();
            }
        }

        var nodes = document.querySelectorAll('.jslider');
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].slider.close();
            }
        }
    }

    // Verify mask
    if (jApp.mask) {
        jApp.mask.apply(e);
    }
});

jApp.actionDownControl = function(e) {
    jApp.touchTracker = jApp.getPosition(e);
    setTimeout(function() {
        jApp.touchTracker = null;
    }, 300);
};

jApp.actionUpControl = function(e) {
    var position = jApp.getPosition(e);

    if (jApp.touchTracker && (position[0] - jApp.touchTracker[0]) > 100) {
        window.history.back();
    } else if (jApp.touchTracker && (jApp.touchTracker[0] - position[0]) > 100) {
        window.history.forward();
    } else {
        var element = null;
        if (element = jApp.getLinkElement(e.target)) {
            console.log(element);
            var link = element.getAttribute('data-href');
            if (link == 'back') {
                history.back(-1);
            } else {
                jApp.page(link);
            }
        }
    }
}

document.addEventListener('touchstart', jApp.actionDownControl);
document.addEventListener('touchend', jApp.actionUpControl);