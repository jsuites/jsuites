title: Responsive javascript dropdown
keywords: javascript, autocomplete, javascript dropdown, mobile, responsive dropdown
description: Create a fully responsive javascript dropdown. Mobile rendering.

* [JavaScript autocomplete dropdown plugin](/docs/v4/dropdown-and-autocomplete)

Responsive options
==================

The render mode can be define on initialization with type: **default**, **picker** or **searchbar**.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown1"></div>
<div id="dropdown2"></div>

<script>
// EXAMPLE 1 - Render as a searchbar
jSuites.dropdown(document.getElementById('dropdown1'), {
    type:'searchbar',
    data:[
        'City of London',
        'City of Westminster',
        'Kensington and Chelsea',
        'Hammersmith and Fulham', // (...)
        ],
    autocomplete:true
});

// EXAMPLE 2 - For small screen the default option will be type: picker
jSuites.dropdown(document.getElementById('dropdown2'), {
    type:'picker',
    data: [
        { group:'Breads', id:'1', name:'Wholemeal' },
        { group:'Breads', id:'2', name:'Wholegrain' },
        { group:'Breads', id:'3', name:'White' },
        { group:'Breakfast Cereals', id:'4', name:'High fibre (wholegrain) oats' },
        { group:'Breakfast Cereals', id:'5', name:'Porridge' },
        { group:'Breakfast Cereals', id:'6', name:'Muesli' },
        { group:'Grains', id:'7', name:'Rice' },
        { group:'Grains', id:'8', name:'Barley' },
        { group:'Grains', id:'9', name:'Corn' },
        { group:'Other products', id:'10', name:'Pasta' },
        { group:'Other products', id:'11', name:'Noodles' }
    ],
});
</script>
</html>
```
