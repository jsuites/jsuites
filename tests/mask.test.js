const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {
    describe('basic mask parsing', () => {
        test('decimal masks', () => {
            expect(jSuites.mask('123.456789', { mask: '00.00' }, true).value).toEqual('123.456789');
            expect(jSuites.mask('123.456', { mask: '00.0' }, true).value).toEqual('123.456');
            expect(jSuites.mask('123.456789', { mask: '00,00' }, true).value).toEqual('123,456789');
            expect(jSuites.mask('-123.456', { mask: '00,0' }, true).value).toEqual('-123,456');
        });

        test('currency masks', () => {
            expect(jSuites.mask("12345.678", { mask: '#,##0.00' }, true).value).toEqual("12,345.678");
            expect(jSuites.mask("54321", { mask: '#,##0' }, true).value).toEqual("54,321");
            expect(jSuites.mask("987654.321", { mask: '#.##0,00' }, true).value).toEqual("987.654,321");
            expect(jSuites.mask("-11873987654.321", { mask: '#,##0.00' }, true).value).toEqual("-11,873,987,654.321");
        });

        test('scientific notation', () => {
            expect(jSuites.mask("11873987654", { mask: '0.00E+00' }, true).value).toEqual("11873987654");
        });
    });

    describe('fullmask', () => {
        test('integers', () => {
            expect(jSuites.mask("0", { mask: '0' }, true).value).toEqual("0");
            expect(jSuites.mask("100", { mask: '0' }, true).value).toEqual("100");
            expect(jSuites.mask("-100", { mask: '0' }, true).value).toEqual("-100");
            expect(jSuites.mask("123456789", { mask: '0' }, true).value).toEqual("123456789");
        });

        test('number with text', () => {
            expect(jSuites.mask("24", { mask: '0 liters' }, true).value).toEqual("24 liters");
            expect(jSuites.mask("875799.99", { mask: '$ 0.00' }, true).value).toEqual("$ 875799.99");
            expect(jSuites.mask("875799.99", { mask: '$ #,##0.00' }, true).value).toEqual("$ 875,799.99");
        });

        test('date formats', () => {
            expect(jSuites.mask("20091999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("20 Sep 1999", { mask: 'dd/mmm/yyyy' }, true).value).toEqual("20/Sep/1999");
            expect(jSuites.mask("20 September 1999", { mask: 'dd mmmm yyyy' }, true).value).toEqual("20 September 1999");
            expect(jSuites.mask("19990920", { mask: 'yyyy/mm/dd' }, true).value).toEqual("1999/09/20");
            expect(jSuites.mask("Sep 20 1999", { mask: 'mmm/dd/yyyy' }, true).value).toEqual("Sep/20/1999");
        });
    });

    describe('input event handling', () => {
        // Helper function to create and test input
        const testInputMask = (mask, testCases) => {
            document.body.innerHTML = `<input id="test-input" type="text" data-mask="${mask}">`;
            const input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            testCases.forEach(({ input: inputValue, expected }) => {
                input.value = inputValue;
                input.dispatchEvent(event);
                expect(input.value).toEqual(expected);
            });
        };

        test('decimal format (0.00)', () => {
            testInputMask('0.00', [
                { input: '7581003', expected: '7581003' },
                { input: '0', expected: '0' },
                { input: '00', expected: '0' },
                { input: '01', expected: '1' },
                { input: '7581003.00003', expected: '7581003.00003' },
                { input: '-7581003.00003', expected: '-7581003.00003' },
                { input: '123abcde', expected: '123' },
                { input: '', expected: '' },
                { input: '!@#$%^&*', expected: '' }
            ]);
        });

        test('european decimal format (0,00)', () => {
            testInputMask('0,00', [
                { input: '7581003', expected: '7581003' },
                { input: '0', expected: '0' },
                { input: '7581003,00003', expected: '7581003,00003' },
                { input: '-7581003,00003', expected: '-7581003,00003' }
            ]);
        });

        test('percentage format (0%)', () => {
            testInputMask('0%', [
                { input: '0', expected: '0%' },
                { input: '', expected: '' },
                { input: '54', expected: '54%' },
                { input: '100.0', expected: '100.0%' },
                { input: '123abcde', expected: '123%' },
                { input: '!@#$%^&*', expected: '' }
            ]);
        });

        test('currency format (#,##0.00)', () => {
            testInputMask('#,##0.00', [
                { input: '7581003', expected: '7,581,003' },
                { input: '75810.03', expected: '75,810.03' },
                { input: '1234567890.99', expected: '1,234,567,890.99' },
                { input: '100', expected: '100' },
                { input: '', expected: '' },
                { input: '0', expected: '0' },
                { input: '-5000.75', expected: '-5,000.75' },
                { input: 'abcd', expected: '' }
            ]);
        });

        test('european currency format (#.##0,00)', () => {
            testInputMask('#.##0,00', [
                { input: '7581003', expected: '7.581.003' },
                { input: '75810,03', expected: '75.810,03' },
                { input: '1234567890,99', expected: '1.234.567.890,99' },
                { input: '-5000,75', expected: '-5.000,75' }
            ]);
        });

        test('day format (dd)', () => {
            testInputMask('dd', [
                { input: '0', expected: '0' },
                { input: '3', expected: '3' },
                { input: '4', expected: '04' },
                { input: '31', expected: '31' },
                { input: '32', expected: '3' },
                { input: 'abcd', expected: '' }
            ]);
        });

        test('day name format (ddd)', () => {
            testInputMask('ddd', [
                { input: '0', expected: '' },
                { input: 'm', expected: 'Mon' },
                { input: 'tu', expected: 'Tue' },
                { input: 'w', expected: 'Wed' },
                { input: 'sa', expected: 'Sat' },
                { input: 'abcdeghijklnopqruvxyz', expected: '' }
            ]);
        });

        test('full day name format (dddd)', () => {
            testInputMask('dddd', [
                { input: 'm', expected: 'Monday' },
                { input: 'tu', expected: 'Tuesday' },
                { input: 'f', expected: 'Friday' },
                { input: 'sa', expected: 'Saturday' }
            ]);
        });

        test('month format (mm)', () => {
            testInputMask('mm', [
                { input: '0', expected: '0' },
                { input: '1', expected: '1' },
                { input: '2', expected: '02' },
                { input: '12', expected: '12' },
                { input: '13', expected: '1' },
                { input: 'abcd', expected: '' }
            ]);
        });

        test('month name format (mmm)', () => {
            testInputMask('mmm', [
                { input: '0', expected: '' },
                { input: 'ja', expected: 'Jan' },
                { input: 'f', expected: 'Feb' },
                { input: 'mar', expected: 'Mar' },
                { input: 's', expected: 'Sep' },
                { input: 'd', expected: 'Dec' }
            ]);
        });

        test('full month name format (mmmm)', () => {
            testInputMask('mmmm', [
                { input: 'ja', expected: 'January' },
                { input: 'f', expected: 'February' },
                { input: 'mar', expected: 'March' },
                { input: 'ap', expected: 'April' },
                { input: 's', expected: 'September' }
            ]);
        });

        test('year formats', () => {
            testInputMask('yy', [
                { input: '0', expected: '0' },
                { input: '99', expected: '99' },
                { input: '100', expected: '10' },
                { input: '2024', expected: '20' }
            ]);

            testInputMask('yyyy', [
                { input: '1999', expected: '1999' },
                { input: '2024', expected: '2024' },
                { input: '20245', expected: '2024' },
                { input: 'abcd', expected: '' }
            ]);
        });

        test('time formats', () => {
            testInputMask('hh', [
                { input: '0', expected: '0' },
                { input: '3', expected: '03' },
                { input: '12', expected: '12' }
            ]);

            testInputMask('mi', [
                { input: '0', expected: '0' },
                { input: '5', expected: '5' },
                { input: '6', expected: '06' },
                { input: '59', expected: '59' }
            ]);

            testInputMask('AM/PM', [
                { input: '0', expected: '' },
                { input: 'AM', expected: 'AM' },
                { input: 'PM', expected: 'PM' },
                { input: 'BCDEFGHIJKLNOQRSTUVWXYZ', expected: '' }
            ]);
        });

        test('mixed format ($ #,##0.00)', () => {
            testInputMask('$ #,##0.00', [
                { input: '7581003', expected: '$ 7,581,003' },
                { input: '75810.03', expected: '$ 75,810.03' },
                { input: '100.5', expected: '$ 100.5' },
                { input: '', expected: '' },
                { input: '-5000.75', expected: '$ -5,000.75' },
                { input: '!@#$%^&*', expected: '$ ' }
            ]);
        });

        test('date format (dd/mm/yyyy)', () => {
            testInputMask('dd/mm/yyyy', [
                { input: '20091999', expected: '20/09/1999' },
                { input: '992003', expected: '09/09/2003' },
                { input: '9122003', expected: '09/12/2003' },
                { input: '31022005', expected: '31/02/2005' }
            ]);
        });
    });

    describe('Excel-specific masking features', () => {
        test('conditional formatting with brackets', () => {
            // Excel supports conditional formatting with comparison operators in brackets
            expect(jSuites.mask.render(500, { mask: '[>1000]#,##0.00"K";#,##0.00' })).toBe('500.00');
            expect(jSuites.mask.render(1500, { mask: '[>1000]#,##0.00"K";#,##0.00' })).toBe('1,500.00K');
            expect(jSuites.mask.render(-500, { mask: '[<0][Red](#,##0.00);#,##0.00' })).toBe('(500.00)');
            expect(jSuites.mask.render(500, { mask: '[<0][Red](#,##0.00);#,##0.00' })).toBe('500.00');

            // Test equality conditions
            expect(jSuites.mask.render(1, { mask: '[=1]"one";[=2]"two";#' })).toBe('one');
            expect(jSuites.mask.render(2, { mask: '[=1]"one";[=2]"two";#' })).toBe('two');
            expect(jSuites.mask.render(3, { mask: '[=1]"one";[=2]"two";#' })).toBe('3');
        });

        test('negative number formatting with brackets', () => {
            // Standard Excel negative number formats
            expect(jSuites.mask.render(-1234.56, { mask: '#,##0.00;(#,##0.00)' })).toBe('(1,234.56)');
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00;(#,##0.00)' })).toBe('1,234.56');
            expect(jSuites.mask.render(-1234.56, { mask: '#,##0.00;[Red](#,##0.00)' })).toBe('(1,234.56)');
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00_);[Red](#,##0.00)' })).toBe('1,234.56 ');

            // With alignment spacing for decimal alignment
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00_);[Red](#,##0.00)' })).toBe('1,234.56 ');
            expect(jSuites.mask.render(-1234.56, { mask: '#,##0.00_);[Red](#,##0.00)' })).toBe('(1,234.56)');
        });

        test('complex conditional number formats', () => {
            // Four-section format: positive;negative;zero;text
            expect(jSuites.mask.render(100, { mask: '#,##0.00;"negative";0.00;"text"' })).toBe('100.00');
            expect(jSuites.mask.render(-100, { mask: '#,##0.00;"negative";0.00;"text"' })).toBe('negative');
            expect(jSuites.mask.render(0, { mask: '#,##0.00;"negative";0.00;"text"' })).toBe('0.00');
            expect(jSuites.mask.render('hello', { mask: '#,##0.00;"negative";0.00;"@"' })).toBe('hello');

            // Conditional with color and text combinations
            expect(jSuites.mask.render(5, { mask: '[>10][Green]#,##0"+++";[Red]#,##0"---"' })).toBe('5---');
            expect(jSuites.mask.render(15, { mask: '[>10][Green]#,##0"+++";[Red]#,##0"---"' })).toBe('15+++');
        });

        test('text and number combination masks', () => {
            // Escaping characters with backslash
            expect(jSuites.mask.render(1234, { mask: '#,##0kg' })).toBe('1,234kg');
            expect(jSuites.mask.render(50, { mask: '0%' })).toBe('50%');
            expect(jSuites.mask.render(25, { mask: '0"°C"' })).toBe('25°C');

            // Plural/singular text based on value
            expect(jSuites.mask.render(1, { mask: '[=1]0" mile";0" miles"' })).toBe('1 mile');
            expect(jSuites.mask.render(2, { mask: '[=1]0" mile";0" miles"' })).toBe('2 miles');
            expect(jSuites.mask.render(0, { mask: '[=1]0" mile";0" miles"' })).toBe('0 miles');
        });

        test('large number scaling formats', () => {
            // Thousands scaling
            expect(jSuites.mask.render(1500, { mask: '#,##0,,"M"' })).toBe('0M');
            expect(jSuites.mask.render(1500000, { mask: '#,##0,,"M"' })).toBe('2M');
            expect(jSuites.mask.render(1500000, { mask: '#,##0.0,,"M"' })).toBe('1.5M');

            // Millions scaling
            expect(jSuites.mask.render(1500000000, { mask: '#,##0,,,"B"' })).toBe('2B');
            expect(jSuites.mask.render(1500000000, { mask: '#,##0.0,,,"B"' })).toBe('1.5B');
        });

        test('advanced date formats with conditions', () => {
            // Conditional date formatting
            expect(jSuites.mask.render('2023-01-01', { mask: '[=TODAY()]"Today";DD/MM/YYYY' })).toBe('01/01/2023');

            // Custom date formats with text
            expect(jSuites.mask.render('2023-12-25', { mask: 'DD"th of "MMMM", "YYYY' })).toBe('25th of December, 2023');
            expect(jSuites.mask.render('2023-01-01', { mask: 'DDD", the "DD"st of "MMMM' })).toBe('Sun, the 01st of January');
        });

        test('input validation with bracket formats', () => {
            testInputMask('[h]:mm:ss', [
                { input: '25:30:45', expected: '25:30:45' },
                { input: '100:00:00', expected: '100:00:00' },
                { input: '0:15:30', expected: '0:15:30' }
            ]);

            // Test that regular time format caps at 24 hours
            testInputMask('hh:mm:ss', [
                { input: '25:30:45', expected: '01:30:45' }, // Should wrap to next day
                { input: '23:59:59', expected: '23:59:59' }
            ]);
        });

        test('accounting and financial formats', () => {
            // Standard accounting format with space alignment
            expect(jSuites.mask.render(1234.56, { mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' })).toBe(' $ 1,234.56 ');
            expect(jSuites.mask.render(-1234.56, { mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' })).toBe(' $ (1,234.56)');
            expect(jSuites.mask.render(0, { mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' })).toBe(' $ -   ');

            // Currency with different negative formats
            expect(jSuites.mask.render(-50.25, { mask: '$#,##0.00;-$#,##0.00;$0.00' })).toBe('-$50.25');
            expect(jSuites.mask.render(-50.25, { mask: '$#,##0.00;($#,##0.00);$0.00' })).toBe('($50.25)');
        });
    });

    describe('render method', () => {
        test('currency rendering', () => {
            expect(jSuites.mask.render(-13552.94219, { mask: '# ##0'}, true)).toBe('-13 553');
            expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
            expect(jSuites.mask.render(123.4, { mask: '#,##0.0000' }, true)).toBe('123.4000');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '#,##0' }, true)).toBe('79,998,007,920,000,000,000,000');
        });

        test('number rendering', () => {
            expect(jSuites.mask.render(1.005, { mask: '0.00' }, true)).toBe('1.01');
            expect(jSuites.mask.render(11.45, { mask: '0.0' }, true)).toBe('11.5');
            expect(jSuites.mask.render(-11.45, { mask: '0.0' }, true)).toBe('-11.5');
            expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
        });

        test('scientific notation rendering', () => {
            expect(jSuites.mask.render(12345678900, { mask: '0.00E+00' }, true)).toBe('1.23e+10');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('7.9998e+22');
            expect(jSuites.mask.render(-79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('-7.9998e+22');
        });

        test('percentage rendering', () => {
            expect(jSuites.mask.render('100%', { mask: '0%' })).toEqual('100%');
            expect(jSuites.mask.render(2.2, { mask: '0.00%' })).toEqual('220%');
            expect(jSuites.mask.render(0.1, { mask: '0%' }, true)).toBe('10%');
        });

        test('date rendering', () => {
            expect(jSuites.mask.render('2023-01-15', { mask: 'YYYY-MM-DD' })).toBe('2023-01-15');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD/MM/YYYY' })).toBe('15/01/2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD MMM YYYY' })).toBe('15 Jan 2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD MMMM YYYY' })).toBe('15 January 2023');
            expect(jSuites.mask.render(new Date('2023-01-15'), { mask: 'DD/MM/YYYY' })).toBe('15/01/2023');
        });

        test('time rendering', () => {
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM:SS' })).toBe('14:30:45');
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM:SS AM/PM' })).toBe('02:30:45 PM');
            expect(jSuites.mask.render('00:30:45', { mask: 'HH:MM:SS AM/PM' })).toBe('12:30:45 AM');
            expect(jSuites.mask.render('09:30:45', { mask: 'H:MM:SS' })).toBe('9:30:45');
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'HH:MM:SS' })).toBe('14:30:45');

            // Excel-like bracket time formats (duration over 24 hours)
            expect(jSuites.mask.render('33:20', { mask: 'H:MM' })).toBe('9:20');
            expect(jSuites.mask.render('33:20', { mask: '[h]:mm' })).toBe('33:20');
            expect(jSuites.mask.render('25:30:45', { mask: '[h]:mm:ss' })).toBe('25:30:45');

            // Excel bracket formats for minutes and seconds over normal limits
            expect(jSuites.mask.render('150:30', { mask: '[mm]:ss' })).toBe('150:30');
            expect(jSuites.mask.render('3661', { mask: '[ss]' })).toBe('3661'); // Total seconds
        });

        test('datetime rendering', () => {
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'YYYY-MM-DD HH:MM:SS' })).toBe('2023-01-15 14:30:45');
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'DD/MM/YYYY HH:MM' })).toBe('15/01/2023 14:30');
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'DD/MM/YYYY HH:MM:SS' })).toBe('15/01/2023 14:30:45');
        });
    });
});
