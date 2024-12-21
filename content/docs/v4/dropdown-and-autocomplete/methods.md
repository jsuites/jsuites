title: Javascript dropdown programmatically interactions.
keywords: javascript, autocomplete, javascript dropdown, programmatically changes and updates
description: Javascript dropdown programmatically changes and updates.

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

Programmatically changes
========================

Interacting with the dropdown via JavaScript


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input type='button' value='Open the dropdown' class='jbutton dark' id='openbtn'>
<input type='button' value='Close the dropdown' class='jbutton dark' id='closebtn'>
<input type='button' value='Set value to: SQL' class='jbutton dark' id='setvalbtn'>
<input type='button' value='Reset values' class='jbutton dark' id='resetbtn'><br><br>

<div id="dropdown"></div>

<script>
let dd = jSuites.dropdown(document.getElementById('dropdown'), {
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
    width:'280px'
});

openbtn.onclick = () => dd.open()
closebtn.onclick = () => dd.close()
setvalbtn.onclick = () => dd.setValue('SQL')
resetbtn.onclick = () => dd.reset()
</script>
</html>
```
