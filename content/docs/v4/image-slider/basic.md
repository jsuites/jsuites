title: Javascript image slider basic example
keywords: Javascript, slider, image slider, slider plugin, JS image slider, Javascript image slider, example, basic
description: How to use the jSuites image slider plugin.

* [Image slider](/docs/v4/image-slider)

Javascript image slider
=======================

Simple image slider example.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="slider">
<img src='/templates/v4/img/car.jpeg'>
<img src='/templates/v4/img/car2.jpeg'>
<img src='/templates/v4/img/car3.jpeg'>
</div>

<script>
jSuites.slider(document.getElementById('slider'), {
    grid: true
});
</script>
</html>
```

