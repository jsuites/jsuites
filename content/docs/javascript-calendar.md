title: JavaScript Calendar
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker
description: Jsuites calendar is a lightweight JavaScript Calendar plugin offering a fully responsive date and date time picker designed for effortless integration.

![JavaScript Calendar](img/js-calendar.svg)

JavaScript Calendar
===================

Jsuites Calendar is a JavaScript Calendar and responsive web component plugin that combines the functionality of a calendar, date picker, and date-time picker. Designed to deliver an exceptional user experience across various devices, this lightweight JavaScript tool is a valuable addition to any web application, simplifying date selection and enhancing overall usability.  
  

* React, Angular, VueJS compatible;
* Mobile friendly;
* Date picker;
* Time picker;
* Year-month picker;
* Several events and easy integration;
* JavaScript Plugin or Web Component;
* Valid Range Definitions
* International settings

  

Documentation
-------------

#### Install

```bash
npm install jsuites
```

### Methods

Upon creating a calendar instance, you can access various methods that facilitate programmatic interaction.  

| Method              | Description                                                                                                                                                 |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| open()              | Activates the JavaScript calendar picker for user interaction.                                                                                              |
| close(ignoreEvents) | Deactivates the calendar, with an option to skip the onclose event.  <br>@param int ignoreEvents - If set, the onclose event will not be triggered.         |
| getValue()          | Fetches the currently selected date.                                                                                                                        |
| setValue(newValue)  | Assigns a new value to the JavaScript calendar and time picker.  <br>@param mixed newValue - The new date should be set in the format: YYYY-MM-DD HH:MM:SS. |
| reset()             | Clears the current input value.                                                                                                                             |
| next()              | Advances the calendar to the next month.                                                                                                                    |
| prev()              | Moves the calendar back to the previous month.                                                                                                              |

  

### Events

When you create a new calendar, you have access to the following events:  

| Method   | Description                                                         |
|----------|---------------------------------------------------------------------|
| onchange | Fires a method when the calendar's value changes.                   |
| onupdate | Invokes a method whenever any update occurs in the calendar picker. |
| onclose  | Activates a method once the calendar picker is closed.              |
| onopen   | Initiates a method when the calendar picker is opened.              |


### Initial settings

The initial settings allow you to configure and customize the behaviour of the calendar according to your requirements.  

| Property                   | Description                                                                                                                                                                         |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type: string               | Defines the picker type as either 'default' or 'year-month-picker'. Default is `default`.                                                                                           |
| validRange: [ date, date ] | Restricts date selection to a specified range. Default is `null`, meaning no restrictions.                                                                                          |
| startingDay: number        | Sets the starting day of the week, with 0 being Sunday and 6 being Saturday. Default is `0 (Sunday)`.                                                                               |
| format: string             | Sets the date format. Default format is `YYYY-MM-DD`.                                                                                                                               |
| readonly: boolean          | If true, disables manual changes to the input field.                                                                                                                                |
| today: boolean             | If no default value is set, and this is set to true, the calendar opens with today's date. Default is `false`.                                                                      |
| time: boolean              | If set to true, includes a time picker in the calendar. Default is `false`.                                                                                                         |
| resetButton: boolean       | If true, a reset button is displayed. Default is `true`.                                                                                                                            |
| placeholder: string        | Text displayed when the input field is empty.                                                                                                                                       |
| months: array              | Array containing short names of the months. Default is `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`.                                      |
| monthsFull: array          | Array containing full names of the months. Default is `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`. |
| weekdays: array            | Array containing names of the weekdays. Default is `['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']`.                                                |
| weekdays_short: array      | Array containing short names of the weekdays. Default is `['S', 'M', 'T', 'W', 'T', 'F', 'S']`.                                                                                     |
| value: string              | Sets a default date.                                                                                                                                                                |
| fullscreen: boolean        | If true, renders the calendar in fullscreen. Default is `true` for screens with a width of 800px or less.                                                                           |
| opened: boolean            | If set to true, the calendar opens by default. Default is `false`.                                                                                                                  |
| textDone: string           | Sets the text of the 'Done' button.                                                                                                                                                 |
| textReset: string          | Sets the text of the 'Reset' button.                                                                                                                                                |
| textUpdate: string         | Sets the text of the 'Update' button.                                                                                                                                               |


