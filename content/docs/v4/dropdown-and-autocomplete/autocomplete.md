title: JavaScript Dropdown for Large Datasets  
keywords: JavaScript dropdown, large datasets, lazy-loading dropdown, dropdown performance, handling extensive options, autocomplete dropdown, JavaScript UI components  
description: Explore how to use the `jsuites.dropdown` with native lazy-loading and search functionality to handle large datasets efficiently. See an example of managing a dropdown with 20K options.

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

# Handling large datasets

The `jsuites.dropdown` provides a native lazy-loading and searching feature to enhance the performance when handling large amount of options. The example shows an performance of the dropdown dealing with 20K options

### Handle a large dropdown with 20K options

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
    jSuites.dropdown(document.getElementById('dropdown'), {
        url: '/docs/large',
        autocomplete: true,
        multiple: true,
        width: '280px',
    });
</script>
</html>
```

