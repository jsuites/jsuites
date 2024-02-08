title: Javascript picker static front
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, static front
description: How to use a front that is not changed when changing the option.

* [JavaScript picker](/docs/v4/picker)

Static front
============

The example below shows how to use a front that is not changed when changing the option.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="picker"></div>

<script>
jSuites.picker(document.getElementById('picker'), {
  data: ['Option1', 'Option2', 'Option3'],
  content: 'more_vert',
})
</script>
</html>
```

