title: Javascript mask plugin events
keywords: Javascript, mask, input mask, currency mask, money mask, javascript mask, events
description: How to check the status of a input mask. A property is added to the element to tell the system, the entry has been entered in full.

Javascript input mask
=====================

The following example shows a information when the data on a input field is completed.

A property data-completed=true is added to the input once the information is completed

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<p>What is your birthday? <strong>dd/mm/yyyy</strong></p>
<input id='date' data-mask='dd/mm/yyyy'> <span id='status'></span>

<script>
date.addEventListener('keyup', function(e) {
    document.getElementById('status').innerHTML = '';

    if (e.target.getAttribute('data-completed') == 'true') {
        document.getElementById('status').innerHTML = 'Complete';
    } else {
        document.getElementById('status').innerHTML = 'Incomplete';
    }
})
</script>
</html>
```
