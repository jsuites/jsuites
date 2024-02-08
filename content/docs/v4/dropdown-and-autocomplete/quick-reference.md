title: Javascript dropdown quick reference
keywords: Jexcel, jquery, javascript, autocomplete, javascript dropdown, javascript select, quick reference, documentation
description: Javascript dropdown plugin quick reference documentation

* [JavaScript autocomplete dropdown](/docs/v4/dropdown-and-autocomplete)

JavaScript dropdown
===================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
var dropdown = jSuites.dropdown(document.getElementById('dropdown'), {
    url: '/docs/v4/large',
    autocomplete: true,
    multiple: true,
    width: '280px',
});
</script>
</html>
```

  
  

Methods
-------

| Method | Description |
| --- | --- |
| dropdown.open(); | Open the dropdown |
| dropdown.close(boolean); | Close the dropdown  <br>@param int ignoreEvents - Do no execute onclose event |
| dropdown.getText(); | Get the current label(s) from the selected option(s) in the dropdown |
| dropdown.getValue(); | Get the current value(s) from the selected option(s) in the dropdown |
| dropdown.setValue(string | array); | Set a new value(s)  <br>@param mixed newValue - A string value or an array with multiple values in case a multiple dropdown. |
| dropdown.reset(); | Clear all selected options from the dropdown |
| dropdown.add(); | Add a new element to the dropdown |
| dropdown.setData(mixed); | Set the data to load into the dropdown |
| dropdown.getData(); | Get the dropdown loaded data |
| dropdown.setUrl(string, function); | Change the url from which data is obtained.  <br>@param {string} url  <br>@param {function} callback |
| dropdown.getPosition(string); | Get the position of the option owner of the informed value |
| dropdown.selectIndex(int); | Select an item based on its position |

  
  

Events
------

| Method | Description |
| --- | --- |
| onopen | Trigger a method when the dropdown is opened.  <br>(DOMElement element) => void |
| onclose | Trigger a method when the dropdown is closed.  <br>(DOMElement element) => void |
| onchange | Trigger a method when value is changed.  <br>(DOMElement element, Number index, String oldValue, String newValue, String oldLabel, String newLabel) => void |
| onfocus | Trigger a method when the dropdown get focus.  <br>(DOMElement element) => void |
| onblur | Trigger a method when the dropdown lost focus.  <br>(DOMElement element) => void |
| onbeforeinsert | Before a new item is added.  <br>(Object instance, Object item) => void |
| oninsert | Trigger a method when a new option is added to the dropdown.  <br>(Object instance, Object item, Object dataItem) => void |
| onload | Trigger a method when the dropdown is loaded.  <br>(DOMElement element, Object instance, Array data, String currentValue) => void |

  
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| data: Array | Array of items to be loaded into the dropdown |
| url: string | Can be loaded from a external file |
| multiple: boolean | Multiple options |
| autocomplete: boolean | Allow autocomplete |
| type: string | Render type: default | picker | searchbar |
| width: string | Default width |
| value: string | Selected value |
| placeholder: string | Placeholder instructions |
| newOptions: boolean | Enable the add new option controls |
| lazyLoading: boolean | Activate the lazy loading feature |
| format: 0|1 | Format of the data. 0: { text, value }, 1: { id, name }. Default: 0 |

  
  

Items
-----

Each option in the dropdown is define by one object and the possible attributes are the following:

| Property | Description |
| --- | --- |
| value: mixed | Value of the item. Default format. |
| text: string | Label of the item. Default format. |
| id: mixed | Value of the item. Can be used when the property format = 1 |
| value: string | Label of the item. Can be used when the property format = 1 |
| title: string | Description of the item |
| tooltip: string | On mouse over instructions |
| image: string | Icon of the item |
| group: string | Name of the group where the item belongs to |
| synonym: array | Keywords to help finding one item |
| disabled: boolean | Item is disabled |
| color: number | Color for the item |
| icon: string | Material icon keyword |
