title: JavaScript Year Month Picker
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Examples, Year Picker, Month Picker
description: Easily select year and month with our JavaScript picker, streamlining date inputs for more efficient user experiences.

[JavaScript Year Month Picker](/docs/javascript-calendar)

# JavaScript Calendar: Year Month Picker

This section covers the process of setting up the jSuites `calendar plugin` to serve as a JavaScript year and month picker selector, thereby excluding daily selection to tailor the calendar more closely to specific application requirements.

## Example

### JavaScript Year Month Picker

This feature allows for a simplified interface where users can quickly navigate and select a particular year and month, ideal for reports, archives, and any scenario where the day of the month is secondary.

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
    <Calendar ref="calendar" type="year-month-picker" format="DD/MM/YYYY HH:MM" :validRange="['2024-02-01', '2025-12-31']" />
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