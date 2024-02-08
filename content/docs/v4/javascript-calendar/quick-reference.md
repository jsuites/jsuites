title: Javascript calendar plugin quick reference
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, quick reference, documentation
description: Learn how to use the javascript calendar plugin. Configurations rules, methods, initialization properties, and much more.

* [JavaScript Calendar](/docs/v4/javascript-calendar)

JavaScript calendar
===================

Quick reference
---------------

Consider the following example:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar'>

<script>
var myCalendar = jSuites.calendar(document.getElementById('calendar'), {
    format: 'DD/MM/YYYY'
});
</script>
</html>
```

  
  

Methods
-------

| Method | Description |
| --- | --- |
| calendar.open(); | Open the javascript calendar picker |
| calendar.close(ignoreEvents); | Close the calendar  <br>@param int ignoreEvents - Do no execute onclose event |
| calendar.getValue(); | Get the current selected date |
| calendar.setValue(newValue); | Set a new value for the javascript calendar and time picker  <br>@param mixed newValue - New date should be set as YYYY-MM-DD HH:MM:SS |
| calendar.reset(); | Reset the input value |
| calendar.next(); | Go to the next month |
| calendar.prev(); | Go to the previous month |

  
  

Events
------

| Method | Description |
| --- | --- |
| onchange | Trigger a method when value is changed.  <br>`onchange(DOMElement element, string currentValue, string previousValue) => void` |
| onupdate | Trigger a method when any information change in the calendar picker.  <br>`onupdate(DOMElement element, string value) => void` |
| onclose | Trigger a method when the calendar is closed.  <br>`onupdate(DOMElement element) => void` |
| onopen | Trigger a method when the calendar is closed.  <br>`onupdate(DOMElement element) => void` |

  
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| type: string | Picker type: default | year-month-picker. Default: default |
| validRange: [ date, date ] | Date selection would be disabled out of this range. Default: null |
| startingDay: number | Starting weekday - 0 for sunday, 6 for saturday. Default: 0 (Sunday) |
| format: string | Date format. Default: YYYY-MM-DD |
| readonly: boolean | Input will be disabled for manual changes. |
| today: boolean | If no value is default, open teh calendar on today as default. Default: false |
| time: boolean | Include a time picker on the calendar. Default: false |
| resetButton: boolean | Show reset button. Default: true |
| placeholder: string | Placeholder instructions |
| months: array | Month short names.  <br>Default: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] |
| monthsFull: array | Month short names.  <br>Default: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] |
| weekdays: array | Weekday names.  <br>Default: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] |
| value: string | Default date. |
| fullscreen: boolean | Render in fullscreen. Default: true for screenWidth: 800px |
| opened: boolean | Calendar starts opened. Default: false. |
| textDone: string | Text of the 'Done' button |
| textReset: string | Text of the 'textReset' button |
| textUpdate: string | Text of the 'Update' button |
| controls: boolean | Show the controls. Default: true |

  
  

Tokens
------

| Pattern | Description |
| --- | --- |
| HH  | hour of day (01-12) |
| HH12 | hour of day (01-12) |
| HH24 | hour of day (00-23) |
| MI  | minute (00-59) |
| SS  | second (00-59) |
| MS  | millisecond |
| AM or PM | meridian indicator |
| h:m AM/PM | this format, with one or two h or m, is handled in a special way, referring to hours and minutes in the 12-hour system. If "AM/PM" is omitted, the 24-hour system is adopted |
| YYYY | year 4 digits of year |
| YYY | last 3 digits of year |
| YY  | last 2 digits of year |
| Y   | last digit of year |
| MMMMM | First letter of month name |
| MMMM | Full month name |
| MMM | Abbreviated month name |
| MM or M | month number (01-12) |
| MONTH | Full upper case month name |
| Month | Full capitalized month name |
| month | Full lower case month name |
| MON | Abbreviated upper case month name |
| Mon | Abbreviated capitalized month name |
| mon | Abbreviated lower case month name |
| DDDD | Full day name |
| DDD | Abbreviated day name |
| DD  | Day of month (01-31) |
| D   | Day of the week (starting on zero for Sundays) |
| DAY | Full upper case day name |
| Day | Full capitalized day name |
| day | Full lower case day name |
| DY  | Abbreviated upper case day name |
| Dy  | Abbreviated capitalized day name |
| dy  | Abbreviated lower case day name |
| WD  | Day of the week starting on zero for Sunday |
