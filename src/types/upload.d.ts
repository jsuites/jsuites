interface File {
    /** File object */
    file: object;
    /** Extension */
    extension: string;
    /** Filename */
    name: string;
    /** File size */
    size: number;
    /** File last modification */
    lastmodified: string;
    /** Alias for the file object */
    content: object;
}
interface Options {
    /** Upload type. Default: image */
    type?: 'image' | string,
    /** Excepted extensions. Default: '*' for all */
    extension?: string,
    /** Show input */
    input?: boolean,
    /** Min width */
    minWidth?: number,
    /** Max width */
    maxWidth?: null,
    /** Max height */
    maxHeight?: null,
    /** Max size */
    maxJpegSizeBytes?: null, // For example, 350Kb would be 350000
    /** Onchange event */
    onchange?: null,
    /** Accept multiple files */
    multiple?: false,
    /** URL for the remove parser */
    remoteParser?: null,
}

export type Upload = (el: HTMLElement, options: Options) => {
    /** Add files to the component */
    add: (data: File[]) => void;
    /** Add a new file */
    addFromFile: (file) => void;
    /** Add a file from a remote URL */
    addFromUrl: (src) => void;
}
