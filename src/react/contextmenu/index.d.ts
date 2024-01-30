/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

interface Items {
    /** Context menu item type: line | divisor | default */
    type?: 'line' | 'divisor' | 'default';
    /** Context menu item title */
    title: string;
    /** Context menu icon key. (Material icon key icon identification) */
    icon?: string;
    /** HTML id property of the item DOM element */
    id?: string;
    /** Item is disabled */
    disabled?: boolean;
    /** Onclick event for the contextmenu item */
    onclick?: (instance: object, e: MouseEvent) => void;
    /** A short description or instruction for the item. Normally a shortcut. Ex. CTRL + C */
    shortcut?: string;
    /** Show this text when the user mouse over the element */
    tooltip?: string;
    /** Submenu */
    submenu?: Array<Items>;
}

declare namespace Component {
    interface Options {
        /** Items for the contextmenu */
        items: Items[],
        /** General onclick handler */
        onclick: null,
    }

    interface Instance {
        /** Close the color picker */
        close: () =>  void;
        /** Get the current color in hex */
        create: (items: Items[]) =>  void;
        /** Open the contextmenu. You can overwrite the items each time the menu is opened */
        open: (event: MouseEvent, items?: Items[]) =>  void;
        /** Open the contextmenu. You can overwrite the items each time the menu is opened */
        options: Options;
        /** Initial settings */
        isOpened: () => boolean;
        /** Internal type */
        type: 'contextmenu';
    }
}


interface Contextmenu {
    (): any
    [key: string]: any
}

declare function Contextmenu<Contextmenu>(props: Component.Options): any;
export default Contextmenu;
