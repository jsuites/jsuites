title: JavaScript Five-Star Rating Plugin
keywords: JavaScript, Rating, Five-Star Rating Plugin
description: Embed a lightweight (1Kb) five-star rating system in your web apps with `jSuites.rating`, a versatile Vanilla JavaScript plugin that works as a standalone component and within web frameworks.

![JavaScript Five-Star Rating Plugin](img/js-rating.svg)

Javascript Five-Star Rating
=================

## Overview

The `jSuites.rating` plugin is designed to be easily integrated into various web development environments. Its compatibility with frameworks like React, Angular, and VueJS and its mobile-friendly design makes it versatile for adding rating functionality to web applications.

- React, Angular, and VueJS compatible.
- Mobile-friendly interface.
- Easy to integrate with several events.
- Available as both a JavaScript plugin and a web component.

## Documentation

### Available Methods

| Method           | Description                                                  |
|------------------|--------------------------------------------------------------|
| getValue();      | Get the current value                                        |
| setValue(number) | Set a new value  <br>@param {int} newValue - Set a new value |
 

### Initialization properties

| Property       | Description                                                                          |
|----------------|--------------------------------------------------------------------------------------|
| number: number | How many stars to be rendered. Default: 5                                            |
| value: number  | Initial value. Default: null                                                         |
| tooltip: array | Legend for the stars. Default: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ] |
 

### Available Events

| Method   | Description                                                                                       |
|----------|---------------------------------------------------------------------------------------------------|
| onchange | Trigger a method when value is changed.  <br>onchange(element: DOMElement, value: number) => void |


## Examples

### Five-Star Rating Web Component

Here's a quick example of a five-star rating with a specified value and tooltip:

{.all}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<jsuites-rating value="4" tooltip="Ugly, Bad, Average, Good, Outstanding"></jsuites-rating>

<div id='console'></div>

<script>
document.querySelector('jsuites-rating').addEventListener('onchange', function(e) {
    document.getElementById('console').innerHTML = 'New value: ' + this.value;
});
</script>
</html>
```

### Basic Example with Events

Basic example of a five-star rating embed in a web application.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<span id='rating1'></span>

<script>
let instance = jSuites.rating(document.getElementById('rating1'), {
    value: 4,
    tooltip: ['Ugly', 'Bad', 'Average', 'Good', 'Outstanding'],
    onchange: function () {
        console.log('changed');
    }
});
</script>
</html>
```
```jsx
import { useRef } from 'react';
import { Rating } from 'jsuites/react';
import 'jsuites/dist/jsuites.css'

function App() {
    const rating = useRef();
    const console = useRef();

    const handleChange = function(el, v) {
        console.current.innerHTML = 'New value: ' + v;
    }

    return (
        <div className="App">
            <Rating
                ref={rating}
                value={4}
                tooltip={['Ugly', 'Bad', 'Average', 'Good', 'Outstanding']}
                onchange={handleChange}
            />
            <div ref={console}></div>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Rating ref="rating" :value="4" :tooltip="['Ugly', 'Bad', 'Average', 'Good', 'Outstanding']" :onchange="handleChange" />
    <div ref="console"></div>
</template>

<script>
import { Rating } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Rating
    },
    methods: {
        handleChange: function (_, v) {
            this.$refs.console.innerHTML = 'New value: ' + v;
        }
    }
};
</script>
```

### Custom Number Of Stars

Customize the number of stars for the rating plugin with events.
  
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<span id='rating2'></span>

<p><input type="button" value="setValue(2)" id="button" /></p>

<script>
let instance = jSuites.rating(document.getElementById('rating2'), {
    number: 10,
    tooltip: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
    onchange: function () {
        console.log('changed');
    }
});
    
document.getElementById('button').addEventListener('click', () => {
    instance.setValue(2);
}) 
</script>
</html>
```
```jsx
import { useRef } from 'react';
import { Rating } from 'jsuites/react';
import 'jsuites/dist/jsuites.css'

function App() {
    const rating = useRef();

    const setValue = function() {
        rating.current.setValue(2);
    }

    const onChange = function() {
        console.log('rating value changed')
    }

    return (
        <div className="App">
            <Rating ref={rating} number={10} tooltip={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onchange={onChange} />
            <button onClick={setValue}>SetValue(2)</button>
        </div>
    );
}

export default App;
```
```vue 
<template>
    <Rating ref="rating" :number="10" :tooltip="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :onchange="onChange" />
    <button @click="setValue">SetValue(2)</button>
</template>

<script>
import { Rating } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Rating
    },
    methods: {
        setValue: function () {
            this.$refs.rating.current.setValue(2);
        },
        onChange: function () {
            console.log('rating value changed')
        }
    }
};
</script>
```
