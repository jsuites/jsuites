title: A quick reference to the javascript tags plugin
keywords: Javascript, tagging, javascript tags, keywords, quick reference, documentation
description: A quick reference for using the javascript tags plugin.

* [JavaScript tags](/docs/v4/javascript-tags)

Quick reference
===============

Considering the following example:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<i>Press enter, comma or tab for the next keyword.</i>
<div id="tags"></div>

<script>
var tags = jSuites.tags(document.getElementById('tags'), {
    onchange: function() {
        console.log(arguments);
    }
});
</script>
</html>
```

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| tags.getData(); | Get all tags as a object |
| tags.getValue(number) | Get a specific tag by index or all tags value  <br>@param integer indexNumber - Null for all tags |
| tags.setValue(string); | Set a new value for the javascript tagging  <br>@param string newValue - Values separate by comma |
| tags.reset(); | Clear all tags |
| tags.isValid(); | Validate tags |

  
  

Available events
----------------

| Method | Description |
| --- | --- |
| onbeforechange | Method executed before a value is changed.  <br>(HTMLElement element, Object instance, String currentValue, String value) => string |
| onchange | Method executed when a value is changed.  <br>(HTMLElement element, Object instance, String currentValue) => void |
| onfocus | Method executed when the input is focused.  <br>(HTMLElement element, Object instance, String currentValue) => void |
| onblur | Method executed when the input is focused.  <br>(HTMLElement element, Object instance, String currentValue) => void |
| onload | Method executed the DOM element is ready.  <br>(HTMLElement element, Object instance) => void |

  
  

Initialiation settings
----------------------

| Property | Description |
| --- | --- |
| value: string | array | Initial value of the compontent. An string separate by comma or an array of objects. |
| limit: number | Max number of tags inside the element |
| search: string | array | The URL for the remote suggestions, or an array of suggestions |
| placeholder: string | The default instruction text on the element |
| validation: function | Method to validate the entries in the input.  <br>(HTMLElement element, String text, String value) => boolean |
