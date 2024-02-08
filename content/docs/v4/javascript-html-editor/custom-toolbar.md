title: Customize the toolbar on the jsuites HTML editor
keywords: Javascript, HTML editor, plugin, wysiwyg editor, custom toolbar
description: How to customize the toolbar in the jsuites HTML editor.

Richtext Editor
===============

How to customize the HTML editor toolbar.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="editor1"></div>

<p><input type='button' value='Get data' id='getdatabtn'></p>

<script>
let editor = jSuites.editor(document.getElementById('editor1'), {
    allowToolbar: true,
    value: '<b>This is a basic example...</b>',
    toolbar: [{
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
        },{
            type:'select',
            width: '160px',
            options: [ 'Verdana', 'Arial', 'Courier New' ],
            render: function(e) {
                return '<span style="font-family:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d) {
                document.execCommand('fontName', false, d);
            }
        },
        {
            type: 'select',
            width: '48px',
            content: 'format_size',
            options: ['X-small','Small','Medium','Large','X-large'],
            render: function(e) {
                return '<span style="font-size:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d,e) {
                document.execCommand('fontSize', false, e+1);
            }
        },
        {
            type: 'select',
            width: '50px',
            options: ['format_align_left','format_align_center','format_align_right','format_align_justify'],
            render: function(e) {
                return '<i class="material-icons">' + e + '</i>';
            },
            onchange: function(a,b,c,d) {
                if (d == 'format_align_left') {
                    document.execCommand('justifyLeft');
                } else if (d == 'format_align_center') {
                    document.execCommand('justifyCenter');
                } else if (d == 'format_align_right') {
                    document.execCommand('justifyRight');
                } else if (d == 'format_align_justify') {
                    document.execCommand('justifyFull');
                }
            }
        }
    ]
});

getdatabtn.onclick = () => alert(editor.getData())
</script>
</html>
```
