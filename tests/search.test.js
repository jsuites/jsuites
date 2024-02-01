const jSuites = require('../dist/jsuites');

describe('search', () => {
    test('search instance', () => {
        document.body.innerHTML = `<div id="search"></div><input type="text" id="search-input"/>`;
        let div = document.getElementById('search')
        let input = document.getElementById('search-input')
        jSuites.search(div, {
            input: input,
            data: ['hello', 'test']
        })

        expect(document.body.innerHTML).toContain('jsearch_container')
        expect(document.body.innerHTML).toContain('jsearch')
    });

});