import HelpersDate from './helpers.date';

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
    for (i = 0; i < HelpersDate.weekdays.length; i++) {
        t =  translate(HelpersDate.weekdays[i]);
        if (HelpersDate.weekdays[i]) {
            HelpersDate.weekdays[i] = t;
            HelpersDate.weekdaysShort[i] = t.substr(0,3);
        }
    }
    for (i = 0; i < HelpersDate.months.length; i++) {
        t = translate(HelpersDate.months[i]);
        if (t) {
            HelpersDate.months[i] = t;
            HelpersDate.monthsShort[i] = t.substr(0,3);
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