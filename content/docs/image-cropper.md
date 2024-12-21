title: JavaScript Cropper
keywords: JavaScript, Image Cropper, Cropper Plugin, JS Image Editing, Web Components, Image Manipulation
description: The jSuites Image Cropper is a JavaScript plugin to create basic image editing functionalities in web applications. It provides features such as crop, brightness and contrast adjustment, rotation, and zoom, enabling direct, efficient and straightforward image manipulation.
canonical: https://jsuites.net/docs/image-cropper

# JavaScript Image Cropper

The jSuites Image Cropper is a JavaScript plugin to create basic image editing functionalities in web applications. It provides features such as crop, brightness and contrast adjustment, rotation, and zoom, among others. It is responsive to ensure a seamless user experience across various devices. It is a powerful, fully open-source solution that can be used along popular frameworks like React, Angular, Vue, and more.

## Documentation

### Methods

| Method                     | Description                                                                       |
|----------------------------|-----------------------------------------------------------------------------------|
| resetCropSelection();      | Reset the crop selection                                                          |
| reset();                   | Reset the current image edition and canvas                                        |
| contrast(double);          | Change the image contrast. Input value as double; Valid range: -1 to 1            |
| brightness(double);        | Change the image brightness. Input value input as double; Valid range: -1 to 1    |
| getImageType();            | Get the image type uploaded to the cropper.                                       |
| getSelectionCoordinates(); | Get the crop coordinates from the current selection.                              |
| getCroppedImage();         | Get a new DOM image element based on the crop selection.                          |
| getCroppedContent();       | Get a new based 64 image code based on the crop selection.                        |
| getCroppedAsBlob();        | Get a new blob reference based on the crop selection.                             |
| getImage();                | Get the DOM of the image from the cropper.                                        |
| getCanvas();               | Get the DOM of the canvas from the cropper.                                       |
| addFromFile();             | Start the edition of a new image from the computer.                               |
| addFromUrl(string);        | Start the edition of a new image from a remote URL. Be aware of CORS limitations. |
| zoom(double);              | Apply zoom to the image.                                                          |
| rotate(double);            | Apply rotate to the image.                                                        |

### Events

| Method   | Description                                                                               |
|----------|-------------------------------------------------------------------------------------------|
| onload   | The component is ready.  <br>`onload(DOMElement element) => void`                         |
| onchange | When a new image is loaded.  <br>`onchange(DOMElement element, DOMElement image) => void` |

### Initialization settings

| Property              | Description                                                          |
|-----------------------|----------------------------------------------------------------------|
| area: array(int, int) | Component full area.                                                 |
| crop: array(int, int) | Crop selection area.                                                 |
| remoteParser: string  | URL of a remote backend image parser to workaround CORS limitations. |
| allowResize: boolean  | Allow the crop selection resize.                                     |
| text: object          | { extensionNotAllowed:'', imageTooSmall:'' }                         |


## Examples

### Load and crop basic example.

Click in the space below to upload an image, make the selection, and then click on the button to crop the selected section of the picture.  

{.transparent}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@jsuites/cropper/cropper.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/cropper/cropper.min.css" type="text/css" />

<p class="small">Click on the big square to upload an image</p>

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
```jsx
import Cropper from "@jsuites/react-cropper";
import { useRef } from "react";
import "@jsuites/cropper/cropper.css";

function App() {
    const cropper = useRef(null);
    const result = useRef(null);

    const getCropped = function() {
        result.current.children[0].src = cropper.current.getCroppedImage().src;
    }

    return (<>
            <div style={{ display: 'flex' }}>
                <Cropper ref={cropper} area={[ 280, 280 ]} crop={[ 150, 150 ]} style={{ border: '1px solid gray' }}/>
                <div ref={result}><img style={{ width: '120px', height: '120px', margin: '5px'}}/></div>
            </div>
            <button onClick={getCropped}>Get Cropped Image</button>
        </>);
}

export default App;
```
```vue
<template>
    <div style="display: flex">
        <div ref="cropper" style="border: 1px solid #ccc"></div>
        <div ref="result"><img style="width: 120px; height: 120px; margin: 5px" /></div>
    </div>

    <div style="display: flex; padding: 20px;">
        <label>Brightness<br /><input :value="brightness" ref={brightness} @change="handleBrightness" type="range" :min="-1"
                :max="1" :step=".05" /></label>
        <label>Contrast<br /><input :value="contrast" ref={contrast} @change="handleContrast" type="range" :min="-1"
                :max="1" :step=".05" /></label>
    </div>

    <button @click="getCropped">Get Cropped Image</button>
</template>

<script>
import Cropper from "@jsuites/cropper"
import "@jsuites/cropper/cropper.css"

export default {
    name: "App",
    data() {
        return {
            cropperInstance: null,
            brightness: 0,
            contrast: 0
        }
    },
    methods: {
        getCropped: function () {
            this.$refs.result.children[0].src = this.cropperInstance.getCroppedImage().src;
        },
        handleBrightness: function (e) {
            this.brightness = e.target.value
            this.cropperInstance.brightness(this.brightness);
        },
        handleContrast: function (e) {
            this.contrast = e.target.value
            this.cropperInstance.contrast(this.contrast);
        }
    },
    mounted() {
        this.cropperInstance = Cropper(this.$refs.cropper, {
            area: [280, 280],
            crop: [150, 150],
        });
    }
}
</script>
```
  

### More examples

More examples using our JavaScript Cropper plugin.

* [Image Cropper example on jsFiddle](https://jsfiddle.net/spreadsheet/1a5mts0u/)
* [Image Brightness and Contrast](/docs/image-cropper/brightness-and-contrast-filters)
* [Image Rotate and Zoom](/docs/image-cropper/rotate-and-zoom)

