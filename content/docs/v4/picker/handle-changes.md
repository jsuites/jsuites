title: Javascript picker handle changes
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, event, onchange
description: How to trigger a function when changing the picker option.

* [JavaScript picker](/docs/v4/picker)

Handle changes
==============

The example below shows how to listen for changes in the picker.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="picker"></div>

<script>
jSuites.picker(document.getElementById('picker'), {
  data: ['Option1', 'Option2', 'Option3'],
  content: 'more_vert',
  onchange: function(element, instance, reserved, value, key) {
    // This function will be called whenever the picker value is changed
    // As this is just an example, I will just print the new picker value on the console
    console.log(value)
  }
})
</script>
</html>
```
