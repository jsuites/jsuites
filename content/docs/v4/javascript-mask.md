title: Javascript string and number mask
keywords: Javascript, mask, input mask, currency mask, money mask, javascript mask
description: A simple javascript mask plugin

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

![](img/js-mask.svg)

  
  

Examples
--------

### Using mask in HTML form elements

What is your birthday? _(Mask: dd/mm/yyyy)_

US Format _(Mask: US #.##0,00)_

Percent mask _(Mask: 0%)_

How many liters _(Mask: 0.00 liters)_

EURO French Format _(Mask: # ##0,00 €)_

### Using mask on contentEditable elements

Enter the currency price (Mask: U$ #.##0,00)

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<div contentEditable='true' data-mask='U$ #.##0,00' style='border: solid 1px black;'></div>
</html>
```
  
  

### More examples

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>

<label>Dollar</label><br>
<input data-mask='U$ #.##0,00'><br>

<label>Percentual</label><br>
<input data-mask='0%'><br>

<label>Liters</label><br>
<input data-mask='0.00 liters'><br>

<label>Date <i>dd/mm/yyyy</i></label><br>
<input data-mask='dd/mm/yyyy'><br>

<label>DateTime <i>yyyy-mm-dd hh24:mi</i></label><br>
<input data-mask='yyyy-mm-dd hh24:mi'><br>

<label>CPF <i>000.000.000-00</i></label><br>
<input data-mask='000.000.000-00'><br>
</html>
```
  
  

Advance masking combination
---------------------------

A few valid tokens can be used with mask as below:<br>
0<br>
0.00<br>
0%<br>
0.00%<br>
#,##0<br>
#,##0.00<br>
#,##0;(#,##0)<br>
#,##0;[Red](#,##0)<br>
#,##0.00;(#,##0.00)<br>
#,##0.00;[Red](#,##0.00)<br>
d-mmm-yy<br>
d-mmm<br>
dd/mm/yyyy<br>
mmm-yy<br>
h:mm AM/PM<br>
h:mm:ss AM/PM<br>
h:mm<br>
h:mm:ss<br>
m/d/yy h:mm<br>
mm:ss<br>
[h]:mm:ss<br>

  
  

### More information about the jSuites JavaScript mask plugin

* [See more javascript mask working examples](/docs/v4/javascript-mask/basic)
* [More information about the available mask tokens](/docs/v4/javascript-mask/quick-reference)
* [Programmatic methods](/docs/v4/javascript-mask/basic)
