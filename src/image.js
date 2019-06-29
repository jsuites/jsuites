jSuites.image = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        minWidth:false,
        onchange:null,
        singleFile:true,
        parser:'',
        text:{
            extensionNotAllowed:'The extension is not allowed',
            imageTooSmall:'The resolution is too low, try a image with a better resolution. width > 800px',
        }
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Upload icon
    el.classList.add('jupload');

    // Add image
    obj.addImage = function(file) {
        var img = document.createElement('img');
        img.setAttribute('data-lastmodified', file.size);
        img.setAttribute('data-name', file.name);
        img.setAttribute('data-size', file.size);
        img.setAttribute('data-thumbs', file.thumbs);
        img.setAttribute('data-cover', file.cover ? 1 : 0);
        img.setAttribute('src', file.file);
        img.className = 'jfile';
        img.style.width = '100%';

        return img;
    }

    // Add image
    obj.addImages = function(files) {
        if (obj.options.singleFile == true) {
            el.innerHTML = '';
        }

        for (var i = 0; i < files.length; i++) {
            el.appendChild(obj.addImage(files[i]));
        }
    }

    obj.addFromFile = function(file) {
        if (obj.options.singleFile == true) {
            el.innerHTML = '';
        }

        var type = file.type.split('/');
        if (type[0] == 'image') {
            var image = new FileReader();
            image.addEventListener("load", function (v) {

                var img = document.createElement('img');
                img.setAttribute('data-lastModified', file.lastModified);
                img.setAttribute('data-name', file.name);
                img.setAttribute('data-size', file.size);
                img.setAttribute('src', v.srcElement.result);
                el.appendChild(img);

                setTimeout(function() {
                    if (obj.options.minWidth && (parseInt(img.width) < parseInt(obj.options.minWidth))) {
                        img.remove();
                        alert(obj.options.text.imageTooSmall);
                    } else {
                        if (typeof(obj.options.onchange) == 'function') {
                            obj.options.onchange(img);
                        }
                    }
                }, 0);
            }, false);

            image.readAsDataURL(file);
        } else {
            alert(text.extentionNotAllowed);
        }
    }

    var attachmentInput = document.createElement('input');
    attachmentInput.type = 'file';
    attachmentInput.setAttribute('accept', 'image/*');
    attachmentInput.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    el.addEventListener("dblclick", function(e) {
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        attachmentInput.dispatchEvent(evt);
    });

    el.addEventListener('dragenter', function(e) {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();  
        e.stopPropagation();

        var data = e.dataTransfer.getData('text/html');
        if (! data) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else {
            if (obj.options.singleFile == true) {
                el.innerHTML = '';
            }

            var template = document.createElement('template');
            template.innerHTML = data.trim();
            data = template.content.firstChild;

            var img = document.createElement('img');
            img.setAttribute('data-lastModified', '');
            img.setAttribute('data-name', '');
            img.setAttribute('data-size', '');
            el.appendChild(img);

            if (data.src.substr(0,4) == 'data') {
                img.setAttribute('src', data.src);
                img.setAttribute('data-size', data.src.length);

                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(img);
                }
            } else {
                var name = data.src.split('/');
                name = name[name.length-1];
                img.setAttribute('data-name', name);

                const toDataURL = url => fetch(url)
                    .then(response => response.blob())
                    .then(blob => new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onloadend = () => resolve(reader.result);
                          reader.onerror = reject;
                          reader.readAsDataURL(blob);
                    }));

                toDataURL(obj.options.parser + data.src).then(dataUrl => {
                    img.setAttribute('src', dataUrl);
                    img.setAttribute('data-size', dataUrl.length);

                    setTimeout(function() {
                        if (parseInt(img.width) < 800) {
                            img.remove();
                            alert(obj.options.imageTooSmall);
                        } else {
                            if (typeof(obj.options.onchange) == 'function') {
                                obj.options.onchange(img);
                            }
                        }
                    }, 0);
                });
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.image = obj;

    return obj;
});