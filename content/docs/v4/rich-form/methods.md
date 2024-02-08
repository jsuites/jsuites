title: Data management options
keywords: Javascript rich form plugin, HTML form, data management, data persistence.
description: How to use the data management options of the jsuites rich form plugin.

JavaScript rich form
====================

Integrate your form with a remote backend server. The data is loaded from ajax, and before saving the data, some validations would be performed.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<form id='myForm'>
<div class='section-container'>

    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Name</label><br>
                <input type='text' name='name' data-validation='required' data-error='Name is required.'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Email</label><br>
                <input type='text' name='email' data-validation='email' data-error='Email valid is required.'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Gender</label><br>
                <select name='gender'>
                <option value="1">Male</option>
                <option value="2">Female</option>
                </select>
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
    url: '/docs/v4/f',
    onsave: function() {
        jSuites.notification({ message:'Updated' });
    }
});
// Load record
myForm.load();

btn.addEventListener('click', function() {
    myForm.save()
})
</script>

</html>
```

