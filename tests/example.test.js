const jSuites = require('../dist/jsuites');

test('renders a div with text "Hello, World!"', () => {
    document.body.innerHTML = '<div id="myDiv">Hello, World!</div>';
    let div = document.getElementById('myDiv')

    expect(div.innerHTML).toBe('Hello, World!')
});

