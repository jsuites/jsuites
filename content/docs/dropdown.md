title: JavaScript Dropdown
keywords: JavaScript, Autocomplete, Element Picker, JavaScript Dropdown, JavaScript Select, Select Box
description: Explore comprehensive examples for managing JavaScript dropdowns, from basic setups to advanced configurations and autocomplete features. Learn to create dynamic select boxes with conditional logic for an enhanced user experience on your web application.

![JavaScript Dropdown](img/js-dropdown.svg)

# JavaScript Dropdown

## Dropdown Overview

The `Jsuites.dropdown` is a JavaScript autocomplete dropdown that offers a suite of customizable options that present a dynamic and efficient alternative to conventional JavaScript dropdowns. Its design prioritizes lightweight and responsive characteristics, making it an ideal choice for small screens and diverse web contexts.

The upgraded JavaScript dropdown plugin enhances functionality with native autocomplete, multi-select capabilities, and adaptive rendering. Key enhancements include:

- Great performance;
- Array-sourced dropdowns;
- External JSON integration;
- Efficient autocomplete;
- Lazy loading support;
- Multi-select dropdown options;
- Adaptive, responsive design;
- Visual enhancements with images and icons;
- Organized dropdowns with item grouping;


## Examples

### JavaScript Autocomplete

Create an autocomplete dropdown capable of handling a vast dataset using this example:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    url: '/docs/large',
    autocomplete: true,
    lazyLoading: true,
    multiple: true,
    width: '280px',
});
</script>
</html>
```
```jsx
import { Dropdown } from 'jsuites/react'
import { useRef, useEffect } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const dropdown = useRef(null);

    return (
        <div className="App">
            <Dropdown
                ref={dropdown}
                url={'/docs/large'}
                multiple={true}
                lazyLoading={true}
                width={'280px'}
                autocomplete={true}
            />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Dropdown ref="dropdown" url="https://jsuites.net/docs/large" width="280px"
        :multiple="true" :lazyLoading="true" :autocomplete="true" />
</template>

<script>
import { Dropdown } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Dropdown
    },
};
</script>
```


### Dropdown Item Groups

Organize your dropdown menu with categorized item groups using this example:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        { group:'Breads', value:'1', text:'Wholemeal' },
        { group:'Breads', value:'2', text:'Wholegrain' },
        { group:'Breakfast Cereals', value:'4', text:'High fibre (wholegrain) oats' },
        { group:'Breakfast Cereals', value:'5', text:'Porridge' },
        { group:'Grains', value:'7', text:'Rice' },
        { group:'Grains', value:'8', text:'Barley' },
        { group:'Other products', value:'10', text:'Pasta' },
        { group:'Other products', value:'11', text:'Noodles' }
        ],
    width:'280px',
    autocomplete: true,
});
</script>
</html>
```
```jsx
import { Dropdown } from 'jsuites/react'
import { useRef, useEffect } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const dropdown = useRef(null);

    return (
        <div className="App">
            <Dropdown ref={dropdown} data={[
                { group: 'Breads', value: '1', text: 'Wholemeal' },
                { group: 'Breads', value: '2', text: 'Wholegrain' },
                { group: 'Breakfast Cereals', value: '4', text: 'High fibre (wholegrain) oats' },
                { group: 'Breakfast Cereals', value: '5', text: 'Porridge' },
                { group: 'Grains', value: '7', text: 'Rice' },
                { group: 'Grains', value: '8', text: 'Barley' },
                { group: 'Other products', value: '10', text: 'Pasta' },
                { group: 'Other products', value: '11', text: 'Noodles' }
            ]} width={'280px'} autocomplete={true} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Dropdown ref="dropdown" :data="data" width="280px" :autocomplete="true" />
</template>

<script>
import { Dropdown } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Dropdown
    },
    data() {
        return {
            data: [
                { group: 'Breads', value: '1', text: 'Wholemeal' },
                { group: 'Breads', value: '2', text: 'Wholegrain' },
                { group: 'Breakfast Cereals', value: '4', text: 'High fibre (wholegrain) oats' },
                { group: 'Breakfast Cereals', value: '5', text: 'Porridge' },
                { group: 'Grains', value: '7', text: 'Rice' },
                { group: 'Grains', value: '8', text: 'Barley' },
                { group: 'Other products', value: '10', text: 'Pasta' },
                { group: 'Other products', value: '11', text: 'Noodles' }
            ]
        }
    }
};
</script>
```

### Dropdown New Option

Incorporate an option to add new items into your dropdown menu, enhancing its flexibility and user interaction:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        { value:'1', text: 'Tomatoes' },
        { value:'2', text: 'Carrots' },
        { value:'3', text: 'Onions' },
        { value:'4', text: 'Garlic' },
    ],
    newOptions: true,
    oninsert: function(instance, item) {
        jSuites.ajax({
            url: '/v5/getId',
            type: 'POST',
            dataType: 'json',
            data: { data: item },
            success: function(idFromTheServer) {
                // Set the item id from the number sent by the remote server
                instance.setId(item, idFromTheServer);
            }
        });
    },
    width:'280px',
});
</script>
</html>
```
```jsx
import { Dropdown } from 'jsuites/react'
import jSuites from 'jsuites'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const dropdown = useRef(null);

    const onInsert = function (instance, item) {
        jSuites.ajax({
            url: '/v5/getId',
            type: 'POST',
            dataType: 'json',
            data: { data: item },
            success: function (idFromTheServer) {
                // Set the item id from the number sent by the remote server
                instance.setId(item, idFromTheServer);
            }
        });
    };

    return (
        <div className="App">
            <Dropdown
                ref={dropdown}
                data={[
                    { value: '1', text: 'Tomatoes' },
                    { value: '2', text: 'Carrots' },
                    { value: '3', text: 'Onions' },
                    { value: '4', text: 'Garlic' },
                ]}
                width={'280px'}
                newOptions={true}
                oninsert={onInsert}
            />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Dropdown
        ref="dropdown"
        :data="data"
        :oninsert="onInsert"
        width="280px"
        :newOptions="true"
    />
</template>

<script>
import { Dropdown } from "jsuites/vue";
import jSuites from 'jsuites'
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Dropdown
    },
    data() {
        return {
            data: [
                { value: '1', text: 'Tomatoes' },
                { value: '2', text: 'Carrots' },
                { value: '3', text: 'Onions' },
                { value: '4', text: 'Garlic' },
            ]
        }
    },
    methods: {
        onInsert: function (instance, item) {
            jSuites.ajax({
                url: '/v5/getId',
                type: 'POST',
                dataType: 'json',
                data: { data: item },
                success: function (idFromTheServer) {
                    // Set the item id from the number sent by the remote server
                    instance.setId(item, idFromTheServer);
                }
            });
        }
    }
};
</script>
```

## More dropdown examples


* [Countries Dropdown](/docs/dropdown/countries)
* [Dropdown Events](/docs/dropdown/events)
* [Responsive Autocomplete Dropdown](/docs/dropdown/mobile)
