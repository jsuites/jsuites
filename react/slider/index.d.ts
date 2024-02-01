/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

declare namespace Component {
    interface Options {
        /** Items */
        items: [];
        /** Height */
        height: number
        /** Height */
        width: number
        /** Height */
        grid: boolean
        /** Height */
        onopen: (el: HTMLElement) => void
        /** Height */
        onclose: (el: HTMLElement) => void
    }

    interface Instance {
        /** Update the number of photos label */
        updateCounter: (index) => void;
        /** Open photo preview with a photo define in the arguments */
        show: (target) => void;
        /** Open photo preview */
        open: () => void;
        /** Close the photo preview */
        close: () => void;
        /** Reset photos */
        reset: () => void;
        /** Next photo */
        next: () => void;
        /** Previous photo */
        prev: () => void;
    }
}

interface Slider {
    (): any
    [key: string]: any
}

declare function Slider<Slider>(props: Component.Options): any;
export default Slider;
