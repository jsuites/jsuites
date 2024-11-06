export type Loading = {
    /** Displays the loading animation for the specified duration in seconds */
    show: (timeout: Number) => void;
    /** Hides the loading animation immediately */
    hide: () => void;
}

export type Animation = {
    /** Provides access to loading animation controls */
    loading: Loading;
    /** Slides the specified element to the left */
    slideLeft: (element: HTMLElement, direction: boolean, done: Function) => void;
    /** Slides the specified element to the right */
    slideRight: (element: HTMLElement, direction: boolean, done: Function) => void;
    /** Slides the specified element upwards */
    slideTop: (element: HTMLElement, direction: boolean, done: Function) => void;
    /** Slides the specified element downwards. */
    slideBottom: (element: HTMLElement, direction: boolean, done: Function) => void;
    /** Gradually fades in the specified element */
    fadeIn: (element: HTMLElement, done: Function) => void;
    /** Gradually fades out the specified element */
    fadeOut: (element: HTMLElement, done: Function) => void;
}
