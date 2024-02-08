title: Vue picker
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, vuejs, vuejs integration
description: How to integrate the jsuites picker with Vuejs.

* [Vue Picker](/docs/v4/picker)

Vue picker
==========

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-vue-picker-z6yc8)

Picker component
----------------

```vue
<template>
  <div ref="picker"></div>
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
  name: "Picker",
  props: {
    properties: Object,
  },
  mounted: function () {
    jSuites.picker(this.$refs.picker, this.$props.properties);
  },
};
</script>
```

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue picker example</h3>
    <Picker
      v-bind:properties="{
        data: ['Option 1', 'Option 2', 'Option 3'],
        value: value,
        onchange: handlePickerChange,
      }"
    />
    <h3>Selected Index: {{ value }}</h3>
  </div>
</template>
  
<script>
import Picker from "./components/Picker";

export default {
  name: "App",
  components: {
    Picker,
  },
  data: function () {
    return {
      value: 0,
    };
  },
  methods: {
    setValue: function (newValue) {
      this.value = newValue;
    },
    handlePickerChange: function (el, obj, label, value) {
      this.value = value;
    },
  },
};
</script>
```
