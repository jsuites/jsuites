title: Javascript mask quick reference
keywords: Javascript, mask, input mask, currency mask, money mask, javascript mask, quick reference, documentation
description: A quick reference on how to use the javascript mask plugin.

Javascript input mask
=====================

Quick reference
---------------

The mask tokens should be defined in lower case and can be used in combination with each other to compose and force different input formats.  
  
  

### Basic example

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input data-mask='U$ #.##0,00'>

</html>
```

  

### Input mask options

| Method | Description |
| --- | --- |
| **a** | Any letter |
| **0** | Number |
| **0 liters** | Number |
| **0%** | Percentage |
| **#,##0** | Currency |
| **$ #,##0.00** | Currency with decimal |
| **$ #.##0,00** | Currency with decimal |
| **dd/mm/yyyy** | Date |
| **hh:mm** | Time |
| **yyyy** | Year four digits |
| **yy** | Year two digits |
| **mm** | Month |
| **dd** | Day |
| **hh24** | Hour 24 |
| **hh** | Hour 12 |
| **mi** | Minutes |
| **ss** | Seconds |
| **\a** | Letter "a" (escape for a) |
| **\0** | Number "0" (escape for 0) |
| **[-]** | Number signal (- or +) |
  

### Advance masking combination

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
