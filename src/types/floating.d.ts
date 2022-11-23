interface Options {
    /** Floating type. Default: 'big' */
    type: string | null,
    /** Floating window title. Default 'Untitled' */
    title: string,
    /** Width. Default: 510 */
    width: number,
    /** Height. Default: 472 */
    height: number,
}

export type Floating = (el: HTMLElement, options: Options) => {
    /** Dropped files or loaded via the input file */
    state: object;
    /** Toggle the state of the floating modal */
    setState: () => void;
    /** Close the floating modal */
    close: () => void;
    /** Update its position style */
    updatePosition: () => void;
    /** Init the floating modal */
    init: () => void;
}
