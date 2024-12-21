title: JavaScript HTML Editor
keywords: JavaScript, WYSIWYG HTML Editor, jSuites Plugin, Content Editing Tools, Web Development Integration
description: jSuites HTML editor is a JavaScript-based plugin offering an interface for web content editing. It includes various manipulation tools and filters, extensions, and a customizable toolbar for seamless integration into web applications and projects.
canonical: https://jsuites.net/docs/javascript-html-editor

# JavaScript HTML Editor

A lightweight wysiwyg JavaScript HTML editor is available with a few native features.

1. The HTML tags is filtered on the paste action.
2. Javascript events for easy integration
3. Remote URL parser and snippet integrated object.
4. Custom toolbar
5. Integrated file and image dropzone
6. Extensions

## Documentation

### Available Methods

| Method    | Description                      |
|-----------|----------------------------------|
| setData() | Set new data to the editor.      |
| getData() | Get the current data.            |
| reset()   | Clear the content of the editor. |
| destroy() | Destroy the editor.              |


### Initialization properties

| Property                    | Description                                                       |
|-----------------------------|-------------------------------------------------------------------|
| value: string               | Initial HTML value                                                |
| snippet: object             | Snippet object                                                    |
| toolbar: boolean \| object  | True for the default toolbar, or a items of a customized toolbar. |
| remoteParser: string        | A URL for the remote URL/image parser.                            |
| parseURL: boolean           | Parse URL inside the editor to create a snippet.                  |
| filterPaste: boolean        | Filter all content onpaste                                        |
| dropZone: boolean           | Allow images or files to be dropped in the editor.                |
| acceptFiles: boolean        | Accept PDF on the editor.                                         |
| acceptImages: boolean       | Accept images on the editor.                                      |
| dropAsAttachment: boolean   | When images are dropped, they are included as attachement.        |
| maxFileSize: number         | Max filesize in bytes.                                            |
| border: boolean             | Add borders to the editor.                                        |
| padding: boolean            | Add padding to the editor.                                        |
| maxHeight: number           | Max height for the editor.                                        |
| focus: boolean              | Focus on the content after the data is loaded.                   |
| placeholder: string         | Content placeholder                                               |
| extensions: object          | The extensions object.                                            |


### Available Events

| Event     | Description                                                                                                              |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| onclick   | When a click happens on the editor.  <br>(element: HTMLElement, instance: Object, event: Object) => void                 |
| onfocus   | When the editor is focused.  <br>(element: HTMLElement, instance: Object, currentValue: string) => void                  |
| onblur    | When the editor is blured.  <br>(element: HTMLElement, instance: Object, currentValue: string) => void                   |
| onload    | A method is execute when the modal is closed.  <br>(element: HTMLElement, instance: Object, editor: HTMLElement) => void |
| onkeyup   | When a new key from the keyboard is released.  <br>(element: HTMLElement, instance: Object, event: Object) => void       |
| onkeydown | When a new key from the keyboard is pressed.  <br>(element: HTMLElement, instance: Object, event: Object) => void        |


## Examples

### Basic HTML editor


```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="editor" style="width: 480px;"></div>

<p><input type='button' value='Get data' id="btn"></p>

<script>
let editor = jSuites.editor(document.getElementById('editor'), {
    allowToolbar: true,
    value: '<b>This is a basic example...</b><br><br><br><br>'
});

btn.addEventListener('click', () => {
    alert(editor.getData())
})
</script>
</html>
```
```jsx
import { Editor } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const editor = useRef(null);

    return (
        <div className="App">
            <Editor ref={editor} allowToolbar={true} value={'<b>This is a basic example...</b><br><br><br><br>'} />
            <button onClick={() => alert(editor.current.getData())}>Get Data</button>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Editor
        ref="editor"
        :allowToolbar="true"
        value="<b>This is a basic example...</b><br><br><br><br>"
    />
    <button @click="handleClick">getData()</button>
</template>

<script>
import { Editor } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Editor
    },
    methods: {
        handleClick: function() {
            alert(this.$refs.editor.current.getData())
        }
    }
}
</script>
```

### Image dropping zone

Learn how to enable a dropping zone for images on your javascript HTML editor.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<p class="small">Drop any image in the rich text below.</p>
<div id="root" style="width: 480px;"></div>

<script>
jSuites.editor(document.getElementById('root'), {
    parseURL: true,
    // Website parser is to read websites and images from cross domain
    remoteParser: '/docs/parser?url=',
    // Allow toolbar
    allowToolbar:true,
    height: 200,
});
</script>
</html>
```
```jsx
import { Editor } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const editor = useRef(null);

    return (
        <div className="App">
            <p className="small">Drop any image in the rich text below.</p>
            <Editor
              ref={editor}
              allowToolbar={true}
              parserURL={true}
              remoteParser={'/docs/parser?url='}
              height={200}
            />
        </div>
    );
}

export default App;
```
```vue
<template>
    <p class="small">Drop any image in the rich text below.</p>
    <Editor
        ref="editor"
        :allowToolbar="true"
        :parserURL="true"
        remoteParser="/docs/parser?url="
        :height="200"
    />
</template>

