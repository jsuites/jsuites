title: Javascript calendar and timepicker events
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, time, timepicker, events
description: How to handle the events of the jsuites calendar picker.

* [JavaScript Calendar](/docs/v4/javascript-calendar)

JavaScript calendar Events
==========================

This section provides more information about the events on the javascript calendar plugin.  
  

Documentation
-------------

The calendar provides the following events:  

| Event | description |
| --- | --- |
| onopen | `onopen(el: DOMElement) => void`  <br>This method is called when the calendar is opened. |
| onclose | `onclose(el: DOMElement) => void`  <br>This method is called when the calendar is closed. |
| onchange | `onchange(DOMElement element, string currentValue, string previousValue) => void`  <br>This method is called when the value is changed. |
| onupdate | `onupdate(DOMElement element, string value) => void`  <br>This method is called when a information changes. |

  
  

Example
-------


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />
<div id='log'></div>

<script>
// Create a instance of the calendar
jSuites.calendar(document.getElementById('calendar'), {
    time: true,
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY',
    readonly: false,
    // Enable events on the calendar
    onopen: function() {
        jSuites.notification({ title:'Calendar', message:'Calendar is open now!' });
    },
    onclose: function() {
        jSuites.notification({ title:'Calendar', message:'Calendar is closed now!' });
    },
    onchange: function(instance, value) {
        document.getElementById('log').innerText = 'New value is: ' + value;
    }
});
</script>
</html>
```

