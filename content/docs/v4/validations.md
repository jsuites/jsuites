title: JavaScript Element Validations with Jsuites v4
keywords: Javascript rich form plugin, HTML form, validations on a HTML form.
description: This plugin brings several pre-coded validations that can be re-used across different applications.

Data validations
================

Quick reference
---------------

Consider the following example:

Only numbers between 5 and 50

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id="example-input"/>

<script>
var validationParameters = {
    constraint: 'between',
    reference: [5, 50]
}

var exampleInput = document.getElementById('example-input');
exampleInput.addEventListener('input', function() {
    var validationResult = jSuites.validations.number(exampleInput.value, validationParameters);

    exampleInput.style.color = validationResult ? '#64DD17' : '#FF1744';
});
</script>
</html>
```
  

General explanation
-------------------

For basic use of validators, the value to be tested must be passed as the first argument. Depending on the validator, it is also allowed to pass an object with a constraint property, which represents a comparison that must be done by the validator. Another possible property for the second argument is the reference, which serves as a basis for comparisons, when used. These last two properties are better explained in the documentation for validators and constraints.

  

Methods
-------

| Method                                        | Description                                                                                                                                                                                     |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| jSuites.validations.number(value, options);   | Check if the value is a number.                                                                                                                                                                 |
| jSuites.validations.date(value, options);     | Check if the value is a date.                                                                                                                                                                   |
| jSuites.validations.text(value, options);     | Check if the value is a text.                                                                                                                                                                   |
| jSuites.validations.itemList(value, options); | Check if the value is part of the list. This method does not use any constraint and in its reference property, an array with the allowed values must be passed.                                 |
| jSuites.validations(value, options);          | The name of one of the previous functions must be passed in options as the 'type' property. The function with that name will be called with all arguments passed to the 'validations' function. |

  
  

Constraints
-----------

| Constraint  | Allowed methods | Description                                                                       |
|-------------|-----------------|-----------------------------------------------------------------------------------|
| =           | date            | number                                                                            | text | The validator also checks if the value is equal to the reference value. |
| >           | date            | number                                                                            | The validator also checks if the value is greater than the reference value. |
| >=          | date            | number                                                                            | The validator also checks if the value is greater than or equal to the reference value. |
| <           | date            | number                                                                            | The validator also checks if the value is less than the reference value. |
| <=          | date            | number                                                                            | The validator also checks if the value is less than or equal to the reference value. |
| between     | date            | number                                                                            | The validator also checks whether the value is between the two reference values. In this case the reference property must be a two-position array. |
| out         | date            | number                                                                            | The validator also checks that the value is not between the two reference values. In this case the reference property must be a two-position array. |
| contains    | text            | The validator also checks if the reference value is present within the value.     |
| not contain | text            | The validator also checks if the reference value is not present within the value. |
| email       | text            | The validator also checks if the value is a valid email.                          |

  
  

Examples
--------

### Using the number validator

```javascript
// Just check if it's a number
jSuites.validations.number('10'); // Returns true

// Check if it is a number greater than 27
jSuites.validations.number(5, { // Returns false
    constraint: '>',
    reference: 27
});

// Check if the number is not between 11 and 40
jSuites.validations.number(9, { // Returns true
    constraint: 'not between',
    reference: [11, 40]
});

// Using the date validator

// Just check if it's a date
jSuites.validations.date('02-14-2000'); // Returns true

// check if it is a date before 01-01-2000
jSuites.validations.date('01-01-2000', { // Returns false
    constraint: '<',
    reference: '01-01-2000'
});

// Check if the date is between 01-01-2010 and 12-31-2020
jSuites.validations.date('07-18-2017', { // Returns true
    constraint: 'between',
    reference: ['01-01-2010', '12-31-2020']
});

// Using the text validator

// Just check if it's a text
jSuites.validations.text('it is a text'); // Returns true

// Check if the text contains another text
jSuites.validations.text('It contains?', { // Returns true
    constraint: 'contains',
    reference: 'It contains'
});

// Check if the text is a valid url
jSuites.validations.text('https://jsuites.net', { // Returns true
    constraint: 'url',
});

// Using the item list validator

// Check if the item is on the list
jSuites.validations.itemList('8', [1, 2, 4, 8]); // Returns true

// Using the general validator

// Check if the number is not between 11 and 40
jSuites.validations(9, { // Returns true
    constraint: 'not between',
    reference: [11, 40],
    type: 'number'
});

var validationParameters = { constraint: 'between', reference: [5, 50] } var exampleInput = document.getElementById('example-input'); exampleInput.addEventListener('input', function() { var validationResult = jSuites.validations.number(exampleInput.value, validationParameters); exampleInput.style.color = validationResult ? '#64DD17' : '#FF1744'; });
```
