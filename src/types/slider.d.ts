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

export type Slider = (el: HTMLElement, options: Options) => {
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
