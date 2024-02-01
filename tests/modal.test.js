const jSuites = require('../dist/jsuites');

describe('modal', () => {
    test('modal instance', () => {
        document.body.innerHTML = '<div id="myDiv"> Modal with no title content</div>';
        let div = document.getElementById('myDiv')
        let modal = jSuites.modal(div, {
            closed: true
        })
        
        expect(document.body.innerHTML).toContain("Modal with no title content")
    });

    test('modal methods', () => {
        document.body.innerHTML = '<div id="myDiv"> Modal with no title content</div>';
        let div = document.getElementById('myDiv')
        let modal = jSuites.modal(div, {
            closed: true
        })

        expect(document.body.innerHTML).toContain("display: none")

        modal.open()
        expect(document.body.innerHTML).not.toContain("display: none")

        modal.close()
        expect(document.body.innerHTML).toContain("display: none")

    });

});