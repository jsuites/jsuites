title: Javascript modal quick reference
keywords: Javascript modal plugin, responsive modal, popup modal, quick reference, documentation
description: How to use the jsuites modal as a javascript plugin or web component.

Javascript modal quick reference
================================

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="modal"></div>

<script>
var myModal = jSuites.modal(document.getElementById('modal'));
</script>
</html>
```

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| myModal.open() | Open the modal |
| myModal.close() | Close the modal |

  
  

Initialiation properties
------------------------

| Property | Description |
| --- | --- |
| url: string | Open the content from a remote URL. |
| closed: boolean | Create the modal but keep it closed. |
| width: number | The width size of your modal |
| height: number | The height size of your modal |
| title: string | The title shown of your modal |
| backdrop: boolean | Don't show the backdrop |

  
  

Events
------

| Event | Description |
| --- | --- |
| onopen | A method is execute when the modal is opened.  <br>(element: HTMLElement, instance: JSON) => void |
| onclose | A method is execute when the modal is closed.  <br>(element: HTMLElement, instance: JSON) => void |
