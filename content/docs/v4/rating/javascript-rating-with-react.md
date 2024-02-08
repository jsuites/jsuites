title: React Rating
keywords: Javascript, rating, five star rating plugin, react
description: Create a javascript rating component with React and jSuites

React Rating
============

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-rating-with-react-xfdmu)

Rating component
----------------

```jsx
import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function Rating({ options }) {
  const ratingRef = useRef(null);

  useEffect(() => {
    jSuites.rating(ratingRef.current, options);
  }, [options]);

  return <div ref={ratingRef} />;
}
``` 

Component usage
---------------

```jsx
import { useState } from "react";

import Rating from "./Rating";

export default function App() {
  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (element, value) => {
    setRatingValue(parseInt(value, 10));
  };

  return (
    <>
      <h3>Rating example</h3>
      <Rating
        options={{
          value: ratingValue,
          onchange: handleRatingChange,
          number: 4
        }}
      />
    </>
  );
}
```
