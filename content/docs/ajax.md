title: JavaScript Ajax Component.
keywords: Javascript ajax, ajax requests
description: The JavaScript Ajax Component streamlines the management of Ajax requests. It facilitates the creation of request queues and the registration of events, optimizing the handling of asynchronous server communication in web applications.

Ajax Requests
=============

The jSuites.ajax component is an abstraction layer that efficiently manages JavaScript AJAX requests. This vanilla JavaScript implementation boasts several key features, making it a robust choice for handling AJAX interactions.

- **Familiar Syntax**: The library's syntax is intentionally designed to be similar to other popular libraries, easing the learning curve for developers.
- **No External Dependencies**: It operates independently without additional libraries or frameworks, ensuring a lightweight and streamlined integration.
- **Queue Management**: Offers sophisticated control over AJAX requests. Users can execute requests in parallel or manage dependent requests in a specific sequence, enhancing the flexibility in handling multiple server interactions.
- **OnComplete Event Handling**: Facilitates handling multiple AJAX requests by allowing developers to define actions upon completing these requests. This feature is handy when subsequent processes depend on completing prior requests.
- **Data Submission Customization**: The `onbeforesend` callback allows developers to modify or format the data before it is sent, offering greater control over the submission process.


### Basic request example

{.ignore-execution}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script>
jSuites.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: { data: JSON.stringify(data) },
    beforeSend: function(xhr) {
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    },
    success: function(result) {
        // Result
        jSuites.notification(result);
    },
    error: function() {
        alert('disconected');
    }
});
</script>
</html>
```
```jsx
import jSuites from "jsuites"

jSuites.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: { data: JSON.stringify(data) },
    beforeSend: function(xhr) {
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    },
    success: function(result) {
        // Result
        jSuites.notification(result);
    },
    error: function() {
        alert('disconected');
    }
});
```
```vue
<script>
import jSuites from "jsuites"

jSuites.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: { data: JSON.stringify(data) },
    beforeSend: function(xhr) {
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    },
    success: function(result) {
        // Result
        jSuites.notification(result);
    },
    error: function() {
        alert('disconected');
    }
});
</script>
```

## Features

### BeforeSend Event

The jSuites.ajax component provides a robust feature as a `beforesend` event. This event allows developers to intercept and modify the AJAX request before sending it to the server. An everyday use case for this functionality is adding an authorization bearer token to the request, which is essential for handling secure communications and maintaining user authentication in web applications.

Here's how you can utilize the `beforesend` event to add an authorization bearer:

{.ignore-execution}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script>
jSuites.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: { data: JSON.stringify(data) },
    beforeSend: function(xhr) {
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    },
    success: function(result) {
        // Result
        jSuites.notification(result);
    },
    error: function() {
        alert('disconected');
    }
});
</script>
</html>
```
```jsx
import jSuites from "jsuites"

jSuites.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: { data: JSON.stringify(data) },
    beforeSend: function(xhr) {
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    },
    success: function(result) {
        // Result
        jSuites.notification(result);
    },
    error: function() {
        alert('disconected');
    }
});
```
```vue
<script>
import jSuites from "jsuites"

jSuites.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: { data: JSON.stringify(data) },
    beforeSend: function(xhr) {
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    },
    success: function(result) {
        // Result
        jSuites.notification(result);
    },
    error: function() {
        alert('disconected');
    }
});
</script>
```

### Request Queue

The `jSuites.ajax` component introduces a queue management system for handling AJAX requests. By setting the queue property to true, the component ensures that a new AJAX request is initiated after completing the previous one. This sequential handling of requests is beneficial in scenarios where the execution order is crucial, and each request's response might impact the subsequent requests.

#### Functionality:

- **Sequential Processing:** When the queue property is enabled, AJAX requests are handled one after the other in the order they were initiated. This sequential processing prevents the overlapping of requests, which is essential in situations where each request depends on the response of the previous one.
- **Avoiding Race Conditions**: By ensuring that only one request is processed at a time, the jSuites.ajax queue system effectively prevents race conditions. That is vital for maintaining data integrity, especially when dealing with CRUD operations in a database.
- **Simplified Error Handling**: With queued requests, error handling becomes more manageable as the response to each request can be dealt with individually before moving on to the next.

<br>

![Ajax request queue](img/ajax-waterfall.png)

{.ignore-execution}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script>
let url = 'your-endpoint';
let data = {};
for (let i = 0; i < 10; i++) {
    jSuites.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        queue: true,
        data: { data: JSON.stringify(data) },
        success: function(result) {
        }
    });
}
</script>
</html>
```
```jsx
import jSuites from "jsuites"

let url = 'your-endpoint';
let data = {};
for (let i = 0; i < 10; i++) {
    jSuites.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        queue: true,
        data: { data: JSON.stringify(data) },
        success: function(result) {
        }
    });
}
```
```vue
<script>
import jSuites from "jsuites"

let url = 'your-endpoint';
let data = {};
for (let i = 0; i < 10; i++) {
    jSuites.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        queue: true,
        data: { data: JSON.stringify(data) },
        success: function(result) {
        }
    });
}
</script>
```


### Multiple Requests with OnComplete

This example demonstrates executing a series of AJAX POST requests using the `juices.ajax` method and triggering a single event upon completing all these requests. This technique is highly beneficial in scenarios where a batch of asynchronous operations and a collective response are needed after all operations have concluded.

{.ignore-execution}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<script>
let url = '...'
let requests = [];
for (let i = 0; i < 10; i++) {
    requests.push({
        url: url,
        method: 'POST',
        dataType: 'json',
        success: function() {
        }
    });
}

jSuites.ajax(requests, function(result) {
    // All requests have been completed
    jSuites.notification(result);
});
</script>
</html>
```
```jsx
import jSuites from "jsuites"

let url = '...'
let requests = [];
for (let i = 0; i < 10; i++) {
    requests.push({
        url: url,
        method: 'POST',
        dataType: 'json',
        success: function() {
        }
    });
}

jSuites.ajax(requests, function(result) {
    // All requests have been completed
    jSuites.notification(result);
});
```
```vue
<script>
import jSuites from "jsuites"

let url = '...'
let requests = [];
for (let i = 0; i < 10; i++) {
    requests.push({
        url: url,
        method: 'POST',
        dataType: 'json',
        success: function() {
        }
    });
}

jSuites.ajax(requests, function(result) {
    // All requests have been completed
    jSuites.notification(result);
});
</script>
```

