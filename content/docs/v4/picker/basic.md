title: Javascript picker basic example
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, basic
description: How to use the jSuites picker plugin.

* [JavaScript picker](/docs/v4/picker)

JavaScript picker
=================

Simple picker example.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="picker"></div>

<script>
jSuites.picker(document.getElementById('picker'), {
  data: [ 'Option1', 'Option2', 'Option3' ],
})
</script>
</html>
```
