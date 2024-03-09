title: JavaScript Year and Month Picker
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, year picker, month picker
description: How to generate a JavaScript year month picker using jSuites Version 4.

* [JavaScript Year and Month Picker](/docs/v4/javascript-calendar)

JavaScript Year and Month Picker
===================

JavasScript calendar with year month only selection picker.  
  

### Javascript year month picker

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
// Enable the year and month picker
jSuites.calendar(document.getElementById('calendar'), {
    type: 'year-month-picker',
    format: 'MMM-YYYY',
    validRange: [ '2024-02-01', '2025-12-31' ]
});
</script>
</html>
```
