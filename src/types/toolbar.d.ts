interface Item {
    /** Toolbar item type */
    type?: 'icon' | 'divisor' | 'label' | 'select';
    /** Content of the toolbar element */
    content?: string;
    /** Tooltip for the toolbar element */
    tooltip?: string;
    /** Toolbar element width */
    width?: number;
    /** The initial selected option for the type: select */
    value?: string;
    /** Render method parser for the elements in the dropdown when type: select */
    render?: Function;
    /** When a item is clicked */
    onclick?: (el: HTMLElement, iconObject: object, toolbarItem: HTMLElement) => void;
    /** For the type select when a new item is selected */
    onchange?: (el: HTMLElement, pickerObject: object, reservedValue: any, itemValue: string, itemKey: string, mouseEvent: object) => void;
    /** To update the state of the toolbar */
    updateState?: (toolbarObject: object, toolbarItem: HTMLElement, option: any, extendOption: any) => void;
}

interface Options {
    /** Instance for the application you integrate your toolbar */
    app?: any;
    /** Container of the toolbar */
    container?: boolean;
    /** Show badge. Default: false */
    badge?: boolean;
    /** Show titles */
    title?: boolean;
    /** Responsive toolbar. Default: false */
    responsive?: boolean;
    /** Max toolbar width */
    maxWidth?: number | null;
    /** Show toolbar in the bottom of the component */
    bottom?: boolean;
    /** Items */
    items: Item[];
}

export type Toolbar = (el: HTMLElement, options: Options) => {
    /** Close the floating extended options */
    close: () => void;
    /** Create the toolbar */
    create: (items: Item[]) => void;
    /** Destroy the toolbar */
    destroy: () => void;
    /** Return the HTMLElement container */
    get: () => void;
    /** Hide the toolbar */
    hide: () => void;
    /** Open the floating extended options */
    open: () => void;
    /** Toolbar settings */
    options: Options;
    /** Refresh the toolbar items */
    refresh: () => void;
    /** Select the toolbar item */
    selectItem: (element: HTMLElement) => void;
    /** Set the badge for a toolbar item */
    setBadge: (index: number, value: number) => void;
    /** Define readonly status */
    setReadonly: (state: boolean) => void;
    /** Show the toolbar */
    show: () => void;
    /** Internal controller */
    type: 'toolbar';
    /** Update the state of a toolbar item. Arguments to be sent to the items */
    update: (option?: any, extendedOption?: any) => void;
}
