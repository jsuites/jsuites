title: Remote Content JavaScript Modal  
keywords: JavaScript modal, JavaScript plugins, modal with remote content  
description: Learn how to easily create a dynamic JavaScript modal that loads content from an external source using `jSuites.modal`.
canonical: https://jsuites.net/docs/modal/external-content

{.breadcrumb}
- [JavaScript Modal](/docs/modal)
- Examples

# Simple Modal with Remote Content

This example demonstrates creating a modal window that dynamically loads and displays content from an external source. It highlights the simplicity and flexibility of using `jSuites.modal` to integrate remote content into your application.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='modal' title='Remote content'></div>

<input type='button' value='Click here to open the modal' class='plain' id="btn">

<script>
var external = jSuites.modal(document.getElementById('modal'), {
    src: '/v4/test.html',
    width: '600px',
    height: '480px',
    closed: true
});

btn.addEventListener('click', function() {
    external.open()
})
</script>
</html>
```

## More Examples

- [Modal Events](/docs/modal/events)
- [External Content](/docs/modal/external-content)
