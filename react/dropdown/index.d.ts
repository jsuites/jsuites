/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

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

interface ItemContainer {
    /** Data for the item */
    data: DropdownItem;
    /** HTML container for the element */
    element: HTMLElement;
    /** HTML container for the group */
    group: HTMLElement;
}

declare namespace Component {
    interface Options {
        /** Endpoint to fetch data from a remote server */
        url?: string;
        /** Preloaded data items for the dropdown */
        data?: DropdownItem[];
        /** Format type of the data, typically { id: name } or { value: text } */
        format?: number;
        /** Indicates if multiple item selection is allowed */
        multiple?: boolean;
        /** Enables the autocomplete feature for user input */
        autocomplete?: boolean;
        /** Allows remote search for options */
        remoteSearch?: boolean;
        /** Enables the lazy loading feature for handling a large number of options */
        lazyLoading?: boolean;
        /** Rendering style of the dropdown: 'default', 'picker', or 'searchbar' */
        type?: 'default' | 'picker' | 'searchbar',
        /** Defines the dropdown's width */
        width?: number;
        /** Sets the maximum width of the dropdown */
        maxWidth?: number;
        /** Determines if the dropdown is opened when initialized */
        opened?: boolean;
        /** The initial value of the dropdown */
        value?: string;
        /** Placeholder text for the dropdown */
        placeholder?: string;
        /** Allows the user to add new options */
        newOptions?: boolean;
        /** Internal controller for the dropdown's position */
        position?: boolean;
        /** Event handler for value changes */
        onchange?: (el: HTMLElement, obj: Dropdown, oldValue: string, newValue: string) => void;
        /** Event handler for when the dropdown is ready */
        onload?: (el: HTMLElement, obj: Dropdown, data: any, val: any) => void;
        /** Event handler for when the dropdown opens */
        onopen?: (el: HTMLElement) => void;
        /** Event handler for when the dropdown closes */
        onclose?: (el: HTMLElement) => void;
        /** Event handler for when the dropdown receives focus */
        onfocus?: (el: HTMLElement) => void;
        /** Event handler for when the dropdown loses focus */
        onblur?: (el: HTMLElement) => void;
        /** Event handler for when a new option is added to the dropdown */
        oninsert?: (obj: Dropdown, item: DropdownItem, newItem: DropdownItem) => void;
        /** Event handler for just before a new option is added to the dropdown */
        onbeforeinsert?: (obj: Dropdown, item: DropdownItem) => void;
        /** Event handler for before a search on autocomplete is performed */
        onbeforesearch?: (obj: Dropdown, ajaxRequest: object) => boolean | null;
        /** Event handler for processing search results */
        onsearch?: (obj: Dropdown, result: object) => void;
        /** Toggles the sorting of dropdown elements */
        sortResults?: boolean;
        /** Indicates if the dropdown should automatically receive focus upon creation */
        autofocus?: boolean;
    }

    interface Instance {
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
        options: Component.Options;
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
        setOptions: (newOptions: Component.Options, reset?: boolean) => void;
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
}


interface Dropdown {
    (): any
    [key: string]: any
}

declare function Dropdown<Dropdown>(props: Component.Options): any;
export default Dropdown;
