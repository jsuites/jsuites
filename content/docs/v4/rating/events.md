title: Javascript events
keywords: Javascript, rating, five star rating plugin, events
description: Dealing with the javascript rating plugin events.

Javascript Rating
=================

### Basic javascript vanilla example with events

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='rating'></div> <div id='console'></div>

<script>
jSuites.rating(document.getElementById('rating'), {
    value: 3,
    onchange: function(el, val) {
        document.getElementById('console').innerHTML = val + ' star selected';
    },
    tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
});
</script>
</html>
```
