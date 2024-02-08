title: Javascript string and number mask
keywords: Javascript, mask, input mask, currency mask, money mask, javascript mask
description: A simple javascript mask plugin

![](img/js-mask.svg)

JavaScript input mask
=====================

The new input mask plugin brings a much better user experience. Now it considers the special keys, selections, and other user non-input actions on input elements with any JavaScript mask. In the newer version, it is possible to mask DIV.contentEditable HTML elements, and also it brings Excel-like mask options. The JavaScript mask integrates the user key down through events. Define the data-mask property in your input fields to start using.  
  

* React, Angular, Vue compatible;
* Mobile friendly;
* Date picker;
* Time picker;
* Year-month picker;
* Several events and easy integration;
* JS plugin or web component;

 
  

Examples
--------

### Using mask in HTML form elements

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

### Using mask on contentEditable elements

Enter the currency price (Mask: U$ #.##0,00)

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
  

### More examples


Advance masking combination
---------------------------

A few valid tokens can be used with mask as below:<br>

| Mask                     |
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

  
  

### More information about the jSuites JavaScript mask plugin

* [See more javascript mask working examples](/docs/v5/javascript-mask/basic)
* [More information about the available mask tokens](/docs/v5/javascript-mask/quick-reference)
* [Programmatic methods](/docs/v5/javascript-mask/basic)
