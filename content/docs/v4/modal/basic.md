title: Javascript modal plugin basic example
keywords: Javascript modal plugin, responsive modal, popup modal, examples, basic example
description: A basic example on how to use the javascript modal as a web component or a javascript plugin.

{.white}
> A new version of the jSuites **JavaScript Modal** is available. 
> <br><br>
> [JavaScript Modal](/docs/modal){.button .main target="_top"}


Javascript modal basic examples
===============================

### The following example creates a modal with no title

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='modal'>
Modal with no title content
</div>

<input type='button' value='Click here to open the modal' class='plain' id="btn">

<script>
var modal = jSuites.modal(document.getElementById('modal'), {
    width: '600px',
    height: '480px',
    closed: true,
});

btn.addEventListener('click', function() {
    modal.open()
})
</script>

</html>
```
