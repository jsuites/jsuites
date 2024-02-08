title: Javascript image slider quick reference
keywords: Javascript, slider, image slider, slider plugin, JS image slider, Javascript image slider, quick reference, documentation
description: jSuites image slider plugin quick reference documentation.

* [Image slider](/docs/v4/image-slider)

Javascript image slider
=======================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="slider">
<img src='/templates/v4/img/car.jpeg'>
<img src='/templates/v4/img/car2.jpeg'>
<img src='/templates/v4/img/car3.jpeg'>
</div>

<script type='text/loader'>
var slider = jSuites.slider(document.getElementById('slider'), {
    grid: true
});
</script>
</html>
```

  

Methods
-------

| Method | Description |
| --- | --- |
| open(); | Open the slider |
| close(); | Close the slider |
| show(imgElement); | Open the slider if it is closed, and show the image passed as argument |
| next(); | Go to the next image |
| prev(); | Go to the previous image |
| reset(); | Remove all images |

  

Events
------

| Method | Description |
| --- | --- |
| onopen | Trigger a method when the component is opened. |
| onclose | Trigger a method when the component is closed. |

  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| height: string | The picker height. |
| width: string | The picker width. |
| grid: boolean | The picker layout option. |
