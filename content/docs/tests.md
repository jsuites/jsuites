title: Testing your JavaScript Plugins
keywords: jSuites, testing, frontend, JavaScript library, plugins, automation
description: How to create and automate tests for your jSuites plugins, ensuring high-quality reliable web applications.
canonical: https://jsuites.net/docs/tests

# Tests

## Overview

This guide provides instructions on integrating Jest to test your implementations using any jSuites plugins.
  

### Blueprint

The example below demonstrates a test where the render method of the mask plugin is invoked, and the output is validated against the specified assertions.

{.ignore}
```javascript
describe('Testing jSuites.mask', () => {
    it('Render method', function() {
        expect(jSuites.mask.render(123, { mask: '00000'}, true)).toBe('00123');
        expect(jSuites.mask.render(11.45, { mask: '0.0' }, true)).toBe('11.5');
    });
});
```

### Testing Plugins That Use the DOM

Install the jsdom package to test plugins on HTML elements and validate their behavior. Once configured, use the example below to verify if an element is added or removed from the document body.

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
  


### Running Your Tests

Create a ./test folder in your project root and include your test files.

Run the tests from the command line using:

```bash
npm run test
```

### Troubleshooting

#### Not possible to load a file outside the module

**Issue:** Unable to Load a File Outside the Module

This error occurs when using the `import` statement in a Node.js project without properly configuring the module type in package.json. Node.js defaults to CommonJS, causing issues with ES module compatibility.

**Solution:**

To address this issue, follow these steps:

- Open your package.json file.
- Add the 'type' field with the value 'module' as shown below:

```{ "type": "module", // ... other package.json configurations }```

- Save the package.json file.
- Run your tests.
- Optionally, remove the type field from package.json after testing.

This solution allows for proper module loading when working with ES modules and CommonJS in Node.js.
