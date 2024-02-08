title: Responsive JavaScript color picker
keywords: Javascript, color picker, color picker, examples, customize the colors
description: How to customize the colors on the jsuites javascript color plugin.

* [JavaScript Color Picker](/docs/v4/color-picker)

Reponsive JavaScript color picker
=================================

The fullscreen initiation flag can be used to open the color picke in fullscreen mode. The `jSuites.color` will automatically set this as true for screens lower than 800 pixels.


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='color-picker'>

<script>
jSuites.color(document.getElementById('color-picker'), {
    fullscreen: true,
});
</script>
</html>
```
