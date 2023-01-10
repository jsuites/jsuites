import NumberFormat = Intl.NumberFormat;

interface Return {
    // Element
    input: HTMLElement,
    // Current value
    value: any,
    // Mask options
    options: object,
    // New values for each token found
    values: string[] | number[],
    // Token position
    index: number,
    // Character position
    position: number,
    // Date raw values
    date: [number,number,number,number,number,number],
    // Raw number for the numeric values
    number: number,
}

interface Options {
    /** Mask */
    mask?: string;
    options?: Options;
    value?: any;
    locale?: NumberFormat;
    type?: 'currency' | 'percentage' | 'numeric' | 'general'
}

export type Mask = (value: any, config: Options, returnObject?: boolean) => {
    /** Get the type from a value */
    getType: (str: string) => string;
    /** Extract the tokens from a mask. This is an internal method */
    prepare: (str: string, object: object) => void;
    /** Apply the mask into an element */
    apply: (e: MouseEvent) => void;
    /** Run mask */
    run: (value, mask, decimal) => void;
    /** Extract a raw information from a formatted value */
    extract: (v, options, returnObject) => void;
    /** Render the mask from a value */
    render: (value, options, fullMask) => void;
    /** Set the mask into a Element */
    set: (e, m) => void;
    /** Extract the date from a formatted string */
    extractDateFromString: (date: string, format?: string) => string;
    /** Convert a date into a formatted date */
    getDateString: (value, options) => string;
}
