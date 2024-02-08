Javascript input mask
=====================

The jsuites javascript mask plugin is a lightweight script to force certain accepted formats in HTML input fields.

Using the mask plugin, you can easily define Dates, Numbers, Currency, Phone and much other masked strings.

Parse programmatically
----------------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<button id='btn'>Alert: jSuites.mask.run('447473725104', '(00) 000000 0000')</button>

<script>
document.getElementById('btn').addEventListener('click', function() {
    var value = jSuites.mask.run('447473725104', '(00) 000000 0000');
    alert(value);
})
</script>

</html>
```

Events
------

The following example show how to alert when the data input is completed.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<p>What is your birthday? <strong>dd/mm/yyyy</strong></p>
<input id='date' data-mask='dd/mm/yyyy'> <span id='status'></span>

<script>
date.onkeyup = function(e) {
    document.getElementById('status').innerHTML = '';

    if (e.target.getAttribute('data-completed') == 'true') {
        document.getElementById('status').innerHTML = 'Complete';
    } else {
        document.getElementById('status').innerHTML = 'Incomplete';
    }
} 
</script>
</html>
```


Input mask options
------------------

| Token | Target |
| --- | --- |
| **a** | Any letter |
| **0** | Any Number |
| **#.##** | Formatted number |
| **#,##** | Formatted number |
| **\# ##** | Formatted number |
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

  
**NOTE:** All tokens should be lowercase.  
