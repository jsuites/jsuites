title: Javascript contextmenu with Icons
keywords: Javascript, contextmenu, examples, vanilla javascript, icons.
description: How to include icons on the jsuites javascript contextmenu plugin.

JavaScript contextmenu
======================

Adding icons to the javascript contextmenu.

### Context menu with icons

**NOTE:** The property id is mandatory in the element

  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<i>right click inside the square to open the contextmenu</i>
<div id='container' style='border:1px solid gray;width:400px;height:300px;'></div>
<div id='contextmenu'></div>

<script>
var contextMenu = jSuites.contextmenu(document.getElementById('contextmenu'), {
    items:[
        {
            title:'Copy',
            icon: 'content_copy',
            shortcut:'Ctrl + C',
            onclick:function() {
                alert('Copy');
            }
        },
        {
            title:'Cut',
            icon: 'content_cut',
            shortcut:'Ctrl + X',
            onclick:function() {
                alert('Cut');
            }
        },
        {
            title:'Paste',
            icon: 'content_paste',
            shortcut:'Ctrl + V',
            onclick:function() {
                alert('Pate');
            }
        },
        {
            type:'line'
        },
        {
            title:'Visit jSpreadsheet website',
            icon: 'link',
            onclick:function() {
                window.open('https://jspreadsheet.com/v7');
            }
        },
        {
            title:'About',
            onclick:function() {
                alert('jSuites v3')
            }
        },
    ],
    onclick:function() {
        contextMenu.close(false);
    }
});

document.getElementById('container').addEventListener("contextmenu", function(e) {
    contextMenu.open(e);
    e.preventDefault();
});
</script>
</html>
```

