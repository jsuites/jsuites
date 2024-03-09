title: JavaScript toolbar Custom Icons
keywords: Javascript, toolbar, custom icons, images
description: How to integrate custom icon images to the javascript toolbar.

JavaScript toolbar
==================

Adding custom icons
-------------------

The following example shows how to add custom image icons to your toolbar.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

<div id='toolbar'></div>

<script>
jSuites.toolbar(document.getElementById('toolbar'), {
    container: true,
    items:[
    {
        type: 'icon',
        content: '<img src="https://www.svgrepo.com/show/1284/message.svg" width="18px;">',
        title: 'Message',
        onclick: function() {
            // Do something
            console.log('Message');
        }
    },
    {
        type: 'icon',
        content: '<img src="https://www.svgrepo.com/show/521654/facebook.svg" width="18px;">',
        title: 'Facebook',
        onclick: function() {
            // Do something
            console.log('Facebook,etc');
        }
    }]
})
</script>
</html>
```
