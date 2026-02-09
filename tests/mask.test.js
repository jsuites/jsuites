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

        test('currency masks without space', () => {
            // $0 format without space should work
            expect(jSuites.mask.render(34, { mask: '$0' }, true)).toBe('$34');
            expect(jSuites.mask.render(-34, { mask: '$0' }, true)).toBe('-$34');

            // $0.00 format without space should work
            expect(jSuites.mask.render(34, { mask: '$0.00' }, true)).toBe('$34.00');
            expect(jSuites.mask.render(-34, { mask: '$0.00' }, true)).toBe('-$34.00');

            // With other currency symbols
            expect(jSuites.mask.render(34, { mask: '€0.00' }, true)).toBe('€34.00');
            expect(jSuites.mask.render(-34, { mask: '€0.00' }, true)).toBe('-€34.00');
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
            // Optional decimal places with # after mandatory 0
            expect(jSuites.mask.render(10023.134, { mask: '#.##0,0##' }, true)).toBe('10.023,134');
            // Optional decimal places with only # (no mandatory 0)
            expect(jSuites.mask.render(10023, { mask: '#.##0,##' }, true)).toBe('10.023');
            expect(jSuites.mask.render(10023.5, { mask: '#.##0,##' }, true)).toBe('10.023,5');
            // String input with comma decimal separator
            expect(jSuites.mask.render('10023,134', { mask: '#.##0,0##' }, true)).toBe('10.023,134');
        });

        test('optional decimal places edge cases', () => {
            // Number has more decimals than mask allows (10 decimals, mask has 3)
            expect(jSuites.mask.render(1234.1234567890, { mask: '#.##0,000' }, true)).toBe('1.234,123');
            expect(jSuites.mask.render(1234.1234567890, { mask: '#.##0,0##' }, true)).toBe('1.234,123');
            expect(jSuites.mask.render(1234.1234567890, { mask: '#.##0,###' }, true)).toBe('1.234,123');

            // Number has fewer decimals than mask allows (1 decimal, mask has up to 5)
            expect(jSuites.mask.render(1234.5, { mask: '#.##0,00000' }, true)).toBe('1.234,50000');
            expect(jSuites.mask.render(1234.5, { mask: '#.##0,00###' }, true)).toBe('1.234,50');
            expect(jSuites.mask.render(1234.5, { mask: '#.##0,0####' }, true)).toBe('1.234,5');
            expect(jSuites.mask.render(1234.5, { mask: '#.##0,#####' }, true)).toBe('1.234,5');

            // Number has exact decimals as mask (3 decimals, mask has 3)
            expect(jSuites.mask.render(1234.567, { mask: '#.##0,000' }, true)).toBe('1.234,567');
            expect(jSuites.mask.render(1234.567, { mask: '#.##0,0##' }, true)).toBe('1.234,567');
            expect(jSuites.mask.render(1234.567, { mask: '#.##0,###' }, true)).toBe('1.234,567');

            // No decimals in number, mask has optional decimals only
            expect(jSuites.mask.render(1234, { mask: '#.##0,###' }, true)).toBe('1.234');
            expect(jSuites.mask.render(1234, { mask: '#.##0,##' }, true)).toBe('1.234');
            expect(jSuites.mask.render(1234, { mask: '#.##0,#' }, true)).toBe('1.234');

            // No decimals in number, mask has mandatory decimals
            expect(jSuites.mask.render(1234, { mask: '#.##0,00' }, true)).toBe('1.234,00');
            expect(jSuites.mask.render(1234, { mask: '#.##0,000' }, true)).toBe('1.234,000');

            // Mixed mandatory and optional: 2 mandatory + 3 optional = up to 5
            expect(jSuites.mask.render(1234.1, { mask: '#.##0,00###' }, true)).toBe('1.234,10');
            expect(jSuites.mask.render(1234.12345, { mask: '#.##0,00###' }, true)).toBe('1.234,12345');
            expect(jSuites.mask.render(1234.123456789, { mask: '#.##0,00###' }, true)).toBe('1.234,12346');

            // String input with European decimal (strings are formatted as-is, not truncated)
            expect(jSuites.mask.render('1234,5678', { mask: '#.##0,00##' }, true)).toBe('1.234,5678');
            expect(jSuites.mask.render('1234,56789012', { mask: '#.##0,00##' }, true)).toBe('1.234,56789012');

            // US format (dot decimal, comma thousands)
            expect(jSuites.mask.render(1234.5678, { mask: '#,##0.00##' }, true)).toBe('1,234.5678');
            expect(jSuites.mask.render(1234.5, { mask: '#,##0.0###' }, true)).toBe('1,234.5');
            expect(jSuites.mask.render(1234, { mask: '#,##0.####' }, true)).toBe('1,234');
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

            // Various decimal places (1 to 6 decimals)
            expect(jSuites.mask.render(1234567, { mask: '0.0E+00' }, true)).toBe('1.2e+06');
            expect(jSuites.mask.render(1234567, { mask: '0.00E+00' }, true)).toBe('1.23e+06');
            expect(jSuites.mask.render(1234567, { mask: '0.000E+00' }, true)).toBe('1.235e+06');
            expect(jSuites.mask.render(1234567, { mask: '0.0000E+00' }, true)).toBe('1.2346e+06');
            expect(jSuites.mask.render(1234567, { mask: '0.00000E+00' }, true)).toBe('1.23457e+06');
            expect(jSuites.mask.render(1234567, { mask: '0.000000E+00' }, true)).toBe('1.234567e+06');

            // Negative large numbers
            expect(jSuites.mask.render(-1234567, { mask: '0.00E+00' }, true)).toBe('-1.23e+06');
            expect(jSuites.mask.render(-1234567890, { mask: '0.0000E+00' }, true)).toBe('-1.2346e+09');

            // Small numbers (negative exponents)
            expect(jSuites.mask.render(0.00012345, { mask: '0.00E+00' }, true)).toBe('1.23e-04');
            expect(jSuites.mask.render(0.00012345, { mask: '0.0000E+00' }, true)).toBe('1.2345e-04');
            expect(jSuites.mask.render(-0.00012345, { mask: '0.00E+00' }, true)).toBe('-1.23e-04');
            expect(jSuites.mask.render(0.000000001, { mask: '0.00E+00' }, true)).toBe('1.00e-09');
            expect(jSuites.mask.render(1e-15, { mask: '0.00E+00' }, true)).toBe('1.00e-15');

            // Numbers around 1
            expect(jSuites.mask.render(1, { mask: '0.00E+00' }, true)).toBe('1.00e+00');
            expect(jSuites.mask.render(10, { mask: '0.00E+00' }, true)).toBe('1.00e+01');
            expect(jSuites.mask.render(0.1, { mask: '0.00E+00' }, true)).toBe('1.00e-01');
            expect(jSuites.mask.render(0.01, { mask: '0.00E+00' }, true)).toBe('1.00e-02');

            // Large exponents (positive and negative)
            expect(jSuites.mask.render(1e15, { mask: '0.00E+00' }, true)).toBe('1.00e+15');
            expect(jSuites.mask.render(1e20, { mask: '0.00E+00' }, true)).toBe('1.00e+20');
            expect(jSuites.mask.render(1e-20, { mask: '0.00E+00' }, true)).toBe('1.00e-20');

            // Rounding behavior
            expect(jSuites.mask.render(1.999e10, { mask: '0.00E+00' }, true)).toBe('2.00e+10');
            expect(jSuites.mask.render(1.234e10, { mask: '0.00E+00' }, true)).toBe('1.23e+10');
            expect(jSuites.mask.render(1.235e10, { mask: '0.00E+00' }, true)).toBe('1.24e+10');
            expect(jSuites.mask.render(9.999e-5, { mask: '0.00E+00' }, true)).toBe('1.00e-04');
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
            expect(jSuites.mask.autoCasting("25/12/2025")).toEqual({ mask: 'dd/mm/yyyy', value: 46016, type: 'date', category: 'datetime' });
            expect(jSuites.mask.autoCasting("12/25/2025")).toEqual({ mask: 'mm/dd/yyyy', value: 46016, type: 'date', category: 'datetime' });
            expect(jSuites.mask.autoCasting("2025-12-25")).toEqual({ mask: 'yyyy-mm-dd', value: 46016, type: 'date', category: 'datetime' });
        });

        test('should detect dates with month names', () => {
            expect(jSuites.mask.autoCasting("25 Dec 2025")).toEqual({ mask: 'dd mmm yyyy', value: 46016, type: 'date', category: 'datetime' });
            expect(jSuites.mask.autoCasting("December 25, 2025")).toEqual({ mask: 'mmmm dd, yyyy', value: 46016, type: 'date', category: 'datetime' });
        });

        test('should detect time formats', () => {
            expect(jSuites.mask.autoCasting("14:30:45")).toEqual({ mask: 'hh:mm:ss', value: 0.6046874999999999, type: 'time', category: 'datetime' }); // 14.5/24
            expect(jSuites.mask.autoCasting("2:30 PM")).toEqual({ mask: 'h:mm am/pm', value: 0.6041666666666666, type: 'time', category: 'datetime' }); // 14.5/24
        });

        test('should detect combined datetime formats', () => {
            expect(jSuites.mask.autoCasting("25/12/2025 14:30:00")).toEqual({ mask: 'dd/mm/yyyy hh:mm:ss', value: 46016.604166666664, type: 'date', category: 'datetime' });
        });

        // Currency
        test('should detect currency with dot separator', () => {
            expect(jSuites.mask.autoCasting("$ 1,234.56")).toEqual({ mask: '$ #,##0.00', value: 1234.56, type: 'currency', category: 'numeric' });
        });

        test('should detect currency with comma separator (EU style)', () => {
            expect(jSuites.mask.autoCasting("€ 1.234,56")).toEqual({ mask: '€ #.##0,00', value: 1234.56, type: 'currency', category: 'numeric' });
        });

        test('should detect negative currency', () => {
            expect(jSuites.mask.autoCasting("($5,000.75)")).toEqual({ mask: '($#,##0.00)', value: -5000.75, type: 'currency', category: 'numeric' });
        });

        test('should detect currency with letter prefixes', () => {
            expect(jSuites.mask.autoCasting("R$ 1,500.00")).toEqual({ mask: 'R$ #,##0.00', value: 1500, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("US$ 100")).toEqual({ mask: 'US$ #,##0', value: 100, type: 'currency', category: 'numeric' });
        });

        test('should detect currency without space after symbol', () => {
            expect(jSuites.mask.autoCasting("$400")).toEqual({ mask: '$ #,##0', value: 400, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("$1,234")).toEqual({ mask: '$ #,##0', value: 1234, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("$1,234.56")).toEqual({ mask: '$ #,##0.00', value: 1234.56, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("R$400")).toEqual({ mask: 'R$ #,##0', value: 400, type: 'currency', category: 'numeric' });
        });

        test('should detect negative currency with parentheses (no space)', () => {
            expect(jSuites.mask.autoCasting("($400)")).toEqual({ mask: '($#,##0)', value: -400, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("(R$400)")).toEqual({ mask: '(R$#,##0)', value: -400, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("(R$5,000.75)")).toEqual({ mask: '(R$#,##0.00)', value: -5000.75, type: 'currency', category: 'numeric' });
        });

        // Decimal parameter tests for currency
        test('should respect decimal parameter for currency with parentheses', () => {
            // When decimal is ',' the thousand separator should be '.'
            expect(jSuites.mask.autoCasting("($400)", ',')).toEqual({ mask: '($#.##0)', value: -400, type: 'currency', category: 'numeric' });
            // The ,000 is treated as literal text since , is the decimal separator
            expect(jSuites.mask.autoCasting("($400,000)", ',')).toEqual({ mask: '($#.##0,000)', value: -400, type: 'currency', category: 'numeric' });

            // When decimal is '.' the thousand separator should be ','
            expect(jSuites.mask.autoCasting("($400)", '.')).toEqual({ mask: '($#,##0)', value: -400, type: 'currency', category: 'numeric' });
        });

        test('should respect decimal parameter for currency with separators', () => {
            // Should work when input has correct separators
            expect(jSuites.mask.autoCasting("$1,234.56", '.')).toEqual({ mask: '$ #,##0.00', value: 1234.56, type: 'currency', category: 'numeric' });
            expect(jSuites.mask.autoCasting("$1.234,56", ',')).toEqual({ mask: '$ #.##0,00', value: 1234.56, type: 'currency', category: 'numeric' });
        });

        test('should reject currency with wrong decimal separator', () => {
            // Should reject when input has wrong decimal separator
            expect(jSuites.mask.autoCasting("$1,234.56", ',')).toBeNull();
            expect(jSuites.mask.autoCasting("$1.234,56", '.')).toBeNull();
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
            expect(jSuites.mask.autoCasting("50%")).toEqual({ mask: '0%', value: 0.5, type: 'percent', category: 'numeric' });
        });

        test('should detect decimal percent', () => {
            expect(jSuites.mask.autoCasting("25.5%")).toEqual({ mask: '0.0%', value: 0.255, type: 'percent', category: 'numeric' });
        });

        // Fractions
        test('should detect simple fractions', () => {
            expect(jSuites.mask.autoCasting("1/2")).toEqual({ mask: '?/2', value: 0.5, type: 'fraction', category: 'fraction' });
            expect(jSuites.mask.autoCasting("3/4")).toEqual({ mask: '?/4', value: 0.75, type: 'fraction', category: 'fraction' });
        });

        test('should detect mixed numbers', () => {
            expect(jSuites.mask.autoCasting("1 1/2")).toEqual({ mask: '# ?/2', value: 1.5, type: 'fraction', category: 'fraction' });
            expect(jSuites.mask.autoCasting("2 3/8")).toEqual({ mask: '# ?/8', value: 2.375, type: 'fraction', category: 'fraction' });
        });

        // Scientific
        test('should detect scientific format', () => {
            expect(jSuites.mask.autoCasting("1.23e+10")).toEqual({ mask: '0.00E+00', value: 12300000000, type: 'scientific', category: 'scientific' });
            expect(jSuites.mask.autoCasting("-7.9998e+22")).toEqual({ mask: '0.0000E+00', value: -7.9998e+22, type: 'scientific', category: 'scientific' });
        });

        // Numeric
        test('should detect plain numbers', () => {
            expect(jSuites.mask.autoCasting("123456")).toEqual({ mask: '0', value: 123456, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("-789")).toEqual({ mask: '0', value: -789, type: 'number', category: 'numeric' });
        });

        test('should detect formatted numbers', () => {
            expect(jSuites.mask.autoCasting("1,000.25")).toEqual({ mask: '#,##0.00', value: 1000.25, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1.000,25")).toEqual({ mask: '#.##0,00', value: 1000.25, type: 'number', category: 'numeric' });
        });

        // Decimal parameter tests for numbers
        test('should respect decimal parameter for numbers', () => {
            // The ,000 is treated as literal text since , is the decimal separator
            expect(jSuites.mask.autoCasting("400,000", ',')).toEqual({ mask: '0,000', value: 400, type: 'number', category: 'numeric' });

            // Should work when input has correct separators
            expect(jSuites.mask.autoCasting("1,234.56", '.')).toEqual({ mask: '#,##0.00', value: 1234.56, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1.234,56", ',')).toEqual({ mask: '#.##0,00', value: 1234.56, type: 'number', category: 'numeric' });
        });

        test('should reject numbers with wrong decimal separator', () => {
            // Should reject when input has wrong decimal separator
            expect(jSuites.mask.autoCasting("1,234.56", ',')).toBeNull();
            expect(jSuites.mask.autoCasting("1.234,56", '.')).toBeNull();
        });

        test('should detect padded zeros', () => {
            expect(jSuites.mask.autoCasting("000123")).toEqual({ mask: '000000', value: 123, type: 'number', category: 'numeric' });
        });

        // General
        test('should return null for non-parsable input', () => {
            expect(jSuites.mask.autoCasting("hello world")).toBeNull();
            expect(jSuites.mask.autoCasting("**!@#")).toBeNull();
        });

        // Simple number masks (without group separators)
        test('should detect simple decimal numbers without group separators', () => {
            expect(jSuites.mask.autoCasting("1.1")).toEqual({ mask: '0.0', value: 1.1, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1,1")).toEqual({ mask: '0,0', value: 1.1, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("12.34")).toEqual({ mask: '0.00', value: 12.34, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("12,34")).toEqual({ mask: '0,00', value: 12.34, type: 'number', category: 'numeric' });
        });

        test('should use group separator mask only when actually present', () => {
            // With group separator
            expect(jSuites.mask.autoCasting("1,000.25")).toEqual({ mask: '#,##0.00', value: 1000.25, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1.000,25")).toEqual({ mask: '#.##0,00', value: 1000.25, type: 'number', category: 'numeric' });

            // Without group separator
            expect(jSuites.mask.autoCasting("100.25")).toEqual({ mask: '0.00', value: 100.25, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("100,25")).toEqual({ mask: '0,00', value: 100.25, type: 'number', category: 'numeric' });
        });
    });

    describe('decimal parameter filtering', () => {
        test('should filter out comma decimal masks when decimal parameter is dot', () => {
            // Should accept dot decimals
            expect(jSuites.mask.autoCasting("1.1", '.')).toEqual({ mask: '0.0', value: 1.1, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1,000.25", '.')).toEqual({ mask: '#,##0.00', value: 1000.25, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("$ 1,234.56", '.')).toEqual({ mask: '$ #,##0.00', value: 1234.56, type: 'currency', category: 'numeric' });

            // Should reject comma decimals
            expect(jSuites.mask.autoCasting("1,1", '.')).toBeNull();
            expect(jSuites.mask.autoCasting("1.000,25", '.')).toBeNull();
            expect(jSuites.mask.autoCasting("€ 1.234,56", '.')).toBeNull();
        });

        test('should filter out dot decimal masks when decimal parameter is comma', () => {
            // Should accept comma decimals
            expect(jSuites.mask.autoCasting("1,1", ',')).toEqual({ mask: '0,0', value: 1.1, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1.000,25", ',')).toEqual({ mask: '#.##0,00', value: 1000.25, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("€ 1.234,56", ',')).toEqual({ mask: '€ #.##0,00', value: 1234.56, type: 'currency', category: 'numeric' });

            // Should reject dot decimals
            expect(jSuites.mask.autoCasting("1.1", ',')).toBeNull();
            expect(jSuites.mask.autoCasting("1,000.25", ',')).toBeNull();
            expect(jSuites.mask.autoCasting("$ 1,234.56", ',')).toBeNull();
        });

        test('should work normally when decimal parameter is not provided', () => {
            // Should accept both
            expect(jSuites.mask.autoCasting("1.1")).toEqual({ mask: '0.0', value: 1.1, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1,1")).toEqual({ mask: '0,0', value: 1.1, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1,000.25")).toEqual({ mask: '#,##0.00', value: 1000.25, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1.000,25")).toEqual({ mask: '#.##0,00', value: 1000.25, type: 'number', category: 'numeric' });
        });

        test('should cache results separately for different decimal parameters', () => {
            // Call with dot decimal
            expect(jSuites.mask.autoCasting("1.23", '.')).toEqual({ mask: '0.00', value: 1.23, type: 'number', category: 'numeric' });

            // Call with comma decimal - should return null
            expect(jSuites.mask.autoCasting("1.23", ',')).toBeNull();

            // Call without decimal parameter - should work
            expect(jSuites.mask.autoCasting("1.23")).toEqual({ mask: '0.00', value: 1.23, type: 'number', category: 'numeric' });

            // Verify cache is working by calling same values again
            expect(jSuites.mask.autoCasting("1.23", '.')).toEqual({ mask: '0.00', value: 1.23, type: 'number', category: 'numeric' });
            expect(jSuites.mask.autoCasting("1.23", ',')).toBeNull();
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

    describe('Extract with locale', () => {
        test('Extract pt-BR currency (R$)', () => {
            expect(jSuites.mask.extract('R$ 1.024,00', { locale: 'pt-BR', options: { style: 'currency', currency: 'BRL' } })).toBe(1024);
            expect(jSuites.mask.extract('R$ 1.234,56', { locale: 'pt-BR', options: { style: 'currency', currency: 'BRL' } })).toBe(1234.56);
            expect(jSuites.mask.extract('R$ 999.999,99', { locale: 'pt-BR', options: { style: 'currency', currency: 'BRL' } })).toBe(999999.99);
        });

        test('Extract en-US currency ($)', () => {
            expect(jSuites.mask.extract('$1,024.00', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } })).toBe(1024);
            expect(jSuites.mask.extract('$1,234.56', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } })).toBe(1234.56);
            expect(jSuites.mask.extract('$999,999.99', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } })).toBe(999999.99);
        });

        test('Extract de-DE currency (€)', () => {
            expect(jSuites.mask.extract('1.024,00 €', { locale: 'de-DE', options: { style: 'currency', currency: 'EUR' } })).toBe(1024);
            expect(jSuites.mask.extract('1.234,56 €', { locale: 'de-DE', options: { style: 'currency', currency: 'EUR' } })).toBe(1234.56);
            expect(jSuites.mask.extract('999.999,99 €', { locale: 'de-DE', options: { style: 'currency', currency: 'EUR' } })).toBe(999999.99);
        });

        test('Extract fr-FR currency (€)', () => {
            // French uses non-breaking space as thousands separator
            expect(jSuites.mask.extract('1 024,00 €', { locale: 'fr-FR', options: { style: 'currency', currency: 'EUR' } })).toBe(1024);
            expect(jSuites.mask.extract('1 234,56 €', { locale: 'fr-FR', options: { style: 'currency', currency: 'EUR' } })).toBe(1234.56);
        });

        test('Extract pt-BR decimal numbers', () => {
            expect(jSuites.mask.extract('1.024,00', { locale: 'pt-BR', options: { style: 'decimal' } })).toBe(1024);
            expect(jSuites.mask.extract('1.234,56', { locale: 'pt-BR', options: { style: 'decimal' } })).toBe(1234.56);
            expect(jSuites.mask.extract('123,45', { locale: 'pt-BR', options: { style: 'decimal' } })).toBe(123.45);
        });

        test('Extract en-US decimal numbers', () => {
            expect(jSuites.mask.extract('1,024.00', { locale: 'en-US', options: { style: 'decimal' } })).toBe(1024);
            expect(jSuites.mask.extract('1,234.56', { locale: 'en-US', options: { style: 'decimal' } })).toBe(1234.56);
            expect(jSuites.mask.extract('123.45', { locale: 'en-US', options: { style: 'decimal' } })).toBe(123.45);
        });

        test('Extract negative numbers with locale', () => {
            expect(jSuites.mask.extract('-R$ 1.024,00', { locale: 'pt-BR', options: { style: 'currency', currency: 'BRL' } })).toBe(-1024);
            expect(jSuites.mask.extract('-$1,024.00', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } })).toBe(-1024);
            expect(jSuites.mask.extract('-1.024,00 €', { locale: 'de-DE', options: { style: 'currency', currency: 'EUR' } })).toBe(-1024);
        });

        test('Extract percent with locale', () => {
            expect(jSuites.mask.extract('50%', { locale: 'en-US', options: { style: 'percent' } })).toBe(0.5);
            expect(jSuites.mask.extract('25,5%', { locale: 'pt-BR', options: { style: 'percent' } })).toBe(0.255);
            expect(jSuites.mask.extract('12,34%', { locale: 'de-DE', options: { style: 'percent' } })).toBe(0.1234);
        });

        test('Extract large numbers with locale', () => {
            expect(jSuites.mask.extract('R$ 1.234.567,89', { locale: 'pt-BR', options: { style: 'currency', currency: 'BRL' } })).toBe(1234567.89);
            expect(jSuites.mask.extract('$1,234,567.89', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } })).toBe(1234567.89);
        });

        test('Extract zero with locale', () => {
            expect(jSuites.mask.extract('R$ 0,00', { locale: 'pt-BR', options: { style: 'currency', currency: 'BRL' } })).toBe(0);
            expect(jSuites.mask.extract('$0.00', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } })).toBe(0);
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

        test('HH24 format with leading zero padding', () => {
            // Test that single digit hours followed by separator get padded
            testInputMask('hh24:mi', [
                { input: '2:54', expected: '02:54' },
                { input: '0:30', expected: '00:30' },
                { input: '9:15', expected: '09:15' },
                { input: '23:59', expected: '23:59' }
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

    describe('Excel locale currency patterns', () => {
        test('US locale (409) - no transformation needed', () => {
            // US format: decimal = '.', thousand = ','
            expect(jSuites.mask.render(100123, { mask: '[$$-409]#,##0.00' }, true)).toBe('$100,123.00');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-409]#,##0.00' }, true)).toBe('$1,234.56');
            expect(jSuites.mask.render(100, { mask: '[$$-409]#,##0' }, true)).toBe('$100');
        });

        test('German locale (407) - swap separators', () => {
            // German format: decimal = ',', thousand = '.'
            // Input mask has US separators, should be transformed to German
            expect(jSuites.mask.render(100123, { mask: '[$$-407]#,##0.00' }, true)).toBe('€100.123,00');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-407]#,##0.00' }, true)).toBe('€1.234,56');
            expect(jSuites.mask.render(100, { mask: '[$$-407]#,##0' }, true)).toBe('€100');
        });

        test('French locale (40C) - space as thousand separator', () => {
            // French format: decimal = ',', thousand = ' '
            expect(jSuites.mask.render(100123, { mask: '[$$-40C]#,##0.00' }, true)).toBe('€100 123,00');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-40C]#,##0.00' }, true)).toBe('€1 234,56');
        });

        test('British locale (809) - pound symbol', () => {
            // UK format: decimal = '.', thousand = ','
            expect(jSuites.mask.render(100123, { mask: '[$£-809]#,##0.00' }, true)).toBe('£100,123.00');
            expect(jSuites.mask.render(1234.56, { mask: '[$£-809]#,##0.00' }, true)).toBe('£1,234.56');
        });

        test('Swiss locale (807) - apostrophe as thousand separator', () => {
            // Swiss format: decimal = '.', thousand = '''
            expect(jSuites.mask.render(100123, { mask: '[$$-807]#,##0.00' }, true)).toBe("CHF100'123.00");
            expect(jSuites.mask.render(1234.56, { mask: '[$$-807]#,##0.00' }, true)).toBe("CHF1'234.56");
        });

        test('Brazilian Portuguese (416) - comma as decimal', () => {
            // Brazilian format: decimal = ',', thousand = '.'
            expect(jSuites.mask.render(100123, { mask: '[$$-416]#,##0.00' }, true)).toBe('R$100.123,00');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-416]#,##0.00' }, true)).toBe('R$1.234,56');
        });

        test('Japanese locale (411) - yen symbol', () => {
            // Japanese format: decimal = '.', thousand = ','
            expect(jSuites.mask.render(100123, { mask: '[$$-411]#,##0.00' }, true)).toBe('¥100,123.00');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-411]#,##0.00' }, true)).toBe('¥1,234.56');
        });

        test('masks with trailing characters', () => {
            // Mask with underscore spacing: _- becomes space, * is consumed, _ becomes space
            expect(jSuites.mask.render(100123, { mask: '_-[$£-407]* #.##0,00_ ' }, true)).toBe(' £ 100.123,00 ');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-409]#,##0.00_)' }, true)).toBe('$1,234.56 ');
        });

        test('negative numbers with locale patterns', () => {
            // Negative formatting with German locale - locale transformation works, parentheses format is general mask limitation
            expect(jSuites.mask.render(-1234.56, { mask: '[$$-407]#,##0.00;([$$-407]#,##0.00)' }, true)).toBe('€-1.234,56');
            expect(jSuites.mask.render(1234.56, { mask: '[$$-407]#,##0.00;([$$-407]#,##0.00)' }, true)).toBe('€1.234,56');
        });

        test('currency symbol extraction from pattern', () => {
            // Test various currency symbols
            expect(jSuites.mask.render(1000, { mask: '[$€-407]#,##0.00' }, true)).toBe('€1.000,00');
            expect(jSuites.mask.render(1000, { mask: '[$£-809]#,##0.00' }, true)).toBe('£1,000.00');
            expect(jSuites.mask.render(1000, { mask: '[$¥-411]#,##0.00' }, true)).toBe('¥1,000.00');
            expect(jSuites.mask.render(1000, { mask: '[$₹-439]#,##0.00' }, true)).toBe('₹1,000.00');
        });

        test('unknown locale code fallback', () => {
            // Unknown locale code should just strip the pattern and use the symbol
            expect(jSuites.mask.render(1234.56, { mask: '[$$-999]#,##0.00' }, true)).toBe('$1,234.56');
            expect(jSuites.mask.render(1234.56, { mask: '[$€-ZZZ]#,##0.00' }, true)).toBe('€1,234.56');
        });

        test('masks without locale patterns remain unchanged', () => {
            // Regular masks without locale patterns should work as before
            expect(jSuites.mask.render(1234.56, { mask: '$#,##0.00' }, true)).toBe('$1,234.56');
            expect(jSuites.mask.render(1234.56, { mask: '€#.##0,00' }, true)).toBe('€1.234,56');
        });

        test('no decimal places with locale patterns', () => {
            // Integer formatting with various locales
            expect(jSuites.mask.render(123456, { mask: '[$$-409]#,##0' }, true)).toBe('$123,456');
            expect(jSuites.mask.render(123456, { mask: '[$$-407]#,##0' }, true)).toBe('€123.456');
            expect(jSuites.mask.render(123456, { mask: '[$$-40C]#,##0' }, true)).toBe('€123 456');
        });

        test('small numbers with locale patterns', () => {
            expect(jSuites.mask.render(1.5, { mask: '[$$-409]#,##0.00' }, true)).toBe('$1.50');
            expect(jSuites.mask.render(0.99, { mask: '[$$-407]#,##0.00' }, true)).toBe('€0,99');
            expect(jSuites.mask.render(0, { mask: '[$$-409]#,##0.00' }, true)).toBe('$0.00');
        });

        test('large numbers with locale patterns', () => {
            expect(jSuites.mask.render(1234567.89, { mask: '[$$-409]#,##0.00' }, true)).toBe('$1,234,567.89');
            expect(jSuites.mask.render(9876543.21, { mask: '[$$-407]#,##0.00' }, true)).toBe('€9.876.543,21');
            expect(jSuites.mask.render(5555555.55, { mask: '[$$-40C]#,##0.00' }, true)).toBe('€5 555 555,55');
        });
    });

    describe('Empty input handling for numeric masks', () => {
        test('should return empty string for non-numeric input on numeric masks', () => {
            // Currency masks with only letters/non-numeric
            expect(jSuites.mask.render('asdfasdfasdfasdf', { mask: '($#.##0)' }, true)).toBe('');
            expect(jSuites.mask.render('abc', { mask: '$#,##0.00' }, true)).toBe('');
            expect(jSuites.mask.render('xyz', { mask: '€#.##0,00' }, true)).toBe('');

            // Plain numeric masks with non-numeric input
            expect(jSuites.mask.render('hello', { mask: '#,##0.00' }, true)).toBe('');
            expect(jSuites.mask.render('test', { mask: '0.00' }, true)).toBe('');

            // Percentage masks with non-numeric input
            expect(jSuites.mask.render('abc', { mask: '0%' }, true)).toBe('');
            expect(jSuites.mask.render('xyz', { mask: '0.00%' }, true)).toBe('');

            // Scientific notation with non-numeric input
            expect(jSuites.mask.render('test', { mask: '0.00E+00' }, true)).toBe('');
        });

        test('should still work normally with numeric input', () => {
            // Verify normal behavior is preserved
            expect(jSuites.mask.render('123', { mask: '($#.##0)' }, true)).toBe('$123');
            expect(jSuites.mask.render('1234.56', { mask: '$#,##0.00' }, true)).toBe('$1,234.56');
            expect(jSuites.mask.render(0.5, { mask: '0%' }, true)).toBe('50%');
        });

        test('should not affect text or date masks', () => {
            // Text masks should still show literals even without numeric input
            expect(jSuites.mask.render('abc', { mask: 'dd/mm/yyyy' }, true)).toBe('');
        });
    });

    describe('Strict mode - Excel-like behavior (4th argument)', () => {
        test('should return original value for invalid numeric strings with strict=true', () => {
            // Mixed text and numbers - not a valid number
            expect(jSuites.mask.render('test 123', { mask: '0.00' }, true, true)).toBe('test 123');
            expect(jSuites.mask.render('abc123def', { mask: '#,##0.00' }, true, true)).toBe('abc123def');
            expect(jSuites.mask.render('$100', { mask: '0.00' }, true, true)).toBe('$100');

            // Pure text - not a valid number
            expect(jSuites.mask.render('hello', { mask: '0.00' }, true, true)).toBe('hello');
            expect(jSuites.mask.render('test', { mask: '#,##0' }, true, true)).toBe('test');
        });

        test('should still format valid numeric strings with strict=true', () => {
            // Valid number strings should be formatted normally
            expect(jSuites.mask.render('123', { mask: '0.00' }, true, true)).toBe('123.00');
            expect(jSuites.mask.render('1234.56', { mask: '#,##0.00' }, true, true)).toBe('1,234.56');
            expect(jSuites.mask.render('-100', { mask: '0.00' }, true, true)).toBe('-100.00');
            expect(jSuites.mask.render('0.5', { mask: '0.00' }, true, true)).toBe('0.50');
        });

        test('should format number types normally with strict=true', () => {
            // Number types are always valid
            expect(jSuites.mask.render(123, { mask: '0.00' }, true, true)).toBe('123.00');
            expect(jSuites.mask.render(1234.56, { mask: '#,##0.00' }, true, true)).toBe('1,234.56');
            expect(jSuites.mask.render(-100, { mask: '0.00' }, true, true)).toBe('-100.00');
        });

        test('without strict (4th arg false/omitted) should extract digits (original behavior)', () => {
            // Without strict, digits are extracted (decimal padding depends on input type)
            expect(jSuites.mask.render('test 123', { mask: '0.00' }, true)).toBe('123');
            expect(jSuites.mask.render('test 123', { mask: '0.00' }, true, false)).toBe('123');
            expect(jSuites.mask.render('abc123def', { mask: '#,##0.00' }, true)).toBe('123');
            // Number types get proper decimal padding
            expect(jSuites.mask.render(123, { mask: '0.00' }, true)).toBe('123.00');
        });

        test('strict mode with percentage masks', () => {
            expect(jSuites.mask.render('test 50', { mask: '0%' }, true, true)).toBe('test 50');
            expect(jSuites.mask.render('0.5', { mask: '0%' }, true, true)).toBe('50%');
            expect(jSuites.mask.render(0.5, { mask: '0%' }, true, true)).toBe('50%');
        });

        test('strict mode with currency masks', () => {
            expect(jSuites.mask.render('hello world', { mask: '$#,##0.00' }, true, true)).toBe('hello world');
            expect(jSuites.mask.render('1234.56', { mask: '$#,##0.00' }, true, true)).toBe('$1,234.56');
        });
    });

    describe('Edge cases and boundary conditions', () => {
        describe('Zero and special number handling', () => {
            test('zero with various masks', () => {
                expect(jSuites.mask.render(0, { mask: '#,##0.00' }, true)).toBe('0.00');
                expect(jSuites.mask.render(0, { mask: '#.##0,00' }, true)).toBe('0,00');
                expect(jSuites.mask.render(0, { mask: '0.00E+00' }, true)).toBe('0.00e+00');
                expect(jSuites.mask.render(0, { mask: '0%' }, true)).toBe('0%');
                expect(jSuites.mask.render(0, { mask: '$#,##0.00' }, true)).toBe('$0.00');
            });

            test('negative zero', () => {
                expect(jSuites.mask.render(-0, { mask: '#,##0.00' }, true)).toBe('0.00');
                expect(jSuites.mask.render(-0, { mask: '0.00E+00' }, true)).toBe('0.00e+00');
            });

            test('very small numbers close to zero', () => {
                expect(jSuites.mask.render(0.001, { mask: '#,##0.00' }, true)).toBe('0.00');
                expect(jSuites.mask.render(0.005, { mask: '#,##0.00' }, true)).toBe('0.01');
                expect(jSuites.mask.render(0.0049, { mask: '#,##0.00' }, true)).toBe('0.00');
                expect(jSuites.mask.render(0.0001, { mask: '#,##0.0000' }, true)).toBe('0.0001');
            });

            test('NaN handling', () => {
                // NaN returns 'NaN' or empty depending on mask type
                const nanResult = jSuites.mask.render(NaN, { mask: '#,##0.00' }, true);
                expect(['NaN', '']).toContain(nanResult);
            });

            test('Infinity handling', () => {
                // Infinity returns the string representation or empty
                const infResult = jSuites.mask.render(Infinity, { mask: '#,##0.00' }, true);
                expect(['∞', 'Infinity', '']).toContain(infResult);
                const negInfResult = jSuites.mask.render(-Infinity, { mask: '#,##0.00' }, true);
                expect(['-∞', '-Infinity', '']).toContain(negInfResult);
            });
        });

        describe('Rounding edge cases', () => {
            test('rounding at 0.5 boundary', () => {
                // JavaScript uses banker's rounding (round half to even) in some cases
                expect(jSuites.mask.render(1.5, { mask: '0' }, true)).toBe('2');
                expect(jSuites.mask.render(2.5, { mask: '0' }, true)).toBe('3');
                expect(jSuites.mask.render(1.25, { mask: '0.0' }, true)).toBe('1.3');
                expect(jSuites.mask.render(1.35, { mask: '0.0' }, true)).toBe('1.4');
            });

            test('rounding with .995 edge case', () => {
                // Classic floating point issue
                expect(jSuites.mask.render(1.995, { mask: '0.00' }, true)).toBe('2.00');
                expect(jSuites.mask.render(2.995, { mask: '0.00' }, true)).toBe('3.00');
                expect(jSuites.mask.render(0.995, { mask: '0.00' }, true)).toBe('1.00');
            });

            test('rounding with many decimal places', () => {
                expect(jSuites.mask.render(1.123456789, { mask: '0.0' }, true)).toBe('1.1');
                expect(jSuites.mask.render(1.123456789, { mask: '0.00' }, true)).toBe('1.12');
                expect(jSuites.mask.render(1.123456789, { mask: '0.000' }, true)).toBe('1.123');
                expect(jSuites.mask.render(1.123456789, { mask: '0.0000' }, true)).toBe('1.1235');
            });
        });

        describe('Very large numbers', () => {
            test('numbers near JavaScript precision limits', () => {
                expect(jSuites.mask.render(9007199254740991, { mask: '#,##0' }, true)).toBe('9,007,199,254,740,991');
                expect(jSuites.mask.render(1e20, { mask: '#,##0' }, true)).toBe('100,000,000,000,000,000,000');
            });

            test('large numbers in scientific notation', () => {
                expect(jSuites.mask.render(1e50, { mask: '0.00E+00' }, true)).toBe('1.00e+50');
                expect(jSuites.mask.render(9.99e99, { mask: '0.00E+00' }, true)).toBe('9.99e+99');
            });
        });

        describe('Very small numbers', () => {
            test('very small positive numbers', () => {
                expect(jSuites.mask.render(1e-10, { mask: '0.00E+00' }, true)).toBe('1.00e-10');
                expect(jSuites.mask.render(1e-50, { mask: '0.00E+00' }, true)).toBe('1.00e-50');
                expect(jSuites.mask.render(1e-100, { mask: '0.00E+00' }, true)).toBe('1.00e-100');
            });

            test('very small negative numbers', () => {
                expect(jSuites.mask.render(-1e-10, { mask: '0.00E+00' }, true)).toBe('-1.00e-10');
                expect(jSuites.mask.render(-1e-50, { mask: '0.00E+00' }, true)).toBe('-1.00e-50');
            });
        });

        describe('Decimal separator handling', () => {
            test('number input with JS decimal for European mask', () => {
                // When value is a JS number, it always uses . internally
                expect(jSuites.mask.render(1234.56, { mask: '#.##0,00' }, true)).toBe('1.234,56');
                expect(jSuites.mask.render(0.5, { mask: '#.##0,00' }, true)).toBe('0,50');
            });

            test('string input with European decimal', () => {
                expect(jSuites.mask.render('1234,56', { mask: '#.##0,00' }, true)).toBe('1.234,56');
                // European string inputs preserve their decimal places (not parseable by JS)
                expect(jSuites.mask.render('0,5', { mask: '#.##0,00' }, true)).toBe('0,5');
            });

            test('string input with US decimal', () => {
                expect(jSuites.mask.render('1234.56', { mask: '#,##0.00' }, true)).toBe('1,234.56');
                // US string inputs are parsed as numbers and padded to mandatory decimals
                expect(jSuites.mask.render('0.5', { mask: '#,##0.00' }, true)).toBe('0.50');
            });
        });

        describe('Scientific notation edge cases', () => {
            test('number exactly 1 in scientific notation', () => {
                expect(jSuites.mask.render(1, { mask: '0.00E+00' }, true)).toBe('1.00e+00');
                expect(jSuites.mask.render(1, { mask: '0.000E+00' }, true)).toBe('1.000e+00');
            });

            test('numbers between 0 and 1', () => {
                expect(jSuites.mask.render(0.5, { mask: '0.00E+00' }, true)).toBe('5.00e-01');
                expect(jSuites.mask.render(0.123, { mask: '0.00E+00' }, true)).toBe('1.23e-01');
                expect(jSuites.mask.render(0.00999, { mask: '0.00E+00' }, true)).toBe('9.99e-03');
            });

            test('negative numbers in scientific notation', () => {
                expect(jSuites.mask.render(-123, { mask: '0.00E+00' }, true)).toBe('-1.23e+02');
                expect(jSuites.mask.render(-0.00123, { mask: '0.00E+00' }, true)).toBe('-1.23e-03');
            });

            test('rounding in scientific notation', () => {
                expect(jSuites.mask.render(1.999e10, { mask: '0.00E+00' }, true)).toBe('2.00e+10');
                expect(jSuites.mask.render(9.995e-5, { mask: '0.00E+00' }, true)).toBe('1.00e-04');
            });

            test('varying decimal places in scientific notation', () => {
                expect(jSuites.mask.render(12345, { mask: '0E+00' }, true)).toBe('1e+04');
                expect(jSuites.mask.render(12345, { mask: '0.0E+00' }, true)).toBe('1.2e+04');
                expect(jSuites.mask.render(12345, { mask: '0.0000E+00' }, true)).toBe('1.2345e+04');
            });
        });

        describe('Percentage edge cases', () => {
            test('small percentages', () => {
                expect(jSuites.mask.render(0.001, { mask: '0.00%' }, true)).toBe('0.10%');
                expect(jSuites.mask.render(0.0001, { mask: '0.00%' }, true)).toBe('0.01%');
                expect(jSuites.mask.render(0.00001, { mask: '0.00%' }, true)).toBe('0.00%');
            });

            test('large percentages', () => {
                expect(jSuites.mask.render(10, { mask: '0%' }, true)).toBe('1000%');
                expect(jSuites.mask.render(100, { mask: '0%' }, true)).toBe('10000%');
            });

            test('negative percentages', () => {
                expect(jSuites.mask.render(-0.25, { mask: '0.00%' }, true)).toBe('-25.00%');
                expect(jSuites.mask.render(-0.001, { mask: '0.00%' }, true)).toBe('-0.10%');
            });
        });

        describe('Currency mask edge cases', () => {
            test('currency with no thousands separator needed', () => {
                expect(jSuites.mask.render(1, { mask: '#,##0.00' }, true)).toBe('1.00');
                expect(jSuites.mask.render(12, { mask: '#,##0.00' }, true)).toBe('12.00');
                expect(jSuites.mask.render(123, { mask: '#,##0.00' }, true)).toBe('123.00');
                expect(jSuites.mask.render(999, { mask: '#,##0.00' }, true)).toBe('999.00');
            });

            test('currency at separator boundary', () => {
                expect(jSuites.mask.render(1000, { mask: '#,##0.00' }, true)).toBe('1,000.00');
                expect(jSuites.mask.render(999999, { mask: '#,##0.00' }, true)).toBe('999,999.00');
                expect(jSuites.mask.render(1000000, { mask: '#,##0.00' }, true)).toBe('1,000,000.00');
            });

            test('currency with negative values', () => {
                expect(jSuites.mask.render(-1, { mask: '#,##0.00' }, true)).toBe('-1.00');
                expect(jSuites.mask.render(-1000, { mask: '#,##0.00' }, true)).toBe('-1,000.00');
                expect(jSuites.mask.render(-0.01, { mask: '#,##0.00' }, true)).toBe('-0.01');
            });

            test('European currency at separator boundary', () => {
                expect(jSuites.mask.render(1000, { mask: '#.##0,00' }, true)).toBe('1.000,00');
                expect(jSuites.mask.render(999999, { mask: '#.##0,00' }, true)).toBe('999.999,00');
                expect(jSuites.mask.render(1000000, { mask: '#.##0,00' }, true)).toBe('1.000.000,00');
            });
        });

        describe('Mixed optional and mandatory decimals', () => {
            test('all optional decimals with integer input', () => {
                expect(jSuites.mask.render(123, { mask: '#,##0.###' }, true)).toBe('123');
                expect(jSuites.mask.render(123, { mask: '#.##0,###' }, true)).toBe('123');
            });

            test('all optional decimals with decimal input', () => {
                expect(jSuites.mask.render(123.1, { mask: '#,##0.###' }, true)).toBe('123.1');
                expect(jSuites.mask.render(123.12, { mask: '#,##0.###' }, true)).toBe('123.12');
                expect(jSuites.mask.render(123.123, { mask: '#,##0.###' }, true)).toBe('123.123');
                expect(jSuites.mask.render(123.1234, { mask: '#,##0.###' }, true)).toBe('123.123');
            });

            test('one mandatory + many optional', () => {
                expect(jSuites.mask.render(123, { mask: '#,##0.0####' }, true)).toBe('123.0');
                expect(jSuites.mask.render(123.1, { mask: '#,##0.0####' }, true)).toBe('123.1');
                expect(jSuites.mask.render(123.12345, { mask: '#,##0.0####' }, true)).toBe('123.12345');
                expect(jSuites.mask.render(123.123456, { mask: '#,##0.0####' }, true)).toBe('123.12346');
            });
        });

        describe('String input edge cases', () => {
            test('string with leading/trailing spaces', () => {
                expect(jSuites.mask.render(' 123 ', { mask: '#,##0' }, true)).toBe('123');
                expect(jSuites.mask.render('  1234.56  ', { mask: '#,##0.00' }, true)).toBe('1,234.56');
            });

            test('string with only zeros', () => {
                expect(jSuites.mask.render('0', { mask: '#,##0.00' }, true)).toBe('0.00');
                expect(jSuites.mask.render('00', { mask: '#,##0.00' }, true)).toBe('0.00');
                expect(jSuites.mask.render('000', { mask: '#,##0.00' }, true)).toBe('0.00');
            });

            test('empty string input', () => {
                expect(jSuites.mask.render('', { mask: '#,##0.00' }, true)).toBe('');
            });

            test('string with only decimal point', () => {
                // Single decimal point is treated as "0."
                const dotResult = jSuites.mask.render('.', { mask: '#,##0.00' }, true);
                expect(['', '0.']).toContain(dotResult);
                const commaResult = jSuites.mask.render(',', { mask: '#.##0,00' }, true);
                expect(['', '0,']).toContain(commaResult);
            });

            test('string starting with decimal', () => {
                // US decimal strings are parsed and padded
                expect(jSuites.mask.render('.5', { mask: '#,##0.00' }, true)).toBe('0.50');
                // European decimal strings preserve their format
                expect(jSuites.mask.render(',5', { mask: '#.##0,00' }, true)).toBe('0,5');
            });
        });

        describe('Integer masks (no decimal)', () => {
            test('integer mask with integer input', () => {
                expect(jSuites.mask.render(123, { mask: '#,##0' }, true)).toBe('123');
                expect(jSuites.mask.render(1234, { mask: '#,##0' }, true)).toBe('1,234');
            });

            test('integer mask with decimal input (should round)', () => {
                expect(jSuites.mask.render(123.4, { mask: '#,##0' }, true)).toBe('123');
                expect(jSuites.mask.render(123.5, { mask: '#,##0' }, true)).toBe('124');
                expect(jSuites.mask.render(123.9, { mask: '#,##0' }, true)).toBe('124');
            });

            test('European integer mask', () => {
                expect(jSuites.mask.render(1234, { mask: '#.##0' }, true)).toBe('1.234');
                expect(jSuites.mask.render(1234.5, { mask: '#.##0' }, true)).toBe('1.235');
            });
        });

        describe('Padded zero masks', () => {
            test('padded zeros with smaller number', () => {
                expect(jSuites.mask.render(1, { mask: '00000' }, true)).toBe('00001');
                expect(jSuites.mask.render(12, { mask: '00000' }, true)).toBe('00012');
                expect(jSuites.mask.render(123, { mask: '00000' }, true)).toBe('00123');
            });

            test('padded zeros with larger number', () => {
                expect(jSuites.mask.render(12345, { mask: '00000' }, true)).toBe('12345');
                expect(jSuites.mask.render(123456, { mask: '00000' }, true)).toBe('123456');
            });

            test('padded zeros with zero', () => {
                expect(jSuites.mask.render(0, { mask: '00000' }, true)).toBe('00000');
            });
        });

        describe('Rounding that changes order of magnitude', () => {
            test('rounding 9.99 to 10', () => {
                expect(jSuites.mask.render(9.999, { mask: '0.00' }, true)).toBe('10.00');
                expect(jSuites.mask.render(99.999, { mask: '0.00' }, true)).toBe('100.00');
                expect(jSuites.mask.render(999.999, { mask: '#,##0.00' }, true)).toBe('1,000.00');
            });

            test('rounding in scientific notation that changes exponent', () => {
                expect(jSuites.mask.render(9.999e9, { mask: '0.00E+00' }, true)).toBe('1.00e+10');
                expect(jSuites.mask.render(9.999e-9, { mask: '0.00E+00' }, true)).toBe('1.00e-08');
            });
        });

        describe('Negative numbers with various masks', () => {
            test('negative with currency symbols', () => {
                // US format: negative sign before currency symbol
                expect(jSuites.mask.render(-123.45, { mask: '$#,##0.00' }, true)).toBe('-$123.45');
                // European format: negative sign after currency symbol
                expect(jSuites.mask.render(-123.45, { mask: '€#.##0,00' }, true)).toBe('€-123,45');
            });

            test('negative with percentage', () => {
                expect(jSuites.mask.render(-0.5, { mask: '0%' }, true)).toBe('-50%');
                expect(jSuites.mask.render(-0.123, { mask: '0.00%' }, true)).toBe('-12.30%');
            });

            test('negative with text', () => {
                expect(jSuites.mask.render(-100, { mask: '0 units' }, true)).toBe('-100 units');
            });
        });

        describe('Numbers with many decimal places in mask', () => {
            test('up to 10 decimal places', () => {
                expect(jSuites.mask.render(1.123456789, { mask: '0.0000000000' }, true)).toBe('1.1234567890');
                expect(jSuites.mask.render(Math.PI, { mask: '0.0000000000' }, true)).toBe('3.1415926536');
            });

            test('scientific with many decimals', () => {
                expect(jSuites.mask.render(123456789, { mask: '0.00000000E+00' }, true)).toBe('1.23456789e+08');
            });
        });

        describe('Edge cases in fraction formatting', () => {
            test('improper fractions', () => {
                expect(jSuites.mask.render(2.5, { mask: '?/?' }, true)).toBe('5/2');
                expect(jSuites.mask.render(5.25, { mask: '?/?' }, true)).toBe('21/4');
            });

            test('fractions that simplify to whole numbers', () => {
                expect(jSuites.mask.render(1.0, { mask: '# ?/?' }, true)).toBe('1');
                expect(jSuites.mask.render(2.0, { mask: '# ?/8' }, true)).toBe('2');
            });
        });

        describe('Scientific notation exponent edge cases', () => {
            test('single digit exponents', () => {
                expect(jSuites.mask.render(1e1, { mask: '0.00E+00' }, true)).toBe('1.00e+01');
                expect(jSuites.mask.render(1e9, { mask: '0.00E+00' }, true)).toBe('1.00e+09');
            });

            test('zero exponent', () => {
                expect(jSuites.mask.render(5, { mask: '0.00E+00' }, true)).toBe('5.00e+00');
                expect(jSuites.mask.render(9.99, { mask: '0.00E+00' }, true)).toBe('9.99e+00');
            });

            test('transition from positive to negative exponent', () => {
                expect(jSuites.mask.render(0.1, { mask: '0.00E+00' }, true)).toBe('1.00e-01');
                expect(jSuites.mask.render(0.01, { mask: '0.00E+00' }, true)).toBe('1.00e-02');
                expect(jSuites.mask.render(0.99, { mask: '0.00E+00' }, true)).toBe('9.90e-01');
            });
        });

        describe('Scientific notation additional edge cases', () => {
            test('mask without decimal places (0E+00)', () => {
                expect(jSuites.mask.render(12345, { mask: '0E+00' }, true)).toBe('1e+04');
                expect(jSuites.mask.render(99999, { mask: '0E+00' }, true)).toBe('1e+05');
                expect(jSuites.mask.render(0.00123, { mask: '0E+00' }, true)).toBe('1e-03');
                expect(jSuites.mask.render(-5678, { mask: '0E+00' }, true)).toBe('-6e+03');
            });

            // Note: European decimal in scientific notation currently outputs with dot decimal
            // This documents current behavior - could be enhanced in future
            test('European decimal in scientific notation (0,00E+00) - current behavior', () => {
                expect(jSuites.mask.render(12345, { mask: '0,00E+00' }, true)).toBe('1.23e+04');
                expect(jSuites.mask.render(0.00456, { mask: '0,00E+00' }, true)).toBe('4.56e-03');
            });

            // Note: E- format (without +) is not currently recognized as scientific notation
            // This documents current behavior - the mask is treated as numeric, not scientific
            test('E- format behavior - currently not scientific', () => {
                // Currently treated as numeric mask, not scientific notation
                const result = jSuites.mask.render(12345, { mask: '0.00E-00' }, true);
                expect(result).toBe('12345.00E-');
            });

            test('string input that looks like scientific notation', () => {
                // String inputs that are valid numbers
                expect(jSuites.mask.render('12345', { mask: '0.00E+00' }, true)).toBe('1.23e+04');
                expect(jSuites.mask.render('0.00123', { mask: '0.00E+00' }, true)).toBe('1.23e-03');
                expect(jSuites.mask.render('-999', { mask: '0.00E+00' }, true)).toBe('-9.99e+02');

                // String input already in scientific notation format (needs rounding)
                expect(jSuites.mask.render('1.999e+05', { mask: '0.00E+00' }, true)).toBe('2.00e+05');
                expect(jSuites.mask.render('9.999e+05', { mask: '0.00E+00' }, true)).toBe('1.00e+06');
                expect(jSuites.mask.render('1.234e-10', { mask: '0.00E+00' }, true)).toBe('1.23e-10');
            });

            test('strict mode with scientific masks', () => {
                // Valid numbers should format
                expect(jSuites.mask.render('12345', { mask: '0.00E+00' }, true, true)).toBe('1.23e+04');
                expect(jSuites.mask.render(12345, { mask: '0.00E+00' }, true, true)).toBe('1.23e+04');

                // Invalid strings should return original with strict mode
                expect(jSuites.mask.render('test 123', { mask: '0.00E+00' }, true, true)).toBe('test 123');
                expect(jSuites.mask.render('abc', { mask: '0.00E+00' }, true, true)).toBe('abc');
            });

            test('scientific notation with very precise decimals', () => {
                expect(jSuites.mask.render(1.23456789012345, { mask: '0.0000000000E+00' }, true)).toBe('1.2345678901e+00');
                expect(jSuites.mask.render(9.87654321e-10, { mask: '0.00000000E+00' }, true)).toBe('9.87654321e-10');
            });

            test('input with more decimals than mask allows (rounding)', () => {
                // Input has 8 decimals, mask only allows 2 - should round
                expect(jSuites.mask.render(1.23456789, { mask: '0.00E+00' }, true)).toBe('1.23e+00');
                expect(jSuites.mask.render(9.87654321, { mask: '0.00E+00' }, true)).toBe('9.88e+00');
                expect(jSuites.mask.render(1.99999999, { mask: '0.00E+00' }, true)).toBe('2.00e+00');

                // Same with larger/smaller numbers
                expect(jSuites.mask.render(123456.789012, { mask: '0.00E+00' }, true)).toBe('1.23e+05');
                expect(jSuites.mask.render(0.000123456789, { mask: '0.00E+00' }, true)).toBe('1.23e-04');

                // Edge case: rounding causes exponent change
                expect(jSuites.mask.render(9.99999999, { mask: '0.00E+00' }, true)).toBe('1.00e+01');
                expect(jSuites.mask.render(0.0999999999, { mask: '0.00E+00' }, true)).toBe('1.00e-01');
            });

            test('boundary values for exponent padding', () => {
                // Single digit exponent with 2-digit padding
                expect(jSuites.mask.render(1e5, { mask: '0.00E+00' }, true)).toBe('1.00e+05');
                expect(jSuites.mask.render(1e-5, { mask: '0.00E+00' }, true)).toBe('1.00e-05');

                // Three digit exponents
                expect(jSuites.mask.render(1e100, { mask: '0.00E+00' }, true)).toBe('1.00e+100');
                expect(jSuites.mask.render(1e-100, { mask: '0.00E+00' }, true)).toBe('1.00e-100');
            });
        });

        describe('Combining multiple format features', () => {
            test('currency with thousands and decimals', () => {
                expect(jSuites.mask.render(1234567.89, { mask: '$ #,##0.00' }, true)).toBe('$ 1,234,567.89');
                expect(jSuites.mask.render(1234567.89, { mask: 'R$ #.##0,00' }, true)).toBe('R$ 1.234.567,89');
            });

            test('negative currency with thousands', () => {
                // Negative sign appears before currency symbol and space
                expect(jSuites.mask.render(-1234567.89, { mask: '$ #,##0.00' }, true)).toBe('-$ 1,234,567.89');
            });
        });
    });

    describe('Locale formatting with Intl.NumberFormat', () => {
        test('should format simple numbers with locale', () => {
            // Indian Rupee
            expect(jSuites.mask.render(3, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*3/);
            expect(jSuites.mask.render(100, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*100/);

            // US Dollar
            expect(jSuites.mask.render(50, { locale: 'en-US', options: { style: 'currency', currency: 'USD' } }, true)).toMatch(/\$.*50/);
        });

        test('should handle already-formatted strings with invisible characters', () => {
            // Simulate string with zero-width space (common issue)
            const stringWithInvisibleChar = '3\u200B'; // 3 with zero-width space
            expect(jSuites.mask.render(stringWithInvisibleChar, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*3/);
            expect(jSuites.mask.render(stringWithInvisibleChar, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).not.toContain('NaN');
        });

        test('should parse already-formatted currency strings', () => {
            // When user types additional digits, the input contains formatted string
            // The format function should extract numeric value from formatted strings like "₹3.00"
            expect(jSuites.mask.render('₹3.00', { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*3/);
            expect(jSuites.mask.render('$100.00', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } }, true)).toMatch(/\$.*100/);
        });

        test('should handle negative numbers in locale format', () => {
            expect(jSuites.mask.render(-50, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/-?₹.*50/);
            expect(jSuites.mask.render('-₹50.00', { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/-?₹.*50/);
        });

        test('should handle decimal numbers with different separators', () => {
            // Period as decimal separator
            expect(jSuites.mask.render('123.45', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } }, true)).toMatch(/\$.*123.*45/);

            // Comma as decimal separator (German locale puts € at the end)
            expect(jSuites.mask.render('123,45', { locale: 'de-DE', options: { style: 'currency', currency: 'EUR' }, decimal: ',' }, true)).toMatch(/123.*45.*€/);
        });

        test('should extract digits from complex formatted strings', () => {
            // Multiple formatting elements: currency symbol, grouping, decimal
            expect(jSuites.mask.render('₹1,234.56', { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*1.*234.*56/);
            expect(jSuites.mask.render('$12,345.67', { locale: 'en-US', options: { style: 'currency', currency: 'USD' } }, true)).toMatch(/\$.*12.*345.*67/);
        });

        test('should handle zero and empty values', () => {
            expect(jSuites.mask.render(0, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*0/);
            expect(jSuites.mask.render('0', { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true)).toMatch(/₹.*0/);
        });

        test('should not return NaN for any valid input', () => {
            const testCases = [
                '3\u200B', // with invisible char
                '₹3.00',   // formatted
                '123',     // plain number
                '-50',     // negative
                '0',       // zero
            ];

            testCases.forEach(input => {
                const result = jSuites.mask.render(input, { locale: 'en-IN', options: { style: 'currency', currency: 'INR' } }, true);
                expect(result).not.toContain('NaN');
            });
        });
    });

});

