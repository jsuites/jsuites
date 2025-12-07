const jSuites = require('../dist/jsuites');

describe('Calendar', () => {
    test('Calendar instance', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let calendar = jSuites.calendar(div, { value: '1999-09-20 00:00:00' })

        expect(calendar.getValue()).toBe('1999-09-20 00:00:00')

        calendar.setValue('2020-06-05 00:00:00')
        expect(calendar.getValue()).toBe('2020-06-05 00:00:00')

        calendar.next()
        expect(calendar.getValue()).toBe('2020-07-05 00:00:00')

        calendar.prev()
        expect(calendar.getValue()).toBe('2020-06-05 00:00:00')

        calendar.reset()
        expect(calendar.getValue()).toBe('')
    });

    /*test('Calendar is24HourFormat defaults to true', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let calendar = jSuites.calendar(div, {
            time: true,
        })

        expect(div.querySelector('.jcalendar-time').children.length).toEqual(2)
        expect(div.querySelector('.jcalendar-time').children[0].children.length).toEqual(24);
        expect(div.querySelector('.jcalendar-time').children[1].children.length).toEqual(60);
    });

    test('Calendar is24HourFormat true', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let calendar = jSuites.calendar(div, {
            time: true,
            is24HourFormat: true,
        })

        expect(div.querySelector('.jcalendar-time').children.length).toEqual(2)
        expect(div.querySelector('.jcalendar-time').children[0].children.length).toEqual(24);
        expect(div.querySelector('.jcalendar-time').children[1].children.length).toEqual(60);
    });

    test('Calendar is24HourFormat false', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let calendar = jSuites.calendar(div, {
            time: true,
            is24HourFormat: false,
        })

        expect(div.querySelector('.jcalendar-time').children.length).toEqual(3)
        expect(div.querySelector('.jcalendar-time').children[0].children.length).toEqual(12);
        expect(div.querySelector('.jcalendar-time').children[1].children.length).toEqual(60);
        expect(div.querySelector('.jcalendar-time').children[2].children.length).toEqual(2);
        expect(div.querySelector('.jcalendar-time').children[2].innerHTML).toContain('AM');
        expect(div.querySelector('.jcalendar-time').children[2].innerHTML).toContain('PM');
    });*/

    test('Calendar helpers', () => {
        expect(jSuites.calendar.dateToNum('2023-03-15 00:00:00')).toBe(45000)
        expect(jSuites.calendar.numToDate(45000)).toBe('2023-03-15 00:00:00')
        expect(jSuites.calendar.extractDateFromString('20-09-1999', 'dd-mm-yyyy')).toBe('1999-09-20 00:00:00')
    });

    test('Calendar with custom month names (Portuguese)', () => {
        document.body.innerHTML = '<input id="calendar" />';
        let input = document.getElementById('calendar');

        let calendar = jSuites.calendar(input, {
            format: 'DD/MMM/YYYY',
            value: '2023-12-15',
            months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        });

        // Check that December is formatted as "Dez" (Portuguese) not "Dec" (English)
        expect(input.value).toContain('Dez');
        expect(input.value).not.toContain('Dec');

        // Test another month
        calendar.setValue('2023-02-15');
        expect(input.value).toContain('Fev');
        expect(input.value).not.toContain('Feb');
    });

    test('Calendar with custom weekday names', () => {
        document.body.innerHTML = '<input id="calendar" />';
        let input = document.getElementById('calendar');

        let calendar = jSuites.calendar(input, {
            format: 'DDDD, DD/MM/YYYY',
            value: '2023-12-25', // Monday
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        });

        // December 25, 2023 is a Monday, should show as "Segunda"
        expect(input.value).toContain('Segunda');
        expect(input.value).not.toContain('Monday');
    });

    test('Calendar manual input with YYYY-MM-DD format should not trigger early', () => {
        document.body.innerHTML = '<input id="calendar" />';
        let input = document.getElementById('calendar');

        let calendar = jSuites.calendar(input, {
            format: 'YYYY-MM-DD',
            readonly: false
        });

        // Simulate typing "2022" - should NOT set a date yet (incomplete input)
        input.value = '2022';
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

        // The calendar should not have set a value for incomplete input
        // getValue() should return empty or the incomplete string, not a parsed date
        const value = calendar.getValue();
        // If it incorrectly parsed "2022" as a date, it would return something like "2022-01-01"
        // We expect it to be empty or incomplete
        expect(value).not.toMatch(/^\d{4}-\d{2}-\d{2}/);

        // Now type the complete date
        input.value = '2022-12-25';
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

        // Now it should parse correctly
        expect(calendar.getValue()).toBe('2022-12-25 00:00:00');
    });

    test('Calendar manual input with DD/MM/YYYY format should not trigger early', () => {
        document.body.innerHTML = '<input id="calendar" />';
        let input = document.getElementById('calendar');

        let calendar = jSuites.calendar(input, {
            format: 'DD/MM/YYYY',
            readonly: false
        });

        // Simulate typing "25/12" - incomplete input
        input.value = '25/12';
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

        // Should not parse incomplete date
        const value = calendar.getValue();
        expect(value).not.toMatch(/^\d{4}-\d{2}-\d{2}/);

        // Complete date
        input.value = '25/12/2022';
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

        expect(calendar.getValue()).toBe('2022-12-25 00:00:00');
    });

    // Note: Calendar positioning with controls=false cannot be properly tested in jsdom
    // due to lack of real layout/positioning support. Manual testing in browser required.
    // See public/index.html for visual test.
});
