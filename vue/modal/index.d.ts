/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;
declare namespace Component {
    interface Options {
        /** Load the content of the modal from a remote URL */
        url?: string;
        /** When the modal is opened */
        onopen?: (el: HTMLElement, instance: Component.Instance) => void;
        /** When the modal is closed */
        onclose?: (el: HTMLElement, instance: Component.Instance) => void;
        /** When the modal is ready */
        onload?: (instance: Component.Instance) => void;
        /** Create a modal with state closed. Default: false */
        closed?: boolean;
        /** Modal width */
        width?: number;
        /** Modal height */
        height?: number;
        /** Modal title */
        title?: string;
        /** Modal padding */
        padding?: number;
        /** Show backdrop. Default: true */
        backdrop?: boolean;
        /** Show title icon. Material icon keyword */
        icon?: string;
    }

    interface Instance {
        /** Open the modal */
        open: () => void;
        /** Reset the modal position to the center */
        resetPosition: () => void;
        /** Modal is opened */
        isOpen: () => boolean;
        /** Close the modal */
        close: () => void;
    }
}


interface Modal {
    (): any
    [key: string]: any
}

declare function Modal<Modal>(props: Component.Options): any;
export default Modal;
