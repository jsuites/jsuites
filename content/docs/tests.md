title: Testing jSuites Plugins
keywords: jSuites, testing, frontend, JavaScript library, plugins, automation
description: How to create and automate tests for your jSuites plugins, ensuring high-quality reliable web applications.

Tests
=====

jSuites has integrated Jest for its unit testing implementation. This section will provide additional details on effectively conducting tests for your jSuites plugins. Whether you prefer running tests through the command line or in a browser environment, you can follow the instructions provided in this section to accomplish either approach.
  

Blue print
----------

In the example provided below, a test is conducted wherein the render method of the mask plugin is invoked. Subsequently, the output is compared against the specified assertions.

{.ignore}
```javascript
describe('Testing jSuites.mask', () => {
    it('Render method', function() {
        expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
        expect(jSuites.mask.render(11.45, { mask: '0.0' }, true)).toBe('11.5');
    });
});
```

Testing DOM Related Plugins
----------

In order to test DOM related plugins, you need to install the `jsdom` package, which allows you to render plugins on HTML elements and then make assertions based on them.

With `jsdom` configured on your project, you can run a test like the example below to check if an element is correctly added or removed from the document body. 

{.ignore}
```javascript
describe('Testing jSuites.contextmenu', () => {
    test('Testing if elements are being displayed in HTML', () => {
        document.body.innerHTML = '<div id="root"></div>';
        let div = document.getElementById('root')

        jSuites.contextmenu(div, {
            items: [
                {
                    title: 'Select All',
                    shortcut: 'Ctrl + A',
                    tooltip: 'Method to Select All Text',
                },
            ],
        })

        expect(document.body.innerHTML).toContain('Select All')
        expect(document.body.innerHTML).toContain('Ctrl + A')
        expect(document.body.innerHTML).toContain('Method to Select All Text')
    });
});
```

More examples in our [GitHub repository](https://github.com/jsuites/jsuites/tree/main/tests)  
  

  

Running your tests
------------------

  

### Via NPM

Create a `./test` folder in your project root and include your test files, then you can execute:  

To run those tests via command line you will need

```bash
npm run test
```

Troubleshooting
---------------

  

### Not possible to load a file outside the module

**Issue:** Unable to Load a File Outside the Module

This problem occurs when attempting to use the 'import' statement to load your components, and it's a limitation of Node.js when dealing with the interaction between ES modules (ESM) and CommonJS.

**Solution:**

To address this issue, follow these steps:

- Open your package.json file.
- Add the 'type' field with the value 'module' as shown below:

```{ "type": "module", // ... other package.json configurations }```
- Save the package.json file.
- Run your tests.
- After running the tests, you can remove the 'type' field from package.json if needed.

This solution allows for proper module loading when working with ES modules and CommonJS in Node.js.
