interface Options {
    /** Load the content of the modal from a remote URL */
    url?: string;
    /** When the modal is opened */
    onopen?: (el: HTMLElement, instance: Modal) => void;
    /** When the modal is closed */
    onclose?: (el: HTMLElement, instance: Modal) => void;
    /** When the modal is ready */
    onload?: (instance: Modal) => void;
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

export type Modal = (el: HTMLElement, options: Options) => {
    /** Open the modal */
    open: () => void;
    /** Reset the modal position to the center */
    resetPosition: () => void;
    /** Modal is opened */
    isOpen: () => boolean;
    /** Close the modal */
    close: () => void;
}
