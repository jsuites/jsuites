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
        expect(jSuites.mask.render(-79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('-7.9998e+22');
        expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' })).toBe('79998007920000000000000');
        expect(jSuites.mask.render(-79998007920000000000000, { mask: '0.0000E+00' })).toBe('-79998007920000000000000');
        
        expect(jSuites.mask.render(1234567890.123, { mask: '#,##0.00' })).toBe('1,234,567,890.123');
        expect(jSuites.mask.render(1234567890, { mask: '0.000000E+0' }, true)).toBe('1.234568e+9');
        expect(jSuites.mask.render(987654321.98765, { mask: '#,##0.0000' }, true)).toBe('987,654,321.9877');
        expect(jSuites.mask.render(12345678900, { mask: '0.00E+00' }, true)).toBe('1.23e+10');
        expect(jSuites.mask.render(98765432100000, { mask: '0.000000000E+00' }, true)).toBe('9.876543210e+13');
        //expect(jSuites.mask.render(1234567890.123456, { mask: '###,###.######' })).toBe('1,234,567,890.123456');
        //expect(jSuites.mask.render(123.456789, { mask: '0.0000####' })).toBe('123.456789');
        expect(jSuites.mask.render(123.4, { mask: '#,##0.0000' }, true)).toBe('123.4000');

        // expect(jSuites.mask.render(10000, { mask: '$#,##0;-$#,##0' })).toBe('$10,000');
        // expect(jSuites.mask.render(-10000, { mask: '$#,##0;-$#,##0' })).toBe('-$10,000');
    });
});
