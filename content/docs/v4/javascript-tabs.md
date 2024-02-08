title: JavaScript tabs plugin
keywords: Javascript, tabs plugin, web components
description: Group your content on tabs with jsuites javascript tabs plugin

JavaScript tabs plugin
======================

The `jSuites.tabs` is a lightweight javascript plugin to allow users to group content through tabs. The component is responsive and includes several features to create rich web-based applications, such as:

* Multiple events
* Drag and drop headers
* Programmatically methods
* Remote content
* New tabs controls
* Navigation controls

![](img/js-tabs.svg)

  

Basic example
-------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />


<div id='tabs' style='max-width: 800px;'>
    <div>
        <div>Tab 1</div>
        <div>Tab 2</div>
    </div>
    <div>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
            ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida
            tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula
            nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit,
            mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies,
            laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.
        </div>
        <div>
            Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum.
            Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper
            dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur
            cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem
            ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia.
            Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet,
            faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec
            felis nibh, imperdiet eget erat ac, pretium egestas eros.
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
