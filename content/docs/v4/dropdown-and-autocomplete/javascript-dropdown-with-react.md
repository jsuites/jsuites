title: React dropdown
keywords: javascript, autocomplete, javascript dropdown, react
description: Create a dropdown component with React and jSuites

{.white}
> A new version of the jSuites **JavaScript Dropdown** plugin is available here.
> <br><br>
> [JavaScript Dropdown](/docs/dropdown){.button .main target="_top"}

React Dropdown
==============

React dropdown and react autocomplete [working example](https://codesandbox.io/s/jsuites-dropdown-with-react-i4jwe) on codesandbox.  
  

Dropdown component
------------------

```jsx
import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function Dropdown({ options }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    jSuites.dropdown(dropdownRef.current, options);
  }, [options]);

  return <div ref={dropdownRef} />;
}
```
  

Component usage
---------------

```jsx
import { useState, useRef } from "react";

import Dropdown from "./Dropdown";

export default function App() {
  const [dropdownValue, setDropdownValue] = useState("");

  const data = useRef(["Dog", "Cat", "Bird", "Fish"]);

  const handleDropdownChange = (element, index, oldValue, newValue) => {
    setDropdownValue(newValue);
  };

  return (
    <>
      <h3>Dropdown example:</h3>
      <Dropdown
        options={{
          value: dropdownValue,
          onchange: handleDropdownChange,
          data: data.current,
          newOptions: true
        }}
      />
    </>
  );
}
```
