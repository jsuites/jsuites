title: JavaScript image cropper controls
keywords: Javascript, image cropper, cropper plugin, JS cropper, web components, JS crop, rotate and zoom examples.
description: Example on how to programmatically rotate and zoom the image in the javascript cropper plugin.

* [JavaScript Cropper](/docs/v4/image-cropper)

JavaScript image cropper
========================

Examples
--------

How to implement a image cropper with rotate and zoom controls using the javascript cropper plugin.  

[See this example on jsfiddle](https://jsfiddle.net/spreadsheet/056jtdn4/)

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@jsuites/cropper/cropper.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/cropper/cropper.min.css" type="text/css" />

<div style="display: flex;">
    <div id="image-cropper" style="border:1px solid #ccc; margin: 5px;"></div>
    <div id="image-cropper-result"><img style="width:120px; height:120px; margin: 5px;"></div>
</div>

<div style="display: flex; padding: 20px;">
    <label>Zoom<br><input type="range" step=".05" min="0.1" max="5.45" value="1" id="zoom"></label><br>
    <label>Rotate<br><input type="range" step=".05" min="0.1" max="5.45" value="1" id="rotate"></label>
</div>

<p><input type="button" value="Get cropped image" id="image-getter"></p>

<script>
var crop = cropper(document.getElementById('image-cropper'), {
    area: [ 480, 320 ],
    crop: [ 150, 150 ],
    value: '/templates/default/img/lemonadejs.png',
})

document.getElementById('zoom').onchange = function() {
    document.getElementById('image-cropper').crop.zoom(this.value);
}

document.getElementById('rotate').onchange = function() {
    document.getElementById('image-cropper').crop.rotate(this.value);
}

document.getElementById('image-getter').onclick = function() {
    document.getElementById('image-cropper-result').children[0].src =
        document.getElementById('image-cropper').crop.getCroppedImage().src;
}
</script>
</html>
```
