/**
 * (c) jTools Text Editor
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Inline richtext editor
 */

jSuites.editor = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        // Initial HTML content
        value:null,
        // Add toolbar
        toolbar:null,
        // Max height
        maxHeight:null,
        // Website parser is to read websites and images from cross domain
        websiteParser:null,
        // Key from youtube to read properties from URL
        youtubeKey:null,
        // Parse URL
        parseURL:true,
        // Accept drop images
        dropImages:true,
        // Border
        border:true,
        // Events
        onclick:null,
        onfocus:null,
        onblur:null,
        onload:null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (obj.options.value) {
        var value = obj.options.value;
    } else {
        var value = el.innerHTML ? el.innerHTML : ''; 
    }

    // Prepare container
    el.innerHTML = '';
    el.classList.add('jeditor-container');

    // Border
    if (obj.options.border == false) {
        el.style.border = '0px';
    }

    // Create editor
    var editor = document.createElement('div');
    editor.setAttribute('contenteditable', true);
    editor.setAttribute('spellcheck', false);
    editor.className = 'jeditor';

    el.appendChild(editor);
    editor.innerHTML = value || '<div></div>';
    editor.focus();

    // Max height
    if (obj.options.maxHeight) {
        editor.style.overflowY = 'auto';
        editor.style.maxHeight = obj.options.maxHeight;
    }

    // Timer
    var editorTimer = null;

    /**
     * Append snippet or thumbs in the editor
     * @Param object data
     */
    obj.appendElement = function(data) {
        var snippet = editor.querySelector('.snippet');

        if (! snippet) {
            var snippet = document.createElement('div');
            snippet.className = 'snippet';
            snippet.setAttribute('contenteditable', false);

            if (data.image) {
                var image = document.createElement('img');
                image.className = 'snippet-image';
                image.src = data.image;
                snippet.appendChild(image);
            }

            var div = document.createElement('div');
            div.className = 'snippet-title';
            div.innerHTML = data.title;
            snippet.appendChild(div);

            var div = document.createElement('div');
            div.className = 'snippet-description';
            div.innerHTML = data.description;
            snippet.appendChild(div);

            var div = document.createElement('div');
            div.className = 'snippet-host';
            div.innerHTML = data.host;
            snippet.appendChild(div);

            var div = document.createElement('div');
            div.className = 'snippet-url';
            div.innerHTML = data.url;
            snippet.appendChild(div);

            editor.appendChild(snippet);
        }
    }

    obj.detectUrl = function(text) {
        var expression = /(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig;
        var links = text.match(expression);

        if (links) {
            if (links[0].substr(0,3) == 'www') {
                links[0] = 'http://' + links[0];
            }
        }

        return links;
    }

    obj.youtubeParser = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);

        return (match && match[7].length == 11) ? match[7] : false;
    }

    obj.getYoutube = function(id) {
        if (! obj.options.youtubeKey) {
            console.error('The youtubeKey is not defined');
        } else {
            fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=' + obj.options.youtubeKey + '&id=' + id , { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(result) {
                    var p = {
                        title:'',
                        description:'',
                        image:'',
                        host:'www.youtube.com',
                        url:'https://www.youtube.com?watch=' + id,
                    }
                    if (result.items[0].snippet.title) {
                        p.title = result.items[0].snippet.title;
                    }
                    if (result.items[0].snippet.description) {
                        p.description = result.items[0].snippet.description;

                        if (p.description.length > 150) {
                            p.description = p.description.substr(0, 150) + '...';
                        }
                    }
                    if (result.items[0].snippet.thumbnails.medium.url) {
                        p.image = result.items[0].snippet.thumbnails.medium.url;
                    }

                    obj.appendElement(p);
                })
            });
        }
    }

    obj.getWebsite = function(url) {
        if (! obj.options.websiteParser) {
            console.log('The websiteParser is not defined');
        } else {
            fetch(obj.options.websiteParser + encodeURI(url.trim()) , { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(result) {
                    var p = {
                        title:'',
                        description:'',
                        image:'',
                        host:url,
                        url:url,
                    }

                    if (result.title) {
                        p.title = result.title;
                    }
                    if (result.description) {
                        p.description = result.description;
                    }
                    if (result.image) {
                        p.image = result.image;
                    }
                    if (result.url) {
                        p.url = result.url;
                    }
                    if (result.host) {
                        p.host = result.host;
                    }

                    obj.appendElement(p);
                })
            });
        }
    }

    obj.setData = function(html) {
        editor.innerHTML = html;
    }

    obj.getData = function(json) {
        if (! json) {
            var data = editor.innerHTML;
        } else {
            var data = {
                message : '',
            };

            var div = document.createElement('div');
            div.innerHTML = editor.innerHTML;

            var snippet = div.querySelector('.snippet');
            if (snippet) {
                var index = 0;
                data.snippet = {};
                if (snippet.children[0].tagName == 'IMG') {
                    data.snippet.image = snippet.children[index++].getAttribute('src');
                }

                data.snippet.title = snippet.children[index++].innerHTML;
                data.snippet.description = snippet.children[index++].innerHTML;
                data.snippet.host = snippet.children[index++].innerHTML;
                data.snippet.url = snippet.children[index++].innerHTML;

                snippet.remove();
            }

            var text = div.innerHTML;
            text = text.replace(/<br>/g, "\n");
            text = text.replace(/<\/div>/g, "\n");
            text = text.replace(/<(?:.|\n)*?>/gm, '');
            data.message = text;
            data = JSON.stringify(data);
        }

        return data;
    }

    obj.verifyEditor = function() {
        clearTimeout(editorTimer);
        editorTimer = setTimeout(function() {
            var snippet = editor.querySelector('.snippet');
            var thumbsContainer = el.querySelector('.jeditor-thumbs-container');

            if (! snippet && ! thumbsContainer) {
                var html = editor.innerHTML.replace(/\n/g, ' ');
                var container = document.createElement('div');
                container.innerHTML = html;
                var thumbsContainer = container.querySelector('.jeditor-thumbs-container');
                if (thumbsContainer) {
                    thumbsContainer.remove();
                }
                var text = container.innerText; 
                var url = obj.detectUrl(text);

                if (url) {
                    if (url[0].substr(-3) == 'jpg' || url[0].substr(-3) == 'png' || url[0].substr(-3) == 'gif') {
                        if (obj.getDomain(url[0]) == window.location.hostname) {
                            obj.importImage(url[0], '');
                        } else {
                            obj.importImage(obj.options.websiteParser + url[0], '');
                        }
                    } else {
                        var id = obj.youtubeParser(url[0]);

                        if (id) {
                            obj.getYoutube(id);
                        } else {
                            obj.getWebsite(url[0]);
                        }
                    }
                }
            }
        }, 1000);
    }

    obj.getDomain = function(url) {
        return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0].split(/:/g)[0];
    }

    obj.importImage = function(url, name) {
        var img = new Image();

        img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width  = 100;
            canvas.height = 100;
            var ctx = canvas.getContext("2d");
            ctx.imageSmoothingQuality = 'high';
            var w = img.width;
            var h = img.height;
            if (w > h) {
                p = 100 / w;
            } else {
                p = 100 / h;
            }
            var position = (100 - h*p) / 2;

            ctx.drawImage(img, 0, position, w*p, h*p);
            var img1 = new Image();
            var src1 = canvas.toDataURL();
            $(img1).prop('src', src1);

            // Thumbs holder
            var thumbsContainer = editor.querySelector('.jeditor-thumbs-container');
            if (! thumbsContainer) {
                thumbsContainer = document.createElement('div');
                thumbsContainer.className = 'jeditor-thumbs-container';
                thumbsContainer.setAttribute('contenteditable', 'false');

                if (! editor.innerHTML) {
                    editor.innerHTML = '<br><br>';
                }
                editor.appendChild(thumbsContainer);
            }

            // Create image
            var div = document.createElement('div');
            div.className = 'jeditor-thumbs';

            canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx = canvas.getContext("2d");
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0);

            var l = editor.querySelectorAll('.jeditor-thumbs').length;
            var m = src1.split(';')[0].replace('data:', '');
            var e = m.split('/')[1];

            // Add image
            div.appendChild(img1);

            // Append thumbs to the main object
            thumbsContainer.appendChild(div);
        };

        img.src = url;
    }

    obj.addFile = function(files) {
        var reader = [];

        for (var i = 0; i < files.length; i++) {
            if (files[i].size > 8000000) {
                alert('The file is too big');
            } else {
                // Only PDF or Images
                var type = files[i].type.split('/');
                if (type[1] == 'pdf' || type[0] == 'image') {
                    // Create file
                    reader[i] = new FileReader();
                    reader[i].index = i;
                    reader[i].type = type;
                    reader[i].name = files[i].name;
                    reader[i].addEventListener("load", function (data) {
                        // Get result
                        if (data.target.type[1] == 'pdf') {
                            obj.importPdf(data.target.result, data.target.name);
                        } else {
                            obj.importImage(data.target.result, data.target.name);
                        }
                    }, false);

                    reader[i].readAsDataURL(files[i])
                } else {
                    alert('The extension is not allowed');
                }
            }
        }
    }

    // Toolbar defaults
    obj.getToolbar = function() {
        return [
            {
                icon:'undo',
                onclick: function() {
                    document.execCommand('undo');
                }
            },
            {
                icon:'redo',
                onclick: function() {
                    document.execCommand('redo');
                }
            },
            {
                type:'divisor'
            },
            {
                icon:'format_bold',
                onclick: function() {
                    document.execCommand('bold');

                    if (document.queryCommandState("bold")) {
                        this.classList.add('selected');
                    } else {
                        this.classList.remove('selected');
                    }
                }
            },
            {
                icon:'format_italic',
                onclick: function() {
                    document.execCommand('italic');

                    if (document.queryCommandState("italic")) {
                        this.classList.add('selected');
                    } else {
                        this.classList.remove('selected');
                    }
                }
            },
            {
                icon:'format_underline',
                onclick: function() {
                    document.execCommand('underline');

                    if (document.queryCommandState("underline")) {
                        this.classList.add('selected');
                    } else {
                        this.classList.remove('selected');
                    }
                }
            },
            /*{
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

    // Reset
    obj.reset = function() {
        editor.innerHTML = '';
    }

    // Destroy
    obj.destroy = function() {
        toolbar.remove();
        editor.remove();
        editor.removeEventListener('mousedown', editorMouseDown);
        editor.removeEventListener('keydown', editorKeyDown);
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

        delete el.editor;

        el.classList.remove('jeditor-container');
    }

    // Toolbar
    if (obj.options.toolbar == null) {
        obj.options.toolbar = obj.getToolbar();
    }

    if (obj.options.toolbar) {
        var toolbar = document.createElement('div');
        toolbar.className = 'jeditor-toolbar';
        //toolbar.style.visibility = 'hidden';

        for (var i = 0; i < obj.options.toolbar.length; i++) {
            if (obj.options.toolbar[i].icon) {
                var item = document.createElement('div');
                item.style.userSelect = 'none';
                var itemIcon = document.createElement('i');
                itemIcon.className = 'material-icons';
                itemIcon.innerHTML = obj.options.toolbar[i].icon;
                itemIcon.onclick = (function (a) {
                    let b = a;
                    return function () {
                        obj.options.toolbar[b].onclick(el, obj)
                    };
                })(i);
                item.appendChild(itemIcon);
                toolbar.appendChild(item);
            } else {
                if (obj.options.toolbar[i].type == 'divisor') {
                    var item = document.createElement('div');
                    item.className = 'jeditor-toolbar-divisor';
                    toolbar.appendChild(item);
                } else if (obj.options.toolbar[i].type == 'button') {
                    var item = document.createElement('div');
                    item.classList.add('jeditor-toolbar-button');
                    item.innerHTML = obj.options.toolbar[i].value;
                    toolbar.appendChild(item);
                }
            }
        }

        el.appendChild(toolbar);
    }

    
    // Onload
    if (typeof(obj.options.onload) == 'function') {
        obj.options.onload(el, editor);
    }

    var editorMouseDown = function(e) {
        var close = function(snippet) {
            var rect = snippet.getBoundingClientRect();
            if (rect.width - (e.clientX - rect.left) < 40 && e.clientY - rect.top < 40) {
                snippet.remove();
            }
        }

        if (e.target) {
            if (e.target.classList.contains('snippet')) {
                close(e.target);
            } else if (e.target.parentNode.classList.contains('snippet')) {
                close(e.target.parentNode);
            }
        }
    }

    var editorKeyDown = function(e) {
        if (obj.options.parseURL == true) {
            obj.verifyEditor();
        }
    }

    var editorDragEnter = function(e) {
        el.style.border = '1px dashed #000';
    }

    var editorDragOver = function(e) {
        if (editorTimer) {
            clearTimeout(editorTimer);
        }
        editorTimer = setTimeout(function() {
            el.style.border = '';
        }, 100);
    }

    var editorDrop = function(e) {
        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var text = (e.originalEvent || e).dataTransfer.getData('text/plain');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (text) {
            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Get images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    if (img[i].src.substr(0,4) == 'data') {
                        obj.importImage(img[i].src, '');
                    } else {
                        if (obj.getDomain(img[i].src) == window.location.hostname) {
                            obj.importImage(img[i].src, '');
                        } else {
                            obj.importImage(obj.options.websiteParser + img[i].src, '');
                        }
                    }
                }
            } else {
                var range = null;
                if (document.caretRangeFromPoint) { // Chrome
                    range=document.caretRangeFromPoint(e.clientX,e.clientY);
                } else if (e.rangeParent) { // Firefox
                    range=document.createRange();
                    range.setStart(e.rangeParent,e.rangeOffset);
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                sel.anchorNode.parentNode.focus();

                if (document.queryCommandSupported('insertText')) {
                    document.execCommand('insertText', false, text);
                } else {
                    document.execCommand('paste', false, text);
                }
            }
        }

        if (file) {
            obj.addFile(file);
        }

        el.style.border = '';

        e.preventDefault();  
    }

    var editorPaste = function(e) {
        if (e.clipboardData || e.originalEvent.clipboardData) {
            var html = (e.originalEvent || e).clipboardData.getData('text/html');
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
            var file = (e.originalEvent || e).clipboardData.files
        } else if (window.clipboardData) {
            var html = window.clipboardData.getData('Html');
            var text = window.clipboardData.getData('Text');
            var file = window.clipboardData.files
        }

        text = text.split('\r\n');
        var str = '';
        if (e.target.nodeName == 'DIV' && ! e.target.classList.contains('jeditor')) {
            for (var i = 0; i < text.length; i++) {
                if (text[i]) {
                    str += text[i] + "\n";
                }
            }
        } else {
            for (var i = 0; i < text.length; i++) {
                if (text[i]) {
                    str += '<div>' + text[i] + '</div>';
                } else {
                    str += '<div><br></div>';
                }
            }
        }
        document.execCommand('insertHtml', false, str);

        // Create temp element
        var div = document.createElement('div');
        div.innerHTML = html;

        // Get images
        var img = div.querySelectorAll('img');

        if (img.length) {
            for (var i = 0; i < img.length; i++) {
                if (img[i].src.substr(0,4) == 'data') {
                    obj.importImage(text.src, '');
                } else {
                    obj.importImage(obj.options.websiteParser + img[i].src, '');
                }
            }
        }

        if (file) {
            obj.addFile(file);
        }

        e.preventDefault();
    }

    var editorBlur = function() {
        obj.options.onblur(obj);
    }

    var editorFocus = function() {
        obj.options.onfocus(obj);
    }

    editor.addEventListener('mousedown', editorMouseDown);
    editor.addEventListener('keydown', editorKeyDown);
    editor.addEventListener('dragenter', editorDragEnter);
    editor.addEventListener('dragover', editorDragOver);
    editor.addEventListener('drop', editorDrop);
    editor.addEventListener('paste', editorPaste);

    // Blur
    if (typeof(obj.options.onblur) == 'function') {
        editor.addEventListener('blur', editorBlur);
    }

    // Focus
    if (typeof(obj.options.onfocus) == 'function') {
        editor.addEventListener('focus', editorFocus);
    }

    el.editor = obj;

    return obj;
});