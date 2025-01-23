title: JavaScript image cropper filters
keywords: Javascript, image cropper, cropper plugin, JS cropper, web components, JS crop, examples.
description: Example on how to implement controls and how apply filters such as brightness and contrast programatically.

{.white}
> A new version of the jSuites **JavaScript Cropper** plugin is available here.
> <br><br>
> [JavaScript Image Cropper](/docs/image-cropper){.button .main target="_top"}

* [JavaScript Cropper](/docs/v4/image-cropper)

JavaScript image cropper
========================

Examples
--------

How to implement a image cropper with brightness and contract controls using the javascript cropper plugin.  

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
    <label>Brightness<br><input type="range" min="-1" max="1" step=".05" value="0" id="brightness"></label>
    <label>Contrast<br><input type="range" min="-1" max="1" step=".05" value="0" id="contrast"></label>
</div>

<p><input type="button" value="Get cropped image" id="image-getter" class="jbutton dark"></p>

<script>
var crop = cropper(document.getElementById('image-cropper'), {
    area: [ 480, 320 ],
    crop: [ 150, 150 ],
    value: '/templates/v4/img/download-lemonadejs.png',
})

document.getElementById('brightness').onchange = function() {
    document.getElementById('image-cropper').crop.brightness(this.value);
}

document.getElementById('contrast').onchange = function() {
    document.getElementById('image-cropper').crop.contrast(this.value);
}

document.getElementById('image-getter').onclick = function() {
    document.getElementById('image-cropper-result').children[0].src =
        document.getElementById('image-cropper').crop.getCroppedImage().src;
}
</script>
</html>
```

