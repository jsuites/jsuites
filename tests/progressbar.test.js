const jSuites = require('../dist/jsuites');

describe('progressbar', () => {
    test('progressbar methods', () => {   
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let progressbar = jSuites.progressbar(div, {})

        expect(document.body.innerHTML).toContain('jprogressbar')
        expect(document.body.innerHTML).toContain('data-value="0"')
        expect(document.body.innerHTML).toContain('width: 0%')

        progressbar.setValue('50')

        expect(document.body.innerHTML).toContain('data-value="50%"')

        expect(progressbar.getValue()).toBe(50)
    });
});