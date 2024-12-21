title: HTML form validations
keywords: Javascript rich form plugin, HTML form, validations on a HTML form.
description: How to implement HTML form validations using the rich form plugin.

Custom validations
==================

It is possible to extend the native `jSuites.form` plugin validations, that can be used use the `data-validation` property.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<form id='myForm'>
<div class='section-container'>

    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Domain</label><br>
                <input type='text' name='domain' data-validation='domain'
                    data-error='You should enter a valid domain'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Password</label><br>
                <input type='text' name='password' data-validation='password'
                    data-error='Your password must contain:\nAt least 1 lowercase alphabetical character\nAt least 1 uppercase alphabetical character\nAt least 1 numeric character\nAt least one special character, but we are escaping reserved RegEx characters to avoid conflict\nAnd must be eight characters or longer\n'>
            </div>
        </div>
    </div>

    <br>

    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <input type='button' value='Save profile' id='btn'>
            </div>
        </div>
    </div>

</div>
</form>

<script>
var myForm = jSuites.form(document.getElementById('myForm'), {
    url: '/docs/f',
    validations: {
        domain: function(value) {
            var reg = new RegExp(/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/);
            return value && reg.test(value) ? true : false;
        },
        password: function(value) {
            var reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
            return value && reg.test(value) ? true : false;
        }
    },
    onerror: function(el, message) {
        // Format message
        message = message.replace(new RegExp("\\\\n", "gm"), "<br>");
        // Custom Notification
        jSuites.notification({ message: message });
    }
});

btn.addEventListener('click', function () {
    myForm.save()
})
</script>
</html>
```

  

Native validations
------------------

| jSuites.validations |
|---------------------|
| email               |
| length              |
| required            |
| number              |
