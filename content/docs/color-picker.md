title: JavaScript Color Picker
keywords: JavaScript, Color Picker, Responsive, Framework Compatibility
description: Enhance web applications with our responsive JavaScript Color Picker. It is compatible with React, Angular, and Vue and offers customizable color selections for diverse projects.

![JavaScript Color Picker](img/js-color-picker.svg)

# JavaScript color picker

The `jSuites.color` is a versatile and lightweight JavaScript color picker for seamless integration into web projects. Whether you're working with standalone applications or incorporating them into React, Angular, or Vue frameworks, this colour picker is engineered for adaptability. It offers a straightforward and intuitive color selection interface, enhancing the user experience. Key features include:

- **Framework Compatibility**: Works effortlessly with popular frameworks like React, Angular, and Vue;
- **Mobile-Optimized**: Delivers a responsive and mobile-friendly user interface;
- **Customization**: Allows tailored color choices and palette configurations;
- **Event Integration**: Supports various events to help with integrations;
- **Versatility**: Can be utilized as a JavaScript plugin or web component;


## Documentation

### Install

```bash
npm install jsuites
```

### Methods

| Method                  | Description                                                                       |
|-------------------------|-----------------------------------------------------------------------------------|
| color.open();           | Open the color picker                                                             |
| color.close(boolean);   | Close the color picker  <br>@param int ignoreEvents - Do no execute onclose event |
| color.getValue();       | Get the current value of the color picker                                         |
| color.setValue(string); | Set a new value to the color picker  <br>@param hex newColor - Set a new value    |

### Events

| Method   | Description                                                                               |
|----------|-------------------------------------------------------------------------------------------|
| onchange | Method executed when a value is changed.  <br>(HTMLElement element, String color) => void |
| onclose  | Method executed when the color picker is closed.  <br>(HTMLElement element) => void       |
| onopen   | Method executed when the color picker is opened.  <br>(HTMLElement element) => void       |

### Initialization settings

| Property                 | Description                                         |
|--------------------------|-----------------------------------------------------|
| fullscreen: boolean      | Whether to open in fullscreen mode. Default: false. |
| value: string            | Initial value of the compontent                     |
| palette: Array of colors | Custom colors                                       |
| placeholder: string      | The default instruction text on the element         |
| closeOnChange: boolean   | Auto-close on color selection                       |
| doneLabel: string        | Label for the done button                           |
| resetLabel: string       | Label for the reset button                          |

## Examples

### Web Component Color Picker

Create a color picker as a web component:

{.all}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
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

### Color Picker

A basic javascript color picker event bound to an HTML input element.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<input id="basic-color-picker"/>
<script>
let color = jSuites.color(document.getElementById('basic-color-picker'), {
    onchange: function(e, color) {
        // Set the font color
        e.style.color = color;
        // Show on console
        console.log('New value:' + color);
    }
});
</script>
</html>
```
```jsx
import { Color } from 'jsuites/react'
import { useRef } from 'react'

import 'jsuites/dist/jsuites.css'

function App() {
    const color = useRef(null);

    const onChange = function(e, color) {
        // Set the font color
        e.style.color = color;
        // Show on console
        console.log('New value:' + color);
    }

    return (
        <div className="App">
            <Color ref={color} value={'#009688'} onchange={onChange} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Color value="#009688" :onchange="onChange" />
</template>

<script>
import { Color } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Color
    },
    methods: {
        onChange: function(e, color) {
            // Set the font color
            e.style.color = color;
            // Show on console
            console.log('New value:' + color);
        }
    }
};
</script>
```

### Custom Colors

Create a color input with custom colors:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<input id="custom-color-picker"/>
<script>
jSuites.color(document.getElementById('custom-color-picker'), {
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
```jsx
import { Color } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const color = useRef(null);

    return (
        <div className="App">
            <Color ref={color} palette={[
                ['#001969', '#233178', '#394a87', '#4d6396', '#607ea4', '#7599b3'],
                ['#00429d', '#2b57a7', '#426cb0', '#5681b9', '#6997c2', '#7daeca'],
                ['#3659b8', '#486cbf', '#597fc5', '#6893cb', '#78a6d1', '#89bad6'],
                ['#003790', '#315278', '#48687a', '#5e7d81', '#76938c', '#8fa89a'],
            ]} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Color :palette="palette" />
</template>

<script>
import { Color } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Color
    },
    data() {
        return {
            palette: [
                ['#001969', '#233178', '#394a87', '#4d6396', '#607ea4', '#7599b3'],
                ['#00429d', '#2b57a7', '#426cb0', '#5681b9', '#6997c2', '#7daeca'],
                ['#3659b8', '#486cbf', '#597fc5', '#6893cb', '#78a6d1', '#89bad6'],
                ['#003790', '#315278', '#48687a', '#5e7d81', '#76938c', '#8fa89a'],
            ]
        }
    }
};
</script>
```

### More Examples

* [Color Picker Events](/docs/color-picker/events)
* [Color Palettes](/docs/color-picker/color-palettes)
* [Responsive Color Picker](/docs/color-picker/mobile)
