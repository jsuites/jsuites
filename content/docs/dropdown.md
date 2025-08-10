title: JavaScript Dropdown
keywords: JavaScript, Autocomplete, Element Picker, JavaScript Dropdown, JavaScript Select, Select Box
description: Explore comprehensive examples for managing JavaScript dropdowns, from basic setups to advanced configurations and autocomplete features. Learn to create dynamic select boxes with conditional logic for an enhanced user experience on your web application.
canonical: https://jsuites.net/docs/dropdown

# JavaScript Dropdown

The jSuites offer a lightweight **JavaScript Dropdown** plugin with a complete suite of customizable options that suites multiple
application needs. The new version brings native autocomplete, multi-select capabilities, and adaptive
rendering and other features such as:

- Great performance;
- Create dropdowns from a local array of data;
- Load data from a remote data source;
- Autocomplete with local or remote search;
- Lazy loading support;
- Multi-select dropdown options;
- Responsive dropdown rendering;
- Visual enhancements with images and icons;
- Organized dropdowns with item grouping;

## Documentation

### Methods

The `JavaScript dropdown` instance provides the following methods for programmatic interaction:

| Method                      | Description                                                                                                                                                          |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `open();`                   | Opens the dropdown.                                                                                                                                                  |
| `close(boolean);`           | Closes the dropdown.<br>`@param boolean ignoreEvents` - If true, does not trigger the `onClose` event.                                                               |
| `getText();`                | Retrieves the label(s) from the selected option(s) in the dropdown.                                                                                                  |
| `getValue();`               | Retrieves the value(s) from the selected option(s) in the dropdown.                                                                                                  |
| `setValue(string\|array);`  | Sets new value(s).<br>`@param mixed newValue` - A single value as a string or multiple values as an array for multi-select dropdowns.                                |
| `reset();`                  | Clears all selected options in the dropdown.                                                                                                                         |
| `add();`                    | Adds a new option to the dropdown.                                                                                                                                   |
| `setData(mixed);`           | Loads new data into the dropdown.<br>`@param mixed data` - The data to load.                                                                                         |
| `getData();`                | Retrieves the data currently loaded in the dropdown.                                                                                                                 |
| `setUrl(string, function);` | Updates the URL from which the dropdown fetches data.<br>`@param string url`<br>`@param function callback` - The callback function to execute after setting the URL. |
| `getPosition(string);`      | Retrieves the position of the option associated with the given value.<br>`@param string value` - The value of the option.                                            |
| `selectIndex(int);`         | Selects an option based on its index.<br>`@param int index` - The index of the option to select.                                                                     |

### Events

The following events can be use to integrate the dropdown with your application for enhanced interactivity:

| Event             | Description                                                                                                                                                                           |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onopen`          | Triggered when the dropdown opens.<br>`(DOMElement element) => void`                                                                                                                  |
| `onclose`         | Triggered when the dropdown closes.<br>`(DOMElement element) => void`                                                                                                                 |
| `onchange`        | Triggered when the selected value changes.<br>`(DOMElement element, Number index, String oldValue, String newValue, String oldLabel, String newLabel) => void`                        |
| `onfocus`         | Triggered when the dropdown receives focus.<br>`(DOMElement element) => void`                                                                                                         |
| `onblur`          | Triggered when the dropdown loses focus.<br>`(DOMElement element) => void`                                                                                                            |
| `onbeforeinput`   | Triggered before the item addition prompt is opened, allowing a customized input to be used. The return of this function is the title of the new item.<br>`(Object instance) => void` |
| `onbeforeinsert`  | Triggered before a new item is added to the dropdown.<br>`(Object instance, Object item) => void`                                                                                     |
| `oninsert`        | Triggered when a new option is added to the dropdown.<br>`(Object instance, Object item, Object dataItem) => void`                                                                    |
| `onload`          | Triggered when the dropdown is fully loaded with data.<br>`(DOMElement element, Object instance, Array data, String currentValue) => void`                                            |

### Initialization Options

Customize your dropdowns behavior with the following initial settings:

| Property                | Description                                                                                    |
|-------------------------|------------------------------------------------------------------------------------------------|
| `data: Array`           | An array of items to load into the dropdown.                                                   |
| `url: string`           | The URL of an external file to load dropdown data from.                                        |
| `multiple: boolean`     | Set to `true` to allow multiple selections.                                                    |
| `autocomplete: boolean` | Enables the autocomplete feature.                                                              |
| `type: string`          | Sets the render type. Options: `default`, `picker`, or `searchbar`.                            |
| `width: string`         | Specifies the dropdown's default width.                                                        |
| `value: string`         | Sets the initially selected value.                                                             |
| `placeholder: string`   | Displays placeholder text when no selection is made.                                           |
| `newOptions: boolean`   | Enables controls for adding new options.                                                       |
| `lazyLoading: boolean`  | Enables lazy loading for improved performance with large datasets.                             |
| `allowEmpty: boolean`   | Allow toggle the selected item on single dropdowns. Default: true                              |
| `format: 0\|1`          | Determines the data format. `0` for `{ text, value }`, `1` for `{ id, name }`. Default is `0`. |


### Dropdown Items

Each option in the dropdown is define by one object and the possible attributes are the following:

| Property            | Description                                                            |
|---------------------|------------------------------------------------------------------------|
| `value: mixed`      | The item's value. Default format.                                      |
| `text: string`      | The item's display label. Default format.                              |
| `id: mixed`         | The item's identifier, used when `format` property is set to `1`.      |
| `name: string`      | The item's name, used as a label when `format` property is set to `1`. |
| `title: string`     | A brief description of the item.                                       |
| `tooltip: string`   | Text displayed on mouseover.                                           |
| `image: string`     | URL or path to the item's icon image.                                  |
| `group: string`     | The name of the group this item belongs to.                            |
| `synonym: array`    | Keywords associated with the item to aid in search.                    |
| `disabled: boolean` | If `true`, the item is not selectable.                                 |
| `color: number`     | A numerical value representing the item's color.                       |
| `icon: string`      | A keyword for a Material Design icon associated with the item.         |


## Examples

### JavaScript Autocomplete Dropdown

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


### Grouping Items

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

Enable the New Option button, allowing users to dynamically add entries to the dropdown. The example below includes an event handler to manage actions when a user adds a new option.

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
    <Dropdown ref="dropdown" :data="data" :oninsert="onInsert" width="280px" :newOptions="true" />
</template>

<script>
import { Dropdown } from "jsuites/vue";
import jSuites from 'jsuites';
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

## More Dropdown Examples

* [JavaScript Countries Dropdown](/docs/dropdown/countries)
* [Dropdown Events](/docs/dropdown/events)
* [Responsive JavaScript Dropdown](/docs/dropdown/mobile)
