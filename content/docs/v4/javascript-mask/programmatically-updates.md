title: Programmatically updates
keywords: Javascript, mask, input mask, currency mask, money mask, javascript mask, programmatically updates
description: Programmatically applying a mask to a string or a number using the jSuites mask plugin.

Javascript input mask
=====================

Programmatically appying a mask to a string using jSuites mask.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<label>
    String without mask<br><input type="text" id="text"/>
</label><br>
<label>Mask<br><input type="text" id="mask"/>
</label><br>
<br><button id="btn">Parse string</button><br><br>
<label>
    Result<br><input type="text" id="result"/>
</label>

<script>
document.getElementById('btn').addEventListener('click', function() {
    var text = document.getElementById('text').value;
    var mask = document.getElementById('mask').value;
    document.getElementById('result').value = jSuites.mask.run(text, mask);
})
</script>

</html>
```

