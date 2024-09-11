const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {

    test('jSuites.mask.render', () => {
        expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
        expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
        expect(jSuites.mask.render(0.1, { mask: '0%' }, true)).toBe('10%');
        expect(jSuites.mask.render(1.005, { mask: '0.00' }, true)).toBe('1.01');
        expect(jSuites.mask.render(11.45, { mask: '0.0' }, true)).toBe('11.5');
        expect(jSuites.mask.render(-11.45, { mask: '0.0' }, true)).toBe('-11.5');
        expect(jSuites.mask.render(1000000.0005, { mask: '0.000' }, true)).toBe('1000000.001');
        expect(jSuites.mask.render(-1000000.0005, { mask: '0.000' }, true)).toBe('-1000000.001');
        expect(jSuites.mask.render(-11.449, { mask: '0.00' }, true)).toBe('-11.45');
        expect(jSuites.mask.render(-11.455, { mask: '0.00' }, true)).toBe('-11.46');
        expect(jSuites.mask.render(79998007920000000000000, { mask: '#,##0' }, true)).toBe('79,998,007,920,000,000,000,000');
        expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('7.9998e+22');
        expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' })).toBe('79998007920000000000000');
    });
});
