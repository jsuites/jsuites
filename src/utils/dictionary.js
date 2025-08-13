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


export default { setDictionary, translate };