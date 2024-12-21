title: JavaScript Basic Animations
keywords: JavaScript animations, JS animations, slide in, slide out, slide left, slide right, slide bottom, slide top, fade in, fade out
description: This section introduces a collection of basic JavaScript animations, including slide left, slide right, slide bottom, slide top, fade in, and fade out. These animations are part of the jSuites.animation library, designed to enrich user interfaces with smooth and visually appealing effects.
canonical: https://jsuites.net/docs/animations

# Animations

The `jSuites.animation` library incorporates several straightforward animations to enhance the user experience. These include:

- fadeIn
- fadeOut
- slideLeft
- slideRight
- slideTop
- slideBottom

## Example

### Fade In and Fade Out Animations

Below is an example demonstrating how to implement fadeIn and fadeOut animations:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='animation-content' style="padding: 20px">Content is here</div>
<input type="button" id="animation-fade-in-and-out" value="Click to toggle the content" />

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
```jsx
import jSuites from "jsuites"
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const content = useRef(null);

    const handleToggleAnimation = function () {
        let button = content.current
        
        if (button.style.display == 'none') {
            jSuites.animation.fadeIn(button, function () {
                // Callback to do something when animation is finished
            });
        } else {
            jSuites.animation.fadeOut(button, function () {
                // Callback to do something when animation is finished
            });
        }
    }

    return (
        <div className="App">
            <div ref={content} style={{ padding: "20px" }}>Content is here</div>
            <input type="button" onClick={handleToggleAnimation} value="Click to toggle the content" />
        </div>
    );
}

export default App;
```
```vue
<template>
    <div ref="content" style="padding: 20px">Content is here</div>
    <input type="button" @click="handleToggleAnimation" value="Click to toggle the content" />
</template>

<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css"

export default {
    name: "App",
    methods: {
        handleToggleAnimation: function() {
            let button = this.$refs.content

            if (button.style.display == "none") {
                jSuites.animation.fadeIn(button, function () {
                    // Callback to do something when animation is finished
                });
            } else {
                jSuites.animation.fadeOut(button, function () {
                    // Callback to do something when animation is finished
                });
            }
        }
    }
};
</script>
```



