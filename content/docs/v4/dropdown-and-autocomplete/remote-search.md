title: Javascript autocomplete remote search
keywords: Javascript, dropdown, autocomplete, remote search, remote suggestions
description: Create a new HTML dropdown with autocomplete from a remote source.

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

Remote searching
================

The `jsuites.dropdown` now provides a native remote search using the property `remoteSearch: true`, as below:


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    url: '/docs/sample',
    remoteSearch: true,
    autocomplete: true,
    lazyLoading: true,
    width: '280px'
});
</script>
</html>
```

