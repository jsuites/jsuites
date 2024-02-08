title: Vue rating
keywords: Javascript, rating, five star rating plugin, VueJS
description: Create a javascript rating component with Vuejs and jSuites

* [Vue Rating](/docs/v4/rating)

Vue Rating
==========

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-vue-rating-7oj9u)

Rating component
----------------

```vue
<template>
  <div ref="rating"></div>
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
  name: "Rating",
  props: {
    properties: Object,
  },
  mounted: function () {
    jSuites.rating(this.$refs.rating, this.$props.properties);
  },
};
</script>
```

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue rating example</h3>
    <Rating
      v-bind:properties="{
        value: value,
        number: 10,
        tooltip: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        onchange: handleRatingChange,
      }"
    />
    <h3>New value is: {{ value }}</h3>
  </div>
</template>
  
<script>
import Rating from "./components/Rating";

export default {
  name: "App",
  components: {
    Rating,
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
    handleRatingChange: function (el, newValue) {
      this.setValue(newValue);
    },
  },
};
</script>
```
