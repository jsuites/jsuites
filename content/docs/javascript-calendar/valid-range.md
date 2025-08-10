title: JavaScript Calendar Valid Range
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Valid Range
description: Set a valid date range in your JavaScript calendar to grey out dates outside this range, ensuring a guided and precise user selection.
canonical: https://jsuites.net/docs/javascript-calendar/valid-range

# JavaScript Calendar: Range Validations

The `validRange` property allows partial definitions, enabling you to set a start or an end date. This flexibility supports **ranges** that begin from a specific date or end at a particular date while leaving the other boundary open-ended.

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


## More examples

Explore additional use cases for the jSuites JavaScript Calendar plugin:

* [Year and Month Selection](/docs/javascript-calendar/year-month)
* [JavaScript Calendar Events](/docs/javascript-calendar/events)
* [Calendar Date Range Validations](/docs/javascript-calendar/valid-range)
* [International Settings](/docs/javascript-calendar/international)
* [Responsive JavaScript Calendar](/docs/javascript-calendar/mobile)
