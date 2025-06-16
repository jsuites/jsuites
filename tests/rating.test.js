const jSuites = require('../dist/jsuites');

describe('rating', () => {
    test('default tooltips', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        
        let rating = jSuites.rating(div, { number: 5, value: 2 });

        expect(rating.el.children[0].getAttribute('title')).toBe('Very bad')
        expect(rating.el.children[1].getAttribute('title')).toBe('Bad')
        expect(rating.el.children[2].getAttribute('title')).toBe('Average')
        expect(rating.el.children[3].getAttribute('title')).toBe('Good')
        expect(rating.el.children[4].getAttribute('title')).toBe('Very good')
    });

    test('tooltips array', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        
        let rating = jSuites.rating(div, { number: 3, value: 2, tooltip: ['Low', 'Neutral', 'High'] });

        expect(rating.el.children[0].getAttribute('title')).toBe('Low')
        expect(rating.el.children[1].getAttribute('title')).toBe('Neutral')
        expect(rating.el.children[2].getAttribute('title')).toBe('High')
    });

    test('tooltips string', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        
        let rating = jSuites.rating(div, { number: 3, value: 2, tooltip: 'Low,Neutral,High' });

        expect(rating.el.children[0].getAttribute('title')).toBe('Low')
        expect(rating.el.children[1].getAttribute('title')).toBe('Neutral')
        expect(rating.el.children[2].getAttribute('title')).toBe('High')
    });

    test('methods', () => {   
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        
        let rating = jSuites.rating(div, { number: 5 });
        
        expect(rating.getValue()).toBe(0);

        for (let i = 0; i < rating.el.children.length; i++) {
            expect(rating.el.children[i].innerHTML).toBe('star_outline');
        }

        expect(rating.setValue(5))

        for (let i = 0; i < rating.el.children.length; i++) {
            expect(rating.el.children[i].innerHTML).toBe('star');
        }

        expect(rating.setValue(2));

        for (let i = 0; i < 2; i++) {
            expect(rating.el.children[i].innerHTML).toBe('star');
        }

        for (let i = 2; i < rating.el.children.length; i++) {
            expect(rating.el.children[i].innerHTML).toBe('star_outline');
        }
    });
});