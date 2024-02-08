title: Javascript template main functionalities
keywords: Javascript, template plugin, templates, JS template, Javascript template, javascript programmatically changes
description: Example on how to programmatically add and remove elements from the template.

* [jSuites template](/docs/v4/javascript-template)

jSuites Template
================

Methods
-------

The example below shows how to interact programmatically with the core functionalities from jSuites template.

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
    url: "/plugins/animals.json",
    template: {
        item: function(data,obj) {
            return `
                <div data-index="${data.id}">
                <div class="row">
                    <div class="column f1 p6 center">
                        <div class="column">
                            <img class="users-large mr1" alt="${data.description}" src="${data.image}">
                        </div>
                        <div class="column">
                            ${data.name}
                        </div>
                    </div>
                    <div class="column f1 p10 center">
                        <button onclick="this.duplicate(e)" class="jbutton dark" style="margin: 10px 0px;">Duplicate</button>
                    </div>
                    <div class="column f1 p10 center">
                        <button onclick="this.removeItem(e)" class="jbutton dark" style="margin: 10px 0px; background: red;">Remove</button>
                    </div>
                </div>
            </div>
            `
        },
        removeItem: function(e) {
            var element = e.target.parentNode.parentNode.parentNode;
            template.removeItem(element);
        },
        duplicate: function(e) {
            var element = e.target.parentNode.parentNode.parentNode;
            var item = template.options.data.find(function(item) {
                return item.id == element.getAttribute('data-index');
            });
            template.addItem(item,false);
        }
    },
    search: true,
    pagination: 4,
    searchPlaceHolder: 'Look for an animal'
});
</script>
</html>
```

