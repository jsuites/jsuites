title: Javascript heatmap quick reference
keywords: Javascript, heatmap, heatmap plugin, JS heatmap, Javascript heatmap, quick reference, documentation
description: jSuites heatmap plugin quick reference documentation.

* [Heat map](/docs/v4/heatmap)

JavaScript Heatmap
==================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.js"></script>

<div class='row'>
    <div class='column p10'>
        <div id='heat-map'></div>
    </div>
</div>

<script>
var root = document.getElementById('heat-map');
var initialDate = '2021-01-01';

var year = [];
var date = new Date(initialDate);

while (year.length < 366) {
  year.push({
    date: date.toISOString().slice(0, 10),
    value: Math.random() * 10,
  });

  date.setDate(date.getDate() + 1);
}

var heatMap = jSuites.heatmap(root, {
  data: year,
  date: initialDate,
});
</script>
</html>
```

  
  

Methods
-------

| Method | Description |
| --- | --- |
| heatMap.getData(); | Return an array with the same values as the plugin's data array |
| heatMap.setData(data); | Change the plugin's data array to the array passed as argument |

  
  

Events
------

| Method | Description |
| --- | --- |
| onload | when the plugin loads.  <br>`onload(DOMElement element, Object instance) => void` |

  
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| title: string | The title of the heat map. |
| data: Array({ date: 'yyyy-mm-dd', value: number }) | The plugin days and its values. |
| date: 'yyyy-mm-dd' | The starting day of the plugin. |
| colors: string[] | The colors used to fill the days. Must be an array with 5 colors. |
| tooltip: boolean | Caption applied at the end of the plugin. |
