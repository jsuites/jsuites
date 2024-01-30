const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {

    test('jSuites.mask.render', () => {
        expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
        expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
        expect(jSuites.mask.render(0.1, { mask: '0%' }, true)).toBe('10%');
        expect(jSuites.mask.render(1.005, { mask: '0.00' }, true)).toBe('1.01');
    });
});
