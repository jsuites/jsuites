title: JavaScript toolbar: Font Awesome Integration
keywords: Javascript, toolbar, custom icons, font awesome
description: How to integrate font awesome to the javascript toolbar.

JavaScript toolbar
==================

How to integrate with fontawesome
--------------------------------

Alternatively to material icons, you can integrate any webfont icons to your javascript toolbar. The following example shows how to integrate with fontawesome.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

<div id='toolbar'></div>

<script>
jSuites.toolbar(document.getElementById('toolbar'), {
    container: true,
    items:[{
        type: 'select',
        width: '50px',
        options: ['fa-align-right', 'fa-align-left', 'fa-align-center', 'fa-align-justify'],
        render: function(e) {
            return '<i class="fa ' + e + '"></i>';
        },
        onchange: function(a,b,c,d) {
            console.log(d);
        }
    },
    {
        type: 'i',
        class: 'fa fa-italic',
        onclick: function() {
            // Do something
            console.log('Italic');
        }
    },
    {
        type: 'i',
        class: 'fa fa-bold',
        onclick: function() {
            // Do something
            console.log('Bold');
        }
    },
    {
        type: 'i',
        class: 'fa fa-paint-brush',
        onclick: function(element, instance, item) {
            if (! item.color) {
                var colorPicker = jSuites.color(item, {
                    onchange:function(o, v) {
                        console.log('color:', v);
                    }
                });
                colorPicker.open();
            }
        }
    }]
})
</script>
</html>
```
