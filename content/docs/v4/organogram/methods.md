title: JavaScript organogram Methods
keywords: Javascript, organogram, organogram plugin, JS organogram, examples, example, methods
description: Interact with the JavaScript organogram plugin.

* [Javascript organogram](/docs/v4/organogram)

Javascript organogram
=====================

Updating the JavaScript organogram programmatically.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<script src="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.css" type="text/css" />

<div id='organogram'></div>

<input type='button' class="jbutton dark" value="Add item" id='jorg-btn' />
<input type='button' class="jbutton dark" value="Remove item" id='jorg-btn-2' />
<input type='button' class="jbutton dark" value="Refresh" id='jorg-btn-3' />

<script>
var org = jSuites.organogram(document.getElementById('organogram'), {
    width: 460,
    height: 420,
    url: '/plugins/organogram.json',
    onload: function(el, obj) {
        startData = Object.assign([], obj.options.data);
    },
    vertical: true,
});

var startData = null;

var item = {
    "id":11,
    "name":"Nicolly",
    "role":"Operations manager",
    "parent":2,
    "status":"#D3D3D3",
    "img":"/plugins/images/no-user.jpg"
 }

document.getElementById('jorg-btn').onclick = function() {
    org.addItem(item);
    item.id ++;
}

document.getElementById('jorg-btn-2').onclick = function() {
    org.setData(startData);
}

document.getElementById('jorg-btn-3').onclick = function() {
    item.id --;
    org.removeItem(item);
}
</script>
</html>
```
