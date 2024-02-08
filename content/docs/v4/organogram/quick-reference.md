title: JavaScript organogram - Quick reference
keywords: Javascript, organogram, organogram plugin, JS organogram, quick reference, documentation
description: Learn how to customize the JavaScript interactive web-based organogram plugin.

* [Javascript organogram](/docs/v4/organogram)

JavaScript Organogram
=====================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<script src="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.css" type="text/css" />

<div id='organogram'></div>

<script>
var org = jSuites.organogram(document.getElementById('organogram'), {
    width: 460,
    height: 420,
    url: '/plugins/organogram.json'
});
</script>
</html>
```

  
  

### Methods

| Method | Description |
| --- | --- |
| org.refresh() | Resets the organogram chart to its initial state. |
| org.addItem(item: object) | Appends a new item in the organogram chart.  <br>@param item - item object to be added. |
| org.removeItem(item: object) | Removes an item in the organogram chart.  <br>@param item - item object to be removed. |
| org.show(id) | Show or hide children of a organogram item.  <br>@param id - item id. |
| org.search(query) | Search for a specific item in the organogram chart.  <br>@param query - search term. |
| org.setDimensions(width,height) | Defines the dimensions of the organogram container. |
| org.setUrl(url) | Changes the content according to the data received by the specified url.  <br>@param url - url where the data will be obtained. |

  
  

### Events

| Method | Description |
| --- | --- |
| onload | Trigger a method when component is loaded.  <br>`onload(DOMElement element, Object obj) => void` |
| onchange | Trigger a method when an item is added to the organogram chart.  <br>`onchange(DOMElement element, Object obj) => void` |
| onclick | Trigger a method when element is clicked.  <br>`on(DOMElement element, Object obj, DOMEvent e) => void` |

  
  

### Initialization settings

| Property | Description |
| --- | --- |
| url: string | Data can be loaded from a external file. |
| data: mixed | Data to be rendered. |
| vertical: boolean | Enables or disables the vertical view of the organization chart. Defaults to false. |
| zoom: int | Zoom speed on mouse wheel. Defaults to 0.1 |
| width: number | Organogram container width. |
| height: number | Organogram container height. |
| search: boolean | Enables or disables a search input. Defaults to true. |
| searchPlaceHolder: string | Defines a placeholder for the search. |
