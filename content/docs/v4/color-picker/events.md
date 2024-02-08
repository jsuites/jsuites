title: Javascript color picker events
keywords: Javascript, color picker, color picker, examples, events
description: Handling javascript events in your color picker plugin.

* [JavaScript Color Picker](/docs/v4/color-picker)

Javascript color picker events
==============================

Create actions when the color is selected and the picker is opened or closed.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id="color-picker" />

<script>
jSuites.color(document.getElementById('color-picker'), {
    onchange: function(el, val) {
        el.style.color = val;
    },
    onopen: function(el) {
        console.log('Opened');
    },
    onclose: function(el) {
        console.log('Closed');
    },
    placeholder: 'COLOR',
    closeOnChange: true,
});
</script>
</html>
```

