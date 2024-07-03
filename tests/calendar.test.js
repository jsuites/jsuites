const jSuites = require('../dist/jsuites');

describe('Calendar', () => {
    test('Calendar instance', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let calendar = jSuites.calendar(div, { value: '1999-09-20 00:00:00' })

        expect(calendar.getValue()).toBe('1999-09-20 00:00:00')

        calendar.setValue('2020-06-05 00:00:00')
        expect(calendar.getValue()).toBe('2020-06-05 00:00:00')

        // Internal value
        calendar.next()
        expect(calendar.getValue(true)).toBe('2020-07-05 00:00:00')

        calendar.prev()
        expect(calendar.getValue(true)).toBe('2020-06-05 00:00:00')

        calendar.reset()
        expect(calendar.getValue()).toBe('')
    });

    test('Calendar helpers', () => {
        expect(jSuites.calendar.dateToNum('2023-03-15 00:00:00')).toBe(45000)
        expect(jSuites.calendar.numToDate(45000)).toBe('2023-03-15 00:00:00')
        expect(jSuites.calendar.extractDateFromString('20-09-1999', 'dd-mm-yyyy')).toBe('1999-09-20 00:00:00')
    });
});
