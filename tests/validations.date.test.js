import validations from '../src/plugins/validations.js';

// Run under a timezone away from UTC (TZ=EST5EDT, Europe/London) to cover the local/UTC parsing
describe('Date validations', () => {
  const options = { criteria: 'between', value: ['2026-10-05', '2026-10-19'] };

  test('date only bounds are local dates, like the date and time of the calendar', () => {
    expect(validations.date('2026-10-05 00:00:00', options)).toBe(true);
    expect(validations.date('2026-10-19 00:00:00', options)).toBe(true);
    expect(validations.date('2026-10-04 23:59:59', options)).toBe(false);
    expect(validations.date('2026-10-20 00:00:00', options)).toBe(false);
  });

  test('date only values compare with date only bounds', () => {
    expect(validations.date('2026-10-05', options)).toBe(true);
    expect(validations.date('2026-10-19', options)).toBe(true);
    expect(validations.date('2026-10-20', options)).toBe(false);
  });

  test('date only and date time are the same day at midnight', () => {
    expect(validations.date('2026-10-19 00:00:00', { criteria: '=', value: ['2026-10-19'] })).toBe(true);
    expect(validations.date('2026-10-19', { criteria: '=', value: ['2026-10-19 00:00:00'] })).toBe(true);
  });

  test('Excel serial numbers are dates, as values and as bounds', () => {
    // 46300 is 2026-10-05 and 46314 is 2026-10-19
    const serials = { criteria: 'between', value: [46300, 46314] };
    expect(validations.date('2026-10-05 00:00:00', serials)).toBe(true);
    expect(validations.date('2026-10-19 00:00:00', serials)).toBe(true);
    expect(validations.date('2026-10-20 00:00:00', serials)).toBe(false);
    expect(validations.date(46314, options)).toBe(true);
    expect(validations.date(46315, options)).toBe(false);
    expect(validations.date(46314.5, serials)).toBe(false);
  });

  test('relative dates and invalid dates', () => {
    let d = new Date();
    let today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    expect(validations.date(today, { criteria: '=', value: ['today'] })).toBe(true);
    expect(validations.date('2023-15-07', options)).toBe(false);
    expect(validations.date('today', options)).toBe(false);
  });
});
