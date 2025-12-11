
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jSuites = factory();
}(this, (function () {

var jSuites;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 791:
/***/ (function(module) {

/**
 * (c) jSuites Javascript Plugins and Web Components (v6)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 */

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    'use strict';

    const Helpers = (function () {
        const component = {};

        // Excel like dates
        const excelInitialTime = Date.UTC(1900, 0, 0);
        const excelLeapYearBug = Date.UTC(1900, 1, 29);
        const millisecondsPerDay = 86400000;

        // Transform in two digits
        component.two = function (value) {
            value = '' + value;
            if (value.length === 1) {
                value = '0' + value;
            }
            return value;
        };

        component.isValidDate = function (d) {
            return d instanceof Date && !isNaN(d.getTime());
        };

        component.isValidDateFormat = function(date) {
            if (typeof date === 'string') {
                // Check format: YYYY-MM-DD using regex
                const match = date.substring(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})$/);
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
                if (!date) {
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
                return (
                    component.two(y) + '-' + component.two(m) + '-' + component.two(d) + ' ' + component.two(h) + ':' + component.two(i) + ':' + component.two(s)
                );
            }
        };

        component.toArray = function (value) {
            let date = value.split(value.indexOf('T') !== -1 ? 'T' : ' ');
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
        };

        component.arrayToStringDate = function (arr) {
            return component.toString(arr, false);
        };

        component.dateToNum = function (jsDate) {
            if (typeof jsDate === 'string') {
                jsDate = new Date(jsDate + '  GMT+0');
            }
            let jsDateInMilliseconds = jsDate.getTime();
            if (jsDateInMilliseconds >= excelLeapYearBug) {
                jsDateInMilliseconds += millisecondsPerDay;
            }
            jsDateInMilliseconds -= excelInitialTime;

            return jsDateInMilliseconds / millisecondsPerDay;
        };

        component.numToDate = function (excelSerialNumber, asArray) {
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
        };

        component.prettify = function (d, texts) {
            if (!texts) {
                texts = {
                    justNow: 'Just now',
                    xMinutesAgo: '{0}m ago',
                    xHoursAgo: '{0}h ago',
                    xDaysAgo: '{0}d ago',
                    xWeeksAgo: '{0}w ago',
                    xMonthsAgo: '{0} mon ago',
                    xYearsAgo: '{0}y ago',
                };
            }

            if (d.indexOf('GMT') === -1 && d.indexOf('Z') === -1) {
                d += ' GMT';
            }

            let d1 = new Date();
            let d2 = new Date(d);
            let total = parseInt((d1 - d2) / 1000 / 60);

            const format = (t, o) => {
                return t.replace('{0}', o);
            };

            if (!total) {
                return texts.justNow;
            } else if (total < 90) {
                return format(texts.xMinutesAgo, total);
            } else if (total < 1440) {
                // One day
                return format(texts.xHoursAgo, Math.round(total / 60));
            } else if (total < 20160) {
                // 14 days
                return format(texts.xDaysAgo, Math.round(total / 1440));
            } else if (total < 43200) {
                // 30 days
                return format(texts.xWeeksAgo, Math.round(total / 10080));
            } else if (total < 1036800) {
                // 24 months
                return format(texts.xMonthsAgo, Math.round(total / 43200));
            } else {
                // 24 months+
                return format(texts.xYearsAgo, Math.round(total / 525600));
            }
        };

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
        };

        // Compatibility with jSuites
        component.now = component.toString;

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const translate = function (t) {
            if (typeof document !== 'undefined' && document.dictionary) {
                return document.dictionary[t] || t;
            } else {
                return t;
            }
        };

        Object.defineProperty(component, 'weekdays', {
            get: function () {
                return weekdays.map(function (v) {
                    return translate(v);
                });
            },
        });

        Object.defineProperty(component, 'weekdaysShort', {
            get: function () {
                return weekdays.map(function (v) {
                    return translate(v).substring(0, 3);
                });
            },
        });

        Object.defineProperty(component, 'months', {
            get: function () {
                return months.map(function (v) {
                    return translate(v);
                });
            },
        });

        Object.defineProperty(component, 'monthsShort', {
            get: function () {
                return months.map(function (v) {
                    return translate(v).substring(0, 3);
                });
            },
        });

        return component;
    })();

    const Mask = (function() {
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
            general: [ 'A', '0', '\\?', '\\*', ',,M', ',,,B', '[a-zA-Z\\$]+', '_[.\\s\\S]', '\\(', '\\)', '.']
        }

        const countryCodes = {
            "0409": [
                "$",
                ",",
                "."
            ],
            "0809": [
                "£",
                ",",
                "."
            ],
            "0C09": [
                "$",
                ",",
                "."
            ],
            "1009": [
                "$",
                ",",
                "."
            ],
            "1409": [
                "$",
                ",",
                "."
            ],
            "1809": [
                "€",
                ",",
                "."
            ],
            "1C09": [
                "R",
                " ",
                "."
            ],
            "040C": [
                "€",
                " ",
                ","
            ],
            "080C": [
                "€",
                " ",
                ","
            ],
            "100C": [
                "CHF",
                "'",
                "."
            ],
            "140C": [
                "€",
                " ",
                ","
            ],
            "0C0C": [
                "$",
                " ",
                ","
            ],
            "0407": [
                "€",
                ".",
                ","
            ],
            "0C07": [
                "€",
                ".",
                ","
            ],
            "0807": [
                "CHF",
                "'",
                "."
            ],
            "1007": [
                "€",
                ".",
                ","
            ],
            "0413": [
                "€",
                ".",
                ","
            ],
            "0813": [
                "€",
                " ",
                ","
            ],
            "0410": [
                "€",
                ".",
                ","
            ],
            "0810": [
                "CHF",
                "'",
                "."
            ],
            "0C0A": [
                "€",
                ".",
                ","
            ],
            "080A": [
                "$",
                ",",
                "."
            ],
            "2C0A": [
                "$",
                ".",
                ","
            ],
            "340A": [
                "$",
                ".",
                ","
            ],
            "240A": [
                "$",
                ".",
                ","
            ],
            "300A": [
                "$",
                ",",
                "."
            ],
            "280A": [
                "S/",
                ",",
                "."
            ],
            "200A": [
                "Bs.",
                ".",
                ","
            ],
            "140A": [
                "₡",
                ",",
                "."
            ],
            "100A": [
                "Q",
                ",",
                "."
            ],
            "1C0A": [
                "RD$",
                ",",
                "."
            ],
            "3C0A": [
                "$",
                ",",
                "."
            ],
            "440A": [
                "C$",
                ",",
                "."
            ],
            "4C0A": [
                "B/.",
                ",",
                "."
            ],
            "480A": [
                "L",
                ",",
                "."
            ],
            "0816": [
                "€",
                ".",
                ","
            ],
            "0416": [
                "R$",
                ".",
                ","
            ],
            "0406": [
                "kr",
                ".",
                ","
            ],
            "041D": [
                "kr",
                " ",
                ","
            ],
            "0414": [
                "kr",
                " ",
                ","
            ],
            "040B": [
                "€",
                " ",
                ","
            ],
            "040F": [
                "kr",
                ".",
                ","
            ],
            "0415": [
                "zł",
                " ",
                ","
            ],
            "0405": [
                "Kč",
                " ",
                ","
            ],
            "041B": [
                "€",
                " ",
                ","
            ],
            "040E": [
                "Ft",
                " ",
                ","
            ],
            "0424": [
                "€",
                ".",
                ","
            ],
            "041A": [
                "€",
                ".",
                ","
            ],
            "0418": [
                "lei",
                ".",
                ","
            ],
            "0402": [
                "лв.",
                " ",
                ","
            ],
            "0425": [
                "€",
                " ",
                ","
            ],
            "0426": [
                "€",
                " ",
                ","
            ],
            "0427": [
                "€",
                " ",
                ","
            ],
            "0408": [
                "€",
                ".",
                ","
            ],
            "043A": [
                "€",
                ",",
                "."
            ],
            "043C": [
                "€",
                ",",
                "."
            ],
            "0419": [
                "₽",
                " ",
                ","
            ],
            "0422": [
                "₴",
                " ",
                ","
            ],
            "0423": [
                "Br",
                " ",
                ","
            ],
            "041F": [
                "₺",
                ".",
                ","
            ],
            "042C": [
                "₼",
                " ",
                ","
            ],
            "042F": [
                "ден",
                ".",
                ","
            ],
            "0441": [
                "Lek",
                ".",
                ","
            ],
            "141A": [
                "KM",
                ".",
                ","
            ],
            "0401": [
                "ر.س",
                ",",
                "."
            ],
            "0C01": [
                "ج.م",
                ",",
                "."
            ],
            "1401": [
                "دج",
                " ",
                ","
            ],
            "1801": [
                "د.م.",
                " ",
                ","
            ],
            "1C01": [
                "د.ت",
                " ",
                ","
            ],
            "2001": [
                "﷼",
                ",",
                "."
            ],
            "3401": [
                "KD",
                ",",
                "."
            ],
            "3801": [
                "د.إ",
                ",",
                "."
            ],
            "3C01": [
                "BD",
                ",",
                "."
            ],
            "4001": [
                "ر.ق",
                ",",
                "."
            ],
            "2801": [
                "£",
                ",",
                "."
            ],
            "2C01": [
                "د.ا",
                ",",
                "."
            ],
            "3001": [
                "ل.ل",
                ",",
                "."
            ],
            "2401": [
                "﷼",
                ",",
                "."
            ],
            "1001": [
                "ل.د",
                ",",
                "."
            ],
            "0429": [
                "﷼",
                ",",
                "."
            ],
            "040D": [
                "₪",
                ",",
                "."
            ],
            "0439": [
                "₹",
                ",",
                "."
            ],
            "0445": [
                "৳",
                ",",
                "."
            ],
            "0461": [
                "रु",
                ",",
                "."
            ],
            "045B": [
                "Rs",
                ",",
                "."
            ],
            "044E": [
                "₹",
                ",",
                "."
            ],
            "0444": [
                "₹",
                ",",
                "."
            ],
            "0449": [
                "₹",
                ",",
                "."
            ],
            "044B": [
                "₹",
                ",",
                "."
            ],
            "0421": [
                "Rp",
                ".",
                ","
            ],
            "043E": [
                "RM",
                ",",
                "."
            ],
            "0464": [
                "₱",
                ",",
                "."
            ],
            "041E": [
                "฿",
                ",",
                "."
            ],
            "042A": [
                "₫",
                ".",
                ","
            ],
            "0453": [
                "៛",
                ",",
                "."
            ],
            "0454": [
                "₭",
                ",",
                "."
            ],
            "0455": [
                "K",
                ",",
                "."
            ],
            "0404": [
                "NT$",
                ",",
                "."
            ],
            "0C04": [
                "HK$",
                ",",
                "."
            ],
            "0804": [
                "¥",
                ",",
                "."
            ],
            "0411": [
                "¥",
                ",",
                "."
            ],
            "0412": [
                "₩",
                ",",
                "."
            ],
            "0437": [
                "₾",
                " ",
                ","
            ],
            "042B": [
                "֏",
                " ",
                ","
            ],
            "043F": [
                "₸",
                " ",
                ","
            ],
            "0443": [
                "so'm",
                " ",
                ","
            ],
            "0428": [
                "ЅМ",
                " ",
                ","
            ],
            "0440": [
                "сом",
                " ",
                ","
            ],
            "0466": [
                "₦",
                ",",
                "."
            ],
            "0469": [
                "₦",
                ",",
                "."
            ],
            "0468": [
                "GH₵",
                ",",
                "."
            ],
            "180C": [
                "F CFA",
                " ",
                ","
            ]
        }

        /**
         * Detect decimal and thousand separators in a mask pattern
         */
        const detectMaskSeparators = function(mask) {
            // Decimal: separator in pattern 0[sep]0+ (can have trailing chars like _ )
            // Look for the rightmost occurrence of this pattern
            const decimalMatches = mask.match(/0([.,\s'])0+/g);
            let decimal = null;
            if (decimalMatches && decimalMatches.length > 0) {
                // Get the last match (rightmost decimal pattern)
                const lastMatch = decimalMatches[decimalMatches.length - 1];
                const sepMatch = lastMatch.match(/0([.,\s'])0/);
                decimal = sepMatch ? sepMatch[1] : null;
            }

            // Thousand: other separator that appears in #[sep]# or 0[sep]# patterns
            let thousand = null;
            for (const sep of [',', '.', ' ', "'"]) {
                if (sep !== decimal) {
                    const escapedSep = sep === '.' ? '\\.' : sep;
                    const regex = new RegExp('[#0]' + escapedSep + '[#0]');
                    if (regex.test(mask)) {
                        thousand = sep;
                        break;
                    }
                }
            }

            return { decimal, thousand };
        }

        /**
         * Transform Excel currency locale patterns like [$$-409]#,##0.00
         * countryCodes format: { "0409": ["$", ",", "."] } // [currency, thousand, decimal]
         * [$$ = use locale's default currency, [$X = use literal X]
         */
        const transformExcelLocaleMask = function(mask) {
            // Handle multiple patterns (e.g., positive;negative)
            // Accept any alphanumeric for locale code to handle invalid codes gracefully
            const pattern = /\[\$(.?)-([0-9A-Z]+)\]/gi;
            let transformation = null;

            // Find first pattern to determine locale
            const firstMatch = mask.match(/\[\$(.?)-([0-9A-Z]+)\]/i);
            if (!firstMatch) return mask;

            const symbolChar = firstMatch[1] || '';
            let localeCode = firstMatch[2].toUpperCase();

            // Pad with leading zero if 3 digits (e.g., "409" → "0409")
            if (localeCode.length === 3) {
                localeCode = '0' + localeCode;
            }

            // Look up locale in countryCodes
            const localeData = countryCodes[localeCode];

            if (!localeData) {
                // Unknown locale - fallback: strip ALL patterns, use literal symbol (or $)
                const fallbackSymbol = symbolChar || '$';
                // Replace all occurrences of the pattern with the symbol
                return mask.replace(/\[\$(.?)-([0-9A-Z]+)\]/gi, fallbackSymbol);
            }

            // Extract from array: [currency, thousand, decimal]
            const localeCurrency = localeData[0];
            const localeThousand = localeData[1];
            const localeDecimal = localeData[2];

            // Determine currency symbol: $$ means use locale's default, else use literal
            let currencySymbol;
            if (symbolChar === '$') {
                // $$ pattern - use locale's default currency
                currencySymbol = localeCurrency;
            } else {
                // Literal symbol provided (e.g., [$€-407])
                currencySymbol = symbolChar;
            }

            // Replace all locale patterns with currency symbol
            let result = mask.replace(pattern, currencySymbol);

            // Detect current separators in mask (after removing patterns)
            const current = detectMaskSeparators(result);

            // Transform separators to match locale using placeholders to avoid conflicts
            const temp1 = '\uFFF0';  // Placeholder for thousand
            const temp2 = '\uFFF1';  // Placeholder for decimal

            // Step 1: Replace current separators with placeholders
            if (current.thousand && current.thousand !== localeThousand) {
                const from = current.thousand === '.' ? '\\.' : (current.thousand === ' ' ? ' ' : current.thousand);
                result = result.replace(new RegExp(from, 'g'), temp1);
            }
            if (current.decimal && current.decimal !== localeDecimal) {
                const from = current.decimal === '.' ? '\\.' : (current.decimal === ' ' ? ' ' : current.decimal);
                result = result.replace(new RegExp(from, 'g'), temp2);
            }

            // Step 2: Replace placeholders with target separators
            result = result.replace(new RegExp(temp1, 'g'), localeThousand);
            result = result.replace(new RegExp(temp2, 'g'), localeDecimal);

            return result;
        }

        // All expressions
        const allExpressions = [].concat(tokens.escape, tokens.fraction, tokens.currency, tokens.datetime, tokens.percentage, tokens.scientific, tokens.numeric, tokens.text, tokens.general).join('|');

        // Pre-compile all regexes once at initialization for better performance
        const compiledTokens = {};
        const tokenPriority = ['escape', 'fraction', 'currency', 'scientific', 'percentage', 'numeric', 'datetime', 'text', 'general'];

        // Cache for getMethod results
        const methodCache = {};
        // Cache for getTokens results
        const tokensCache = {};
        // Cache for autoCasting results
        const autoCastingCache = {};

        // Initialize compiled regexes
        for (const type of tokenPriority) {
            compiledTokens[type] = tokens[type].map(pattern => ({
                regex: new RegExp('^' + pattern + '$', 'i'),
                method: pattern
            }));
        }

        // Pre-compile regex for getTokens function
        const allExpressionsRegex = new RegExp(allExpressions, 'gi');
        const hiddenCaret = "\u200B";
        // Locale for date parsing
        const userLocale = (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

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
         * Clean mask - extremely fast implementation using only char operations
         * Removes quotes, detects parenthesis for negative numbers, and removes brackets (except time format codes)
         * Sets control.parenthesisForNegativeNumbers and returns cleaned mask
         */
        const cleanMask = function(mask, control) {
            const len = mask.length;
            let result = '';

            for (let i = 0; i < len; i++) {
                const char = mask[i];

                // Remove quotes
                if (char === '"') {
                    continue;
                }

                // Handle brackets - remove them unless they're time format codes
                if (char === '[') {
                    // Check if it's a time format code: [s], [ss], [h], [hh], [m], [mm]
                    let isTimeFormat = false;
                    if (i + 2 < len && mask[i + 2] === ']') {
                        const c = mask[i + 1];
                        if (c === 's' || c === 'h' || c === 'm') {
                            isTimeFormat = true;
                        }
                    } else if (i + 3 < len && mask[i + 3] === ']') {
                        const c1 = mask[i + 1];
                        const c2 = mask[i + 2];
                        if ((c1 === 's' && c2 === 's') || (c1 === 'h' && c2 === 'h') || (c1 === 'm' && c2 === 'm')) {
                            isTimeFormat = true;
                        }
                    }

                    if (isTimeFormat) {
                        result += char;
                    } else {
                        // Skip content and closing bracket
                        while (i < len && mask[i] !== ']') {
                            i++;
                        }
                        continue;
                    }
                }
                // Check for parenthesis (not preceded by underscore and no underscore inside)
                else if (char === '(') {
                    if (i === 0 || mask[i - 1] !== '_') {
                        let hasUnderscore = false;
                        let depth = 1;
                        for (let j = i + 1; j < len && depth > 0; j++) {
                            if (mask[j] === '(') depth++;
                            if (mask[j] === ')') depth--;
                            if (mask[j] === '_') {
                                hasUnderscore = true;
                                break;
                            }
                        }
                        if (! hasUnderscore) {
                            control.parenthesisForNegativeNumbers = true;
                        }
                    }
                    result += char;
                } else {
                    result += char;
                }
            }

            return result;
        }

        /**
         * Receives a string from a method type and returns if it's a numeric method
         */
        const isNumeric = function(t) {
            return t === 'currency' || t === 'percentage' || t === 'numeric' || t === 'scientific';
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

                let number = parseInt(v);

                if (number >= 0 && number <= 10) {
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
                for (var i = 0; i < Helpers.months.length; i++) {
                    if (Helpers.months[i][0].toLowerCase().indexOf(value) === 0) {
                        this.values[this.index] = Helpers.months[i][0];
                        this.date[1] = i + 1;
                        this.index++;
                        break;
                    }
                }
            },
            'MMMM': function(v) {
                let ret = parseMethods.FIND.call(this, v, Helpers.months);
                if (typeof(ret) !== 'undefined') {
                    this.date[1] = ret + 1;
                }
            },
            'MMM': function(v) {
                let ret = parseMethods.FIND.call(this, v, Helpers.monthsShort);
                if (typeof(ret) !== 'undefined') {
                    this.date[1] = ret + 1;
                }
            },
            'MM': function(v, single) {
                const commit = () => {
                    this.date[1] = this.values[this.index];
                    this.index++;
                }

                let number = parseInt(v);

                if (isBlank(this.values[this.index])) {
                    if (number > 1 && number < 10) {
                        if (! single) {
                            v = '0' + v;
                        }
                        this.values[this.index] = v;
                        commit();
                    } else if (number < 2) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] == 1 && number < 3) {
                        this.values[this.index] += v;
                        commit();
                    } else if (this.values[this.index] == 0 && number > 0 && number < 10) {
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
                return parseMethods.FIND.call(this, v, Helpers.weekdays);
            },
            'DDD': function(v) {
                return parseMethods.FIND.call(this, v, Helpers.weekdaysShort);
            },
            'DD': function(v, single) {
                const commit = () => {
                    this.date[2] = this.values[this.index];
                    this.index++;
                }

                let number = parseInt(v);

                if (isBlank(this.values[this.index])) {
                    if (number > 3 && number < 10) {
                        if (! single) {
                            v = '0' + v;
                        }
                        this.values[this.index] = v;
                        commit();
                    } else if (number < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] == 3 && number < 2) {
                        this.values[this.index] += v;
                        commit();
                    } else if ((this.values[this.index] == 1 || this.values[this.index] == 2) && number < 10) {
                        this.values[this.index] += v;
                        commit();
                    } else if (this.values[this.index] == 0 && number > 0 && number < 10) {
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

                let number = parseInt(v);

                if (isBlank(this.values[this.index])) {
                    if (number > 1 && number < 10) {
                        if (two) {
                            v = 0 + v;
                        }
                        this.date[3] = this.values[this.index] = v;
                        this.index++;
                    } else if (number < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] == 1 && number < 3) {
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] < 1 && number < 10) {
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
            'HH24': function(v, two = true) {
                let test = false;

                let number = parseInt(v)

                if (number >= 0 && number < 10) {
                    if (isBlank(this.values[this.index])) {
                        if (number > 2 && number < 10) {
                            if (two !== false) {
                                v = 0 + v;
                            }
                            this.date[3] = this.values[this.index] = v;
                            this.index++;
                        } else if (number < 10) {
                            this.values[this.index] = v;
                        }
                    } else {
                        if (this.values[this.index] == 2 && number < 4) {
                            if (two === false && this.values[this.index] === '0') {
                                this.values[this.index] = '';
                            }
                            this.date[3] = this.values[this.index] += v;
                            this.index++;
                        } else if (this.values[this.index] < 2 && number < 10) {
                            if (two === false && this.values[this.index] === '0') {
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
                        // Pad single digit with leading zero for HH24 format
                        if (two !== false && this.values[this.index] && this.values[this.index].length === 1) {
                            this.values[this.index] = '0' + this.values[this.index];
                        }
                        this.date[3] = this.values[this.index];
                        this.index++;
                        return false;
                    }
                }
            },
            'HH': function(v) {
                parseMethods['HH24'].call(this, v, true);
            },
            'H': function(v) {
                parseMethods['HH24'].call(this, v, false);
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

                let number = parseInt(v);

                if (number >= 0 && number < 10) {
                    if (isBlank(this.values[this.index])) {
                        if (number > 5 && number < 10) {
                            if (two) {
                                v = '0' + v;
                            }
                            this.date[i] = this.values[this.index] = v;
                            this.index++;
                        } else if (number < 10) {
                            this.values[this.index] = v;
                        }
                    } else {
                        if (this.values[this.index] < 6 && number < 10) {
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

                let number = parseInt(v);

                if (number >= 0 && number < 7) {
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
            '[a-zA-Z\\$]+': function(v) {
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
                return parseMethods['[a-zA-Z\\$]+'].call(this, v);
            },
            'a': function(v) {
                return parseMethods['[a-zA-Z\\$]+'].call(this, v);
            },
            '.': function(v) {
                return parseMethods['[a-zA-Z\\$]+'].call(this, v);
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
            '_[.\\s\\S]': function() {
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
            // Check cache first - direct access, undefined check is fast
            let result = tokensCache[str];
            if (result !== undefined) {
                return result;
            }

            allExpressionsRegex.lastIndex = 0; // Reset for global regex
            result = str.match(allExpressionsRegex);
            tokensCache[str] = result;
            return result;
        }

        /**
         * Get the method of one given token
         */
        const getMethod = function(str, temporary) {
            str = str.toString().toUpperCase();

            // Check cache first - direct access, undefined check is fast
            let cached = methodCache[str];
            if (cached !== undefined) {
                return cached;
            }

            // Check for datetime mask
            const datetime = temporary.every(t => t.type === 'datetime' || t.type === 'general' || t.type === 'escape');

            // Use priority order for faster matching with pre-compiled regexes
            for (const type of tokenPriority) {
                if (!datetime && type === 'datetime') continue;

                for (const compiled of compiledTokens[type]) {
                    if (compiled.regex.test(str)) {
                        const result = { type: type, method: compiled.method };
                        methodCache[str] = result;
                        return result;
                    }
                }
            }
            methodCache[str] = null;
            return null;
        }

        const fixMinuteToken = function(t) {
            const len = t.length;
            for (let i = 0; i < len; i++) {
                const token = t[i];
                if (token === 'M' || token === 'MM') {
                    // Check if this M is a minute (near H or S) rather than month
                    let isMinute = false;

                    // Check previous 2 tokens for H (hour indicator)
                    if (i > 0) {
                        const prev1 = t[i - 1];
                        // Use includes for fast check - covers H, HH, HH24, HH12, [H], etc
                        if (prev1 && prev1.includes('H')) {
                            isMinute = true;
                        } else if (i > 1) {
                            const prev2 = t[i - 2];
                            if (prev2 && prev2.includes('H')) {
                                isMinute = true;
                            }
                        }
                    }

                    // Check next 2 tokens for S (seconds indicator) if not already determined
                    if (!isMinute && i < len - 1) {
                        const next1 = t[i + 1];
                        // Use includes for fast check - covers S, SS, MS, etc
                        if (next1 && next1.includes('S')) {
                            isMinute = true;
                        } else if (i < len - 2) {
                            const next2 = t[i + 2];
                            if (next2 && next2.includes('S')) {
                                isMinute = true;
                            }
                        }
                    }

                    if (isMinute) {
                        t[i] = token === 'M' ? 'I' : 'MI';
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

            let m = parseMethods[methodName];
            if (typeof(m) === 'function') {
                return m;
            }

            return false;
        }

        const processPaddingZeros = function(token, value, decimal) {
            if (! value) {
                return value;
            }
            let m = token.split(decimal);
            let desiredNumOfPaddingZeros = m[0].match(/[0]+/g);
            if (desiredNumOfPaddingZeros && desiredNumOfPaddingZeros[0]) {
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
                if (method) {
                    if (method.type === 'numeric' || method.type === 'percentage' || method.type === 'scientific') {
                        let ret = processPaddingZeros(control.tokens[k], control.values[k], control.decimal);
                        if (ret) {
                            control.values[k] = ret;
                        }
                    }

                    if (isNumeric(control.type) && control.parenthesisForNegativeNumbers === true) {
                        if (isNumeric(method.type)) {
                            if (control.values[k] && control.values[k].toString().includes('-')) {
                                control.values[k] = control.values[k].replace('-', '');

                                negativeSignal = true;
                            }
                        }
                    }
                }
            });


            if (isNumeric(control.type) && control.parenthesisForNegativeNumbers === true && negativeSignal) {
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
            if (isNumeric(control.type)) {
                if (value.indexOf('--') !== false) {
                    value = value.replace('--', '-');
                }
                if (Number(control.raw) < 0 && value.includes('-')) {
                    value = '-' + value.replace('-', '');
                }
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
                if (m) {
                    let t = m.type;
                    if (t !== 'general' && t !== 'escape' && t !== type) {
                        if (type === 'general') {
                            type = t;
                        } else {
                            type = 'general';
                            break;
                        }
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
            let mask = control.mask;
            if (mask) {
                if (mask.indexOf(';') !== -1) {
                    let d = mask.split(';');

                    // Mask
                    mask = d[0];

                    if (typeof (value) === 'number' || isNumber(value)) {
                        if (Number(value) < 0 && d[1]) {
                            mask = d[1];
                        } else if (Number(value) === 0 && d[2]) {
                            mask = d[2];
                        } else {
                            mask = d[0];
                        }
                    } else {
                        if (typeof(d[3]) !== 'undefined') {
                            mask = d[3];
                        }
                    }
                }

                // Transform Excel locale patterns (e.g., [$$-409]#,##0.00) - only if pattern exists
                if (mask.indexOf('[$') !== -1) {
                    mask = transformExcelLocaleMask(mask);
                }

                // Cleaning the mask
                mask = cleanMask(mask, control);
                // Get only the first mask for now and remove
                control.mask = mask;
                // Get tokens which are the methods for parsing
                let tokens = control.tokens = getTokens(mask);
                // Get methods from the tokens
                control.methods = getMethodsFromTokens(tokens);
                // Type
                control.type = getType(control);
            }

            // Decimal only for numbers
            if (isNumeric(control.type) || control.locale) {
                control.decimal = getDecimal.call(control);
            }

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

        const format = function(str, config) {
            // Extract numeric value from formatted or unformatted string (e.g., "₹3.00" -> 3)
            // Using same logic as ParseValue to handle already-formatted strings
            let numericValue;
            const decimal = config.decimal || '.';
            let v = String(str).split(decimal);

            // Detect negative sign
            let signal = v[0].includes('-');

            // Extract digits only
            v[0] = v[0].match(/[0-9]+/g);
            if (v[0]) {
                if (signal) v[0].unshift('-');
                v[0] = v[0].join('');
            } else {
                v[0] = signal ? '-0' : '0';
            }

            if (v[1] !== undefined) {
                v[1] = v[1].match(/[0-9]+/g);
                v[1] = v[1] ? v[1].join('') : '';
            }

            // Convert to number
            numericValue = v[0] || v[1] ? parseFloat(v.join('.')) : 0;

            let ret = new Intl.NumberFormat(config.locale, config.options || {}).format(numericValue);

            config.values.push(ret);
        }

        const Component = function(str, config, returnObject) {
            // Get configuration
            const control = getConfig(config, str);

            if (control.locale) {
                format(str, control);
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
                    return { mask, value: decimalValue, type: 'fraction', category: 'fraction' };
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
                    return { mask: mask, value: decimalValue, type: 'percent', category: 'numeric' };
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
                        if (userLocale.startsWith('en-US')) {
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
                if (userLocale.startsWith('en-US')) {
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
                                    type: 'date',
                                    category: 'datetime'
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

        const autoCastingCurrency = function (input, filterDecimal) {
            if (typeof input !== 'string') return null;

            const str = input.trim();
            if (!str) return null;

            const len = str.length;
            let isNegative = false;
            let hasParens = false;
            let symbol = '';
            let numericPart = '';
            let letterBuffer = '';
            let firstCommaPos = -1;
            let lastCommaPos = -1;
            let firstDotPos = -1;
            let lastDotPos = -1;
            let commaCount = 0;
            let dotCount = 0;
            let hasInvalidChars = false;
            let hasCurrencySymbol = false;

            // Single pass through the string
            for (let i = 0; i < len; i++) {
                const char = str[i];

                // Check for negative signs and parentheses
                if (char === '-' && !numericPart) {
                    isNegative = true;
                    continue;
                }
                if (char === '(') {
                    hasParens = true;
                    isNegative = true;
                    continue;
                }
                if (char === ')') continue;

                // Skip whitespace
                if (char === ' ' || char === '\t') {
                    if (letterBuffer) {
                        letterBuffer += char;
                    }
                    continue;
                }

                // Currency symbols
                if (char === '$' || char === '€' || char === '£' || char === '¥' ||
                    char === '₹' || char === '₽' || char === '₩' || char === '₫' || char === '¢') {
                    hasCurrencySymbol = true;
                    // Validate letter buffer: max 2 letters before symbol
                    const trimmedBuffer = letterBuffer.trim();
                    if (trimmedBuffer.length > 2) {
                        return null;
                    }
                    if (letterBuffer) {
                        symbol = letterBuffer + char;
                        letterBuffer = '';
                    } else {
                        symbol = char;
                    }
                    // Check if next char is a space to include it in symbol
                    if (i + 1 < len && (str[i + 1] === ' ' || str[i + 1] === '\t')) {
                        symbol += ' ';
                        i++; // Skip the space
                    }
                    continue;
                }

                // Letters (only valid BEFORE currency symbol, max 2 letters)
                if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
                    // Letters after symbol or numeric part are invalid
                    if (hasCurrencySymbol || numericPart) {
                        return null;
                    }
                    letterBuffer += char;
                    continue;
                }

                // Digits
                if (char >= '0' && char <= '9') {
                    // Reject if we have letters but no currency symbol
                    if (letterBuffer && !hasCurrencySymbol) {
                        return null;
                    }
                    letterBuffer = '';
                    numericPart += char;
                    continue;
                }

                // Comma and dot separators
                if (char === ',') {
                    if (firstCommaPos === -1) firstCommaPos = numericPart.length;
                    lastCommaPos = numericPart.length;
                    commaCount++;
                    numericPart += char;
                    continue;
                }
                if (char === '.') {
                    if (firstDotPos === -1) firstDotPos = numericPart.length;
                    lastDotPos = numericPart.length;
                    dotCount++;
                    numericPart += char;
                    continue;
                }

                // Invalid character
                hasInvalidChars = true;
            }

            // Reject if no currency symbol was found
            if (!hasCurrencySymbol) {
                return null;
            }

            // Reject if there are any invalid characters
            if (hasInvalidChars) {
                return null;
            }

            // If no numeric part, reject
            if (!numericPart) return null;

            // Ensure numeric part contains at least one digit (not just separators)
            if (!/\d/.test(numericPart)) return null;

            // Infer decimal and group separators
            let decimal = '.';
            let group = ',';

            // If filterDecimal is provided, use it to determine separators
            if (filterDecimal) {
                decimal = filterDecimal;
                group = filterDecimal === ',' ? '.' : ',';

                // Validate that the input matches this interpretation
                if (commaCount > 0 && dotCount > 0) {
                    // Both present: check if filterDecimal matches the last one (which should be decimal)
                    const lastIsComma = lastCommaPos > lastDotPos;
                    if ((filterDecimal === ',' && !lastIsComma) || (filterDecimal === '.' && lastIsComma)) {
                        return null;
                    }
                } else if (dotCount === 1 && commaCount === 0) {
                    // Only one dot: if NOT followed by exactly 3 digits, it's a decimal separator
                    const afterDot = numericPart.substring(lastDotPos + 1);
                    if (afterDot.length !== 3) {
                        // It's a decimal separator, must match filterDecimal
                        if (filterDecimal !== '.') {
                            return null;
                        }
                    }
                } else if (commaCount === 1 && dotCount === 0) {
                    // Only one comma: if NOT followed by exactly 3 digits, it's a decimal separator
                    const afterComma = numericPart.substring(lastCommaPos + 1);
                    if (afterComma.length !== 3) {
                        // It's a decimal separator, must match filterDecimal
                        if (filterDecimal !== ',') {
                            return null;
                        }
                    }
                }
            } else {
                // Infer from the input pattern
                if (commaCount > 0 && dotCount > 0) {
                    // Both present: the one that appears last is decimal
                    if (lastCommaPos > lastDotPos) {
                        decimal = ',';
                        group = '.';
                    }
                } else if (dotCount === 1 && commaCount === 0) {
                    // Only one dot: check if it's followed by exactly 3 digits
                    const afterDot = numericPart.substring(lastDotPos + 1);
                    if (afterDot.length === 3) {
                        // Likely a thousands separator
                        decimal = ',';
                        group = '.';
                    }
                } else if (commaCount === 1 && dotCount === 0) {
                    // Only one comma: check if it's followed by exactly 3 digits
                    const afterComma = numericPart.substring(lastCommaPos + 1);
                    if (afterComma.length !== 3) {
                        // Likely a decimal separator
                        decimal = ',';
                        group = '.';
                    }
                }
            }

            // Normalize: remove group separator, convert decimal to '.'
            let normalized = '';
            for (let i = 0; i < numericPart.length; i++) {
                const char = numericPart[i];
                if (char === group) continue;
                if (char === decimal) {
                    normalized += '.';
                } else {
                    normalized += char;
                }
            }

            const parsed = parseFloat(normalized);
            if (isNaN(parsed)) return null;

            const finalValue = isNegative ? -parsed : parsed;

            // Build mask
            const dotPos = normalized.indexOf('.');
            const decimalPlaces = dotPos !== -1 ? normalized.length - dotPos - 1 : 0;
            const maskDecimal = decimalPlaces ? decimal + '0'.repeat(decimalPlaces) : '';
            const groupMask = '#' + group + '##0';
            const needsSpace = symbol && !symbol.endsWith(' ') && !symbol.endsWith('\t') && !hasParens;
            let mask = symbol + (needsSpace ? ' ' : '') + groupMask + maskDecimal;

            if (hasParens) {
                mask = `(${mask})`;
            }

            return {
                mask,
                value: finalValue,
                type: 'currency',
                category: 'numeric'
            };
        }

        const autoCastingNumber = function (input, filterDecimal) {
            // If you currently support numeric inputs directly, keep this:
            if (typeof input === 'number' && Number.isFinite(input)) {
                return { mask: '0', value: input, type: 'number', category: 'numeric' };
            }

            if (typeof input !== 'string') {
                return null;
            }

            const sRaw = input.trim();

            // Check for simple integers first (with optional sign)
            if (/^[+-]?\d+$/.test(sRaw)) {
                const sign = /^[+-]/.test(sRaw) ? sRaw[0] : '';
                const digitsClean = (sign ? sRaw.slice(1) : sRaw);
                const rawDigits = sign ? sRaw.slice(1) : sRaw;
                const m = rawDigits.match(/^0+/);
                const leadingZeros = m ? m[0].length : 0;
                const mask = leadingZeros > 0 ? '0'.repeat(rawDigits.length) : '0';
                const value = Number(sign + digitsClean);
                return { mask, value, type: 'number', category: 'numeric' };
            }

            // Check for formatted numbers with thousand separators (no letters, no symbols)
            // Examples: "1,000.25", "1.000,25", "-1,234.56"
            if (/^[+-]?[\d,.]+$/.test(sRaw)) {
                let isNegative = sRaw[0] === '-';
                let numStr = isNegative ? sRaw.slice(1) : sRaw;

                // Count separators
                const commaCount = (numStr.match(/,/g) || []).length;
                const dotCount = (numStr.match(/\./g) || []).length;

                // Must have at least one digit
                if (!/\d/.test(numStr)) return null;

                // Infer decimal and group separators
                let decimal = '.';
                let group = ',';

                const lastCommaPos = numStr.lastIndexOf(',');
                const lastDotPos = numStr.lastIndexOf('.');

                // If filterDecimal is provided, use it to determine separators
                if (filterDecimal) {
                    decimal = filterDecimal;
                    group = filterDecimal === ',' ? '.' : ',';

                    // Validate that the input matches this interpretation
                    if (commaCount > 0 && dotCount > 0) {
                        // Both present: check if filterDecimal matches the last one (which should be decimal)
                        const lastIsComma = lastCommaPos > lastDotPos;
                        if ((filterDecimal === ',' && !lastIsComma) || (filterDecimal === '.' && lastIsComma)) {
                            return null;
                        }
                    } else if (dotCount === 1 && commaCount === 0) {
                        // Only one dot: if NOT followed by exactly 3 digits, it's a decimal separator
                        const afterDot = numStr.substring(lastDotPos + 1);
                        if (afterDot.length !== 3 || /[,.]/.test(afterDot)) {
                            // It's a decimal separator, must match filterDecimal
                            if (filterDecimal !== '.') {
                                return null;
                            }
                        }
                    } else if (commaCount === 1 && dotCount === 0) {
                        // Only one comma: if NOT followed by exactly 3 digits, it's a decimal separator
                        const afterComma = numStr.substring(lastCommaPos + 1);
                        if (afterComma.length !== 3 || /[,.]/.test(afterComma)) {
                            // It's a decimal separator, must match filterDecimal
                            if (filterDecimal !== ',') {
                                return null;
                            }
                        }
                    }
                } else {
                    // Infer from the input pattern
                    if (commaCount > 0 && dotCount > 0) {
                        // Both present: the one that appears last is decimal
                        if (lastCommaPos > lastDotPos) {
                            decimal = ',';
                            group = '.';
                        }
                    } else if (dotCount === 1 && commaCount === 0) {
                        // Only one dot: check if it's followed by exactly 3 digits (thousands separator)
                        const afterDot = numStr.substring(lastDotPos + 1);
                        if (afterDot.length === 3 && !/[,.]/.test(afterDot)) {
                            decimal = ',';
                            group = '.';
                        }
                    } else if (commaCount === 1 && dotCount === 0) {
                        // Only one comma: check if it's NOT followed by exactly 3 digits (decimal separator)
                        const afterComma = numStr.substring(lastCommaPos + 1);
                        if (afterComma.length !== 3 || /[,.]/.test(afterComma)) {
                            decimal = ',';
                            group = '.';
                        }
                    }
                }

                // Check if group separator is actually used in the input
                const hasGroupSeparator = (group === ',' && commaCount > 1) || (group === '.' && dotCount > 1) ||
                    (group === ',' && decimal === '.' && commaCount > 0) ||
                    (group === '.' && decimal === ',' && dotCount > 0);

                // Normalize: remove group separator, convert decimal to '.'
                let normalized = numStr.replace(new RegExp('\\' + group, 'g'), '').replace(decimal, '.');
                const parsed = parseFloat(normalized);
                if (isNaN(parsed)) return null;

                const value = isNegative ? -parsed : parsed;

                // Build mask
                const dotPos = normalized.indexOf('.');
                const decimalPlaces = dotPos !== -1 ? normalized.length - dotPos - 1 : 0;
                const maskDecimal = decimalPlaces ? decimal + '0'.repeat(decimalPlaces) : '';
                const mask = (hasGroupSeparator ? '#' + group + '##0' : '0') + maskDecimal;

                return { mask, value, type: 'number', category: 'numeric' };
            }

            return null;
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
                value: parsed,
                type: 'scientific',
                category: 'scientific'
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
                return { mask: mask, value: excel, type: 'time', category: 'datetime' };
            }

            // Try alternate hour width if needed
            const altHour = hourToken === 'hh' ? 'h' : 'hh';
            const alt = mer
                ? `${altHour}${base.slice(hourToken.length)} am/pm`
                : `${altHour}${base.slice(hourToken.length)}`;

            if (testMask(alt, excel, original)) {
                return { mask: alt, value: excel, type: 'time', category: 'datetime' };
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
         * @param {string|number} value - The value to detect the mask for
         * @param {string} [decimal] - Optional decimal separator filter ('.' or ',')
         */
        Component.autoCasting = function(value, decimal) {
            // Check cache first - use string value and decimal as key
            const cacheKey = decimal ? String(value) + '|' + decimal : String(value);
            let cached = autoCastingCache[cacheKey];
            if (cached !== undefined) {
                return cached;
            }

            const methods = [
                autoCastingDates,        // Most structured, the least ambiguous
                autoCastingTime,
                autoCastingFractions,    // Specific pattern with slashes
                autoCastingPercent,      // Recognizable with "%"
                autoCastingScientific,
                (v) => autoCastingNumber(v, decimal),       // Only picks up basic digits, decimals, leading 0s
                (v) => autoCastingCurrency(v, decimal),     // Complex formats, but recognizable
            ];

            let result = null;
            for (let method of methods) {
                const test = method(value);
                if (test) {
                    result = test;
                    break;
                }
            }

            // Cache the result (even if null)
            autoCastingCache[cacheKey] = result;
            return result;
        }

        Component.extract = function(value, options, returnObject) {
            if (! value || typeof options !== 'object') {
                return value;
            }

            if (options.locale) {
                const config = getConfig(options, value);
                config.value = Extract(value, config);
                if (value.toString().indexOf('%') !== -1) {
                    config.value /= 100;
                }
                return returnObject ? config : config.value;
            } else if (options.mask) {
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
                    if (!s) {
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

                if (!o.type && type) {
                    o.type = type;
                }

                return returnObject ? o : result;
            }

            return value;
        };

        Component.render = function(value, options, fullMask) {
            // Nothing to render
            if (value === '' || value === undefined || value === null) {
                return '';
            }

            // Config
            const config = getConfig(options, value);

            if (config.locale) {
                value = Component(value, options);
            } else if (config.mask) {
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
                    if (typeof (value) === 'number') {
                        value = value.toString();
                    }
                } else {
                    if (config.type === 'percentage') {
                        if (typeof (value) === 'string' && value.indexOf('%') !== -1) {
                            value = value.replace('%', '');
                        } else {
                            value = adjustPrecision(Number(value) * 100);
                        }
                    } else {
                        if (config.mask.includes(',,M')) {
                            if (typeof (value) === 'string' && value.indexOf('M') !== -1) {
                                value = value.replace('M', '');
                            } else {
                                value = Number(value) / 1000000;
                            }
                        } else if (config.mask.includes(',,,B')) {
                            if (typeof (value) === 'string' && value.indexOf('B') !== -1) {
                                value = value.replace('B', '');
                            } else {
                                value = Number(value) / 1000000000;
                            }
                        }
                    }

                    if (typeof (value) === 'string' && isNumber(value)) {
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

                // If numeric mask but no numbers in input, return empty
                if (isNumeric(control.type)) {
                    // Check if any numeric digit was actually extracted
                    const hasNumericValue = control.values.some(v => v && /\d/.test(v));
                    if (! hasNumericValue) {
                        value = '';
                    }
                }

                if (options.input && options.input.tagName) {
                    if (options.input.contentEditable) {
                        options.input.textContent = value;
                    } else {
                        options.input.value = value;
                    }
                    focus(options.input);
                }
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

                    if (o.data[0] === null && o.data[1] === null && o.data[2] === null) {
                        // Do nothing
                    } else {
                        if (isNaN(calendar.getTime())) {
                            throw new Error('Invalid date');
                        }
                    }

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
                            v = this.data[0];
                            if (v) {
                                v = v.substring(1, 4);
                            }
                        } else if (s === 'YY') {
                            v = this.data[0];
                            if (v) {
                                v = v.substring(2, 4);
                            }
                        } else if (s === 'Y') {
                            v = this.data[0];
                            if (v) {
                                v = v.substring(3, 4);
                            }
                        } else if (t === 'MON') {
                            v = Helpers.months[calendar.getMonth()];
                            if (v) {
                                v = v.substr(0, 3).toUpperCase();
                            }
                        } else if (t === 'mon') {
                            v = Helpers.months[calendar.getMonth()];
                            if (v) {
                                v = v.substr(0, 3).toLowerCase();
                            }
                        } else if (t === 'MONTH') {
                            v = Helpers.months[calendar.getMonth()];
                            if (v) {
                                v = v.toUpperCase();
                            }
                        } else if (t === 'month') {
                            v = Helpers.months[calendar.getMonth()];
                            if (v) {
                                v = v.toLowerCase();
                            }
                        } else if (s === 'MMMMM') {
                            v = Helpers.months[calendar.getMonth()];
                            if (v) {
                                v = v.substr(0, 1);
                            }
                        } else if (s === 'MMMM' || t === 'Month') {
                            v = Helpers.months[calendar.getMonth()];
                        } else if (s === 'MMM' || t == 'Mon') {
                            v = Helpers.months[calendar.getMonth()];
                            if (v) {
                                v = v.substr(0, 3);
                            }
                        } else if (s === 'MM') {
                            v = Helpers.two(this.data[1]);
                        } else if (s === 'M') {
                            v = calendar.getMonth() + 1;
                        } else if (t === 'DAY') {
                            v = Helpers.weekdays[calendar.getDay()];
                            if (v) {
                                v = v.toUpperCase();
                            }
                        } else if (t === 'day') {
                            v = Helpers.weekdays[calendar.getDay()];
                            if (v) {
                                v = v.toLowerCase();
                            }
                        } else if (s === 'DDDD' || t == 'Day') {
                            v = Helpers.weekdays[calendar.getDay()];
                        } else if (s === 'DDD') {
                            v = Helpers.weekdays[calendar.getDay()];
                            if (v) {
                                v = v.substr(0, 3);
                            }
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
                mask = element.getAttribute('data-mask') || element.mask;
            }
            // Keep the current caret position
            let caret = getCaret(element);
            if (caret) {
                value = value.substring(0, caret) + hiddenCaret + value.substring(caret);
            }

            if (typeof mask === 'string') {
                mask = { mask: mask };
            }

            if (mask.locale) {
                return;
            }

            // Run mask
            let result = Component(value, mask, true);

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

        Component.getType = function(config) {
            // Get configuration
            const control = getConfig(config, null);

            return control.type;
        };

        Component.adjustPrecision = adjustPrecision;

        return Component;
    })();

    return { Mask: Mask, Helpers: Helpers };
})));

/***/ }),

/***/ 763:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (! lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

if (! Modal && "function" === 'function') {
    var Modal = __webpack_require__(72);
}

if (! utils && "function" === 'function') {
    var utils = __webpack_require__(791);
}

const Helpers = utils.Helpers;
const Mask = utils.Mask;

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    // Translations
    const T = function(t) {
        if (typeof(document) !== "undefined" && document.dictionary) {
            return document.dictionary[t] || t;
        } else {
            return t;
        }
    }

    const filterData = function(year, month) {
        // Data for the month
        let data = {};
        if (Array.isArray(this.data)) {
            this.data.map(function (v) {
                let d = year + '-' + Helpers.two(month + 1);
                if (v.date.substring(0, 7) === d) {
                    if (!data[v.date]) {
                        data[v.date] = [];
                    }
                    data[v.date].push(v);
                }
            });
        }
        return data;
    }

    // Get the short weekdays name
    const getWeekdays = function(firstDayOfWeek) {
        const reorderedWeekdays = [];
        for (let i = 0; i < 7; i++) {
            const dayIndex = (firstDayOfWeek + i) % 7;
            reorderedWeekdays.push(Helpers.weekdays[dayIndex]);
        }

        return reorderedWeekdays.map(w => {
            return { title: w.substring(0, 1) };
        });
    }

    const Views = function(self) {
        const view = {};

        // Create years container
        view.years = [];
        view.months = [];
        view.days = [];
        view.hours = [];
        view.minutes = [];

        for (let i = 0; i < 16; i++) {
            view.years.push({
                title: null,
                value: null,
                selected: false,
            });
        }

        for (let i = 0; i < 12; i++) {
            view.months.push({
                title: null,
                value: null,
                selected: false,
            });
        }

        for (let i = 0; i < 42; i++) {
            view.days.push({
                title: null,
                value: null,
                selected: false,
            });
        }

        for (let i = 0; i < 24; i++) {
            view.hours.push({
                title: Helpers.two(i),
                value: i
            });
        }

        for (let i = 0; i < 60; i++) {
            view.minutes.push({
                title: Helpers.two(i),
                value: i
            });
        }

        view.years.update = function(date) {
            let year = date.getUTCFullYear();
            let start = year - (year % 16);

            for (let i = 0; i < 16; i++) {
                let item = view.years[i];
                let value = start + i;

                item.title = value
                item.value = value;

                if (self.cursor.y === value) {
                    item.selected = true;
                    // Current item
                    self.cursor.current = item;
                } else {
                    item.selected = false;
                }
            }
        }

        view.months.update = function(date) {
            let year = date.getUTCFullYear();

            for (let i = 0; i < 12; i++) {
                let item = view.months[i];

                item.title = Helpers.months[i].substring(0,3);
                item.value = i;

                if (self.cursor.y === year && self.cursor.m === i) {
                    item.selected = true;
                    // Current item
                    self.cursor.current = item;
                } else {
                    item.selected = false;
                }
            }
        }

        view.days.update = function(date) {
            let year = date.getUTCFullYear();
            let month = date.getUTCMonth();
            let data = filterData.call(self, year, month);

            // First day
            let tmp = new Date(Date.UTC(year, month, 1, 0, 0, 0));
            let firstDayOfMonth = tmp.getUTCDay();
            let firstDayOfWeek = self.startingDay ?? 0;

            // Calculate offset based on desired first day of week. firstDayOfWeek: 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
            let offset = (firstDayOfMonth - firstDayOfWeek + 7) % 7;

            let index = -1 * offset;

            for (let i = 0; i < 42; i++) {
                index++;
                // Item
                let item = view.days[i];
                // Get the day
                tmp = new Date(Date.UTC(year, month, index, 0, 0, 0));
                // Day
                let day = tmp.getUTCDate();

                // Create the item
                item.title = day;
                item.value = index;
                item.number = Helpers.dateToNum(tmp.toISOString().substring(0, 10));

                // Reset range properties for each item
                item.start = false;
                item.end = false;
                item.range = false;
                item.last = false;
                item.disabled = false;
                item.data = null;

                // Check selections
                if (tmp.getUTCMonth() !== month) {
                    // Days are not in the current month
                    item.grey = true;
                } else {
                    // Check for data
                    let d = [ year, Helpers.two(month+1), Helpers.two(day) ].join('-');

                    if (data && data[d]) {
                        item.data = data[d];
                    }

                    item.grey = false;
                }
                // Month
                let m = tmp.getUTCMonth();

                // Select cursor
                if (self.cursor.y === year && self.cursor.m === m && self.cursor.d === day) {
                    item.selected = true;
                    // Current item
                    self.cursor.current = item;
                } else {
                    item.selected = false;
                }


                // Valid ranges
                if (self.validRange) {
                    if (typeof self.validRange === 'function') {
                        let ret = self.validRange(day,m,year,item);
                        if (typeof ret !== 'undefined') {
                            item.disabled = ret;
                        }
                    } else {
                        let current = year + '-' + Helpers.two(m+1) + '-' + Helpers.two(day);

                        let test1 = !self.validRange[0] || current >= self.validRange[0].substr(0, 10);
                        let test2 = !self.validRange[1] || current <= self.validRange[1].substr(0, 10);

                        if (! (test1 && test2)) {
                            item.disabled = true;
                        }
                    }
                }

                // Select range
                if (self.range && self.rangeValues) {
                    // Only mark start/end if the number matches
                    item.start = self.rangeValues[0] === item.number;
                    item.end = self.rangeValues[1] === item.number;
                    // Mark as part of range if between start and end
                    item.range = self.rangeValues[0] && self.rangeValues[1] && self.rangeValues[0] <= item.number && self.rangeValues[1] >= item.number;
                }
            }
        }

        return view;
    }

    const isTrue = function(v) {
        return v === true || v === 'true';
    }

    const isNumber = function (num) {
        if (typeof(num) === 'string') {
            num = num.trim();
        }
        return !isNaN(num) && num !== null && num !== '';
    }

    const Calendar = function(children, { onchange, onload, track }) {
        let self = this;

        // Event
        let change = self.onchange;
        self.onchange = null;

        // Weekdays
        self.weekdays = getWeekdays(self.startingDay ?? 0);

        // Cursor
        self.cursor = {};

        // Time
        self.time = !! self.time;

        // Range values
        self.rangeValues = null;

        // Calendar date
        let date = new Date();

        // Views
        const views = Views(self);
        const hours = views.hours;
        const minutes = views.minutes;

        // Initial view
        self.view = 'days';

        // Auto Input
        if (self.input === 'auto') {
            self.input = document.createElement('input');
            self.input.type = 'text';
        }


        // Get the position of the data based on the view
        const getPosition = function() {
            let position = 2;
            if (self.view === 'years') {
                position = 0;
            } else if (self.view === 'months') {
                position = 1;
            }
            return position;
        }

        const setView = function(e) {
            if (typeof e === 'object') {
                e = this.getAttribute('data-view');
            }

            // Valid views
            const validViews = ['days', 'months', 'years'];

            // Define new view
            if (validViews.includes(e) && self.view !== e) {
                self.view = e;
            }
        }

        const reloadView = function(reset) {
            if (reset) {
                // Update options to the view
                self.options = views[self.view];
            }
            // Update the values of hte options of hte view
            views[self.view]?.update.call(self, date);
        }

        const getValue = function() {
            let value = null;
            if (isTrue(self.range)) {
                if (Array.isArray(self.rangeValues)) {
                    if (isTrue(self.numeric)) {
                        value = self.rangeValues;
                    } else {
                        value = [
                            Helpers.numToDate(self.rangeValues[0]).substring(0, 10),
                            Helpers.numToDate(self.rangeValues[1]).substring(0, 10)
                        ];
                    }
                }
            } else {
                value = getDate();
                if (isTrue(self.numeric)) {
                    value = Helpers.dateToNum(value);
                }
            }
            return value;
        }

        const setValue = function(v) {
            let d = new Date();
            if (v) {
                if (isTrue(self.range)) {
                    if (v) {
                        if (! Array.isArray(v)) {
                            v = v.toString().split(',');
                        }
                        self.rangeValues = [...v];

                        if (v[0] && typeof (v[0]) === 'string' && v[0].indexOf('-')) {
                            self.rangeValues[0] = Helpers.dateToNum(v[0]);
                        }
                        if (v[1] && typeof (v[1]) === 'string' && v[1].indexOf('-')) {
                            self.rangeValues[1] = Helpers.dateToNum(v[1]);
                        }

                        v = v[0];
                    }
                } else if (typeof v === 'string' && v.includes(',')) {
                    v = v.split(',')[0];
                }

                if (v) {
                    v = isNumber(v) ? Helpers.numToDate(v) : v;
                    d = new Date(v + '  GMT+0');
                }

                // if no date is defined
                if (! Helpers.isValidDate(d)) {
                    d = new Date();
                }
            }

            // Update the internal calendar date
            setDate(d, true);
            // Update the view
            reloadView();
        }

        const getDate = function() {
            let v = [ self.cursor.y, self.cursor.m, self.cursor.d, self.hour, self.minute ];
            let d = new Date(Date.UTC(...v));
            // Update the headers of the calendar
            if (self.time) {
                return d.toISOString().substring(0, 19).replace('T', ' ');
            } else {
                return d.toISOString().substring(0, 10);
            }
        }

        const setDate = function(d, update) {
            if (Array.isArray(d)) {
                d = new Date(Date.UTC(...d));
            } else if (typeof(d) === 'string') {
                d = new Date(d);
            }

            // Update the date
            let value = d.toISOString().substring(0,10).split('-');
            let month = Helpers.months[parseInt(value[1])-1];
            let year = parseInt(value[0]);

            if (self.month !== month) {
                self.month = month;
            }
            if (self.year !== year) {
                self.year = year;
            }

            // Update the time
            let time = d.toISOString().substring(11,19).split(':');
            let hour = parseInt(time[0]);
            let minute = parseInt(time[1]);

            if (self.hour !== hour) {
                self.hour = hour;
            }
            if (self.minute !== minute) {
                self.minute = minute;
            }

            // Update internal date
            date = d;

            // Update cursor information
            if (update) {
                updateCursor();
            }
        }

        const updateCursor = function() {
            self.cursor.y = date.getUTCFullYear();
            self.cursor.m = date.getUTCMonth();
            self.cursor.d = date.getUTCDate();
        }

        const resetCursor = function() {
            // Remove selection from the current object
            let current = self.cursor.current;
            // Current item
            if (typeof current !== 'undefined') {
                current.selected = false;
            }
        }

        const setCursor = function(s) {
            // Reset current visual cursor
            resetCursor();
            // Update cursor based on the object position
            if (s) {
                // Update current
                self.cursor.current = s;
                // Update selected property
                s.selected = true;
            }

            updateCursor();

            // Update range
            if (isTrue(self.range)) {
                updateRange(s)
            }

            Dispatch.call(self, self.onupdate, 'update', {
                instance: self,
                value: date.toISOString(),
            });
        }

        const select = function(e, s) {
            // Get new date content
            let d = updateDate(s.value, getPosition());
            // New date
            setDate(new Date(Date.UTC(...d)))
            // Based where was the click
            if (self.view !== 'days') {
                // Back to the days
                self.view = 'days';
            } else if (! s.disabled) {
                setCursor(s);

                if (isTrue(self.range)) {
                    // Start a new range
                    if (self.rangeValues && (self.rangeValues[0] >= s.number || self.rangeValues[1])) {
                        destroyRange();
                    }
                    // Range
                    s.range = true;
                    // Update range
                    if (! self.rangeValues) {
                        s.start = true;
                        self.rangeValues = [s.number, null];
                    } else {
                        s.end = true;
                        self.rangeValues[1] = s.number;
                    }
                } else {
                    update();
                }
            }
        }

        // Update Calendar
        const update = function(e) {
            self.setValue(getValue());
            self.close({ origin: 'button' });
        }

        const reset = function() {
            self.setValue('');
            self.close({ origin: 'button' });
        }

        const updateDate = function(v, position) {
            // Current internal date
            let value = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), self.hour, self.minute, 0];
            // Update internal date
            value[position] = v;
            // Return new value
            return value;
        }

        const move = function(direction) {
            // Reset visual cursor
            resetCursor();

            // Value
            let value;

            // Update the new internal date
            if (self.view === 'days') {
                // Select the new internal date
                value = updateDate(date.getUTCMonth()+direction, 1);
            } else if (self.view === 'months') {
                // Select the new internal date
                value = updateDate(date.getUTCFullYear()+direction, 0);
            } else if (self.view === 'years') {
                // Select the new internal date
                value = updateDate(date.getUTCFullYear()+(direction*16), 0);
            }

            // Update view
            setDate(value);

            // Reload content of the view
            reloadView();
        }

        const getJump = function(e) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                return self.view === 'days' ? 7 : 4;
            }

            return 1;
        }

        const prev = function(e) {
            if (e && e.type === 'keydown') {
                // Current index
                let total = self.options.length;
                let position = self.options.indexOf(self.cursor.current) - getJump(e);
                if (position < 0) {
                    // Next month
                    move(-1);
                    // New position
                    position = total + position;
                }
                // Update cursor
                setCursor(self.options[position])
            } else {
                move(-1);
            }
        }

        const next = function(e) {
            if (e && e.type === 'keydown') {
                // Current index
                let total = self.options.length;
                let position = self.options.indexOf(self.cursor.current) + getJump(e);
                if (position >= total) {
                    // Next month
                    move(1);
                    // New position
                    position = position - total;
                }
                // Update cursor
                setCursor(self.options[position])
            } else {
                move(1);
            }
        }

        const getInput = function() {
            let input = self.input;
            if (input && input.current) {
                input = input.current;
            } else {
                if (self.input) {
                    input = self.input;
                }
            }

            return input;
        }

        const updateRange = function(s) {
            if (self.range && self.view === 'days' && self.rangeValues) {
                // Creating a range
                if (self.rangeValues[0] && ! self.rangeValues[1]) {
                    let number = s.number;
                    if (number) {
                        // Update range properties
                        for (let i = 0; i < self.options.length; i++) {
                            let v = self.options[i].number;
                            // Update property condition
                            self.options[i].range = v >= self.rangeValues[0] && v <= number;
                            self.options[i].last = (v === number);
                        }
                    }
                }
            }
        }

        const destroyRange = function() {
            if (self.range) {
                for (let i = 0; i < self.options.length; i++) {
                    if (self.options[i].range !== false) {
                        self.options[i].range = false;
                    }
                    if (self.options[i].start !== false) {
                        self.options[i].start = false;
                    }
                    if (self.options[i].end !== false) {
                        self.options[i].end = false;
                    }
                    if (self.options[i].last !== false) {
                        self.options[i].last = false;
                    }
                }
                self.rangeValues = null;
            }
        }

        const render = function(v) {
            if (v) {
                if (! Array.isArray(v)) {
                    v = v.toString().split(',');
                }

                v = v.map(entry => {
                    return Mask.render(entry, self.format || 'YYYY-MM-DD');
                }).join(',');
            }
            return v;
        }

        const normalize = function(v) {
            if (! Array.isArray(v)) {
                v = v.toString().split(',');
            }

            return v.map(item => {
                if (Number(item) == item) {
                    return Helpers.numToDate(item);
                } else {
                    if (Helpers.isValidDateFormat(item)) {
                        return item;
                    } else if (self.format) {
                        let tmp = Mask.extractDateFromString(item, self.format);
                        if (tmp) {
                            return tmp;
                        }
                    }
                }
            })
        }

        const extractValueFromInput = function() {
            let input = getInput();
            if (input) {
                let v;
                if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                    v = input.value;
                } else if (input.isContentEditable) {
                    v = input.textContent;
                }
                if (v) {
                    return normalize(v).join(',');
                }
                return v;
            }
        }

        const onopen = function() {
            let isEditable = false;
            let value = self.value;

            let input = getInput();
            if (input) {
                if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                    isEditable = !input.hasAttribute('readonly') && !input.hasAttribute('disabled');
                } else if (input.isContentEditable) {
                    isEditable = true;
                }

                let ret = extractValueFromInput();
                if (ret && ret !== value) {
                    value = ret;
                }
            }

            if (! isEditable) {
                self.content.focus();
            }

            // Update the internal date values
            setValue(value);

            // Open event
            Dispatch.call(self, self.onopen, 'open', {
                instance: self
            });
        }

        const onclose = function(modal, origin) {
            // Cancel range events
            destroyRange();
            // Close event
            Dispatch.call(self, self.onclose, 'close', {
                instance: self,
                origin: origin,
            });
        }

        const dispatchOnChangeEvent = function() {
            // Destroy range
            destroyRange();
            // Update the internal controllers
            setValue(self.value);
            // Events
            Dispatch.call(self, change, 'change', {
                instance: self,
                value: self.value,
            });
            // Update input
            let input = getInput();
            if (input) {
                // Update input value
                input.value = render(self.value);
                // Dispatch event
                Dispatch.call(input, null, 'change', {
                    instance: self,
                    value: self.value,
                });
            }
        }

        const events = {
            focusin: (e) => {
                if (self.modal && self.isClosed()) {
                    self.open();
                }
            },
            focusout: (e) => {
                if (self.modal && ! self.isClosed()) {
                    if (! (e.relatedTarget && self.modal.el.contains(e.relatedTarget))) {
                        self.modal.close({ origin: 'focusout' });
                    }
                }
            },
            click: (e) => {
                if (e.target.classList.contains('lm-calendar-input')) {
                    self.open();
                }
            },
            keydown: (e) => {
                if (self.modal) {
                    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                        if (! self.isClosed()) {
                            self.content.focus();
                        } else {
                            self.open();
                        }
                    } else if (e.code === 'Enter') {
                        if (! self.isClosed()) {
                            update();
                        } else {
                            self.open();
                        }
                    } else if (e.code === 'Escape') {
                        if (! self.isClosed()) {
                            self.modal.close({origin: 'escape'});
                        }
                    }
                }
            },
            input: (e) => {
                let input = e.target;
                if (input.classList.contains('lm-calendar-input')) {
                    if (! isTrue(self.range)) {
                        // TODO: process with range
                        // Apply mask
                        if (self.format) {
                            Mask.oninput(e, self.format);
                        }
                        let value = null;
                        // Content
                        let content = (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') ? input.value : input.textContent;
                        // Check if that is a valid date
                        if (Helpers.isValidDateFormat(content)) {
                            value = content;
                        } else if (self.format) {
                            let tmp = Mask.extractDateFromString(content, self.format);
                            if (tmp) {
                                value = tmp;
                            }
                        }
                        // Change the calendar view
                        if (value) {
                            setValue(value);
                        }
                    }
                }
            }
        }

        // Onload
        onload(() => {
            if (self.type !== "inline") {
                // Create modal instance
                self.modal = {
                    width: 300,
                    closed: true,
                    focus: false,
                    onopen: onopen,
                    onclose: onclose,
                    position: 'absolute',
                    'auto-close': false,
                    'auto-adjust': true,
                };
                // Generate modal
                Modal(self.el, self.modal);
            }

            let ret;

            // Create input controls
            if (self.input && self.initInput !== false) {
                if (! self.input.parentNode) {
                    self.el.parentNode.insertBefore(self.input, self.el);
                }

                let input = getInput();
                if (input && input.tagName) {
                    input.classList.add('lm-input');
                    input.classList.add('lm-calendar-input');
                    input.addEventListener('click', events.click);
                    input.addEventListener('input', events.input);
                    input.addEventListener('keydown', events.keydown);
                    input.addEventListener('focusin', events.focusin);
                    input.addEventListener('focusout', events.focusout);
                    if (self.placeholder) {
                        input.setAttribute('placeholder', self.placeholder);
                    }
                    if (self.onChange) {
                        input.addEventListener('change', self.onChange);
                    }

                    // Retrieve the value
                    if (self.value) {
                        input.value = render(self.value);
                    } else {
                        let value = extractValueFromInput();
                        if (value && value !== self.value) {
                            ret = value;
                        }
                    }
                }
            }

            // Update the internal date values
            if (ret) {
                self.setValue(ret);
            } else {
                setValue(self.value);
            }

            // Reload view
            reloadView(true);

            /**
             * Handler keyboard
             * @param {object} e - event
             */
            self.el.addEventListener('keydown', function(e) {
                let prevent = false;
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    if (e.target !== self.content) {
                        self.content.focus();
                    }
                    prev(e);
                    prevent = true;
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    if (e.target !== self.content) {
                        self.content.focus();
                    }
                    next(e);
                    prevent = true;
                } else if (e.key === 'Enter') {
                    if (e.target === self.content) {
                        // Item
                        if (self.cursor.current) {
                            // Select
                            select(e, self.cursor.current);
                            prevent = true;
                        }
                    }
                } else if (e.key === 'Escape') {
                    if (! self.isClosed()) {
                        self.close({ origin: 'escape' });
                        prevent = true;
                    }
                }

                if (prevent) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });

            /**
             * Mouse wheel handler
             * @param {object} e - mouse event
             */
            self.content.addEventListener('wheel', function(e){
                if (self.wheel !== false) {
                    if (e.deltaY < 0) {
                        prev(e);
                    } else {
                        next(e);
                    }
                    e.preventDefault();
                }
            }, { passive: false });

            /**
             * Range handler
             * @param {object} e - mouse event
             */
            self.content.addEventListener('mouseover', function(e){
                let parent = e.target.parentNode
                if (parent === self.content) {
                    let index = Array.prototype.indexOf.call(parent.children, e.target);
                    updateRange(self.options[index]);
                }
            });

            // Create event for focus out
            self.el.addEventListener("focusout", (e) => {
                let input = getInput();
                if (e.relatedTarget !== input && ! self.el.contains(e.relatedTarget)) {
                    self.close({ origin: 'focusout' });
                }
            });
        });

        onchange((prop) => {
            if (prop === 'view') {
                reloadView(true);
            } else if (prop === 'startingDay') {
                self.weekdays = getWeekdays(self.startingDay ?? 0);
            } else if (prop === 'value') {
                dispatchOnChangeEvent();
            }
        })

        // Tracking variables
        track('value');

        // Public methods

        self.open = function(e) {
            if (self.modal) {
                if (self.type === 'auto') {
                    self.type = window.innerWidth > 640 ? self.type = 'default' : 'picker';
                }
                self.modal.open();
            }
        }

        self.close = function(options) {
            if (self.modal) {
                if (options && options.origin) {
                    self.modal.close(options)
                } else {
                    self.modal.close({ origin: 'button' })
                }
            }
        }

        self.isClosed = function() {
            if (self.modal) {
                return self.modal.isClosed();
            }
        }

        self.getValue = function() {
            return self.value;
        }

        self.setValue = function(v) {
            // Update value
            if (v) {
                let ret = normalize(v);
                if (isTrue(self.numeric)) {
                    ret = ret.map(entry => {
                        return Helpers.dateToNum(entry);
                    })
                }

                if (! Array.isArray(v)) {
                    ret = ret.join(',');
                }

                if (ret == Number(ret)) {
                    ret = Number(ret);
                }

                v = ret;
            }

            // Events
            if (v !== self.value) {
                self.value = v;
            }
        }

        self.onevent = function(e) {
            if (events[e.type]) {
                events[e.type](e);
            }
        }

        self.update = update;
        self.next = next;
        self.prev = prev;
        self.reset = reset;
        self.setView = setView;
        self.helpers = Helpers;
        self.helpers.getDate = Mask.getDate;

        return render => render`<div class="lm-calendar" data-grid="{{self.grid}}" data-type="{{self.type}}" data-disabled="{{self.disabled}}" data-starting-day="{{self.startingDay}}">
            <div class="lm-calendar-options">
                <button type="button" onclick="${reset}">${T('Reset')}</button>
                <button type="button" onclick="${update}">${T('Done')}</button>
            </div>
            <div class="lm-calendar-container" data-view="{{self.view}}">
                <div class="lm-calendar-header">
                    <div>
                        <div class="lm-calendar-labels"><button type="button" onclick="${setView}" data-view="months">{{self.month}}</button> <button type="button" onclick="${setView}" data-view="years">{{self.year}}</button></div> 
                        <div class="lm-calendar-navigation">
                            <button type="button" class="lm-calendar-icon lm-ripple" onclick="${prev}" tabindex="0">expand_less</button>
                            <button type="button" class="lm-calendar-icon lm-ripple" onclick="${next}" tabindex="0">expand_more</button>
                        </div>
                    </div>
                    <div class="lm-calendar-weekdays" :loop="self.weekdays"><div>{{self.title}}</div></div>
                </div>
                <div class="lm-calendar-content" :loop="self.options" tabindex="0" :ref="self.content">
                    <div data-start="{{self.start}}" data-end="{{self.end}}" data-last="{{self.last}}" data-range="{{self.range}}" data-event="{{self.data}}" data-grey="{{self.grey}}" data-bold="{{self.bold}}" data-selected="{{self.selected}}" data-disabled="{{self.disabled}}" onclick="${select}">{{self.title}}</div>
                </div>
                <div class="lm-calendar-footer" data-visible="{{self.footer}}">
                    <div class="lm-calendar-time" data-visible="{{self.time}}"><select :loop="${hours}" :bind="self.hour" class="lm-calendar-control"><option value="{{self.value}}">{{self.title}}</option></select>:<select :loop="${minutes}" :bind="self.minute" class="lm-calendar-control"><option value="{{self.value}}">{{self.title}}</option></select></div>
                    <div class="lm-calendar-update"><input type="button" value="${T('Update')}" onclick="${update}" class="lm-ripple lm-input"></div>
                </div>
            </div>
        </div>`
    }

    // Register the LemonadeJS Component
    lemonade.setComponents({ Calendar: Calendar });
    // Register the web component
    lemonade.createWebComponent('calendar', Calendar);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Calendar, root, options)
            return options;
        } else {
            return Calendar.call(this, root)
        }
    }
})));

/***/ }),

/***/ 541:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (! lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

if (! Modal && "function" === 'function') {
    var Modal = __webpack_require__(72);
}

if (! Tabs && "function" === 'function') {
    var Tabs = __webpack_require__(560);
}

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            method(...a);
        } else if (this.tagName) {
            // Fallback: dispatch a custom event
            const event = new CustomEvent(type, {
                bubbles: true,
                cancelable: true,
                detail: options,
            });
            this.dispatchEvent(event);
        }
    }

    const defaultPalette =  [
        ["#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1"],
        ["#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc"],
        ["#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5"],
        ["#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae"],
        ["#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c"],
        ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"],
        ["#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a"],
        ["#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"],
        ["#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f"],
        ["#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"],
    ]

    const Grid = function(children, { onchange }) {
        const self = this;

        if (! self.palette) {
            self.palette = defaultPalette;
        }

        const select = (event) => {
            if (event.target.tagName === 'TD') {
                let color = event.target.getAttribute('data-value')

                // Remove current selected mark
                let selected = self.el.querySelector('.lm-color-selected');
                if (selected) {
                    selected.classList.remove('lm-color-selected');
                }

                // Mark cell as selected
                if (color) {
                    event.target.classList.add('lm-color-selected');
                    self.set(color);
                }
            }
        }

        self.constructRows = function (e) {
            let tbody = [];
            e.textContent = '';
            for (let j = 0; j < self.palette.length; j++) {
                let tr = document.createElement('tr');
                e.appendChild(tr);

                for (let i = 0; i < self.palette[j].length; i++) {
                    let color = self.palette[j][i];
                    let td = document.createElement('td');
                    td.setAttribute('data-value', color);
                    td.style.backgroundColor = color;
                    tr.appendChild(td);
                }
            }
        }

        onchange(property => {
            if (property === 'palette') {
                self.constructRows()
            }
        });

        return render => render`<div class="lm-color-grid" :palette="self.palette">
            <table cellpadding="7" cellspacing="0" onclick="${select}" :ref="self.table" :ready="self.constructRows"></table>
        </div>`
    }

    const Spectrum = function(children, { onload }) {
        let self = this;
        let context = null;

        let decToHex = function(num) {
            let hex = num.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
        let rgbToHex = function(r, g, b) {
            return "#" + decToHex(r) + decToHex(g) + decToHex(b);
        }

        onload(() => {
            context = self.canvas.getContext("2d", { willReadFrequently: true });
            draw();
        })

        // Drsaw
        const draw = function() {
            let g = context.createLinearGradient(0, 0, self.canvas.width, 0);
            // Create color gradient
            g.addColorStop(0,    "rgb(255,0,0)");
            g.addColorStop(0.15, "rgb(255,0,255)");
            g.addColorStop(0.33, "rgb(0,0,255)");
            g.addColorStop(0.49, "rgb(0,255,255)");
            g.addColorStop(0.67, "rgb(0,255,0)");
            g.addColorStop(0.84, "rgb(255,255,0)");
            g.addColorStop(1,    "rgb(255,0,0)");
            context.fillStyle = g;
            context.fillRect(0, 0, self.canvas.width, self.canvas.height);
            g = context.createLinearGradient(0, 0, 0, self.canvas.height);
            g.addColorStop(0,   "rgba(255,255,255,1)");
            g.addColorStop(0.5, "rgba(255,255,255,0)");
            g.addColorStop(0.5, "rgba(0,0,0,0)");
            g.addColorStop(1,   "rgba(0,0,0,1)");
            context.fillStyle = g;
            context.fillRect(0, 0, self.canvas.width, self.canvas.height);
        }

        // Moves the marquee point to the specified position
        const update = (e) => {
            let x;
            let y;
            let buttons = 1;
            if (e.type === 'touchmove') {
                x = e.changedTouches[0].clientX;
                y = e.changedTouches[0].clientY;
            } else {
                buttons = e.buttons;
                x = e.clientX;
                y = e.clientY;
            }

            if (buttons === 1) {
                let rect = self.el.getBoundingClientRect();
                let left = x - rect.left;
                let top = y - rect.top;
                // Get the color in this pixel
                let pixel = context.getImageData(left, top, 1, 1).data;
                // Position pointer
                self.point.style.left = left + 'px';
                self.point.style.top = top + 'px';
                // Return color
                self.set(rgbToHex(pixel[0], pixel[1], pixel[2]));
            }
        }

        return render => render`<div class="lm-color-hsl">
            <canvas width="240" height="140" :ref="self.canvas" onmousedown="${update}" onmousemove="${update}" ontouchmove="${update}"></canvas>
            <div class="lm-color-point" :ref="self.point"></div>
        </div>`;
    }

    const Color = function(children, { onchange, onload }) {
        let self = this;
        let value = null;

        const change = self.onchange;
        self.onchange = null;

        // Decide the type based on the size of the screen
        let autoType = self.type === 'auto';

        const applyValue = function(v) {
            if (self.value !== v) {
                self.value = v;
            }
        }

        const onopen = function(e) {
            self.open();
            // Open event
            Dispatch.call(self, self.onopen, 'open', {
                instance: self
            });
        }

        const onclose = function(modal, origin) {
            // Close event
            Dispatch.call(self, self.onclose, 'close', {
                instance: self,
                origin: origin,
            });
        }

        const update = function() {
            applyValue(value);
            self.close({ origin: 'button' });
        }

        const getInput = function() {
            let input = self.input;
            if (input && input.current) {
                input = input.current;
            } else {
                if (self.input) {
                    input = self.input;
                }
            }

            return input;
        }

        const events = {
            focusin: (e) => {
                if (self.modal && self.isClosed()) {
                    self.open();
                }
            },
            focusout: (e) => {
                if (self.modal && ! self.isClosed()) {
                    if (! (e.relatedTarget && self.modal.el.contains(e.relatedTarget))) {
                        self.modal.close({ origin: 'focusout' });
                    }
                }
            },
            click: (e) => {
                if (e.target.classList.contains('lm-color-input')) {
                    self.open();
                }
            },
            keydown: (e) => {
                if (self.modal) {
                    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                        if (self.isClosed()) {
                            self.open();
                        }
                    } else if (e.code === 'Enter') {
                        if (! self.isClosed()) {
                            update();
                        } else {
                            self.open();
                        }
                    } else if (e.code === 'Escape') {
                        if (! self.isClosed()) {
                            self.modal.close({origin: 'escape'});
                        }
                    }
                }
            }
        }

        const set = function(v) {
            value = v;
            // Close
            if (self.closeOnChange === true) {
                // Update value
                self.setValue(v);
                // Close modal
                self.close({ origin: 'select' });
            }
        }

        self.open = function(e) {
            if (self.modal) {
                if (autoType) {
                    self.type = window.innerWidth > 640 ? self.type = 'default' : 'picker';
                }
                value = self.value;
                // Table
                let table = self.grid.table;
                // Remove any selection
                let o = table.querySelector('.lm-color-selected');
                if (o) {
                    o.classList.remove('lm-color-selected');
                }
                // Selected
                o = table.querySelector('[data-value="'+self.value+'"]');
                if (o) {
                    o.classList.add('lm-color-selected');
                }
                // Open modal
                self.modal.open();
            }
        }

        /**
         * Close the modal
         */
        self.close = function(options) {
            if (self.modal) {
                if (options && options.origin) {
                    self.modal.close(options)
                } else {
                    self.modal.close({ origin: 'button' })
                }
            }
        }

        self.isClosed = function() {
            if (self.modal) {
                return self.modal.isClosed();
            }
        }

        self.reset = function() {
            self.setValue('');
            self.close({ origin: 'button' });
        }

        self.setValue = function(v) {
            self.value = value = v;
        }

        self.getValue = function() {
            return self.value;
        }

        self.onevent = function(e) {
            if (events[e.type]) {
                events[e.type](e);
            }
        }

        onchange(prop => {
            if (prop === 'value') {
                let input = getInput();
                if (input) {
                    input.value = self.value;
                    if (self.value) {
                        input.style.color = self.value;
                    } else {
                        input.style.color = '';
                    }
                }

                Dispatch.call(self, change, 'change', {
                    instance: self,
                    value: self.value,
                });
            }
        });

        // Input
        if (self.input === 'auto') {
            self.input = document.createElement('input');
            self.input.type = 'text';
        }

        onload(() => {
            if (self.type !== "inline") {
                // Create modal instance
                self.modal = {
                    closed: true,
                    onopen: onopen,
                    onclose: onclose,
                    focus: false,
                    position: 'absolute',
                    'auto-close': false,
                    'auto-adjust': true,
                };
                // Generate modal
                Modal(self.el, self.modal);
            }

            // Create input controls
            if (self.input && self.initInput !== false) {
                if (! self.input.parentNode) {
                    self.el.parentNode.insertBefore(self.input, self.el);
                }

                let input = getInput();
                if (input && input.tagName) {
                    input.classList.add('lm-input');
                    input.classList.add('lm-color-input');
                    input.addEventListener('click', events.click);
                    input.addEventListener('focusin', events.focusin);
                    input.addEventListener('focusout', events.focusout);
                    if (self.placeholder) {
                        input.setAttribute('placeholder', self.placeholder);
                    }
                    if (self.onChange) {
                        input.addEventListener('change', self.onChange);
                    }

                    // Retrieve the value
                    if (self.value) {
                        input.value = self.value;
                    } else if (input.value && input.value !== self.value) {
                        self.value = input.value;
                    }
                }
            }

            // Create event for focus out
            self.el.addEventListener("focusout", (e) => {
                let input = getInput();
                if (e.relatedTarget !== input && ! self.el.contains(e.relatedTarget)) {
                    self.close({ origin: 'focusout' });
                }
            });
        });

        return render => render`<div class="lm-color" :value="self.value">
            <div class="lm-color-options">
                <button type="button" onclick="${self.reset}">Reset</button>
                <button type="button" onclick="${update}">Done</button>
            </div>
            <lm-tabs selected="0" position="center" :ref="self.tabs">
                <div title="Grid"><${Grid} :palette="self.palette" :ref="self.grid" :set="${set}" /></div>
                <div title="Spectrum"><${Spectrum} :ref="self.spectrum" :set="${set}" /></div>
            </lm-tabs>
        </div>`;
    }

    lemonade.setComponents({ Color: Color });
    // Register the web component
    lemonade.createWebComponent('color', Color);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Color, root, options)
            return options;
        } else {
            return Color.call(this, root)
        }
    }
})));

/***/ }),

/***/ 238:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (! lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

if (! Modal && "function" === 'function') {
    var Modal = __webpack_require__(72);
}

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    // Get the coordinates of the action
    const getCoords = function(e) {
        let x;
        let y;

        if (e.changedTouches && e.changedTouches[0]) {
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        return [x,y];
    }

    const Item = function() {
        let self = this;

        self.onload = function() {
            if (typeof(self.render) === 'function') {
                self.render.call(self, self.el);
            }
        }

        // Initialize expanded state
        self.expanded = false;

        if (self.type === 'line') {
            return `<hr role="separator" />`;
        } else if (self.type === 'inline') {
            return `<div></div>`;
        } else {
            return `<div class="lm-menu-item" role="menuitem" data-disabled="{{self.disabled}}" data-cursor="{{self.cursor}}" data-icon="{{self.icon}}" title="{{self.tooltip}}" data-submenu="${!!self.submenu}" aria-haspopup="${!!self.submenu}" aria-expanded="{{self.expanded}}" aria-label="{{self.title}}" tabindex="-1" onmouseup="self.parent.mouseUp" onmouseenter="self.parent.mouseEnter" onmouseleave="self.parent.mouseLeave">
                <span>{{self.title}}</span> <div>{{self.shortcut}}</div>
            </div>`;
        }
    }

    const Create = function() {
        let self = this;

        // Delay on open
        let delayTimer;
        // Save the position of this modal
        let index = self.parent.modals.length;

        // Blank options
        self.options = [];

        // Close handler
        self.onclose = function() {
            // Reset any cursor
            resetCursor.call(self);
            // Parent
            if (typeof(self.parent.onclose) === 'function') {
                self.parent.onclose(self.parent, self);
            }
        }

        self.onopen = function() {
            // Parent
            if (typeof(self.parent.onopen) === 'function') {
                self.parent.onopen(self.parent, self);
            }
        }

        /**
         * Close the modal
         */
        self.close = function() {
            // Close modals with higher level
            self.parent.close(index);
        }

        /**
         * Open submenu handler
         * @param {object} s
         * @param {boolean} cursor - Activate the first item
         */
        self.open = function(s, cursor) {
            if (s.submenu) {
                // Get the modal in the container of modals
                let current = self.parent.modals[index+1];
                // Do not exist yet, create it.
                if (! current) {
                    // Modal needs to be created
                    current = self.parent.create();
                }
                // Get the parent from this one
                let parent = self.parent.modals[index];
                // Update modal content
                if (current.options !== s.submenu) {
                    // Close modals with higher level
                    current.options = s.submenu;
                    // Close other modals
                    self.parent.close(index+1);
                }
                // Update the selected modal
                self.parent.modalIndex = index+1;
                let rect = parent.modal.el.getBoundingClientRect();
                // Update modal
                current.modal.open();
                // Aria indication
                current.modal.top = rect.y + s.el.offsetTop + 2;
                current.modal.left = rect.x + 248;
                // Keep current item for each modal
                current.item = s;
                s.expanded = true;

                // Activate the cursor
                if (cursor === true) {
                    // Place cursor in the first position
                    current.options[0].cursor = true;
                    // Position cursor
                    current.cursor = 0;
                }

                onopen(current, s.submenu)
            } else {
                // Close modals with higher level
                self.parent.close(index+1);
            }
        }

        // Mouse open
        self.mouseUp = function(e, s) {
            if (typeof(s.onclick) === 'function') {
                s.onclick.call(s, e, s.el);
            }
            if (! s.submenu) {
                self.close();
            }
        }

        self.mouseEnter = function(e, s) {
            if (delayTimer) {
                clearTimeout(delayTimer);
            }
            delayTimer = setTimeout(function() {
                self.open(s);
            }, 200);
        }

        self.mouseLeave = function(e, s) {
            if (delayTimer) {
                clearTimeout(delayTimer);
            }
        }

        let template = `<lm-modal :overflow="true" :closed="true" :ref="self.modal" :responsive="false" :auto-adjust="true" :focus="false" :layers="false" :onopen="self.onopen" :onclose="self.onclose">
            <div class="lm-menu-submenu" role="menu" aria-orientation="vertical">
                <Item :loop="self.options" />
            </div>
        </lm-modal>`;

        return lemonade.element(template, self, { Item: Item });
    }

    const findNextEnabledCursor = function(startIndex, direction) {
        if (!this.options || this.options.length === 0) {
            return null;
        }
        
        let cursor = startIndex;
        let attempts = 0;
        const maxAttempts = this.options.length;
        
        while (attempts < maxAttempts) {
            if (direction) {
                // Down
                if (cursor >= this.options.length) {
                    cursor = 0;
                }
            } else {
                // Up
                if (cursor < 0) {
                    cursor = this.options.length - 1;
                }
            }
            
            let item = this.options[cursor];
            if (item && !item.disabled && item.type !== 'line') {
                return cursor;
            }
            
            cursor = direction ? cursor + 1 : cursor - 1;
            attempts++;
        }
        return null;
    };

    const setCursor = function(direction) {
        let cursor = null;

        if (typeof(this.cursor) !== 'undefined') {
            if (! direction) {
                // Up
                cursor = findNextEnabledCursor.call(this, this.cursor - 1, false);
            } else {
                // Down
                cursor = findNextEnabledCursor.call(this, this.cursor + 1, true);
            }
        }

        // Remove the cursor
        if (cursor === null) {
            if (direction) {
                cursor = findNextEnabledCursor.call(this, 0, true);
            } else {
                cursor = findNextEnabledCursor.call(this, this.options.length - 1, false);
            }
        } else if (typeof(this.cursor) !== 'undefined') {
            this.options[this.cursor].cursor = false;
        }

        // Add the cursor if found
        if (cursor !== null) {
            this.options[cursor].cursor = true;
            this.cursor = cursor;
            return true;
        }

        return false;
    }

    /**
     * Reset the cursor for a contextmenu
     */
    const resetCursor = function() {
        // Contextmenu modal
        let item = this.options[this.cursor];
        // Cursor is found so reset it
        if (typeof(item) !== 'undefined') {
            // Remove the cursor style
            item.cursor = false;
            // Delete reference index
            delete this.cursor;
        }
    }

    /**
     * Go through all items of a menu
     * @param s
     * @param options
     */
    const onopen = function(s, options) {
        // Onopen
        for (let i = 0; i < options.length; i++) {
            if (typeof(options[i].onopen) === 'function') {
                options[i].onopen(s);
            }
        }
    }

    const Contextmenu = function(children, { onload }) {
        let self = this;

        // Container for all modals
        self.modals = [];
        self.modalIndex = 0;

        self.create = function() {
            // Create a new self for each modal
            let s = {
                parent: self,
            };
            // Render the modal inside the main container
            lemonade.render(Create, self.el, s);
            // Add the reference of the modal in a container#
            self.modals.push(s);
            // Return self
            return s;
        }

        self.isClosed = function() {
            return self.modals[0].modal.closed === true;
        }

        self.open = function(options, x, y, adjust) {
            // Get the main modal
            let menu = self.modals[0];
            // Reset cursor
            resetCursor.call(menu);
            // Define new position
            menu.modal.top = y;
            menu.modal.left = x;
            // Open
            menu.modal.open();
            // If the modal is open and the content is different from what is shown. Close modals with higher level
            self.close(1);
            // Update the data
            if (options && menu.options !== options) {
                // Refresh content
                menu.options = options;
            }
            onopen(self, options);

            // Adjust position to respect mouse cursor after auto-adjust
            // Use queueMicrotask to ensure it runs after the modal's auto-adjust
            if (adjust === true) {
                queueMicrotask(() => {
                    let modalEl = menu.modal.el;
                    let rect = modalEl.getBoundingClientRect();
                    let marginLeft = parseFloat(modalEl.style.marginLeft) || 0;
                    let marginTop = parseFloat(modalEl.style.marginTop) || 0;

                    // Check if horizontal adjustment was applied (margin is non-zero)
                    if (marginLeft !== 0) {
                        // Position modal so its right edge is at x - 1 (cursor 1px to the right of modal)
                        // Formula: left + margin + width = x - 1, where left = x
                        // Therefore: margin = -width - 1
                        let newMarginLeft = -rect.width - 1;
                        // Check if this would push modal off the left edge
                        let newLeft = x + newMarginLeft;
                        if (newLeft < 10) {
                            // Keep a 10px margin from the left edge
                            newMarginLeft = 10 - x;
                        }
                        modalEl.style.marginLeft = newMarginLeft + 'px';
                    }

                    // Check if vertical adjustment was applied (margin is non-zero)
                    if (marginTop !== 0) {
                        // Position modal so its bottom edge is at y - 1 (cursor 1px below modal)
                        // Formula: top + margin + height = y - 1, where top = y
                        // Therefore: margin = -height - 1
                        let newMarginTop = -rect.height - 1;
                        // Check if this would push modal off the top edge
                        let newTop = y + newMarginTop;
                        if (newTop < 10) {
                            // Keep a 10px margin from the top edge
                            newMarginTop = 10 - y;
                        }
                        modalEl.style.marginTop = newMarginTop + 'px';
                    }
                });
            }
            // Focus
            self.el.classList.add('lm-menu-focus');
            // Focus on the contextmenu
            self.el.focus();
        }

        self.close = function(level) {
            // Close all modals from the level specified
            self.modals.forEach(function(menu, k) {
                if (k >= level) {
                    if (menu.item) {
                        menu.item.expanded = false;
                        menu.item = null;
                    }
                    menu.modal.close();
                }
            });
            // Keep the index of the modal that is opened
            self.modalIndex = level ? level - 1 : 0;

            // Close event
            if (level === 0) {
                self.el.classList.remove('lm-menu-focus');

                Dispatch.call(self, self.onclose, 'close', {
                    instance: self,
                });
            }
        }

        onload(() => {
            // Create first menu
            self.create();

            // Create event for focus out
            self.el.addEventListener("focusout", (e) => {
                if (! (e.relatedTarget && (self.el.contains(e.relatedTarget) || self.root?.contains(e.relatedTarget)))) {
                    self.close(0);
                }
            });

            // Keyboard event
            self.el.addEventListener("keydown", function(e) {
                // Menu object
                let menu = self.modals[self.modalIndex];
                // Modal must be opened
                if (! menu.modal.closed) {
                    // Something happens
                    let ret = false;
                    // Control
                    if (e.key === 'ArrowLeft') {
                        if (self.modalIndex > 0) {
                            // Close modal
                            menu.close();
                            // Action happened
                            ret = true;
                        }
                    } else if (e.key === 'ArrowRight') {
                        // Get the selected cursor
                        let item = menu.options[menu.cursor];
                        // Open submenu
                        if (typeof (item) !== 'undefined') {
                            // Open submenu in case that exists
                            if (item.submenu && !item.disabled) {
                                // Open modal
                                menu.open(item, true);
                                // Action happened
                                ret = true;
                            }
                        }
                    } else if (e.key === 'ArrowUp') {
                        ret = setCursor.call(menu, 0);
                    } else if (e.key === 'ArrowDown') {
                        ret = setCursor.call(menu, 1);
                    } else if (e.key === 'Enter') {
                        // Contextmenu modal
                        let item = menu.options[menu.cursor];
                        // Cursor is found so reset it
                        if (typeof(item) !== 'undefined') {
                            // Execute action
                            if (typeof (item.onclick) === 'function') {
                                item.onclick.call(item, e, item.el);
                            }
                            // Open sub menu in case exists
                            if (item.submenu) {
                                // Open menu
                                menu.open(item, true);
                                // Action happened
                                ret = true;
                            } else {
                                // Close all menu
                                self.close(0);
                                // Action happened
                                ret = true;
                            }
                        }
                    } else if (e.key === 'Escape') {
                        self.close(0);
                    }

                    // Something important happen so block any progression
                    if (ret === true) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            });

            if (! self.root) {
                if (self.tagName) {
                    self.root = self.el.parentNode.parentNode;
                } else {
                    self.root = self.el.parentNode;
                }
            }

            // Parent
            self.root.addEventListener("contextmenu", function(e) {
                if (Array.isArray(self.options) && self.options.length) {
                    let [x, y] = getCoords(e);
                    self.open(self.options, x, y, true);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        });

        return `<div class="lm-menu" role="menu" aria-orientation="vertical" tabindex="0"></div>`;
    }

    lemonade.setComponents({ Contextmenu: Contextmenu });

    lemonade.createWebComponent('contextmenu', Contextmenu);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Contextmenu, root, options)
            return options;
        } else {
            return Contextmenu.call(this, root)
        }
    }
})));

/***/ }),

/***/ 692:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Implement page up and down navigation
 * Implement color attribute for items
 */

if (!lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

if (!Modal && "function" === 'function') {
    var Modal = __webpack_require__(72);
}

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            return this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    // Default row height
    let defaultRowHeight = 24;

    // Translations
    const T = function(t) {
        if (typeof(document) !== "undefined" && document.dictionary) {
            return document.dictionary[t] || t;
        } else {
            return t;
        }
    }

    const isEmpty = function(v) {
        return v === '' || v === null || v === undefined || (Array.isArray(v) && v.length === 0);
    }

    /**
     * Compare two values (arrays, strings, numbers, etc.)
     * Returns true if both are equal or empty
     * @param {*} a1
     * @param {*} a2
     */
    const compareValues = function(a1, a2) {
        if (a1 === a2 || (isEmpty(a1) && isEmpty(a2))) {
            return true;
        }

        if (!a1 || !a2) {
            return false;
        }

        if (Array.isArray(a1) && Array.isArray(a2)) {
            if (a1.length !== a2.length) {
                return false;
            }
            for (let i = 0; i < a1.length; i++) {
                if (a1[i] !== a2[i]) {
                    return false;
                }
            }
            return true;
        }

        return a1 === a2;
    }

    const lazyLoading = function (self) {
        /**
         * Get the position from top of a row by its index
         * @param item
         * @returns {number}
         */
        const getRowPosition = function (item) {
            // Position from top
            let top = 0;
            if (item) {
                let items = self.rows;
                if (items && items.length) {
                    let index = self.rows.indexOf(item);
                    // Go through the items
                    for (let j = 0; j < index; j++) {
                        top += items[j].height || defaultRowHeight;
                    }
                }
            }
            return top;
        }

        const updateScroll = function () {
            let items = self.rows;
            if (items) {
                // Before control
                let before = true;
                // Total of items in the container
                let numOfItems = items.length;
                // Position from top
                let height = 0;
                // Size of the adjustment
                let size = 0;
                // Go through the items
                for (let j = 0; j < numOfItems; j++) {
                    let h = items[j].height || defaultRowHeight;
                    // Height
                    height += h;
                    // Start tracking all items as before
                    if (items[j] === self.result[0]) {
                        before = false;
                    }
                    // Adjustment
                    if (before) {
                        size += h;
                    }
                }
                // Update height
                scroll.style.height = height + 'px';
                // Adjust scroll position
                return size;
            }
            return false;
        }

        const getVisibleRows = function (reset) {
            let items = self.rows;
            if (items) {
                let adjust;
                // Total of items in the container
                let numOfItems = items.length;
                // Get the position from top
                let y = el.scrollTop;
                // Get the height
                let h = null;
                if (self.type === 'searchbar' || self.type === 'picker') {
                    // Priority should be the size used on the viewport
                    h = y + (el.offsetHeight || self.height);
                } else {
                    // Priority is the height define during initialization
                    h = y + (self.height || el.offsetHeight);
                }
                // Go through the items
                let rows = [];
                // Height
                let height = 0;
                // Go through all items
                for (let j = 0; j < numOfItems; j++) {
                    if (items[j].visible !== false) {
                        // Height
                        let rowHeight = items[j].height || defaultRowHeight;
                        // Return on partial width
                        if (height + rowHeight > y && height < h) {
                            rows.push(items[j]);
                        }
                        height += rowHeight;
                    }
                }

                // Update visible rows
                if (reset || !compareValues(rows, self.result)) {
                    // Render the items
                    self.result = rows;
                    // Adjust scroll height
                    let adjustScroll = reset;
                    // Adjust scrolling
                    for (let i = 0; i < rows.length; i++) {
                        // Item
                        let item = rows[i];
                        // Item height
                        let h = item.el.offsetHeight;
                        // Update row height
                        if (!item.height || h !== item.height) {
                            // Keep item height
                            item.height = h;
                            // Adjust total height
                            adjustScroll = true;
                        }
                    }

                    // Update scroll if the height of one element has been changed
                    if (adjustScroll) {
                        // Adjust the scroll height
                        adjust = updateScroll();
                    }
                }

                // Adjust position of the first element
                let position = getRowPosition(self.result[0]);
                let diff = position - el.scrollTop;
                if (diff > 0) {
                    diff = 0;
                }
                self.container.style.top = diff + 'px';

                return adjust;
            }
        }

        /**
         * Move the position to the top and re-render based on the scroll
         * @param reset
         */
        const render = function (reset) {
            // Move scroll to the top
            el.scrollTop = 0;
            // Reset scroll
            updateScroll();
            // Append first batch
            getVisibleRows(reset);
        }

        /**
         * Will adjust the items based on the scroll position offset
         */
        self.adjustPosition = function (item) {
            if (item.el) {
                let h = item.el.offsetHeight;
                let calc = item.el.offsetTop + h;
                if (calc > el.offsetHeight) {
                    let size = calc - el.offsetHeight;
                    if (size < h) {
                        size = h;
                    }
                    el.scrollTop -= -1 * size;
                }
            }
        }

        // Controls
        const scrollControls = function () {
            getVisibleRows(false);
        }

        // Element for scrolling
        let el = self.container.parentNode;
        el.classList.add('lm-lazy');
        // Div to represent the height of the content
        const scroll = document.createElement('div');
        scroll.classList.add('lm-lazy-scroll');
        // Force the height and add scrolling
        el.appendChild(scroll);
        el.addEventListener('scroll', scrollControls, { passive: true });
        el.addEventListener('wheel', scrollControls, { passive: true });
        self.container.classList.add('lm-lazy-items');

        self.goto = function (item) {
            el.scrollTop = getRowPosition(item);
            let adjust = getVisibleRows(false);
            if (adjust) {
                el.scrollTop = adjust;
                // Last adjust on the visible rows
                getVisibleRows(false);
            }
        }

        return (prop) => {
            if (prop === 'rows') {
                render(true);
            }
        }
    }

    const getAttributeName = function(prop) {
        if (prop.substring(0,1) === ':') {
            prop = prop.substring(1);
        } else if (prop.substring(0,3) === 'lm-') {
            prop = prop.substring(3);
        }
        return prop.toLowerCase();
    }

    const extractFromHtml =  function(element) {
        let data = [];
        // Content
        for (let i = 0; i < element.children.length; i++) {
            let e = element.children[i];
            let item = {
                text: e.textContent || e.getAttribute('title'),
                value: e.getAttribute('value'),
            }
            if (item.value == null) {
                item.value = item.text;
            }
            data.push(item);
        }

        return data;
    }

    const extract = function(children) {
        let data = [];

        if (this.tagName) {
            data = extractFromHtml(this);
            // Remove all elements
            this.textContent = '';
        } else {
            // Get data
            if (typeof(children) === 'string') {
                // Version 4
                let d = document.createElement('div');
                d.innerHTML = children;
                data = extractFromHtml(d);
            } else if (children && children.length) {
                // Version 5
                children.forEach((v) => {
                    let item = {}
                    v.props.forEach((prop) => {
                        item[getAttributeName(prop.name)] = prop.value;
                    });
                    if (! item.text) {
                        item.text = v.children[0]?.props[0]?.value || '';
                    }
                    data.push(item);
                });
                // Block children
                children.length = 0;
            }
        }

        return data;
    }

    const isDOM = function(o) {
        return (o instanceof Element || o instanceof HTMLDocument || o instanceof DocumentFragment);
    }

    const Dropdown = function (children, { onchange, onload }) {
        let self = this;
        // Data
        let data = [];
        // Internal value controllers
        let value = [];
        // Cursor
        let cursor = null;
        // Control events
        let ignoreEvents = false;
        // Lazy loading global instance
        let lazyloading = null;
        // Tracking changes
        let changesDetected = false;
        // Debounce timer for search
        let searchTimeout = null;

        // Data
        if (! Array.isArray(self.data)) {
            self.data = [];
        }

        let d = extract.call(this, children);
        if (d) {
            d.forEach((v) => {
                self.data.push(v)
            })
        }

        // Decide the type based on the size of the screen
        let autoType = self.type === 'auto';

        // Custom events defined by the user
        let load = self.onload;
        self.onload = null;
        let change = self.onchange;
        self.onchange = null;

        // Compatibility
        if (typeof self.newOptions !== 'undefined') {
            self.insert = self.newOptions;
        }

        // Cursor controllers
        const setCursor = function (index, force) {
            let item = self.rows[index];
            if (typeof (item) !== 'undefined') {
                // Set the cursor number
                cursor = index;
                // Set visual indication
                item.cursor = true;
                // Go to the item on the scroll in case the item is not on the viewport
                if (!(item.el && item.el.parentNode) || force === true) {
                    // Goto method
                    self.goto(item);
                }
                // Adjust cursor position
                setTimeout(function () {
                    self.adjustPosition(item);
                });
            }
        }

        const removeCursor = function (reset) {
            if (cursor !== null) {
                if (typeof (self.rows[cursor]) !== 'undefined') {
                    self.rows[cursor].cursor = false;
                }
                if (reset) {
                    // Cursor is null
                    cursor = null;
                }
            }
        }

        const moveCursor = function (direction, jump) {
            // Remove cursor
            removeCursor();
            // Last item
            let last = self.rows.length - 1;
            if (jump) {
                if (direction < 0) {
                    cursor = 0;
                } else {
                    cursor = last;
                }
            } else {
                // Position
                if (cursor === null) {
                    cursor = 0;
                } else {
                    // Move previous
                    cursor = cursor + direction;
                }
                // Reach the boundaries
                if (direction < 0) {
                    // Back to the last one
                    if (cursor < 0) {
                        cursor = last;
                    }
                } else {
                    // Back to the first one
                    if (cursor > last) {
                        cursor = 0;
                    }
                }
            }
            // Add cursor
            setCursor(cursor);
        }

        const adjustDimensions = function(data) {
            // Estimate width
            let width = self.width ?? 0;
            // Adjust the width
            let w = getInput().offsetWidth;
            if (width < w) {
                width = w;
            }
            // Width && values
            data.map(function (s) {
                // Estimated width of the element
                if (s.text) {
                    let w = Math.max(width, s.text.length * 7.5);
                    if (width < w) {
                        width = w;
                    }
                }
            });
            // Min width for the container
            self.container.parentNode.style.width = (width - 2) + 'px';
        }

        const setData = function () {
            // Data
            data = JSON.parse(JSON.stringify(self.data));
            // Re-order to make sure groups are in sequence
            if (data && data.length) {
                // Adjust width and height
                adjustDimensions(data);
                // Groups
                data.sort((a, b) => {
                    // Compare groups
                    if (a.group && b.group) {
                        return a.group.localeCompare(b.group);
                    }
                    return 0;
                });
                let group = '';
                // Define group headers
                data.map((v) => {
                    // Compare groups
                    if (v && v.group && v.group !== group) {
                        v.header = v.group;
                        group = v.group;
                    }
                });
            }
            // Data to be listed
            self.rows = data;
        }

        const updateLabel = function () {
            if (value && value.length) {
                getInput().textContent = value.filter(v => v.selected).map(i => i.text).join('; ');
            } else {
                getInput().textContent = '';
            }
        }

        const setValue = function (v, ignoreEvent) {
            // Values
            let newValue;
            if (! Array.isArray(v)) {
                if (typeof(v) === 'string') {
                    newValue = v.split(self.divisor ?? ';');
                } else {
                    newValue = [v];
                }
            } else {
                newValue = v;
            }

            // Width && values
            value = [];

            if (Array.isArray(data)) {
                data.map(function (s) {
                    s.selected = newValue.some(v => v == s.value);
                    if (s.selected) {
                        value.push(s);
                    }
                });
            }

            // Update label
            if (self.isClosed()) {
                updateLabel();
            }

            // Component onchange
            if (! ignoreEvent) {
                Dispatch.call(self, change, 'change', {
                    instance: self,
                    value: getValue(),
                });
            }
        }

        const getValue = function () {
            if (self.multiple) {
                if (value && value.length) {
                    return value.filter(v => v.selected).map(i => i.value);
                }
            } else {
                if (value && value.length) {
                    return value[0].value;
                }
            }

            return null;
        }

        const onopen = function () {
            self.state = true;
            // Value
            let v = value[value.length - 1];
            // Make sure goes back to the top of the scroll
            if (self.container.parentNode.scrollTop > 0) {
                self.container.parentNode.scrollTop = 0;
            }
            // Move to the correct position
            if (v) {
                // Mark the position of the cursor to the same element
                setCursor(self.rows.indexOf(v), true);
            }
            // Prepare search field
            if (self.autocomplete) {
                // Get the input
                let input = getInput();
                // Editable
                input.setAttribute('contenteditable', true);
                // Clear input
                input.textContent = '';
                // Focus on the item
                input.focus();
            }
            // Adjust width and height
            adjustDimensions(self.data);
            // Open event
            Dispatch.call(self, self.onopen, 'open', {
                instance: self
            });
        }

        const onclose = function (options, origin) {
            // Cursor
            removeCursor(true);
            // Reset search
            if (self.autocomplete) {
                // Go to begin of the data
                self.rows = data;
                // Get the input
                let input = getInput();
                if (input) {
                    // Remove editable attribute
                    input.removeAttribute('contenteditable');
                    // Clear input
                    input.textContent = '';
                }
            }

            if (origin === 'escape') {
                // Cancel operation and keep the same previous value
                setValue(self.value, true);
            } else {
                // Current value
                let newValue = getValue();

                // If that is different from the component value
                if (changesDetected === true && ! compareValues(newValue, self.value)) {
                    self.value = newValue;
                } else {
                    // Update label
                    updateLabel();
                }
            }

            // Identify the new state of the dropdown
            self.state = false;

            // Close event
            Dispatch.call(self, self.onclose, 'close', {
                instance: self,
                ...options
            });
        }

        const normalizeData = function(result) {
            if (result && result.length) {
                return result.map((v) => {
                    if (typeof v === 'string' || typeof v === 'number') {
                        return { value: v, text: v };
                    } else if (typeof v === 'object' && v.hasOwnProperty('name')) {
                        return { value: v.id, text: v.name };
                    } else {
                        return v;
                    }
                });
            }
        }

        const loadData = function(result) {
            result = normalizeData(result);
            // Loading controls
            lazyloading = lazyLoading(self);
            // Loading new data from a remote source
            if (result) {
                result.forEach((v) => {
                    self.data.push(v);
                });
            }
            // Process the data
            setData();
            // Set value
            if (typeof(self.value) !== 'undefined') {
                setValue(self.value, true);
            }
            // Onload method
            Dispatch.call(self, load, 'load', {
                instance: self
            });
            // Remove loading spin
            self.input.classList.remove('lm-dropdown-loading');
        }

        const resetData = function(result) {
            result = normalizeData(result);
            // Reset cursor
            removeCursor(true);
            let r = data.filter(item => {
                return item.selected === true;
            });
            // Loading new data from a remote source
            if (result) {
                result.forEach((v) => {
                    r.push(v);
                });
            }
            self.rows = r;
            // Remove loading spin
            self.input.classList.remove('lm-dropdown-loading');

            // Event
            Dispatch.call(self, self.onsearch, 'search', {
                instance: self,
                result: result,
            });
        }

        const getInput = function() {
            return self.input;
        }

        const search = function(query) {
            if (! self.isClosed() && self.autocomplete) {

                // Remote or normal search
                if (self.remote === true) {
                    // Clear existing timeout
                    if (searchTimeout) {
                        clearTimeout(searchTimeout);
                    }
                    // Loading spin
                    self.input.classList.add('lm-dropdown-loading');
                    // Headers
                    let http = {
                        headers: {
                            'Content-Type': 'text/json',
                        }
                    }
                    let ret = Dispatch.call(self, self.onbeforesearch, 'beforesearch', {
                        instance: self,
                        http: http,
                        query: query,
                    });

                    if (ret === false) {
                        return;
                    }

                    // Debounce the search with 300ms delay
                    searchTimeout = setTimeout(() => {
                        fetch(`${self.url}?q=${query}`, http).then(r => r.json()).then(resetData).catch((error) => {
                            resetData([]);
                        });
                    }, 300);
                } else {
                    // Filter options
                    let temp;

                    const find = (prop) => {
                        if (prop) {
                            if (Array.isArray(prop)) {
                                // match if ANY element contains the query (case-insensitive)
                                return prop.some(v => v != null && v.toString().toLowerCase().includes(query));
                            }
                            // handle strings/numbers/others
                            return prop.toString().toLowerCase().includes(query);
                        }
                        return false;
                    };

                    if (! query) {
                        temp = data;
                    } else {
                        temp = data.filter(item => {
                            return item.selected === true || find(item.text) || find(item.group) || find(item.keywords) || find(item.synonym);
                        });
                    }

                    // Cursor
                    removeCursor(true);
                    // Update the data from the dropdown
                    self.rows = temp;
                }
            }
        }

        const events = {
            focusout: (e) => {
                if (self.modal) {
                    if (! (e.relatedTarget && self.el.contains(e.relatedTarget))) {
                        if (! self.isClosed()) {
                            self.close({ origin: 'focusout '});
                        }
                    }
                }
            },
            keydown: (e) => {
                if (! self.isClosed()) {
                    let prevent = false;
                    if (e.code === 'ArrowUp') {
                        moveCursor(-1);
                        prevent = true;
                    } else if (e.code === 'ArrowDown') {
                        moveCursor(1);
                        prevent = true;
                    } else if (e.code === 'Home') {
                        moveCursor(-1, true);
                        if (!self.autocomplete) {
                            prevent = true;
                        }
                    } else if (e.code === 'End') {
                        moveCursor(1, true);
                        if (!self.autocomplete) {
                            prevent = true;
                        }
                    } else if (e.code === 'Enter') {
                        if (e.target.tagName === 'BUTTON') {
                            e.target.click();
                            let input = getInput();
                            input.focus();
                        } else {
                            select(e, self.rows[cursor]);
                        }
                        prevent = true;
                    } else if (e.code === 'Escape') {
                        self.close({ origin: 'escape'});
                        prevent = true;
                    } else {
                        if (e.keyCode === 32 && !self.autocomplete) {
                            select(e, self.rows[cursor]);
                        }
                    }

                    if (prevent) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                } else {
                    if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Enter') {
                        self.open();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            },
            mousedown: (e) => {
                if (e.target.classList.contains('lm-dropdown-input')) {
                    if (self.autocomplete) {
                        let x;
                        if (e.changedTouches && e.changedTouches[0]) {
                            x = e.changedTouches[0].clientX;
                        } else {
                            x = e.clientX;
                        }
                        if (e.target.offsetWidth - (x - e.target.offsetLeft) < 20) {
                            toggle();
                        } else {
                            self.open();
                        }
                    } else {
                        toggle();
                    }
                }
            },
            paste: (e) => {
                if (e.target.classList.contains('lm-dropdown-input')) {
                    let text;
                    if (e.clipboardData || e.originalEvent.clipboardData) {
                        text = (e.originalEvent || e).clipboardData.getData('text/plain');
                    } else if (window.clipboardData) {
                        text = window.clipboardData.getData('Text');
                    }
                    text = text.replace(/(\r\n|\n|\r)/gm, "");
                    document.execCommand('insertText', false, text)
                    e.preventDefault();
                }
            },
            input: (e) => {
                if (e.target.classList.contains('lm-dropdown-input')) {
                    search(e.target.textContent.toLowerCase());
                }
            },
        }

        const selectItem = function(s) {
            if (self.remote === true) {
                if (data.indexOf(s) === -1) {
                    self.data.push(s);
                    data.push(s);
                }
            }

            if (self.multiple === true) {
                let position = value.indexOf(s);
                if (position === -1) {
                    value.push(s);
                    s.selected = true;
                } else {
                    value.splice(position, 1);
                    s.selected = false;
                }
            } else {
                if (value[0] === s) {
                    if (self.allowEmpty === false) {
                        s.selected = true;
                    } else {
                        s.selected = !s.selected;
                    }
                } else {
                    if (value[0]) {
                        value[0].selected = false;
                    }
                    s.selected = true;
                }
                if (s.selected) {
                    value = [s];
                } else {
                    value = [];
                }
            }

            changesDetected = true;
        }

        const add = async function (e) {
            let input = getInput();
            let text = input.textContent;
            if (! text) {
                return false;
            }

            // New item
            let s = {
                text: text,
                value: text,
            }

            self.add(s);

            e.preventDefault();
        }

        const select = function (e, s) {
            if (s && s.disabled !== true) {
                selectItem(s);
                // Close the modal
                if (self.multiple !== true) {
                    self.close({ origin: 'button' });
                }
            }
        }

        const toggle = function () {
            if (self.modal) {
                if (self.isClosed()) {
                    self.open();
                } else {
                    self.close({ origin: 'button' });
                }
            }
        }

        self.add = async function (newItem) {
            // Event
            if (typeof(self.onbeforeinsert) === 'function') {
                self.input.classList.add('lm-dropdown-loading');
                let ret = await self.onbeforeinsert(self, newItem);
                self.input.classList.remove('lm-dropdown-loading');
                if (ret === false) {
                    return;
                } else if (ret) {
                    newItem = ret;
                }
            }
            // Process the data
            data.push(newItem);
            self.data.push(newItem);
            // Refresh screen
            self.result.unshift(newItem);
            self.rows.unshift(newItem);
            self.refresh('result');

            Dispatch.call(self, self.oninsert, 'insert', {
                instance: self,
                item: newItem,
            });
        }

        self.open = function () {
            if (self.modal && ! self.disabled) {
                if (self.isClosed()) {
                    if (autoType) {
                        self.type = window.innerWidth > 640 ? self.type = 'default' : (self.autocomplete ? 'searchbar' : 'picker');
                    }
                    // Track
                    changesDetected = false;
                    // Open the modal
                    self.modal.open();
                }
            }
        }

        self.close = function (options) {
            if (self.modal) {
                if (options?.origin) {
                    self.modal.close(options)
                } else {
                    self.modal.close({ origin: 'button' })
                }
            }
        }

        self.isClosed = function() {
            if (self.modal) {
                return self.modal.isClosed();
            }
        }

        self.setData = function(data) {
            self.data = data;
        }

        self.getData = function() {
            return self.data;
        }

        self.getValue = function() {
            return self.value;
        }

        self.setValue = function(v) {
            self.value = v;
        }

        self.reset = function() {
            self.value = null;
            self.close({ origin: 'button' });
        }

        self.onevent = function(e) {
            if (events[e.type]) {
                events[e.type](e);
            }
        }

        // Init with a
        let input = self.input;

        onload(() => {
            if (self.type === "inline") {
                // For inline dropdown
                self.el.setAttribute('tabindex', 0);
                // Remove search
                self.input.remove();
            } else {
                // Create modal instance
                self.modal = {
                    closed: true,
                    focus: false,
                    onopen: onopen,
                    onclose: onclose,
                    position: 'absolute',
                    'auto-adjust': true,
                    'auto-close': false,
                };
                // Generate modal
                Modal(self.el.children[1], self.modal);
            }

            if (self.remote === 'true') {
                self.remote = true;
            }

            if (self.autocomplete === 'true') {
                self.autocomplete = true;
            }

            if (self.multiple === 'true') {
                self.multiple = true;
            }

            if (self.insert === 'true') {
                self.insert = true;
            }

            // Autocomplete will be forced to be true when insert action is active
            if ((self.insert === true || self.type === 'searchbar' || self.remote === true) && ! self.autocomplete) {
                self.autocomplete = true;
            }

            if (typeof(input) !== 'undefined') {
                // Remove the native element
                if (isDOM(input)) {
                    input.classList.add('lm-dropdown-input');
                }
                // Remove search
                self.input.remove();
                // New input
                self.input = input;
            } else {
                self.el.children[0].style.position = 'relative';
            }

            // Default width
            if (self.width) {
                // Dropdown
                self.el.style.width = self.width + 'px';
            }

            // Height
            self.height = 400;

            // Animation for mobile
            if (document.documentElement.clientWidth < 800) {
                self.animation = true;
            }

            // Events
            self.el.addEventListener('focusout', events.focusout);
            self.el.addEventListener('keydown', events.keydown);
            self.el.addEventListener('mousedown', events.mousedown);
            self.el.addEventListener('paste', events.paste);
            self.el.addEventListener('input', events.input);

            // Load remote data
            if (self.url) {
                if (self.remote === true) {
                    loadData();
                } else {
                    // Loading spin
                    self.input.classList.add('lm-dropdown-loading');
                    // Load remote data
                    fetch(self.url, {
                        headers: {
                            'Content-Type': 'text/json',
                        }
                    }).then(r => r.json()).then(loadData).catch(() => {
                        loadData();
                    });
                }
            } else {
                loadData();
            }
        });

        onchange(prop => {
            if (prop === 'value') {
                setValue(self.value);
            } else if (prop === 'data') {
                setData();
                self.value = null;
            }

            if (typeof (lazyloading) === 'function') {
                lazyloading(prop);
            }
        });

        return render => render`<div class="lm-dropdown" data-state="{{self.state}}" data-insert="{{self.insert}}" data-type="{{self.type}}" data-disabled="{{self.disabled}}" :value="self.value" :data="self.data">
            <div class="lm-dropdown-header">
                <div class="lm-dropdown-input" placeholder="{{self.placeholder}}" :ref="self.input" tabindex="0"></div>
                <button class="lm-dropdown-add" onclick="${add}" tabindex="0"></button>
                <div class="lm-dropdown-header-controls">
                    <button onclick="self.reset" class="lm-dropdown-done">${T('Reset')}</button>
                    <button onclick="self.close" class="lm-dropdown-done">${T('Done')}</button>
                </div>
            </div>
            <div class="lm-dropdown-content">
                <div>
                    <div :loop="self.result" :ref="self.container" :rows="self.rows">
                        <div class="lm-dropdown-item" onclick="${select}" data-cursor="{{self.cursor}}" data-disabled="{{self.disabled}}" data-selected="{{self.selected}}" data-group="{{self.header}}">
                            <div><img :src="self.image" /> <div>{{self.text}}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    lemonade.setComponents({ Dropdown: Dropdown });

    lemonade.createWebComponent('dropdown', Dropdown);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Dropdown, root, options)
            return options;
        } else {
            return Dropdown.call(this, root)
        }
    }
})));

/***/ }),

/***/ 72:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * pin the modal to the left panel
 */
if (!lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    // References
    const modals = [];
    // State of the resize and move modal
    let state = {};
    // Internal controls of the action of resize and move
    let controls = {};
    // Width of the border
    let cornerSize = 10;
    // Container with minimized modals
    const minimizedModals = [];
    // Default z-index for the modals
    const defaultZIndex = 20;

    /**
     * Send the modal to the front
     * @param container
     */
    const sendToFront = function(container) {
        let highestXIndex = defaultZIndex;
        for (let i = 0; i < modals.length; i++) {
            const zIndex = parseInt(modals[i].el.style.zIndex);
            if (zIndex > highestXIndex) {
                highestXIndex = zIndex;
            }
        }
        container.style.zIndex = highestXIndex + 1;
    }

    /**
     * Send modal to the back
     * @param container
     */
    const sendToBack = function(container) {
        container.style.zIndex = defaultZIndex;
    }

    // Get the coordinates of the action
    const getCoords = function(e) {
        let x;
        let y;

        if (e.changedTouches && e.changedTouches[0]) {
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        return [x,y];
    }

    // Get the button status
    const getButton = function(e) {
        e = e || window.event;
        if (e.buttons) {
            return e.buttons;
        } else if (e.button) {
            return e.button;
        } else {
            return e.which;
        }
    }

    // Finalize any potential action
    const mouseUp = function(e) {
        // Finalize all actions
        if (typeof(controls.action) === 'function') {
            controls.action();
        }
        setTimeout(function() {
            // Remove cursor
            if (controls.e) {
                controls.e.style.cursor = '';
            }
            // Reset controls
            controls = {};
            // Reset state controls
            state = {
                x: null,
                y: null,
            }
        }, 0)
    }

    const mouseMove = function(e) {
        if (! getButton(e)) {
            return false;
        }
        // Get mouse coordinates
        let [x,y] = getCoords(e);

        // Move modal
        if (controls.type === 'move') {
            if (state && state.x == null && state.y == null) {
                state.x = x;
                state.y = y;
            }

            let dx = x - state.x;
            let dy = y - state.y;
            let top = controls.e.offsetTop + dy;
            let left = controls.e.offsetLeft + dx;

            // Update position
            controls.top = top;
            controls.left = left;
            controls.e.style.top = top + 'px';
            controls.e.style.left = left + 'px';

            state.x = x;
            state.y = y;
            state.top = top;
            state.left = left;
        } else if (controls.type === 'resize') {
            let top = null;
            let left = null;
            let width = null;
            let height = null;

            if (controls.d === 'e-resize' || controls.d === 'ne-resize' || controls.d === 'se-resize') {
                width = controls.w + (x - controls.x);

                if (e.shiftKey) {
                    height = controls.h + (x - controls.x) * (controls.h / controls.w);
                }
            } else if (controls.d === 'w-resize' || controls.d === 'nw-resize'|| controls.d === 'sw-resize') {
                left = controls.l + (x - controls.x);
                // Do not move further
                if (left >= controls.l) {
                    left = controls.l;
                }
                // Update width
                width = controls.l + controls.w - left;
                // Consider shift to update height
                if (e.shiftKey) {
                    height = controls.h - (x - controls.x) * (controls.h / controls.w);
                }
            }

            if (controls.d === 's-resize' || controls.d === 'se-resize' || controls.d === 'sw-resize') {
                if (! height) {
                    height = controls.h + (y - controls.y);
                }
            } else if (controls.d === 'n-resize' || controls.d === 'ne-resize' || controls.d === 'nw-resize') {
                top = controls.t + (y - controls.y);
                // Do not move further
                if (top >= controls.t) {
                    top = controls.t;
                }
                // Update height
                height = controls.t + controls.h - top;
            }

            if (top) {
                controls.e.style.top = top + 'px';
            }
            if (left) {
                controls.e.style.left = left + 'px';
            }
            if (width) {
                controls.e.style.width = width + 'px';
            }
            if (height) {
                controls.e.style.height = height + 'px';
            }
        }
    }

    if (typeof(document) !== "undefined") {
        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('mousemove', mouseMove);
    }

    const isTrue = function(e) {
        return e === true || e === 1 || e === 'true';
    }

    const refreshMinimized = function() {
        let items = minimizedModals;
        let numOfItems = items.length;
        let width = 10;
        let height = 55;
        let offsetWidth = window.innerWidth;
        let offsetHeight = window.innerHeight;
        for (let i = 0; i < numOfItems; i++) {
            let item = items[i];
            item.el.style.left = width + 'px';
            item.el.style.top = offsetHeight - height + 'px';
            width += 205;

            if (offsetWidth - width < 205) {
                width = 10;
                height += 50;
            }
        }
    }

    const delayAction = function(self, action) {
        // Make sure to remove the transformation before minimize to preserve the animation
        if (self.el.style.marginLeft || self.el.style.marginTop) {
            // Make sure no animation during this process
            self.el.classList.add('action');
            // Remove adjustment
            removeMargin(self);
            // Make sure to continue with minimize
            setTimeout(function() {
                // Remove class
                self.el.classList.remove('action');
                // Call action
                action(self);
            },0)

            return true;
        }
    }

    const setMini = function(self) {
        if (delayAction(self, setMini)) {
            return;
        }

        // Minimize modals
        minimizedModals.push(self);

        self.el.top = self.el.offsetTop;
        self.el.left = self.el.offsetLeft;

        if (! self.el.style.top) {
            self.el.style.top = self.el.top + 'px';
        }
        if (! self.el.style.left) {
            self.el.style.left = self.el.left + 'px';
        }

        self.el.translateY = 0;
        self.el.translateX = 0;

        // Refresh positions
        setTimeout(function() {
            refreshMinimized();
            self.minimized = true;
        },10)
    }

    const removeMini = function(self) {
        minimizedModals.splice(minimizedModals.indexOf(self), 1);
        self.minimized = false;
        self.el.style.top = self.el.top + 'px';
        self.el.style.left = self.el.left + 'px';
        // Refresh positions
        setTimeout(() => {
            refreshMinimized();
        }, 10);
        // Refresh positions
        setTimeout(() => {
            if (self.top === '') {
                self.el.style.top = '';
            }
            if (self.left === '') {
                self.el.style.left = '';
            }
        }, 400);
    }

    const removeMargin = function(self) {
        if (self.el.style.marginLeft) {
            let y = self.el.offsetLeft;
            self.el.style.marginLeft = '';
            self.left = y;
        }

        if (self.el.style.marginTop) {
            let x = self.el.offsetTop;
            self.el.style.marginTop = '';
            self.top = x;
        }
    }

    const adjustHorizontal = function(self) {
        if (! isTrue(self['auto-adjust'])) {
            return false;
        }

        self.el.style.marginLeft = '';
        let viewportWidth = window.innerWidth;
        let margin = 10;

        if (self.position) {
            if (self.position === 'absolute') {
                let w = document.documentElement.offsetWidth;
                if (w > viewportWidth) {
                    //viewportWidth = w;
                }
            } else if (self.position !== 'center') {
                margin = 0;
            }
        }

        let el = self.el.getBoundingClientRect();

        let rightEdgeDistance = viewportWidth - (el.left + el.width);
        let transformX = 0;

        if (self.position === 'absolute') {
            if (rightEdgeDistance < 0) {
                transformX = rightEdgeDistance - margin - 10; // 10 is the scroll width
            }
        } else {
            if (rightEdgeDistance < 0) {
                transformX = rightEdgeDistance - margin;
            }
        }

        if (el.left < 0) {
            transformX = margin - el.left;
        }
        if (transformX !== 0) {
            self.el.style.marginLeft = transformX + 'px';
        }
    }

    const adjustVertical = function(self) {
        if (! isTrue(self['auto-adjust'])) {
            return false;
        }

        self.el.style.marginTop = '';
        let viewportHeight = window.innerHeight;
        let margin = 10;

        if (self.position) {
            if (self.position === 'absolute') {
                let h = document.documentElement.offsetHeight;
                if (h > viewportHeight) {
                    //viewportHeight = h;
                }
            } else if (self.position !== 'center') {
                margin = 0;
            }
        }

        let el = self.el.getBoundingClientRect();

        let bottomEdgeDistance = viewportHeight - (el.top + el.height);
        let transformY = 0;

        if (self.position === 'absolute') {
            if (bottomEdgeDistance < 5) {
                transformY = (-1 * el.height) - margin - 12;
                if (el.top + transformY < 0) {
                    transformY = -el.top + 10;
                }
            }
        } else {
            if (bottomEdgeDistance < 0) {
                transformY = bottomEdgeDistance - margin;
            }
        }

        if (el.top < 0) {
            transformY = margin - el.top;
        }
        if (transformY !== 0) {
            self.el.style.marginTop = transformY + 'px';
        }
    }

    const removeElements = function(root) {
        // Keep the DOM elements
        let elements = [];
        if (root) {
            while (root.firstChild) {
                elements.push(root.firstChild);
                root.firstChild.remove();
            }
        }
        return elements;
    }

    const appendElements = function(root, elements) {
        if (elements && elements.length) {
            while (elements[0]) {
                root.appendChild(elements.shift());
            }
        }
    }

    const Modal = function (template, { onchange, onload }) {
        let self = this;
        let backdrop = null;
        let elements = null;

        if (this.tagName) {
            // Remove elements from the DOM
            elements = removeElements(this);

            this.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        }

        // Make sure keep the state as boolean
        self.closed = !! self.closed;

        // Keep all modals references
        modals.push(self);

        // External onload remove from the lifecycle
        let change = self.onchange;
        self.onchange = null;

        let load = self.onload;
        self.onload = null;

        let ignoreEvents = false;

        const click = function(e) {
            if (e.target.classList.contains('lm-modal-close')) {
                self.close({ origin: 'button' });
            }

            if (e.target.classList.contains('lm-modal-minimize')) {
                // Handles minimized modal positioning
                if (self.minimized === true) {
                    removeMini(self);
                } else {
                    setMini(self);
                }
            }
        }

        const mousemove = function(e) {
            if (getButton(e)) {
                return;
            }

            // Get mouse coordinates
            let [x,y] = getCoords(e);
            // Root element of the component
            let item = self.el;
            // Get the position and dimensions
            let rect = item.getBoundingClientRect();

            controls.type = null;
            controls.d = null;
            controls.e = item;
            controls.w = rect.width;
            controls.h = rect.height;
            controls.t = rect.top;
            controls.l = rect.left;

            // When resizable
            if (isTrue(self.resizable)) {
                if (e.clientY - rect.top < cornerSize) {
                    if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'ne-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'nw-resize';
                    } else {
                        item.style.cursor = 'n-resize';
                    }
                } else if (rect.height - (e.clientY - rect.top) < cornerSize) {
                    if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'se-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'sw-resize';
                    } else {
                        item.style.cursor = 's-resize';
                    }
                } else if (rect.width - (e.clientX - rect.left) < cornerSize) {
                    item.style.cursor = 'e-resize';
                } else if (e.clientX - rect.left < cornerSize) {
                    item.style.cursor = 'w-resize';
                } else {
                    item.style.cursor = '';
                }

                if (item.style.cursor) {
                    controls.type = 'resize';
                    controls.d = item.style.cursor;
                } else {
                    controls.type = null;
                    controls.d = null;
                }
            }

            if (controls.type == null && isTrue(self.draggable)) {
                if (y - rect.top < 40) {
                    item.style.cursor = 'move';
                } else {
                    item.style.cursor = '';
                }

                if (item.style.cursor) {
                    controls.type = 'move';
                    controls.d = item.style.cursor;
                } else {
                    controls.type = null;
                    controls.d = null;
                }
            }
        }

        const mousedown = function(e) {
            if (! self.minimized) {
                // Get mouse coordinates
                let [x,y] = getCoords(e);
                controls.x = x;
                controls.y = y;
                // Root element of the component
                let item = self.el;
                // Get the position and dimensions
                let rect = item.getBoundingClientRect();
                controls.e = item;
                controls.w = rect.width;
                controls.h = rect.height;
                controls.t = rect.top;
                controls.l = rect.left;
                // If is not minimized
                if (controls.type === 'resize') {
                    // Make sure the width and height is defined for the modal
                    if (! item.style.width) {
                        item.style.width = controls.w + 'px';
                    }
                    if (! item.style.height) {
                        item.style.height = controls.h + 'px';
                    }
                    // This will be the callback when finalize the resize
                    controls.action = function () {
                        self.width = parseInt(item.style.width);
                        self.height = parseInt(item.style.height);
                        controls.e.classList.remove('action');
                        // Event
                        Dispatch.call(self, self.onresize, 'resize', {
                            instance: self,
                            width: self.width,
                            height: self.height,
                        });
                    }
                    controls.e.classList.add('action');
                } else if (isTrue(self.draggable) && y - rect.top < 40) {
                    // Callback
                    controls.action = function () {
                        self.top = parseInt(item.style.top);
                        self.left = parseInt(item.style.left);
                        controls.e.classList.remove('action');
                        // Open event
                        Dispatch.call(self, self.onmove, 'move', {
                            instance: self,
                            top: self.top,
                            left: self.left,
                        });
                    }
                    controls.e.classList.add('action');
                    // Remove transform
                    removeMargin(self);
                }
            }
        }

        self.back = function() {
            sendToBack(self.el);
        }

        self.front = function() {
            sendToFront(self.el);
        }

        self.open = function() {
            if (self.closed === true) {
                self.closed = false;
                // Close event
                Dispatch.call(self, self.onopen, 'open', {
                    instance: self
                });
            }
        }

        self.close = function(options) {
            if (self.closed === false) {
                self.closed = true;
                // Close event
                Dispatch.call(self, self.onclose, 'close', {
                    instance: self,
                    ...options
                });
            }
        }

        self.isClosed = function() {
            return self.closed;
        }

        if (! template || typeof(template) !== 'string') {
            template = '';
        }

        // Custom Root Configuration
        self.settings = {
            getRoot: function() {
                return self.root;
            }
        }

        // Native lemonade
        onload(() => {
            // Dimensions
            if (self.width) {
                self.el.style.width = self.width + 'px';
            }
            if (self.height) {
                self.el.style.height = self.height + 'px';
            }
            // Position
            if (self.top) {
                self.el.style.top = self.top + 'px';
            }
            if (self.left) {
                self.el.style.left = self.left + 'px';
            }

            if (self.position === 'absolute' || self.position === 'right' || self.position === 'bottom' || self.position === 'left') {

            } else {
                if (!self.width && self.el.offsetWidth) {
                    self.width = self.el.offsetWidth;
                }
                if (!self.height && self.el.offsetHeight) {
                    self.height = self.el.offsetHeight;
                }

                // Initial centralize
                if (self.position === 'center' || !self.top) {
                    self.top = (window.innerHeight - self.height) / 2;
                }
                if (self.position === 'center' || !self.left) {
                    self.left = (window.innerWidth - self.width) / 2;
                }

                // Responsive
                if (document.documentElement.clientWidth < 800) {
                    // Full screen
                    if (self.height > 300) {
                        self.el.classList.add('fullscreen');
                    }
                }
            }

            // Auto adjust
            adjustHorizontal(self);
            adjustVertical(self);

            // Backdrop
            if (self.backdrop === true) {
                backdrop = document.createElement('div');
                backdrop.classList.add('lm-modal-backdrop');
                backdrop.addEventListener('click', () => {
                    self.close({ origin: 'backdrop' });
                });

                if (self.closed === false) {
                    self.el.parentNode.insertBefore(backdrop, self.el);
                }
            }

            // Import content from DOM
            if (self.content) {
                if (typeof(self.content) === 'string') {
                    template = self.content;
                } else if (typeof(self.content) === 'object' && self.content.tagName) {
                    self.root.appendChild(self.content);
                }
            }

            // Focus out of the component
            self.el.addEventListener('focusout', function(e) {
                if (! self.el.contains(e.relatedTarget)) {
                    if (isTrue(self['auto-close'])) {
                        self.close({ origin: 'focusout' });
                    }
                    // Remove focus
                    self.el.classList.remove('lm-modal-focus');
                }
            });

            // Focus out of the component
            self.el.addEventListener('focusin', function(e) {
                self.el.classList.add('lm-modal-focus');
            });

            // Close and stop propagation
            self.el.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (self.closed === false) {
                        self.close({ origin: 'escape' });
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                } else if (e.key === 'Enter') {
                    click(e);
                }
            });

            // Append elements to the container
            appendElements(self.el.children[1], elements);

            if (self.url) {
                fetch(self.url)
                    .then(response => response.clone().body)
                    .then(body => {
                        let reader = body.getReader();
                        reader.read().then(({ done, value }) => {
                            // Add HTML to the modal
                            self.root.innerHTML = new TextDecoder().decode(value.buffer);
                            // Call onload event
                            Dispatch.call(self, load, 'load', {
                                instance: self
                            });
                        });
                    });
            } else {
                // Call onload event
                Dispatch.call(self, load, 'load', {
                    instance: self
                });
            }
        });

        onchange((property) => {
            if (ignoreEvents) {
                return false;
            }

            if (property === 'closed') {
                if (self.closed === false) {
                    // Focus on the modal
                    if (self.focus !== false) {
                        self.el.focus();
                    }
                    // Show backdrop
                    if (backdrop) {
                        self.el.parentNode.insertBefore(backdrop, self.el);
                    }

                    // Auto adjust
                    queueMicrotask(() => {
                        adjustHorizontal(self);
                        adjustVertical(self);
                    });
                } else {
                    // Hide backdrop
                    if (backdrop) {
                        backdrop.remove();
                    }
                }
            } else if (property === 'top' || property === 'left' || property === 'width' || property === 'height') {
                if (self[property] !== '') {
                    self.el.style[property] = self[property] + 'px';
                } else {
                    self.el.style[property] = '';
                }

                if (self.closed === false) {
                    queueMicrotask(() => {
                        if (property === 'top') {
                            adjustVertical(self);
                        }
                        if (property === 'left') {
                            adjustHorizontal(self);
                        }
                    });
                }
            } else if (property === 'position') {
                if (self.position) {
                    if (self.position === 'center') {
                        self.top = (window.innerHeight - self.el.offsetHeight) / 2;
                        self.left = (window.innerWidth - self.el.offsetWidth) / 2;
                    } else {
                        self.top = '';
                        self.left = '';
                    }
                } else {
                    if (! self.top) {
                        self.top = (window.innerHeight - self.el.offsetHeight) / 2;
                    }
                    if (! self.left) {
                        self.left = (window.innerWidth - self.el.offsetWidth) / 2;
                    }
                }
            }
        });

        return render => render`<div class="lm-modal" animation="{{self.animation}}" position="{{self.position}}" closed="{{self.closed}}" closable="{{self.closable}}" minimizable="{{self.minimizable}}" minimized="{{self.minimized}}" overflow="{{self.overflow}}" :top="self.top" :left="self.left" :width="self.width" :height="self.height" tabindex="-1" role="modal" onmousedown="${mousedown}" onmousemove="${mousemove}" onclick="${click}">
            <div class="lm-modal-title" data-title="{{self.title}}" data-icon="{{self.icon}}"><div class="lm-modal-icon">{{self.icon}}</div><div>{{self.title}}</div><div class="lm-modal-icon lm-modal-minimize" tabindex="0"></div><div class="lm-modal-icon lm-modal-close" tabindex="0"></div></div>
            <div :ref="self.root">${template}</div>
        </div>`
    }

    const Component = function (root, options) {
        if (typeof(root) === 'object') {
            // Remove elements from the DOM
            let elements = removeElements(root);
            // Create the modal
            let e = lemonade.render(Modal, root, options);
            // Add elements to the container
            appendElements(e.children[1], elements);

            return options;
        } else {
            return Modal.call(this);
        }
    }

    // Create LemonadeJS Component
    lemonade.setComponents({ Modal: Modal });
    // Create Web Component
    lemonade.createWebComponent('modal', Modal)

    return Component;
})));

/***/ }),

/***/ 867:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (!lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    const Rating = function(children, { onchange, onload }) {
        let self = this;

        // Event
        let change = self.onchange;
        self.onchange = null;

        if (! self.number) {
            self.number = 5;
        }

        self.stars = [];

        // Current self star
        let current = null;

        /**
         * Update the number of stars
         */
        const len = function () {
            // Remove stars
            if (self.number < self.stars.length) {
                self.stars.splice(self.number, self.stars.length);
                if (self.value > self.number) {
                    self.value = self.number;
                }
            }
            // Add missing stars
            for (let i = 0; i < self.number; i++) {
                if (! self.stars[i]) {
                    self.stars[i] = {
                        icon: 'star',
                    };
                    if (self.tooltip[i]) {
                        self.stars[i].title = self.tooltip[i];
                    }
                }
            }
            // Refresh
            self.refresh('stars');
        }

        const val = function (index, events) {
            if (typeof(index) === 'string') {
                index = Number(index);
            }
            // Apply value to the selected property in each star
            for (let i = 0; i < self.number; i++) {
                self.stars[i].selected = i <= index - 1 ? 1 : 0;
            }
            // Keep current value
            current = index;
            // Dispatch method
            if (events !== false) {
                Dispatch.call(self, change, 'change', {
                    instance: self,
                    value: index,
                });
            }
        }

        const getElementPosition = function(child) {
            if (child.tagName === 'I') {
                let root = self.el;
                for (let i = 0; i < root.children.length; i++) {
                    let c = root.children[i];
                    if (c === child) {
                        return i;
                    }
                }
            }
            return -1;
        }

        const click = function(e, s) {
            let ret = getElementPosition(e.target);
            if (ret !== -1) {
                let index = ret + 1;
                if (index === current) {
                    index = 0;
                }
                self.value = index;
            }
        }

        const mouseover = function(e, s) {
            let index = getElementPosition(e.target);
            if (index !== -1) {
                for (let i = 0; i < self.number; i++) {
                    if (i <= index) {
                        self.stars[i].hover = 1;
                    } else {
                        self.stars[i].hover = 0;
                    }
                }
            }
        }

        const mouseout = function(e, s) {
            for (let i = 0; i < self.number; i++) {
                self.stars[i].hover = 0;
            }
        }

        onchange((prop) => {
            if (prop === 'number') {
                len();
            } else if (prop === 'value') {
                val(self.value);
            } else if (prop === 'tooltip') {
                if (typeof(self.tooltip) === 'string') {
                    self.tooltip = self.tooltip.split(',')
                }
                len();
            }
        })

        onload(() => {
            // Bind global method to be compatible with LemonadeJS forms
            self.el.val = function (v) {
                if (typeof (v) === 'undefined') {
                    return self.value;
                } else {
                    self.value = v;
                }
            }

            if (self.tooltip && typeof(self.tooltip) === 'string') {
                self.tooltip = self.tooltip.split(',')
            } else {
                self.tooltip = '';
            }
            len();
            // Ignore events
            val(self.value, false);

            self.el.addEventListener('click', click);
            self.el.addEventListener('mouseout', mouseout);
            self.el.addEventListener('mouseover', mouseover);
        });

        self.getValue = function () {
            return Number(self.value);
        }

        self.setValue = function (index) {
            self.value = index;
        }

        return `<div class="lm-rating" value="{{self.value}}" number="{{self.number}}" name="{{self.name}}" data-size="{{self.size}}" :loop="self.stars">
            <i class="material-symbols-outlined material-icons" data-selected="{{self.selected}}" data-hover="{{self.hover}}" title="{{self.title}}">star</i>
        </div>`;
    }

    // Register the LemonadeJS Component
    lemonade.setComponents({ Rating: Rating });
    // Register the web component
    lemonade.createWebComponent('rating', Rating);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Rating, root, options)
            return options;
        } else {
            return Rating.call(this, root)
        }
    }

})));

/***/ }),

/***/ 539:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (!lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    const Switch = function (children, { onchange, onload }) {
        let self = this;

        // Event
        let change = self.onchange;
        self.onchange = null;

        const state = () => {
            let s = self.el.firstChild.checked;
            if (s !== self.checked) {
                self.checked = s;
            }
        }

        onchange((prop, a, b, c, d) => {
            if (a !== b) {
                Dispatch.call(self, change, 'change', {
                    instance: self,
                    value: self.value,
                });
            }

            state();
        })

        onload(state);

        return render => render`<label class="lm-switch" position="{{self.position}}" data-color="{{self.color}}">
            <input type="checkbox" name="{{self.name}}" disabled="{{self.disabled}}" checked="{{self.checked}}" :bind="self.value" /> <span>{{self.text}}</span>
        </label>`
    }

    // Create LemonadeJS references
    lemonade.setComponents({ Switch: Switch });
    // Create web-component
    lemonade.createWebComponent('switch', Switch);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Switch, root, options)
            return options;
        } else {
            return Switch.call(this, root);
        }
    }

})));

/***/ }),

/***/ 560:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (! lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    class CustomEvents extends Event {
        constructor(type, props, options) {
            super(type, {
                bubbles: true,
                composed: true,
                ...options,
            });

            if (props) {
                for (const key in props) {
                    // Avoid assigning if property already exists anywhere on `this`
                    if (! (key in this)) {
                        this[key] = props[key];
                    }
                }
            }
        }
    }

    // Dispatcher
    const Dispatch = function(method, type, options) {
        // Try calling the method directly if provided
        if (typeof method === 'function') {
            let a = Object.values(options);
            return method(...a);
        } else if (this.tagName) {
            this.dispatchEvent(new CustomEvents(type, options));
        }
    }

    const extract = function(root, self) {
        if (! Array.isArray(self.data)) {
            self.data = [];
        }

        if (root.tagName) {
            for (let i = 0; i < root.children.length; i++) {
                self.data.push({
                    el: root.children[i],
                })
            }
        } else {
            root.forEach((child) => {
                self.data.push({
                    el: child.element,
                })
            });
        }
    }

    const sorting = function(el, options) {
        const obj = {};

        let dragElement = null;

        el.addEventListener('dragstart', function(e) {
            let target = e.target;
            if (target.nodeType === 3) {
                if (target.parentNode.getAttribute('draggable') === 'true') {
                    target = target.parentNode;
                } else {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
            }

            if (target.getAttribute('draggable') === 'true') {
                let position = Array.prototype.indexOf.call(target.parentNode.children, target);
                dragElement = {
                    element: target,
                    o: position,
                    d: position
                }
                target.style.opacity = '0.25';
                e.dataTransfer.setDragImage(target,0,0);
            }
        });

        el.addEventListener('dragover', function(e) {
            e.preventDefault();

            if (dragElement && getElement(e.target) && e.target.getAttribute('draggable') == 'true' && dragElement.element != e.target) {
                let element = e.target.clientWidth / 2 > e.offsetX ? e.target : e.target.nextSibling;
                e.target.parentNode.insertBefore(dragElement.element, element);
                dragElement.d = Array.prototype.indexOf.call(e.target.parentNode.children, dragElement.element);
            }
        });

        el.addEventListener('dragleave', function(e) {
            e.preventDefault();
        });

        el.addEventListener('dragend', function(e) {
            e.preventDefault();

            if (dragElement) {
                let element = dragElement.o < dragElement.d ? e.target.parentNode.children[dragElement.o] : e.target.parentNode.children[dragElement.o].nextSibling
                e.target.parentNode.insertBefore(dragElement.element, element);
                dragElement.element.style.opacity = '';
                dragElement = null;
            }
        });

        el.addEventListener('drop', function(e) {
            e.preventDefault();

            if (dragElement) {
                if (dragElement.o !== dragElement.d) {
                    if (typeof(options.ondrop) == 'function') {
                        options.ondrop(el, dragElement.o, dragElement.d, dragElement.element, e.target, e);
                    }
                }

                dragElement.element.style.opacity = '';
                dragElement = null;
            }
        });

        const getElement = function(element) {
            var sorting = false;

            function path (element) {
                if (element === el) {
                    sorting = true;
                }

                if (! sorting) {
                    path(element.parentNode);
                }
            }

            path(element);

            return sorting;
        }

        for (let i = 0; i < el.children.length; i++) {
            if (! el.children[i].hasAttribute('draggable')) {
                el.children[i].setAttribute('draggable', 'true');
            }
        }

        return el;
    }

    const Tabs = function(children, { onchange, onload }) {
        let self = this

        // Event
        let change = self.onchange;
        self.onchange = null;

        // Add new tab
        let createButton;

        // Get the references from the root web component
        let root;
        let template = '';
        if (this.tagName) {
            root = this;
        } else {
            // References from LemonadeJS
            if (typeof(children) === 'string') {
                // Version 4
                template = children;
            } else if (children && children.length) {
                // Version 5
                root = children;
            }
        }

        if (root) {
            extract(root, self);
        }

        // Process the data
        if (self.data) {
            for (let i = 0; i < self.data.length; i++) {
                if (! self.data[i].el) {
                    // Create element
                    self.data[i].el = document.createElement('div');
                    // Create from content
                    if (self.data[i].content) {
                        self.data[i].el.innerHTML = self.data[i].content;
                    }
                }
            }
        }

        let props = ['title', 'selected', 'data-icon'];

        const select = function(index) {
            // Make sure the index is a number
            index = parseInt(index);
            // Do not select tabs that does not exist
            if (index >= 0 && index < self.data.length) {
                for (let i = 0; i < self.root.children.length; i++) {
                    self.headers.children[i].classList.remove('selected');
                    self.root.children[i].classList.remove('selected');
                }
                self.headers.children[index].classList.add('selected');
                self.root.children[index].classList.add('selected');
            }
        }

        const init = function(selected) {
            let tabs = [];

            for (let i = 0; i < self.data.length; i++) {
                // Extract meta information from the DOM
                if (props) {
                    props.forEach((prop) => {
                        let short = prop.replace('data-', '');
                        if (! self.data[i][short]) {
                            let ret = self.data[i].el.getAttribute(prop);
                            if (ret != null) {
                                self.data[i][short] = ret;
                            }
                        }
                    });
                }
                // Create tabs object
                tabs[i] = {
                    title: self.data[i].title,
                }
                // Which one is selected by default
                if (self.data[i].selected) {
                    selected = i;
                }
                if (self.data[i].icon) {
                    tabs[i].icon = self.data[i].icon;
                }

                self.root.appendChild(self.data[i].el);
            }

            // Create headers
            self.tabs = tabs;

            // Default selected
            if (typeof(selected) !== 'undefined') {
                self.selected = selected;
            }

            if (props) {
                // Add create new tab button
                if (createButton) {
                    self.headers.appendChild(createButton);
                }
                // Add sorting
                sorting(self.el.firstChild.firstChild, {
                    ondrop: (el, fromIndex, toIndex) => {
                        // Remove the item from its original position
                        const [movedItem] = self.data.splice(fromIndex, 1);
                        // Insert it into the new position
                        self.data.splice(toIndex, 0, movedItem);
                        // Make sure correct order
                        for (let i = 0; i < self.data.length; i++) {
                            self.root.appendChild(self.data[i].el);
                        }
                        // Select new position
                        self.selected = toIndex;
                        // Dispatch event
                        Dispatch.call(self, self.onchangeposition, 'changeposition', {
                            instance: self,
                            fromIndex: fromIndex,
                            toIndex: toIndex,
                        });
                    }
                })
            }

            props = null;
        }

        const create = function() {
            // Create a new item
            self.create({ title: 'Untitled' }, null, true);
        }

        const open = function(e) {
            if (e.target.tagName === 'LI') {
                // Avoid select something already selected
                let index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
                if (index !== self.selected) {
                    self.selected = index;
                }
            }
        }

        const keydown = function(e, s) {
            let index = null;
            if (e.key === 'Enter') {
                self.click(e, s);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                index = self.selected - 1;
                if (index < 0) {
                    index = 0;
                }
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                index = self.selected + 1;
                if (index > self.tabs.length-1) {
                    index = self.tabs.length-1;
                }
            }

            // Make selection
            if (index !== null) {
                self.tabs[index].el.focus();
            }
        }

        onload(() => {
            if (template) {
                extract(self.root, self);
            }

            init(self.selected || 0);
        })

        onchange((property) => {
            if (property === 'selected') {
                select(self.selected);

                Dispatch.call(self, self.onopen, 'open', {
                    instance: self,
                    selected: self.selected,
                });

                Dispatch.call(self, change, 'change', {
                    instance: self,
                    value: self.selected,
                });
            }
        })

        self.open = function (index) {
            self.selected = index;
        }

        self.create = function(item, position, select) {
            // Create element
            if (typeof(item) !== 'object') {
                console.error('Item must be an object');
            } else {

                let ret = Dispatch.call(self, self.onbeforecreate, 'beforecreate', {
                    instance: self,
                    item: item,
                    position: position,
                });

                if (ret === false) {
                    return false;
                }

                // Create DOM
                item.el = document.createElement('div');
                // Create from content
                if (item.content) {
                    item.el.innerHTML = item.content;
                }

                // Add the new item in the end
                if (typeof(position) === 'undefined' || position === null) {
                    // Mew item
                    position = self.data.length;
                    // Add in the end
                    self.data.push(item);
                } else {
                    self.data.splice(position, 0, item);
                }
                // New position
                if (select) {
                    // Refresh
                    init(self.data.indexOf(item));
                } else {
                    init(self.selected);
                }

                self.tabs.forEach(item => {
                    item.el.setAttribute('draggable', 'true');
                })

                Dispatch.call(self, self.oncreate, 'create', {
                    instance: self,
                    item: item,
                    position: position,
                });
            }
        }

        self.allowCreate = !! self.allowCreate;

        return render => render`<div class="lm-tabs" data-position="{{self.position}}" data-round="{{self.round}}">
            <div role="tabs" class="lm-tabs-headers">
                <ul :ref="self.headers" :loop="self.tabs" :selected="self.selected" onclick="${open}" onkeydown="${keydown}" onfocusin="${open}"><li class="lm-tab" tabindex="0" role="tab" data-icon="{{self.icon}}">{{self.title}}</li></ul>
                <div data-visible="{{self.allowCreate}}" class="lm-tabs-insert-button" role="insert-tab" onclick="${create}">add</div>
            </div>
            <div :ref="self.root" class="lm-tabs-content">${template}</div>
        </div>`
    }

    lemonade.setComponents({ Tabs: Tabs });

    lemonade.createWebComponent('tabs', Tabs);

    return function (root, options) {
        if (typeof (root) === 'object') {
            if (typeof(options) !== 'object') {
                options = {};
            }
            // Extract DOM references
            extract(root, options);
            // Create the modal
            lemonade.render(Tabs, root, options);
            // Return self
            return options;
        } else {
            return Tabs.call(this);
        }
    };
})));

/***/ }),

/***/ 330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

if (!lemonade && "function" === 'function') {
    var lemonade = __webpack_require__(966);
}

if (! Contextmenu && "function" === 'function') {
    var Contextmenu = __webpack_require__(238);
}

; (function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    const Topmenu = function(children, { onload, onchange }) {
        let self = this;

        // Current selection
        let currentIndex = null;

        const getElementPosition = function(child) {
            let root = self.el.children[0];
            for (let i = 0; i < root.children.length; i++) {
                let c = root.children[i];
                if (c === child) {
                    return i;
                }
            }
            return -1;
        }

        const select = function(e, s) {
            if (! self.menu.isClosed()) {
                let index = self.options.indexOf(s);
                if (index !== currentIndex) {
                    open(index);
                }
            }
        }

        const deselect = function() {
            if (self.options) {
                self.options.forEach(v => v.selected = false);
            }
        }

        const selectIndex = function(newIndex) {
            if (self.options) {
                let s = self.options[newIndex];
                if (s && ! s.disabled) {
                    deselect();
                    // Make it selected
                    s.selected = true;
                    // New index
                    currentIndex = newIndex;
                    // Focus
                    s.el.focus();
                }
            }
        }

        const open = function(index) {
            // Update cursor position
            selectIndex(index);
            let s = self.options[currentIndex];
            if (s && s.submenu) {
                let x = s.el.offsetLeft;
                let y = s.el.offsetTop + s.el.offsetHeight + 2;
                self.menu.open(s.submenu, x, y);
                s.expanded = true;
            }
        }

        const close = function() {
            self.menu.close(0);
            let s = self.options[currentIndex];
            if (s) {
                s.el.focus();
                s.expanded = false;
            }
        }

        const toggle = function(e, s) {
            if (s.submenu && ! s.disabled) {
                let index = self.options.indexOf(s);
                if (index === currentIndex && ! self.menu.isClosed()) {
                    close();
                } else {
                    open(index);
                }
                cancel(e);
            }
        }

        const findNextEnabledIndex = function(startIndex) {
            if (!self.options || self.options.length === 0) {
                return null;
            }
            
            let index = startIndex;
            let attempts = 0;
            const maxAttempts = self.options.length;
            
            while (attempts < maxAttempts) {
                if (index >= self.options.length) {
                    index = 0;
                }
                if (!self.options[index].disabled) {
                    return index;
                }
                index++;
                attempts++;
            }
            return null;
        };

        const findPreviousEnabledIndex = function(startIndex) {
            if (!self.options || self.options.length === 0) {
                return null;
            }
            
            let index = startIndex;
            let attempts = 0;
            const maxAttempts = self.options.length;
            
            while (attempts < maxAttempts) {
                if (index < 0) {
                    index = self.options.length - 1;
                }
                if (!self.options[index].disabled) {
                    return index;
                }
                index--;
                attempts++;
            }
            return null;
        };

        const adjustOptionProperties = function() {
            if (self.options) {
                self.options.forEach(v => {
                    v.haspopup = !!v.submenu;
                    v.expanded = false;

                    if (v.disabled) {
                        v.el.removeAttribute('tabindex');
                    } else {
                        v.el.setAttribute('tabindex', '0');
                    }
                })
            }
        };

        /**
         * Open a submenu programaticaly. Default 0
         * @param {number} index
         */
        self.open = function(index) {
            if (typeof index === 'undefined') {
                index = currentIndex;
            }
            if (! index) {
                index = 0;
            }

            let s = self.options[index];
            if (s) {
                open(index);
            }
        }

        onchange((prop) => {
            if (prop === 'options') {
                adjustOptionProperties();
            }
        });

        // Keyboard event
        onload(() => {
            self.el.addEventListener("focusin", function(e) {
                let index = getElementPosition(e.target);
                if (index !== -1) {
                    if (e.relatedTarget === self.menu.el) {
                        close();
                    } else {
                        selectIndex(index);
                    }
                }
            });

            self.el.addEventListener("focusout", function(e) {
                if (! (e.relatedTarget && self.el.contains(e.relatedTarget))) {
                    if (self.options[currentIndex]) {
                        self.options[currentIndex].selected = false;
                    }
                }
            });

            self.el.addEventListener("keydown", function(e) {
                let o = self.options;
                // Select top menu
                let select = null;

                if (e.key === 'Enter') {
                    toggle(e, o[currentIndex])
                } else if (e.key === 'ArrowLeft') {
                    select = findPreviousEnabledIndex(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    select = findNextEnabledIndex(currentIndex + 1);
                }

                if (select !== null) {
                    if (self.menu.isClosed()) {
                        selectIndex(select);
                    } else {
                        open(select);
                    }
                }
            });

            adjustOptionProperties();
        });

        const cancel = function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        return render => render`<div class="lm-topmenu" role="menubar" aria-orientation="horizontal" oncontextmenu="${cancel}">
            <div class="lm-topmenu-options" :loop="self.options">
                <div class="lm-topmenu-title" role="menuitem" data-disabled="{{self.disabled}}" data-selected="{{self.selected}}" tabindex="0" aria-haspopup="{{self.haspopup}}" aria-expanded="{{self.expanded}}" aria-label="{{self.title}}" onmousedown="${toggle}" onmouseenter="${select}">{{self.title}}</div>
            </div>
            <Contextmenu :ref="self.menu" :root="self.el" />
        </div>`
    }

    lemonade.setComponents({ Topmenu: Topmenu });

    // Register the web component
    lemonade.createWebComponent('topmenu', Topmenu);

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Topmenu, root, options)
            return options;
        } else {
            return Topmenu.call(this, root)
        }
    }
})));

/***/ }),

/***/ 966:
/***/ (function(module) {

/**
 * LemonadeJS v5
 *
 * Website: https://lemonadejs.com
 * Description: Create amazing web based reusable components.
 *
 * This software is distributed under MIT License
 * @Roadmap
 * Accept interpolated values on properties `<div test="test: ${state}"></div>
 */

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    'use strict';

    /**
     * Global control element
     */
    let R = {
        queue: [],
        container: {},
        tracking: new Map,
        components: {},
        version: 5,
    };

    // Global LemonadeJS controllers
    if (typeof(document) !== "undefined") {
        if (! document.lemonadejs) {
            document.lemonadejs = R;
        } else {
            R = document.lemonadejs;
        }
    }

    // Get any conflict of versions
    if (! R.version) {
        console.error('This project seems to be using version 4 and version 5 causing a conflict of versions.');
    }

    // Script expression inside LemonadeJS templates
    let isScript = /{{(.*?)}}/g;

    /**
     * Apply value in a object based on the address
     */
    const Path = function(str, val, remove) {
        str = str.split('.');
        if (str.length) {
            let o = this;
            let p = null;
            while (str.length > 1) {
                // Get the property
                p = str.shift();
                // Check if the property exists
                if (o.hasOwnProperty(p)) {
                    o = o[p];
                } else {
                    // Property does not exist
                    if (typeof(val) === 'undefined') {
                        return undefined;
                    } else {
                        // Create the property
                        o[p] = {};
                        // Next property
                        o = o[p];
                    }
                }
            }
            // Get the property
            p = str.shift();
            // Set or get the value
            if (typeof(val) !== 'undefined') {
                if (remove === true) {
                    delete o[p];
                } else {
                    o[p] = val;
                }
                // Success
                return true;
            } else {
                // Return the value
                if (o) {
                    return o[p];
                }
            }
        }
        // Something went wrong
        return false;
    }

    /**
     * Show a better error developers
     */
    const createError = function() {
        throw new Error('LemonadeJS ' + Array.from(arguments).join(' '));
    }

    /**
     * Reference token is a string that define a token and not an expression
     * @param {string} token
     * @param {boolean?} topLevelOnly
     * @returns {boolean}
     */
    function isReferenceToken(token, topLevelOnly) {
        if (topLevelOnly) {
            return /^(this|self)(\.\w+)$/gm.test(token);
        } else {
            return /^(this|self)(\.\w+|\[\d+])*$/gm.test(token);
        }
    }

    /**
     * Extract all valid tokens from a string
     * @param {string} content
     * @returns {string[]}
     */
    function extractTokens(content) {
        // Input validation
        if (typeof content !== 'string') {
            throw new TypeError('Content must be a string');
        }
        // Single regex pattern to match both 'self.' and 'this.' prefixed identifiers Negative lookahead (?!\.\w) prevents matching nested properties
        //const pattern =  /(?:self|this)\.\w+\b(?!\.\w)/g;
        const pattern = /(?<=(?:this|self)\.)[a-zA-Z_]\w*/gm

        // If no matches found, return empty array early
        const matches = content.match(pattern);
        if (!matches) {
            return [];
        }
        // Create Set directly from matches array with map transform This is more efficient than adding items one by one
        return [...new Set(matches.map(match => match.slice(match.indexOf('.') + 1)))];
    }

    /**
     * Bind a property to one action and start tracking
     * @param {object} lemon
     * @param {string} prop
     */
    const trackProperty = function(lemon, prop) {
        // Lemon handler
        let s = lemon.self;
        if (typeof(s) === 'object') {
            // Change
            let change = lemon.change;
            // Events
            let events = lemon.events[prop];
            // Current value
            let value = s[prop];
            // Do not allow undefined
            if (typeof(value) === 'undefined') {
                value = '';
            }
            // Create the observer
            Object.defineProperty(s, prop, {
                set: function(v) {
                    // Old value
                    let oldValue = value;
                    // New value
                    value = v;
                    // Dispatch reactions
                    if (events) {
                        events.forEach((action) => {
                            action();
                        });
                    }
                    // Refresh bound elements
                    if (change && change.length) {
                        change.forEach((action) => {
                            if (typeof (action) === 'function') {
                                action.call(s, prop, oldValue, v);
                            }
                        })
                    }
                },
                get: function () {
                    // Get value
                    return value;
                },
                configurable: true,
                enumerable: true,
            });
        }
    }

    /**
     * Check if an element is appended to the DOM or a shadowRoot
     * @param {HTMLElement} node
     * @return {boolean}
     */
    const isAppended = function(node) {
        while (node) {
            if (node === document.body) {
                return true; // Node is in main document
            }

            if (node.parentNode === null) {
                if (node.host) {
                    node = node.host; // Traverse up through ShadowRoot
                } else {
                    return false; // Detached node
                }
            } else {
                node = node.parentNode; // Traverse up through parentNode
            }
        }
        return false;
    }

    const elementNotReady = new Set;

    /**
     * Execute all pending events from onload
     * @param lemon
     */
    const executeOnload = function(lemon) {
        let s = lemon.self;
        // Ready event
        while (lemon.ready.length) {
            lemon.ready.shift()();
        }
        // Native onload
        if (typeof(s.onload) === 'function') {
            s.onload.call(s, s.el);
        }
        // Current self
        if (typeof(lemon.load) === 'function') {
            lemon.load.call(s, s.el);
        }
    }

    /**
     * Process the onload methods
     */
    const processOnload = function(lemon) {
        let root = lemon.tree.element;
        if (root.tagName === 'ROOT' && lemon.elements) {
            root = lemon.elements[0];
        }
        // Add to the queue
        elementNotReady.add(lemon);
        // Check if the element is appended to the DOM
        if (isAppended(root)) {
            elementNotReady.forEach((item) => {
                // Remove from the list
                elementNotReady.delete(item);
                // Run onload and ready events
                executeOnload(item);
            })
        }
    }

    /**
     * Return the element based on the type
     * @param item
     * @returns {*}
     */
    const getElement = function(item) {
        return typeof(item.type) === 'function' ? item.self : item.element;
    }

    const HTMLParser = function(html, values) {
        /**
         * process the scape chars
         * @param char
         * @returns {*|string}
         */
        function escape(char) {
            const escapeMap = {
                'n': String.fromCharCode(0x0A),
                'r': String.fromCharCode(0x0D),
                't': String.fromCharCode(0x09),
                'b': String.fromCharCode(0x08),
                'f': String.fromCharCode(0x0C),
                'v': String.fromCharCode(0x0B),
                '0': String.fromCharCode(0x00)
            };

            return escapeMap[char] || char;
        }

        /**
         * Check if is a self-closing tag
         * @param {string|function} type - Tag name or component function
         * @returns {boolean}
         */
        function isSelfClosing(type) {
            if (! type) {
                return false;
            } else {
                // List of self-closing or void HTML elements
                const selfClosingTags = [
                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'
                ];
                // Convert tagName to lowercase to ensure case-insensitive comparison
                return typeof(type) === 'function' || selfClosingTags.includes(type.toLowerCase());
            }
        }

        /**
         * Create a text node and add it to current node's children
         * @param {Object} tag - Text node properties
         */
        const createTextNode = function(tag) {
            if (! this.current.children) {
                this.current.children = [];
            }

            this.current.children.push({
                type: '#text',
                parent: this.current,
                props: [tag],
            });
        }

        /**
         * Find the parent node by tag name
         * @param {Object} node - Current node
         * @param {string} type - Tag name to find
         * @returns {Object|undefined}
         */
        const findParentByTagName = function(node, type) {
            if (node && type) {
                if (node.type === type) {
                    return node;
                } else {
                    return findParentByTagName(node.parent, type);
                }
            }

            return undefined;
        }

        /**
         * Get expression value and update tag metadata
         * @param {Object} tag - Tag to update
         * @returns {*} Expression value
         */
        const getExpression = function(tag) {
            // Get value
            const v = values && values[this.index] !== undefined ? values[this.index] : '';
            if (tag) {
                // Keep the reference
                tag.expression = this.reference;
                // Keep the index
                tag.index = this.index;
            }
            // Move the value index
            this.index++;
            // Delete reference
            delete this.reference;
            // Return value
            return v;
        }

        /**
         * Handle the text node creation
         */
        const commitText = function() {
            if (typeof(this.text) !== 'undefined') {
                const text = this.text.replace(/\r?\n\s+/g, '');
                if (text) {
                    createTextNode.call(this, { name: 'textContent', value: text });
                }
                delete this.text;
            }
        }

        const commitComments = function() {
            if (typeof(this.comments) !== 'undefined') {
                let comments = this.comments;
                if (comments) {
                    comments = comments
                        .replace('<!--', '')
                        .replace('-->', '')

                    if (! this.current.children) {
                        this.current.children = [];
                    }

                    this.current.children.push({
                        type: '#comments',
                        parent: this.current,
                        props: [{ name: 'text', value: comments }],
                    });
                }
                delete this.comments;
            }
        }

        /**
         * Save the attribute to the tag
         */
        const commitAttribute = function() {
            if (this.tag.attributeName) {
                // Commit any current attribute
                if (! this.tag.props) {
                    this.tag.props = [];
                }

                let k = this.tag.attributeName;
                let v = this.tag.attributeValue;

                if (typeof(v) === 'undefined') {
                    v = k;
                }

                let tag = {
                    name: k,
                    value: v,
                };

                if (typeof(this.tag.expression) !== 'undefined') {
                    tag.index = this.tag.index;
                    tag.expression = this.tag.expression;
                }

                this.tag.props.push(tag);

                // Clean up temporary properties
                delete this.tag.attributeName;
                delete this.tag.attributeValue;
                delete this.tag.index;
                delete this.tag.expression;

                if (this.tag.attributeIsReadyToClose) {
                    delete this.tag.attributeIsReadyToClose;
                }
            }
        }

        /**
         * Actions controller
         * @param {Object} control - Parser control object
         * @param {string} char - Current character
         */
        const actions = function(control, char) {
            const method = control.action || 'text';
            if (typeof actions[method] === 'function') {
                actions[method].call(control, char);
            }
        }

        /**
         * Extract content between expression markers, handling quoted content
         * @param {string} html - Full HTML string
         * @param {number} startIndex - Starting index (position after ${})
         * @returns {Object} Expression content and ending position
         */
        function extractExpressionContent(html, startIndex) {
            let text = '';
            let i = startIndex;
            let insideQuotes = null;

            while (i < html.length) {
                const char = html[i];

                // Handle quotes
                if ((char === '"' || char === "'" || char === '`')) {
                    if (!insideQuotes) {
                        insideQuotes = char;
                    } else if (char === insideQuotes) {
                        insideQuotes = null;
                    }
                }

                // Found closing brace outside quotes
                if (char === '}' && !insideQuotes) {
                    return {
                        content: text,
                        position: i
                    };
                }

                text += char;
                i++;
            }

            return {
                content: text,
                position: i
            };
        }

        /**
         * Process a new tag
         * @param char
         */
        actions.processTag = function(char) {
            // Just to check if there are any text to commit
            commitText.call(this);

            // Process the tag
            if (char === '<') {
                // Create new tag
                this.tag = {
                    type: '',
                    parent: this.current
                };
            } else if (char.match(/[a-zA-Z0-9-]/)) {
                // Tag name
                this.tag.type += char;
            } else {
                if (char === '$' && this.reference) {
                    // Custom tags
                    this.tag.type = getExpression.call(this);
                }
                // Finished with tag name, move to attribute handling
                this.action = 'attributeName';
            }
        }

        /**
         * Handle tag closing
         * @param char
         */
        actions.closeTag = function(char) {
            // Make sure to commit attribute
            commitAttribute.call(this);
            // Close the tag
            if (char === '>') {
                // Get the new parent
                if (isSelfClosing(this.tag.type)) {
                    // Push new tag to the parent
                    if (! this.tag.parent.children) {
                        this.tag.parent.children = [];
                    }
                    this.tag.parent.children.push(this.tag);
                } else if (this.tag.closingTag) {
                    // Need to find the parent on the chain
                    const parentNode = findParentByTagName(this.tag.parent, this.tag.type);
                    if (parentNode) {
                        this.current = parentNode.parent;
                    }
                } else {
                    if (this.tag.closing) {
                        // Current is the parent
                        this.current = this.tag.parent;
                    } else {
                        this.current = this.tag;
                    }

                    // Push new tag to the parent
                    if (! this.tag.parent.children) {
                        this.tag.parent.children = [];
                    }
                    this.tag.parent.children.push(this.tag);
                }

                // Remote temporary properties
                delete this.tag.insideQuote;
                delete this.tag.closingTag;
                delete this.tag.closing;
                // Finalize tag
                this.tag = null;
                // New action
                this.action = 'text';
            } else if (! this.tag.locked) {
                if (char === '/') {
                    if (! this.tag.type) {
                        // This is a closing tag
                        this.tag.closingTag = true;
                    }
                    // Closing character is found
                    this.tag.closing = true;
                } else if (char.match(/[a-zA-Z0-9-]/)) {
                    // If is a closing tag, get the tag name
                    if (this.tag.closingTag) {
                        this.tag.type += char;
                    }
                } else {
                    // Wait to the closing sign
                    if (this.tag.type) {
                        this.locked = true;
                    }
                }
            }
        }

        actions.attributeName = function(char) {
            // There is another attribute to commit
            if (this.tag.attributeIsReadyToClose) {
                commitAttribute.call(this);
            }

            // Build attribute name
            if (char.match(/[a-zA-Z0-9-:]/)) {
                if (! this.tag.attributeName) {
                    this.tag.attributeName = '';
                }
                this.tag.attributeName += char;
            } else if (char === '=') {
                // Move to attribute value
                if (this.tag.attributeName) {
                    this.action = 'attributeValue';
                    delete this.tag.attributeIsReadyToClose;
                }
            } else if (char.match(/\s/)) {
                if (this.tag.attributeName) {
                    this.tag.attributeIsReadyToClose = true;
                }
            }
        };

        actions.attributeValue = function(char) {
            if (! this.tag.attributeValue) {
                this.tag.attributeValue = '';
            }

            if (char === '"' || char === "'") {
                if (this.tag.insideQuote) {
                    if (this.tag.insideQuote === char) {
                        this.tag.insideQuote = false;
                    } else {
                        this.tag.attributeValue += char;
                    }
                } else {
                    this.tag.insideQuote = char;
                }
            } else {
                if (char === '$' && this.reference) {
                    // Custom tags
                    char = getExpression.call(this, this.tag);
                }
                // Inside quotes, keep appending to the attribute value
                if (this.tag.insideQuote) {
                    if (this.tag.attributeValue) {
                        this.tag.attributeValue += char;
                    } else {
                        this.tag.attributeValue = char;
                    }
                } else if (typeof(char) === 'string' && char.match(/\s/)) {
                    if (this.tag.attributeValue) {
                        this.action = 'attributeName';
                    }
                    this.tag.attributeIsReadyToClose = true;
                } else {
                    if (this.tag.attributeIsReadyToClose) {
                        this.action = 'attributeName';
                        actions.attributeName.call(this, char);
                    } else {
                        if (this.tag.attributeValue) {
                            this.tag.attributeValue += char;
                        } else {
                            this.tag.attributeValue = char;
                        }
                    }
                }
            }
        }

        actions.text = function(char) {
            if (char === '$' && this.reference) {
                // Just to check if there are any text to commit
                commitText.call(this);
                // Custom tags
                let tag = { name: 'textContent' }
                tag.value = getExpression.call(this, tag);
                // Add node tag
                createTextNode.call(this, tag);
            } else {
                if (referenceControl === 1) {
                    // Just to check if there are any text to commit
                    commitText.call(this);
                }

                // Normal text processing
                if (! this.text) {
                    this.text = '';
                }
                this.text += char; // Keep appending to text content

                if (referenceControl === 2) {
                    // Just to check if there are any text to commit
                    commitText.call(this);
                }
            }
        }

        actions.comments = function(char) {
            if (! this.comments) {
                this.comments = '';
            }
            this.comments += char;

            if (this.comments.endsWith('-->')) {
                commitComments.call(this);
                this.action = 'text';
            }
        }

        // Control the LemonadeJS native references
        let referenceControl = null;

        const result = { type: 'template' };
        const control = {
            current: result,
            action: 'text',
            index: 0,
        };

        // Input validation
        if (typeof html !== 'string') {
            throw new TypeError('HTML input must be a string');
        }

        // Main loop to process the HTML string
        for (let i = 0; i < html.length; i++) {
            // Current char
            let char = html[i];

            if (control.action === 'text' && char === '<' && html[i+1] === '!' && html[i+2] === '-' && html[i+3] === '-') {
                control.action = 'comments';
            }

            if (control.action !== 'comments') {
                let escaped = false;

                if (values !== null) {
                    // Handle scape
                    if (char === '\\') {
                        // This is a escaped char
                        escaped = true;
                        // Parse escape char
                        char = escape(html[i+1]);
                        // Move to the next char
                        i++;
                    }
                }

                // Global control logic
                if (control.tag) {
                    if (char === '>' || char === '/') {
                        // End of tag, commit any attributes and go back to text parsing
                        if (!control.tag.insideQuote) {
                            control.action = 'closeTag';
                        }
                    }
                } else {
                    if (char === '<') {
                        control.action = 'processTag';
                    }
                }

                // Register references for a dynamic template
                if (!escaped && char === '$' && html[i + 1] === '{') {
                    const result = extractExpressionContent(html, i + 2);
                    control.reference = result.content;
                    i = result.position;
                }

                // Control node references
                if (char === '{' && html[i + 1] === '{') {
                    referenceControl = 1;
                } else if (char === '}' && html[i - 1] === '}') {
                    referenceControl = 2;
                }
            }

            // Execute action
            actions(control, char);

            // Reference control
            referenceControl = null;
        }

        // Handle any remaining text
        commitText.call(control);

        return result.children && result.children[0];
    }

    const generateHTML = function(lemon) {

        const appendEvent = function(token, event, exec) {
            if (! lemon.events[token]) {
                lemon.events[token] = []
            }
            // Push the event
            lemon.events[token].push(event);
            // Execute
            if (exec) {
                event();
            }
        }

        const createEventsFromExpression = function(expression, event, exec) {
            // Get the tokens should be updated to populate this attribute
            let tokens = extractTokens(expression);
            if (tokens.length) {
                // Process all the tokens
                for (let i = 0; i < tokens.length; i++) {
                    appendEvent(tokens[i], event);
                }
            }
            // Execute method
            if (exec) {
                event();
            }
        }

        const setDynamicValue = function(item, prop, attributeName) {
            // Create a reference to the DOM element
            let property = prop.expression || prop.value;

            if (isReferenceToken(property)) {
                // Event
                let event = function() {
                    // Reference
                    let value = extractFromPath.call(lemon.self, property);
                    // Update reference
                    setAttribute(getElement(item), attributeName, value);
                }
                // Append event only for the top level properties in the self
                if (isReferenceToken(property, true)) {
                    let p = extractFromPath.call(lemon.self, property, true);
                    if (p) {
                        // Append event to the token change
                        let token = p[1]
                        // Append event
                        appendEvent(token, event);
                    }
                }
                // Execute the event in the first time
                event();
            } else {
                setAttribute(getElement(item), attributeName, castProperty(prop.value));
            }
        }

        const dynamicContent = function(text) {
            try {
                // Cast value
                let cast = null;
                // Replace the text
                text = text.replace(isScript, function (a, b) {
                    let s = lemon.self;
                    // Try to find the property
                    let result = extractFromPath.call(s, b);
                    // Evaluation for legacy purposes
                    if (typeof(result) === 'undefined') {
                        // This is deprecated and will be dropped on LemonadeJS 6
                        result = run.call(s, b);
                        if (typeof (result) === 'undefined') {
                            result = '';
                        }
                    } else if (result === null) {
                        result = '';
                    }
                    // Parse correct type
                    if (typeof(result) !== 'string' && a === text) {
                        cast = result;
                    }
                    // Return
                    return result;
                });

                if (cast !== null) {
                    return cast;
                }

                return text;
            } catch (e) {
            }
        }

        const isHTML = function(str) {
            return /<[^>]*>/.test(str);
        }

        const appendHTMLBeforeNode = function(item, value) {
            // Remove previous elements
            if (item.current) {
                item.current.forEach(e => e?.remove());
            }
            item.current = [];
            // Node container
            let node = getElement(item);
            // Append content
            if (! isHTML(value)) {
                node.textContent = value;
            } else {
                // TODO: improve that
                queueMicrotask(() => {
                    // Create a temporary container
                    const t = document.createElement('div');
                    t.innerHTML = value;
                    // Insert elements and store references
                    while (t.firstChild) {
                        item.current.push(t.firstChild);
                        node.parentNode.insertBefore(t.firstChild, node);
                    }
                });
            }
        }

        const applyElementAttribute = function(item, prop) {
            if (typeof(prop.expression) !== 'undefined') {
                // Event to update the designed position
                let event = function() {
                    // Extra value from the template
                    let value = lemon.view(parseTemplate)[prop.index];
                    // Process the NODE
                    if (item.type === '#text') {
                        appendHTMLBeforeNode(item, value);
                    } else {
                        // Set attribute
                        setAttribute(getElement(item), prop.name, value);
                    }
                }
                // Bind event to any tokens change
                createEventsFromExpression(prop.expression, event, true);
                // Register event for state changes
                lemon.events[prop.index] = event;
            } else {
                // Get the tokens should be updated to populate this attribute
                let tokens = extractTokens(prop.value);
                if (tokens.length) {
                    // Dynamic
                    createEventsFromExpression(prop.value, function() {
                        // Dynamic text
                        let value = dynamicContent(prop.value);
                        // Get the dynamic value
                        setAttribute(getElement(item), prop.name, value);
                    }, true)
                } else {
                    let value = prop.value;
                    if (value.match(isScript)) {
                        value = dynamicContent(value);
                    }

                    setAttribute(getElement(item), prop.name, value, true);
                }
            }
        }

        /**
         * Create a LemonadeJS self bind
         * @param item
         * @param prop
         */
        const applyBindHandler = function(item, prop) {
            // Create a reference to the DOM element
            let property = prop.expression || prop.value;

            if (isReferenceToken(property, true)) {
                let prop = property.split('.')[1];

                // Event from component to the property
                let event = function () {
                    let value = getAttribute(getElement(item), 'value');
                    if (lemon.self[prop] !== value) {
                        lemon.self[prop] = value;
                    }
                }

                if (typeof (item.type) === 'function') {
                    item.bind = event;
                } else {
                    item.element.addEventListener('input', event);
                }

                // Event property to the element
                event = () => {
                    let value = getAttribute(getElement(item), 'value');
                    if (lemon.self[prop] !== value) {
                        setAttribute(getElement(item), 'value', lemon.self[prop]);
                    }
                }
                // Append event
                appendEvent(prop, event, true);
            }
        }

        /**
         * Create a LemonadeJS self render
         * @param item
         * @param prop
         */
        const applyRenderHandler = function(item, prop) {
            // Create a reference to the DOM element
            let property = prop.expression || prop.value;
            let getValue = null;
            let token = null;

            if (isReferenceToken(property, true)) {
                token = property.split('.')[1];
                // Get value
                getValue = () => {
                    return lemon.self[token];
                }
            } else {
                if (typeof(prop.expression) !== 'undefined') {
                    getValue = () => {
                        // Extra value from the template
                        let data = lemon.view(parseTemplate)[prop.index];
                        if (data instanceof state) {
                            data = data.value;
                        }
                        return data;
                    }
                }
            }

            if (getValue) {
                // Create container to keep the elements
                item.container = [];

                // Event property to the element
                let event = () => {
                    // Root element
                    let root = typeof(item.type) === 'function' ? item.self.el : item.element;
                    // Curren value
                    let value = getValue();
                    if (value) {
                        item.container.forEach(e => {
                            root.appendChild(e);
                        });
                    } else {
                        while (root.firstChild) {
                            item.container.push(root.firstChild);
                            root.firstChild.remove();
                        }
                    }
                }

                if (token) {
                    // Append event
                    appendEvent(token, event);
                } else {
                    if (typeof(prop.expression) !== 'undefined') {
                        lemon.events[prop.index] = event;
                        createEventsFromExpression(prop.expression, event);
                    }
                }

                // Execute event
                let root = typeof(item.type) === 'function' ? item.self.el : item.element;
                if (root) {
                    event();
                } else {
                    lemon.ready.push(event);
                }
            }
        }

        /**
         * Create a dynamic reference
         * @param item
         * @param prop
         */
        const createReference = function(item, prop) {
            let ref = getElement(item);
            if (typeof(prop.value) === 'function') {
                prop.value(ref);
            } else {
                // Create a reference to the DOM element
                let property = prop.expression || prop.value;
                // Reference
                if (isReferenceToken(property)) {
                    let p = extractFromPath.call(lemon.self, property, true);
                    if (p) {
                        lemon.self[p[1]] = ref;
                    }
                }
            }
        }

        /**
         * Process the :ready. Call when DOM is ready
         * @param item
         * @param prop
         */
        const whenIsReady = function(item, prop) {
            let value = prop.value;
            // If not a method, should be converted to a method
            if (typeof(value) !== 'function') {
                let t = extractFromPath.call(lemon.self, value);
                if (t) {
                    value = t;
                }
            }
            // Must be a function
            if (typeof(value) === 'function') {
                lemon.ready.push(function() {
                    value(getElement(item), lemon.self);
                });
            } else {
                createError(`:ready ${value} is not a function`)
            }
        }

        const getRoot = function(item) {
            if (typeof(item.type) === 'function') {
                if (item.parent.type === 'template') {
                    return lemon.root;
                } else {
                    return item.parent.element;
                }
            }

            return item.element;
        }

        const registerLoop = function(item, prop) {
            // Create a reference to the DOM element
            let property = prop.expression || prop.value;

            // Append the template back to the correct position
            if (lemon.self.settings?.loop) {
                lemon.self.settings.loop(item)
            }

            // Event
            let updateLoop = function(data) {
                // Component
                let method = typeof(item.type) === 'function' ? item.type : Basic;
                // Remove all DOM
                let root = getRoot(item);
                if (root) {
                    while (root.firstChild) {
                        root.firstChild.remove();
                    }
                }
                // Process the data
                if (data && Array.isArray(data)) {
                    // Process data
                    data.forEach(function(self) {
                        let el = self.el;
                        if (el) {
                            root.appendChild(el);
                        } else {
                            // Register parent
                            register(self, 'parent', lemon.self);
                            // Render
                            L.render(method, root, self, item);
                        }

                        if (root?.getAttribute('unique') === 'false') {
                            delete self.el;
                        }
                    })
                }
            }

            // Event
            let event;

            // Type of property
            if (isReferenceToken(property)) {
                // Event
                event = function() {
                    // Reference
                    let data = extractFromPath.call(lemon.self, property);
                    // Update reference
                    updateLoop(data);
                }

                // Append event only for the top level properties in the self
                if (isReferenceToken(property, true)) {
                    let p = extractFromPath.call(lemon.self, property, true);
                    if (p) {
                        // Append event to the token change
                        appendEvent(p[1], event);
                    }
                }
            } else {
                if (typeof(prop.expression) !== 'undefined') {
                    event = function() {
                        // Extra value from the template
                        let data = lemon.view(parseTemplate)[prop.index];
                        if (data instanceof state) {
                            data = data.value;
                        }
                        // Update the data
                        updateLoop(data);
                    }
                    // Register event for state changes
                    lemon.events[prop.index] = event;
                }
            }

            // Defer event since the dom is not ready
            if (event) {
                if (getRoot(item)) {
                    event();
                } else {
                    lemon.ready.push(event);
                }
            }
        }

        const isLoopAttribute = function(props) {
            let test = false;
            props.forEach(function(prop) {
                if (prop.name === ':loop' || prop.name === 'lm-loop' || prop.name === '@loop') {
                    test = true;
                }
            });
            return test;
        }

        const registerPath = function(item, prop) {
            if (! lemon.path.elements) {
                lemon.path.elements = [];
            }

            let element = getElement(item);

            lemon.path.elements.push({
                element: element,
                path: prop.value
            });

            // Event from component to the property
            let event = function () {
                // Get the current value of my HTML form element or component
                let value = getAttribute(element, 'value');
                // Apply the new value on the path on the object
                if (lemon.path.value) {
                    Path.call(lemon.path.value, prop.value, value);
                    // Call the callback when exist
                    if (typeof(lemon.path.change) === 'function') {
                        lemon.path.change(value, prop.value, element);
                    }
                } else {
                    console.log('Use setPath to define the form container before using lm-path');
                }
            }

            if (typeof(item.type) === 'function') {
                item.path = event;
            } else {
                item.element.addEventListener('input', event);
            }
        }

        const appendChildren = function(container, children) {
            if (container && children) {
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    if (typeof(child) === 'string') {
                        container.appendChild(document.createTextNode(child));
                    } else if (child.element) {
                        if (child.element.tagName === 'ROOT') {
                            while (child.element.firstChild) {
                                container.appendChild(child.element.firstChild);
                            }
                        } else {
                            container.appendChild(child.element);
                        }
                    }
                }
            }
        }

        const getAttributeName = function(prop) {
            return prop[0] === ':' || prop[0] === '@' ? prop.substring(1) : prop.substring(3);
        }

        const getAttributeEvent = function(event) {
            event = event.toLowerCase();
            if (event.startsWith('on')) {
                return event.toLowerCase();
            } else if (event.startsWith(':on')) {
                return getAttributeName(event);
            }
        }

        /**
         * CHeck if the event name is a valid DOM event name
         * @param element
         * @param eventName
         * @returns {boolean}
         */
        const isValidEventName = function(element, eventName) {
            const validEventPattern = /^on[a-z]+$/;
            return validEventPattern.test(eventName);
        }

        /**
         * Create element from the string tagname
         * @param tagName
         * @returns {*}
         */
        const createElementFromString = function(tagName) {
            // List of SVG tags (you can expand this list if needed)
            const svgTags = [
                "svg", "path", "circle", "rect", "line", "polygon", "polyline", "text"
            ];

            if (svgTags.includes(tagName)) {
                // For SVG elements, use createElementNS with the correct namespace
                return document.createElementNS("http://www.w3.org/2000/svg", tagName);
            } else {
                // For regular HTML elements, use createElement
                return document.createElement(tagName);
            }
        }

        const reorderProps = function(arr) {
            // Define the desired order of names
            const orderPriority = ['ref', 'bind', 'loop', 'ready'];

            // Separate items into prioritized and non-prioritized
            const prioritized = [];
            const others = [];

            // Sort items into respective arrays
            arr.forEach(item => {
                if (orderPriority.includes(item.name.substring(1)) || orderPriority.includes(item.name.substring(3))) {
                    prioritized.push(item);
                } else {
                    others.push(item);
                }
            });

            // Return combined array with prioritized items at the end
            return [...others, ...prioritized];
        }


        const createElements = function(item) {
            if (typeof(item) === 'object') {
                // Create an element
                if (item.type === '#comments') {
                    item.element = document.createComment(item.props[0].value);
                } else if (item.type === '#text') {
                    // Text node
                    item.element = document.createTextNode('');
                    // Check for dynamic content
                    applyElementAttribute(item, item.props[0]);
                } else {
                    // Apply attributes if they exist
                    if (item.props && ! Array.isArray(item.props)) {
                        let props = [];
                        let keys = Object.keys(item.props);
                        for (let i = 0; i < keys.length; i++) {
                            props.push({ name: keys[i], value: item.props[keys[i]] });
                        }
                        item.props = props;
                    } else if (! item.props) {
                        item.props = [];
                    }

                    // This item is a parent for a loop
                    if (isLoopAttribute(item.props)) {
                        // Mark this item as a loop
                        item.loop = true;
                    }

                    if (! item.type) {
                        item.type = 'root';
                    }

                    if (typeof(item.type) === 'string') {
                        if (item.type.match(/^[A-Z][a-zA-Z0-9\-]*$/g)) {
                            let controller = item.type.toUpperCase();
                            if (typeof(R.components[controller]) === 'function') {
                                item.type = R.components[controller];
                            } else if (typeof (lemon.components[controller]) === 'function') {
                                item.type = lemon.components[controller];
                            } else {
                            }
                        }
                    }

                    if (typeof(item.type) === 'string') {
                        item.element = createElementFromString(item.type);
                    } else if (typeof(item.type) === 'function') {
                        // Create instance without calling constructor
                        if (isClass(item.type)) {
                            item.self = new item.type;
                        } else {
                            item.self = {};
                        }
                    }

                    // Create all children
                    if (! item.loop) {
                        if (item.children && Array.isArray(item.children)) {
                            item.children.forEach(child => {
                                createElements(child);
                            });
                        }
                        if (item.element) {
                            appendChildren(item.element, item.children);
                        }
                    }

                    // Process attributes
                    if (item.props.length) {
                        // Reorder props
                        item.props = reorderProps(item.props);
                        // Order by priority
                        item.props.forEach(function(prop) {
                            // If the property is an event
                            let event = getAttributeEvent(prop.name);
                            // When event for a DOM
                            if (event) {
                                // Element
                                let element = item.element;
                                // Value
                                let value = prop.value;
                                if (value) {
                                    let handler = null; // Reset handler for each iteration
                                    if (typeof (value) === 'function') {
                                        handler = value;
                                    } else {
                                        let t = extractFromPath.call(lemon.self, value);
                                        if (t) {
                                            if (typeof (t) === 'function') {
                                                prop.value = handler = t;
                                            }
                                        }
                                    }
                                    // When the element is a DOM
                                    if (isDOM(element)) {
                                        // Create the event handler
                                        let eventHandler;
                                        // Bind event
                                        if (typeof(handler) === 'function') {
                                            eventHandler = function(e, a, b) {
                                                return handler.call(element, e, lemon.self, a, b);
                                            }
                                        } else {
                                            // Legacy compatibility. Inline scripting is non-Compliance with Content Security Policy (CSP).
                                            eventHandler = function (e) {
                                                return Function('e', 'self', value).call(element, e, lemon.self); // TODO, quebra tudo se mudar
                                            }
                                        }

                                        if (isValidEventName(element, prop.name)) {
                                            element.addEventListener(event.substring(2), eventHandler);
                                        } else {
                                            if (element.tagName?.includes('-')) {
                                                element[event] = handler;
                                            } else {
                                                element[event] = eventHandler;
                                            }
                                        }
                                    } else {
                                        item.self[event] = handler || value;
                                    }
                                }
                            } else if (prop.name.startsWith(':') || prop.name.startsWith('@') || prop.name.startsWith('lm-')) {
                                // Special lemonade attribute name
                                let attrName = getAttributeName(prop.name);
                                // Special properties bound to the self
                                if (attrName === 'ready') {
                                    whenIsReady(item, prop);
                                } else if (attrName === 'ref') {
                                    createReference(item, prop);
                                } else if (attrName === 'loop') {
                                    registerLoop(item, prop);
                                } else if (attrName === 'bind') {
                                    applyBindHandler(item, prop);
                                } else if (attrName === 'path') {
                                    registerPath(item, prop);
                                } else if (attrName === 'render') {
                                    applyRenderHandler(item, prop);
                                } else {
                                    setDynamicValue(item, prop, attrName);
                                }
                            } else {
                                applyElementAttribute(item, prop);
                            }
                        })
                    }

                    // Do not create elements at this state if this is a loop
                    if (! item.loop) {
                        if (typeof(item.type) === 'function') {
                            // Execute component
                            item.element = L.render(item.type, null, item.self, item);

                            // Create all children
                            if (item.children) {
                                let root = item.element;
                                if (typeof(item.self?.settings?.getRoot) === 'function') {
                                    root = item.self.settings.getRoot();
                                }
                                appendChildren(root, item.children);
                            }
                        }
                    }
                }
            }
        }

        // Create DOM elements
        createElements(lemon.tree);

        return lemon.tree.element;
    }

    /**
     * Extract a property from a nested object using a string address
     * @param {string} str address inside the nested object
     * @param {boolean} config get the configuration obj => property
     */
    const extractFromPath = function(str, config) {
        try {
            let t = str.toString().replace(/[\[\]]/g, '.').split('.');
            if (t[0] === 'self' || t[0] === 'this') {
                t.shift();
            }
            // Remove blanks
            t = t.filter(item => item !== '');
            // Object
            let o = this;
            let lastObject;
            while (t.length) {
                // Get the property
                let p = t.shift();
                // Process config
                if (config) {
                    if (typeof(o) === 'object' && ! Array.isArray(o)) {
                        lastObject = [o,p];
                    }
                    if (t.length === 0) {
                        return lastObject;
                    }
                }
                // Check if the property exists
                if (o.hasOwnProperty(p) || typeof(o[p]) !== 'undefined') {
                    o = o[p];
                } else {
                    return undefined;
                }
            }

            if (typeof(o) !== 'undefined') {
                return o;
            }
        } catch (e) {}

        // Something went wrong
        return undefined;
    }

    /**
     * Cast the value of an attribute
     */
    const castProperty = function(attr) {
        // Parse type
        try {
            if (typeof(attr) === 'string' && attr) {
                // Remove any white spaces
                attr = attr.trim();
                if (attr === 'true') {
                    return true;
                } else if (attr === 'false') {
                    return false;
                } else if (! isNaN(attr)) {
                    return Number(attr);
                } else {
                    let firstChar = attr[0];
                    if (firstChar === '{' || firstChar === '[') {
                        if (attr.slice(-1) === '}' || attr.slice(-1) === ']') {
                            return JSON.parse(attr);
                        }
                    } else if (attr.startsWith('self.') || attr.startsWith('this.')) {
                        let v = extractFromPath.call(this, attr);
                        if (typeof(v) !== 'undefined') {
                            return v;
                        }
                    }
                }
            }
        } catch (e) {}

        return attr;
    }

    /**
     * This allows to run inline script on LEGACY system. Inline script can lead to security issues so use carefully.
     * @param {string} s string to function
     */
    const run = function(s) {
        return Function('self', '"use strict";return (' + s + ')')(this);
    }

    /**
     * Check if the content {o} is a valid DOM Element
     * @param {HTMLElement|DocumentFragment|object} o - is this a valid dom?
     * @return {boolean}
     */
    const isDOM = function(o) {
        return (o instanceof HTMLElement || o instanceof Element || o instanceof DocumentFragment);
    }

    /**
     * Check if the method is a method or a class
     * @param {function} f
     * @return {boolean}
     */
    const isClass = function(f) {
        return typeof f === 'function' && /^class\s/.test(Function.prototype.toString.call(f));
    }

    /**
     * Basic handler
     * @param {string|object} t - HTML template
     * @return {string|object}
     */
    const Basic = function(t) {
        return t;
    }

    /**
     * Get the attribute helper
     * @param {object} e Element
     * @param {string} attribute
     */
    const getAttribute = function(e, attribute) {
        let value;
        if (attribute === 'value') {
            if (typeof(e.val) === 'function') {
                value = e.val();
            } else {
                if (e.getAttribute) {
                    if (e.tagName === 'SELECT' && e.getAttribute('multiple') !== null) {
                        value = [];
                        for (let i = 0; i < e.options.length; i++) {
                            if (e.options[i].selected) {
                                value.push(e.options[i].value);
                            }
                        }
                    } else if (e.type === 'checkbox') {
                        value = e.checked && e.getAttribute('value') ? e.value : e.checked;
                    } else if (e.getAttribute('contenteditable')) {
                        value = e.innerHTML;
                    } else {
                        value = e.value;
                    }
                } else {
                    value = e.value;
                }
            }
        }
        return value;
    }

    /**
     * Set attribute value helper
     * @param {object} e Element
     * @param {string} attribute
     * @param {any} value
     * @param {boolean?} propertyValue
     */
    const setAttribute = function(e, attribute, value, propertyValue) {
        // Handle state
        if (value instanceof state) {
            value = value.value;
        } else if (typeof(value) === 'undefined') {
            value = '';
        }

        if (attribute === 'value' && ! propertyValue) {
            // Update HTML form element
            if (typeof (e.val) === 'function') {
                if (e.val() != value) {
                    e.val(value);
                }
            } else if (e.tagName === 'SELECT' && e.getAttribute('multiple') !== null) {
                for (let j = 0; j < e.children.length; j++) {
                    e.children[j].selected = value.indexOf(e.children[j].value) >= 0;
                }
            } else if (e.type === 'checkbox') {
                e.checked = !(!value || value === '0' || value === 'false');
            } else if (e.type === 'radio') {
                e.checked = e.value == value;
            } else if (e.getAttribute && e.getAttribute('contenteditable')) {
                if (e.innerHTML != value) {
                    e.innerHTML = value;
                }
            } else {
                // Make sure apply that to the value
                e.value = value;
                // Update attribute if exists
                if (e.getAttribute && e.getAttribute('value') !== null) {
                    e.setAttribute('value', value);
                }
            }
        } else if (typeof(value) === 'object' || typeof(value) === 'function') {
            e[attribute] = value;
        } else {
            if (isDOM(e)) {
                if (typeof (e[attribute]) !== 'undefined' && !(e.namespaceURI && e.namespaceURI.includes('svg'))) {
                    e[attribute] = value;
                } else {
                    if (value === '') {
                        e.removeAttribute(attribute);
                    } else {
                        e.setAttribute(attribute, value);
                    }
                }
            } else {
                e[attribute] = value;
            }
        }
    }

    /**
     * Get attributes as an object
     * @param {boolean} props - all attributes that are not undefined
     * @return {object}
     */
    const getAttributes = function(props) {
        let o = {};
        let k = null;
        let a = this.attributes;
        if (a && a.length) {
            for (let i = 0; i < a.length; i++) {
                k = a[i].name;
                if (props && typeof(this[k]) !== 'undefined') {
                    o[k] = this[k];
                } else {
                    o[k] = a[i].value;
                }
            }
        }
        return o;
    }

    /**
     * Register a getter without setter for a self object
     * @param {object} s - self object
     * @param {string} p - self property
     * @param {string|object|number} v - value
     */
    const register = function(s, p, v) {
        if (typeof(s) === 'object') {
            Object.defineProperty(s, p, {
                enumerable: false,
                configurable: true,
                get: function () {
                    return v;
                }
            });
        }
    }

    /**
     * Extract variables from the dynamic and append to the self
     * @return {[string, array]} grab the literal injection
     */
    const parseTemplate = function() {
        let args = Array.from(arguments);
        // Remove first
        args.shift()
        // Return the final template
        return args;
    }

    function cloneChildren(element) {
        // Base case: if an element is null/undefined or not an object, return as is
        if (!element || typeof element !== 'object') {
            return element;
        }

        // Handle arrays
        if (Array.isArray(element)) {
            return element.map(item => cloneChildren(item));
        }

        // Create a new object
        const cloned = {};

        // Clone each property
        for (const key in element) {
            if (key === 'children') {
                // Handle children especially as before
                cloned.children = element.children ? cloneChildren(element.children) : undefined;
            } else if (key === 'props') {
                // Deep clone props array
                cloned.props = element.props.map(prop => ({
                    ...prop,
                    value: prop.value // If value is a function, it will maintain the reference which is what we want
                }));
            } else {
                // Clone other properties
                cloned[key] = element[key];
            }
        }

        return cloned;
    }

    // LemonadeJS object
    const L = {};

    /**
     * Render a lemonade DOM element, method or class into a root DOM element
     * @param {function} component - LemonadeJS component or DOM created
     * @param {HTMLElement} root - root DOM element to receive the new HTML
     * @param {object?} self - self to be used
     * @param {object?} item - item
     * @return {HTMLElement|boolean} o
     */
    L.render = function(component, root, self, item) {
        if (typeof(component) !== 'function') {
            console.error('Component is not a function');
            return false;
        }

        // In case the self has not initial definition by the developer
        if (typeof(self) === 'undefined') {
            self = {};
        }

        // Web component
        if (self.tagName && self.tagName.includes('-')) {
            let props = getAttributes.call(self, true);
            // Copy all values to the object
            L.setProperties.call(self, props, true);
        }

        // Arguments
        let args = Array.from(arguments);

        // Lemonade component object
        let lemon = {
            self: self,
            ready: [],
            change: [],
            events: [],
            components: {},
            elements: [],
            root: root,
            path: {},
        }

        // Current onchange
        let externalOnchange = self.onchange;
        let externalOnload = self.onload;

        if (! item) {
            item = {};
        } else if (typeof(item) === 'string') {
            item = {
                children: item,
            }
        }

        let view;
        let result;

        // New self
        if (component === Basic) {
            view = cloneChildren(item.children[0]);
        } else {
            R.currentLemon = lemon;

            const tools = {
                onload: (...args) => setOnload(lemon, ...args),
                onchange: (...args) => setOnchange(lemon, ...args),
                track: (...args) => setTrack(lemon, ...args),
                state: (...args) => setState(lemon, ...args),
                setPath: (...args) => setPath(lemon, ...args),
            };

            if (isClass(component)) {
                if (! (self instanceof component)) {
                    lemon.self = self = new component(self);
                }
                view = self.render(item.children, tools);
            } else {
                // Execute component
                view = component.call(self, item.children, tools);
            }

            // Resolve onchange scope conflict
            if (typeof(self.onchange) === 'function' && externalOnchange !== self.onchange) {
                // Keep onchange event in the new onchange format
                lemon.change.push(self.onchange);
                // Keep the external onchange
                self.onchange = externalOnchange;
            }

            R.currentLemon = null;
        }

        // Values
        let values = null;
        // Process return
        if (typeof(view) === 'function') {
            values = view(parseTemplate);
            // Curren values
            lemon.values = values;
            // A render template to be executed
            lemon.view = view;
            // Template from the method
            result = view.toString().split('`');
            // Get the original template
            if (result) {
                // Remove the last element
                result.shift();
                result.pop();
                // Join everything else
                result = result.join('`').trim();
            }
        } else {
            result = view;
        }

        // Virtual DOM tree
        if (typeof(result) === 'string') {
            result = HTMLParser(result.trim(), values);
        }

        let element;

        // Process the result
        if (result) {
            // Get the HTML virtual DOM representation
            lemon.tree = result;

            // Create real DOM and append to the root
            element = generateHTML(lemon);

            if (element) {
                // Parents
                lemon.elements = [];
                // Append parents
                if (element.tagName === 'ROOT') {
                    element.childNodes.forEach((e) => {
                        lemon.elements.push(e);
                    });
                } else {
                    lemon.elements.push(element);
                }

                // Register element when is not registered inside the component
                register(lemon.self, 'el', element);

                const destroy = () => {
                    // Do not add in the same root
                    let div = document.createElement('div');
                    // Append temporary DIV to the same position
                    lemon.elements[0].parentNode.insertBefore(div, lemon.elements[0]);
                    // Remove the old elements
                    lemon.elements.forEach((e) => {
                        e.remove();
                    });
                    // Root element
                    args[1] = div;
                    // Create a new component
                    L.render(...args);
                    // Append elements in the same position in the DOM tree
                    while (div.firstChild) {
                        div.parentNode.insertBefore(div.firstChild, div);
                    }
                    // Remove DIV
                    div.remove();
                    // Object not in use
                    lemon = null;
                }

                // Refresh
                register(lemon.self, 'refresh', (prop) => {
                    if (prop) {
                        if (prop === true) {
                            destroy();
                        } else {
                            lemon.self[prop] = lemon.self[prop];
                        }
                    } else {
                        if (lemon.view) {
                            runViewValues(lemon);
                        } else {
                            destroy();
                        }
                    }
                });

                // Append element to the DOM
                if (root) {
                    lemon.elements.forEach((e) => {
                        root.appendChild(e);
                    });
                }
            } else {
                // Refresh
                register(lemon.self, 'refresh', (prop) => {
                    if (prop) {
                        if (prop === true) {
                            runViewValues(lemon);
                        } else {
                            lemon.self[prop] = lemon.self[prop];
                        }
                    }
                });
            }
        }

        // Bind to custom component
        if (item.bind || item.path) {
            let token = 'value';
            if (! lemon.events[token]) {
                lemon.events[token] = []
            }
            // Push the event
            if (item.bind) {
                lemon.events[token].push(item.bind);
            }
            if (item.path) {
                lemon.events[token].push(item.path);
            }
        }

        // In case initial exists
        if (typeof(lemon.path.initial) === 'object') {
            // Get the value of the draft
            let newValue = lemon.path.initial;
            // Delete draft
            delete lemon.path.initial;
            // Apply new values
            lemon.path.setValue(newValue);

        }

        // Apply events
        if (lemon.events) {
            let props = Object.keys(lemon.events);
            if (props.length) {
                for (let i = 0; i <props.length; i++) {
                    trackProperty(lemon, props[i]);
                }
            }
        }

        // Process the onload
        if (element) {
            processOnload(lemon);
        }

        return element;
    }

    const registerComponents = function(components) {
        if (components && R.currentLemon) {
            for (const key in components) {
                R.currentLemon.components[key.toUpperCase()] = components[key];
            }
        }
    }

    /**
     * Deprecated
     * @param {string} template
     * @param {object?} s (self)
     * @param {object?} components
     */
    L.element = function(template, s, components) {
        if (R.currentLemon && s && typeof(s) === 'object') {
            if (s !== R.currentLemon.self) {
                R.currentLemon.self = s;
            }
        }
        registerComponents(components);
        return template;
    }

    /**
     * Apply self to an existing appended DOM element
     * @param {HTMLElement} el - element root
     * @param {object} s - self to associate to the template
     * @param {object?} components - object with component declarations
     */
    L.apply = function(el, s, components) {
        let template = el.innerHTML;
        el.textContent = '';
        let Component = function() {
            registerComponents(components);
            return `<>${template}</>`;
        }
        return L.render(Component,el,s);
    }

    /**
     * Get all properties existing in {o} and create a new object with the values from {this};
     * @param {object} o - reference object with the properties relevant to the new object
     * @return {object} n - the new object with all new values
     */
    L.getProperties = function(o) {
        // The new object with all properties found in {o} with values from {this}
        let n = {};
        for (let p in o) {
            n[p] = this[p];
        }
        return n;
    }

    /**
     * Set the values from {o} to {this}
     * @param {object} o set the values of {this} when the `this[property]` is found in {o}, or when flag force is true
     * @param {boolean} f create a new property when that does not exist yet, but is found in {o}
     * @return {object} this is redundant since object {this} is a reference and is already available in the caller
     */
    L.setProperties = function(o, f) {
        for (let p in o) {
            if (this.hasOwnProperty(p) || f) {
                this[p] = o[p];
            }
        }
        return this;
    }

    /**
     * Reset the values of any common property name between this and a given object
     * @param {object} o - all properties names in the object {o} found in {this} will be reset.
     */
    L.resetProperties = function(o) {
        for (let p in o) {
            this[p] = '';
        }
    }

    /**
     * Lemonade CC (common container) helps you share a self or function through the whole application
     * @param {string} name alias for your declared object(self) or function
     * @returns {Object | Function} - registered element
     */
    L.get = function(name) {
        return R.container[name];
    }

    /**
     * Register something to the Lemonade CC (common container)
     * @param {string} name - alias for your declared object(self) or function
     * @param {object|function} e - the element to be added to the common container. Can be an object(self) or function.
     * @param {boolean} persistence - optional the persistence flag. Only applicable for functions.
     */
    L.set = function(name, e, persistence) {
        // Applicable only when the o is a function
        if (typeof(e) === 'function' && persistence === true) {
            // Keep the flag
            e.storage = true;
            // Any existing values
            let t = window.localStorage.getItem(name);
            if (t) {
                // Parse JSON
                t = JSON.parse(t);
                // Execute method with the existing values
                e(t);
            }
        }
        // Save to the sugar container
        R.container[name] = e;
    }

    /**
     * Dispatch the new values to the function
     * @param {string} name - alias to the element saved on the Lemonade CC (common container)
     * @param {object?} data - data to be dispatched
     */
    L.dispatch = function(name, data) {
        // Get from the container
        let e = R.container[name];
        // Confirm that the alias is a function
        if (typeof(e) === 'function') {
            // Save the data to the local storage
            if (e.storage === true) {
                window.localStorage.setItem(name, JSON.stringify(data));
            }
            // Dispatch the data to the function
            return e(data);
        }
    }

    /**
     * Register components
     * @param {object} components - register components
     */
    L.setComponents = function(components) {
        if (typeof(components) === 'object') {
            // Component names
            let k = Object.keys(components);
            // Make sure they follow the standard
            for (let i = 0; i < k.length; i++) {
                R.components[k[i].toUpperCase()] = components[k[i]];
            }
        }
    }

    L.component = class {}

    /**
     * Create a Web Component
     * @param {string} name - web component name
     * @param {function} handler - lemonadejs component
     * @param {object} options - options to create the web components
     */
    L.createWebComponent = function(name, handler, options) {
        if (typeof(window) === 'undefined') {
            return;
        }

        if (typeof(handler) !== 'function') {
            return 'Handler should be an function';
        }
        // Prefix
        let prefix = options && options.prefix ? options.prefix : 'lm';

        // Component name
        const componentName = prefix + '-' + name;

        // Check if the component is already defined
        if (! window.customElements.get(componentName)) {
            class Component extends HTMLElement {
                constructor() {
                    super();
                }

                connectedCallback() {
                    // LemonadeJS self
                    let self = this;
                    // First call
                    let state = typeof(this.el) === 'undefined';
                    // LemonadeJS is already rendered
                    if (state === true) {
                        // Render
                        if (options && options.applyOnly === true) {
                            // Merge component
                            handler.call(this);
                            // Apply
                            L.apply(this, self);
                        } else {
                            let root = this;
                            if (options && options.shadowRoot === true) {
                                this.attachShadow({ mode: 'open' });
                                root = document.createElement('div');
                                this.shadowRoot.appendChild(root);
                            }
                            // Give the browser time to calculate all width and heights
                            L.render(handler, root, self);
                        }
                    }

                    queueMicrotask(() => {
                        // Event
                        if (typeof(self.onconnect) === 'function') {
                            self.onconnect(self, state);
                        }
                    });
                }

                disconnectedCallback() {
                    if (typeof(this.ondisconnect) === 'function') {
                        this.ondisconnect(this);
                    }
                }
            }

            if (! window.customElements.get(componentName)) {
                window.customElements.define(componentName, Component);
            }
        }
    }

    L.h = function(type, props, ...children) {
        return { type, props: props || {}, children };
    }

    L.Fragment = function(props) {
        return props.children;
    }

    const wrongLevel = 'Hooks must be called at the top level of your component';

    const setOnload = function(lemon, event) {
        lemon.load = event;
    }

    const setOnchange = function(lemon, event) {
        lemon.change.push(event);
    }

    const setTrack = function(lemon, prop) {
        if (! lemon.events[prop]) {
            lemon.events[prop] = [];
        }
    }

    const setPath = function(lemon, initialValues, change) {
        // My value object
        let value = {};
        // Create a method to update the state
        const setValue = (newValue) => {
            if (typeof(lemon.path.initial) === 'undefined') {
                if (typeof (newValue) === 'object') {
                    // If my has been declared
                    let elements = lemon.path.elements;
                    if (elements) {
                        for (let i = 0; i < elements.length; i++) {
                            let v = Path.call(newValue, elements[i].path)
                            setAttribute(elements[i].element, 'value', v);
                        }
                    }
                }
            } else {
                lemon.path.initial = newValue;
            }
        }

        const getValue = () => {
            let ret = {};
            // If my has been declared
            let elements = lemon.path.elements;
            if (elements) {
                for (let i = 0; i < elements.length; i++) {
                    let v = getAttribute(elements[i].element, 'value');
                    Path.call(ret, elements[i].path, v);
                }
            }
            return ret;
        }

        lemon.path = {
            setValue: setValue,
            value: value,
            change: change,
            initial: initialValues || {}
        };

        return [value, setValue, getValue];
    }

    const setState = function(lemon, value, callback) {
        // Create a state container
        const s = new state();
        // Create a method to update the state
        const setValue = (newValue) => {
            let oldValue = value;
            // Update original value
            value = typeof newValue === 'function' ? newValue(value) : newValue;
            // Values from the view
            runViewValues(lemon, s);
            // Call back
            callback?.(value, oldValue);
        }
        // Make the value attribute dynamic
        Object.defineProperty(s, 'value', {
            set: setValue,
            get: () => value
        });

        return s;
    }

    L.onload = function(event) {
        if (! R.currentLemon) {
            createError(wrongLevel);
        }
        return setOnload(R.currentLemon, event);
    }

    L.onchange = function(event) {
        if (! R.currentLemon) {
            createError(wrongLevel);
        }
        return setOnchange(R.currentLemon, event);
    }

    L.track = function(prop) {
        if (! R.currentLemon) {
            createError(wrongLevel);
        }
        return setTrack(R.currentLemon, prop);
    }

    L.setPath = function(initialValues, change) {
        if (! R.currentLemon) {
            createError(wrongLevel);
        }
        return setPath(R.currentLemon, initialValues, change);
    }

    /**
     * Run view values
     * @param lemon
     * @param s - refresh from state
     */
    const runViewValues = function(lemon, s) {
        let values = lemon.view(parseTemplate);
        if (values && values.length) {
            values.forEach((v, k) => {
                let current = lemon.values[k];
                // Compare if the previous value
                if (s && s === v || v !== current) {
                    // Update current value
                    lemon.values[k] = v;
                    // Trigger state events
                    if (typeof(lemon.events[k]) === 'function') {
                        lemon.events[k]();
                    }
                }
            });
        }
    }

    const state = function() {}

    state.prototype.toString = function() {
        return this.value.toString();
    }

    state.prototype.valueOf = function() {
        return this.value;
    }

    state.prototype[Symbol.toPrimitive] = function(hint) {
        if (hint === 'string') {
            return this.value.toString();
        }
        return this.value;
    }

    // TODO: Proxy for Objects and Arrays
    L.state = function(value, callback) {
        if (! R.currentLemon) {
            createError(wrongLevel);
        }

        return setState(R.currentLemon, value, callback);
    }

    L.helpers = {
        path: extractFromPath,
        properties: {
            get: L.getProperties,
            set: L.setProperties,
            reset: L.resetProperties,
        }
    }

    L.events = (function() {
        class CustomEvents extends Event {
            constructor(type, props, options) {
                super(type, {
                    bubbles: true,
                    composed: true,
                    ...options,
                });

                if (props) {
                    for (const key in props) {
                        // Avoid assigning if property already exists anywhere on `this`
                        if (! (key in this)) {
                            this[key] = props[key];
                        }
                    }
                }
            }
        }

        const create = function(type, props, options) {
            return new CustomEvents(type, props, options);
        };

        return {
            create: create,
            dispatch(element, event, options) {
                if (typeof event === 'string') {
                    event = create(event, options);
                }
                element.dispatchEvent(event);
            }
        };
    })();

    return L;
})));

/***/ }),

/***/ 195:
/***/ (function(module) {

/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Organogram
 *
 * MIT License
 */

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    return (function(str) {
        function int64(msint_32, lsint_32) {
            this.highOrder = msint_32;
            this.lowOrder = lsint_32;
        }

        var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
            new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
            new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
            new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

        var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
            new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
            new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
            new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
            new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
            new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
            new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
            new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
            new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
            new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
            new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
            new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
            new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
            new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
            new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
            new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
            new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
            new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
            new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
            new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
            new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
            new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
            new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
            new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
            new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
            new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
            new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
            new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
            new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
            new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
            new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
            new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
            new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
            new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
            new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
            new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
            new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
            new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
            new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
            new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        var charsize = 8;

        function utf8_encode(str) {
            return unescape(encodeURIComponent(str));
        }

        function str2binb(str) {
            var bin = [];
            var mask = (1 << charsize) - 1;
            var len = str.length * charsize;

            for (var i = 0; i < len; i += charsize) {
                bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
            }

            return bin;
        }

        function binb2hex(binarray) {
            var hex_tab = "0123456789abcdef";
            var str = "";
            var length = binarray.length * 4;
            var srcByte;

            for (var i = 0; i < length; i += 1) {
                srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
                str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
            }

            return str;
        }

        function safe_add_2(x, y) {
            var lsw, msw, lowOrder, highOrder;

            lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
            msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
            lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
            msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
            highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            return new int64(highOrder, lowOrder);
        }

        function safe_add_4(a, b, c, d) {
            var lsw, msw, lowOrder, highOrder;

            lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
            msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
            lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
            msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
            highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            return new int64(highOrder, lowOrder);
        }

        function safe_add_5(a, b, c, d, e) {
            var lsw, msw, lowOrder, highOrder;

            lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
            msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
            lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
            msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
            highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

            return new int64(highOrder, lowOrder);
        }

        function maj(x, y, z) {
            return new int64(
                (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
                (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
            );
        }

        function ch(x, y, z) {
            return new int64(
                (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
                (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
            );
        }

        function rotr(x, n) {
            if (n <= 32) {
                return new int64(
                    (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
                    (x.lowOrder >>> n) | (x.highOrder << (32 - n))
                );
            } else {
                return new int64(
                    (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
                    (x.highOrder >>> n) | (x.lowOrder << (32 - n))
                );
            }
        }

        function sigma0(x) {
            var rotr28 = rotr(x, 28);
            var rotr34 = rotr(x, 34);
            var rotr39 = rotr(x, 39);

            return new int64(
                rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
                rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
            );
        }

        function sigma1(x) {
            var rotr14 = rotr(x, 14);
            var rotr18 = rotr(x, 18);
            var rotr41 = rotr(x, 41);

            return new int64(
                rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
                rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
            );
        }

        function gamma0(x) {
            var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7);

            return new int64(
                rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
                rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
            );
        }

        function gamma1(x) {
            var rotr19 = rotr(x, 19);
            var rotr61 = rotr(x, 61);
            var shr6 = shr(x, 6);

            return new int64(
                rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
                rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
            );
        }

        function shr(x, n) {
            if (n <= 32) {
                return new int64(
                    x.highOrder >>> n,
                    x.lowOrder >>> n | (x.highOrder << (32 - n))
                );
            } else {
                return new int64(
                    0,
                    x.highOrder << (32 - n)
                );
            }
        }

        var str = utf8_encode(str);
        var strlen = str.length*charsize;
        str = str2binb(str);

        str[strlen >> 5] |= 0x80 << (24 - strlen % 32);
        str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

        for (var i = 0; i < str.length; i += 32) {
            a = H[0];
            b = H[1];
            c = H[2];
            d = H[3];
            e = H[4];
            f = H[5];
            g = H[6];
            h = H[7];

            for (var j = 0; j < 80; j++) {
                if (j < 16) {
                    W[j] = new int64(str[j*2 + i], str[j*2 + i + 1]);
                } else {
                    W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]);
                }

                T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
                T2 = safe_add_2(sigma0(a), maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add_2(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add_2(T1, T2);
            }

            H[0] = safe_add_2(a, H[0]);
            H[1] = safe_add_2(b, H[1]);
            H[2] = safe_add_2(c, H[2]);
            H[3] = safe_add_2(d, H[3]);
            H[4] = safe_add_2(e, H[4]);
            H[5] = safe_add_2(f, H[5]);
            H[6] = safe_add_2(g, H[6]);
            H[7] = safe_add_2(h, H[7]);
        }

        var binarray = [];
        for (var i = 0; i < H.length; i++) {
            binarray.push(H[i].highOrder);
            binarray.push(H[i].lowOrder);
        }

        return binb2hex(binarray);
    });

})));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ jsuites; }
});

;// CONCATENATED MODULE: ./src/utils/dictionary.js
// Update dictionary
const setDictionary = function(d) {
    if (! document.dictionary) {
        document.dictionary = {}
    }
    // Replace the key into the dictionary and append the new ones
    let k = Object.keys(d);
    for (let i = 0; i < k.length; i++) {
        document.dictionary[k[i]] = d[k[i]];
    }
}

// Translate
const translate = function(t) {
    if (typeof(document) !== "undefined" && document.dictionary) {
        return document.dictionary[t] || t;
    } else {
        return t;
    }
}


/* harmony default export */ var dictionary = ({ setDictionary, translate });
;// CONCATENATED MODULE: ./src/utils/tracking.js
 const Tracking = function(component, state) {
    if (state === true) {
        window['jSuitesStateControl'] = window['jSuitesStateControl'].filter(function(v) {
            return v !== null;
        });

        // Start after all events
        setTimeout(function() {
            window['jSuitesStateControl'].push(component);
        }, 0);

    } else {
        var index = window['jSuitesStateControl'].indexOf(component);
        if (index >= 0) {
            window['jSuitesStateControl'].splice(index, 1);
        }
    }
}

/* harmony default export */ var tracking = (Tracking);
;// CONCATENATED MODULE: ./src/utils/helpers.js
const Helpers = {};

// Two digits
Helpers.two = function(value) {
    value = '' + value;
    if (value.length == 1) {
        value = '0' + value;
    }
    return value;
}

Helpers.focus = function(el) {
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

Helpers.isNumeric = (function (num) {
    if (typeof(num) === 'string') {
        num = num.trim();
    }
    return !isNaN(num) && num !== null && num !== '';
});

Helpers.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

Helpers.getNode = function() {
    let node = document.getSelection().anchorNode;
    if (node) {
        return (node.nodeType == 3 ? node.parentNode : node);
    } else {
        return null;
    }
}
/**
 * Generate hash from a string
 */
Helpers.hash = function(str) {
    let hash = 0, i, chr;

    if (str.length === 0) {
        return hash;
    } else {
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            if (chr > 32) {
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
        }
    }
    return hash;
}

/**
 * Generate a random color
 */
Helpers.randomColor = function(h) {
    let lum = -0.25;
    let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let rgb = [], c;
    for (let i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb.push(("00" + c).substr(c.length));
    }

    // Return hex
    if (h === true) {
        return '#' + Helpers.two(rgb[0].toString(16)) + Helpers.two(rgb[1].toString(16)) + Helpers.two(rgb[2].toString(16));
    }

    return rgb;
}

Helpers.getWindowWidth = function() {
    let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x;
}

Helpers.getWindowHeight = function() {
    let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return  y;
}

Helpers.getPosition = function(e) {
    let x;
    let y;
    if (e.changedTouches && e.changedTouches[0]) {
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
    } else {
        x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    return [ x, y ];
}

Helpers.click = function(el) {
    if (el.click) {
        el.click();
    } else {
        let evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    }
}

Helpers.findElement = function(element, condition) {
    let foundElement = false;

    function path (element) {
        if (element && ! foundElement) {
            if (typeof(condition) == 'function') {
                foundElement = condition(element)
            } else if (typeof(condition) == 'string') {
                if (element.classList && element.classList.contains(condition)) {
                    foundElement = element;
                }
            }
        }

        if (element.parentNode && ! foundElement) {
            path(element.parentNode);
        }
    }

    path(element);

    return foundElement;
}

/* harmony default export */ var helpers = (Helpers);
;// CONCATENATED MODULE: ./src/utils/path.js
const isValidPathObj = function(o) {
    return typeof o === 'object' || typeof o === 'function';
}

function Path(pathString, value, remove) {
    // Ensure the path is a valid, non-empty string
    if (typeof pathString !== 'string' || pathString.length === 0) {
        return undefined;
    }

    // Split the path into individual keys and filter out empty keys
    const keys = pathString.split('.');
    if (keys.length === 0) {
        return undefined;
    }

    // Start with the root object
    let currentObject = this;

    // Read mode: retrieve a value
    if (typeof value === 'undefined' && typeof remove === 'undefined') {
        // Traverse all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            // Check if the current object is valid and has the key
            if (
                currentObject != null &&
                isValidPathObj(currentObject) &&
                Object.prototype.hasOwnProperty.call(currentObject, key)
            ) {
                currentObject = currentObject[key];
            } else {
                // Return undefined if the path is invalid or currentObject is null/undefined
                return undefined;
            }
        }
        // Return the final value
        return currentObject;
    }

    // Write mode: set or delete a value
    // Traverse all keys except the last one
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // Check if the current object is invalid (null/undefined or non-object)
        if (currentObject == null || ! isValidPathObj(currentObject)) {
            console.warn(`Cannot set value: path '${pathString}' blocked by invalid object at '${key}'`);
            return false;
        }

        // If the key exists but is null/undefined or a non-object, replace it with an empty object
        if (
            Object.prototype.hasOwnProperty.call(currentObject, key) &&
            (currentObject[key] == null || ! isValidPathObj(currentObject[key]))
        ) {
            currentObject[key] = {};
        } else if (!Object.prototype.hasOwnProperty.call(currentObject, key)) {
            // If the key doesn't exist, create an empty object
            currentObject[key] = {};
        }

        // Move to the next level
        currentObject = currentObject[key];
    }

    // Handle the final key
    const finalKey = keys[keys.length - 1];

    // Check if the current object is valid for setting/deleting
    if (currentObject == null || ! isValidPathObj(currentObject)) {
        return false;
    }

    // Delete the property if remove is true
    if (remove === true) {
        if (Object.prototype.hasOwnProperty.call(currentObject, finalKey)) {
            delete currentObject[finalKey];
            return true;
        }
        return false; // Nothing to delete
    }

    // Set the value
    currentObject[finalKey] = value;
    return true;
}
;// CONCATENATED MODULE: ./src/utils/sorting.js
function Sorting(el, options) {
    var obj = {};
    obj.options = {};

    var defaults = {
        pointer: null,
        direction: null,
        ondragstart: null,
        ondragend: null,
        ondrop: null,
    }

    var dragElement = null;

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.classList.add('jsorting');

    el.addEventListener('dragstart', function(e) {
        let target = e.target;
        if (target.nodeType === 3) {
            if (target.parentNode.getAttribute('draggable') === 'true') {
                target = target.parentNode;
            } else {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }

        if (target.getAttribute('draggable') === 'true') {
            let position = Array.prototype.indexOf.call(target.parentNode.children, target);
            dragElement = {
                element: target,
                o: position,
                d: position
            }
            target.style.opacity = '0.25';

            if (typeof (obj.options.ondragstart) == 'function') {
                obj.options.ondragstart(el, target, e);
            }

            e.dataTransfer.setDragImage(target,0,0);
        }
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (getElement(e.target)) {
                if (e.target.getAttribute('draggable') == 'true' && dragElement.element != e.target) {
                    if (!obj.options.direction) {
                        var condition = e.target.clientHeight / 2 > e.offsetY;
                    } else {
                        var condition = e.target.clientWidth / 2 > e.offsetX;
                    }

                    if (condition) {
                        e.target.parentNode.insertBefore(dragElement.element, e.target);
                    } else {
                        e.target.parentNode.insertBefore(dragElement.element, e.target.nextSibling);
                    }

                    dragElement.d = Array.prototype.indexOf.call(e.target.parentNode.children, dragElement.element);
                }
            }
        }
    });

    el.addEventListener('dragleave', function(e) {
        e.preventDefault();
    });

    el.addEventListener('dragend', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (typeof(obj.options.ondragend) == 'function') {
                obj.options.ondragend(el, dragElement.element, e);
            }

            // Cancelled put element to the original position
            if (dragElement.o < dragElement.d) {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o]);
            } else {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o].nextSibling);
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (dragElement.o !== dragElement.d) {
                if (typeof (obj.options.ondrop) == 'function') {
                    obj.options.ondrop(el, dragElement.o, dragElement.d, dragElement.element, e.target, e);
                }
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    var getElement = function(element) {
        var sorting = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('jsorting')) {
                    sorting = true;
                }
            }

            if (! sorting) {
                path(element.parentNode);
            }
        }

        path(element);

        return sorting;
    }

    for (var i = 0; i < el.children.length; i++) {
        if (! el.children[i].hasAttribute('draggable')) {
            el.children[i].setAttribute('draggable', 'true');
        }
    }

    el.val = function() {
        var id = null;
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            if (id = el.children[i].getAttribute('data-id')) {
                data.push(id);
            }
        }
        return data;
    }

    return el;
}
;// CONCATENATED MODULE: ./src/utils/lazyloading.js
function LazyLoading(el, options) {
    var obj = {}

    // Mandatory options
    if (! options.loadUp || typeof(options.loadUp) != 'function') {
        options.loadUp = function() {
            return false;
        }
    }
    if (! options.loadDown || typeof(options.loadDown) != 'function') {
        options.loadDown = function() {
            return false;
        }
    }
    // Timer ms
    if (! options.timer) {
        options.timer = 100;
    }

    // Timer
    var timeControlLoading = null;

    // Controls
    var scrollControls = function(e) {
        if (timeControlLoading == null) {
            var event = false;
            var scrollTop = el.scrollTop;
            if (el.scrollTop + (el.clientHeight * 2) >= el.scrollHeight) {
                if (options.loadDown()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop - (el.clientHeight);
                    }
                    event = true;
                }
            } else if (el.scrollTop <= el.clientHeight) {
                if (options.loadUp()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop + (el.clientHeight);
                    }
                    event = true;
                }
            }

            timeControlLoading = setTimeout(function() {
                timeControlLoading = null;
            }, options.timer);

            if (event) {
                if (typeof(options.onupdate) == 'function') {
                    options.onupdate();
                }
            }
        }
    }

    // Onscroll
    el.onscroll = function(e) {
        scrollControls(e);
    }

    el.onwheel = function(e) {
        scrollControls(e);
    }

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/ajax.js
function Ajax() {
    var Component = (function(options, complete) {
        if (Array.isArray(options)) {
            // Create multiple request controller
            var multiple = {
                instance: [],
                complete: complete,
            }

            if (options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    options[i].multiple = multiple;
                    multiple.instance.push(Component(options[i]));
                }
            }

            return multiple;
        }

        if (! options.data) {
            options.data = {};
        }

        if (options.type) {
            options.method = options.type;
        }

        // Default method
        if (! options.method) {
            options.method = 'GET';
        }

        // Default type
        if (! options.dataType) {
            options.dataType = 'json';
        }

        if (options.data) {
            // Parse object to variables format
            var parseData = function (value, key) {
                var vars = [];
                if (value) {
                    var keys = Object.keys(value);
                    if (keys.length) {
                        for (var i = 0; i < keys.length; i++) {
                            if (key) {
                                var k = key + '[' + keys[i] + ']';
                            } else {
                                var k = keys[i];
                            }

                            if (value[k] instanceof FileList) {
                                vars[k] = value[keys[i]];
                            } else if (value[keys[i]] === null || value[keys[i]] === undefined) {
                                vars[k] = '';
                            } else if (typeof(value[keys[i]]) == 'object') {
                                var r = parseData(value[keys[i]], k);
                                var o = Object.keys(r);
                                for (var j = 0; j < o.length; j++) {
                                    vars[o[j]] = r[o[j]];
                                }
                            } else {
                                vars[k] = value[keys[i]];
                            }
                        }
                    }
                }

                return vars;
            }

            var d = parseData(options.data);
            var k = Object.keys(d);

            // Data form
            if (options.method == 'GET') {
                if (k.length) {
                    var data = [];
                    for (var i = 0; i < k.length; i++) {
                        data.push(k[i] + '=' + encodeURIComponent(d[k[i]]));
                    }

                    if (options.url.indexOf('?') < 0) {
                        options.url += '?';
                    }
                    options.url += data.join('&');
                }
            } else {
                var data = new FormData();
                for (var i = 0; i < k.length; i++) {
                    if (d[k[i]] instanceof FileList) {
                        if (d[k[i]].length) {
                            for (var j = 0; j < d[k[i]].length; j++) {
                                data.append(k[i], d[k[i]][j], d[k[i]][j].name);
                            }
                        }
                    } else {
                        data.append(k[i], d[k[i]]);
                    }
                }
            }
        }

        var httpRequest = new XMLHttpRequest();
        httpRequest.open(options.method, options.url, true);

        if (options.requestedWith) {
            httpRequest.setRequestHeader('X-Requested-With', options.requestedWith);
        } else {
            if (options.requestedWith !== false) {
                httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        }

        // Content type
        if (options.contentType) {
            httpRequest.setRequestHeader('Content-Type', options.contentType);
        }

        // Headers
        if (options.method === 'POST') {
            httpRequest.setRequestHeader('Accept', 'application/json');
        } else {
            if (options.dataType === 'blob') {
                httpRequest.responseType = "blob";
            } else {
                if (! options.contentType) {
                    if (options.dataType === 'json') {
                        httpRequest.setRequestHeader('Content-Type', 'text/json');
                    } else if (options.dataType === 'html') {
                        httpRequest.setRequestHeader('Content-Type', 'text/html');
                    }
                }
            }
        }

        // No cache
        if (options.cache !== true) {
            httpRequest.setRequestHeader('pragma', 'no-cache');
            httpRequest.setRequestHeader('cache-control', 'no-cache');
        }

        // Authentication
        if (options.withCredentials === true) {
            httpRequest.withCredentials = true
        }

        // Before send
        if (typeof(options.beforeSend) == 'function') {
            options.beforeSend(httpRequest);
        }

        // Before send
        if (typeof(Component.beforeSend) == 'function') {
            Component.beforeSend(httpRequest);
        }

        if (document.ajax && typeof(document.ajax.beforeSend) == 'function') {
            document.ajax.beforeSend(httpRequest);
        }

        httpRequest.onerror = function() {
            if (options.error && typeof(options.error) == 'function') {
                options.error({
                    message: 'Network error: Unable to reach the server.',
                    status: 0
                });
            }
        }

        httpRequest.ontimeout = function() {
            if (options.error && typeof(options.error) == 'function') {
                options.error({
                    message: 'Request timed out after ' + httpRequest.timeout + 'ms.',
                    status: 0
                });
            }
        }

        httpRequest.onload = function() {
            if (httpRequest.status >= 200 && httpRequest.status < 300) {
                if (options.dataType === 'json') {
                    try {
                        var result = JSON.parse(httpRequest.responseText);

                        if (options.success && typeof(options.success) == 'function') {
                            options.success(result);
                        }
                    } catch(err) {
                        if (options.error && typeof(options.error) == 'function') {
                            options.error(err, result);
                        }
                    }
                } else {
                    if (options.dataType === 'blob') {
                        var result = httpRequest.response;
                    } else {
                        var result = httpRequest.responseText;
                    }

                    if (options.success && typeof(options.success) == 'function') {
                        options.success(result);
                    }
                }
            } else {
                if (options.error && typeof(options.error) == 'function') {
                    options.error(httpRequest.responseText, httpRequest.status);
                }
            }

            // Global queue
            if (Component.queue && Component.queue.length > 0) {
                Component.send(Component.queue.shift());
            }

            // Global complete method
            if (Component.requests && Component.requests.length) {
                // Get index of this request in the container
                var index = Component.requests.indexOf(httpRequest);
                // Remove from the ajax requests container
                Component.requests.splice(index, 1);
                // Deprecated: Last one?
                if (! Component.requests.length) {
                    // Object event
                    if (options.complete && typeof(options.complete) == 'function') {
                        options.complete(result);
                    }
                }
                // Group requests
                if (options.group) {
                    if (Component.oncomplete && typeof(Component.oncomplete[options.group]) == 'function') {
                        if (! Component.pending(options.group)) {
                            Component.oncomplete[options.group]();
                            Component.oncomplete[options.group] = null;
                        }
                    }
                }
                // Multiple requests controller
                if (options.multiple && options.multiple.instance) {
                    // Get index of this request in the container
                    var index = options.multiple.instance.indexOf(httpRequest);
                    // Remove from the ajax requests container
                    options.multiple.instance.splice(index, 1);
                    // If this is the last one call method complete
                    if (! options.multiple.instance.length) {
                        if (options.multiple.complete && typeof(options.multiple.complete) == 'function') {
                            options.multiple.complete(result);
                        }
                    }
                }
            }
        }

        // Keep the options
        httpRequest.options = options;
        // Data
        httpRequest.data = data;

        // Queue
        if (options.queue === true && Component.requests.length > 0) {
            Component.queue.push(httpRequest);
        } else {
            Component.send(httpRequest)
        }

        return httpRequest;
    });

    Component.send = function(httpRequest) {
        if (httpRequest.data) {
            if (Array.isArray(httpRequest.data)) {
                httpRequest.send(httpRequest.data.join('&'));
            } else {
                httpRequest.send(httpRequest.data);
            }
        } else {
            httpRequest.send();
        }

        Component.requests.push(httpRequest);
    }

    Component.exists = function(url, __callback) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status) {
            __callback(http.status);
        }
    }

    Component.pending = function(group) {
        var n = 0;
        var o = Component.requests;
        if (o && o.length) {
            for (var i = 0; i < o.length; i++) {
                if (! group || group == o[i].options.group) {
                    n++
                }
            }
        }
        return n;
    }

    Component.oncomplete = {};
    Component.requests = [];
    Component.queue = [];

    return Component
}

/* harmony default export */ var ajax = (Ajax());
;// CONCATENATED MODULE: ./src/plugins/animation.js
function Animation() {
    const Component = {
        loading: {}
    }
    
    Component.loading.show = function(timeout) {
        if (! Component.loading.element) {
            Component.loading.element = document.createElement('div');
            Component.loading.element.className = 'jloading';
        }
        document.body.appendChild(Component.loading.element);
    
        // Max timeout in seconds
        if (timeout > 0) {
            setTimeout(function() {
                Component.loading.hide();
            }, timeout * 1000)
        }
    }
    
    Component.loading.hide = function() {
        if (Component.loading.element && Component.loading.element.parentNode) {
            document.body.removeChild(Component.loading.element);
        }
    }
    
    Component.slideLeft = function (element, direction, done) {
        if (direction == true) {
            element.classList.add('jslide-left-in');
            setTimeout(function () {
                element.classList.remove('jslide-left-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-left-out');
            setTimeout(function () {
                element.classList.remove('jslide-left-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideRight = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-right-in');
            setTimeout(function () {
                element.classList.remove('jslide-right-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-right-out');
            setTimeout(function () {
                element.classList.remove('jslide-right-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideTop = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-top-in');
            setTimeout(function () {
                element.classList.remove('jslide-top-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-top-out');
            setTimeout(function () {
                element.classList.remove('jslide-top-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        }
    }
    
    Component.slideBottom = function (element, direction, done) {
        if (direction === true) {
            element.classList.add('jslide-bottom-in');
            setTimeout(function () {
                element.classList.remove('jslide-bottom-in');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 400);
        } else {
            element.classList.add('jslide-bottom-out');
            setTimeout(function () {
                element.classList.remove('jslide-bottom-out');
                if (typeof (done) == 'function') {
                    done();
                }
            }, 100);
        }
    }
    
    Component.fadeIn = function (element, done) {
        element.style.display = '';
        element.classList.add('jfade-in');
        setTimeout(function () {
            element.classList.remove('jfade-in');
            if (typeof (done) == 'function') {
                done();
            }
        }, 2000);
    }
    
    Component.fadeOut = function (element, done) {
        element.classList.add('jfade-out');
        setTimeout(function () {
            element.style.display = 'none';
            element.classList.remove('jfade-out');
            if (typeof (done) == 'function') {
                done();
            }
        }, 1000);
    }

    return Component;
}

/* harmony default export */ var animation = (Animation());
// EXTERNAL MODULE: ./node_modules/@jsuites/utils/dist/index.js
var dist = __webpack_require__(791);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);
;// CONCATENATED MODULE: ./src/plugins/calendar.js






const Mask = (dist_default()).Mask;
const HelpersDate = (dist_default()).Helpers;

function Calendar() {
    var Component = (function (el, options) {
        // Already created, update options
        if (el.calendar) {
            return el.calendar.setOptions(options, true);
        }

        // New instance
        var obj = {type: 'calendar'};
        obj.options = {};

        // Date
        obj.date = null;

        /**
         * Update options
         */
        obj.setOptions = function (options, reset) {
            // Default configuration
            var defaults = {
                // Render type: [ default | year-month-picker ]
                type: 'default',
                // Restrictions
                validRange: null,
                // Starting weekday - 0 for sunday, 6 for saturday
                startingDay: null,
                // Date format
                format: 'DD/MM/YYYY',
                // Allow keyboard date entry
                readonly: true,
                // Today is default
                today: false,
                // Show timepicker
                time: false,
                // Show the reset button
                resetButton: true,
                // Placeholder
                placeholder: '',
                // Translations can be done here
                months: HelpersDate.monthsShort,
                monthsFull: HelpersDate.months,
                weekdays: HelpersDate.weekdays,
                textDone: dictionary.translate('Done'),
                textReset: dictionary.translate('Reset'),
                textUpdate: dictionary.translate('Update'),
                // Value
                value: null,
                // Fullscreen (this is automatic set for screensize < 800)
                fullscreen: false,
                // Create the calendar closed as default
                opened: false,
                // Events
                onopen: null,
                onclose: null,
                onchange: null,
                onupdate: null,
                // Internal mode controller
                mode: null,
                position: null,
                // Data type
                dataType: null,
                // Controls
                controls: true,
                // Auto select
                autoSelect: true,
            }

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof (obj.options[property]) == 'undefined' || reset === true) {
                        obj.options[property] = defaults[property];
                    }
                }
            }

            // Register custom months and weekdays with the dictionary for translation
            if (obj.options.monthsFull && obj.options.monthsFull !== defaults.monthsFull) {
                const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const translations = {};
                for (let i = 0; i < 12; i++) {
                    if (obj.options.monthsFull[i]) {
                        translations[englishMonths[i]] = obj.options.monthsFull[i];
                    }
                }
                dictionary.setDictionary(translations);
            }

            if (obj.options.weekdays && obj.options.weekdays !== defaults.weekdays) {
                const englishWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const translations = {};
                for (let i = 0; i < 7; i++) {
                    if (obj.options.weekdays[i]) {
                        translations[englishWeekdays[i]] = obj.options.weekdays[i];
                    }
                }
                dictionary.setDictionary(translations);
            }

            // Reset button
            if (obj.options.resetButton == false) {
                calendarReset.style.display = 'none';
            } else {
                calendarReset.style.display = '';
            }

            // Readonly
            if (obj.options.readonly) {
                el.setAttribute('readonly', 'readonly');
            } else {
                el.removeAttribute('readonly');
            }

            // Placeholder
            if (obj.options.placeholder) {
                el.setAttribute('placeholder', obj.options.placeholder);
            } else {
                el.removeAttribute('placeholder');
            }

            if (helpers.isNumeric(obj.options.value) && obj.options.value > 0) {
                obj.options.value = Component.numToDate(obj.options.value);
                // Data type numeric
                obj.options.dataType = 'numeric';
            }

            // Texts
            calendarReset.innerHTML = obj.options.textReset;
            calendarConfirm.innerHTML = obj.options.textDone;
            calendarControlsUpdateButton.innerHTML = obj.options.textUpdate;

            // Define mask
            if (obj.options.format) {
                el.setAttribute('data-mask', obj.options.format.toLowerCase());
            }

            // Value
            if (!obj.options.value && obj.options.today) {
                var value = Component.now();
            } else {
                var value = obj.options.value;
            }

            // Set internal date
            if (value) {
                // Force the update
                obj.options.value = null;
                // New value
                obj.setValue(value);
            }

            return obj;
        }

        /**
         * Open the calendar
         */
        obj.open = function (value) {
            if (!calendar.classList.contains('jcalendar-focus')) {
                if (!calendar.classList.contains('jcalendar-inline')) {
                    // Current
                    Component.current = obj;
                    // Start tracking
                    tracking(obj, true);
                    // Create the days
                    obj.getDays();
                    // Render months
                    if (obj.options.type == 'year-month-picker') {
                        obj.getMonths();
                    }
                    // Get time
                    if (obj.options.time) {
                        calendarSelectHour.value = obj.date[3];
                        calendarSelectMin.value = obj.date[4];
                    }

                    // Show calendar
                    calendar.classList.add('jcalendar-focus');

                    // Get the position of the corner helper
                    if (helpers.getWindowWidth() < 800 || obj.options.fullscreen) {
                        calendar.classList.add('jcalendar-fullsize');
                        // Animation
                        animation.slideBottom(calendarContent, 1);
                    } else {
                        calendar.classList.remove('jcalendar-fullsize');

                        var rect = el.getBoundingClientRect();
                        var rectContent = calendarContent.getBoundingClientRect();

                        if (obj.options.position) {
                            calendarContainer.style.position = 'fixed';
                            if (window.innerHeight < rect.bottom + rectContent.height) {
                                calendarContainer.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                            } else {
                                calendarContainer.style.top = (rect.top + rect.height + 2) + 'px';
                            }
                            calendarContainer.style.left = rect.left + 'px';
                        } else {
                            if (window.innerHeight < rect.bottom + rectContent.height) {
                                var d = -1 * (rect.height + rectContent.height + 2);
                                if (d + rect.top < 0) {
                                    d = -1 * (rect.top + rect.height);
                                }
                                calendarContainer.style.top = d + 'px';
                            } else {
                                calendarContainer.style.top = 2 + 'px';
                            }

                            if (window.innerWidth < rect.left + rectContent.width) {
                                var d = window.innerWidth - (rect.left + rectContent.width + 20);
                                calendarContainer.style.left = d + 'px';
                            } else {
                                calendarContainer.style.left = '0px';
                            }
                        }
                    }

                    // Events
                    if (typeof (obj.options.onopen) == 'function') {
                        obj.options.onopen(el);
                    }
                }
            }
        }

        obj.close = function (ignoreEvents, update) {
            if (obj.options.autoSelect !== true && typeof(update) === 'undefined') {
                update = false;
            }
            if (calendar.classList.contains('jcalendar-focus')) {
                if (update !== false) {
                    var element = calendar.querySelector('.jcalendar-selected');

                    if (typeof (update) == 'string') {
                        var value = update;
                    } else if (!element || element.classList.contains('jcalendar-disabled')) {
                        var value = obj.options.value
                    } else {
                        var value = obj.getValue();
                    }

                    obj.setValue(value);
                } else {
                    let value = obj.options.value || '';
                    obj.options.value = null;
                    obj.setValue(value)
                }

                // Events
                if (!ignoreEvents && typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el);
                }
                // Hide
                calendar.classList.remove('jcalendar-focus');
                // Stop tracking
                tracking(obj, false);
                // Current
                Component.current = null;
            }

            return obj.options.value;
        }

        obj.prev = function () {
            // Check if the visualization is the days picker or years picker
            if (obj.options.mode == 'years') {
                obj.date[0] = obj.date[0] - 12;

                // Update picker table of days
                obj.getYears();
            } else if (obj.options.mode == 'months') {
                obj.date[0] = parseInt(obj.date[0]) - 1;
                // Update picker table of months
                obj.getMonths();
            } else {
                // Go to the previous month
                if (obj.date[1] < 2) {
                    obj.date[0] = obj.date[0] - 1;
                    obj.date[1] = 12;
                } else {
                    obj.date[1] = obj.date[1] - 1;
                }

                // Update picker table of days
                obj.getDays();
            }
        }

        obj.next = function () {
            // Check if the visualization is the days picker or years picker
            if (obj.options.mode == 'years') {
                obj.date[0] = parseInt(obj.date[0]) + 12;

                // Update picker table of days
                obj.getYears();
            } else if (obj.options.mode == 'months') {
                obj.date[0] = parseInt(obj.date[0]) + 1;
                // Update picker table of months
                obj.getMonths();
            } else {
                // Go to the previous month
                if (obj.date[1] > 11) {
                    obj.date[0] = parseInt(obj.date[0]) + 1;
                    obj.date[1] = 1;
                } else {
                    obj.date[1] = parseInt(obj.date[1]) + 1;
                }

                // Update picker table of days
                obj.getDays();
            }
        }

        /**
         * Set today
         */
        obj.setToday = function () {
            // Today
            var value = new Date().toISOString().substr(0, 10);
            // Change value
            obj.setValue(value);
            // Value
            return value;
        }

        obj.setValue = function (val) {
            if (!val) {
                val = '' + val;
            }
            // Values
            var newValue = val;
            var oldValue = obj.options.value;

            if (oldValue != newValue) {
                // Set label
                if (!newValue) {
                    obj.date = null;
                    var val = '';
                    el.classList.remove('jcalendar_warning');
                    el.title = '';
                } else {
                    var value = obj.setLabel(newValue, obj.options);
                    var date = newValue.split(' ');
                    if (!date[1]) {
                        date[1] = '00:00:00';
                    }
                    var time = date[1].split(':')
                    var date = date[0].split('-');
                    var y = parseInt(date[0]);
                    var m = parseInt(date[1]);
                    var d = parseInt(date[2]);
                    var h = parseInt(time[0]);
                    var i = parseInt(time[1]);
                    obj.date = [y, m, d, h, i, 0];
                    var val = obj.setLabel(newValue, obj.options);

                    // Current selection day
                    var current = Component.now(new Date(y, m - 1, d), true);

                    // Available ranges
                    if (obj.options.validRange) {
                        if (!obj.options.validRange[0] || current >= obj.options.validRange[0]) {
                            var test1 = true;
                        } else {
                            var test1 = false;
                        }

                        if (!obj.options.validRange[1] || current <= obj.options.validRange[1]) {
                            var test2 = true;
                        } else {
                            var test2 = false;
                        }

                        if (!(test1 && test2)) {
                            el.classList.add('jcalendar_warning');
                            el.title = dictionary.translate('Date outside the valid range');
                        } else {
                            el.classList.remove('jcalendar_warning');
                            el.title = '';
                        }
                    } else {
                        el.classList.remove('jcalendar_warning');
                        el.title = '';
                    }
                }

                // New value
                obj.options.value = newValue;

                if (typeof (obj.options.onchange) == 'function') {
                    obj.options.onchange(el, newValue, oldValue);
                }

                // Lemonade JS
                if (el.value != val) {
                    el.value = val;
                    if (typeof (el.oninput) == 'function') {
                        el.oninput({
                            type: 'input',
                            target: el,
                            value: el.value
                        });
                    }
                }
            }

            if (obj.date) {
                obj.getDays();
                // Render months
                if (obj.options.type == 'year-month-picker') {
                    obj.getMonths();
                }
            }
        }

        obj.getValue = function () {
            if (obj.date) {
                if (obj.options.time) {
                    return helpers.two(obj.date[0]) + '-' + helpers.two(obj.date[1]) + '-' + helpers.two(obj.date[2]) + ' ' + helpers.two(obj.date[3]) + ':' + helpers.two(obj.date[4]) + ':' + helpers.two(0);
                } else {
                    return helpers.two(obj.date[0]) + '-' + helpers.two(obj.date[1]) + '-' + helpers.two(obj.date[2]) + ' ' + helpers.two(0) + ':' + helpers.two(0) + ':' + helpers.two(0);
                }
            } else {
                return "";
            }
        }

        /**
         *  Calendar
         */
        obj.update = function (element, v) {
            if (element.classList.contains('jcalendar-disabled')) {
                // Do nothing
            } else {
                var elements = calendar.querySelector('.jcalendar-selected');
                if (elements) {
                    elements.classList.remove('jcalendar-selected');
                }
                element.classList.add('jcalendar-selected');

                if (element.classList.contains('jcalendar-set-month')) {
                    obj.date[1] = v;
                    obj.date[2] = 1; // first day of the month
                } else {
                    obj.date[2] = element.innerText;
                }

                if (!obj.options.time) {
                    obj.close(null, true);
                } else {
                    obj.date[3] = calendarSelectHour.value;
                    obj.date[4] = calendarSelectMin.value;
                }
            }

            // Update
            updateActions();
        }

        /**
         * Set to blank
         */
        obj.reset = function () {
            // Close calendar
            obj.setValue('');
            obj.date = null;
            obj.close(false, false);
        }

        /**
         * Get calendar days
         */
        obj.getDays = function () {
            // Mode
            obj.options.mode = 'days';

            // Setting current values in case of NULLs
            var date = new Date();

            // Current selection
            var year = obj.date && helpers.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());
            var month = obj.date && helpers.isNumeric(obj.date[1]) ? obj.date[1] : parseInt(date.getMonth()) + 1;
            var day = obj.date && helpers.isNumeric(obj.date[2]) ? obj.date[2] : parseInt(date.getDate());
            var hour = obj.date && helpers.isNumeric(obj.date[3]) ? obj.date[3] : parseInt(date.getHours());
            var min = obj.date && helpers.isNumeric(obj.date[4]) ? obj.date[4] : parseInt(date.getMinutes());

            // Selection container
            obj.date = [year, month, day, hour, min, 0];

            // Update title
            calendarLabelYear.innerHTML = year;
            calendarLabelMonth.innerHTML = obj.options.months[month - 1];

            // Current month and Year
            var isCurrentMonthAndYear = (date.getMonth() == month - 1) && (date.getFullYear() == year) ? true : false;
            var currentDay = date.getDate();

            // Number of days in the month
            var date = new Date(year, month, 0, 0, 0);
            var numberOfDays = date.getDate();

            // First day
            var date = new Date(year, month - 1, 0, 0, 0);
            var firstDay = date.getDay() + 1;

            // Index value
            var index = obj.options.startingDay || 0;

            // First of day relative to the starting calendar weekday
            firstDay = firstDay - index;

            // Reset table
            calendarBody.innerHTML = '';

            // Weekdays Row
            var row = document.createElement('tr');
            row.setAttribute('align', 'center');
            calendarBody.appendChild(row);

            // Create weekdays row
            for (var i = 0; i < 7; i++) {
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-weekday')
                cell.innerHTML = obj.options.weekdays[index].substr(0, 1);
                row.appendChild(cell);
                // Next week day
                index++;
                // Restart index
                if (index > 6) {
                    index = 0;
                }
            }

            // Index of days
            var index = 0;
            var d = 0;

            // Calendar table
            for (var j = 0; j < 6; j++) {
                // Reset cells container
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                row.style.height = '34px';

                // Create cells
                for (var i = 0; i < 7; i++) {
                    // Create cell
                    var cell = document.createElement('td');
                    cell.classList.add('jcalendar-set-day');

                    if (index >= firstDay && index < (firstDay + numberOfDays)) {
                        // Day cell
                        d++;
                        cell.innerHTML = d;

                        // Selected
                        if (d == day) {
                            cell.classList.add('jcalendar-selected');
                        }

                        // Current selection day is today
                        if (isCurrentMonthAndYear && currentDay == d) {
                            cell.style.fontWeight = 'bold';
                        }

                        // Current selection day
                        var current = Component.now(new Date(year, month - 1, d), true);

                        // Available ranges
                        if (obj.options.validRange) {
                            if (!obj.options.validRange[0] || current >= obj.options.validRange[0]) {
                                var test1 = true;
                            } else {
                                var test1 = false;
                            }

                            if (!obj.options.validRange[1] || current <= obj.options.validRange[1]) {
                                var test2 = true;
                            } else {
                                var test2 = false;
                            }

                            if (!(test1 && test2)) {
                                cell.classList.add('jcalendar-disabled');
                            }
                        }
                    }
                    // Day cell
                    row.appendChild(cell);
                    // Index
                    index++;
                }

                // Add cell to the calendar body
                calendarBody.appendChild(row);
            }

            // Show time controls
            if (obj.options.time) {
                calendarControlsTime.style.display = '';
            } else {
                calendarControlsTime.style.display = 'none';
            }

            // Update
            updateActions();
        }

        obj.getMonths = function () {
            // Mode
            obj.options.mode = 'months';

            // Loading month labels
            var months = obj.options.months;

            // Value
            var value = obj.options.value;

            // Current date
            var date = new Date();
            var currentYear = parseInt(date.getFullYear());
            var currentMonth = parseInt(date.getMonth()) + 1;
            var selectedYear = obj.date && helpers.isNumeric(obj.date[0]) ? obj.date[0] : currentYear;
            var selectedMonth = obj.date && helpers.isNumeric(obj.date[1]) ? obj.date[1] : currentMonth;

            // Update title
            calendarLabelYear.innerHTML = obj.date[0];
            calendarLabelMonth.innerHTML = months[selectedMonth - 1];

            // Table
            var table = document.createElement('table');
            table.setAttribute('width', '100%');

            // Row
            var row = null;

            // Calendar table
            for (var i = 0; i < 12; i++) {
                if (!(i % 4)) {
                    // Reset cells container
                    var row = document.createElement('tr');
                    row.setAttribute('align', 'center');
                    table.appendChild(row);
                }

                // Create cell
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-set-month');
                cell.setAttribute('data-value', i + 1);
                cell.innerText = months[i];

                if (obj.options.validRange) {
                    var current = selectedYear + '-' + helpers.two(i + 1);
                    if (!obj.options.validRange[0] || current >= obj.options.validRange[0].substr(0, 7)) {
                        var test1 = true;
                    } else {
                        var test1 = false;
                    }

                    if (!obj.options.validRange[1] || current <= obj.options.validRange[1].substr(0, 7)) {
                        var test2 = true;
                    } else {
                        var test2 = false;
                    }

                    if (!(test1 && test2)) {
                        cell.classList.add('jcalendar-disabled');
                    }
                }

                if (i + 1 == selectedMonth) {
                    cell.classList.add('jcalendar-selected');
                }

                if (currentYear == selectedYear && i + 1 == currentMonth) {
                    cell.style.fontWeight = 'bold';
                }

                row.appendChild(cell);
            }

            calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
            calendarBody.children[0].children[0].appendChild(table);

            // Update
            updateActions();
        }

        obj.getYears = function () {
            // Mode
            obj.options.mode = 'years';

            // Current date
            var date = new Date();
            var currentYear = date.getFullYear();
            var selectedYear = obj.date && helpers.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());

            // Array of years
            var y = [];
            for (var i = 0; i < 25; i++) {
                y[i] = parseInt(obj.date[0]) + (i - 12);
            }

            // Assembling the year tables
            var table = document.createElement('table');
            table.setAttribute('width', '100%');

            for (var i = 0; i < 25; i++) {
                if (!(i % 5)) {
                    // Reset cells container
                    var row = document.createElement('tr');
                    row.setAttribute('align', 'center');
                    table.appendChild(row);
                }

                // Create cell
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-set-year');
                cell.innerText = y[i];

                if (selectedYear == y[i]) {
                    cell.classList.add('jcalendar-selected');
                }

                if (currentYear == y[i]) {
                    cell.style.fontWeight = 'bold';
                }

                row.appendChild(cell);
            }

            calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
            calendarBody.firstChild.firstChild.appendChild(table);

            // Update
            updateActions();
        }

        obj.setLabel = function (value, mixed) {
            return Component.getDateString(value, mixed);
        }

        obj.fromFormatted = function (value, format) {
            return Component.extractDateFromString(value, format);
        }

        var mouseUpControls = function (e) {
            var element = helpers.findElement(e.target, 'jcalendar-container');
            if (element) {
                var action = e.target.className;

                // Object id
                if (action == 'jcalendar-prev') {
                    obj.prev();
                } else if (action == 'jcalendar-next') {
                    obj.next();
                } else if (action == 'jcalendar-month') {
                    obj.getMonths();
                } else if (action == 'jcalendar-year') {
                    obj.getYears();
                } else if (action == 'jcalendar-set-year') {
                    obj.date[0] = e.target.innerText;
                    if (obj.options.type == 'year-month-picker') {
                        obj.getMonths();
                    } else {
                        obj.getDays();
                    }
                } else if (e.target.classList.contains('jcalendar-set-month')) {
                    var month = parseInt(e.target.getAttribute('data-value'));
                    if (obj.options.type == 'year-month-picker') {
                        obj.update(e.target, month);
                    } else {
                        obj.date[1] = month;
                        obj.getDays();
                    }
                } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update' || action == 'jcalendar-close') {
                    obj.close(null, true);
                } else if (action == 'jcalendar-backdrop') {
                    obj.close(false, false);
                } else if (action == 'jcalendar-reset') {
                    obj.reset();
                } else if (e.target.classList.contains('jcalendar-set-day') && e.target.innerText) {
                    obj.update(e.target);
                }
            } else {
                obj.close(false, false);
            }
        }

        var keyUpControls = function (e) {
            if (e.target.value && e.target.value.length > 3) {
                var test = Component.extractDateFromString(e.target.value, obj.options.format);
                if (test) {
                    obj.setValue(test);
                }
            }
        }

        // Update actions button
        var updateActions = function () {
            var currentDay = calendar.querySelector('.jcalendar-selected');

            if (currentDay && currentDay.classList.contains('jcalendar-disabled')) {
                calendarControlsUpdateButton.setAttribute('disabled', 'disabled');
                calendarSelectHour.setAttribute('disabled', 'disabled');
                calendarSelectMin.setAttribute('disabled', 'disabled');
            } else {
                calendarControlsUpdateButton.removeAttribute('disabled');
                calendarSelectHour.removeAttribute('disabled');
                calendarSelectMin.removeAttribute('disabled');
            }

            // Event
            if (typeof (obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
            }
        }

        var calendar = null;
        var calendarReset = null;
        var calendarConfirm = null;
        var calendarContainer = null;
        var calendarContent = null;
        var calendarLabelYear = null;
        var calendarLabelMonth = null;
        var calendarTable = null;
        var calendarBody = null;

        var calendarControls = null;
        var calendarControlsTime = null;
        var calendarControlsUpdate = null;
        var calendarControlsUpdateButton = null;
        var calendarSelectHour = null;
        var calendarSelectMin = null;

        var init = function () {
            // Get value from initial element if that is an input
            if (el.tagName == 'INPUT' && el.value) {
                options.value = el.value;
            }

            // Calendar DOM elements
            calendarReset = document.createElement('div');
            calendarReset.className = 'jcalendar-reset';

            calendarConfirm = document.createElement('div');
            calendarConfirm.className = 'jcalendar-confirm';

            calendarControls = document.createElement('div');
            calendarControls.className = 'jcalendar-controls'
            calendarControls.style.borderBottom = '1px solid #ddd';
            calendarControls.appendChild(calendarReset);
            calendarControls.appendChild(calendarConfirm);

            calendarContainer = document.createElement('div');
            calendarContainer.className = 'jcalendar-container';
            calendarContent = document.createElement('div');
            calendarContent.className = 'jcalendar-content';
            calendarContainer.appendChild(calendarContent);

            // Main element
            if (el.tagName == 'DIV') {
                calendar = el;
                calendar.classList.add('jcalendar-inline');
            } else {
                // Add controls to the screen
                calendarContent.appendChild(calendarControls);

                calendar = document.createElement('div');
                calendar.className = 'jcalendar';
            }
            calendar.classList.add('jcalendar-container');
            calendar.appendChild(calendarContainer);

            // Table container
            var calendarTableContainer = document.createElement('div');
            calendarTableContainer.className = 'jcalendar-table';
            calendarContent.appendChild(calendarTableContainer);

            // Previous button
            var calendarHeaderPrev = document.createElement('td');
            calendarHeaderPrev.setAttribute('colspan', '2');
            calendarHeaderPrev.className = 'jcalendar-prev';

            // Header with year and month
            calendarLabelYear = document.createElement('span');
            calendarLabelYear.className = 'jcalendar-year';
            calendarLabelMonth = document.createElement('span');
            calendarLabelMonth.className = 'jcalendar-month';

            var calendarHeaderTitle = document.createElement('td');
            calendarHeaderTitle.className = 'jcalendar-header';
            calendarHeaderTitle.setAttribute('colspan', '3');
            calendarHeaderTitle.appendChild(calendarLabelMonth);
            calendarHeaderTitle.appendChild(calendarLabelYear);

            var calendarHeaderNext = document.createElement('td');
            calendarHeaderNext.setAttribute('colspan', '2');
            calendarHeaderNext.className = 'jcalendar-next';

            var calendarHeader = document.createElement('thead');
            var calendarHeaderRow = document.createElement('tr');
            calendarHeaderRow.appendChild(calendarHeaderPrev);
            calendarHeaderRow.appendChild(calendarHeaderTitle);
            calendarHeaderRow.appendChild(calendarHeaderNext);
            calendarHeader.appendChild(calendarHeaderRow);

            calendarTable = document.createElement('table');
            calendarBody = document.createElement('tbody');
            calendarTable.setAttribute('cellpadding', '0');
            calendarTable.setAttribute('cellspacing', '0');
            calendarTable.appendChild(calendarHeader);
            calendarTable.appendChild(calendarBody);
            calendarTableContainer.appendChild(calendarTable);

            calendarSelectHour = document.createElement('select');
            calendarSelectHour.className = 'jcalendar-select';
            calendarSelectHour.onchange = function () {
                obj.date[3] = this.value;

                // Event
                if (typeof (obj.options.onupdate) == 'function') {
                    obj.options.onupdate(el, obj.getValue());
                }
            }

                for (var i = 0; i < 24; i++) {
                    var element = document.createElement('option');
                    element.value = i;
                    element.innerHTML = helpers.two(i);
                    calendarSelectHour.appendChild(element);
                }

            calendarSelectMin = document.createElement('select');
            calendarSelectMin.className = 'jcalendar-select';
            calendarSelectMin.onchange = function () {
                obj.date[4] = this.value;

                // Event
                if (typeof (obj.options.onupdate) == 'function') {
                    obj.options.onupdate(el, obj.getValue());
                }
            }

            for (var i = 0; i < 60; i++) {
                var element = document.createElement('option');
                element.value = i;
                element.innerHTML = helpers.two(i);
                calendarSelectMin.appendChild(element);
            }

            // Footer controls
            var calendarControlsFooter = document.createElement('div');
            calendarControlsFooter.className = 'jcalendar-controls';

            calendarControlsTime = document.createElement('div');
            calendarControlsTime.className = 'jcalendar-time';
            calendarControlsTime.style.maxWidth = '140px';
            calendarControlsTime.appendChild(calendarSelectHour);
            calendarControlsTime.appendChild(calendarSelectMin);

            calendarControlsUpdateButton = document.createElement('button');
            calendarControlsUpdateButton.setAttribute('type', 'button');
            calendarControlsUpdateButton.className = 'jcalendar-update';

            calendarControlsUpdate = document.createElement('div');
            calendarControlsUpdate.style.flexGrow = '10';
            calendarControlsUpdate.appendChild(calendarControlsUpdateButton);
            calendarControlsFooter.appendChild(calendarControlsTime);

            // Only show the update button for input elements
            if (el.tagName == 'INPUT') {
                calendarControlsFooter.appendChild(calendarControlsUpdate);
            }

            calendarContent.appendChild(calendarControlsFooter);

            var calendarBackdrop = document.createElement('div');
            calendarBackdrop.className = 'jcalendar-backdrop';
            calendar.appendChild(calendarBackdrop);

            // Handle events
            el.addEventListener("keyup", keyUpControls);

            // Add global events
            calendar.addEventListener("swipeleft", function (e) {
                animation.slideLeft(calendarTable, 0, function () {
                    obj.next();
                    animation.slideRight(calendarTable, 1);
                });
                e.preventDefault();
                e.stopPropagation();
            });

            calendar.addEventListener("swiperight", function (e) {
                animation.slideRight(calendarTable, 0, function () {
                    obj.prev();
                    animation.slideLeft(calendarTable, 1);
                });
                e.preventDefault();
                e.stopPropagation();
            });

            if ('ontouchend' in document.documentElement === true) {
                calendar.addEventListener("touchend", mouseUpControls);
                el.addEventListener("touchend", obj.open);
            } else {
                calendar.addEventListener("mouseup", mouseUpControls);
                el.addEventListener("mouseup", obj.open);
            }

            // Global controls
            if (!Component.hasEvents) {
                // Execute only one time
                Component.hasEvents = true;
                // Enter and Esc
                document.addEventListener("keydown", Component.keydown);
            }

            // Set configuration
            obj.setOptions(options);

            // Append element to the DOM
            if (el.tagName == 'INPUT') {
                el.parentNode.insertBefore(calendar, el.nextSibling);
                // Add properties
                el.setAttribute('autocomplete', 'off');
                // Element
                el.classList.add('jcalendar-input');
                // Value
                el.value = obj.setLabel(obj.getValue(), obj.options);
            } else {
                // Get days
                obj.getDays();
                // Hour
                if (obj.options.time) {
                    calendarSelectHour.value = obj.date[3];
                    calendarSelectMin.value = obj.date[4];
                }
            }

            // Controls - must be set before open() for correct height calculations
            if (obj.options.controls == false) {
                calendarContainer.classList.add('jcalendar-hide-controls');
            }

            // Default opened
            if (obj.options.opened == true) {
                obj.open();
            }

            // Change method
            el.change = obj.setValue;

            // Global generic value handler
            el.val = function (val) {
                if (val === undefined) {
                    return obj.getValue();
                } else {
                    obj.setValue(val);
                }
            }

            // Keep object available from the node
            el.calendar = calendar.calendar = obj;
        }

        init();

        return obj;
    });

    Component.keydown = function (e) {
        var calendar = null;
        if (calendar = Component.current) {
            if (e.which == 13) {
                // ENTER
                calendar.close(false, true);
            } else if (e.which == 27) {
                // ESC
                calendar.close(false, false);
            }
        }
    }

    Component.prettify = function (d, texts) {
        if (!texts) {
            var texts = {
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

        var d1 = new Date();
        var d2 = new Date(d);
        var total = parseInt((d1 - d2) / 1000 / 60);

        String.prototype.format = function (o) {
            return this.replace('{0}', o);
        }

        if (total == 0) {
            var text = texts.justNow;
        } else if (total < 90) {
            var text = texts.xMinutesAgo.format(total);
        } else if (total < 1440) { // One day
            var text = texts.xHoursAgo.format(Math.round(total / 60));
        } else if (total < 20160) { // 14 days
            var text = texts.xDaysAgo.format(Math.round(total / 1440));
        } else if (total < 43200) { // 30 days
            var text = texts.xWeeksAgo.format(Math.round(total / 10080));
        } else if (total < 1036800) { // 24 months
            var text = texts.xMonthsAgo.format(Math.round(total / 43200));
        } else { // 24 months+
            var text = texts.xYearsAgo.format(Math.round(total / 525600));
        }

        return text;
    }

    Component.prettifyAll = function () {
        var elements = document.querySelectorAll('.prettydate');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute('data-date')) {
                elements[i].innerHTML = Component.prettify(elements[i].getAttribute('data-date'));
            } else {
                if (elements[i].innerHTML) {
                    elements[i].setAttribute('title', elements[i].innerHTML);
                    elements[i].setAttribute('data-date', elements[i].innerHTML);
                    elements[i].innerHTML = Component.prettify(elements[i].innerHTML);
                }
            }
        }
    }

    Component.now = HelpersDate.now;
    Component.toArray = HelpersDate.toArray;
    Component.dateToNum = HelpersDate.dateToNum
    Component.numToDate = HelpersDate.numToDate;
    Component.weekdays = HelpersDate.weekdays;
    Component.months = HelpersDate.months;
    Component.weekdaysShort = HelpersDate.weekdaysShort;
    Component.monthsShort = HelpersDate.monthsShort;

    // Legacy shortcut
    Component.extractDateFromString = Mask.extractDateFromString;
    Component.getDateString = Mask.getDateString;

    return Component;
}

/* harmony default export */ var calendar = (Calendar());
;// CONCATENATED MODULE: ./src/plugins/palette.js
// More palettes https://coolors.co/ or https://gka.github.io/palettes/#/10|s|003790,005647,ffffe0|ffffe0,ff005e,93003a|1|1

function Palette() {

    var palette = {
        material: [
            ["#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1"],
            ["#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc"],
            ["#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5"],
            ["#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae"],
            ["#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c"],
            ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"],
            ["#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a"],
            ["#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"],
            ["#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f"],
            ["#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"],
        ],
        fire: [
            ["0b1a6d", "840f38", "b60718", "de030b", "ff0c0c", "fd491c", "fc7521", "faa331", "fbb535", "ffc73a"],
            ["071147", "5f0b28", "930513", "be0309", "ef0000", "fa3403", "fb670b", "f9991b", "faad1e", "ffc123"],
            ["03071e", "370617", "6a040f", "9d0208", "d00000", "dc2f02", "e85d04", "f48c06", "faa307", "ffba08"],
            ["020619", "320615", "61040d", "8c0207", "bc0000", "c82a02", "d05203", "db7f06", "e19405", "efab00"],
            ["020515", "2d0513", "58040c", "7f0206", "aa0000", "b62602", "b94903", "c57205", "ca8504", "d89b00"],
        ],
        baby: [
            ["eddcd2", "fff1e6", "fde2e4", "fad2e1", "c5dedd", "dbe7e4", "f0efeb", "d6e2e9", "bcd4e6", "99c1de"],
            ["e1c4b3", "ffd5b5", "fab6ba", "f5a8c4", "aacecd", "bfd5cf", "dbd9d0", "baceda", "9dc0db", "7eb1d5"],
            ["daa990", "ffb787", "f88e95", "f282a9", "8fc4c3", "a3c8be", "cec9b3", "9dbcce", "82acd2", "649dcb"],
            ["d69070", "ff9c5e", "f66770", "f05f8f", "74bbb9", "87bfae", "c5b993", "83aac3", "699bca", "4d89c2"],
            ["c97d5d", "f58443", "eb4d57", "e54a7b", "66a9a7", "78ae9c", "b5a67e", "7599b1", "5c88b7", "4978aa"],
        ],
        chart: [
            ['#C1D37F', '#4C5454', '#FFD275', '#66586F', '#D05D5B', '#C96480', '#95BF8F', '#6EA240', '#0F0F0E', '#EB8258', '#95A3B3', '#995D81'],
        ],
    }

    var Component = function (o) {
        // Otherwise get palette value
        if (palette[o]) {
            return palette[o];
        } else {
            return palette.material;
        }
    }

    Component.get = function (o) {
        // Otherwise get palette value
        if (palette[o]) {
            return palette[o];
        } else {
            return palette;
        }
    }

    Component.set = function (o, v) {
        palette[o] = v;
    }

    return Component;
}

/* harmony default export */ var palette = (Palette());
;// CONCATENATED MODULE: ./src/plugins/tabs.js




function Tabs(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: [],
        position: null,
        allowCreate: false,
        allowChangePosition: false,
        onclick: null,
        onload: null,
        onchange: null,
        oncreate: null,
        ondelete: null,
        onbeforecreate: null,
        onchangeposition: null,
        animation: false,
        hideHeaders: false,
        padding: null,
        palette: null,
        maxWidth: null,
    }

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jtabs');

    var prev = null;
    var next = null;
    var border = null;

    // Helpers
    const setBorder = function(index) {
        if (obj.options.animation) {
            setTimeout(function() {
                let rect = obj.headers.children[index].getBoundingClientRect();

                if (obj.options.palette === 'modern') {
                    border.style.width = rect.width - 4 + 'px';
                    border.style.left = obj.headers.children[index].offsetLeft + 2 + 'px';
                } else {
                    border.style.width = rect.width + 'px';
                    border.style.left = obj.headers.children[index].offsetLeft + 'px';
                }

                if (obj.options.position === 'bottom') {
                    border.style.top = '0px';
                } else {
                    border.style.bottom = '0px';
                }
            }, 50);
        }
    }

    var updateControls = function(x) {
        if (typeof(obj.headers.scrollTo) == 'function') {
            obj.headers.scrollTo({
                left: x,
                behavior: 'smooth',
            });
        } else {
            obj.headers.scrollLeft = x;
        }

        if (x <= 1) {
            prev.classList.add('disabled');
        } else {
            prev.classList.remove('disabled');
        }

        if (x >= obj.headers.scrollWidth - obj.headers.offsetWidth) {
            next.classList.add('disabled');
        } else {
            next.classList.remove('disabled');
        }

        if (obj.headers.scrollWidth <= obj.headers.offsetWidth) {
            prev.style.display = 'none';
            next.style.display = 'none';
        } else {
            prev.style.display = '';
            next.style.display = '';
        }
    }

    obj.setBorder = setBorder;

    // Set value
    obj.open = function(index) {
        // This is to force safari to update the children
        const items = Array.from(obj.content.children);
        if (! obj.content.children[index]) {
            return;
        }

        var previous = null;
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                // Current one
                previous = i;
            }
            // Remote selected
            obj.headers.children[i].classList.remove('jtabs-selected');
            obj.headers.children[i].removeAttribute('aria-selected')
            if (obj.content.children[i]) {
                obj.content.children[i].classList.remove('jtabs-selected');
            }
        }

        obj.headers.children[index].classList.add('jtabs-selected');
        obj.headers.children[index].setAttribute('aria-selected', 'true')

        if (obj.content.children[index]) {
            obj.content.children[index].classList.add('jtabs-selected');
        }

        if (previous != index && typeof(obj.options.onchange) == 'function') {
            if (obj.content.children[index]) {
                obj.options.onchange(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        }

        // Hide
        if (obj.options.hideHeaders == true && (obj.headers.children.length < 3 && obj.options.allowCreate == false)) {
            obj.headers.parentNode.style.display = 'none';
        } else {
            obj.headers.parentNode.style.display = '';

            var x1 = obj.headers.children[index].offsetLeft;
            var x2 = x1 + obj.headers.children[index].offsetWidth;
            var r1 = obj.headers.scrollLeft;
            var r2 = r1 + obj.headers.offsetWidth;

            if (! (r1 <= x1 && r2 >= x2)) {
                // Out of the viewport
                updateControls(x1 - 1);
            }

            // Set border
            setBorder(index);
        }
    }

    obj.selectIndex = function(a) {
        var index = Array.prototype.indexOf.call(obj.headers.children, a);
        if (index >= 0) {
            obj.open(index);
        }

        return index;
    }

    obj.rename = function(i, title) {
        if (! title) {
            title = prompt('New title', obj.headers.children[i].innerText);
        }
        obj.headers.children[i].innerText = title;
        setBorder(obj.getActive());
    }

    obj.create = function(title, url) {
        if (typeof(obj.options.onbeforecreate) == 'function') {
            var ret = obj.options.onbeforecreate(el, title);
            if (ret === false) {
                return false;
            } else {
                title = ret;
            }
        }

        var div = obj.appendElement(title);

        if (typeof(obj.options.oncreate) == 'function') {
            obj.options.oncreate(el, div)
        }

        setBorder(obj.getActive());

        return div;
    }

    obj.remove = function(index) {
        return obj.deleteElement(index);
    }

    obj.nextNumber = function() {
        var num = 0;
        for (var i = 0; i < obj.headers.children.length; i++) {
            var tmp = obj.headers.children[i].innerText.match(/[0-9].*/);
            if (tmp > num) {
                num = parseInt(tmp);
            }
        }
        if (! num) {
            num = 1;
        } else {
            num++;
        }

        return num;
    }

    obj.deleteElement = function(index) {
        let current = obj.getActive();

        if (! obj.headers.children[index]) {
            return false;
        } else {
            obj.headers.removeChild(obj.headers.children[index]);
            obj.content.removeChild(obj.content.children[index]);
        }

        if (current === index) {
            obj.open(0);
        } else {
            let current = obj.getActive() || 0;
            setBorder(current);
        }

        if (typeof(obj.options.ondelete) == 'function') {
            obj.options.ondelete(el, index)
        }
    }

    obj.appendElement = function(title, cb, openTab, position) {
        if (! title) {
            var title = prompt('Title?', '');
        }

        if (title) {
            let headerId = helpers.guid();
            let contentId = helpers.guid();
            // Add content
            var div = document.createElement('div');
            div.setAttribute('id', contentId);
            div.setAttribute('role', 'tabpanel');
            div.setAttribute('aria-labelledby', headerId);

            // Add headers
            var h = document.createElement('div');
            h.setAttribute('id', headerId);
            h.setAttribute('role', 'tab');
            h.setAttribute('aria-controls', contentId);

            h.textContent = title;
            h.content = div;

            if (typeof(position) === 'undefined') {
                obj.content.appendChild(div);
                obj.headers.insertBefore(h, obj.headers.lastChild);
            } else {
                let r = obj.content.children[position];
                if (r) {
                    obj.content.insertBefore(div, r);
                } else {
                    obj.content.appendChild(div);
                }
                r = obj.headers.children[position] || obj.headers.lastChild;
                obj.headers.insertBefore(h, r);
            }

            // Sortable
            if (obj.options.allowChangePosition) {
                h.setAttribute('draggable', 'true');
            }

            // Open new tab
            if (openTab !== false) {
                // Open new tab
                obj.selectIndex(h);
            }

            // Callback
            if (typeof(cb) == 'function') {
                cb(div, h);
            }

            // Return element
            return div;
        }
    }

    obj.getActive = function() {
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                return i;
            }
        }
        return false;
    }

    obj.updateContent = function(position, newContent) {
        if (typeof newContent !== 'string') {
            var contentItem = newContent;
        } else {
            var contentItem = document.createElement('div');
            contentItem.innerHTML = newContent;
        }

        if (obj.content.children[position].classList.contains('jtabs-selected')) {
            newContent.classList.add('jtabs-selected');
        }

        obj.content.replaceChild(newContent, obj.content.children[position]);

        setBorder();
    }

    obj.updatePosition = function(f, t, ignoreEvents, openTab) {
        // Ondrop update position of content
        if (f > t) {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t]);
        } else {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t].nextSibling);
        }

        // Open destination tab
        if (openTab !== false) {
            obj.open(t);
        } else {
            const activeIndex = obj.getActive();

            if (t < activeIndex) {
                obj.setBorder(activeIndex);
            }
        }

        // Call event
        if (! ignoreEvents && typeof(obj.options.onchangeposition) == 'function') {
            obj.options.onchangeposition(obj.headers, f, t);
        }
    }

    obj.move = function(f, t, ignoreEvents, openTab) {
        if (f > t) {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t]);
        } else {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t].nextSibling);
        }

        obj.updatePosition(f, t, ignoreEvents, openTab);
    }

    obj.setBorder = setBorder;

    obj.init = function() {
        el.textContent = '';

        // Make sure the component is blank
        obj.headers = document.createElement('div');
        obj.content = document.createElement('div');
        obj.headers.classList.add('jtabs-headers');
        obj.headers.setAttribute('role', 'tablist');
        obj.content.classList.add('jtabs-content');
        obj.content.setAttribute('role', 'region');
        obj.content.setAttribute('aria-label', 'Tab Panels');

        if (obj.options.palette) {
            el.classList.add('jtabs-modern');
        } else {
            el.classList.remove('jtabs-modern');
        }

        // Padding
        if (obj.options.padding) {
            obj.content.style.padding = parseInt(obj.options.padding) + 'px';
        }

        // Header
        var header = document.createElement('div');
        header.className = 'jtabs-headers-container';
        header.appendChild(obj.headers);
        if (obj.options.maxWidth) {
            header.style.maxWidth = parseInt(obj.options.maxWidth) + 'px';
        }

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jtabs-controls';
        controls.setAttribute('draggable', 'false');
        header.appendChild(controls);

        // Append DOM elements
        if (obj.options.position == 'bottom') {
            el.appendChild(obj.content);
            el.appendChild(header);
        } else {
            el.appendChild(header);
            el.appendChild(obj.content);
        }

        // New button
        if (obj.options.allowCreate == true) {
            var add = document.createElement('div');
            add.className = 'jtabs-add';
            add.onclick = function() {
                obj.create();
            }
            controls.appendChild(add);
        }

        prev = document.createElement('div');
        prev.className = 'jtabs-prev';
        prev.onclick = function() {
            updateControls(obj.headers.scrollLeft - obj.headers.offsetWidth);
        }
        controls.appendChild(prev);

        next = document.createElement('div');
        next.className = 'jtabs-next';
        next.onclick = function() {
            updateControls(obj.headers.scrollLeft + obj.headers.offsetWidth);
        }
        controls.appendChild(next);

        // Data
        for (var i = 0; i < obj.options.data.length; i++) {
            // Title
            if (obj.options.data[i].titleElement) {
                var headerItem = obj.options.data[i].titleElement;
            } else {
                var headerItem = document.createElement('div');
            }
            // Icon
            if (obj.options.data[i].icon) {
                var iconContainer = document.createElement('div');
                var icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.textContent = obj.options.data[i].icon;
                iconContainer.appendChild(icon);
                headerItem.appendChild(iconContainer);
            }
            // Title
            if (obj.options.data[i].title) {
                var title = document.createTextNode(obj.options.data[i].title);
                headerItem.appendChild(title);
            }
            // Width
            if (obj.options.data[i].width) {
                headerItem.style.width = obj.options.data[i].width;
            }
            // Content
            if (obj.options.data[i].contentElement) {
                var contentItem = obj.options.data[i].contentElement;
            } else {
                var contentItem = document.createElement('div');
                contentItem.innerHTML = obj.options.data[i].content;
            }
            obj.headers.appendChild(headerItem);
            obj.content.appendChild(contentItem);
        }

        // Animation
        border = document.createElement('div');
        border.className = 'jtabs-border';
        obj.headers.appendChild(border);

        if (obj.options.animation) {
            el.classList.add('jtabs-animation');
        }

        // Events
        obj.headers.addEventListener("click", function(e) {
            if (e.target.parentNode.classList.contains('jtabs-headers')) {
                var target = e.target;
            } else {
                if (e.target.tagName == 'I') {
                    var target = e.target.parentNode.parentNode;
                } else {
                    var target = e.target.parentNode;
                }
            }

            var index = obj.selectIndex(target);

            if (typeof(obj.options.onclick) == 'function') {
                obj.options.onclick(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        });

        obj.headers.addEventListener("contextmenu", function(e) {
            obj.selectIndex(e.target);
        });

        if (obj.headers.children.length) {
            // Open first tab
            obj.open(0);
        }

        // Update controls
        updateControls(0);

        if (obj.options.allowChangePosition == true) {
            Sorting(obj.headers, {
                direction: 1,
                ondrop: function(a,b,c) {
                    obj.updatePosition(b,c);
                },
            });
        }

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }
    }

    // Loading existing nodes as the data
    if (el.children[0] && el.children[0].children.length) {
        // Create from existing elements
        for (var i = 0; i < el.children[0].children.length; i++) {
            var item = obj.options.data && obj.options.data[i] ? obj.options.data[i] : {};

            if (el.children[1] && el.children[1].children[i]) {
                item.titleElement = el.children[0].children[i];
                item.contentElement = el.children[1].children[i];
            } else {
                item.contentElement = el.children[0].children[i];
            }

            obj.options.data[i] = item;
        }
    }

    // Remote controller flag
    var loadingRemoteData = false;

    // Create from data
    if (obj.options.data) {
        // Append children
        for (var i = 0; i < obj.options.data.length; i++) {
            if (obj.options.data[i].url) {
                ajax({
                    url: obj.options.data[i].url,
                    type: 'GET',
                    dataType: 'text/html',
                    index: i,
                    success: function(result) {
                        obj.options.data[this.index].content = result;
                    },
                    complete: function() {
                        obj.init();
                    }
                });

                // Flag loading
                loadingRemoteData = true;
            }
        }
    }

    if (! loadingRemoteData) {
        obj.init();
    }

    el.tabs = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/color.js






function Color(el, options) {
    // Already created, update options
    if (el.color) {
        return el.color.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'color' };
    obj.options = {};

    var container = null;
    var backdrop = null;
    var content = null;
    var resetButton = null;
    var closeButton = null;
    var tabs = null;
    var jsuitesTabs = null;

    /**
     * Update options
     */
    obj.setOptions = function(options, reset) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {string} placeholder - The default instruction text on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onclose - Method to be execute when the element is closed
         * @property {string} doneLabel - Label for button done
         * @property {string} resetLabel - Label for button reset
         * @property {string} resetValue - Value for button reset
         * @property {Bool} showResetButton - Active or note for button reset - default false
         */
        var defaults = {
            placeholder: '',
            value: null,
            onopen: null,
            onclose: null,
            onchange: null,
            closeOnChange: true,
            palette: null,
            position: null,
            doneLabel: 'Done',
            resetLabel: 'Reset',
            fullscreen: false,
            opened: false,
        }

        if (! options) {
            options = {};
        }

        if (options && ! options.palette) {
            // Default palette
            options.palette = palette();
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Update the text of the controls, if they have already been created
        if (resetButton) {
            resetButton.innerHTML = obj.options.resetLabel;
        }
        if (closeButton) {
            closeButton.innerHTML = obj.options.doneLabel;
        }

        // Update the pallete
        if (obj.options.palette && jsuitesTabs) {
            jsuitesTabs.updateContent(0, table());
        }

        // Value
        if (typeof obj.options.value === 'string') {
            el.value = obj.options.value;
            if (el.tagName === 'INPUT') {
                el.style.color = el.value;
                el.style.backgroundColor = el.value;
            }
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        } else {
            if (el.getAttribute('placeholder')) {
                el.removeAttribute('placeholder');
            }
        }

        return obj;
    }

    obj.select = function(color) {
        // Remove current selected mark
        var selected = container.querySelector('.jcolor-selected');
        if (selected) {
            selected.classList.remove('jcolor-selected');
        }

        // Mark cell as selected
        if (obj.values[color]) {
            obj.values[color].classList.add('jcolor-selected');
        }

        obj.options.value = color;
    }

    /**
     * Open color pallete
     */
    obj.open = function() {
        if (! container.classList.contains('jcolor-focus')) {
            // Start tracking
            tracking(obj, true);

            // Show color picker
            container.classList.add('jcolor-focus');

            // Select current color
            if (obj.options.value) {
                obj.select(obj.options.value);
            }

            // Reset margin
            content.style.marginTop = '';
            content.style.marginLeft = '';

            var rectContent = content.getBoundingClientRect();
            var availableWidth = helpers.getWindowWidth();
            var availableHeight = helpers.getWindowHeight();

            if (availableWidth < 800 || obj.options.fullscreen == true) {
                content.classList.add('jcolor-fullscreen');
                animation.slideBottom(content, 1);
                backdrop.style.display = 'block';
            } else {
                if (content.classList.contains('jcolor-fullscreen')) {
                    content.classList.remove('jcolor-fullscreen');
                    backdrop.style.display = '';
                }

                if (obj.options.position) {
                    content.style.position = 'fixed';
                } else {
                    content.style.position = '';
                }

                if (rectContent.left + rectContent.width > availableWidth) {
                    content.style.marginLeft = -1 * (rectContent.left + rectContent.width - (availableWidth - 20)) + 'px';
                }
                if (rectContent.top + rectContent.height > availableHeight) {
                    content.style.marginTop = -1 * (rectContent.top + rectContent.height - (availableHeight - 20)) + 'px';
                }
            }


            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el, obj);
            }

            jsuitesTabs.setBorder(jsuitesTabs.getActive());

            // Update sliders
            if (obj.options.value) {
                var rgb = HexToRgb(obj.options.value);

                rgbInputs.forEach(function(rgbInput, index) {
                    rgbInput.value = rgb[index];
                    rgbInput.dispatchEvent(new Event('input'));
                });
            }
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (container.classList.contains('jcolor-focus')) {
            // Remove focus
            container.classList.remove('jcolor-focus');
            // Make sure backdrop is hidden
            backdrop.style.display = '';
            // Call related events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el, obj);
            }
            // Stop  the object
            tracking(obj, false);
        }

        return obj.options.value;
    }

    /**
     * Set value
     */
    obj.setValue = function(color) {
        if (! color) {
            color = '';
        }

        if (color != obj.options.value) {
            obj.options.value = color;
            slidersResult = color;

            // Remove current selecded mark
            obj.select(color);

            // Onchange
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, color, obj);
            }

            // Changes
            if (el.value != obj.options.value) {
                // Set input value
                el.value = obj.options.value;
                if (el.tagName === 'INPUT') {
                    el.style.color = el.value;
                    el.style.backgroundColor = el.value;
                }

                // Element onchange native
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }

            if (obj.options.closeOnChange == true) {
                obj.close();
            }
        }
    }

    /**
     * Get value
     */
    obj.getValue = function() {
        return obj.options.value;
    }

    var backdropClickControl = false;

    // Converts a number in decimal to hexadecimal
    var decToHex = function(num) {
        var hex = num.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    // Converts a color in rgb to hexadecimal
    var rgbToHex = function(r, g, b) {
        return "#" + decToHex(r) + decToHex(g) + decToHex(b);
    }

    // Converts a number in hexadecimal to decimal
    var hexToDec = function(hex) {
        return parseInt('0x' + hex);
    }

    // Converts a color in hexadecimal to rgb
    var HexToRgb = function(hex) {
        return [hexToDec(hex.substr(1, 2)), hexToDec(hex.substr(3, 2)), hexToDec(hex.substr(5, 2))]
    }

    var table = function() {
        // Content of the first tab
        var tableContainer = document.createElement('div');
        tableContainer.className = 'jcolor-grid';

        // Cells
        obj.values = [];

        // Table pallete
        var t = document.createElement('table');
        t.setAttribute('cellpadding', '7');
        t.setAttribute('cellspacing', '0');

        for (var j = 0; j < obj.options.palette.length; j++) {
            var tr = document.createElement('tr');
            for (var i = 0; i < obj.options.palette[j].length; i++) {
                var td = document.createElement('td');
                var color = obj.options.palette[j][i];
                if (color.length < 7 && color.substr(0,1) !== '#') {
                    color = '#' + color;
                }
                td.style.backgroundColor = color;
                td.setAttribute('data-value', color);
                td.innerHTML = '';
                tr.appendChild(td);

                // Selected color
                if (obj.options.value == color) {
                    td.classList.add('jcolor-selected');
                }

                // Possible values
                obj.values[color] = td;
            }
            t.appendChild(tr);
        }

        // Append to the table
        tableContainer.appendChild(t);

        return tableContainer;
    }

    // Canvas where the image will be rendered
    var canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 160;
    var context = canvas.getContext("2d");

    var resizeCanvas = function() {
        // Specifications necessary to correctly obtain colors later in certain positions
        var m = tabs.firstChild.getBoundingClientRect();
        canvas.width = m.width - 14;
        gradient()
    }

    var gradient = function() {
        var g = context.createLinearGradient(0, 0, canvas.width, 0);
        // Create color gradient
        g.addColorStop(0,    "rgb(255,0,0)");
        g.addColorStop(0.15, "rgb(255,0,255)");
        g.addColorStop(0.33, "rgb(0,0,255)");
        g.addColorStop(0.49, "rgb(0,255,255)");
        g.addColorStop(0.67, "rgb(0,255,0)");
        g.addColorStop(0.84, "rgb(255,255,0)");
        g.addColorStop(1,    "rgb(255,0,0)");
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
        g = context.createLinearGradient(0, 0, 0, canvas.height);
        g.addColorStop(0,   "rgba(255,255,255,1)");
        g.addColorStop(0.5, "rgba(255,255,255,0)");
        g.addColorStop(0.5, "rgba(0,0,0,0)");
        g.addColorStop(1,   "rgba(0,0,0,1)");
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    var hsl = function() {
        var element = document.createElement('div');
        element.className = "jcolor-hsl";

        var point = document.createElement('div');
        point.className = 'jcolor-point';

        var div = document.createElement('div');
        div.appendChild(canvas);
        div.appendChild(point);
        element.appendChild(div);

        // Moves the marquee point to the specified position
        var update = function(buttons, x, y) {
            if (buttons === 1) {
                var rect = element.getBoundingClientRect();
                var left = x - rect.left;
                var top = y - rect.top;
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left > rect.width) {
                    left = rect.width;
                }
                if (top > rect.height) {
                    top = rect.height;
                }
                point.style.left = left + 'px';
                point.style.top = top + 'px';
                var pixel = context.getImageData(left, top, 1, 1).data;
                slidersResult = rgbToHex(pixel[0], pixel[1], pixel[2]);
            }
        }

        // Applies the point's motion function to the div that contains it
        element.addEventListener('mousedown', function(e) {
            update(e.buttons, e.clientX, e.clientY);
        });

        element.addEventListener('mousemove', function(e) {
            update(e.buttons, e.clientX, e.clientY);
        });

        element.addEventListener('touchmove', function(e) {
            update(1, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        });

        return element;
    }

    var slidersResult = '';

    var rgbInputs = [];

    var changeInputColors = function() {
        if (slidersResult !== '') {
            for (var j = 0; j < rgbInputs.length; j++) {
                var currentColor = HexToRgb(slidersResult);

                currentColor[j] = 0;

                var newGradient = 'linear-gradient(90deg, rgb(';
                newGradient += currentColor.join(', ');
                newGradient += '), rgb(';

                currentColor[j] = 255;

                newGradient += currentColor.join(', ');
                newGradient += '))';

                rgbInputs[j].style.backgroundImage = newGradient;
            }
        }
    }

    var sliders = function() {
        // Content of the third tab
        var slidersElement = document.createElement('div');
        slidersElement.className = 'jcolor-sliders';

        var slidersBody = document.createElement('div');

        // Creates a range-type input with the specified name
        var createSliderInput = function(name) {
            var inputContainer = document.createElement('div');
            inputContainer.className = 'jcolor-sliders-input-container';

            var label = document.createElement('label');
            label.innerText = name;

            var subContainer = document.createElement('div');
            subContainer.className = 'jcolor-sliders-input-subcontainer';

            var input = document.createElement('input');
            input.type = 'range';
            input.min = 0;
            input.max = 255;
            input.value = 0;

            input.setAttribute('aria-label', "Color value");
            input.setAttribute('aria-valuemin', "0");
            input.setAttribute('aria-valuemax', "255");
            input.setAttribute('aria-valuenow', "0");

            inputContainer.appendChild(label);
            subContainer.appendChild(input);

            var value = document.createElement('div');
            value.innerText = input.value;

            input.addEventListener('input', function() {
                value.innerText = input.value;
            });

            subContainer.appendChild(value);
            inputContainer.appendChild(subContainer);

            slidersBody.appendChild(inputContainer);

            return input;
        }

        // Creates red, green and blue inputs
        rgbInputs = [
            createSliderInput('Red'),
            createSliderInput('Green'),
            createSliderInput('Blue'),
        ];

        slidersElement.appendChild(slidersBody);

        // Element that prints the current color
        var slidersResultColor = document.createElement('div');
        slidersResultColor.className = 'jcolor-sliders-final-color';

        var resultElement = document.createElement('div');
        resultElement.style.visibility = 'hidden';
        resultElement.innerText = 'a';
        slidersResultColor.appendChild(resultElement)

        // Update the element that prints the current color
        var updateResult = function() {
            var resultColor = rgbToHex(parseInt(rgbInputs[0].value), parseInt(rgbInputs[1].value), parseInt(rgbInputs[2].value));

            resultElement.innerText = resultColor;
            resultElement.style.color = resultColor;
            resultElement.style.removeProperty('visibility');

            slidersResult = resultColor;
        }

        // Apply the update function to color inputs
        rgbInputs.forEach(function(rgbInput) {
            rgbInput.addEventListener('input', function() {
                updateResult();
                changeInputColors();
            });
        });

        slidersElement.appendChild(slidersResultColor);

        return slidersElement;
    }

    var init = function() {
        // Initial options
        obj.setOptions(options);

        // Add a proper input tag when the element is an input
        if (el.tagName == 'INPUT') {
            el.classList.add('jcolor-input');
            el.readOnly = true;
        }

        // Table container
        container = document.createElement('div');
        container.className = 'jcolor';

        // Table container
        backdrop = document.createElement('div');
        backdrop.className = 'jcolor-backdrop';
        container.appendChild(backdrop);

        // Content
        content = document.createElement('div');
        content.className = 'jcolor-content';

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jcolor-controls';
        content.appendChild(controls);

        // Reset button
        resetButton  = document.createElement('div');
        resetButton.className = 'jcolor-reset';
        resetButton.innerHTML = obj.options.resetLabel;
        controls.appendChild(resetButton);

        // Close button
        closeButton  = document.createElement('div');
        closeButton.className = 'jcolor-close';
        closeButton.innerHTML = obj.options.doneLabel;
        controls.appendChild(closeButton);

        // Element that will be used to create the tabs
        tabs = document.createElement('div');
        content.appendChild(tabs);

        // Starts the jSuites tabs component
        jsuitesTabs = Tabs(tabs, {
            animation: true,
            data: [
                {
                    title: 'Grid',
                    contentElement: table(),
                },
                {
                    title: 'Spectrum',
                    contentElement: hsl(),
                },
                {
                    title: 'Sliders',
                    contentElement: sliders(),
                }
            ],
            onchange: function(element, instance, index) {
                if (index === 1) {
                    resizeCanvas();
                } else {
                    var color = slidersResult !== '' ? slidersResult : obj.getValue();

                    if (index === 2 && color) {
                        var rgb = HexToRgb(color);

                        rgbInputs.forEach(function(rgbInput, index) {
                            rgbInput.value = rgb[index];
                            rgbInput.dispatchEvent(new Event('input'));
                        });
                    }
                }
            },
            palette: 'modern',
        });

        container.appendChild(content);

        // Insert picker after the element
        if (el.tagName == 'INPUT') {
            el.parentNode.insertBefore(container, el.nextSibling);
        } else {
            el.appendChild(container);
        }

        container.addEventListener("click", function(e) {
            if (e.target.tagName == 'TD') {
                var value = e.target.getAttribute('data-value');
                if (value) {
                    obj.setValue(value);
                }
            } else if (e.target.classList.contains('jcolor-reset')) {
                obj.setValue('');
                obj.close();
            } else if (e.target.classList.contains('jcolor-close')) {
                if (jsuitesTabs.getActive() > 0) {
                    obj.setValue(slidersResult);
                }
                obj.close();
            } else if (e.target.classList.contains('jcolor-backdrop')) {
                obj.close();
            } else {
                obj.open();
            }
        });

        /**
         * If element is focus open the picker
         */
        el.addEventListener("mouseup", function(e) {
            obj.open();
        });

        // If the picker is open on the spectrum tab, it changes the canvas size when the window size is changed
        window.addEventListener('resize', function() {
            if (container.classList.contains('jcolor-focus') && jsuitesTabs.getActive() == 1) {
                resizeCanvas();
            }
        });

        // Default opened
        if (obj.options.opened == true) {
            obj.open();
        }

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Keep object available from the node
        el.color = obj;

        // Container shortcut
        container.color = obj;
    }

    obj.toHex = function(rgb) {
        var hex = function(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        if (rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) {
                return rgb;
            } else {
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                if (rgb && rgb.length) {
                    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                } else {
                    return "";
                }
            }
        }
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/contextmenu.js



function Contextmenu() {

    var Component = function(el, options) {
        // New instance
        var obj = {type: 'contextmenu'};
        obj.options = {};

        // Default configuration
        var defaults = {
            items: null,
            onclick: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Class definition
        el.classList.add('jcontextmenu');

        /**
         * Open contextmenu
         */
        obj.open = function (e, items) {
            if (items) {
                // Update content
                obj.options.items = items;
                // Create items
                obj.create(items);
            }

            // Close current contextmenu
            if (Component.current) {
                Component.current.close();
            }

            // Add to the opened components monitor
            tracking(obj, true);

            // Show context menu
            el.classList.add('jcontextmenu-focus');

            // Current
            Component.current = obj;

            // Coordinates
            if ((obj.options.items && obj.options.items.length > 0) || el.children.length) {
                if (e.target) {
                    if (e.changedTouches && e.changedTouches[0]) {
                        x = e.changedTouches[0].clientX;
                        y = e.changedTouches[0].clientY;
                    } else {
                        var x = e.clientX;
                        var y = e.clientY;
                    }
                } else {
                    var x = e.x;
                    var y = e.y;
                }

                var rect = el.getBoundingClientRect();

                if (window.innerHeight < y + rect.height) {
                    var h = y - rect.height;
                    if (h < 0) {
                        h = 0;
                    }
                    el.style.top = h + 'px';
                } else {
                    el.style.top = y + 'px';
                }

                if (window.innerWidth < x + rect.width) {
                    if (x - rect.width > 0) {
                        el.style.left = (x - rect.width) + 'px';
                    } else {
                        el.style.left = '10px';
                    }
                } else {
                    el.style.left = x + 'px';
                }
            }
        }

        obj.isOpened = function () {
            return el.classList.contains('jcontextmenu-focus') ? true : false;
        }

        /**
         * Close menu
         */
        obj.close = function () {
            if (el.classList.contains('jcontextmenu-focus')) {
                el.classList.remove('jcontextmenu-focus');
            }
            tracking(obj, false);
        }

        /**
         * Create items based on the declared objectd
         * @param {object} items - List of object
         */
        obj.create = function (items) {
            // Update content
            el.innerHTML = '';

            // Add header contextmenu
            var itemHeader = createHeader();
            el.appendChild(itemHeader);

            // Append items
            for (var i = 0; i < items.length; i++) {
                var itemContainer = createItemElement(items[i]);
                el.appendChild(itemContainer);
            }
        }

        /**
         * createHeader for context menu
         * @private
         * @returns {HTMLElement}
         */
        function createHeader() {
            var header = document.createElement('div');
            header.classList.add("header");
            header.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            var title = document.createElement('a');
            title.classList.add("title");
            title.innerHTML = dictionary.translate("Menu");

            header.appendChild(title);

            var closeButton = document.createElement('a');
            closeButton.classList.add("close");
            closeButton.innerHTML = dictionary.translate("close");
            closeButton.addEventListener("click", function (e) {
                obj.close();
            });

            header.appendChild(closeButton);

            return header;
        }

        /**
         * Private function for create a new Item element
         * @param {type} item
         * @returns {jsuitesL#15.jSuites.contextmenu.createItemElement.itemContainer}
         */
        function createItemElement(item) {
            if (item.type && (item.type == 'line' || item.type == 'divisor')) {
                var itemContainer = document.createElement('hr');
            } else {
                var itemContainer = document.createElement('div');
                var itemText = document.createElement('a');
                itemText.innerHTML = item.title;

                if (item.tooltip) {
                    itemContainer.setAttribute('title', item.tooltip);
                }

                if (item.icon) {
                    itemContainer.setAttribute('data-icon', item.icon);
                }

                if (item.id) {
                    itemContainer.id = item.id;
                }

                if (item.disabled) {
                    itemContainer.className = 'jcontextmenu-disabled';
                } else if (item.onclick) {
                    itemContainer.method = item.onclick;
                    itemContainer.addEventListener("mousedown", function (e) {
                        e.preventDefault();
                    });
                    itemContainer.addEventListener("mouseup", function (e) {
                        // Execute method
                        this.method(this, e);
                    });
                }
                itemContainer.appendChild(itemText);

                if (item.submenu) {
                    var itemIconSubmenu = document.createElement('span');
                    itemIconSubmenu.innerHTML = "&#9658;";
                    itemContainer.appendChild(itemIconSubmenu);
                    itemContainer.classList.add('jcontexthassubmenu');
                    var el_submenu = document.createElement('div');
                    // Class definition
                    el_submenu.classList.add('jcontextmenu');
                    // Focusable
                    el_submenu.setAttribute('tabindex', '900');

                    // Append items
                    var submenu = item.submenu;
                    for (var i = 0; i < submenu.length; i++) {
                        var itemContainerSubMenu = createItemElement(submenu[i]);
                        el_submenu.appendChild(itemContainerSubMenu);
                    }

                    itemContainer.appendChild(el_submenu);

                    // Submenu positioning logic:
                    // Case 1: Default (enough space to the right) - submenu opens to the right of the parent menu item.
                    // Case 2: Not enough space to the right, but enough to the left - submenu opens to the left of the parent menu item.
                    // Case 3: Not enough space on either side (e.g., very narrow viewport) - submenu opens below the parent menu item.
                    itemContainer.addEventListener('mouseenter', function () {
                        // Reset to default
                        el_submenu.style.left = '';
                        el_submenu.style.right = '';
                        el_submenu.style.minWidth = itemContainer.offsetWidth + 'px';

                        // Temporarily show submenu to measure
                        el_submenu.style.display = 'block';
                        el_submenu.style.opacity = '0';
                        el_submenu.style.pointerEvents = 'none';

                        // Use getBoundingClientRect to determine position
                        var parentRect = itemContainer.getBoundingClientRect();
                        var submenuRect = el_submenu.getBoundingClientRect();
                        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

                        // Calculate the right edge if rendered to the right
                        var rightEdge = parentRect.right + submenuRect.width;
                        var leftEdge = parentRect.left - submenuRect.width;

                        // If rendering to the right would overflow, render to the left
                        if (rightEdge > viewportWidth && leftEdge >= 0) {
                            el_submenu.style.left = 'auto';
                            el_submenu.style.right = '99%';
                        } 
                        // If both right and left would overflow, render to the right of the left border (worst case)
                        else if (rightEdge > viewportWidth && leftEdge < 0) {
                            el_submenu.style.left = '32px';
                            el_submenu.style.right = 'auto';
                            el_submenu.style.top = '100%';
                        }
                        // Default: render to the right
                        else {
                            el_submenu.style.left = '99%';
                            el_submenu.style.right = 'auto';
                        }

                        // Restore visibility
                        el_submenu.style.opacity = '';
                        el_submenu.style.pointerEvents = '';
                        el_submenu.style.display = '';
                    });

                    // Also reset submenu position on mouseleave to avoid stale styles
                    itemContainer.addEventListener('mouseleave', function () {
                        el_submenu.style.left = '';
                        el_submenu.style.right = '';
                        el_submenu.style.minWidth = '';
                    });
                } else if (item.shortcut) {
                    var itemShortCut = document.createElement('span');
                    itemShortCut.innerHTML = item.shortcut;
                    itemContainer.appendChild(itemShortCut);
                }
            }
            return itemContainer;
        }

        if (typeof (obj.options.onclick) == 'function') {
            el.addEventListener('click', function (e) {
                obj.options.onclick(obj, e);
            });
        }

        // Create items
        if (obj.options.items) {
            obj.create(obj.options.items);
        }

        window.addEventListener("mousewheel", function () {
            obj.close();
        });

        el.contextmenu = obj;

        return obj;
    }

    return Component;
}

/* harmony default export */ var contextmenu = (Contextmenu());
;// CONCATENATED MODULE: ./src/plugins/dropdown.js







function Dropdown() {

    var Component = (function (el, options) {
        // Already created, update options
        if (el.dropdown) {
            return el.dropdown.setOptions(options, true);
        }

        // New instance
        var obj = {type: 'dropdown'};
        obj.options = {};

        // Success
        var success = function (data, val) {
            // Set data
            if (data && data.length) {
                // Sort
                if (obj.options.sortResults !== false) {
                    if (typeof obj.options.sortResults == "function") {
                        data.sort(obj.options.sortResults);
                    } else {
                        data.sort(sortData);
                    }
                }

                obj.setData(data);
            }

            // Onload method
            if (typeof (obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data, val);
            }

            // Set value
            if (val) {
                applyValue(val);
            }

            // Component value
            if (val === undefined || val === null) {
                obj.options.value = '';
            }
            el.value = obj.options.value;

            // Open dropdown
            if (obj.options.opened == true) {
                obj.open();
            }
        }


        // Default sort
        var sortData = function (itemA, itemB) {
            var testA, testB;
            if (typeof itemA == "string") {
                testA = itemA;
            } else {
                if (itemA.text) {
                    testA = itemA.text;
                } else if (itemA.name) {
                    testA = itemA.name;
                }
            }

            if (typeof itemB == "string") {
                testB = itemB;
            } else {
                if (itemB.text) {
                    testB = itemB.text;
                } else if (itemB.name) {
                    testB = itemB.name;
                }
            }

            if (typeof testA == "string" || typeof testB == "string") {
                if (typeof testA != "string") {
                    testA = "" + testA;
                }
                if (typeof testB != "string") {
                    testB = "" + testB;
                }
                return testA.localeCompare(testB);
            } else {
                return testA - testB;
            }
        }

        /**
         * Reset the options for the dropdown
         */
        var resetValue = function () {
            // Reset value container
            obj.value = {};
            // Remove selected
            for (var i = 0; i < obj.items.length; i++) {
                if (obj.items[i].selected == true) {
                    if (obj.items[i].element) {
                        obj.items[i].element.classList.remove('jdropdown-selected')
                    }
                    obj.items[i].selected = null;
                }
            }
            // Reset options
            obj.options.value = '';
            // Reset value
            el.value = '';
        }

        /**
         * Apply values to the dropdown
         */
        var applyValue = function (values) {
            // Reset the current values
            resetValue();

            // Read values
            if (values !== null) {
                if (!values) {
                    if (typeof (obj.value['']) !== 'undefined') {
                        obj.value[''] = '';
                    }
                } else {
                    if (!Array.isArray(values)) {
                        values = ('' + values).split(';');
                    }
                    for (var i = 0; i < values.length; i++) {
                        obj.value[values[i]] = '';
                    }
                }
            }

            // Update the DOM
            for (var i = 0; i < obj.items.length; i++) {
                if (typeof (obj.value[Value(i)]) !== 'undefined') {
                    if (obj.items[i].element) {
                        obj.items[i].element.classList.add('jdropdown-selected')
                    }
                    obj.items[i].selected = true;

                    // Keep label
                    obj.value[Value(i)] = Text(i);
                }
            }

            // Global value
            obj.options.value = Object.keys(obj.value).join(';');

            // Update labels
            obj.header.value = obj.getText();
        }

        // Get the value of one item
        var Value = function (k, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'value';
            } else {
                var property = 'id';
            }

            if (obj.items[k]) {
                if (v !== undefined) {
                    return obj.items[k].data[property] = v;
                } else {
                    return obj.items[k].data[property];
                }
            }

            return '';
        }

        // Get the label of one item
        var Text = function (k, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'text';
            } else {
                var property = 'name';
            }

            if (obj.items[k]) {
                if (v !== undefined) {
                    return obj.items[k].data[property] = v;
                } else {
                    return obj.items[k].data[property];
                }
            }

            return '';
        }

        var getValue = function () {
            return Object.keys(obj.value);
        }

        var getText = function () {
            var data = [];
            var k = Object.keys(obj.value);
            for (var i = 0; i < k.length; i++) {
                data.push(obj.value[k[i]]);
            }
            return data;
        }

        obj.setOptions = function (options, reset) {
            if (!options) {
                options = {};
            }

            // Default configuration
            var defaults = {
                url: null,
                data: [],
                format: 0,
                multiple: false,
                autocomplete: false,
                remoteSearch: false,
                lazyLoading: false,
                type: null,
                width: null,
                maxWidth: null,
                opened: false,
                value: null,
                placeholder: '',
                newOptions: false,
                position: false,
                onchange: null,
                onload: null,
                onopen: null,
                onclose: null,
                onfocus: null,
                onblur: null,
                oninsert: null,
                onbeforeinsert: null,
                onsearch: null,
                onbeforesearch: null,
                sortResults: false,
                autofocus: false,
                prompt: null,
                allowEmpty: true,
            }

            // Loop through our object
            for (var property in defaults) {
                if (options && options.hasOwnProperty(property)) {
                    obj.options[property] = options[property];
                } else {
                    if (typeof (obj.options[property]) == 'undefined' || reset === true) {
                        obj.options[property] = defaults[property];
                    }
                }
            }

            // Force autocomplete search
            if (obj.options.remoteSearch == true || obj.options.type === 'searchbar') {
                obj.options.autocomplete = true;
            }

            // New options
            if (obj.options.newOptions == true) {
                obj.header.classList.add('jdropdown-add');
            } else {
                obj.header.classList.remove('jdropdown-add');
            }

            // Autocomplete
            if (obj.options.autocomplete == true) {
                obj.header.removeAttribute('readonly');
            } else {
                obj.header.setAttribute('readonly', 'readonly');
            }

            // Place holder
            if (obj.options.placeholder) {
                obj.header.setAttribute('placeholder', obj.options.placeholder);
            } else {
                obj.header.removeAttribute('placeholder');
            }

            // Remove specific dropdown typing to add again
            el.classList.remove('jdropdown-searchbar');
            el.classList.remove('jdropdown-picker');
            el.classList.remove('jdropdown-list');

            if (obj.options.type == 'searchbar') {
                el.classList.add('jdropdown-searchbar');
            } else if (obj.options.type == 'list') {
                el.classList.add('jdropdown-list');
            } else if (obj.options.type == 'picker') {
                el.classList.add('jdropdown-picker');
            } else {
                if (helpers.getWindowWidth() < 800) {
                    if (obj.options.autocomplete) {
                        el.classList.add('jdropdown-searchbar');
                        obj.options.type = 'searchbar';
                    } else {
                        el.classList.add('jdropdown-picker');
                        obj.options.type = 'picker';
                    }
                } else {
                    if (obj.options.width) {
                        el.style.width = obj.options.width;
                        el.style.minWidth = obj.options.width;
                    } else {
                        el.style.removeProperty('width');
                        el.style.removeProperty('min-width');
                    }

                    el.classList.add('jdropdown-default');
                    obj.options.type = 'default';
                }
            }

            // Close button
            if (obj.options.type == 'searchbar') {
                containerHeader.appendChild(closeButton);
            } else {
                container.insertBefore(closeButton, container.firstChild);
            }

            // Load the content
            if (obj.options.url && !options.data) {
                ajax({
                    url: obj.options.url,
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            success(data, obj.options.value);
                        }
                    }
                });
            } else {
                success(obj.options.data, obj.options.value);
            }

            // Return the instance
            return obj;
        }

        // Helpers
        var containerHeader = null;
        var container = null;
        var content = null;
        var closeButton = null;
        var resetButton = null;
        var backdrop = null;

        var keyTimer = null;

        /**
         * Init dropdown
         */
        var init = function () {
            // Do not accept null
            if (!options) {
                options = {};
            }

            // If the element is a SELECT tag, create a configuration object
            if (el.tagName == 'SELECT') {
                var ret = Component.extractFromDom(el, options);
                el = ret.el;
                options = ret.options;
            }

            // Place holder
            if (!options.placeholder && el.getAttribute('placeholder')) {
                options.placeholder = el.getAttribute('placeholder');
            }

            // Value container
            obj.value = {};
            // Containers
            obj.items = [];
            obj.groups = [];
            // Search options
            obj.search = '';
            obj.results = null;

            // Create dropdown
            el.classList.add('jdropdown');

            // Header container
            containerHeader = document.createElement('div');
            containerHeader.className = 'jdropdown-container-header';

            // Header
            obj.header = document.createElement('input');
            obj.header.className = 'jdropdown-header jss_object';
            obj.header.type = 'text';
            obj.header.setAttribute('autocomplete', 'off');
            obj.header.onfocus = function () {
                if (typeof (obj.options.onfocus) == 'function') {
                    obj.options.onfocus(el);
                }
            }

            obj.header.onblur = function () {
                if (typeof (obj.options.onblur) == 'function') {
                    obj.options.onblur(el);
                }
            }

            obj.header.onkeyup = function (e) {
                if (obj.options.autocomplete == true && !keyTimer) {
                    if (obj.search != obj.header.value.trim()) {
                        keyTimer = setTimeout(function () {
                            obj.find(obj.header.value.trim());
                            keyTimer = null;
                        }, 400);
                    }

                    if (!el.classList.contains('jdropdown-focus')) {
                        obj.open();
                    }
                } else {
                    if (!obj.options.autocomplete) {
                        obj.next(e.key);
                    }
                }
            }

            // Global controls
            if (!Component.hasEvents) {
                // Execute only one time
                Component.hasEvents = true;
                // Enter and Esc
                document.addEventListener("keydown", Component.keydown);
            }

            // Container
            container = document.createElement('div');
            container.className = 'jdropdown-container';

            // Dropdown content
            content = document.createElement('div');
            content.className = 'jdropdown-content';

            // Close button
            closeButton = document.createElement('div');
            closeButton.className = 'jdropdown-close';
            closeButton.textContent = 'Done';

            // Reset button
            resetButton = document.createElement('div');
            resetButton.className = 'jdropdown-reset';
            resetButton.textContent = 'x';
            resetButton.onclick = function () {
                obj.reset();
                obj.close();
            }

            // Create backdrop
            backdrop = document.createElement('div');
            backdrop.className = 'jdropdown-backdrop';

            // Append elements
            containerHeader.appendChild(obj.header);

            container.appendChild(content);
            el.appendChild(containerHeader);
            el.appendChild(container);
            el.appendChild(backdrop);

            // Set the otiptions
            obj.setOptions(options);

            if ('ontouchsend' in document.documentElement === true) {
                el.addEventListener('touchsend', Component.mouseup);
            } else {
                el.addEventListener('mouseup', Component.mouseup);
            }

            // Lazyloading
            if (obj.options.lazyLoading == true) {
                LazyLoading(content, {
                    loadUp: obj.loadUp,
                    loadDown: obj.loadDown,
                });
            }

            content.onwheel = function (e) {
                e.stopPropagation();
            }

            // Change method
            el.change = obj.setValue;

            // Global generic value handler
            el.val = function (val) {
                if (val === undefined) {
                    return obj.getValue(obj.options.multiple ? true : false);
                } else {
                    obj.setValue(val);
                }
            }

            // Keep object available from the node
            el.dropdown = obj;
        }

        /**
         * Get the current remote source of data URL
         */
        obj.getUrl = function () {
            return obj.options.url;
        }

        /**
         * Set the new data from a remote source
         * @param {string} url - url from the remote source
         * @param {function} callback - callback when the data is loaded
         */
        obj.setUrl = function (url, callback) {
            obj.options.url = url;

            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    obj.setData(data);
                    // Callback
                    if (typeof (callback) == 'function') {
                        callback(obj);
                    }
                }
            });
        }

        /**
         * Set ID for one item
         */
        obj.setId = function (item, v) {
            // Legacy purposes
            if (!obj.options.format) {
                var property = 'value';
            } else {
                var property = 'id';
            }

            if (typeof (item) == 'object') {
                item[property] = v;
            } else {
                obj.items[item].data[property] = v;
            }
        }

        const add = function(title, id) {
            if (! title) {
                let current = obj.options.autocomplete == true ? obj.header.value : '';
                title = prompt(dictionary.translate('Add A New Option'), current);
                if (! title) {
                    return false;
                }
            }

            // Id
            if (! id) {
                id = helpers.guid();
            }

            // Create new item
            if (!obj.options.format) {
                var item = {
                    value: id,
                    text: title,
                }
            } else {
                var item = {
                    id: id,
                    name: title,
                }
            }

            // Callback
            if (typeof (obj.options.onbeforeinsert) == 'function') {
                let ret = obj.options.onbeforeinsert(obj, item);
                if (ret === false) {
                    return false;
                } else if (ret) {
                    item = ret;
                }
            }

            // Add item to the main list
            obj.options.data.push(item);

            // Create DOM
            var newItem = obj.createItem(item);

            // Append DOM to the list
            content.appendChild(newItem.element);

            // Callback
            if (typeof (obj.options.oninsert) == 'function') {
                obj.options.oninsert(obj, item, newItem);
            }

            // Show content
            if (content.style.display == 'none') {
                content.style.display = '';
            }

            // Search?
            if (obj.results) {
                obj.results.push(newItem);
            }

            return item;
        }

        /**
         * Add a new item
         * @param {string} title - title of the new item
         * @param {string} id - value/id of the new item
         */
        obj.add = function (title, id) {
            if (typeof (obj.options.prompt) == 'function') {
                return obj.options.prompt.call(obj, add);
            }
            return add(title, id);
        }

        /**
         * Create a new item
         */
        obj.createItem = function (data, group, groupName) {
            // Keep the correct source of data
            if (!obj.options.format) {
                if (!data.value && data.id !== undefined) {
                    data.value = data.id;
                    //delete data.id;
                }
                if (!data.text && data.name !== undefined) {
                    data.text = data.name;
                    //delete data.name;
                }
            } else {
                if (!data.id && data.value !== undefined) {
                    data.id = data.value;
                    //delete data.value;
                }
                if (!data.name && data.text !== undefined) {
                    data.name = data.text
                    //delete data.text;
                }
            }

            // Create item
            var item = {};
            item.element = document.createElement('div');
            item.element.className = 'jdropdown-item';
            item.element.indexValue = obj.items.length;
            item.data = data;

            // Groupd DOM
            if (group) {
                item.group = group;
            }

            // Id
            if (data.id) {
                item.element.setAttribute('id', data.id);
            }

            // Disabled
            if (data.disabled == true) {
                item.element.setAttribute('data-disabled', true);
            }

            // Tooltip
            if (data.tooltip) {
                item.element.setAttribute('title', data.tooltip);
            }

            // Image
            if (data.image) {
                var image = document.createElement('img');
                image.className = 'jdropdown-image';
                image.src = data.image;
                if (!data.title) {
                    image.classList.add('jdropdown-image-small');
                }
                item.element.appendChild(image);
            } else if (data.icon) {
                var icon = document.createElement('span');
                icon.className = "jdropdown-icon material-icons";
                icon.innerText = data.icon;
                if (!data.title) {
                    icon.classList.add('jdropdown-icon-small');
                }
                if (data.color) {
                    icon.style.color = data.color;
                }
                item.element.appendChild(icon);
            } else if (data.color) {
                var color = document.createElement('div');
                color.className = 'jdropdown-color';
                color.style.backgroundColor = data.color;
                item.element.appendChild(color);
            }

            // Set content
            if (!obj.options.format) {
                var text = data.text;
            } else {
                var text = data.name;
            }

            var node = document.createElement('div');
            node.className = 'jdropdown-description';
            node.textContent = text || '&nbsp;';

            // Title
            if (data.title) {
                var title = document.createElement('div');
                title.className = 'jdropdown-title';
                title.innerText = data.title;
                node.appendChild(title);
            }

            // Set content
            if (!obj.options.format) {
                var val = data.value;
            } else {
                var val = data.id;
            }

            // Value
            if (obj.value[val]) {
                item.element.classList.add('jdropdown-selected');
                item.selected = true;
            }

            // Keep DOM accessible
            obj.items.push(item);

            // Add node to item
            item.element.appendChild(node);

            return item;
        }

        obj.appendData = function (data) {
            // Create elements
            if (data.length) {
                // Helpers
                var items = [];
                var groups = [];

                // Prepare data
                for (var i = 0; i < data.length; i++) {
                    // Process groups
                    if (data[i].group) {
                        if (!groups[data[i].group]) {
                            groups[data[i].group] = [];
                        }
                        groups[data[i].group].push(i);
                    } else {
                        items.push(i);
                    }
                }

                // Number of items counter
                var counter = 0;

                // Groups
                var groupNames = Object.keys(groups);

                // Append groups in case exists
                if (groupNames.length > 0) {
                    for (var i = 0; i < groupNames.length; i++) {
                        // Group container
                        var group = document.createElement('div');
                        group.className = 'jdropdown-group';
                        // Group name
                        var groupName = document.createElement('div');
                        groupName.className = 'jdropdown-group-name';
                        groupName.textContent = groupNames[i];
                        // Group arrow
                        var groupArrow = document.createElement('i');
                        groupArrow.className = 'jdropdown-group-arrow jdropdown-group-arrow-down';
                        groupName.appendChild(groupArrow);
                        // Group items
                        var groupContent = document.createElement('div');
                        groupContent.className = 'jdropdown-group-items';
                        for (var j = 0; j < groups[groupNames[i]].length; j++) {
                            var item = obj.createItem(data[groups[groupNames[i]][j]], group, groupNames[i]);

                            if (obj.options.lazyLoading == false || counter < 200) {
                                groupContent.appendChild(item.element);
                                counter++;
                            }
                        }
                        // Group itens
                        group.appendChild(groupName);
                        group.appendChild(groupContent);
                        // Keep group DOM
                        obj.groups.push(group);
                        // Only add to the screen if children on the group
                        if (groupContent.children.length > 0) {
                            // Add DOM to the content
                            content.appendChild(group);
                        }
                    }
                }

                if (items.length) {
                    for (var i = 0; i < items.length; i++) {
                        var item = obj.createItem(data[items[i]]);
                        if (obj.options.lazyLoading == false || counter < 200) {
                            content.appendChild(item.element);
                            counter++;
                        }
                    }
                }
            }
        }

        obj.setData = function (data) {
            // Reset current value
            resetValue();

            // Make sure the content container is blank
            content.textContent = '';

            // Reset
            obj.header.value = '';

            // Reset items and values
            obj.items = [];

            // Prepare data
            if (data && data.length) {
                for (var i = 0; i < data.length; i++) {
                    // Compatibility
                    if (typeof (data[i]) != 'object') {
                        // Correct format
                        if (!obj.options.format) {
                            data[i] = {
                                value: data[i],
                                text: data[i]
                            }
                        } else {
                            data[i] = {
                                id: data[i],
                                name: data[i]
                            }
                        }
                    }
                }

                // Append data
                obj.appendData(data);

                // Update data
                obj.options.data = data;
            } else {
                // Update data
                obj.options.data = [];
            }

            obj.close();
        }

        obj.getData = function () {
            return obj.options.data;
        }

        /**
         * Get position of the item
         */
        obj.getPosition = function (val) {
            for (var i = 0; i < obj.items.length; i++) {
                if (Value(i) == val) {
                    return i;
                }
            }
            return false;
        }

        /**
         * Get dropdown current text
         */
        obj.getText = function (asArray) {
            // Get value
            var v = getText();
            // Return value
            if (asArray) {
                return v;
            } else {
                return v.join('; ');
            }
        }

        /**
         * Get dropdown current value
         */
        obj.getValue = function (asArray) {
            // Get value
            var v = getValue();
            // Return value
            if (asArray) {
                return v;
            } else {
                return v.join(';');
            }
        }

        /**
         * Change event
         */
        var change = function (oldValue) {
            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof (el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }

            // Events
            if (typeof (obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, oldValue, obj.options.value);
            }
        }

        /**
         * Set value
         */
        obj.setValue = function (newValue) {
            // Current value
            var oldValue = obj.getValue();
            // New value
            if (Array.isArray(newValue)) {
                newValue = newValue.join(';')
            }

            if (oldValue !== newValue) {
                // Set value
                applyValue(newValue);

                // Change
                change(oldValue);
            }
        }

        obj.resetSelected = function () {
            obj.setValue(null);
        }

        obj.selectIndex = function (index, force) {
            // Make sure is a number
            var index = parseInt(index);

            // Only select those existing elements
            if (obj.items && obj.items[index] && (force === true || obj.items[index].data.disabled !== true)) {
                // Reset cursor to a new position
                obj.setCursor(index, false);

                // Behaviour
                if (!obj.options.multiple) {
                    // Update value
                    if (obj.items[index].selected) {
                        if (obj.options.allowEmpty !== false) {
                            obj.setValue(null);
                        }
                    } else {
                        obj.setValue(Value(index));
                    }

                    // Close component
                    obj.close();
                } else {
                    // Old value
                    var oldValue = obj.options.value;

                    // Toggle option
                    if (obj.items[index].selected) {
                        obj.items[index].element.classList.remove('jdropdown-selected');
                        obj.items[index].selected = false;

                        delete obj.value[Value(index)];
                    } else {
                        // Select element
                        obj.items[index].element.classList.add('jdropdown-selected');
                        obj.items[index].selected = true;

                        // Set value
                        obj.value[Value(index)] = Text(index);
                    }

                    // Global value
                    obj.options.value = Object.keys(obj.value).join(';');

                    // Update labels for multiple dropdown
                    if (obj.options.autocomplete == false) {
                        obj.header.value = getText().join('; ');
                    }

                    // Events
                    change(oldValue);
                }
            }
        }

        obj.selectItem = function (item) {
            obj.selectIndex(item.indexValue);
        }

        var exists = function (k, result) {
            for (var j = 0; j < result.length; j++) {
                if (!obj.options.format) {
                    if (result[j].value == k) {
                        return true;
                    }
                } else {
                    if (result[j].id == k) {
                        return true;
                    }
                }
            }
            return false;
        }

        obj.find = function (str) {
            if (obj.search == str.trim()) {
                return false;
            }

            // Search term
            obj.search = str;

            // Reset index
            obj.setCursor();

            // Remove nodes from all groups
            if (obj.groups.length) {
                for (var i = 0; i < obj.groups.length; i++) {
                    obj.groups[i].lastChild.textContent = '';
                }
            }

            // Remove all nodes
            content.textContent = '';

            // Remove current items in the remote search
            if (obj.options.remoteSearch == true) {
                // Reset results
                obj.results = null;
                // URL
                var url = obj.options.url;

                // Ajax call
                let o = {
                    url: url,
                    method: 'GET',
                    data: { q: str },
                    dataType: 'json',
                    success: function (result) {
                        // Reset items
                        obj.items = [];

                        // Add the current selected items to the results in case they are not there
                        var current = Object.keys(obj.value);
                        if (current.length) {
                            for (var i = 0; i < current.length; i++) {
                                if (!exists(current[i], result)) {
                                    if (!obj.options.format) {
                                        result.unshift({value: current[i], text: obj.value[current[i]]});
                                    } else {
                                        result.unshift({id: current[i], name: obj.value[current[i]]});
                                    }
                                }
                            }
                        }
                        // Append data
                        obj.appendData(result);
                        // Show or hide results
                        if (!result.length) {
                            content.style.display = 'none';
                        } else {
                            content.style.display = '';
                        }

                        if (typeof(obj.options.onsearch) === 'function') {
                            obj.options.onsearch(obj, result);
                        }
                    }
                }

                if (typeof(obj.options.onbeforesearch) === 'function') {
                    let ret = obj.options.onbeforesearch(obj, o);
                    if (ret === false) {
                        return;
                    } else if (typeof(ret) === 'object') {
                        o = ret;
                    }
                }

                // Remote search
                ajax(o);
            } else {
                // Search terms
                str = new RegExp(str, 'gi');

                // Reset search
                var results = [];

                // Append options
                for (var i = 0; i < obj.items.length; i++) {
                    // Item label
                    var label = Text(i);
                    // Item title
                    var title = obj.items[i].data.title || '';
                    // Group name
                    var groupName = obj.items[i].data.group || '';
                    // Synonym
                    var synonym = obj.items[i].data.synonym || '';
                    if (synonym) {
                        synonym = synonym.join(' ');
                    }

                    if (str == null || obj.items[i].selected == true || label.toString().match(str) || title.match(str) || groupName.match(str) || synonym.match(str)) {
                        results.push(obj.items[i]);
                    }
                }

                if (!results.length) {
                    content.style.display = 'none';

                    // Results
                    obj.results = null;
                } else {
                    content.style.display = '';

                    // Results
                    obj.results = results;

                    // Show 200 items at once
                    var number = results.length || 0;

                    // Lazyloading
                    if (obj.options.lazyLoading == true && number > 200) {
                        number = 200;
                    }

                    for (var i = 0; i < number; i++) {
                        if (obj.results[i].group) {
                            if (!obj.results[i].group.parentNode) {
                                content.appendChild(obj.results[i].group);
                            }
                            obj.results[i].group.lastChild.appendChild(obj.results[i].element);
                        } else {
                            content.appendChild(obj.results[i].element);
                        }
                    }
                }
            }

            // Auto focus
            if (obj.options.autofocus == true) {
                obj.first();
            }
        }

        obj.open = function () {
            // Focus
            if (!el.classList.contains('jdropdown-focus')) {
                // Current dropdown
                Component.current = obj;

                // Start tracking
                tracking(obj, true);

                // Add focus
                el.classList.add('jdropdown-focus');

                // Animation
                if (helpers.getWindowWidth() < 800) {
                    if (obj.options.type == null || obj.options.type == 'picker') {
                        animation.slideBottom(container, 1);
                    }
                }

                // Filter
                if (obj.options.autocomplete == true) {
                    obj.header.value = obj.search;
                    obj.header.focus();
                }

                // Set cursor for the first or first selected element
                var k = getValue();
                if (k[0]) {
                    var cursor = obj.getPosition(k[0]);
                    if (cursor !== false) {
                        obj.setCursor(cursor);
                    }
                }

                // Container Size
                if (!obj.options.type || obj.options.type == 'default') {
                    var rect = el.getBoundingClientRect();
                    var rectContainer = container.getBoundingClientRect();

                    if (obj.options.position) {
                        container.style.position = 'fixed';
                        if (window.innerHeight < rect.bottom + rectContainer.height) {
                            container.style.top = '';
                            container.style.bottom = (window.innerHeight - rect.top) + 1 + 'px';
                        } else {
                            container.style.top = rect.bottom + 'px';
                            container.style.bottom = '';
                        }
                        container.style.left = rect.left + 'px';
                    } else {
                        if (window.innerHeight < rect.bottom + rectContainer.height) {
                            container.style.top = '';
                            container.style.bottom = rect.height + 1 + 'px';
                        } else {
                            container.style.top = '';
                            container.style.bottom = '';
                        }
                    }

                    container.style.minWidth = rect.width + 'px';

                    if (obj.options.maxWidth) {
                        container.style.maxWidth = obj.options.maxWidth;
                    }

                    if (!obj.items.length && obj.options.autocomplete == true) {
                        content.style.display = 'none';
                    } else {
                        content.style.display = '';
                    }
                }
            }

            // Events
            if (typeof (obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }
        }

        obj.close = function (ignoreEvents) {
            if (el.classList.contains('jdropdown-focus')) {
                // Update labels
                obj.header.value = obj.getText();
                // Remove cursor
                obj.setCursor();
                // Events
                if (!ignoreEvents && typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el);
                }
                // Blur
                if (obj.header.blur) {
                    obj.header.blur();
                }
                // Remove focus
                el.classList.remove('jdropdown-focus');
                // Start tracking
                tracking(obj, false);
                // Current dropdown
                Component.current = null;
            }

            return obj.getValue();
        }

        /**
         * Set cursor
         */
        obj.setCursor = function (index, setPosition) {
            // Remove current cursor
            if (obj.currentIndex != null) {
                // Remove visual cursor
                if (obj.items && obj.items[obj.currentIndex]) {
                    obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
                }
            }

            if (index == undefined) {
                obj.currentIndex = null;
            } else {
                index = parseInt(index);

                // Cursor only for visible items
                if (obj.items[index].element.parentNode) {
                    obj.items[index].element.classList.add('jdropdown-cursor');
                    obj.currentIndex = index;

                    // Update scroll to the cursor element
                    if (setPosition !== false && obj.items[obj.currentIndex].element) {
                        var container = content.scrollTop;
                        var element = obj.items[obj.currentIndex].element;
                        content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
                    }
                }
            }
        }

        // Compatibility
        obj.resetCursor = obj.setCursor;
        obj.updateCursor = obj.setCursor;

        /**
         * Reset cursor and selected items
         */
        obj.reset = function () {
            // Reset cursor
            obj.setCursor();

            // Reset selected
            obj.setValue(null);
        }

        /**
         * First available item
         */
        obj.first = function () {
            if (obj.options.lazyLoading === true) {
                obj.loadFirst();
            }

            var items = content.querySelectorAll('.jdropdown-item');
            if (items.length) {
                var newIndex = items[0].indexValue;
                obj.setCursor(newIndex);
            }
        }

        /**
         * Last available item
         */
        obj.last = function () {
            if (obj.options.lazyLoading === true) {
                obj.loadLast();
            }

            var items = content.querySelectorAll('.jdropdown-item');
            if (items.length) {
                var newIndex = items[items.length - 1].indexValue;
                obj.setCursor(newIndex);
            }
        }

        obj.next = function (letter) {
            var newIndex = null;

            if (letter) {
                if (letter.length == 1) {
                    // Current index
                    var current = obj.currentIndex || -1;
                    // Letter
                    letter = letter.toLowerCase();

                    var e = null;
                    var l = null;
                    var items = content.querySelectorAll('.jdropdown-item');
                    if (items.length) {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].indexValue > current) {
                                if (e = obj.items[items[i].indexValue]) {
                                    if (l = e.element.innerText[0]) {
                                        l = l.toLowerCase();
                                        if (letter == l) {
                                            newIndex = items[i].indexValue;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        obj.setCursor(newIndex);
                    }
                }
            } else {
                if (obj.currentIndex == undefined || obj.currentIndex == null) {
                    obj.first();
                } else {
                    var element = obj.items[obj.currentIndex].element;

                    var next = element.nextElementSibling;
                    if (next) {
                        if (next.classList.contains('jdropdown-group')) {
                            next = next.lastChild.firstChild;
                        }
                        newIndex = next.indexValue;
                    } else {
                        if (element.parentNode.classList.contains('jdropdown-group-items')) {
                            if (next = element.parentNode.parentNode.nextElementSibling) {
                                if (next.classList.contains('jdropdown-group')) {
                                    next = next.lastChild.firstChild;
                                } else if (next.classList.contains('jdropdown-item')) {
                                    newIndex = next.indexValue;
                                } else {
                                    next = null;
                                }
                            }

                            if (next) {
                                newIndex = next.indexValue;
                            }
                        }
                    }

                    if (newIndex !== null) {
                        obj.setCursor(newIndex);
                    }
                }
            }
        }

        obj.prev = function () {
            var newIndex = null;

            if (obj.currentIndex === null) {
                obj.first();
            } else {
                var element = obj.items[obj.currentIndex].element;

                var prev = element.previousElementSibling;
                if (prev) {
                    if (prev.classList.contains('jdropdown-group')) {
                        prev = prev.lastChild.lastChild;
                    }
                    newIndex = prev.indexValue;
                } else {
                    if (element.parentNode.classList.contains('jdropdown-group-items')) {
                        if (prev = element.parentNode.parentNode.previousElementSibling) {
                            if (prev.classList.contains('jdropdown-group')) {
                                prev = prev.lastChild.lastChild;
                            } else if (prev.classList.contains('jdropdown-item')) {
                                newIndex = prev.indexValue;
                            } else {
                                prev = null
                            }
                        }

                        if (prev) {
                            newIndex = prev.indexValue;
                        }
                    }
                }
            }

            if (newIndex !== null) {
                obj.setCursor(newIndex);
            }
        }

        obj.loadFirst = function () {
            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            // Show 200 items at once
            var number = results.length || 0;

            // Lazyloading
            if (obj.options.lazyLoading == true && number > 200) {
                number = 200;
            }

            // Reset container
            content.textContent = '';

            // First 200 items
            for (var i = 0; i < number; i++) {
                if (results[i].group) {
                    if (!results[i].group.parentNode) {
                        content.appendChild(results[i].group);
                    }
                    results[i].group.lastChild.appendChild(results[i].element);
                } else {
                    content.appendChild(results[i].element);
                }
            }

            // Scroll go to the begin
            content.scrollTop = 0;
        }

        obj.loadLast = function () {
            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            // Show first page
            var number = results.length;

            // Max 200 items
            if (number > 200) {
                number = number - 200;

                // Reset container
                content.textContent = '';

                // First 200 items
                for (var i = number; i < results.length; i++) {
                    if (results[i].group) {
                        if (!results[i].group.parentNode) {
                            content.appendChild(results[i].group);
                        }
                        results[i].group.lastChild.appendChild(results[i].element);
                    } else {
                        content.appendChild(results[i].element);
                    }
                }

                // Scroll go to the begin
                content.scrollTop = content.scrollHeight;
            }
        }

        obj.loadUp = function () {
            var test = false;

            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            var items = content.querySelectorAll('.jdropdown-item');
            var fistItem = items[0].indexValue;
            fistItem = obj.items[fistItem];
            var index = results.indexOf(fistItem) - 1;

            if (index > 0) {
                var number = 0;

                while (index > 0 && results[index] && number < 200) {
                    if (results[index].group) {
                        if (!results[index].group.parentNode) {
                            content.insertBefore(results[index].group, content.firstChild);
                        }
                        results[index].group.lastChild.insertBefore(results[index].element, results[index].group.lastChild.firstChild);
                    } else {
                        content.insertBefore(results[index].element, content.firstChild);
                    }

                    index--;
                    number++;
                }

                // New item added
                test = true;
            }

            return test;
        }

        obj.loadDown = function () {
            var test = false;

            // Search
            if (obj.results) {
                var results = obj.results;
            } else {
                var results = obj.items;
            }

            var items = content.querySelectorAll('.jdropdown-item');
            var lastItem = items[items.length - 1].indexValue;
            lastItem = obj.items[lastItem];
            var index = results.indexOf(lastItem) + 1;

            if (index < results.length) {
                var number = 0;
                while (index < results.length && results[index] && number < 200) {
                    if (results[index].group) {
                        if (!results[index].group.parentNode) {
                            content.appendChild(results[index].group);
                        }
                        results[index].group.lastChild.appendChild(results[index].element);
                    } else {
                        content.appendChild(results[index].element);
                    }

                    index++;
                    number++;
                }

                // New item added
                test = true;
            }

            return test;
        }

        init();

        return obj;
    });

    Component.keydown = function (e) {
        var dropdown = null;
        if (dropdown = Component.current) {
            if (e.which == 13 || e.which == 9) {  // enter or tab
                if (dropdown.header.value && dropdown.currentIndex == null && dropdown.options.newOptions) {
                    // if they typed something in, but it matched nothing, and newOptions are allowed, start that flow
                    dropdown.add();
                } else {
                    // Quick Select/Filter
                    if (dropdown.currentIndex == null && dropdown.options.autocomplete == true && dropdown.header.value != "") {
                        dropdown.find(dropdown.header.value);
                    }
                    dropdown.selectIndex(dropdown.currentIndex);
                }
            } else if (e.which == 38) {  // up arrow
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex > 0) {
                    dropdown.prev();
                }
                e.preventDefault();
            } else if (e.which == 40) {  // down arrow
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                    dropdown.next();
                }
                e.preventDefault();
            } else if (e.which == 36) {
                dropdown.first();
                if (!e.target.classList.contains('jdropdown-header')) {
                    e.preventDefault();
                }
            } else if (e.which == 35) {
                dropdown.last();
                if (!e.target.classList.contains('jdropdown-header')) {
                    e.preventDefault();
                }
            } else if (e.which == 27) {
                dropdown.close();
            } else if (e.which == 33) {  // page up
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex > 0) {
                    for (var i = 0; i < 7; i++) {
                        dropdown.prev()
                    }
                }
                e.preventDefault();
            } else if (e.which == 34) {  // page down
                if (dropdown.currentIndex == null) {
                    dropdown.first();
                } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                    for (var i = 0; i < 7; i++) {
                        dropdown.next()
                    }
                }
                e.preventDefault();
            }
        }
    }

    Component.mouseup = function (e) {
        var element = helpers.findElement(e.target, 'jdropdown');
        if (element) {
            var dropdown = element.dropdown;
            if (e.target.classList.contains('jdropdown-header')) {
                if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                    var rect = element.getBoundingClientRect();

                    if (e.changedTouches && e.changedTouches[0]) {
                        var x = e.changedTouches[0].clientX;
                        var y = e.changedTouches[0].clientY;
                    } else {
                        var x = e.clientX;
                        var y = e.clientY;
                    }

                    if (rect.width - (x - rect.left) < 30) {
                        if (e.target.classList.contains('jdropdown-add')) {
                            dropdown.add();
                        } else {
                            dropdown.close();
                        }
                    } else {
                        if (dropdown.options.autocomplete == false) {
                            dropdown.close();
                        }
                    }
                } else {
                    dropdown.open();
                }
            } else if (e.target.classList.contains('jdropdown-group-name')) {
                var items = e.target.nextSibling.children;
                if (e.target.nextSibling.style.display != 'none') {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].style.display != 'none') {
                            dropdown.selectItem(items[i]);
                        }
                    }
                }
            } else if (e.target.classList.contains('jdropdown-group-arrow')) {
                if (e.target.classList.contains('jdropdown-group-arrow-down')) {
                    e.target.classList.remove('jdropdown-group-arrow-down');
                    e.target.classList.add('jdropdown-group-arrow-up');
                    e.target.parentNode.nextSibling.style.display = 'none';
                } else {
                    e.target.classList.remove('jdropdown-group-arrow-up');
                    e.target.classList.add('jdropdown-group-arrow-down');
                    e.target.parentNode.nextSibling.style.display = '';
                }
            } else if (e.target.classList.contains('jdropdown-item')) {
                dropdown.selectItem(e.target);
            } else if (e.target.classList.contains('jdropdown-image')) {
                dropdown.selectItem(e.target.parentNode);
            } else if (e.target.classList.contains('jdropdown-description')) {
                dropdown.selectItem(e.target.parentNode);
            } else if (e.target.classList.contains('jdropdown-title')) {
                dropdown.selectItem(e.target.parentNode.parentNode);
            } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
                dropdown.close();
            }
        }
    }

    Component.extractFromDom = function (el, options) {
        // Keep reference
        var select = el;
        if (!options) {
            options = {};
        }
        // Prepare configuration
        if (el.getAttribute('multiple') && (!options || options.multiple == undefined)) {
            options.multiple = true;
        }
        if (el.getAttribute('placeholder') && (!options || options.placeholder == undefined)) {
            options.placeholder = el.getAttribute('placeholder');
        }
        if (el.getAttribute('data-autocomplete') && (!options || options.autocomplete == undefined)) {
            options.autocomplete = true;
        }
        if (!options || options.width == undefined) {
            options.width = el.offsetWidth;
        }
        if (el.value && (!options || options.value == undefined)) {
            options.value = el.value;
        }
        if (!options || options.data == undefined) {
            options.data = [];
            for (var j = 0; j < el.children.length; j++) {
                if (el.children[j].tagName == 'OPTGROUP') {
                    for (var i = 0; i < el.children[j].children.length; i++) {
                        options.data.push({
                            value: el.children[j].children[i].value,
                            text: el.children[j].children[i].textContent,
                            group: el.children[j].getAttribute('label'),
                        });
                    }
                } else {
                    options.data.push({
                        value: el.children[j].value,
                        text: el.children[j].textContent,
                    });
                }
            }
        }
        if (!options || options.onchange == undefined) {
            options.onchange = function (a, b, c, d) {
                if (options.multiple == true) {
                    if (obj.items[b].classList.contains('jdropdown-selected')) {
                        select.options[b].setAttribute('selected', 'selected');
                    } else {
                        select.options[b].removeAttribute('selected');
                    }
                } else {
                    select.value = d;
                }
            }
        }
        // Create DIV
        var div = document.createElement('div');
        el.parentNode.insertBefore(div, el);
        el.style.display = 'none';
        el = div;

        return {el: el, options: options};
    }

    return Component;
}

/* harmony default export */ var dropdown = (Dropdown());
;// CONCATENATED MODULE: ./src/plugins/picker.js



function Picker(el, options) {
    // Already created, update options
    if (el.picker) {
        return el.picker.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'picker' };
    obj.options = {};

    var dropdownHeader = null;
    var dropdownContent = null;

    /**
     * The element passed is a DOM element
     */
    var isDOM = function(o) {
        return (o instanceof Element || o instanceof HTMLDocument);
    }

    /**
     * Create the content options
     */
    var createContent = function() {
        dropdownContent.innerHTML = '';

        // Create items
        var keys = Object.keys(obj.options.data);

        // Go though all options
        for (var i = 0; i < keys.length; i++) {
            // Item
            var dropdownItem = document.createElement('div');
            dropdownItem.classList.add('jpicker-item');
            dropdownItem.setAttribute('role', 'option');
            dropdownItem.k = keys[i];
            dropdownItem.v = obj.options.data[keys[i]];
            // Label
            var item = obj.getLabel(keys[i], dropdownItem);
            if (isDOM(item)) {
                dropdownItem.appendChild(item);
            } else {
                dropdownItem.innerHTML = item;
            }
            // Append
            dropdownContent.appendChild(dropdownItem);
        }
    }

    /**
     * Set or reset the options for the picker
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            value: 0,
            data: null,
            render: null,
            onchange: null,
            onmouseover: null,
            onselect: null,
            onopen: null,
            onclose: null,
            onload: null,
            width: null,
            header: true,
            right: false,
            bottom: false,
            content: false,
            columns: null,
            grid: null,
            height: null,
        }

        // Legacy purpose only
        if (options && options.options) {
            options.data = options.options;
        }

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Start using the options
        if (obj.options.header === false) {
            dropdownHeader.style.display = 'none';
        } else {
            dropdownHeader.style.display = '';
        }

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        } else {
            dropdownHeader.style.width = '';
        }

        // Height
        if (obj.options.height) {
            dropdownContent.style.maxHeight = obj.options.height + 'px';
            dropdownContent.style.overflow = 'scroll';
        } else {
            dropdownContent.style.overflow = '';
        }

        if (obj.options.columns > 0) {
            if (! obj.options.grid) {
                dropdownContent.classList.add('jpicker-columns');
                dropdownContent.style.width = obj.options.width ? obj.options.width : 36 * obj.options.columns + 'px';
            } else {
                dropdownContent.classList.add('jpicker-grid');
                dropdownContent.style.gridTemplateColumns = 'repeat(' + obj.options.grid + ', 1fr)';
            }
        }

        if (isNaN(parseInt(obj.options.value))) {
            obj.options.value = 0;
        }

        // Create list from data
        createContent();

        // Set value
        obj.setValue(obj.options.value);

        // Set options all returns the own instance
        return obj;
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    obj.setValue = function(k, e) {
        // Set label
        obj.setLabel(k);

        // Update value
        obj.options.value = String(k);

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.oninput) == 'function') {
                el.oninput({
                    type: 'input',
                    target: el,
                    value: el.value
                });
            }
        }

        if (dropdownContent.children[k] && dropdownContent.children[k].getAttribute('type') !== 'generic') {
            obj.close();
        }

        // Call method
        if (e) {
            if (typeof (obj.options.onchange) == 'function') {
                var v = obj.options.data[k];

                obj.options.onchange(el, obj, v, v, k, e);
            }
        }
    }

    obj.getLabel = function(v, item) {
        var label = obj.options.data[v] || null;
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label, item);
        }
        return label;
    }

    obj.setLabel = function(v) {
        var item;

        if (obj.options.content) {
            item = document.createElement('i');
            item.textContent = obj.options.content;
            item.classList.add('material-icons');
        } else {
            item = obj.getLabel(v, null);
        }

        // Label
        if (isDOM(item)) {
            dropdownHeader.textContent = '';
            dropdownHeader.appendChild(item);
        } else {
            dropdownHeader.innerHTML = item;
        }
    }

    obj.open = function() {
        if (! el.classList.contains('jpicker-focus')) {
            // Start tracking the element
            tracking(obj, true);

            // Open picker
            el.classList.add('jpicker-focus');
            el.focus();

            var top = 0;
            var left = 0;

            dropdownContent.style.marginLeft = '';

            var rectHeader = dropdownHeader.getBoundingClientRect();
            var rectContent = dropdownContent.getBoundingClientRect();

            if (window.innerHeight < rectHeader.bottom + rectContent.height || obj.options.bottom) {
                top = -1 * (rectContent.height + 4);
            } else {
                top = rectHeader.height + 4;
            }

            if (obj.options.right === true) {
                left = -1 * rectContent.width + rectHeader.width;
            }

            if (rectContent.left + left < 0) {
                left = left + rectContent.left + 10;
            }
            if (rectContent.left + rectContent.width > window.innerWidth) {
                left = -1 * (10 + rectContent.left + rectContent.width - window.innerWidth);
            }

            dropdownContent.style.marginTop = parseInt(top) + 'px';
            dropdownContent.style.marginLeft = parseInt(left) + 'px';

            //dropdownContent.style.marginTop
            if (typeof obj.options.onopen == 'function') {
                obj.options.onopen(el, obj);
            }
        }
    }

    obj.close = function() {
        if (el.classList.contains('jpicker-focus')) {
            el.classList.remove('jpicker-focus');

            // Start tracking the element
            tracking(obj, false);

            if (typeof obj.options.onclose == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    /**
     * Create floating picker
     */
    var init = function() {
        let id = helpers.guid();

        // Class
        el.classList.add('jpicker');
        el.setAttribute('role', 'combobox');
        el.setAttribute('aria-haspopup', 'listbox');
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-controls', id);
        el.setAttribute('tabindex', '0');
        el.onmousedown = function(e) {
            if (! el.classList.contains('jpicker-focus')) {
                obj.open();
            }
        }

        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.setAttribute('id', id);
        dropdownContent.setAttribute('role', 'listbox');
        dropdownContent.classList.add('jpicker-content');
        dropdownContent.onclick = function(e) {
            var item = helpers.findElement(e.target, 'jpicker-item');
            if (item) {
                if (item.parentNode === dropdownContent) {
                    // Update label
                    obj.setValue(item.k, e);
                }
            }
        }
        // Append content and header
        el.appendChild(dropdownHeader);
        el.appendChild(dropdownContent);

        // Default value
        el.value = options.value || 0;

        // Set options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.picker = obj;
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/toolbar.js





function Toolbar(el, options) {
    // New instance
    var obj = { type:'toolbar' };
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        container: false,
        badge: false,
        title: false,
        responsive: false,
        maxWidth: null,
        bottom: true,
        items: [],
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! el && options.app && options.app.el) {
        el = document.createElement('div');
        options.app.el.appendChild(el);
    }

    // Arrow
    var toolbarArrow = document.createElement('div');
    toolbarArrow.classList.add('jtoolbar-item');
    toolbarArrow.classList.add('jtoolbar-arrow');

    let arrow = document.createElement('i');
    arrow.classList.add('material-icons');
    arrow.textContent = 'more_vert';
    toolbarArrow.appendChild(arrow);

    var toolbarFloating = document.createElement('div');
    toolbarFloating.classList.add('jtoolbar-floating');
    toolbarArrow.appendChild(toolbarFloating);

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            if (element != elements[i]) {
                elements[i].classList.remove('jtoolbar-selected');
            }
        }
        element.classList.add('jtoolbar-selected');
    }

    obj.hide = function() {
        animation.slideBottom(el, 0, function() {
            el.style.display = 'none';
        });
    }

    obj.show = function() {
        el.style.display = '';
        animation.slideBottom(el, 1);
    }

    obj.get = function() {
        return el;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        el.innerHTML = '';
    }

    obj.update = function(a, b) {
        for (var i = 0; i < toolbarContent.children.length; i++) {
            // Toolbar element
            var toolbarItem = toolbarContent.children[i];
            // State management
            if (typeof(toolbarItem.updateState) == 'function') {
                toolbarItem.updateState(el, obj, toolbarItem, a, b);
            }
        }
        for (var i = 0; i < toolbarFloating.children.length; i++) {
            // Toolbar element
            var toolbarItem = toolbarFloating.children[i];
            // State management
            if (typeof(toolbarItem.updateState) == 'function') {
                toolbarItem.updateState(el, obj, toolbarItem, a, b);
            }
        }
    }

    obj.create = function(items) {
        // Reset anything in the toolbar
        toolbarContent.innerHTML = '';
        // Create elements in the toolbar
        for (var i = 0; i < items.length; i++) {
            var toolbarItem = document.createElement('div');
            toolbarItem.classList.add('jtoolbar-item');

            if (items[i].width) {
                toolbarItem.style.width = parseInt(items[i].width) + 'px'; 
            }

            if (items[i].k) {
                toolbarItem.k = items[i].k;
            }

            if (items[i].tooltip) {
                toolbarItem.setAttribute('title', items[i].tooltip);
                toolbarItem.setAttribute('aria-label', items[i].tooltip);
            }

            // Id
            if (items[i].id) {
                toolbarItem.setAttribute('id', items[i].id);
            }

            // Selected
            if (items[i].updateState) {
                toolbarItem.updateState = items[i].updateState;
            }

            if (items[i].active) {
                toolbarItem.classList.add('jtoolbar-active');
            }

            if (items[i].disabled) {
                toolbarItem.classList.add('jtoolbar-disabled');
            }

            if (items[i].type == 'select' || items[i].type == 'dropdown') {
                Picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            } else if (items[i].type == 'label') {
                toolbarItem.classList.add('jtoolbar-label');
                toolbarItem.innerHTML = items[i].content;
            } else {
                // Material icons
                var toolbarIcon = document.createElement('i');
                if (typeof(items[i].class) === 'undefined') {
                    toolbarIcon.classList.add('material-icons');
                } else {
                    var c = items[i].class.split(' ');
                    for (var j = 0; j < c.length; j++) {
                        toolbarIcon.classList.add(c[j]);
                    }
                }
                toolbarIcon.innerHTML = items[i].content ? items[i].content : '';
                toolbarItem.setAttribute('role', 'button');
                toolbarItem.appendChild(toolbarIcon);

                // Badge options
                if (obj.options.badge == true) {
                    var toolbarBadge = document.createElement('div');
                    toolbarBadge.classList.add('jbadge');
                    var toolbarBadgeContent = document.createElement('div');
                    toolbarBadgeContent.innerHTML = items[i].badge ? items[i].badge : '';
                    toolbarBadge.appendChild(toolbarBadgeContent);
                    toolbarItem.appendChild(toolbarBadge);
                }

                // Title
                if (items[i].title) {
                    if (obj.options.title == true) {
                        var toolbarTitle = document.createElement('span');
                        toolbarTitle.innerHTML = items[i].title;
                        toolbarItem.appendChild(toolbarTitle);
                    } else {
                        toolbarItem.setAttribute('title', items[i].title);
                    }
                }

                if (obj.options.app && items[i].route) {
                    // Route
                    toolbarItem.route = items[i].route;
                    // Onclick for route
                    toolbarItem.onclick = function() {
                        obj.options.app.pages(this.route);
                    }
                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true
                    });
                }

                // Render
                if (typeof(items[i].render) === 'function') {
                    items[i].render(toolbarItem, items[i]);
                }
            }

            if (items[i].onclick) {
                toolbarItem.onclick = items[i].onclick.bind(items[i], el, obj, toolbarItem);
            }

            toolbarContent.appendChild(toolbarItem);
        }

        // Fits to the page
        setTimeout(function() {
            obj.refresh();
        }, 0);
    }

    obj.open = function() {
        toolbarArrow.classList.add('jtoolbar-arrow-selected');

        var rectElement = el.getBoundingClientRect();
        var rect = toolbarFloating.getBoundingClientRect();
        if (rect.bottom > window.innerHeight || obj.options.bottom) {
            toolbarFloating.style.bottom = '0';
        } else {
            toolbarFloating.style.removeProperty('bottom');
        }

        toolbarFloating.style.right = '0';

        toolbarArrow.children[1].focus();
        // Start tracking
        tracking(obj, true);
    }

    obj.close = function() {
        toolbarArrow.classList.remove('jtoolbar-arrow-selected')
        // End tracking
        tracking(obj, false);
    }

    obj.refresh = function() {
        if (obj.options.responsive == true) {
            // Width of the c
            var rect = el.parentNode.getBoundingClientRect();
            if (! obj.options.maxWidth) {
                obj.options.maxWidth = rect.width;
            }
            // Available parent space
            var available = parseInt(obj.options.maxWidth);
            // Remove arrow
            if (toolbarArrow.parentNode) {
                toolbarArrow.parentNode.removeChild(toolbarArrow);
            }
            // Move all items to the toolbar
            while (toolbarFloating.firstChild) {
                toolbarContent.appendChild(toolbarFloating.firstChild);
            }
            // Toolbar is larger than the parent, move elements to the floating element
            if (available < toolbarContent.offsetWidth) {
                // Give space to the floating element
                available -= 50;
                // Move to the floating option
                while (toolbarContent.lastChild && available < toolbarContent.offsetWidth) {
                    toolbarFloating.insertBefore(toolbarContent.lastChild, toolbarFloating.firstChild);
                }
            }
            // Show arrow
            if (toolbarFloating.children.length > 0) {
                toolbarContent.appendChild(toolbarArrow);
            }
        }
    }

    obj.setReadonly = function(state) {
        state = state ? 'add' : 'remove';
        el.classList[state]('jtoolbar-disabled');
    }

    el.onclick = function(e) {
        var element = helpers.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }

        if (e.target.classList.contains('jtoolbar-arrow') || e.target.parentNode.classList.contains('jtoolbar-arrow')) {
            obj.open();
        }
    }

    window.addEventListener('resize', function() {
        obj.refresh();
    });

    // Toolbar
    el.classList.add('jtoolbar');
    // Reset content
    el.innerHTML = '';
    // Container
    if (obj.options.container == true) {
        el.classList.add('jtoolbar-container');
    }
    // Content
    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);
    // Special toolbar for mobile applications
    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    }
    // Create toolbar
    obj.create(obj.options.items);
    // Shortcut
    el.toolbar = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/utils/filter.js

// Valid tags (removed iframe for security)
const validTags = [
    'html','body','address','span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'blockquote',
    'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'hr', 'br', 'img',
    'figure', 'picture', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr',
    'th', 'td', 'caption', 'u', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
    'input', 'textarea', 'select', 'option', 'button', 'label', 'fieldset',
    'legend', 'audio', 'video', 'abbr', 'cite', 'kbd', 'section', 'article',
    'nav', 'aside', 'header', 'footer', 'main', 'details', 'summary', 'svg', 'line', 'source'
];

// Dangerous tags that should be completely removed
const dangerousTags = ['script', 'object', 'embed', 'applet', 'meta', 'base', 'link', 'iframe'];

// Valid properties (added id, class, title, alt for better editor support)
const validProperty = ['width', 'height', 'align', 'border', 'src', 'href', 'tabindex', 'id', 'class', 'title', 'alt'];

// Tags that are allowed to have src attribute
const tagsAllowedSrc = ['img', 'audio', 'video', 'source'];

// Tags that are allowed to have href attribute
const tagsAllowedHref = ['a'];

// Valid CSS attributes
const validStyle = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin', 'padding', 'text-align', 'text-decoration'];

// Function to decode HTML entities (prevents bypassing with &#106;avascript:)
function decodeHTMLEntities(text) {
    if (!text) return '';
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to check if a URL scheme is dangerous
function isDangerousURL(url) {
    if (!url) return false;
    const decoded = decodeHTMLEntities(url).toLowerCase().trim();
    // Remove whitespace and null bytes that can be used to bypass filters
    const cleaned = decoded.replace(/[\s\0]/g, '');

    return cleaned.startsWith('javascript:') ||
           cleaned.startsWith('data:text/') ||
           cleaned.startsWith('data:application/') ||
           cleaned.startsWith('vbscript:') ||
           cleaned.includes('<script');
}

// Function to sanitize CSS value
function sanitizeStyleValue(value) {
    if (!value) return '';
    const decoded = decodeHTMLEntities(value).toLowerCase();

    // Block dangerous CSS content
    if (decoded.includes('javascript:') ||
        decoded.includes('expression(') ||
        decoded.includes('behavior:') ||
        decoded.includes('-moz-binding') ||
        decoded.includes('binding:') ||
        decoded.includes('@import') ||
        decoded.includes('url(') && (decoded.includes('javascript:') || decoded.includes('data:'))) {
        return '';
    }

    return value;
}

const parse = function(element, img) {
    if (!element || !element.tagName) {
        return;
    }

    const tagName = element.tagName.toLowerCase();

    // Remove dangerous tags completely
    if (dangerousTags.indexOf(tagName) !== -1) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
        return;
    }

    // Remove elements that are not white-listed
    if (validTags.indexOf(tagName) === -1) {
        if (element.innerText) {
            element.innerHTML = element.innerText;
        }
    }

    // Remove attributes
    if (element.attributes && element.attributes.length) {
        let style = null;
        // Process style attribute
        let elementStyle = element.getAttribute('style');
        if (elementStyle) {
            style = [];
            let t = elementStyle.split(';');
            for (let j = 0; j < t.length; j++) {
                let v = t[j].trim().split(':');
                const property = v[0].trim();
                if (validStyle.indexOf(property) >= 0) {
                    let k = v.shift();
                    v = v.join(':');
                    // Sanitize the CSS value
                    const sanitizedValue = sanitizeStyleValue(v);
                    if (sanitizedValue) {
                        style.push(k + ':' + sanitizedValue);
                    }
                }
            }
        }

        // Process image
        if (tagName === 'img') {
            const src = element.getAttribute('src');
            if (!src || isDangerousURL(src)) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                return;
            } else {
                element.setAttribute('tabindex', '900');
                // Check attributes for persistence
                img.push(src);
            }
        }

        // Collect all attribute names first
        let attr = [];
        for (let i = 0; i < element.attributes.length; i++) {
            attr.push(element.attributes[i].name);
        }

        // Process attributes
        if (attr.length) {
            attr.forEach(function (v) {
                const attrName = v.toLowerCase();

                // Remove all event handlers (onclick, onerror, onload, etc.)
                if (attrName.startsWith('on')) {
                    element.removeAttribute(v);
                    return;
                }

                // Check if attribute is in whitelist
                if (validProperty.indexOf(attrName) === -1) {
                    element.removeAttribute(v);
                } else {
                    // Validate whitelisted attributes
                    let attrValue = element.getAttribute(v);

                    // Special handling for src attribute
                    if (attrName === 'src') {
                        if (tagsAllowedSrc.indexOf(tagName) === -1) {
                            // src not allowed on this tag
                            element.removeAttribute(v);
                            return;
                        }
                        if (isDangerousURL(attrValue)) {
                            element.removeAttribute(v);
                            return;
                        }
                    }

                    // Special handling for href attribute
                    if (attrName === 'href') {
                        if (tagsAllowedHref.indexOf(tagName) === -1) {
                            // href not allowed on this tag
                            element.removeAttribute(v);
                            return;
                        }
                        if (isDangerousURL(attrValue)) {
                            element.removeAttribute(v);
                            return;
                        }
                    }

                    // Protection XSS - check for dangerous characters
                    if (attrValue && attrValue.indexOf('<') !== -1) {
                        element.setAttribute(v, attrValue.replace(/</g, '&#60;'));
                    }
                }
            });
        }

        element.style = '';
        // Add valid style
        if (style && style.length) {
            element.setAttribute('style', style.join(';'));
        }
    }

    // Parse children recursively
    if (element.children.length) {
        for (let i = element.children.length; i > 0; i--) {
            parse(element.children[i - 1], img);
        }
    }
}

const filter = function(data, img) {
    if (data) {
        data = data.replace(new RegExp('<!--(.*?)-->', 'gsi'), '');
    }
    let parser = new DOMParser();
    let d = parser.parseFromString(data, "text/html");
    parse(d.body, img);
    let div = document.createElement('div');
    div.innerHTML = d.body.innerHTML;
    return div;
}

/* harmony default export */ var utils_filter = (filter);
;// CONCATENATED MODULE: ./src/plugins/editor.js






function Editor() {
    var Component = (function(el, options) {
        // New instance
        var obj = { type:'editor' };
        obj.options = {};

        // Default configuration
        var defaults = {
            // Load data from a remove location
            url: null,
            // Initial HTML content
            value: '',
            // Initial snippet
            snippet: null,
            // Add toolbar
            toolbar: true,
            toolbarOnTop: false,
            // Website parser is to read websites and images from cross domain
            remoteParser: null,
            // Placeholder
            placeholder: null,
            // Parse URL
            filterPaste: true,
            // Accept drop files
            dropZone: true,
            dropAsSnippet: false,
            acceptImages: true,
            acceptFiles: false,
            maxFileSize: 5000000,
            allowImageResize: true,
            // Style
            maxHeight: null,
            height: null,
            focus: false,
            // Events
            onclick: null,
            onfocus: null,
            onblur: null,
            onload: null,
            onkeyup: null,
            onkeydown: null,
            onchange: null,
            extensions: null,
            type: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Private controllers
        var editorTimer = null;
        var editorAction = null;
        var files = [];

        // Keep the reference for the container
        obj.el = el;

        if (typeof(obj.options.onclick) == 'function') {
            el.onclick = function(e) {
                obj.options.onclick(el, obj, e);
            }
        }

        // Prepare container
        el.classList.add('jeditor-container');

        // Snippet
        var snippet = document.createElement('div');
        snippet.className = 'jsnippet';
        snippet.setAttribute('contenteditable', false);

        // Toolbar
        var toolbar = document.createElement('div');
        toolbar.className = 'jeditor-toolbar';

        obj.editor = document.createElement('div');
        obj.editor.setAttribute('contenteditable', true);
        obj.editor.setAttribute('spellcheck', false);
        obj.editor.classList.add('jeditor');

        // Placeholder
        if (obj.options.placeholder) {
            obj.editor.setAttribute('data-placeholder', obj.options.placeholder);
        }

        // Max height
        if (obj.options.maxHeight || obj.options.height) {
            obj.editor.style.overflowY = 'auto';

            if (obj.options.maxHeight) {
                obj.editor.style.maxHeight = obj.options.maxHeight;
            }
            if (obj.options.height) {
                obj.editor.style.height = obj.options.height;
            }
        }

        // Set editor initial value
        if (obj.options.url) {
            ajax({
                url: obj.options.url,
                dataType: 'html',
                success: function(result) {
                    obj.editor.innerHTML = result;

                    Component.setCursor(obj.editor, obj.options.focus == 'initial' ? true : false);
                }
            })
        } else {
            if (obj.options.value) {
                obj.editor.innerHTML = obj.options.value;
            } else {
                // Create from existing elements
                for (var i = 0; i < el.children.length; i++) {
                    obj.editor.appendChild(el.children[i]);
                }
            }
        }

        // Make sure element is empty
        el.innerHTML = '';

        /**
         * Onchange event controllers
         */
        var change = function(e) {
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, e);
            }

            // Update value
            obj.options.value = obj.getData();

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        /**
         * Extract images from a HTML string
         */
        var extractImageFromHtml = function(html) {
            let img = [];
            // Create temp element
            var div = document.createElement('div');
            utils_filter(html, img);
            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addImage(img[i]);
                }
            }
        }

        /**
         * Insert node at caret
         */
        var insertNodeAtCaret = function(newNode) {
            var sel, range;

            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    var selectedText = range.toString();
                    range.deleteContents();
                    range.insertNode(newNode);
                    // move the cursor after element
                    range.setStartAfter(newNode);
                    range.setEndAfter(newNode);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }

        var updateTotalImages = function() {
            var o = null;
            if (o = snippet.children[0]) {
                // Make sure is a grid
                if (! o.classList.contains('jslider-grid')) {
                    o.classList.add('jslider-grid');
                }
                // Quantify of images
                var number = o.children.length;
                // Set the configuration of the grid
                o.setAttribute('data-number', number > 4 ? 4 : number);
                // Total of images inside the grid
                if (number > 4) {
                    o.setAttribute('data-total', number - 4);
                } else {
                    o.removeAttribute('data-total');
                }
            }
        }

        /**
         * Append image to the snippet
         */
        var appendImage = function(image) {
            if (! snippet.innerHTML) {
                obj.appendSnippet({});
            }
            snippet.children[0].appendChild(image);
            updateTotalImages();
        }

        /**
         * Append snippet
         * @Param object data
         */
        obj.appendSnippet = function(data) {
            // Reset snippet
            snippet.innerHTML = '';

            // Attributes
            var a = [ 'image', 'title', 'description', 'host', 'url' ];

            for (var i = 0; i < a.length; i++) {
                var div = document.createElement('div');
                div.className = 'jsnippet-' + a[i];
                div.setAttribute('data-k', a[i]);
                snippet.appendChild(div);
                if (data[a[i]]) {
                    if (a[i] == 'image') {
                        if (! Array.isArray(data.image)) {
                            data.image = [ data.image ];
                        }
                        for (var j = 0; j < data.image.length; j++) {
                            var img = document.createElement('img');
                            img.src = data.image[j];
                            div.appendChild(img);
                        }
                    } else {
                        div.innerHTML = data[a[i]];
                    }
                }
            }

            obj.editor.appendChild(document.createElement('br'));
            obj.editor.appendChild(snippet);
        }

        /**
         * Set editor value
         */
        obj.setData = function(o) {
            if (typeof(o) == 'object') {
                obj.editor.innerHTML = o.content;
            } else {
                obj.editor.innerHTML = o;
            }

            if (obj.options.focus) {
                Component.setCursor(obj.editor, true);
            }

            // Reset files container
            files = [];
        }

        obj.getFiles = function() {
            var f = obj.editor.querySelectorAll('.jfile');
            var d = [];
            for (var i = 0; i < f.length; i++) {
                if (files[f[i].src]) {
                    d.push(files[f[i].src]);
                }
            }
            return d;
        }

        obj.getText = function() {
            return obj.editor.innerText;
        }

        /**
         * Get editor data
         */
        obj.getData = function(json) {
            if (! json) {
                var data = obj.editor.innerHTML;
            } else {
                var data = {
                    content : '',
                }

                // Get snippet
                if (snippet.innerHTML) {
                    var index = 0;
                    data.snippet = {};
                    for (var i = 0; i < snippet.children.length; i++) {
                        // Get key from element
                        var key = snippet.children[i].getAttribute('data-k');
                        if (key) {
                            if (key == 'image') {
                                if (! data.snippet.image) {
                                    data.snippet.image = [];
                                }
                                // Get all images
                                for (var j = 0; j < snippet.children[i].children.length; j++) {
                                    data.snippet.image.push(snippet.children[i].children[j].getAttribute('src'))
                                }
                            } else {
                                data.snippet[key] = snippet.children[i].innerHTML;
                            }
                        }
                    }
                }

                // Get files
                var f = Object.keys(files);
                if (f.length) {
                    data.files = [];
                    for (var i = 0; i < f.length; i++) {
                        data.files.push(files[f[i]]);
                    }
                }

                // Get content
                var d = document.createElement('div');
                d.innerHTML = obj.editor.innerHTML;
                var s = d.querySelector('.jsnippet');
                if (s) {
                    s.remove();
                }

                var text = d.innerHTML;
                text = text.replace(/<br>/g, "\n");
                text = text.replace(/<\/div>/g, "<\/div>\n");
                text = text.replace(/<(?:.|\n)*?>/gm, "");
                data.content = text.trim();

                // Process extensions
                processExtensions('getData', data);
            }

            return data;
        }

        // Reset
        obj.reset = function() {
            obj.editor.innerHTML = '';
            snippet.innerHTML = '';
            files = [];
        }

        obj.addPdf = function(data) {
            if (data.result.substr(0,4) != 'data') {
                console.error('Invalid source');
            } else {
                var canvas = document.createElement('canvas');
                canvas.width = 60;
                canvas.height = 60;

                var img = new Image();
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    var newImage = document.createElement('img');
                    newImage.src = window.URL.createObjectURL(blob);
                    newImage.title = data.name;
                    newImage.className = 'jfile pdf';

                    files[newImage.src] = {
                        file: newImage.src,
                        extension: 'pdf',
                        content: data.result,
                    }

                    //insertNodeAtCaret(newImage);
                    document.execCommand('insertHtml', false, newImage.outerHTML);
                });
            }
        }

        obj.addImage = function(src, asSnippet) {
            if (! obj.options.acceptImages) {
                return;
            }

            if (! src) {
                src = '';
            }

            if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
                console.error('remoteParser not defined in your initialization');
            } else {
                // This is to process cross domain images
                if (src.substr(0,4) == 'data') {
                    var extension = src.split(';')
                    extension = extension[0].split('/');
                    extension = extension[1];
                } else {
                    var extension = src.substr(src.lastIndexOf('.') + 1);
                    // Work for cross browsers
                    src = obj.options.remoteParser + src;
                }

                var img = new Image();

                img.onload = function onload() {
                    var canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob(function(blob) {
                        var newImage = document.createElement('img');
                        newImage.src = window.URL.createObjectURL(blob);
                        newImage.classList.add('jfile');
                        newImage.setAttribute('tabindex', '900');
                        newImage.setAttribute('width', img.width);
                        newImage.setAttribute('height', img.height);
                        files[newImage.src] = {
                            file: newImage.src,
                            extension: extension,
                            content: canvas.toDataURL(),
                        }

                        if (obj.options.dropAsSnippet || asSnippet) {
                            appendImage(newImage);
                            // Just to understand the attachment is part of a snippet
                            files[newImage.src].snippet = true;
                        } else {
                            //insertNodeAtCaret(newImage);
                            document.execCommand('insertHtml', false, newImage.outerHTML);
                        }

                        change();
                    });
                };

                img.src = src;
            }
        }

        obj.addFile = function(files) {
            var reader = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].size > obj.options.maxFileSize) {
                    alert('The file is too big');
                } else {
                    // Only PDF or Images
                    var type = files[i].type.split('/');

                    if (type[0] == 'image') {
                        type = 1;
                    } else if (type[1] == 'pdf') {
                        type = 2;
                    } else {
                        type = 0;
                    }

                    if (type) {
                        // Create file
                        reader[i] = new FileReader();
                        reader[i].index = i;
                        reader[i].type = type;
                        reader[i].name = files[i].name;
                        reader[i].date = files[i].lastModified;
                        reader[i].size = files[i].size;
                        reader[i].addEventListener("load", function (data) {
                            // Get result
                            if (data.target.type == 2) {
                                if (obj.options.acceptFiles == true) {
                                    obj.addPdf(data.target);
                                }
                            } else {
                                obj.addImage(data.target.result);
                            }
                        }, false);

                        reader[i].readAsDataURL(files[i])
                    } else {
                        alert('The extension is not allowed');
                    }
                }
            }
        }

        // Destroy
        obj.destroy = function() {
            obj.editor.removeEventListener('mouseup', editorMouseUp);
            obj.editor.removeEventListener('mousedown', editorMouseDown);
            obj.editor.removeEventListener('mousemove', editorMouseMove);
            obj.editor.removeEventListener('keyup', editorKeyUp);
            obj.editor.removeEventListener('keydown', editorKeyDown);
            obj.editor.removeEventListener('dragstart', editorDragStart);
            obj.editor.removeEventListener('dragenter', editorDragEnter);
            obj.editor.removeEventListener('dragover', editorDragOver);
            obj.editor.removeEventListener('drop', editorDrop);
            obj.editor.removeEventListener('paste', editorPaste);
            obj.editor.removeEventListener('blur', editorBlur);
            obj.editor.removeEventListener('focus', editorFocus);

            el.editor = null;
            el.classList.remove('jeditor-container');

            toolbar.remove();
            snippet.remove();
            obj.editor.remove();
        }

        obj.upload = function() {
            helpers.click(obj.file);
        }

        var select = function(e) {
            var s = window.getSelection()
            var r = document.createRange();
            r.selectNode(e);
            s.addRange(r)
        }

        var editorPaste = function(e) {
            if (obj.options.filterPaste == true) {
                if (e.clipboardData || e.originalEvent.clipboardData) {
                    var html = (e.originalEvent || e).clipboardData.getData('text/html');
                    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                    var file = (e.originalEvent || e).clipboardData.files
                } else if (window.clipboardData) {
                    var html = window.clipboardData.getData('Html');
                    var text = window.clipboardData.getData('Text');
                    var file = window.clipboardData.files
                }

                if (file.length) {
                    // Paste a image from the clipboard
                    obj.addFile(file);
                } else {
                    if (! html) {
                        html = text.split('\r\n');
                        if (! e.target.innerText) {
                            html.map(function(v) {
                                var d = document.createElement('div');
                                d.innerText = v;
                                obj.editor.appendChild(d);
                            });
                        } else {
                            html = html.map(function(v) {
                                return '<div>' + v + '</div>';
                            });
                            document.execCommand('insertText', false, html.join(''));
                        }
                    } else {
                        let img = [];
                        var d = utils_filter(html, img);
                        if (img.length) {
                            for (var i = 0; i < img.length; i++) {
                                obj.addImage(img[i]);
                            }
                        }
                        // Paste to the editor
                        //insertNodeAtCaret(d);
                        document.execCommand('insertHtml', false, d.innerHTML);
                    }
                }

                e.preventDefault();
            }
        }

        var editorDragStart = function(e) {
            if (editorAction && editorAction.e) {
                e.preventDefault();
            }
        }

        var editorDragEnter = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                el.classList.add('jeditor-dragging');
                e.preventDefault();
            }
        }

        var editorDragOver = function(e) {
            if (editorAction || obj.options.dropZone == false) {
                // Do nothing
            } else {
                if (editorTimer) {
                    clearTimeout(editorTimer);
                }

                editorTimer = setTimeout(function() {
                    el.classList.remove('jeditor-dragging');
                }, 100);
                e.preventDefault();
            }
        }

        var editorDrop = function(e) {
            if (editorAction || obj.options.dropZone === false) {
                // Do nothing
            } else {
                // Position caret on the drop
                let range = null;
                if (document.caretRangeFromPoint) {
                    range=document.caretRangeFromPoint(e.clientX, e.clientY);
                } else if (e.rangeParent) {
                    range=document.createRange();
                    range.setStart(e.rangeParent,e.rangeOffset);
                }
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                sel.anchorNode.parentNode.focus();

                let html = (e.originalEvent || e).dataTransfer.getData('text/html');
                let text = (e.originalEvent || e).dataTransfer.getData('text/plain');
                let file = (e.originalEvent || e).dataTransfer.files;

                if (file.length) {
                    obj.addFile(file);
                } else if (text) {
                    extractImageFromHtml(html);
                }

                el.classList.remove('jeditor-dragging');
                e.preventDefault();
            }
        }

        var editorBlur = function(e) {
            // Process extensions
            processExtensions('onevent', e);
            // Apply changes
            change(e);
            // Blur
            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el, obj, e);
            }
        }

        var editorFocus = function(e) {
            // Focus
            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el, obj, e);
            }
        }

        var editorKeyUp = function(e) {
            if (! obj.editor.innerHTML) {
                obj.editor.innerHTML = '<div><br></div>';
            }
            if (typeof(obj.options.onkeyup) == 'function') {
                obj.options.onkeyup(el, obj, e);
            }
        }

        var editorKeyDown = function(e) {
            // Process extensions
            processExtensions('onevent', e);

            if (e.key == 'Delete') {
                if (e.target.tagName == 'IMG') {
                    var parent = e.target.parentNode;
                    select(e.target);
                    if (parent.classList.contains('jsnippet-image')) {
                        updateTotalImages();
                    }
                }
            }

            if (typeof(obj.options.onkeydown) == 'function') {
                obj.options.onkeydown(el, obj, e);
            }
        }

        var editorMouseUp = function(e) {
            if (editorAction && editorAction.e) {
                editorAction.e.classList.remove('resizing');

                if (editorAction.e.changed == true) {
                    var image = editorAction.e.cloneNode()
                    image.width = parseInt(editorAction.e.style.width) || editorAction.e.getAttribute('width');
                    image.height = parseInt(editorAction.e.style.height) || editorAction.e.getAttribute('height');
                    editorAction.e.style.width = '';
                    editorAction.e.style.height = '';
                    select(editorAction.e);
                    document.execCommand('insertHtml', false, image.outerHTML);
                }
            }

            editorAction = false;
        }

        var editorMouseDown = function(e) {
            var close = function(snippet) {
                var rect = snippet.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 40 && e.clientY - rect.top < 40) {
                    snippet.innerHTML = '';
                    snippet.remove();
                }
            }

            if (e.target.tagName == 'IMG') {
                if (e.target.style.cursor) {
                    var rect = e.target.getBoundingClientRect();
                    editorAction = {
                        e: e.target,
                        x: e.clientX,
                        y: e.clientY,
                        w: rect.width,
                        h: rect.height,
                        d: e.target.style.cursor,
                    }

                    if (! e.target.getAttribute('width')) {
                        e.target.setAttribute('width', rect.width)
                    }

                    if (! e.target.getAttribute('height')) {
                        e.target.setAttribute('height', rect.height)
                    }

                    var s = window.getSelection();
                    if (s.rangeCount) {
                        for (var i = 0; i < s.rangeCount; i++) {
                            s.removeRange(s.getRangeAt(i));
                        }
                    }

                    e.target.classList.add('resizing');
                } else {
                    editorAction = true;
                }
            } else {
                if (e.target.classList.contains('jsnippet')) {
                    close(e.target);
                } else if (e.target.parentNode.classList.contains('jsnippet')) {
                    close(e.target.parentNode);
                }

                editorAction = true;
            }
        }

        var editorMouseMove = function(e) {
            if (e.target.tagName == 'IMG' && ! e.target.parentNode.classList.contains('jsnippet-image') && obj.options.allowImageResize == true) {
                if (e.target.getAttribute('tabindex')) {
                    var rect = e.target.getBoundingClientRect();
                    if (e.clientY - rect.top < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'nw-resize';
                        } else {
                            e.target.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'sw-resize';
                        } else {
                            e.target.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'w-resize';
                    } else {
                        e.target.style.cursor = '';
                    }
                }
            }

            // Move
            if (e.which == 1 && editorAction && editorAction.d) {
                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'se-resize') {
                    editorAction.e.style.width = (editorAction.w + (e.clientX - editorAction.x));

                    if (e.shiftKey) {
                        var newHeight = (e.clientX - editorAction.x) * (editorAction.h / editorAction.w);
                        editorAction.e.style.height = editorAction.h + newHeight;
                    } else {
                        var newHeight =  null;
                    }
                }

                if (! newHeight) {
                    if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                        if (! e.shiftKey) {
                            editorAction.e.style.height = editorAction.h + (e.clientY - editorAction.y);
                        }
                    }
                }

                editorAction.e.changed = true;
            }
        }

        var processExtensions = function(method, data) {
            if (obj.options.extensions) {
                var ext = Object.keys(obj.options.extensions);
                if (ext.length) {
                    for (var i = 0; i < ext.length; i++)
                        if (obj.options.extensions[ext[i]] && typeof(obj.options.extensions[ext[i]][method]) == 'function') {
                            obj.options.extensions[ext[i]][method].call(obj, data);
                        }
                }
            }
        }

        var loadExtensions = function() {
            if (obj.options.extensions) {
                var ext = Object.keys(obj.options.extensions);
                if (ext.length) {
                    for (var i = 0; i < ext.length; i++) {
                        if (obj.options.extensions[ext[i]] && typeof (obj.options.extensions[ext[i]]) == 'function') {
                            obj.options.extensions[ext[i]] = obj.options.extensions[ext[i]](el, obj);
                        }
                    }
                }
            }
        }

        document.addEventListener('mouseup', editorMouseUp);
        document.addEventListener('mousemove', editorMouseMove);
        obj.editor.addEventListener('mousedown', editorMouseDown);
        obj.editor.addEventListener('keyup', editorKeyUp);
        obj.editor.addEventListener('keydown', editorKeyDown);
        obj.editor.addEventListener('dragstart', editorDragStart);
        obj.editor.addEventListener('dragenter', editorDragEnter);
        obj.editor.addEventListener('dragover', editorDragOver);
        obj.editor.addEventListener('drop', editorDrop);
        obj.editor.addEventListener('paste', editorPaste);
        obj.editor.addEventListener('focus', editorFocus);
        obj.editor.addEventListener('blur', editorBlur);

        // Append editor to the container
        el.appendChild(obj.editor);
        // Snippet
        if (obj.options.snippet) {
            obj.appendSnippet(obj.options.snippet);
        }

        // Add toolbar
        if (obj.options.toolbar) {
            // Default toolbar configuration
            if (Array.isArray(obj.options.toolbar)) {
                var toolbarOptions = {
                    container: true,
                    responsive: true,
                    items: obj.options.toolbar
                }
            } else if (obj.options.toolbar === true) {
                var toolbarOptions = {
                    container: true,
                    responsive: true,
                    items: [],
                }
            } else {
                var toolbarOptions = obj.options.toolbar;
            }

            // Default items
            if (! (toolbarOptions.items && toolbarOptions.items.length)) {
                toolbarOptions.items = Component.getDefaultToolbar(obj);
            }

            if (obj.options.toolbarOnTop) {
                // Add class
                el.classList.add('toolbar-on-top');
                // Append to the DOM
                el.insertBefore(toolbar, el.firstChild);
            } else {
                // Add padding to the editor
                obj.editor.style.padding = '15px';
                // Append to the DOM
                el.appendChild(toolbar);
            }

            // Create toolbar
            Toolbar(toolbar, toolbarOptions);

            toolbar.addEventListener('click', function() {
                obj.editor.focus();
            })
        }

        // Upload file
        obj.file = document.createElement('input');
        obj.file.style.display = 'none';
        obj.file.type = 'file';
        obj.file.setAttribute('accept', 'image/*');
        obj.file.onchange = function() {
            obj.addFile(this.files);
        }
        el.appendChild(obj.file);

        // Focus to the editor
        if (obj.options.focus) {
            Component.setCursor(obj.editor, obj.options.focus == 'initial' ? true : false);
        }

        // Change method
        el.change = obj.setData;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                // Data type
                var o = el.getAttribute('data-html') === 'true' ? false : true;
                return obj.getData(o);
            } else {
                obj.setData(val);
            }
        }

        loadExtensions();

        el.editor = obj;

        // Onload
        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj, obj.editor);
        }

        return obj;
    });

    Component.setCursor = function(element, first) {
        element.focus();
        document.execCommand('selectAll');
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        if (first == true) {
            var node = range.startContainer;
            var size = 0;
        } else {
            var node = range.endContainer;
            var size = node.length;
        }
        range.setStart(node, size);
        range.setEnd(node, size);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    Component.getDefaultToolbar = function(obj) {

        var color = function(a,b,c) {
            if (! c.color) {
                var t = null;
                var colorPicker = Color(c, {
                    onchange: function(o, v) {
                        if (c.k === 'color') {
                            document.execCommand('foreColor', false, v);
                        } else {
                            document.execCommand('backColor', false, v);
                        }
                    }
                });
                c.color.open();
            }
        }

        var items = [];

        items.push({
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        });

        items.push({
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        });

        items.push({
            type: 'divisor'
        });

        if (obj.options.toolbarOnTop) {
            items.push({
                type: 'select',
                width: '140px',
                options: ['Default', 'Verdana', 'Arial', 'Courier New'],
                render: function (e) {
                    return '<span style="font-family:' + e + '">' + e + '</span>';
                },
                onchange: function (a,b,c,d,e) {
                    document.execCommand("fontName", false, d);
                }
            });

            items.push({
                type: 'select',
                content: 'format_size',
                options: ['x-small', 'small', 'medium', 'large', 'x-large'],
                render: function (e) {
                    return '<span style="font-size:' + e + '">' + e + '</span>';
                },
                onchange: function (a,b,c,d,e) {
                    //var html = `<span style="font-size: ${c}">${text}</span>`;
                    //document.execCommand('insertHtml', false, html);
                    document.execCommand("fontSize", false, parseInt(e)+1);
                    //var f = window.getSelection().anchorNode.parentNode
                    //f.removeAttribute("size");
                    //f.style.fontSize = d;
                }
            });

            items.push({
                type: 'select',
                options: ['format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify'],
                render: function (e) {
                    return '<i class="material-icons">' + e + '</i>';
                },
                onchange: function (a,b,c,d,e) {
                    var options = ['JustifyLeft','justifyCenter','justifyRight','justifyFull'];
                    document.execCommand(options[e]);
                }
            });

            items.push({
                type: 'divisor'
            });

            items.push({
                content: 'format_color_text',
                k: 'color',
                onclick: color,
            });

            items.push({
                content: 'format_color_fill',
                k: 'background-color',
                onclick: color,
            });
        }

        items.push({
            content: 'format_bold',
            onclick: function(a,b,c) {
                document.execCommand('bold');

                if (document.queryCommandState("bold")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_italic',
            onclick: function(a,b,c) {
                document.execCommand('italic');

                if (document.queryCommandState("italic")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_underline',
            onclick: function(a,b,c) {
                document.execCommand('underline');

                if (document.queryCommandState("underline")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            type:'divisor'
        });

        items.push({
            content: 'format_list_bulleted',
            onclick: function(a,b,c) {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_list_numbered',
            onclick: function(a,b,c) {
                document.execCommand('insertOrderedList');

                if (document.queryCommandState("insertOrderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_indent_increase',
            onclick: function(a,b,c) {
                document.execCommand('indent', true, null);

                if (document.queryCommandState("indent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        items.push({
            content: 'format_indent_decrease',
            onclick: function(a,b,c) {
                document.execCommand('outdent');

                if (document.queryCommandState("outdent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        });

        if (obj.options.toolbarOnTop) {
            items.push({
                type: 'divisor'
            });

            items.push({
                content: 'photo',
                onclick: function () {
                    obj.upload();
                }
            });

            items.push({
                type: 'select',
                content: 'table_view',
                columns: 8,
                grid: 8,
                right: true,
                options: [
                    '0x0', '1x0', '2x0', '3x0', '4x0', '5x0', '6x0', '7x0',
                    '0x1', '1x1', '2x1', '3x1', '4x1', '5x1', '6x1', '7x1',
                    '0x2', '1x2', '2x2', '3x2', '4x2', '5x2', '6x2', '7x2',
                    '0x3', '1x3', '2x3', '3x3', '4x3', '5x3', '6x3', '7x3',
                    '0x4', '1x4', '2x4', '3x4', '4x4', '5x4', '6x4', '7x4',
                    '0x5', '1x5', '2x5', '3x5', '4x5', '5x5', '6x5', '7x5',
                    '0x6', '1x6', '2x6', '3x6', '4x6', '5x6', '6x6', '7x6',
                    '0x7', '1x7', '2x7', '3x7', '4x7', '5x7', '6x7', '7x7',
                ],
                render: function (e, item) {
                    if (item) {
                        item.onmouseover = this.onmouseover;
                        e = e.split('x');
                        item.setAttribute('data-x', e[0]);
                        item.setAttribute('data-y', e[1]);
                    }
                    var element = document.createElement('div');
                    item.style.margin = '1px';
                    item.style.border = '1px solid #ddd';
                    return element;
                },
                onmouseover: function (e) {
                    var x = parseInt(e.target.getAttribute('data-x'));
                    var y = parseInt(e.target.getAttribute('data-y'));
                    for (var i = 0; i < e.target.parentNode.children.length; i++) {
                        var element = e.target.parentNode.children[i];
                        var ex = parseInt(element.getAttribute('data-x'));
                        var ey = parseInt(element.getAttribute('data-y'));
                        if (ex <= x && ey <= y) {
                            element.style.backgroundColor = '#cae1fc';
                            element.style.borderColor = '#2977ff';
                        } else {
                            element.style.backgroundColor = '';
                            element.style.borderColor = '#ddd';
                        }
                    }
                },
                onchange: function (a, b, c) {
                    c = c.split('x');
                    var table = document.createElement('table');
                    var tbody = document.createElement('tbody');
                    for (var y = 0; y <= c[1]; y++) {
                        var tr = document.createElement('tr');
                        for (var x = 0; x <= c[0]; x++) {
                            var td = document.createElement('td');
                            td.innerHTML = '';
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody);
                    table.setAttribute('width', '100%');
                    table.setAttribute('cellpadding', '6');
                    table.setAttribute('cellspacing', '0');
                    document.execCommand('insertHTML', false, table.outerHTML);
                }
            });
        }

        return items;
    }

    return Component;
}

/* harmony default export */ var editor = (Editor());

;// CONCATENATED MODULE: ./src/plugins/floating.js
function Floating() {
    var Component = (function (el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            type: 'big',
            title: 'Untitled',
            width: 510,
            height: 472,
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Private methods

        var setContent = function () {
            var temp = document.createElement('div');
            while (el.children[0]) {
                temp.appendChild(el.children[0]);
            }

            obj.content = document.createElement('div');
            obj.content.className = 'jfloating_content';
            obj.content.innerHTML = el.innerHTML;

            while (temp.children[0]) {
                obj.content.appendChild(temp.children[0]);
            }

            obj.container = document.createElement('div');
            obj.container.className = 'jfloating';
            obj.container.appendChild(obj.content);

            if (obj.options.title) {
                obj.container.setAttribute('title', obj.options.title);
            } else {
                obj.container.classList.add('no-title');
            }

            // validate element dimensions
            if (obj.options.width) {
                obj.container.style.width = parseInt(obj.options.width) + 'px';
            }

            if (obj.options.height) {
                obj.container.style.height = parseInt(obj.options.height) + 'px';
            }

            el.innerHTML = '';
            el.appendChild(obj.container);
        }

        var setEvents = function () {
            if (obj.container) {
                obj.container.addEventListener('click', function (e) {
                    var rect = e.target.getBoundingClientRect();

                    if (e.target.classList.contains('jfloating')) {
                        if (e.changedTouches && e.changedTouches[0]) {
                            var x = e.changedTouches[0].clientX;
                            var y = e.changedTouches[0].clientY;
                        } else {
                            var x = e.clientX;
                            var y = e.clientY;
                        }

                        if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                            setTimeout(function () {
                                obj.close();
                            }, 100);
                        } else {
                            obj.setState();
                        }
                    }
                });
            }
        }

        var setType = function () {
            obj.container.classList.add('jfloating-' + obj.options.type);
        }

        obj.state = {
            isMinized: false,
        }

        obj.setState = function () {
            if (obj.state.isMinized) {
                obj.container.classList.remove('jfloating-minimized');
            } else {
                obj.container.classList.add('jfloating-minimized');
            }
            obj.state.isMinized = !obj.state.isMinized;
        }

        obj.close = function () {
            Components.elements.splice(Component.elements.indexOf(obj.container), 1);
            obj.updatePosition();
            el.remove();
        }

        obj.updatePosition = function () {
            for (var i = 0; i < Component.elements.length; i++) {
                var floating = Component.elements[i];
                var prevFloating = Component.elements[i - 1];
                floating.style.right = i * (prevFloating ? prevFloating.offsetWidth : floating.offsetWidth) * 1.01 + 'px';
            }
        }

        obj.init = function () {
            // Set content into root
            setContent();

            // Set dialog events
            setEvents();

            // Set dialog type
            setType();

            // Update floating position
            Component.elements.push(obj.container);
            obj.updatePosition();

            el.floating = obj;
        }

        obj.init();

        return obj;
    });

    Component.elements = [];

    return Component;
}

/* harmony default export */ var floating = (Floating());
;// CONCATENATED MODULE: ./src/plugins/validations.js


const validations_HelpersDate = (dist_default()).Helpers;
function Validations() {
    /**
     * Options: Object,
     * Properties:
     * Constraint,
     * Reference,
     * Value
     */

    const isNumeric = function(num) {
        return !isNaN(num) && num !== null && (typeof num !== 'string' || num.trim() !== '');
    }

    const numberCriterias = {
        'between': function(value, range) {
            return value >= range[0] && value <= range[1];
        },
        'not between': function(value, range) {
            return value < range[0] || value > range[1];
        },
        '<': function(value, range) {
            return value < range[0];
        },
        '<=': function(value, range) {
            return value <= range[0];
        },
        '>': function(value, range) {
            return value > range[0];
        },
        '>=': function(value, range) {
            return value >= range[0];
        },
        '=': function(value, range) {
            return value == range[0];
        },
        '!=': function(value, range) {
            return value != range[0];
        },
    }

    const dateCriterias = {
        'valid date': function() {
            return true;
        },
        '=': function(value, range) {
            return value === range[0];
        },
        '!=': function(value, range) {
            return value !== range[0];
        },
        '<': function(value, range) {
            return value < range[0];
        },
        '<=': function(value, range) {
            return value <= range[0];
        },
        '>': function(value, range) {
            return value > range[0];
        },
        '>=': function(value, range) {
            return value >= range[0];
        },
        'between': function(value, range) {
            return value >= range[0] && value <= range[1];
        },
        'not between': function(value, range) {
            return value < range[0] || value > range[1];
        },
    }

    const textCriterias = {
        'contains': function(value, range) {
            return value.includes(range[0]);
        },
        'not contains': function(value, range) {
            return !value.includes(range[0]);
        },
        'begins with': function(value, range) {
            return value.startsWith(range[0]);
        },
        'ends with': function(value, range) {
            return value.endsWith(range[0]);
        },
        '=': function(value, range) {
            return value === range[0];
        },
        '!=': function(value, range) {
            return value !== range[0];
        },
        'valid email': function(value) {
            var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

            return pattern.test(value);
        },
        'valid url': function(value) {
            var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);

            return pattern.test(value);
        },
    }

    // Component router
    const component = function(value, options) {
        if (typeof(component[options.type]) === 'function') {
            if (options.allowBlank && (typeof value === 'undefined' || value === '' || value === null)) {
                return true;
            }
            return component[options.type].call(this, value, options);
        }
        return null;
    }
    
    component.url = function(data) {
        var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);
        return pattern.test(data) ? true : false;
    }

    component.email = function(data) {
        var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        return data && pattern.test(data) ? true : false;
    }
    
    component.required = function(data) {
        return data && data.trim() ? true : false;
    }

    component.empty = function(data) {
        return typeof data === 'undefined' || data === null || (typeof data === 'string' && !data.toString().trim());
    }

    component['not exist'] = component.empty;

    component.notEmpty = function(data) {
        return !component.empty(data);
    }

    component.exist = component.notEmpty;

    component.number = function(data, options) {
       if (! isNumeric(data)) {
           return false;
       }

       if (!options || !options.criteria) {
           return true;
       }

       if (!numberCriterias[options.criteria]) {
           return false;
       }

       let values = options.value.map(function(num) {
          return parseFloat(num);
       })

       return numberCriterias[options.criteria](data, values);
   };

    component.login = function(data) {
        let pattern = new RegExp(/^[a-zA-Z0-9._-]+$/);
        return data && pattern.test(data) ? true : false;
    }

    component.list = function(data, options) {
        let dataType = typeof data;
        if (dataType !== 'string' && dataType !== 'number') {
            return false;
        }
        let list;
        if (typeof(options.value[0]) === 'string') {
            if (options.source) {
                list = options.source;
            } else {
                list = options.value[0].split(',');
            }
        } else {
            list = options.value[0];
        }

        if (! Array.isArray(list)) {
            return false;
        } else {
            let validOption = list.findIndex(function (item) {
                return item == data;
            });

            return validOption > -1;
        }
    }

    const getCurrentDateWithoutTime = function() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    const relativeDates = {
        'one year ago': function() {
            let date = getCurrentDateWithoutTime();

            date.setFullYear(date.getFullYear() - 1);

            return date;
        },
        'one month ago': function() {
            let date = getCurrentDateWithoutTime();

            date.setMonth(date.getMonth() - 1);

            return date;
        },
        'one week ago': function() {
            let date = getCurrentDateWithoutTime();

            date.setDate(date.getDate() - 7);

            return date;
        },
        yesterday: function() {
            let date = getCurrentDateWithoutTime();

            date.setDate(date.getDate() - 1);

            return date;
        },
        today: getCurrentDateWithoutTime,
        tomorrow: function() {
            let date = getCurrentDateWithoutTime();

            date.setDate(date.getDate() + 1);

            return date;
        },
    };

    component.date = function(data, options) {
        if (isNumeric(data) && data > 0 && data < 1000000) {
            data = validations_HelpersDate.numToDate(data);
        }

        if (new Date(data) == 'Invalid Date') {
            return false;
        }

        if (!options || !options.criteria) {
            return true;
        }

        if (!dateCriterias[options.criteria]) {
            return false;
        }

        let values = options.value.map(function(date) {
            if (typeof date === 'string' && relativeDates[date]) {
                return relativeDates[date]().getTime();
            }

            return new Date(date).getTime();
        });

        return dateCriterias[options.criteria](new Date(data).getTime(), values);
    }

    component.text = function(data, options) {
        if (typeof data === 'undefined' || data === null) {
            data = '';
        } else if (typeof data !== 'string') {
            return false;
        }

        if (!options || !options.criteria) {
            return true;
        }

        if (!textCriterias[options.criteria]) {
            return false;
        }

        return textCriterias[options.criteria](data, options.value);
    }

    component.textLength = function(data, options) {
        let textLength;
        if (typeof data === 'string') {
            textLength = data.length;
        } else if (typeof data !== 'undefined' && data !== null && typeof data.toString === 'function') {
            textLength = data.toString().length;
        } else {
            textLength = 0;
        }

        return component.number(textLength, options);
    }

    component.time = function(data, options) {
       if (! isNumeric(data)) {
           return false;
       }

       if (!options || !options.criteria) {
           return true;
       }

       if (!numberCriterias[options.criteria]) {
           return false;
       }

       let values = options.value.map(function(num) {
          return parseInt(parseFloat(num) * 10**17) / 10**17;
       })

       return numberCriterias[options.criteria](parseInt(parseFloat(data) * 10**17) / 10**17, values);
   };

    return component;
}

/* harmony default export */ var validations = (Validations());
;// CONCATENATED MODULE: ./src/plugins/form.js




function Form() {
    var Component = (function(el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            url: null,
            message: 'Are you sure? There are unsaved information in your form',
            ignore: false,
            currentHash: null,
            submitButton:null,
            validations: null,
            onbeforeload: null,
            onload: null,
            onbeforesave: null,
            onsave: null,
            onbeforeremove: null,
            onremove: null,
            onerror: function(el, message) {
                alert(message);
            }
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Validations
        if (! obj.options.validations) {
            obj.options.validations = {};
        }

        // Submit Button
        if (! obj.options.submitButton) {
            obj.options.submitButton = el.querySelector('input[type=submit]');
        }

        if (obj.options.submitButton && obj.options.url) {
            obj.options.submitButton.onclick = function() {
                obj.save();
            }
        }

        if (! obj.options.validations.email) {
            obj.options.validations.email = validations.email;
        }

        if (! obj.options.validations.length) {
            obj.options.validations.length = validations.length;
        }

        if (! obj.options.validations.required) {
            obj.options.validations.required = validations.required;
        }

        obj.setUrl = function(url) {
            obj.options.url = url;
        }

        obj.load = function() {
            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                queue: true,
                success: function(data) {
                    // Overwrite values from the backend
                    if (typeof(obj.options.onbeforeload) == 'function') {
                        var ret = obj.options.onbeforeload(el, data);
                        if (ret) {
                            data = ret;
                        }
                    }
                    // Apply values to the form
                    Component.setElements(el, data);
                    // Onload methods
                    if (typeof(obj.options.onload) == 'function') {
                        obj.options.onload(el, data);
                    }
                }
            });
        }

        obj.save = function() {
            var test = obj.validate();

            if (test) {
                obj.options.onerror(el, test);
            } else {
                var data = Component.getElements(el, true);

                if (typeof(obj.options.onbeforesave) == 'function') {
                    var data = obj.options.onbeforesave(el, data);

                    if (data === false) {
                        return;
                    }
                }

                ajax({
                    url: obj.options.url,
                    method: 'POST',
                    dataType: 'json',
                    data: data,
                    success: function(result) {
                        if (typeof(obj.options.onsave) == 'function') {
                            obj.options.onsave(el, data, result);
                        }
                    }
                });
            }
        }

        obj.remove = function() {
            if (typeof(obj.options.onbeforeremove) == 'function') {
                var ret = obj.options.onbeforeremove(el, obj);
                if (ret === false) {
                    return false;
                }
            }

            ajax({
                url: obj.options.url,
                method: 'DELETE',
                dataType: 'json',
                success: function(result) {
                    if (typeof(obj.options.onremove) == 'function') {
                        obj.options.onremove(el, obj, result);
                    }

                    obj.reset();
                }
            });
        }

        var addError = function(element) {
            // Add error in the element
            element.classList.add('error');
            // Submit button
            if (obj.options.submitButton) {
                obj.options.submitButton.setAttribute('disabled', true);
            }
            // Return error message
            var error = element.getAttribute('data-error') || 'There is an error in the form';
            element.setAttribute('title', error);
            return error;
        }

        var delError = function(element) {
            var error = false;
            // Remove class from this element
            element.classList.remove('error');
            element.removeAttribute('title');
            // Get elements in the form
            var elements = el.querySelectorAll("input, select, textarea, div[name]");
            // Run all elements
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getAttribute('data-validation')) {
                    if (elements[i].classList.contains('error')) {
                        error = true;
                    }
                }
            }

            if (obj.options.submitButton) {
                if (error) {
                    obj.options.submitButton.setAttribute('disabled', true);
                } else {
                    obj.options.submitButton.removeAttribute('disabled');
                }
            }
        }

        obj.validateElement = function(element) {
            // Test results
            var test = false;
            // Value
            var value = Component.getValue(element);
            // Validation
            var validation = element.getAttribute('data-validation');
            // Parse
            if (typeof(obj.options.validations[validation]) == 'function' && ! obj.options.validations[validation](value, element)) {
                // Not passed in the test
                test = addError(element);
            } else {
                if (element.classList.contains('error')) {
                    delError(element);
                }
            }

            return test;
        }

        obj.reset = function() {
            // Get elements in the form
            var name = null;
            var elements = el.querySelectorAll("input, select, textarea, div[name]");
            // Run all elements
            for (var i = 0; i < elements.length; i++) {
                if (name = elements[i].getAttribute('name')) {
                    if (elements[i].type == 'checkbox' || elements[i].type == 'radio') {
                        elements[i].checked = false;
                    } else {
                        if (typeof(elements[i].val) == 'function') {
                            elements[i].val('');
                        } else {
                            elements[i].value = '';
                        }
                    }
                }
            }
        }

        // Run form validation
        obj.validate = function() {
            var test = [];
            // Get elements in the form
            var elements = el.querySelectorAll("input, select, textarea, div[name]");
            // Run all elements
            for (var i = 0; i < elements.length; i++) {
                // Required
                if (elements[i].getAttribute('data-validation')) {
                    var res = obj.validateElement(elements[i]);
                    if (res) {
                        test.push(res);
                    }
                }
            }
            if (test.length > 0) {
                return test.join('<br>');
            } else {
                return false;
            }
        }

        // Check the form
        obj.getError = function() {
            // Validation
            return obj.validation() ? true : false;
        }

        // Return the form hash
        obj.setHash = function() {
            return obj.getHash(Component.getElements(el));
        }

        // Get the form hash
        obj.getHash = function(str) {
            var hash = 0, i, chr;

            if (str.length === 0) {
                return hash;
            } else {
                for (i = 0; i < str.length; i++) {
                  chr = str.charCodeAt(i);
                  hash = ((hash << 5) - hash) + chr;
                  hash |= 0;
                }
            }

            return hash;
        }

        // Is there any change in the form since start tracking?
        obj.isChanged = function() {
            var hash = obj.setHash();
            return (obj.options.currentHash != hash);
        }

        // Restart tracking
        obj.resetTracker = function() {
            obj.options.currentHash = obj.setHash();
            obj.options.ignore = false;
        }

        // Ignore flag
        obj.setIgnore = function(ignoreFlag) {
            obj.options.ignore = ignoreFlag ? true : false;
        }

        // Start tracking in one second
        setTimeout(function() {
            obj.options.currentHash = obj.setHash();
        }, 1000);

        // Validations
        el.addEventListener("keyup", function(e) {
            if (e.target.getAttribute('data-validation')) {
                obj.validateElement(e.target);
            }
        });

        // Alert
        if (! Component.hasEvents) {
            window.addEventListener("beforeunload", function (e) {
                if (obj.isChanged() && obj.options.ignore == false) {
                    var confirmationMessage =  obj.options.message? obj.options.message : "\o/";

                    if (confirmationMessage) {
                        if (typeof e == 'undefined') {
                            e = window.event;
                        }

                        if (e) {
                            e.returnValue = confirmationMessage;
                        }

                        return confirmationMessage;
                    } else {
                        return void(0);
                    }
                }
            });

            Component.hasEvents = true;
        }

        el.form = obj;

        return obj;
    });

    // Get value from one element
    Component.getValue = function(element) {
        var value = null;
        if (element.type == 'checkbox') {
            if (element.checked == true) {
                value = element.value || true;
            }
        } else if (element.type == 'radio') {
            if (element.checked == true) {
                value = element.value;
            }
        } else if (element.type == 'file') {
            value = element.files;
        } else if (element.tagName == 'select' && element.multiple == true) {
            value = [];
            var options = element.querySelectorAll("options[selected]");
            for (var j = 0; j < options.length; j++) {
                value.push(options[j].value);
            }
        } else if (typeof(element.val) == 'function') {
            value = element.val();
        } else {
            value = element.value || '';
        }

        return value;
    }

    // Get form elements
    Component.getElements = function(el, asArray) {
        var data = {};
        var name = null;
        var elements = el.querySelectorAll("input, select, textarea, div[name]");

        for (var i = 0; i < elements.length; i++) {
            if (name = elements[i].getAttribute('name')) {
                data[name] = Component.getValue(elements[i]) || '';
            }
        }

        return asArray == true ? data : JSON.stringify(data);
    }

    //Get form elements
    Component.setElements = function(el, data) {
        var name = null;
        var value = null;
        var elements = el.querySelectorAll("input, select, textarea, div[name]");
        for (var i = 0; i < elements.length; i++) {
            // Attributes
            var type = elements[i].getAttribute('type');
            if (name = elements[i].getAttribute('name')) {
                // Transform variable names in pathname
                name = name.replace(new RegExp(/\[(.*?)\]/ig), '.$1');
                value = null;
                // Seach for the data in the path
                if (name.match(/\./)) {
                    var tmp = Path.call(data, name) || '';
                    if (typeof(tmp) !== 'undefined') {
                        value = tmp;
                    }
                } else {
                    if (typeof(data[name]) !== 'undefined') {
                        value = data[name];
                    }
                }
                // Set the values
                if (value !== null) {
                    if (type == 'checkbox' || type == 'radio') {
                        elements[i].checked = value ? true : false;
                    } else if (type == 'file') {
                        // Do nothing
                    } else {
                        if (typeof (elements[i].val) == 'function') {
                            elements[i].val(value);
                        } else {
                            elements[i].value = value;
                        }
                    }
                }
            }
        }
    }

    return Component;
}

/* harmony default export */ var plugins_form = (Form());
;// CONCATENATED MODULE: ./src/plugins/mask.js
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




/* harmony default export */ var mask = (dist.Mask);

;// CONCATENATED MODULE: ./src/plugins/modal.js




function Modal() {

    var Events = function() {
        //  Position
        var tracker = null;

        var keyDown = function (e) {
            if (e.which == 27) {
                var modals = document.querySelectorAll('.jmodal');
                for (var i = 0; i < modals.length; i++) {
                    modals[i].parentNode.modal.close();
                }
            }
        }

        var mouseUp = function (e) {
            let element = e.composedPath();
            var item = helpers.findElement(element[0], 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    item.parentNode.modal.close();
                }
            }

            if (tracker) {
                tracker.element.style.cursor = 'auto';
                tracker = null;
            }
        }

        var mouseDown = function (e) {
            let element = e.composedPath();
            var item = helpers.findElement(element[0], 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    // Do nothing
                } else {
                    if (y - rect.top < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        }

                        tracker = {
                            left: rect.left,
                            top: rect.top,
                            x: e.clientX,
                            y: e.clientY,
                            width: rect.width,
                            height: rect.height,
                            element: item,
                        }
                    }
                }
            }
        }

        var mouseMove = function (e) {
            if (tracker) {
                e = e || window.event;
                if (e.buttons) {
                    var mouseButton = e.buttons;
                } else if (e.button) {
                    var mouseButton = e.button;
                } else {
                    var mouseButton = e.which;
                }

                if (mouseButton) {
                    tracker.element.style.top = (tracker.top + (e.clientY - tracker.y) + (tracker.height / 2)) + 'px';
                    tracker.element.style.left = (tracker.left + (e.clientX - tracker.x) + (tracker.width / 2)) + 'px';
                    tracker.element.style.cursor = 'move';
                } else {
                    tracker.element.style.cursor = 'auto';
                }
            }
        }

        document.addEventListener('keydown', keyDown);
        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mousemove', mouseMove);
    }

    var Component = (function (el, options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            url: null,
            onopen: null,
            onclose: null,
            onload: null,
            closed: false,
            width: null,
            height: null,
            title: null,
            padding: null,
            backdrop: true,
            icon: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Title
        if (!obj.options.title && el.getAttribute('title')) {
            obj.options.title = el.getAttribute('title');
        }

        var temp = document.createElement('div');
        while (el.children[0]) {
            temp.appendChild(el.children[0]);
        }

        obj.title = document.createElement('div');
        obj.title.className = 'jmodal_title';
        if (obj.options.icon) {
            obj.title.setAttribute('data-icon', obj.options.icon);
        }

        obj.content = document.createElement('div');
        obj.content.className = 'jmodal_content';
        obj.content.innerHTML = el.innerHTML;

        while (temp.children[0]) {
            obj.content.appendChild(temp.children[0]);
        }

        obj.container = document.createElement('div');
        obj.container.className = 'jmodal';
        obj.container.appendChild(obj.title);
        obj.container.appendChild(obj.content);

        if (obj.options.padding) {
            obj.content.style.padding = obj.options.padding;
        }
        if (obj.options.width) {
            obj.container.style.width = obj.options.width;
        }
        if (obj.options.height) {
            obj.container.style.height = obj.options.height;
        }
        if (obj.options.title) {
            var title = document.createElement('h4');
            title.innerText = obj.options.title;
            obj.title.appendChild(title);
        }

        el.innerHTML = '';
        el.style.display = 'none';
        el.appendChild(obj.container);

        // Backdrop
        if (obj.options.backdrop) {
            var backdrop = document.createElement('div');
            backdrop.className = 'jmodal_backdrop';
            backdrop.onclick = function () {
                obj.close();
            }
            el.appendChild(backdrop);
        }

        obj.open = function () {
            el.style.display = 'block';
            // Fullscreen
            var rect = obj.container.getBoundingClientRect();
            if (helpers.getWindowWidth() < rect.width) {
                obj.container.style.top = '';
                obj.container.style.left = '';
                obj.container.classList.add('jmodal_fullscreen');
                animation.slideBottom(obj.container, 1);
            } else {
                if (obj.options.backdrop) {
                    backdrop.style.display = 'block';
                }
            }
            // Event
            if (typeof (obj.options.onopen) == 'function') {
                obj.options.onopen(el, obj);
            }
        }

        obj.resetPosition = function () {
            obj.container.style.top = '';
            obj.container.style.left = '';
        }

        obj.isOpen = function () {
            return el.style.display != 'none' ? true : false;
        }

        obj.close = function () {
            if (obj.isOpen()) {
                el.style.display = 'none';
                if (obj.options.backdrop) {
                    // Backdrop
                    backdrop.style.display = '';
                }
                // Remove fullscreen class
                obj.container.classList.remove('jmodal_fullscreen');
                // Event
                if (typeof (obj.options.onclose) == 'function') {
                    obj.options.onclose(el, obj);
                }
            }
        }

        if (obj.options.url) {
            ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'text/html',
                success: function (data) {
                    obj.content.innerHTML = data;

                    if (!obj.options.closed) {
                        obj.open();
                    }

                    if (typeof (obj.options.onload) === 'function') {
                        obj.options.onload(obj);
                    }
                }
            });
        } else {
            if (!obj.options.closed) {
                obj.open();
            }

            if (typeof (obj.options.onload) === 'function') {
                obj.options.onload(obj);
            }
        }

        // Keep object available from the node
        el.modal = obj;

        // Create events when the first modal is create only
        Events();

        // Execute the events only once
        Events = function() {};

        return obj;
    });

    return Component;
}

/* harmony default export */ var modal = (Modal());
;// CONCATENATED MODULE: ./src/plugins/notification.js



function Notification() {
    var Component = function (options) {
        var obj = {};
        obj.options = {};

        // Default configuration
        var defaults = {
            icon: null,
            name: 'Notification',
            date: null,
            error: null,
            title: null,
            message: null,
            timeout: 4000,
            autoHide: true,
            closeable: true,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        var notification = document.createElement('div');
        notification.className = 'jnotification';

        if (obj.options.error) {
            notification.classList.add('jnotification-error');
        }

        var notificationContainer = document.createElement('div');
        notificationContainer.className = 'jnotification-container';
        notification.appendChild(notificationContainer);

        var notificationHeader = document.createElement('div');
        notificationHeader.className = 'jnotification-header';
        notificationContainer.appendChild(notificationHeader);

        var notificationImage = document.createElement('div');
        notificationImage.className = 'jnotification-image';
        notificationHeader.appendChild(notificationImage);

        if (obj.options.icon) {
            var notificationIcon = document.createElement('img');
            notificationIcon.src = obj.options.icon;
            notificationImage.appendChild(notificationIcon);
        }

        var notificationName = document.createElement('div');
        notificationName.className = 'jnotification-name';
        notificationName.innerHTML = obj.options.name;
        notificationHeader.appendChild(notificationName);

        if (obj.options.closeable == true) {
            var notificationClose = document.createElement('div');
            notificationClose.className = 'jnotification-close';
            notificationClose.onclick = function () {
                obj.hide();
            }
            notificationHeader.appendChild(notificationClose);
        }

        var notificationDate = document.createElement('div');
        notificationDate.className = 'jnotification-date';
        notificationHeader.appendChild(notificationDate);

        var notificationContent = document.createElement('div');
        notificationContent.className = 'jnotification-content';
        notificationContainer.appendChild(notificationContent);

        if (obj.options.title) {
            var notificationTitle = document.createElement('div');
            notificationTitle.className = 'jnotification-title';
            notificationTitle.innerHTML = obj.options.title;
            notificationContent.appendChild(notificationTitle);
        }

        var notificationMessage = document.createElement('div');
        notificationMessage.className = 'jnotification-message';
        notificationMessage.innerHTML = obj.options.message;
        notificationContent.appendChild(notificationMessage);

        obj.show = function () {
            document.body.appendChild(notification);
            if (helpers.getWindowWidth() > 800) {
                animation.fadeIn(notification);
            } else {
                animation.slideTop(notification, 1);
            }
        }

        obj.hide = function () {
            if (helpers.getWindowWidth() > 800) {
                animation.fadeOut(notification, function () {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                        if (notificationTimeout) {
                            clearTimeout(notificationTimeout);
                        }
                    }
                });
            } else {
                animation.slideTop(notification, 0, function () {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                        if (notificationTimeout) {
                            clearTimeout(notificationTimeout);
                        }
                    }
                });
            }
        };

        obj.show();

        if (obj.options.autoHide == true) {
            var notificationTimeout = setTimeout(function () {
                obj.hide();
            }, obj.options.timeout);
        }

        if (helpers.getWindowWidth() < 800) {
            notification.addEventListener("swipeup", function (e) {
                obj.hide();
                e.preventDefault();
                e.stopPropagation();
            });
        }

        return obj;
    }

    Component.isVisible = function () {
        var j = document.querySelector('.jnotification');
        return j && j.parentNode ? true : false;
    }

    return Component;
}

/* harmony default export */ var notification = (Notification());
;// CONCATENATED MODULE: ./src/plugins/progressbar.js
function Progressbar(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        value: 0,
        onchange: null,
        width: null,
    };

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jprogressbar');
    el.setAttribute('tabindex', 1);
    el.setAttribute('data-value', obj.options.value);

    var bar = document.createElement('div');
    bar.style.width = obj.options.value + '%';
    bar.style.color = '#fff';
    el.appendChild(bar);

    if (obj.options.width) {
        el.style.width = obj.options.width;
    }

    // Set value
    obj.setValue = function(value) {
        value = parseInt(value);
        obj.options.value = value;
        bar.style.width = value + '%';
        el.setAttribute('data-value', value + '%');

        if (value < 6) {
            el.style.color = '#000';
        } else {
            el.style.color = '#fff';
        }

        // Update value
        obj.options.value = value;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, value);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.oninput) == 'function') {
                el.oninput({
                    type: 'input',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    var action = function(e) {
        if (e.which) {
            // Get target info
            var rect = el.getBoundingClientRect();

            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            obj.setValue(Math.round((x - rect.left) / rect.width * 100));
        }
    }

    // Events
    if ('touchstart' in document.documentElement === true) {
        el.addEventListener('touchstart', action);
        el.addEventListener('touchend', action);
    } else {
        el.addEventListener('mousedown', action);
        el.addEventListener("mousemove", action);
    }

    // Change
    el.change = obj.setValue;

    // Global generic value handler
    el.val = function(val) {
        if (val === undefined) {
            return obj.getValue();
        } else {
            obj.setValue(val);
        }
    }

    // Reference
    el.progressbar = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/rating.js
function Rating(el, options) {
    // Already created, update options
    if (el.rating) {
        return el.rating.setOptions(options, true);
    }

    // New instance
    var obj = {};
    obj.options = {};

    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            number: 5,
            value: 0,
            tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
            onchange: null,
        };

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Make sure the container is empty
        el.innerHTML = '';

        // Add elements
        for (var i = 0; i < obj.options.number; i++) {
            var div = document.createElement('div');
            div.setAttribute('data-index', (i + 1))
            div.setAttribute('title', obj.options.tooltip[i])
            el.appendChild(div);
        }

        // Selected option
        if (obj.options.value) {
            for (var i = 0; i < obj.options.number; i++) {
                if (i < obj.options.value) {
                    el.children[i].classList.add('jrating-selected');
                }
            }
        }

        return obj;
    }

    // Set value
    obj.setValue = function(index) {
        for (var i = 0; i < obj.options.number; i++) {
            if (i < index) {
                el.children[i].classList.add('jrating-selected');
            } else {
                el.children[i].classList.remove('jrating-over');
                el.children[i].classList.remove('jrating-selected');
            }
        }

        obj.options.value = index;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, index);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.oninput) == 'function') {
                el.oninput({
                    type: 'input',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    var init = function() {
        // Start plugin
        obj.setOptions(options);

        // Class
        el.classList.add('jrating');

        // Events
        el.addEventListener("click", function(e) {
            var index = e.target.getAttribute('data-index');
            if (index != undefined) {
                if (index == obj.options.value) {
                    obj.setValue(0);
                } else {
                    obj.setValue(index);
                }
            }
        });

        el.addEventListener("mouseover", function(e) {
            var index = e.target.getAttribute('data-index');
            for (var i = 0; i < obj.options.number; i++) {
                if (i < index) {
                    el.children[i].classList.add('jrating-over');
                } else {
                    el.children[i].classList.remove('jrating-over');
                }
            }
        });

        el.addEventListener("mouseout", function(e) {
            for (var i = 0; i < obj.options.number; i++) {
                el.children[i].classList.remove('jrating-over');
            }
        });

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.rating = obj;
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/search.js



function Search(el, options) {
    if (el.search) {
        return el.search;
    }

    var index =  null;

    var select = function(e) {
        if (e.target.classList.contains('jsearch_item')) {
            var element = e.target;
        } else {
            var element = e.target.parentNode;
        }

        obj.selectIndex(element);
        e.preventDefault();
    }

    var createList = function(data) {
        if (typeof(obj.options.onsearch) == 'function') {
            var ret = obj.options.onsearch(obj, data);
            if (ret) {
                data = ret;
            }
        }

        // Reset container
        container.innerHTML = '';
        // Print results
        if (! data.length) {
            // Show container
            el.style.display = '';
        } else {
            // Show container
            el.style.display = 'block';

            // Show items (only 10)
            var len = data.length < 11 ? data.length : 10;
            for (var i = 0; i < len; i++) {
                if (typeof(data[i]) == 'string') {
                    var text = data[i];
                    var value = data[i];
                } else {
                    // Legacy
                    var text = data[i].text;
                    if (! text && data[i].name) {
                        text = data[i].name;
                    }
                    var value = data[i].value;
                    if (! value && data[i].id) {
                        value = data[i].id;
                    }
                }

                var div = document.createElement('div');
                div.setAttribute('data-value', value);
                div.setAttribute('data-text', text);
                div.className = 'jsearch_item';

                if (data[i].id) {
                    div.setAttribute('id', data[i].id)
                }

                if (obj.options.forceSelect && i == 0) {
                    div.classList.add('selected');
                }
                var img = document.createElement('img');
                if (data[i].image) {
                    img.src = data[i].image;
                } else {
                    img.style.display = 'none';
                }
                div.appendChild(img);

                var item = document.createElement('div');
                item.innerHTML = text;
                div.appendChild(item);

                // Append item to the container
                container.appendChild(div);
            }
        }
    }

    var execute = function(str) {
        if (str != obj.terms) {
            // New terms
            obj.terms = str;
            // New index
            if (obj.options.forceSelect) {
                index = 0;
            } else {
                index = null;
            }
            // Array or remote search
            if (Array.isArray(obj.options.data)) {
                var test = function(o) {
                    if (typeof(o) == 'string') {
                        if ((''+o).toLowerCase().search(str.toLowerCase()) >= 0) {
                            return true;
                        }
                    } else {
                        for (var key in o) {
                            var value = o[key];
                            if ((''+value).toLowerCase().search(str.toLowerCase()) >= 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                var results = obj.options.data.filter(function(item) {
                    return test(item);
                });

                // Show items
                createList(results);
            } else {
                // Get remove results
                ajax({
                    url: obj.options.data + str,
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        // Show items
                        createList(data);
                    }
                });
            }
        }
    }

    // Search timer
    var timer = null;

    // Search methods
    var obj = function(str) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            execute(str);
        }, 500);
    }
    if(options.forceSelect === null) {
        options.forceSelect = true;
    }
    obj.options = {
        data: options.data || null,
        input: options.input || null,
        searchByNode: options.searchByNode || null,
        onselect: options.onselect || null,
        forceSelect: options.forceSelect,
        onsearch: options.onsearch || null,
        onbeforesearch: options.onbeforesearch || null,
    };

    obj.selectIndex = function(item) {
        var id = item.getAttribute('id');
        var text = item.getAttribute('data-text');
        var value = item.getAttribute('data-value');
        var image = item.children[0].src || '';
        // Onselect
        if (typeof(obj.options.onselect) == 'function') {
            obj.options.onselect(obj, text, value, id, image);
        }
        // Close container
        obj.close();
    }

    obj.open = function() {
        el.style.display = 'block';
    }

    obj.close = function() {
        if (timer) {
            clearTimeout(timer);
        }
        // Current terms
        obj.terms = '';
        // Remove results
        container.innerHTML = '';
        // Hide
        el.style.display = '';
    }

    obj.isOpened = function() {
        return el.style.display ? true : false;
    }

    obj.keydown = function(e) {
        if (obj.isOpened()) {
            if (e.key == 'Enter') {
                // Enter
                if (index!==null && container.children[index]) {
                    obj.selectIndex(container.children[index]);
                    e.preventDefault();
                } else {
                    obj.close();
                }
            } else if (e.key === 'ArrowUp') {
                // Up
                if (index!==null && container.children[0]) {
                    container.children[index].classList.remove('selected');
                    if(!obj.options.forceSelect && index === 0) {
                        index = null;
                    } else {
                        index = Math.max(0, index-1);
                        container.children[index].classList.add('selected');
                    }
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                // Down
                if(index == null) {
                    index = -1;
                } else {
                    container.children[index].classList.remove('selected');
                }
                if (index < 9 && container.children[index+1]) {
                    index++;
                }
                container.children[index].classList.add('selected');
                e.preventDefault();
            }
        }
    }

    obj.keyup = function(e) {
        if (! obj.options.searchByNode && obj.options.input) {
            if (obj.options.input.tagName === 'DIV') {
                var terms = obj.options.input.innerText;
            } else {
                var terms = obj.options.input.value;
            }
        } else {
            // Current node
            var node = helpers.getNode();
            if (node) {
                var terms = node.innerText;
            }
        }

        if (typeof(obj.options.onbeforesearch) == 'function') {
            var ret = obj.options.onbeforesearch(obj, terms);
            if (ret) {
                terms = ret;
            } else {
                if (ret === false) {
                    // Ignore event
                    return;
                }
            }
        }

        obj(terms);
    }

    obj.blur = function(e) {
        obj.close();
    }

    // Add events
    if (obj.options.input) {
        obj.options.input.addEventListener("keyup", obj.keyup);
        obj.options.input.addEventListener("keydown", obj.keydown);
        obj.options.input.addEventListener("blur", obj.blur);
    }

    // Append element
    var container = document.createElement('div');
    container.classList.add('jsearch_container');
    container.onmousedown = select;
    el.appendChild(container);

    el.classList.add('jsearch');
    el.search = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/slider.js
function Slider(el, options) {
    var obj = {};
    obj.options = {};
    obj.currentImage = null;

    if (options) {
        obj.options = options;
    }

    // Focus
    el.setAttribute('tabindex', '900')

    // Items
    obj.options.items = [];

    if (! el.classList.contains('jslider')) {
        el.classList.add('jslider');
        el.classList.add('unselectable');

        if (obj.options.height) {
            el.style.minHeight = parseInt(obj.options.height) + 'px';
        }
        if (obj.options.width) {
            el.style.width = parseInt(obj.options.width) + 'px';
        }
        if (obj.options.grid) {
            el.classList.add('jslider-grid');
            var number = el.children.length;
            if (number > 4) {
                el.setAttribute('data-total', number - 4);
            }
            el.setAttribute('data-number', (number > 4 ? 4 : number));
        }

        // Add slider counter
        var counter = document.createElement('div');
        counter.classList.add('jslider-counter');

        // Move children inside
        if (el.children.length > 0) {
            // Keep children items
            for (var i = 0; i < el.children.length; i++) {
                obj.options.items.push(el.children[i]);
                
                // counter click event
                var item = document.createElement('div');
                item.onclick = function() {
                    var index = Array.prototype.slice.call(counter.children).indexOf(this);
                    obj.show(obj.currentImage = obj.options.items[index]);
                }
                counter.appendChild(item);
            }
        }
        // Add caption
        var caption = document.createElement('div');
        caption.className = 'jslider-caption';

        // Add close buttom
        var controls = document.createElement('div');
        var close = document.createElement('div');
        close.className = 'jslider-close';
        close.innerHTML = '';
        
        close.onclick = function() {
            obj.close();
        }
        controls.appendChild(caption);
        controls.appendChild(close);
    }

    obj.updateCounter = function(index) {
        for (var i = 0; i < counter.children.length; i ++) {
            if (counter.children[i].classList.contains('jslider-counter-focus')) {
                counter.children[i].classList.remove('jslider-counter-focus');
                break;
            }
        }
        counter.children[index].classList.add('jslider-counter-focus');
    }

    obj.show = function(target) {
        if (! target) {
            var target = el.children[0];
        }

        // Focus element
        el.classList.add('jslider-focus');
        el.classList.remove('jslider-grid');
        el.appendChild(controls);
        el.appendChild(counter);

        // Update counter
        var index = obj.options.items.indexOf(target);
        obj.updateCounter(index);

        // Remove display
        for (var i = 0; i < el.children.length; i++) {
            el.children[i].style.display = '';
        }
        target.style.display = 'block';

        // Is there any previous
        if (target.previousElementSibling) {
            el.classList.add('jslider-left');
        } else {
            el.classList.remove('jslider-left');
        }

        // Is there any next
        if (target.nextElementSibling && target.nextElementSibling.tagName == 'IMG') {
            el.classList.add('jslider-right');
        } else {
            el.classList.remove('jslider-right');
        }

        obj.currentImage = target;

        // Vertical image
        if (obj.currentImage.offsetHeight > obj.currentImage.offsetWidth) {
            obj.currentImage.classList.add('jslider-vertical');
        }

        controls.children[0].innerText = obj.currentImage.getAttribute('title');
    }

    obj.open = function() {
        obj.show();

        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function() {
        // Remove control classes
        el.classList.remove('jslider-focus');
        el.classList.remove('jslider-left');
        el.classList.remove('jslider-right');
        // Show as a grid depending on the configuration
        if (obj.options.grid) {
            el.classList.add('jslider-grid');
        }
        // Remove display
        for (var i = 0; i < el.children.length; i++) {
            el.children[i].style.display = '';
        }
        // Remove controls from the component
        counter.remove();
        controls.remove();
        // Current image
        obj.currentImage = null;
        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
    }

    obj.reset = function() {
        el.innerHTML = '';
    }

    obj.next = function() {
        var nextImage = obj.currentImage.nextElementSibling;
        if (nextImage && nextImage.tagName === 'IMG') {
            obj.show(obj.currentImage.nextElementSibling);
        }
    }
    
    obj.prev = function() {
        if (obj.currentImage.previousElementSibling) {
            obj.show(obj.currentImage.previousElementSibling);
        }
    }

    var mouseUp = function(e) {
        // Open slider
        if (e.target.tagName == 'IMG') {
            obj.show(e.target);
        } else if (! e.target.classList.contains('jslider-close') && ! (e.target.parentNode.classList.contains('jslider-counter') || e.target.classList.contains('jslider-counter'))){
            // Arrow controls
            var offsetX = e.offsetX || e.changedTouches[0].clientX;
            if (e.target.clientWidth - offsetX < 40) {
                // Show next image
                obj.next();
            } else if (offsetX < 40) {
                // Show previous image
                obj.prev();
            }
        }
    }

    if ('ontouchend' in document.documentElement === true) {
        el.addEventListener('touchend', mouseUp);
    } else {
        el.addEventListener('mouseup', mouseUp);
    }

    // Add global events
    el.addEventListener("swipeleft", function(e) {
        obj.next();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener("swiperight", function(e) {
        obj.prev();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            obj.close();
        }
    });

    el.slider = obj;

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/tags.js




function Tags(el, options) {
    // Redefine configuration
    if (el.tags) {
        return el.tags.setOptions(options, true);
    }

    var obj = { type:'tags' };
    obj.options = {};

    // Limit
    var limit = function() {
        return obj.options.limit && el.children.length >= obj.options.limit ? true : false;
    }

    // Search helpers
    var search = null;
    var searchContainer = null;

    obj.setOptions = function(options, reset) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {number} limit - Max number of tags inside the element
         * @property {string} search - The URL for suggestions
         * @property {string} placeholder - The default instruction text on the element
         * @property {validation} validation - Method to validate the tags
         * @property {requestCallback} onbeforechange - Method to be execute before any changes on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onfocus - Method to be execute when on focus
         * @property {requestCallback} onblur - Method to be execute when on blur
         * @property {requestCallback} onload - Method to be execute when the element is loaded
         */
        var defaults = {
            value: '',
            limit: null,
            search: null,
            placeholder: null,
            validation: null,
            onbeforepaste: null,
            onbeforechange: null,
            onremoveitem: null,
            onlimit: null,
            onchange: null,
            onfocus: null,
            onblur: null,
            onload: null,
        }

        // Loop through though the default configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('data-placeholder', obj.options.placeholder);
        } else {
            el.removeAttribute('data-placeholder');
        }
        el.placeholder = obj.options.placeholder;

        // Update value
        obj.setValue(obj.options.value);

        // Validate items
        filter();

        // Create search box
        if (obj.options.search) {
            if (! searchContainer) {
                searchContainer = document.createElement('div');
                el.parentNode.insertBefore(searchContainer, el.nextSibling);

                // Create container
                search = Search(searchContainer, {
                    data: obj.options.search,
                    onselect: function(a,b,c) {
                        obj.selectIndex(b,c);
                    }
                });
            }
        } else {
            if (searchContainer) {
                search = null;
                searchContainer.remove();
                searchContainer = null;
            }
        }

        return obj;
    }

    /**
     * Add a new tag to the element
     * @param {(?string|Array)} value - The value of the new element
     */
    obj.add = function(value, focus) {
        if (typeof(obj.options.onbeforechange) == 'function') {
            var ret = obj.options.onbeforechange(el, obj, obj.options.value, value);
            if (ret === false) {
                return false;
            } else { 
                if (ret != null) {
                    value = ret;
                }
            }
        }

        // Make sure search is closed
        if (search) {
            search.close();
        }

        if (limit()) {
            if (typeof(obj.options.onlimit) == 'function') {
                obj.options.onlimit(obj, obj.options.limit);
            } else {
                alert(dictionary.translate('You reach the limit number of entries') + ' ' + obj.options.limit);
            }
        } else {
            // Get node
            var node = helpers.getNode();

            if (node && node.parentNode && node.parentNode.classList.contains('jtags') &&
                node.nextSibling && (! (node.nextSibling.innerText && node.nextSibling.innerText.trim()))) {
                div = node.nextSibling;
            } else {
                // Remove not used last item
                if (el.lastChild) {
                    if (! el.lastChild.innerText.trim()) {
                        el.removeChild(el.lastChild);
                    }
                }

                // Mix argument string or array
                if (! value || typeof(value) == 'string') {
                    var div = createElement(value, value, node);
                } else {
                    for (var i = 0; i <= value.length; i++) {
                        if (! limit()) {
                            if (! value[i] || typeof(value[i]) == 'string') {
                                var t = value[i] || '';
                                var v = null;
                            } else {
                                var t = value[i].text;
                                var v = value[i].value;
                            }

                            // Add element
                            var div = createElement(t, v);
                        }
                    }
                }

                // Change
                change();
            }

            // Place caret
            if (focus) {
                setFocus(div);
            }
        }
    }

    obj.setLimit = function(limit) {
        obj.options.limit = limit;
        var n = el.children.length - limit;
        while (el.children.length > limit) {
            el.removeChild(el.lastChild);
        }
    }

    // Remove a item node
    obj.remove = function(node) {
        // Remove node
        node.parentNode.removeChild(node);
        // Make sure element is not blank
        if (! el.children.length) {
            obj.add('', true);
        } else {
            change();
        }

        if (typeof(obj.options.onremoveitem) == 'function') {
            obj.options.onremoveitem(el, obj, node);
        }
    }

    /**
     * Get all tags in the element
     * @return {Array} data - All tags as an array
     */
    obj.getData = function() {
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            // Get value
            var text = el.children[i].innerText.replace("\n", "");
            // Get id
            var value = el.children[i].getAttribute('data-value');
            if (! value) {
                value = text;
            }
            // Item
            if (text || value) {
                data.push({ text: text, value: value });
            }
        }
        return data;
    }

    /**
     * Get the value of one tag. Null for all tags
     * @param {?number} index - Tag index number. Null for all tags.
     * @return {string} value - All tags separated by comma
     */
    obj.getValue = function(index) {
        var value = null;

        if (index != null) {
            // Get one individual value
            value = el.children[index].getAttribute('data-value');
            if (! value) {
                value = el.children[index].innerText.replace("\n", "");
            }
        } else {
            // Get all
            var data = [];
            for (var i = 0; i < el.children.length; i++) {
                value = el.children[i].innerText.replace("\n", "");
                if (value) {
                    data.push(obj.getValue(i));
                }
            }
            value = data.join(',');
        }

        return value;
    }

    /**
     * Set the value of the element based on a string separeted by (,|;|\r\n)
     * @param {mixed} value - A string or array object with values
     */
    obj.setValue = function(mixed) {
        if (! mixed) {
            obj.reset();
        } else {
            if (el.value != mixed) {
                if (Array.isArray(mixed)) {
                    obj.add(mixed);
                } else {
                    // Remove whitespaces
                    var text = (''+mixed).trim();
                    // Tags
                    var data = extractTags(text);
                    // Reset
                    el.innerHTML = '';
                    // Add tags to the element
                    obj.add(data);
                }
            }
        }
    }

    /**
     * Reset the data from the element
     */
    obj.reset = function() {
        // Empty class
        el.classList.add('jtags-empty');
        // Empty element
        el.innerHTML = '<div></div>';
        // Execute changes
        change();
    }

    /**
     * Verify if all tags in the element are valid
     * @return {boolean}
     */
    obj.isValid = function() {
        var test = 0;
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].classList.contains('jtags_error')) {
                test++;
            }
        }
        return test == 0 ? true : false;
    }

    /**
     * Add one element from the suggestions to the element
     * @param {object} item - Node element in the suggestions container
     */ 
    obj.selectIndex = function(text, value) {
        var node = helpers.getNode();
        if (node) {
            // Append text to the caret
            node.innerText = text;
            // Set node id
            if (value) {
                node.setAttribute('data-value', value);
            }
            // Remove any error
            node.classList.remove('jtags_error');
            if (! limit()) {
                // Add new item
                obj.add('', true);
            }
        }
    }

    /**
     * Search for suggestions
     * @param {object} node - Target node for any suggestions
     */
    obj.search = function(node) {
        // Search for
        var terms = node.innerText;
    }

    // Destroy tags element
    obj.destroy = function() {
        // Bind events
        el.removeEventListener('mouseup', tagsMouseUp);
        el.removeEventListener('keydown', tagsKeyDown);
        el.removeEventListener('keyup', tagsKeyUp);
        el.removeEventListener('paste', tagsPaste);
        el.removeEventListener('focus', tagsFocus);
        el.removeEventListener('blur', tagsBlur);

        // Remove element
        el.parentNode.removeChild(el);
    }

    var setFocus = function(node) {
        if (el.children.length) {
            var range = document.createRange();
            var sel = window.getSelection();
            if (! node) {
                var node = el.childNodes[el.childNodes.length-1];
            }
            range.setStart(node, node.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            el.scrollLeft = el.scrollWidth;
        }
    }

    var createElement = function(label, value, node) {
        var div = document.createElement('div');
        div.textContent = label ? label : '';
        if (value) {
            div.setAttribute('data-value', value);
        }

        if (node && node.parentNode.classList.contains('jtags')) {
            el.insertBefore(div, node.nextSibling);
        } else {
            el.appendChild(div);
        }

        return div;
    }

    var change = function() {
        // Value
        var value = obj.getValue();

        if (value != obj.options.value) {
            obj.options.value = value;
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, obj.options.value);
            }

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.oninput) == 'function') {
                    el.oninput({
                        type: 'input',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        filter();
    }

    /**
     * Filter tags
     */
    var filter = function() {
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].tagName === 'DIV') {
                // Create label design
                if (!obj.getValue(i)) {
                    el.children[i].classList.remove('jtags_label');
                } else {
                    el.children[i].classList.add('jtags_label');

                    // Validation in place
                    if (typeof (obj.options.validation) == 'function') {
                        if (obj.getValue(i)) {
                            if (!obj.options.validation(el.children[i], el.children[i].innerText, el.children[i].getAttribute('data-value'))) {
                                el.children[i].classList.add('jtags_error');
                            } else {
                                el.children[i].classList.remove('jtags_error');
                            }
                        } else {
                            el.children[i].classList.remove('jtags_error');
                        }
                    } else {
                        el.children[i].classList.remove('jtags_error');
                    }
                }
            }
        }

        isEmpty();
    }

    var isEmpty = function() {
        // Can't be empty
        if (! el.innerText.trim()) {
            if (! el.children.length || el.children[0].tagName === 'BR') {
                el.innerHTML = '';
                setFocus(createElement());
            }
        } else {
            el.classList.remove('jtags-empty');
        }
    }

    /**
     * Extract tags from a string
     * @param {string} text - Raw string
     * @return {Array} data - Array with extracted tags
     */
    var extractTags = function(text) {
        /** @type {Array} */
        var data = [];

        /** @type {string} */
        var word = '';

        // Remove whitespaces
        text = text.trim();

        if (text) {
            for (var i = 0; i < text.length; i++) {
                if (text[i] == ',' || text[i] == ';' || text[i] == '\n') {
                    if (word) {
                        data.push(word.trim());
                        word = '';
                    }
                } else {
                    word += text[i];
                }
            }

            if (word) {
                data.push(word);
            }
        }

        return data;
    }

    /** @type {number} */
    var anchorOffset = 0;

    /**
     * Processing event keydown on the element
     * @param e {object}
     */
    var tagsKeyDown = function(e) {
        // Anchoroffset
        anchorOffset = window.getSelection().anchorOffset;

        // Verify if is empty
        isEmpty();

        // Comma
        if (e.key === 'Tab'  || e.key === ';' || e.key === ',') {
            var n = window.getSelection().anchorOffset;
            if (n > 1) {
                if (limit()) {
                    if (typeof(obj.options.onlimit) == 'function') {
                        obj.options.onlimit(obj, obj.options.limit)
                    }
                } else {
                    obj.add('', true);
                }
            }
            e.preventDefault();
        } else if (e.key == 'Enter') {
            if (! search || ! search.isOpened()) {
                var n = window.getSelection().anchorOffset;
                if (n > 1) {
                    if (! limit()) {
                        obj.add('', true);
                    }
                }
                e.preventDefault();
            }
        } else if (e.key == 'Backspace') {
            // Back space - do not let last item to be removed
            if (el.children.length == 1 && window.getSelection().anchorOffset < 1) {
                e.preventDefault();
            }
        }

        // Search events
        if (search) {
            search.keydown(e);
        }

        // Verify if is empty
        isEmpty();
    }

    /**
     * Processing event keyup on the element
     * @param e {object}
     */
    var tagsKeyUp = function(e) {
        if (e.which == 39) {
            // Right arrow
            var n = window.getSelection().anchorOffset;
            if (n > 1 && n == anchorOffset) {
                obj.add('', true);
            }
        } else if (e.which == 13 || e.which == 38 || e.which == 40) {
            e.preventDefault();
        } else {
            if (search) {
                search.keyup(e);
            }
        }

        filter();
    }

    /**
     * Processing event paste on the element
     * @param e {object}
     */
    var tagsPaste =  function(e) {
        if (e.clipboardData || e.originalEvent.clipboardData) {
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            var text = window.clipboardData.getData('Text');
        }

        var data = extractTags(text);

        if (typeof(obj.options.onbeforepaste) == 'function') {
            var ret = obj.options.onbeforepaste(el, obj, data);
            if (ret === false) {
                e.preventDefault();
                return false;
            } else {
                if (ret) {
                    data = ret;
                }
            }
        }

        if (data.length > 1) {
            obj.add(data, true);
            e.preventDefault();
        } else if (data[0]) {
            document.execCommand('insertText', false, data[0])
            e.preventDefault();
        }
    }

    /**
     * Processing event mouseup on the element
     * @param e {object}
     */
    var tagsMouseUp = function(e) {
        if (e.target.parentNode && e.target.parentNode.classList.contains('jtags')) {
            if (e.target.classList.contains('jtags_label') || e.target.classList.contains('jtags_error')) {
                var rect = e.target.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 16) {
                    obj.remove(e.target);
                }
            }
        }

        // Set focus in the last item
        if (e.target == el) {
            setFocus();
        }
    }

    var tagsFocus = function() {
        if (! el.classList.contains('jtags-focus')) {
            if (! el.children.length || obj.getValue(el.children.length - 1)) {
                if (! limit()) {
                    createElement('');
                }
            }

            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el, obj, obj.getValue());
            }

            el.classList.add('jtags-focus');
        }
    }

    var tagsBlur = function() {
        if (el.classList.contains('jtags-focus')) {
            if (search) {
                search.close();
            }

            for (var i = 0; i < el.children.length - 1; i++) {
                // Create label design
                if (! obj.getValue(i)) {
                    el.removeChild(el.children[i]);
                }
            }

            change();

            el.classList.remove('jtags-focus');

            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el, obj, obj.getValue());
            }
        }
    }

    var init = function() {
        // Bind events
        if ('touchend' in document.documentElement === true) {
            el.addEventListener('touchend', tagsMouseUp);
        } else {
            el.addEventListener('mouseup', tagsMouseUp);
        }

        el.addEventListener('keydown', tagsKeyDown);
        el.addEventListener('keyup', tagsKeyUp);
        el.addEventListener('paste', tagsPaste);
        el.addEventListener('focus', tagsFocus);
        el.addEventListener('blur', tagsBlur);

        // Editable
        el.setAttribute('contenteditable', true);

        // Prepare container
        el.classList.add('jtags');

        // Initial options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change methods
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        el.tags = obj;
    }

    init();

    return obj;
}
;// CONCATENATED MODULE: ./src/plugins/upload.js





function Upload(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        type: 'image',
        extension: '*',
        input: false,
        minWidth: false,
        maxWidth: null,
        maxHeight: null,
        maxJpegSizeBytes: null, // For example, 350Kb would be 350000
        onchange: null,
        multiple: false,
        remoteParser: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Multiple
    if (obj.options.multiple == true) {
        el.setAttribute('data-multiple', true);
    }

    // Container
    el.content = [];

    // Upload icon
    el.classList.add('jupload');

    if (obj.options.input == true) {
        el.classList.add('input');
    }

    obj.add = function(data) {
        // Reset container for single files
        if (obj.options.multiple == false) {
            el.content = [];
            el.innerText = '';
        }

        // Append to the element
        if (obj.options.type == 'image') {
            var img = document.createElement('img');
            img.setAttribute('src', data.file);
            img.setAttribute('tabindex', -1);
            if (! el.getAttribute('name')) {
                img.className = 'jfile';
                img.content = data;
            }
            el.appendChild(img);
        } else {
            if (data.name) {
                var name = data.name;
            } else {
                var name = data.file;
            }
            var div = document.createElement('div');
            div.innerText = name || obj.options.type;
            div.classList.add('jupload-item');
            div.setAttribute('tabindex', -1);
            el.appendChild(div);
        }

        if (data.content) {
            data.file = helpers.guid();
        }

        // Push content
        el.content.push(data);

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, data);
        }
    }

    obj.addFromFile = function(file) {
        var type = file.type.split('/');
        if (type[0] == obj.options.type) {
            var readFile = new FileReader();
            readFile.addEventListener("load", function (v) {
                var data = {
                    file: v.srcElement.result,
                    extension: file.name.substr(file.name.lastIndexOf('.') + 1),
                    name: file.name,
                    size: file.size,
                    lastmodified: file.lastModified,
                    content: v.srcElement.result,
                }

                obj.add(data);
            });

            readFile.readAsDataURL(file);
        } else {
            alert(dictionary.translate('This extension is not allowed'));
        }
    }

    obj.addFromUrl = function(src) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                var type = extension[0].replace('data:','');
                if (type == obj.options.type) {
                    var data = {
                        file: src,
                        name: '',
                        extension: extension[1],
                        content: src,
                    }
                    obj.add(data);
                } else {
                    alert(obj.options.text.extensionNotAllowed);
                }
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
                // Get remove content
                ajax({
                    url: src,
                    type: 'GET',
                    dataType: 'blob',
                    success: function(data) {
                        //add(extension[0].replace('data:',''), data);
                    }
                })
            }
        }
    }

    var getDataURL = function(canvas, type) {
        var compression = 0.92;
        var lastContentLength = null;
        var content = canvas.toDataURL(type, compression);
        while (obj.options.maxJpegSizeBytes && type === 'image/jpeg' &&
               content.length > obj.options.maxJpegSizeBytes && content.length !== lastContentLength) {
            // Apply the compression
            compression *= 0.9;
            lastContentLength = content.length;
            content = canvas.toDataURL(type, compression);
        }
        return content;
    }

    var mime = obj.options.type + '/' + obj.options.extension;
    var input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('accept', mime);
    input.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    // Allow multiple files
    if (obj.options.multiple == true) {
        input.setAttribute('multiple', true);
    }

    var current = null;

    el.addEventListener("click", function(e) {
        current = null;
        if (! el.children.length || e.target === el) {
            helpers.click(input);
        } else {
            if (e.target.parentNode == el) {
                current = e.target;
            }
        }
    });

    el.addEventListener("dblclick", function(e) {
        helpers.click(input);
    });

    el.addEventListener('dragenter', function(e) {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    el.addEventListener('keydown', function(e) {
        if (current && e.which == 46) {
            var index = Array.prototype.indexOf.call(el.children, current);
            if (index >= 0) {
                el.content.splice(index, 1);
                current.remove();
                current = null;
            }
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (file.length) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else if (html) {
            if (obj.options.multiple == false) {
                el.innerText = '';
            }

            // Create temp element
            let img = [];
            utils_filter(html, img);
            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addFromUrl(img[i]);
                }
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.val = function(val) {
        if (val === undefined) {
            return el.content && el.content.length ? el.content : null;
        } else {
            // Reset
            el.innerText = '';
            el.content = [];

            if (val) {
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (typeof(val[i]) == 'string') {
                            obj.add({ file: val[i] });
                        } else {
                            obj.add(val[i]);
                        }
                    }
                } else if (typeof(val) == 'string') {
                    obj.add({ file: val });
                }
            }
        }
    }

    el.upload = el.image = obj;

    return obj;
}

// EXTERNAL MODULE: ./packages/sha512/sha512.js
var sha512 = __webpack_require__(195);
var sha512_default = /*#__PURE__*/__webpack_require__.n(sha512);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/calendar/dist/index.js
var calendar_dist = __webpack_require__(763);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/color/dist/index.js
var color_dist = __webpack_require__(541);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/contextmenu/dist/index.js
var contextmenu_dist = __webpack_require__(238);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/dropdown/dist/index.js
var dropdown_dist = __webpack_require__(692);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/modal/dist/index.js
var modal_dist = __webpack_require__(72);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/switch/dist/index.js
var switch_dist = __webpack_require__(539);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/tabs/dist/index.js
var tabs_dist = __webpack_require__(560);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/topmenu/dist/index.js
var topmenu_dist = __webpack_require__(330);
// EXTERNAL MODULE: ./node_modules/@lemonadejs/rating/dist/index.js
var rating_dist = __webpack_require__(867);
;// CONCATENATED MODULE: ./src/jsuites.js











































































var jSuites = {
    // Helpers
    ...dictionary,
    ...helpers,
    /** Current version */
    version: '6.0.1',
    /** Bind new extensions to Jsuites */
    setExtensions: function(o) {
        if (typeof(o) == 'object') {
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                jSuites[k[i]] = o[k[i]];
            }
        }
    },
    tracking: tracking,
    path: Path,
    sorting: Sorting,
    lazyLoading: LazyLoading,
    // Plugins
    ajax: ajax,
    animation: animation,
    calendar: calendar,
    color: Color,
    contextmenu: contextmenu,
    dropdown: dropdown,
    editor: editor,
    floating: floating,
    form: plugins_form,
    mask: mask,
    modal: modal,
    notification: notification,
    palette: palette,
    picker: Picker,
    progressbar: Progressbar,
    rating: Rating,
    search: Search,
    slider: Slider,
    tabs: Tabs,
    tags: Tags,
    toolbar: Toolbar,
    upload: Upload,
    validations: validations,
}

// Legacy
jSuites.image = Upload;
jSuites.image.create = function(data) {
    var img = document.createElement('img');
    img.setAttribute('src', data.file);
    img.className = 'jfile';
    img.setAttribute('tabindex', -1);
    img.content = data;

    return img;
}

jSuites.tracker = plugins_form;
jSuites.loading = animation.loading;
jSuites.sha512 = (sha512_default());


/** Core events */
const Events = function() {

    if (typeof(window['jSuitesStateControl']) === 'undefined') {
        window['jSuitesStateControl'] = [];
    } else {
        // Do nothing
        return;
    }

    const find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.component && DOMElement.component == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }

    const isOpened = function(e) {
        let state = window['jSuitesStateControl'];
        if (state && state.length > 0) {
            for (let i = 0; i < state.length; i++) {
                if (state[i] && ! find(e, state[i])) {
                    state[i].close();
                }
            }
        }
    }

    // Width of the border
    let cornerSize = 15;

    // Current element
    let element = null;

    // Controllers
    let editorAction = false;

    // Event state
    let state = {
        x: null,
        y: null,
    }

    // Tooltip element
    let tooltip = document.createElement('div')
    tooltip.classList.add('jtooltip');

    const isWebcomponent = function(e) {
        return e && (e.shadowRoot || (e.tagName && e.tagName.includes('-')));
    }

    const getElement = function(e) {
        let d;
        let element;
        // Which component I am clicking
        let path = e.path || (e.composedPath && e.composedPath());

        // If path available get the first element in the chain
        if (path) {
            element = path[0];
            // Adjustment sales force
            if (element && isWebcomponent(element) && ! element.shadowRoot && e.toElement) {
                element = e.toElement;
            }
        } else {
            // Try to guess using the coordinates
            if (e.target && isWebcomponent(e.target)) {
                d = e.target.shadowRoot;
            } else {
                d = document;
            }
            // Get the first target element
            element = d.elementFromPoint(x, y);
        }
        return element;
    }

    // Events
    const mouseDown = function(e) {
        // Verify current components tracking
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
        } else {
            var x = e.clientX;
            var y = e.clientY;
        }

        let element = getElement(e);
        // Editable
        let editable = element && element.tagName === 'DIV' && element.getAttribute('contentEditable');
        // Check if this is the floating
        let item = jSuites.findElement(element, 'jpanel');
        // Jfloating found
        if (item && ! item.classList.contains("readonly") && ! editable) {
            // Keep the tracking information
            let rect = item.getBoundingClientRect();
            let angle = 0;
            if (item.style.rotate) {
                // Extract the angle value from the match and convert it to a number
                angle = parseFloat(item.style.rotate);
            }
            let action = 'move';
            if (element.getAttribute('data-action')) {
                action = element.getAttribute('data-action');
            } else {
                if (item.style.cursor) {
                    action = 'resize';
                } else {
                    item.style.cursor = 'move';
                }
            }

            // Action
            editorAction = {
                action: action,
                a: angle,
                e: item,
                x: x,
                y: y,
                l: rect.left,
                t: rect.top,
                b: rect.bottom,
                r: rect.right,
                w: rect.width,
                h: rect.height,
                d: item.style.cursor,
                actioned: false,
            }
            // Make sure width and height styling is OK
            if (! item.style.width) {
                item.style.width = rect.width + 'px';
            }
            if (! item.style.height) {
                item.style.height = rect.height + 'px';
            }
        } else {
            // No floating action found
            editorAction = false;
        }

        isOpened(element);

        focus(e);
    }

    const calculateAngle = function(x1, y1, x2, y2, x3, y3) {
        // Calculate dx and dy for the first line
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        // Calculate dx and dy for the second line
        const dx2 = x3 - x1;
        const dy2 = y3 - y1;
        // Calculate the angle for the first line
        let angle1 = Math.atan2(dy1, dx1);
        // Calculate the angle for the second line
        let angle2 = Math.atan2(dy2, dx2);
        // Calculate the angle difference in radians
        let angleDifference = angle2 - angle1;
        // Convert the angle difference to degrees
        angleDifference = angleDifference * (180 / Math.PI);
        // Normalize the angle difference to be within [0, 360) degrees
        if (angleDifference < 0) {
            angleDifference += 360;
        }
        return angleDifference;
    }

    const mouseUp = function(e) {
        if (editorAction && editorAction.e) {
            if (typeof(editorAction.e.refresh) == 'function' && state.actioned) {
                editorAction.e.refresh();
            }
            editorAction.e.style.cursor = '';
        }

        // Reset
        state = {
            x: null,
            y: null,
        }

        editorAction = false;
    }

    const mouseMove = function(e) {
        if (editorAction) {
            let x = e.clientX || e.pageX;
            let y = e.clientY || e.pageY;

            if (state.x == null && state.y == null) {
                state.x = x;
                state.y = y;
            }

            // Action on going
            if (editorAction.action === 'move') {
                var dx = x - state.x;
                var dy = y - state.y;
                var top = editorAction.e.offsetTop + dy;
                var left = editorAction.e.offsetLeft + dx;

                // Update position
                editorAction.e.style.top = top + 'px';
                editorAction.e.style.left = left + 'px';

                // Update element
                if (typeof (editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('position', top, left);
                }
            } else if (editorAction.action === 'rotate') {
                let ox = editorAction.l+editorAction.w/2;
                let oy = editorAction.t+editorAction.h/2;
                let angle = calculateAngle(ox, oy, editorAction.x, editorAction.y, x, y);
                angle = angle + editorAction.a % 360;
                angle = Math.round(angle / 2) * 2;
                editorAction.e.style.rotate = `${angle}deg`;
                // Update element
                if (typeof (editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('rotate', angle);
                }
            } else if (editorAction.action === 'resize') {
                let top = null;
                let left = null;
                let width = null;
                let height = null;

                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'se-resize') {
                    width = editorAction.e.offsetWidth + (x - state.x);

                    if (e.shiftKey) {
                        height = editorAction.e.offsetHeight + (x - state.x) * (editorAction.e.offsetHeight / editorAction.e.offsetWidth);
                    }
                } else if (editorAction.d === 'w-resize' || editorAction.d == 'nw-resize'|| editorAction.d == 'sw-resize') {
                    left = editorAction.e.offsetLeft + (x - state.x);
                    width = editorAction.e.offsetLeft + editorAction.e.offsetWidth - left;

                    if (e.shiftKey) {
                        height = editorAction.e.offsetHeight - (x - state.x) * (editorAction.e.offsetHeight / editorAction.e.offsetWidth);
                    }
                }

                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                    if (! height) {
                        height = editorAction.e.offsetHeight + (y - state.y);
                    }
                } else if (editorAction.d === 'n-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'nw-resize') {
                    top = editorAction.e.offsetTop + (y - state.y);
                    height = editorAction.e.offsetTop + editorAction.e.offsetHeight - top;
                }

                if (top) {
                    editorAction.e.style.top = top + 'px';
                }
                if (left) {
                    editorAction.e.style.left = left + 'px';
                }
                if (width) {
                    editorAction.e.style.width = width + 'px';
                }
                if (height) {
                    editorAction.e.style.height = height + 'px';
                }

                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('dimensions', width, height);
                }
            }

            state.x = x;
            state.y = y;
        } else {
            let element = getElement(e);
            // Resize action
            let item = jSuites.findElement(element, 'jpanel');
            // Found eligible component
            if (item) {
                // Resizing action
                let controls = item.classList.contains('jpanel-controls');
                if (controls) {
                    let position = element.getAttribute('data-position');
                    if (position) {
                        item.style.cursor = position;
                    } else {
                        item.style.cursor = '';
                    }
                } else if (item.getAttribute('tabindex')) {
                    let rect = item.getBoundingClientRect();
                    //console.log(e.clientY - rect.top, rect.width - (e.clientX - rect.left), cornerSize)
                    if (e.clientY - rect.top < cornerSize) {
                        if (rect.width - (e.clientX - rect.left) < cornerSize) {
                            item.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < cornerSize) {
                            item.style.cursor = 'nw-resize';
                        } else {
                            item.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < cornerSize) {
                        if (rect.width - (e.clientX - rect.left) < cornerSize) {
                            item.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < cornerSize) {
                            item.style.cursor = 'sw-resize';
                        } else {
                            item.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'w-resize';
                    } else {
                        item.style.cursor = '';
                    }
                }
            }
        }
    }

    let position = ['n','ne','e','se','s','sw','w','nw','rotate'];
    position.forEach(function(v, k) {
        position[k] = document.createElement('div');
        position[k].classList.add('jpanel-action');
        if (v === 'rotate') {
            position[k].setAttribute('data-action', 'rotate');
        } else {
            position[k].setAttribute('data-action', 'resize');
            position[k].setAttribute('data-position', v + '-resize');
        }
    });

    let currentElement;

    const focus = function(e) {
        let element = getElement(e);
        // Check if this is the floating
        let item = jSuites.findElement(element, 'jpanel');
        if (item && ! item.classList.contains("readonly") && item.classList.contains('jpanel-controls')) {
            item.append(...position);

            if (! item.classList.contains('jpanel-rotate')) {
                position[position.length-1].remove();
            }

            currentElement = item;
        } else {
            blur(e);
        }
    }

    const blur = function(e) {
        if (currentElement) {
            position.forEach(function(v) {
                v.remove();
            });
            currentElement = null;
        }
    }

    const mouseOver = function(e) {
        let element = getElement(e);
        var message = element.getAttribute('data-tooltip');
        if (message) {
            // Instructions
            tooltip.innerText = message;

            // Position
            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';
            document.body.appendChild(tooltip);
        } else if (tooltip.innerText) {
            tooltip.innerText = '';
            document.body.removeChild(tooltip);
        }
    }

    const contextMenu = function(e) {
        var item = document.activeElement;
        if (item && typeof(item.contextmenu) == 'function') {
            // Create edition
            item.contextmenu(e);

            e.preventDefault();
            e.stopImmediatePropagation();
        } else {
            // Search for possible context menus
            item = jSuites.findElement(e.target, function(o) {
                return o.tagName && o.getAttribute('aria-contextmenu-id');
            });

            if (item) {
                var o = document.querySelector('#' + item);
                if (! o) {
                    console.error('JSUITES: contextmenu id not found: ' + item);
                } else {
                    o.contextmenu.open(e);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }
    }

    const keyDown = function(e) {
        let item = document.activeElement;
        if (item) {
            if (e.key === "Delete" && typeof(item.delete) == 'function') {
                item.delete();
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }

        let state = window['jSuitesStateControl'];
        if (state && state.length > 0) {
            item = state[state.length - 1];
            if (item) {
                if (e.key === "Escape" && typeof(item.isOpened) == 'function' && typeof(item.close) == 'function') {
                    if (item.isOpened()) {
                        item.close();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            }
        }
    }

    const input = function(e) {
        if (e.target.getAttribute('data-mask') || e.target.mask) {
            jSuites.mask.oninput(e);
        }
    }

    document.addEventListener('focusin', focus);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', mouseOver);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('contextmenu', contextMenu);
    document.addEventListener('input', input);
}

if (typeof(document) !== "undefined") {
    Events();
}

/* harmony default export */ var jsuites = (jSuites);
}();
jSuites = __webpack_exports__["default"];
/******/ })()
;

    return jSuites;
})));