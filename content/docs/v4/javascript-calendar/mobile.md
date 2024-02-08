title: Responsive javascript calendar
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, responsive calendar, mobile calendar
description: Responsive javascript calendar. How to load on the calendar on mobile or small screens.

* [JavaScript Calendar](/docs/v4/javascript-calendar)

Responsive JavaScript calendar
==============================

Full screen mode
----------------

You can use the property `fullscreen:` true to start the calendar in full screen mode. Bear in mind that this property is automatic set as true when the screen width is lower than 800 pixels.

  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
// Create new calendar instance in full screen mode
jSuites.calendar(document.getElementById('calendar'), {
    // Enable the fullscreen mode
    fullscreen: true,
    format: 'DD/MM/YYYY HH24:MI',
    placeholder: 'DATE AND TIME',
    // Enable the hour and minute dropdowns
    time: true,
});
</script>
</html>
```

