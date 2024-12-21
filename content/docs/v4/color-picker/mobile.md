title: Responsive JavaScript Color Picker with jSuites Version 4
keywords: Javascript, color picker, color picker, examples, customize the colors
description: jSuites color picker plugin is a responsive plugin that helps improve the user experience on web applications.

{.white}
> A new version of the jSuites **JavaScript Color Picker** responsive configuration is available.
> <br><br>
> [Responsive Color Picker](/docs/color-picker/mobile){.button .main target="_top"}

Responsive JavaScript color picker
=================================

The fullscreen initiation flag can be used to open the color picker in fullscreen mode. The `jSuites.color` will automatically set this as true for screens lower than 800 pixels.


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
