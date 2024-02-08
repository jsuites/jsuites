title: JavaScript tabs plugin quick reference
keywords: Javascript, tabs plugin, web components, quick reference
description: JavaScript tabs plugin quick reference.

* [JavaScript tabs](/docs/v4/javascript-tabs)

Quick reference
===============

Considering the following example:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id="tabs"></div>

<script>
var tabs = jSuites.tabs(document.getElementById('tabs'), {
    animation: true,
    data: [
        {
            title: 'Tab 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.',
        },
        {
            title: 'Tab 2',
            content: 'Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
        },
    ],
});
</script>
</html>
```

  
  

Available Methods
-----------------

| Method | Description |
| --- | --- |
| tabs.open(number); | Open the tab by index starting on zero. |
| tabs.selectIndex(DOMElement) | Open the tab by the header DOM element |
| tabs.create(string); | Create a new tab.  <br>`create(String title) => DOMElement` |
| tabs.remove(number); | Remote an existing tab.  <br>`remove(Number tabIndex) => void` |
| tabs.rename(number, string); | Rename existing tab.  <br>`rename(Number tabIndex, String newTitle) => void` |
| tabs.getActive() | Get the active tab. |

  
  

Initialiation properties
------------------------

| Property | Description |
| --- | --- |
| data: array | Initial content of the compontent |
| allowCreate: boolean | Show the create new tab button |
| allowChangePosition: boolean | Allow drag and drop of the headers to change the tab position |
| animation: boolean | Allow the header border bottom animation. |
| hideHeaders: boolean | Hide the tab headers if only one tab is present. |
| padding: number | Default padding content |
| position: string | Position of the headers: top | bottom. Default: top |

  
  

Data property
-------------

The data property define the content of the component, and have the following properties

| Property | Description |
| --- | --- |
| title | Header title |
| width | Header width |
| icon | Header icon |
| content | Content |

  
  

Available events
----------------

| Method | Description |
| --- | --- |
| onclick | Onclick event  <br>`onclick(DOMElement element, Object instance, Number tabIndex, DOMElement header, DOMElement content) => void` |
| onload | When the remote content is loaded and the component is ready.  <br>`onload(DOMElement element, Object instance) => void` |
| onchange | Method executed when the input is focused.  <br>`onchange(DOMElement element, Object instance, Number tabIndex, DOMElement header, DOMElement content) => void` |
| onbeforecreate | Before create a new tab.  <br>`onbeforecreate(DOMElement element) => void` |
| oncreate | When a new tab is created.  <br>`oncreate(DOMElement element, DOMElement content) => void` |
| ondelete | Method executed the DOM element is ready.  <br>`ondelete(DOMElement element, Number tabIndex) => void` |
| onchangeposition | When a tab change position  <br>`onchangeposition(DOMElement headersContainer, Number tabIndexFrom, Number tabIndexTo, DOMElement header, DOMElement destination, event) => void` |
