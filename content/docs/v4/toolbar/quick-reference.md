title: JavaScript toolbar
keywords: Javascript, toolbar, documentation, reference
description: Basic methods and properties in the javascript toolbar component.

JavaScript Toolbar
==================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="toolbar"></div>

<script>
var toolbar = jSuites.toolbar(document.getElementById('toolbar'), {
    container: true,
    items:[
        {
            type: 'icon',
            content: 'save',
            onclick: function () {
                console.log('save something');
            }
        },
        {
            type: 'label',
            content: 'Text item',
            onclick: function() {
                console.log('action');
            }
        },
        {
            type: 'divisor',
        },
        {
            type: 'select',
            data: [ 'Verdana', 'Arial', 'Courier New' ],
            width: '160px',
            render: function(e) {
                return '<span style="font-family:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d) {
                console.log('font-family: ' + d);
            }
        }
    ],
});
</script>
</html>
```

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| toolbar.selectItem(number) | Select one item in the toolbar |
| toolbar.show() | Show the toolbar |
| toolbar.hide() | Hide the toolbar |
| toolbar.setBadge(index, value) | Add a the badge value for one of the items in the toolbar |
| toolbar.destroy() | Destroy the toolbar |

  
  

Initialiation properties
------------------------

| Property | Description |
| --- | --- |
| app: object | Link the toolbar to an jSuites app. |
| container: boolean | Show the toolbar container border. |
| badge: boolean | Add the a badge container for each toolbar element. |
| title: boolean | Show title below the icons. |
| items: Array of ToolbarItem | Items for the toolbar. |

  
  

ToolbarItem properties
----------------------

| Property | Description |
| --- | --- |
| type: string | Element type: icon | divisor | label | select |
| content: string | Content of the toolbar element |
| title: boolean | Tooltip for the toolbar element |
| width: number | Toolbar element width |
| state: boolean | Add state controller to the toolbar element |
| active: boolean | Initial state for the toolbar element |
| class: string | CSS Class for each toolbar element |
| value: number | The initial selected option for the type: select |
| render: method | Render method parser for the elements in the dropdown when type: select |
| onclick: method | When a item is clicked |
| onchange: method | For the type select when a new item is selected |
