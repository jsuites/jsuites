interface Options {
    /** Number of stars */
    number?: 5,
    /** Current value */
    value?: number,
    /** Example by default. [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ] */
    tooltip?: string[],
    /** When the value changes */
    onchange?: () => void,
}

export type Rating = (el: HTMLElement, options: Options) => {
    /** Change the value */
    setValue: (index: number) => void;
    /** Get the current value */
    getValue: () => void;
    /** Current options */
    options: Options;
}
