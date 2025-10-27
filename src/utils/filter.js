
// Valid tags (removed iframe for security)
const validTags = [
    'html','body','address','span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'blockquote',
    'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'hr', 'br', 'img',
    'figure', 'picture', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr',
    'th', 'td', 'caption', 'u', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
    'input', 'textarea', 'select', 'option', 'button', 'label', 'fieldset',
    'legend', 'audio', 'video', 'abbr', 'cite', 'kbd', 'section', 'article',
    'nav', 'aside', 'header', 'footer', 'main', 'details', 'summary', 'svg', 'line', 'source'
];

// Dangerous tags that should be completely removed
const dangerousTags = ['script', 'object', 'embed', 'applet', 'meta', 'base', 'link', 'iframe'];

// Valid properties (added id, class, title, alt for better editor support)
const validProperty = ['width', 'height', 'align', 'border', 'src', 'href', 'tabindex', 'id', 'class', 'title', 'alt'];

// Tags that are allowed to have src attribute
const tagsAllowedSrc = ['img', 'audio', 'video', 'source'];

// Tags that are allowed to have href attribute
const tagsAllowedHref = ['a'];

// Valid CSS attributes
const validStyle = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin', 'padding', 'text-align', 'text-decoration'];

// Function to decode HTML entities (prevents bypassing with &#106;avascript:)
function decodeHTMLEntities(text) {
    if (!text) return '';
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to check if a URL scheme is dangerous
function isDangerousURL(url) {
    if (!url) return false;
    const decoded = decodeHTMLEntities(url).toLowerCase().trim();
    // Remove whitespace and null bytes that can be used to bypass filters
    const cleaned = decoded.replace(/[\s\0]/g, '');

    return cleaned.startsWith('javascript:') ||
           cleaned.startsWith('data:text/') ||
           cleaned.startsWith('data:application/') ||
           cleaned.startsWith('vbscript:') ||
           cleaned.includes('<script');
}

// Function to sanitize CSS value
function sanitizeStyleValue(value) {
    if (!value) return '';
    const decoded = decodeHTMLEntities(value).toLowerCase();

    // Block dangerous CSS content
    if (decoded.includes('javascript:') ||
        decoded.includes('expression(') ||
        decoded.includes('behavior:') ||
        decoded.includes('-moz-binding') ||
        decoded.includes('binding:') ||
        decoded.includes('@import') ||
        decoded.includes('url(') && (decoded.includes('javascript:') || decoded.includes('data:'))) {
        return '';
    }

    return value;
}

const parse = function(element, img) {
    if (!element || !element.tagName) {
        return;
    }

    const tagName = element.tagName.toLowerCase();

    // Remove dangerous tags completely
    if (dangerousTags.indexOf(tagName) !== -1) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
        return;
    }

    // Remove elements that are not white-listed
    if (validTags.indexOf(tagName) === -1) {
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
                const property = v[0].trim();
                if (validStyle.indexOf(property) >= 0) {
                    let k = v.shift();
                    v = v.join(':');
                    // Sanitize the CSS value
                    const sanitizedValue = sanitizeStyleValue(v);
                    if (sanitizedValue) {
                        style.push(k + ':' + sanitizedValue);
                    }
                }
            }
        }

        // Process image
        if (tagName === 'img') {
            const src = element.getAttribute('src');
            if (!src || isDangerousURL(src)) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                return;
            } else {
                element.setAttribute('tabindex', '900');
                // Check attributes for persistence
                img.push(src);
            }
        }

        // Collect all attribute names first
        let attr = [];
        for (let i = 0; i < element.attributes.length; i++) {
            attr.push(element.attributes[i].name);
        }

        // Process attributes
        if (attr.length) {
            attr.forEach(function (v) {
                const attrName = v.toLowerCase();

                // Remove all event handlers (onclick, onerror, onload, etc.)
                if (attrName.startsWith('on')) {
                    element.removeAttribute(v);
                    return;
                }

                // Check if attribute is in whitelist
                if (validProperty.indexOf(attrName) === -1) {
                    element.removeAttribute(v);
                } else {
                    // Validate whitelisted attributes
                    let attrValue = element.getAttribute(v);

                    // Special handling for src attribute
                    if (attrName === 'src') {
                        if (tagsAllowedSrc.indexOf(tagName) === -1) {
                            // src not allowed on this tag
                            element.removeAttribute(v);
                            return;
                        }
                        if (isDangerousURL(attrValue)) {
                            element.removeAttribute(v);
                            return;
                        }
                    }

                    // Special handling for href attribute
                    if (attrName === 'href') {
                        if (tagsAllowedHref.indexOf(tagName) === -1) {
                            // href not allowed on this tag
                            element.removeAttribute(v);
                            return;
                        }
                        if (isDangerousURL(attrValue)) {
                            element.removeAttribute(v);
                            return;
                        }
                    }

                    // Protection XSS - check for dangerous characters
                    if (attrValue && attrValue.indexOf('<') !== -1) {
                        element.setAttribute(v, attrValue.replace(/</g, '&#60;'));
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

    // Parse children recursively
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
    parse(d.body, img);
    let div = document.createElement('div');
    div.innerHTML = d.body.innerHTML;
    return div;
}

export default filter;