title: Javascript Heatmap Plugin with Jsuites v4
keywords: Javascript, heatmap, heatmap plugin, JS heatmap, Javascript heatmap
description: A lightweight javascript activity github-like heatmap plugin.
canonical: https://jsuites.net/docs/v4/heatmap

JavaScript heatmap
==================

`jSuites.heatmap` is a lightweight JavaScript plugin to create a github-like activity heatmap chart.  

Activity heatmap basic example
------------------------------

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
    title: 'Example',
    data: year,
    date: initialDate,
    colors: ['#B2DFDB', '#4DB6AC', '#009688', '#00796B', '#004D40'],
    tooltip: true,
});
</script>
</html>
```
  
  

Quick reference
---------------

Go to the [Quick reference](/docs/v4/heatmap/quick-reference)  
  

More examples
-------------

* [Basic example](/docs/v4/heatmap/basic)
* [How set the colors](/docs/v4/heatmap/colors)
* [How define a title and show the tooltip](/docs/v4/heatmap/title-and-tooltip)