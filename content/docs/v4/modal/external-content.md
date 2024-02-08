Simple modal with external content
==================================

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='modal' title='Remote content'></div>

<input type='button' value='Click here to open the modal' class='plain' id="btn">

<script>
var external = jSuites.modal(document.getElementById('modal'), {
    src: '/docs/v4/test.html',
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