### Helpers

The following static methods are available to general date and time operations.  

| Description                                                                                                                                                                             |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `jSuites.calendar.prettify(date: string, text: object)`  <br>This method helps convert a date string into a time lapse from the date.                                                   |
| `jSuites.calendar.prettify()`  <br>Retrieves all dates on a page that contain the class .prettydate to prettify the date.                                                               |
| `jSuites.calendar.now()`  <br>Returns the current date as a string.                                                                                                                     |
| `jSuites.calendar.dateToNum(date: string\|object) => number`  <br>Transforms a date string or object into an Excel-like number, for example, 45134.                                     |
| `jSuites.calendar.numToDate(date: number) => string`  <br>Transforms an Excel-like number into a date string.                                                                           |
| `jSuites.calendar.extractDateFromString(date: string, format: string) => string`  <br>Attempts to convert a formatted date string into an ISO date string based on the provided format. |
| `jSuites.calendar.getDateString(date: string, format: string)`  <br>Transforms an ISO date string or date object into a formatted string.                                               |


### Format

The format consists of a versatile set of tokens that define the representation of dates and times. Here are a few examples of combination of tokens you can utilize:  

| Token     | Description                                                         |
|-----------|---------------------------------------------------------------------|
| **DAY**   | Represents the day of the week (e.g., Monday).                      |
| **WD**    | Represents the abbreviated day of the week (e.g., Mon).             |
| **DDDD**  | Represents the full name of the day of the week (e.g., Monday).     |
| **DDD**   | Represents the abbreviated name of the day of the week (e.g., Mon). |
| **DD**    | Represents the two-digit day of the month (e.g., 05).               |
| **D**     | Represents the day of the month (e.g., 5).                          |
| **Q**     | Represents the quarter of the year (e.g., Q1).                      |
| **HH24**  | Represents the hour in 24-hour format (e.g., 13 for 1 PM).          |
| **HH12**  | Represents the hour in 12-hour format (e.g., 01 for 1 AM/PM).       |
| **HH**    | Represents the two-digit hour (e.g., 01 or 13).                     |
| **H**     | Represents the hour (e.g., 1 or 13).                                |
| **AM**    | M: Represents the AM/PM indicator.                                  |
| **MI**    | Represents the two-digit minute (e.g., 07).                         |
| **SS**    | Represents the two-digit second (e.g., 42).                         |
| **MS**    | Represents the milliseconds (e.g., 345).                            |
| **YYYY**  | Represents the four-digit year (e.g., 2022).                        |
| **YYY**   | Represents the three-digit year (e.g., 022).                        |
| **YY**    | Represents the two-digit year (e.g., 22).                           |
| **Y**     | Represents the year (e.g., 2022).                                   |
| **MONTH** | Represents the full name of the month (e.g., January).              |
| **MON**   | Represents the abbreviated name of the month (e.g., Jan).           |
| **MMMMM** | Represents the abbreviated name of the month (e.g., Jan).           |
| **MMMM**  | Represents the full name of the month (e.g., January).              |
| **MMM**   | Represents the abbreviated name of the month (e.g., Jan).           |
| **MM**    | Represents the two-digit month (e.g., 01).                          |
| **M**     | Represents the month (e.g., 1).                                     |

| Format examples |
|-----------------|
| `mm/dd/yyyy`    |
| `dd/mm/yyyy`    |
| `d/m/y`         |
| `hh:mm:ss`      |
| `d/m/h h:m:s`   |
 

Examples
--------

### Basic date input

