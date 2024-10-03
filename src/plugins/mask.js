import Helpers from '../utils/helpers';
import HelpersDate from '../utils/helpers.date';



function Mask() {
    // Currency
    const tokens = {
        // Text
        text: [ '@' ],
        // Currency tokens
        currency: [ '#(\\.{1})##0?(\\.{1}0+)?( ?;(.*)?)?' ],
        // Scientific
        scientific: [ '0+(\\.{1}0+)?E{1}\\+0+' ],
        // Percentage
        percentage: [ '0+(\\.{1}0+)?%' ],
        // Number
        numeric: [ '0+(\\.{1}0+)?' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'MONTH', 'MON', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'Y', 'M' ],
        // Other
        general: [ 'A', '0', '[0-9a-zA-Z\\$]+', '.']
    }

    // Labels
    const weekDaysFull = HelpersDate.weekdays;
    const weekDays = HelpersDate.weekdaysShort;
    const monthsFull = HelpersDate.months;
    const months = HelpersDate.monthsShort;

    // Helpers
    const isBlank = function(v) {
        return v === null || v === '' || typeof(v) === 'undefined';
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
        '0+(\\.{1}0+)?': function(v) {
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
            }
        },
        '0+(\\.{1}0+)?%': function(v) {
            parseMethods['0+(\\.{1}0+)?'].call(this, v);

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
        // General Methods
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
            const t = this.tokens[this.index];
            const s = this.values[this.index];
            const i = s.length;

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
            parseMethods['[0-9a-zA-Z$]+'].call(this, v);
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
                result.push(m.method);
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

    const Component = function(str, config, returnObject) {

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
            // Go through all tokes
            while (control.position < control.value.length) {
                // Get the method name to handle the current token
                let methodName = control.methods[control.index];
                // If that is a function
                if (typeof(parseMethods[methodName]) == 'function') {
                    parseMethods[methodName].call(control, control.value[control.position]);
                }
                control.position++;
            }
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
        // Run mask
        let result = Component(value, { mask: mask });
        // Apply the result back to the element
        element[property] = result.values.join('');
    }

    return Component;
}

export default Mask();
