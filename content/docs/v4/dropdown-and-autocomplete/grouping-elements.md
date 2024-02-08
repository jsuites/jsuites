title: Javascript dropdown with categories and group of items
keywords: javascript, autocomplete, javascript dropdown, groups, categories
description: How to group the items from a dropdown in categories.

* [JavaScript autocomplete dropdown](/docs/v4/dropdown-and-autocomplete)

JavaScript dropdown with groups
===============================

The example below shows how to group elements using the group property.

  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        { group:'Breads', value:'1', text:'Wholemeal' },
        { group:'Breads', value:'2', text:'Wholegrain' },
        { group:'Breads', value:'3', text:'White' },
        { group:'Breakfast Cereals', value:'4', text:'High fibre (wholegrain) oats' },
        { group:'Breakfast Cereals', value:'5', text:'Porridge' },
        { group:'Breakfast Cereals', value:'6', text:'Muesli' },
        { group:'Grains', value:'7', text:'Rice' },
        { group:'Grains', value:'8', text:'Barley' },
        { group:'Grains', value:'9', text:'Corn' },
        { group:'Other products', value:'10', text:'Pasta' },
        { group:'Other products', value:'11', text:'Noodles' }
        ],
    width:'280px',
    autocomplete: true,
});
</script>
</html>
```
