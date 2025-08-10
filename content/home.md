title: JavaScript Plugins
keywords: JavaScript plugins, JavaScript web components, JavaScript vanilla plugins, web components, calendar, date picker, DateTime picker, colour picker, the input mask
description: jSuites is a collection of lightweight, responsive, and cross-platform JavaScript plugins and web components. It includes versatile tools like calendars, date pickers, date-time pickers, colour pickers, and input masks, designed to efficiently meet diverse web development needs.
canonical: https://jsuites.net

<div class="home">

<div class="row title-container">
    <div class="column f2">
        <h1>JavaScript Plugins</h1>
        <p>A free and open-source collection of lightweight JavaScript plugins, combining several common tools in a single package to facilitate the acceleration of web application development.</p>
        <p style="margin: 30px 0">
            <img src="img/react.png" alt="React Logo" style="height: 22px; margin-right: 10px;" />
            <img src="img/vuejs.png" alt="Vue Logo" style="height: 22px; margin-right: 10px;" />
            <img src="img/javascript.png" alt="JavaScript Logo" style="height: 22px;" />
        </p>
        <button class="button main" style="width: 130px;"><a href="/docs">Get Started</a></button>
    </div>
    <div class="column f3 video-wrapper big-screen-only home-container">
        <br>
        <div style="aspect-ratio: 16/9;">
            <!-- set a 640:360 i.e a 16:9 aspect ratio -->
            <video src="media/jsuites-demo.mp4" playsinline autoplay muted loop type="video/mp4" width="640" height="360" style="width: 100%; height: auto;"></video>
        </div>
   </div>
</div>

<div class="stats">
    <div class="stats-item">
        <img src="img/home/npm-logo.svg" alt="NPM Logo" style="height: 22px;">
        <div>
            <b>20k +</b>
            <p>Weekly downloads</p>
        </div>
    </div>
    <div class="stats-item">
        <img src="img/home/github-logo.svg" alt="GitHub Logo" style="height: 36px;">
        <div>
            <b>400+</b>
            <p>GitHub stars</p>
        </div>
    </div>
    <div class="stats-item">
        <img src="img/home/license-icon.svg" alt="MIT License Icon" style="height: 36px;">
        <div>
            <b>MIT License</b>
            <p>Free and open-source</p>
        </div>
    </div>
</div>

<div class="space200 line"></div>

<div class="row big-screen-only">
    <div class="column f4">
        <div>
            <h2>Create rich and user-friendly web-applications</h2>
            <p>Comprehensive JavaScript plugins and tools for diverse web-based applications. Fully compatible and easily integrated with any JavaScript library, offering various components to enhance web development projects.</p>
            <div>
                <div class="example-selectable-card selected" onclick="showText('home-dropdown', this)" style="margin-top: 50px;">
                    <b>JavaScript Dropdown</b>
                    <p>Enhance your forms with dynamic drop-down and autocomplete features.</p>
                </div>
                <div class="example-selectable-card" onclick="showText('home-calendar', this)">
                    <b>JavaScript Calendar</b>
                    <p>Implement interactive calendars for event management and scheduling.</p>
                </div>
                <div class="example-selectable-card" onclick="showText('home-toolbars', this)">
                    <b>JavaScript Toolbar</b>
                    <p>Enables embedding dynamic, fully customizable toolbars into web applications.</p>
                </div>
                <div class="example-selectable-card" onclick="showText('home-color', this)">
                    <b>JavaScript Color Picker</b>
                    <p>Embed a color picker tool for customizable color selections.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="column f5 code-block-col">

<div id="home-dropdown" class="code-block active">

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="dropdown"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown'), {
    data: [
        { group:'Breads', value:'1', text:'Wholemeal' },
        { group:'Breads', value:'2', text:'Wholegrain' },
        { group:'Breakfast Cereals', value:'4', text:'High fibre (wholegrain) oats' },
        { group:'Breakfast Cereals', value:'5', text:'Porridge' },
        { group:'Grains', value:'7', text:'Rice' },
        { group:'Grains', value:'8', text:'Barley' },
        { group:'Other products', value:'10', text:'Pasta' },
        { group:'Other products', value:'11', text:'Noodles' }
    ],
    width:'280px',
    autocomplete: true,
    value: '7'
});
</script>
</html>
```
```jsx
import { Dropdown } from 'jsuites/react'
import { useRef, useEffect } from 'react'
import 'jsuites/dist/jsuites.css'

