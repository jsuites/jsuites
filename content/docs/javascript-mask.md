title: Javascript Input Mask
keywords: Javascript, mask, input mask, currency mask, money mask, javascript mask
description: A simple javascript mask plugin. Create mask on HTML input to make sure the data is correctly input on form elements.

![JavaScript Input Mask](img/js-mask.svg)

# JavaScript Mask

## Overview

The JavaScript Input Mask plugin is a versatile component designed to enhance user input experience by providing masking functionality for input elements. It offers comprehensive support for handling special keys, selections, and non-input actions. Additionally, it extends its functionality to support contentEditable DIV elements and introduces new tokens inspired by Excel-like masks.

### Technical Highlights:

- Compatible with popular frameworks like React, Angular, and Vue;
- Optimized for mobile devices, ensuring usability across various platforms;
- Provides features such as date picker, time picker, and year-month picker;
- Offers a range of events for seamless integration with existing systems;
- Can be utilized as a JavaScript plugin or web component;

## Documentation

### Input Mask Tokens

The JavaScript Input Mask plugin supports the following tokens for defining input masks. Some tokens can be combined, such as Date-time tokens, to create advanced and Excel-like mask patterns:

| Method         | Description               |
|----------------|---------------------------|
| **a**          | Any letter                |
| **0**          | Number                    |
| **0 liters**   | Number                    |
| **0%**         | Percentage                |
| **#,##0**      | Currency                  |
| **$ #,##0.00** | Currency with decimal     |
| **$ #.##0,00** | Currency with decimal     |
| **dd/mm/yyyy** | Date                      |
| **hh:mm**      | Time                      |
| **yyyy**       | Year four digits          |
| **yy**         | Year two digits           |
| **mm**         | Month                     |
| **dd**         | Day                       |
| **hh24**       | Hour 24                   |
| **hh**         | Hour 12                   |
| **mi**         | Minutes                   |
| **ss**         | Seconds                   |
| **\a**         | Letter "a" (escape for a) |
| **\0**         | Number "0" (escape for 0) |
| **[-]**        | Number signal (- or +)    |


### Excel-like Input Mask

The JavaScript Input Mask plugin supports Excel-like input masks. Below are some valid tokens that can be used with the mask:

| Tokens                   |
|--------------------------|
| 0                        |
| 0.00                     |
| 0%                       |
| 0.00%                    |
| #,##0                    |
| #,##0.00                 |
| #,##0;(#,##0)            |
| #,##0;[Red](#,##0)       |
| #,##0.00;(#,##0.00)      |
| #,##0.00;[Red](#,##0.00) |
| d-mmm-yy                 |
| d-mmm                    |
| dd/mm/yyyy               |
| mmm-yy                   |
| h:mm AM/PM               |
| h:mm:ss AM/PM            |
| h:mm                     |
| h:mm:ss                  |
| m/d/yy h:mm              |
| mm:ss                    |
| [h]:mm:ss                |


## Examples

### Using Masks in HTML Form Elements

Learn how to apply masks to HTML input elements using tokens:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>

<label>What is your birthday? <i>(Mask: dd/mm/yyyy)</i></label><br>
<input data-mask='dd/mm/yyyy'><br>

