const jSuites = require('../dist/jsuites');

describe('picker', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('picker methods', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let picker = jSuites.picker(div, {
            data: ['Option1', 'Option2', 'Option3'],
            value: 3,
          })
        expect(document.body.innerHTML).toContain("Option1")
    });

    test('picker methods', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let picker = jSuites.picker(div, {
            data: ['Option1', 'Option2', 'Option3'],
            value: 3,
        })
        console.log(document.body.innerHTML)
        let classe = Array.from( document.querySelector(".jpicker").classList)
        console.log(classe)
        expect(classe).not.toContain("jpicker-focus")

        picker.open()
        classe = Array.from( document.querySelector(".jpicker").classList)
        expect(classe).toContain("jpicker-focus")

        picker.close()
        classe = Array.from( document.querySelector(".jpicker").classList)
        expect(classe).not.toContain("jpicker-focus")

        expect(picker.getValue()).toBe("3")
        picker.setValue(1)
        expect(picker.getValue()).toBe("1")
    });

    test('picker destroy removes classes and references', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        let picker = jSuites.picker(div, {
            data: ['Option1', 'Option2', 'Option3'],
            value: 0,
        });

        // Verify picker was created
        expect(div.classList.contains('jpicker')).toBe(true);
        expect(div.picker).toBe(picker);

        // Destroy
        picker.destroy();

        // Verify cleanup
        expect(div.classList.contains('jpicker')).toBe(false);
        expect(div.picker).toBeUndefined();
        expect(div.querySelector('.jpicker-header')).toBeNull();
        expect(div.querySelector('.jpicker-content')).toBeNull();
    });

    test('picker destroy after open/close works correctly', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        let picker = jSuites.picker(div, {
            data: ['Option1', 'Option2', 'Option3'],
            value: 0,
        });

        // Open and close
        picker.open();
        expect(div.classList.contains('jpicker-focus')).toBe(true);
        picker.close();
        expect(div.classList.contains('jpicker-focus')).toBe(false);

        // Destroy should work without errors
        expect(() => picker.destroy()).not.toThrow();
        expect(div.picker).toBeUndefined();
    });

    test('picker multiple create/destroy cycles', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');

        for (let i = 0; i < 10; i++) {
            let picker = jSuites.picker(div, {
                data: ['Option1', 'Option2', 'Option3'],
                value: 0,
            });

            expect(div.classList.contains('jpicker')).toBe(true);
            expect(div.picker).toBeDefined();

            picker.destroy();

            expect(div.classList.contains('jpicker')).toBe(false);
            expect(div.picker).toBeUndefined();
        }
    });

});