title: VueJS image cropper
keywords: JavaScript image cropper, crop, vuejs image cropper
description: How to integrate the image cropper into a vue project.

* [Vue Image Cropper](/docs/v4/image-cropper)

Vue Image Cropper
===========

Vue image cropper [working example](https://codesandbox.io/s/vue-image-cropper-z6kt4p) on codesandbox.
  

Component installation
----------------------

to install the component you must have npm. Navigate to the root of your project, and enter the command below

```bash
npm i @jsuites/cropper
```
  

Cropper component
-----------------

```vue
<template>
    <div ref="cropper" style="border: 1px solid #ccc"></div>
</template>
    
<script>
import cropper from "@jsuites/cropper";
import "@jsuites/cropper/cropper.css";

export default {
    name: "Cropper",
    props: {
        properties: Object,
    },
    mounted: function () {
        cropper(this.$refs.cropper, this.$props.properties);
    },
};
</script>
```

Component usage
---------------

```vue
<template>
    <div id="app">
        <h3>Select a image</h3>
        <span>image url: {{ value }} </span>
        <Cropper
            v-bind:properties="{
                value: value,
                onchange: handleCropperChange,
                area: [300, 250],
                crop: [200, 200],
                allowResize: true,
            }"
        />
    </div>
</template>

<script>
import Cropper from "./components/Cropper";

export default {
    name: "App",
    components: {
        Cropper,
    },
    data: function () {
        return {
            value: "",
        };
    },
    methods: {
        setValue: function (newValue) {
            this.value = newValue;
        },
        handleCropperChange: function (el, imgEl) {
            this.setValue(imgEl.src);
        },
    },
};
</script>
```
