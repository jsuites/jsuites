title: Javascript calendar programmatically changes
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, programmatically changes and updates
description: How to interact with the calendar and time picker via javascript.

* [JavaScript Calendar](/docs/v4/javascript-calendar)

Programmatically changes
========================

Documentation
-------------

Available methods in the javascript calendar  

| Method | Description |
| --- | --- |
| calendar.open(); | Open the javascript calendar picker |
| calendar.close(ignoreEvents); | Close the calendar  <br>@param int ignoreEvents - Do no execute onclose event |
| calendar.getValue(); | Get the current selected date |
| calendar.setValue(newValue); | Set a new value for the javascript calendar and time picker  <br>@param mixed newValue - New date should be set as YYYY-MM-DD HH:MM:SS |
| calendar.reset(); | Reset the input value |
| calendar.next(); | Go to the next month |
| calendar.prev(); | Go to the previous month |

  
  

Examples
--------

The following example shows how to interact with the JavaScript calendar programmatically  
  
  
  
   
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input type='button' value='Open the calendar' id="openbtn" />
<input type='button' value='Close the calendar' id="closebtn" />
<input type='button' value='Set value' id="setvaluebtn" />
<input type='button' value='Reset value' id="resetbtn" /><br>
<input id="calendar" />

<script>
let calendar = jSuites.calendar(document.getElementById('calendar'));

openbtn.onclick = () => calendar.open()
closebtn.onclick = () => calendar.close()
setvaluebtn.onclick = () => calendar.setValue('2020-01-01')
resetbtn.onclick = () => calendar.reset()
</script>


</html>
```

