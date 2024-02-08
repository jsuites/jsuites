title: React picker
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, react, react integration
description: How to integrate the jsuites picker with React.

* [React Picker](/docs/v4/picker)

React picker
============

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-picker-with-react-yl5kc)

Picker component
----------------

```jsx
import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function Picker({ options }) {
  const pickerRef = useRef(null);

  useEffect(() => {
    jSuites.picker(pickerRef.current, options);
  }, [options]);

  return <div ref={pickerRef} />;
}
```        

Component usage
---------------

```jsx
import { useState } from "react";

import Picker from "./Picker";

export default function App() {
  const [pickerValue, setPickerValue] = useState(0);

  const handlePickerChange = (element, instance, reserved, value, index) => {
    setPickerValue(parseInt(index, 10));
  };

  return (
    <>
      <h3>Picker example:</h3>
      <Picker
        options={{
          data: ["Verdana", "Arial", "Courier New"],
          onchange: handlePickerChange,
          value: pickerValue
        }}
      />
    </>
  );
}
```
