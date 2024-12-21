title: Javascript calendar basic example
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, basic example, plugin, web component
description: How to render a javascript calendar as a plugin or a javascript web component.
canonical: https://jsuites.net/docs/v4/javascript-calendar/basic

{.white}
> A new version of the jSuites **JavaScript Calendar** plugin is available here.
> <br><br>
> [jSuites Calendar v5](/docs/javascript-calendar){.button .main target="_top"}


{.breadcrumb}
- [JavaScript Calendar](/docs/v4/javascript-calendar)
- Examples


# Web Component Calendar

The calendar can be used as a javascript plugin or a web component. It offers a variety of options to customize your requirements.  
 
## Examples

### Date picker as a web component
 
```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<jsuites-calendar value="2020-01-20" format="DD/MM/YYYY"></jsuites-calendar>

<script>
document.querySelector('jsuites-calendar').addEventListener('onchange', function(e) {
    console.log('New value: ' + e.target.value);
});
document.querySelector('jsuites-calendar').addEventListener('onclose', function(e) {
    console.log('Calendar is closed');
});
</script>
</html>
```

### Javascript Calendar Plugin

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
jSuites.calendar(document.getElementById('calendar'),{
    format: 'DD/MM/YYYY'
});
</script>
</html>
```

### Embeddable JavaScript Calendar

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='calendar-2'></div>

<script>
jSuites.calendar(document.getElementById('calendar-2'),{
    format: 'DD/MM/YYYY'
});
</script>
</html>
```

