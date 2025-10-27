
// Valid tags
const validTags = [
    'html','body','address','span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'blockquote',
    'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'hr', 'br', 'img',
    'figure', 'picture', 'figcaption', 'iframe', 'table', 'thead', 'tbody', 'tfoot', 'tr',
    'th', 'td', 'caption', 'u', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
    'input', 'textarea', 'select', 'option', 'button', 'label', 'fieldset',
    'legend', 'audio', 'video', 'abbr', 'cite', 'kbd', 'section', 'article',
    'nav', 'aside', 'header', 'footer', 'main', 'details', 'summary', 'svg', 'line', 'source'
];
// Valid properties
const validProperty = ['width', 'height', 'align', 'border', 'src', 'tabindex'];
// Valid CSS attributes
const validStyle = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin'];

const parse = function(element, img) {
    // Remove elements that are not white-listed
    if (element.tagName && validTags.indexOf(element.tagName.toLowerCase()) === -1) {
        if (element.innerText) {
            element.innerHTML = element.innerText;
        }
    }
    // Remove attributes
    if (element.attributes && element.attributes.length) {
        let style = null;
        // Process style attribute
        let elementStyle = element.getAttribute('style');
        if (elementStyle) {
            style = [];
            let t = elementStyle.split(';');
            for (let j = 0; j < t.length; j++) {
                let v = t[j].trim().split(':');
                if (validStyle.indexOf(v[0].trim()) >= 0) {
                    let k = v.shift();
                    v = v.join(':');
                    style.push(k + ':' + v);
                }
            }
        }
        // Process image
        if (element.tagName.toUpperCase() === 'IMG') {
            if (! element.src) {
                element.parentNode.removeChild(element);
            } else {
                // Check if is data
                element.setAttribute('tabindex', '900');
                // Check attributes for persistence
                img.push(element.src);
            }
        }
        // Remove attributes
        let attr = [];
        for (let i = 0; i < element.attributes.length; i++) {
            attr.push(element.attributes[i].name);
        }
        if (attr.length) {
            attr.forEach(function (v) {
                if (validProperty.indexOf(v) === -1) {
                    element.removeAttribute(v);
                } else {
                    // Protection XSS
                    let at = element.getAttribute(v);
                    if (at.indexOf('<') !== -1) {
                        element.setAttribute(v, at.replace('<', '&#60;'));
                    }
                }
            });
        }
        element.style = '';
        // Add valid style
        if (style && style.length) {
            element.setAttribute('style', style.join(';'));
        }
    }
    // Parse children
    if (element.children.length) {
        for (let i = element.children.length; i > 0; i--) {
            parse(element.children[i - 1], img);
        }
    }
}

const filter = function(data, img) {
    if (data) {
        data = data.replace(new RegExp('<!--(.*?)-->', 'gsi'), '');
    }
    let parser = new DOMParser();
    let d = parser.parseFromString(data, "text/html");
    parse(d, img);
    let div = document.createElement('div');
    div.innerHTML = d.firstChild.innerHTML;
    return div;
}

export default filter;