interface Snippet {
    /** Image URL */
    image: string | string[];
    /** Title */
    title: string;
    /** Description */
    description: string;
    /** Domain */
    host: string;
    /** Link */
    url: string;
}

interface Options {
    /** Load data from a remove location */
    url?: string;
    /** Initial HTML string for the editor */
    value?: string;
    /** Snippet object */
    snippet?: Snippet;
    /** Show toolbar */
    toolbar?: boolean;
    /** Show the toolbar in the top of the editor. Default: false */
    toolbarOnTop?: boolean;
    /** Website URL parser is to read websites and images from cross domain */
    remoteParser?: string;
    /** Editor place holder */
    placeholder?: string;
    /** Filter the paste. Default true. */
    filterPaste?: boolean;
    /** Accept images or files to be dropped in the editor area. Default: true */
    dropZone?: boolean;
    /** Transform dropped images as snippet. Default: false */
    dropAsSnippet?: boolean;
    /** Accept images when the dropzone when active. Default: true */
    acceptImages?: boolean;
    /** Accept files when the dropzone when active. Default: false */
    acceptFiles?: boolean;
    /** Max file size in bytes. Default: 5000000 bytes */
    maxFileSize?: number | null;
    /** Allow image resizing. Default: true */
    allowImageResize?: boolean;
    /** Max height editor */
    maxHeight?: number | null;
    /** Default editor height */
    height?: number | null;
    /** Focus in the editor when initiated. Default: false */
    focus?: boolean;
    /** Onclick in the editor */
    onclick?: (el: HTMLElement, obj: Editor, e: MouseEvent) => void;
    /** When the editor is focused */
    onfocus?: (el: HTMLElement, obj: Editor, e: MouseEvent) => void;
    /** When blur */
    onblur?: (el: HTMLElement, obj: Editor, e: MouseEvent) => void;
    /** When the editor is ready */
    onload?: (el: HTMLElement, obj: Editor, editor: HTMLElement) => void;
    /** When key up in the editor */
    onkeyup?: (el: HTMLElement, obj: Editor, e: MouseEvent) => void;
    /** When key down in the editor */
    onkeydown?: (el: HTMLElement, obj: Editor, e: MouseEvent) => void;
    /** When the value of the editor changes */
    onchange?: (el: HTMLElement, obj: Editor, e: MouseEvent) => void;
    /** Editor extensions */
    extensions?: Record<string, Function>;
}

export type Editor = (el: HTMLElement, options: Options) => {
    /** Dropped files or loaded via the input file */
    addFiles: (files: FileList[]) => void;
    /** Methods to add new images to the editor */
    addImage: (src: string | FileList[], asSnippet?: boolean) => void;
    /** Add a new PDF as a attachment */
    addPdf: (base64: string) => void;
    /** Add a snippet board in the editor */
    appendSnippet: (data: Snippet) => void;
    /** Destroy */
    destroy: () => void;
    /** Editor HTML container */
    el: HTMLElement;
    /** HTML input upload element */
    file: HTMLInputElement;
    /** Get the data from the editor */
    getData: (asJson?: boolean) => string | object;
    /** Get the files loaded to the editor */
    getFiles: () => string[];
    /** Get the innerText from the editor */
    getText: () => string;
    /** Editor configuration */
    options: Options;
    /** Reset the editor value */
    reset: () => void;
    /** Load a file from a local computer to the editor */
    upload: () => void;
    /** Internal type */
    type: 'editor';
}
