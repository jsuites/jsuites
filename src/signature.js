jSuites.signature = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        width: '100%',
        height: '120px',
        lineWidth: 3,
        onchange: null,
        value: null,
        readonly: false,
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.style.width = obj.options.width;
    el.style.height = obj.options.height;
    el.classList.add('jsignature');

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    el.appendChild(canvas);

   // Position
    var x = null;
    var y = null;

    // Coordinates
    var coordinates = [];

    obj.setValue = function(c) {
        obj.reset();

        ctx.beginPath();
        ctx.lineWidth = obj.options.lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.moveTo(c[0][0], c[0][1]);

        for (var i = 1; i < c.length; i++) {
            ctx.lineTo(c[i][0], c[i][1]);
            ctx.stroke();
        }
    }

    obj.getValue = function() {
        return coordinates;
    }

    obj.reset = function() {
        coordinates = [];
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var setPosition = function(e) {
        // Mark position
        if (e.changedTouches && e.changedTouches[0]) {
            var rect = e.target.getBoundingClientRect();
            x = e.changedTouches[0].clientX - rect.x;
            y = e.changedTouches[0].clientY - rect.y;
        } else {
            x = e.offsetX;
            y = e.offsetY;
        }
    }

    var resize = function() {
        ctx.canvas.width = el.offsetWidth;
        ctx.canvas.height = el.offsetHeight;
    }

    var draw = function(e) {
        if (x == null || obj.options.readonly == true) {
            return false;
        } else {
            e = e || window.event;
            if (e.buttons) {
                var mouseButton = e.buttons;
            } else if (e.button) {
                var mouseButton = e.button;
            } else {
                var mouseButton = e.which;
            }

            coordinates.push([ x, y ]);

            ctx.beginPath();
            ctx.lineWidth = obj.options.lineWidth;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000';
            ctx.moveTo(x, y);
            setPosition(e);
            ctx.lineTo(x, y);
            ctx.stroke();

            e.preventDefault();
            e.stopPropagation();
        }
    }

    var finalize = function() {
        x = null;
        y = null;
    }

    window.addEventListener('resize', resize);

    if ('ontouchmove' in document.documentElement === true) {
        el.addEventListener('touchstart', setPosition);
        el.addEventListener('touchmove', draw);
        el.addEventListener('touchend', finalize);
    } else {
        el.addEventListener('mousedown', setPosition);
        el.addEventListener('mousemove', draw);
        el.addEventListener('mouseup', finalize);
    }

    resize();

    if (obj.options.value) {
        obj.setValue(obj.options.value);
    }

    el.signature = obj;

    return obj;
});