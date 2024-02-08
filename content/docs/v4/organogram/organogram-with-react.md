title: React organogram
keywords: Javascript, organogram, organogram plugin, JS organogram, examples, example, react, react integration
description: Integrate organogram plugin with react

* [React Organogram](/docs/v4/organogram)

React organogram
================

React organogram [working example](https://codesandbox.io/s/organogram-x7yv1) on codesandbox.

  

Organogram component
--------------------

```jsx
import { useRef, useEffect } from "react";
import organogram from "@jsuites/organogram";

import "@jsuites/organogram/organogram.css";

export default function Organogram({ options }) {
  const organogramRef = useRef(null);

  const jsuitesOrganogram = useRef(null);

  useEffect(() => {
    organogram(organogramRef.current, options);
  }, [options]);

  return <div ref={organogramRef} />;
}
```

Component usage
---------------

```jsx
import Organogram from "./Organogram";

export default function App() {
  return (
    <>
      <h3>Organogram example:</h3>
      <Organogram
        options={{
          width: 600,
          height: 300,
          zoom: 0.2,
          data: [
            {
              id: 1,
              name: "Jorge",
              role: "CEO",
              parent: 0,
              color: "#90EE90"
            },
            {
              id: 2,
              name: "Antonio",
              role: "Vice president",
              parent: 1,
              color: "#90EE90"
            },
            {
              id: 3,
              name: "Manoel",
              role: "Production manager",
              parent: 1,
              color: "#D3D3D3"
            },
            {
              id: 4,
              name: "Pedro",
              role: "Intern",
              parent: 3,
              color: "#90EE90"
            },
            {
              id: 5,
              name: "Carlos",
              role: "Intern",
              parent: 3,
              color: "#90EE90"
            },
            {
              id: 6,
              name: "Marcos",
              role: "Marketing manager",
              parent: 2,
              color: "#D3D3D3"
            },
            {
              id: 7,
              name: "Ana",
              role: "Sales manager",
              parent: 2,
              color: "#90EE90"
            },
            {
              id: 8,
              name: "Nicolly",
              role: "Operations manager",
              parent: 2,
              color: "#D3D3D3"
            },
            {
              id: 9,
              name: "Paulo",
              role: "Sales assistant",
              parent: 7,
              color: "#90EE90"
            },
            {
              id: 10,
              name: "Iris",
              role: "Sales assistant",
              parent: 7,
              color: "#90EE90"
            }
          ]
        }}
      />
    </>
  );
}
```

Note: It is necessary to maintain a link in index.html or some other method to use material design icons, such as the following link:

```xml
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
```
