interface Items {
    /** Value of the selected item. */
    id?: string | number;
    /** Label for the selected item. */
    name?: string;
    /** Description of the item */
    title?: string;
    /** Icon of the item */
    image?: string;
    /** Name of the group where the item belongs to */
    group?: string;
    /** Keywords to help finding one item */
    synonym?: string[];
    /** Item is disabled */
    disabled?: boolean;
    /** Color for the item */
    color?: string;
}

interface Options {
    /** Load the data from a remove server URL */
    url: string,
    /** Load data to the dropdown */
    data: Items[],
    /** Legacy format { id: name } or { value: text } */
    format: number,
    /** Accept multiple item selection */
    multiple: boolean,
    /** Enable the suggestion option */
    autocomplete: boolean,
    /** Search for an option remotely */
    remoteSearch: boolean,
    /** Enable the lazyloading option when you are dealing with too much options */
    lazyLoading: boolean,
    /** Internal type */
    type: 'dropdown',
    /** Width of the dropdown */
    width: number,
    /** Max width of the dropdown */
    maxWidth: number,
    /** Start the dropdown opened */
    opened: boolean,
    /** Initial value */
    value: string,
    /** Dropdown place holder */
    placeholder: string,
    /** Accept the user to add new options */
    newOptions: boolean,
    /** Internal position controller. */
    position: boolean,
    /** When the value chnaged */
    onchange: () => void,
    /** When the dropdown is ready */
    onload: () => void,
    /** When the dropdown is opened */
    onopen: () => void,
    /** When the dropdown is closed */
    onclose: () => void,
    /** When the dropdown is focused */
    onfocus: () => void,
    /** When the dropdown is blur */
    onblur: () => void,
    /** When the user add a new option to the dropdown. */
    oninsert: () => void,
    /** Just before a new option is added to the dropdown */
    onbeforeinsert: () => void,
    /** Sort the elements of the dropdown */
    sortResults: boolean,
    /** Focus when the dropdown is created */
    autofocus: boolean,
}

/** Toast Plugin */
export type Dropdown = (el: HTMLElement, options: Options) => {

}