function App() {
    const dropdown = useRef(null);

    const data = [
        { group:'Breads', value:'1', text:'Wholemeal' },
        { group:'Breads', value:'2', text:'Wholegrain' },
        { group:'Breakfast Cereals', value:'4', text:'High fibre (wholegrain) oats' },
        { group:'Breakfast Cereals', value:'5', text:'Porridge' },
        { group:'Grains', value:'7', text:'Rice' },
        { group:'Grains', value:'8', text:'Barley' },
        { group:'Other products', value:'10', text:'Pasta' },
        { group:'Other products', value:'11', text:'Noodles' }
    ];

    return (
        <div className="App">
            <Dropdown
                ref={dropdown}
                data={data}
                width={'280px'}
                autocomplete={true}
                value={'7'}
            />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Dropdown ref="dropdown" :data="data" width="280px" :autocomplete="true" />
</template>

<script>
import { Dropdown } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Dropdown
    },
    data() {
        return {
            data: [
                { group: 'Breads', value: '1', text: 'Wholemeal' },
                { group: 'Breads', value: '2', text: 'Wholegrain' },
                { group: 'Breakfast Cereals', value: '4', text: 'High fibre (wholegrain) oats' },
                { group: 'Breakfast Cereals', value: '5', text: 'Porridge' },
                { group: 'Grains', value: '7', text: 'Rice' },
                { group: 'Grains', value: '8', text: 'Barley' },
                { group: 'Other products', value: '10', text: 'Pasta' },
                { group: 'Other products', value: '11', text: 'Noodles' }
            ]
        }
    }
};
</script>
```

</div><div id="home-calendar" class="code-block">

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
let instance = jSuites.calendar(document.getElementById('calendar'), {
    format: 'DD/MM/YYYY HH:MM',
    time: true,
    value: Date.now(),
});
</script>
</html>
```
```jsx
import { Calendar } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const calendar = useRef(null);

    return (
        <div className="App">
            <Calendar ref={calendar} format={'DD/MM/YYYY HH:MM'} time={true} value={Date.now()} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Calendar
        ref="calendar"
        format="DD/MM/YYYY HH:MM"
        :time="true"
        :value="Date.now()"
    />
</template>

<script>
import { Calendar } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Calendar
    },
}
</script>
```

</div><div id="home-color" class="code-block">

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input id="color"/>

<script>
let color = jSuites.color(document.getElementById('color'), {
    value: "#F3A568"
});
</script>
</html>
```
```jsx
import { Color } from 'jsuites/react'
import { useRef } from 'react'

import 'jsuites/dist/jsuites.css'

