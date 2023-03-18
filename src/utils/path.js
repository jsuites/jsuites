export default function Path(str, val, remove) {
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
                // Property does not exists
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