title: React Tags & Keywords Plugin
keywords: Javascript, tagging, javascript tags, keywords, examples, react
description: Create a tags component with React and jSuites

* [React tags](/docs/v4/javascript-tags)

React tags
==========

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-tags-with-react-85t0b)

Tags component
--------------

```jsx
import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function Tags({ options }) {
  const tagsRef = useRef(null);

  useEffect(() => {
    jSuites.tags(tagsRef.current, options);
  }, [options]);

  return <div style={{ width: "400px" }} ref={tagsRef} />;
}
```

Component usage
---------------

```jsx
import { useState } from "react";

import Tags from "./Tags";

export default function App() {
  const [tagsValue, setTagsValue] = useState("");

  const handleTagsChange = (element, instance, value) => {
    setTagsValue(value);
  };

  return (
    <>
      <h3>Tags example</h3>
      <Tags
        options={{
          value: tagsValue,
          onchange: handleTagsChange,
          placeholder: "Type here:"
        }}
      />
    </>
  );
}
```
