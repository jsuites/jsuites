;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Indexing = factory();
}(this, (function () {

    return function(el, options) {
        // Render index content
        const render = function () {
            // Before render
            if (options) {
                if (options.onbeforecreate) {
                    let ret = options.onbeforecreate();
                    if (ret === false) {
                        return;
                    }
                }

                if (options.source) {
                    // Reset content
                    el.innerHTML = '';
                    // Get all elements h2 and h3 in the page
                    let elements = options.source.querySelectorAll('h2,h3');
                    // Create root ul
                    let rootUl = document.createElement('ul');
                    rootUl.classList.add('indexing');
                    
                    let currentH2Li = null;
                    let currentH2Ul = null;

                    elements.forEach(function(element) {
                        if (element.tagName && element.textContent) {
                            let a = document.createElement('a');
                            a.textContent = element.textContent.replace('¶', '');
                            a.href = '#content-' + element.textContent.toLowerCase()
                                .replace('-', ' ')
                                .replace(/[^\w\s]/g, '')
                                .replace(/\s+/g, '-');

                            let li = document.createElement('li');
                            li.appendChild(a);

                            if (element.tagName === 'H2') {
                                // For H2, create a new ul for potential children
                                currentH2Li = li;
                                currentH2Ul = document.createElement('ul');
                                li.appendChild(currentH2Ul);
                                rootUl.appendChild(li);
                            } else if (element.tagName === 'H3') {
                                // For H3, append to the current H2's ul if it exists
                                if (currentH2Ul) {
                                    currentH2Ul.appendChild(li);
                                } else {
                                    // If no parent H2 exists, append to root
                                    rootUl.appendChild(li);
                                }
                            }
                        }
                    });

                    // Only append if we have content
                    if (rootUl.children.length) {
                        el.appendChild(rootUl);
                    }
                }
            }

            // Items for scroll tracking
            let items = [];
            let elements = el.querySelectorAll('a');
            
            elements.forEach(function(v) {
                if (v.tagName && v.textContent) {
                    let link = v.href.split('#');
                    let element = document.querySelector('[href="#' + link[1] + '"]');
                    let top = element.offsetTop;
                    let item = {
                        top: top - offset,
                        behavior: 'smooth',
                        element: v,
                    }
                    items.push(item);
                    
                    v.addEventListener('click', function(e) {
                        window.scrollTo(item);
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return false;
                    });
                    
                    v.setAttribute('href', window.location.pathname + '#' + link[1]);
                }
            });

            return items;
        }

        let offset = 0;
        if (options && options.offset) {
            offset = options.offset;
        }

        let items = render();

        document.addEventListener('scroll', function() {
            if (items && items.length) {
                let item = null;
                items.forEach(function(v) {
                    v.element.classList.remove('selected');
                    if (document.documentElement.scrollTop >= v.top - offset) {
                        item = v.element;
                    }
                });
                if (item) {
                    item.classList.add('selected');
                }
            }
        });
    }
})));