function App() {
    const color = useRef(null);

    return (
        <div className="App">
            <Color ref={color} value={'#F3A568'} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Color value="#F3A568" />
</template>

<script>
import { Color } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Color
    },
};
</script>
```

</div><div id="home-toolbars" class="code-block">

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='toolbar'></div>

<script>
jSuites.toolbar(document.getElementById('toolbar'), {
    container: true,
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
            data: [
                'Verdana',
                'Arial',
                'Courier New'
            ],
            width: '160px',
            render: function(e) {
                return '<span style="font-family:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d) {
                console.log('font-family: ' + d);
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
            type: 'select',
            data: [
                'border_all',
                'border_outer',
                'border_inner',
                'border_horizontal',
                'border_vertical',
                'border_left',
                'border_top',
                'border_right',
                'border_bottom',
                'border_clear'
            ],
            columns: 5,
            render: function(e) {
                return '<i class="material-icons">' + e + '</i>';
            },
            right: true,
            onload: function(a, b) {
                // Border color
                var container = document.createElement('div');
                var div = document.createElement('div');
                container.appendChild(div);
                var colorPicker = jSuites.color(div, {
                    onchange: function(o, v) {
                        div.style.color = v;
                    },
                });
                var i = document.createElement('i');
                i.classList.add('material-icons');
                i.innerHTML = 'border_color';
                i.onclick = function() {
                    colorPicker.open();
                }
                container.appendChild(i);
                a.children[1].appendChild(container);

                var div = document.createElement('div');
                var picker = jSuites.picker(div, {
                    content: 'line_style',
                    type: 'select',
                    data: [ 1, 2, 3, 4, 5 ],
                    render: function(e) {
                        return '<div style="height: ' + e + 'px; width: 50px; background-color: black;"></div>';
                    },
                    width: '24px',
                });
                a.children[1].appendChild(div);

                var div = document.createElement('div');
                div.style.flex = '1'
                a.children[1].appendChild(div);
            }
        }
    ]
});
</script>
</html>
```
```jsx
import { Toolbar } from 'jsuites/react'
import { useRef } from 'react'
import jSuites from 'jsuites';
import 'jsuites/dist/jsuites.css'
function App() {
    const toolbar = useRef(null);

    const items = [{
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
            data: [
                'Verdana',
                'Arial',
                'Courier New'
            ],
            width: '160px',
            render: function(e) {
                return '<span style="font-family:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d) {
                console.log('font-family: ' + d);
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
            type: 'select',
            data: [
                'border_all',
                'border_outer',
                'border_inner',
                'border_horizontal',
                'border_vertical',
                'border_left',
                'border_top',
                'border_right',
                'border_bottom',
                'border_clear'
            ],
            columns: 5,
            render: function(e) {
                return '<i class="material-icons">' + e + '</i>';
            },
            right: true,
            onload: function(a, b) {
                // Border color
                var container = document.createElement('div');
                var div = document.createElement('div');
                container.appendChild(div);
                var colorPicker = jSuites.color(div, {
                    onchange: function(o, v) {
                        div.style.color = v;
                    },
                });
                var i = document.createElement('i');
                i.classList.add('material-icons');
                i.innerHTML = 'border_color';
                i.onclick = function() {
                    colorPicker.open();
                }
                container.appendChild(i);
                a.children[1].appendChild(container);

                var div = document.createElement('div');
                var picker = jSuites.picker(div, {
                    content: 'line_style',
                    type: 'select',
                    data: [ 1, 2, 3, 4, 5 ],
                    render: function(e) {
                        return '<div style="height: ' + e + 'px; width: 50px; background-color: black;"></div>';
                    },
                    width: '24px',
                });
                a.children[1].appendChild(div);

                var div = document.createElement('div');
                div.style.flex = '1'
                a.children[1].appendChild(div);
            }
        }
    ];

    return (
        <div className="App">
            <Toolbar ref={toolbar} container={true} items={items} />
        </div>
  );
}
export default App;
```
```vue
<template>
    <Toolbar ref="toolbar" :container="true" :items="items"/>
</template>

<script>
import { Toolbar } from "jsuites/vue";
import jSuites from "jsuites"
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Toolbar
    },
    data(){
        const items = [{
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
            data: [
                'Verdana',
                'Arial',
                'Courier New'
            ],
            width: '160px',
            render: function(e) {
                return '<span style="font-family:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d) {
                console.log('font-family: ' + d);
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
            type: 'select',
            data: [
                'border_all',
                'border_outer',
                'border_inner',
                'border_horizontal',
                'border_vertical',
                'border_left',
                'border_top',
                'border_right',
                'border_bottom',
                'border_clear'
            ],
            columns: 5,
            render: function(e) {
                return '<i class="material-icons">' + e + '</i>';
            },
            right: true,
            onload: function(a, b) {
                // Border color
                var container = document.createElement('div');
                var div = document.createElement('div');
                container.appendChild(div);
                var colorPicker = jSuites.color(div, {
                    onchange: function(o, v) {
                        div.style.color = v;
                    },
                });
                var i = document.createElement('i');
                i.classList.add('material-icons');
                i.innerHTML = 'border_color';
                i.onclick = function() {
                    colorPicker.open();
                }
                container.appendChild(i);
                a.children[1].appendChild(container);

                var div = document.createElement('div');
                var picker = jSuites.picker(div, {
                    content: 'line_style',
                    type: 'select',
                    data: [ 1, 2, 3, 4, 5 ],
                    render: function(e) {
                        return '<div style="height: ' + e + 'px; width: 50px; background-color: black;"></div>';
                    },
                    width: '24px',
                });
                a.children[1].appendChild(div);

                var div = document.createElement('div');
                div.style.flex = '1'
                a.children[1].appendChild(div);
            }
        }];

        return { items }
    }
};
</script>
```

</div>
</div>
</div>

<div class="space200 line"></div>

<div class="container center p20" style="max-width: 650px;">
    <h2>Deliver high-quality interfaces and applications to your end-user</h2>
    <p>Explore the powerful and versatile components designed to elevate your productivity. From data management to collaboration, our ecosystem seamlessly integrates to meet your needs.</p>
</div>

<br>

