/**
 * (c) Image slider
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Image Slider
 */

jSuites.slider = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.currentImage = null;

    if (options) {
        obj.options = options;
    }

    // Items
    obj.options.items = [];

    if (! el.classList.contains('jslider')) {
        el.classList.add('jslider');

        // Create container
        var container = document.createElement('div');
        container.className = 'jslider-container';

        // Move children inside
        if (el.children.length > 0) {
            // Keep children items
            for (var i = 0; i < el.children.length; i++) {
                obj.options.items.push(el.children[i]);
            }
        }
        if (obj.options.items.length > 0) {
            for (var i = 0; i < obj.options.items.length; i++) {
                obj.options.items[i].classList.add('jfile');
                var index = obj.options.items[i].src.lastIndexOf('/');
                if (index < 0) {
                    obj.options.items[i].setAttribute('data-name', obj.options.items[i].src);
                } else {
                    obj.options.items[i].setAttribute('data-name', obj.options.items[i].src.substr(index + 1));
                }
                var index = obj.options.items[i].src.lastIndexOf('/');

                container.appendChild(obj.options.items[i]);
            }
        }
        el.appendChild(container);
        // Add close buttom
        var close = document.createElement('div');
        close.className = 'jslider-close';
        close.innerHTML = 'close';
        close.onclick =  function() {
            obj.close();
        }
        el.appendChild(close);
    } else {
        var container = el.querySelector('slider-container');
    }

    // Append data
    if (obj.options.data && obj.options.data.length) {
        for (var i = 0; i < obj.options.data.length; i++) {
            if (obj.options.data[i]) {
                var img = document.createElement('img');
                img.setAttribute('data-name', obj.options.data[i].name);
                img.setAttribute('data-size', obj.options.data[i].size);
                img.setAttribute('data-cover', obj.options.data[i].cover);
                img.setAttribute('data-extension', obj.options.data[i].extension);
                img.setAttribute('src', obj.options.data[i].file);
                obj.options.items.push(img);
                container.appendChild(img);
            }
        }
    }

    obj.show = function(target) {
        if (! target) {
            var target = container.children[0];
        }

        if (! container.classList.contains('jslider-preview')) {
            container.classList.add('jslider-preview');
            close.style.display = 'block';
        }

        // Hide all images
        [...container.children].forEach(function(v) {
            v.style.display = 'none';
        });

        // Show clicked only
        target.style.display = 'block';

        // Is there any previous
        if (target.previousSibling) {
            container.classList.add('jslider-left');
        } else {
            container.classList.remove('jslider-left');
        }

        // Is there any next
        if (target.nextSibling) {
            container.classList.add('jslider-right');
        } else {
            container.classList.remove('jslider-right');
        }

        obj.currentImage = target;
    }

    // Allow insert
    if (obj.options.allowAttachment) {
        var attachmentInput = document.createElement('input');
        attachmentInput.type = 'file';
        attachmentInput.className = 'slider-attachment';
        attachmentInput.setAttribute('accept', 'image/*');
        attachmentInput.style.display = 'none';
        attachmentInput.onchange = function() {
            var reader = [];

            for (var i = 0; i < this.files.length; i++) {
                var type = this.files[i].type.split('/');

                if (type[0] == 'image') {
                    var file = {
                        size: this.files[i].size,
                        name: this.files[i].name,
                        lastmodified: this.files[i].lastModified,
                    }

                    reader[i] = new FileReader();
                    reader[i].addEventListener("load", function (e) {
                        file.file = e.target.result;
                        obj.addFile(file);
                    }, false);

                    reader[i].readAsDataURL(this.files[i]);
                } else {
                    alert('The extension is not allowed');
                }
            };
        }

        var attachmentIcon = document.createElement('i');
        attachmentIcon.innerHTML = 'attachment';
        attachmentIcon.className = 'jslider-attach material-icons';
        attachmentIcon.onclick = function() {
            jSuites.click(attachmentInput);
        }

        el.appendChild(attachmentInput);
        el.appendChild(attachmentIcon);
    }

    obj.open = function() {
        obj.show();

        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function() {
        container.classList.remove('jslider-preview');
        container.classList.remove('jslider-left');
        container.classList.remove('jslider-right');

        [...container.children].forEach(function(v) {
            v.style.display = '';
        });

        close.style.display = '';

        obj.currentImage = null;

        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
    }

    obj.addFile = function(v) {
        var img = document.createElement('img');
        img.setAttribute('data-lastmodified', v.lastmodified);
        img.setAttribute('data-name', v.name);
        img.setAttribute('data-size', v.size);
        img.setAttribute('src', v.file);
        img.className = 'jfile';
        container.appendChild(img);
        obj.options.items.push(img);

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, v);
        }
    }

    obj.addFiles = function(files) {
        for (var i = 0; i < files.length; i++) {
            obj.addFile(files[i]);
        }
    }

    obj.next = function() {
        if (obj.currentImage.nextSibling) {
            obj.show(obj.currentImage.nextSibling);
        }
    }
    
    obj.prev = function() {
        if (obj.currentImage.previousSibling) {
            obj.show(obj.currentImage.previousSibling);
        }
    }

    obj.getData = function() {
        var files = jSuites.getFiles(container);

        const values = {};
        const inputs = container.children;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name) {
                values[inputs[i].name] = inputs[i].value;
            }
        }
        return values;
    }

    // Push to refresh
    var longTouchTimer = null;

    var mouseDown = function(e) {
        if (e.target.tagName == 'IMG') {
            // Remove
            var targetImage = e.target;
            longTouchTimer = setTimeout(function() {
                if (e.target.src.substr(0,4) == 'data') {
                    e.target.remove();
                } else {
                    if (e.target.classList.contains('jremove')) {
                        e.target.classList.remove('jremove');
                    } else {
                        e.target.classList.add('jremove');
                    }
                }

                // Onchange
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, e.target);
                }
            }, 1000);
        }
    }

    var mouseUp = function(e) {
        if (longTouchTimer) {
            clearTimeout(longTouchTimer);
        }

        // Open slider
        if (e.target.tagName == 'IMG') {
            if (! e.target.classList.contains('jremove')) {
                obj.show(e.target);
            }
        } else {
            // Arrow controls
            if (e.target.clientWidth - e.offsetX < 40) {
                // Show next image
                obj.next();
            } else if (e.offsetX < 40) {
                // Show previous image
                obj.prev();
            }
        }
    }

    container.addEventListener('mousedown', mouseDown);
    container.addEventListener('touchstart', mouseDown);
    container.addEventListener('mouseup', mouseUp);
    container.addEventListener('touchend', mouseUp);

    el.slider = obj;

    return obj;
});