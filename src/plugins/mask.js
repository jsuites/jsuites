import Helpers from '../utils/helpers';
import HelpersDate from '../utils/helpers.date';

function Mask() {
    // Currency 
    var tokens = {
        // Text
        text: [ '@' ],
        // Currency tokens
        currency: [ '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?', '#' ],
        // Percentage
        percentage: [ '0{1}(.{1}0+)?%' ],
        // Number
        numeric: [ '0{1}(.{1}0+)?' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'MONTH', 'MON', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'PM', 'AM', 'MI', 'SS', 'MS', 'Y', 'M' ],
        // Other
        general: [ 'A', '0', '[0-9a-zA-Z\$]+', '.']
    }

    var getDate = function() {
        if (this.mask.toLowerCase().indexOf('[h]') !== -1) {
            var m = 0;
            if (this.date[4]) {
                m = parseFloat(this.date[4] / 60);
            }
            var v = parseInt(this.date[3]) + m;
            v /= 24;
        } else if (! (this.date[0] && this.date[1] && this.date[2]) && (this.date[3] || this.date[4])) {
            v = Helpers.two(this.date[3]) + ':' + Helpers.two(this.date[4]) + ':' + Helpers.two(this.date[5]) 
        } else {
            if (this.date[0] && this.date[1] && ! this.date[2]) {
                this.date[2] = 1;
            }
            v = Helpers.two(this.date[0]) + '-' + Helpers.two(this.date[1]) + '-' + Helpers.two(this.date[2]);

            if (this.date[3] || this.date[4] || this.date[5]) {
                v += ' ' + Helpers.two(this.date[3]) + ':' + Helpers.two(this.date[4]) + ':' + Helpers.two(this.date[5]);
            }
        }

        return v;
    }

    var extractDate = function() {
         var v = '';
         if (! (this.date[0] && this.date[1] && this.date[2]) && (this.date[3] || this.date[4])) {
             if (this.mask.toLowerCase().indexOf('[h]') !== -1) {
                 v = parseInt(this.date[3]);
             } else {
                 v = parseInt(this.date[3]) % 24;
             }
             if (this.date[4]) {
                 v += parseFloat(this.date[4] / 60);
             }
             v /= 24;
         } else if (this.date[0] || this.date[1] || this.date[2] || this.date[3] || this.date[4] || this.date[5]) {
             if (this.date[0] && this.date[1] && ! this.date[2]) {
                 this.date[2] = 1;
             }
             var t = HelpersDate.now(this.date);
             v = HelpersDate.dateToNum(t);
             if (this.date[4]) {
                 v += parseFloat(this.date[4] / 60);
             }
         }
         return v;
     }

    var isBlank = function(v) {
        return v === null || v === '' || v === undefined ? true : false;
    }

    var isFormula = function(value) {
        return (''+value).chartAt(0) == '=';
    }

    var isNumeric = function(t) {
        return t === 'currency' || t === 'percentage' || t === 'numeric' ? true : false;
    }
    /**
     * Get the decimal defined in the mask configuration
     */
    var getDecimal = function(v) {
        if (v && Number(v) == v) {
            return '.';
        } else {
            if (this.options.decimal) {
                return this.options.decimal;
            } else {
                if (this.locale) {
                    var t = Intl.NumberFormat(this.locale).format(1.1);
                    return this.options.decimal = t[1];
                } else {
                    if (! v) {
                        v  = this.mask;
                    }
                    var e = new RegExp('0{1}(.{1})0+', 'ig');
                    var t = e.exec(v);
                    if (t && t[1] && t[1].length == 1) {
                        // Save decimal
                        this.options.decimal = t[1];
                        // Return decimal
                        return t[1];
                    } else {
                        // Did not find any decimal last resort the default
                        var e = new RegExp('#{1}(.{1})#+', 'ig');
                        var t = e.exec(v);
                        if (t && t[1] && t[1].length == 1) {
                            if (t[1] === ',') {
                                this.options.decimal = '.';
                            } else {
                                this.options.decimal = ',';
                            }
                        } else {
                            this.options.decimal = '1.1'.toLocaleString().substring(1,2);
                        }
                    }
                }
            }
        }

        if (this.options.decimal) {
            return this.options.decimal;
        } else {
            return null;
        }
    }

    var ParseValue = function(v, decimal) {
        if (v == '') {
            return '';
        }

        // Get decimal
        if (! decimal) {
            decimal = getDecimal.call(this);
        }

        // New value
        v = (''+v).split(decimal);

        // Signal
        var signal = v[0].match(/[-]+/g);
        if (signal && signal.length) {
            signal = true;
        } else {
            signal = false;
        }

        v[0] = v[0].match(/[0-9]+/g);

        if (v[0]) {
            if (signal) {
                v[0].unshift('-');
            }
            v[0] = v[0].join('');
        } else {
            if (signal) {
                v[0] = '-';
            }
        }

        if (v[0] || v[1]) {
            if (v[1] !== undefined) {
                v[1] = v[1].match(/[0-9]+/g);
                if (v[1]) {
                    v[1] = v[1].join('');
                } else {
                    v[1] = '';
                }
            }
        } else {
            return '';
        }
        return v;
    }

    var FormatValue = function(v, event) {
        if (v == '') {
            return '';
        }
        // Get decimal
        var d = getDecimal.call(this);
        // Convert value
        var o = this.options;
        // Parse value
        v = ParseValue.call(this, v);
        if (v == '') {
            return '';
        }
        // Temporary value
        if (v[0]) {
            var t = parseFloat(v[0] + '.1');
            if (o.style == 'percent') {
                t /= 100;
            }
        } else {
            var t = null;
        }

        if ((v[0] == '-' || v[0] == '-00') && ! v[1] && (event && event.inputType == "deleteContentBackward")) {
            return '';
        }

        var n = new Intl.NumberFormat(this.locale, o).format(t);
        n = n.split(d);
        if (typeof(n[1]) !== 'undefined') {
            var s = n[1].replace(/[0-9]*/g, '');
            if (s) {
                n[2] = s;
            }
        }

        if (v[1] !== undefined) {
            n[1] = d + v[1];
        } else {
            n[1] = '';
        }

        return n.join('');
    }

    var Format = function(e, event) {
        var v = Value.call(e);
        if (! v) {
            return;
        }

        // Get decimal
        var d = getDecimal.call(this);
        var n = FormatValue.call(this, v, event);
        var t = (n.length) - v.length;
        var index = Caret.call(e) + t;
        // Set value and update caret
        Value.call(e, n, index, true);
    }

    var Extract = function(v) {
        // Keep the raw value
        var current = ParseValue.call(this, v);
        if (current) {
            // Negative values
            if (current[0] === '-') {
                current[0] = '-0';
            }
            return parseFloat(current.join('.'));
        }
        return null;
    }

    /**
     * Caret getter and setter methods
     */
    var Caret = function(index, adjustNumeric) {
        if (index === undefined) {
            if (this.tagName == 'DIV') {
                var pos = 0;
                var s = window.getSelection();
                if (s) {
                    if (s.rangeCount !== 0) {
                        var r = s.getRangeAt(0);
                        var p = r.cloneRange();
                        p.selectNodeContents(this);
                        p.setEnd(r.endContainer, r.endOffset);
                        pos = p.toString().length;
                    }
                }
                return pos;
            } else {
                return this.selectionStart;
            }
        } else {
            // Get the current value
            var n = Value.call(this);

            // Review the position
            if (adjustNumeric) {
                var p = null;
                for (var i = 0; i < n.length; i++) {
                    if (n[i].match(/[\-0-9]/g) || n[i] == '.' || n[i] == ',') {
                        p = i;
                    }
                }

                // If the string has no numbers
                if (p === null) {
                    p = n.indexOf(' ');
                }

                if (index >= p) {
                    index = p + 1;
                }
            }

            // Do not update caret
            if (index > n.length) {
                index = n.length;
            }

            if (index) {
                // Set caret
                if (this.tagName == 'DIV') {
                    var s = window.getSelection();
                    var r = document.createRange();

                    if (this.childNodes[0]) {
                        r.setStart(this.childNodes[0], index);
                        s.removeAllRanges();
                        s.addRange(r);
                    }
                } else {
                    this.selectionStart = index;
                    this.selectionEnd = index;
                }
            }
        }
    }

    /**
     * Value getter and setter method
     */
    var Value = function(v, updateCaret, adjustNumeric) {
        if (this.tagName == 'DIV') {
            if (v === undefined) {
                var v = this.innerText;
                if (this.value && this.value.length > v.length) {
                    v = this.value;
                }
                return v;
            } else {
                if (this.innerText !== v) {
                    this.innerText = v;

                    if (updateCaret) {
                        Caret.call(this, updateCaret, adjustNumeric);
                    }
                }
            }
        } else {
            if (v === undefined) {
                return this.value;
            } else {
                if (this.value !== v) {
                    this.value = v;
                    if (updateCaret) {
                        Caret.call(this, updateCaret, adjustNumeric);
                    }
                }
            }
        }
    }

    // Labels
    var weekDaysFull = HelpersDate.weekdays;
    var weekDays = HelpersDate.weekdaysShort;
    var monthsFull = HelpersDate.months;
    var months = HelpersDate.monthsShort;

    var parser = {
        'YEAR': function(v, s) {
            var y = ''+new Date().getFullYear();

            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) <= 10) {
                if (this.values[this.index].length < s) {
                    this.values[this.index] += v;
                }
            }
            if (this.values[this.index].length == s) {
                if (s == 2) {
                    var y = y.substr(0,2) + this.values[this.index];
                } else if (s == 3) {
                    var y = y.substr(0,1) + this.values[this.index];
                } else if (s == 4) {
                    var y = this.values[this.index];
                }
                this.date[0] = y;
                this.index++;
            }
        },
        'YYYY': function(v) {
            parser.YEAR.call(this, v, 4);
        },
        'YYY': function(v) {
            parser.YEAR.call(this, v, 3);
        },
        'YY': function(v) {
            parser.YEAR.call(this, v, 2);
        },
        'FIND': function(v, a) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            if (this.event && this.event.inputType && this.event.inputType.indexOf('delete') > -1) {
                this.values[this.index] += v;
                return;
            }
            var pos = 0;
            var count = 0;
            var value = (this.values[this.index] + v).toLowerCase();
            for (var i = 0; i < a.length; i++) {
                if (a[i].toLowerCase().indexOf(value) == 0) {
                    pos = i;
                    count++;
                }
            }
            if (count > 1) {
                this.values[this.index] += v;
            } else if (count == 1) {
                // Jump number of chars
                var t = (a[pos].length - this.values[this.index].length) - 1;
                this.position += t;

                this.values[this.index] = a[pos];
                this.index++;
                return pos;
            }
        },
        'MMM': function(v) {
            var ret = parser.FIND.call(this, v, months);
            if (ret !== undefined) {
                this.date[1] = ret + 1;
            }
        },
        'MON': function(v) {
            parser['MMM'].call(this, v);
        },
        'MMMM': function(v) {
            var ret = parser.FIND.call(this, v, monthsFull);
            if (ret !== undefined) {
                this.date[1] = ret + 1;
            }
        },
        'MONTH': function(v) {
            parser['MMMM'].call(this, v);
        },
        'MMMMM': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            var pos = 0;
            var count = 0;
            var value = (this.values[this.index] + v).toLowerCase();
            for (var i = 0; i < monthsFull.length; i++) {
                if (monthsFull[i][0].toLowerCase().indexOf(value) == 0) {
                    this.values[this.index] = monthsFull[i][0];
                    this.date[1] = i + 1;
                    this.index++;
                    break;
                }
            }
        },
        'MM': function(v) {
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    this.date[1] = this.values[this.index] = '0' + v;
                    this.index++;
                } else if (parseInt(v) < 2) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[1] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.date[1] = this.values[this.index] += v;
                    this.index++;
                }
            }
        },
        'M': function(v) {
            var test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    this.values[this.index] = v;
                    if (v > 1) {
                        this.date[1] = this.values[this.index];
                        this.index++;
                    }
                } else {
                    if (this.values[this.index] == 1 && parseInt(v) < 3) {
                        this.date[1] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] == 0 && parseInt(v) > 0) {
                        this.date[1] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        var test = true;
                    }
                }
            } else {
                var test = true;
            }

            // Re-test
            if (test == true) {
                var t = parseInt(this.values[this.index]);
                if (t > 0 && t < 12) {
                    this.date[2] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'D': function(v) {
            var test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    this.values[this.index] = v;
                    if (parseInt(v) > 3) {
                        this.date[2] = this.values[this.index];
                        this.index++;
                    }
                } else {
                    if (this.values[this.index] == 3 && parseInt(v) < 2) {
                        this.date[2] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] == 1 || this.values[this.index] == 2) {
                        this.date[2] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] == 0 && parseInt(v) > 0) {
                        this.date[2] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        var test = true;
                    }
                }
            } else {
                var test = true;
            }

            // Re-test
            if (test == true) {
                var t = parseInt(this.values[this.index]);
                if (t > 0 && t < 32) {
                    this.date[2] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'DD': function(v) {
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 3 && parseInt(v) < 10) {
                    this.date[2] = this.values[this.index] = '0' + v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 3 && parseInt(v) < 2) {
                    this.date[2] = this.values[this.index] += v;
                    this.index++;
                } else if ((this.values[this.index] == 1 || this.values[this.index] == 2) && parseInt(v) < 10) {
                    this.date[2] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.date[2] = this.values[this.index] += v;
                    this.index++;
                }
            }
        },
        'DDD': function(v) {
            parser.FIND.call(this, v, weekDays);
        },
        'DY': function(v) {
            parser['DDD'].call(this, v);
        },
        'DDDD': function(v) {
            parser.FIND.call(this, v, weekDaysFull);
        },
        'DAY': function(v) {
            parser['DDDD'].call(this, v);
        },
        'HH12': function(v, two) {
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    if (two) {
                        v = 0 + v;
                    }
                    this.date[3] = this.values[this.index] = v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[3] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] < 1 && parseInt(v) < 10) {
                    this.date[3] = this.values[this.index] += v;
                    this.index++;
                }
            }
        },
        'HH24': function(v, two) {
            var test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (this.values[this.index] == null || this.values[this.index] == '') {
                    if (parseInt(v) > 2 && parseInt(v) < 10) {
                        if (two) {
                            v = 0 + v;
                        }
                        this.date[3] = this.values[this.index] = v;
                        this.index++;
                    } else if (parseInt(v) < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] == 2 && parseInt(v) < 4) {
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] < 2 && parseInt(v) < 10) {
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    }
                }
            }
        },
        'HH': function(v) {
            parser['HH24'].call(this, v, 1);
        },
        'H': function(v) {
            parser['HH24'].call(this, v, 0);
        },
        '\\[H\\]': function(v) {
            if (this.values[this.index] == undefined) {
                this.values[this.index] = '';
            }
            if (v.match(/[0-9]/g)) {
                this.date[3] = this.values[this.index] += v;
            } else {
                if (this.values[this.index].match(/[0-9]/g)) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'N60': function(v, i) {
            if (this.values[this.index] == null || this.values[this.index] == '') {
                if (parseInt(v) > 5 && parseInt(v) < 10) {
                    this.date[i] = this.values[this.index] = '0' + v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (parseInt(v) < 10) {
                    this.date[i] = this.values[this.index] += v;
                    this.index++;
                 }
            }
        },
        'MI': function(v) {
            parser.N60.call(this, v, 4);
        },
        'SS': function(v) {
            parser.N60.call(this, v, 5);
        },
        'AM/PM': function(v) {
            this.values[this.index] = '';
            if (v) {
                if (this.date[3] > 12) {
                    this.values[this.index] = 'PM';
                } else {
                    this.values[this.index] = 'AM';
                }
            }
            this.index++;
        },
        'WD': function(v) {
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) < 7) {
                this.values[this.index] = v;
            }
            if (this.value[this.index].length == 1) {
                this.index++;
            }
        },
        '0{1}(.{1}0+)?': function(v) {
            // Get decimal
            var decimal = getDecimal.call(this);
            // Negative number
            var neg = false;
            // Create if is blank
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            } else {
                if (this.values[this.index] == '-') {
                    neg = true;
                }
            }
            var current = ParseValue.call(this, this.values[this.index], decimal);
            if (current) {
                this.values[this.index] = current.join(decimal);
            }
            // New entry
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                // Replace the zero for a number
                if (this.values[this.index] == '0' && v > 0) {
                    this.values[this.index] = '';
                } else if (this.values[this.index] == '-0' && v > 0) {
                    this.values[this.index] = '-';
                }
                // Don't add up zeros because does not mean anything here
                if ((this.values[this.index] != '0' && this.values[this.index] != '-0') || v == decimal) {
                    this.values[this.index] += v;
                }
            } else if (decimal && v == decimal) {
                if (this.values[this.index].indexOf(decimal) == -1) {
                    if (! this.values[this.index]) {
                        this.values[this.index] = '0';
                    }
                    this.values[this.index] += v;
                }
            } else if (v == '-') {
                // Negative signed
                neg = true;
            }

            if (neg === true && this.values[this.index][0] !== '-') {
                this.values[this.index] = '-' + this.values[this.index];
            }
        },
        '0{1}(.{1}0+)?%': function(v) {
            parser['0{1}(.{1}0+)?'].call(this, v);

            if (this.values[this.index].match(/[\-0-9]/g)) {
                if (this.values[this.index] && this.values[this.index].indexOf('%') == -1) {
                    this.values[this.index] += '%';
                }
            } else {
                this.values[this.index] = '';
            }
        },
        '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?': function(v) {
            // Parse number
            parser['0{1}(.{1}0+)?'].call(this, v);
            // Get decimal
            var decimal = getDecimal.call(this);
            // Get separator
            var separator = this.tokens[this.index].substr(1,1);
            // Negative
            var negative = this.values[this.index][0] === '-' ? true : false;
            // Current value
            var current = ParseValue.call(this, this.values[this.index], decimal);

            // Get main and decimal parts
            if (current !== '') {
                // Format number
                var n = current[0].match(/[0-9]/g);
                if (n) {
                    // Format
                    n = n.join('');
                    var t = [];
                    var s = 0;
                    for (var j = n.length - 1; j >= 0 ; j--) {
                        t.push(n[j]);
                        s++;
                        if (! (s % 3)) {
                            t.push(separator);
                        }
                    }
                    t = t.reverse();
                    current[0] = t.join('');
                    if (current[0].substr(0,1) == separator) {
                        current[0] = current[0].substr(1);
                    }
                } else {
                    current[0] = '';
                }

                // Value
                this.values[this.index] = current.join(decimal);

                // Negative
                if (negative) {
                    this.values[this.index] = '-' + this.values[this.index];
                }
            }
        },
        '0': function(v) {
            if (v.match(/[0-9]/g)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '[0-9a-zA-Z$]+': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            var t = this.tokens[this.index];
            var s = this.values[this.index];
            var i = s.length;

            if (t[i] == v) {
                this.values[this.index] += v;

                if (this.values[this.index] == t) {
                    this.index++;
                }
            } else {
                this.values[this.index] = t;
                this.index++;

                if (v.match(/[\-0-9]/g)) {
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'A': function(v) {
            if (v.match(/[a-zA-Z]/gi)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '.': function(v) {
            parser['[0-9a-zA-Z$]+'].call(this, v);
        },
        '@': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            this.values[this.index] += v;
        }
    }

    /**
     * Get the tokens in the mask string
     */
    var getTokens = function(str) {
        if (this.type == 'general') {
            var t = [].concat(tokens.general);
        } else {
            var t = [].concat(tokens.currency, tokens.datetime, tokens.percentage, tokens.numeric, tokens.text, tokens.general);
        }
        // Expression to extract all tokens from the string
        var e = new RegExp(t.join('|'), 'gi');
        // Extract
        return str.match(e);
    }

    /**
     * Get the method of one given token
     */
    var getMethod = function(str) {
        if (! this.type) {
            var types = Object.keys(tokens);
        } else if (this.type == 'text') {
            var types = [ 'text' ];
        } else if (this.type == 'general') {
            var types = [ 'general' ];
        } else if (this.type == 'datetime') {
            var types = [ 'numeric', 'datetime', 'general' ];
        } else {
            var types = [ 'currency', 'percentage', 'numeric', 'general' ];
        }

        // Found
        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            for (var j = 0; j < tokens[type].length; j++) {
                var e = new RegExp(tokens[type][j], 'gi');
                var r = str.match(e);
                if (r) {
                    return { type: type, method: tokens[type][j] }
                }
            }
        }
    }

    /**
     * Identify each method for each token
     */
    var getMethods = function(t) {
        var result = [];
        for (var i = 0; i < t.length; i++) {
            var m = getMethod.call(this, t[i]);
            if (m) {
                result.push(m.method);
            } else {
                result.push(null);
            }
        }

        // Compatibility with excel
        for (var i = 0; i < result.length; i++) {
            if (result[i] == 'MM') {
                // Not a month, correct to minutes
                if (result[i-1] && result[i-1].indexOf('H') >= 0) {
                    result[i] = 'MI';
                } else if (result[i-2] && result[i-2].indexOf('H') >= 0) {
                    result[i] = 'MI';
                } else if (result[i+1] && result[i+1].indexOf('S') >= 0) {
                    result[i] = 'MI';
                } else if (result[i+2] && result[i+2].indexOf('S') >= 0) {
                    result[i] = 'MI';
                }
            }
        }

        return result;
    }

    /**
     * Get the type for one given token
     */
    var getType = function(str) {
        var m = getMethod.call(this, str);
        if (m) {
            var type = m.type;
        }

        if (type) {
            var numeric = 0;
            // Make sure the correct type
            var t = getTokens.call(this, str);
            for (var i = 0; i < t.length; i++) {
                m = getMethod.call(this, t[i]);
                if (m && isNumeric(m.type)) {
                    numeric++;
                }
            }
            if (numeric > 1) {
                type = 'general';
            }
        }

        return type;
    }

    /**
     * Parse character per character using the detected tokens in the mask
     */
    var parse = function() {
        // Parser method for this position
        if (typeof(parser[this.methods[this.index]]) == 'function') {
            parser[this.methods[this.index]].call(this, this.value[this.position]);
            this.position++;
        } else {
            this.values[this.index] = this.tokens[this.index];
            this.index++;
        }
    }

    var isFormula = function(value) {
        var v = (''+value)[0];
        return v == '=' ? true : false;
    }

    var toPlainString = function(num) {
        return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
          function(a,b,c,d,e) {
            return e < 0
              ? b + '0.' + Array(1-e-c.length).join(0) + c + d
              : b + c + d + Array(e-d.length+1).join(0);
          });
    }

    /**
     * Mask function
     * @param {mixed|string} JS input or a string to be parsed
     * @param {object|string} When the first param is a string, the second is the mask or object with the mask options
     */
    var obj = function(e, config, returnObject) {
        // Options
        var r = null;
        var t = null;
        var o = {
            // Element
            input: null,
            // Current value
            value: null,
            // Mask options
            options: {},
            // New values for each token found
            values: [],
            // Token position
            index: 0,
            // Character position
            position: 0,
            // Date raw values
            date: [0,0,0,0,0,0],
            // Raw number for the numeric values
            number: 0,
        }

        // This is a JavaScript Event
        if (typeof(e) == 'object') {
            // Element
            o.input = e.target;
            // Current value
            o.value = Value.call(e.target);
            // Current caret position
            o.caret = Caret.call(e.target);
            // Mask
            if (t = e.target.getAttribute('data-mask')) {
                o.mask = t;
            }
            // Type
            if (t = e.target.getAttribute('data-type')) {
                o.type = t;
            }
            // Options
            if (e.target.mask) {
                if (e.target.mask.options) {
                    o.options = e.target.mask.options;
                }
                if (e.target.mask.locale) {
                    o.locale = e.target.mask.locale;
                }
            } else {
                // Locale
                if (t = e.target.getAttribute('data-locale')) {
                    o.locale = t;
                    if (o.mask) {
                        o.options.style = o.mask;
                    }
                }
            }
            // Extra configuration
            if (e.target.attributes && e.target.attributes.length) {
                for (var i = 0; i < e.target.attributes.length; i++) {
                    var k = e.target.attributes[i].name;
                    var v = e.target.attributes[i].value;
                    if (k.substr(0,4) == 'data') {
                        o.options[k.substr(5)] = v;
                    }
                }
            }
        } else {
            // Options
            if (typeof(config) == 'string') {
                // Mask
                o.mask = config;
            } else {
                // Mask
                var k = Object.keys(config);
                for (var i = 0; i < k.length; i++) {
                    o[k[i]] = config[k[i]];
                }
            }

            if (typeof(e) === 'number') {
                // Get decimal
                getDecimal.call(o, o.mask);
                // Replace to the correct decimal
                e = (''+e).replace('.', o.options.decimal);
            }

            // Current
            o.value = e;

            if (o.input) {
                // Value
                Value.call(o.input, e);
                // Focus
                Helpers.focus(o.input);
                // Caret
                o.caret = Caret.call(o.input);
            }
        }

        // Mask detected start the process
        if (! isFormula(o.value) && (o.mask || o.locale)) {
            // Compatibility fixes
            if (o.mask) {
                // Remove []
                o.mask = o.mask.replace(new RegExp(/\[h]/),'|h|');
                o.mask = o.mask.replace(new RegExp(/\[.*?\]/),'');
                o.mask = o.mask.replace(new RegExp(/\|h\|/),'[h]');
                if (o.mask.indexOf(';') !== -1) {
                    var t = o.mask.split(';');
                    o.mask = t[0];
                }
                // Excel mask TODO: Improve
                if (o.mask.indexOf('##') !== -1) {
                    var d = o.mask.split(';');
                    if (d[0]) {
                        d[0] = d[0].replace('*', '\t');
                        d[0] = d[0].replace(new RegExp(/_-/g), ' ');
                        d[0] = d[0].replace(new RegExp(/_/g), '');
                        d[0] = d[0].replace('##0.###','##0.000');
                        d[0] = d[0].replace('##0.##','##0.00');
                        d[0] = d[0].replace('##0.#','##0.0');
                        d[0] = d[0].replace('##0,###','##0,000');
                        d[0] = d[0].replace('##0,##','##0,00');
                        d[0] = d[0].replace('##0,#','##0,0');
                    }
                    o.mask = d[0];
                }
                // Get type
                if (! o.type) {
                    o.type = getType.call(o, o.mask);
                }
                // Get tokens
                o.tokens = getTokens.call(o, o.mask);
            }

            // On new input
            if (typeof(e) !== 'object'  || ! e.inputType || ! e.inputType.indexOf('insert') || ! e.inputType.indexOf('delete')) {
                // Start transformation
                if (o.locale) {
                    if (o.input) {
                        Format.call(o, o.input, e);
                    } else {
                        var newValue = FormatValue.call(o, o.value);
                    }
                } else {
                    // Get tokens
                    o.methods = getMethods.call(o, o.tokens);
                    o.event = e;

                    // Go through all tokes
                    while (o.position < o.value.length && typeof(o.tokens[o.index]) !== 'undefined') {
                        // Get the appropriate parser
                        parse.call(o);
                    }

                    // New value
                    var newValue = o.values.join('');

                    // Add tokens to the end of string only if string is not empty
                    if (isNumeric(o.type) && newValue !== '') {
                        // Complement things in the end of the mask
                        while (typeof(o.tokens[o.index]) !== 'undefined') {
                            var t = getMethod.call(o, o.tokens[o.index]);
                            if (t && t.type == 'general') {
                                o.values[o.index] = o.tokens[o.index];
                            }
                            o.index++;
                        }

                        var adjustNumeric = true;
                    } else {
                        var adjustNumeric = false;
                    }

                    // New value
                    newValue = o.values.join('');

                    // Reset value
                    if (o.input) {
                        t = newValue.length - o.value.length;
                        if (t > 0) {
                            var caret = o.caret + t;
                        } else {
                            var caret = o.caret;
                        }
                        Value.call(o.input, newValue, caret, adjustNumeric);
                    }
                }
            }

            // Update raw data
            if (o.input) {
                var label = null;
                if (isNumeric(o.type)) {
                    // Extract the number
                    o.number = Extract.call(o, Value.call(o.input));
                    // Keep the raw data as a property of the tag
                    if (o.type == 'percentage') {
                        label = o.number / 100;
                    } else {
                        label = o.number;
                    }
                } else if (o.type == 'datetime') {
                    label = getDate.call(o);

                    if (o.date[0] && o.date[1] && o.date[2]) {
                        o.input.setAttribute('data-completed', true);
                    }
                }

                if (label) {
                    o.input.setAttribute('data-value', label);
                }
            }

            if (newValue !== undefined) {
                if (returnObject) {
                    return o;
                } else {
                    return newValue;
                }
            }
        }
    }

    // Get the type of the mask
    obj.getType = getType;

    // Extract the tokens from a mask
    obj.prepare = function(str, o) {
        if (! o) {
            o = {};
        }
        return getTokens.call(o, str);
    }

    /**
     * Apply the mask to a element (legacy)
     */
    obj.apply = function(e) {
        var v = Value.call(e.target);
        if (e.key.length == 1) {
            v += e.key;
        }
        Value.call(e.target, obj(v, e.target.getAttribute('data-mask')));
    }

    /**
     * Legacy support
     */
    obj.run = function(value, mask, decimal) {
        return obj(value, { mask: mask, decimal: decimal });
    }

    /**
     * Extract number from masked string
     */
    obj.extract = function(v, options, returnObject) {
        if (isBlank(v)) {
            return v;
        }
        if (typeof(options) != 'object') {
            return value;
        } else {
            options = Object.assign({}, options);

            if (! options.options) {
                options.options = {};
            }
        }

        // Compatibility
        if (! options.mask && options.format) {
            options.mask = options.format;
        }

        // Remove []
        if (options.mask) {
            if (options.mask.indexOf(';') !== -1) {
                var t = options.mask.split(';');
                options.mask = t[0];
            }
            options.mask = options.mask.replace(new RegExp(/\[h]/),'|h|');
            options.mask = options.mask.replace(new RegExp(/\[.*?\]/),'');
            options.mask = options.mask.replace(new RegExp(/\|h\|/),'[h]');
        }

        // Get decimal
        getDecimal.call(options, options.mask);

        var type = null;
        if (options.type == 'percent' || options.options.style == 'percent') {
            type = 'percentage';
        } else if (options.mask) {
            type = getType.call(options, options.mask);
        }

        if (type === 'general') {
            var o = obj(v, options, true);

            value = v;
        } else if (type === 'datetime') {
            if (v instanceof Date) {
                var t = HelpersDate.getDateString(value, options.mask);
            }

            var o = obj(v, options, true);

            if (Helpers.isNumeric(v)) {
                value = v;
            } else {
                var value = extractDate.call(o);
            }
        } else {
            var value = Extract.call(options, v);
            // Percentage
            if (type == 'percentage') {
                value /= 100;
            }
            var o = options;
        }

        o.value = value;

        if (! o.type && type) {
            o.type = type;
        }

        if (returnObject) {
            return o;
        } else {
            return value;
        }
    }

    /**
     * Render
     */
    obj.render = function(value, options, fullMask) {
        if (isBlank(value)) {
            return value;
        }

        if (typeof(options) != 'object') {
            return value;
        } else {
            options = Object.assign({}, options);

            if (! options.options) {
                options.options = {};
            }
        }

        // Compatibility
        if (! options.mask && options.format) {
            options.mask = options.format;
        }

        // Remove []
        if (options.mask) {
            if (options.mask.indexOf(';') !== -1) {
                var t = options.mask.split(';');
                options.mask = t[0];
            }
            options.mask = options.mask.replace(new RegExp(/\[h]/),'|h|');
            options.mask = options.mask.replace(new RegExp(/\[.*?\]/),'');
            options.mask = options.mask.replace(new RegExp(/\|h\|/),'[h]');
        }

        var type = null;
        if (options.type == 'percent' || options.options.style == 'percent') {
            type = 'percentage';
        } else if (options.mask) {
            type = getType.call(options, options.mask);
        } else if (value instanceof Date) {
            type = 'datetime';
        }

        // Fill with blanks
        var fillWithBlanks = false;

        if (type =='datetime' || options.type == 'calendar') {
            var t = HelpersDate.getDateString(value, options.mask);
            if (t) {
                value = t;
            }
            if (options.mask && fullMask) {
                fillWithBlanks = true;
            }
        } else {
            // Percentage
            if (type == 'percentage') {
                value *= 100;
            }
            // Number of decimal places
            if (typeof(value) === 'number') {
                var t = null;
                if (options.mask && fullMask && ((''+value).indexOf('e') === -1)) {
                    var d = getDecimal.call(options, options.mask);
                    if (options.mask.indexOf(d) !== -1) {
                        d = options.mask.split(d);
                        d = (''+d[1].match(/[0-9]+/g))
                        d = d.length;
                        t = value.toFixed(d);
                    } else {
                        t = value.toFixed(0);
                    }
                } else if (options.locale && fullMask) {
                    // Append zeros 
                    var d = (''+value).split('.');
                    if (options.options) {
                        if (typeof(d[1]) === 'undefined') {
                            d[1] = '';
                        }
                        var len = d[1].length;
                        if (options.options.minimumFractionDigits > len) {
                            for (var i = 0; i < options.options.minimumFractionDigits - len; i++) {
                                d[1] += '0';
                            }
                        }
                    }
                    if (! d[1].length) {
                        t = d[0]
                    } else {
                        t = d.join('.');
                    }
                    var len = d[1].length;
                    if (options.options && options.options.maximumFractionDigits < len) {
                        t = parseFloat(t).toFixed(options.options.maximumFractionDigits);
                    }
                } else {
                    t = toPlainString(value);
                }

                if (t !== null) {
                    value = t;
                    // Get decimal
                    getDecimal.call(options, options.mask);
                    // Replace to the correct decimal
                    if (options.options.decimal) {
                        value = value.replace('.', options.options.decimal);
                    }
                }
            } else {
                if (options.mask && fullMask) {
                    fillWithBlanks = true;
                }
            }
        }

        if (fillWithBlanks) {
            var s = options.mask.length - value.length;
            if (s > 0) {
                for (var i = 0; i < s; i++) {
                    value += ' ';
                }
            }
        }

        value = obj(value, options);

        // Numeric mask, number of zeros
        if (fullMask && type === 'numeric') {
            var maskZeros = options.mask.match(new RegExp(/^[0]+$/gm));
            if (maskZeros && maskZeros.length === 1) {
                var maskLength = maskZeros[0].length;
                if (maskLength > 3) {
                    value = '' + value;
                    while (value.length < maskLength) {
                        value = '0' + value;
                    }
                }
            }
        }

        return value;
    }

    obj.set = function(e, m) {
        if (m) {
            e.setAttribute('data-mask', m);
            // Reset the value
            var event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            e.dispatchEvent(event);
        }
    }

    // Helper to extract date from a string
    obj.extractDateFromString = function (date, format) {
        var o = obj(date, { mask: format }, true);

        // Check if in format Excel (Need difference with format date or type detected is numeric)
        if (date > 0 && Number(date) == date && (o.values.join("") !== o.value || o.type == "numeric")) {
            var d = new Date(Math.round((date - 25569) * 86400 * 1000));
            return d.getFullYear() + "-" + Helpers.two(d.getMonth()) + "-" + Helpers.two(d.getDate()) + ' 00:00:00';
        }

        var complete = false;

        if (o.values.length === o.tokens.length && o.values[o.values.length - 1].length >= o.tokens[o.tokens.length - 1].length) {
            complete = true;
        }

        if (o.date[0] && o.date[1] && (o.date[2] || complete)) {
            if (!o.date[2]) {
                o.date[2] = 1;
            }

            return o.date[0] + '-' + Helpers.two(o.date[1]) + '-' + Helpers.two(o.date[2]) + ' ' + Helpers.two(o.date[3]) + ':' + Helpers.two(o.date[4]) + ':' + Helpers.two(o.date[5]);
        }

        return '';
    }

    // Helper to convert date into string
    obj.getDateString = function (value, options) {
        if (!options) {
            var options = {};
        }

        // Labels
        if (options && typeof (options) == 'object') {
            var format = options.format;
        } else {
            var format = options;
        }

        if (!format) {
            format = 'YYYY-MM-DD';
        }

        // Convert to number of hours
        if (format.indexOf('[h]') >= 0) {
            var result = 0;
            if (value && Helpers.isNumeric(value)) {
                result = parseFloat(24 * Number(value));
                if (format.indexOf('mm') >= 0) {
                    var h = ('' + result).split('.');
                    if (h[1]) {
                        var d = 60 * parseFloat('0.' + h[1])
                        d = parseFloat(d.toFixed(2));
                    } else {
                        var d = 0;
                    }
                    result = parseInt(h[0]) + ':' + Helpers.two(d);
                }
            }
            return result;
        }

        // Date instance
        if (value instanceof Date) {
            value = HelpersDate.now(value);
        } else if (value && Helpers.isNumeric(value)) {
            value = HelpersDate.numToDate(value);
        }

        // Tokens
        var tokens = ['DAY', 'WD', 'DDDD', 'DDD', 'DD', 'D', 'Q', 'HH24', 'HH12', 'HH', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'YYYY', 'YYY', 'YY', 'Y', 'MONTH', 'MON', 'MMMMM', 'MMMM', 'MMM', 'MM', 'M', '.'];

        // Expression to extract all tokens from the string
        var e = new RegExp(tokens.join('|'), 'gi');
        // Extract
        var t = format.match(e);

        // Compatibility with excel
        for (var i = 0; i < t.length; i++) {
            if (t[i].toUpperCase() == 'MM') {
                // Not a month, correct to minutes
                if (t[i - 1] && t[i - 1].toUpperCase().indexOf('H') >= 0) {
                    t[i] = 'mi';
                } else if (t[i - 2] && t[i - 2].toUpperCase().indexOf('H') >= 0) {
                    t[i] = 'mi';
                } else if (t[i + 1] && t[i + 1].toUpperCase().indexOf('S') >= 0) {
                    t[i] = 'mi';
                } else if (t[i + 2] && t[i + 2].toUpperCase().indexOf('S') >= 0) {
                    t[i] = 'mi';
                }
            }
        }

        // Object
        var o = {
            tokens: t
        }

        // Value
        if (value) {
            var d = '' + value;
            var splitStr = (d.indexOf('T') !== -1) ? 'T' : ' ';
            d = d.split(splitStr);

            var h = 0;
            var m = 0;
            var s = 0;

            if (d[1]) {
                h = d[1].split(':');
                m = h[1] ? h[1] : 0;
                s = h[2] ? h[2] : 0;
                h = h[0] ? h[0] : 0;
            }

            d = d[0].split('-');

            if (d[0] && d[1] && d[2] && d[0] > 0 && d[1] > 0 && d[1] < 13 && d[2] > 0 && d[2] < 32) {

                // Data
                o.data = [d[0], d[1], d[2], h, m, s];

                // Value
                o.value = [];

                // Calendar instance
                var calendar = new Date(o.data[0], o.data[1] - 1, o.data[2], o.data[3], o.data[4], o.data[5]);

                // Get method
                var get = function (i) {
                    // Token
                    var t = this.tokens[i];
                    // Case token
                    var s = t.toUpperCase();
                    var v = null;

                    if (s === 'YYYY') {
                        v = this.data[0];
                    } else if (s === 'YYY') {
                        v = this.data[0].substring(1, 4);
                    } else if (s === 'YY') {
                        v = this.data[0].substring(2, 4);
                    } else if (s === 'Y') {
                        v = this.data[0].substring(3, 4);
                    } else if (t === 'MON') {
                        v = HelpersDate.months[calendar.getMonth()].substr(0, 3).toUpperCase();
                    } else if (t === 'mon') {
                        v = HelpersDate[calendar.getMonth()].substr(0, 3).toLowerCase();
                    } else if (t === 'MONTH') {
                        v = HelpersDate[calendar.getMonth()].toUpperCase();
                    } else if (t === 'month') {
                        v = HelpersDate[calendar.getMonth()].toLowerCase();
                    } else if (s === 'MMMMM') {
                        v = HelpersDate[calendar.getMonth()].substr(0, 1);
                    } else if (s === 'MMMM' || t === 'Month') {
                        v = HelpersDate[calendar.getMonth()];
                    } else if (s === 'MMM' || t == 'Mon') {
                        v = HelpersDate[calendar.getMonth()].substr(0, 3);
                    } else if (s === 'MM') {
                        v = Helpers.two(this.data[1]);
                    } else if (s === 'M') {
                        v = calendar.getMonth() + 1;
                    } else if (t === 'DAY') {
                        v = HelpersDate.weekdays[calendar.getDay()].toUpperCase();
                    } else if (t === 'day') {
                        v = HelpersDate.weekdays[calendar.getDay()].toLowerCase();
                    } else if (s === 'DDDD' || t == 'Day') {
                        v = HelpersDate.weekdays[calendar.getDay()];
                    } else if (s === 'DDD') {
                        v = HelpersDate.weekdays[calendar.getDay()].substr(0, 3);
                    } else if (s === 'DD') {
                        v = Helpers.two(this.data[2]);
                    } else if (s === 'D') {
                        v = this.data[2];
                    } else if (s === 'Q') {
                        v = Math.floor((calendar.getMonth() + 3) / 3);
                    } else if (s === 'HH24' || s === 'HH') {
                        v = Helpers.two(this.data[3]);
                    } else if (s === 'HH12') {
                        if (this.data[3] > 12) {
                            v = Helpers.two(this.data[3] - 12);
                        } else {
                            v = Helpers.two(this.data[3]);
                        }
                    } else if (s === 'H') {
                        v = this.data[3];
                    } else if (s === 'MI') {
                        v = Helpers.two(this.data[4]);
                    } else if (s === 'SS') {
                        v = Helpers.two(this.data[5]);
                    } else if (s === 'MS') {
                        v = calendar.getMilliseconds();
                    } else if (s === 'AM/PM') {
                        if (this.data[3] >= 12) {
                            v = 'PM';
                        } else {
                            v = 'AM';
                        }
                    } else if (s === 'WD') {
                        v = HelpersDate.weekdays[calendar.getDay()];
                    }

                    if (v === null) {
                        this.value[i] = this.tokens[i];
                    } else {
                        this.value[i] = v;
                    }
                }

                for (var i = 0; i < o.tokens.length; i++) {
                    get.call(o, i);
                }
                // Put pieces together
                value = o.value.join('');
            } else {
                value = '';
            }
        }

        return value;
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('input', function(e) {
            if (e.target.getAttribute('data-mask') || e.target.mask) {
                obj(e);
            }
        });
    }

    return obj;
}

export default Mask();