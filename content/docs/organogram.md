title: JavaScript Organogram Plugin
keywords: JavaScript, Organogram, Organogram Plugin, JS Organogram
description: The JavaScript Organogram Plugin is a powerful tool for creating captivating and interactive web-based organograms.

![JavaScript Organogram](img/js-organogram.svg)

# JavaScript Organogram

The jSuites Organogram is a lightweight JavaScript plugin that enables developers to create interactive organogram maps. This plugin offers essential features, including navigation, zoom functionality, and support for events and programmatically triggered actions, enhancing the versatility of organogram visualization in web applications.

- Navigation;
- Zoom;
- Events and programmatically actions;
- Create an organogram map from a JSON object;


## Documentation

### Methods

| Method                                      | Description                                                                             |
|---------------------------------------------|-----------------------------------------------------------------------------------------|
| refresh()                                   | resets the organogram chart to its initial state.                                       |
| addItem(item: object)                       | Appends a new item in the organogram chart.  <br>@param item - item object to be added. |
| removeItem(item: object)                    | Removes a item in the organogram chart.  <br>@param item - item object to be removed.   |
| show(id: int)                               | Show or hide children of a organogram item.  <br>@param id - item id.                   |
| search(query: string)                       | Search for a specific item in the organogram chart.  <br>@param query - search term.    |
| setDimensions(width: number,height: number) | Defines the dimensions of the organogram container.                                     |

### Events

| Method   | Description                                                                                                             |
|----------|-------------------------------------------------------------------------------------------------------------------------|
| onload   | Trigger a method when component is loaded.  <br>`onload(DOMElement element, Object obj) => void`                        |
| onchange | Trigger a method when an item is added to the organogram chart.  <br>`onchange(DOMElement element, Object obj) => void` |
| onclick  | Trigger a method when element is clicked.  <br>`onclick(DOMElement element, Object obj, DOMEvent e) => void`            |

### Settings

| Property                  | Description                                                                         |
|---------------------------|-------------------------------------------------------------------------------------|
| url: string               | Data can be loaded from a external file.                                            |
| data: mixed               | Data to be rendered.                                                                |
| zoom: int                 | Zoom speed on mouse wheel. Defaults to 0.1                                          |
| vertical: boolean         | Enables or disables the vertical view of the organization chart. Defaults to false. |
| width: number             | Organogram container width.                                                         |
| height: number            | Organogram container height.                                                        |
| search: boolean           | Enables or disables a search input. Defaults to true.                               |
| searchPlaceHolder: string | Defines a placeholder for the search.                                               |


## Examples

### Basic Example

The following example demonstrates the creation of a basic organogram using an external JSON file as a data source.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.css" type="text/css" />

<div id='organogram' style="padding: 10px; border:1px solid #ccc;"></div>

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
        if (!organogramElement.current) {
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
    </>
    );
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