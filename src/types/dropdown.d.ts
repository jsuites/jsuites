interface DropdownItem {
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
    data: DropdownItem[],
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
    /** When the value changed */
    onchange: (el: HTMLElement, obj: Dropdown, oldValue: string, newValue: string) => void,
    /** When the dropdown is ready */
    onload: (el: HTMLElement, obj: Dropdown, data: any, val: any) => void,
    /** When the dropdown is opened */
    onopen: (el: HTMLElement) => void,
    /** When the dropdown is closed */
    onclose: (el: HTMLElement) => void,
    /** When the dropdown is focused */
    onfocus: (el: HTMLElement) => void,
    /** When the dropdown is blur */
    onblur: (el: HTMLElement) => void,
    /** When the user add a new option to the dropdown. */
    oninsert: (obj: Dropdown, item: DropdownItem, newItem: DropdownItem) => void,
    /** Just before a new option is added to the dropdown */
    onbeforeinsert: (obj: Dropdown, item: DropdownItem) => void,
    /** Before the search on autocompletes */
    onbeforesearch: (obj: Dropdown, ajaxRequest: object) => boolean | null;
    /** Search result */
    onsearch: (obj: Dropdown, result: object) => void;
    /** Sort the elements of the dropdown */
    sortResults: boolean,
    /** Focus when the dropdown is created */
    autofocus: boolean,
}

interface ItemContainer {
    /** Data for the item */
    data: DropdownItem;
    /** HTML container for the element */
    element: HTMLElement;
    /** HTML container for the group */
    group: HTMLElement;
}

/** Toast Plugin */
export type Dropdown = (el: HTMLElement, options: Options) => {
    /** Add a new item to the dropdown */
    add: (title: string, id: string|number) => DropdownItem;
    /** Append new data to the dropdown */
    appendData: (data: DropdownItem[]) => void
    /** Close the dropdown picker */
    closeItem: (ignoreEvents?: boolean) => void
    /** Current selectIndex */
    currentIndex: number;
    /** Find the items with the keyword */
    find: (str: string) => void;
    /** Select the first item */
    first: () => void;
    /** Get all data */
    getData: () => DropdownItem[];
    /** Get the index position of a item by its value */
    getPosition: (value: string) => number | boolean;
    /** Get the text from the selected options */
    getText: (asArray?: boolean) => string | string[];
    /** Get the URL source for the data if defined */
    getUrl: () => string;
    /** Get the value from the selected options */
    getValue: (asArray?: boolean) => string | string[];
    /** DOM Elements for the groups */
    groups: HTMLElement[];
    /** DOM Element for the header */
    header: HTMLElement;
    /** Items */
    items: ItemContainer[];
    /** Move index to the last element in the dropdown */
    last: () => void;
    /** Internal lazy loading method */
    loadDown: () => void;
    /** Internal lazy loading method */
    loadFirst: () => void;
    /** Internal lazy loading method */
    loadLast: () => void;
    /** Internal lazy loading method */
    loadUp: () => void;
    /** Move index to the next element in the dropdown */
    next: () => void;
    /** Open the dropdown */
    open: () => void;
    /** Dropdown configuration */
    options: Options;
    /** Move index to the previous element in the dropdown */
    prev: () => void;
    /** Reset the value of the dropdown */
    reset: () => void;
    /** Alias for setCursor */
    resetCursor: (index: number, setPosition?: boolean) => void
    /** Set the value to null */
    resetSelected: () => void;
    /** Array of results when filtering */
    results: DropdownItem[];
    /** Search term */
    search: string;
    /** Select an index */
    selectIndex: (index: number, force?: boolean) => void
    /** Select an item */
    selectItem: (item: DropdownItem) => void;
    /** Set the cursor to a specified element index */
    setCursor: (index: number, setPosition?: boolean) => void
    /** Set new data for the dropdown */
    setData: (items: DropdownItem[]) => void;
    /** Set the id or value for one item */
    setId: (item: number|DropdownItem, newId: number) => void;
    /** Change the dropdown options */
    setOptions: (newOptions: Options, reset?: boolean) => void;
    /** Change the dropdown data from a URL */
    setUrl: (newUrl: string, callback?: Function) => void;
    /** Set the value for a dropdown */
    setValue: (newValue: string | string[]) => void;
    /** Internal type */
    type: 'dropdown';
    /** Alias for setCursor */
    updateCursor: (index: number, setPosition?: boolean) => void;
    /** Current internal value */
    value: Record<number, string>;
}
