const jSuites = require('../dist/jsuites');

describe('jSuites mask', () => {
  test('Percentage without decimal part', () => {
    var mask = '0%';

    expect(jSuites.mask(0, mask)).toBe('0%');
    expect(jSuites.mask('0', mask)).toBe('0%');
    expect(jSuites.mask('0%', mask)).toBe('0%');

    expect(jSuites.mask(0.0, mask)).toBe('0%');
    expect(jSuites.mask('0.0', mask)).toBe('0%');
    expect(jSuites.mask('0.0%', mask)).toBe('0%');

    expect(jSuites.mask(3.1, mask)).toBe('3%');
    expect(jSuites.mask('3.1', mask)).toBe('3%');
    expect(jSuites.mask('3.1%', mask)).toBe('3%');

    expect(jSuites.mask(3.5, mask)).toBe('4%');
    expect(jSuites.mask('3.5', mask)).toBe('4%');
    expect(jSuites.mask('3.5%', mask)).toBe('4%');

    expect(jSuites.mask(-1.4, mask)).toBe('-1%');
    expect(jSuites.mask('-1.4', mask)).toBe('-1%');
    expect(jSuites.mask('-1.4%', mask)).toBe('-1%');

    expect(jSuites.mask(-1.5, mask)).toBe('-2%');
    expect(jSuites.mask('-1.5', mask)).toBe('-2%');
    expect(jSuites.mask('-1.5%', mask)).toBe('-2%');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask(false, mask)).toBe(false);

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask('false', mask)).toBe('false');
  });

  test('Percentage with decimal part', () => {
    expect(jSuites.mask(0, '0,00%')).toBe('0,00%');
    expect(jSuites.mask('0', '0,00%')).toBe('0,00%');
    expect(jSuites.mask('0%', '0,00%')).toBe('0,00%');

    expect(jSuites.mask(1.555, '0,00%')).toBe('1,56%');
    expect(jSuites.mask('1.555', '0,00%')).toBe('1,56%');
    expect(jSuites.mask('1.555%', '0,00%')).toBe('1,56%');

    expect(jSuites.mask(1.554, '0,00%')).toBe('1,55%');
    expect(jSuites.mask('1.554', '0,00%')).toBe('1,55%');
    expect(jSuites.mask('1.554%', '0,00%')).toBe('1,55%');

    expect(jSuites.mask(-8.555, '0,0%')).toBe('-8,6%');
    expect(jSuites.mask('-8.555', '0,0%')).toBe('-8,6%');
    expect(jSuites.mask('-8.555%', '0,0%')).toBe('-8,6%');

    expect(jSuites.mask(-8.554, '0,0%')).toBe('-8,6%');
    expect(jSuites.mask('-8.554', '0,0%')).toBe('-8,6%');
    expect(jSuites.mask('-8.554%', '0,0%')).toBe('-8,6%');

    expect(jSuites.mask(true, '0,000%')).toBe(true);
    expect(jSuites.mask('true', '0,000%')).toBe('true');
    expect(jSuites.mask(false, '0,0000%')).toBe(false);
    expect(jSuites.mask('false', '0,0000%')).toBe('false');

    expect(jSuites.mask('test', '0,00000%')).toBe('test');
    expect(jSuites.mask('1a', '0,000000%')).toBe('1a');
    expect(jSuites.mask('a1', '0,0000000%')).toBe('a1');
  });

  test('Number without thousands separator and without decimal places', () => {
    var mask = '0_ ;-0 ';

    expect(jSuites.mask(-1, mask)).toBe('-1');
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe('0');
    expect(jSuites.mask('0', mask)).toBe('0');

    expect(jSuites.mask(1, mask)).toBe('1');
    expect(jSuites.mask('1', mask)).toBe('1');

    expect(jSuites.mask(-3.4, mask)).toBe('-3');
    expect(jSuites.mask('-3.4', mask)).toBe('-3');

    expect(jSuites.mask(-3.5, mask)).toBe('-4');
    expect(jSuites.mask('-3.5', mask)).toBe('-4');

    expect(jSuites.mask(6.54, mask)).toBe('7');
    expect(jSuites.mask('6.54', mask)).toBe('7');

    expect(jSuites.mask(11.499, mask)).toBe('11');
    expect(jSuites.mask('11.499', mask)).toBe('11');

    expect(jSuites.mask(1613.46, mask)).toBe('1613');
    expect(jSuites.mask('1613.46', mask)).toBe('1613');

    expect(jSuites.mask(-52313121.1, mask)).toBe('-52313121');
    expect(jSuites.mask('-52313121.1', mask)).toBe('-52313121');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
    expect(jSuites.mask('test', mask)).toBe('test');
  });

  test('Number without decimal places', () => {
    var mask = '#,##0_ ;-#,##0 ';

    expect(jSuites.mask(-1, mask)).toBe('-1');
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe('0');
    expect(jSuites.mask('0', mask)).toBe('0');

    expect(jSuites.mask(1, mask)).toBe('1');
    expect(jSuites.mask('1', mask)).toBe('1');

    expect(jSuites.mask(-3.4, mask)).toBe('-3');
    expect(jSuites.mask('-3.4', mask)).toBe('-3');

    expect(jSuites.mask(-3.5, mask)).toBe('-4');
    expect(jSuites.mask('-3.5', mask)).toBe('-4');

    expect(jSuites.mask(6.54, mask)).toBe('7');
    expect(jSuites.mask('6.54', mask)).toBe('7');

    expect(jSuites.mask(11.499, mask)).toBe('11');
    expect(jSuites.mask('11.499', mask)).toBe('11');

    expect(jSuites.mask(1613.46, mask)).toBe('1,613');
    expect(jSuites.mask('1613.46', mask)).toBe('1,613');

    expect(jSuites.mask(-52313121.1, mask)).toBe('-52,313,121');
    expect(jSuites.mask('-52313121.1', mask)).toBe('-52,313,121');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
    expect(jSuites.mask('test', mask)).toBe('test');
  });

  test('Dates in "dd/mm/yyyy" format', () => {
    var mask = 'dd/mm/yyyy';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe(0);
    expect(jSuites.mask('0', mask)).toBe('0');

    expect(jSuites.mask(1, mask)).toBe('01/01/1900');
    expect(jSuites.mask('1', mask)).toBe('01/01/1900');
    expect(jSuites.mask('1900-01-01', mask)).toBe('01/01/1900');

    expect(jSuites.mask(58, mask)).toBe('27/02/1900');
    expect(jSuites.mask(59, mask)).toBe('28/02/1900');
    expect(jSuites.mask(60, mask)).toBe('28/02/1900');
    expect(jSuites.mask(61, mask)).toBe('01/03/1900');

    expect(jSuites.mask(44923, mask)).toBe('28/12/2022');
    expect(jSuites.mask(44923.99, mask)).toBe('28/12/2022');
    expect(jSuites.mask('44923.99', mask)).toBe('28/12/2022');
    expect(jSuites.mask(44923.01, mask)).toBe('28/12/2022');
    expect(jSuites.mask('44923.01', mask)).toBe('28/12/2022');
  });

  test('Dates in "yyyy-mm-dd" format', () => {
    var mask = 'yyyy-mm-dd';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe(0);
    expect(jSuites.mask('0', mask)).toBe('0');

    expect(jSuites.mask(1, mask)).toBe('1900-01-01');
    expect(jSuites.mask('1', mask)).toBe('1900-01-01');
    expect(jSuites.mask('1900-01-01', mask)).toBe('1900-01-01');

    expect(jSuites.mask(58, mask)).toBe('1900-02-27');
    expect(jSuites.mask(59, mask)).toBe('1900-02-28');
    expect(jSuites.mask(60, mask)).toBe('1900-02-28');
    expect(jSuites.mask(61, mask)).toBe('1900-03-01');

    expect(jSuites.mask(44923, mask)).toBe('2022-12-28');
    expect(jSuites.mask(44923.99, mask)).toBe('2022-12-28');
    expect(jSuites.mask('44923.99', mask)).toBe('2022-12-28');
    expect(jSuites.mask(44923.01, mask)).toBe('2022-12-28');
    expect(jSuites.mask('44923.01', mask)).toBe('2022-12-28');
  });

  test('Dates in "d/m/yy" format', () => {
    var mask = 'd/m/yy';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe(0);
    expect(jSuites.mask('0', mask)).toBe('0');

    expect(jSuites.mask(1, mask)).toBe('1/1/00');
    expect(jSuites.mask('1', mask)).toBe('1/1/00');
    expect(jSuites.mask('1900-01-01', mask)).toBe('1/1/00');

    expect(jSuites.mask(58, mask)).toBe('27/2/00');
    expect(jSuites.mask(59, mask)).toBe('28/2/00');
    expect(jSuites.mask(60, mask)).toBe('29/2/00');
    expect(jSuites.mask(61, mask)).toBe('1/3/00');

    expect(jSuites.mask(44923, mask)).toBe('28/12/22');
    expect(jSuites.mask(44923.99, mask)).toBe('28/12/22');
    expect(jSuites.mask('44923.99', mask)).toBe('28/12/22');
    expect(jSuites.mask(44923.01, mask)).toBe('28/12/22');
    expect(jSuites.mask('44923.01', mask)).toBe('28/12/22');
  });

  test('Dates in "dd/mmmm/yy" format', () => {
    var mask = 'dd/mmmm/yy';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe(0);
    expect(jSuites.mask('0', mask)).toBe('0');

    expect(jSuites.mask(1, mask)).toBe('01/January/1900');
    expect(jSuites.mask('1', mask)).toBe('01/January/1900');
    expect(jSuites.mask('1900-01-01', mask)).toBe('01/January/1900');

    expect(jSuites.mask(58, mask)).toBe('27/February/1900');
    expect(jSuites.mask(59, mask)).toBe('28/February/1900');
    expect(jSuites.mask(60, mask)).toBe('29/February/1900');
    expect(jSuites.mask(61, mask)).toBe('01/March/1900');

    expect(jSuites.mask(44923, mask)).toBe('28/December/2022');
    expect(jSuites.mask(44923.99, mask)).toBe('28/December/2022');
    expect(jSuites.mask('44923.99', mask)).toBe('28/December/2022');
    expect(jSuites.mask(44923.01, mask)).toBe('28/December/2022');
    expect(jSuites.mask('44923.01', mask)).toBe('28/December/2022');
  });

  test('Time in "h:mm:ss" format', () => {
    var mask = 'h:mm:ss';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe('0:00:00');
    expect(jSuites.mask('0', mask)).toBe('0:00:00');

    expect(jSuites.mask(44923.172, mask)).toBe('4:07:41');
    expect(jSuites.mask('44923.172', mask)).toBe('4:07:41');
    expect(jSuites.mask(44923.249, mask)).toBe('5:58:34');
    expect(jSuites.mask('44923.249', mask)).toBe('5:58:34');
    expect(jSuites.mask(44923.618, mask)).toBe('14:49:55');
    expect(jSuites.mask('44923.618', mask)).toBe('14:49:55');
    expect(jSuites.mask(44923.991, mask)).toBe('23:47:02');
    expect(jSuites.mask('44923.991', mask)).toBe('23:47:02');
  });

  test('Time in "h:mm AM/PM" format', () => {
    var mask = 'h:mm AM/PM';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe('12:00 AM');
    expect(jSuites.mask('0', mask)).toBe('12:00 AM');

    expect(jSuites.mask(44923.172, mask)).toBe('4:07 AM');
    expect(jSuites.mask('44923.172', mask)).toBe('4:07 AM');
    expect(jSuites.mask(44923.249, mask)).toBe('5:58 AM');
    expect(jSuites.mask('44923.249', mask)).toBe('5:58 AM');
    expect(jSuites.mask(44923.618, mask)).toBe('2:49 PM');
    expect(jSuites.mask('44923.618', mask)).toBe('2:49 PM');
    expect(jSuites.mask(44923.991, mask)).toBe('11:47 PM');
    expect(jSuites.mask('44923.991', mask)).toBe('11:47 PM');
  });

  test('Date and Time in "d/m/yy h:mm AM/PM" format', () => {
    var mask = 'd/m/yy h:mm AM/PM';

    expect(jSuites.mask(-1, mask)).toBe(-1);
    expect(jSuites.mask('-1', mask)).toBe('-1');

    expect(jSuites.mask(0, mask)).toBe('0/1/00 12:00 AM');
    expect(jSuites.mask('0', mask)).toBe('0/1/00 12:00 AM');

    expect(jSuites.mask(44923.172, mask)).toBe('28/12/22 4:07 AM');
    expect(jSuites.mask('44923.172', mask)).toBe('28/12/22 4:07 AM');
    expect(jSuites.mask(44923.249, mask)).toBe('28/12/22 5:58 AM');
    expect(jSuites.mask('44923.249', mask)).toBe('28/12/22 5:58 AM');
    expect(jSuites.mask(44923.618, mask)).toBe('28/12/22 2:49 PM');
    expect(jSuites.mask('44923.618', mask)).toBe('28/12/22 2:49 PM');
    expect(jSuites.mask(44923.991, mask)).toBe('28/12/22 11:47 PM');
    expect(jSuites.mask('44923.991', mask)).toBe('28/12/22 11:47 PM');
  });

  test('Currency in ""R$" #,##0" format', () => {
    var mask = '"R$" #,##0';

    expect(jSuites.mask(0, mask)).toBe('R$ 0');
    expect(jSuites.mask('0', mask)).toBe('R$ 0');

    expect(jSuites.mask(-1, mask)).toBe('-R$ 1');
    expect(jSuites.mask('-1', mask)).toBe('-R$ 1');

    expect(jSuites.mask(1, mask)).toBe('R$ 1');
    expect(jSuites.mask('1', mask)).toBe('R$ 1');

    expect(jSuites.mask(-1.5, mask)).toBe('-R$ 2');
    expect(jSuites.mask('-1.5', mask)).toBe('-R$ 2');

    expect(jSuites.mask(1.5, mask)).toBe('R$ 2');
    expect(jSuites.mask('1.5', mask)).toBe('R$ 2');

    expect(jSuites.mask(12345, mask)).toBe('R$ 12.345');
    expect(jSuites.mask('12345', mask)).toBe('R$ 12.345');

    expect(jSuites.mask(-12345, mask)).toBe('-R$ 12.345');
    expect(jSuites.mask('-12345', mask)).toBe('-R$ 12.345');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
  });

  test('Currency in ""R$" #,##0;-"R$" #,##0" format', () => {
    var mask = '"R$" #,##0;-"R$" #,##0';

    expect(jSuites.mask(0, mask)).toBe('R$ 0');
    expect(jSuites.mask('0', mask)).toBe('R$ 0');

    expect(jSuites.mask(-1, mask)).toBe('-R$ 1');
    expect(jSuites.mask('-1', mask)).toBe('-R$ 1');

    expect(jSuites.mask(1, mask)).toBe('R$ 1');
    expect(jSuites.mask('1', mask)).toBe('R$ 1');

    expect(jSuites.mask(-1.5, mask)).toBe('-R$ 2');
    expect(jSuites.mask('-1.5', mask)).toBe('-R$ 2');

    expect(jSuites.mask(1.5, mask)).toBe('R$ 2');
    expect(jSuites.mask('1.5', mask)).toBe('R$ 2');

    expect(jSuites.mask(12345, mask)).toBe('R$ 12.345');
    expect(jSuites.mask('12345', mask)).toBe('R$ 12.345');

    expect(jSuites.mask(-12345, mask)).toBe('-R$ 12.345');
    expect(jSuites.mask('-12345', mask)).toBe('-R$ 12.345');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
  });

  test('Currency in ""R$" #,##0.00" format', () => {
    var mask = '"R$" #,##0.00';

    expect(jSuites.mask(0, mask)).toBe('R$ 0,00');
    expect(jSuites.mask('0', mask)).toBe('R$ 0,00');

    expect(jSuites.mask(-1, mask)).toBe('-R$ 1,00');
    expect(jSuites.mask('-1', mask)).toBe('-R$ 1,00');

    expect(jSuites.mask(1, mask)).toBe('R$ 1,00');
    expect(jSuites.mask('1', mask)).toBe('R$ 1,00');

    expect(jSuites.mask(-1.5, mask)).toBe('-R$ 1,50');
    expect(jSuites.mask('-1.5', mask)).toBe('-R$ 1,50');

    expect(jSuites.mask(1.5, mask)).toBe('R$ 1,50');
    expect(jSuites.mask('1.5', mask)).toBe('R$ 1,50');

    expect(jSuites.mask(12345, mask)).toBe('R$ 12.345,00');
    expect(jSuites.mask('12345', mask)).toBe('R$ 12.345,00');

    expect(jSuites.mask(-12345, mask)).toBe('-R$ 12.345,00');
    expect(jSuites.mask('-12345', mask)).toBe('-R$ 12.345,00');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
  });

  test('Currency in ""R$" #,##0.00;-"R$" #,##0.00" format', () => {
    var mask = '"R$" #,##0.00;-"R$" #,##0.00';

    expect(jSuites.mask(0, mask)).toBe('R$ 0,00');
    expect(jSuites.mask('0', mask)).toBe('R$ 0,00');

    expect(jSuites.mask(-1, mask)).toBe('-R$ 1,00');
    expect(jSuites.mask('-1', mask)).toBe('-R$ 1,00');

    expect(jSuites.mask(1, mask)).toBe('R$ 1,00');
    expect(jSuites.mask('1', mask)).toBe('R$ 1,00');

    expect(jSuites.mask(-1.5, mask)).toBe('-R$ 1,50');
    expect(jSuites.mask('-1.5', mask)).toBe('-R$ 1,50');

    expect(jSuites.mask(1.5, mask)).toBe('R$ 1,50');
    expect(jSuites.mask('1.5', mask)).toBe('R$ 1,50');

    expect(jSuites.mask(12345, mask)).toBe('R$ 12.345,00');
    expect(jSuites.mask('12345', mask)).toBe('R$ 12.345,00');

    expect(jSuites.mask(-12345, mask)).toBe('-R$ 12.345,00');
    expect(jSuites.mask('-12345', mask)).toBe('-R$ 12.345,00');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
  });

  test('Accounting in "_-"R$" * #,##0_-;-"R$" * #,##0_-;_-"R$" * "-"_-;_-@_-" format', () => {
    var mask = '_-"R$" * #,##0_-;-"R$" * #,##0_-;_-"R$" * "-"_-;_-@_-';

    expect(jSuites.mask(0, mask)).toBe(' R$ - ');
    expect(jSuites.mask('0', mask)).toBe(' R$ - ');

    expect(jSuites.mask(-1, mask)).toBe('-R$ 1 ');
    expect(jSuites.mask('-1', mask)).toBe('-R$ 1 ');

    expect(jSuites.mask(1, mask)).toBe(' R$ 1 ');
    expect(jSuites.mask('1', mask)).toBe(' R$ 1 ');

    expect(jSuites.mask(-1.5, mask)).toBe('-R$ 2 ');
    expect(jSuites.mask('-1.5', mask)).toBe('-R$ 2 ');

    expect(jSuites.mask(1.5, mask)).toBe(' R$ 2 ');
    expect(jSuites.mask('1.5', mask)).toBe(' R$ 2 ');

    expect(jSuites.mask(12345, mask)).toBe(' R$ 12.345 ');
    expect(jSuites.mask('12345', mask)).toBe(' R$ 12.345 ');

    expect(jSuites.mask(-12345, mask)).toBe('-R$ 12.345 ');
    expect(jSuites.mask('-12345', mask)).toBe('-R$ 12.345 ');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
  });

  test('Accounting in "_-"R$" * #,##0.00_-;-"R$" * #,##0.00_-;_-"R$" * "-"??_-;_-@_-" format', () => {
    var mask = '_-"R$" * #,##0.00_-;-"R$" * #,##0.00_-;_-"R$" * "-"??_-;_-@_-';

    expect(jSuites.mask(0, mask)).toBe(' R$ -   ');
    expect(jSuites.mask('0', mask)).toBe(' R$ -   ');

    expect(jSuites.mask(-1, mask)).toBe('-R$ 1,00 ');
    expect(jSuites.mask('-1', mask)).toBe('-R$ 1,00 ');

    expect(jSuites.mask(1, mask)).toBe(' R$ 1,00 ');
    expect(jSuites.mask('1', mask)).toBe(' R$ 1,00 ');

    expect(jSuites.mask(-1.5, mask)).toBe('-R$ 1,50 ');
    expect(jSuites.mask('-1.5', mask)).toBe('-R$ 1,50 ');

    expect(jSuites.mask(1.5, mask)).toBe(' R$ 1,50 ');
    expect(jSuites.mask('1.5', mask)).toBe(' R$ 1,50 ');

    expect(jSuites.mask(12345, mask)).toBe(' R$ 12.345,00 ');
    expect(jSuites.mask('12345', mask)).toBe(' R$ 12.345,00 ');

    expect(jSuites.mask(-12345, mask)).toBe('-R$ 12.345,00 ');
    expect(jSuites.mask('-12345', mask)).toBe('-R$ 12.345,00 ');

    expect(jSuites.mask(true, mask)).toBe(true);
    expect(jSuites.mask('true', mask)).toBe('true');
    expect(jSuites.mask(false, mask)).toBe(false);
    expect(jSuites.mask('false', mask)).toBe('false');

    expect(jSuites.mask('test', mask)).toBe('test');
    expect(jSuites.mask('1a', mask)).toBe('1a');
    expect(jSuites.mask('a1', mask)).toBe('a1');
  });

  test('jSuites.mask.render', () => {
  //expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
  //expect(jSuites.mask.render(0.128899, { mask: '$ #.##0,00' }, true)).toBe('$ 0,13');
  });
});
