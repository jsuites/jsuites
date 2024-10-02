const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {
    test('decimals', () => {
        expect(jSuites.mask(123.456789, { mask: '000.00' }, true).value).toEqual("123.46");
        expect(jSuites.mask(123.456, { mask: '000.0' }, true).value).toEqual("123.46");
        expect(jSuites.mask(789.123, { mask: '000.00' }, true).value).toEqual("789.12");
        expect(jSuites.mask(456.78, { mask: '000.00' }, true).value).toEqual("456.78");
    });

    test('padding', () => {
        expect(jSuites.mask(123, { mask: '00000' }, true).value).toEqual("00123");
        expect(jSuites.mask(9876.54321, { mask: '00000' }, true).value).toEqual("09877");
        expect(jSuites.mask(1.2, { mask: '0.000' }, true).value).toEqual("1.2");
        expect(jSuites.mask(12, { mask: '00' }, true).value).toEqual("12");
    });

    test('padding decimals', () => {
        expect(jSuites.mask(123.23, { mask: '000.000' }, true).value).toEqual("123.230");
        expect(jSuites.mask(789.1, { mask: '000.000' }, true).value).toEqual("789.100");
    });

    test('numeric', () => {
        expect(jSuites.mask(123.2332, { mask: '00000.00'}, true).value).toEqual("00123.23");    
        expect(jSuites.mask(1.2, { mask: '000000.000' }, true).value).toEqual("000001.200");
        expect(jSuites.mask(-45.67, { mask: '00000.00' }, true).value).toEqual("-00045.67");

        expect(jSuites.mask(12345.678, { mask: '#,##0.00' }, true).value).toEqual("12,345.68");
        expect(jSuites.mask(987654.321, { mask: '#,##0.00' }, true).value).toEqual("987,654.32");
        expect(jSuites.mask(54321, { mask: '#,##0' }, true).value).toEqual("54,321");

        expect(jSuites.mask(0, { mask: '000.00' }, true).value).toEqual("000.00");
        expect(jSuites.mask(123456789, { mask: '0000000000' }, true).value).toEqual("0123456789");
    });

    test('edge cases', () => {
        expect(jSuites.mask(0, { mask: '0.00' }, true).value).toEqual("0.00");
        expect(jSuites.mask(0.123, { mask: '0.00' }, true).value).toEqual("0.12");
        expect(jSuites.mask(-456, { mask: '000' }, true).value).toEqual("-456");
        expect(jSuites.mask(1000, { mask: '0,000' }, true).value).toEqual("1,000");
    });
});
