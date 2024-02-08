title: JavaScript toast notification
keywords: JavaScript toast, toast notification, JS toast
description: Basic responsive JavaScript toast notification

JavaScript Toast notifications
==============================

This script has less than 1 Kbyte

The `jSuites.notification` is a lightweight JavaScript toast-like to notify the user with a quick message in the corner of the screen.

The notification will hide after four seconds unless otherwise specified.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input type='button' value='Show notification' class='jbutton dark' id='notification' />
<input type='button' value='Show error' class='jbutton dark' id='notification-error' />

<script>
document.getElementById('notification').onclick = function() {
    jSuites.notification({
        name: 'Jsuites toast notification',
        message: 'Successfully Update',
    })
}

document.getElementById('notification-error').onclick = function() {
    jSuites.notification({
        error: 1,
        name: 'Error message',
        message: 'Something went wrong',
    })
}
</script>
</html>
```
