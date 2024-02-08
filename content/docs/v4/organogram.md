title: JavaScript organogram
keywords: Javascript, organogram, organogram plugin, JS organogram
description: Create amazing interactive web-based JavaScript organogram

Javascript Organogram
=====================

The jSuites `organogram` is a very light javascript plugin to allow developers to create a organogram map with some features, such as:

* Navigation
* Zoom
* Events and programmatically actions

![](img/js-organogram.svg)

  

Basic example
-------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
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

Quick documentation for the organogram plugin
---------------------------------------------

### Methods

| Method | Description |
| --- | --- |
| org.refresh() | resets the organogram chart to its initial state. |
| org.addItem(item: object) | Appends a new item in the organogram chart.  <br>@param item - item object to be added. |
| org.removeItem(item: object) | Removes a item in the organogram chart.  <br>@param item - item object to be removed. |
| org.show(id: int) | Show or hide children of a organogram item.  <br>@param id - item id. |
| org.search(query: string) | Search for a specific item in the organogram chart.  <br>@param query - search term. |
| org.setDimensions(width: number,height: number) | Defines the dimensions of the organogram container. |

  
  

### Events

| Method | Description |
| --- | --- |
| onload | Trigger a method when component is loaded.  <br>`onload(DOMElement element, Object obj) => void` |
| onchange | Trigger a method when an item is added to the organogram chart.  <br>`onchange(DOMElement element, Object obj) => void` |
| onclick | Trigger a method when element is clicked.  <br>`onclick(DOMElement element, Object obj, DOMEvent e) => void` |

  
  

### Initialization settings

| Property | Description |
| --- | --- |
| url: string | Data can be loaded from a external file. |
| data: mixed | Data to be rendered. |
| zoom: int | Zoom speed on mouse wheel. Defaults to 0.1 |
| vertical: boolean | Enables or disables the vertical view of the organization chart. Defaults to false. |
| width: number | Organogram container width. |
| height: number | Organogram container height. |
| search: boolean | Enables or disables a search input. Defaults to true. |
| searchPlaceHolder: string | Defines a placeholder for the search. |

