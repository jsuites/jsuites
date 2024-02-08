title: Javascript heatmap colors
keywords: Javascript, heat map, heatmap plugin, JS heatmap, Javascript heatmap, example, colors
description: How to set the colors of your heat map.

* [Heat map](/docs/v4/heatmap)

JavaScript Heatmap
==================

Customizing the heatmap colors  


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.js"></script>

<div id='heat-map'></div>

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

jSuites.heatmap(document.getElementById('heat-map'), {
  data: year,
  date: initialDate,
  colors: ['#FFCCBC', '#FF8A65', '#FF5722', '#E64A19', '#BF360C']
});
</script>
</html>
```
