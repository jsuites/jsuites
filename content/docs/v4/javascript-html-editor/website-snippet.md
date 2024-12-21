title: HTML editor snippet
keywords: Javascript, HTML editor, plugin, wysiwyg editor, retrieving remote website information
description: Learn how to retrieve remote information from website, videos, etc.

Richtext Editor
===============

When an URL is detected in the HTML editor, it automatically loads the information about the URL. For security reasons, you should have a middleware in your backend to parse the remote link information.

Paste an URL from a video on youtube or a LINK from an external website.

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
