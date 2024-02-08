title: JavaScript Color Picker Events
keywords: Javascript, color picker, color picker, examples, events
description: Handling javascript events in your color picker plugin.

* [JavaScript Color Picker](/docs/color-picker)

Javascript Color Picker Events
==============================

## Events

| Method   | Description                                                                               |
|----------|-------------------------------------------------------------------------------------------|
| onchange | Method executed when a value is changed.  <br>(HTMLElement element, String color) => void |
| onclose  | Method executed when the color picker is closed.  <br>(HTMLElement element) => void       |
| onopen   | Method executed when the color picker is opened.  <br>(HTMLElement element) => void       |

## Example

Create actions when the color is selected and the picker is opened or closed.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

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

