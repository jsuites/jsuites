title: Javascript tags events
keywords: Javascript, tagging, javascript tags, keywords, examples, events
description: Learn how to use events on the javascript tags plugin.

* [JavaScript tags](/docs/v4/javascript-tags)

JavaScript events
=================

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<i>Press enter, comma or tab for the next keyword.</i>
<div id="tags"></div>

<script>
jSuites.tags(document.getElementById('tags'), {
    value: 'apples,pears,oranges',
    // Events
    onbeforechange: function() {
        console.log(arguments);
    },
    onchange: function() {
        console.log(arguments);
    },
    onfocus: function() {
        console.log(arguments);
    },
    onblur: function() {
        console.log(arguments);
    },
    onload: function() {
        console.log(arguments);
    },
});
</script>
</html>
```
