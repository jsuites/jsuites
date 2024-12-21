title: Javascript dropdown with colors
keywords: javascript, autocomplete, javascript dropdown, items with colors
description: How to include colors on the javascript dropdown items.

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

JavaScript dropdown with color indication
=========================================

The example below shows how to include a color indication in the items.

  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        { color:'blue', value:'1', text:'Not started' },
        { color:'green', value:'2', text:'On development' },
        { color:'orange', value:'3', text:'Concluded' },
        { color:'red', value:'4', text:'Archived' },
    ],
    width:'280px',
});
</script>
</html>
```
