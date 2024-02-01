const jSuites = require('../dist/jsuites');

describe('picker', () => {
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

});