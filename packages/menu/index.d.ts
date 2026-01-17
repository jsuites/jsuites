/**
 * jSuites Menu Plugin
 * A lightweight, responsive JavaScript navigation menu component
 *
 * Website: https://jsuites.net
 * License: MIT
 */

declare function menu(element: HTMLElement, options?: menu.Options): menu.Instance;

declare namespace menu {
    interface Options {
        /**
         * Auto-scroll to selected item when menu loads
         * @default true
         */
        adjustOnLoad?: boolean;

        /**
         * Close other selected menus so that only one submenu remains open.
         * @default false
         */
        toggle?: boolean;

        /**
         * Callback fired when a menu link is clicked
         * @param instance - The menu instance
         * @param event - The click event
         */
        onclick?: (instance: Instance, event: MouseEvent) => void;

        /**
         * Callback fired when the menu finishes initializing
         * @param element - The menu container element
         * @param instance - The menu instance
         */
        onload?: (element: HTMLElement, instance: Instance) => void;
    }

    interface Instance {
        /**
         * Display the menu (with slide animation on mobile)
         */
        show(): void;

        /**
         * Hide the menu (with slide animation on mobile)
         */
        hide(): void;

        /**
         * Toggle menu visibility
         */
        toggle(): void;

        /**
         * Load the menu and apply initial selection based on current URL
         */
        load(): void;

        /**
         * Update the selected state based on the current URL path
         * @param adjustScroll - If true, scrolls the menu to show the selected item
         */
        update(adjustScroll?: boolean): void;

        /**
         * Programmatically select a menu item
         * @param element - The anchor element to select
         * @param event - The original event object
         */
        select(element: HTMLElement, event?: Event): void;
    }
}

export = menu;
export as namespace menu;
