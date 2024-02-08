title: JavaScript Activity Heatmap Plugin
keywords: JavaScript, heatmap, heatmap plugin, JS heatmap, Javascript heatmap, activity visualization, lightweight plugin
description: This plugin enables the creation of GitHub-style activity heatmaps using JavaScript, allowing for an intuitive representation of user activity data over time.

# JavaScript Activity Heatmap

The `jSuites.heatmap` is a JavaScript plugin to embed GitHub-style activity heatmaps into web applications. It enables developers to visually represent user activity data, offering insights into patterns and trends.  

## Documentation

### Methods

| Method         | Description                                                     |
|----------------|-----------------------------------------------------------------|
| getData();     | Return an array with the same values as the plugin's data array |
| setData(data); | Change the plugin's data array to the array passed as argument  |


### Events

| Method | Description                                                                       |
|--------|-----------------------------------------------------------------------------------|
| onload | when the plugin loads.  <br>`onload(DOMElement element, Object instance) => void` |

### Initialization options

| Property                                           | Description                                                       |
|----------------------------------------------------|-------------------------------------------------------------------|
| title: string                                      | The title of the heat map.                                        |
| data: Array({ date: 'yyyy-mm-dd', value: number }) | The plugin days and its values.                                   |
| date: 'yyyy-mm-dd'                                 | The starting day of the plugin.                                   |
| colors: string[]                                   | The colors used to fill the days. Must be an array with 5 colors. |
| tooltip: boolean                                   | Caption applied at the end of the plugin.                         |


## Examples

### Activity heatmap basic example

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.js"></script>

<div id='root'></div>

<script>
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

jSuites.heatmap(document.getElementById('root'), {
    title: 'Example',
    data: year,
    date: initialDate,
    colors: ['#B2DFDB', '#4DB6AC', '#009688', '#00796B', '#004D40'],
    tooltip: true,
});
</script>
</html>
```


### Displaying title and showing tooltip

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.js"></script>

<div id='root'></div>

<script>
var initialDate = '2021-07-15';

var year = [];
var date = new Date(initialDate);

while (year.length < 366) {
  year.push({
    date: date.toISOString().slice(0, 10),
    value: Math.random() * 10,
  });

  date.setDate(date.getDate() + 1);
}

jSuites.heatmap(document.getElementById('root'), {
  data: year,
  date: initialDate,
  title: 'This is the title',
  tooltip: true,
});
</script>
</html>
```
