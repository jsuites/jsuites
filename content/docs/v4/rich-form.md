title: Javascript rich form plugin
keywords: Javascript rich form plugin, HTML form, form validations, are you sure
description: The jsuites rich form plugin allow developers to create smart form validations, tracking changes on the form elements and simplify the data persistance to a remote server

JavaScript Form
===============

The `jSuites.form` enhances a basic HTML form bringing various useful features when dealing with HTML forms and its elements. The most useful features are the following:

1.  **Tracking any updates (Are you sure)?:** It alerts the user before leaving a page when he has unsaved changes in one form.
2.  **jSuites.validations:** Create basic and custom input validations using the element properties.
3.  **Data management:** It loads data from a remote server to the form elements, and post data for a remote server for persistance.
4.  **Events**: Intercept and update the submission, create rules and callbacks.
5.  **Upload**: Integrates with jSuites.files to help upload files to the backend.

![](img/js-rich-form.svg)

  

Features
--------

### Tracking the HTML form updates

Before the user leave a page with unsaved changes in a form. The javascript plugin creates a hash based on all form elements and its values. Before the user leaves the page, the tracker will recheck if there were changes in the hash. If the hash is different, the plugin will trigger an alert to the user because there were changes in the form, not saved yet.  
  
It has a very optimized algorithm that works even with dynamic elements and provides a few methods to help the developer to enrich their applications.  
  
  

### JavaScript Form validations

Control the form validations from the HTML elements.  
  

#### Example

```xml
<label>Name</label>
<input type='text' name='name' data-validation="required" data-error="The name is a required field">

<label>Email</label>
<input type='text' name='name' data-validation="email" data-error="It is required a valid email address">
```

  
[More information about the form validations](/docs/v4/rich-form/validations)
