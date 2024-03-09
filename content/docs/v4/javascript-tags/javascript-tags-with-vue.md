title: VueJS Keywords and Tags Component
keywords: Javascript, tagging, javascript tags, keywords, examples, vuejs
description: Create a tags javascript component with VueJS and jSuites

* [Vue Tags](/docs/v4/javascript-tags)

VueJS Tags
========

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-vue-tags-c5j2r)

Tags component
--------------

```vue
<template>
  <div ref="tags"></div>
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
  name: "Tags",
  props: {
    properties: Object,
  },
  mounted: function () {
    jSuites.tags(this.$refs.tags, this.$props.properties);
  },
};
</script>
```

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue tags example</h3>
    <Tags
      v-bind:properties="{
        value: value,
        onchange: handleTagsChange,
      }"
    />
    <h3>New value is: {{ value }}</h3>
  </div>
</template>

<script>
import Tags from "./components/Tags";

export default {
  name: "App",
  components: {
    Tags,
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
    handleTagsChange: function (el, obj, newValue) {
      this.setValue(newValue);
    },
  },
};
</script>
```
