import Ajax from './ajax';
import Helpers from '../utils/helpers';
import Dictionary from '../utils/dictionary';

export default function Upload(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        type: 'image',
        extension: '*',
        input: false,
        minWidth: false,
        maxWidth: null,
        maxHeight: null,
        maxJpegSizeBytes: null, // For example, 350Kb would be 350000
        onchange: null,
        multiple: false,
        remoteParser: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Multiple
    if (obj.options.multiple == true) {
        el.setAttribute('data-multiple', true);
    }

    // Container
    el.content = [];

    // Upload icon
    el.classList.add('jupload');

    if (obj.options.input == true) {
        el.classList.add('input');
    }

    obj.add = function(data) {
        // Reset container for single files
        if (obj.options.multiple == false) {
            el.content = [];
            el.innerText = '';
        }

        // Append to the element
        if (obj.options.type == 'image') {
            var img = document.createElement('img');
            img.setAttribute('src', data.file);
            img.setAttribute('tabindex', -1);
            if (! el.getAttribute('name')) {
                img.className = 'jfile';
                img.content = data;
            }
            el.appendChild(img);
        } else {
            if (data.name) {
                var name = data.name;
            } else {
                var name = data.file;
            }
            var div = document.createElement('div');
            div.innerText = name || obj.options.type;
            div.classList.add('jupload-item');
            div.setAttribute('tabindex', -1);
            el.appendChild(div);
        }

        if (data.content) {
            data.file = Helpers.guid();
        }

        // Push content
        el.content.push(data);

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, data);
        }
    }

    obj.addFromFile = function(file) {
        var type = file.type.split('/');
        if (type[0] == obj.options.type) {
            var readFile = new FileReader();
            readFile.addEventListener("load", function (v) {
                var data = {
                    file: v.srcElement.result,
                    extension: file.name.substr(file.name.lastIndexOf('.') + 1),
                    name: file.name,
                    size: file.size,
                    lastmodified: file.lastModified,
                    content: v.srcElement.result,
                }

                obj.add(data);
            });

            readFile.readAsDataURL(file);
        } else {
            alert(Dictionary.translate('This extension is not allowed'));
        }
    }

    obj.addFromUrl = function(src) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                var type = extension[0].replace('data:','');
                if (type == obj.options.type) {
                    var data = {
                        file: src,
                        name: '',
                        extension: extension[1],
                        content: src,
                    }
                    obj.add(data);
                } else {
                    alert(obj.options.text.extensionNotAllowed);
                }
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
                // Get remove content
                Ajax({
                    url: src,
                    type: 'GET',
                    dataType: 'blob',
                    success: function(data) {
                        //add(extension[0].replace('data:',''), data);
                    }
                })
            }
        }
    }

    var getDataURL = function(canvas, type) {
        var compression = 0.92;
        var lastContentLength = null;
        var content = canvas.toDataURL(type, compression);
        while (obj.options.maxJpegSizeBytes && type === 'image/jpeg' &&
               content.length > obj.options.maxJpegSizeBytes && content.length !== lastContentLength) {
            // Apply the compression
            compression *= 0.9;
            lastContentLength = content.length;
            content = canvas.toDataURL(type, compression);
        }
        return content;
    }

    var mime = obj.options.type + '/' + obj.options.extension;
    var input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('accept', mime);
    input.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    // Allow multiple files
    if (obj.options.multiple == true) {
        input.setAttribute('multiple', true);
    }

    var current = null;

    el.addEventListener("click", function(e) {
        current = null;
        if (! el.children.length || e.target === el) {
            Helpers.click(input);
        } else {
            if (e.target.parentNode == el) {
                current = e.target;
            }
        }
    });

    el.addEventListener("dblclick", function(e) {
        Helpers.click(input);
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

    el.addEventListener('keydown', function(e) {
        if (current && e.which == 46) {
            var index = Array.prototype.indexOf.call(el.children, current);
            if (index >= 0) {
                el.content.splice(index, 1);
                current.remove();
                current = null;
            }
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (file.length) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else if (html) {
            if (obj.options.multiple == false) {
                el.innerText = '';
            }

            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addFromUrl(img[i].src);
                }
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.val = function(val) {
        if (val === undefined) {
            return el.content && el.content.length ? el.content : null;
        } else {
            // Reset
            el.innerText = '';
            el.content = [];

            if (val) {
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (typeof(val[i]) == 'string') {
                            obj.add({ file: val[i] });
                        } else {
                            obj.add(val[i]);
                        }
                    }
                } else if (typeof(val) == 'string') {
                    obj.add({ file: val });
                }
            }
        }
    }

    el.upload = el.image = obj;

    return obj;
}
