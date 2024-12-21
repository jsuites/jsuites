title: Javascript color picker with custom colors
keywords: Javascript, color picker, color picker, examples, customize the colors
description: How to customize the colors on the jsuites javascript color plugin.

{.white}
> A new version of the jSuites **JavaScript Color Picker** plugin is available here.
> <br><br>
> [JavaScript Color Picker v5](/docs/color-picker){.button .main target="_top"}


Custom color picker
===================

Integrate nice custom palettes in your application using jsuites color picker plugin.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id="color-picker" />

<script>
jSuites.color(document.getElementById('color-picker'), {
    palette: [
        ['#001969', '#233178', '#394a87', '#4d6396', '#607ea4', '#7599b3', '#8bb4c1', '#a5cfce', '#c6eada', '#ffefe0'],
        ['#00429d', '#2b57a7', '#426cb0', '#5681b9', '#6997c2', '#7daeca', '#93c4d2', '#abdad9', '#caefdf', '#ffdfe0'],
        ['#3659b8', '#486cbf', '#597fc5', '#6893cb', '#78a6d1', '#89bad6', '#9ccddb', '#b2e0df', '#cef2e2', '#efcfe0'],
        ['#003790', '#315278', '#48687a', '#5e7d81', '#76938c', '#8fa89a', '#a9bea9', '#c5d3ba', '#e1e9cc', '#efbfe0'],
    ]
});
</script>
</html>
```

  

A nice color gradient generator: [Chroma.js Color Palette Helper](https://gka.github.io/palettes/#/10|s|003790,005647,ffffe0|ffffe0,ff005e,93003a|1|1)
