title: JavaScript Context Menu Plugin
keywords: JavaScript, Context Menu, Custom Context Menu, Web Development
description: Easily create custom right-click context menus in web applications with our JavaScript context menu component. This tool provides extensive customization, from submenus to icons, catering to unique application requirements and enhancing user interaction.
canonical: https://jsuites.net/docs/contextmenu

# JavaScript Context Menu

Introducing the jSuites context menu, a dynamic JavaScript plugin designed to enrich web applications by enabling custom right-click context menus on HTML elements. Perfectly adaptable across different web frameworks, this tool is optimized for a smooth and consistent user experience on all devices, including mobile. With its broad customization capabilities, you can easily integrate submenus, icons, and specific event handlers to create a more interactive and user-friendly interface. Key Features:

- **Framework Flexibility**: Easily integrate with React, Angular, Vue.js and other frameworks.
- **Mobile Optimization**: Ensures a responsive and intuitive experience on mobile devices.
- **Extensive Customization**: Offers various options, including custom events, submenus, and icon inclusion, for a tailored application feel.
- **Versatile Implementation**: This can be used as a standalone JavaScript plugin or as a web component, providing flexibility in application development.

## Documentation

### Initialization Options

| Property                  | Description                                        |
|---------------------------|----------------------------------------------------|
| `items: Array of objects` | Array of item object descriptions.                 |
| `onclick: function`       | Global onclick event. `function(instance, event)`  |


### Item options

| Property                                                   | Description                                                           |
|------------------------------------------------------------|-----------------------------------------------------------------------|
| `type: string`                                             | Context menu item type: line \| divisor \| default                    |
| `icon: string`                                             | Context menu icon key. (Material icon key icon identification)        |
| `id: string`                                               | HTML id property of the item DOM element                              |
| `disabled: boolean`                                        | The item is disabled                                                  |
| `onclick: function(element: HTMLElement, event: e) : void` | Specific onclick event for the element.                               |
| `shortcut: string`                                         | A short description or instruction for the item. Normally a shortcut. |
| `tooltip: string`                                          | Show this text when the user mouse over the element                   |
| `submenu: Array of objects`                                | Submenu items                                                         |


## Examples

### Context Menu as a Web Component

Using this example, incorporate a custom context menu into your web application. This implementation showcases setting up a context menu as a web component, allowing for seamless integration and enhanced interactivity within your application.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<jsuites-contextmenu id='contextmenu-webcomponent'>
    <div onclick="alert('About is clicked')"><a>About</a> <span>CTRL+A</span></div>
    <div onclick="window.open('https://jspreadsheet.com/v7')">Go to Jspreadsheet Pro website</div>
    <hr>
    <div data-icon="save">Save</div>
    <div>
        <a>Submenus</a>
        <span>►</span>
        <div class="jcontextmenu" tabindex="900">
            <div><a>Sub menu 1</a><span>Ctrl + X</span></div>
        </div>
    </div>
</jsuites-contextmenu>

<div aria-contextmenu-id="contextmenu-webcomponent" style="border:1px solid grey;width:400px;height:300px;"></div>
<i class="small">right click inside the square to open the contextmenu</i>
</html>
```
```jsx
import { Contextmenu } from 'jsuites/react'
import { useRef, useEffect } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const contextmenu = useRef(null);
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            container.current.addEventListener("contextmenu", function (e) {
                contextmenu.current.open(e);
                e.preventDefault();
            });
        }
    }, [])
    
    let style = { width: "400px", height: "300px", border: "1px solid grey" };

    return (
        <div className="App">
            <div ref={container} style={style}></div>
            <Contextmenu ref={contextmenu} items={[
                {
                    title: 'About',
                    shortcut: 'Ctrl + A',
                    onclick: function () {
                        alert('About is clicked');
                    },
                },
                {
                    title: 'Go to Jspreadsheet Pro website',
                    onclick: function () {
                        window.open('https://jspreadsheet.com/v7');
                    },
                },
                {
                    type: 'line'
                },
                {
                    title: 'Save',
                    icon: 'save'
                },
                {
                    title: 'Submenus',
                    shortcut: '►',
                    submenu: [
                        {
                            title: 'Submenu 1',
                            shortcut: 'Ctrl + X',
                        }
                    ]
                },
            ]} onclick={function () {
                contextmenu.current.close(false);
            }} />
        </div>
    );
}
export default App;
```
```vue
<template>
    <div ref="container" @contextmenu="open" style="height: 300px; width: 400px; border: 1px solid grey;"></div>
    <Contextmenu ref="contextmenu" :onclick="handleClick" :items="items" />
