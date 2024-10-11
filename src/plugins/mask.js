import Helpers from '../utils/helpers';
import HelpersDate from '../utils/helpers.date';



function Mask() {
    // Currency
    const tokens = {
        // Text
        text: [ '@' ],
        // Currency tokens
        currency: [ '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?' ],
        // Scientific
        scientific: [ '0+(\\.{1}0+)?E{1}\\+0+' ],
        // Percentage
        percentage: [ '0+(\\.{1}0+)?%' ],
        // Number
        numeric: [ '\\?', '#', '0{1}([.,]{1}0+)?', '0' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'MONTH', 'MON', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'Y', 'M' ],
        // Other
        general: [ 'A', '[0-9a-zA-Z\\$]+', '.']
    }

    // Labels
    const weekDaysFull = HelpersDate.weekdays;
    const weekDays = HelpersDate.weekdaysShort;
    const monthsFull = HelpersDate.months;
    const months = HelpersDate.monthsShort;

    // Helpers

    /**
    * Returns if the given value is considered blank
    */
    const isBlank = function(v) {
        return v === null || v === '' || typeof(v) === 'undefined';
    }

    /**
    * Receives a string from method.type and returns if its a numeric method
    */
    const isNumeric = function(t) {
        return t === 'currency' || t === 'percentage' || t === 'scientific' || t === 'numeric' ? true : false;
    }

    /**
    * Rounds the first number based on the decimal precision of the second number.
    * 
    * `value` is a string representing the number to be rounded.
    * `formattedValue` is a string representing the number with the desired decimal precision (mask applied).
    * 
    * The function ensures that `value` is rounded to match the precision of `formattedValue` and
    * retains any leading zeros from the original `formattedValue`.
    */
    const getRounded = function(value, formattedValue, decimal) {
        // Determine the number of decimal places in formattedValue
        const decimalPlaces = formattedValue.split(decimal)[1]?.length || 0;
    
        // Convert value to a number for rounding
        let valueNum = parseFloat(value);
    
        // Round valueNum based on the decimal places in formattedValue
        const factor = Math.pow(10, decimalPlaces);
        let roundedNum = Math.round(valueNum * factor) / factor;
    
        // Handle integer rounding for cases like "21.99999"
        if (decimalPlaces === 0) {
            roundedNum = Math.round(valueNum);
        }
    
        // Return the rounded number as a string
        return roundedNum.toString().replace(',', decimal).replace('.', decimal).padStart(formattedValue.length, '0');
    }

    /**
     * Receives two numbers represented as strings, where both numbers are essentially the same
     * but have different decimal precision.
     * 
     * `more` is a string representing the number with more decimal places.
     * `fewer` is a string representing the number with fewer decimal places.
     */
    const shortenDecimal = function(more, fewer, decimal) {
        // Determine the number of decimal places in fewer
        const fewerSize = fewer.split(decimal)[1]?.length || 0;
    
        // Convert more to a number for rounding
        let moreNum = parseFloat(more.replace(',', '.'));
    
        // Round moreNum based on the decimal places in fewer
        const factor = Math.pow(10, fewerSize);
        let roundedNum = Math.round(moreNum * factor) / factor;

    
        // Convert the rounded number to a string with the required decimal places
        let roundedStr = roundedNum.toFixed(fewerSize);
    
        // Split the integer and decimal parts of the original more
        const [fewerIntPadding] = fewer.split(decimal);
    
        // Pad the integer part with leading zeros to match the original length of more
        const paddedInt = roundedStr.split('.')[0].padStart(fewerIntPadding.length, '0');
    
        // Reconstruct the final result with the correct decimal places
        const finalResult = paddedInt + decimal + roundedStr.split('.')[1];
    
        return finalResult;
    }

    /**
     * Get the decimal defined in the mask configuration
     */
    const getDecimal = function(v) {
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
                    var t = v.match(/[.,٫](?=\d{1,14})/g)
                    if (t) {
                        // Save decimal
                        this.options.decimal = t[0];
                        // Return decimal
                        return t[0];
                    } else {
                        this.options.decimal = '1.1'.toLocaleString().substring(1,2);
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

    /**
     * Caret position getter
     * `this` in this function should be the element with a caret
     */
    const getCaret = function() {
        if (this.tagName == 'DIV') {
            let s = this.getSelection();
            if (s) {
                if (s.rangeCount !== 0) {
                    let r = s.getRangeAt(0);
                    let p = r.cloneRange();
                    p.selectNodeContents(e);
                    p.setEnd(r.endContainer, r.endOffset);
                    p = p.toString();
                    if (p) {
                        pos = p.length;
                    } else {
                        pos = e.textContent.length;
                    }
                }
            }
            return pos;
        } else {
            return this.selectionStart;
        }
    }

    /**
     * Caret position setter
     * `this` in this function should be the element with a caret
     */
    const setCaret = function(index) {
        // Get the current value
        const n = this.value;

        // Do not update caret
        if (index > n.length) {
            index = n.length;
        }
        
        if (!isNaN(index) && index >= 0) {
            // Set caret
            if (this.tagName == 'DIV') {
                const s = window.getSelection();
                const r = document.createRange();
        
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

    /**
     * Methods to deal with different types of data
     */
    const parseMethods = {
        // Methods related to date mask
        'YEAR': function(v, s) {
            let y = new Date().getFullYear().toString();

            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) <= 10) {
                if (this.values[this.index].length < s) {
                    this.values[this.index] += v;
                }
            }
            if (this.values[this.index].length == s) {
                if (s === 2) {
                    y = y.substr(0,2) + this.values[this.index];
                } else if (s == 3) {
                    y = y.substr(0,1) + this.values[this.index];
                } else if (s == 4) {
                    y = this.values[this.index];
                }
                this.date[0] = y;
                this.index++;
            }
        },
        'YYYY': function(v) {
            parseMethods.YEAR.call(this, v, 4);
        },
        'YYY': function(v) {
            parseMethods.YEAR.call(this, v, 3);
        },
        'YY': function(v) {
            parseMethods.YEAR.call(this, v, 2);
        },
        'FIND': function(v, a) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            // TODO: tratar eventos
            if (this.event && this.event.inputType && this.event.inputType.indexOf('delete') > -1) {
                this.values[this.index] += v;
                return;
            }
            let pos = 0;
            let count = 0;
            let value = (this.values[this.index] + v).toLowerCase();
            for (let i = 0; i < a.length; i++) {
                if (a[i].toLowerCase().indexOf(value) === 0) {
                    pos = i;
                    count++;
                }
            }
            if (count > 1) {
                this.values[this.index] += v;
            } else if (count === 1) {
                // Jump a number of chars
                let t = (a[pos].length - this.values[this.index].length) - 1;
                this.position += t;
                this.values[this.index] = a[pos];
                this.index++;
                return pos;
            }
        },
        'MMM': function(v) {
            let ret = parseMethods.FIND.call(this, v, months);
            if (typeof(ret) !== 'undefined') {
                this.date[1] = ret + 1;
            }
        },
        'MON': function(v) {
            parseMethods['MMM'].call(this, v);
        },
        'MMMM': function(v) {
            let ret = parseMethods.FIND.call(this, v, monthsFull);
            if (typeof(ret) !== 'undefined') {
                this.date[1] = ret + 1;
            }
        },
        'MONTH': function(v) {
            parseMethods['MMMM'].call(this, v);
        },
        'MMMMM': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            let pos = 0;
            let count = 0;
            let value = (this.values[this.index] + v).toLowerCase();
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
            let test = false;
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
                        test = true;
                    }
                }
            } else {
                test = true;
            }

            // Re-test
            if (test == true) {
                const t = parseInt(this.values[this.index]);
                if (t > 0 && t < 12) {
                    this.date[1] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'D': function(v) {
            let test = false;
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
                        test = true;
                    }
                }
            } else {
                test = true;
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
            parseMethods.FIND.call(this, v, weekDays);
        },
        'DY': function(v) {
            parseMethods['DDD'].call(this, v);
        },
        'DDDD': function(v) {
            parseMethods.FIND.call(this, v, weekDaysFull);
        },
        'DAY': function(v) {
            parseMethods['DDDD'].call(this, v);
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
                        if (! two && this.values[this.index] === '0') {
                            this.values[this.index] = '';
                        }
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] < 2 && parseInt(v) < 10) {
                        if (! two && this.values[this.index] === '0') {
                            this.values[this.index] = '';
                        }
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    }
                }
            }
        },
        'HH': function(v) {
            parseMethods['HH24'].call(this, v, 1);
        },
        'H': function(v) {
            parseMethods['HH24'].call(this, v, 0);
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
            parseMethods.N60.call(this, v, 4);
        },
        'SS': function(v) {
            parseMethods.N60.call(this, v, 5);
        },
        'AM/PM': function(v) {
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }

            if (this.values[this.index] === '') {
                if (v.match(/a/i) && this.date[3] < 13) {
                    this.values[this.index] += 'A';
                } else if (v.match(/p/i)) {
                    this.values[this.index] += 'P';
                }
            } else if (this.values[this.index] === 'A' || this.values[this.index] === 'P') {
                this.values[this.index] += 'M';
                this.index++;
            }
        },
        'WD': function(v) {
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) < 7) {
                this.values[this.index] = v;
            }
            if (this.values[this.index].length == 1) {
                this.index++;
            }
        },
        // Numeric Methods
        '0{1}([.,]{1}0+)?': function(v, thousandSeparator) {
            let decimal = getDecimal.call(this);

            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            
            if (v === '-') {
                // Transform the number into negative if it is not already
                if (this.values[this.index][0] !== '-') {
                    this.values[this.index] = '-' + this.values[this.index];
                }
            } else if (v === '+') {
                // Transform the number into positive if it is negative
                if (this.values[this.index][0] === '-') {
                    this.values[this.index] = this.values[this.index].replace('-', '');
                }
            } else if (v === '0') {
                // Only adds zero if theres a non-zero number before
                if (this.values[this.index] != '0') {
                    this.values[this.index] += v;
                }
            } else if (v > 0 && v < 10) {
                // Verify if theres a zero to remove it, avoiding left zeros
                if (this.values[this.index] == '0') {
                    this.values[this.index] = this.values[this.index].replace('0', '');
                }

                this.values[this.index] += v;
            } else if (v === decimal) {
                // Only adds decimal when theres a number value on its left
                if (! this.values[this.index].includes(decimal) && this.values[this.index].replace('-', '').length > 0) {
                    this.values[this.index] += v;
                }
            } else if ([',', '.'].includes(v) && !thousandSeparator) {
                // Switch decimals when needed
                this.values[this.index] += decimal;
            }
        },
        '0+(\\.{1}0+)?%': function(v) {
            parseMethods['0{1}([.,]{1}0+)?'].call(this, v);

            // Adds the % only if it has a number value
            if (this.values[this.index].match(/[\-0-9]/g)) {
                if (this.values[this.index].indexOf('%') != -1) {
                    this.values[this.index] = this.values[this.index].replaceAll('%', '');
                }

                this.values[this.index] += '%';
            } else {
                this.values[this.index] = '';
            }
        },
        '0+(\\.{1}0+)?E{1}\\+0+': function(v) {
            parseMethods['0{1}([.,]{1}0+)?'].call(this, v);
        },
        '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?': function(v) {
            parseMethods['0{1}([.,]{1}0+)?'].call(this, v, true);

            const decimal = getDecimal.call(this);
            const separator = this.tokens[this.index].substr(1,1);
            const negative = this.values[this.index][0] === '-' ? true : false;

            if (v === separator) {
                this.values[this.index] = this.values[this.index].slice(0, this.values[this.index].length) + decimal;
            }
            
            this.values[this.index] = this.values[this.index].replaceAll(separator, '').replace('-', '');

            let val = this.values[this.index].split(decimal);

            // Add the separator
            if (val[0].length > 3) {
                for (let i = val[0].length - 3; i > 0; i -= 3) {
                    val[0] = val[0].slice(0, i) + separator + val[0].slice(i, val[0].length);
                }
            }

            this.values[this.index] = (negative ? '-' : '') + val.join(decimal);

            if (this.value.split(separator).length < this.values[this.index].split(separator).length) {
                this.signal = true;
            }
        },
        // General Methods
        '0': function(v) {
            if (v.match(/[0-9]/g)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '9': function(v) {
            parseMethods['0'].call(this, v);
        },
        '#': function(v) {
            parseMethods['0'].call(this, v);
        },
        '[0-9a-zA-Z\\$]+': function(v) {
            // Token to be added to the value
            let word = this.tokens[this.index];
            // Only if caret is before the change
            if (this.caret > this.values.join('').length && !this.value.includes(word)) {
                this.caret += word.length;
            }
            // Add token to the values
            this.values[this.index] = word;
            // Next token to process
            this.index++;
            // Repeat if is a number
            if (v.match(/[\-0-9]/g)) {
                // Repeat the character
                this.position--;
            }
        },
        'L': function(v) {
            if (v.match(/[a-zA-Z]/gi)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '\\?': function(v) {
            parseMethods['0'].call(this, v);
        },
        'A': function(v) {
            parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        'a': function(v) {
            parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        '.': function(v) {
            parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        '&': function(v) {
            if (v.match(/^[a-zA-Z ]+$/)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        'C': function(v) {
            parseMethods['&'].call(this, v);
        },
        '@': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            this.values[this.index] += v;
        }
    }

    const getTokens = function(str) {
        // Types TODO: Generate types so we can garantee that text,scientific, numeric,percentage, current are not duplicates. If they are, it will be general or broken.
        const expressions = [].concat(tokens.currency, tokens.datetime, tokens.percentage, tokens.scientific, tokens.numeric, tokens.text, tokens.general);
        // Expression to extract all tokens from the string
        const methods = str.match(new RegExp(expressions.join('|'), 'gi'));
        // Extract
        return methods;
    }

    /**
     * Get the method of one given token
     */
    const getMethod = function(str) {
        const types = Object.keys(tokens);

        // Found
        for (let i = 0; i < types.length; i++) {
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
    const getMethodsFromTokens = function(t) {
        let result = [];
        for (let i = 0; i < t.length; i++) {
            var m = getMethod.call(this, t[i]);
            if (m) {
                m.token = t[i].toUpperCase();
                result.push(m);
            } else {
                result.push(null);
            }
        }

        // Compatibility with Excel
        for (let i = 0; i < result.length; i++) {
            if (result[i] === 'MM') {
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

    const Component = function(str, config, fullmask) {
        // Internal default control of the mask system
        const control = {
            // Current raw value to be masked
            value: str,
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

        // Options defined by the user
        if (typeof(config) == 'string') {
            // Mask
            control.mask = config;
        } else {
            // Mask
            var k = Object.keys(config);
            for (var i = 0; i < k.length; i++) {
                control[k[i]] = config[k[i]];
            }
        }

        if (control.locale) {
            // Process the locale
        } else if (control.mask) {
            // Controls of Excel that should be ignore
            let d = control.mask.split(';');
            // Get only the first mask for now
            control.mask = d[0];
            // Get tokens which are the methods for parsing
            control.tokens = getTokens(control.mask);
            // Get methods from the tokens
            control.methods = getMethodsFromTokens(control.tokens);
            // Walk every character on the value
            while (control.position < control.value.length) {
                // Get the method name to handle the current token
                let methodName;
                if (control.methods[control.index]) {
                    methodName = control.methods[control.index].method;
                }
                // If that is a function
                if (typeof(parseMethods[methodName]) == 'function') {
                    parseMethods[methodName].call(control, control.value[control.position]);
                }
                control.position++;
            }

            let value = control.values.join('').trim();
            if (value) {
                // Complement things in the end of the mask
                do {
                    if (control.tokens[control.index]) {
                        // Get the method name to handle the current token
                        let methodType = control.methods[control.index].type;
                        if (methodType === 'general') {
                            control.values[control.index] = control.tokens[control.index];
                        }
                    }
                    control.index++;
                } while (control.tokens.length >= control.index);
            }

            if (fullmask) {
                // TODO: Handle Scientific Number
                let numericSequence = ''
                let positions = [];
                let fullNumber = '';
                let oldNum;

                for (let i = 0; i < control.tokens.length; i++) {
                    if (isNumeric(control.methods[i].type)) {
                        numericSequence += control.tokens[i];
                        positions.push(i);
                    }
                }

                for (let i = 0; i < positions.length; i++) {
                    if (control.values[i]) {
                        fullNumber += control.values[i];
                    }
                }

                oldNum = fullNumber;

                let [intMask, decMask] = numericSequence.split(control.options.decimal);
                let [intNum, decNum] = fullNumber.split(control.options.decimal);

                intNum = intNum.padStart(intMask.length, 0);

                if (!decNum && decMask) {
                    decNum = '0';
                    decNum = decNum.padEnd(decMask.length, 0);
                }


                let result;
                if (decNum && !decMask) {
                    // Number losing decimal part
                    result = getRounded(oldNum, intNum, control.options.decimal);
                } else if (decNum && decMask && decMask.length < decNum.length) {
                    // Number doesn't lose the decimal part, but got shorter
                    result = shortenDecimal(oldNum, intNum + control.options.decimal + decNum.slice(0, decMask.length), control.options.decimal);
                } else {
                    result = intNum + control.options.decimal + decNum;
                }

                let index = 0;
                for (let i = 0; i < positions.length; i++) {
                    control.values[i] = result.slice(index, index + control.tokens[i].length);
                    index += control.tokens[i].length;
                }

            }
            
            control.value = control.values.join('').trim();
        }

        return control;
    }

    Component.onkeydown = function(e) {
        // Element
        let element = e.target;
        // Property
        let property = 'value';
        // Get the value of the input
        if (element.tagName !== 'INPUT') {
            property = 'textContent';
        }
        // Value
        let value = element[property];
        // Get the mask
        let mask = element.getAttribute('data-mask');
        // Keep the current caret position
        let caret = getCaret.call(element);
        // Run mask
        let result = Component(value, { mask: mask, caret: caret });
        console.log(result)
        // New value
        let newValue = result.values.join('');
        // Apply the result back to the element
        if (newValue !== value && ! e.inputType.includes('delete')) {
            // Apply value
            element[property] = newValue;
            // Set the caret to the position before transformation
            setCaret.call(element, result.caret)
        }
    }

    Component.parse = function(value, options) {
        const tokens = getTokens(options.mask);
        const methods = getMethodsFromTokens(tokens);

        let result = ''; 
        let currentIndex = 0;
        let isDate = false;

        const datetime = { dd: '01', mm: '01', yy: '1900', hh: '00', mi: '00', ss: '00' }
        
        for (let i = 0; i < methods.length; i++) {
            if (methods[i].type === 'general') {
                currentIndex += tokens[i].length;
            } else if (methods[i].type === 'datetime') {
                let tokLength;
                isDate = true;

                // Find the currentIndex and the data about the datetime tokens
                if (methods[i].token === 'D') {
                    let day = value.slice(currentIndex, value.length).match(/\d+/)[0];
                    tokLength = day.length;
                    datetime.dd = day.padStart(2, 0);
                } else if (methods[i].token === 'DD') {
                    tokLength = 2;
                    datetime.dd = value.slice(currentIndex, currentIndex + tokLength)
                } else if (methods[i].token === 'M') {
                    let month = value.slice(currentIndex, value.length).match(/\d+/)[0];
                    tokLength = month.length;
                    datetime.mm = month.padStart(2, 0);
                } else if (methods[i].token === 'MM') {
                    tokLength = 2;
                    datetime.mm = value.slice(currentIndex, currentIndex + tokLength)
                } else if (['MMM', 'MON'].includes(methods[i].token)) {
                    tokLength = 3;
                    datetime.mm = `${months.indexOf(value.slice(currentIndex, currentIndex+tokLength)) + 1}`.padStart(2, 0);
                } else if (['MMMM', 'MONTH'].includes(methods[i].token)) {
                    let month = value.slice(currentIndex, value.length).match(/^[A-Za-z]+/)[0];
                    datetime.mm = `${monthsFull.indexOf(month) + 1}`.padStart(2, 0);
                    tokLength = month.length;
                } else if (methods[i].token === 'MMMMM') {
                    tokLength = 1;
                    let month = months.findIndex((month) => month[0] === value[currentIndex].toUpperCase());
                    datetime.mm = `${month + 1}`.padStart(2, 0);
                } else if (methods[i].token === 'YYYY') {
                    tokLength = 4;
                    datetime.yy = value.slice(currentIndex, currentIndex + tokLength)
                } else if (methods[i].token === 'YYY') {
                    tokLength = 3;
                    let year = value.slice(currentIndex, currentIndex + tokLength);
                    datetime.yy = 1 + year
                } else if (methods[i].token === 'YY') {
                    tokLength = 2;
                    let year = value.slice(currentIndex, currentIndex + tokLength);

                    if (year >= 40) {
                        datetime.yy = 19 + year
                    } else {
                        datetime.yy = 20 + year
                    }
                } else if (['H', 'HH12'].includes(methods[i].token)) {
                    let hour = value.slice(currentIndex, value.length).match(/\d+/)[0];
                    tokLength = hour.length;
                    datetime.hh = hour.padStart(2, 0);
                } else if (['HH', 'HH24'].includes(methods[i].token)) {
                    tokLength = 2;
                    datetime.hh = value.slice(currentIndex, currentIndex + tokLength);
                } else if (methods[i].token === 'MI') {
                    tokLength = 2;
                    datetime.mi = value.slice(currentIndex, currentIndex + tokLength);
                } else if (methods[i].token === 'SS') {
                    tokLength = 2;
                    datetime.ss = value.slice(currentIndex, currentIndex + tokLength);
                } else if (methods[i].token === 'AM/PM') {
                    tokLength = 2;
                    let v = value.slice(currentIndex, value.length);
                    if (v === 'PM') {
                        datetime.hh = `${parseInt(datetime.hh) + 12}`; 
                    }
                }

                currentIndex += tokLength
            } else if (isNumeric(methods[i].type)) {
                let decimal = getDecimal.call({ options }, options.mask);
                let num, exp;

                
                if (decimal === '.') {
                    num = value.slice(currentIndex, value.length).match(/[+-]?\d{1,3}(,\d{3})*(\.\d+)?/)[0];
                    currentIndex += num.length;
                    result += num.replace(/,/g, '');
                } else if (decimal === ',') {
                    num = value.slice(currentIndex, value.length).match(/[+-]?\d{1,3}(\.\d{3})*(,\d+)?/)[0];
                    currentIndex += num.length;
                    result += num.replace(/\./g, '').replace(decimal, '.');
                }

                if (methods[i].type === 'percentage') {
                    result /= 100;
                } else if (methods[i].type === 'scientific') {
                    // Ignores 'E'
                    currentIndex += 1;

                    // Get exponent
                    exp = value.slice(currentIndex, value.length).match(/[+-]?\d{1,3}(,\d{3})*(\.\d+)?/)[0];
                    currentIndex += exp.length;
                    result = Number(result) * (10 ** Number(exp));
                }

                result = Number(result);
            }
        }

        // If date tokens are present, return in date 'yyyy-mm-dd hh:mi:ss' format 
        // TODO: Receive the format from options.format
        if (isDate) {
            result = `${datetime.yy}-${datetime.mm}-${datetime.dd} ${datetime.hh}:${datetime.mi}:${datetime.ss}`;
        }

        return result;
    }

    return Component;
}

export default Mask();
