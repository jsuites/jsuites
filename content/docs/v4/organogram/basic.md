title: JavaScript organogram - Basic example
keywords: Javascript, organogram, organogram plugin, JS organogram, examples, basic example
description: How to create a basic instance of the javascript organogram.

* [Javascript organogram](/docs/v4/organogram)

Javascript organogram
=====================

Examples
--------

  

### Loading data from a JSON file

`jSuites.organogram` can load data locally or remotely to render the organogram chart. In this example we’ll show you how to load data locally. See the example below:  

### Loading data from a variable

To add data locally, all you need to do is add your data in the `data` attribute. data must be an array of objects containing information related to the organogram chart item.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<script src="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/organogram/organogram.min.css" type="text/css" />

<div id='organogram'></div>

<script>
jSuites.organogram(document.getElementById('organogram'), {
    width: 600,
    height: 480,
    data: [
            {
                "id":1,
                "name":"Jorge",
                "role":"CEO",
                "parent":0,
                "status":"#90EE90",
                "img":"/plugins/images/ceo.png"
            },
            {
                "id":2,
                "name":"Antonio",
                "role":"Vice president",
                "parent":1,
                "status":"#90EE90",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":3,
                "name":"Manoel",
                "role":"Production manager",
                "parent":1,
                "status":"#D3D3D3",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":4,
                "name":"Pedro",
                "role":"Intern",
                "parent":3,
                "status":"#90EE90",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":5,
                "name":"Carlos",
                "role":"Intern",
                "parent":3,
                "status":"#90EE90",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":6,
                "name":"Marcos",
                "role":"Marketing manager",
                "parent":2,
                "status":"#D3D3D3",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":7,
                "name":"Ana",
                "role":"Sales manager",
                "parent":2,
                "status":"#90EE90",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":8,
                "name":"Nicolly",
                "role":"Operations manager",
                "parent":2,
                "status":"#D3D3D3",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":9,
                "name":"Paulo",
                "role":"Sales assistant",
                "parent":7,
                "status":"#90EE90",
                "img":"/plugins/images/no-user.jpg"
            },
            {
                "id":10,
                "name":"Iris",
                "role":"Sales assistant",
                "parent":7,
                "status":"#90EE90",
                "img":"/plugins/images/no-user.jpg"
            }
    ],
    vertical: true,
});
</script>
</html>
```
