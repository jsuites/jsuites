title: JavaScript Toast Notification
keywords: JavaScript toast, toast notification, JS toast
description: This section details a basic yet responsive JavaScript toast notification system. It is ideal for displaying quick, transient messages to users in a non-disruptive manner.

JavaScript Toast notifications
==============================

This script has less than 1Kb

The `jSuites.notification` is an ultra-lightweight, toast-style notification system for JavaScript applications. Its compact size ensures minimal impact on your application's performance.

- **Lightweight**: The script's small footprint ensures efficient performance.
- **User-Friendly**: Displays quick messages in the corner of the screen, providing a discreet user experience.
- **Auto-Hide Functionality**: Notifications automatically disappear after four seconds unless a different duration is specified.

### Implementation Example

Below is an example demonstrating how to use `jSuites.notification` for standard and error messages:

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input type="button" value="Show notification" class="jbutton dark" id="notification" />
<input type="button" value="Show error" class="jbutton dark" id="notification-error" />

<script>
document.getElementById("notification").onclick = function() {
    jSuites.notification({
        name: "Jsuites toast notification",
        message: "Successfully Update",
    })
}

document.getElementById("notification-error").onclick = function() {
    jSuites.notification({
        error: 1,
        name: "Error message",
        message: "Something went wrong",
    })
}
</script>
</html>
```
```jsx
import jSuites from "jsuites"
import "jsuites/dist/jsuites.css"

function App() {
    const showNotification = function () {
        jSuites.notification({
            name: "Jsuites toast notification",
            message: "Successfully Update",
        })
    }

    const showError = function () {
        jSuites.notification({
            error: 1,
            name: "Error message",
            message: "Something went wrong",
        })
    }

    return (
        <div className="App">
            <input type={"button"} value={"Show notification"} className={"jbutton dark"} onClick={showNotification} />
            <input type={"button"} value={"Show error"} className={"jbutton dark"} onClick={showError} />
        </div>
    );
}
export default App;
```
```vue
<template>
    <input type="button" value="Show notification" className="jbutton dark" @click="showNotification"/>
    <input type="button" value="Show error" className="jbutton dark" @click="showError"/>
</template>

<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css"

export default {
    name: "App",
    methods: {
        showNotification: function () {
            jSuites.notification({
                name: "Jsuites toast notification",
                message: "Successfully Update",
            })
        },
        showError: function () {
            jSuites.notification({
                error: 1,
                name: "Error message",
                message: "Something went wrong",
            })
        }
    },
}
</script>
```
