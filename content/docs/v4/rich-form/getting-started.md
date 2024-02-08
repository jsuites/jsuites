Tracking changes in the elements of a form
==========================================

jSuites.form alert the user for unsaved changes in a form before leaving the page. _Are you sure?_

How it works
------------

The plugin will create a hash based on all form elements values. Before the user leaves the page, the tracker will check for any changes in the hash. If the hash is different, the plugin will trigger an alert to the user.

NOTE: The alert will includes any dynamic new fields added to the form.

Examples
--------

Please consider the following form example. If the user tries to leave the page without saving, the tracking will alert for unsaved changes. If you click save, the tracker will reset and start the tracking again.

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
                <select name='gender'><option value="1">Male</option><option value="2">Female</option></select>
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

Methods
-------

|   Method  | Description  |
| --- | --- |
| resetTracker(); | Start tracking again |
| isChanged(); | Check if the form is changed |
| setIgnore(status); | Enable or disable the tracking |

