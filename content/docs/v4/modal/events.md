title: Javascript modal events
keywords: Javascript modal plugin, responsive modal, popup modal, events
description: Learn how to use the events available on the jsuites javascript modal plugin.

Javascript modal
================

The following example loads a content from a remote URL and defines basic events to the modal

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='modal' title='Remote content'></div>

<input type='button' value='Click here to open the modal' class='plain' id="btn">

<script>
var modal = jSuites.modal(document.getElementById('modal'), {
    url: '/docs/content',
    width:'600px',
    height:'480px',
    closed:true,
    onclose:function() {
        console.log('Modal is closed');
    },
    onopen:function() {
        console.log('Modal is opened');
    },
});

btn.addEventListener('click', function() {
    modal.open()
})
</script>
</html>
```

