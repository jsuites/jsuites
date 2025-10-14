const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {

    describe('Mask', () => {
        test('integers', () => {
            expect(jSuites.mask("0", { mask: '0' }, true).value).toEqual("0");
            expect(jSuites.mask("100", { mask: '0' }, true).value).toEqual("100");
            expect(jSuites.mask("-100", { mask: '0' }, true).value).toEqual("-100");
            expect(jSuites.mask("123456789", { mask: '0' }, true).value).toEqual("123456789");
        });

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

    describe('Render without full mask option', () => {
        test('large number scaling formats', () => {
            // Thousands scaling
            expect(jSuites.mask.render('1500M', { mask: '#,##0,,"M"' })).toBe('1,500M');
            expect(jSuites.mask.render(1500, { mask: '#,##0,,"M"' })).toBe('0.0015M');
            // Millions scaling
            expect(jSuites.mask.render(1500, { mask: '#,##0,,,"B"' })).toBe('0.0000015B');
        });
    });

    describe('Render with full mask option', () => {
        test('conditional formatting with brackets', () => {
            // Excel supports conditional formatting with comparison operators in brackets
            //expect(jSuites.mask.render(500, { mask: '[>1000]#,##0.00"K";#,##0.00' })).toBe('500.00');
            //expect(jSuites.mask.render(1500, { mask: '[>1000]#,##0.00"K";#,##0.00' })).toBe('1,500.00K');
            //expect(jSuites.mask.render(-500, { mask: '[<0][Red](#,##0.00);#,##0.00' })).toBe('(500.00)');
            //expect(jSuites.mask.render(500, { mask: '[<0][Red](#,##0.00);#,##0.00' })).toBe('500.00');

            // Test equality conditions
            //expect(jSuites.mask.render(1, { mask: '[=1]"one";[=2]"two";#' })).toBe('one');
            //expect(jSuites.mask.render(2, { mask: '[=1]"one";[=2]"two";#' })).toBe('two');
            //expect(jSuites.mask.render(3, { mask: '[=1]"one";[=2]"two";#' })).toBe('3');
        });

        test('negative number formatting with brackets', () => {
            expect(jSuites.mask.render(-50.25, { mask: '(0)' }, true)).toBe('-(50)');
            expect(jSuites.mask.render(-100000, { mask: '_(0_)' }, true)).toBe(' -100000 ');

            // Standard Excel negative number formats
            expect(jSuites.mask.render(-1234.56, { mask: '#,##0.00;(#,##0.00)' }, true)).toBe('(1,234.56)');
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00;(#,##0.00)' }, true)).toBe('1,234.56');
            expect(jSuites.mask.render(-1234.56, { mask: '#,##0.00;[Red](#,##0.00)' }, true)).toBe('(1,234.56)');
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00_);[Red](#,##0.00)' }, true)).toBe('1,234.56 ');

            // With alignment spacing for decimal alignment
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00_);[Red](#,##0.00)' }, true)).toBe('1,234.56 ');
            expect(jSuites.mask.render(-1234.56, { mask: '#,##0.00_);[Red](#,##0.00)' }, true)).toBe('(1,234.56)');
        });

        test('complex conditional number formats', () => {
            // Four-section format: positive;negative;zero;text
            expect(jSuites.mask.render(100, { mask: '#,##0.00;"negative";0.00;"text"' }, true)).toBe('100.00');
            expect(jSuites.mask.render(-100, { mask: '#,##0.00;"negative";0.00;"text"' }, true)).toBe('negative');
            expect(jSuites.mask.render(0, { mask: '#,##0.00;"negative";0.00;"text"' }, true)).toBe('0.00');
            expect(jSuites.mask.render('hello', { mask: '#,##0.00;"negative";0.00;"@"' }, true)).toBe('hello');

            // Conditional with color and text combinations
            //expect(jSuites.mask.render(5, { mask: '[>10][Green]#,##0"+++";[Red]#,##0"---"' })).toBe('5---');
            //expect(jSuites.mask.render(15, { mask: '[>10][Green]#,##0"+++";[Red]#,##0"---"' })).toBe('15+++');
        });

        test('text and number combination masks', () => {
            // Escaping characters with backslash
            expect(jSuites.mask.render(1234, { mask: '#,##0kg' }, true)).toBe('1,234kg');
            expect(jSuites.mask.render(0.5, { mask: '0%' }, true)).toBe('50%');
            expect(jSuites.mask.render(25, { mask: '0"°C"' }, true)).toBe('25°C');

            // Plural/singular text based on value
            //expect(jSuites.mask.render(1, { mask: '[=1]0" mile";0" miles"' })).toBe('1 mile');
            //expect(jSuites.mask.render(2, { mask: '[=1]0" mile";0" miles"' })).toBe('2 miles');
            //expect(jSuites.mask.render(0, { mask: '[=1]0" mile";0" miles"' })).toBe('0 miles');
        });

        test('escaped characters in masks', () => {
            // Test that \d is treated as literal 'd', not as a datetime token using render
            expect(jSuites.mask.render(123, { mask: '\\d 0' }, true)).toBe('d 123');

            // Test with input processing
            expect(jSuites.mask('123', { mask: '\\d 0' }, true).value).toEqual('d 123');

            // Test other escaped characters
            expect(jSuites.mask.render(123, { mask: '\\A 0' }, true)).toBe('A 123');
            expect(jSuites.mask('123', { mask: '\\A 0' }, true).value).toEqual('A 123');
        });

        test('large number scaling formats', () => {
            // Thousands scaling
            expect(jSuites.mask.render('1500M', { mask: '#,##0,,"M"' }, true)).toBe('1,500M');
            expect(jSuites.mask.render(1500, { mask: '#,##0,,"M"' }, true)).toBe('0M');
            expect(jSuites.mask.render(1500000, { mask: '#,##0,,"M"' }, true)).toBe('2M');
            expect(jSuites.mask.render(1500000, { mask: '#,##0.0,,"M"' }, true)).toBe('1.5M');

            // Millions scaling
            expect(jSuites.mask.render(1500000000, { mask: '#,##0,,,"B"' }, true)).toBe('2B');
            expect(jSuites.mask.render(1500000000, { mask: '#,##0.0,,,"B"' }, true)).toBe('1.5B');
        });

        test('advanced date formats with conditions', () => {
            // Conditional date formatting
            //expect(jSuites.mask.render('2023-01-01', { mask: '[=TODAY()]"Today";DD/MM/YYYY' })).toBe('01/01/2023');

            // Custom date formats with text
            //expect(jSuites.mask.render('2023-12-25', { mask: 'DD"th of "MMMM", "YYYY' }, true)).toBe('25th of December, 2023');
            //expect(jSuites.mask.render('2023-01-01', { mask: 'DDD", the "DD"st of "MMMM' }, true)).toBe('Sun, the 01st of January');
        });

        test('accounting and financial formats', () => {
            // Standard accounting format with space alignment
            expect(jSuites.mask.render(1234.56, { mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' }, true)).toBe(' $ 1,234.56 ');
            expect(jSuites.mask.render(-1234.56, { mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' }, true)).toBe(' $ (1,234.56)');
            expect(jSuites.mask.render(0, { mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' }, true)).toBe(' $ -');

            // Currency with different negative formats
            expect(jSuites.mask.render(-50.25, { mask: '$#,##0.00;-$#,##0.00;$0.00' }, true)).toBe('-$50.25');
            expect(jSuites.mask.render(-50.25, { mask: '$#,##0.00;($#,##0.00);$0.00' }, true)).toBe('($50.25)');
        });

        test('fraction rendering', () => {
            // Basic fractions with flexible denominators
            expect(jSuites.mask.render(0.5, { mask: '# ?/?' }, true)).toBe('1/2');
            expect(jSuites.mask.render(0.25, { mask: '# ?/?' }, true)).toBe('1/4');
            expect(jSuites.mask.render(0.75, { mask: '# ?/?' }, true)).toBe('3/4');
            expect(jSuites.mask.render(0.3, { mask: '# ?/?' }, true)).toBe('2/7');

            // Two-digit denominators
            expect(jSuites.mask.render(0.33, { mask: '# ??/??' }, true)).toBe('1/3');
            expect(jSuites.mask.render(0.125, { mask: '# ??/??' }, true)).toBe('1/8');
            expect(jSuites.mask.render(0.375, { mask: '# ??/??' }, true)).toBe('3/8');

            // Fixed denominator - eighths
            expect(jSuites.mask.render(0.25, { mask: '# ?/8' }, true)).toBe('2/8');
            expect(jSuites.mask.render(0.125, { mask: '# ?/8' }, true)).toBe('1/8');
            expect(jSuites.mask.render(0.375, { mask: '# ?/8' }, true)).toBe('3/8');
            expect(jSuites.mask.render(0.875, { mask: '# ?/8' }, true)).toBe('7/8');

            // Fixed denominator - sixteenths
            expect(jSuites.mask.render(0.3125, { mask: '# ??/16' }, true)).toBe('5/16');
            expect(jSuites.mask.render(0.0625, { mask: '# ??/16' }, true)).toBe('1/16');
            expect(jSuites.mask.render(0.9375, { mask: '# ??/16' }, true)).toBe('15/16');
            expect(jSuites.mask.render(0.25, { mask: '# ??/16' }, true)).toBe('4/16');

            // Mixed numbers (whole + fraction)
            expect(jSuites.mask.render(1.5, { mask: '# ?/?' }, true)).toBe('1 1/2');
            expect(jSuites.mask.render(2.25, { mask: '# ?/?' }, true)).toBe('2 1/4');
            expect(jSuites.mask.render(1.125, { mask: '# ?/8' }, true)).toBe('1 1/8');
            expect(jSuites.mask.render(3.75, { mask: '# ??/16' }, true)).toBe('3 12/16');

            // Whole numbers
            expect(jSuites.mask.render(2, { mask: '# ?/?' }, true)).toBe('2');
            expect(jSuites.mask.render(5, { mask: '# ?/8' }, true)).toBe('5');
            expect(jSuites.mask.render(10, { mask: '# ??/??' }, true)).toBe('10');

            // Zero
            expect(jSuites.mask.render(0, { mask: '# ?/?' }, true)).toBe('0');
            expect(jSuites.mask.render(0, { mask: '# ?/8' }, true)).toBe('0');

            // Negative numbers
            expect(jSuites.mask.render(-0.5, { mask: '# ?/?' }, true)).toBe('-1/2');
            expect(jSuites.mask.render(-1.25, { mask: '# ?/8' }, true)).toBe('-1 2/8');
            expect(jSuites.mask.render(-2.75, { mask: '# ??/16' }, true)).toBe('-2 12/16');

            // Edge cases - very small fractions
            expect(jSuites.mask.render(0.01, { mask: '# ??/??' }, true)).toBe('0');
            expect(jSuites.mask.render(0.99, { mask: '# ??/??' }, true)).toBe('98/99');

            // Common decimal conversions
            expect(jSuites.mask.render(0.333, { mask: '# ?/?' }, true)).toBe('1/3');
            expect(jSuites.mask.render(0.667, { mask: '# ?/?' }, true)).toBe('2/3');
            expect(jSuites.mask.render(0.2, { mask: '# ?/?' }, true)).toBe('1/5');
            expect(jSuites.mask.render(0.6, { mask: '# ?/?' }, true)).toBe('3/5');

            // Fixed denominator with common fractions
            expect(jSuites.mask.render(0.5, { mask: '# ??/32' }, true)).toBe('16/32');
            expect(jSuites.mask.render(0.25, { mask: '# ??/32' }, true)).toBe('8/32');
            expect(jSuites.mask.render(0.75, { mask: '# ??/32' }, true)).toBe('24/32');

            // Rounding scenarios
            expect(jSuites.mask.render(0.24, { mask: '# ?/8' }, true)).toBe('2/8');
            expect(jSuites.mask.render(0.26, { mask: '# ?/8' }, true)).toBe('2/8');
            expect(jSuites.mask.render(0.37, { mask: '# ?/8' }, true)).toBe('3/8');
            expect(jSuites.mask.render(0.38, { mask: '# ?/8' }, true)).toBe('3/8');

            // Format without space
            expect(jSuites.mask.render(1.5, { mask: '?/?' }, true)).toBe('3/2');
            expect(jSuites.mask.render(2.25, { mask: '?/?' }, true)).toBe('9/4');
            expect(jSuites.mask.render(1.25, { mask: '?/8' }, true)).toBe('10/8');

            // Unusual denominators
            expect(jSuites.mask.render(0.111111, { mask: '# ?/9' }, true)).toBe('1/9');
            expect(jSuites.mask.render(0.142857, { mask: '# ?/7' }, true)).toBe('1/7');
            expect(jSuites.mask.render(0.090909, { mask: '# ??/11' }, true)).toBe('1/11');
            expect(jSuites.mask.render(0.083333, { mask: '# ??/12' }, true)).toBe('1/12');

            // Large denominators
            expect(jSuites.mask.render(0.01, { mask: '# ??/100' }, true)).toBe('1/100');
            expect(jSuites.mask.render(0.99, { mask: '# ??/100' }, true)).toBe('99/100');
            expect(jSuites.mask.render(1.01, { mask: '# ??/100' }, true)).toBe('1 1/100');

            // Values close to 1
            expect(jSuites.mask.render(0.999, { mask: '# ??/??' }, true)).toBe('1');
            expect(jSuites.mask.render(0.9999, { mask: '# ??/??' }, true)).toBe('1');
            expect(jSuites.mask.render(1.001, { mask: '# ??/??' }, true)).toBe('1');

            // Very small fraction handling
            expect(jSuites.mask.render(0.0001, { mask: '# ??/??' }, true)).toBe('0');
            expect(jSuites.mask.render(0.00001, { mask: '# ??/??' }, true)).toBe('0');

            // Large numbers with fractions
            expect(jSuites.mask.render(100.5, { mask: '# ??/??' }, true)).toBe('100 1/2');
            expect(jSuites.mask.render(999.25, { mask: '# ?/8' }, true)).toBe('999 2/8');

            // Different space formatting
            expect(jSuites.mask.render(1.5, { mask: '#  ??/??' }, true)).toBe('1 1/2');
        });

        test('currency rendering', () => {
            expect(jSuites.mask.render(-13552.94219, { mask: '# ##0' }, true)).toBe('-13 553');
            expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
            expect(jSuites.mask.render(123.4, { mask: '#,##0.0000' }, true)).toBe('123.4000');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '#,##0' }, true)).toBe('79,998,007,920,000,000,000,000');
        });

        test('number rendering', () => {
            expect(jSuites.mask.render(1.005, { mask: '0.00' }, true)).toBe('1.01');
            expect(jSuites.mask.render(11.45, { mask: '0.0' }, true)).toBe('11.5');
            expect(jSuites.mask.render(-11.45, { mask: '0.0' }, true)).toBe('-11.5');
            expect(jSuites.mask.render(123, { mask: '00000' }, true)).toBe('00123');
        });

        test('scientific notation rendering', () => {
            expect(jSuites.mask.render(12345678900, { mask: '0.00E+00' }, true)).toBe('1.23e+10');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('7.9998e+22');
            expect(jSuites.mask.render(-79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('-7.9998e+22');
        });

        test('percentage rendering', () => {
            expect(jSuites.mask.render('100%', { mask: '0%' }, true)).toEqual('100%');
            expect(jSuites.mask.render('2.2%', { mask: '0.00%' }, true)).toEqual('2.20%');
            expect(jSuites.mask.render(2.2, { mask: '0.00%' }, true)).toEqual('220.00%');
            expect(jSuites.mask.render(0.1, { mask: '0%' }, true)).toBe('10%');
            expect(jSuites.mask.render(1, { mask: '0%' }, true)).toBe('100%');
        });

        test('date rendering', () => {
            expect(jSuites.mask.render('2023-01-15', { mask: 'YYYY-MM-DD' }, true)).toBe('2023-01-15');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD/MM/YYYY' }, true)).toBe('15/01/2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD MMM YYYY' }, true)).toBe('15 Jan 2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD MMMM YYYY' }, true)).toBe('15 January 2023');
            expect(jSuites.mask.render(new Date('2023-01-15'), { mask: 'DD/MM/YYYY' }, true)).toBe('15/01/2023');

            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'YYYY-MM-DD HH:MM:SS' }, true)).toBe('2023-01-15 14:30:45');
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'DD/MM/YYYY HH:MM' }, true)).toBe('15/01/2023 14:30');
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'DD/MM/YYYY HH:MM:SS' }, true)).toBe('15/01/2023 14:30:45');

            expect(jSuites.mask.render(45000, { mask: 'DD/MM/YYYY' }, true)).toBe('15/03/2023');
            expect(jSuites.mask.render('45000', { mask: 'DD/MM/YYYY' }, true)).toBe('15/03/2023');
        });

        test('time rendering', () => {
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM:SS' }, true)).toBe('14:30:45');
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM:SS AM/PM' }, true)).toBe('02:30:45 PM');
            expect(jSuites.mask.render('00:30:45', { mask: 'HH:MM:SS AM/PM' }, true)).toBe('12:30:45 AM');
            expect(jSuites.mask.render('09:30:45', { mask: 'H:MM:SS' }, true)).toBe('9:30:45');
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'HH:MM:SS' }, true)).toBe('14:30:45');

            // Excel-like bracket time formats (duration over 24 hours)
            expect(jSuites.mask.render('33:20', { mask: 'H:MM' }, true)).toBe('9:20');
            expect(jSuites.mask.render('33:20', { mask: '[h]:mm' }, true)).toBe('33:20');
            expect(jSuites.mask.render('25:30:45', { mask: '[h]:mm:ss' }, true)).toBe('25:30:45');

            // Excel bracket formats for minutes and seconds over normal limits
            //expect(jSuites.mask.render('150:30', { mask: '[mm]:ss' })).toBe('150:30');
            //expect(jSuites.mask.render('3661', { mask: '[ss]' })).toBe('3661'); // Total seconds
        });


        test('should handle various time fractions accurately', () => {
            const testCases = [
                { excel: 44927.0, expectedHour: '00' }, // Midnight
                { excel: 44927.125, expectedHour: '03' }, // 3 AM (0.125 = 3/24)
                { excel: 44927.25, expectedHour: '06' }, // 6 AM
                { excel: 44927.375, expectedHour: '09' }, // 9 AM
                { excel: 44927.5, expectedHour: '12' }, // Noon
                { excel: 44927.75, expectedHour: '18' }, // 6 PM
                { excel: 44927.958333, expectedHour: '23' } // 11 PM (23/24) - reduced precision
            ];

            testCases.forEach(testCase => {
                expect(jSuites.mask.render(testCase.excel, { mask: 'hh' }, true)).toBe(testCase.expectedHour);
            });
        });

    });

    describe('Auto casting', () => {
        // Dates
        test('should detect common date formats', () => {
            expect(jSuites.mask.autoCasting("25/12/2025")).toEqual({ mask: 'dd/mm/yyyy', value: 46016 });
            expect(jSuites.mask.autoCasting("12/25/2025")).toEqual({ mask: 'mm/dd/yyyy', value: 46016 });
            expect(jSuites.mask.autoCasting("2025-12-25")).toEqual({ mask: 'yyyy-mm-dd', value: 46016 });
        });

        test('should detect dates with month names', () => {
            expect(jSuites.mask.autoCasting("25 Dec 2025")).toEqual({ mask: 'dd mmm yyyy', value: 46016 });
            expect(jSuites.mask.autoCasting("December 25, 2025")).toEqual({ mask: 'mmmm dd, yyyy', value: 46016 });
        });

        test('should detect time formats', () => {
            expect(jSuites.mask.autoCasting("14:30:45")).toEqual({ mask: 'hh:mm:ss', value: 0.6046874999999999 }); // 14.5/24
            expect(jSuites.mask.autoCasting("2:30 PM")).toEqual({ mask: 'h:mm am/pm', value: 0.6041666666666666 }); // 14.5/24
        });

        test('should detect combined datetime formats', () => {
            expect(jSuites.mask.autoCasting("25/12/2025 14:30:00")).toEqual({ mask: 'dd/mm/yyyy hh:mm:ss', value: 46016.604166666664 });
        });

        // Currency
        test('should detect currency with dot separator', () => {
            expect(jSuites.mask.autoCasting("$ 1,234.56")).toEqual({ mask: '$ #,##0.00', value: 1234.56 });
        });

        test('should detect currency with comma separator (EU style)', () => {
            expect(jSuites.mask.autoCasting("€ 1.234,56")).toEqual({ mask: '€ #.##0,00', value: 1234.56 });
        });

        test('should detect negative currency', () => {
            expect(jSuites.mask.autoCasting("($5,000.75)")).toEqual({ mask: '($#,##0.00)', value: -5000.75 });
        });

        test('should detect currency with letter prefixes', () => {
            expect(jSuites.mask.autoCasting("R$ 1,500.00")).toEqual({ mask: 'R$ #,##0.00', value: 1500 });
            expect(jSuites.mask.autoCasting("US$ 100")).toEqual({ mask: 'US$ #,##0', value: 100 });
        });

        test('should reject letters without currency symbol', () => {
            expect(jSuites.mask.autoCasting("PL 1")).toBeNull();
            expect(jSuites.mask.autoCasting("BRL 1")).toBeNull();
            expect(jSuites.mask.autoCasting("USD 100")).toBeNull();
        });

        test('should reject letters after numbers', () => {
            expect(jSuites.mask.autoCasting("$111A")).toBeNull();
            expect(jSuites.mask.autoCasting("$ 100 USD")).toBeNull();
            expect(jSuites.mask.autoCasting("€ 50 EUR")).toBeNull();
        });

        test('should reject more than 2 letters before symbol', () => {
            expect(jSuites.mask.autoCasting("USA$ 100")).toBeNull();
            expect(jSuites.mask.autoCasting("BRL$ 50")).toBeNull();
        });

        test('should reject currency with no digits', () => {
            expect(jSuites.mask.autoCasting("$ ,.")).toBeNull();
            expect(jSuites.mask.autoCasting("€ ")).toBeNull();
            expect(jSuites.mask.autoCasting("$")).toBeNull();
        });

        test('should reject invalid characters in numbers', () => {
            expect(jSuites.mask.autoCasting("$000A")).toBeNull();
            expect(jSuites.mask.autoCasting("$ 1@2")).toBeNull();
        });

        // Percent
        test('should detect whole number percent', () => {
            expect(jSuites.mask.autoCasting("50%")).toEqual({ mask: '0%', value: 0.5 });
        });

        test('should detect decimal percent', () => {
            expect(jSuites.mask.autoCasting("25.5%")).toEqual({ mask: '0.0%', value: 0.255 });
        });

        // Fractions
        test('should detect simple fractions', () => {
            expect(jSuites.mask.autoCasting("1/2")).toEqual({ mask: '?/2', value: 0.5 });
            expect(jSuites.mask.autoCasting("3/4")).toEqual({ mask: '?/4', value: 0.75 });
        });

        test('should detect mixed numbers', () => {
            expect(jSuites.mask.autoCasting("1 1/2")).toEqual({ mask: '# ?/2', value: 1.5 });
            expect(jSuites.mask.autoCasting("2 3/8")).toEqual({ mask: '# ?/8', value: 2.375 });
        });

        // Scientific
        test('should detect scientific format', () => {
            expect(jSuites.mask.autoCasting("1.23e+10")).toEqual({ mask: '0.00E+00', value: 12300000000 });
            expect(jSuites.mask.autoCasting("-7.9998e+22")).toEqual({ mask: '0.0000E+00', value: -7.9998e+22 });
        });

        // Numeric
        test('should detect plain numbers', () => {
            expect(jSuites.mask.autoCasting("123456")).toEqual({ mask: '0', value: 123456 });
            expect(jSuites.mask.autoCasting("-789")).toEqual({ mask: '0', value: -789 });
        });

        test('should detect formatted numbers', () => {
            expect(jSuites.mask.autoCasting("1,000.25")).toEqual({ mask: '#,##0.00', value: 1000.25 });
            expect(jSuites.mask.autoCasting("1.000,25")).toEqual({ mask: '#.##0,00', value: 1000.25 });
        });

        test('should detect padded zeros', () => {
            expect(jSuites.mask.autoCasting("000123")).toEqual({ mask: '000000', value: 123 });
        });

        // General
        test('should return null for non-parsable input', () => {
            expect(jSuites.mask.autoCasting("hello world")).toBeNull();
            expect(jSuites.mask.autoCasting("**!@#")).toBeNull();
        });
    });

    describe('Extract', () => {
        test('Extract date value', () => {
            expect(jSuites.mask.extract('25/12/2025', { mask: 'dd/mm/yyyy' })).toBeCloseTo(46016);
            expect(jSuites.mask.extract('2025-12-25', { mask: 'yyyy-mm-dd' })).toBeCloseTo(46016);
            expect(jSuites.mask.extract('Dec 25, 2025', { mask: 'mmm dd, yyyy' })).toBeCloseTo(46016);
        });

        test('Extract time value', () => {
            expect(jSuites.mask.extract('14:30:00', { mask: 'hh:mm:ss' })).toBeCloseTo(0.60417, 4);
            expect(jSuites.mask.extract('2:30 PM', { mask: 'h:mm am/pm' })).toBeCloseTo(0.60417, 4);
        });

        test('Extract datetime value', () => {
            expect(jSuites.mask.extract('25/12/2025 14:30:00', { mask: 'dd/mm/yyyy hh:mm:ss' })).toBeCloseTo(46016.60417, 4);
        });

        test('Extract currency value', () => {
            expect(jSuites.mask.extract('$ 1,234.56', { mask: '$ #,##0.00' })).toBe(1234.56);
            expect(jSuites.mask.extract('R$ 1.234,56', { mask: 'R$ #.##0,00' })).toBe(1234.56);
            expect(jSuites.mask.extract('U$ 1.010', { mask: 'U$ #.##0' })).toBe(1010);
        });

        test('Extract percentage value', () => {
            expect(jSuites.mask.extract('25%', { mask: '0%' })).toBe(0.25);
            expect(jSuites.mask.extract('12,50%', { mask: '0,00%' })).toBe(0.125);
        });

        test('Extract scientific notation', () => {
            expect(jSuites.mask.extract('1.23E+3', { mask: '0.00E+00' })).toBe(1230);
            expect(jSuites.mask.extract('-2.5E6', { mask: '0.0E+00' })).toBe(-2500000);
        });

        test('Extract fraction values', () => {
            expect(jSuites.mask.extract('1 1/2', { mask: '# ?/?' })).toBe(1.5);
            expect(jSuites.mask.extract('3/4', { mask: '?/?' })).toBe(0.75);
        });

        test('Extract plain numbers', () => {
            expect(jSuites.mask.extract('1,234.56', { mask: '#,##0.00' })).toBe(1234.56);
            expect(jSuites.mask.extract('000123', { mask: '000000' })).toBe(123);
        });

        test('Extract as text', () => {
            expect(jSuites.mask.extract('Some text', { mask: '@' })).toBe('Some text');
        });
    })

    describe('Event handling', () => {
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
                { input: '32', expected: '03' },
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
                { input: '13', expected: '01' },
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


        test('input validation with bracket formats', () => {
            testInputMask('[h]:mm:ss', [
                { input: '25:30:45', expected: '25:30:45' },
                { input: '100:00:00', expected: '100:00:00' },
                { input: '0:15:30', expected: '0:15:30' }
            ]);

            // Test that regular time format caps at 24 hours
            testInputMask('hh:mm:ss', [
                { input: '23:59:59', expected: '23:59:59' }
            ]);
        });
    });

});

