title: JavaScript Drag and Drop Plugin
keywords: JavaScript drag and drop, sortable list
description: This document introduces a JavaScript drag-and-drop plugin, a lightweight tool for creating sortable lists with interactive drag-and-drop functionality.
canonical: https://jsuites.net/docs/drag-and-drop

# Draggable list

This script has approximately 1 KB

`jSuites.sorting` is a compact JavaScript solution for creating user-friendly sortable lists. It allows for easy reordering of list items through a simple drag-and-drop interface.

## Documentation

### Methods

The plugin offers several event-driven methods to interact with the draggable elements:

| Method      | Description                                                                                                                       |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------|
| ondragstart | Called when dragging starts.                                                                                                      |
| ondragend   | Called when dragging ends.                                                                                                        |
| ondrop      | Called upon dropping an item. The method signature is `ondrop(DOMElement, int from, int to, DOMElement, DOMElement, mouseEvent).` |


## Examples

### Sorting a HTML list

Below is an example demonstrating how to use `jSuites.sorting` to make a list of items draggable:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<ul id='draggable-elements' class='cursor'>
    <li>Test 1</li>
    <li>Test 2</li>
    <li>Test 3</li>
    <li>Test 4</li>
</ul>

<script>
jSuites.sorting(document.getElementById('draggable-elements'), {
    ondrop: function() {
        console.log(arguments);
    }
});
</script>

<style>
#draggable-elements li {
    background-color: #FFF;
    padding: 3px;
    margin-bottom: 3px;
    border-radius: 3px;
    font-size: 16px;
}
</style>
</html>
```
```jsx
import jSuites from "jsuites"
import { useRef, useEffect } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const draggableElements = useRef(null);

    useEffect(() => {
        if (draggableElements.current) {
            jSuites.sorting(draggableElements.current, {
                ondrop: function() {
                    console.log(arguments);
                }
            })
        }
    }, []);

    const itemStyle = { padding: '5px', backgroundColor: '#FFF', borderRadius: '3px', marginBottom: '3px', fontSize: '16px', border: '1px solid gray', width: '50px'};

    return (
        <div className="App">
            <ul ref={draggableElements} className={'cursor'}>
                <li style={itemStyle}>Test 1</li>
                <li style={itemStyle}>Test 2</li>
                <li style={itemStyle}>Test 3</li>
                <li style={itemStyle}>Test 4</li>
            </ul>
        </div>
    );
}

export default App;
```
```vue
<template>
    <ul ref="draggableElements" id="draggableElements" class="cursor">
        <li>Test 1</li>
        <li>Test 2</li>
        <li>Test 3</li>
        <li>Test 4</li>
    </ul>
</template>

<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css"

export default {
    name: "App",
    mounted: function() {
        jSuites.sorting(this.$refs.draggableElements, {
            ondrop: function() {
                console.log(arguments);
            }
        })
    }
};
</script>

<style>
#draggableElements li {
    padding: 5px;
    margin-bottom: 3px;
    border-radius: 3px;
    font-size: 16px;
    border: solid 1px gray;
}
</style>
```

## Resources

### Working examples on JSFiddle

[jsfiddle working example](https://jsfiddle.net/hodware/804t6qe2/)
