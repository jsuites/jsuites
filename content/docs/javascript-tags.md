title: JavaScript Tags
keywords: JavaScript, Tags Input, jSuites Web Component, Tag Management, User Input Tags, JavaScript Tagging System
description: The jSuites.tags is an ultralight JavaScript web component and plugin designed to enable users to input and manage multiple tags within a text field. Ideal for keyword entry, tagging systems, and dynamic content categorization in web applications.

![JavaScript Tags](img/js-tags.svg)

# JavaScript Tags

The `jSuites.tags` is a lightweight JavaScript Tags and Keywords input component for web applications. This plugin streamlines the inputting and organizing of numerous tags or keywords within a text input field. Its adaptability renders it an invaluable resource for a wide array of uses, such as:

- Input boxes for keywords, tags, and categories
- Input validations
- Destination email fields
- CRM and CMS systems
- SEO systems for managing tags and keywords


## Documentation

### Available Methods

The following methods are provided to facilitate the integration of the component with web applications:

| Method            | Description                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------|
| getData();        | Get all tags as a object                                                                          |
| getValue(number)  | Get a specific tag by index or all tags value  <br>@param integer indexNumber - Null for all tags |
| setValue(string); | Set a new value for the javascript tagging  <br>@param string newValue - Values separate by comma |
| reset();          | Clear all tags                                                                                    |
| isValid();        | Validate tags                                                                                     |

### Available Events

These events allow for customized behaviour adjustments of the component:

| Method         | Description                                                                                                          |
|----------------|----------------------------------------------------------------------------------------------------------------------|
| onbeforechange | Method executed before a value is changed.  <br>(HTMLElement element, Object instance, String value) => string       | false | undefined |
| onbeforepaste  | Method executed before the paste data is appended.  <br>(HTMLElement element, Object instance, Array data) => string | false | undefined |
| onchange       | Method executed when a value is changed.  <br>(HTMLElement element, Object instance, String value) => void           |
| onfocus        | Method executed when the input is focused.  <br>(HTMLElement element, Object instance, String currentValue) => void  |
| onblur         | Method executed when the input is focused.  <br>(HTMLElement element, Object instance, String currentValue) => void  |
| onload         | Method executed the DOM element is ready.  <br>(HTMLElement element, Object instance) => void                        |


### Initialization Settings

To initialize a new tag or keyword input element, configure the following settings:

| Property               | Description                                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| value: string \| array | Initial value of the compontent. An string separate by comma or an array of objects.                  |
| limit: number          | Max number of tags inside the element                                                                       |
| search: string         | The URL for the remote suggestions                                                                          |
| placeholder: string    | The default instruction text on the element                                                                 |
| validation: function   | Method to validate the entries in the input.  <br>(HTMLElement element, String value, Number id) => boolean |


## Examples

### Keywords Management

Implement an essential keywords management input using the `jSuites.tags` as a JavaScript web component. This setup allows for efficient handling and organization of keywords within a user-friendly input field, suitable for various applications such as content tagging, search engine optimization tools, and metadata management.

{.all}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<jsuites-tags value="Canada,US,UK"></jsuites-tags>

<script>
document.querySelector('jsuites-tags').addEventListener('onblur', function() {
    console.log(this.textContent);
});
</script>
</html>
```

### Basic example

A basic javascript tags input component.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='tag-input1' style="width: 320px"></div>

<script>
jSuites.tags(document.getElementById('tag-input1'), {
    value: 'Canada,US,UK',
    onblur: function() {
        console.log(arguments)
    }
});
</script>
</html>
```
```jsx
import { Tags } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const tags = useRef(null);

    const handleBlur = function(el, instance, value) {
        console.log('Tags' + value);
    }

    return (
        <div className="App">
            <Tags ref={tags} value={['Canada', 'US', 'UK']} onblur={handleBlur} />
        </div>
);
}
export default App;
```
```vue
<template>
    <Tags ref="tags" :value="value" :onblur="handleBlur" />
</template>

<script>
import { Tags } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Tags
    },
    data() {
        return {
            value: ['Canada', 'US', 'UK']
        }
    },
    methods: {
        handleBlur: function(_, _1, value) {
            console.log('Tags' + value);
        }
    }
}
</script>
```

### Gmail-like Email Input

Set up a Gmail-like email input using `jSuites.tags` that support validations and remote suggestions optimized for keyboard interactions.  
  
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://jsuites.net/v5/jsuites.webcomponents.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id='tag-input2' style="width: 320px"></div>

<script>
jSuites.tags(document.getElementById('tag-input2'), {
    validation: function(element, text, value) {
        if (! value) {
            value = text;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var test = re.test(String(value).toLowerCase()) ? true : false;
        return test;
    },
    search: '/docs/v5/data?q=',
    placeholder: 'To'
});
</script>
</html>
```
```jsx
import { Tags } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
    const tags = useRef(null);

    const handleValidation = function (element, text, value) {
        if (!value) {
          value = text;
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let test = re.test(String(value).toLowerCase()) ? true : false;

        return test;
    }

    return (
        <div className="App">
            <Tags ref={tags} validation={handleValidation} search={'/v5/data?q='} placeholder={'To'} />
        </div>
);
}
export default App;
```
```vue
<template>
    <Tags ref="tags" :validation="handleValidation" search="/v5/data?q=" placeholder="To" />
</template>

<script>
import { Tags } from "jsuites/vue";
import 'jsuites/dist/jsuites.css'

export default {
    name: 'App',
    components: {
        Tags
    },
    methods: {
        handleValidation: function (_, text, value) {
            if (!value) {
                value = text;
            }
            let reString = '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
            let re = new RegExp(reString, 'i');
            let test = re.test(String(value).toLowerCase());

            return test;
        }
    }
}
</script>
```
