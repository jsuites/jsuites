/**
 * (c) jSuites Javascript Plugins and Web Components
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Indexing
 *
 * MIT License
 */

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
                    // Create elements
                    let ul = document.createElement('ul');
                    let lastUl;
                    ul.classList.add('indexing');
                    elements.forEach(function (v, k) {
                        if (v.tagName && v.textContent) {
                            let a = document.createElement('a');
                            a.textContent = v.textContent.replace('¶', '');
                            a.href = '#content-' + v.textContent.toLowerCase().replace('-', ' ').replace(/[^\w\s]/g, '').replace(/\s+/g, '-');

                            let li = document.createElement('li');
                            li.appendChild(a);

                            if (v.tagName === 'H2') {
                                lastUl = document.createElement('ul');
                                ul.appendChild(li);
                                ul.appendChild(lastUl);
                            } else {
                                if (lastUl) {
                                    lastUl.appendChild(li);
                                } else {
                                    ul.appendChild(li);
                                }
                            }
                        }
                    });

                    if (ul.children.length) {
                        el.appendChild(ul);
                    }
                }
            }

            // Items
            let items = [];
            // Get all elements h2 and h3 in the page
            let elements = el.querySelectorAll('a');
            // Adding events
            elements.forEach(function (v) {
               if (v.tagName && v.textContent) {
                   let link = v.href.split('#');
                   let element = document.querySelector('[href="#'+link[1]+'"]');
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
                items.forEach(function (v) {
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
