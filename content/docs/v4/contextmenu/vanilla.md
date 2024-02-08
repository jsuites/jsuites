title: A javascript contextmenu vanilla javascript example
keywords: Javascript, contextmenu, examples, vanilla javascript.
description: A basic example on how to use the jsuites contextmenu as a javascript plugin.

JavaScript contextmenu
======================

Integrate a simple javascript contextmenu in your web-based application.

### Vanilla javascript plugin

**NOTE:** The property id is mandatory in the element

  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<i>right click inside the square to open the contextmenu</i>
<div id='container' style='border:1px solid gray;width:400px;height:300px;'></div>

<div id='contextmenu'></div>

<script>
var contextMenu = jSuites.contextmenu(document.getElementById('contextmenu'), {
    items:[
        {
            title:'Copy',
            shortcut:'Ctrl + C',
            onclick:function() {
                alert('Copy');
            },
            tooltip: 'Method to copy the text',
        },
        {
            type:'line'
        },
        {
            title:'Visit the website',
            onclick:function() {
                window.open('https://jspreadsheet.com/v7');
            }
        },
        {
            title:'Google',
            disabled: true,
            onclick:function() {
                alert('jSuites v2')
            }
        },
        {
            title:'About',
            onclick:function() {
                alert('jSuites v2')
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

