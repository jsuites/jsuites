title: JavaScript Calendar and Time Picker Events
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Examples, Time, Timepicker, Events
description: Explore handling events with the Jsuites JavaScript Calendar. This guide provides insights into effectively managing date and time selection events and enhancing your web applications with interactive and user-friendly calendar functionalities.


[JavaScript Calendar](/docs/javascript-calendar)

JavaScript Calendar Events
==========================

This section delves into the event-handling capabilities of the JavaScript calendar plugin, offering detailed documentation on effectively utilising these events within your applications.

## Documentation

The calendar plugin supports a variety of events, enabling developers to implement dynamic and responsive features based on user interactions with the calendar component. These events include:

| Event    | description                                                                                                                             |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| onopen   | `onopen(el: DOMElement) => void`  <br>This method is called when the calendar is opened.                                                |
| onclose  | `onclose(el: DOMElement) => void`  <br>This method is called when the calendar is closed.                                               |
| onchange | `onchange(DOMElement element, string currentValue, string previousValue) => void`  <br>This method is called when the value is changed. |
| onupdate | `onupdate(DOMElement element, string value) => void`  <br>This method is called when a information changes.                             |

 

Examples
-------

How to use JavaScripts events to integrate the calendar with any web application.

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

