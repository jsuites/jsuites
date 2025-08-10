title: JavaScript Organogram Plugin
description: This JavaScript Organogram Plugin lets developers quickly embed customizable, responsive organogram charts in web apps using structured JSON data.
keywords: JavaScript, Organogram, Organogram Plugin, JS Organogram, JavaScript Org Chart, Org Chart Plugin, Web Application Organogram, Responsive Organogram Charts, JSON Organogram
canonical: https://jsuites.net/docs/organogram

# JavaScript Organogram

`JavaScript Components`{.jtag .black .framework-images}

The jSuites Organogram is a lightweight and flexible JavaScript plugin that allows developers to create interactive organogram charts from JSON data. It provides essential features such as navigation controls, zoom functionality, event handling, and support for programmatically triggered actions

- Navigation controls
- Zoom functionality
- Event handling
- Programmatic actions
- Build organogram charts directly from JSON objects

## Documentation

Below are the key methods available for customizing and controlling the jSuites Organogram.

### Methods

| Method                                         | Description                                                                                                |
|------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `refresh()`                                    | Resets the organogram chart to its initial state.                                                          |
| `addItem(item: object)`                        | Appends a new item to the organogram chart.<br>@param {object} item - Item object to be added.             |
| `removeItem(item: object)`                     | Removes an item from the organogram chart.<br>@param {object} item - Item object to be removed.            |
| `show(id: int)`                                | Shows or hides children of an organogram item.<br>@param {number} id - Item ID.                            |
| `search(query: string)`                        | Searches for a specific item in the organogram chart.<br>@param {string} query - Search term.              |
| `setDimensions(width: number, height: number)` | Defines the dimensions of the organogram container.<br>@param {number} width<br>@param {number} height<br> |


### Events

The JavaScript Component provides the following events, allowing developers to respond to user interactions and changes in the organogram.

| Event     | Description                                                                                                             |
|-----------|-------------------------------------------------------------------------------------------------------------------------|
| `onload`  | Fired when the component is loaded.  <br>`onload(DOMElement element, Object obj) => void`                               |
| `onchange`| Fired when an item is added to the chart.  <br>`onchange(DOMElement element, Object obj) => void`                       |
| `onclick` | Fired when an element is clicked.  <br>`onclick(DOMElement element, Object obj, DOMEvent e) => void`                    |


### Settings

The following settings allow you to customize the behaviour and appearance of the jSuites Organogram.

| Property                  | Description                                                                         |
|---------------------------|-------------------------------------------------------------------------------------|
| `url: string`              | Loads data from an external file.                                                   |
| `data: mixed`              | Data to be rendered in the organogram.                                               |
| `zoom: int`                | Controls zoom speed on the mouse wheel. Defaults to 0.1.                             |
| `vertical: boolean`        | Enables or disables vertical view. Defaults to `false`.                              |
| `width: number`            | Sets the organogram container width.                                                 |
| `height: number`           | Sets the organogram container height.                                                |
| `search: boolean`          | Enables or turns off the search input. Defaults to `true`.                            |
| `searchPlaceHolder: string`| Defines a placeholder for the search input field.                                    |


## Examples

### Basic Example

This example demonstrates how to create a basic organogram using the jSuites Organogram plugin. The data for the organogram is sourced from an external JSON file, and the chart is configured with a vertical layout.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.css" type="text/css" />

<div id='organogram'></div>

<script>
jSuites.organogram(document.getElementById('organogram'), {
    width: 460,
    height: 420,
    url: '/plugins/organogram.json',
    vertical: true,
});
</script>
</html>
```
```jsx
import Organogram from "@jsuites/organogram";
import { useEffect } from "react";
import "@jsuites/organogram/organogram.css";

function App() {
    const organogramElement = useRef(null);

    useEffect(() => {
        if (! organogramElement.current) {
            Organogram(organogramElement.current, {
                width: 460,
                height: 420,
                url: "https://jsuites.net/plugins/organogram.json",
                vertical: true,
            });
        }
    })

    return (<>
        <div ref={organogramElement}></div>
    </>);
}

export default App;
```
```vue
<template>
    <div ref="organogram" style="padding: 10px; border:1px solid #ccc;"></div>
</template>

<script>
import Organogram from "@jsuites/organogram"
import "@jsuites/organogram/organogram.css"

export default {
    name: "App",
    mounted() {
        Organogram(this.$refs.organogram, {
            width: 460,
            height: 420,
            url: "https://jsuites.net/plugins/organogram.json",
            vertical: true,
        });
    }
}
</script>
```
