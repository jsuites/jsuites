title: Javascript template events
keywords: Javascript, template plugin, templates, JS template, Javascript template, Javascript template events, javascript event handling example
description: Example on how to programmatically add events to the template.

* [jSuites template](/docs/v4/javascript-template)

jSuites Template
================

Event handling
--------------

`jSuites.template` makes it possible to create events in your template in a very simple way. You define the events in the template and create the corresponding event listener in the template object, see an example of friend requests below:

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
    url: "/plugins/users.json",
    pagination: 3,
    template: {
        item: function(data,obj) {
            return `
                <div data-index="${data.id}">
                    <div class="row">
                        <div class="column f1 p6 center">
                            <div class="column">
                                <img class="users-large mr1" alt="user" src="${data.picture}">
                            </div>
                            <div class="column f1">
                                ${data.name}
                            </div>
                        </div>
                        <div class="column f1 p10 center">
                            <button onclick="this.accept(e)" class="jbutton dark" style="margin: 15px 0px;" >Accept</button>
                        </div>
                        <div class="column f1 p10 center">
                            <button onclick="this.decline(e)" class="jbutton dark" style="margin: 15px 0px; background: red;">Decline</button>
                        </div>
                    </div>
            </div>
            `
        },
        accept: function(e) {
           alert('friend request accepted');
           var element = e.target.closest('[data-index]');
           if (element) {
               template.removeItem(element);
           }
        },
        decline: function(e) {
            var element = e.target.closest('[data-index]');
            if (element) {
                template.removeItem(element);
            }  
        }
    }
});
</script>
</html>
```
