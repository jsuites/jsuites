import Helpers from "./helpers";

function HelpersDate() {
    var Component = {};

    Component.now = function (date, dateOnly) {
        var y = null;
        var m = null;
        var d = null;
        var h = null;
        var i = null;
        var s = null;

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

        if (dateOnly == true) {
            return Helpers.two(y) + '-' + Helpers.two(m) + '-' + Helpers.two(d);
        } else {
            return Helpers.two(y) + '-' + Helpers.two(m) + '-' + Helpers.two(d) + ' ' + Helpers.two(h) + ':' + Helpers.two(i) + ':' + Helpers.two(s);
        }
    }

    Component.toArray = function (value) {
        var date = value.split(((value.indexOf('T') !== -1) ? 'T' : ' '));
        var time = date[1];
        var date = date[0].split('-');
        var y = parseInt(date[0]);
        var m = parseInt(date[1]);
        var d = parseInt(date[2]);
        var h = 0;
        var i = 0;

        if (time) {
            time = time.split(':');
            h = parseInt(time[0]);
            i = parseInt(time[1]);
        }
        return [y, m, d, h, i, 0];
    }

    var excelInitialTime = Date.UTC(1900, 0, 0);
    var excelLeapYearBug = Date.UTC(1900, 1, 29);
    var millisecondsPerDay = 86400000;

    /**
     * Date to number
     */
    Component.dateToNum = function (jsDate) {
        if (typeof (jsDate) === 'string') {
            jsDate = new Date(jsDate + '  GMT+0');
        }
        var jsDateInMilliseconds = jsDate.getTime();
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
    Component.numToDate = function (excelSerialNumber) {
        var jsDateInMilliseconds = excelInitialTime + excelSerialNumber * millisecondsPerDay;
        if (jsDateInMilliseconds >= excelLeapYearBug) {
            jsDateInMilliseconds -= millisecondsPerDay;
        }

        const d = new Date(jsDateInMilliseconds);

        var date = [
            d.getUTCFullYear(),
            d.getUTCMonth() + 1,
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
        ];

        return Component.now(date);
    }

    // Jsuites calendar labels
    Component.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    Component.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Component.weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Component.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return Component;
}

export default HelpersDate();