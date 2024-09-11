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
});
