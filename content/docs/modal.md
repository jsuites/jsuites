title: JavaScript Modal  
keywords: JavaScript Modal Plugin, Responsive Modal Window, Popup Modal Component, Vanilla JavaScript Modal  
description: jSuites Modal is a lightweight JavaScript plugin and web component designed for building responsive and highly customizable popup modals, enhancing the user experience in web applications.  
canonical: https://jsuites.net/docs/modal

# JavaScript Modal

jSuites provides a lightweight native JavaScript plugin for creating responsive and versatile modals. It works seamlessly with your favourite frameworks like React, Angular, Vue, web components, or even pure JavaScript.

## Documentation

### Available Methods

| Method    | Description     |
|-----------|-----------------|
| `open()`  | Open the modal  |
| `close()` | Close the modal |

### Initialization properties

| Property            | Description                          |
|---------------------|--------------------------------------|
| `url: string`       | Open the content from a remote URL.  |
| `closed: boolean`   | Create the modal but keep it closed. |
| `width: number`     | The width size of your modal         |
| `height: number`    | The height size of your modal        |
| `title: string`     | The title shown of your modal        |
| `backdrop: boolean` | Don't show the backdrop              |

### Events

| Event     | Description                                                                                        |
|-----------|----------------------------------------------------------------------------------------------------|
| `onopen`  | A method is execute when the modal is opened.<br>(element: HTMLElement, instance: JSON) => void    |
| `onclose` | A method is execute when the modal is closed.<br>(element: HTMLElement, instance: JSON) => void    |


## Examples

### JavaScript Web Component Modal

This example shows how to create and use a modal with the custom HTML tag provided by the `jSuites.modal` plugin, enabling seamless integration as a web component.

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

This example demonstrates a basic modal implementation with event handling.

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

export default function App() {
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

### Create Modal from HTML Content

This example demonstrates how to use `jSuites.modal` to initialize a modal directly from an existing DOM element. The modal is created without specifying a title, showcasing a simple and flexible approach to working with predefined HTML content.

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

## More Examples

- [Modal Events](/docs/modal/events)
- [External Content](/docs/modal/external-content)
