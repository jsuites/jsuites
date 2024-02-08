title: Javascript template pagination and searching
keywords: Javascript, template plugin, templates, JS template, Javascript template, template pagination examples, template searching examples
description: Example on how to programmatically add pagination and search in the template.

* [jSuites template](/docs/v4/javascript-template)

jSuites Template
================

`jSuites.template` can create a pagination of your data with the `pagination` attribute as the example below:  

Examples
--------

### Basic example with pagination.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.js"></script>

<div class='row'>
    <div class='column p10'>
        <div id='jsuites-template' style='border:1px solid #ccc; padding: 10px;'></div>
    </div>
</div>

<script>
var template = jSuites.template(document.getElementById('jsuites-template'), {
    url: "/plugins/movies.json",
    pagination: 3,
    template: {
        item: function(data) {
            return `
                <div>
                    <div class="row">
                        <div class="column f1 p6 center" style="margin: 10px 0px;">
                            <div class="column">
                                <img class="users-large mr1" alt="${data.overview}" src="${data.poster}">
                            </div>
                            <div class="column">
                                ${data.title}
                            </div>
                        </div>
                        <div class="column f2 p10 center">
                            <span style="display:inline-block; margin: 30px 0px;">${data.genres}</span>
                        </div>
                    </div>
                </div>
            `
        }
    }
});
</script>
</html>
```

  

### Searching

to add a search to your template, you can simply add the attribute `search`. Search receives a boolean value, when set to true, your template will have an automatic search. See the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.js"></script>

<div class='row'>
    <div class='column p10'>
        <div id='jsuites-template2' style='border:1px solid #ccc; padding: 10px;'></div>
    </div>
</div>

<script>
var template = jSuites.template(document.getElementById('jsuites-template2'), {
    url: "/plugins/movies.json",
    search: true,
    searchPlaceHolder: "Type something",
    pagination: 3,
    template: {
        item: function(data) {
            return `
                <div>
                    <div class="row">
                        <div class="column f1 p6 center" style="margin: 10px 0px;">
                            <div class="column">
                                <img class="users-large mr1" alt="${data.overview}" src="${data.poster}">
                            </div>
                            <div class="column">
                                ${data.title}
                            </div>
                        </div>
                        <div class="column f2 p10 center">
                            <span style="display:inline-block; margin: 30px 0px;">${data.genres}</span>
                        </div>
                    </div>
            </div>
            `
        }
    }
});
</script>
</html>
```
