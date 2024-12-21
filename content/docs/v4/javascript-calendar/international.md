title: Javascript calendar international options
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, international options, customizations
description: Customize the javascript calendar texts and international options.
canonical: https://jsuites.net/docs/v4/javascript-calendar/international

{.white}
> A new version of the **JavaScript Calendar** international settings page is available here.
> <br><br>
> [International Settings on v5](/docs/javascript-calendar/international){.button .main target="_top"}

{.breadcrumb}
- [JavaScript Calendar](/docs/v4/javascript-calendar)
- Examples


# International Settings

Customize the text and the starting day in the JavasScript calendar
 
  
[See this example on jsfiddle](https://jsfiddle.net/spreadsheet/s6bpwxef/)  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
// Create a calendar instance
jSuites.calendar(document.getElementById('calendar'), {
    // Define the months in portuguese
    months: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    // Define the months in portuguese
    monthsFull: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'April',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    // Define the weekdays
    weekdays: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
    ],
    // Labels
    textDone: 'Feito',
    textReset: 'Limpar',
    textUpdate: 'Atualizar',
    // Weekday to start - Starts on Monday
    startingDay: 1,
    // Format
    format: 'YYYY-Mon-DD',
});
</script>
</html>
```
