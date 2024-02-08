title: JavaScript dropdown and autocomplete
keywords: Jexcel, jquery, javascript, autocomplete, element picker, javascript dropdown, javascript select, selectbox
description: Full examples on how to handle simple, advanced, autocomplete and conditional javascript dropdowns, selectbox, select

JavaScript dropdown
===================

The `jSuites.dropdown` is a lightweight multi-purpose responsive JavaScript dropdown and general option picker plugin. It works great in small screens and has different render methods and several initialization features to give developers a flexible JavaScript dropdown and promote a better user experience in web-based applications.

The new JavaScript dropdown plugin brings a native autocomplete, multiple option selection, responsive render types and much more features, such as:

1.  Dropdown from a JavaScript Array
2.  Dropdown from an external JSON request
3.  Autocomplete search
4.  Dropdown with Lazy loading
5.  Multiple dropdown selection
6.  Responsive dropdown with multiple options and responsive render types
7.  Dropdown with image and icons
8.  Dropdown with group of items and categories

![](img/js-dropdown.jpg)

  
  

Example
-------

### JavaScript autocomplete

Create a dropdown autocomplete with a large data source (20K options)  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown-large"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown-large'), {
    url: '/docs/v4/large',
    autocomplete: true,
    lazyLoading: true,
    multiple: true,
    width: '280px',
});
</script>
</html>
```
  

### Dropdown item groups

Create group of items on your dropdown.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown-groups"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown-groups'), {
    data:[
        { group:'Breads', value:'1', text:'Wholemeal' },
        { group:'Breads', value:'2', text:'Wholegrain' },
        { group:'Breakfast Cereals', value:'4', text:'High fibre (wholegrain) oats' },
        { group:'Breakfast Cereals', value:'5', text:'Porridge' },
        { group:'Grains', value:'7', text:'Rice' },
        { group:'Grains', value:'8', text:'Barley' },
        { group:'Other products', value:'10', text:'Pasta' },
        { group:'Other products', value:'11', text:'Noodles' }
        ],
    width:'280px',
    autocomplete: true,
});
</script>
</html>
```


### Dropdown new option

Enable a new option button to your dropdown.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown-add"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown-add'), {
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
  

### More dropdown examples

* [Basic JavaScript dropdown](/docs/v4/dropdown-and-autocomplete/basic)
* [Multiple dropdown options](/docs/v4/dropdown-and-autocomplete/multiple)
* [Large sample autocomplete dropdown](/docs/v4/dropdown-and-autocomplete/large-sample)
* [Dropdown with remote search](/docs/v4/dropdown-and-autocomplete/remote-search)
* [Allow new options in a dropdown](/docs/v4/dropdown-and-autocomplete/new-options)
* [Dropdown with images](/docs/v4/dropdown-and-autocomplete/images)
* [Color items in the dropdown](/docs/v4/dropdown-and-autocomplete/colors)
* [Countries dropdown](/docs/v4/dropdown-and-autocomplete/countries)
* [Dropdown grouping elements](/docs/v4/dropdown-and-autocomplete/grouping-elements)
* [Dropdown JS Events](/docs/v4/dropdown-and-autocomplete/events)
* [Dropdown methods](/docs/v4/dropdown-and-autocomplete/methods)
* [Responsive autocomplete dropdown](/docs/v4/dropdown-and-autocomplete/mobile)
* [React dropdown](/docs/v4/dropdown-and-autocomplete/javascript-dropdown-with-react)