Create a responsive date and time input with a calendar picker. This tool will let users choose dates and times according to a specific format and keep track of any events that occur when changes are made.  

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<input id='calendar' />
<input type="button" value="getValue()" id="btn" />
<script>
let instance = jSuites.calendar(document.getElementById('calendar'), {
    format: 'DD/MM/YYYY HH:MM',
    time: true,
    onchange: function() {
        console.log(arguments)
    }
});

document.getElementById('btn').addEventListener('click', function() {
    alert(instance.getValue());
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
            <Calendar ref={calendar} format={'DD/MM/YYYY HH:MM'} time={true} onchange={() => { console.log(arguments) }} />
            <button onClick={() => alert(calendar.current.getValue())}>Get Value</button>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Calendar
        ref="calendar"
        format="DD/MM/YYYY HH:MM"
        :time="true"    
        :onchange="onUpdate"
    />
    <button @click="handleClick">getValue()</button>
</template>

<script>
import { Calendar } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Calendar
    },
    methods: {
        onChange: function() {
            console.log(arguments)
        },
        handleClick: function() {
            alert(this.$refs.calendar.current.getValue())
        }
    }
}
</script>
```

### Embed an calendar on your application

Embed a calendar picker with programmable actions to facilitate seamless date and time selection while allowing for automated programmatic responses.  

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='calendar'></div>

<input type="button" value="getValue()" id="btn"/>

<script>
let instance = jSuites.calendar(document.getElementById('calendar'), {
    format: 'DD/MM/YYYY HH:MM',
    onupdate: function() {
        console.log(arguments)
    }
});

document.getElementById('btn').addEventListener('click', function() {
    alert(instance.getValue());
})
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
            <Calendar ref={calendar} format={'DD/MM/YYYY HH:MM'} time={true} onupdate={() => { console.log(arguments) }} />
            <button onClick={() => alert(calendar.current.getValue())}>Get Value</button>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Calendar
        ref="calendar"
        format="DD/MM/YYYY HH:MM"
        :time="true"    
        :onupdate="onUpdate"
    />
    <button @click="handleClick">getValue()</button>
</template>

<script>
import { Calendar } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Calendar
    },
    methods: {
        onUpdate: function() {
            console.log(arguments)
        },
        handleClick: function() {
            alert(this.$refs.calendar.current.getValue())
        }
    }
}
</script>
```

### Date picker web component

The following example illustrates utilising the jSuites calendar as a calendar picker web component, including how to bind JavaScript events.  

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<jsuites-calendar value="2020-01-20"></jsuites-calendar>

<script>
document.querySelector('jsuites-calendar').addEventListener('onchange', function(e) {
    console.log('New value: ' + e.target.value);
});
document.querySelector('jsuites-calendar').addEventListener('onclose', function(e) {
    console.log('Calendar is closed');
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

    const onChange = function(el, cv, pv) {
        console.log('New value: ' + cv);
    }

    const onClose = function(el) {
        console.log('Calendar is closed');        
    }

    return (
        <div className="App">
            <Calendar
                ref={calendar}
                value={"2020-01-20"}
                onchange={onChange}
                onclose={onClose}
            />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Calendar ref="calendar" value="2020-01-20" :onchange="onChange" :onclose="onClose" />
</template>

<script>
import { Calendar } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Calendar
    },
    methods: {
        onChange: function (_, cv) {
            console.log('New value: ' + cv);
        },
        onClose: function () {
            console.log('Calendar is closed')
        }
    }
}
</script>
```

## More examples

You can find more examples of the jSuites JavaScript Calendar plugin as below.

* [Year and month only](/docs/javascript-calendar/year-month)
* [JavaScript events](/docs/javascript-calendar/events)
* [Valid date range](/docs/javascript-calendar/valid-range)
* [International settings](/docs/javascript-calendar/international)
* [Responsive JavaScript Calendar](/docs/javascript-calendar/mobile)


### Reactive JavaScript Calendar

LemonadeJS Reactive JavaScript Calendar is free JavaScript Plugin that can create range picker, has keyboard navigation and focus on the best user experience.

- [JavaScript Calendar with Date Range Picker](https://lemonadejs.net/docs/plugins/calendar){target="_blank"}


