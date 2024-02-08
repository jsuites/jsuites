title: Javascript dropdown basics
keywords: javascript, autocomplete, javascript dropdown, javascript select, examples, basic example.
description: Basic example of jsuites javascript dropdown plugin. How to create a dropdown from a select HTML tag or programmatically via JavaScript.

* [JavaScript dropdown and autocomplete plugin](/docs/v4/dropdown-and-autocomplete)

Javascript dropdown
===================

The `jSuites.dropdown` can be created from an existing <select></select> element, or via JavaScript as the examples below:

### Basic dropdown from a HTML tag

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<select name="countries" id="countries">
<option value="1">UK</option>
<option value="2">US</option>
<option value="3">Brazil</option>
<option value="4">Canada</option>
</select>

<script>
jSuites.dropdown(document.getElementById('countries'));
</script>
</html>
```

  

### Basic dropdown via JavaScript

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        'City of London',
        'City of Westminster',
        'Kensington and Chelsea',
        'Hammersmith and Fulham', // (...)
    ],
    width:'280px',
});
</script>
</html>
```

