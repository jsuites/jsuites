title: Javascript heat map title and tooltip
keywords: Javascript, heat map, heat map plugin, JS heat map, Javascript heat map, example, title, tooltip, legend
description: How define a title and show the tooltip.

* [Heat map](/docs/v4/heatmap)

JavaScript Heatmap
==================

Displaying title and showing tooltip
--------------------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.js"></script>

<div id='heatmap'></div>

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

jSuites.heatmap(document.getElementById('heatmap'), {
  data: year,
  date: initialDate,
  title: 'This is the title',
  tooltip: true,
});
</script>
</html>
```