<label>US Format <i>(Mask: US #.##0,00)</i></label><br>
<input data-mask='#.##0,00'><br>

<label>Percent mask <i>(Mask: 0%)</i></label><br>
<input data-mask='0%'><br>

<label>How many liters <i>(Mask: 0.00 liters)</i></label><br>
<input data-mask='0.00 liters'><br>

<label>EURO French Format <i>(Mask: # ##0,00 €)</i></label><br>
<input data-mask='# ##0,00 €'><br>

<label>DateTime <i>yyyy-mm-dd hh24:mi</i></label><br>
<input data-mask='yyyy-mm-dd hh24:mi'><br>

<label>CPF <i>000.000.000-00</i></label><br>
<input data-mask='000.000.000-00'><br>
</html>
```
```jsx
import "jsuites"
import "jsuites/dist/jsuites.css"

function App() {
    return (
        <div className="App">
            <label>What is your birthday? <i>(Mask: dd/mm/yyyy)</i></label><br/>
            <input data-mask="dd/mm/yyyy"/><br/>

            <label>US Format <i>(Mask: US #.##0,00)</i></label><br/>
            <input data-mask="#.##0,00"/><br/>

            <label>Percent mask <i>(Mask: 0%)</i></label><br/>
            <input data-mask="0%"/><br/>

            <label>How many liters <i>(Mask: 0.00 liters)</i></label><br/>
            <input data-mask="0.00 liters"/><br/>

            <label>EURO French Format <i>(Mask: # ##0,00 €)</i></label><br/>
            <input data-mask="# ##0,00 €"/><br/>

            <label>DateTime <i>yyyy-mm-dd hh24:mi</i></label><br/>
            <input data-mask="yyyy-mm-dd hh24:mi"/><br/>

            <label>CPF <i>000.000.000-00</i></label><br/>
            <input data-mask="000.000.000-00"/><br/>
        </div>
    );
}

export default App;
```
```vue
<template>
    <label>What is your birthday? <i>(Mask: dd/mm/yyyy)</i></label><br />
    <input data-mask="dd/mm/yyyy" /><br />

    <label>US Format <i>(Mask: US #.##0,00)</i></label><br />
    <input data-mask="#.##0,00" /><br />

    <label>Percent mask <i>(Mask: 0%)</i></label><br />
    <input data-mask="0%" /><br />

    <label>How many liters <i>(Mask: 0.00 liters)</i></label><br />
    <input data-mask="0.00 liters" /><br />

    <label>EURO French Format <i>(Mask: # ##0,00 €)</i></label><br />
    <input data-mask="# ##0,00 €" /><br />

    <label>DateTime <i>yyyy-mm-dd hh24:mi</i></label><br />
    <input data-mask="yyyy-mm-dd hh24:mi" /><br />

    <label>CPF <i>000.000.000-00</i></label><br />
    <input data-mask="000.000.000-00" /><br />
</template>

<script>
import "jsuites"
import "jsuites/dist/jsuites.css"


export default {
    name: "App",
}
</script>
```

### Using Mask on contentEditable Elements

You can apply masks to contentEditable elements for user input, such as entering currency prices. For example, to enforce the mask "U$ #.##0,00", follow this HTML code:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<div contentEditable='true' data-mask='U$ #.##0,00' class="input" style="width: 200px"></div>
</html>
```
```jsx
import "jsuites"
import 'jsuites/dist/jsuites.css'

function App() {
    return (
        <div className="App">
            <div contentEditable="true" data-mask="U$ #.##0,00" class="input" style="width: 200px"></div>
        </div>
    );
}

export default App;
```
```vue
<template>
    <div contentEditable="true" data-mask="U$ #.##0,00" class="input" style="width: 200px"></div>
</template>

<script>
import "jsuites"
import "jsuites/dist/jsuites.css"


export default {
    name: "App",
}
</script>
```

### Events

In the following example, a notification is displayed when data in an input field is completed. Upon completion, a property data-completed=true is added to the HTML element.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<p>What is your birthday? <strong>dd/mm/yyyy</strong></p>
<input id='input-date-content-editable' data-mask='dd/mm/yyyy'> <span id='mask-status'></span>

<script>
let log = document.getElementById('mask-status');
document.getElementById('input-date-content-editable').addEventListener('keyup', function(e) {
    log.innerHTML = '';
    if (e.target.getAttribute('data-completed') == 'true') {
        log.innerHTML = 'Complete';
    } else {
        log.innerHTML = 'Incomplete';
    }
})
</script>
</html>
```
```jsx
import { useRef } from "react";
import "jsuites";
import "jsuites/dist/jsuites.css";

function App() {
    const log = useRef(null);

    const handleKeyUp = function(e) {
        log.current.innerHTML = '';
        if (e.target.getAttribute('data-completed') == 'true') {
            log.current.innerHTML = 'Complete';
        } else {
            log.current.innerHTML = 'Incomplete';
        }
    };

    return (
        <div className="App">
            <p>What is your birthday? <strong>dd/mm/yyyy</strong></p>
            <input id='input-date-content-editable' data-mask='dd/mm/yyyy' onKeyUp={handleKeyUp} /><span ref={log}></span>
        </div>
    );
}

export default App;
```
```vue
<template>
    <div class="App">
        <p>What is your birthday? <strong>dd/mm/yyyy</strong></p>
        <input id="input-date-content-editable" data-mask="dd/mm/yyyy" @keyup="handleKeyUp" /><span ref="log"></span>
    </div>
</template>
  
<script>
import "jsuites"

export default {
    methods: {
        handleKeyUp(e) {
            this.$refs.log.innerHTML = "";
            if (e.target.getAttribute("data-completed") === "true") {
                this.$refs.log.innerHTML = "Complete";
            } else {
                this.$refs.log.innerHTML = "Incomplete";
            }
        },
    },
};
</script>
```

### JavaScript Mask Methods

You can programmatically apply a mask to a string using `jSuites.mask` with the following method:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<label>String without mask<br><input type="text" id="mask-method-text" value="1234.45"/></label><br>
<label>Mask<br><input type="text" id="mask-method-mask" value="#.##0,00"/> </label><br>
<button id="btn" class="jbutton dark">Parse string</button><br><br>
<label>Result<br><input type="text" id="result"/></label>

<script>
var text = document.getElementById('mask-method-text');
var mask = document.getElementById('mask-method-mask');
document.getElementById('btn').addEventListener('click', function() {
    document.getElementById('result').value = jSuites.mask.run(parseFloat(text.value), mask.value);
})
</script>
</html>
```
```jsx
import { useRef, useState } from "react";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

function App() {
    const maskText = useRef(null);
    const maskMask = useRef(null);
    const result = useRef(null);

    const [text, setText] = useState(1234.45);
    const [mask, setMask] = useState("#.##0,00");

    const handleClick = function() {
        result.current.value = jSuites.mask.run(parseFloat(maskText.current.value), maskMask.current.value);
    };

    return (
        <div className="App">
            <label>String without mask<br/><input type="text" ref={maskText} value={text} onChange={e => setText(e.target.value)} /></label><br />
            <label>Mask<br/><input type="text" ref={maskMask} value={mask} onChange={e => setMask(e.target.value)}/> </label><br/>
            <button class="jbutton dark" onClick={handleClick}>Parse string</button><br/><br/>
            <label>Result<br/><input type="text" ref={result} /></label>
        </div>
    );
}

export default App;
```
```vue
<template>
    <div class="App">
        <label>
            String without mask
            <br />
            <input type="text" v-model="text" />
        </label>
        <br />
        <label>
            Mask
            <br />
            <input type="text" v-model="mask" />
        </label>
        <br />
        <button class="jbutton dark" @click="handleClick">Parse string</button>
        <br /><br />
        <label>
            Result
            <br />
            <input type="text" v-model="result" />
        </label>
    </div>
</template>
  
<script>
import jSuites from "jsuites"
import "jsuites/dist/jsuites.css";

export default {
    data() {
        return {
            text: "1234.45",
            mask: "#.##0,00",
            result: "",
        };
    },
    methods: {
        handleClick() {
            this.result = jSuites.mask.run(
                parseFloat(this.text),
                this.mask
            );
        },
    },
};
</script>
```

