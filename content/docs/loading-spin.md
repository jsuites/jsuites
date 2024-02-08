title: JavaScript Loading Spin
keywords: JavaScript loading spin, animations, JS loading, javascript loading component
description: This section introduces a lightweight JavaScript loading spin web component, an essential tool for enhancing user experience during data loading or processing phases.

# JavaScript Loading Spinner

The jSuites.loading component is an ultra-lightweight JavaScript plugin that takes up less than 1 KB and is designed to integrate a responsive and efficient loading spinner into web applications. This minimalistic component offers a straightforward way to indicate processing or loading states, enhancing the user experience by providing visual feedback during data loading or function execution phases.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input type='button' value='Show the loading' class='jbutton dark' id='showbtn'>
<i class="small">The loading will stop after two seconds</i>

<script>
const show = function() {
    // Show the loading spin
    jSuites.loading.show();
    // Hide the loading spin after two seconds
    setTimeout(function() {
        // Hide
        jSuites.loading.hide();
    }, 2000);
}
showbtn.onclick = () => show()
</script>
</html>
```
```jsx
import jSuites from "jsuites"
import "jsuites/dist/jsuites.css"

function App() {

    const show = function () {
        // Show the loading spin
        jSuites.loading.show();
        // Hide the loading spin after two seconds
        setTimeout(function () {
            // Hide
            jSuites.loading.hide();
        }, 2000);
    }

    return (
        <div className="App">
            <input type="button" value="Show the loading" className="jbutton dark" onClick={show} />
            <i className="small">The loading will stop after two seconds</i>
        </div>
    );
}
export default App;
```
```vue
<template>
    <input type="button" value="Show the loading" class="jbutton dark" @click="show" />
    <i class="small">The loading will stop after two seconds</i>
</template>

<script>
import jSuites from "jsuites";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    methods: {
        show: function() {
            // Show the loading spin
            jSuites.loading.show();
            // Hide the loading spin after two seconds
            setTimeout(function () {
                // Hide
                jSuites.loading.hide();
            }, 2000);
        }
    }
}
</script>
```
