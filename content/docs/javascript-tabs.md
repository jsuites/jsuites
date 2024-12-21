title: JavaScript Tabs
keywords: JavaScript, jSuites Tabs Plugin, Web Content Management, Responsive Design, Developer Tools
description: jSuites.tabs offers a responsive and versatile JavaScript solution for organizing web content into tabbed layouts, providing developers with extensive customization options and interactive features for enhanced user engagement.
canonical: https://jsuites.net/docs/javascript-tabs

# JavaScript Tabs

jSuites.tabs is a JavaScript plugin for creating tabbed content areas within web pages. It's lightweight and responsive, ensuring it works well across all devices. This plugin is handy for developers looking to organize content in a clean, user-friendly manner.

- Responsive Design: Automatically adjusts to fit any screen size.
- Lightweight: Minimal impact on load times.
- Event Handling: Supports custom events for enhanced interaction.
- Drag and Drop: Allows users to reorder tabs easily.
- API Methods: Offers functions to control tabs programmatically.
- Remote Content: Can load content from external sources into tabs.
- Dynamic Tab Management: Facilitates adding, removing, and navigating between tabs.

## Documentation


### Available Methods

| Method                  | Description                                                                  |
|-------------------------|------------------------------------------------------------------------------|
| open(number);           | Open the tab by index starting on zero.                                      |
| selectIndex(DOMElement) | Open the tab by the header DOM element                                       |
| create(string);         | Create a new tab.  <br>`create(String title) => DOMElement`                  |
| remove(number);         | Remote an existing tab.  <br>`remove(Number tabIndex) => void`               |
| rename(number, string); | Rename existing tab.  <br>`rename(Number tabIndex, String newTitle) => void` |
| getActive()             | Get the active tab.                                                          |

### Initialization properties

| Property                     | Description                                                   |
|------------------------------|---------------------------------------------------------------|
| data: array                  | Initial content of the compontent                             |
| allowCreate: boolean         | Show the create new tab button                                |
| allowChangePosition: boolean | Allow drag and drop of the headers to change the tab position |
| animation: boolean           | Allow the header border bottom animation.                     |
| hideHeaders: boolean         | Hide the tab headers if only one tab is present.              |
| padding: number              | Default padding content                                       |
| position: string             | Position of the headers: top                                  | bottom. Default: top |


### Data property

The data property define the content of the component, and have the following properties

| Property | Description  |
|----------|--------------|
| title    | Header title |
| width    | Header width |
| icon     | Header icon  |
| content  | Content      |

### Available events

| Method           | Description                                                                                                                                                                       |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onclick          | Onclick event  <br>`onclick(DOMElement element, Object instance, Number tabIndex, DOMElement header, DOMElement content) => void`                                                 |
| onload           | When the remote content is loaded and the component is ready.  <br>`onload(DOMElement element, Object instance) => void`                                                          |
| onchange         | Method executed when the input is focused.  <br>`onchange(DOMElement element, Object instance, Number tabIndex, DOMElement header, DOMElement content) => void`                   |
| onbeforecreate   | Before create a new tab.  <br>`onbeforecreate(DOMElement element) => void`                                                                                                        |
| oncreate         | When a new tab is created.  <br>`oncreate(DOMElement element, DOMElement content) => void`                                                                                        |
| ondelete         | Method executed the DOM element is ready.  <br>`ondelete(DOMElement element, Number tabIndex) => void`                                                                            |
| onchangeposition | When a tab change position  <br>`onchangeposition(DOMElement headersContainer, Number tabIndexFrom, Number tabIndexTo, DOMElement header, DOMElement destination, event) => void` |


## Examples

### Basic Example

The following example creates tabs based on an existing HTML structure.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='tabs' style='max-width: 800px;'>
    <div>
        <div>Tab 1</div>
        <div>Tab 2</div>
    </div>
    <div>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
            ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida
            tempus erat vel auctor.
        </div>
        <div>
            Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum.
            Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper
            dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur
            cursus quis sapien sit amet vestibulum.
        </div>
    </div>
</div>

<script>
var tabs = jSuites.tabs(document.getElementById('tabs'), {
    animation: true,
    allowCreate: true,
    allowChangePosition: true,
    padding: '10px',
});
</script>
</html>
```
```jsx
import { Tabs } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const tabs = useRef(null);

    return (
        <div className="App">
            <Tabs ref={tabs} allowCreate={true} allowChangePosition={true} padding={'10px'} animation={true}>
                <div>
                    <div>Tab 1</div>
                    <div>Tab 2</div>
                </div>
                <div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
                        ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida
                        tempus erat vel auctor.
                    </div>
                    <div>
                        Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum.
                        Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper
                        dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur
                        cursus quis sapien sit amet vestibulum.
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Tabs ref="tabs" :allowCreate="true" :allowChangePosition="true" padding="10px" :animation="true">
        <div>
            <div>Tab 1</div>
            <div>Tab 2</div>
        </div>
        <div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
                ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida
                tempus erat vel auctor.
            </div>
            <div>
                Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum.
                Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper
                dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur
                cursus quis sapien sit amet vestibulum.
            </div>
        </div>
    </Tabs>
</template>

<script>
import { Tabs } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Tabs
    },
}
</script>
```

### Tabs with Icons

Add icons to the headers of your tabs component.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='tabs1' style='width: 90vw; max-width:400px; text-align:justify'></div>

<script>
jSuites.tabs(document.getElementById('tabs1'), {
    animation: true,
    data: [
        {
            icon: 'settings_brightness',
            title: 'Brightness',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.',
            width: '100px',
        },
        {
            icon: 'opacity',
            title: 'Opacity',
            content: 'Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
            width: '100px',
        }
    ],
    padding: '10px',
});
</script>
</html>
```
```jsx
import { Tabs } from "jsuites/react";
import { useRef } from "react";
import "jsuites/dist/jsuites.css"

function App() {
    const tab = useRef(null);

    return (
        <div>
            <Tabs
                ref={tab}
                animation={true}
                data={[
                    {
                        icon: "settings_brightness",
                        title: "Brightness",
                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.",
                        width: "100px",
                    },
                    {
                        icon: "opacity",
                        title: "Opacity",
                        content: "Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.",
                        width: "100px",
                    }
                ]}
                padding={"10px"}
            />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Tabs ref="tab" :animation="true" :data="data" padding="10px" />
</template>

<script>
import { Tabs } from "jsuites/vue"
import "jsuites/dist/jsuites.css"


export default {
    name: "App",
    components: { Tabs },
    data() {
        return {
            data: [
                {
                    icon: "settings_brightness",
                    title: "Brightness",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.",
                    width: "100px",
                },
                {
                    icon: "opacity",
                    title: "Opacity",
                    content: "Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.",
                    width: "100px",
                }
            ]
        }
    }
}
</script>
```
