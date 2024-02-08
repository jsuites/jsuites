title: Javascript dropdown with lazy loading
keywords: javascript, autocomplete, javascript dropdown, large sample, big data
description: Large sample on a jsuites javascript dropdown plugin example

* [JavaScript autocomplete dropdown plugin](/docs/v4/dropdown-and-autocomplete)

Handling large datasets
=======================

The `jsuites.dropdown` provides a native lazyloading feature to enhance the performance when handling a large number of options. The example below shows the performance of the dropdown dealing with 20K options.

  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
    jSuites.dropdown(document.getElementById('dropdown'), {
        url: '/docs/v4/large',
        autocomplete: true,
        lazyLoading: true,
        width: '280px'
    });
</script>
</html>
```

