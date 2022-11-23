interface Options {
    data: [],
    position: null,
    allowCreate: false,
    allowChangePosition: false,
    onclick: null,
    onload: null,
    onchange: null,
    oncreate: null,
    ondelete: null,
    onbeforecreate: null,
    onchangeposition: null,
    animation: false,
    hideHeaders: false,
    padding: null,
    palette: null,
    maxWidth: null,
}

export type Tabs = (el: HTMLElement, options: Options) => {

}
