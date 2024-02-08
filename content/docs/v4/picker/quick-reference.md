title: Javascript picker quick reference
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, quick reference, documentation
description: jSuites picker plugin quick reference documentation.

* [JavaScript picker](/docs/v4/picker)

JavaScript Picker
=================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="picker"></div>

<script>
  var picker = jSuites.picker(document.getElementById('picker'), {
    data: [ 'Verdana', 'Arial', 'Courier New' ],
    value: 1,
    content: 'format_size',
  })
</script>
</html>
```
    

  
  

Methods
-------

| Method | Description |
| --- | --- |
| picker.getLabel(int); | Return the option at the specified position  <br>@param - element index |
| picker.open(); | Open the picker |
| picker.close(); | Closes the picker |
| picker.getValue(); | Returns the index corresponding to the current selected element |
| picker.setValue(int); | Define the option at the specified position as the picker value |

  
  

Events
------

The order of the onchange methods has changed from 4.2.0

| Method | Description |
| --- | --- |
| onchange | When the value is changed  <br>`onchange(DOMElement element, Object instance, String value, String value, Number selectIndex) => void` |
| onclose | When the picker is closed  <br>`onclose(DOMElement element, Object instance) => void` |
| onopen | When the picker is open  <br>`onopen(DOMElement element, Object instance) => void` |

  
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| data: string[] | The picker options. |
| value: int | The position of the initial picker option. |
| content: string | The html or material-design icon that should be in front of the picker. |
| width: number | The picker width. |
| render: function | How each option should be shown.  <br>`function(string option) => string` |
