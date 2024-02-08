title: HTML editor quick reference
keywords: Javascript, HTML editor, plugin, wysiwyg editor, quick reference, documentation
description: A simple HTML editor with several interactive features and easy integration.

Javascript HTML editor
======================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="editor"></div>

<script>
var myEditor = jSuites.editor(document.getElementById('editor'));
</script>
</html>
```

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| myEditor.setData() | Set new data to the editor. |
| myEditor.getData() | Get the current data. |
| myEditor.reset() | Clear the content of the editor. |
| myEditor.destroy() | Destroy the editor. |

  
  

Initialiation properties
------------------------

| Property | Description |
| --- | --- |
| value: string | Initial HTML value |
| snippet: object | Snippet object |
| toolbar: boolan | object | True for the default toolbar, or a items of a customized toolbar. |
| remoteParser: string | A URL for the remote URL/image parser. |
| parseURL: boolean | Parse URL inside the editor to create a snippet. |
| filterPaste: boolean | Filter all content onpaste |
| dropZone: boolean | Allow images or files to be dropped in the editor. |
| acceptFiles: boolean | Accept PDF on the editor. |
| acceptImages: boolean | Accept images on the editor. |
| dropAsAttachment: boolean | When images are dropped, they are included as attachement. |
| maxFileSize: number | Max filesize in bytes. |
| border: boolean | Add borders to the editor. |
| padding: boolean | Add padding to the editor. |
| maxHeight: number | Max height for the editor. |
| focus: boolean | Focus on the contente after the data is loaded. |
| placeholder: string | Content placeholder |

  
  

Available Events
----------------

| Event | Description |
| --- | --- |
| onclick | When a click happens on the editor.  <br>(element: HTMLElement, instance: Object, event: Object) => void |
| onfocus | When the editor is focused.  <br>(element: HTMLElement, instance: Object, currentValue: string) => void |
| onblur | When the editor is blured.  <br>(element: HTMLElement, instance: Object, currentValue: string) => void |
| onload | A method is execute when the modal is closed.  <br>(element: HTMLElement, instance: Object, editor: HTMLElement) => void |
| onkeyup | When a new key from the keyboard is released.  <br>(element: HTMLElement, instance: Object, event: Object) => void |
| onkeydown | When a new key from the keyboard is pressed.  <br>(element: HTMLElement, instance: Object, event: Object) => void |