<script>
import { Editor } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Editor
    },
}
</script>
```

### Custom Toolbars

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="editor3"></div>
<script>
jSuites.editor(document.getElementById('editor3'), {
    allowToolbar: true,
    value: '<b>This is a basic example...</b>',
    toolbar: [{
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        },
        {
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        },
        {
            type:'divisor'
        },{
            type:'select',
            width: '160px',
            options: [ 'Verdana', 'Arial', 'Courier New' ],
            render: function(e) {
                return '<span style="font-family:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d) {
                document.execCommand('fontName', false, d);
            }
        },
        {
            type: 'select',
            width: '48px',
            content: 'format_size',
            options: ['X-small','Small','Medium','Large','X-large'],
            render: function(e) {
                return '<span style="font-size:' + e + '">' + e + '</span>';
            },
            onchange: function(a,b,c,d,e) {
                document.execCommand('fontSize', false, e+1);
            }
        },
        {
            type: 'select',
            width: '50px',
            options: ['format_align_left','format_align_center','format_align_right','format_align_justify'],
            render: function(e) {
                return '<i class="material-icons">' + e + '</i>';
            },
            onchange: function(a,b,c,d) {
                if (d == 'format_align_left') {
                    document.execCommand('justifyLeft');
                } else if (d == 'format_align_center') {
                    document.execCommand('justifyCenter');
                } else if (d == 'format_align_right') {
                    document.execCommand('justifyRight');
                } else if (d == 'format_align_justify') {
                    document.execCommand('justifyFull');
                }
            }
        }
    ]
});
</script>
</html>
```
```jsx
import { Editor } from "jsuites/react";
import { useRef } from "react";
import 'jsuites/dist/jsuites.css'

const toolbar = [{
    content: 'undo',
    onclick: function () {
        document.execCommand('undo');
    }
},
{
    content: 'redo',
    onclick: function () {
        document.execCommand('redo');
    }
},
{
    type: 'divisor'
}, {
    type: 'select',
    width: '160px',
    options: ['Verdana', 'Arial', 'Courier New'],
    render: function (e) {
        return '<span style="font-family:' + e + '">' + e + '</span>';
    },
    onchange: function (a, b, c, d) {
        document.execCommand('fontName', false, d);
    }
},
{
    type: 'select',
    width: '48px',
    content: 'format_size',
    options: ['X-small', 'Small', 'Medium', 'Large', 'X-large'],
    render: function (e) {
        return '<span style="font-size:' + e + '">' + e + '</span>';
    },
    onchange: function (a, b, c, d, e) {
        document.execCommand('fontSize', false, e + 1);
    }
},
{
    type: 'select',
    width: '50px',
    options: ['format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify'],
    render: function (e) {
        return '<i class="material-icons">' + e + '</i>';
    },
    onchange: function (a, b, c, d) {
        if (d == 'format_align_left') {
            document.execCommand('justifyLeft');
        } else if (d == 'format_align_center') {
            document.execCommand('justifyCenter');
        } else if (d == 'format_align_right') {
            document.execCommand('justifyRight');
        } else if (d == 'format_align_justify') {
            document.execCommand('justifyFull');
        }
    }
}
]

function App() {
    const editor = useRef(null);

    return (
        <div>
            <Editor ref={editor} allowToolbar={true} value={'<b>This is a basic example...</b>'} toolbar={toolbar} />
        </div>
    );
}

export default App;
```
```vue
<template>
    <Editor ref="editor" :allowToolbar="true" value="<b>This is a basic example...</b>" :toolbar="toolbar"/>
</template>

<script>
import { Editor } from "jsuites/vue"
import "jsuites/dist/jsuites.css"


export default {
    name: "App",
    components: { Editor },
    data() {
        return {
            toolbar: [{
                content: 'undo',
                onclick: function () {
                    document.execCommand('undo');
                }
            },
            {
                content: 'redo',
                onclick: function () {
                    document.execCommand('redo');
                }
            },
            {
                type: 'divisor'
            }, {
                type: 'select',
                width: '160px',
                options: ['Verdana', 'Arial', 'Courier New'],
                render: function (e) {
                    return '<span style="font-family:' + e + '">' + e + '</span>';
                },
                onchange: function (a, b, c, d) {
                    document.execCommand('fontName', false, d);
                }
            },
            {
                type: 'select',
                width: '48px',
                content: 'format_size',
                options: ['X-small', 'Small', 'Medium', 'Large', 'X-large'],
                render: function (e) {
                    return '<span style="font-size:' + e + '">' + e + '</span>';
                },
                onchange: function (a, b, c, d, e) {
                    document.execCommand('fontSize', false, e + 1);
                }
            },
            {
                type: 'select',
                width: '50px',
                options: ['format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify'],
                render: function (e) {
                    return '<i class="material-icons">' + e + '</i>';
                },
                onchange: function (a, b, c, d) {
                    if (d == 'format_align_left') {
                        document.execCommand('justifyLeft');
                    } else if (d == 'format_align_center') {
                        document.execCommand('justifyCenter');
                    } else if (d == 'format_align_right') {
                        document.execCommand('justifyRight');
                    } else if (d == 'format_align_justify') {
                        document.execCommand('justifyFull');
                    }
                }
            }
            ]
        }
    }
}
</script>
```

## More examples

You can find more examples of the jSuites JavaScript HTML Editor plugin as below.

* [Applying Extensions to the Editor](/docs/javascript-html-editor/extensions)
