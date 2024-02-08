title: HTML editor basic example
keywords: Javascript, HTML editor, plugin, wysiwyg editor, examples, basic example
description: Basic example of the jsuites HTML editor.

Richtext Editor
===============

A simple basic HTML editor

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="editor"></div>

<p><input type='button' value='Get data' id='getdatabtn'></p>

<script>
let editor = jSuites.editor(document.getElementById('editor'), {
    allowToolbar: true,
    value:'<b>This is a basic example...</b>'
});

getdatabtn.onclick = () => alert(editor.getData())
</script>
</html>
```
