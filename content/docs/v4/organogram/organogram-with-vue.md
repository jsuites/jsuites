title: Vue organogram
keywords: Javascript, organogram, organogram plugin, JS organogram, examples, example, vuejs, vuejs integration
description: How to create a javascript organogram using Vuejs.

* [Vue Organogram](/docs/v4/organogram)

Vue organogram
==============

Vue organogram [working example](https://codesandbox.io/s/jsuites-vue-organogram-g6zmy) on codesandbox.

  

Component installation
----------------------

```bash
npm i @jsuites/organogram
```
  

Organogram component
--------------------

```vue
<template>
  <div ref="organogram"></div>
</template>
  
<script>
import organogram from "@jsuites/organogram";
import "@jsuites/organogram/organogram.css";

export default {
  name: "Organogram",
  props: {
    properties: Object,
  },
  mounted: function () {
    organogram(this.$refs.organogram, this.$props.properties);
  },
};
</script>
```
  

Component usage
---------------

```vue
<template>
  <div id="app">
    <h3>Vue organogram example</h3>
    <Organogram
      v-bind:properties="{
        width: 460,
        height: 420,
        onclick: handleOrganogramClick,
        data: [
          {
            id: 1,
            name: 'Jorge',
            role: 'CEO',
            parent: 0,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 2,
            name: 'Antonio',
            role: 'Vice president',
            parent: 1,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 3,
            name: 'Manoel',
            role: 'Production manager',
            parent: 1,
            status: '#D3D3D3',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 4,
            name: 'Pedro',
            role: 'Intern',
            parent: 3,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 5,
            name: 'Carlos',
            role: 'Intern',
            parent: 3,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 6,
            name: 'Marcos',
            role: 'Marketing manager',
            parent: 2,
            status: '#D3D3D3',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 7,
            name: 'Ana',
            role: 'Sales manager',
            parent: 2,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 8,
            name: 'Nicolly',
            role: 'Operations manager',
            parent: 2,
            status: '#D3D3D3',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 9,
            name: 'Paulo',
            role: 'Sales assistant',
            parent: 7,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
          {
            id: 10,
            name: 'Iris',
            role: 'Sales assistant',
            parent: 7,
            status: '#90EE90',
            img:
              'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
          },
        ],
        vertical: false,
      }"
    />
  </div>
</template>
  
<script>
import Organogram from "./components/Organogram";

export default {
  name: "App",
  components: {
    Organogram,
  },
  methods: {
    handleOrganogramClick: function (el, obj, event) {
      console.log(event.target);
    },
  },
};
</script>
```
