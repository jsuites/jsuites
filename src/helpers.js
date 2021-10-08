jSuites.guid = function() {
    var guid = '';
    for (var i = 0; i < 32; i++) {
        guid += Math.floor(Math.random()*0xF).toString(0xF);
    }
    return guid;
}

jSuites.getWindowWidth = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x;
}

jSuites.getWindowHeight = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return  y;
}

jSuites.getPosition = function(e) {
    if (e.changedTouches && e.changedTouches[0]) {
        var x = e.changedTouches[0].pageX;
        var y = e.changedTouches[0].pageY;
    } else {
        var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    return [ x, y ];
}

jSuites.click = function(el) {
    if (el.click) {
        el.click();
    } else {
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    }
}

jSuites.findElement = function(element, condition) {
    var foundElement = false;

    function path (element) {
        if (element && ! foundElement) {
            if (typeof(condition) == 'function') {
                foundElement = condition(element)
            } else if (typeof(condition) == 'string') {
                if (element.classList.contains(condition)) {
                    foundElement = element;
                }
            }
        }

        if (element.parentNode && ! foundElement) {
            path(element.parentNode);
        }
    }

    path(element);

    return foundElement;
}
