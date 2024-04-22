import HelpersDate from '../utils/helpers.date';

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
            return component[options.type](value, options);
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
            list = options.value[0].split(',');
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
            data = HelpersDate.numToDate(data);
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
        data = data.toString();

        return component.number(data.length, options);
    }

    return component;
}

export default Validations();