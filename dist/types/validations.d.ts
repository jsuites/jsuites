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

export type Validations = (value: string | number, options: Options) => boolean | {
    url: (value: any, options: object) => boolean;
    email: (value: any, options: object) => boolean;
    required: (value: any, options: object) => boolean;
    empty: (value: any, options: object) => boolean;
    notEmpty: (value: any, options: object) => boolean;
    number: (value: any, options: object) => boolean;
    login: (value: any, options: object) => boolean;
    list: (value: any, options: object) => boolean;
    date: (value: any, options: object) => boolean;
    text: (value: any, options: object) => boolean;
    textLength: (value: any, options: object) => boolean;
    exist: (value: any, options: object) => boolean;
    'not exists': (value: any, options: object) => boolean;
}
