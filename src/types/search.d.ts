interface Options {
    data: string[] | null;
    input: HTMLElement | null;
    searchByNode: boolean | null;
    onselect: ((obj: Search, text: string, value: string, id: string, image: string) => void) | null;
    forceSelect: boolean;
    onbeforesearch: ((obj: Search, terms: string) => void) | null;
}

export type Search = (el: HTMLElement, options: Options) => {
    /** Select the item by index */
    selectIndex: (item: number) => void;
    /** Open the picker */
    open: () => void;
    /** Close the picker */
    close: () => void;
    /** Picker is opened */
    isOpened: () => boolean;
    /** Keydown event */
    keydown: (e: MouseEvent) => void;
    /** Keyup event */
    keyup: (e: MouseEvent) => void;
}
