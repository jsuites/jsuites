![The javascript web components](https://bossanova.uk/templates/jsuites/img/logo.png)

## jSuites - The definitive common javascript web components

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
<script src="https://bossanova.uk/jsuites/v2/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jsuites/v2/jsuites.css" type="text/css" />

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
![Javascript dropdown](https://bossanova.uk/templates/jsuites/img/dropdown.png)


Examples
---------

* [Dropdown and autocomplete component](https://bossanova.uk/jsuites/dropdown-and-autocomplete)\
Full examples on how to handle simple, advanced, autocomplete and conditional dropdowns.

* [Javascript calendar, date and datetime picker](https://bossanova.uk/jsuites/javascript-calendar)\
A lightweight javascript calendar, date and datetime picker full responsive and easy integration.

* [Javascript mask](https://bossanova.uk/jsuites/javascript-mask)\
A simple javascript mask plugin

* [Javascript color picker plugin](https://bossanova.uk/jsuites/color-picker)\
Vanilla javascript colorpicker plugin

* [Javascript contextmenu plugin](https://bossanova.uk/jsuites/contextmenu)\
Vanilla javascript contextmenu plugin

* [Javascript image slider plugin](https://bossanova.uk/jsuites/image-slider)\
Simple vanilla javascript image slider plugin

* [Javascript mini HTML editor plugin with filter](https://bossanova.uk/jsuites/text-editor)\
Simple vanilla javascript image slider plugin

* [Tracking the form changes](https://bossanova.uk/jsuites/tracking-for-form-changes)\
Alert the user for unsaved changes in a form before leave any page plugin.

* [Javascript modal plugin](https://bossanova.uk/jsuites/modal)\
Simple vanilla javascript modal plugin


## Official website
- [jSuites Official](https://bossanova.uk/jsuites)

## Community
- [GitHub](https://github.com/paulhodel/jsuites/issues)

## Copyright and license
jSuites is released under the [MIT license]. Copyrights belong to Paul Hodel <paul.hodel@gmail.com>

## Other resources

- [jExcel CE Official](https://bossanova.uk/jexcel/v3)
- [jExcel Pro Official](https://jexcel.net/v3)
- [Banda Base](https://base.mus.br)
