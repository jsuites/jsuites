title: Javascript Image Slider with Jsuites v4
keywords: Javascript, slider, image slider, slider plugin, JS image slider, Javascript image slider
description: A simple and lightweight javascript image slider plugin.

Javascript image slider
=======================

A simple but useful image slider plugin.

Basic slider example
--------------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="slider">
    <img src="https://jsuites.net/templates/default/img/car.jpeg"/>
    <img src="https://jsuites.net/templates/default/img/car2.jpeg"/>
    <img src="https://jsuites.net/templates/default/img/car3.jpeg"/>
</div>

<br>

<button id="open-slider" type="button" class="jbutton dark">Open the slider</button>

<script>
jSuites.slider(document.getElementById('slider'), {
    grid: true
});

document.getElementById('open-slider').addEventListener('click', function() {
    slider.open();
});
</script>
</html>
```
  

Quick reference
---------------

Go to the [Quick reference](/docs/v4/image-slider/quick-reference)

  

More examples
-------------

* [Basic slider](/docs/v4/image-slider/basic)
