/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

declare namespace Component {
    interface Options {
        /** Data items */
        data?: Record<number, string>;
        /** Method for rendering the items */
        render?: (label: string, item: object) => string;
        /** Event when value is changed */
        onchange?: (el: HTMLElement, instance: Picker, reservedValue: string, value: string, index: number, e: MouseEvent) => void;
        /** Event when value is changed */
        onopen?: (el: HTMLElement, instance: Picker) => void;
        /** Event when value is changed */
        onclose?: (el: HTMLElement, instance: Picker) => void;
        /** Event when value is changed */
        onload?:  (el: HTMLElement, instance: Picker) => void;
        /** Default width */
        width?: number;
        /** Show the header. Default: true */
        header?: boolean;
        /** Align right. Default: false */
        right?: boolean;
        /** Open picker from bottom to top direction. Default: false */
        bottom?: boolean;
        /** Replace the header value by an material icon keyword. Default: false */
        content?: boolean;
        /** Number elements per line. Default: null */
        columns?: number;
        /** Order elements in a grid. Default: null */
        grid?: number;
        /** Default height */
        height?: null;
    }

    interface Instance {
        /** Get the current selected value */
        getValue: () => void;
        /** Set the current value for the component */
        setValue: (v: number, event: MouseEvent | boolean) => void;
        /** Internal method. Get the label */
        getLabel: (v, item) => void;
        /** Internal method. Set the label */
        setLabel: (v) => void;
        /** Open the picker */
        open: () => void;
        /** Close the picker */
        close: () => void;
    }
}


interface Picker {
    (): any
    [key: string]: any
}

declare function Picker<Picker>(props: Component.Options): any;
export default Picker;
