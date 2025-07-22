const isValidPathObj = function(o) {
    return typeof o === 'object' || typeof o === 'function';
}

export default function Path(pathString, value, remove) {
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