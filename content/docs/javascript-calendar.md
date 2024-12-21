title: JavaScript Calendar
keywords: JavaScript, jSuites, Calendar, Date Picker, DateTime Picker, Responsive Calendar
description: Discover jSuites Calendar, a lightweight, responsive JavaScript Calendar plugin for seamless date and datetime picking.
canonical: https://jsuites.net/docs/javascript-calendar

![JavaScript Calendar](img/js-calendar.svg){.right}

# JavaScript Calendar

The jSuites Calendar is a lightweight JavaScript Calendar plugin and web component crafted to facilitate the creation of calendar
components. It supports date selection, date pickers, and datetime pickers. Engineered for an outstanding user experience,
it ensures compatibility across various devices.

- **Framework Agnostic**: Seamless integration with React, Angular, VueJS, and more.
- **Responsiveness**: Optimized for mobile devices.
- **Functionality**: Enables date and time selection.
- **Custom Views**: Supports year-month only display.
- **Event Handling**: Offers multiple events for straightforward integration.
- **Flexibility**: Available as a JavaScript Plugin or Web Component.
- **Date Constraints**: Allows for the definition of valid date ranges.
- **Localization**: Supports international settings for global usability.

## Documentation

### Install

```bash
npm install jsuites
```

### Methods

Upon initializing a calendar instance, the following methods are available for programmatic interaction:

| Method               | Description                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `open()`             | Opens the calendar picker, allowing user interaction.                                                                                                      |
| `close(ignoreEvents)`| Closes the calendar. If `ignoreEvents` is set to true, the `onclose` event will not be triggered.<br>`@param boolean ignoreEvents` - Skips the `onclose` event.|
| `getValue()`         | Retrieves the currently selected date.                                                                                                                         |
| `setValue(newValue)` | Sets a new date for the calendar.<br>`@param mixed newValue` - The new date, formatted as `YYYY-MM-DD HH:MM:SS`.                                              |
| `reset()`            | Clears the current selection, resetting the input value.                                                                                                       |
| `next()`             | Advances the calendar to the next month.                                                                                                                       |
| `prev()`             | Moves the calendar back to the previous month.                                                                                                                 |



### Events

You can bind one of the following events to your calendar to seamlessly integrate it with your application:

| Method     | Description                                                                  |
|------------|------------------------------------------------------------------------------|
| `onchange` | Fires a method when the calendar's value changes.                            |
| `onupdate` | Invokes a method whenever any update occurs in the calendar picker.          |
| `onclose`  | Activates a method once the calendar picker is closed.                       |
| `onopen`   | Initiates a method when the calendar picker is opened.                       |  

### Initial Settings

Customize the behavior of the calendar with the following initial settings:

| Property                     | Description                                                                                                    |
|------------------------------|----------------------------------------------------------------------------------------------------------------|
| `type: string`               | Defines the picker type as either `'default'` or `'year-month-picker'`. Default is `'default'`.                |
| `validRange: [ date, date ]` | Restricts date selection to a specified range. Default is `null`, allowing for unrestricted selection.         |
| `startingDay: number`        | Sets the starting day of the week, with 0 being Sunday and 6 being Saturday. Default is `0 (Sunday)`.          |
| `format: string`             | Sets the date format. Default format is `'YYYY-MM-DD'`.                                                        |
| `readonly: boolean`          | If true, disables manual changes to the input field.                                                           |
| `today: boolean`             | If true, opens the calendar with today's date when no default value is set. Default is `false`.                |
| `time: boolean`              | If true, includes a time picker in the calendar. Default is `false`.                                           |
| `resetButton: boolean`       | If true, a reset button is displayed. Default is `true`.                                                       |
| `placeholder: string`        | Text displayed when the input field is empty.                                                                  |
| `months: array`              | Array containing short names of the months. Default is `['Jan', 'Feb', 'Mar', ...]`.                           |
| `monthsFull: array`          | Array containing full names of the months. Default is `['January', 'February', ...]`.                          |
| `weekdays: array`            | Array containing names of the weekdays. Default is `['Sunday', 'Monday', ...]`.                                |
| `weekdays_short: array`      | Array containing short names of the weekdays. Default is `['S', 'M', ...]`.                                    |
| `value: string`              | Sets a default date.                                                                                           |
| `fullscreen: boolean`        | If true, renders the calendar in fullscreen. Default is `true` for screens with a width of 800px or less.      |
| `opened: boolean`            | the calendar opens by default if set to true. Default is `false`.                                              |
| `textDone: string`           | Sets the text of the 'Done' button.                                                                            |
| `textReset: string`          | Sets the text of the 'Reset' button.                                                                           |
| `textUpdate: string`         | Sets the text of the 'Update' button.                                                                          |
| `is24HourFormat: boolean`    | If set to false, time picker will display AM/PM format. Default is true.                                       |


### Helpers

Utilize the following static methods for general date and time operations:

