title: JavaScript five star rating plugin
keywords: Javascript, rating, five star rating plugin
description: Vanilla JavaScript star rating plugin

Javascript Rating
=================

The `jSuites.rating` is a lightweight (1Kb) JavaScript star rating plugin. It can be used as a web component or a vanilla plugin as below.

* React, Angular, Vue compatible;
* Mobile friendly;
* Several events and easy integration;
* JS plugin or web component;

![](img/js-rating.svg)

  

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='rating'></div>

<script>
var myRating = jSuites.rating(document.getElementById('rating'), {
    value: 3,
    tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
});
</script>
</html>
```

### Available Methods

| Method | Description |
| --- | --- |
| myRating.getValue(); | Get the current value |
| myRating.setValue(number) | Set a new value  <br>@param int newValue - Set a new value |

  

### Initialization properties

| Property | Description |
| --- | --- |
| number: number | How many stars to be rendered. Default: 5 |
| value: number | Initial value. Default: null |
| tooltip: array | Legend for the stars. Default: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ] |

  

### Available Events

| Method | Description |
| --- | --- |
| onchange | Trigger a method when value is changed.  <br>onchange(element: DOMElement, value: number) => void |

  

Examples
--------

### Rating as a web component

Quick five start rating example with a specified value and tooltip.  

Value: 4

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<jsuites-rating value="4" tooltip="Ugly, Bad, Average, Good, Outstanding"></jsuites-rating>

<div id='console'></div>

<script>
document.querySelector('jsuites-rating').addEventListener('onchange', function(e) {
    document.getElementById('console').innerHTML = 'New value: ' + this.value;
});
</script>
</html>
```  

### JavaScript star rating plugin

Customize the number of star of the rating plugin.  
  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='rating2'></div>

<script>
jSuites.rating(document.getElementById('rating2'), {
    number: 10,
    tooltip: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
})
</script>
</html>
```
  

External references
-------------------

* [JavaScript rating](https://github.com/jsuites/jsuites/blob/master/src/rating.js) source code
* LemonadeJS [JavaScript rating component](https://lemonadejs.net/v2/library/rating)
* React [rating component](https://codesandbox.io/s/jsuites-rating-with-react-xfdmu)
