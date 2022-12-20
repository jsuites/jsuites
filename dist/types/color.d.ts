interface Options {
    /** Color picker input place holder */
    placeholder: string;
    /** Initial value */
    value: string;
    /** When the color picker is opened */
    onopen: (el: HTMLElement, instance: Color) => void;
    /** When the color picker is closed */
    onclose: (el: HTMLElement, instance: Color) => void;
    /** When the color is changed */
    onchange: (el: HTMLElement, value: string, instance: Color) => void;
    /** Automatically close the color picker when a new color is clicked */
    closeOnChange: boolean;
    /** Color palette options */
    palette: string[];
    /** Fixed or normal */
    position: 'absolute' | null;
    /** Button label */
    doneLabel: string;
    /** Button label */
    resetLabel: string;
    /** Fullscreen mode */
    fullscreen: boolean;
    /** Start the picker opened */
    opened: boolean;
}

/** Toast Plugin */
export type Color = (el: HTMLElement, options: Options) => {
    /** Close the color picker */
    close: () =>  void;
    /** Get the current color in hex */
    getValue: () =>  void;
    /** Open the color picker */
    open: () =>  void;
    /** Initial settings */
    options: Options;
    /** Select an available color in the picker by its hex code */
    select: (color: string) =>  void;
    /** Change the settings */
    setOptions: (options: Options) =>  void;
    /** Set the internal color */
    setValue: (newColor: string) =>  void;
    /** Internal converter to hex */
    toHex: () =>  void;
    /** Internal type */
    type: 'color';
    /** Internal container for all colors */
    values: Record<string, HTMLElement>;
}
