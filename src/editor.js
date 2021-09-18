jSuites.editor = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        // Initial HTML content
        value: null,
        // Initial snippet
        snippet: null,
        // Add toolbar
        toolbar: null,
        // Website parser is to read websites and images from cross domain
        remoteParser: null,
        // Placeholder
        placeholder: null,
        // Parse URL
        parseURL: false,
        filterPaste: true,
        // Accept drop files
        dropZone: false,
        dropAsSnippet: false,
        acceptImages: false,
        acceptFiles: false,
        maxFileSize: 5000000,
        allowImageResize: true,
        // Style
        border: true,
        padding: true,
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
    var imageResize = 0;
    var editorTimer = null;
    var editorAction = null;
    var files = [];

    // Make sure element is empty
    el.innerHTML = '';

    // Keep the reference for the container
    obj.el = el;

    if (typeof(obj.options.onclick) == 'function') {
        el.onclick = function(e) {
            obj.options.onclick(el, obj, e);
        }
    }

    // Prepare container
    el.classList.add('jeditor-container');

    // Padding
    if (obj.options.padding == true) {
        el.classList.add('jeditor-padding');
    }

    // Border
    if (obj.options.border == false) {
        el.style.border = '0px';
    }

    // Snippet
    var snippet = document.createElement('div');
    snippet.className = 'jsnippet';
    snippet.setAttribute('contenteditable', false);

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.className = 'jeditor-toolbar';

    // Create editor
    var editor = document.createElement('div');
    editor.setAttribute('contenteditable', true);
    editor.setAttribute('spellcheck', false);
    editor.className = 'jeditor';

    // Placeholder
    if (obj.options.placeholder) {
        editor.setAttribute('data-placeholder', obj.options.placeholder);
    }

    // Max height
    if (obj.options.maxHeight || obj.options.height) {
        editor.style.overflowY = 'auto';

        if (obj.options.maxHeight) {
            editor.style.maxHeight = obj.options.maxHeight;
        }
        if (obj.options.height) {
            editor.style.height = obj.options.height;
        }
    }

    // Set editor initial value
    if (obj.options.value) {
        var value = obj.options.value;
    } else {
        var value = el.innerHTML ? el.innerHTML : ''; 
    }

    if (! value) {
        var value = '';
    }

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
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
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
            appendElement({});
        }
        snippet.children[0].appendChild(image);
        updateTotalImages();
    }

    /**
     * Append snippet
     * @Param object data
     */
    var appendElement = function(data) {
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

        editor.appendChild(document.createElement('br'));
        editor.appendChild(snippet);
    }

    var verifyEditor = function() {
        clearTimeout(editorTimer);
        editorTimer = setTimeout(function() {
            var snippet = editor.querySelector('.jsnippet');
            if (! snippet) {
                var html = editor.innerHTML.replace(/\n/g, ' ');
                var container = document.createElement('div');
                container.innerHTML = html;
                var text = container.innerText; 
                var url = jSuites.editor.detectUrl(text);

                if (url) {
                    if (url[0].substr(-3) == 'jpg' || url[0].substr(-3) == 'png' || url[0].substr(-3) == 'gif') {
                         obj.addImage(url[0], true);
                    } else {
                        var id = jSuites.editor.youtubeParser(url[0]);
                        obj.parseWebsite(url[0], id);
                    }
                }
            }
        }, 1000);
    }

    obj.parseContent = function() {
        verifyEditor();
    }

    obj.parseWebsite = function(url, youtubeId) {
        if (! obj.options.remoteParser) {
            console.log('The remoteParser is not defined');
        } else {
            // Youtube definitions
            if (youtubeId) {
                var url = 'https://www.youtube.com/watch?v=' + youtubeId;
            }

            var p = {
                title: '',
                description: '',
                image: '',
                host: url.split('/')[2],
                url: url,
            }

            jSuites.ajax({
                url: obj.options.remoteParser + encodeURI(url.trim()),
                method: 'GET',
                dataType: 'json',
                success: function(result) {
                    // Get title
                    if (result.title) {
                        p.title = result.title;
                    }
                    // Description
                    if (result.description) {
                        p.description = result.description;
                    }
                    // Host
                    if (result.host) {
                        p.host = result.host;
                    }
                    // Url
                    if (result.url) {
                        p.url = result.url;
                    }
                    // Append snippet
                    appendElement(p);
                    // Add image
                    if (result.image) {
                        obj.addImage(result.image, true);
                    } else if (result['og:image']) {
                        obj.addImage(result['og:image'], true);
                    }
                }
            });
        }
    }

    /**
     * Set editor value
     */
    obj.setData = function(html) {
        editor.innerHTML = html;

        if (obj.options.focus) {
            jSuites.editor.setCursor(editor, true);
        }

        // Reset files container
        files = [];
    }

    obj.getFiles = function() {
        var f = editor.querySelectorAll('.jfile');
        var d = [];
        for (var i = 0; i < f.length; i++) {
            if (files[f[i].src]) {
                d.push(files[f[i].src]);
            }
        }
        return d;
    }

    obj.getText = function() {
        return editor.innerText;
    }

    /**
     * Get editor data
     */
    obj.getData = function(json) {
        if (! json) {
            var data = editor.innerHTML;
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
            var text = editor.innerHTML;
            text = text.replace(/<br>/g, "\n");
            text = text.replace(/<\/div>/g, "<\/div>\n");
            text = text.replace(/<(?:.|\n)*?>/gm, "");
            data.content = text.trim();
        }

        return data;
    }

    // Reset
    obj.reset = function() {
        editor.innerHTML = '';
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

                insertNodeAtCaret(newImage);
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
                        insertNodeAtCaret(newImage);
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
        editor.removeEventListener('mouseup', editorMouseUp);
        editor.removeEventListener('mousedown', editorMouseDown);
        editor.removeEventListener('mousemove', editorMouseMove);
        editor.removeEventListener('keyup', editorKeyUp);
        editor.removeEventListener('keydown', editorKeyDown);
        editor.removeEventListener('dragstart', editorDragStart);
        editor.removeEventListener('dragenter', editorDragEnter);
        editor.removeEventListener('dragover', editorDragOver);
        editor.removeEventListener('drop', editorDrop);
        editor.removeEventListener('paste', editorPaste);

        if (typeof(obj.options.onblur) == 'function') {
            editor.removeEventListener('blur', editorBlur);
        }
        if (typeof(obj.options.onfocus) == 'function') {
            editor.removeEventListener('focus', editorFocus);
        }

        el.editor = null;
        el.classList.remove('jeditor-container');

        toolbar.remove();
        snippet.remove();
        editor.remove();
    }

    var isLetter = function (str) {
        var regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+)/g;
        return str.match(regex) ? 1 : 0;
    }

    // Event handlers
    var editorMouseUp = function(e) {
        if (editorAction && editorAction.e) {
            editorAction.e.classList.remove('resizing');
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

                if (! e.target.width) {
                    e.target.width = rect.width + 'px';
                }

                if (! e.target.height) {
                    e.target.height = rect.height + 'px';
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
                editorAction.e.width = (editorAction.w + (e.clientX - editorAction.x));

                if (e.shiftKey) {
                    var newHeight = (e.clientX - editorAction.x) * (editorAction.h / editorAction.w);
                    editorAction.e.height = editorAction.h + newHeight;
                } else {
                    var newHeight =  null;
                }
            }

            if (! newHeight) {
                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                    if (! e.shiftKey) {
                        editorAction.e.height = editorAction.h + (e.clientY - editorAction.y);
                    }
                }
            }
        }
    }

    var editorKeyUp = function(e) {
        if (! editor.innerHTML) {
            editor.innerHTML = '<div><br></div>';
        }

        if (typeof(obj.options.onkeyup) == 'function') { 
            obj.options.onkeyup(el, obj, e);
        }
    }


    var editorKeyDown = function(e) {
        // Check for URL
        if (obj.options.parseURL == true) {
            verifyEditor();
        }

        if (typeof(obj.options.onkeydown) == 'function') { 
            obj.options.onkeydown(el, obj, e);
        }

        if (e.key == 'Delete') {
            if (e.target.tagName == 'IMG' && e.target.parentNode.classList.contains('jsnippet-image')) {
                e.target.remove();
                updateTotalImages();
            }
        }
    }

    // Elements to be removed
    var remove = [HTMLUnknownElement,HTMLAudioElement,HTMLEmbedElement,HTMLIFrameElement,HTMLTextAreaElement,HTMLInputElement,HTMLScriptElement];

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
                            editor.appendChild(d);
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
                    insertNodeAtCaret(d);
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
        // Blur
        if (typeof(obj.options.onblur) == 'function') {
            obj.options.onblur(el, obj, e);
        }

        change(e);
    }

    var editorFocus = function(e) {
        // Focus
        if (typeof(obj.options.onfocus) == 'function') {
            obj.options.onfocus(el, obj, e);
        }
    }

    editor.addEventListener('mouseup', editorMouseUp);
    editor.addEventListener('mousedown', editorMouseDown);
    editor.addEventListener('mousemove', editorMouseMove);
    editor.addEventListener('keyup', editorKeyUp);
    editor.addEventListener('keydown', editorKeyDown);
    editor.addEventListener('dragstart', editorDragStart);
    editor.addEventListener('dragenter', editorDragEnter);
    editor.addEventListener('dragover', editorDragOver);
    editor.addEventListener('drop', editorDrop);
    editor.addEventListener('paste', editorPaste);
    editor.addEventListener('focus', editorFocus);
    editor.addEventListener('blur', editorBlur);

    // Onload
    if (typeof(obj.options.onload) == 'function') {
        obj.options.onload(el, obj, editor);
    }

    // Set value to the editor
    editor.innerHTML = value;

    // Append editor to the containre
    el.appendChild(editor);

    // Snippet
    if (obj.options.snippet) {
        appendElement(obj.options.snippet);
    }

    // Default toolbar
    if (obj.options.toolbar == null) {
        obj.options.toolbar = jSuites.editor.getDefaultToolbar();
    }

    // Add toolbar
    if (obj.options.toolbar) {
        // Append to the DOM
        el.appendChild(toolbar);
        // Create toolbar
        jSuites.toolbar(toolbar, {
            container: true,
            responsive: true,
            items: obj.options.toolbar
        });
    }

    // Focus to the editor
    if (obj.options.focus) {
        jSuites.editor.setCursor(editor, obj.options.focus == 'initial' ? true : false);
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

    el.editor = obj;

    return obj;
});

