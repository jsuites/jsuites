interface Options {
    // Validation type
    type: 'url' | 'email' | 'required' | 'empty' | 'notEmpty' | 'number' | 'login' | 'list' | 'date' | 'text' | 'textLength'
    // Ignore the validation when is blank
    allowBlank?: boolean;
    // Criteria
    criteria: string
}

interface Number {
    criteria: 'between' | 'not between' | '<' | '<=' | '>' | '>=' | '=' | '!='
}

export type Validations = (value: string | number, options) => {

}
