/**
 * Official Type definitions for Jspreadsheet Pro v9
 * https://jspreadsheet.com/v9
 */

import { Calendar } from "./calendar";
import { Color } from "./color";
import { Contextmenu } from "./contextmenu";
import { Dropdown } from "./dropdown";
import { Editor } from "./editor";
import { Floating } from "./floating";
import { Form } from "./form";
import { Mask } from "./mask";


import { Toolbar } from "./toolbar";
import { Upload } from "./upload";
import { Notification } from "./notification";

export interface JSuites {
    calendar: Calendar;
    color: Color;
    contextmenu: Contextmenu;
    dropdown: Dropdown;
    editor: Editor;
    floating: Floating;
    form: Form;
    mask: Mask;

    toolbar: Toolbar;
    upload: Upload;
    notification: Notification;

    /** License string. Use setLicense to define the license */
    version: string;

    /** Define the translations from english to any other language. Ex.{ 'hello': 'Ola', 'Successfully Saved': 'Salvo com sucesso' } */
    setDictionary(dictionary: object) : void;

    /** Set extensions to the JSS spreadsheet. Example { formula, parser, render } */
    setExtensions(extensions: object) : void;
}
