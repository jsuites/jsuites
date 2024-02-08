title: React image cropper
keywords: JavaScript image cropper, crop, react image cropper
description: React image cropper and online image editor.

* [JavaScript Cropper](/docs/v4/image-cropper)

React component
===============

[React cropper component working example](https://codesandbox.io/s/cropper-mxrhl)

Installation
------------

```bash
npm i --save @jsuites/react-cropper
```

### Example

```jsx
import { useState } from "react";

import Cropper from "@jsuites/react-cropper";

export default function App() {
  const [url, setUrl] = useState("");

  return (
    <Cropper
      imageUrl={url}
      setImage={setUrl}
      options={{ allowResize: true }}
      style={{ height: "400px", width: "400px" }}
    />
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

### Properties

| Properties | Description |
| --- | --- |
| imageUrl: string | Current image URL. |
| setImageUrl: function(string) | Method that updates the state of imageUrl. CORS must be considered. |
| options: Object | Set of cropper options specified further on. |
| style: Object | Style applied to the component. |

  

#### Options

| Properties | Description |
| --- | --- |
| crop: [number, number] | Initial size of the cropper handler. NOTE: On small devices, this is not used. |
| remoteParser: string | URL of a remote backend image parser to workaround CORS limitations. |
| allowResize: boolean | Defines whether the size of the image cropping element can be reset by the user. |
| text: object | { extensionNotAllowed: '' } |
