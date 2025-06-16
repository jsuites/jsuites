import jSuites from './jsuites';

import '../dist/jsuites.css';

const options = [
    {
        tooltip: 'debugging',
        title: 'Console.log',
        onclick: function () {
            console.log('Hello!')
        },
    },
    {
        title: 'Show Alert',
        onclick: function () {
            alert('Hello!')
        },
        disabled: true,
    },
];

window.cmenu = jSuites.contextmenu(document.getElementById('root'), { items: options });