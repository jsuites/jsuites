title: Javascript Picker
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, developer guide, plugin implementation, usage documentation
description: Access comprehensive documentation for the Javascript Picker Plugin, covering detailed implementation steps, usage examples, and configuration options tailored for developers.
canonical: https://jsuites.net/docs/picker

# JavaScript Picker

The `jSuites.picker` is a responsive JavaScript plugin designed for easy option selection within web applications. Key features include its adaptability to different screen sizes, a user-friendly interface, customization capabilities, lightweight design for fast performance, and broad compatibility across browsers and devices.


## Documentation

### Methods

| Method         | Description                                                             |
|----------------|-------------------------------------------------------------------------|
| getLabel(int); | Return the option at the specified position  <br>@param - element index |
| open();        | Open the picker                                                         |
| close();       | Closes the picker                                                       |
| getValue();    | Returns the index corresponding to the current selected element         |
| setValue(int); | Define the option at the specified position as the picker value         |


### Events

The order of the onchange methods has changed from 4.2.0

| Method   | Description                                                                                                                            |
|----------|----------------------------------------------------------------------------------------------------------------------------------------|
| onchange | When the value is changed  <br>`onchange(DOMElement element, Object instance, String value, String value, Number selectIndex) => void` |
| onclose  | When the picker is closed  <br>`onclose(DOMElement element, Object instance) => void`                                                  |
| onopen   | When the picker is open  <br>`onopen(DOMElement element, Object instance) => void`                                                     |


### Initialization options

| Property         | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| data: string[]   | The picker options.                                                       |
| value: int       | The position of the initial picker option.                                |
| content: string  | The html or material-design icon that should be in front of the picker.   |
| width: number    | The picker width.                                                         |
| render: function | How each option should be shown.  <br>`function(string option) => string` |


## Examples

### Load picker basic example

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div class='row'>
    <div class='column p10'>
        <div id='picker'></div>
    </div>
</div>

<script>
  jSuites.picker(document.getElementById('picker'), {
    data: ['Option1', 'Option2', 'Option3'],
    value: 3,
  })
</script>
</html>
```
```jsx
import { Picker } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const picker = useRef(null);

    return (
        <div className="App">
            <Picker ref={picker} data={['Option1', 'Option2', 'Option3']} value={2} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Picker ref="picker" :data="['Option1', 'Option2', 'Option3']" :value="2" />
</template>

<script>
import { Picker } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Picker
    },
};
</script>
```
