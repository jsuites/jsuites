const jSuites = require('../dist/jsuites');

describe('Validations', () => {
  // ...

  test('should return false for an invalid email format', () => {
    expect(jSuites.validations.email('test@example.com')).toBe(true);
    expect(jSuites.validations.email('user@')).toBe(false);
    expect(jSuites.validations.email('john.doe@gmail.')).toBe(false);
  });

  test('should return true for a required field with whitespace characters', () => {
    expect(jSuites.validations.required('  value  ')).toBe(true);
    expect(jSuites.validations.required('\tdata\t')).toBe(true);
    expect(jSuites.validations.required('\n\n')).toBe(false);
    expect(jSuites.validations.required('   ')).toBe(false);
  });

  test('should return true for an empty value with whitespace characters', () => {
    expect(jSuites.validations.empty(' ')).toBe(true);
    expect(jSuites.validations.empty('\t')).toBe(true);
    expect(jSuites.validations.empty('\n')).toBe(true);
    expect(jSuites.validations.empty('value')).toBe(false);
  });

  test('should return true for a numeric value at the lower/upper range boundary', () => {
    const options = { criteria: 'between', value: [1, 10] };
    expect(jSuites.validations.number(1, options)).toBe(true);
    expect(jSuites.validations.number(10, options)).toBe(true);
  });

  test('should return false for a numeric value outside the specified range', () => {
    const options = { criteria: 'between', value: [1, 10] };
    expect(jSuites.validations.number(0, options)).toBe(false);
    expect(jSuites.validations.number(11, options)).toBe(false);
  });

  test('Login tests', () => {
    expect(jSuites.validations.login('test aa')).toBe(false);
    expect(jSuites.validations.login('test.aa')).toBe(true);
    expect(jSuites.validations.login('test$aa')).toBe(false);
  });

  test('should return false for an empty list of options', () => {
    expect(jSuites.validations.list('option', { value: [] })).toBe(false);
    expect(jSuites.validations.list('lemon', { value: ['apple,pear,lemon'] })).toBe(true);
  });

  test('should return false for an invalid date format', () => {
    expect(jSuites.validations.date('2023-15-07')).toBe(false);
    expect(jSuites.validations.date('2022-02-01')).toBe(true);
    expect(jSuites.validations.date('invalid-date')).toBe(false);
  });

  test('should return true for undefined if the allowBlank option is true', () => {
    expect(jSuites.validations(undefined, {
      type: 'text',
      allowBlank: true
    })).toBe(true);
  });

  test('should return true for null if the allowBlank option is true', () => {
    expect(jSuites.validations(null, {
      type: 'text',
      allowBlank: true
    })).toBe(true);
  });

  test('should return false for a string filled with spaces in numeric validation', () => {
    expect(jSuites.validations.number('  ')).toBe(false);
  });

  test('should consider null and undefined as empty strings in text validation', () => {
    expect(jSuites.validations.text(null, { criteria: 'not contains', value: ['a'] })).toBe(true);
    expect(jSuites.validations.text(undefined, { criteria: 'not contains', value: ['a'] })).toBe(true);
  });

  test('should consider null and undefined as empty in the "empty", "not exist", "notEmpty" and "exist" validations', () => {
    expect(jSuites.validations.empty(null)).toBe(true);
    expect(jSuites.validations.empty(undefined)).toBe(true);

    expect(jSuites.validations['not exist'](null)).toBe(true);
    expect(jSuites.validations['not exist'](undefined)).toBe(true);

    expect(jSuites.validations.notEmpty(null)).toBe(false);
    expect(jSuites.validations.notEmpty(undefined)).toBe(false);

    expect(jSuites.validations.exist(null)).toBe(false);
    expect(jSuites.validations.exist(undefined)).toBe(false);
  });

  test('text length tests', () => {
    expect(jSuites.validations.textLength(undefined, { criteria: '=', value: [0] })).toBe(true);
    expect(jSuites.validations.textLength(null, { criteria: '=', value: [0] })).toBe(true);
    expect(jSuites.validations.textLength(0, { criteria: '=', value: [1] })).toBe(true);
    expect(jSuites.validations.textLength(true, { criteria: '=', value: [4] })).toBe(true);
    expect(jSuites.validations.textLength(false, { criteria: '=', value: [5] })).toBe(true);
    expect(jSuites.validations.textLength('0', { criteria: '=', value: [1] })).toBe(true);
  })

  // Add more tests as needed
});