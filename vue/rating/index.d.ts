/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

declare namespace Component {
    interface Options {
        /** Number of stars */
        number?: 5,
        /** Current value */
        value?: number,
        /** Example by default. [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ] */
        tooltip?: string[],
        /** When the value changes */
        onchange?: () => void,
    }

    interface Instance {
        /** Change the value */
        setValue: (index: number) => void;
        /** Get the current value */
        getValue: () => void;
        /** Current options */
        options: Component.Options;
    }
}

interface Rating {
    (): any
    [key: string]: any
}

declare function Rating<Rating>(props: Component.Options): any;
export default Rating;
