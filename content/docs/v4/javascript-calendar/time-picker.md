title: Javascript calendar with time picker
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, time, timepicker
description: How to render a javascript calendar with a timepicker.

* [JavaScript Calendar](/docs/v4/javascript-calendar)

Calendar with a time picker
===========================

The example below enables the time picker on the JavaScript calendar.  
  

### Javascript date and time picker

How to enable the hour and minutes dropdown.  
  
  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar'>

<script>
jSuites.calendar(document.getElementById('calendar'), {
    time:true,
    format:'DD/MM/YYYY HH24:MI',
});
</script>
</html>
```

