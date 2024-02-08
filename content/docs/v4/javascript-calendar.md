title: Javascript calendar, date, datetime picker
keywords: Javascript, calendar, date, datetime, date picker, datetime picker
description: The jsuites calendar is a lightweight, full responsive javascript calendar date and datetime picker with easy integration.

![JavaScript Calendar](img/js-calendar.svg)

JavaScript calendar
===================

Introducing our JavaScript Calendar - a lean, responsive web component plugin that combines the functionality of a calendar, date picker, and date-time picker. Designed to deliver an exceptional user experience across various devices, this lightweight JavaScript tool is a valuable addition to any web application, simplifying date selection and enhancing overall usability.  
  

* React, Angular, VueJS compatible;
* Mobile friendly;
* Date picker;
* Time picker;
* Year-month picker;
* Several events and easy integration;
* JS plugin or web component;


Examples
--------
 

### Web component Date Picker

How to embed a simple web component calendar input in your application.  
  
  
  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<jsuites-calendar value="2020-01-20"></jsuites-calendar>

<script>
document.querySelector('jsuites-calendar').addEventListener('onchange', function(e) {
    console.log('New value: ' + e.target.value);
});
document.querySelector('jsuites-calendar').addEventListener('onclose', function(e) {
    console.log('Calendar is closed');
});
</script>
</html>
```
  
  

### How to create an HTML calendar input

Create a basic HTML date and time input using pure JavaScript.  
  
  
  
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
jSuites.calendar(document.getElementById('calendar'),{
    format: 'DD/MM/YYYY HH:MM',
    time: true,
});
</script>
</html>
```
  
  

### React integration

Using the JavaScript calendar via NPM.  
  

#### Install

```bash
npm install jsuites
```
  

#### Component

```javascript
import jSuites from "jsuites";

import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function Calendar({ options }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    jSuites.calendar(calendarRef.current, options);
  }, [options]);

  return <input ref={calendarRef} />;
}
```
  
  

Documentation
-------------

### Methods

| Method | Description |
| --- | --- |
| calendar.open(); | Open the javascript calendar picker |
| calendar.close(ignoreEvents); | Close the calendar  <br>@param int ignoreEvents - Do no execute onclose event |
| calendar.getValue(); | Get the current selected date |
| calendar.setValue(newValue); | Set a new value for the javascript calendar and time picker  <br>@param mixed newValue - New date should be set as YYYY-MM-DD HH:MM:SS |
| calendar.reset(); | Reset the input value |
| calendar.next(); | Go to the next month |
| calendar.prev(); | Go to the previous month |

  
  

### Events

| Method | Description |
| --- | --- |
| onchange | Trigger a method when value is changed. |
| onupdate | Trigger a method when any information change in the calendar picker. |
| onclose | Trigger a method when the calendar is closed. |
| onopen | Trigger a method when the calendar is closed. |

  
  

### Initial settings

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
| weekdays: array | Weekday names.  <br>Default: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] |
| weekdays_short: array | Weekday short names.  <br>Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S'] |
| value: string | Default date. |
| fullscreen: boolean | Render in fullscreen. Default: true for screenWidth: 800px |
| opened: boolean | Calendar starts opened. Default: false. |
| textDone: string | Text of the 'Done' button |
| textReset: string | Text of the 'textReset' button |
| textUpdate: string | Text of the 'Update' button |

  
  

More examples using the calendar plugin
---------------------------------------

* [Basic calendar from a input](/docs/v4/javascript-calendar/basic)
* [Calendar with time picker](/docs/v4/javascript-calendar/time-picker)
* [Year and month only](/docs/v4/javascript-calendar/year-month)
* [JavaScript events](/docs/v4/javascript-calendar/events)
* [Valid date range](/docs/v4/javascript-calendar/valid-range)
* [International settings](/docs/v4/javascript-calendar/international)
* [Programatically methods](/docs/v4/javascript-calendar/methods)
* [Inline calendar](/docs/v4/javascript-calendar/inline)
* [Mobile responsivess](/docs/v4/javascript-calendar/mobile)
