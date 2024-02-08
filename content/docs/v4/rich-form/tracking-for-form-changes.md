title: Tracking changes in elements from a form
keywords: Javascript rich form plugin, HTML form, tracking changes, are you sure
description: This feature of the rich form plugin alerts the user when leaving a page without saving any changes in a HTML form.

JavaScript rich form
====================

### Tracking changes on the form elements

Please consider the following form example. If the user tries to leave the page without saving, the tracking will alert for unsaved changes.

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
                <input type='text' name='name' value='Roger Fredson'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Profession</label><br>
                <input type='text' name='profession' value='Singer'>
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
var myTracker = jSuites.tracker(document.getElementById('myForm'));

btn.addEventListener('click', function () {
    myTracker.resetTracker()
})
</script>

</html>
```

