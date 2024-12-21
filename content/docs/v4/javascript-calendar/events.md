title: Javascript Calendar and Timepicker Events
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, time, timepicker, events
description: How to handle the jSuites calendar picker native events.
canonical: https://jsuites.net/docs/v4/javascript-calendar/events

{.white}
> A new version of the **JavaScript Calendar** events page is available here.
> <br><br>
> [Calendar Events on v5](/docs/javascript-calendar/events){.button .main target="_top"}


{.breadcrumb}
- [JavaScript Calendar](/docs/v4/javascript-calendar)
- Examples


# JavaScript Calendar and Time Picker Events

This section provides more information about the events on the javascript calendar plugin.  
  
## Documentation

The calendar provides the following events:  

| Event    | description                                                                                                                             |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| onopen   | `onopen(el: DOMElement) => void`<br>This method is called when the calendar is opened.                                                |
| onclose  | `onclose(el: DOMElement) => void`<br>This method is called when the calendar is closed.                                               |
| onchange | `onchange(DOMElement element, string currentValue, string previousValue) => void`<br>This method is called when the value is changed. |
| onupdate | `onupdate(DOMElement element, string value) => void`<br>This method is called when a information changes.                             |

  
## Example

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

