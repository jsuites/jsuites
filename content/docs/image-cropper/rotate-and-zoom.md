title: JavaScript Image Cropper: Rotate and Zoom
keywords: Javascript, image cropper, cropper plugin, JS cropper, web components, JS crop, rotate and zoom examples.
description: Example on how to programmatically rotate and zoom the image in the javascript cropper plugin.
canonical: https://jsuites.net/docs/image-cropper/rotate-and-zoom

{.breadcrumb}
- [JavaScript Image Cropper](/docs/image-cropper)
- Examples

# JavaScript image cropper: Rotate and Zoom

## Examples

How to implement a image cropper with rotate and zoom controls using the javascript cropper plugin.  

[See this example on jsfiddle](https://jsfiddle.net/spreadsheet/056jtdn4/)

{.transparent}
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
```jsx
import Cropper from "@jsuites/react-cropper";
import { useRef, useState } from "react";
import "@jsuites/cropper/cropper.css";


function App() {
    const cropper = useRef(null);
    const result = useRef(null);
    const zoomRef = useRef(null);
    const rangeRef = useRef(null);

    const [zoom, setZoom] = useState(1);
    const [range, setRange] = useState(1);

    const getCropped = function () {
        result.current.children[0].src = cropper.current.getCroppedImage().src;
    }

    const handleZoom = function (e) {
        setZoom(e.target.value)
        cropper.current.zoom(e.target.value);
    }

    const handleRange = function (e) {
        setRange(e.target.value)
        cropper.current.rotate(e.target.value);
    }

    return (<>
        <div style={{ display: 'flex' }}>
            <Cropper ref={cropper} area={[280, 280]} crop={[150, 150]} style={{ border: '1px solid #ccc' }} />
            <div ref={result}><img style={{ width: '120px', height: '120px', margin: '5px' }} /></div>
        </div>

        <div style={{ display: 'flex', padding: '20px' }}>
            <label>
                Zoom<br /><input
                    value={zoom}
                    ref={zoomRef}
                    onChange={handleZoom}
                    type={"range"}
                    min={0.1} max={5.45} step={.05}
                />
            </label>
            <label>
                Range<br /><input
                    value={range}
                    ref={rangeRef}
                    onChange={handleRange}
                    type={"range"}
                    min={0.1} max={5.45} step={.05} />
            </label>
        </div>

        <button onClick={getCropped}>Get Cropped Image</button>
    </>
    );
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
        <label>Zoom<br /><input :value="zoom" ref={zoom} @change="handleZoom" type="range" :min="0.1"
                :max="5.45" :step=".05" /></label>
        <label>Range<br /><input :value="range" ref={range} @change="handleRange" type="range" :min="0.1"
                :max="5.45" :step=".05" /></label>
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
            zoom: 0,
            range: 0
        }
    },
    methods: {
        getCropped: function () {
            this.$refs.result.children[0].src = this.cropperInstance.getCroppedImage().src;
        },
        handleZoom: function (e) {
            this.zoom = e.target.value
            this.cropperInstance.zoom(this.zoom);
        },
        handleRange: function (e) {
            this.range = e.target.value
            this.cropperInstance.rotate(this.range);
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