/**
 * Official Type definitions for Jspreadsheet Pro v9
 * https://jspreadsheet.com/v9
 */

import { Animation, Loading } from "./animation";
import { Calendar } from "./calendar";
import { Color } from "./color";
import { Contextmenu } from "./contextmenu";
import { Dropdown } from "./dropdown";
import { Editor } from "./editor";
import { Floating } from "./floating";
import { Form } from "./form";
import { Mask } from "./mask";
import { Modal } from "./modal";
import { Notification } from "./notification";
import { Picker } from "./picker";
import { Rating } from "./rating";
import { Search } from "./search";
import { Slider } from "./slider";
import { Tabs } from "./tabs";
import { Tags } from "./tags";
import { Toolbar } from "./toolbar";
import { Upload } from "./upload";
import { Validations } from "./validations";


export interface JSuites {
    animation: Animation;
    calendar: Calendar;
    color: Color;
    contextmenu: Contextmenu;
    dropdown: Dropdown;
    editor: Editor;
    floating: Floating;
    form: Form;
    loading: Loading;
    mask: Mask;
    modal: Modal;
    notification: Notification;
    picker: Picker;
    rating: Rating;
    search: Search;
    slider: Slider;
    tabs: Tabs;
    tags: Tags;
    toolbar: Toolbar;
    upload: Upload;
    validations: Validations;

    /** License string. Use setLicense to define the license */
    version: string;

    /** Define the translations from english to any other language. Ex.{ 'hello': 'Ola', 'Successfully Saved': 'Salvo com sucesso' } */
    setDictionary(dictionary: object) : void;

    /** Set extensions to the JSS spreadsheet. Example { formula, parser, render } */
    setExtensions(extensions: object) : void;
}
