/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

declare namespace Component {
    interface Options {
        /** Color picker input place holder */
        placeholder: string;
        /** Initial value */
        value: string;
        /** When the color picker is opened */
        onopen: (el: HTMLElement, instance: Color) => void;
        /** When the color picker is closed */
        onclose: (el: HTMLElement, instance: Color) => void;
        /** When the color is changed */
        onchange: (el: HTMLElement, value: string, instance: Color) => void;
        /** Automatically close the color picker when a new color is clicked */
        closeOnChange: boolean;
        /** Color palette options */
        palette: string[];
        /** Fixed or normal */
        position: 'absolute' | null;
        /** Button label */
        doneLabel: string;
        /** Button label */
        resetLabel: string;
        /** Fullscreen mode */
        fullscreen: boolean;
        /** Start the picker opened */
        opened: boolean;
    }

    interface Instance {
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
        /** Get the current date */
        getValue: () => string;
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
        setOptions
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
}


interface Color {
    (): any
    [key: string]: any
}

declare function Color<Color>(props: Component.Options): any;
export default Color;
