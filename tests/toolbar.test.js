const jSuites = require('../dist/jsuites');

describe('toolbar', () => {
    test('toolbar content', () => {
        document.body.innerHTML = `<div id="toolbar"></div>`;
        let div = document.getElementById('toolbar')

        jSuites.toolbar(div, {
            container: true,
            items:[{
                type: 'icon',
                content: 'undo',
                onclick: function() {
                    console.log('undo action');
                }
            },
            {
                type: 'icon',
                content: 'redo',
                onclick: function() {
                    console.log('redo action');
                }
            }]
        })

        expect(document.body.innerHTML).toContain('undo')
        expect(document.body.innerHTML).toContain('redo')
    });


    test('toolbar actions', () => {
        document.body.innerHTML = `<div id="toolbar"></div>`;
        let div = document.getElementById('toolbar')

        let changed = false;

        jSuites.toolbar(div, {
            container: true,
            items:[{
                type: 'icon',
                content: 'change',
                onclick: function() {
                    changed = true;
                }
            }]
        })

        let item = document.querySelector('.jtoolbar-item')

        expect(Array.from(item.classList)).not.toContain('jtoolbar-selected')

        item.click()
        item = document.querySelector('.jtoolbar-item')

        expect(Array.from(item.classList)).toContain('jtoolbar-selected')
        expect(changed).toBe(true)
    });
});