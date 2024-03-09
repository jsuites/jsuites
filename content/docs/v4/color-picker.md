title: Javascript Color Picker Plugin
keywords: Javascript, color picker, color picker
description: Vanilla javascript color picker plugin.

JavaScript color picker
=======================

The `jSuites.color` is a lightweight JavaScript color picker plugin. It can be used as a vanilla plugin or a webcomponent and can be integrated with React, Angular, Vue, or any other JS library. The color picker allows users to choose a color in a responsive color grid and perform actions using the available events such as `onchange`. The available colors can be easily customized. This plugin brings a great user experience across different devices, independent of the screen site.

* React, Angular, Vue compatible;
* Mobile friendly;
* Color picker;
* Customize colors and palettes;
* Several events and easy integration;
* JS plugin or web component;

Examples
--------

  

### Color picker

Create a input color picker as a web component

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<jsuites-color value="#009688"></jsuites-color>
<script>
document.querySelector('jsuites-color').addEventListener('onchange', function(e) {
    // Set the font color
    e.target.children[0].style.color = this.value;
    // Show on console
    console.log('New value:' + this.value);
});
</script>
</html>
```
  
  

### Custom colors

How to create a color input with custom colors from a HTML input.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<input id="color-picker"/>
<script>
jSuites.color(document.getElementById('color-picker'), {
    palette: [
        ['#001969', '#233178', '#394a87', '#4d6396', '#607ea4', '#7599b3' ],
        ['#00429d', '#2b57a7', '#426cb0', '#5681b9', '#6997c2', '#7daeca' ],
        ['#3659b8', '#486cbf', '#597fc5', '#6893cb', '#78a6d1', '#89bad6' ],
        ['#003790', '#315278', '#48687a', '#5e7d81', '#76938c', '#8fa89a' ],
    ]
});
</script>
</html>
```
  
  

Documentation
-------------

### Methods

| Method | Description |
| --- | --- |
| color.open(); | Open the color picker |
| color.close(boolean); | Close the color picker  <br>@param int ignoreEvents - Do no execute onclose event |
| color.getValue(); | Get the current value of the color picker |
| color.setValue(string); | Set a new value to the color picker  <br>@param hex newColor - Set a new value |

  
  

### Events

| Method | Description |
| --- | --- |
| onchange | Method executed when a value is changed.  <br>(HTMLElement element, String color) => void |
| onclose | Method executed when the color picker is closed.  <br>(HTMLElement element) => void |
| onopen | Method executed when the color picker is opened.  <br>(HTMLElement element) => void |

  
  

### Initialization settings

| Property | Description |
| --- | --- |
| fullscreen: boolean | Open the color picker in fullscreen mode. Default: false |
| value: string | Initial value of the compontent |
| palette: Array of colors | Custom colors |
| placeholder: string | The default instruction text on the element |
| closeOnChange: boolean | Automatically close the color picker container when on color is selected |
| doneLabel: string | Done button label |
| resetLabel: string | Reset button label |

  
  

Examples
--------

* [Basic color picker](/docs/v4/color-picker/basic)
* [Color picker Events](/docs/v4/color-picker/events)
* [Custom colors](/docs/v4/color-picker/custom-colors)
* [Color Palettes](/docs/v4/color-picker/color-palettes)
* [Responsive color picker](/docs/v4/color-picker/mobile)
