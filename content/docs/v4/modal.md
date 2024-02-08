title: Javascript modal
keywords: Javascript modal plugin, responsive modal, popup modal
description: Vanilla javascript modal plugin and modal javascript web component

JavaScript Modal
================

The `jSuites.modal` is a lightweight responsive and flexible JavaScript modal plugin. It has excellent performance and usability, and it works great on small screens. The plugin can be used as a vanilla JavaScript or a web component as below:

![](img/js-modal.svg)

  

Examples
--------

### JavaScript web component modal

This is an example how to create a modal based on the custom HTML javascript modal.   
  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<jsuites-modal title="Webcomponent Modal" closed="true" width="600" height="480">
This is an example how to create a modal based on the custom HTML javascript modal.
</jsuites-modal>

<input type='button' value='Open the modal'
    onclick="document.querySelector('jsuites-modal').modal.open()" class='plain'>

<script>
document.querySelector('jsuites-modal').addEventListener('onopen', function() {
    console.log('Modal is open');
});
document.querySelector('jsuites-modal').addEventListener('onclose', function() {
    console.log('Modal is closed');
});
</script>
</html>
```
  

### More examples

* [Basic JavaScript modal](/docs/v4/modal/basic)
* [JavaScript modal events](/docs/v4/modal/events)
* [React modal](/docs/v4/modal/javascript-modal-with-react)
