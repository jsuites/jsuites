title: Responsive JavaScript Color Picker
keywords: Javascript, color picker, color picker, examples, customize the colors
description: How to customize the colors on the jSuites javascript color plugin.

* [JavaScript Color Picker](/docs/color-picker)

Responsive JavaScript color Picker
=================================

The fullscreen initiation flag can be used to open the color picker in fullscreen mode. The `jSuites.color` will automatically set this as true for screens lower than 800 pixels.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<input id='color-picker' />
<script>
jSuites.color(document.getElementById('color-picker'), {
    fullscreen: true,
});
</script>
</html>
```
