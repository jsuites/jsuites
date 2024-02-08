title: Inline JavaScript Calendar
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, inline javascript date picker.
description: Create nice applications with the jsuites inline javascript calendar picker.

* [JavaScript Calendar](/docs/v4/javascript-calendar)

JavaScript Calendar
===================

Inline mode
-----------

You can define the DOM element as a DIV to activate the calendar inline mode as below.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<p>Date: <strong id='calendar-value'>Click in the calendar to get a date</strong></p>
<div id='calendar'></div>

<script>
// Create a new calendar
jSuites.calendar(document.getElementById('calendar'), {
    format: 'YYYY-MM-DD',
    onupdate: function(a,b) {
        document.getElementById('calendar-value').innerText = b;
    }
});
</script>
</html>
```

