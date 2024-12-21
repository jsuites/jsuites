title: React Calendar
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, inline javascript date picker, react
description: Create a calendar picker component with React and jSuites

* [React Calendar](/docs/v4/javascript-calendar)

# React Calendar

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-calendar-with-react-sbbq8)

## Calendar component

```jsx
import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";

export default function Calendar({ options }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    jSuites.calendar(calendarRef.current, options);
  }, [options]);

  return <input ref={calendarRef} />;
}
```

Component usage
---------------

```jsx
import { useState } from "react";

import Calendar from "./Calendar";

export default function App() {
  const [calendarValue, setCalendarValue] = useState("");

  const handleCalendarChange = (element, currentValue) => {
    setCalendarValue(currentValue);
  };

  return (
    <>
      <h3>Calendar example:</h3>
      <Calendar
        options={{
          value: calendarValue,
          onchange: handleCalendarChange,
          readonly: false,
          placeholder: "Choose a date"
        }}
      />
    </>
  );
}
```
