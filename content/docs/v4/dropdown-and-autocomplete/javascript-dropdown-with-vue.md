title: Vuejs dropdown
keywords: javascript, autocomplete, javascript dropdown, vuejs
description: Create a dropdown component with Vuejs and jSuites

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

Vue dropdown
============

Vuejs dropdown and vuejs autocomplete [working example](https://codesandbox.io/s/jsuites-vue-dropdown-ckuxr) on codesandbox.  
  

Dropdown component
------------------

```vue
<template>
  <div ref="dropdown"></div>
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
  name: "Dropdown",
  props: {
    properties: Object,
  },
  mounted: function () {
    jSuites.dropdown(this.$refs.dropdown, this.$props.properties);
  },
};
</script>
```

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue dropdown example</h3>
    <Dropdown
      v-bind:properties="{
        value: '',
        onchange: handleDropdownChange,
        data: ['Pizza', 'Hamburguer', 'Banana'],
      }"
    />
    <h3>Current Value: {{ value }}</h3>
  </div>
</template>

<script>
import Dropdown from "./components/Dropdown";

export default {
  name: "App",
  components: {
    Dropdown,
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
    handleDropdownChange: function (el, index, oldValue, newValue) {
      this.setValue(newValue);
    },
  },
};
</script>
```
