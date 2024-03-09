title: JavaScript Rich Text Editor
keywords: JavaScript, WYSIWYG HTML Editor, jSuites Plugin, Content Editing Tools, Web Development Integration
description: jSuites HTML editor is a JavaScript-based plugin offering an interface for HTML editing. It includes image dropzone, youtube snippets, tag users and other extensions.

Rich Text Editor
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

<p><input type='button' value='Get data' id='btn1'></p>

<script>
let editor = jSuites.editor(document.getElementById('editor1'), {
    allowToolbar:true,
    value:'<b>This is a basic example...</b>'
});

btn1.onclick = () => alert(editor.getData())
</script>
</html>
```

Methods
-------

| Method     | Description             |
|------------|-------------------------|
| getData(); | Get editor HTML content |
| setData(); | Set editor HTML content |
