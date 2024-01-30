/**
 * Official Type definitions for the LemonadeJS plugins
 * https://lemonadejs.net
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */
import { Component } from 'jsuites';

interface Calendar {
    (): any
    [key: string]: any
}

declare function Calendar<Calendar>(props: Component.Options): any;
export default Calendar;
