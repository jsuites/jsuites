title: HTML editor image dropping zone.
keywords: Javascript, HTML editor, plugin, wysiwyg editor, dropping zone, image upload
description: Using the HTML editor dropping zone to help upload images or files.

Richtext Editor
===============

Learn how to enabled the richtext editor to enabled a dropping zone for images.

Drop any image in the richtext below.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="editor"></div>

<script>
jSuites.editor(document.getElementById('editor'), {
    parseURL: true,
    // Website parser is to read websites and images from cross domain
    remoteParser: '/docs/parser?url=',
    // Allowtoolbar
    allowToolbar:true,
});
</script>
</html>
```
