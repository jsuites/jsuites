title: Javascript Calendar: Valid Ranges
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, valid range
description: Learn how to create a valid selectable range of dates in the javascript calendar. Any date out of the range would be gray out.
canonical: https://jsuites.net/docs/v4/javascript-calendar/valid-range

{.white}
> A new version of the **JavaScript Calendar** range validation page is available here.
> <br><br>
> [Calendar Events on v5](/docs/javascript-calendar/valid-range){.button .main target="_top"}


{.breadcrumb}
- [JavaScript Calendar](/docs/v4/javascript-calendar)
- Examples


# JavaScript Calendar Range Validation

Using the validRange property to prevent a date outside the valid range.  
  

## Example

One of the valid range properties can be left blank to define a range from a certain date or up to a specific date.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
// Create the calendar
jSuites.calendar(document.getElementById('calendar'), {
    time: true,
    format: 'DD/MM/YYYY HH24:MI',
    placeholder: 'DD/MM/YYYY HH24:MI',
    readonly: false,
    // Define the valid range of dates
    validRange: [ '2024-06-01', '2026-06-01' ]
});
</script>
</html>
```

