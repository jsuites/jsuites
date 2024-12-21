title: Responsive JavaScript Calendar
keywords: JavaScript, Calendar, Date Picker, DateTime Picker, Responsive Calendar, Mobile-Friendly Calendar, JavaScript Examples, Mobile Optimization
description: Learn how to integrate a responsive JavaScript calendar optimized for mobile and smaller screens, delivering a seamless user experience across all devices.
canonical: https://jsuites.net/docs/javascript-calendar/mobile

{.breadcrumb}
- [Back to the JavaScript Calendar documentation](/docs/javascript-calendar)
- Examples

# Responsive JavaScript Calendar

## Full-Screen Mode

Enable the `calendar` in full-screen mode by setting the fullscreen property to `true`. This mode activates automatically on screens narrower than 800 pixels, optimizing usability on `smaller devices`.

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


## More examples

Explore additional use cases for the jSuites JavaScript Calendar plugin:

* [Year and Month Selection](/docs/javascript-calendar/year-month)
* [JavaScript Calendar Events](/docs/javascript-calendar/events)
* [Calendar Date Range Validations](/docs/javascript-calendar/valid-range)
* [International Settings](/docs/javascript-calendar/international)
* [Responsive JavaScript Calendar](/docs/javascript-calendar/mobile)
