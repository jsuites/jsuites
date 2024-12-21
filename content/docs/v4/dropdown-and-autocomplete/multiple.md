title: Multiple option javascript dropdown
keywords: javascript, autocomplete, javascript dropdown, multiple option dropdown
description: How to create a multiple option jsuites javascript dropdown.

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

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

