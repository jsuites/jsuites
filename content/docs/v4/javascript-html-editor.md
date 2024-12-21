title: JavaScript HTML Editor and Wysiwyg Plugin with Jsuites v4
keywords: Javascript, HTML editor, plugin, wysiwyg editor
description: A simple HTML editor with several interactive features and easy integration.

JavaScript HTML Editor
======================

A lightweight wysiwyg JavaScript HTML editor is available with a few native features.

1.  The HTML tags is filtered on the paste action.
2.  Javascript events for easy integration
3.  Remote URL parser and snippet integrated object.
4.  Custom toolbar
5.  Integrated file and image dropzone

![](img/js-html-editor.svg){.right}

  

Examples
--------

Basic HTML editor  
  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="editor"></div>

<p><input type='button' value='Get data' onclick='alert(editor.getData())'></p>

<script>
var editor = jSuites.editor(document.getElementById('editor'), {
    allowToolbar: true,
    value: '<b>This is a basic example...</b>'
});

</script>
</html>
```
  

### More examples

* [HTML editor Custom toolbar](/docs/v4/javascript-html-editor/custom-toolbar)
* [Image dropping zone](/docs/v4/javascript-html-editor/dropping-zone)
* [URL Snippets](/docs/v4/javascript-html-editor/website-snippet)
