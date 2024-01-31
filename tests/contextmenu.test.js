const jSuites = require('../dist/jsuites');

describe('contextmenu', () => {
    test('contextmenu instance', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        var Clicou = false;
        var Copiou = false;
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
                contextMenu.close(false);
            }
        })
    });
});
