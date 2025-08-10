title: JavaScript Image Cropper: Brightness And Contrast
keywords: Javascript, image cropper, cropper plugin, JS cropper, web components, JS crop, examples.
description: Example on how to implement controls and how apply filters such as brightness and contrast programmatically.
canonical: https://jsuites.net/docs/image-cropper/brightness-and-contrast-filters

# JavaScript Image Cropper: Brightness And Contrast

## Examples

How to implement a image cropper with brightness and contract controls using the javascript cropper plugin.  

{.transparent}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
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
    value: '/templates/default/img/download-lemonadejs.png',
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
```jsx
import Cropper from "@jsuites/react-cropper";
import { useRef, useState } from "react";
import '@jsuites/cropper/cropper.css'

function App() {
    const cropper = useRef(null);
    const result = useRef(null);
    const brightnessRef = useRef(null);
    const contrastRef = useRef(null);

    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);

    const getCropped = function () {
        result.current.children[0].src = cropper.current.getCroppedImage().src;
    }

    const handleBrightness = function (e) {
        setBrightness(e.target.value)
        cropper.current.brightness(e.target.value);
    }

    const handleContrast = function (e) {
        setContrast(e.target.value)
        cropper.current.contrast(e.target.value);
    }

    return (<>
        <div style={{ display: 'flex' }}>
            <Cropper ref={cropper} area={[280, 280]} crop={[150, 150]} style={{ border: '1px solid #ccc' }} />
            <div ref={result}><img style={{ width: '120px', height: '120px', margin: '5px' }} /></div>
        </div>

        <div style={{ display: 'flex', padding: '20px' }}>
            <label>
                Brightness<br /><input
                    value={brightness}
                    ref={brightnessRef}
                    onChange={handleBrightness}
                    type={"range"}
                    min={-1} max={1} step={.05}
                />
            </label>
            <label>
                Constrast<br /><input
                    value={contrast}
                    ref={contrastRef}
                    onChange={handleContrast}
                    type={"range"}
                    min={-1} max={1} step={.05} />
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
        <Cropper ref="cropper" :area="[280, 280]" :crop="[150, 150]" style="border: 1px solid #ccc" />
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
import { Cropper } from "jsuites/vue"
import "jsuites/dist/jsuites.css"

export default {
    name: "App",
    components: { Cropper },
    data() {
        return {
            brightness: 0,
            contrast: 0
        }
    },
    methods: {
        getCropped: function () {
            this.$refs.result.children[0].src = this.$refs.cropper.current.getCroppedImage().src;
        },
        handleBrightness: function (e) {
            this.brightness = e.target.value
            this.$refs.cropper.current.brightness(this.brightness);
        },
        handleContrast: function (e) {
            this.contrast = e.target.value
            this.$refs.cropper.current.contrast(this.contrast);
        }
    }
}
</script>
```

### More examples

More examples using our JavaScript Cropper plugin.

* [Image Cropper example on jsFiddle](https://jsfiddle.net/spreadsheet/1a5mts0u/)
* [Image Brightness and Contrast](/docs/image-cropper/brightness-and-contrast-filters)
* [Image Rotate and Zoom](/docs/image-cropper/rotate-and-zoom)
