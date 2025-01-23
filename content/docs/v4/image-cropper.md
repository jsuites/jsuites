title: JavaScript Image Cropper with Jsuites v4
keywords: Javascript, image cropper, cropper, cropper plugin, JS cropper, web components, JS crop
description: Quick basic image edition via JavaScript with the jSuites javascript cropper plugin. Useful features such crop, brightness, contrast, rotate and zoom are available.
canonical: https://jsuites.net/docs/v4/image-cropper

JavaScript cropper
==================

The jSuites cropper is a lightweight JavaScript plugin that allow users load, crop, zoom, rotate and apply filters to a image. The plugin is responsive and brings a great user experience across different devices. It is a full open source powerful solution that can be integrated with React, Angular, Vue and among others.

![](img/js-crop.svg){.right}

  
  

Load and crop basic example.
----------------------------

Click in space below to upload a image  

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

<p><input type="button" value="Get cropped image" id="image-getter" class="jbutton dark"></p>

<script>
cropper(document.getElementById('image-cropper'), {
    area: [ 280, 280 ],
    crop: [ 150, 150 ],
})

document.getElementById('image-getter').onclick = function() {
    document.getElementById('image-cropper-result').children[0].src =
        document.getElementById('image-cropper').crop.getCroppedImage().src;
}
</script>
</html>
```

  

### More examples

* [Basic image cropper example on jsFiddle](https://jsfiddle.net/spreadsheet/1a5mts0u/)
* [How to apply brightness and contrast filters programmatically](/docs/v4/image-cropper/brightness-and-contrast-filters)
* [How to apply rotate and zoom programmatically](/docs/v4/image-cropper/rotate-and-zoom)

  
  

Quick documentation for the cropper plugin
------------------------------------------

### Methods

| Method | Description |
| --- | --- |
| resetCropSelection(); | Reset the crop selection |
| reset(); | Reset the current image edition and canvas |
| contrast(double); | Change the image contrast. Input value as double; Valid range: -1 to 1 |
| brightness(double); | Change the image brightness. Input value input as double; Valid range: -1 to 1 |
| getImageType(); | Get the image type uplodaed to the cropper. |
| getSelectionCoordinates(); | Get the crop coordinates from the current selection. |
| getCroppedImage(); | Get a new DOM image element based on the crop selection. |
| getCroppedContent(); | Get a new based 64 image code based on the crop selection. |
| getCroppedAsBlob(); | Get a new blob reference based on the crop selection. |
| getImage(); | Get the DOM of the image from the cropper. |
| getCanvas(); | Get the DOM of the canvas from the cropper. |
| addFromFile(); | Start the edition of a new imagem from the computer. |
| addFromUrl(string); | Start the edition of a new imagem from a remote URL. Be aware of CORS limitations. |
| zoom(double); | Apply zoom to the image. |
| rotate(double); | Apply rotate to the image. |

  
  

### Events

| Method | Description |
| --- | --- |
| onload | The component is ready.  <br>`onload(DOMElement element) => void` |
| onchange | When a new image is loaded.  <br>`onchange(DOMElement element, DOMElement image) => void` |

  
  

### Initialization settings

| Property | Description |
| --- | --- |
| area: array(int, int) | Component full area. |
| crop: array(int, int) | Crop selection area. |
| remoteParser: string | URL of a remote backend image parser to workaround CORS limitations. |
| allowResize: boolean | Allow the crop selection resize. |
| text: object | { extensionNotAllowed:'', imageTooSmall:'' } |

  
  
  

Integrations
------------

* [With React](/docs/v4/image-cropper/react-component)
* [With Angular](/docs/v4/image-cropper/image-cropper-angular-example)
* [With Vue](/docs/v4/image-cropper/image-cropper-vue-example)
