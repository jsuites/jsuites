/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

interface Item {
    /** DOMElement for the header title */
    titleElement?: HTMLElement;
    /** DOMElement for the header content */
    contentElement?: HTMLElement;
    /** Material icon keyword */
    icon?: string;
    /** Tab header */
    title?: string;
    /** Width */
    width?: number;
}

declare namespace Component {
    interface Options {
        /** Tabs definition */
        data: Item[],
        /** Position */
        position: 'top' | 'bottom' | null,
        /** Show the add new tab button. Default: false */
        allowCreate: boolean,
        /** Allow drag and drop to change the tabs position. Default: false */
        allowChangePosition: boolean,
        /** On click event */
        onclick: (el: HTMLElement, instance: Tabs, index: number, header: HTMLElement, content: HTMLElement) => void;
        /** On load event */
        onload: (el: HTMLElement, instance: Tabs) => void,
        /** On change event */
        onchange: (el: HTMLElement, instance: Tabs, index: number, header: HTMLElement, content: HTMLElement) => void;
        /** On create new tab event */
        oncreate: (el: HTMLElement, div: HTMLElement) => void;
        /** On delete tab event */
        ondelete: (el: HTMLElement, index: number) => void;
        /**
         * On before create new tab event
         * @return {string} Header title
         */
        onbeforecreate: (el: HTMLElement) => string;
        /** On change tab position event */
        onchangeposition: (headers: HTMLElement[], from: number, to: number) => void;
        /** Enable animation. Default: false */
        animation: boolean,
        /** Hide headers. Default: false */
        hideHeaders: boolean,
        /** Content padding */
        padding: number,
        /** Design */
        palette?: 'modern' | null,
        /** Max container width */
        maxWidth: number,
    }

    interface Instance {
        /** Set the border to a header */
        setBorder: (index: number) => void;
        /** Open a tab by number */
        open: (index: number) => void;
        /** Open a tab by its header DOM element */
        selectIndex: (element: HTMLElement) => void;
        /** Rename a header title */
        rename: (index: number, title: string) => void;
        /** Create a new tab */
        create: (title: string, url: string) => void;
        /** Remove a tab */
        remove: (index: number) => void;
        /** Automatic name the next tab number */
        nextNumber: () => void;
        /** Delete tab element */
        deleteElement: () => void;
        /** Append tab element */
        appendElement: (title?: string, callback?: Function, openTab?: boolean) => void;
        /** Get the active tab index */
        getActive: () => number;
        /** Update the content of a tab */
        updateContent: (index: number, newContent: string) => void;
        /** Update tab position */
        updatePosition: (from: number, to: number, ignoreEvents?: boolean) => void;
        /** Update DOM position */
        move: (from: number, to: number, ignoreEvents?: boolean, openTab?: boolean) => void;
    }
}

interface Tabs {
    (): any
    [key: string]: any
}

declare function Tabs<Tabs>(props: Component.Options): any;
export default Tabs;
