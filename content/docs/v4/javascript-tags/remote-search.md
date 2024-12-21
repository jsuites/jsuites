title: Javascript tags remote searching
keywords: Javascript, tagging, javascript tags, keywords, examples, remote search, remote suggestions
description: Enable the autocomplete suggestions in your javascript tags plugin.

* [JavaScript tags](/docs/v4/javascript-tags)

Tag suggestion
==============

Remote search
-------------

In the following example, the plugin will search remotely for suggestions. Please enter a list of email addresses.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="tags"></div>

<p><input type='button' value='Get the values' id='getvaluebtn'></p>

<script>
let tags = jSuites.tags(document.getElementById('tags'), {
    value: [{ text:'Contact', value:'contact@jspreadsheet.com' }],
    search: '/docs/data?q=',
    placeholder: 'To'
});

getvaluebtn.onclick = () => alert(tags.getValue())
</script>
</html>
```

Local search
------------

In the following example, the plugin will search within the array given to it. Please, enter a list of fruit.

  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="tags-local"></div>

<p><input type='button' value='Get the values' id='getvaluebtn2'></p>

<script>
var tagsLocal = jSuites.tags(document.getElementById('tags-local'), {
    search: [
        "apple",
        "watermelon",
        "orange",
        "strawberry",
        "grape",
        "cherry",
        "mango",
        "nectarine",
        "banana",
        "pomegranate"
    ],
    placeholder: 'Fruits'
});

getvaluebtn2.onclick = () => alert(tagsLocal.getValue())
</script>
</html>
```

