title: Javascript rating plugin quick reference
keywords: Javascript, rating, five star rating plugin, quick reference, documentation
description: Learn how to use this simple rating plugin.

Javascript rating plugin
========================

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

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| myRating.getValue(); | Get the current value |
| myRating.setValue(number) | Set a new value  <br>@param int newValue - Set a new value |

  
  

Initialization properties
-------------------------

| Property | Description |
| --- | --- |
| number: number | How many stars to be rendered. Default: 5 |
| value: number | Initial value. Default: null |
| tooltip: array | Legend for the stars. Default: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ] |

  
  

Available Events
----------------

| Method | Description |
| --- | --- |
| onchange | Trigger a method when value is changed.  <br>(element: DOMElement, value: number) => void |
