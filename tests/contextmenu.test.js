const jSuites = require('../dist/jsuites');

describe('contextmenu', () => {
    test('contextmenu instance', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')

        let cm = jSuites.contextmenu(div, {
            items: [
                {
                    title: 'Select All',
                    shortcut: 'Ctrl + A',
                    tooltip: 'Method to Select All Text',
                },
            ],
        })

        const contextmenuEvent = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            button: 2,
            clientX: 100,
            clientY: 100
        });

        div.dispatchEvent(contextmenuEvent);

        expect(document.body.innerHTML).toContain('Select All')
        expect(document.body.innerHTML).toContain('Ctrl + A')
        expect(document.body.innerHTML).toContain('Method to Select All Text')
    });

    test.skip('contextmenu onclick', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let Clicou = false;
        let Copiou = false;
        let cm = jSuites.contextmenu(div, {
            items: [
                {
                    title: 'Copy',
                    shortcut: 'Ctrl + C',
                    onclick: function () {
                        Copiou = true
                    },
                    tooltip: 'Method to copy the text',
                },
            ],
            onclick: function () {
                Clicou = true
            }
        })
        expect(Clicou).toBe(false)
        expect(Copiou).toBe(false)
        let divs = document.querySelectorAll("div")

        divs[2].click()
        expect(Clicou).toBe(true)

        let a = document.querySelectorAll("a")[2]

        a.click()

        expect(Copiou).toBe(true)
    });
});