</template>

<script>
import { Contextmenu } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Contextmenu
    },
    data() {
        return {
            items: [
                {
                    title: 'About',
                    shortcut: 'Ctrl + A',
                    onclick: function () {
                        alert('About is clicked');
                    },
                },
                {
                    title: 'Go to Jspreadsheet Pro website',
                    onclick: function () {
                        window.open('https://jspreadsheet.com/v7');
                    },
                },
                {
                    type: 'line'
                },
                {
                    title: 'Save',
                    icon: 'save'
                },
                {
                    title: 'Submenus',
                    shortcut: '►',
                    submenu: [
                        {
                            title: 'Submenu 1',
                            shortcut: 'Ctrl + X',
                        }
                    ]
                },
            ]
        }
    },
    methods: {
        open: function (e) {
            this.$refs.contextmenu.current.open(e);
            e.preventDefault();
        },
        handleClick: function () {
            this.$refs.contextmenu.current.close(false);
        }
    }
};
</script>
```

### Context Menu with Simpel JavaScript

Easily add a context menu to your web projects using only vanilla JavaScript for a lightweight and customizable solution.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='container' style='border:1px solid grey;width:400px;height:300px;'></div>
<i class="small">right click inside the square to open the contextmenu</i>

<div id='contextmenu'></div>

<script>
var contextMenu = jSuites.contextmenu(document.getElementById('contextmenu'), {
    items:[
        {
            title:'Copy',
            shortcut:'Ctrl + C',
            onclick:function() {
                alert('Copy');
            },
            tooltip: 'Method to copy the text',
        },
        {
            type:'line'
        },
        {
            title:'Visit the website',
            onclick:function() {
                window.open('https://jspreadsheet.com/v7');
            }
        },
        {
            title:'Google',
            disabled: true,
            onclick:function() {
                alert('jSuites v2')
            }
        },
        {
            title:'About',
            onclick:function() {
                alert('jSuites v2')
            }
        },
    ],
    onclick:function() {
        contextMenu.close(false);
    }
});

document.getElementById('container').addEventListener("contextmenu", function(e) {
    contextMenu.open(e);
    e.preventDefault();
});
</script>
```
```jsx
import { Contextmenu } from 'jsuites/react'
import { useRef, useEffect } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const contextmenu = useRef(null);
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            container.current.addEventListener("contextmenu", function (e) {
                contextmenu.current.open(e);
                e.preventDefault();
            });
        }
    }, [])

    let style = { width: "400px", height: "300px", border: "1px solid grey" };
    
    return (
        <div className="App">
            <div ref={container} style={style}></div>
            <Contextmenu ref={contextmenu} items={[
                {
                    title: 'Copy',
                    shortcut: 'Ctrl + C',
                    onclick: function () {
                        alert('Copy');
                    },
                    tooltip: 'Method to copy the text',
                },
                {
                    type: 'line'
                },
                {
                    title: 'Visit the website',
                    onclick: function () {
                        window.open('https://jspreadsheet.com/v7');
                    }
                },
                {
                    title: 'Google',
                    disabled: true,
                    onclick: function () {
                        alert('jSuites v2')
                    }
                },
                {
                    title: 'About',
                    onclick: function () {
                        alert('jSuites v2')
                    }
                },
            ]} onclick={function () {
                contextmenu.current.close(false);
            }} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <div ref="container" @contextmenu="open" style="height: 300px; width: 400px; border: 1px solid grey;"></div>
    <Contextmenu ref="contextmenu" :onclick="handleClick" :items="items" />
</template>

<script>
import { Contextmenu } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Contextmenu
    },
    data() {
        return {
            items: [
                {
                    title: 'Copy',
                    shortcut: 'Ctrl + C',
                    onclick: function () {
                        alert('Copy');
                    },
                    tooltip: 'Method to copy the text',
                },
                {
                    type: 'line'
                },
                {
                    title: 'Visit the website',
                    onclick: function () {
                        window.open('https://jspreadsheet.com/v7');
                    }
                },
                {
                    title: 'Google',
                    disabled: true,
                    onclick: function () {
                        alert('jSuites v2')
                    }
                },
                {
                    title: 'About',
                    onclick: function () {
                        alert('jSuites v2')
                    }
                },
            ]
        }
    },
    methods: {
        open: function (e) {
            this.$refs.contextmenu.current.open(e);
            e.preventDefault();
        },
        handleClick: function () {
            this.$refs.contextmenu.current.close(false);
        }
    }
};
</script>
```
