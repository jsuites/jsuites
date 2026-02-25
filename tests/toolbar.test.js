const jSuites = require('../dist/jsuites');

describe('toolbar', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

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

    test('toolbar destroy removes classes and references', () => {
        document.body.innerHTML = '<div id="toolbar"></div>';
        let div = document.getElementById('toolbar');
        let toolbar = jSuites.toolbar(div, {
            container: true,
            items: [
                { type: 'icon', content: 'undo' },
                { type: 'icon', content: 'redo' },
            ]
        });

        // Verify toolbar was created
        expect(div.classList.contains('jtoolbar')).toBe(true);
        expect(div.classList.contains('jtoolbar-container')).toBe(true);
        expect(div.toolbar).toBe(toolbar);

        // Destroy
        toolbar.destroy();

        // Verify cleanup
        expect(div.classList.contains('jtoolbar')).toBe(false);
        expect(div.classList.contains('jtoolbar-container')).toBe(false);
        expect(div.toolbar).toBeUndefined();
        expect(div.innerHTML).toBe('');
    });

    test('toolbar destroy cleans up internal picker components', () => {
        document.body.innerHTML = '<div id="toolbar"></div>';
        let div = document.getElementById('toolbar');
        let toolbar = jSuites.toolbar(div, {
            items: [
                { type: 'icon', content: 'save' },
                {
                    type: 'select',
                    data: { 0: 'Option1', 1: 'Option2' },
                    value: 0
                },
            ]
        });

        // Verify picker was created inside toolbar
        expect(document.querySelector('.jpicker')).not.toBeNull();

        // Destroy should clean up picker too
        expect(() => toolbar.destroy()).not.toThrow();
        expect(div.toolbar).toBeUndefined();
        expect(div.innerHTML).toBe('');
    });

    test('toolbar multiple create/destroy cycles', () => {
        document.body.innerHTML = '<div id="toolbar"></div>';
        let div = document.getElementById('toolbar');

        for (let i = 0; i < 10; i++) {
            let toolbar = jSuites.toolbar(div, {
                items: [
                    { type: 'icon', content: 'undo' },
                    { type: 'icon', content: 'redo' },
                ]
            });

            expect(div.classList.contains('jtoolbar')).toBe(true);
            expect(div.toolbar).toBeDefined();

            toolbar.destroy();

            expect(div.classList.contains('jtoolbar')).toBe(false);
            expect(div.toolbar).toBeUndefined();
        }
    });

    test('toolbar destroy with select items multiple cycles', () => {
        document.body.innerHTML = '<div id="toolbar"></div>';
        let div = document.getElementById('toolbar');

        for (let i = 0; i < 5; i++) {
            let toolbar = jSuites.toolbar(div, {
                items: [
                    {
                        type: 'select',
                        data: { 0: 'Arial', 1: 'Verdana' },
                        value: 0
                    },
                    {
                        type: 'select',
                        data: { 0: 'Small', 1: 'Medium', 2: 'Large' },
                        value: 1
                    },
                ]
            });

            expect(div.toolbar).toBeDefined();

            toolbar.destroy();

            expect(div.toolbar).toBeUndefined();
            expect(div.innerHTML).toBe('');
        }
    });
});