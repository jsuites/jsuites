![The javascript web components](https://jsuites.net/templates/v3/img/icon.svg)

## jSuites - The definitive common javascript web components

New version!
---------

The most recent version Jsuites has been splited in two distributions, and there are two optional extensions.

jsuites.js - Complete version.
jsuites.basic.js - Only the necessary files for Jexcel.
jsuites.webcomponents.js - To use jsuites as webcomponents.

jsuites.layout.js - Extensions and helpers for layout. (Alpha version).
jsuites.mobile.js - Extensions to group the webApp components. (Alpha version).

The source code is now available per component. The documentation is still under improvements.

About
---------
jSuites is a collection of lightweight common required javascript web components. It is composed of fully responsive javascript vanilla plugins to help you bring the best user experience to your projects, independent of the platform.</p>

The first version includes several common javascript tools in various frontend applications. jSuites is fully and easily integrated with any framework and tools. The first collection brings the following plugins:

* Nice clean and responsive javascript calendar, date and time picker. This is integrated with jExcel and bring flexibility and responsiveness to your apps and web-based systems;
* Our multi-purpose dropdown aims to give the user the best experience picking one or more options from a list. With a simple directive, you can render that in different modes, such as select box, search bar, mobile picker or a simple list.
* The form tracker will give the chance to track changes from basic to highly dynamic forms in order to remember the user to save their form changes before leaving the page. This is basically the "Are you sure"? javascript plugin.
* A simple color picker
* A very straight forward responsive image thumb view
* A great responsive data timeline
* A simple modal, input mask javascript, mini HTMLeditor and some mobile common web components

Highlights
---------
jSuites brings the developer many advantages, such as:

* Make rich and user-friendly web interfaces and applications
* You can easily handle complicated data inputs in a way users are used to
* Improve your clients software experience
* Create rich CRUDS and beautiful UI
* Lean, fast and simple to use
* One code, multiple platform


### Basic demo

Create a multiple and autocomplete responsive dropdown.


```html
<html>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="dropdown1"></div>

<script>
jSuites.dropdown(document.getElementById('dropdown1'), {
    data:[
        'City of London',
        'City of Westminster',
        'Kensington and Chelsea',
        'Hammersmith and Fulham', // (...)
        ],
    autocomplete:true,
    multiple:true,
    width:'280px',
});
</script>
</html>
```
The same code can render in different ways, by directive type: default, picker or searchbar\
![Javascript dropdown](https://jsuites.net/templates/v3/img/dropdown.png)


Examples
---------

* [JavaScript image cropper](https://jsuites.net/v3/image-cropper)\
The jSuites.crop is a lightweight JavaScript plugin that allow users load, crop and apply filters to images.

* [Dropdown and autocomplete component](https://jsuites.net/v3/dropdown-and-autocomplete)\
Full examples on how to handle simple, advanced, autocomplete and conditional dropdowns.

* [Javascript calendar, date and datetime picker](https://jsuites.net/v3/javascript-calendar)\
A lightweight javascript calendar, date and datetime picker full responsive and easy integration.

* [Javascript tags plugin](https://jsuites.net/v3/javascript-tags)\
JavaScript tags and keywords managment plugin

* [Javascript tabs plugin](https://jsuites.net/v3/javascript-tabs)\
JavaScript tabs plugin

* [Javascript mask](https://jsuites.net/v3/javascript-mask)\
A simple javascript mask plugin

* [Javascript color picker plugin](https://jsuites.net/v3/color-picker)\
Javascript color picker plugin

* [Javascript contextmenu plugin](https://jsuites.net/v3/contextmenu)\
Vanilla javascript contextmenu plugin

* [Tracking the form changes](https://jsuites.net/v3/richform)\
Track changes in a online form, apply validations and manage ajax requests.

* [Javascript modal plugin](https://jsuites.net/v3/modal)\
Simple vanilla javascript modal plugin

* [JavaSript general toolbar](https://jsuites.net/v3/toolbar)\
Micro vanilla javascript toolbar plugin

* [Javascript mini HTML editor plugin with filter](https://jsuites.net/v3/text-editor)\
Simple vanilla javascript image slider plugin


## Official website
- [jSuites Official](https://jsuites.net/v3)

## Community
- [GitHub](https://github.com/jsuites/jsuites/issues)

## Copyright and license
jSuites is released under the [MIT license].

## Contact
contact@jsuites.net


