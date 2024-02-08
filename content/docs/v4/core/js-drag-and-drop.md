title: JavaScript drag and drop plugin
keywords: JavaScript drag and drop, sortable list
description: JavaScript drag and drop plugin.

Draggable list
==============

This script has approximately 1 KB

The `jSuites.sorting` is a lightweight JavaScript to create sortable lists with events. You can drag of of the following items in the list below to re-order the elements.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<ul id='draggable-elements' class='cursor'>
    <li>Test 1</li>
    <li>Test 2</li>
    <li>Test 3</li>
    <li>Test 4</li>
</ul>

<script>
jSuites.sorting(document.getElementById('draggable-elements'), {
    ondrop: function() {
        console.log(arguments);
    }
});
</script>

<style>
    #draggable-elements li {
        background-color: #FFF;
        padding: 3px;
        margin-bottom: 3px;
        border-radius: 3px;
        font-size: 16px;
    }
</style>
</html>
```

Methods
-------

| Method      | Description                                                                                             |
|-------------|---------------------------------------------------------------------------------------------------------|
| ondragstart | Call the method when drag starts                                                                        |
| ondragend   | Call the method when drag ends                                                                          |
| ondrop      | Call the method on the drop. `ondrop(DOMElement, int from, int to, DOMElement, DOMElement, mouseEvent)` |

  
  

Resources
---------

[Jfiddle Working example](https://jsfiddle.net/hodware/804t6qe2/)
