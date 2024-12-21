title: JavaScript Context Menu with Jsuites v4
keywords: Javascript, contextmenu
description: A simple javascript contextmenu that helps to provide a custom right click contextmenu over HTML elements in a web-based application.

# JavaScript Contextmenu

The `jSuites.contextmenu` is a simple javascript contextmenu that helps to provide a custom right click contextmenu over HTML elements in a web-based application.

* React, Angular, Vue compatible;
* Mobile friendly;
* Several events and easy integration;
* JS plugin or web component;

## Examples

### Contextmenu Web Component


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<i>right click inside the square to open the contextmenu</i>
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
<div aria-contextmenu-id="contextmenu-webcomponent"
    style="border:1px solid gray;width:400px;height:300px;"></div>
</html>
```
  

### More examples

* [JavaScript contextmenu as a plugin](/docs/v4/contextmenu/vanilla)
* [JavaScript contextmenu with icons](/docs/v4/contextmenu/icons)
* [JavaScript contextmenu with submenu](/docs/v4/contextmenu/submenu)
