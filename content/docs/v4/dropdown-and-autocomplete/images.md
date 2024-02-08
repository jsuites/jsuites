title: Javascript dropdown with icons
keywords: javascript, autocomplete, javascript dropdown, images, icons
description: How to include icons on the javascript dropdown items.

* [JavaScript dropdown and autocomplete plugin](/docs/v4/dropdown-and-autocomplete)

JavaScript dropdown with images
===============================

Adding images to the JavaScript dropdown

  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data:[
        {
            value: '1',
            text: 'Paul',
            image: 'https://hips.hearstapps.com/hmg-prod/images/sir-paul-mccartney-attends-the-uk-premiere-of-the-beatles-news-photo-1696266544.jpg?crop=1.00xw:0.669xh;0,0.108xh&resize=1200:*',
            title:'Bass'
        },
        {
            value: '2',
            text:'Ringo',
            image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1160888287.jpg?resize=1200:*',
            title: 'Drums'
        }
    ],
    width:'280px',
    autocomplete: true,
});
</script>
</html>
```

