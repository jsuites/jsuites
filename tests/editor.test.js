const jSuites = require('../dist/jsuites');

describe('editor', () => {
    test('editor methods', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let editor = jSuites.editor(div, {
            allowToolbar: true,
            value: '<b>This is a basic example...</b>'
        })

        expect(document.body.innerHTML).toContain('This is a basic example...')
        expect(editor.getData()).toContain('This is a basic example...')

        editor.setData("new text editor")

        expect(editor.getData()).toContain('new text editor')
        expect(document.body.innerHTML).toContain('new text editor')
        expect(document.body.innerHTML).not.toContain('This is a basic example...')
        expect(editor.getData()).not.toContain('This is a basic example...')

        editor.reset()

        expect(editor.getData()).not.toContain('new text editor')
        expect(document.body.innerHTML).not.toContain('new text editor')
        expect(document.body.innerHTML).not.toContain('This is a basic example...')
        expect(editor.getData()).not.toContain('This is a basic example...')
    });

});