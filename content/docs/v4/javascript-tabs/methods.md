title: JavaScript tabs methods
keywords: Javascript, tabs plugin, web components, methods, programmatically changes
description: programmatically updates on the javascript tabs plugin.

* [JavaScript tabs](/docs/v4/javascript-tabs)

Tabs methods
============

Programatically changes on the tabs container

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='tabs'></div>

<script>
var tabs = jSuites.tabs(document.getElementById('tabs'), {
    animation: true,
    oncreate: function(el, div) {
        div.innerHTML = 'New content';
    },
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

secondtabbtn.onclick = () => tabs.open(1)
newtabbtn.onclick = () => tabs.create('New tab')
removefirstbtn.onclick = () => tabs.remove(0)
</script>
<input type='button' value='Open second tab' id="secondtabbtn">
<input type='button' value='Create a new tab' id="newtabbtn">
<input type='button' value='Remove first tab' id="removefirstbtn">
</html>
```

