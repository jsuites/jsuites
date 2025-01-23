title: Javascript Tags and JavaScript Keywords Plugins with Jsuites v4
keywords: Javascript, tagging, javascript tags, keywords, javascript keywords
description: The jSuites.tags is very light javascript web component and plugin to allow users to insert and manage multiple entries as tags into a text input
canonical: https://jsuites.net/docs/v4/javascript-tags

Javascript keywords and tags input
==================================

The `jSuites.tags` is a very light javascript tags or keywords management web component and plugin. It allows users to insert and manage multiple entries of tags or keywords into a text input. Several applications can benefit from this plugin, such as:

* Keyword, tags and categories input box
* Destination email box
* CRM/CMS systems
* SEO management tags and keywords systems

Bring your interface to the next level with the great performance and usability of this JavaScript keywords and tags management plugin.

![](img/js-tags.svg){.right}

  

Examples
--------

  

### Keywords management

Basic keywords management input as a javascript web component.  
  
  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<jsuites-tags value="Canada,US,UK"></jsuites-tags>

<script>
document.querySelector('jsuites-tags').addEventListener('onblur', function() {
    console.log('Tags' + this.value);
});
</script>
</html>
```
  

### Gmail-like email input with validations

The email input works with remote suggestions and respond to the keyboard actions.  
  

  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='tag-input'></div>

<script>
jSuites.tags(document.getElementById('tag-input'), {
    validation: function(element, text, value) {
        if (! value) {
            value = text;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var test = re.test(String(value).toLowerCase()) ? true : false;
        return test;
    },
    search: '/v4/data?q=',
    placeholder: 'To'
});
</script>
</html>
```
  
  

Documentation
-------------

### Available Methods

| Method | Description |
| --- | --- |
| tags.getData(); | Get all tags as a object |
| tags.getValue(number) | Get a specific tag by index or all tags value  <br>@param integer indexNumber - Null for all tags |
| tags.setValue(string); | Set a new value for the javascript tagging  <br>@param string newValue - Values separate by comma |
| tags.reset(); | Clear all tags |
| tags.isValid(); | Validate tags |

  
  

### Available events

| Method | Description |
| --- | --- |
| onbeforechange | Method executed before a value is changed.  <br>(HTMLElement element, Object instance, String value) => string | false | undefined |
| onbeforepaste | Method executed before the paste data is appended.  <br>(HTMLElement element, Object instance, Array data) => string | false | undefined |
| onchange | Method executed when a value is changed.  <br>(HTMLElement element, Object instance, String value) => void |
| onfocus | Method executed when the input is focused.  <br>(HTMLElement element, Object instance, String currentValue) => void |
| onblur | Method executed when the input is focused.  <br>(HTMLElement element, Object instance, String currentValue) => void |
| onload | Method executed the DOM element is ready.  <br>(HTMLElement element, Object instance) => void |

  
  

### Initialiation settings

| Property | Description |
| --- | --- |
| value: string | array | Initial value of the compontent. An string separate by comma or an array of objects. |
| limit: number | Max number of tags inside the element |
| search: string | The URL for the remote suggestions |
| placeholder: string | The default instruction text on the element |
| validation: function | Method to validate the entries in the input.  <br>(HTMLElement element, String value, Number id) => boolean |

  
  

More examples
-------------

* [Basic vanilla example](/docs/v4/javascript-tags/basic)
* [Remote searching and suggestions](/docs/v4/javascript-tags/remote-search)
* [Handling events](/docs/v4/javascript-tags/events)
* [Input validations](/docs/v4/javascript-tags/validations)
