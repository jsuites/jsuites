/**
 * Official Type definitions for Jspreadsheet Pro v9
 * https://jspreadsheet.com/v9
 */

import { Notification } from "./notification";

export interface JSuites {
    notification: Notification;

    /** License string. Use setLicense to define the license */
    version: string;

    /** Define the translations from english to any other language. Ex.{ 'hello': 'Ola', 'Successfully Saved': 'Salvo com sucesso' } */
    setDictionary(dictionary: object) : void;

    /** Set extensions to the JSS spreadsheet. Example { formula, parser, render } */
    setExtensions(extensions: object) : void;
}
