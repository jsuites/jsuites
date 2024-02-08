title: JavaScript loading spin
keywords: JavaScript loading spin, animations, JS loading, javascript loading component
description: JavaScript loading spin web component.

Loading spin
============

This script has less than 1 Kbyte

The `jSuites.loading` is a lightweight JavaScript loading spin control. The example below will show the loading spin for 2 seconds.


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />


<input type='button' value='Show the loading' class='jbutton dark' id='showbtn'>
<i>The loading will stop after two seconds</i>

<script>
const show = function() {
    // Show the loading spin
    jSuites.loading.show();
    // Hide the loading spin after two seconds
    setTimeout(function() {
        // Hide
        jSuites.loading.hide();
    }, 2000);
}
showbtn.onclick = () => show()
</script>
</html>
```
