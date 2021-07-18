jSuites.validations = function(value, options) {
    if (typeof(jSuites.validations[options.type]) === 'function') {
        return jSuites.validations[options.type](value, options);
    }
    return null;
};

// Legacy
jSuites.validations.email = function(data) {
    var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return data && pattern.test(data) ? true : false; 
}

jSuites.validations.required = function(data) {
    return data.trim() ? true : false;
}

jSuites.validations.number = function(data) {
    return jSuites.isNumber(data);
}

jSuites.validations.login = function(data) {
    var pattern = new RegExp(/^[a-zA-Z0-9\_\-\.\s+]+$/);
    return data && pattern.test(data) ? true : false;
}

/**
 * Options: Object,
 * Properties: 
 * Constraint,
 * Reference,
 * Value
 */

var valueComparisons = function(data, options) {
    if (options.constraint === '=') {
        return data === options.reference;
    }
    if (options.constraint === '<') {
        return data < options.reference;
    }
    if (options.constraint === '<=') {
        return data <= options.reference;
    }
    if (options.constraint === '>') {
        return data > options.reference;
    }
    if (options.constraint === '>=') {
        return data >= options.reference;
    }
    if (options.constraint === 'between') {
        return data >= options.reference[0] && data <= options.reference[1];
    }
    if (options.constraint === 'not between') {
        return data < options.reference[0] || data > options.reference[1];
    }

    return null;
}

jSuites.validations.number = function(data, options) {
    if (!jSuites.isNumeric(data)) {
        return false;
    }

    if (options === undefined || options.constraint === undefined) {
        return true;
    }

    return valueComparisons(data, options);
}

jSuites.validations.date = function(data, options) {
    if (new Date(data) == 'Invalid Date') {
        return false;
    }

    if (options === undefined || options.constraint === undefined) {
        return true;
    } else if (typeof(options) === 'object') {
        data = new Date(data).getTime();

        if (Array.isArray(options.reference)) {
            options.reference = options.reference.map(function(reference) {
                return new Date(reference).getTime();
            });
        } else {
            options.reference = new Date(options.reference).getTime();
        }

        return valueComparisons(data, options);
    }
    return null;
}

jSuites.validations.itemList = function(data, options) {
    return options.reference.some(function(reference) {
        return reference == data;
    });
}

jSuites.validations.text = function(data, options) {
    if (typeof data !== 'string') {
        return false;
    }

    if (options === undefined || options.constraint === undefined) {
        return true;
    }
    if (options.constraint === '=') {
        return data === options.reference;
    }
    if (options.constraint === 'contains') {
        return data.includes(options.reference);
    }
    if (options.constraint === 'not contain') {
        return !data.includes(options.reference);
    }
    if (options.constraint === 'email') {
        return jSuites.validations.email(data);
    }
    if (options.constraint === 'url') {
        var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);
        return pattern.test(data) ? true : false;
    }
    return null;
}

jSuites.validations.constraints = function() {
}