interface Options {
    /** Point the form to a backend server */
    url: null,
    /** Default message if the user tries to leave the form without saving. Default: 'Are you sure? There are unsaved information in your form' */
    message: string,
    /** Ignore changes in the form */
    ignore: boolean,
    /** Internal hash controller */
    currentHash: null,
    /** Submit button */
    submitButton: HTMLElement,
    /** Validations definitions */
    validations: Record<string, Function>,
    /** Before loading new data to the form */
    onbeforeload: (el: HTMLElement, data: object) => void,
    /** After loading data to the form */
    onload: (el: HTMLElement, data: object) => void,
    /** Before sending data to the backend to save. Return false to cancel the submission */
    onbeforesave: (el: HTMLElement, data: object) => void | boolean,
    /** After save new data to the server */
    onsave: (el: HTMLElement, data: object) => void,
    /** Before remove an item */
    onbeforeremove: (el: HTMLElement, obj: Form) => void | boolean,
    /** After remove an item */
    onremove: (el: HTMLElement, obj: Form, result: object) => void,
    /** Before loading new data to the form */
    onerror: (el: HTMLElement, message: string) => void
}

export type Form = (el: HTMLElement, options: Options) => {
    /** Change the form backend server */
    setUrl: () => void;
    /** Load data from he server to the form */
    load: () => void;
    /** Save the data from the form to the server */
    save: () => void;
    /** Submit a remove Restful request to the server */
    remove: () => void;
    /** Valid a single HTML element */
    validateElement: (element: HTMLElement) => boolean;
    /** Reset the form */
    reset: () => void;
    /** Validate the form */
    validate: () => string | boolean;
    /** Get the error from the form */
    getError: () => string;
    /** Internal tracking control */
    setHash: (str: string) => void;
    /** Internal tracking control */
    getHash: () => string;
    /** Form has changed */
    isChanged: () => boolean;
    /** Reset the form tracking */
    resetTracker: () => void;
    /** Ignore changes in the form */
    setIgnore: (flag: boolean) => void;
}
