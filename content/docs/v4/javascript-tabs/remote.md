title: JavaScript tabs with remote content
keywords: Javascript, tabs plugin, web components, remote content, ajax loading
description: Create a tabs content from a remote source using javascript.

* [JavaScript tabs](/docs/v4/javascript-tabs)

Tabs with remote content
========================

Create a basic tab container from a remote content.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />


<div id='tabs' style='width: 85vw; max-width: 450px;text-align:justify'></div>

<script>
var tabs = jSuites.tabs(document.getElementById('tabs'), {
    animation: true,
    data: [
        {
            title: 'Tab 1',
            url: '/docs/v4/content',
        },
        {
            title: 'Tab 2',
            url: '/docs/v4/content/2',
        },
    ],
    padding: '10px',
});
</script>
</html>
```
