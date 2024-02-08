title: Multiple option javascript dropdown
keywords: javascript, autocomplete, javascript dropdown, multiple option dropdown
description: How to create a multiple option jsuites javascript dropdown.

* [JavaScript autocomplete dropdown plugin](/docs/v4/dropdown-and-autocomplete)

Javascript dropdown
===================

The example below shows how to create a multiple options JavaScript dropdown.

  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data: [
        'City of London',
        'City of Westminster',
        'Kensington and Chelsea',
        'Hammersmith and Fulham', // (...)
    ],
    width: '280px',
    multiple: true,
});
</script>
</html>
```

