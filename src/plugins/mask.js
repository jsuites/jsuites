import Helpers from '../utils/helpers';
import HelpersDate from '../utils/helpers.date';



function Mask() {
    // Currency
    const tokens = {
        // Text
        text: [ '@', '&' ],
        // Currency tokens
        currency: [ '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?' ],
        // Scientific
        scientific: [ '0+([.,]{1}0+#*)?E{1}\\+0+' ],
        // Percentage
        percentage: [ '0+([.,]{1}0+#*)?%' ],
        // Number
        numeric: [ '0+([.,]{1}0+#*)?' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'MONTH', 'MON', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'Y', 'M' ],
        // Other
        general: [ 'A', '0', '#', '\\?', '[0-9a-zA-Z\\$]+', '.']
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
     * Receives a number and a format represented as a string. The function scales down the number 
     * to a value between 1 and 10, while formatting it according to the provided decimal precision in the format.
     * 
     * `number` is the input number to be scaled.
     * `format` is a string representing the desired decimal precision (e.g., "0.00" or "0").
     * 
     * The function returns an array with two elements:
     * 1. The scaled number formatted according to the provided precision.
     * 2. The exponent needed to scale the formatted number back to the original input.
     * 
     * Example: 
     * ("10000", "0") -> ["1", "4"]
     * ("123456789", "0.00") -> ["1.23", "8"]
     */
    function getScientificFormat(number, format) {
        if (number === 0 || parseFloat(number) === 0) {
            return ['0', '0'];
        }

        number = number.replace(',', '.');
        format = format.replace(',', '.');

        // Determine the number of decimal places based on the format
        const decimalPlaces = format.toString().split('.')[1]?.length || 0;
    
        // Calculate the exponent (log10 gives the exponent directly)
        let exponent = Math.floor(Math.log10(number));
    
        // Scale the number down to be between 1 and 10
        const scaledNumber = number / Math.pow(10, exponent);
    
        // Format the scaled number with the same number of decimal places as the format
        let formattedNumber = scaledNumber.toFixed(decimalPlaces);

        // Treats rounding up to 10
        if (formattedNumber == 10) {
            formattedNumber = '1';
            exponent += 1;
        }
    
        return [formattedNumber, exponent.toString()];
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
                    let t = Intl.NumberFormat(this.locale).format(1.1);
                    return this.options.decimal = t[1];
                } else {
                    if (! v) {
                        v  = this.mask;
                    }
                    let t = v.match(/[.,٫](?=\d{1,14})/g)
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
    const getCaret = function(e) {
        if (this.tagName === 'DIV') {
            let pos = null;
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
        'YEAR': function(v, s) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) <= 10) {
                if (this.values[this.index].length < s) {
                    this.values[this.index] += v;
                }
            }
            if (this.values[this.index].length === s) {
                let y = new Date().getFullYear().toString();
                if (s === 2) {
                    y = y.substring(0,2) + this.values[this.index];
                } else if (s === 3) {
                    y = y.substring(0,1) + this.values[this.index];
                } else if (s === 4) {
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
        'MMMMM': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            let value = (this.values[this.index] + v).toLowerCase();
            for (var i = 0; i < monthsFull.length; i++) {
                if (monthsFull[i][0].toLowerCase().indexOf(value) === 0) {
                    this.values[this.index] = monthsFull[i][0];
                    this.date[1] = i + 1;
                    this.index++;
                    break;
                }
            }
        },
        'MMMM': function(v) {
            let ret = parseMethods.FIND.call(this, v, monthsFull);
            if (typeof(ret) !== 'undefined') {
                this.date[1] = ret + 1;
            }
        },
        'MMM': function(v) {
            let ret = parseMethods.FIND.call(this, v, months);
            if (typeof(ret) !== 'undefined') {
                this.date[1] = ret + 1;
            }
        },
        'MM': function(v, single) {
            const commit = () => {
                this.date[1] = this.values[this.index];
                this.index++;
            }

            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    if (! single) {
                        v = '0' + v;
                    }
                    this.values[this.index] = v;
                    commit();
                } else if (parseInt(v) < 2) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[1] = this.values[this.index] += v;
                    commit();
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.date[1] = this.values[this.index] += v;
                    commit();
                } else {
                    let test = parseInt(this.values[this.index]);
                    if (test > 0 && test <= 12) {
                        commit();
                        return false;
                    }
                }
            }
        },
        'M': function(v) {
            return parseMethods['MM'].call(this, v, true);
        },
        'MONTH': function(v) {
            return parseMethods['MMMM'].call(this, v);
        },
        'MON': function(v) {
            return parseMethods['MMM'].call(this, v);
        },
        'DDDD': function(v) {
            return parseMethods.FIND.call(this, v, weekDaysFull);
        },
        'DDD': function(v) {
            return parseMethods.FIND.call(this, v, weekDays);
        },
        'DD': function(v, single) {
            const commit = () => {
                this.date[2] = this.values[this.index];
                this.index++;
            }

            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 3 && parseInt(v) < 10) {
                    if (! single) {
                        v = '0' + v;
                    }
                    this.values[this.index] = v;
                    commit();
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 3 && parseInt(v) < 2) {
                    this.values[this.index] += v;
                    commit();
                } else if ((this.values[this.index] == 1 || this.values[this.index] == 2) && parseInt(v) < 10) {
                    this.values[this.index] += v;
                    commit();
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.values[this.index] += v;
                    commit();
                } else {
                    let test = parseInt(this.values[this.index]);
                    if (test > 0 && test <= 31) {
                        commit();
                        return false;
                    }
                }
            }
        },
        'D': function(v) {
            return parseMethods['DD'].call(this, v, true);
        },
        'DY': function(v) {
            return parseMethods['DDD'].call(this, v);
        },
        'DAY': function(v) {
            return parseMethods['DDDD'].call(this, v);
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
        '0+([.,]{1}0+#*)?': function(v, thousandSeparator) {
            let decimal = getDecimal.call(this);

            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            
            if (v == '-') {
                // Transform the number into negative if it is not already
                if (this.values[this.index][0] != '-') {
                    this.values[this.index] = '-' + this.values[this.index];
                }
            } else if (v == '+') {
                // Transform the number into positive if it is negative
                if (this.values[this.index][0] == '-') {
                    this.values[this.index] = this.values[this.index].replace('-', '');
                }
            } else if (v == '0') {
                // Only adds zero if there's a non-zero number before
                if (this.values[this.index] != '0' && this.values[this.index] != '-0') {
                    this.values[this.index] += v;
                }
            } else if (v > 0 && v < 10) {
                // Verify if there's a zero to remove it, avoiding left zeros
                if (this.values[this.index] == '0' || this.values[this.index] == '-0') {
                    this.values[this.index] = this.values[this.index].replace('0', '');
                }
                this.values[this.index] += v;
            } else if (v == decimal) {
                // Only adds decimal when there's a number value on its left
                if (! this.values[this.index].includes(decimal)) {
                    if (! this.values[this.index].replace('-', '').length) {
                        this.values[this.index] += '0';
                    }
                    this.values[this.index] += decimal;
                }
            } else if (v === "\u200B") {
                this.values[this.index] += v;
            }
        },
        '0+([.,]{1}0+#*)?%': function(v) {
            parseMethods['0+([.,]{1}0+#*)?'].call(this, v);

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
        '0+([.,]{1}0+#*)?E{1}\\+0+': function(v) {
            parseMethods['0+([.,]{1}0+#*)?'].call(this, v);
        },
        '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?': function(v) {
            parseMethods['0+([.,]{1}0+#*)?'].call(this, v, true);
            // Get the full original value, including prefixes
            let decimal = getDecimal.call(this);
            let separator = this.tokens[this.index].substring(1,2);
            let currentValue = this.values[this.index];
            // Remove existing separators and negative sign
            currentValue = currentValue.replaceAll(separator, '');
            // Process separators
            let val = currentValue.split(decimal);
            if (val[0].length > 3) {
                let number = [];
                let count = 0;
                for (var j = val[0].length - 1; j >= 0 ; j--) {
                    let c = val[0][j];
                    if (c >= 0 && c <= 9) {
                        if (count && ! (count % 3)) {
                            number.unshift(separator);
                        }
                        count++;
                    }
                    number.unshift(c);
                }
                val[0] = number.join('');
            }
            // Reconstruct the value
            this.values[this.index] = val.join(decimal);
        },
        '[0-9a-zA-Z\\$]+': function(v) {
            // Token to be added to the value
            let word = this.tokens[this.index];
            // Value
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (v === null) {
                let size = this.values[this.index].length;
                v = word.substring(size, size+1);
            }
            // Add the value
            this.values[this.index] += v;
            // Only if caret is before the change
            let current = this.values[this.index].replace('\u200B','');
            // Add token to the values
            if (current !== word.substring(0,current.length)) {
                this.values[this.index] = word;
                // Next token to process
                this.index++;
                return false;
            } else if (current === word) {
                // Next token to process
                this.index++;
            }
        },
        'A': function(v) {
            return parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        'a': function(v) {
            return parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
        },
        '.': function(v) {
            return parseMethods['[0-9a-zA-Z\\$]+'].call(this, v);
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
        'L': function(v) {
            if (v.match(/[a-zA-Z]/gi)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '\\?': function(v) {
            parseMethods['0'].call(this, v);
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

    const getMethodByPosition = function(control) {
        let methodName;
        if (control.methods[control.index] && typeof(control.value[control.position]) !== 'undefined') {
            methodName = control.methods[control.index].method;
        }

        if (methodName && typeof(parseMethods[methodName]) === 'function') {
            return parseMethods[methodName];
        }

        return false;
    }

    const processNumOfDecimals = function(token, number) {
        // Process decimals
        if (token[1]) {
            let numOfDecimals = 0;
            let numOfHashes = 0;
            let test = token[1].match(/[0-9]+/g);
            if (test && test[0]) {
                numOfDecimals = test[0].length;
            }
            test = token[1].match(/#+/g);
            if (test && test[0]) {
                numOfHashes = test[0].length;
            }
            let fraction = number[1];
            if (fraction) {
                let res;
                if (fraction.length > numOfDecimals + numOfHashes) {
                    if (fraction[fraction.length - 1] === '5') {
                        fraction = fraction + '1';
                    }
                    res = parseFloat('0.' + fraction).toFixed(numOfDecimals + numOfHashes);
                } else if (fraction.length < numOfDecimals) {
                    res = parseFloat('0.' + fraction).toFixed(numOfDecimals);
                }
                if (res) {
                    number[1] = res.toString().split('.')[1];
                }
                console.log(res)
            }
        } else {
            if (number[1]) {
                number[0] = Number(number[0]).toFixed(0);
                number[1] = '';
            }
        }
    }

    const processNumOfPaddingZeros = function(token, number) {
        // Process zeros
        let numOfPaddingZeros = token[0].length;
        if (numOfPaddingZeros > 1) {
            number[0] = number[0].toString().padStart(numOfPaddingZeros, '0');
        }
    }

    const getValue = function(control) {
        return control.values.join('').trim();
    }

    const Component = function(str, config, fullmask) {
        // Internal default control of the mask system
        const control = {
            // Current raw value to be masked
            value: str.toString(),
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
            // Controls of Excel that should be ignored
            let d = control.mask.split(';');
            // Get only the first mask for now
            control.mask = d[0];
            // Get tokens which are the methods for parsing
            control.tokens = getTokens(control.mask);
            // Get methods from the tokens
            control.methods = getMethodsFromTokens(control.tokens);
            // Walk every character on the value
            let method;
            while (method = getMethodByPosition(control)) {
                // Get the method name to handle the current token
                let ret = method.call(control, control.value[control.position]);
                // Next position
                if (ret !== false) {
                    control.position++;
                }
            }

            // Move index
            if (control.methods[control.index]) {
                let type = control.methods[control.index].type;
                if (isNumeric(type) && control.methods[++control.index]) {
                    let next;
                    while (next = control.methods[control.index]) {
                        if (control.methods[control.index].type === 'general') {
                            let method = control.methods[control.index].method;
                            if (method && typeof(parseMethods[method]) === 'function') {
                                parseMethods[method].call(control, null);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }

            if (fullmask) {
                // Decimal
                let decimal = control.options.decimal;
                // Adjust final value
                control.methods.forEach((v, k) => {
                    // Value
                    let value = control.values[k];
                    // Transform based on the mask
                    if (isNumeric(v.type)) {
                        // Value
                        let number = value.split(decimal);
                        // Token
                        let token = v.token.split(decimal);
                        // Transform
                        processNumOfDecimals(token, number);
                        // Do not apply padding zeros for currency
                        if (v.type !== 'currency') {
                            processNumOfPaddingZeros(token, number);
                        }
                        if (v.type === 'percentage') {
                            number[1] += '%';
                        }
                        // Result
                        control.values[k] = number.join(decimal);
                    }
                });
            }
            
            control.value = getValue(control);
        }

        return control;
    }

    Component.oninput = function(e) {
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
        if (caret) {
            value = value.substring(0, caret) + "\u200B" + value.substring(caret);
        }
        // Run mask
        let result = Component(value, { mask: mask });
        // New value
        let newValue = result.values.join('');
        // Apply the result back to the element
        if (newValue !== value && ! e.inputType.includes('delete')) {
            // Set the caret to the position before transformation
            let caret = newValue.indexOf("\u200B");
            if (caret) {
                // Apply value
                element[property] = newValue.replace("\u200B", "");
                // Set caret
                setCaret.call(element, caret);
            } else {
                // Apply value
                element[property] = newValue;
            }
        }
    }

    /**
     * Extract a value from a string based on a given mask
     */
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
