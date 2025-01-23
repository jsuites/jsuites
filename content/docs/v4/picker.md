title: Javascript Picker with Jsuites v4
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker
description: A lightweight and fast javascript picker plugin
canonical: https://jsuites.net/docs/v4/picker

JavaScript picker
=================

The `jSuites.picker` is a JavaScript plugin that allow users to choose one of the options provided. The plugin is responsive and brings a great user experience across different devices.

Load picker basic example
-------------------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div class='row'>
    <div class='column p10'>
        <div id='picker'></div>
    </div>
</div>

<script>
  jSuites.picker(document.getElementById('picker'), {
    data: ['Option1', 'Option2', 'Option3'],
    value: 3,
  })
</script>
</html>
```
  
  

Quick reference
---------------

Go to the [Quick reference](/docs/v4/picker/quick-reference)

More examples
-------------

* [Basic picker](/docs/v4/picker/basic)
* [How to style your options](/docs/v4/picker/stylize-options)
* [How to use a front that is not changed when changing the option](/docs/v4/picker/static-front)
* [How to trigger a function when changing the picker option](/docs/v4/picker/handle-changes)
* [How to integrate picker with react](/docs/v4/picker/picker-with-react)
