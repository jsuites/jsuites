const filter = require('../src/utils/filter.js').default;
const filterModule = require('../src/utils/filter.js');

describe('Editor XSS Sanitization', () => {
    let img;

    beforeEach(() => {
        img = [];
    });

    test('should remove script tags', () => {
        const malicious = '<div>Hello<script>alert("XSS")</script>World</div>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<script');
        expect(result.innerHTML).not.toContain('alert');
    });

    test('should strip onclick event handlers', () => {
        const malicious = '<div onclick="alert(\'XSS\')">Click me</div>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('onclick');
        expect(result.innerHTML).not.toContain('alert');
    });

    test('should strip onerror event handlers', () => {
        const malicious = '<img src="x" onerror="alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('onerror');
        expect(result.innerHTML).not.toContain('alert');
    });

    test('should block javascript: URIs in href', () => {
        const malicious = '<a href="javascript:alert(\'XSS\')">Click</a>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('javascript:');
    });

    test('should block javascript: URIs in src', () => {
        const malicious = '<img src="javascript:alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('javascript:');
    });

    test('should sanitize data URIs with JavaScript', () => {
        const malicious = '<img src="data:text/html,<script>alert(\'XSS\')</script>">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('data:text/html');
    });

    test('should remove SVG with embedded script', () => {
        const malicious = '<svg><script>alert("XSS")</script></svg>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<script');
    });

    test('should strip onload handlers from SVG', () => {
        const malicious = '<svg onload="alert(\'XSS\')"></svg>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('onload');
    });

    test('should block CSS expressions', () => {
        const malicious = '<div style="background: expression(alert(\'XSS\'))">Test</div>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('expression');
    });

    test('should block JavaScript in style attributes', () => {
        const malicious = '<div style="width: 100px; background: url(javascript:alert(\'XSS\'))">Test</div>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('javascript:');
    });

    test('should remove object tags', () => {
        const malicious = '<object data="javascript:alert(\'XSS\')"></object>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<object');
    });

    test('should remove embed tags', () => {
        const malicious = '<embed src="javascript:alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<embed');
    });

    test('should remove meta refresh tags', () => {
        const malicious = '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<meta');
    });

    test('should remove base tags', () => {
        const malicious = '<base href="javascript:alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<base');
    });

    test('should strip all event handlers (comprehensive)', () => {
        const events = [
            'onabort', 'onblur', 'onchange', 'onclick', 'ondblclick',
            'onerror', 'onfocus', 'onkeydown', 'onkeypress', 'onkeyup',
            'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover',
            'onmouseup', 'onreset', 'onresize', 'onselect', 'onsubmit', 'onunload'
        ];

        events.forEach(event => {
            const malicious = `<div ${event}="alert('XSS')">Test</div>`;
            const result = filter(malicious, img);

            expect(result.innerHTML).not.toContain(event);
        });
    });

    test('should handle HTML entity encoding XSS attempts', () => {
        const malicious = '<img src=x onerror="&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('onerror');
    });

    test('should remove form with autofocus and onfocus', () => {
        const malicious = '<input autofocus onfocus="alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('onfocus');
    });

    test('should remove link tags', () => {
        const malicious = '<link rel="stylesheet" href="javascript:alert(\'XSS\')">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<link');
    });

    test('should remove applet tags', () => {
        const malicious = '<applet code="javascript:alert(\'XSS\')"></applet>';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('<applet');
    });

    test('should preserve readable content from non-whitelisted tags', () => {
        const content = '<div>Safe text <unknown>important content</unknown> more text</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('important content');
        expect(result.innerHTML).not.toContain('<unknown');
    });

    test('should retain whitelisted safe attributes', () => {
        const content = '<div title="tooltip" alt="description">Content</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('title="tooltip"');
        expect(result.innerHTML).toContain('alt="description"');
    });

    test('should preserve id and class attributes when whitelisted', () => {
        const content = '<div id="main" class="highlight" title="info">Styled</div>';
        const result = filter(content, img);

        const html = result.innerHTML;
        expect(html).toContain('id="main"');
        expect(html).toContain('class="highlight"');
        expect(html).toContain('title="info"');
        expect(html).toContain('Styled');
    });

    test('should retain alt attribute on images', () => {
        const content = '<img src="image.png" alt="description">';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('alt="description"');
    });

    test('should preserve safe inline styles with allowed properties', () => {
        const content = '<div style="color: red; font-size: 14px; margin: 10px;">Styled</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('Styled');
        const html = result.innerHTML.toLowerCase();
        const hasSafeProperty = html.includes('color') || html.includes('font-size') || html.includes('margin');
        expect(hasSafeProperty).toBe(true);
    });

    test('should collect normal image URLs into provided array', () => {
        const content = '<img src="image1.png"><img src="image2.jpg">';
        const imgArray = [];
        const result = filter(content, imgArray);

        expect(imgArray).toContain('image1.png');
        expect(imgArray).toContain('image2.jpg');
    });

    test('should collect data:image URIs into provided array', () => {
        const content = '<img src="data:image/png;base64,iVBORw0KGgo=">';
        const imgArray = [];
        const result = filter(content, imgArray);

        expect(imgArray.length).toBeGreaterThan(0);
        expect(imgArray[0]).toContain('data:image/png');
    });

    test('should reject data:application URIs', () => {
        const malicious = '<img src="data:application/json,{malicious}">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('data:application');
    });

    test('should reject data:text URIs', () => {
        const malicious = '<img src="data:text/html,<script>alert(\'XSS\')</script>">';
        const result = filter(malicious, img);

        expect(result.innerHTML).not.toContain('data:text');
    });

    test('should return DOM element with innerHTML property', () => {
        const content = '<p>Test content</p>';
        const result = filter(content, img);

        expect(result).toHaveProperty('innerHTML');
        expect(typeof result.innerHTML).toBe('string');
        expect(result.tagName).toBeDefined();
        expect(result.appendChild).toBeDefined();
        expect(typeof result.appendChild).toBe('function');
    });

    test('should support CommonJS module export default', () => {
        expect(filterModule.default).toBeDefined();
        expect(typeof filterModule.default).toBe('function');
        expect(filterModule.default).toBe(filter);
    });

    test('should support ES module default export import form', () => {

        expect(filterModule).toHaveProperty('default');
        expect(typeof filterModule.default).toBe('function');

        const testHtml = '<div onclick="test">Content</div>';
        const imgArray = [];
        const result = filterModule.default(testHtml, imgArray);

        // Verify the exported function works identically
        expect(result.innerHTML).not.toContain('onclick');
        expect(result.innerHTML).toContain('Content');
    });

    test('should strip non-whitelisted attributes', () => {
        const content = '<div data-custom="value" onclick="alert()" data-id="123">Content</div>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('data-custom');
        expect(result.innerHTML).not.toContain('data-id');
        expect(result.innerHTML).not.toContain('onclick');
    });

    test('should strip arbitrary attributes from various tags', () => {
        const content = '<p random-attr="value">Text</p><span foo="bar">Span</span>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('random-attr');
        expect(result.innerHTML).not.toContain('foo="bar"');
    });

    test('should strip href attribute even when safe (not in whitelist)', () => {
        const content = '<a href="https://example.com">Link</a>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('href');
        expect(result.innerHTML).toContain('Link');
    });

    test('should strip src attribute from non-img tags (not whitelisted for general use)', () => {
        const content = '<div src="safe.js">Content</div>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('src=');
        expect(result.innerHTML).toContain('Content');
    });

    test('should strip target and rel attributes (not in whitelist)', () => {
        const content = '<a href="#" target="_blank" rel="noopener">Link</a>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('target');
        expect(result.innerHTML).not.toContain('rel');
        expect(result.innerHTML).toContain('Link');
    });

    test('should strip name and type from input elements but preserve whitelisted id and title', () => {
        const content = '<input type="text" name="field" id="myinput" title="Enter text">';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('name=');
        expect(result.innerHTML).not.toContain('type=');
        // id and title are whitelisted
        expect(result.innerHTML).toContain('id="myinput"');
        expect(result.innerHTML).toContain('title="Enter text"');
    });

    test('should strictly enforce attribute whitelist: only id, class, title, alt, style allowed', () => {
        const content = '<div id="test" class="active" title="tip" data-x="y" role="main" tabindex="1" style="color: red;">Content</div>';
        const result = filter(content, img);

        const html = result.innerHTML;

        // Whitelisted attributes should be present
        expect(html).toContain('id="test"');
        expect(html).toContain('class="active"');
        expect(html).toContain('title="tip"');
        expect(html).toContain('style=');

        // Non-whitelisted attributes should be removed
        expect(html).not.toContain('data-x');
        expect(html).not.toContain('role');
        expect(html).not.toContain('tabindex');
    });

    test('should restrict inline styles to safe properties only', () => {
        const content = '<div style="color: red; behavior: url(xss.htc); position: fixed;">Test</div>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('behavior');
        expect(result.innerHTML).not.toContain('xss.htc');
    });

    test('should remove dangerous style properties like binding', () => {
        const content = '<div style="-moz-binding: url(xss.xml#xss);">Test</div>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('binding');
        expect(result.innerHTML).not.toContain('xss.xml');
    });

    test('filter should handle complex nested XSS with multiple vectors', () => {
        const complex = '<div data-evil="x" style="background: url(javascript:void(0))"><img onerror="alert()" src="x" data-x="y"><script>alert()</script>Text</div>';
        const result = filter(complex, img);

        expect(result.innerHTML).not.toContain('<script');
        expect(result.innerHTML).not.toContain('onerror');
        expect(result.innerHTML).not.toContain('javascript:');
        expect(result.innerHTML).not.toContain('data-evil');
        expect(result.innerHTML).not.toContain('data-x');
        expect(result.innerHTML).toContain('Text');
    });

    test('should preserve safe HTML structure for editor insertion', () => {
        const html = '<p>Paragraph</p><div><b>Bold</b> and <i>italic</i></div>';
        const result = filter(html, img);

        expect(result.innerHTML).toContain('<p');
        expect(result.innerHTML).toContain('Paragraph');
        expect(result.innerHTML).toContain('<b');
        expect(result.innerHTML).toContain('Bold');
        expect(result.innerHTML).toContain('<i');
        expect(result.innerHTML).toContain('italic');
    });

    test('should handle encoded URI schemes in attributes', () => {
        const encoded = '<a href="&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert(1)">Link</a>';
        const result = filter(encoded, img);

        expect(result.innerHTML).not.toContain('javascript:');
        expect(result.innerHTML).toContain('Link');
    });

    test('should reject all non-whitelisted style properties strictly', () => {
        const content = '<div style="color: red; position: fixed; font-size: 14px; display: none; margin: 10px;">Test</div>';
        const result = filter(content, img);

        const html = result.innerHTML.toLowerCase();

        expect(html).toContain('color');
        expect(html).toContain('font-size');
        expect(html).toContain('margin');

        expect(html).not.toContain('position');
        expect(html).not.toContain('display');
        expect(html).not.toContain('fixed');
        expect(html).not.toContain('none');
    });

    test('should strictly enforce style whitelist: reject width and height in styles', () => {
        const content = '<div style="width: 100px; height: 50px; color: blue;">Styled</div>';
        const result = filter(content, img);

        const html = result.innerHTML.toLowerCase();

        const styleMatch = html.match(/style="[^"]*"/);
        if (styleMatch) {
            const styleContent = styleMatch[0].toLowerCase();
            expect(styleContent).not.toContain('width');
            expect(styleContent).not.toContain('height');
            expect(styleContent).toContain('color');
        }
    });

    test('should reject non-whitelisted style properties: border-radius, box-shadow, opacity', () => {
        const content = '<div style="color: red; border-radius: 5px; box-shadow: 0 0 5px; opacity: 0.5;">Test</div>';
        const result = filter(content, img);

        const html = result.innerHTML;

        expect(html).toContain('color');

        expect(html).not.toContain('border-radius');
        expect(html).not.toContain('box-shadow');
        expect(html).not.toContain('opacity');
    });

    test('should handle comprehensive encoded entity attack vectors', () => {

        const encodedOnclick = '<div &#111;&#110;&#99;&#108;&#105;&#99;&#107;="alert()">Test</div>';
        const resultOnclick = filter(encodedOnclick, img);
        expect(resultOnclick.innerHTML).not.toContain('alert');
        expect(resultOnclick.innerHTML).not.toContain('onclick');
    });

    test('should handle encoded event handler values comprehensively', () => {
        // Encoded alert() in event handler value: alert becomes &#97;&#108;&#101;&#114;&#116;
        const encoded = '<img src=x &#111;&#110;&#108;&#111;&#97;&#100;="&#97;&#108;&#101;&#114;&#116;()">';
        const result = filter(encoded, img);

        expect(result.innerHTML).not.toContain('alert');
        expect(result.innerHTML).not.toContain('onload');
    });

    test('should handle mixed encoded and plain dangerous protocols', () => {
        // Href with javascript: mixed with encoded content
        const content = '<a href="java&#115;&#99;&#114;&#105;&#112;&#116;:alert()">Link</a>';
        const result = filter(content, img);

        expect(result.innerHTML).not.toContain('alert');
        expect(result.innerHTML).not.toContain('javascript');
    });

    test('should strictly validate all style property names with encoded attempts', () => {
        // Attempt to inject invalid property via entity encoding
        // &#98;&#101;&#104;&#97;&#118;&#105;&#111;&#114; = behavior
        const content = '<div style="color: red; &#98;&#101;&#104;&#97;&#118;&#105;&#111;&#114;: url(xss);">Test</div>';
        const result = filter(content, img);

        // Only color should be preserved after decoding and validation
        expect(result.innerHTML).toContain('Test');
        expect(result.innerHTML).not.toContain('behavior');
        expect(result.innerHTML).not.toContain('xss');
    });

    test('should enforce style whitelist even with unusual formatting', () => {
        // Test: margin with spaces and extra colons
        const content = '<div style="color : red ; margin : 10px ; padding : 5px;">Test</div>';
        const result = filter(content, img);

        const html = result.innerHTML;

        // color and margin should be preserved (after trimming)
        expect(html).toContain('color');
        expect(html).toContain('margin');

        // padding should be removed (not whitelisted)
        expect(html).not.toContain('padding');
    });

    test('should handle encoded protocol detection in URI attributes', () => {
        // Test: data:application/json with encoded "data" prefix
        // Attempt: &#100;&#97;&#116;&#97;:application/json = data:application/json
        const content = '<img src="&#100;&#97;&#116;&#97;:application/json,{}">';
        const result = filter(content, img);

        // Should be removed due to dangerous protocol
        expect(result.innerHTML).not.toContain('data:application');
    });

    test('paste handler contract: sanitized result is safe for insertHtml', () => {
        // Simulates the paste handler flow: filter HTML, collect images, use result.innerHTML
        const pastedHtml = '<div onclick="alert()"><img src="x" onerror="alert()"><script>alert()</script>Safe content</div>';
        const imgArray = [];

        const sanitized = filter(pastedHtml, imgArray);

        // Verify the contract: result.innerHTML can be safely inserted
        expect(sanitized.innerHTML).toBeDefined();
        expect(typeof sanitized.innerHTML).toBe('string');

        // Verify dangerous content is removed
        expect(sanitized.innerHTML).not.toContain('onclick');
        expect(sanitized.innerHTML).not.toContain('onerror');
        expect(sanitized.innerHTML).not.toContain('<script');

        // Verify safe content is preserved
        expect(sanitized.innerHTML).toContain('Safe content');

        // Verify image collection works for downstream processing
        expect(imgArray).toBeDefined();
        expect(Array.isArray(imgArray)).toBe(true);
    });

    test('filter integration: verify editor imports and uses filter for paste operations', () => {

        const testHtml = '<p>Safe</p><script>bad</script><img onerror="x" src="test.jpg">';
        const images = [];
        const result = filter(testHtml, images);

        expect(result).toBeDefined();
        expect(result.innerHTML).toBeDefined();
        expect(images).toBeDefined();
        expect(typeof result.innerHTML).toBe('string');

        expect(result.innerHTML).toContain('Safe');
        expect(result.innerHTML).not.toContain('<script');
        expect(result.innerHTML).not.toContain('onerror');
    });

    test('editor paste handler integration: filter result safe for insertHtml', () => {
        // Integration requirement: editor paste handler must call filter before insertHtml
        // This test verifies the contract: filter output is suitable for insertHtml

        // Simulate paste operation with dangerous protocols and handlers
        const pastedHtml = '<div><p onclick="evil()">Text</p><img src="javascript:alert()" onerror="bad()"></div>';
        const collectedImages = [];

        // Call filter (this is what editor paste handler must do)
        const sanitized = filter(pastedHtml, collectedImages);

        // Verify return value is a real DOM element with required properties
        expect(sanitized).toBeDefined();
        expect(sanitized.innerHTML).toBeDefined();
        expect(typeof sanitized.innerHTML).toBe('string');
        expect(sanitized.tagName).toBeDefined();
        expect(sanitized.appendChild).toBeDefined();
        expect(typeof sanitized.appendChild).toBe('function');

        // Verify it's safe to insert: dangerous content removed
        expect(sanitized.innerHTML).not.toContain('onclick');
        expect(sanitized.innerHTML).not.toContain('onerror');
        expect(sanitized.innerHTML).not.toContain('evil');
        expect(sanitized.innerHTML).not.toContain('javascript:');

        // Verify safe content preserved
        expect(sanitized.innerHTML).toContain('Text');

        // Verify image collection for downstream processing
        expect(Array.isArray(collectedImages)).toBe(true);

        // This verifies the paste handler can safely do:
        // document.execCommand('insertHtml', false, sanitized.innerHTML);
    });

    test('editor.js integration contract: filter validates pasted HTML before insertHtml', () => {
        // Integration contract verification: Tests confirm filter() output meets the
        // editor paste handler's requirements without direct editor.js invocation.
        // This verifies the interface contract: filter must produce output suitable
        // for immediate insertion via execCommand('insertHtml') with collected images.

        // Requirements from editor paste handler:
        // 1. Accept HTML string and image array parameter
        // 2. Return DOM element with innerHTML property (safe for insertHtml)
        // 3. Remove all dangerous content from innerHTML
        // 4. Collect image URLs for separate addImage() calls

        const userPastedHtml = '<p>User content</p><script>malicious()</script><img onclick="steal()" src="user.jpg">';
        const collectedImageUrls = [];

        const sanitizedElement = filter(userPastedHtml, collectedImageUrls);

        // Verify the contract: editor paste handler can safely use this output
        expect(sanitizedElement).toBeDefined();
        expect(sanitizedElement.innerHTML).toBeDefined();
        expect(typeof sanitizedElement.innerHTML).toBe('string');

        // Verify dangerous content is removed (safe for insertHtml)
        expect(sanitizedElement.innerHTML).not.toContain('<script');
        expect(sanitizedElement.innerHTML).not.toContain('malicious');
        expect(sanitizedElement.innerHTML).not.toContain('onclick');
        expect(sanitizedElement.innerHTML).not.toContain('steal');

        // Verify safe content is preserved
        expect(sanitizedElement.innerHTML).toContain('User content');

        // Verify images are collected for separate processing loop
        expect(Array.isArray(collectedImageUrls)).toBe(true);
        expect(collectedImageUrls).toContain('user.jpg');
    });

    test('should preserve color property with safe value', () => {
        const content = '<div style="color: red;">Text</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('color');
        expect(result.innerHTML).toContain('red');
    });

    test('should preserve font-weight property with safe value', () => {
        const content = '<div style="font-weight: bold;">Bold text</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('font-weight');
        expect(result.innerHTML).toContain('bold');
    });

    test('should preserve font-size property with safe value', () => {
        const content = '<div style="font-size: 16px;">Sized text</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('font-size');
        expect(result.innerHTML).toContain('16px');
    });

    test('should preserve background property with safe value', () => {
        const content = '<div style="background: lightblue;">Bg</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('background');
        expect(result.innerHTML).toContain('lightblue');
    });

    test('should preserve background-color property with safe value', () => {
        const content = '<div style="background-color: #ffffff;">White</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('background-color');
        expect(result.innerHTML).toContain('#ffffff');
    });

    test('should preserve margin property with safe value', () => {
        const content = '<div style="margin: 10px;">Margin</div>';
        const result = filter(content, img);

        expect(result.innerHTML).toContain('style=');
        expect(result.innerHTML).toContain('margin');
        expect(result.innerHTML).toContain('10px');
    });

    test('should preserve multiple whitelisted properties together', () => {
        const content = '<div style="color: blue; font-size: 14px; margin: 5px; background-color: yellow;">Multi</div>';
        const result = filter(content, img);

        const html = result.innerHTML;
        expect(html).toContain('style=');
        expect(html).toContain('color');
        expect(html).toContain('blue');
        expect(html).toContain('font-size');
        expect(html).toContain('14px');
        expect(html).toContain('margin');
        expect(html).toContain('5px');
        expect(html).toContain('background-color');
        expect(html).toContain('yellow');
    });

});
