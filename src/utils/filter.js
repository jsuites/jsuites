
// Whitelisted HTML tags
const validTags = [
    'html', 'body', 'address', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'blockquote',
    'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'hr', 'br', 'img',
    'figure', 'picture', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr',
    'th', 'td', 'caption', 'u', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
    'input', 'textarea', 'select', 'option', 'button', 'label', 'fieldset',
    'legend', 'audio', 'video', 'abbr', 'cite', 'kbd', 'section', 'article',
    'nav', 'aside', 'header', 'footer', 'main', 'details', 'summary', 'svg', 'line', 'source'
];

// Dangerous tags that should be completely removed
const dangerousTags = [
    'script', 'object', 'embed', 'applet', 'meta', 'base', 'link', 'iframe'
];

// Whitelisted attributes - only these are allowed
const validAttributes = ['id', 'class', 'title', 'alt', 'style'];

// Whitelisted CSS properties - only these are allowed in style attributes
const validStyleProperties = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin'];

// Function to decode HTML entities
function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to check if a URL scheme is dangerous
function isDangerousScheme(url) {
    if (!url) return false;
    const decoded = decodeHTMLEntities(url.toLowerCase());
    return decoded.startsWith('javascript:') || 
           decoded.startsWith('data:text/') || 
           decoded.startsWith('data:application/');
}

// Function to sanitize style attribute
function sanitizeStyle(styleValue) {
    if (!styleValue) return '';
    
    const decoded = decodeHTMLEntities(styleValue);
    const safeCssProps = [];
    const declarations = decoded.split(';');
    
    for (let declaration of declarations) {
        const trimmed = declaration.trim();
        if (!trimmed) continue;
        
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;
        
        const property = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();
        
        // Check if property is whitelisted
        if (validStyleProperties.includes(property)) {
            // Check for dangerous content in value
            const decodedValue = decodeHTMLEntities(value.toLowerCase());
            if (!decodedValue.includes('javascript:') && 
                !decodedValue.includes('expression(') &&
                !decodedValue.includes('url(javascript:') &&
                !decodedValue.includes('binding:') &&
                !decodedValue.includes('-moz-binding')) {
                safeCssProps.push(`${property}:${value}`);
            }
        }
    }
    
    return safeCssProps.join(';');
}

// Function to recursively sanitize DOM elements
function sanitizeElement(element, imgArray) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return false; // Element should not be kept
    }
    
    const tagName = element.tagName.toLowerCase();
    
    // Remove dangerous tags entirely
    if (dangerousTags.includes(tagName)) {
        return false; // Element should not be kept
    }
    
    // If tag is not whitelisted, extract text content but remove the tag
    if (!validTags.includes(tagName)) {
        const textContent = element.textContent || element.innerText || '';
        if (textContent) {
            // Replace with a text node
            element.outerHTML = textContent;
            return false; // Original element should not be kept, text content was extracted
        } else {
            return false; // Element should not be kept
        }
    }
    
    // Handle image elements specifically
    if (tagName === 'img') {
        const src = element.getAttribute('src');
        if (!src || isDangerousScheme(src)) {
            return false; // Remove dangerous or missing src images
        } else {
            // Collect safe image URLs
            imgArray.push(src);
        }
    }
    
    // Remove all attributes that are not whitelisted
    const attributes = Array.from(element.attributes);
    for (let attr of attributes) {
        const attrName = attr.name.toLowerCase();
        
        // Remove event handlers (attributes starting with 'on')
        if (attrName.startsWith('on')) {
            element.removeAttribute(attr.name);
            continue;
        }
        
        // Check if attribute is whitelisted
        if (!validAttributes.includes(attrName)) {
            element.removeAttribute(attr.name);
            continue;
        }
        
        // For whitelisted attributes, check for dangerous content
        const attrValue = attr.value;
        if (attrName === 'style') {
            const sanitizedStyle = sanitizeStyle(attrValue);
            if (sanitizedStyle) {
                element.setAttribute('style', sanitizedStyle);
            } else {
                element.removeAttribute('style');
            }
        } else {
            // For other whitelisted attributes, decode and check for dangerous schemes
            const decodedValue = decodeHTMLEntities(attrValue);
            if (isDangerousScheme(decodedValue) || decodedValue.includes('<script')) {
                element.removeAttribute(attr.name);
            }
        }
    }
    
    // Recursively process child elements (work backwards to avoid index issues)
    const children = Array.from(element.children);
    for (let i = children.length - 1; i >= 0; i--) {
        const shouldKeepChild = sanitizeElement(children[i], imgArray);
        if (!shouldKeepChild) {
            children[i].remove();
        }
    }
    
    return true; // Element should be kept
}

// Main filter function
const filter = function(htmlString, imgArray) {
    if (!htmlString) {
        const div = document.createElement('div');
        return div;
    }
    
    // Remove HTML comments
    let cleanHtml = htmlString.replace(/<!--[\s\S]*?-->/g, '');
    
    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHtml, 'text/html');
    
    // Create a container div for the sanitized content
    const container = document.createElement('div');
    
    // Process all content in body and head
    const allNodes = [];
    if (doc.body) {
        allNodes.push(...Array.from(doc.body.childNodes));
    }
    if (doc.head) {
        allNodes.push(...Array.from(doc.head.childNodes));
    }
    
    for (let child of allNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            // Clone the element to process it safely
            const clonedChild = child.cloneNode(true);
            const shouldKeep = sanitizeElement(clonedChild, imgArray);
            if (shouldKeep) {
                container.appendChild(clonedChild);
            }
        } else if (child.nodeType === Node.TEXT_NODE) {
            container.appendChild(child.cloneNode(true));
        }
    }
    
    return container;
};

// CommonJS export
module.exports = filter;
module.exports.default = filter;