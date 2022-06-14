jSuites.validations = (function() {
    /**
     * Options: Object,
     * Properties:
     * Constraint,
     * Reference,
     * Value
     */

    var isNumeric = function(num) {
        return !isNaN(num) && num !== null && num !== '';
    }

    var numberCriterias = {
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

    var dateCriterias = {
        'valid date': function() {
            return true;
        },
        '=': function(value, range) {
            return value === range[0];
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

    var textCriterias = {
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
    var component = function(value, options) {
        if (typeof(component[options.type]) === 'function') {
            if (options.allowBlank && value === '') {
                return true;
            }

            return component[options.type](value, options);
        }
        return null;
    }
    
    component.url = function() {
        var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);
        return pattern.test(data) ? true : false;
    }

    component.email = function(data) {
        var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        return data && pattern.test(data) ? true : false; 
    }
    
    component.required = function(data) {
        return data.trim() ? true : false;
    }

    component.exist = function(data, options) {
        return !!data.toString();
    }

    component['not exist'] = function(data, options) {
        return !data.toString();
    }

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

       var values = options.value.map(function(num) {
          return parseFloat(num);
       })

       return numberCriterias[options.criteria](data, values);
   };

    component.login = function(data) {
        var pattern = new RegExp(/^[a-zA-Z0-9\_\-\.\s+]+$/);
        return data && pattern.test(data) ? true : false;
    }

    component.list = function(data, options) {
        var dataType = typeof data;
        if (dataType !== 'string' && dataType !== 'number') {
            return false;
        }
        if (typeof(options.value[0]) === 'string') {
            var list = options.value[0].split(',');
        } else {
            var list = options.value[0];
        }

        var validOption = list.findIndex(function name(item) {
            return item == data;
        });

        return validOption > -1;
    }

    component.date = function(data, options) {
        if (new Date(data) == 'Invalid Date') {
            return false;
        }

        if (!options || !options.criteria) {
            return true;
        }

        if (!dateCriterias[options.criteria]) {
            return false;
        }

        var values = options.value.map(function(date) {
            return new Date(date).getTime();
        });

        return dateCriterias[options.criteria](new Date(data).getTime(), values);
    }

    component.text = function(data, options) {
        if (typeof data !== 'string') {
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
})();