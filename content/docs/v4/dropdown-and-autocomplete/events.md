title: Javascript Dropdown: Javascript Events
keywords: javascript, autocomplete, javascript dropdown, events, javascript events
description: Understanding Events on the jSuites javascript dropdown plugin.

* [JavaScript dropdown and autocomplete plugin](/docs/v4/dropdown-and-autocomplete)

Dropdown Events
======

Handling JavaScript events on the dropdown element.


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input type='button' value='Open the dropdown' class='plain' id='openbtn'>
<input type='button' value='Close the dropdown' class='plain' id='closebtn'>

<p><span id='log'></span></p>

<div id="dropdown"></div>

<script>
let myDropdown = jSuites.dropdown(document.getElementById('dropdown'), {
    data: [
        'JavaScript',
        'Python',
        'Java',
        'C/CPP',
        'PHP',
        'Swift',
        'C#',
        'Ruby',
        'Objective - C',
        'SQL',
    ],
    onchange: function(el,val) {
        document.getElementById('log').innerHTML = 'Dropdown new value is: ' + val;
    },
    onopen: function() {
        document.getElementById('log').innerHTML = 'Dropdown is opened';
    },
    onclose: function() {
        document.getElementById('log').innerHTML = 'Dropdown is closed';
    },
    width:'280px'
});

openbtn.onclick = () => myDropdown.open()
closebtn.onclick = () => myDropdown.close()
</script>
</html>
```
