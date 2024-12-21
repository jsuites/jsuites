title: VueJS color picker
keywords: Javascript, color picker, color picker, examples, react
description: Create a color picker component with VueJS and jSuites

{.white}
> A new version of the jSuites **JavaScript Color Picker** plugin is available here.
> <br><br>
> [JavaScript Color Picker v5](/docs/color-picker){.button .main target="_top"}


Vue color picker
================

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-vue-color-picker-eilb3)

Color picker component
----------------------

```vue
<template>
  <input ref="color" />
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
  name: "Color",
  props: {
    properties: Object,
  },
  mounted: function () {
    jSuites.color(this.$refs.color, this.$props.properties);
  },
};
</script>
```

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue color picker example</h3>
    <Color
      v-bind:properties="{
        value: value,
        closeOnChange: true,
        onchange: handleColorChange,
      }"
    />
    <h3>New value is: {{ value }}</h3>
  </div>
</template>
  
<script>
import Color from "./components/Color";

export default {
  name: "App",
  components: {
    Color,
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
    handleColorChange: function (el, newValue) {
      this.setValue(newValue);
    },
  },
};
</script>
```
