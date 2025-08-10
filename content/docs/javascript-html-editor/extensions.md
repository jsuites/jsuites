title: JavaScript Editor Extensions
keywords: JavaScript, Editor, HTML, HTML editor
description: This section brings more information about the HTML editor extensions and add-ons.

# JavaScript Editor Extensions

This section provides a concise guide to effectively integrate and use extensions within the Editor plugin. Extensions serve as modular enhancements, adding tailored functionalities to the Editor. The focus is on a systematic breakdown, guiding users through seamless integration and utilization for advanced text processing.

## Documentation

The extension is structured as a function, with parameters for the Element and Instance of the editor. This configuration enables smooth interaction with the editor's methods and data, establishing a user-friendly interface for manipulation.

To define the extension, incorporate a function into the extensions object within the options.

To establish a foundation, see the following code snippet:

{.ignore}
```javascript
jSuites.editor(el, {
    extensions: {
        myExtension: function(element, instance) {
            console.log('My extension is working!')
        }
    }
})
```

## Examples

### Vowels Remover Extension

Check out this example that demonstrates how to make an extension that gets rid of all vowels from text. Plus, it does it gradually, removing one of each vowel every second.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

<div id="editor"></div><br/>

<button id="reset" class="jbutton">Reset Initial Text</button>

<script>
const editor = jSuites.editor(document.getElementById('editor'), {
    value: '<div>In the tapestry of language, where vowels once danced with vibrant hues, a poetic transformation unfolds as a daring extension emerges to strip away those melodic elements. The consonants stand stoically, witnessing the departure of A, E, I, O, and U, as the text undergoes a silent metamorphosis. What was once a lyrical symphony now echoes with the absence of vowels, and a new narrative emerges, creating a unique and evocative poem that speaks of the departure and the ensuing void in this literary landscape.</div>',
    extensions: {
        removeVowels: function (el, instance) {
            setInterval(() => {
                let data = instance.getData();
                data = data.replace('a', '').replace('e', '').replace('i', '').replace('o', '').replace('u', '')
                instance.setData(data)
            }, 1000)
        },
    }
})
document.getElementById('reset').onclick = () => editor.setData('<div>In the tapestry of language, where vowels once danced with vibrant hues, a poetic transformation unfolds as a daring extension emerges to strip away those melodic elements. The consonants stand stoically, witnessing the departure of A, E, I, O, and U, as the text undergoes a silent metamorphosis. What was once a lyrical symphony now echoes with the absence of vowels, and a new narrative emerges, creating a unique and evocative poem that speaks of the departure and the ensuing void in this literary landscape.</div>')
</script>

</html>
```
```jsx
import { Editor } from "jsuites/react";
import { useRef } from "react";
import 'jsuites/dist/jsuites.css'

let initialValue = '<div>In the tapestry of language, where vowels once danced with vibrant hues, a poetic transformation unfolds as a daring extension emerges to strip away those melodic elements. The consonants stand stoically, witnessing the departure of A, E, I, O, and U, as the text undergoes a silent metamorphosis. What was once a lyrical symphony now echoes with the absence of vowels, and a new narrative emerges, creating a unique and evocative poem that speaks of the departure and the ensuing void in this literary landscape.</div>'

function App() {
    const editor = useRef(null);

    let extensions = {
        removeVowels: function (el, instance) {
            setInterval(() => {
                let data = instance.getData();
                data = data.replace('a', '').replace('e', '').replace('i', '').replace('o', '').replace('u', '')
                instance.setData(data)
            }, 1000)
        },
    }

    return (
        <div>
            <Editor ref={editor} value={initialValue} extensions={extensions} />
            <button onClick={() => editor.current.setData(initialValue)}>Reset Initial Text</button>
        </div>
    );
}

export default App;
```
```vue
<template>
    <Editor ref="editor" :value="initialValue" :extensions="extensions"/>
    <button @click="reset">Reset Initial Text</button>
</template>

<script>
import { Editor } from "jsuites/vue"
import "jsuites/dist/jsuites.css"

export default {
    name: "App",
    components: { Editor },
    data() {
        return {
            initialValue: '<div>In the tapestry of language, where vowels once danced with vibrant hues, a poetic transformation unfolds as a daring extension emerges to strip away those melodic elements. The consonants stand stoically, witnessing the departure of A, E, I, O, and U, as the text undergoes a silent metamorphosis. What was once a lyrical symphony now echoes with the absence of vowels, and a new narrative emerges, creating a unique and evocative poem that speaks of the departure and the ensuing void in this literary landscape.</div>',
            extensions: {
                removeVowels: function (el, instance) {
                    setInterval(() => {
                        let data = instance.getData();
                        data = data.replace('a', '').replace('e', '').replace('i', '').replace('o', '').replace('u', '')
                        instance.setData(data)
                    }, 1000)
                }
            }
        }
    },
    methods: {
        reset: function() {
            this.$refs.editor.current.setData(this.initialValue);
        }
    }
}
</script>
```
