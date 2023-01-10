interface Options {
    /** Notification popup icon to be define inside google material icon options */
    icon?: string;
    /** Notification pop application name. Default: 'Notification' */
    name?: string;
    /** Notification date. */
    date?: string;
    /** The notification is an error. It will return a red popup */
    error?: boolean;
    /** Notification pop title. Default: 'Notification' */
    title?: string;
    /** notification message */
    message: string;
    /** Automatically timeout to hide the message */
    timeout: 4000;
    /** Auto hide the message */
    autoHide: true;
    /** Button to close the message */
    closeable: true;
}

/** Toast Plugin */
export type Notification = (options: Options) => {
    show: () => void;
    hide: () => void;
    options: Options;
}
