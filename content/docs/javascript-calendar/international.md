title: JavaScript Calendar: International Settings
keywords: JavaScript, Calendar, Date, DateTime, Date Picker, DateTime Picker, Examples, International Options, Customizations
description: Tailor your JavaScript calendar with customizable texts and international settings, ensuring a localized experience for global audiences.
canonical: https://jsuites.net/docs/javascript-calendar/international

# International Calendar Customization

Customize your JavaScript calendar by adjusting text and setting the week's starting day to match international preferences.
  
[Explore this customization on the JavaScript Calendar in action](https://jsfiddle.net/spreadsheet/s6bpwxef/)  
  

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input id='calendar' />

<script>
// Create a calendar instance
jSuites.calendar(document.getElementById('calendar'), {
    // Define the months in portuguese
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    // Define the months in portuguese
    monthsFull: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
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
```jsx
import { Calendar } from 'jsuites/react'
import { useRef } from 'react'
import 'jsuites/dist/jsuites.css'


function App() {
  const calendar = useRef(null);
  return (
    <div className="App">
      <Calendar ref={calendar} months={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} monthsFull={[
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ]} weekdays={[
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
      ]}
        textDone={'Feito'}
        textReset={'Limpar'}
        textUpdate={'Atualizar'}
        startingDay={1}
        format={'YYYY-Mon-DD'} />
    </div>
  );
}

export default App;
```
```vue
<template>
    <Calendar ref="calendar" :months="months" :monthsFull="monthsFull" :weekdays="weekdays" textDone="Feito"
        textReset="Limpar" textUpdate="Atualizar" startingDay="1" format="YYYY-Mon-DD" />
</template>

<script>
import { Calendar } from "jsuites/vue";
import "jsuites/dist/jsuites.css"

export default {
    name: 'App',
    components: {
        Calendar
    },
    data() {
        return {
            months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            monthsFull: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ],
            weekdays: [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado'
            ]
        }
    }
}
</script>
```


## More examples

Explore additional use cases for the jSuites JavaScript Calendar plugin:

* [Year and Month Selection](/docs/javascript-calendar/year-month)
* [JavaScript Calendar Events](/docs/javascript-calendar/events)
* [Calendar Date Range Validations](/docs/javascript-calendar/valid-range)
* [International Settings](/docs/javascript-calendar/international)
* [Responsive JavaScript Calendar](/docs/javascript-calendar/mobile)
