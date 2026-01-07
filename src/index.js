import jSuites from './jsuites';

import '../dist/jsuites.css';


let contextMenu = jSuites.contextmenu(root, {
    items: [
        {
            title: 'About',
            shortcut: 'Ctrl + A',
            onclick: function () {
                alert('About is clicked');
            },
        },
        {
            title: 'Go to Jspreadsheet Pro website',
            onclick: function () {
                window.open('https://jspreadsheet.com/v7');
            },
        },
        {
            type: 'line'
        },
        {
            title: 'Save',
            icon: 'save'
        },
        {
            title: 'Submenus',
            shortcut: '►',
            submenu: [
                {
                    title: 'Submenu 1',
                    shortcut: 'Ctrl + X',
                }
            ]
        },
    ],
})


document.getElementById('container').addEventListener("contextmenu", function(e) {
    contextMenu.open(e);
    e.preventDefault();
});