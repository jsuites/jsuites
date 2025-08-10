title: JavaScript Color Picker Events  
keywords: JavaScript, color picker, color picker events, examples, event handling, JavaScript plugin  
description: Learn how to handle JavaScript events in your color picker plugin to create interactive and dynamic user interfaces.
canonical: https://jsuites.net/docs/color-picker/events

# JavaScript Color Picker Events

## Events

Easily manage and customize events in your JavaScript color picker to create dynamic and responsive interactions for your application.

| Method   | Description                                                                                |  
|----------|--------------------------------------------------------------------------------------------|  
| onchange | Triggered when the color value changes.  <br>`(HTMLElement element, String color) => void` |  
| onclose  | Triggered when the color picker is closed.  <br>`(HTMLElement element) => void`            |  
| onopen   | Triggered when the color picker is opened.  <br>`(HTMLElement element) => void`            |

## Example

Define custom actions when a color is selected or when the picker opens or closes:

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

### More Examples

* [Color Picker Events](/docs/color-picker/events)
* [Color Palettes](/docs/color-picker/color-palettes)
* [Responsive Color Picker](/docs/color-picker/mobile)
