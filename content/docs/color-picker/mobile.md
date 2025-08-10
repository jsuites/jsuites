title: Responsive JavaScript Color Picker  
keywords: JavaScript, color picker, responsive color picker, examples, customize colors, color picker plugin  
description: Learn how to configure the responsive behaviour of the jSuites color picker plugin, including a fullscreen mode for smaller screens.
canonical: https://jsuites.net/docs/color-picker/mobile

# Responsive JavaScript Color Picker

The fullscreen initiation flag enables the color picker to open in fullscreen mode. By default, `jSuites.color` automatically activates fullscreen mode for screens smaller than 800 pixels.

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

### More Examples

* [Color Picker Events](/docs/color-picker/events)
* [Color Palettes](/docs/color-picker/color-palettes)
* [Responsive Color Picker](/docs/color-picker/mobile)
