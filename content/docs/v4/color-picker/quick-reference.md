title: Javascript color picker quick reference
keywords: Javascript, color picker, color picker, quick reference, documentation
description: Learn how to use the jsuites color picker javascript plugin.

{.white}
> A new version of the jSuites **JavaScript Color Picker** plugin is available here.
> <br><br>
> [JavaScript Color Picker v5](/docs/color-picker){.button .main target="_top"}


Quick reference
===============

Considering the following example:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='color-picker' name='color'>

<script>
var color = jSuites.color(document.getElementById('color-picker'), {
    onchange:function(el, val) {
        document.getElementById('color-picker').style.color = val;
    }
});
</script>
</html>
```

  
  

Initialiation settings
----------------------

| Property | Description |
| --- | --- |
| fullscreen: boolean | Open the color picker in fullscreen mode. Default: false |
| value: string | Initial value of the compontent |
| palette: Array of colors | Custom colors |
| placeholder: string | The default instruction text on the element |
| closeOnChange: boolean | Automatically close the color picker container when on color is selected |
| doneLabel: string | Done button label |
| resetLabel: string | Reset button label |

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| color.open(); | Open the color picker |
| color.close(boolean); | Close the color picker  <br>@param int ignoreEvents - Do no execute onclose event |
| color.getValue(); | Get the current value of the color picker |
| color.setValue(string); | Set a new value to the color picker  <br>@param hex newColor - Set a new value |

  
  

Available events
----------------

| Method | Description |
| --- | --- |
| onchange | Method executed when a value is changed.  <br>(HTMLElement element, String color) => void |
| onclose | Method executed when the color picker is closed.  <br>(HTMLElement element) => void |
| onopen | Method executed when the color picker is opened.  <br>(HTMLElement element) => void |

  
  

Default color palette
---------------------

```javascript
[
    [ "#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1" ],
    [ "#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc" ],
    [ "#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5" ],
    [ "#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae" ],
    [ "#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c" ],
    [ "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b" ],
    [ "#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a" ],
    [ "#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64" ],
    [ "#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f" ],
    [ "#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238" ],
];
```