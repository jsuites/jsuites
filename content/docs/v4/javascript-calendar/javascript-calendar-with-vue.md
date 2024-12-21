title: VueJS Calendar
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, inline javascript date picker, VueJS
description: Create a calendar picker component with Vuejs and jSuites

* [Vue Calendar](/docs/v4/javascript-calendar)

Vue Calendar
============

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/vue-calendar-4utulk)

Calendar component
------------------

```vue
<template>
  <input ref="calendar" />
</template>

<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
  name: "Calendar",
  props: {
    properties: Object,
  },
  mounted: function () {
    jSuites.calendar(this.$refs.calendar, this.$props.properties);
  },
};
</script>
```

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue calendar example</h3>
    <Calendar
      v-bind:properties="{
        value: value,
        onchange: handleCalendarChange,
      }"
    />
    <h2>Current Date: {{ value }}</h2>
  </div>
</template>

<script>
import Calendar from "./components/Calendar";

export default {
  name: "App",
  components: {
    Calendar,
  },
  data: function () {
    return {
      value: "1998-07-25",
    };
  },
  methods: {
    setValue: function (newValue) {
      this.value = newValue;
    },
    handleCalendarChange: function (el, newValue) {
      this.setValue(newValue.substr(0, 10));
    },
  },
};
</script>
```
