export default function path(str, val) {
    str = str.split('.');
    if (str.length) {
        var o = this;
        var p = null;
        while (str.length > 1) {
            // Get the property
            p = str.shift();
            // Check if the property exists
            if (o.hasOwnProperty(p)) {
                o = o[p];
            } else {
                // Property does not exists
                if (val === undefined) {
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
        if (val !== undefined) {
            o[p] = val;
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