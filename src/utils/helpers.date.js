const Helpers = (function() {
    const component = {};

    // Excel like dates
    const excelInitialTime = Date.UTC(1900, 0, 0);
    const excelLeapYearBug = Date.UTC(1900, 1, 29);
    const millisecondsPerDay = 86400000;

    // Transform in two digits
    component.two = function(value) {
        value = '' + value;
        if (value.length === 1) {
            value = '0' + value;
        }
        return value;
    }

    component.isValidDate = function(d) {
        return d instanceof Date && !isNaN(d.getTime());
    }

    component.isValidDateFormat = function(date, format) {
        if (typeof date === 'string') {
            // Check format: YYYY-MM-DD using regex
            const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (match) {
                const year = Number(match[1]);
                const month = Number(match[2]) - 1;
                const day = Number(match[3]);
                const parsed = new Date(Date.UTC(year, month, day));
                // Return
                return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month && parsed.getUTCDate() === day;
            }
        }

        return false;
    }

    component.toString = function (date, dateOnly) {
        let y = null;
        let m = null;
        let d = null;
        let h = null;
        let i = null;
        let s = null;

        if (Array.isArray(date)) {
            y = date[0];
            m = date[1];
            d = date[2];
            h = date[3];
            i = date[4];
            s = date[5];
        } else {
            if (! date) {
                date = new Date();
            }
            y = date.getUTCFullYear();
            m = date.getUTCMonth() + 1;
            d = date.getUTCDate();
            h = date.getUTCHours();
            i = date.getUTCMinutes();
            s = date.getUTCSeconds();
        }

        if (dateOnly === true) {
            return component.two(y) + '-' + component.two(m) + '-' + component.two(d);
        } else {
            return component.two(y) + '-' + component.two(m) + '-' + component.two(d) + ' ' + component.two(h) + ':' + component.two(i) + ':' + component.two(s);
        }
    }

    component.toArray = function (value) {
        let date = value.split(((value.indexOf('T') !== -1) ? 'T' : ' '));
        let time = date[1];

        date = date[0].split('-');
        let y = parseInt(date[0]);
        let m = parseInt(date[1]);
        let d = parseInt(date[2]);
        let h = 0;
        let i = 0;

        if (time) {
            time = time.split(':');
            h = parseInt(time[0]);
            i = parseInt(time[1]);
        }
        return [y, m, d, h, i, 0];
    }

    component.arrayToStringDate = function(arr) {
        return component.toString(arr, false);
    }

    component.dateToNum = function(jsDate) {
        if (typeof(jsDate) === 'string') {
            jsDate = new Date(jsDate + '  GMT+0');
        }
        let jsDateInMilliseconds = jsDate.getTime();
        if (jsDateInMilliseconds >= excelLeapYearBug) {
            jsDateInMilliseconds += millisecondsPerDay;
        }
        jsDateInMilliseconds -= excelInitialTime;

        return jsDateInMilliseconds / millisecondsPerDay;
    }

    component.numToDate = function(excelSerialNumber, asArray) {
        // allow 0; only bail on null/undefined/empty
        if (excelSerialNumber === null || excelSerialNumber === undefined || excelSerialNumber === '') {
            return '';
        }

        const MS_PER_DAY = 86_400_000;
        const SEC_PER_DAY = 86_400;

        // Excel day 0 is 1899-12-31 (with the fake 1900-02-29 at serial 60)
        const EXCEL_DAY0_UTC_MS = Date.UTC(1899, 11, 31);

        let wholeDays = Math.floor(excelSerialNumber);
        let fractionalDay = excelSerialNumber - wholeDays;

        // Fix the 1900 leap-year bug: shift serials >= 60 back one day
        if (wholeDays >= 60) wholeDays -= 1;

        // Build midnight UTC of the day
        let ms = EXCEL_DAY0_UTC_MS + wholeDays * MS_PER_DAY;

        // Add time part using integer seconds to avoid FP jitter
        const seconds = Math.round(fractionalDay * SEC_PER_DAY);
        ms += seconds * 1000;

        const d = new Date(ms);

        const arr = [
            d.getUTCFullYear(),
            component.two(d.getUTCMonth() + 1),
            component.two(d.getUTCDate()),
            component.two(d.getUTCHours()),
            component.two(d.getUTCMinutes()),
            component.two(d.getUTCSeconds()),
        ];

        return asArray ? arr : component.toString(arr, false);
    }

    component.prettify = function (d, texts) {
        if (! texts) {
            texts = {
                justNow: 'Just now',
                xMinutesAgo: '{0}m ago',
                xHoursAgo: '{0}h ago',
                xDaysAgo: '{0}d ago',
                xWeeksAgo: '{0}w ago',
                xMonthsAgo: '{0} mon ago',
                xYearsAgo: '{0}y ago',
            }
        }

        if (d.indexOf('GMT') === -1 && d.indexOf('Z') === -1) {
            d += ' GMT';
        }

        let d1 = new Date();
        let d2 = new Date(d);
        let total = parseInt((d1 - d2) / 1000 / 60);

        const format = (t, o) => {
            return t.replace('{0}', o);
        }

        if (! total) {
            return texts.justNow;
        } else if (total < 90) {
            return format(texts.xMinutesAgo, total);
        } else if (total < 1440) { // One day
            return format(texts.xHoursAgo, Math.round(total / 60));
        } else if (total < 20160) { // 14 days
            return format(texts.xDaysAgo, Math.round(total / 1440));
        } else if (total < 43200) { // 30 days
            return format(texts.xWeeksAgo, Math.round(total / 10080));
        } else if (total < 1036800) { // 24 months
            return format(texts.xMonthsAgo, Math.round(total / 43200));
        } else { // 24 months+
            return format(texts.xYearsAgo, Math.round(total / 525600));
        }
    }

    component.prettifyAll = function () {
        let elements = document.querySelectorAll('.prettydate');
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute('data-date')) {
                elements[i].innerHTML = component.prettify(elements[i].getAttribute('data-date'));
            } else {
                if (elements[i].innerHTML) {
                    elements[i].setAttribute('title', elements[i].innerHTML);
                    elements[i].setAttribute('data-date', elements[i].innerHTML);
                    elements[i].innerHTML = component.prettify(elements[i].innerHTML);
                }
            }
        }
    }

    // Compatibility with jSuites
    component.now = component.toString;

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const translate = function(t) {
        if (typeof(document) !== "undefined" && document.dictionary) {
            return document.dictionary[t] || t;
        } else {
            return t;
        }
    }

    Object.defineProperty(component, 'weekdays', {
        get: function () {
            return weekdays.map(function(v) {
                return translate(v);
            });
        },
    });

    Object.defineProperty(component, 'weekdaysShort', {
        get: function () {
            return weekdays.map(function(v) {
                return translate(v).substring(0,3);
            });
        },
    });

    Object.defineProperty(component, 'months', {
        get: function () {
            return months.map(function(v) {
                return translate(v);
            });
        },
    });

    Object.defineProperty(component, 'monthsShort', {
        get: function () {
            return months.map(function(v) {
                return translate(v).substring(0,3);
            });
        },
    });

    return component;
})();

export default Helpers;