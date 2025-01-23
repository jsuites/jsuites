title: JavaScript image cropper quick reference
keywords: Javascript, image cropper, cropper plugin, JS cropper, web components, JS crop, quick reference, documentation
description: The quick reference on How to implement a JavaScript online image copper.

{.white}
> A new version of the jSuites **JavaScript Cropper** plugin is available here.
> <br><br>
> [JavaScript Image Cropper](/docs/image-cropper){.button .main target="_top"}

* [JavaScript Cropper](/docs/v4/image-cropper)

JavaScript Image cropper
========================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.layout.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.layout.css" type="text/css" />

<div id="image-cropper"></div>

<script>
cropper(document.getElementById('image-cropper'), {
    area: [ 480, 320 ],
    crop: [ 150, 150 ],
});
</script>
</html>
```

  
  

Methods
-------

| Method | Description |
| --- | --- |
| cropper.resetCropSelection(); | Reset the crop selection |
| cropper.reset(); | Reset the current image edition and canvas |
| cropper.contrast(double); | Change the image contrast. Input value as double; Valid range: -1 to 1 |
| cropper.brightness(double); | Change the image brightness. Input value input as double; Valid range: -1 to 1 |
| cropper.getImageType(); | Get the image type uplodaed to the cropper. |
| cropper.getSelectionCoordinates(); | Get the crop coordinates from the current selection. |
| cropper.getCroppedImage(); | Get a new DOM image element based on the crop selection. |
| cropper.getCroppedContent(); | Get a new based 64 image code based on the crop selection. |
| cropper.getCroppedAsBlob(callback); | Get a new blob reference based on the crop selection. |
| cropper.getImage(); | Get the DOM of the image from the cropper. |
| cropper.getCanvas(); | Get the DOM of the canvas from the cropper. |
| cropper.addFromFile(); | Start the edition of a new image from the computer. |
| cropper.addFromUrl(string); | Start the edition of a new image from a remote URL. Be aware of CORS limitations. |
| cropper.zoom(double); | Apply zoom to the image. |
| cropper.rotate(double); | Apply rotate to the image. |

  
  

Events
------

| Method | Description |
| --- | --- |
| onload | The component is ready.  <br>`onload(DOMElement element, Object instance) => void` |
| onchange | When a new image is loaded.  <br>`onchange(DOMElement element, DOMElement image) => void` |

  
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| area: array(int, int) | Component full area. |
| crop: array(int, int) | Crop selection area. |
| remoteParser: string | URL of a remote backend image parser to workaround CORS limitations. |
| allowResize: boolean | Allow the crop selection resize. |
| text: object | { extensionNotAllowed:'', imageTooSmall:'' } |
