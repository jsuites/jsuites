interface Options {
    // Render type: [ default | year-month-picker ]. Default: default
    type?: 'default' | 'year-month-picker';
    // Range restriction [dateStart, dateEnd]
    validRange?: [string|null, string|null];
    // Starting weekday - 0 for sunday, 6 for saturday
    startingDay?: number,
    // Date format. Default 'DD/MM/YYYY'
    format?: string,
    // Allow keyboard date entry
    readonly?: boolean,
    // Today is default
    today?: boolean,
    // Show timepicker
    time?: boolean,
    // Show the reset button
    resetButton?: boolean,
    // Placeholder
    placeholder?: string,
    // Translations can be done here
    months?: string[],
    monthsFull?: string[],
    weekdays?: string[],
    textDone?: string[],
    textReset?: string[],
    textUpdate?: string[],
    // Start with the value
    value?: string,
    // Fullscreen (this is automatic set for screen size < 800)
    fullscreen: boolean,
    // Create the calendar closed as default
    opened: boolean,
    // Events
    onopen: () => void,
    onclose: () => void,
    onchange: () => void,
    onupdate: () => void,
    // Internal mode controller
    mode: null,
    position: null,
    // Data type
    dataType: null,
    // Controls
    controls: boolean,
    /** Auto select confirms the current date as the new value onblur. Default: true */
    autoSelect: boolean;
}

/** Toast Plugin */
export type Calendar = (el: HTMLElement, options: Options) => {
    /** Close the calendar picker */
    close: () => void;
    /** Internal date value */
    date: number[];
    /** Convert a formatted string to a valid raw date */
    fromFormatted: string;
    /** Show the calendar in day picker mode */
    getDays: () => void;
    /** Show the calendar in month picker mode */
    getMonths: () => void;
    /** Show the calendar in year picker mode */
    getYears: () => void;
    /** Get the current date. Get the internal value or the real component value */
    getValue: (internal?: boolean) => string;
    /** Advance to the next month, year or group of years depending on the current view mode */
    next: () => void;
    /** Previous month, year or group of years depending on the current view mode */
    prev: () => void;
    /** Open the calendar picker */
    open: () => void;
    /** Initial settings */
    options: Options;
    /** Reset date */
    reset: () => void;
    /** Change the configurations */
    setOptions: () => void;
    /** Change the date for today */
    setToday: () => void;
    /** Change the value for a given date */
    setValue: (newDate: string) => void;
    /** Type calendar */
    type: 'calendar';
    /** Alias for setValue */
    update: () => void;
    /** Auto select confirms the current date as the new value onblur. Default: true */
    autoSelect: boolean;
}
