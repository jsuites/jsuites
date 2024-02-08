title: Javascript contextmenu with submenus
keywords: Javascript, contextmenu, examples, vanilla javascript, submenus.
description: How to include submenus on the jsuites javascript contextmenu plugin.

JavaScript contextmenu
======================

Adding submenus to the javascript contextmenu plugin

  

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
            }
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
                alert('jSuites v3')
            }
        },
        {
            title: 'Sub context menu',
            submenu: [
                {
                    title:'Sub menu 1',
                    shortcut:'Ctrl + X',
                    onclick:function() {
                        alert('SubMenu 1-1');
                    }
                },
                {
                    title:'Sub menu 2',
                    disabled: true,
                    onclick:function() {
                        alert('SubMenu 1-2')
                    }
                },
                {
                    title: 'Sub sub context menu',
                    submenu: [
                        {
                            title:'Sub menu 2-1',
                            shortcut:'Ctrl + X',
                            onclick:function() {
                                alert('SubMenu 2-1');
                            }
                        },
                        {
                            title:'Sub menu 2-2',
                            disabled: true,
                            onclick:function() {
                                alert('SubMenu 2-2')
                            }
                        },
                    ],
                }
            ],
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

