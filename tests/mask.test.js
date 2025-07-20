const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {

    test('jSuites.mask.render', () => {
        //expect(jSuites.mask.render(1234567890.123456, { mask: '###,###.######' })).toBe('1,234,567,890.123456');
        //expect(jSuites.mask.render(123.456789, { mask: '0.0000####' })).toBe('123.456789');
        // expect(jSuites.mask.render(10000, { mask: '$#,##0;-$#,##0' })).toBe('$10,000');
        // expect(jSuites.mask.render(-10000, { mask: '$#,##0;-$#,##0' })).toBe('-$10,000');
    });
});
