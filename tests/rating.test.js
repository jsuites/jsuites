const jSuites = require('../dist/jsuites');

describe('rating', () => {
    test('rating methods', () => {   
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        
        let rating = jSuites.rating(div, {})

        
        expect(rating.getValue()).toBe(0)

        let classesInAverage = Array.from(document.querySelector('[title="Average"]').classList)
        let classesInVeryGood = Array.from(document.querySelector('[title="Very good"]').classList)
        expect(classesInAverage).not.toContain('jrating-selected')
        expect(classesInVeryGood).not.toContain('jrating-selected')
        
        expect(rating.setValue(3))

        classesInAverage = Array.from(document.querySelector('[title="Average"]').classList)
        classesInVeryGood = Array.from(document.querySelector('[title="Very good"]').classList)
        expect(classesInAverage).toContain('jrating-selected')
        expect(classesInVeryGood).not.toContain('jrating-selected')

        expect(rating.setValue(5))

        classesInAverage = Array.from(document.querySelector('[title="Average"]').classList)
        classesInVeryGood = Array.from(document.querySelector('[title="Very good"]').classList)

        expect(classesInAverage).toContain('jrating-selected')
        expect(classesInVeryGood).toContain('jrating-selected')
    });
});