title: Javascript tags basic example
keywords: Javascript, tagging, javascript tags, keywords, examples, basic example
description: A javascript tags plugin basic example.

* [JavaScript tags](/docs/v4/javascript-tags)

JavaScript tags input
=====================

Simple keywords and tags editor.


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<i>Press enter, comma or tab for the next keyword.</i>
<div id="tags"></div>

<script>
jSuites.tags(document.getElementById('tags'), {
    placeholder: 'Keywords',
});
</script>
</html>
```
