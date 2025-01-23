title: Javascript calendar with time picker
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, time, timepicker
description: How to render a javascript calendar with a time picker.
canonical: https://jsuites.net/docs/v4/javascript-calendar/time-picker

{.white}
> A new version of the jSuites **JavaScript Calendar** plugin is available here.
> <br><br>
> [jSuites Calendar v5](/docs/javascript-calendar){.button .main target="_top"}


{.breadcrumb}
- [JavaScript Calendar](/docs/v4/javascript-calendar)
- Examples

# Calendar With Time Picker

The example below enables the time picker on the JavaScript calendar.  

## Javascript date and time picker

How to enable the hour and minutes dropdown.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
jSuites.calendar(document.getElementById('calendar'), {
    time:true,
    format:'DD/MM/YYYY HH24:MI',
});
</script>
</html>
```

