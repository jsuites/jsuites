title: Responsive JavaScript Calendar
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Examples, Responsive Calendar, Mobile Calendar
description: Discover how to integrate this responsive JavaScript Calendar optimized for mobile and smaller screens, to bring a seamless user experience across devices to your web applications.

[JavaScript Calendar](/docs/javascript-calendar)

# Responsive JavaScript Calendar

## Full-Screen Mode

Activate full-screen mode in the JavaScript calendar by setting the fullscreen: property to true. This feature is automatically enabled for screens narrower than 800 pixels, ensuring optimal usability on smaller devices.
  
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
// Create new calendar instance in full screen mode
jSuites.calendar(document.getElementById('calendar'), {
    // Enable the fullscreen mode
    fullscreen: true,
    format: 'DD/MM/YYYY HH24:MI',
    placeholder: 'DATE AND TIME',
    // Enable the hour and minute dropdowns
    time: true,
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
      <Calendar ref={calendar} fullscreen={true}
        format={'DD/MM/YYYY HH24:MI'}
        placeholder={'DATE AND TIME'}
        time={true} />
    </div>
  );
}

export default App;
```
```vue
<template>
    <Calendar ref="calendar" format="DD/MM/YYYY HH24:MI" placeholder="DATE AND TIME" :fullscreen="true" :time="true" />
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

