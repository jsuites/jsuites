title: Javascript Dropdown Events
keywords: javascript, autocomplete, javascript dropdown, events, javascript events
description: Dealing with javascript dropdown events.

* [JavaScript Dropdown Plugin](/docs/dropdown)

# Dropdown Events

## Example

Handling JavaScript events on the dropdown component.

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input type='button' value='Open the dropdown' class='plain' id='openbtn'>
<input type='button' value='Close the dropdown' class='plain' id='closebtn'>

<p><span id='log'></span></p>

<div id="dropdown"></div>

<script>
let myDropdown = jSuites.dropdown(document.getElementById('dropdown'), {
    data: [
        'JavaScript',
        'Python',
        'Java',
        'C/CPP',
        'PHP',
        'Swift',
        'C#',
        'Ruby',
        'Objective - C',
        'SQL',
    ],
    onchange: function(el,val) {
        document.getElementById('log').innerHTML = 'Dropdown new value is: ' + val;
    },
    onopen: function() {
        document.getElementById('log').innerHTML = 'Dropdown is opened';
    },
    onclose: function() {
        document.getElementById('log').innerHTML = 'Dropdown is closed';
    },
    width:'280px'
});

openbtn.onclick = () => myDropdown.open()
closebtn.onclick = () => myDropdown.close()
</script>
</html>
```
```jsx
import { Dropdown } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'

function App() {
  const dropdown = useRef(null);
  const log = useRef(null);

  const onChange = function (el, val) {
    log.current.innerHTML = 'Dropdown new value is: ' + val;
  }

  const onOpen = function () {
    log.current.innerHTML = 'Dropdown is opened';
  }

  const onClose = function () {
    log.current.innerHTML = 'Dropdown is closed';
  }
  return (
    <div className="App">
      <button onClick={() => dropdown.current.open()} className='plain'>Open the dropdown</button>
      <button onClick={() => dropdown.current.close()} className='plain'>Close the dropdown</button>
      <p><span ref={log} > </span></p>
      <Dropdown ref={dropdown} data={[
        'JavaScript',
        'Python',
        'Java',
        'C/CPP',
        'PHP',
        'Swift',
        'C#',
        'Ruby',
        'Objective - C',
        'SQL',
      ]} width={'280px'} onchange={onChange} onopen={onOpen} onclose={onClose}>
      </Dropdown>

    </div>
  );
}
export default App;
```
```vue
<template>
    <div class="App">
        <button @click="openDropdown" class="plain">Open the dropdown</button>
        <button @click="closeDropdown" class="plain">Close the dropdown</button>
        <p><span ref="log"> </span></p>
        <Dropdown ref="dropdown" :data="dropdownData" width="280px" :onchange="onChange" :onopen="onOpen"
            :onclose="onClose" />
    </div>
</template>
  
<script>
import { Dropdown } from 'jsuites/vue';
import 'jsuites/dist/jsuites.css';

export default {
    components: { Dropdown },
    data() {
        return {
            dropdownData: [
                'JavaScript',
                'Python',
                'Java',
                'C/CPP',
                'PHP',
                'Swift',
                'C#',
                'Ruby',
                'Objective - C',
                'SQL',
            ],
        };
    },
    methods: {
        openDropdown() {
            this.$refs.dropdown.current.open();
        },
        closeDropdown() {
            this.$refs.dropdown.current.close();
        },
        onChange(el, val) {
            this.$refs.log.innerHTML = 'Dropdown new value is: ' + val;
        },
        onOpen() {
            this.$refs.log.innerHTML = 'Dropdown is opened';
        },
        onClose() {
            this.$refs.log.innerHTML = 'Dropdown is closed';
        },
    },
};
</script>
```