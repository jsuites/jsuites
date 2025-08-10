title: JavaScript Year Month Calendar Picker
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Year Picker, Month Picker
description: Explore the flexibility of JavaScript Year Month Picker, tailored for scenarios requiring exclusive Month/Year selection, offering precise and streamlined inputs for developers.
canonical: https://jsuites.net/docs/javascript-calendar/year-month

# JavaScript Calendar: Year-Month Picker

Learn how to configure the jSuites calendar plugin as a year-and-month picker. This setup disables daily selection, making it ideal for applications requiring precise year and month input, such as reports, archives, or date range filtering.

## Example

### Year-Month Picker Configuration

The following example demonstrates how to enable the year-and-month picker with a defined format and valid date range:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

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
```jsx 
import { Calendar } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
  const calendar = useRef(null);

  return (
    <div className="App">
      <Calendar ref={calendar} type={'year-month-picker'}
        format={'MMM-YYYY'}
        validRange={['2024-02-01', '2025-12-31']} />
    </div>
  );
}

export default App;
```
```vue
<template>
    <Calendar ref="calendar" type="year-month-picker"
        format="DD/MM/YYYY HH:MM" :validRange="['2024-02-01', '2025-12-31']" />
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
