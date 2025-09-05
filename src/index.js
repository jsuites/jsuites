import jSuites from './jsuites';
import heatmap from '../packages/heatmap/heatmap';
import '../packages/heatmap/heatmap.css';

import '../dist/jsuites.css';

var initialDate = '2021-01-01';

var year = [];
var date = new Date(initialDate);

while (year.length < 366) {
    year.push({
        date: date.toISOString().slice(0, 10),
        value: Math.random() * 10,
    });

    date.setDate(date.getDate() + 1);
}

heatmap(document.getElementById('root'), {
    title: 'Example',
    data: year,
    date: initialDate,
    colors: ['#B2DFDB', '#4DB6AC', '#009688', '#00796B', '#004D40'],
    tooltip: true,
});