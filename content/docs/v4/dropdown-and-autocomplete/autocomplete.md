* [JavaScript dropdown](/docs/v4/dropdown-and-autocomplete)

Handling large datasets
=======================

The jsuites.dropdown provides a native lazyloading and searching feature to enhance the performance when handling large amount of options. The example shows an performance of the dropdown dealing with 20K options

### Handle a large dropdown with 20K options

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
    jSuites.dropdown(document.getElementById('dropdown'), {
        url: '/docs/v4/large',
        autocomplete: true,
        multiple: true,
        width: '280px',
    });
</script>
</html>
```

