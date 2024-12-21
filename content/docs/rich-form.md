title: JavaScript Rich Forms
keywords: JavaScript rich form plugin, HTML form, form validations, change tracking, data persistence, remote server integration
description: A JavaScript plugin to enable developers to implement advanced form validations and track changes in HTML form elements.
canonical: https://jsuites.net/docs/rich-form

# JavaScript Form

The `jSuites.form` plugin is a JavaScript tool designed to improve FORM functionality in web applications. It brings advanced form validations, monitors changes in HTML form elements, and introduces several features to enrich the user experience with forms on web platforms.

- **Unsaved Changes Alert**: Notifies users with an "Are you sure?" message if they attempt to leave a page with unsaved form changes;
- **Input Validations**: Create standard and custom validation rules for form inputs based on element properties.
- **Data Management**: Simplify form data persistence and retrieval.
- **Event Handling**: Intercept form submissions, apply custom rules, and execute callbacks;
- **File Uploads**: Helpers for file upload;



## Features

### Tracking HTML Form Updates

This JavaScript plugin monitors HTML form changes by generating a hash from all form elements and their values. If a user attempts to navigate away from a page with unsaved form changes, the plugin re-evaluates the hash. A discrepancy between the initial and final hash values triggers an alert, indicating unsaved modifications. The plugin's algorithm efficiently handles dynamic form elements and includes several methods to support application enhancement.  
  

### JavaScript Form validations

Control the form validations from the HTML elements.  

## Documentation

### Available Methods

| Method              | Description                                          |
|---------------------|------------------------------------------------------|
| load();             | Load data from a remote server to the form elements. |
| save();             | Save data from the form elements to the server.      |
| reset();            | Reset the data from all elements in the form.        |
| resetTracker();     | Start tracking again                                 |
| isChanged();        | Check if the form is changed                         |
| setIgnore(boolean); | Enable or disable the tracking                       |


### Initialization properties

| Property            | Description                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| url: string         | Remote data source for the form.                                                        |
| message: string     | Message for the user. For security reasons the browser can show only a default message. |
| setIgnore(boolean); | Enable or disable the tracking                                                          |

### Available events

| Event        | Description                                                                                                                                                                               |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onload       | As soon the form loads external data.  <br>(element: HTMLElement, data: JSON) => void                                                                                                     |
| onbeforesave | Before any data is saved in the remote server. This can be useful to intercept any user data before sending to the server.  <br>(element: HTMLElement, currenData: JSON) => newData: JSON |
| onsave       | After data is sent to the server.  <br>(element: HTMLElement, result: JSON) => void                                                                                                       |
| onerror      | When any error happens in the form.  <br>(element: HTMLElement, message: string) => void                                                                                                  |

### Native validations

| jSuites.validations |
|---------------------|
| email               |
| length              |
| required            |
| number              |


## Examples

### Tracking changes on the form elements

Please consider the following form example. If the user tries to leave the page without saving, the tracking will alert for unsaved changes.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<form id='root'>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Name</label>
                <input type='text' name='name' value='Roger Fredson'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Profession</label>
                <input type='text' name='profession' value='Singer'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Gender</label>
                <select name='gender'>
                <option value="1">Male</option>
                <option value="2">Female</option>
                </select>
            </div>
        </div>
    </div>

    <br>

    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <input type='button' value='Save profile' id='btn1'>
            </div>
        </div>
    </div>
</form>

<script>
var myTracker = jSuites.tracker(document.getElementById('root'));
document.getElementById('btn1').addEventListener('click', myTracker.resetTracker)
</script>
</html>
```
```jsx
import { useEffect, useRef, useState } from "react";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css"

