title: Javascript color picker example
keywords: Javascript, color picker, color picker, examples, basic example
description: Create a basic color picker using the javascript color picker plugin.

{.white}
> A new version of the jSuites **JavaScript Color Picker** plugin is available here.
> <br><br>
> [JavaScript Color Picker v5](/docs/color-picker){.button .main target="_top"}


* [JavaScript Color Picker](/docs/v4/color-picker)

Basic color picker example
==========================

  
   
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id="color-picker"/>

<script>
let color = jSuites.color(document.getElementById('color-picker'), {
    value: '#f3e5f5',
    closeOnChange: true,
});

openbtn.onclick = () => color.open()
setvaluebtn.onclick = () => color.setValue('#009688')
</script>

<input type='button' value="Open picker" id="openbtn">
<input type='button' value="Change color" id="setvaluebtn">

</html>
```
