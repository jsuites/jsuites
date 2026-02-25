const jSuites = require('../dist/jsuites');

describe('color', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

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

    test('color destroy removes container and references', () => {
        document.body.innerHTML = '<input id="myInput" />';
        let input = document.getElementById('myInput');
        let color = jSuites.color(input, {
            value: '#FF0000'
        });

        // Verify color was created
        expect(input.color).toBe(color);
        expect(input.classList.contains('jcolor-input')).toBe(true);
        expect(document.querySelector('.jcolor')).not.toBeNull();

        // Destroy
        color.destroy();

        // Verify cleanup
        expect(input.color).toBeUndefined();
        expect(input.classList.contains('jcolor-input')).toBe(false);
        expect(document.querySelector('.jcolor')).toBeNull();
    });

    test('color destroy after open works correctly', () => {
        document.body.innerHTML = '<input id="myInput" />';
        let input = document.getElementById('myInput');
        let color = jSuites.color(input, {
            value: '#FF0000'
        });

        // Open
        color.open();
        expect(document.querySelector('.jcolor-focus')).not.toBeNull();

        // Destroy should close and cleanup
        expect(() => color.destroy()).not.toThrow();
        expect(document.querySelector('.jcolor')).toBeNull();
        expect(input.color).toBeUndefined();
    });

    test('color multiple create/destroy cycles', () => {
        document.body.innerHTML = '<input id="myInput" />';
        let input = document.getElementById('myInput');

        for (let i = 0; i < 10; i++) {
            let color = jSuites.color(input, {
                value: '#FF0000'
            });

            expect(input.color).toBeDefined();
            expect(document.querySelector('.jcolor')).not.toBeNull();

            color.destroy();

            expect(input.color).toBeUndefined();
            expect(document.querySelector('.jcolor')).toBeNull();
        }
    });
});
