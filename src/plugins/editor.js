import Helpers from '../utils/helpers';
import Toolbar from './toolbar';
import Color from './color';
import Ajax from './ajax';

function Editor() {
    var Component = (function(el, options) {
        // New instance
        var obj = { type:'editor' };
        obj.options = {};

        // Default configuration
        var defaults = {
            // Load data from a remove location
            url: null,
            // Initial HTML content
            value: '',
            // Initial snippet
            snippet: null,
            // Add toolbar
            toolbar: true,
            toolbarOnTop: false,
            // Website parser is to read websites and images from cross domain
            remoteParser: null,
            // Placeholder
            placeholder: null,
            // Parse URL
            filterPaste: true,
            // Accept drop files
            dropZone: true,
            dropAsSnippet: false,
            acceptImages: true,
            acceptFiles: false,
            maxFileSize: 5000000,
            allowImageResize: true,
            // Style
            maxHeight: null,
            height: null,
            focus: false,
            // Events
            onclick: null,
            onfocus: null,
            onblur: null,
            onload: null,
            onkeyup: null,
            onkeydown: null,
            onchange: null,
            extensions: null
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Private controllers
        var editorTimer = null;
        var editorAction = null;
        var files = [];

        // Keep the reference for the container
        obj.el = el;

        if (typeof(obj.options.onclick) == 'function') {
            el.onclick = function(e) {
                obj.options.onclick(el, obj, e);
            }
        }

        // Prepare container
        el.classList.add('jeditor-container');

        // Snippet
        var snippet = document.createElement('div');
        snippet.className = 'jsnippet';
        snippet.setAttribute('contenteditable', false);

        // Toolbar
        var toolbar = document.createElement('div');
        toolbar.className = 'jeditor-toolbar';

        obj.editor = document.createElement('div');
        obj.editor.setAttribute('contenteditable', true);
        obj.editor.setAttribute('spellcheck', false);
        obj.editor.classList.add('jeditor');

        // Placeholder
        if (obj.options.placeholder) {
            obj.editor.setAttribute('data-placeholder', obj.options.placeholder);
        }

        // Max height
        if (obj.options.maxHeight || obj.options.height) {
            obj.editor.style.overflowY = 'auto';

            if (obj.options.maxHeight) {
                obj.editor.style.maxHeight = obj.options.maxHeight;
            }
            if (obj.options.height) {
                obj.editor.style.height = obj.options.height;
            }
        }

        // Set editor initial value
        if (obj.options.url) {
            Ajax({
                url: obj.options.url,
                dataType: 'html',
                success: function(result) {
                    obj.editor.innerHTML = result;

                    Component.setCursor(obj.editor, obj.options.focus == 'initial' ? true : false);
                }
            })
        } else {
            if (obj.options.value) {
                obj.editor.innerHTML = obj.options.value;
            } else {
                // Create from existing elements
                for (var i = 0; i < el.children.length; i++) {
                    obj.editor.appendChild(el.children[i]);
                }
            }
        }

        // Make sure element is empty
        el.innerHTML = '';

        /**
         * Onchange event controllers
         */
        var change = function(e) {
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, e);
            }

            // Update value
            obj.options.value = obj.getData();

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        /**
         * Extract images from a HTML string
         */
        var extractImageFromHtml = function(html) {
            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addImage(img[i].src);
                }
            }
        }

        /**
         * Insert node at caret
         */
        var insertNodeAtCaret = function(newNode) {
            var sel, range;

            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    var selectedText = range.toString();
                    range.deleteContents();
                    range.insertNode(newNode);
                    // move the cursor after element
                    range.setStartAfter(newNode);
                    range.setEndAfter(newNode);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }

        var updateTotalImages = function() {
            var o = null;
            if (o = snippet.children[0]) {
                // Make sure is a grid
                if (! o.classList.contains('jslider-grid')) {
                    o.classList.add('jslider-grid');
                }
                // Quantify of images
                var number = o.children.length;
                // Set the configuration of the grid
                o.setAttribute('data-number', number > 4 ? 4 : number);
                // Total of images inside the grid
                if (number > 4) {
                    o.setAttribute('data-total', number - 4);
                } else {
                    o.removeAttribute('data-total');
                }
            }
        }

        /**
         * Append image to the snippet
         */
        var appendImage = function(image) {
            if (! snippet.innerHTML) {
                obj.appendSnippet({});
            }
            snippet.children[0].appendChild(image);
            updateTotalImages();
        }

        /**
         * Append snippet
         * @Param object data
         */
        obj.appendSnippet = function(data) {
            // Reset snippet
            snippet.innerHTML = '';

            // Attributes
            var a = [ 'image', 'title', 'description', 'host', 'url' ];

            for (var i = 0; i < a.length; i++) {
                var div = document.createElement('div');
                div.className = 'jsnippet-' + a[i];
                div.setAttribute('data-k', a[i]);
                snippet.appendChild(div);
                if (data[a[i]]) {
                    if (a[i] == 'image') {
                        if (! Array.isArray(data.image)) {
                            data.image = [ data.image ];
                        }
                        for (var j = 0; j < data.image.length; j++) {
                            var img = document.createElement('img');
                            img.src = data.image[j];
                            div.appendChild(img);
                        }
                    } else {
                        div.innerHTML = data[a[i]];
                    }
                }
            }

            obj.editor.appendChild(document.createElement('br'));
            obj.editor.appendChild(snippet);
        }

        /**
         * Set editor value
         */
        obj.setData = function(o) {
            if (typeof(o) == 'object') {
                obj.editor.innerHTML = o.content;
            } else {
                obj.editor.innerHTML = o;
            }

            if (obj.options.focus) {
                Component.setCursor(obj.editor, true);
            }

            // Reset files container
            files = [];
        }

        obj.getFiles = function() {
            var f = obj.editor.querySelectorAll('.jfile');
            var d = [];
            for (var i = 0; i < f.length; i++) {
                if (files[f[i].src]) {
                    d.push(files[f[i].src]);
                }
            }
            return d;
        }

        obj.getText = function() {
            return obj.editor.innerText;
        }

        /**
         * Get editor data
         */
        obj.getData = function(json) {
            if (! json) {
                var data = obj.editor.innerHTML;
            } else {
                var data = {
                    content : '',
                }

                // Get snippet
                if (snippet.innerHTML) {
                    var index = 0;
                    data.snippet = {};
                    for (var i = 0; i < snippet.children.length; i++) {
                        // Get key from element
                        var key = snippet.children[i].getAttribute('data-k');
                        if (key) {
                            if (key == 'image') {
                                if (! data.snippet.image) {
                                    data.snippet.image = [];
                                }
                                // Get all images
                                for (var j = 0; j < snippet.children[i].children.length; j++) {
                                    data.snippet.image.push(snippet.children[i].children[j].getAttribute('src'))
                                }
                            } else {
                                data.snippet[key] = snippet.children[i].innerHTML;
                            }
                        }
                    }
                }

                // Get files
                var f = Object.keys(files);
                if (f.length) {
                    data.files = [];
                    for (var i = 0; i < f.length; i++) {
                        data.files.push(files[f[i]]);
                    }
                }

                // Get content
                var d = document.createElement('div');
                d.innerHTML = obj.editor.innerHTML;
                var s = d.querySelector('.jsnippet');
                if (s) {
                    s.remove();
                }

                var text = d.innerHTML;
                text = text.replace(/<br>/g, "\n");
                text = text.replace(/<\/div>/g, "<\/div>\n");
                text = text.replace(/<(?:.|\n)*?>/gm, "");
                data.content = text.trim();

                // Process extensions
                processExtensions('getData', data);
            }

            return data;
        }

        // Reset
        obj.reset = function() {
            obj.editor.innerHTML = '';
            snippet.innerHTML = '';
            files = [];
        }

        obj.addPdf = function(data) {
            if (data.result.substr(0,4) != 'data') {
                console.error('Invalid source');
            } else {
                var canvas = document.createElement('canvas');
                canvas.width = 60;
                canvas.height = 60;

                var img = new Image();
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    var newImage = document.createElement('img');
                    newImage.src = window.URL.createObjectURL(blob);
                    newImage.title = data.name;
                    newImage.className = 'jfile pdf';

                    files[newImage.src] = {
                        file: newImage.src,
                        extension: 'pdf',
                        content: data.result,
                    }

                    //insertNodeAtCaret(newImage);
                    document.execCommand('insertHtml', false, newImage.outerHTML);
                });
            }
        }

        obj.addImage = function(src, asSnippet) {
            if (! src) {
                src = '';
            }

            if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
                console.error('remoteParser not defined in your initialization');
            } else {
                // This is to process cross domain images
                if (src.substr(0,4) == 'data') {
                    var extension = src.split(';')
                    extension = extension[0].split('/');
                    extension = extension[1];
                } else {
                    var extension = src.substr(src.lastIndexOf('.') + 1);
                    // Work for cross browsers
                    src = obj.options.remoteParser + src;
                }

                var img = new Image();

                img.onload = function onload() {
                    var canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob(function(blob) {
                        var newImage = document.createElement('img');
                        newImage.src = window.URL.createObjectURL(blob);
                        newImage.classList.add('jfile');
                        newImage.setAttribute('tabindex', '900');
                        newImage.setAttribute('width', img.width);
                        newImage.setAttribute('height', img.height);
                        files[newImage.src] = {
                            file: newImage.src,
                            extension: extension,
                            content: canvas.toDataURL(),
                        }

                        if (obj.options.dropAsSnippet || asSnippet) {
                            appendImage(newImage);
                            // Just to understand the attachment is part of a snippet
                            files[newImage.src].snippet = true;
                        } else {
                            //insertNodeAtCaret(newImage);
                            document.execCommand('insertHtml', false, newImage.outerHTML);
                        }

                        change();
                    });
                };

                img.src = src;
            }
        }

        obj.addFile = function(files) {
            var reader = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].size > obj.options.maxFileSize) {
                    alert('The file is too big');
                } else {
                    // Only PDF or Images
                    var type = files[i].type.split('/');

                    if (type[0] == 'image') {
                        type = 1;
                    } else if (type[1] == 'pdf') {
                        type = 2;
                    } else {
                        type = 0;
                    }

                    if (type) {
                        // Create file
                        reader[i] = new FileReader();
                        reader[i].index = i;
                        reader[i].type = type;
                        reader[i].name = files[i].name;
                        reader[i].date = files[i].lastModified;
                        reader[i].size = files[i].size;
                        reader[i].addEventListener("load", function (data) {
                            // Get result
                            if (data.target.type == 2) {
                                if (obj.options.acceptFiles == true) {
                                    obj.addPdf(data.target);
                                }
                            } else {
                                obj.addImage(data.target.result);
                            }
                        }, false);

                        reader[i].readAsDataURL(files[i])
                    } else {
                        alert('The extension is not allowed');
                    }
                }
            }
        }

        // Destroy
        obj.destroy = function() {
            obj.editor.removeEventListener('mouseup', editorMouseUp);
            obj.editor.removeEventListener('mousedown', editorMouseDown);
            obj.editor.removeEventListener('mousemove', editorMouseMove);
            obj.editor.removeEventListener('keyup', editorKeyUp);
            obj.editor.removeEventListener('keydown', editorKeyDown);
            obj.editor.removeEventListener('dragstart', editorDragStart);
            obj.editor.removeEventListener('dragenter', editorDragEnter);
            obj.editor.removeEventListener('dragover', editorDragOver);
            obj.editor.removeEventListener('drop', editorDrop);
            obj.editor.removeEventListener('paste', editorPaste);
            obj.editor.removeEventListener('blur', editorBlur);
            obj.editor.removeEventListener('focus', editorFocus);

            el.editor = null;
            el.classList.remove('jeditor-container');

            toolbar.remove();
            snippet.remove();
            obj.editor.remove();
        }

        obj.upload = function() {
            Helpers.click(obj.file);
        }

        // Elements to be removed
        var remove = [
            HTMLUnknownElement,
            HTMLAudioElement,
            HTMLEmbedElement,
            HTMLIFrameElement,
            HTMLTextAreaElement,
            HTMLInputElement,
            HTMLScriptElement
        ];

        // Valid properties
        var validProperty = ['width', 'height', 'align', 'border', 'src', 'tabindex'];

        // Valid CSS attributes
        var validStyle = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin'];

        var parse = function(element) {
           // Remove attributes
           if (element.attributes && element.attributes.length) {
               var image = null;
               var style = null;
               // Process style attribute
               var elementStyle = element.getAttribute('style');
               if (elementStyle) {
                   style = [];
                   var t = elementStyle.split(';');
                   for (var j = 0; j < t.length; j++) {
                       var v = t[j].trim().split(':');
                       if (validStyle.indexOf(v[0].trim()) >= 0) {
                           var k = v.shift();
                           var v = v.join(':');
                           style.push(k + ':' + v);
                       }
                   }
               }
               // Process image
               if (element.tagName.toUpperCase() == 'IMG') {
                   if (! obj.options.acceptImages || ! element.src) {
                       element.parentNode.removeChild(element);
                   } else {
                       // Check if is data
                       element.setAttribute('tabindex', '900');
                       // Check attributes for persistance
                       obj.addImage(element.src);
                   }
               }
               // Remove attributes
               var attr = [];
               var numAttributes = element.attributes.length - 1;
               if (numAttributes > 0) {
                   for (var i = numAttributes; i >= 0 ; i--) {
                       attr.push(element.attributes[i].name);
                   }
                   attr.forEach(function(v) {
                       if (validProperty.indexOf(v) == -1) {
                           element.removeAttribute(v);
                       }
                   });
               }
               element.style = '';
               // Add valid style
               if (style && style.length) {
                   element.setAttribute('style', style.join(';'));
               }
           }
           // Parse children
           if (element.children.length) {
               for (var i = 0; i < element.children.length; i++) {
                   parse(element.children[i]);
               }
           }

           if (remove.indexOf(element.constructor) >= 0) {
               element.remove();
           }
        }

        var select = function(e) {
            var s = window.getSelection()
            var r = document.createRange();
            r.selectNode(e);
            s.addRange(r)
        }

        var filter = function(data) {
            if (data) {
                data = data.replace(new RegExp('<!--(.*?)-->', 'gsi'), '');
            }
            var parser = new DOMParser();
            var d = parser.parseFromString(data, "text/html");
            parse(d);
            var span = document.createElement('span');
            span.innerHTML = d.firstChild.innerHTML;
            return span;
        }

        var editorPaste = function(e) {
            if (obj.options.filterPaste == true) {
                if (e.clipboardData || e.originalEvent.clipboardData) {
                    var html = (e.originalEvent || e).clipboardData.getData('text/html');
                    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                    var file = (e.originalEvent || e).clipboardData.files
                } else if (window.clipboardData) {
                    var html = window.clipboardData.getData('Html');
                    var text = window.clipboardData.getData('Text');
                    var file = window.clipboardData.files
                }

                if (file.length) {
                    // Paste a image from the clipboard
                    obj.addFile(file);
                } else {
                    if (! html) {
                        html = text.split('\r\n');
                        if (! e.target.innerText) {
                            html.map(function(v) {
                                var d = document.createElement('div');
                                d.innerText = v;
                                obj.editor.appendChild(d);
                            });
                        } else {
                            html = html.map(function(v) {
                                return '<div>' + v + '</div>';
                            });
                            document.execCommand('insertHtml', false, html.join(''));
                        }
                    } else {
                        var d = filter(html);
                        // Paste to the editor
                        //insertNodeAtCaret(d);
                        document.execCommand('insertHtml', false, d.innerHTML);
                    }
                }

                e.preventDefault();
            }
        }

        var editorDragStart = function(e) {
            if (editorAction && editorAction.e) {
                e.preventDefault();
            }
        }

        var editorDragEnter = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                el.classList.add('jeditor-dragging');
                e.preventDefault();
            }
        }

        var editorDragOver = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                if (editorTimer) {
                    clearTimeout(editorTimer);
                }

                editorTimer = setTimeout(function() {
                    el.classList.remove('jeditor-dragging');
                }, 100);
                e.preventDefault();
            }
        }

        var editorDrop = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                // Position caret on the drop
                var range = null;
                if (document.caretRangeFromPoint) {
                    range=document.caretRangeFromPoint(e.clientX, e.clientY);
                } else if (e.rangeParent) {
                    range=document.createRange();
                    range.setStart(e.rangeParent,e.rangeOffset);
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                sel.anchorNode.parentNode.focus();

                var html = (e.originalEvent || e).dataTransfer.getData('text/html');
                var text = (e.originalEvent || e).dataTransfer.getData('text/plain');
                var file = (e.originalEvent || e).dataTransfer.files;

                if (file.length) {
                    obj.addFile(file);
                } else if (text) {
                    extractImageFromHtml(html);
                }

                el.classList.remove('jeditor-dragging');
                e.preventDefault();
            }
        }

        var editorBlur = function(e) {
            // Process extensions
            processExtensions('onevent', e);
            // Apply changes
            change(e);
            // Blur
            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el, obj, e);
            }
        }

        var editorFocus = function(e) {
            // Focus
            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el, obj, e);
            }
        }

        var editorKeyUp = function(e) {
            if (! obj.editor.innerHTML) {
                obj.editor.innerHTML = '<div><br></div>';
            }
            if (typeof(obj.options.onkeyup) == 'function') {
                obj.options.onkeyup(el, obj, e);
            }
        }

        var editorKeyDown = function(e) {
            // Process extensions
            processExtensions('onevent', e);

            if (e.key == 'Delete') {
                if (e.target.tagName == 'IMG') {
                    var parent = e.target.parentNode;
                    select(e.target);
                    if (parent.classList.contains('jsnippet-image')) {
                        updateTotalImages();
                    }
                }
            }

            if (typeof(obj.options.onkeydown) == 'function') {
                obj.options.onkeydown(el, obj, e);
            }
        }

        var editorMouseUp = function(e) {
            if (editorAction && editorAction.e) {
                editorAction.e.classList.remove('resizing');

                if (editorAction.e.changed == true) {
                    var image = editorAction.e.cloneNode()
                    image.width = parseInt(editorAction.e.style.width) || editorAction.e.getAttribute('width');
                    image.height = parseInt(editorAction.e.style.height) || editorAction.e.getAttribute('height');
                    editorAction.e.style.width = '';
                    editorAction.e.style.height = '';
                    select(editorAction.e);
                    document.execCommand('insertHtml', false, image.outerHTML);
                }
            }

            editorAction = false;
        }

        var editorMouseDown = function(e) {
            var close = function(snippet) {
                var rect = snippet.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 40 && e.clientY - rect.top < 40) {
                    snippet.innerHTML = '';
                    snippet.remove();
                }
            }

            if (e.target.tagName == 'IMG') {
                if (e.target.style.cursor) {
                    var rect = e.target.getBoundingClientRect();
                    editorAction = {
                        e: e.target,
                        x: e.clientX,
                        y: e.clientY,
                        w: rect.width,
                        h: rect.height,
                        d: e.target.style.cursor,
                    }

                    if (! e.target.getAttribute('width')) {
                        e.target.setAttribute('width', rect.width)
                    }

                    if (! e.target.getAttribute('height')) {
                        e.target.setAttribute('height', rect.height)
                    }

                    var s = window.getSelection();
                    if (s.rangeCount) {
                        for (var i = 0; i < s.rangeCount; i++) {
                            s.removeRange(s.getRangeAt(i));
                        }
                    }

                    e.target.classList.add('resizing');
                } else {
                    editorAction = true;
                }
            } else {
                if (e.target.classList.contains('jsnippet')) {
                    close(e.target);
                } else if (e.target.parentNode.classList.contains('jsnippet')) {
                    close(e.target.parentNode);
                }

                editorAction = true;
            }
        }

        var editorMouseMove = function(e) {
            if (e.target.tagName == 'IMG' && ! e.target.parentNode.classList.contains('jsnippet-image') && obj.options.allowImageResize == true) {
                if (e.target.getAttribute('tabindex')) {
                    var rect = e.target.getBoundingClientRect();
                    if (e.clientY - rect.top < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'nw-resize';
                        } else {
                            e.target.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'sw-resize';
                        } else {
                            e.target.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'w-resize';
                    } else {
                        e.target.style.cursor = '';
                    }
                }
            }

            // Move
            if (e.which == 1 && editorAction && editorAction.d) {
                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'se-resize') {
                    editorAction.e.style.width = (editorAction.w + (e.clientX - editorAction.x));

                    if (e.shiftKey) {
                        var newHeight = (e.clientX - editorAction.x) * (editorAction.h / editorAction.w);
                        editorAction.e.style.height = editorAction.h + newHeight;
                    } else {
                        var newHeight =  null;
                    }
                }

                if (! newHeight) {
                    if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                        if (! e.shiftKey) {
                            editorAction.e.style.height = editorAction.h + (e.clientY - editorAction.y);
                        }
                    }
                }

                editorAction.e.changed = true;
            }
        }

        var processExtensions = function(method, data) {
            if (obj.options.extensions) {
                var ext = Object.keys(obj.options.extensions);
                if (ext.length) {
                    for (var i = 0; i < ext.length; i++)
                        if (obj.options.extensions[ext[i]] && typeof(obj.options.extensions[ext[i]][method]) == 'function') {
                            obj.options.extensions[ext[i]][method].call(obj, data);
                        }
                }
            }
        }

        var loadExtensions = function() {
            if (obj.options.extensions) {
                var ext = Object.keys(obj.options.extensions);
                if (ext.length) {
                    for (var i = 0; i < ext.length; i++) {
                        if (obj.options.extensions[ext[i]] && typeof (obj.options.extensions[ext[i]]) == 'function') {
                            obj.options.extensions[ext[i]] = obj.options.extensions[ext[i]](el, obj);
                        }
                    }
                }
            }
        }

        document.addEventListener('mouseup', editorMouseUp);
        document.addEventListener('mousemove', editorMouseMove);
        obj.editor.addEventListener('mousedown', editorMouseDown);
        obj.editor.addEventListener('keyup', editorKeyUp);
        obj.editor.addEventListener('keydown', editorKeyDown);
        obj.editor.addEventListener('dragstart', editorDragStart);
        obj.editor.addEventListener('dragenter', editorDragEnter);
        obj.editor.addEventListener('dragover', editorDragOver);
        obj.editor.addEventListener('drop', editorDrop);
        obj.editor.addEventListener('paste', editorPaste);
        obj.editor.addEventListener('focus', editorFocus);
        obj.editor.addEventListener('blur', editorBlur);

        // Append editor to the container
        el.appendChild(obj.editor);
        // Snippet
        if (obj.options.snippet) {
            obj.appendSnippet(obj.options.snippet);
        }

        // Add toolbar
        if (obj.options.toolbar) {
            // Default toolbar configuration
            if (Array.isArray(obj.options.toolbar)) {
                var toolbarOptions = {
                    container: true,
                    responsive: true,
                    items: obj.options.toolbar
                }
            } else if (obj.options.toolbar === true) {
                var toolbarOptions = {
                    container: true,
                    responsive: true,
                    items: [],
                }
            } else {
                var toolbarOptions = obj.options.toolbar;
            }

            // Default items
            if (! (toolbarOptions.items && toolbarOptions.items.length)) {
                toolbarOptions.items = Component.getDefaultToolbar(obj);
            }

            if (obj.options.toolbarOnTop) {
                // Add class
                el.classList.add('toolbar-on-top');
                // Append to the DOM
                el.insertBefore(toolbar, el.firstChild);
            } else {
                // Add padding to the editor
                obj.editor.style.padding = '15px';
                // Append to the DOM
                el.appendChild(toolbar);
            }

            // Create toolbar
            Toolbar(toolbar, toolbarOptions);

            toolbar.addEventListener('click', function() {
                obj.editor.focus();
            })
        }

        // Upload file
        obj.file = document.createElement('input');
        obj.file.style.display = 'none';
        obj.file.type = 'file';
        obj.file.setAttribute('accept', 'image/*');
        obj.file.onchange = function() {
            obj.addFile(this.files);
        }
        el.appendChild(obj.file);

        // Focus to the editor
        if (obj.editor.innerHTML && obj.options.focus) {
            Component.setCursor(obj.editor, obj.options.focus == 'initial' ? true : false);
        }

        // Change method
        el.change = obj.setData;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                // Data type
                var o = el.getAttribute('data-html') === 'true' ? false : true;
                return obj.getData(o);
            } else {
                obj.setData(val);
            }
        }

        loadExtensions();

        el.editor = obj;

        // Onload
        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj, obj.editor);
        }

        return obj;
    });

    Component.setCursor = function(element, first) {
        element.focus();
        document.execCommand('selectAll');
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        if (first == true) {
            var node = range.startContainer;
            var size = 0;
        } else {
            var node = range.endContainer;
            var size = node.length;
        }
        range.setStart(node, size);
        range.setEnd(node, size);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    Component.getDefaultToolbar = function(obj) {

        var color = function(a,b,c) {
            if (! c.color) {
                var t = null;
                var colorPicker = Color(c, {
                    onchange: function(o, v) {
                        if (c.k === 'color') {
                            document.execCommand('foreColor', false, v);
                        } else {
                            document.execCommand('backColor', false, v);
                        }
                    }
                });
                c.color.open();
            }
        }

        var items = [];

        items.push({
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        });

        items.push({
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        });

        items.push({
            type: 'divisor'
        });

        if (obj.options.toolbarOnTop) {
            items.push({
                type: 'select',
                width: '140px',
                options: ['Default', 'Verdana', 'Arial', 'Courier New'],
                render: function (e) {
                    return '<span style="font-family:' + e + '">' + e + '</span>';
                },
                onchange: function (a,b,c,d,e) {
                    document.execCommand("fontName", false, d);
                }
            });

            items.push({
                type: 'select',
                content: 'format_size',
                options: ['x-small', 'small', 'medium', 'large', 'x-large'],
                render: function (e) {
                    return '<span style="font-size:' + e + '">' + e + '</span>';
                },
                onchange: function (a,b,c,d,e) {
                    //var html = `<span style="font-size: ${c}">${text}</span>`;
                    //document.execCommand('insertHtml', false, html);
                    document.execCommand("fontSize", false, parseInt(e)+1);
                    //var f = window.getSelection().anchorNode.parentNode
                    //f.removeAttribute("size");
                    //f.style.fontSize = d;
                }
            });

            items.push({
                type: 'select',
                options: ['format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify'],
                render: function (e) {
                    return '<i class="material-icons">' + e + '</i>';
                },
                onchange: function (a,b,c,d,e) {
                    var options = ['JustifyLeft','justifyCenter','justifyRight','justifyFull'];
                    document.execCommand(options[e]);
                }
            });

            items.push({
                type: 'divisor'
            });

            items.push({
                content: 'format_color_text',
                k: 'color',
                onclick: color,
            });

            items.push({
                content: 'format_color_fill',
                k: 'background-color',
                onclick: color,
            });
        }

        items.push({
            content: 'format_bold',
            onclick: function(a,b,c) {
                document.execCommand('bold');

                if (document.queryCommandState("bold")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_italic',
            onclick: function(a,b,c) {
                document.execCommand('italic');

                if (document.queryCommandState("italic")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_underline',
            onclick: function(a,b,c) {
                document.execCommand('underline');

                if (document.queryCommandState("underline")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            type:'divisor'
        });

        items.push({
            content: 'format_list_bulleted',
            onclick: function(a,b,c) {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_list_numbered',
            onclick: function(a,b,c) {
                document.execCommand('insertOrderedList');

                if (document.queryCommandState("insertOrderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_indent_increase',
            onclick: function(a,b,c) {
                document.execCommand('indent', true, null);

                if (document.queryCommandState("indent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_indent_decrease',
            onclick: function() {
                document.execCommand('outdent');

                if (document.queryCommandState("outdent")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        });

        if (obj.options.toolbarOnTop) {
            items.push({
                type: 'divisor'
            });

            items.push({
                content: 'photo',
                onclick: function () {
                    obj.upload();
                }
            });

            items.push({
                type: 'select',
                content: 'table_view',
                columns: 10,
                right: true,
                options: [
                    '0x0', '1x0', '2x0', '3x0', '4x0', '5x0', '6x0', '7x0', '8x0', '9x0',
                    '0x1', '1x1', '2x1', '3x1', '4x1', '5x1', '6x1', '7x1', '8x1', '9x1',
                    '0x2', '1x2', '2x2', '3x2', '4x2', '5x2', '6x2', '7x2', '8x2', '9x2',
                    '0x3', '1x3', '2x3', '3x3', '4x3', '5x3', '6x3', '7x3', '8x3', '9x3',
                    '0x4', '1x4', '2x4', '3x4', '4x4', '5x4', '6x4', '7x4', '8x4', '9x4',
                    '0x5', '1x5', '2x5', '3x5', '4x5', '5x5', '6x5', '7x5', '8x5', '9x5',
                    '0x6', '1x6', '2x6', '3x6', '4x6', '5x6', '6x6', '7x6', '8x6', '9x6',
                    '0x7', '1x7', '2x7', '3x7', '4x7', '5x7', '6x7', '7x7', '8x7', '9x7',
                    '0x8', '1x8', '2x8', '3x8', '4x8', '5x8', '6x8', '7x8', '8x8', '9x8',
                    '0x9', '1x9', '2x9', '3x9', '4x9', '5x9', '6x9', '7x9', '8x9', '9x9',
                ],
                render: function (e, item) {
                    if (item) {
                        item.onmouseover = this.onmouseover;
                        e = e.split('x');
                        item.setAttribute('data-x', e[0]);
                        item.setAttribute('data-y', e[1]);
                    }
                    var element = document.createElement('div');
                    item.style.margin = '1px';
                    item.style.border = '1px solid #ddd';
                    return element;
                },
                onmouseover: function (e) {
                    var x = parseInt(e.target.getAttribute('data-x'));
                    var y = parseInt(e.target.getAttribute('data-y'));
                    for (var i = 0; i < e.target.parentNode.children.length; i++) {
                        var element = e.target.parentNode.children[i];
                        var ex = parseInt(element.getAttribute('data-x'));
                        var ey = parseInt(element.getAttribute('data-y'));
                        if (ex <= x && ey <= y) {
                            element.style.backgroundColor = '#cae1fc';
                            element.style.borderColor = '#2977ff';
                        } else {
                            element.style.backgroundColor = '';
                            element.style.borderColor = '#ddd';
                        }
                    }
                },
                onchange: function (a, b, c) {
                    c = c.split('x');
                    var table = document.createElement('table');
                    var tbody = document.createElement('tbody');
                    for (var y = 0; y <= c[1]; y++) {
                        var tr = document.createElement('tr');
                        for (var x = 0; x <= c[0]; x++) {
                            var td = document.createElement('td');
                            td.innerHTML = '';
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody);
                    table.setAttribute('width', '100%');
                    table.setAttribute('cellpadding', '6');
                    table.setAttribute('cellspacing', '0');
                    document.execCommand('insertHTML', false, table.outerHTML);
                }
            });
        }

        return items;
    }

    return Component;
}

export default Editor();