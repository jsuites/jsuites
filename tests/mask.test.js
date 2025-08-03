const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {
    describe('()', () => {
        test('basic decimals', () => {
            expect(jSuites.mask('123.456789', { mask: '00.00' }, true).value).toEqual('123.456789');
            expect(jSuites.mask('123.456', { mask: '00.0' }, true).value).toEqual('123.456');
            expect(jSuites.mask('123.456789', { mask: '00,00' }, true).value).toEqual('123,456789');
            expect(jSuites.mask('123.456', { mask: '00,0' }, true).value).toEqual('123,456');
            expect(jSuites.mask('-123.456', { mask: '00,0' }, true).value).toEqual('-123,456');
        });

        test('currency', () => {
            expect(jSuites.mask("12345.678", { mask: '#,##0.00' }, true).value).toEqual("12,345.678");
            expect(jSuites.mask("54321", { mask: '#,##0' }, true).value).toEqual("54,321");
            expect(jSuites.mask("11873987654.321", { mask: '#,##0.00' }, true).value).toEqual("11,873,987,654.321");

            expect(jSuites.mask("987654.321", { mask: '#.##0,00' }, true).value).toEqual("987.654,321");
            expect(jSuites.mask("11873987654", { mask: '#.##0' }, true).value).toEqual("11.873.987.654");

            expect(jSuites.mask("-987654.321", { mask: '#,##0.00' }, true).value).toEqual("-987,654.321");
            expect(jSuites.mask("-11873987654.321", { mask: '#,##0.00' }, true).value).toEqual("-11,873,987,654.321");
            expect(jSuites.mask("-11873987654", { mask: '#.##0' }, true).value).toEqual("-11.873.987.654");
        });

        test('scientific', () => {
            expect(jSuites.mask("100000", { mask: '0E+00' }, true).value).toEqual("100000");
            expect(jSuites.mask("11873987654", { mask: '0.00E+00' }, true).value).toEqual("11873987654");
            expect(jSuites.mask("-11873987654", { mask: '0.00E+00' }, true).value).toEqual("-11873987654");
        });

        test('date', () => {
            expect(jSuites.mask("20091999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("20 09 1999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("20 Sep 1999", { mask: 'dd/mmm/yyyy' }, true).value).toEqual("20/Sep/1999");
            expect(jSuites.mask("20 Sep 1999", { mask: 'dd/mon/yyyy' }, true).value).toEqual("20/Sep/1999");
        });
    });

    describe('fullmask', () => {
        test('integers', () => {
            expect(jSuites.mask("0", { mask: '0' }, true).value).toEqual("0");
            expect(jSuites.mask("10", { mask: '0' }, true).value).toEqual("10");
            expect(jSuites.mask("100", { mask: '0' }, true).value).toEqual("100");
            expect(jSuites.mask("-100", { mask: '0' }, true).value).toEqual("-100");
            expect(jSuites.mask("-10", { mask: '0' }, true).value).toEqual("-10");
            expect(jSuites.mask("-100", { mask: '0' }, true).value).toEqual("-100");
            expect(jSuites.mask("123456789", { mask: '0' }, true).value).toEqual("123456789");

        });

        test('basic decimals', () => {
            expect(jSuites.mask('21.123', { mask: '0,00' }, true).value).toEqual('21,123');
        });

        test('number + general', () => {
            expect(jSuites.mask("24", { mask: '0 liters' }, true).value).toEqual("24 liters");
            expect(jSuites.mask("24", { mask: '0 liters' }, true).value).toEqual("24 liters");
            expect(jSuites.mask("875799.99", { mask: '$ 0.00' }, true).value).toEqual("$ 875799.99");
            expect(jSuites.mask("875799.99", { mask: '$ #,##0.00' }, true).value).toEqual("$ 875,799.99");
        });

        test('date', () => {
            expect(jSuites.mask("20091999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("20 09 1999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("20 Sep 1999", { mask: 'dd/mmm/yyyy' }, true).value).toEqual("20/Sep/1999");
            expect(jSuites.mask("20 Sep 1999", { mask: 'dd/mon/yyyy' }, true).value).toEqual("20/Sep/1999");
            expect(jSuites.mask("20091999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("20091999", { mask: 'dd-mm-yyyy' }, true).value).toEqual("20-09-1999");
            expect(jSuites.mask("20091999", { mask: 'dd.mm.yyyy' }, true).value).toEqual("20.09.1999");
            expect(jSuites.mask("20 September 1999", { mask: 'dd/mon/yyyy' }, true).value).toEqual("20/Sep/1999");
            expect(jSuites.mask("20 September 1999", { mask: 'dd mmmm yyyy' }, true).value).toEqual("20 September 1999");
            expect(jSuites.mask("200919", { mask: 'dd/mm/yy' }, true).value).toEqual("20/09/19");
            expect(jSuites.mask("200999", { mask: 'dd/mm/yy' }, true).value).toEqual("20/09/99");
            expect(jSuites.mask("2091999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/1999");
            expect(jSuites.mask("200999", { mask: 'dd/mm/yyyy' }, true).value).toEqual("20/09/99");

            expect(jSuites.mask("29022020", { mask: 'dd/mm/yyyy' }, true).value).toEqual("29/02/2020");

            expect(jSuites.mask("19990920", { mask: 'yyyy/mm/dd' }, true).value).toEqual("1999/09/20");
            expect(jSuites.mask("1999 Sep 20", { mask: 'yyyy/mmm/dd' }, true).value).toEqual("1999/Sep/20");
            expect(jSuites.mask("09201999", { mask: 'mm-dd-yyyy' }, true).value).toEqual("09-20-1999");
            expect(jSuites.mask("Sep 20 1999", { mask: 'mmm/dd/yyyy' }, true).value).toEqual("Sep/20/1999");
            expect(jSuites.mask("September 20 1999", { mask: 'mmmm-dd-yyyy' }, true).value).toEqual("September-20-1999");
            expect(jSuites.mask("19992009", { mask: 'yyyy-dd-mm' }, true).value).toEqual("1999-20-09");
            expect(jSuites.mask("1999 20 Sep", { mask: 'yyyy/dd/mmm' }, true).value).toEqual("1999/20/Sep");
            expect(jSuites.mask("1999 Sep 20", { mask: 'yyyy-mmm/dd' }, true).value).toEqual("1999-Sep/20");
            expect(jSuites.mask("19992009", { mask: 'yyyy.dd-mm' }, true).value).toEqual("1999.20-09");
            expect(jSuites.mask("1999 09 20", { mask: 'yyyy.mm.dd' }, true).value).toEqual("1999.09.20");
            expect(jSuites.mask("09201999", { mask: 'mm.dd-yyyy' }, true).value).toEqual("09.20-1999");
            expect(jSuites.mask("09201999", { mask: 'mm/dd/yyyy' }, true).value).toEqual("09/20/1999");
            expect(jSuites.mask("09201999", { mask: 'mm dd yyyy' }, true).value).toEqual("09 20 1999");
            expect(jSuites.mask("200919", { mask: 'dd/mm/yy' }, true).value).toEqual("20/09/19");
            expect(jSuites.mask("09192019", { mask: 'mm/dd/yyyy' }, true).value).toEqual("09/19/2019");
            expect(jSuites.mask("091919", { mask: 'mm/dd/yy' }, true).value).toEqual("09/19/19");
            expect(jSuites.mask("Sep201999", { mask: 'mmm/dd/yyyy' }, true).value).toEqual("Sep/20/1999");
            expect(jSuites.mask("20 Sep 1999", { mask: 'dd/mmm/yyyy' }, true).value).toEqual("20/Sep/1999");
        });
    });

    describe('onkeydown single tokens', () => {
        test('0.00', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="0.00">';
            let input = document.getElementById('test-input')
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '7581003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7581003');
            input.value = '.03';
            input.dispatchEvent(event);
            // expect(input.value).toEqual('0.03');
            input.value = '-.03';
            input.dispatchEvent(event);
            // expect(input.value).toEqual('-0,03');
            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '00';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '000000000';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '01';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '00000001';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '7581003.00003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7581003.00003');
            input.value = '-7581003.00003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-7581003.00003');
            input.value = '7581003.000-03';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-7581003.00003');
            input.value = '7581-003.00003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-7581003.00003');
            input.value = '123abcde';
            input.dispatchEvent(event);
            expect(input.value).toEqual('123');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('0,00', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="0,00">';
            let input = document.getElementById('test-input')
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '7581003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7581003');
            input.value = ',03';
            input.dispatchEvent(event);
            // expect(input.value).toEqual('0,03');
            input.value = '-,03';
            input.dispatchEvent(event);
            // expect(input.value).toEqual('-0,03');
            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '00';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '000000000';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '01';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '00000001';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '7581003,00003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7581003,00003');
            input.value = '-7581003,00003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-7581003,00003');
            input.value = '7581003,000-03';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-7581003,00003');
            input.value = '7581-003,00003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-7581003,00003');
            input.value = '123abcde';
            input.dispatchEvent(event);
            expect(input.value).toEqual('123');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('0%', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="0%">';
            let input = document.getElementById('test-input')
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0%');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '7';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7%');
            input.value = '54';
            input.dispatchEvent(event);
            expect(input.value).toEqual('54%');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100%');
            input.value = '100.0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100.0%');
            input.value = '764';
            input.dispatchEvent(event);
            expect(input.value).toEqual('764%');
            input.value = '124577';
            input.dispatchEvent(event);
            expect(input.value).toEqual('124577%');
            input.value = '123abcde';
            input.dispatchEvent(event);
            expect(input.value).toEqual('123%');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('0.00%', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="0.00%">';
            let input = document.getElementById('test-input')
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0%');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '7';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7%');
            input.value = '54';
            input.dispatchEvent(event);
            expect(input.value).toEqual('54%');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100%');
            input.value = '100.0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100.0%');
            input.value = '764';
            input.dispatchEvent(event);
            expect(input.value).toEqual('764%');
            input.value = '124577';
            input.dispatchEvent(event);
            expect(input.value).toEqual('124577%');
            input.value = '123abcde';
            input.dispatchEvent(event);
            expect(input.value).toEqual('123%');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('#,##0.00', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="#,##0.00">';
            let input = document.getElementById('test-input')
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '7581003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7,581,003');
            input.value = '75810.03';
            input.dispatchEvent(event);
            expect(input.value).toEqual('75,810.03');
            input.value = '9876543210';
            input.dispatchEvent(event);
            expect(input.value).toEqual('9,876,543,210');
            input.value = '1234567890.99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1,234,567,890.99');
            input.value = '1234';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1,234');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100');
            input.value = '100.5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100.5');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '-5000';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-5,000');
            input.value = '-5000.75';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-5,000.75');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('#.##0,00', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="#.##0,00">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '7581003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('7.581.003');
            input.value = '75810,03';
            input.dispatchEvent(event);
            expect(input.value).toEqual('75.810,03');
            input.value = '9876543210';
            input.dispatchEvent(event);
            expect(input.value).toEqual('9.876.543.210');
            input.value = '1234567890,99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1.234.567.890,99');
            input.value = '1234';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1.234');
            input.value = '100,5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('100,5');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '-5000';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-5.000');
            input.value = '-5000,75';
            input.dispatchEvent(event);
            expect(input.value).toEqual('-5.000,75');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('D', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="dd">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('04');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '20';
            input.dispatchEvent(event);
            expect(input.value).toEqual('20');
            input.value = '30';
            input.dispatchEvent(event);
            expect(input.value).toEqual('30');
            input.value = '31';
            input.dispatchEvent(event);
            expect(input.value).toEqual('31');
            input.value = '32';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '36';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '-3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('DD', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="dd">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('04');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '20';
            input.dispatchEvent(event);
            expect(input.value).toEqual('20');
            input.value = '30';
            input.dispatchEvent(event);
            expect(input.value).toEqual('30');
            input.value = '31';
            input.dispatchEvent(event);
            expect(input.value).toEqual('31');
            input.value = '32';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '36';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '-3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('DDD', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="ddd">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '20';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Mon');
            input.value = 't';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 't abcdefgijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 'tu';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Tue');
            input.value = 'th';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Thu');
            input.value = 'w';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Wed');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Fri');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 's bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 'sa';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sat');
            input.value = 'su';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sun');
            input.value = 'abcdeghijklnopqruvxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('DDDD', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="dddd">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '20';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Monday');
            input.value = 't';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 't abcdefgijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 'tu';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Tuesday');
            input.value = 'th';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Thursday');
            input.value = 'w';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Wednesday');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Friday');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 's bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 'sa';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Saturday');
            input.value = 'su';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sunday');
            input.value = 'abcdeghijklnopqruvxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('DY', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="dy">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '20';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Mon');
            input.value = 't';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 't abcdefgijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 'tu';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Tue');
            input.value = 'th';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Thu');
            input.value = 'w';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Wed');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Fri');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 's bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 'sa';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sat');
            input.value = 'su';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sun');
            input.value = 'abcdeghijklnopqruvxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('DAY', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="day">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '20';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Monday');
            input.value = 't';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 't abcdefgijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('t');
            input.value = 'tu';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Tuesday');
            input.value = 'th';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Thursday');
            input.value = 'w';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Wednesday');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Friday');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 's bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('s');
            input.value = 'sa';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Saturday');
            input.value = 'su';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sunday');
            input.value = 'abcdeghijklnopqruvxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('WD', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="wd">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '6';
            input.dispatchEvent(event);
            expect(input.value).toEqual('6');
            input.value = '7';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '8';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '30';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '1.0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '-3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = 'abcdefghijklmnopqrstuvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('M', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="mm">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('02');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('03');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('04');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = '13';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '14';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '15';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '-1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '-11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('MM', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="mm">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('02');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('03');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('04');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = '13';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '14';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '15';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '-1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '-11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('MMM', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="mmm">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '111';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'J';
            input.dispatchEvent(event);
            expect(input.value).toEqual('J');
            input.value = 'j';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'j bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'ja';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Jan');
            input.value = 'ju';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ju');
            input.value = 'jun';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Jun');
            input.value = 'jul';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Jul');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Feb');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('m');
            input.value = 'ma';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'ma abcdefghijklmnopqstuvwxz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'mar';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Mar');
            input.value = 'may';
            input.dispatchEvent(event);
            expect(input.value).toEqual('May');
            input.value = 'a';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'a abcdefghijklmnoqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'ap';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Apr');
            input.value = 'au';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Aug');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sep');
            input.value = 'o';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Oct');
            input.value = 'n';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Nov');
            input.value = 'd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Dec');
            input.value = 'bceghiklpqrtuvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('MMMM', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="mmmm">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '111';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'J';
            input.dispatchEvent(event);
            expect(input.value).toEqual('J');
            input.value = 'j';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'j bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'ja';
            input.dispatchEvent(event);
            expect(input.value).toEqual('January');
            input.value = 'ju';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ju');
            input.value = 'jun';
            input.dispatchEvent(event);
            expect(input.value).toEqual('June');
            input.value = 'jul';
            input.dispatchEvent(event);
            expect(input.value).toEqual('July');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('February');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('m');
            input.value = 'ma';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'ma abcdefghijklmnopqstuvwxz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'mar';
            input.dispatchEvent(event);
            expect(input.value).toEqual('March');
            input.value = 'may';
            input.dispatchEvent(event);
            expect(input.value).toEqual('May');
            input.value = 'a';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'a abcdefghijklmnoqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'ap';
            input.dispatchEvent(event);
            expect(input.value).toEqual('April');
            input.value = 'au';
            input.dispatchEvent(event);
            expect(input.value).toEqual('August');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('September');
            input.value = 'o';
            input.dispatchEvent(event);
            expect(input.value).toEqual('October');
            input.value = 'n';
            input.dispatchEvent(event);
            expect(input.value).toEqual('November');
            input.value = 'd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('December');
            input.value = 'bceghiklpqrtuvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('MON', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="mon">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '111';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'J';
            input.dispatchEvent(event);
            expect(input.value).toEqual('J');
            input.value = 'j';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'j bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'ja';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Jan');
            input.value = 'ju';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ju');
            input.value = 'jun';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Jun');
            input.value = 'jul';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Jul');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Feb');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('m');
            input.value = 'ma';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'ma abcdefghijklmnopqstuvwxz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'mar';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Mar');
            input.value = 'may';
            input.dispatchEvent(event);
            expect(input.value).toEqual('May');
            input.value = 'a';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'a abcdefghijklmnoqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'ap';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Apr');
            input.value = 'au';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Aug');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Sep');
            input.value = 'o';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Oct');
            input.value = 'n';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Nov');
            input.value = 'd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('Dec');
            input.value = 'bceghiklpqrtuvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('MONTH', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="month">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '111';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'J';
            input.dispatchEvent(event);
            expect(input.value).toEqual('J');
            input.value = 'j';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'j bcdefghijklmnopqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('j');
            input.value = 'ja';
            input.dispatchEvent(event);
            expect(input.value).toEqual('January');
            input.value = 'ju';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ju');
            input.value = 'jun';
            input.dispatchEvent(event);
            expect(input.value).toEqual('June');
            input.value = 'jul';
            input.dispatchEvent(event);
            expect(input.value).toEqual('July');
            input.value = 'f';
            input.dispatchEvent(event);
            expect(input.value).toEqual('February');
            input.value = 'm';
            input.dispatchEvent(event);
            expect(input.value).toEqual('m');
            input.value = 'ma';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'ma abcdefghijklmnopqstuvwxz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('ma');
            input.value = 'mar';
            input.dispatchEvent(event);
            expect(input.value).toEqual('March');
            input.value = 'may';
            input.dispatchEvent(event);
            expect(input.value).toEqual('May');
            input.value = 'a';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'a abcdefghijklmnoqrstvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('a');
            input.value = 'ap';
            input.dispatchEvent(event);
            expect(input.value).toEqual('April');
            input.value = 'au';
            input.dispatchEvent(event);
            expect(input.value).toEqual('August');
            input.value = 's';
            input.dispatchEvent(event);
            expect(input.value).toEqual('September');
            input.value = 'o';
            input.dispatchEvent(event);
            expect(input.value).toEqual('October');
            input.value = 'n';
            input.dispatchEvent(event);
            expect(input.value).toEqual('November');
            input.value = 'd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('December');
            input.value = 'bceghiklpqrtuvwxyz';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('YY', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="yy">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('99');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '2024';
            input.dispatchEvent(event);
            expect(input.value).toEqual('20');
            input.value = '2.1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('21');
            input.value = '-99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('99');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('YYY', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="yyy">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = '13';
            input.dispatchEvent(event);
            expect(input.value).toEqual('13');
            input.value = '14';
            input.dispatchEvent(event);
            expect(input.value).toEqual('14');
            input.value = '15';
            input.dispatchEvent(event);
            expect(input.value).toEqual('15');
            input.value = '999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('999');
            input.value = '2001';
            input.dispatchEvent(event);
            expect(input.value).toEqual('200');
            input.value = '2024';
            input.dispatchEvent(event);
            expect(input.value).toEqual('202');
            input.value = '2999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('299');
            input.value = '3001';
            input.dispatchEvent(event);
            expect(input.value).toEqual('300');
            input.value = '980213124124124981723987123';
            input.dispatchEvent(event);
            expect(input.value).toEqual('980');
            input.value = '20245';
            input.dispatchEvent(event);
            expect(input.value).toEqual('202');
            input.value = '202432423532';
            input.dispatchEvent(event);
            expect(input.value).toEqual('202');
            input.value = '9abcdfwerrdwef10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('910');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '9.9.9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('999');
            input.value = '9,9,9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('999');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('YYYY', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="yyyy">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '10';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '11';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = '13';
            input.dispatchEvent(event);
            expect(input.value).toEqual('13');
            input.value = '14';
            input.dispatchEvent(event);
            expect(input.value).toEqual('14');
            input.value = '15';
            input.dispatchEvent(event);
            expect(input.value).toEqual('15');
            input.value = '1999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1999');
            input.value = '2001';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2001');
            input.value = '2024';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2024');
            input.value = '2999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2999');
            input.value = '3001';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3001');
            input.value = '20245';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2024');
            input.value = '202432423532';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2024');
            input.value = '20abcdfwerrdwef24';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2024');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '1.9.9.9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1999');
            input.value = '1,9,9,9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1999');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('H', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="h">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('9');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = '19';
            input.dispatchEvent(event);
            expect(input.value).toEqual('19');
            input.value = '25';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '30';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '40';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '90';
            input.dispatchEvent(event);
            expect(input.value).toEqual('9');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '111';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '-3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('HH', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="hh">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('03');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('HH24', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="hh24">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '2';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('9');
            input.value = '12';
            input.dispatchEvent(event);
            expect(input.value).toEqual('12');
            input.value = '19';
            input.dispatchEvent(event);
            expect(input.value).toEqual('19');
            input.value = '25';
            input.dispatchEvent(event);
            expect(input.value).toEqual('2');
            input.value = '30';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '40';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '90';
            input.dispatchEvent(event);
            expect(input.value).toEqual('9');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('10');
            input.value = '111';
            input.dispatchEvent(event);
            expect(input.value).toEqual('11');
            input.value = '3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = '-3';
            input.dispatchEvent(event);
            expect(input.value).toEqual('3');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('MI', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="mi">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('5');
            input.value = '6';
            input.dispatchEvent(event);
            expect(input.value).toEqual('06');
            input.value = '7';
            input.dispatchEvent(event);
            expect(input.value).toEqual('07');
            input.value = '8';
            input.dispatchEvent(event);
            expect(input.value).toEqual('08');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09');
            input.value = '51';
            input.dispatchEvent(event);
            expect(input.value).toEqual('51');
            input.value = '52';
            input.dispatchEvent(event);
            expect(input.value).toEqual('52');
            input.value = '58';
            input.dispatchEvent(event);
            expect(input.value).toEqual('58');
            input.value = '59';
            input.dispatchEvent(event);
            expect(input.value).toEqual('59');
            input.value = '5555555555555';
            input.dispatchEvent(event);
            expect(input.value).toEqual('55');
            input.value = '9999999999999999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09');
            input.value = '-1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('SS', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="ss">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('0');
            input.value = '1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = '4';
            input.dispatchEvent(event);
            expect(input.value).toEqual('4');
            input.value = '5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('5');
            input.value = '6';
            input.dispatchEvent(event);
            expect(input.value).toEqual('06');
            input.value = '7';
            input.dispatchEvent(event);
            expect(input.value).toEqual('07');
            input.value = '8';
            input.dispatchEvent(event);
            expect(input.value).toEqual('08');
            input.value = '9';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09');
            input.value = '51';
            input.dispatchEvent(event);
            expect(input.value).toEqual('51');
            input.value = '52';
            input.dispatchEvent(event);
            expect(input.value).toEqual('52');
            input.value = '58';
            input.dispatchEvent(event);
            expect(input.value).toEqual('58');
            input.value = '59';
            input.dispatchEvent(event);
            expect(input.value).toEqual('59');
            input.value = '5555555555555';
            input.dispatchEvent(event);
            expect(input.value).toEqual('55');
            input.value = '9999999999999999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09');
            input.value = '-1';
            input.dispatchEvent(event);
            expect(input.value).toEqual('1');
            input.value = 'abcd';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });

        test('AM/PM', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="AM/PM">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '8';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '123456789.!@#$%^&*()-';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'AM';
            input.dispatchEvent(event);
            expect(input.value).toEqual('AM');
            input.value = 'PM';
            input.dispatchEvent(event);
            expect(input.value).toEqual('PM');
            input.value = 'BCDEFGHIJKLNOQRSTUVWXYZ';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = 'M';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
        });
    });

    describe('onkeydown mixed tokens', () => {
        test('$ #,##0.00', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="$ #,##0.00">';
            let input = document.getElementById('test-input')
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '7581003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 7,581,003');
            input.value = '75810.03';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 75,810.03');
            input.value = '9876543210';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 9,876,543,210');
            input.value = '1234567890.99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 1,234,567,890.99');
            input.value = '1234';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 1,234');
            input.value = '100';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 100');
            input.value = '100.5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 100.5');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 0');
            input.value = '-5000';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ -5,000');
            input.value = '-5000.75';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ -5,000.75');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ ');
        });

        test('$ #.##0,00', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="$ #.##0,00">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '7581003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 7.581.003');
            input.value = '75810,03';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 75.810,03');
            input.value = '9876543210';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 9.876.543.210');
            input.value = '1234567890,99';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 1.234.567.890,99');
            input.value = '1234';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 1.234');
            input.value = '100,5';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 100,5');
            input.value = '';
            input.dispatchEvent(event);
            expect(input.value).toEqual('');
            input.value = '0';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ 0');
            input.value = '-5000';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ -5.000');
            input.value = '-5000,75';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ -5.000,75');
            input.value = '!@#$%^&*';
            input.dispatchEvent(event);
            expect(input.value).toEqual('$ ');
        });

        test('dd/mm/yyyy', () => {
            document.body.innerHTML = '<input id="test-input" type="text" data-mask="dd/mm/yyyy">';
            let input = document.getElementById('test-input');
            const event = new InputEvent('input', { bubbles: true, cancelable: true });

            input.value = '20091999';
            input.dispatchEvent(event);
            expect(input.value).toEqual('20/09/1999');
            input.value = '992003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09/09/2003');
            input.value = '9122003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('09/12/2003');
            input.value = '3192003';
            input.dispatchEvent(event);
            expect(input.value).toEqual('31/09/2003');
            input.value = '31022005';
            input.dispatchEvent(event);
            expect(input.value).toEqual('31/02/2005');
            input.value = '20091';
            input.dispatchEvent(event);
            expect(input.value).toEqual('20/09/1');
        });
    });

    describe('render', () => {
        test('jSuites.mask.render', () => {
            //expect(jSuites.mask.render(1234567890.123456, { mask: '###,###.######' })).toBe('1,234,567,890.123456');
            //expect(jSuites.mask.render(123.456789, { mask: '0.0000####' })).toBe('123.456789');
            // expect(jSuites.mask.render(10000, { mask: '$#,##0;-$#,##0' })).toBe('$10,000');
            // expect(jSuites.mask.render(-10000, { mask: '$#,##0;-$#,##0' })).toBe('-$10,000');
        });

        test('currency', () => {
            expect(jSuites.mask.render(-13552.94219, { mask: '# ##0'}, true)).toBe('-13 553');
            expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
            expect(jSuites.mask.render(123.4, { mask: '#,##0.0000' }, true)).toBe('123.4000');
            expect(jSuites.mask.render(987654321.98765, { mask: '#,##0.0000' }, true)).toBe('987,654,321.9877');
            expect(jSuites.mask.render(1234567890.123, { mask: '#,##0.00' })).toBe('1,234,567,890.123');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '#,##0' }, true)).toBe('79,998,007,920,000,000,000,000');
        });

        test('number', () => {
            expect(jSuites.mask.render(1.005, { mask: '0.00' }, true)).toBe('1.01');
            expect(jSuites.mask.render(11.45, { mask: '0.0' }, true)).toBe('11.5');
            expect(jSuites.mask.render(-11.45, { mask: '0.0' }, true)).toBe('-11.5');
            expect(jSuites.mask.render(1000000.0005, { mask: '0.000' }, true)).toBe('1000000.001');
            expect(jSuites.mask.render(-1000000.0005, { mask: '0.000' }, true)).toBe('-1000000.001');
            expect(jSuites.mask.render(-11.449, { mask: '0.00' }, true)).toBe('-11.45');
            expect(jSuites.mask.render(-11.455, { mask: '0.00' }, true)).toBe('-11.46');
            expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
        });

        test('scientific', () => {
            expect(jSuites.mask.render(12345678900, { mask: '0.00E+00' }, true)).toBe('1.23e+10');
            expect(jSuites.mask.render(98765432100000, { mask: '0.000000000E+00' }, true)).toBe('9.876543210e+13');
            expect(jSuites.mask.render(1234567890, { mask: '0.000000E+0' }, true)).toBe('1.234568e+9');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('7.9998e+22');
            expect(jSuites.mask.render(-79998007920000000000000, { mask: '0.0000E+00' }, true)).toBe('-7.9998e+22');
            expect(jSuites.mask.render(79998007920000000000000, { mask: '0.0000E+00' })).toBe('79998007920000000000000');
            expect(jSuites.mask.render(-79998007920000000000000, { mask: '0.0000E+00' })).toBe('-79998007920000000000000');
        });

        test('percentage', () => {
            expect(jSuites.mask.render('100%', { mask: '0%' })).toEqual('100%');
            expect(jSuites.mask.render('0%', { mask: '0%' })).toEqual('0%');
            expect(jSuites.mask.render(2.2, { mask: '0.00%' })).toEqual('220%');
            expect(jSuites.mask.render(0.1, { mask: '0%' }, true)).toBe('10%');
        });

        test('date', () => {
            // Basic date formats
            expect(jSuites.mask.render('2023-01-15', { mask: 'YYYY-MM-DD' })).toBe('2023-01-15');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD/MM/YYYY' })).toBe('15/01/2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'MM/DD/YYYY' })).toBe('01/15/2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD-MM-YYYY' })).toBe('15-01-2023');

            // Short year format
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD/MM/YY' })).toBe('15/01/23');
            expect(jSuites.mask.render('2023-01-15', { mask: 'MM/DD/YY' })).toBe('01/15/23');

            // Month name formats
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD MMM YYYY' })).toBe('15 Jan 2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DD MMMM YYYY' })).toBe('15 January 2023');
            expect(jSuites.mask.render('2023-12-25', { mask: 'MMM DD, YYYY' })).toBe('Dec 25, 2023');
            expect(jSuites.mask.render('2023-12-25', { mask: 'MMMM DD, YYYY' })).toBe('December 25, 2023');

            // Day name formats
            expect(jSuites.mask.render('2023-01-15', { mask: 'DDD, DD MMM YYYY' })).toBe('Sun, 15 Jan 2023');
            expect(jSuites.mask.render('2023-01-15', { mask: 'DDDD, MMMM DD, YYYY' })).toBe('Sunday, January 15, 2023');

            // Date objects
            expect(jSuites.mask.render(new Date('2023-01-15'), { mask: 'DD/MM/YYYY' })).toBe('15/01/2023');
            expect(jSuites.mask.render(new Date('2023-01-15'), { mask: 'MMM DD, YYYY' })).toBe('Jan 15, 2023');

            // Edge cases
            expect(jSuites.mask.render('2023-02-01', { mask: 'DD MMM YY' })).toBe('01 Feb 23');
            expect(jSuites.mask.render('2023-12-31', { mask: 'DDD DD/MM/YYYY' })).toBe('Sun 31/12/2023');

            // Numbers
            expect(jSuites.mask.render(45245.5, { mask: 'MMM DD, YYYY' })).toBe('Nov 15, 2023');
            expect(jSuites.mask.render(45245.333, { mask: 'mm/dd/yyyy hh:mm:ss' })).toBe('11/15/2023 07:59:31');

            // Invalid dates
            //expect(jSuites.mask.render('invalid-date', { mask: 'DD/MM/YYYY' })).toBe('');
            expect(jSuites.mask.render('', { mask: 'DD/MM/YYYY' })).toBe('');
            expect(jSuites.mask.render(null, { mask: 'DD/MM/YYYY' })).toBe('');
        });

        test('time', () => {
            // Basic time formats (24-hour)
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM:SS' })).toBe('14:30:45');
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM' })).toBe('14:30');
            expect(jSuites.mask.render('09:05:03', { mask: 'HH:MM:SS' })).toBe('09:05:03');
            expect(jSuites.mask.render('09:05', { mask: 'HH:MM' })).toBe('09:05');

            // 12-hour format with AM/PM
            expect(jSuites.mask.render('14:30:45', { mask: 'HH:MM:SS AM/PM' })).toBe('02:30:45 PM');
            expect(jSuites.mask.render('02:30:45', { mask: 'HH:MM:SS AM/PM' })).toBe('02:30:45 AM');
            expect(jSuites.mask.render('00:30:45', { mask: 'HH:MM:SS AM/PM' })).toBe('12:30:45 AM');
            expect(jSuites.mask.render('12:30:45', { mask: 'HH:MM:SS AM/PM' })).toBe('12:30:45 PM');

            // 12-hour format without seconds
            expect(jSuites.mask.render('14:30', { mask: 'HH:MM AM/PM' })).toBe('02:30 PM');
            expect(jSuites.mask.render('02:30', { mask: 'HH:MM AM/PM' })).toBe('02:30 AM');
            expect(jSuites.mask.render('00:30', { mask: 'HH:MM AM/PM' })).toBe('12:30 AM');
            expect(jSuites.mask.render('12:30', { mask: 'HH:MM AM/PM' })).toBe('12:30 PM');

            // Single digit hours (H vs HH)
            expect(jSuites.mask.render('09:30:45', { mask: 'H:MM:SS' })).toBe('9:30:45');
            expect(jSuites.mask.render('14:30:45', { mask: 'H:MM:SS' })).toBe('14:30:45');
            expect(jSuites.mask.render('09:30', { mask: 'H:MM' })).toBe('9:30');

            // Minutes and seconds variations
            expect(jSuites.mask.render('14:05:03', { mask: 'HH:M:SS' })).toBe('14:5:03');
            expect(jSuites.mask.render('14:30:03', { mask: 'HH:MM:S' })).toBe('14:30:3');
            expect(jSuites.mask.render('14:05:03', { mask: 'H:M:S' })).toBe('14:5:3');

            // Date object inputs
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'HH:MM:SS' })).toBe('14:30:45');
            expect(jSuites.mask.render(new Date('2023-01-15T02:30:45'), { mask: 'HH:MM AM/PM' })).toBe('02:30 AM');
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'H:MM AM/PM' })).toBe('2:30 PM');

            // Different separators
            expect(jSuites.mask.render('14:30:45', { mask: 'HH.MM.SS' })).toBe('14.30.45');
            expect(jSuites.mask.render('14:30:45', { mask: 'HH-MM-SS' })).toBe('14-30-45');
            expect(jSuites.mask.render('14:30:45', { mask: 'HH MM SS' })).toBe('14 30 45');

            // Edge cases
            expect(jSuites.mask.render('00:00:00', { mask: 'HH:MM:SS' })).toBe('00:00:00');
            expect(jSuites.mask.render('23:59:59', { mask: 'HH:MM:SS' })).toBe('23:59:59');
            expect(jSuites.mask.render('00:00:00', { mask: 'HH:MM AM/PM' })).toBe('12:00 AM');
            expect(jSuites.mask.render('23:59:59', { mask: 'HH:MM AM/PM' })).toBe('11:59 PM');

            // Invalid times
            //expect(jSuites.mask.render('invalid-time', { mask: 'HH:MM:SS' })).toBe('');
            expect(jSuites.mask.render('25:30:45', { mask: 'HH:MM:SS' })).toBe('');
            expect(jSuites.mask.render('14:65:45', { mask: 'HH:MM:SS' })).toBe('');
            expect(jSuites.mask.render('', { mask: 'HH:MM:SS' })).toBe('');
            expect(jSuites.mask.render(null, { mask: 'HH:MM:SS' })).toBe('');

            // Numbers
            expect(jSuites.mask.render(0.5, { mask: 'HH:MM:SS AM/PM' })).toBe('12:00:00 PM');

            // Mixed datetime inputs (should extract time part)
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'HH:MM:SS' })).toBe('14:30:45');
            expect(jSuites.mask.render('2023-01-15T14:30:45Z', { mask: 'HH:MM AM/PM' })).toBe('02:30 PM');
        });

        test('datetime', () => {
            // Combined date and time formats
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'YYYY-MM-DD HH:MM:SS' })).toBe('2023-01-15 14:30:45');
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'DD/MM/YYYY HH:MM' })).toBe('15/01/2023 14:30');
            expect(jSuites.mask.render('2023-01-15 14:30:45', { mask: 'MMM DD, YYYY HH:MM AM/PM' })).toBe('Jan 15, 2023 02:30 PM');
            expect(jSuites.mask.render('2023-01-15 02:30:45', { mask: 'DDDD, MMMM DD, YYYY H:MM:SS AM/PM' })).toBe('Sunday, January 15, 2023 2:30:45 AM');

            // ISO 8601 formats
            expect(jSuites.mask.render('2023-01-15T14:30:45Z', { mask: 'YYYY-MM-DD HH:MM:SS' })).toBe('2023-01-15 14:30:45');

            // Date objects
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'DD/MM/YYYY HH:MM:SS' })).toBe('15/01/2023 14:30:45');
            expect(jSuites.mask.render(new Date('2023-01-15T14:30:45'), { mask: 'MMM DD, YYYY H:MM AM/PM' })).toBe('Jan 15, 2023 2:30 PM');
        });
    });

    /*
    describe('.extract', () => {
        test('currency', () => {
            expect(jSuites.mask.extract('$ 20,000.00', { mask: '$ #,##0.00' })).toEqual(20000.00)
            expect(jSuites.mask.extract('20,000.00', { mask: '#,##0.00' })).toEqual(20000.00)
            expect(jSuites.mask.extract('EU 20,000.00', { mask: '#,##0.00' })).toEqual(20000.00)
        });

        test('number', () => {
            expect(jSuites.mask.extract('9 liters', { mask: '0 liters' })).toEqual(9)
            expect(jSuites.mask.extract('1.5 liters', { mask: '0.0 liters' })).toEqual(1.5)
            expect(jSuites.mask.extract('$ 1.5 in gas liters', { mask: '$ 0.0 in gas liters' })).toEqual(1.5)
        });

        test('scientific', () => {
            expect(jSuites.mask.extract('1.23E+10', { mask: '0.00E+00' })).toEqual(12300000000)
            expect(jSuites.mask.extract('1.23E+3', { mask: '0.00E+00' })).toEqual(1230)
            expect(jSuites.mask.extract('4.5E-2', { mask: '0.00E+00' })).toEqual(0.045)
            expect(jSuites.mask.extract('9E-2', { mask: '0.00E+00' })).toEqual(0.09)
            expect(jSuites.mask.extract('9E+5', { mask: '0.00E+00' })).toEqual(900000)
        });

        test('percentage', () => {
            expect(jSuites.mask.extract('100%', { mask: '0%' })).toEqual('100%');
            expect(jSuites.mask.extract('0%', { mask: '0%' })).toEqual('0%');
        });

        test('date', () => {
            expect(jSuites.mask.extract('05/09/1999', { mask: 'dd/mm/yyyy' })).toEqual('1999-09-05 00:00:00')
            expect(jSuites.mask.extract('20/09/1999', { mask: 'd/mm/yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('5/09/1999', { mask: 'd/mm/yyyy' })).toEqual('1999-09-05 00:00:00')
            expect(jSuites.mask.extract('20/9/1999', { mask: 'dd/m/yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('05/12/1999', { mask: 'dd/m/yyyy' })).toEqual('1999-12-05 00:00:00')
            expect(jSuites.mask.extract('20/09/873', { mask: 'dd/mm/yyy' })).toEqual('1873-09-20 00:00:00')
            expect(jSuites.mask.extract('20/09/999', { mask: 'dd/mm/yyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('20/09/99', { mask: 'dd/mm/yy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('20/09/01', { mask: 'dd/mm/yy' })).toEqual('2001-09-20 00:00:00')
            expect(jSuites.mask.extract('20/Sep/1999', { mask: 'dd/mmm/yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('20/Sep/1999', { mask: 'dd/mon/yyyy' })).toEqual('1999-09-20 00:00:00')

            expect(jSuites.mask.extract('20/September/1999', { mask: 'dd/mmmm/yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('September/20/1999', { mask: 'mmmm/dd/yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('September, 20, 1999', { mask: 'mmmm, dd, yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('20/July/1999', { mask: 'dd/mmmm/yyyy' })).toEqual('1999-07-20 00:00:00')
            expect(jSuites.mask.extract('20/February/1999', { mask: 'dd/mmmm/yyyy' })).toEqual('1999-02-20 00:00:00')
            expect(jSuites.mask.extract('20/December/1999', { mask: 'dd/mmmm/yyyy' })).toEqual('1999-12-20 00:00:00')
            expect(jSuites.mask.extract('20/September/1999', { mask: 'dd/month/yyyy' })).toEqual('1999-09-20 00:00:00')
            expect(jSuites.mask.extract('20/July/1999', { mask: 'dd/month/yyyy' })).toEqual('1999-07-20 00:00:00')
            expect(jSuites.mask.extract('20/February/1999', { mask: 'dd/month/yyyy' })).toEqual('1999-02-20 00:00:00')
            expect(jSuites.mask.extract('20/December/1999', { mask: 'dd/month/yyyy' })).toEqual('1999-12-20 00:00:00')

            expect(jSuites.mask.extract('J, 20, 1999', { mask: 'MMMMM, dd, yyyy' })).toEqual('1999-01-20 00:00:00')
            expect(jSuites.mask.extract('M, 20, 1999', { mask: 'MMMMM, dd, yyyy' })).toEqual('1999-03-20 00:00:00')
            expect(jSuites.mask.extract('D, 20, 1999', { mask: 'MMMMM, dd, yyyy' })).toEqual('1999-12-20 00:00:00')
            expect(jSuites.mask.extract('S, 20, 1999', { mask: 'MMMMM, dd, yyyy' })).toEqual('1999-09-20 00:00:00')
        });

        test('time', () => {
            expect(jSuites.mask.extract('4:01:01', { mask: 'H:MI:SS' })).toEqual('1900-01-01 04:01:01')
            expect(jSuites.mask.extract('11:59:33', { mask: 'H:MI:SS' })).toEqual('1900-01-01 11:59:33')
            expect(jSuites.mask.extract('11:59:33', { mask: 'HH:MI:SS' })).toEqual('1900-01-01 11:59:33')
            expect(jSuites.mask.extract('22:55:33', { mask: 'HH24:MI:SS' })).toEqual('1900-01-01 22:55:33')
            expect(jSuites.mask.extract('02:55:33', { mask: 'HH24:MI:SS' })).toEqual('1900-01-01 02:55:33')
            expect(jSuites.mask.extract('7:59 AM', { mask: 'HH12:MI AM/PM' })).toEqual('1900-01-01 07:59:00')
            expect(jSuites.mask.extract('7:59 PM', { mask: 'HH12:MI AM/PM' })).toEqual('1900-01-01 19:59:00')
        });
    });*/
});
