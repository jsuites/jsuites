/**
 * (c) jTools Text Editor
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Inline richtext editor
 */

jApp.editor = (function(el, options) {
    if (! options) {
        options = {};
    }

    if (options.value) {
        var value = options.value;
    } else {
        var value = el.innerHTML ? el.innerHTML : ''; 
    }

    // Prepare container
    el.innerHTML = '';
    el.classList.add('jeditor-container');

    // Create editor
    var editor = document.createElement('div');
    editor.setAttribute('contenteditable', true);
    editor.setAttribute('spellcheck', false);
    editor.className = 'jeditor';
    el.appendChild(editor);

    el.setData = function(html) {
        editor.innerHTML = html;
    }

    el.getData = function() {
        return editor.innerHTML;
    }

    // Filter HTML
    el.clearHTML = function(input) {
        var stringStripper = /(class=(")?Mso[a-zA-Z]+(")?)/g;
        var output = input.replace(stringStripper, ' ');
        var commentSripper = new RegExp('<!--(.*?)-->','g');
        var output = output.replace(commentSripper, '');
        var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
        output = output.replace(tagStripper, '');
        var badTags = ['style', 'script','applet','embed','noframes','noscript'];
        for (var i=0; i< badTags.length; i++) {
          tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
          output = output.replace(tagStripper, '');
        }
        var badAttributes = ['style', 'start'];
        for (var i=0; i< badAttributes.length; i++) {
          var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
          output = output.replace(attributeStripper, '');
        }
        return output;
    }

    // Toolbar defaults
    el.getToolbar = function() {
        if (! options.toolbar) {
            options.toolbar = [
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

        var toolbar = document.createElement('div');
        toolbar.className = 'jeditor-toolbar';
        //toolbar.style.visibility = 'hidden';

        for (var i = 0; i < options.toolbar.length; i++) {
            if (options.toolbar[i].icon) {
                var item = document.createElement('div');
                item.style.userSelect = 'none';
                var itemIcon = document.createElement('i');
                itemIcon.className = 'material-icons';
                itemIcon.innerHTML = options.toolbar[i].icon;
                itemIcon.onclick = options.toolbar[i].onclick;
                item.appendChild(itemIcon);
                toolbar.appendChild(item);
            } else {
                if (options.toolbar[i].type == 'divisor') {
                    var divisor = document.createElement('div');
                    divisor.className = 'jeditor-toolbar-divisor';
                    toolbar.appendChild(divisor);
                }
            }
        }

        return toolbar;
    }

    // Tooolbar
    if (options.allowToolbar) {
        var toolbar = el.getToolbar();
        el.appendChild(toolbar);
    }

    // Set value
    editor.innerHTML = value;

    // Click
    if (typeof(options.onclick) == 'function') {
        el.addEventListener('click', options.onclick);
    }

    // Show Toolbar
    editor.addEventListener('focus', function(e) {
        if (toolbar) {
            //toolbar.style.visibility = '';
        }
    });

    // Hide Toolbar
    editor.addEventListener('blur', function(e) {
        if (toolbar) {
            //toolbar.style.visibility = 'hidden';
        }
    });

    // Paste
    el.addEventListener('paste', function(e) {
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        paste = el.clearHTML(paste);
        paste = paste.split('\r\n');
        var str = '';
        if (e.path[0].nodeName == 'DIV' && ! e.path[0].classList.contains('editor')) {
            for (var i = 0; i < paste.length; i++) {
                if (paste[i]) {
                    str += paste[i] + "\n";
                }
            }
        } else {
            for (var i = 0; i < paste.length; i++) {
                if (paste[i]) {
                    str += '<div>' + paste[i] + '</div>';
                } else {
                    str += '<div><br></div>';
                }
            }
        }
        document.execCommand('insertHtml', false, str);
        e.preventDefault();
    });

    el.options = options;

    return el;
});