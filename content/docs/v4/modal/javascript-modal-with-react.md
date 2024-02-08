title: React modal
keywords: Javascript modal plugin, popup modal, react
description: Create a modal component with react and jSuites

React modal
===========

[Modal working example](https://codesandbox.io/s/modal-1pjmo?file=/src/Modal.js)

Modal component
---------------

```jsx
import React, { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "../node_modules/jsuites/dist/jsuites.css";
import "../node_modules/jsuites/dist/jsuites.layout.css";

export default function Modal({ children, options, ...properties }) {
  const modalRef = useRef(null);

  const jsuitesModalRef = useRef(null);

  useEffect(() => {
    jsuitesModalRef.current = jSuites.modal(modalRef.current, options);

    modalRef.current.onclick = () => {
      jsuitesModalRef.current.open();
    };

    const localModalRef = modalRef.current;

    return () => {
      const content = localModalRef.children[0].children[0].children;

      localModalRef.innerHTML = "";
      localModalRef.appendChild(content[0]);
    };
  }, [options, children]);

  return (
    <div ref={modalRef} {...properties}>
      {children}
    </div>
  );
}
```

Component usage
---------------

```jsx
import React from "react";
import "./styles.css";

import Modal from "./Modal";

export default function App() {
  return (
    <Modal options={{ title: "Example" }}>
      <div>
        <div>This is a modal</div>
        <br />
        <div>There must be a main div</div>
        <br />
        <div>
          In this example, the main div is the one that encompasses all divs
          with text
        </div>
      </div>
    </Modal>
  );
}
```
