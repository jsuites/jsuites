const jSuites = require('../dist/jsuites');

console.log(jSuites)

test('jSuites.mask', () => {
  //expect(jSuites.mask(0.123, '$ #.##0,00')).toBe('$ 0,123');
});

test('jSuites.mask.render', () => {
  //expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
  //expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
});
