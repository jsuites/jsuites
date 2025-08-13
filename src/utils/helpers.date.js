function HelpersDate() {
    const Component = {};

    // Transform in two digits
    Component.two = function(value) {
        value = '' + value;
        if (value.length === 1) {
            value = '0' + value;
        }
        return value;
    }

    Component.now = function (date, dateOnly) {
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
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            i = date.getMinutes();
            s = date.getSeconds();
        }

        if (dateOnly === true) {
            return Component.two(y) + '-' + Component.two(m) + '-' + Component.two(d);
        } else {
            return Component.two(y) + '-' + Component.two(m) + '-' + Component.two(d) + ' ' + Component.two(h) + ':' + Component.two(i) + ':' + Component.two(s);
        }
    }

    Component.toArray = function (value) {
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

    const excelInitialTime = Date.UTC(1900, 0, 0);
    const excelLeapYearBug = Date.UTC(1900, 1, 29);
    const millisecondsPerDay = 86400000;

    /**
     * Date to number
     */
    Component.dateToNum = function (jsDate) {
        if (typeof (jsDate) === 'string') {
            jsDate = new Date(jsDate + '  GMT+0');
        }
        let jsDateInMilliseconds = jsDate.getTime();
        if (jsDateInMilliseconds >= excelLeapYearBug) {
            jsDateInMilliseconds += millisecondsPerDay;
        }
        jsDateInMilliseconds -= excelInitialTime;

        return jsDateInMilliseconds / millisecondsPerDay;
    }

    /**
     * Number to date
     *
     * IMPORTANT: Excel incorrectly considers 1900 to be a leap year
     */
    Component.numToDate = function(excelSerialNumber) {
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
            d.getUTCMonth() + 1,
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
        ];

        return Component.now(arr);
    }

    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const translate = function(t) {
        if (typeof(document) !== "undefined" && document.dictionary) {
            return document.dictionary[t] || t;
        } else {
            return t;
        }
    }


    Object.defineProperty(Component, 'weekdays', {
        get: function () {
            return weekdays.map(function(v) {
                return translate(v);
            });
        },
    });

    Object.defineProperty(Component, 'weekdaysShort', {
        get: function () {
            return weekdays.map(function(v) {
                return translate(v).substring(0,3);
            });
        },
    });

    Object.defineProperty(Component, 'months', {
        get: function () {
            return months.map(function(v) {
                return translate(v);
            });
        },
    });

    Object.defineProperty(Component, 'monthsShort', {
        get: function () {
            return months.map(function(v) {
                return translate(v).substring(0,3);
            });
        },
    });

    return Component;
}

export default HelpersDate();