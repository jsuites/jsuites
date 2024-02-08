title: Javascript rich form quick reference
keywords: Javascript rich form plugin, HTML form, quick reference, documentation
description: Explorer the jsuites rich form plugin and its useful implementations, validation, tracking changes (Are you sure?) and data managament.

Javascript rich form
====================

The `jSuites.form` plugin brings three usuful implementations, validation, tracking changes (Are you sure?) and data managament.

Available Methods
-----------------

| Method | Description |
| --- | --- |
| load(); | Load data from a remote server to the form elements. |
| save(); | Save data from the form elements to the server. |
| reset(); | Reset the data from all elements in the form. |
| resetTracker(); | Start tracking again |
| isChanged(); | Check if the form is changed |
| setIgnore(boolean); | Enable or disable the tracking |

  
  

Initialiation properties
------------------------

| Property | Description |
| --- | --- |
| url: string | Remote data source for the form. |
| message: string | Message for the user. For security reasons the browser can show only a default message. |
| setIgnore(boolean); | Enable or disable the tracking |

  
  

Available events
----------------

| Event | Description |
| --- | --- |
| onload | As soon the form loads external data.  <br>(element: HTMLElement, data: JSON) => void |
| onbeforesave | Before any data is saved in the remote server. This can be useful to intercept any user data before sending to the server.  <br>(element: HTMLElement, currenData: JSON) => newData: JSON |
| onsave | After data is sent to the server.  <br>(element: HTMLElement, result: JSON) => void |
| onerror | When any error happens in the form.  <br>(element: HTMLElement, message: string) => void |

  
  

Form validations
----------------

The form validation would happen based a few tag properties add to each element of your form. The first is the `data-validation` which defines the validation would be performed and the `data-error` which provides the information for the user.

You can find a few native validations such as: `required`, `email`, `Length`. But you can add any extra validations.

[Click here to see an example using some custom validations](/docs/v4/rich-form/validations)
