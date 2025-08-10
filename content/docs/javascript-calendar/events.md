title: JavaScript Calendar Events
keywords: JavaScript, Calendar, Date Picker, DateTime Picker, Timepicker, Calendar Events, JavaScript Examples, Interactive Calendar, Date and Time Management
description: Learn how events enable seamless integration of the JavaScript Calendar into your application using native event handling.
canonical: https://jsuites.net/docs/javascript-calendar/events

# JavaScript Calendar Events

This documentation provides examples of using events with the jSuites JavaScript Calendar plugin. Learn how to integrate interactive calendar features into your applications.

## Documentation

### Supported Events

Explore the events available in the calendar plugin with examples to create dynamic and responsive features.

| Event    | description                                                                                                                            |
|----------|----------------------------------------------------------------------------------------------------------------------------------------|
| onopen   | `onopen(el: DOMElement) => void`<br>Triggered when the calendar is opened.                                                             |
| onclose  | `onclose(el: DOMElement) => void`<br>Triggered when the calendar is closed.                                                            |
| onchange | `onchange(DOMElement element, string currentValue, string previousValue) => void`<br>Triggered when the calendar value changes.        |
| onupdate | `onupdate(DOMElement element, string value) => void`<br>Triggered when calendar information is updated.                                |


## Example

This example shows how to declare events like `onopen`, `onclose`, `onchange`, and `onupdate` to handle **calendar interactions**.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

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
```jsx
import { Calendar } from 'jsuites/react'
import jSuites from 'jsuites';
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
  const calendar = useRef(null);
  const log = useRef(null);

  const onOpen = function () {
    jSuites.notification({ title: 'Calendar', message: 'Calendar is open now!' })
  }

  const onClose = function () {
    jSuites.notification({ title: 'Calendar', message: 'Calendar is closed now!' })
  }

  const onChange = function (instance, value) {
    log.current.innerText = 'New value is: ' + value;
  }
  return (
    <div className="App">
      <Calendar ref={calendar} time={true}
        format={'DD/MM/YYYY'}
        placeholder={'DD/MM/YYYY'}
        readonly={false} onopen={onOpen} onclose={onClose} onchange={onChange} />
      <div ref={log}></div>
    </div>
  );
}

export default App;
```
```vue
<template>
    <Calendar ref="calendar" :time="true" format="DD/MM/YYYY" placeholder="DD/MM/YYYY" :readonly="false" :onopen="onOpen"
        :onclose="onClose" :onchange="onChange" />
    <div ref="log"></div>
</template>

<script>
import { Calendar } from "jsuites/vue";
import jSuites from "jsuites";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Calendar
    },
    methods: {
        onChange: function (instance, value) {
            this.$refs.log.innerText = 'New value is: ' + value;
        },
        onClose: function () {
            jSuites.notification({ title: 'Calendar', message: 'Calendar is closed now!' })
        },
        onOpen: function () {
            jSuites.notification({ title: 'Calendar', message: 'Calendar is open now!' })
        }
    }
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
