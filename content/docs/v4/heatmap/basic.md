title: Jaascript heatmap basic example
keywords: Javascript, heat map, heat map plugin, JS heat map, Javascript heatmap, example, basic
description: Basic github-like activity heatmap plugin.

* [Heat map](/docs/v4/heatmap)

JavaScript Heatmap
==================

Basic heatmap graph example.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/heatmap/heatmap.min.js"></script>

<div id='heatmap'></div>

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

jSuites.heatmap(document.getElementById('heatmap'), {
    data: year,
    date: initialDate,
});
</script>
</html>
```
