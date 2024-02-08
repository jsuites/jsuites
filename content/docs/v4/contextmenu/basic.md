title: A javascript contextmenu web component example
keywords: Javascript, contextmenu, examples, basic example.
description: A basic example on how to use the jsuites contextmenu as a javascript web component.

Webcomponent contextmenu
========================

Integrate a simple javascript contextmenu in your web based application.

### Contextmenu as a webcomponent


```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<script src="https://jsuites.net/v4/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<i>right click inside the square to open the contextmenu</i>

<jsuites-contextmenu id='contextmenu-webcomponent'>
  <div onclick="alert('About is clicked')"><a>About</a> <span>CTRL+A</span></div>
  <div onclick="window.open('https://jspreadsheet.com/v7')">Go to jSpreadsheet Pro website</div>
  <hr>
  <div>Other option without action</div>
</jsuites-contextmenu>

<div aria-contextmenu-id="contextmenu-webcomponent"
    style="border:1px solid gray;width:400px;height:300px;"></div>
</html>
```

