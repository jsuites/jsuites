/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Signature pad
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
            // Reset the current content
            el.innerHTML = '';
            // Before render
            if (options && options.onbeforecreate) {
                let ret = options.onbeforecreate();
                if (ret === false) {
                    return;
                }
            }
            // Get all elements h2 and h3 in the page
            let elements = document.getElementById('content').querySelectorAll('h2,h3');

            let selected = null;
            elements.forEach(function (v, k) {
                if (v.tagName && v.textContent) {
                    if (document.documentElement.scrollTop >= v.offsetTop) {
                        selected = k;
                    }
                }
            });

            let ul = document.createElement('ul');
            elements.forEach(function (v, k) {
                if (v.tagName && v.textContent) {
                    let li = document.createElement('li');
                    li.classList.add('tag' + v.tagName);
                    if (selected === k) {
                        li.classList.add('selected');
                    }
                    let a = document.createElement('a');
                    a.href = '#'
                    a.textContent = v.textContent;
                    a.onclick = function () {
                        window.scrollTo({
                            top: v.offsetTop,
                            behavior: 'smooth',
                        });
                        return false;
                    }
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            });

            el.appendChild(ul);
        }

        el.classList.add('indexing');

        document.addEventListener('scroll', render);

        render();
    }
})));