function App() {
    const formEl = useRef(null);
    const trackerInstance = useRef(null);

    const [name, setName] = useState('Roger Fredson');
    const [profession, setProfession] = useState('Singer');
    const [gender, setGender] = useState("1");

    useEffect(() => {
        if (formEl.current) {
            trackerInstance.current = jSuites.tracker(formEl.current)
        }
    })

    return (
        <form ref={formEl}>
            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <label>Profession</label>
                        <input type='text' name='profession' value={profession} onChange={e => setProfession(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <label>Gender</label>
                        <select name='gender' onChange={e => setGender(Number(e.target.value))} value={gender}>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                </div>
            </div>

            <br />

            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <input type='button' value='Save profile' onClick={() => trackerInstance.current.resetTracker() } />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default App;
```
```vue
<template>
    <form ref="formEl">
        <div class="row">
            <div class="column">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" v-model="name" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="form-group">
                    <label>Profession</label>
                    <input type="text" v-model="profession" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="form-group">
                    <label>Gender</label>
                    <select v-model="gender">
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                </div>
            </div>
        </div>

        <br />

        <div class="row">
            <div class="column">
                <div class="form-group">
                    <input type="button" value="Save profile" @click="resetTracker" />
                </div>
            </div>
        </div>
    </form>
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
    data() {
        return {
            name: "Roger Fredson",
            profession: "Singer",
            gender: "1",
            trackerInstance: null,
        };
    },
    mounted() {
        this.trackerInstance = jSuites.tracker(this.$refs.formEl);
    },
    methods: {
        resetTracker() {
            if (this.trackerInstance) {
                this.trackerInstance.resetTracker();
            }
        },
    },
};
</script>
```


### Custom validations

It is possible to extend the native `jSuites.form` plugin validations, that can be used use the `data-validation` property.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<form id='root'>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Domain</label>
                <input type='text' name='domain' data-validation='domain'
                    data-error='You should enter a valid domain'>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <label>Password</label>
                <input type='text' name='password' data-validation='password'
                    data-error='Your password must contain:\nAt least 1 lowercase alphabetical character\nAt least 1 uppercase alphabetical character\nAt least 1 numeric character\nAt least one special character, but we are escaping reserved RegEx characters to avoid conflict\nAnd must be eight characters or longer\n'>
            </div>
        </div>
    </div>

    <br>

    <div class='row'>
        <div class='column'>
            <div class='form-group'>
                <input type='button' value='Save profile' id='btn2'>
            </div>
        </div>
    </div>
</form>

<script>
let myForm = jSuites.form(document.getElementById('root'), {
    url: '/docs/f',
    validations: {
        domain: function(value) {
            var reg = new RegExp(/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/);
            return value && reg.test(value) ? true : false;
        },
        password: function(value) {
            var reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
            return value && reg.test(value) ? true : false;
        }
    },
    onerror: function(el, message) {
        // Format message
        message = message.replace(new RegExp("\\\\n", "gm"), "<br>");
        // Custom Notification
        jSuites.notification({ message: message });
    }
});

document.getElementById('btn2').addEventListener('click', function () {
    myForm.save()
})
</script>
</html>
```
```jsx
import { useEffect, useRef } from "react";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css"

function App() {
    const formEl = useRef(null);
    const formInstance = useRef(null);

    useEffect(() => {
        formInstance.current = jSuites.form(formEl.current, {
            url: '/docs/f',
            validations: {
                domain: function (value) {
                    var reg = new RegExp(/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/);
                    return value && reg.test(value) ? true : false;
                },
                password: function (value) {
                    var reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
                    return value && reg.test(value) ? true : false;
                }
            },
            onerror: function (el, message) {
                // Format message
                message = message.replace(new RegExp("\\\\n", "gm"), "<br>");
                // Custom Notification
                jSuites.notification({ message: message });
            }
        })
    })

    return (
        <form ref={formEl}>
            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <label>Domain</label>
                        <input type='text' name='domain' data-validation='domain'
                            data-error='You should enter a valid domain' />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='text' name='password' data-validation='password'
                            data-error='Your password must contain:\nAt least 1 lowercase alphabetical character\nAt least 1 uppercase alphabetical character\nAt least 1 numeric character\nAt least one special character, but we are escaping reserved RegEx characters to avoid conflict\nAnd must be eight characters or longer\n' />
                    </div>
                </div>
            </div>

            <br />

            <div className='row'>
                <div className='column'>
                    <div className='form-group'>
                        <input type='button' value='Save profile' onClick={() => formInstance.current.save()} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default App;
```
```vue
<template>
    <form ref="formEl">
        <div class="row">
            <div class="column">
                <div class="form-group">
                    <label>Domain</label>
                    <input type="text" name="domain" v-validate="'domain'" v-model="domain" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="form-group">
                    <label>Password</label>
                    <input type="text" name="password" v-validate="'password'" v-model="password" />
                </div>
            </div>
        </div>

        <br />

        <div class="row">
            <div class="column">
                <div class="form-group">
                    <input type="button" value="Save profile" @click="saveForm" />
                </div>
            </div>
        </div>
    </form>
</template>
  
<script>
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";

export default {
    data() {
        return {
            domain: "",
            password: "",
            formInstance: null,
        };
    },
    mounted() {
        this.formInstance = jSuites.form(this.$refs.formEl, {
            url: "/docs/f",
            validations: {
                domain: (value) => {
                    const reg = /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/;
                    return value && reg.test(value);
                },
                password: (value) => {
                    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                    return value && reg.test(value);
                },
            },
            onerror: (el, message) => {
                message = message.replace(new RegExp("\\\\n", "gm"), "<br>");
                jSuites.notification({ message: message });
            },
        });
    },
    methods: {
        saveForm() {
            if (this.formInstance) {
                this.formInstance.save();
            }
        },
    },
};
</script>
```


