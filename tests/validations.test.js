const jSuites = require('../dist/jsuites');

describe('jSuites validation', () => {
    test('Empty', () => {
        expect(jSuites.validations.empty('')).toBe(true)
        expect(jSuites.validations.empty('     ')).toBe(true)
        expect(jSuites.validations.empty(null)).toBe(true)
        expect(jSuites.validations.empty(undefined)).toBe(true)
        expect(jSuites.validations.empty({})).toBe(true)
        expect(jSuites.validations.empty([])).toBe(true)

        expect(jSuites.validations.empty({ a: undefined })).toBe(false)
        expect(jSuites.validations.empty([undefined])).toBe(false)

        expect(jSuites.validations.empty(true)).toBe(false)
        expect(jSuites.validations.empty(false)).toBe(false)
        expect(jSuites.validations.empty(false)).toBe(false)
        expect(jSuites.validations.empty(NaN)).toBe(false)
        expect(jSuites.validations.empty(0)).toBe(false)
        expect(jSuites.validations.empty(-5)).toBe(false)
        expect(jSuites.validations.empty(8)).toBe(false)
        expect(jSuites.validations.empty('empty')).toBe(false)
        expect(jSuites.validations.empty('    a')).toBe(false)
        expect(jSuites.validations.empty('a     ')).toBe(false)
        expect(jSuites.validations.empty('     a     ')).toBe(false)
    });

    test('not empty', () => {
        expect(jSuites.validations.notEmpty('')).toBe(false)
        expect(jSuites.validations.notEmpty('     ')).toBe(false)
        expect(jSuites.validations.notEmpty(null)).toBe(false)
        expect(jSuites.validations.notEmpty(undefined)).toBe(false)
        expect(jSuites.validations.notEmpty({})).toBe(false)
        expect(jSuites.validations.notEmpty([])).toBe(false)

        expect(jSuites.validations.notEmpty({ a: undefined })).toBe(true)
        expect(jSuites.validations.notEmpty([undefined])).toBe(true)

        expect(jSuites.validations.notEmpty(true)).toBe(true)
        expect(jSuites.validations.notEmpty(false)).toBe(true)
        expect(jSuites.validations.notEmpty(false)).toBe(true)
        expect(jSuites.validations.notEmpty(NaN)).toBe(true)
        expect(jSuites.validations.notEmpty(0)).toBe(true)
        expect(jSuites.validations.notEmpty(-5)).toBe(true)
        expect(jSuites.validations.notEmpty(8)).toBe(true)
        expect(jSuites.validations.notEmpty('empty')).toBe(true)
        expect(jSuites.validations.notEmpty('    a')).toBe(true)
        expect(jSuites.validations.notEmpty('a     ')).toBe(true)
        expect(jSuites.validations.notEmpty('     a     ')).toBe(true)
    });

    test('Required', () => {
        expect(jSuites.validations.required('')).toBe(false)
        expect(jSuites.validations.required('     ')).toBe(false)
        expect(jSuites.validations.required(null)).toBe(false)
        expect(jSuites.validations.required(undefined)).toBe(false)
        expect(jSuites.validations.required({})).toBe(false)
        expect(jSuites.validations.required([])).toBe(false)

        expect(jSuites.validations.required({ a: undefined })).toBe(true)
        expect(jSuites.validations.required([undefined])).toBe(true)

        expect(jSuites.validations.required(true)).toBe(true)
        expect(jSuites.validations.required(false)).toBe(true)
        expect(jSuites.validations.required(false)).toBe(true)
        expect(jSuites.validations.required(NaN)).toBe(true)
        expect(jSuites.validations.required(0)).toBe(true)
        expect(jSuites.validations.required(-5)).toBe(true)
        expect(jSuites.validations.required(8)).toBe(true)
        expect(jSuites.validations.required('empty')).toBe(true)
        expect(jSuites.validations.required('    a')).toBe(true)
        expect(jSuites.validations.required('a     ')).toBe(true)
        expect(jSuites.validations.required('     a     ')).toBe(true)
    });

    test('Url', () => {
        expect(jSuites.validations.url('')).toBe(false)
        expect(jSuites.validations.url('      ')).toBe(false)
        expect(jSuites.validations.url('test')).toBe(false)
        expect(jSuites.validations.url(0)).toBe(false)
        expect(jSuites.validations.url(5)).toBe(false)
        expect(jSuites.validations.url(-43)).toBe(false)
        expect(jSuites.validations.url(null)).toBe(false)
        expect(jSuites.validations.url(undefined)).toBe(false)
        expect(jSuites.validations.url(NaN)).toBe(false)
        expect(jSuites.validations.url(true)).toBe(false)
        expect(jSuites.validations.url(false)).toBe(false)
        expect(jSuites.validations.url({})).toBe(false)
        expect(jSuites.validations.url([])).toBe(false)

        expect(jSuites.validations.url({ a: 'http://test' })).toBe(false)
        expect(jSuites.validations.url(['http://test'])).toBe(false)

        expect(jSuites.validations.url('     http://test')).toBe(false)
        expect(jSuites.validations.url('http://test     ')).toBe(false)
        expect(jSuites.validations.url('     http://test      ')).toBe(false)

        expect(jSuites.validations.url('http://test')).toBe(true)
        expect(jSuites.validations.url('https://another-test')).toBe(true)
        expect(jSuites.validations.url('http://localhost:3000/random-name/another-random-name')).toBe(true)
        expect(jSuites.validations.url('https://localhost:3000/something?quantity=10')).toBe(true)
        expect(jSuites.validations.url('http://localhost:3000/something?quantity=10')).toBe(true)
        expect(jSuites.validations.url('http://localhost:3000/something?product=table&quantity=10')).toBe(true)
    });

    test('Text with criteria "valid url"', () => {
        const maskOptions = {
            criteria: 'valid url',
        };

        expect(jSuites.validations.text('', maskOptions)).toBe(false)
        expect(jSuites.validations.text('      ', maskOptions)).toBe(false)
        expect(jSuites.validations.text('test', maskOptions)).toBe(false)
        expect(jSuites.validations.text(0, maskOptions)).toBe(false)
        expect(jSuites.validations.text(5, maskOptions)).toBe(false)
        expect(jSuites.validations.text(-43, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'http://test' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['http://test'], maskOptions)).toBe(false)

        expect(jSuites.validations.text('     http://test', maskOptions)).toBe(false)
        expect(jSuites.validations.text('http://test     ', maskOptions)).toBe(false)
        expect(jSuites.validations.text('     http://test      ', maskOptions)).toBe(false)

        expect(jSuites.validations.text('http://test', maskOptions)).toBe(true)
        expect(jSuites.validations.text('https://another-test', maskOptions)).toBe(true)
        expect(jSuites.validations.text('http://localhost:3000/random-name/another-random-name', maskOptions)).toBe(true)
        expect(jSuites.validations.text('https://localhost:3000/something?quantity=10', maskOptions)).toBe(true)
        expect(jSuites.validations.text('http://localhost:3000/something?quantity=10', maskOptions)).toBe(true)
        expect(jSuites.validations.text('http://localhost:3000/something?product=table&quantity=10', maskOptions)).toBe(true)
    });

    test('Email', () => {
        expect(jSuites.validations.email('')).toBe(false)
        expect(jSuites.validations.email('teste')).toBe(false)
        expect(jSuites.validations.email('teste@')).toBe(false)
        expect(jSuites.validations.email('@gmail.com')).toBe(false)
        expect(jSuites.validations.email('test@-gmail')).toBe(false)
        expect(jSuites.validations.email('test@gmail-')).toBe(false)
        expect(jSuites.validations.email('test@.gmail')).toBe(false)
        expect(jSuites.validations.email('test@gmail.')).toBe(false)
        expect(jSuites.validations.email('test@gma*il')).toBe(false)
        expect(jSuites.validations.email({})).toBe(false)
        expect(jSuites.validations.email([])).toBe(false)

        expect(jSuites.validations.email({ a: 'test@gmail.com' })).toBe(false)
        expect(jSuites.validations.email(['test@gmail.com'])).toBe(false)

        expect(jSuites.validations.email(0)).toBe(false)
        expect(jSuites.validations.email(6.4)).toBe(false)
        expect(jSuites.validations.email(-8)).toBe(false)
        expect(jSuites.validations.email(undefined)).toBe(false)
        expect(jSuites.validations.email(null)).toBe(false)
        expect(jSuites.validations.email(NaN)).toBe(false)
        expect(jSuites.validations.email(true)).toBe(false)
        expect(jSuites.validations.email(false)).toBe(false)

        expect(jSuites.validations.email('test@gmail.com')).toBe(true)
        expect(jSuites.validations.email('name.something@outlook.com')).toBe(true)
        expect(jSuites.validations.email('person467@company')).toBe(true)
    });

    test('Text with criteria "valid email"', () => {
        const maskOptions = {
            criteria: 'valid email',
        };

        expect(jSuites.validations.text('', maskOptions)).toBe(false)
        expect(jSuites.validations.text('teste', maskOptions)).toBe(false)
        expect(jSuites.validations.text('teste@', maskOptions)).toBe(false)
        expect(jSuites.validations.text('@gmail.com', maskOptions)).toBe(false)
        expect(jSuites.validations.text('test@-gmail', maskOptions)).toBe(false)
        expect(jSuites.validations.text('test@gmail-', maskOptions)).toBe(false)
        expect(jSuites.validations.text('test@.gmail', maskOptions)).toBe(false)
        expect(jSuites.validations.text('test@gmail.', maskOptions)).toBe(false)
        expect(jSuites.validations.text('test@gma*il', maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'test@gmail.com' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['test@gmail.com'], maskOptions)).toBe(false)

        expect(jSuites.validations.text(0, maskOptions)).toBe(false)
        expect(jSuites.validations.text(6.4, maskOptions)).toBe(false)
        expect(jSuites.validations.text(-8, maskOptions)).toBe(false)
        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)

        expect(jSuites.validations.text('test@gmail.com', maskOptions)).toBe(true)
        expect(jSuites.validations.text('name.something@outlook.com', maskOptions)).toBe(true)
        expect(jSuites.validations.text('person467@company', maskOptions)).toBe(true)
    });

    test('Login', () => {
        expect(jSuites.validations.login(undefined)).toBe(false)
        expect(jSuites.validations.login(null)).toBe(false)
        expect(jSuites.validations.login(NaN)).toBe(false)
        expect(jSuites.validations.login(true)).toBe(false)
        expect(jSuites.validations.login(false)).toBe(false)
        expect(jSuites.validations.login(11111111)).toBe(false)
        expect(jSuites.validations.login({})).toBe(false)
        expect(jSuites.validations.login([])).toBe(false)

        expect(jSuites.validations.login({ a: 'aaaaaaaa' })).toBe(false)
        expect(jSuites.validations.login(['aaaaaaaa'])).toBe(false)

        expect(jSuites.validations.login('')).toBe(false)
        expect(jSuites.validations.login('a')).toBe(false)
        expect(jSuites.validations.login('aa')).toBe(false)
        expect(jSuites.validations.login('aaa')).toBe(false)
        expect(jSuites.validations.login('aaaa')).toBe(false)
        expect(jSuites.validations.login('aaaaa')).toBe(false)
        expect(jSuites.validations.login('aaaaaa')).toBe(false)
        expect(jSuites.validations.login('aaaaaaa')).toBe(true)
        expect(jSuites.validations.login('1111111')).toBe(true)
        expect(jSuites.validations.login('00000aaaa')).toBe(true)

        expect(jSuites.validations.login('aaaaa-aa')).toBe(false)
        expect(jSuites.validations.login('aa aaaaa')).toBe(false)
    });

    test('Number', () => {
        expect(jSuites.validations.number(undefined)).toBe(false)
        expect(jSuites.validations.number(null)).toBe(false)
        expect(jSuites.validations.number(NaN)).toBe(false)
        expect(jSuites.validations.number(true)).toBe(false)
        expect(jSuites.validations.number(false)).toBe(false)
        expect(jSuites.validations.number({})).toBe(false)
        expect(jSuites.validations.number([])).toBe(false)

        expect(jSuites.validations.number({ a: 1 })).toBe(false)
        expect(jSuites.validations.number([1])).toBe(false)

        expect(jSuites.validations.number('')).toBe(false)
        expect(jSuites.validations.number('test')).toBe(false)
        expect(jSuites.validations.number('a1')).toBe(false)
        expect(jSuites.validations.number('1a')).toBe(false)

        expect(jSuites.validations.number(0)).toBe(true)
        expect(jSuites.validations.number('0')).toBe(true)
        expect(jSuites.validations.number(1)).toBe(true)
        expect(jSuites.validations.number('1')).toBe(true)
        expect(jSuites.validations.number(-515.4)).toBe(true)
        expect(jSuites.validations.number('-515.4')).toBe(true)
        expect(jSuites.validations.number(175.54)).toBe(true)
        expect(jSuites.validations.number('175.54')).toBe(true)

        expect(jSuites.validations.number(' 1')).toBe(false)
        expect(jSuites.validations.number('1 ')).toBe(false)
        expect(jSuites.validations.number(' 1 ')).toBe(false)
    });

    test('Number with criteria "="', () => {
        const maskOptions = {
            criteria: '=',
            value: [5],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 5 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([5], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(false)
        expect(jSuites.validations.number(5, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-345, {
            ...maskOptions,
            value: [-345]
        })).toBe(true)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria "!="', () => {
        const maskOptions = {
            criteria: '!=',
            value: [5],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 6 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([6], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-345, {
            ...maskOptions,
            value: [-345]
        })).toBe(false)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria "<"', () => {
        const maskOptions = {
            criteria: '<',
            value: [5],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 4 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([4], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5, maskOptions)).toBe(false)
        expect(jSuites.validations.number(4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(6, maskOptions)).toBe(false)
        expect(jSuites.validations.number(4.9999, maskOptions)).toBe(true)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria ">"', () => {
        const maskOptions = {
            criteria: '>',
            value: [5],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 6 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([6], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(false)
        expect(jSuites.validations.number(5, maskOptions)).toBe(false)
        expect(jSuites.validations.number(4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(6, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5.000001, maskOptions)).toBe(true)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria "<="', () => {
        const maskOptions = {
            criteria: '<=',
            value: [5],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 5 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([5], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5, maskOptions)).toBe(true)
        expect(jSuites.validations.number(4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(6, maskOptions)).toBe(false)
        expect(jSuites.validations.number(5.000001, maskOptions)).toBe(false)
        expect(jSuites.validations.number(4.99999, maskOptions)).toBe(true)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria ">="', () => {
        const maskOptions = {
            criteria: '>=',
            value: [5],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 5 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([5], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(false)
        expect(jSuites.validations.number(5, maskOptions)).toBe(true)
        expect(jSuites.validations.number(4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(6, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5.000001, maskOptions)).toBe(true)
        expect(jSuites.validations.number(4.99999, maskOptions)).toBe(false)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria "between"', () => {
        const maskOptions = {
            criteria: 'between',
            value: [5, 10],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 5 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([5], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1, maskOptions)).toBe(false)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(false)
        expect(jSuites.validations.number(5, maskOptions)).toBe(true)
        expect(jSuites.validations.number(4, maskOptions)).toBe(false)
        expect(jSuites.validations.number(6, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5.000001, maskOptions)).toBe(true)
        expect(jSuites.validations.number(4.99999, maskOptions)).toBe(false)
        expect(jSuites.validations.number(10, maskOptions)).toBe(true)
        expect(jSuites.validations.number(9.9999, maskOptions)).toBe(true)
        expect(jSuites.validations.number(15, maskOptions)).toBe(false)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('Number with criteria "not between"', () => {
        const maskOptions = {
            criteria: 'not between',
            value: [5, 10],
        };

        expect(jSuites.validations.number(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.number(null, maskOptions)).toBe(false)
        expect(jSuites.validations.number(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.number(true, maskOptions)).toBe(false)
        expect(jSuites.validations.number(false, maskOptions)).toBe(false)
        expect(jSuites.validations.number({}, maskOptions)).toBe(false)
        expect(jSuites.validations.number([], maskOptions)).toBe(false)

        expect(jSuites.validations.number({ a: 4 }, maskOptions)).toBe(false)
        expect(jSuites.validations.number([4], maskOptions)).toBe(false)

        expect(jSuites.validations.number('', maskOptions)).toBe(false)
        expect(jSuites.validations.number('test', maskOptions)).toBe(false)
        expect(jSuites.validations.number('a1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1a', maskOptions)).toBe(false)

        expect(jSuites.validations.number(0, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1, maskOptions)).toBe(true)
        expect(jSuites.validations.number(1.134, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-44.4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(-26, maskOptions)).toBe(true)
        expect(jSuites.validations.number(5, maskOptions)).toBe(false)
        expect(jSuites.validations.number(4, maskOptions)).toBe(true)
        expect(jSuites.validations.number(6, maskOptions)).toBe(false)
        expect(jSuites.validations.number(5.000001, maskOptions)).toBe(false)
        expect(jSuites.validations.number(4.99999, maskOptions)).toBe(true)
        expect(jSuites.validations.number(10, maskOptions)).toBe(false)
        expect(jSuites.validations.number(9.9999, maskOptions)).toBe(false)
        expect(jSuites.validations.number(15, maskOptions)).toBe(true)

        expect(jSuites.validations.number(' 1', maskOptions)).toBe(false)
        expect(jSuites.validations.number('1 ', maskOptions)).toBe(false)
        expect(jSuites.validations.number(' 1 ', maskOptions)).toBe(false)
    });

    test('List with an array of values', () => {
        expect(jSuites.validations.list(undefined, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list(null, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list(NaN, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list(true, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list(false, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list('', { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list({}, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list([], { value: [[0, 1]] })).toBe(false)

        expect(jSuites.validations.list({ a: 1 }, { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list([1], { value: [[0, 1]] })).toBe(false)

        expect(jSuites.validations.list(0, { value: [[0, 1]] })).toBe(true)
        expect(jSuites.validations.list('0', { value: [[0, 1]] })).toBe(true)
        expect(jSuites.validations.list(1, { value: [[0, 1]] })).toBe(true)
        expect(jSuites.validations.list('1', { value: [[0, 1]] })).toBe(true)

        expect(jSuites.validations.list('   1', { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list('1    ', { value: [[0, 1]] })).toBe(false)
        expect(jSuites.validations.list('   1    ', { value: [[0, 1]] })).toBe(false)

        expect(jSuites.validations.list(1, { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('item', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('item ', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('item 0', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('item 4', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('item 11', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('  item 1', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('  item 1  ', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('item 1  ', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('em 1  ', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)
        expect(jSuites.validations.list('1 item', { value: [['item 1', 'item 2', 'item 3']] })).toBe(false)

        expect(jSuites.validations.list('item 1', { value: [['item 1', 'item 2', 'item 3']] })).toBe(true)
        expect(jSuites.validations.list('item 2', { value: [['item 1', 'item 2', 'item 3']] })).toBe(true)
        expect(jSuites.validations.list('item 3', { value: [['item 1', 'item 2', 'item 3']] })).toBe(true)
    });

    test('List with comma-separated values', () => {
        expect(jSuites.validations.list(undefined, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list(null, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list(NaN, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list(true, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list(false, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list('', { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list({}, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list([], { value: ['0,1'] })).toBe(false)

        expect(jSuites.validations.list({ a: 1 }, { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list([1], { value: ['0,1'] })).toBe(false)

        expect(jSuites.validations.list(0, { value: ['0,1'] })).toBe(true)
        expect(jSuites.validations.list('0', { value: ['0,1'] })).toBe(true)
        expect(jSuites.validations.list(1, { value: ['0,1'] })).toBe(true)
        expect(jSuites.validations.list('1', { value: ['0,1'] })).toBe(true)

        expect(jSuites.validations.list('   1', { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list('1    ', { value: ['0,1'] })).toBe(false)
        expect(jSuites.validations.list('   1    ', { value: ['0,1'] })).toBe(false)

        expect(jSuites.validations.list(1, { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('item', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('item ', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('item 0', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('item 4', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('item 11', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('  item 1', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('  item 1  ', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('item 1  ', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('em 1  ', { value: ['item 1,item 2,item 3'] })).toBe(false)
        expect(jSuites.validations.list('1 item', { value: ['item 1,item 2,item 3'] })).toBe(false)

        expect(jSuites.validations.list('item 1', { value: ['item 1,item 2,item 3'] })).toBe(true)
        expect(jSuites.validations.list('item 2', { value: ['item 1,item 2,item 3'] })).toBe(true)
        expect(jSuites.validations.list('item 3', { value: ['item 1,item 2,item 3'] })).toBe(true)
    });

    test('Text', () => {
        expect(jSuites.validations.text(undefined)).toBe(false)
        expect(jSuites.validations.text(null)).toBe(false)
        expect(jSuites.validations.text(NaN)).toBe(false)
        expect(jSuites.validations.text(true)).toBe(false)
        expect(jSuites.validations.text(false)).toBe(false)
        expect(jSuites.validations.text(1)).toBe(false)
        expect(jSuites.validations.text(0)).toBe(false)
        expect(jSuites.validations.text(-43)).toBe(false)
        expect(jSuites.validations.text({})).toBe(false)
        expect(jSuites.validations.text([])).toBe(false)

        expect(jSuites.validations.text({ a: 'test' })).toBe(false)
        expect(jSuites.validations.text(['test'])).toBe(false)

        expect(jSuites.validations.text('')).toBe(true)
        expect(jSuites.validations.text('    ')).toBe(true)
        expect(jSuites.validations.text('test')).toBe(true)
        expect(jSuites.validations.text('undefined')).toBe(true)
        expect(jSuites.validations.text('null')).toBe(true)
        expect(jSuites.validations.text('NaN')).toBe(true)
        expect(jSuites.validations.text('true')).toBe(true)
        expect(jSuites.validations.text('false')).toBe(true)
        expect(jSuites.validations.text('1')).toBe(true)
        expect(jSuites.validations.text('0')).toBe(true)
        expect(jSuites.validations.text('-43')).toBe(true)
    });

    test('Text with criteria "contains"', () => {
        const maskOptions = {
            criteria: 'contains',
            value: ['word'],
        };

        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'word' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['word'], maskOptions)).toBe(false)

        expect(jSuites.validations.text('', maskOptions)).toBe(false)
        expect(jSuites.validations.text('worrd', maskOptions)).toBe(false)
        expect(jSuites.validations.text('w ord', maskOptions)).toBe(false)

        expect(jSuites.validations.text('word', maskOptions)).toBe(true)
        expect(jSuites.validations.text('testword', maskOptions)).toBe(true)
        expect(jSuites.validations.text('wordtest', maskOptions)).toBe(true)
        expect(jSuites.validations.text('somethingwordtest', maskOptions)).toBe(true)
    });

    test('Text with criteria "not contains"', () => {
        const maskOptions = {
            criteria: 'not contains',
            value: ['word'],
        };

        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'test' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['test'], maskOptions)).toBe(false)

        expect(jSuites.validations.text('', maskOptions)).toBe(true)
        expect(jSuites.validations.text('worrd', maskOptions)).toBe(true)
        expect(jSuites.validations.text('w ord', maskOptions)).toBe(true)

        expect(jSuites.validations.text('word', maskOptions)).toBe(false)
        expect(jSuites.validations.text('testword', maskOptions)).toBe(false)
        expect(jSuites.validations.text('wordtest', maskOptions)).toBe(false)
        expect(jSuites.validations.text('somethingwordtest', maskOptions)).toBe(false)
    });

    test('Text with criteria "begins with"', () => {
        const maskOptions = {
            criteria: 'begins with',
            value: ['word'],
        };

        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'word' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['word'], maskOptions)).toBe(false)

        expect(jSuites.validations.text('', maskOptions)).toBe(false)
        expect(jSuites.validations.text('worrd', maskOptions)).toBe(false)
        expect(jSuites.validations.text('w ord', maskOptions)).toBe(false)

        expect(jSuites.validations.text('word', maskOptions)).toBe(true)
        expect(jSuites.validations.text('testword', maskOptions)).toBe(false)
        expect(jSuites.validations.text('wordtest', maskOptions)).toBe(true)
        expect(jSuites.validations.text('somethingwordtest', maskOptions)).toBe(false)
    });

    test('Text with criteria "ends with"', () => {
        const maskOptions = {
            criteria: 'ends with',
            value: ['word'],
        };

        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'word' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['word'], maskOptions)).toBe(false)

        expect(jSuites.validations.text('', maskOptions)).toBe(false)
        expect(jSuites.validations.text('worrd', maskOptions)).toBe(false)
        expect(jSuites.validations.text('w ord', maskOptions)).toBe(false)

        expect(jSuites.validations.text('word', maskOptions)).toBe(true)
        expect(jSuites.validations.text('testword', maskOptions)).toBe(true)
        expect(jSuites.validations.text('wordtest', maskOptions)).toBe(false)
        expect(jSuites.validations.text('somethingwordtest', maskOptions)).toBe(false)
    });

    test('Text with criteria "="', () => {
        const maskOptions = {
            criteria: '=',
            value: ['word'],
        };

        expect(jSuites.validations.text(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.text(null, maskOptions)).toBe(false)
        expect(jSuites.validations.text(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.text(true, maskOptions)).toBe(false)
        expect(jSuites.validations.text(false, maskOptions)).toBe(false)
        expect(jSuites.validations.text({}, maskOptions)).toBe(false)
        expect(jSuites.validations.text([], maskOptions)).toBe(false)

        expect(jSuites.validations.text({ a: 'word' }, maskOptions)).toBe(false)
        expect(jSuites.validations.text(['word'], maskOptions)).toBe(false)

        expect(jSuites.validations.text('', maskOptions)).toBe(false)
        expect(jSuites.validations.text('worrd', maskOptions)).toBe(false)
        expect(jSuites.validations.text('w ord', maskOptions)).toBe(false)

        expect(jSuites.validations.text('word', maskOptions)).toBe(true)
        expect(jSuites.validations.text('testword', maskOptions)).toBe(false)
        expect(jSuites.validations.text('wordtest', maskOptions)).toBe(false)
        expect(jSuites.validations.text('somethingwordtest', maskOptions)).toBe(false)
    });

    test('Text length with criteria "<"', () => {
        const maskOptions = {
            criteria: '<',
            value: [4],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'ab' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['ab'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(false)
    });

    test('Text length with criteria ">"', () => {
        const maskOptions = {
            criteria: '>',
            value: [4],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abcde' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abcde'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(true)
    });

    test('Text length with criteria "<="', () => {
        const maskOptions = {
            criteria: '<=',
            value: [4],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abcd' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abcd'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(false)
    });

    test('Text length with criteria ">="', () => {
        const maskOptions = {
            criteria: '>=',
            value: [4],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abcd' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abcd'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(true)
    });

    test('Text length with criteria "="', () => {
        const maskOptions = {
            criteria: '=',
            value: [4],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abcd' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abcd'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(false)
    });

    test('Text length with criteria "!="', () => {
        const maskOptions = {
            criteria: '!=',
            value: [4],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abcde' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abcde'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(true)
    });

    test('Text length with criteria "between"', () => {
        const maskOptions = {
            criteria: 'between',
            value: [4, 6],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abcd' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abcd'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('test??', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('?test??', maskOptions)).toBe(false)
    });

    test('Text length with criteria "between"', () => {
        const maskOptions = {
            criteria: 'not between',
            value: [4, 6],
        };

        expect(jSuites.validations.textLength(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(null, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(true, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(false, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(0, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(1, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(-3, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength({}, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength([], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength({ a: 'abc' }, maskOptions)).toBe(false)
        expect(jSuites.validations.textLength(['abc'], maskOptions)).toBe(false)

        expect(jSuites.validations.textLength('', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('abc', maskOptions)).toBe(true)
        expect(jSuites.validations.textLength('    ', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('test?', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('test??', maskOptions)).toBe(false)
        expect(jSuites.validations.textLength('?test??', maskOptions)).toBe(true)
    });

    test('Date', () => {
        expect(jSuites.validations.date(undefined)).toBe(false)
        expect(jSuites.validations.date(null)).toBe(false)
        expect(jSuites.validations.date(NaN)).toBe(false)
        expect(jSuites.validations.date(true)).toBe(false)
        expect(jSuites.validations.date(false)).toBe(false)
        expect(jSuites.validations.date('')).toBe(false)
        expect(jSuites.validations.date('   ')).toBe(false)
        expect(jSuites.validations.date({})).toBe(false)
        expect(jSuites.validations.date([])).toBe(false)

        expect(jSuites.validations.date({ a: '2022-11-01' })).toBe(false)
        expect(jSuites.validations.date(['2022-11-01'])).toBe(false)

        expect(jSuites.validations.date('2022-11-01')).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime())).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01'))).toBe(true)
    });

    test('Date with criteria "valid date"', () => {
        const maskOptions = {
            criteria: 'valid date',
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-11-01' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-11-01'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(true)
    });

    test('Date with criteria "="', () => {
        const maskOptions = {
            criteria: '=',
            value: ['2022-11-01']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-11-01' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-11-01'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(false)
    });

    test('Date with criteria "<"', () => {
        const maskOptions = {
            criteria: '<',
            value: ['2022-11-01']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-10-31' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-10-31'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(false)
    });

    test('Date with criteria ">"', () => {
        const maskOptions = {
            criteria: '>',
            value: ['2022-11-01']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-11-02' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-11-02'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-02'),getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(true)
    });

    test('Date with criteria "<="', () => {
        const maskOptions = {
            criteria: '<=',
            value: ['2022-11-01']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-10-31' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-10-31'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(false)

    });

    test('Date with criteria ">="', () => {
        const maskOptions = {
            criteria: '>=',
            value: ['2022-11-01']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-11-01' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-11-01'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-02').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(true)
    });

    test('Date with criteria "between"', () => {
        const maskOptions = {
            criteria: 'between',
            value: ['2022-11-01', '2022-11-03']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-11-01' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-11-01'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-02').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-03', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-03').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-11-03'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-04', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-04').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-04'), maskOptions)).toBe(false)
    });

    test('Date with criteria "not between"', () => {
        const maskOptions = {
            criteria: 'not between',
            value: ['2022-11-01', '2022-11-03']
        };

        expect(jSuites.validations.date(undefined, maskOptions)).toBe(false)
        expect(jSuites.validations.date(null, maskOptions)).toBe(false)
        expect(jSuites.validations.date(NaN, maskOptions)).toBe(false)
        expect(jSuites.validations.date(true, maskOptions)).toBe(false)
        expect(jSuites.validations.date(false, maskOptions)).toBe(false)
        expect(jSuites.validations.date('', maskOptions)).toBe(false)
        expect(jSuites.validations.date('   ', maskOptions)).toBe(false)
        expect(jSuites.validations.date({}, maskOptions)).toBe(false)
        expect(jSuites.validations.date([], maskOptions)).toBe(false)

        expect(jSuites.validations.date({ a: '2022-10-31' }, maskOptions)).toBe(false)
        expect(jSuites.validations.date(['2022-10-31'], maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-10-31', maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-10-31').getTime(), maskOptions)).toBe(true)
        expect(jSuites.validations.date(new Date('2022-10-31'), maskOptions)).toBe(true)

        expect(jSuites.validations.date('2022-11-01', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-01').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-01'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-02', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-02'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-03', maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-03').getTime(), maskOptions)).toBe(false)
        expect(jSuites.validations.date(new Date('2022-11-03'), maskOptions)).toBe(false)

        expect(jSuites.validations.date('2022-11-04', maskOptions)).toBe(true)
        expect(jSuites.validations.date(1667520000000, maskOptions)).toBe(true)
    });

    test('jSuites.mask', () => {
        expect(jSuites.validation(0.123, '$ #.##0,00')).toBe('$ 0,123');
    });
})
