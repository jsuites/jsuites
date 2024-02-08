title: Javascript tags validations
keywords: Javascript, tagging, javascript tags, keywords, examples, validations
description: Include a validation for the tags in the javascript tags plugin.

* [JavaScript tags](/docs/v4/javascript-tags)

jSuites.validations
===================

Please enter a list of email addresses:

Enter the valid email addresses

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<p>Please enter a list of email addresses:</p>

<div id="tags"></div>

<script>
var tags = jSuites.tags(document.getElementById('tags'), {
    value: 'paulo@test.com',
    validation: function(element, text, value) {
        if (! value) {
            value = text;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var test = re.test(String(value).toLowerCase()) ? true : false;
        return test;
    }
});
</script>
</html>
```

