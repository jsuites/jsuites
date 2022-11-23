interface Options {
    /** Items */
    items: [];
    /** Height */
    height: number
    /** Height */
    width: number
    /** Height */
    grid: boolean
    /** Height */
    onopen: (el: HTMLElement) => void
    /** Height */
    onclose: (el: HTMLElement) => void
}

export type Slider = (el: HTMLElement, options: Options) => {

}
