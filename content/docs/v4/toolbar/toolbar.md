JavaScript toolbar
==================

The `jSuites.toolbar` is a lightweight JavaScript generic toolbar you can integrate in any other javascript componennt.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='toolbar'></div>

<script>
jSuites.toolbar(document.getElementById('toolbar'), {
    container: true,
    iconset: 'material-icons',
    items:[{
            type: 'icon',
            content: 'undo',
            onclick: function() {
                console.log('undo action');
            }
        },
        {
            type: 'icon',
            content: 'redo',
            onclick: function() {
                console.log('redo action');
            }
        },
        {
            type: 'icon',
            content: 'save',
            onclick: function () {
                console.log('save something');
            }
        },
        {
            type: 'icon',
            content: '![](https://icons-for-free.com/iconfiles/png/512/settings+24px-131985193517479436.png)',
            tooltip: 'Remote and custom image',
            onclick: function () {
                console.log('save something');
            }
        },
        {
            type: 'label',
            content: 'Text item',
            onclick: function() {
                console.log('action');
            }
        },
        {
            type: 'divisor',
        },
        {
            type: 'select',
            data: [ 'Verdana', 'Arial', 'Courier New' ],
            width: '160px',
            render: function(e) {
                return '' + e + '';
            },
            onchange: function(a,b,c,d) {
                console.log('font-family: ' + d);
            }
        },
        {
            type: 'select',
            data: ['x-small','small','medium','large','x-large'],
            content: 'format_size',
            render: function(e) {
                return '' + e + '';
            },
            onchange: function(a,b,c,d) {
                obj.setStyle(obj.getSelected(), 'font-size', d);
            }
        },
        {
            type: 'select',
            data: ['format_align_left','format_align_center','format_align_right','format_align_justify'],
            render: function(e) {
                return '_' + e + '_';
            },
            onchange: function(a,b,c,d) {
                if (d == 'format_align_left') {
                    console.log('font-align: left');
                } else if (d == 'format_align_center') {
                    console.log('font-align: center');
                } else if (d == 'format_align_right') {
                    console.log('font-align: right');
                } else if (d == 'format_align_justify') {
                    console.log('font-align: justify');
                }
            }
        },
        {
            type: 'icon',
            content: 'format_bold',
            onclick: function(a,b,c) {
                console.log('font-weight: bold');
                // Control state
                c.toggleState();
            },
            state: true,
            active: true,
        },
        {
            type: 'icon',
            content: 'format_color_text',
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
        },
        {
            type: 'icon',
            content: 'format_color_fill',
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
        }
    ]
})
</script>
</html>
```
