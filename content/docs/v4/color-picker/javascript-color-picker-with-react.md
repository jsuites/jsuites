title: React color picker
keywords: Javascript, color picker, color picker, examples, react
description: Create a color picker component with React and jSuites

* [React Color Picker](/docs/v4/color-picker)

React color picker
==================

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/colorpicker-0w4b7)

ColorPicker component
---------------------

```javascript
import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function ColorPicker({ options }) {
  const colorPickerRef = useRef(null);

  useEffect(() => {
    jSuites.color(colorPickerRef.current, options);
  }, [options]);

  return <input ref={colorPickerRef} />;
}
```

Component usage
---------------

```javascript
import { useState } from "react";

import ColorPicker from "./ColorPicker";

export default function App() {
  const [color, setColor] = useState("");

  const handleColorPickerChange = (element, color) => {
    setColor(color);
  };

  return (
    <>
      <h3>Color picker example:</h3>
      <ColorPicker
        options={{
          value: color,
          onchange: handleColorPickerChange,
          fullscreen: true
        }}
      />
    </>
  );
}
```