jSuites.editor.setCursor = function(element, first) {
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

jSuites.editor.getDomain = function(url) {
    return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0].split(/:/g)[0];
}

jSuites.editor.detectUrl = function(text) {
    var expression = /(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig;
    var links = text.match(expression);

    if (links) {
        if (links[0].substr(0,3) == 'www') {
            links[0] = 'http://' + links[0];
        }
    }

    return links;
}

jSuites.editor.youtubeParser = function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    return (match && match[7].length == 11) ? match[7] : false;
}

jSuites.editor.getDefaultToolbar = function() { 
    return [
        {
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        },
        {
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        },
        {
            type:'divisor'
        },
        {
            content: 'format_bold',
            onclick: function(a,b,c) {
                document.execCommand('bold');

                if (document.queryCommandState("bold")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_italic',
            onclick: function(a,b,c) {
                document.execCommand('italic');

                if (document.queryCommandState("italic")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_underline',
            onclick: function(a,b,c) {
                document.execCommand('underline');

                if (document.queryCommandState("underline")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            type:'divisor'
        },
        {
            content: 'format_list_bulleted',
            onclick: function(a,b,c) {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_list_numbered',
            onclick: function(a,b,c) {
                document.execCommand('insertOrderedList');

                if (document.queryCommandState("insertOrderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_indent_increase',
            onclick: function(a,b,c) {
                document.execCommand('indent', true, null);

                if (document.queryCommandState("indent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_indent_decrease',
            onclick: function() {
                document.execCommand('outdent');

                if (document.queryCommandState("outdent")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }/*,
        {
            icon: ['format_align_left', 'format_align_right', 'format_align_center'],
            onclick: function() {
                document.execCommand('justifyCenter');

                if (document.queryCommandState("justifyCenter")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }
        {
            type:'select',
            items: ['Verdana','Arial','Courier New'],
            onchange: function() {
            }
        },
        {
            type:'select',
            items: ['10px','12px','14px','16px','18px','20px','22px'],
            onchange: function() {
            }
        },
        {
            icon:'format_align_left',
            onclick: function() {
                document.execCommand('JustifyLeft');

                if (document.queryCommandState("JustifyLeft")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_center',
            onclick: function() {
                document.execCommand('justifyCenter');

                if (document.queryCommandState("justifyCenter")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_right',
            onclick: function() {
                document.execCommand('justifyRight');

                if (document.queryCommandState("justifyRight")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_justify',
            onclick: function() {
                document.execCommand('justifyFull');

                if (document.queryCommandState("justifyFull")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_list_bulleted',
            onclick: function() {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }*/
    ];
}
