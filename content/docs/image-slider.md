title: JavaScript Slider
keywords: JavaScript, Slider, Image Slider, Slider Plugin, JS Image Slider, JavaScript Image Slider
description: jSuites slider is a lightweight JavaScript image slider plugin that enhances web pages with dynamic photo galleries.

JavaScript Slider
=======================

The jSuites slider offers a responsive and lightweight solution for embedding dynamic photo galleries in web applications. Its straightforward integration process and versatile options make it ideal for enriching web environments with visually captivating galleries.

## Documentation

### Install

```bash
npm install jsuites
```

### Methods

| Method            | Description                                                            |
|-------------------|------------------------------------------------------------------------|
| open();           | Open the slider                                                        |
| close();          | Close the slider                                                       |
| show(imgElement); | Open the slider if it is closed, and show the image passed as argument |
| next();           | Go to the next image                                                   |
| prev();           | Go to the previous image                                               |
| reset();          | Remove all images                                                      |


### Events

| Method  | Description                                    |
|---------|------------------------------------------------|
| onopen  | Trigger a method when the component is opened. |
| onclose | Trigger a method when the component is closed. |


### Initialization options

| Property       | Description               |
|----------------|---------------------------|
| height: string | The picker height.        |
| width: string  | The picker width.         |
| grid: boolean  | The picker layout option. |


## Examples

### Basic image slider example

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="slider">
    <img src="https://jsuites.net/templates/default/img/car.jpeg"/>
    <img src="https://jsuites.net/templates/default/img/car2.jpeg"/>
    <img src="https://jsuites.net/templates/default/img/car3.jpeg"/>
</div>

<br>

<button id="open-slider" type="button" class="jbutton dark">Open the slider</button>

<script>
jSuites.slider(document.getElementById('slider'), {
    grid: true
});

document.getElementById('open-slider').addEventListener('click', function() {
    slider.open();
});
</script>
</html>
```
```jsx
import { Slider } from "jsuites/react"
import { useRef } from "react"
import "jsuites/dist/jsuites.css"

function App() {
    const slider = useRef(null);

    return (
        <div className="App">
            <Slider ref={slider} grid={true}>
                <img src="https://jsuites.net/templates/default/img/car.jpeg"/>
                <img src="https://jsuites.net/templates/default/img/car2.jpeg"/>
                <img src="https://jsuites.net/templates/default/img/car3.jpeg"/>
            </Slider>
            <button onClick={() => { slider.current.open() }}>Open the slider</button>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Slider ref="slider" :grid="true">
      <img src="https://jsuites.net/templates/default/img/car.jpeg"/>
      <img src="https://jsuites.net/templates/default/img/car2.jpeg"/>
      <img src="https://jsuites.net/templates/default/img/car3.jpeg"/>
    </Slider>
    <button @click="this.$refs.slider.current.open();">Open slider</button>
</template>

<script>
import { Slider } from "jsuites/vue";
import "jsuites/dist/jsuites.css"

export default {
    name: "App",
    components: {
        Slider
    }
};
</script>
```

