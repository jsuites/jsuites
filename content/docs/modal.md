title: JavaScript Modal Component
keywords: JavaScript Modal Plugin, Responsive Modal Window, Popup Modal Component, Vanilla JavaScript Modal
description: jSuites modal is a JavaScript modal plugin and web component perfect for creating responsive, customizable popup modals in web applications.
canonical: https://jsuites.net/docs/modal

# JavaScript Modal

`jSuites.modal` is a lightweight JavaScript plugin for creating modal windows, designed to be responsive and adaptable to various screen sizes. It offers a straightforward approach for integrating modal functionality, supporting vanilla JavaScript and web component usage.

## Documentation

### Available Methods

| Method   | Description     |
|----------|-----------------|
| open()   | Open the modal  |
| close()  | Close the modal |

### Initialization properties

| Property          | Description                          |
|-------------------|--------------------------------------|
| url: string       | Open the content from a remote URL.  |
| closed: boolean   | Create the modal but keep it closed. |
| width: number     | The width size of your modal         |
| height: number    | The height size of your modal        |
| title: string     | The title shown of your modal        |
| backdrop: boolean | Don't show the backdrop              |

### Events

| Event   | Description                                                                                       |
|---------|---------------------------------------------------------------------------------------------------|
| onopen  | A method is execute when the modal is opened.  <br>(element: HTMLElement, instance: JSON) => void |
| onclose | A method is execute when the modal is closed.  <br>(element: HTMLElement, instance: JSON) => void |


## Examples

### JavaScript Web Component Modal

This example demonstrates how to implement a modal using the custom HTML tag provided by the `jSuites.modal` JavaScript plugin.

{.all}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<jsuites-modal title="Webcomponent Modal" closed="true" width="600" height="480">
This is an example how to create a modal based on the custom HTML javascript modal.
</jsuites-modal>

<input type='button' value='Open the modal'
    onclick="document.querySelector('jsuites-modal').modal.open()" class='plain'>

<script>
document.querySelector('jsuites-modal').addEventListener('onopen', function() {
    console.log('Modal is open');
});
document.querySelector('jsuites-modal').addEventListener('onclose', function() {
    console.log('Modal is closed');
});
</script>
</html>
```


### JavaScript Modal

A basic modal with events.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="basic-modal" title="My Modal">
Modal with no title content
</div>

<input type="button" value="Open the modal" id="basic-modal-button" />

<script>
let modal = jSuites.modal(document.getElementById('basic-modal'), {
    closed: true,
    width: 600,
    height: 480,
    onopen: function(el, instance) {
        console.log('Modal is open');
    },
    onclose: function(el, instance) {
        console.log('Modal is closed');
    }
});

document.getElementById('basic-modal-button').addEventListener('click', function() {
    modal.open();
});
</script>
</html>
```
```jsx
import { Modal } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'

function App() {
    const modal = useRef(null);

    const onOpen = function(el, instance) {
        console.log('Modal is open');
    }

    const onClose = function(el, instance) {
        console.log('Modal is closed');
    }

    const handleOpen = function() {
        modal.current.open();
    }

    return (
        <div className="App">
            <Modal ref={modal} closed={true} width={600} height={480} onopen={onOpen} onclose={onClose}>
                This is an example how to create a modal based on the custom HTML javascript modal.
            </Modal>
            <button onClick={handleOpen} className='plain'>Open the modal</button>
        </div>
    );
}
export default App;
```
```vue
<template>
    <Modal ref="modal" :closed="true" :width="600" :height="480" :onopen="onOpen" :onclose="onClose">
        This is an example how to create a modal based on the custom HTML javascript modal.
    </Modal>
    <button @click="handleOpen" className="plain">Open the modal</button>
</template>

<script>
import { Modal } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Modal
    },
    methods: {
        onOpen: function() {
            console.log('Modal is open');
        },
        onClose: function() {
            console.log('Modal is closed');
        },
        handleOpen: function() {
            this.$refs.modal.current.open();
        }
    }
}
</script>
```

### Basic Example

This example illustrates how to initialize a basic modal using `jSuites.modal` with an existing DOM element without specifying a title for the modal.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='modal'>
Modal with no title content
</div>

<input type='button' value='Click here to open the modal' class='plain' id="btn">

<script>
var modal = jSuites.modal(document.getElementById('modal'), {
    width: '600px',
    height: '480px',
    closed: true,
});

btn.addEventListener('click', function() {
    modal.open()
})
</script>
</html>
```
```jsx
import { Modal } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const modal = useRef(null);
    
    const handleOpen = function() {
        modal.current.open()
    }

    return (
        <div className="App">
            <Modal ref={modal} closed={true} width={600} height={480}>
                Modal with no title content
            </Modal>
            <button onClick={handleOpen} className='plain'>Click here to open the modal</button>
        </div>
    );
}
export default App;
```
```vue
<template>
    <Modal ref="modal" :closed="true" :width="600" :height="480">
        Modal with no title content
    </Modal>
    <button @click="handleOpen" className="plain">Click here to open the modal</button>
</template>

<script>
import { Modal } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Modal
    },
    methods: {
        handleOpen: function() {
            this.$refs.modal.current.open()
        }
    }
}
</script>
```

