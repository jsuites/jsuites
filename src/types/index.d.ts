/**
 * Official Type definitions for Jspreadsheet Pro v9
 * https://jspreadsheet.com/v9
 */

declare namespace jSuites {

    /** License string. Use setLicense to define the license */
    let version: string;

    /** Define the translations from english to any other language. Ex.{ 'hello': 'Ola', 'Successfully Saved': 'Salvo com sucesso' } */
    function setDictionary(dictionary: object) : void;

    /** Set extensions to the JSS spreadsheet. Example { formula, parser, render } */
    function setExtensions(extensions: object) : void;
}

export jSuites;
