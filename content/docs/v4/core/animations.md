title: JavaScript Animations Plugins
keywords: JavaScript animations, JS animations, slide in, slide out, slide left, slide right, slide bottom, slide top, fade in, fade out
description: A collection of basic JavaScript animations, slide left, slide right, slide bottom, slide top, fade in, fade out

Animations
==========

The `jSuites.animation` includes the following simple animations for a more user friend experience:

`fadeIn, fadeOut, slideLeft, slideRight, slideTop and slideBottom`  
  

Fade in and fade out animations
-------------------------------

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='animation-content'>Content is here</div>
<button id='animation-fade-in-and-out'>Click to toggle the content</button>

<script>
document.getElementById('animation-fade-in-and-out').onclick = function() {
    var button = document.getElementById('animation-content');
    if (button.style.display == 'none') {
        jSuites.animation.fadeIn(button, function() {
            // Callback to do something when animation is finished
        });
    } else {
        jSuites.animation.fadeOut(button, function() {
            // Callback to do something when animation is finished
        });
    }
}
</script>
</html>
```

