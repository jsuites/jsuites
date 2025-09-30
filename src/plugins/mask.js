/*
 Add '*' as a valid symbol
 Formats such as 'DD"th of "MMMM", "YYYY'
 Conditional masking
 (000) 00000-00
 $ (#,##0.00);$ (-#,##0.00)
 $ (-#,##0.00)
 j.mask.render(0, { mask: 'mm:ss.0' }
 j.mask.render(0, { mask: '[h]:mm:ss' }, true)
 */
import Helpers from '../utils/helpers.date';

function Mask() {
    // Currency
    const tokens = {
        // Escape
        escape: [ '\\\\[.\\s\\S]' ],
        // Text
        text: [ '@', '&' ],
        // Number
        fraction: [ '#{0,1}.*?\\?+\\/[0-9?]+' ],
        // Currency tokens
        currency: [ '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?' ],
        // Scientific
        scientific: [ '[0#]+([.,]{1}0*#*)?E{1}\\+0+' ],
        // Percentage
        percentage: [ '[0#]+([.,]{1}0*#*)?%' ],
        // Number
        numeric: [ '[0#]+([.,]{1}0*#*)?', '#+' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'MONTH', 'MON', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'S', 'Y', 'M', 'I' ],
        // Other
        general: [ 'A', '0', '\\?', '\\*', ',,M', ',,,B', '[0-9a-zA-Z\\$]+', '_\\(', '_\\)', '\\(', '\\)', '_-', '.']
    }

    // All expressions
    const allExpressions = [].concat(tokens.escape, tokens.fraction, tokens.currency, tokens.datetime, tokens.percentage, tokens.scientific, tokens.numeric, tokens.text, tokens.general).join('|');

    // Pre-compile all regexes once at initialization for better performance
    const compiledTokens = {};
    const tokenPriority = ['escape', 'fraction', 'currency', 'scientific', 'percentage', 'numeric', 'datetime', 'text', 'general'];

    // Initialize compiled regexes
    for (const type of tokenPriority) {
        compiledTokens[type] = tokens[type].map(pattern => ({
            regex: new RegExp('^' + pattern + '$', 'gi'),
            method: pattern
        }));
    }

    // Pre-compile regex for getTokens function
    const allExpressionsRegex = new RegExp(allExpressions, 'gi');

    // Pre-compile currency symbol regexes for autoCastingCurrency
    const knownSymbols = ['$', '€', '£', '¥', '₹', '₽', '₩', '₫', 'R$', 'CHF', 'AED'];
    const currencyRegexes = knownSymbols.map(s => ({
        symbol: s,
        regex: new RegExp(`^${s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(\\s?)`)
    }));

    const hiddenCaret = "\u200B";

    // Labels
    const weekDaysFull = Helpers.weekdays;
    const weekDays = Helpers.weekdaysShort;
    const monthsFull = Helpers.months;
    const months = Helpers.monthsShort;

    // Helpers

    const focus = function(el) {
        if (el.textContent.length) {
            // Handle contenteditable elements
            const range = document.createRange();
            const sel = window.getSelection();

            let node = el;
            // Go as deep as possible to the last text node
            while (node.lastChild) node = node.lastChild;
            // Ensure it's a text node
            if (node.nodeType === Node.TEXT_NODE) {
                range.setStart(node, node.length);
            } else {
                range.setStart(node, node.childNodes.length);
            }
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);

            el.scrollLeft = el.scrollWidth;
        }
    }

    /**
    * Returns if the given value is considered blank
    */
    const isBlank = function(v) {
        return v === null || v === '' || typeof(v) === 'undefined';
    }

    /**
    * Receives a string from a method type and returns if it's a numeric method
    */
    const isNumeric = function(t) {
        return t === 'currency' || t === 'percentage' || t === '' || t === 'numeric';
    }

    const adjustPrecision = function(num) {
        if (typeof num === 'number' && ! Number.isInteger(num)) {
            const v = num.toString().split('.');

            if (v[1] && v[1].length > 10) {
                let t0 = 0;
                const t1 = v[1][v[1].length - 2];

                if (t1 == 0 || t1 == 9) {
                    for (let i = v[1].length - 2; i > 0; i--) {
                        if (t0 >= 0 && v[1][i] == t1) {
                            t0++;
                            if (t0 > 6) {
                                break;
                            }
                        } else {
                            t0 = 0;
                            break;
                        }
                    }

                    if (t0) {
                        return parseFloat(parseFloat(num).toFixed(v[1].length - 1));
                    }
                }
            }
        }

        return num;
    }

    /**
     * Get the decimal defined in the mask configuration
     */
    const getDecimal = function(v) {
        let decimal;
        if (this.decimal) {
            decimal = this.decimal;
        } else {
            if (this.locale) {
                let t = Intl.NumberFormat(this.locale).format(1.1);
                decimal = t[1];
            } else {
                if (! v) {
                    v = this.mask;
                }

                // Fixed regex: 0* means zero or more 0s before decimal separator
                let e = new RegExp('0*([,.])0+', 'ig');
                let t = e.exec(v);
                if (t && t[1] && t[1].length === 1) {
                    decimal = t[1];
                } else {
                    // Try the second pattern for # formats
                    e = new RegExp('#{1}(.{1})#+', 'ig');
                    t = e.exec(v);
                    if (t && t[1] && t[1].length === 1) {
                        if (t[1] === ',') {
                            decimal = '.';
                        } else if (t[1] === "'" || t[1] === '.') {
                            decimal = ',';
                        }
                    }
                }

                if (! decimal) {
                    decimal = '1.1'.toLocaleString().substring(1, 2);
                }
            }
        }

        if (decimal) {
            return decimal;
        } else {
            return null;
        }
    }

    /**
     * Caret position getter
     * `this` in this function should be the element with a caret
     */
    const getCaretPosition = function(editableDiv) {
        let caretPos = 0;
        let sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            let range = sel.getRangeAt(0);
            let preRange = range.cloneRange();
            preRange.selectNodeContents(editableDiv);
            preRange.setEnd(range.endContainer, range.endOffset);
            caretPos = preRange.toString().length;
        }
        return caretPos;
    }

    /**
     * Caret position getter
     * `this` in this function should be the element with a caret
     */
    const getCaret = function(el) {
        if (el.tagName === 'DIV') {
            return getCaretPosition(el);
        } else {
            return el.selectionStart;
        }
    }

    /**
     * Caret position setter
     * `this` should be the element (input/textarea or contenteditable div)
     */
    const setCaret = function(index) {
        if (typeof index !== 'number') index = Number(index) || 0;

        if (this.tagName !== 'DIV' || this.isContentEditable !== true) {
            const n = this.value ?? '';
            if (index < 0) index = 0;
            if (index > n.length) index = n.length;
            this.focus();
            this.selectionStart = index;
            this.selectionEnd = index;
            return;
        }

        // Contenteditable DIV
        const el = /** @type {HTMLElement} */ (this);
        const totalLen = (el.textContent || '').length;

        if (index < 0) index = 0;
        if (index > totalLen) index = totalLen;

        const sel = window.getSelection();
        if (!sel) return;

        const range = document.createRange();
        el.focus();

        // Empty element → ensure a text node to place the caret into
        if (totalLen === 0) {
            if (!el.firstChild) el.appendChild(document.createTextNode(''));
            // place at start
            range.setStart(el.firstChild, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        // If caret is at the very end, this is fastest/cleanest
        if (index === totalLen) {
            range.selectNodeContents(el);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        // Walk text nodes to find the node that contains the index-th character
        const walker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    // skip empty/whitespace-only nodes if you want; or just accept all text
                    return node.nodeValue ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        let pos = 0;
        let node = walker.nextNode();
        while (node) {
            const nextPos = pos + node.nodeValue.length;
            if (index <= nextPos) {
                const offset = index - pos; // char offset within this text node
                range.setStart(node, offset);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return;
            }
            pos = nextPos;
            node = walker.nextNode();
        }

        // Fallback: collapse at end if something unexpected happened
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    };

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
                    this.values[this.index] += v;
                    commit();
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.values[this.index] += v;
                    commit();
                } else {
                    let test = parseInt(this.values[this.index]);
                    if (test > 0 && test <= 12) {
                        if (! single) {
                            test = '0' + test;
                        }
                        this.values[this.index] = test;
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
                        if (! single) {
                            test = '0' + test;
                        }
                        this.values[this.index] = test;
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
            let test = false;
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
                } else {
                    test = true;
                }
            }

            // Re-test
            if (test === true) {
                var t = parseInt(this.values[this.index]);
                if (t >= 0 && t <= 12) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    return false;
                }
            }
        },
        'HH24': function(v, two) {
            let test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
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
                    } else {
                        test = true;
                    }
                }
            } else {
                test = true;
            }

            // Re-test
            if (test === true) {
                var t = parseInt(this.values[this.index]);
                if (t >= 0 && t < 24) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    return false;
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
                    return false;
                }
            }
        },
        'N60': function(v, i, two) {
            let test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    if (parseInt(v) > 5 && parseInt(v) < 10) {
                        if (two) {
                            v = '0' + v;
                        }
                        this.date[i] = this.values[this.index] = v;
                        this.index++;
                    } else if (parseInt(v) < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] < 6 && parseInt(v) < 10) {
                        if (! two && this.values[this.index] === '0') {
                            this.values[this.index] = '';
                        }
                        this.date[i] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        test = true;
                    }
                }
            } else {
                test = true;
            }

            // Re-test
            if (test === true) {
                var t = parseInt(this.values[this.index]);
                if (t >= 0 && t < 60) {
                    this.date[i] = this.values[this.index];
                    this.index++;
                    return false;
                }
            }
        },
        'MI': function(v) {
            parseMethods.N60.call(this, v, 4, true);
        },
        'SS': function(v) {
            parseMethods.N60.call(this, v, 5, true);
        },
        'I': function(v) {
            parseMethods.N60.call(this, v, 4, false);
        },
        'S': function(v) {
            parseMethods.N60.call(this, v, 5, false);
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
        '[0#]+([.,]{1}0*#*)?': function(v) {
            if (v === '.' && inputIsANumber(this.raw)) {
                v = this.decimal;
            }

            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }

            if (v === '-') {
                // Transform the number into negative if it is not already
                if (this.values[this.index][0] != '-') {
                    this.values[this.index] = '-' + this.values[this.index];
                }
            } else if (v === '+') {
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
            } else if (v === this.decimal) {
                // Only adds decimal when there's a number value on its left
                if (! this.values[this.index].includes(this.decimal)) {
                    if (! this.values[this.index].replace('-', '').length) {
                        this.values[this.index] += '0';
                    }
                    this.values[this.index] += this.decimal;
                }
            }
        },
        '[0#]+([.,]{1}0*#*)?%': function(v) {
            parseMethods['[0#]+([.,]{1}0*#*)?'].call(this, v);

            // Adds the % only if it has a number value
            if (this.values[this.index].match(/[\-0-9]/g)) {
                if (this.values[this.index].indexOf('%') !== -1) {
                    this.values[this.index] = this.values[this.index].replaceAll('%', '');
                }
                this.values[this.index] += '%';
            } else {
                this.values[this.index] = '';
            }
        },
        '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?': function(v) {
            // Process first the number
            parseMethods['[0#]+([.,]{1}0*#*)?'].call(this, v, true);
            // Create the separators
            let separator = this.tokens[this.index].substring(1,2);


            let currentValue = this.values[this.index];
            // Remove existing separators and negative sign
            currentValue = currentValue.replaceAll(separator, '');
            // Process separators
            let val = currentValue.split(this.decimal);
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
            this.values[this.index] = val.join(this.decimal);
        },
        '[0#]+([.,]{1}0*#*)?E{1}\\+0+': function(v) {
            parseMethods['[0#]+([.,]{1}0*#*)?'].call(this, v);
        },
        '#{0,1}.*?\\?+\\/[0-9?]+': function (v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }

            const token = this.tokens[this.index]; // e.g. "# ?/?", "?/2", "# ??/16"
            let cur = this.values[this.index];

            // Parse RHS of mask to decide denominator rule
            const rhsRaw = (token.split('/')[1] || '').replace(/\s+/g, '');
            const allowDen = /^\d+$/.test(rhsRaw) ? rhsRaw : /^\?+$/.test(rhsRaw) ? '?' : '?';

            // ----- NEW: allow '-' as first char -----
            if (v === '-') {
                if (cur.length === 0) {
                    this.values[this.index] = '-';
                }
                return; // never return false
            }
            // ----------------------------------------

            // Only accept digits / space / slash; ignore everything else
            if (!(/[0-9\/ ]/.test(v))) {
                return;
            }

            // If we already have a slash and denominator is fixed but not yet appended,
            // auto-complete immediately regardless of what the user typed now.
            const hasSlashNow = cur.includes('/');
            if (hasSlashNow && allowDen !== '?') {
                const afterSlash = cur.slice(cur.indexOf('/') + 1);
                if (afterSlash.length === 0) {
                    this.values[this.index] = cur + allowDen;
                    this.index++; // move to next token
                    return;
                }
            }

            // Empty -> only digits (or a leading '-' handled above)
            if (cur.length === 0) {
                if (/\d/.test(v)) this.values[this.index] = v;
                return;
            }

            const hasSpace = cur.includes(' ');
            const hasSlash = cur.includes('/');
            const last = cur[cur.length - 1];

            // Space rules: only one, must be before slash, must follow a digit
            if (v === ' ') {
                if (!hasSpace && !hasSlash && /\d/.test(last)) {
                    this.values[this.index] = cur + ' ';
                }
                return;
            }

            // Slash rules: only one slash, not right after a space, must follow a digit
            if (v === '/') {
                if (!hasSlash && last !== ' ' && /\d/.test(last)) {
                    if (allowDen === '?') {
                        this.values[this.index] = cur + '/';
                    } else {
                        this.values[this.index] = cur + '/' + allowDen;
                        this.index++; // conclude this token
                    }
                }
                return;
            }

            // Digit rules
            if (/\d/.test(v)) {
                if (!hasSlash) {
                    // Before slash: digits always fine
                    this.values[this.index] = cur + v;
                    return;
                }

                // After slash
                if (allowDen === '?') {
                    this.values[this.index] = cur + v;
                    return;
                }

                // Fixed denominator: enforce prefix and advance when complete
                const afterSlash = cur.slice(cur.indexOf('/') + 1);
                const nextDen = afterSlash + v;
                if (allowDen.startsWith(nextDen)) {
                    this.values[this.index] = cur + v;
                    if (nextDen.length === allowDen.length) {
                        this.index++;
                    }
                }
            }
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
            let current = this.values[this.index];
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
        '\\*': function() {
            this.values[this.index] = '';
            this.index++;
            return false;
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
            if (v.match(/[1-9]/g)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '@': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            this.values[this.index] += v;
        },
        '_\\(': function() {
            this.values[this.index] = ' ';
            this.index++;
            return false;
        },
        '_\\)': function() {
            this.values[this.index] = ' ';
            this.index++;
            return false;
        },
        '\\(': function() {
            if (this.type === 'currency' && this.parenthesisForNegativeNumbers) {
                this.values[this.index] = '';
            } else {
                this.values[this.index] = '(';
            }
            this.index++;
            return false;
        },
        '\\)': function() {
            if (this.type === 'currency' && this.parenthesisForNegativeNumbers) {
                this.values[this.index] = '';
            } else {
                this.values[this.index] = ')';
            }
            this.index++;
            return false;
        },
        '_-': function() {
            this.values[this.index] = ' ';
            this.index++;
            return false;
        },
        ',,M': function() {
            this.values[this.index] = 'M';
            this.index++;
            return false;
        },
        ',,,B': function() {
            this.values[this.index] = 'B';
            this.index++;
            return false;
        },
        '\\\\[.\\s\\S]': function(v) {
            this.values[this.index] = this.tokens[this.index].replace('\\', '');
            this.index++;
            return false;
        }
    }

    const extractDate = function() {
        let v = '';
        if (! (this.date[0] && this.date[1] && this.date[2]) && (this.date[3] || this.date[4])) {
            if (this.mask.toLowerCase().indexOf('[h]') !== -1) {
                v = parseInt(this.date[3]);
            } else {
                let h = parseInt(this.date[3]);
                if (h < 13 && this.values.indexOf('PM') !== -1) {
                    v = (h+12) % 24;
                } else {
                    v = h % 24;
                }
            }
            if (this.date[4]) {
                v += parseFloat(this.date[4] / 60);
            }
            if (this.date[5]) {
                v += parseFloat(this.date[5] / 3600);
            }
            v /= 24;
        } else if (this.date[0] || this.date[1] || this.date[2] || this.date[3] || this.date[4] || this.date[5]) {
            if (this.date[0] && this.date[1] && ! this.date[2]) {
                this.date[2] = 1;
            }
            var t = Helpers.now(this.date);
            v = Helpers.dateToNum(t);
        }

        if (isNaN(v)) {
            v = '';
        }

        return v;
    }

    // Types TODO: Generate types so we can garantee that text,scientific, numeric,percentage, current are not duplicates. If they are, it will be general or broken.

    const getTokens = function(str) {
        allExpressionsRegex.lastIndex = 0; // Reset for global regex
        return str.match(allExpressionsRegex);
    }

    /**
     * Get the method of one given token
     */
    const getMethod = function(str, temporary) {
        str = str.toString().toUpperCase();

        // Check for datetime mask
        const datetime = temporary.every(t => t.type === 'datetime' || t.type === 'general');

        // Use priority order for faster matching with pre-compiled regexes
        for (const type of tokenPriority) {
            if (!datetime && type === 'datetime') continue;

            for (const compiled of compiledTokens[type]) {
                let regex = compiled.regex;
                regex.lastIndex = 0; // Reset regex state
                if (regex.test(str)) {
                    return { type: type, method: compiled.method };
                }
            }
        }
        return null;
    }

    const fixMinuteToken = function(t) {
        for (let i = 0; i < t.length; i++) {
            if (t[i] === 'M' || t[i] === 'MM') {
                // Not a month, correct to minutes
                if ((t[i - 1] && t[i - 1].indexOf('H') >= 0) ||
                    (t[i - 2] && t[i - 2].indexOf('H') >= 0) ||
                    (t[i + 1] && t[i + 1].indexOf('S') >= 0) ||
                    (t[i + 2] && t[i + 2].indexOf('S') >= 0)) {
                    // Apply minute token
                    t[i] = t[i] === 'M' ? 'I': 'MI';
                }
            }
        }
    }

    /**
     * Identify each method for each token
     */
    const getMethodsFromTokens = function(t) {
        // Uppercase
        t = t.map(v => {
            return v.toString().toUpperCase();
        });

        // Compatibility with Excel
        fixMinuteToken(t);

        let result = [];
        for (let i = 0; i < t.length; i++) {
            var m = getMethod(t[i], result);
            if (m) {
                result.push(m);
            } else {
                result.push(null);
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

    const processPaddingZeros = function(token, value, decimal) {
        if (! value) {
            return value;
        }
        let m = token.split(decimal);
        let desiredNumOfPaddingZeros = m[0].match(/[0]+/g);
        if (desiredNumOfPaddingZeros[0]) {
            desiredNumOfPaddingZeros = desiredNumOfPaddingZeros[0].length
            let v = value.toString().split(decimal);
            let len = v[0].length;
            if (desiredNumOfPaddingZeros > len) {
                v[0] = v[0].padStart(desiredNumOfPaddingZeros, '0');
                return v.join(decimal);
            }
        }
    }

    const processNumOfPaddingZeros = function(control) {
        let negativeSignal = false;
        control.methods.forEach((method, k) => {
            if (method.type === 'numeric' || method.type === 'percentage' || method.type === 'scientific') {
                let ret = processPaddingZeros(control.tokens[k], control.values[k], control.decimal);
                if (ret) {
                    control.values[k] = ret;
                }
            }

            if (control.type === 'currency' && control.parenthesisForNegativeNumbers === true) {
                if (method.type === 'currency') {
                    if (control.values[k].toString().includes('-')) {
                        control.values[k] = control.values[k].replace('-', '');

                        negativeSignal = true;
                    }
                }
            }
        });


        if (control.type === 'currency' && control.parenthesisForNegativeNumbers === true && negativeSignal) {
            control.methods.forEach((method, k) => {
                if (! control.values[k] && control.tokens[k] === '(') {
                    control.values[k] = '(';
                } else if (! control.values[k] && control.tokens[k] === ')') {
                    control.values[k] = ')';
                }
            });
        }
    }

    const getValue = function(control) {
        let value = control.values.join('');
        if (isNumeric(control.type) && value.indexOf('--') !== false) {
            value = value.replace('--','-');
        }
        return value;
    }

    const inputIsANumber = function(num) {
        if (typeof(num) === 'string') {
            num = num.trim();
        }
        return !isNaN(num) && num !== null && num !== '';
    }

    const getType = function(control) {
        // Mask type
        let type = 'general';
        // Process other types
        for (var i = 0; i < control.methods.length; i++) {
            let m = control.methods[i];
            if (m && m.type !== 'general' && m.type !== 'escape' && m.type !== type) {
                if (type === 'general') {
                    type = m.type;
                }  else {
                    type = 'general';
                    break;
                }
            }
        }
        return type;
    }

    const isNumber = function(num) {
        if (typeof(num) === 'string') {
            num = num.trim();
        }
        return !isNaN(num) && num !== null && num !== '';
    }

    // TODO, get negative mask automatically based on the input sign?

    const getConfig = function(config, value) {
        // Internal default control of the mask system
        const control = {
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

        if (typeof(value) === 'undefined' || value === null) {
            value = '';
        }

        // Value to be masked
        control.value = value.toString();
        control.raw = value;


        // Options defined by the user
        if (typeof(config) == 'string') {
            // Mask
            control.mask = config;
        } else if (config) {
            // Mask
            let k = Object.keys(config);
            for (var i = 0; i < k.length; i++) {
                control[k[i]] = config[k[i]];
            }
        }

        // Controls of Excel that should be ignored
        if (control.mask) {
            let d = control.mask.split(';');
            // Mask
            let mask = d[0];

            if (typeof(value) === 'number' || isNumber(value)) {
                if (Number(value) < 0 && d[1]) {
                    mask = d[1];
                } else if (Number(value) === 0 && d[2]) {
                    mask = d[2];
                }
            } else {
                if (d[3]) {
                    mask = d[3];
                }
            }
            // Cleaning the mask
            mask = mask.replace(new RegExp('"', 'mgi'), "");
            // Parenthesis
            let reg = /(?<!_)\((?![^()]*_)([^'"]*?)\)/g;
            if (mask.match(reg)) {
                control.parenthesisForNegativeNumbers = true;
            }
            // Match brackets that should be removed (NOT the time format codes)
            reg = /\[(?!(?:s|ss|h|hh|m|mm)])([^\]]*)]/g;
            if (mask.match(reg)) {
                mask = mask.replace(reg, ''); // Removes brackets and content
            }
            // Get only the first mask for now and remove
            control.mask = mask;
            // Get tokens which are the methods for parsing
            control.tokens = getTokens(control.mask);
            // Get methods from the tokens
            control.methods = getMethodsFromTokens(control.tokens);
            // Type
            control.type = getType(control);
        }

        // Decimal
        control.decimal = getDecimal.call(control);

        return control;
    }

    const toPlainString = function(num) {
        // Convert number to string if it isn't already
        num = String(num);

        // If it's not in exponential form, return as-is
        if (!/e/i.test(num)) return num;

        // Decompose scientific notation
        const [coefficient, exponent] = num.toLowerCase().split('e');
        const exp = parseInt(exponent, 10);

        // Handle sign
        const sign = coefficient[0] === '-' ? '-' : '';
        const [intPart, fracPart = ''] = coefficient.replace('-', '').split('.');

        const digits = intPart + fracPart;
        const decimalPos = intPart.length;

        let newPos = decimalPos + exp;

        if (newPos <= 0) {
            // Decimal point moves left
            return sign + '0.' + '0'.repeat(-newPos) + digits;
        } else if (newPos >= digits.length) {
            // Decimal point moves right, add trailing zeros
            return sign + digits + '0'.repeat(newPos - digits.length);
        } else {
            // Decimal point moves into the number
            return sign + digits.slice(0, newPos) + '.' + digits.slice(newPos);
        }
    };

    const adjustNumberOfDecimalPlaces = function(config, value) {
        let temp = value;
        let mask = config.mask;
        let expo;

        if (config.type === 'scientific') {
            mask = config.mask.toUpperCase().split('E')[0];

            let numOfDecimalPlaces = mask.split(config.decimal);
            numOfDecimalPlaces = numOfDecimalPlaces[1].match(/[0#]+/g);
            numOfDecimalPlaces = numOfDecimalPlaces[0]?.length ?? 0;
            temp = temp.toExponential(numOfDecimalPlaces);
            expo = temp.toString().split('e+');
            temp = Number(expo[0]);
        }

        if (mask.indexOf(config.decimal) === -1) {
            // No decimal places
            if (! Number.isInteger(temp)) {
                temp = temp.toFixed(0);
            }
        } else {
            // Length of the decimal
            let mandatoryDecimalPlaces = mask.split(config.decimal);
            mandatoryDecimalPlaces = mandatoryDecimalPlaces[1].match(/0+/g);
            if (mandatoryDecimalPlaces) {
                mandatoryDecimalPlaces = mandatoryDecimalPlaces[0].length;
            } else {
                mandatoryDecimalPlaces = 0;
            }
            // Amount of decimal
            let numOfDecimalPlaces = temp.toString().split(config.decimal)
            numOfDecimalPlaces = numOfDecimalPlaces[1]?.length ?? 0;
            // Necessary adjustment
            let necessaryAdjustment = 0;
            if (numOfDecimalPlaces < mandatoryDecimalPlaces) {
                necessaryAdjustment = mandatoryDecimalPlaces;
            } else {
                // Optional
                let optionalDecimalPlaces = mask.split(config.decimal);
                optionalDecimalPlaces = optionalDecimalPlaces[1].match(/[0#]+/g);
                if (optionalDecimalPlaces) {
                    optionalDecimalPlaces = optionalDecimalPlaces[0].length;
                    if (numOfDecimalPlaces > optionalDecimalPlaces) {
                        necessaryAdjustment = optionalDecimalPlaces;
                    }
                }
            }
            // Adjust decimal numbers if applicable
            if (necessaryAdjustment) {
                let t = temp.toFixed(necessaryAdjustment);
                let n = temp.toString().split('.');
                let fraction = n[1];
                if (fraction && fraction.length > necessaryAdjustment && fraction[fraction.length - 1] === '5') {
                    t = parseFloat(n[0] + '.' + fraction + '1').toFixed(necessaryAdjustment);
                }
                temp = t;
            }
        }

        if (config.type === 'scientific') {
            let ret = processPaddingZeros(mask, temp, config.decimal);
            if (ret) {
                temp = ret;
            }
            expo[0] = temp;

            mask = config.mask.toUpperCase().split('E+')[1];
            ret = processPaddingZeros(mask, expo[1], config.decimal);
            if (ret) {
                expo[1] = ret;
            }

            temp = expo.join('e+');
        }

        return temp;
    }

    const formatFraction = function(value, mask) {
        let maxDenominator;
        let fixedDenominator = null;
        let allowWholeNumber = true;

        // Check for fixed denominator like # ?/8 or ?/8
        const fixed = mask.match(/\/(\d+)/);
        if (fixed) {
            fixedDenominator = parseInt(fixed[1], 10);
            maxDenominator = fixedDenominator;
        } else {
            // Determine based on question marks in mask
            const match = mask.match(/\?\/(\?+)/);
            if (match) {
                maxDenominator = Math.pow(10, match[1].length) - 1;
            } else {
                maxDenominator = 9; // Default for # ?/? or ?/?
            }
        }
        // Check if mask allows whole number (e.g., ?/? or ?/8 implies no whole number)
        allowWholeNumber = mask.includes('#');

        // If we have a fixed denominator, use it exactly (don't simplify)
        if (fixedDenominator) {
            const isNegative = value < 0;
            const absValue = Math.abs(value);
            const numerator = Math.round(absValue * fixedDenominator);

            // For masks like ?/8, always output as pure fraction (no whole number)
            if (!allowWholeNumber) {
                return isNegative ? `-${numerator}/${fixedDenominator}` : `${numerator}/${fixedDenominator}`;
            }

            // For masks like # ?/8, allow whole number
            const whole = Math.floor(numerator / fixedDenominator);
            const remainder = numerator % fixedDenominator;
            if (remainder === 0) {
                return isNegative ? `-${whole}` : `${whole}`;
            }
            if (whole === 0) {
                return isNegative ? `-${numerator}/${fixedDenominator}` : `${numerator}/${fixedDenominator}`;
            }
            return isNegative ? `-${whole} ${remainder}/${fixedDenominator}` : `${whole} ${remainder}/${fixedDenominator}`;
        }

        // Use continued fractions algorithm for better approximation
        function continuedFraction(value, maxDenom) {
            if (value === 0) return [0, 1];
            let sign = value < 0 ? -1 : 1;
            value = Math.abs(value);
            let whole = Math.floor(value);
            let frac = value - whole;
            if (frac === 0) return [sign * whole, 1];

            let h1 = 1, h2 = 0;
            let k1 = 0, k2 = 1;
            let x = frac;
            while (k1 <= maxDenom) {
                let a = Math.floor(x);
                let h0 = a * h1 + h2;
                let k0 = a * k1 + k2;
                if (k0 > maxDenom) break;
                h2 = h1; h1 = h0;
                k2 = k1; k1 = k0;
                if (Math.abs(x - a) < 1e-10) break;
                x = 1 / (x - a);
            }

            // Add the whole part back only if allowed
            let finalNum = sign * (allowWholeNumber ? whole * k1 + h1 : Math.round(value * k1));
            let finalDen = k1;
            return [finalNum, finalDen];
        }

        const [numerator, denominator] = continuedFraction(value, maxDenominator);

        // Handle the result
        const isNegative = numerator < 0;
        const absNumerator = Math.abs(numerator);
        const whole = allowWholeNumber ? Math.floor(absNumerator / denominator) : 0;
        const remainder = absNumerator % denominator;
        const sign = isNegative ? '-' : '';

        if (remainder === 0) {
            return `${sign}${whole || 0}`;
        }
        if (whole === 0 || !allowWholeNumber) {
            return `${sign}${absNumerator}/${denominator}`;
        }
        return `${sign}${whole} ${remainder}/${denominator}`;
    }

    const extractDateAndTime = function(value) {
        value = value.toString().substring(0,19);
        let splitStr = (value.indexOf('T') !== -1) ? 'T' : ' ';
        value = value.split(splitStr);

        let y = null;
        let m = null;
        let d = null;
        let h = '0';
        let i = '0';
        let s = '0';

        if (! value[1]) {
            if (value[0].indexOf(':') !== -1) {
                value[0] = value[0].split(':');
                h = value[0][0];
                i = value[0][1];
                s = value[0][2];
            } else {
                value[0] = value[0].split('-');
                y = value[0][0];
                m = value[0][1];
                d = value[0][2];
            }
        } else {
            value[0] = value[0].split('-');
            y = value[0][0];
            m = value[0][1];
            d = value[0][2];

            value[1] = value[1].split(':');
            h = value[1][0];
            i = value[1][1];
            s = value[1][2];
        }

        return [y,m,d,h,i,s];
    }

    const Component = function(str, config, returnObject) {
        // Get configuration
        const control = getConfig(config, str);

        if (control.locale) {
            // Process the locale
        } else if (control.mask) {
            // Walk every character on the value
            let method;
            while (method = getMethodByPosition(control)) {
                let char = control.value[control.position];
                if (char === hiddenCaret) {
                    control.caret = {
                        index: control.index,
                        position: control.values[control.index]?.length ?? 0,
                    }
                    control.position++;
                } else {
                    // Get the method name to handle the current token
                    let ret = method.call(control, char);
                    // Next position
                    if (ret !== false) {
                        control.position++;
                    }
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
        }
        if (control.caret) {
            let index = control.caret.index;
            let position = control.caret.position;
            let value = control.values[index] ?? '';
            // Re-apply the caret to the original position
            control.values[index] = value.substring(0, position) + hiddenCaret + value.substring(position);
        }

        control.value = getValue(control);

        if (returnObject) {
            return control;
        } else {
            return control.value;
        }
    }

    // Helper: Compare rendered value to original input
    const testMask = function(mask, value, original) {
        const rendered = Component.render(value, { mask }, true);
        return rendered.replace(/\s/g, '') === original.replace(/\s/g, '');
    }

    const autoCastingFractions = function(value) {
        const fractionPattern = /^\s*(-?\d+\s+)?(-?\d+)\/(\d+)\s*$/;
        const fractionMatch = value.match(fractionPattern);
        if (fractionMatch) {
            const sign = value.trim().startsWith('-') ? -1 : 1;
            const whole = fractionMatch[1] ? Math.abs(parseInt(fractionMatch[1])) : 0;
            const numerator = Math.abs(parseInt(fractionMatch[2]));
            const denominator = parseInt(fractionMatch[3]);

            if (denominator === 0) return null;

            const decimalValue = sign * (whole + (numerator / denominator));

            // Determine the mask
            let mask;
            if ([2, 4, 8, 16, 32].includes(denominator)) {
                mask = whole !== 0 ? `# ?/${denominator}` : `?/${denominator}`;
            } else if (denominator <= 9) {
                mask = whole !== 0 ? '# ?/?' : '?/?';
            } else {
                mask = whole !== 0 ? '# ??/??' : '??/??';
            }

            if (testMask(mask, decimalValue, value.trim())) {
                return { mask, value: decimalValue };
            }
        }
        return null;
    }

    const autoCastingPercent = function(value) {
        const percentPattern = /^\s*([+-]?\d+(?:[.,]\d+)?)%\s*$/;
        const percentMatch = value.match(percentPattern);
        if (percentMatch) {
            const rawNumber = percentMatch[1].replace(',', '.');
            const decimalValue = parseFloat(rawNumber) / 100;

            const decimalPart = rawNumber.split('.')[1];
            const decimalPlaces = decimalPart ? decimalPart.length : 0;
            const mask = decimalPlaces > 0 ? `0.${'0'.repeat(decimalPlaces)}%` : '0%';

            if (testMask(mask, decimalValue, value.trim())) {
                return { mask: mask, value: decimalValue };
            }
        }
        return null;
    }

    const autoCastingDates = function(value) {
        if (!value || typeof value !== 'string') {
            return null;
        }

        // Smart pattern detection based on the structure of the string

        // 1. Analyze the structure to determine possible formats
        const analyzeStructure = function(str) {
            const patterns = [];

            // Check for date with forward slashes: XX/XX/XXXX or XX/XX/XX
            if (str.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/)) {
                const parts = str.split('/');
                const p1 = parseInt(parts[0]);
                const p2 = parseInt(parts[1]);
                const p3 = parseInt(parts[2]);

                // Determine likely format based on values
                if (p1 <= 12 && p2 <= 31 && p2 > 12) {
                    // Likely mm/dd/yyyy
                    patterns.push('mm/dd/yyyy', 'mm/dd/yy', 'm/d/yyyy', 'm/d/yy');
                } else if (p1 <= 31 && p2 <= 12 && p1 > 12) {
                    // Likely dd/mm/yyyy
                    patterns.push('dd/mm/yyyy', 'dd/mm/yy', 'd/m/yyyy', 'd/m/yy');
                } else if (p1 <= 12 && p2 <= 12) {
                    // Ambiguous - could be either, use locale preference
                    const locale = navigator.language || 'en-US';
                    if (locale.startsWith('en-US')) {
                        patterns.push('mm/dd/yyyy', 'dd/mm/yyyy', 'mm/dd/yy', 'dd/mm/yy');
                    } else {
                        patterns.push('dd/mm/yyyy', 'mm/dd/yyyy', 'dd/mm/yy', 'mm/dd/yy');
                    }
                }

                // Add variations
                if (p3 < 100) {
                    patterns.push('dd/mm/yy', 'mm/dd/yy', 'd/m/yy', 'm/d/yy');
                } else {
                    patterns.push('dd/mm/yyyy', 'mm/dd/yyyy', 'd/m/yyyy', 'm/d/yyyy');
                }
            }

            // Check for date with dashes: XX-XX-XXXX
            else if (str.match(/^\d{1,2}-\d{1,2}-\d{2,4}$/)) {
                const parts = str.split('-');
                const p1 = parseInt(parts[0]);
                const p2 = parseInt(parts[1]);

                if (p1 <= 12 && p2 <= 31 && p2 > 12) {
                    patterns.push('mm-dd-yyyy', 'mm-dd-yy', 'm-d-yyyy', 'm-d-yy');
                } else if (p1 <= 31 && p2 <= 12 && p1 > 12) {
                    patterns.push('dd-mm-yyyy', 'dd-mm-yy', 'd-m-yyyy', 'd-m-yy');
                } else {
                    patterns.push('dd-mm-yyyy', 'mm-dd-yyyy', 'dd-mm-yy', 'mm-dd-yy');
                }
            }

            // Check for ISO format: YYYY-MM-DD
            else if (str.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                patterns.push('yyyy-mm-dd', 'yyyy-m-d');
            }

            // Check for format: YYYY/MM/DD
            else if (str.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
                patterns.push('yyyy/mm/dd', 'yyyy/m/d');
            }

            // Check for dates with month names
            else if (str.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)) {
                // DD Mon YYYY or DD Month YYYY
                if (str.match(/^\d{1,2}\s+\w+\s+\d{2,4}$/i)) {
                    patterns.push('dd mmm yyyy', 'dd mmmm yyyy', 'd mmm yyyy', 'd mmmm yyyy',
                        'dd mmm yy', 'dd mmmm yy', 'd mmm yy', 'd mmmm yy');
                }
                // Mon DD, YYYY or Month DD, YYYY
                else if (str.match(/^\w+\s+\d{1,2},?\s+\d{2,4}$/i)) {
                    patterns.push('mmm dd, yyyy', 'mmmm dd, yyyy', 'mmm d, yyyy', 'mmmm d, yyyy',
                        'mmm dd yyyy', 'mmmm dd yyyy', 'mmm d yyyy', 'mmmm d yyyy');
                }
                // DD-Mon-YYYY
                else if (str.match(/^\d{1,2}-\w+-\d{2,4}$/i)) {
                    patterns.push('dd-mmm-yyyy', 'dd-mmmm-yyyy', 'd-mmm-yyyy', 'd-mmmm-yyyy',
                        'dd-mmm-yy', 'dd-mmmm-yy', 'd-mmm-yy', 'd-mmmm-yy');
                }
            }

            // Check for weekday formats
            else if (str.match(/^(mon|tue|wed|thu|fri|sat|sun)/i)) {
                if (str.match(/^\w+,\s+\d{1,2}\s+\w+\s+\d{4}$/i)) {
                    patterns.push('ddd, dd mmm yyyy', 'ddd, d mmm yyyy',
                        'dddd, dd mmmm yyyy', 'dddd, d mmmm yyyy');
                }
            }

            // Check for datetime formats
            else if (str.includes(' ') && str.match(/\d{1,2}:\d{2}/)) {
                const parts = str.split(' ');
                if (parts.length >= 2) {
                    const datePart = parts[0];
                    const timePart = parts.slice(1).join(' ');

                    // Determine date format
                    let dateMasks = [];
                    if (datePart.includes('/')) {
                        dateMasks = ['dd/mm/yyyy', 'mm/dd/yyyy', 'd/m/yyyy', 'm/d/yyyy'];
                    } else if (datePart.includes('-')) {
                        if (datePart.match(/^\d{4}-/)) {
                            dateMasks = ['yyyy-mm-dd', 'yyyy-m-d'];
                        } else {
                            dateMasks = ['dd-mm-yyyy', 'mm-dd-yyyy', 'd-m-yyyy', 'm-d-yyyy'];
                        }
                    }

                    // Determine time format
                    let timeMasks = [];
                    if (timePart.match(/\d{1,2}:\d{2}:\d{2}/)) {
                        timeMasks = ['hh:mm:ss', 'h:mm:ss'];
                    } else {
                        timeMasks = ['hh:mm', 'h:mm'];
                    }

                    // Add AM/PM variants if present
                    if (timePart.match(/[ap]m/i)) {
                        timeMasks = timeMasks.map(t => t + ' am/pm');
                    }

                    // Combine date and time masks
                    for (const dateMask of dateMasks) {
                        for (const timeMask of timeMasks) {
                            patterns.push(`${dateMask} ${timeMask}`);
                        }
                    }
                }
            }

            // Check for time-only formats
            else if (str.match(/^\d{1,2}:\d{2}(:\d{2})?(\s*(am|pm))?$/i)) {
                if (str.match(/:\d{2}:\d{2}/)) {
                    patterns.push('hh:mm:ss', 'h:mm:ss');
                    if (str.match(/[ap]m/i)) {
                        patterns.push('hh:mm:ss am/pm', 'h:mm:ss am/pm');
                    }
                } else {
                    patterns.push('hh:mm', 'h:mm');
                    if (str.match(/[ap]m/i)) {
                        patterns.push('hh:mm am/pm', 'h:mm am/pm');
                    }
                }
            }

            // Check for extended hour format [h]:mm:ss
            else if (str.match(/^\[?\d+\]?:\d{2}:\d{2}$/)) {
                patterns.push('[h]:mm:ss');
            }

            return [...new Set(patterns)]; // Remove duplicates
        };

        // Get candidate masks based on the string structure
        const candidateMasks = analyzeStructure(value);

        // If no patterns detected, try some common formats as fallback
        if (candidateMasks.length === 0) {
            const locale = navigator.language || 'en-US';
            if (locale.startsWith('en-US')) {
                candidateMasks.push(
                    'mm/dd/yyyy', 'mm-dd-yyyy', 'yyyy-mm-dd',
                    'mm/dd/yy', 'mm-dd-yy',
                    'hh:mm:ss', 'hh:mm', 'h:mm am/pm'
                );
            } else {
                candidateMasks.push(
                    'dd/mm/yyyy', 'dd-mm-yyyy', 'yyyy-mm-dd',
                    'dd/mm/yy', 'dd-mm-yy',
                    'hh:mm:ss', 'hh:mm', 'h:mm'
                );
            }
        }

        // Try each candidate mask
        for (const mask of candidateMasks) {
            try {
                // Use Component.extractDateFromString to parse the date
                const isoDate = Component.extractDateFromString(value, mask);

                if (isoDate && isoDate !== '') {
                    // Parse the ISO date string to components
                    const parts = isoDate.split(' ');
                    const dateParts = parts[0].split('-');
                    const timeParts = parts[1] ? parts[1].split(':') : ['0', '0', '0'];

                    const year = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]);
                    const day = parseInt(dateParts[2]);
                    const hour = parseInt(timeParts[0]);
                    const minute = parseInt(timeParts[1]);
                    const second = parseInt(timeParts[2]);

                    // Validate the date components
                    if (year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31 &&
                        hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60) {

                        // Convert to Excel serial number
                        const excelNumber = Helpers.dateToNum(isoDate);

                        // Verify by rendering back
                        const rendered = Component.render(excelNumber, { mask: mask }, true);

                        // Case-insensitive comparison for month names
                        if (rendered.toLowerCase() === value.toLowerCase()) {
                            return {
                                mask: mask,
                                value: excelNumber,
                            };
                        }
                    }
                }
            } catch (e) {
            }
        }

        // No matching format found
        return null;
    };

    const autoCastingCurrency = function (input) {
        if (typeof input !== 'string') return null;

        const original = input.trim();

        const isNegative = /^\s*[-(]/.test(original);
        const hasParens = /^\s*\(.+\)\s*$/.test(original);
        let value = original.replace(/[()\-]/g, '').trim();

        // Use pre-compiled currency regexes
        let symbol = '';

        for (let {symbol: s, regex} of currencyRegexes) {
            const match = value.match(regex);
            if (match) {
                symbol = s + (match[1] || '');
                value = value.replace(regex, '');
                break;
            }
        }

        // Generic symbol/prefix (e.g., "U$", "R$")
        // Only match 1-2 letters followed by a currency symbol
        if (!symbol) {
            const prefixMatch = value.match(/^([A-Z]{1,2}[€$£¥₹₽₩₫¢])(\s?)/i);
            if (prefixMatch) {
                symbol = prefixMatch[1] + (prefixMatch[2] || '');
                value = value.replace(prefixMatch[0], '');
            }
        }

        // Code prefix (e.g., BRL 1, USD 100)
        if (!symbol) {
            const codePrefixMatch = value.match(/^([A-Z]{3})(\s+)/i);
            if (codePrefixMatch) {
                symbol = codePrefixMatch[1] + ' ';
                value = value.replace(codePrefixMatch[0], '');
            }
        }

        // Code suffix (e.g., 1 USD, 100 BRL)
        if (!symbol) {
            const codeSuffixMatch = value.match(/([A-Z]{3})$/i);
            if (codeSuffixMatch) {
                value = value.replace(codeSuffixMatch[1], '').trim();
                symbol = codeSuffixMatch[1] + ' ';
            }
        }

        value = value.replace(/\s+/g, '');

        // If there's no currency symbol and value contains invalid characters (like /), reject it
        // This prevents date-like values "1/1/1" from being detected as currency
        if (!symbol && /[^0-9.,-]/.test(value)) {
            return null;
        }

        // Infer separators
        let group = ',', decimal = '.';

        if (value.includes(',') && value.includes('.')) {
            const lastComma = value.lastIndexOf(',');
            const lastDot = value.lastIndexOf('.');
            if (lastComma > lastDot) {
                group = '.';
                decimal = ',';
            } else {
                group = ',';
                decimal = '.';
            }
        } else if (value.includes('.')) {
            const parts = value.split('.');
            const lastPart = parts[parts.length - 1];
            if (/^\d{3}$/.test(lastPart)) {
                group = '.';
                decimal = ',';
            } else {
                group = ',';
                decimal = '.';
            }
        } else if (value.includes(',')) {
            const parts = value.split(',');
            const lastPart = parts[parts.length - 1];
            if (/^\d{3}$/.test(lastPart)) {
                group = ',';
                decimal = '.';
            } else {
                group = '.';
                decimal = ',';
            }
        }

        // Normalize and parse
        const normalized = value
            .replace(new RegExp(`\\${group}`, 'g'), '')
            .replace(decimal, '.');

        const parsed = parseFloat(normalized);
        if (isNaN(parsed)) return null;

        const finalValue = isNegative ? -parsed : parsed;

        // Build dynamic group + decimal mask
        const decimalPlaces = normalized.includes('.') ? normalized.split('.')[1].length : 0;
        const maskDecimal = decimalPlaces ? decimal + '0'.repeat(decimalPlaces) : '';
        const groupMask = '#' + group + '##0';
        let mask = `${symbol}${groupMask}${maskDecimal}`;

        if (isNegative) {
            mask = hasParens ? `(${mask})` : `-${mask}`;
        }

        return {
            mask,
            value: finalValue
        };
    }

    const autoCastingNumber = function (input) {
        // If you currently support numeric inputs directly, keep this:
        if (typeof input === 'number' && Number.isFinite(input)) {
            return { mask: '0', value: input };
        }

        if (typeof input !== 'string') {
            return null;
        }

        const sRaw = input.trim();
        if (!/^[+-]?\d+$/.test(sRaw)) {
            return null;
        }

        const sign = /^[+-]/.test(sRaw) ? sRaw[0] : '';
        const digitsClean = (sign ? sRaw.slice(1) : sRaw); // keep as you already do

        // ***** NEW: mask derived from RAW leading zeros only *****
        const rawDigits = sign ? sRaw.slice(1) : sRaw;     // no extra cleaning here
        const m = rawDigits.match(/^0+/);
        const leadingZeros = m ? m[0].length : 0;

        const mask = leadingZeros > 0 ? '0'.repeat(rawDigits.length) : '0';

        // Your existing numeric value (from the cleaned digits)
        const value = Number(sign + digitsClean);

        return { mask, value };
    };

    const autoCastingScientific = function(input) {
        if (typeof input !== 'string') return null;

        const original = input.trim();

        // Match scientific notation: 1e3, -2.5E-4, etc.
        const sciPattern = /^[-+]?\d*\.?\d+[eE][-+]?\d+$/;
        if (!sciPattern.test(original)) return null;

        const parsed = parseFloat(original);
        if (isNaN(parsed)) return null;

        // Extract parts to determine mask
        const [coefficient, exponent] = original.toLowerCase().split('e');
        const decimalPlaces = coefficient.includes('.') ? coefficient.split('.')[1].length : 0;
        const mask = `0${decimalPlaces ? '.' + '0'.repeat(decimalPlaces) : ''}E+00`;

        return {
            mask,
            value: parsed
        };
    }

    const autoCastingTime = function (input) {
        if (typeof input !== 'string') return null;
        const original = input.trim();

        // hh:mm[:ss][ am/pm]
        const m = original.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(am|pm))?$/i);
        if (!m) return null;

        let h = parseInt(m[1], 10);
        const i = parseInt(m[2], 10);
        const s = m[3] ? parseInt(m[3], 10) : 0;
        const mer = m[4] && m[4].toLowerCase();

        // basic range checks
        if (i > 59 || s > 59) return null;
        if (mer) {
            if (h < 1 || h > 12) return null;
            if (mer === 'pm' && h < 12) h += 12;
            if (mer === 'am' && h === 12) h = 0;
        } else {
            if (h > 23) return null;
        }

        // Excel serial for time-of-day = hours/24 + minutes/1440 + seconds/86400
        const excel = (h + i / 60 + s / 3600) / 24;

        // Build mask according to how user typed it
        const hourToken = m[1].length === 1 ? 'h' : 'hh';
        const base = s !== 0 || m[3] ? `${hourToken}:mm:ss` : `${hourToken}:mm`;
        const mask = mer ? `${base} am/pm` : base;

        // Verify we can render back exactly what the user typed
        if (testMask(mask, excel, original)) {            // uses Component.render under the hood
            return { mask: mask, value: excel};
        }

        // Try alternate hour width if needed
        const altHour = hourToken === 'hh' ? 'h' : 'hh';
        const alt = mer
            ? `${altHour}${base.slice(hourToken.length)} am/pm`
            : `${altHour}${base.slice(hourToken.length)}`;

        if (testMask(alt, excel, original)) {
            return { mask: alt, value: excel };
        }

        return null;
    };

    const ParseValue = function(v, config) {
        if (v === '') return '';

        const originalInput = '' + v;
        const decimal = config.decimal || '.';

        // Validate that the input looks like a reasonable number format before extracting digits
        // Reject strings that are clearly not intended to be numbers (e.g., "test123", "abc", etc.)
        const hasLetters = /[a-zA-Z]/.test(originalInput);
        const hasDigits = /[0-9]/.test(originalInput);

        if (hasLetters && hasDigits) {
            // Mixed letters and digits - check if it's a valid numeric format
            // Allow currency symbols, currency codes (3 letters), percentage, and separators

            // Remove all valid numeric characters and symbols
            let cleaned = originalInput.replace(/[\d\s.,\-+()]/g, ''); // Remove digits, spaces, separators, signs, parentheses
            cleaned = cleaned.replace(/[A-Z]{1,2}[€$£¥₹₽₩₫¢]/gi, ''); // Remove 1-2 letter prefix + currency symbol (R$, U$, etc.)
            cleaned = cleaned.replace(/[€$£¥₹₽₩₫¢]/g, ''); // Remove remaining currency symbols
            cleaned = cleaned.replace(/%/g, ''); // Remove percentage
            cleaned = cleaned.replace(/\b[A-Z]{3}\b/g, ''); // Remove 3-letter currency codes (USD, BRL, etc.)

            // If anything remains, it's likely invalid (like "test" in "test123")
            if (cleaned.trim().length > 0) {
                return null; // Reject patterns like "test123", "abc123", etc.
            }
        }

        v = originalInput.split(decimal);

        // Detect negative sign
        let signal = v[0].includes('-');

        v[0] = v[0].match(/[0-9]+/g);
        if (v[0]) {
            if (signal) v[0].unshift('-');
            v[0] = v[0].join('');
        } else {
            v[0] = signal ? '-' : '';
        }

        if (v[1] !== undefined) {
            v[1] = v[1].match(/[0-9]+/g);
            v[1] = v[1] ? v[1].join('') : '';
        }

        return v[0] || v[1] ? v : '';
    }

    const Extract = function(v, config) {
        const parsed = ParseValue(v, config);
        if (parsed) {
            if (parsed[0] === '-') {
                parsed[0] = '-0';
            }
            return parseFloat(parsed.join('.'));
        }
        return null;
    }

    /**
     * Try to get which mask that can transform the number in that format
     */
    Component.autoCasting = function(value, returnObject) {
        const methods = [
            autoCastingDates,        // Most structured, the least ambiguous
            autoCastingTime,
            autoCastingFractions,    // Specific pattern with slashes
            autoCastingPercent,      // Recognizable with "%"
            autoCastingScientific,
            autoCastingNumber,       // Only picks up basic digits, decimals, leading 0s
            autoCastingCurrency,     // Complex formats, but recognizable
        ];

        for (let method of methods) {
            const test = method(value);
            if (test) {
                return test;
            }
        }

        return null;
    }

    Component.extract = function(value, options, returnObject) {
        if (! value || typeof options !== 'object') {
            return value;
        }

        if (! config.mask) {
            return value;
        }

        let mask = options.mask.split(';')[0];
        if (mask) {
            options.mask = mask;
        }

        // Get decimal, group, type, etc.
        const config = getConfig(options, value);
        const type = config.type;

        let result;
        let o = options;

        if (type === 'text') {
            result = value;
        } else if (type === 'general') {
            result = Component(value, options);
        } else if (type === 'datetime') {
            if (value instanceof Date) {
                value = Component.getDateString(value, config.mask);
            }

            o = Component(value, options, true);

            result = typeof o.value === 'number' ? o.value : extractDate.call(o);
        } else if (type === 'scientific') {
            result = typeof value === 'string' ? Number(value) : value;
        } else if (type === 'fraction') {
            // Parse a fraction string according to the mask (supports mixed "# ?/d" or simple "?/d")
            const mask = config.mask;

            // Detect fixed denominator (e.g. "# ?/16" or "?/8")
            const fixedDenMatch = mask.match(/\/\s*(\d+)\s*$/);
            const fixedDen = fixedDenMatch ? parseInt(fixedDenMatch[1], 10) : null;

            // Whether a mask allows a whole part (e.g. "# ?/?")
            const allowWhole = mask.includes('#');

            let s = ('' + value).trim();
            if (! s) {
                result = null;
            } else {
                // Allow leading parentheses or '-' for negatives
                let sign = 1;
                if (/^\(.*\)$/.test(s)) {
                    sign = -1;
                    s = s.slice(1, -1).trim();
                }
                if (/^\s*-/.test(s)) {
                    sign = -1;
                    s = s.replace(/^\s*-/, '').trim();
                }

                let out = null;

                if (s.includes('/')) {
                    // sign? (whole )? numerator / denominator
                    // Examples:
                    //  "1 1/2" => whole=1, num=1, den=2
                    //  "1/2"   => whole=undefined, num=1, den=2
                    const m = s.match(/^\s*(?:(\d+)\s+)?(\d+)\s*\/\s*(\d+)\s*$/);
                    if (m) {
                        const whole = allowWhole && m[1] ? parseInt(m[1], 10) : 0;
                        const num = parseInt(m[2], 10);
                        let den = parseInt(m[3], 10);

                        // If mask fixes the denominator, enforce it
                        if (fixedDen) den = fixedDen;

                        if (den !== 0) {
                            out = sign * (whole + num / den);
                        }
                    }
                } else {
                    // No slash → treats as a plain number (e.g., whole only)
                    const plain = Number(s.replace(',', '.'));
                    if (!Number.isNaN(plain)) {
                        out = sign * Math.abs(plain);
                    }
                }

                result = out;
            }
        } else {
            // Default fallback — numeric/currency/percent/etc.
            result = Extract(value, config);
            // Adjust percent
            if (type === 'percentage' && ('' + value).indexOf('%') !== -1) {
                result = result / 100;
            }
        }

        o.value = result;

        if (! o.type && type) {
            o.type = type;
        }

        return returnObject ? o : result;
    };

    Component.render = function(value, options, fullMask) {
        // Nothing to render
        if (value === '' || value === undefined || value === null) {
            return '';
        }

        if (! config.mask) {
            return value;
        }

        // Config
        const config = getConfig(options, value);

        // Percentage
        if (config.type === 'datetime') {
            var t = Component.getDateString(value, config.mask);
            if (t) {
                value = t;
            } else {
                return '';
            }
        } else if (config.type === 'text') {
            // Parse number
            if (typeof(value) === 'number') {
                value = value.toString();
            }
        } else {
            if (config.type === 'percentage') {
                if (typeof(value) === 'string' && value.indexOf('%') !== -1) {
                    value = value.replace('%', '');
                } else {
                    value = adjustPrecision(Number(value) * 100);
                }
            } else {
                if (config.mask.includes(',,M')) {
                    if (typeof(value) === 'string' && value.indexOf('M') !== -1) {
                        value = value.replace('M', '');
                    } else {
                        value = Number(value) / 1000000;
                    }
                } else if (config.mask.includes(',,,B')) {
                    if (typeof(value) === 'string' && value.indexOf('B') !== -1) {
                        value = value.replace('B', '');
                    } else {
                        value = Number(value) / 1000000000;
                    }
                }
            }

            if (typeof(value) === 'string' && isNumber(value)) {
                value = Number(value);
            }

            if (typeof value === 'number') {
                // Temporary value
                let temp = value;

                if (config.type === 'fraction') {
                    temp = formatFraction(value, config.mask);
                } else {
                    if (fullMask) {
                        temp = adjustNumberOfDecimalPlaces(config, value);

                        if (config.type === 'scientific') {
                            return temp;
                        }
                    }
                }

                value = toPlainString(temp);

                if (config.decimal === ',') {
                    value = value.replace('.', config.decimal);
                }
            }
        }

        // Process mask
        let control = Component(value, options, true);
        // Complement render
        if (fullMask) {
            processNumOfPaddingZeros(control);
        }

        value = getValue(control);

        if (options.input && options.input.tagName) {
            if (options.input.contentEditable) {
                options.input.textContent = value;
            } else {
                options.input.value = value;
            }
            focus(options.input);
        }

        return value;
    }

    // Helper to extract date from a string
    Component.extractDateFromString = function (date, format) {
        let o = Component(date, { mask: format }, true);

        // Check if in format Excel (Need difference with format date or type detected is numeric)
        if (date > 0 && Number(date) == date && (o.values.join("") !== o.value || o.type == "numeric")) {
            var d = new Date(Math.round((date - 25569) * 86400 * 1000));
            return d.getFullYear() + "-" + Helpers.two(d.getMonth()) + "-" + Helpers.two(d.getDate()) + ' 00:00:00';
        }

        let complete = false;

        if (o.values && o.values.length === o.tokens.length && o.values[o.values.length - 1].length >= o.tokens[o.tokens.length - 1].length) {
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

    // Tokens
    const dateTokens = ['DAY', 'WD', 'DDDD', 'DDD', 'DD', 'D', 'Q', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'YYYY', 'YYY', 'YY', 'Y', 'MONTH', 'MON', 'MMMMM', 'MMMM', 'MMM', 'MM', 'M', '.'];
    // All date tokens
    const allDateTokens = dateTokens.join('|')

    Component.getDateString = function(value, options) {
        if (! options) {
            options = {};
        }

        // Labels
        let format;

        if (options && typeof(options) == 'object') {
            if (options.format) {
                format = options.format;
            } else if (options.mask) {
                format = options.mask;
            }
        } else {
            format = options;
        }

        if (! format) {
            format = 'YYYY-MM-DD';
        }

        format = format.toUpperCase();

        // Date instance
        if (value instanceof Date) {
            value = Helpers.now(value);
        } else if (isNumber(value)) {
            value = Helpers.numToDate(value);
        }


        // Expression to extract all tokens from the string
        let e = new RegExp(allDateTokens, 'gi');
        // Extract
        let t = format.match(e);

        // Compatibility with Excel
        fixMinuteToken(t);

        // Object
        const o = {
            tokens: t
        }

        // Value
        if (value) {
            try {
                // Data
                  o.data = extractDateAndTime(value);

                if (o.data[1] && o.data[1] > 12) {
                    throw new Error('Invalid date');
                } else if (o.data[4] && o.data[4] > 59) {
                    throw new Error('Invalid date');
                } else if (o.data[5] && o.data[5] > 59) {
                    throw new Error('Invalid date');
                } else if (o.data[0] != null && o.data[1] != null) {
                    let day = new Date(o.data[0], o.data[1], 0).getDate();
                    if (o.data[2] > day) {
                        throw new Error('Invalid date');
                    }
                }

                // Value
                o.value = [];

                // Calendar instance
                let calendar = new Date(o.data[0], o.data[1] - 1, o.data[2], o.data[3], o.data[4], o.data[5]);

                // Get method
                const get = function (i) {
                    // Token
                    let t = this.tokens[i];

                    // Case token
                    let s = t.toUpperCase();
                    let v = null;

                    if (s === 'YYYY') {
                        v = this.data[0];
                    } else if (s === 'YYY') {
                        v = this.data[0].substring(1, 4);
                    } else if (s === 'YY') {
                        v = this.data[0].substring(2, 4);
                    } else if (s === 'Y') {
                        v = this.data[0].substring(3, 4);
                    } else if (t === 'MON') {
                        v = Helpers.months[calendar.getMonth()].substr(0, 3).toUpperCase();
                    } else if (t === 'mon') {
                        v = Helpers.months[calendar.getMonth()].substr(0, 3).toLowerCase();
                    } else if (t === 'MONTH') {
                        v = Helpers.months[calendar.getMonth()].toUpperCase();
                    } else if (t === 'month') {
                        v = Helpers.months[calendar.getMonth()].toLowerCase();
                    } else if (s === 'MMMMM') {
                        v = Helpers.months[calendar.getMonth()].substr(0, 1);
                    } else if (s === 'MMMM' || t === 'Month') {
                        v = Helpers.months[calendar.getMonth()];
                    } else if (s === 'MMM' || t == 'Mon') {
                        v = Helpers.months[calendar.getMonth()].substr(0, 3);
                    } else if (s === 'MM') {
                        v = Helpers.two(this.data[1]);
                    } else if (s === 'M') {
                        v = calendar.getMonth() + 1;
                    } else if (t === 'DAY') {
                        v = Helpers.weekdays[calendar.getDay()].toUpperCase();
                    } else if (t === 'day') {
                        v = Helpers.weekdays[calendar.getDay()].toLowerCase();
                    } else if (s === 'DDDD' || t == 'Day') {
                        v = Helpers.weekdays[calendar.getDay()];
                    } else if (s === 'DDD') {
                        v = Helpers.weekdays[calendar.getDay()].substr(0, 3);
                    } else if (s === 'DD') {
                        v = Helpers.two(this.data[2]);
                    } else if (s === 'D') {
                        v = parseInt(this.data[2]);
                    } else if (s === 'Q') {
                        v = Math.floor((calendar.getMonth() + 3) / 3);
                    } else if (s === 'HH24' || s === 'HH') {
                        v = this.data[3]%24;
                        if (this.tokens.indexOf('AM/PM') !== -1) {
                            if (v > 12) {
                                v -= 12;
                            } else if (v == '0' || v == '00') {
                                v = 12;
                            }
                        }
                        v = Helpers.two(v);
                    } else if (s === 'HH12') {
                        v = this.data[3]%24;
                        if (v > 12) {
                            v = Helpers.two(v - 12);
                        } else {
                            v = Helpers.two(v);
                        }
                    } else if (s === 'H') {
                        v = this.data[3]%24;
                        if (this.tokens.indexOf('AM/PM') !== -1) {
                            if (v > 12) {
                                v -= 12;
                            } else if (v == '0' || v == '00') {
                                v = 12;
                            }
                        }
                    } else if (s === '[H]') {
                        v = this.data[3];
                    } else if (s === 'MI') {
                        v = Helpers.two(this.data[4]);
                    } else if (s === 'I') {
                        v = parseInt(this.data[4]);
                    } else if (s === 'SS') {
                        v = Helpers.two(this.data[5]);
                    } else if (s === 'S') {
                        v = parseInt(this.data[5]);
                    } else if (s === 'MS') {
                        v = calendar.getMilliseconds();
                    } else if (s === 'AM/PM') {
                        if (this.data[3] >= 12) {
                            v = 'PM';
                        } else {
                            v = 'AM';
                        }
                    } else if (s === 'WD') {
                        v = Helpers.weekdays[calendar.getDay()];
                    }

                    if (v === null) {
                        this.value[i] = this.tokens[i];
                    } else {
                        this.value[i] = v;
                    }
                }

                for (let i = 0; i < o.tokens.length; i++) {
                    get.call(o, i);
                }

                value = o.value.join('');
            } catch (e) {
                console.log(e)
                value = '';
            }
        }

        return value;
    }

    Component.getDate = function(value, format) {
        if (! format) {
            format = 'YYYY-MM-DD';
        }

        let ret = value;
        if (ret && Number(ret) == ret) {
            ret = Helpers.numToDate(ret);
        }

        // Try a formatted date
        if (! Helpers.isValidDateFormat(ret)) {
            let tmp = Component.extractDateFromString(ret, format);
            if (tmp) {
                ret = tmp;
            }
        }

        return Component.getDateString(ret, format);
    }

    Component.oninput = function(e, mask) {
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
        if (! mask) {
            mask = element.getAttribute('data-mask');
        }
        // Keep the current caret position
        let caret = getCaret(element);
        if (caret) {
            value = value.substring(0, caret) + hiddenCaret + value.substring(caret);
        }

        // Run mask
        let result = Component(value, { mask: mask }, true);

        // New value
        let newValue = result.values.join('');
        // Apply the result back to the element
        if (newValue !== value && ! e.inputType.includes('delete')) {
            // Set the caret to the position before transformation
            let caret = newValue.indexOf(hiddenCaret);
            if (caret !== -1) {
                // Apply value
                element[property] = newValue.replace(hiddenCaret, "");
                // Set caret
                setCaret.call(element, caret);
            } else {
                // Apply value
                element[property] = newValue;
                // Make sure the caret is positioned in the end
                focus(element);
            }
        }
    }

    Component.getType = getType;

    Component.adjustPrecision = adjustPrecision;

    return Component;
}

export default Mask();
