title: JavaScript autocomplete new options
keywords: Jexcel, jquery, javascript, autocomplete, javascript dropdown, javascript select, javascript autocomplete
description: How to enable the new option controls on your javascript autocomplete

* [JavaScript autocomplete dropdown plugin](/docs/v4/dropdown-and-autocomplete)

JavaScript dropdown
===================

  

### Adding new options to the dropdown

The `jSuites.dropdown` and `autocomplete` plugin allows the user to add new options to the dropdown. This feature is disabled by default. The initialization flag `newOptions: true` will enabled the feature. There is an extra option to handle ids generate in a remote server, as follow:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        { value:'1', text: 'Tomatoes' },
        { value:'2', text: 'Carrots' },
        { value:'3', text: 'Onions' },
        { value:'4', text: 'Garlic' },
    ],
    newOptions: true,
    oninsert: function(instance, item) {
        jSuites.ajax({
            url: '/docs/v4/getId',
            type: 'POST',
            dataType: 'json',
            data: { data: item },
            success: function(idFromTheServer) {
                // Set the item id from the number sent by the remote server
                instance.setId(item, idFromTheServer);
            }
        });
    },
    width:'280px',
});
</script>
</html>
```

