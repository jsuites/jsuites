const jSuites = require('../dist/jsuites');

describe('color', () => {
    test('color instance', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let changed = false
        let isopen = false
        let color = jSuites.color(div, {
            value: '#000001', onchange: function () {
                changed = true;
            }, onopen: function () {
                isopen = true;
            }
        })
        expect(color.getValue()).toBe('#000001')
        color.setValue("#000020")
        expect(color.getValue()).toBe('#000020')
        expect(changed).toBe(true)
        expect(isopen).toBe(false)
        color.open()
        expect(isopen).toBe(true)

    });
});
