title: JavaScript Modal Events  
keywords: JavaScript modal plugin, responsive modal, popup modal, modal events  
description: Discover how to use and manage events with the jSuites JavaScript modal plugin to create responsive and interactive modals.
canonical: https://jsuites.net/docs/modal/events

{.breadcrumb}
- [JavaScript Modal](/docs/modal)
- Examples

# JavaScript Modal Events

This example demonstrates loading content from a remote URL and configuring basic event handlers for the modal.

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

## More Examples

- [Modal Events](/docs/modal/events)
- [External Content](/docs/modal/external-content)
