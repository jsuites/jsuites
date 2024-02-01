/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Component(el: HTMLElement, options?: Component.Options): Component.Instance;

declare namespace Component {
    interface Options {
        /** Initial value of the compontent */
        value?: string;
        /** Max number of tags inside the element */
        limit?: number;
        /** The URL for suggestions */
        search?: string;
        /** The default instruction text on the element */
        placeholder?: string;
        /** Method to validate the tags */
        validation?: (el: HTMLElement, text: string, value: string) => boolean;
        /** Method to be execute before any changes on the element */
        onbeforepaste?: (el: HTMLElement, instance: Tags, data: string[]) => string[];
        /** Method to be execute after any changes on the element */
        onbeforechange?: (el: HTMLElement, instance: Tags, currentValue: string, value: string) => string | string[] | boolean;
        /** Method to be execute when the user reach the limit number entries */
        onlimit?: (instance: Tags, limit: number) => void;
        /** Method to be execute when on changed */
        onchange?: (el: HTMLElement, instance: Tags, value: string) => void;
        /** Method to be execute when on focus */
        onfocus?: (el: HTMLElement, instance: Tags, value: string) => void;
        /** Method to be execute when on blur */
        onblur?: (el: HTMLElement, instance: Tags, value: string) => void;
        /** Method to be execute when the element is loaded */
        onload?: (el: HTMLElement, instance: Tags) => void;
        /** Colors */
        colors?: null;
    }

    interface Instance {
        /**
         * Change the component settings
         * @param {object} - New options
         * @param {boolean} - Reset to the defaults when option not specified
         */
        setOptions: (options: Options, reset?: boolean) => void;
        
        /**
         * Add a new tag to the element
         * @param {string|string[]} value - The value of the new element
         * @param {boolean} - focus on this new element
         */
        add: (value?: string | string[], focus?: boolean) => void;
        
        /**
         * Set the limit of entries for the component
         * @param {number} - New limit
         */
        setLimit: (limit) => void;
        
        /**
         * Remove a item node
         */
        remove: (node: HTMLElement) => void;
        
        /**
         * Get all tags in the element
         * @return {Array} data - All tags as an array
         */
        getData: () => string[];
        
        /**
         * Get the value of one tag. Null for all tags
         * @param {number} index - Tag index number. Null for all tags.
         * @return {string} value - All tags separated by comma
         */
        getValue: (index?: number) => string;
        
        /**
         * Set the value of the element based on a string separated by (,|;|\r\n) or array
         * @param {string|string[]} value - A string or array object with values
         */
        setValue: (value: string | string[]) => void;
        
        /**
         * Reset the value from the component
         */
        reset: () => void;
        
        /**
         * Verify if all tags in the element are valid
         * @return {boolean}
         */
        isValid: () => boolean;
        
        /**
         * Add one element from the suggestions to the component
         * @param {string} text - Label
         * @param {string} value - Value
         */
        selectIndex: (text: string, value?: string) => void;
        
        /**
         * Search for suggestions
         * @param {object} node - Target node for any suggestions
         */
        search: (node: HTMLElement) => void;
        
        /**
         * Destroy the component
         */
        destroy: () => void;
    }
}

interface Tags {
    (): any
    [key: string]: any
}

declare function Tags<Tags>(props: Component.Options): any;
export default Tags;
