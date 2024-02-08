title: JavaScript tabs events
keywords: Javascript, tabs plugin, web components, events
description: Dealing with events from the jsuites tabs javascript plugin.

* [JavaScript tabs](/docs/v4/javascript-tabs)

Tabs events
===========

Create group of content with events and navigation.

Events console

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div style='background-color: white; padding: 20px; margin-bottom: 10px;'>console: <i id='console' ></i></div>
<div id='tabs' style='width: 85vw; max-width: 450px;text-align:justify'></div>

<script>
var tabs = jSuites.tabs(document.getElementById('tabs'), {
    animation: true,
    allowCreate: true,
    allowChangePosition: true,
    onchange: function(el, div) {
        document.getElementById('console').innerHTML = 'Changed';
        // New content
        div.innerHTML = 'New content';
    },
    oncreate: function() {
        document.getElementById('console').innerHTML = 'New tab added';
        content.innerHTML = 'New content';
    },
    onload: function() {
        document.getElementById('console').innerHTML = 'The remote content is ready';
    },
    onchangeposition: function() {
        document.getElementById('console').innerHTML = 'Tab position is changed';
    },
    data: [
        {
            title: 'This is the tab number 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.',
        },
        {
            title: 'Number 2',
            content: 'Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
        },
        {
            title: 'Tab number 3',
            content: 'Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
        },
        {
            title: 'Another tab 4',
            content: 'Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
        },
    ],
    padding: '10px',
});
</script>
</html>
```
