import Helpers from './helpers';

// Update dictionary
var setDictionary = function(d) {
    if (! document.dictionary) {
        document.dictionary = {}
    }
    // Replace the key into the dictionary and append the new ones
    var t = null;
    var i = null;
    var k = Object.keys(d);
    for (i = 0; i < k.length; i++) {
        document.dictionary[k[i]] = d[k[i]];
    }

    // Translations
    for (i = 0; i < Helpers.weekdays.length; i++) {
        t =  translate(Helpers.weekdays[i]);
        if (Helpers.weekdays[i]) {
            Helpers.weekdays[i] = t;
            Helpers.weekdaysShort[i] = t.substr(0,3);
        }
    }
    for (i = 0; i < Helpers.months.length; i++) {
        t = translate(Helpers.months[i]);
        if (t) {
            Helpers.months[i] = t;
            Helpers.monthsShort[i] = t.substr(0,3);
        }
    }
}

// Translate
var translate = function(t) {
    if (typeof(document) !== "undefined" && document.dictionary) {
        return document.dictionary[t] || t;
    } else {
        return t;
    }
}


export default { setDictionary, translate };