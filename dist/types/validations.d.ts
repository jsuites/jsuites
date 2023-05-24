interface Options {
    /** Validation type */
    type: 'number' | 'text' | 'date' | 'list' | 'textLength' | 'empty' | 'notEmpty';
    // Ignore the validation when is blank
    allowBlank?: boolean;
    /** Criteria to be match */
    criteria:
        | '='
        | '!='
        | '>='
        | '>'
        | '<='
        | '<'
        | 'between'
        | 'not between'
        | 'valid date'
        | 'valid email'
        | 'valid url'
        | 'contains'
        | 'not contains'
        | 'begins with'
        | 'ends with'
}

export type Validations = (value: string | number, options: Options) => boolean;
