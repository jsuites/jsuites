const jSuites = require('../dist/jsuites');

describe('dropdown', () => {
    test('dropdown instance', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')

        let cm = jSuites.dropdown(div, {
            data: [
                'City of London',
                'City of Westminster',
                'Kensington and Chelsea',
                'Hammersmith and Fulham',
            ]
        })

        expect(document.body.innerHTML).toContain('City of London')
        expect(document.body.innerHTML).toContain('City of Westminster')
        expect(document.body.innerHTML).toContain('Kensington and Chelsea')
        expect(document.body.innerHTML).toContain('Hammersmith and Fulham')
    });

    test('dropdown set value', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let value = "";

        let dd = jSuites.dropdown(div, {
            data: [
                'City of London',
                'City of Westminster',
                'Kensington and Chelsea',
                'Hammersmith and Fulham',
            ],
            onchange: function (element, index, oldValue, newValue, oldLabel, newLabel) {
                value = newValue
            }
        })

        expect(dd.getValue()).toBe('')
        expect(value).toBe('')

        dd.setValue('City of London')

        expect(dd.getValue()).toBe('City of London')
        expect(value).toBe('City of London')

        dd.reset()

        expect(dd.getValue()).toBe('')
        expect(value).toBe('')
    })

    test('dropdown select item by index', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')

        let dd = jSuites.dropdown(div, {
            data: [
                'City of London',
                'City of Westminster',
                'Kensington and Chelsea',
                'Hammersmith and Fulham',
            ],
        })

        dd.selectIndex(2)

        expect(dd.getValue()).toBe('Kensington and Chelsea')
        

        expect(dd.getPosition('City of London')).toBe(0)
        expect(dd.getPosition('City of Westminster')).toBe(1)
        expect(dd.getPosition('Kensington and Chelsea')).toBe(2)
        expect(dd.getPosition('Hammersmith and Fulham')).toBe(3)
    })
});