| Description                                                                                                                                                                              |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `jSuites.calendar.prettify(date: string, text: object)`  <br>Converts a date string into a user-friendly time lapse from the current date.                                               |
| `jSuites.calendar.prettify()`  <br>Retrieves all dates on a page with the class `.prettydate` and prettifies them.                                                                       |
| `jSuites.calendar.now()`  <br>Returns the current date as a string.                                                                                                                      |
| `jSuites.calendar.dateToNum(date: string\|object) => number`  <br>Converts a date string or object into an Excel-like number (e.g., 45134).                                              |
| `jSuites.calendar.numToDate(date: number) => string`  <br>Converts an Excel-like number into a date string.                                                                              |
| `jSuites.calendar.extractDateFromString(date: string, format: string) => string`  <br>Attempts to convert a formatted date string into an ISO date string based on the provided format.  |
| `jSuites.calendar.getDateString(date: string, format: string)`  <br>Converts an ISO date string or date object into a formatted string.                                                  |

### Format

The format consists of a versatile set of tokens that define the representation of dates and times. Here are a few examples of combination of tokens you can utilize:  

| Token     | Description                                                          |
|-----------|----------------------------------------------------------------------|
| **DAY**   | Represents the day of the week (e.g., Monday).                       |
| **WD**    | Represents the abbreviated day of the week (e.g., Mon).              |
| **DDDD**  | Represents the full name of the day of the week (e.g., Monday).      |
| **DDD**   | Represents the abbreviated name of the day of the week (e.g., Mon).  |
| **DD**    | Represents the two-digit day of the month (e.g., 05).                |
| **D**     | Represents the day of the month (e.g., 5).                           |
| **Q**     | Represents the quarter of the year (e.g., Q1).                       |
| **HH24**  | Represents the hour in 24-hour format (e.g., 13 for 1 PM).           |
| **HH12**  | Represents the hour in 12-hour format (e.g., 01 for 1 AM/PM).        |
| **HH**    | Represents the two-digit hour (e.g., 01 or 13).                      |
| **H**     | Represents the hour (e.g., 1 or 13).                                 |
| **AM\PM** | Represents the AM/PM indicator.                                      |
| **MI**    | Represents the two-digit minute (e.g., 07).                          |
| **SS**    | Represents the two-digit second (e.g., 42).                          |
| **MS**    | Represents the milliseconds (e.g., 345).                             |
| **YYYY**  | Represents the four-digit year (e.g., 2022).                         |
| **YYY**   | Represents the three-digit year (e.g., 022).                         |
| **YY**    | Represents the two-digit year (e.g., 22).                            |
| **Y**     | Represents the year (e.g., 2022).                                    |
| **MONTH** | Represents the full name of the month (e.g., January).               |
| **MON**   | Represents the abbreviated name of the month (e.g., Jan).            |
| **MMMMM** | Represents the abbreviated name of the month (e.g., Jan).            |
| **MMMM**  | Represents the full name of the month (e.g., January).               |
| **MMM**   | Represents the abbreviated name of the month (e.g., Jan).            |
| **MM**    | Represents the two-digit month (e.g., 01).                           |
| **M**     | Represents the month (e.g., 1).                                      |

| Format examples |
|-----------------|
| `mm/dd/yyyy`    |
| `dd/mm/yyyy`    |
| `d/m/y`         |
| `hh:mm:ss`      |
| `d/m/h h:m:s`   |


Examples
--------

### Basic JavaScript Date Input

Implement a responsive date and time input with a calendar picker. This tool enables users to select dates and times according to a specified format and monitors events triggered by changes.

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
import { Calendar } from 'jsuites/react';
import { useRef } from 'react';

import 'jsuites/dist/jsuites.css';

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

### Embedding a Calendar in Your Application

Incorporate a calendar picker with customizable actions to streamline date and time selection while enabling automated programmatic responses.  

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

### Date Picker Web Component

Explore utilizing the jSuites calendar as a calendar picker web component and binding JavaScript events for enhanced functionality.  

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
import { Calendar } from 'jsuites/react';
import { useRef } from 'react';
import 'jsuites/dist/jsuites.css';

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

Explore additional use cases for the jSuites JavaScript Calendar plugin:

* [Year and Month Selection](/docs/javascript-calendar/year-month)
* [JavaScript Calendar Events](/docs/javascript-calendar/events)
* [Calendar Date Range Validations](/docs/javascript-calendar/valid-range)
* [International Settings](/docs/javascript-calendar/international)
* [Responsive JavaScript Calendar](/docs/javascript-calendar/mobile)


### Reactive JavaScript Calendar

LemonadeJS Reactive JavaScript Calendar is free JavaScript Plugin that can create range picker, has keyboard navigation and focus on the best user experience.

- [JavaScript Calendar with Date Range Picker](https://lemonadejs.com/docs/plugins/calendar){target="_blank"}