<div class="box" data-number="3">
    <div>
        <img src="img/home/grid/optimized.svg" style="height: 36px; width: 36px;" alt="Small, optimized plugins for efficient performance">
        <b>Optimized</b>
        <p>Small, optimized plugins for efficient performance.</p>
    </div>
    <div>
        <img src="img/home/grid/all-in-one.svg" style="height: 36px; width: 36px;" alt="A diverse range of solutions within a single collection">
        <b>All-in-One Solutions</b>
        <p>A diverse range of solutions within a single collection.</p>
    </div>
    <div>
        <img src="img/home/grid/user-friendly.svg" style="height: 36px; width: 36px;" alt="Tools for creating rich, user-friendly web interfaces and applications">
        <b>User-Friendly Web Apps</b>
        <p>Tools for creating rich, user-friendly web interfaces and applications.</p>
    </div>
    <div>
        <img src="img/home/grid/simplified.svg" style="height: 36px; width: 36px;" alt="Simplified management of complex data inputs, maintaining familiarity for users">
        <b>Simplified</b>
        <p>Simplified management of complex data inputs, maintaining familiarity for users.</p>
    </div>
    <div>
        <img src="img/home/grid/enhancing-client.svg" style="height: 36px; width: 36px;" alt="Enhanced software experience for clients">
        <b>Enhancing Client Experience</b>
        <p>Enhanced software experience for clients.</p>
    </div>
    <div>
        <img src="img/home/grid/all-in-one.svg" style="height: 36px; width: 36px;" alt="Capability to develop sophisticated and attractive UI designs">
        <b>Enhanced software experience for clients.</b>
        <p>Capability to develop sophisticated and attractive UI designs.</p>
    </div>
        <div>
        <img src="img/home/grid/fast-and-easy.svg" style="height: 36px; width: 36px;" alt="Streamlined, fast, and easy-to-use components">
        <b>Fast and Easy</b>
        <p>Streamlined, fast, and easy-to-use components.</p>
    </div>
    <div>
        <img src="img/home/grid/unified.svg" style="height: 36px; width: 36px;" alt="Unified coding across multiple platforms for consistent development">
        <b>Unified</b>
        <p>Unified coding across multiple platforms for consistent development.</p>
    </div>
    <div>
        <img src="img/home/grid/consistent.svg" style="height: 36px; width: 36px;" alt="Uniform, excellent user experience across various devices">
        <b>Consistent</b>
        <p>Uniform, excellent user experience across various devices.</p>
    </div>
</div>

<div class="space200 line"></div>

<div class="container center p20" style="max-width: 650px;">
    <h2>Component Ecosystem</h2>
    <p>Explore the powerful and versatile components designed to elevate your productivity. From data management to collaboration, our ecosystem seamlessly integrates to meet your needs.</p>
</div>

<br>

<div class="box" data-number="2">
    <div>
        <a href="https://jspreadsheet.com"><img src="img/logo/jspreadsheet-pro-logo.svg" style="height: 44px; width: 44px;" alt="Jspreadsheet Pro Logo"></a><br>
        <b>Jspreadsheet Pro</b>
        <p>Enterprise JavaScript data grid component to integrate spreadsheet UI into your web-based application.</p>
    </div>
    <div>
        <a href="https://intrasheets.com"><img src="img/logo/intrasheets-logo.svg" style="height: 44px; width: 44px;" alt="Intrasheets Logo"></a><br>
        <b>Intrasheets</b>
        <p>Collaborate with ease using Intrasheets, an intuitive tool for managing spreadsheets across teams, ensuring that everyone stays on the same page.</p>
    </div>
    <div>
        <a href="https://bossanova.uk/jspreadsheet/v4/"><img src="img/logo/jspreadsheet-ce-logo.svg" style="height: 44px; width: 44px;" alt="Jspreadsheet CE Logo"></a><br>
        <b>Jspreadsheet CE</b>
        <p>An open-source spreadsheet component that offers essential features for developers looking for flexibility without the need for a commercial license.</p>
    </div>
    <div>
        <a href="https://lemonadejs.com"><img src="img/logo/lemonadejs-logo.svg" style="height: 44px; width: 44px;" alt="LemonadeJS Logo"></a><br>
        <b>Lemonade</b>
        <p>A light and easy-to-use solution for creating elegant UI elements, giving your web apps a refreshing boost in both style and functionality.</p>
    </div>
</div>

<div class="space200 line"></div>

<h2>What is Jsuites?</h2>

Jsuites is a versatile collection of free lightweight, responsive JavaScript plugins and web components designed to enhance user experience across various web-based projects. This suite offers a range of tools that enable developers to maintain a unified codebase while building sophisticated, user-friendly interfaces. With optimized performance and a diverse set of solutions, jSuites allows for the streamlined management of complex data inputs, providing a familiar and efficient user experience across multiple platforms and devices.

The base package of Jsuites includes essential components such as dropdowns, calendars, input masks, modals, and more, all aimed at simplifying the development of rich user interfaces. Additionally, extensions like the JavaScript Cropper, Organogram, and Activity Heatmap further expand the capabilities of the suite. Fully compatible with any JavaScript library, jSuites ensures that developers can create modern, attractive UIs with ease while delivering a consistent, high-quality user experience across different devices and platforms.

</div>
