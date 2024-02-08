title: Javascript picker stylize options
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, stylize, style
description: How to style the picker options.

* [JavaScript picker](/docs/v4/picker)

Stylize options
===============

The example below shows how to style your options using the "render" property.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="picker"></div>

<script>
jSuites.picker(document.getElementById('picker'), {
  data: [ 'Verdana', 'Arial', 'Courier New' ],
  render: function(e) {
    return '<span style="font-family:' + e + '">' + e + '</span>';
  }
})
</script>
</html>
```
