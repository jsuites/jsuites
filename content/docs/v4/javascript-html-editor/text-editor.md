Richtext Editor
===============

This is just a simple editor with filters. The HTML tags is filtered in the paste action.

Examples
--------

**Mini text editor with filters**

Data to be uploaded:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="editor1"></div>

<p><input type='button' value='Get data' id='getdatabtn'></p>

<script>
let editor = jSuites.editor(document.getElementById('editor1'), {
    allowToolbar:true,
    value:'<b>This is a basic example...</b>'
});

getdatabtn.onclick = () => alert(editor.getData())
</script>
</html>
```

Methods
-------

| Method |  Description   |
| --- | --- |
| getData(); | Get editor HTML content |
| setData(); | Set editor HTML content |
