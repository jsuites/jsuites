const jSuites = require('../dist/jsuites');

test('jSuites.mask', () => {
    expect(jSuites.validation(0.123, '$ #.##0,00')).toBe('$ 0,123');
});
