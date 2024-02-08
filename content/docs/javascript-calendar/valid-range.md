title: JavaScript Calendar Valid Range
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Valid Range
description: Set a valid date range in your JavaScript calendar to grey out dates outside this range, ensuring a guided and precise user selection.

[JavaScript Calendar](/docs/javascript-calendar)

# JavaScript Calendar: Valid Range Configuration

Leverage the `validRange` property in the JavaScript calendar to restrict date selections, ensuring users cannot pick dates outside the specified range.

## Example Usage

The `validRange` property supports partial definition, allowing you to set only the start or end date of the range. This flexibility lets you define ranges that start from a specific date onwards or range that end at a certain date, leaving the other boundary open-ended.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

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
```jsx
import { Calendar } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
  const calendar = useRef(null);

  return (
    <div className="App">
      <Calendar ref={calendar} time={true}
        format={'DD/MM/YYYY HH24:MI'}
        placeholder={'DD/MM/YYYY HH24:MI'}
        readonly={false}
        validRange={['2024-06-01', '2026-06-01']} />
    </div>
  );
}

export default App;
```
```vue
<template>
    <Calendar ref="calendar" :time="true" format="DD/MM/YYYY HH24:MI" placeholder="DD/MM/YYYY HH24:MI" :readonly="false"
        :validRange="['2024-06-01', '2026-06-01']" />
</template>

<script>
import { Calendar } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Calendar
    },
}
</script>
```
