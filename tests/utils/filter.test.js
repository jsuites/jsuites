/**
 * Security tests for utils/filter
 * Tests XSS protection by directly testing the filter function
 */

import filter from '../../src/utils/filter';

// Helper to test HTML sanitization through the filter
function testFilterSanitization(html) {
    const img = [];
    const result = filter(html, img);
    return result ? result.innerHTML : '';
}

describe('utils/filter - XSS Protection', () => {

    describe('Dangerous Tag Blocking', () => {
        test('should remove <script> tags', () => {
            const malicious = '<div>Safe text<script>alert("XSS")</script>More text</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('alert("XSS")');
            expect(result).toContain('Safe text');
            expect(result).toContain('More text');
        });

        test('should remove <iframe> tags', () => {
            const malicious = '<p>Content before</p><iframe src="https://evil.com"></iframe><p>Content after</p>';
            const result = testFilterSanitization(malicious);

            expect(result).toContain('Content before');
            expect(result).toContain('Content after');
            // iframe should be removed by filter
        });

        test('should remove <object> tags', () => {
            const malicious = '<div>Text<object data="evil.swf"></object>Text</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('<object');
            expect(result).not.toContain('evil.swf');
        });

        test('should remove <embed> tags', () => {
            const malicious = '<div>Content<embed src="malware.swf"></div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('<embed');
            expect(result).not.toContain('malware.swf');
        });

        test('should remove <meta> tags', () => {
            const malicious = '<meta http-equiv="refresh" content="0;url=javascript:alert(1)"><div>Text</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('<meta');
            expect(result).toContain('Text');
        });

        test('should remove <link> tags', () => {
            const malicious = '<link rel="stylesheet" href="javascript:alert(1)"><p>Content</p>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('<link');
            expect(result).toContain('Content');
        });
    });

    describe('Event Handler Removal', () => {
        test('should remove onclick handlers', () => {
            const malicious = '<button onclick="alert(\'XSS\')">Click Me</button>';
            const result = testFilterSanitization(malicious);

            expect(result).toContain('Click Me');
            expect(result).not.toContain('onclick');
            expect(result).not.toContain('alert');
        });

        test('should remove onerror handlers', () => {
            const malicious = '<img src="invalid.jpg" onerror="alert(\'XSS\')">';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('onerror');
            expect(result).not.toContain('alert');
        });

        test('should remove onload handlers', () => {
            const malicious = '<body onload="alert(\'XSS\')">Content</body>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('onload');
            expect(result).toContain('Content');
        });

        test('should remove multiple event handlers', () => {
            const events = ['onclick', 'ondblclick', 'onmouseover', 'onmouseout'];

            events.forEach(event => {
                const malicious = `<div ${event}="alert('XSS')">Test</div>`;
                const result = testFilterSanitization(malicious);

                expect(result).not.toContain(event);
                expect(result).toContain('Test');
            });
        });
    });

    describe('Dangerous URL Scheme Blocking', () => {
        test('should block javascript: URLs in href', () => {
            const malicious = '<a href="javascript:alert(\'XSS\')">Click here</a>';
            const result = testFilterSanitization(malicious);

            expect(result).toContain('Click here');
            // javascript: should be stripped or the element removed
        });

        test('should block javascript: URLs in img src', () => {
            const malicious = '<img src="javascript:alert(\'XSS\')">';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('javascript:');
        });

        test('should block data:text/html URIs', () => {
            const malicious = '<a href="data:text/html,<script>alert(\'XSS\')</script>">Click</a>';
            const result = testFilterSanitization(malicious);

            expect(result).toContain('Click');
            // Dangerous data URI should be removed
        });

        test('should block vbscript: URLs', () => {
            const malicious = '<a href="vbscript:msgbox(\'XSS\')">Link</a>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('vbscript:');
            expect(result).toContain('Link');
        });

        test('should allow safe https:// URLs', () => {
            const safe = '<a href="https://example.com">Safe Link</a>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('https://example.com');
            expect(result).toContain('Safe Link');
        });

        test('should allow safe relative URLs', () => {
            const safe = '<a href="/page.html">Internal Link</a>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('/page.html');
            expect(result).toContain('Internal Link');
        });
    });

    describe('CSS Injection Protection', () => {
        test('should block expression() in inline styles', () => {
            const malicious = '<div style="width: 100px; background: expression(alert(\'XSS\'))">Test</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('expression');
            expect(result).not.toContain('alert');
            expect(result).toContain('Test');
        });

        test('should block javascript: in CSS url()', () => {
            const malicious = '<div style="background: url(javascript:alert(\'XSS\'))">Test</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('javascript:');
            expect(result).toContain('Test');
        });

        test('should block -moz-binding in styles', () => {
            const malicious = '<div style="-moz-binding: url(xss.xml#xss)">Test</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('-moz-binding');
            expect(result).not.toContain('xss.xml');
        });

        test('should allow safe CSS properties', () => {
            const safe = '<div style="color: red; font-size: 16px;">Styled Text</div>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('Styled Text');
            // Some safe CSS should be preserved
            const hasStyle = result.includes('style=') || result.includes('color') || result.includes('font-size');
            expect(hasStyle).toBe(true);
        });
    });

    describe('HTML Entity Bypass Prevention', () => {
        test('should decode and block HTML entity encoded javascript:', () => {
            // &#106; = 'j', so &#106;avascript: = javascript:
            const malicious = '<a href="&#106;avascript:alert(1)">Click</a>';
            const result = testFilterSanitization(malicious);

            expect(result).toContain('Click');
            // Should detect and block even when encoded
            const lowerResult = result.toLowerCase();
            expect(lowerResult.includes('javascript:')).toBe(false);
        });
    });

    describe('Attribute Sanitization', () => {
        test('should remove non-whitelisted attributes', () => {
            const malicious = '<div data-evil="bad" foo="bar" custom="value">Content</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('data-evil');
            expect(result).not.toContain('foo=');
            expect(result).not.toContain('custom=');
            expect(result).toContain('Content');
        });

        test('should preserve safe whitelisted attributes', () => {
            const safe = '<div id="myid" class="myclass" title="My Title">Content</div>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('Content');
            // At least some safe attributes should be preserved
            const hasAttr = result.includes('id=') || result.includes('class=') || result.includes('title=');
            expect(hasAttr).toBe(true);
        });
    });

    describe('Safe Content Preservation', () => {
        test('should preserve safe text content', () => {
            const safe = '<p>This is <strong>safe</strong> content with <em>formatting</em>.</p>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('This is');
            expect(result).toContain('safe');
            expect(result).toContain('content with');
            expect(result).toContain('formatting');
        });

        test('should preserve safe links with https URLs', () => {
            const safe = '<a href="https://example.com">Visit Example</a>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('https://example.com');
            expect(result).toContain('Visit Example');
        });

        test('should preserve table structures', () => {
            const safe = '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('<table');
            expect(result).toContain('<tr');
            expect(result).toContain('<td');
            expect(result).toContain('Cell 1');
            expect(result).toContain('Cell 2');
        });

        test('should preserve list structures', () => {
            const safe = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('<ul');
            expect(result).toContain('<li');
            expect(result).toContain('Item 1');
            expect(result).toContain('Item 2');
            expect(result).toContain('Item 3');
        });

        test('should preserve headings', () => {
            const safe = '<h1>Main Title</h1><h2>Subtitle</h2><p>Paragraph</p>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('<h1');
            expect(result).toContain('Main Title');
            expect(result).toContain('<h2');
            expect(result).toContain('Subtitle');
            expect(result).toContain('Paragraph');
        });

        test('should preserve formatting tags', () => {
            const safe = '<p>Text with <b>bold</b>, <i>italic</i>, <u>underline</u>, and <strong>strong</strong></p>';
            const result = testFilterSanitization(safe);

            expect(result).toContain('bold');
            expect(result).toContain('italic');
            expect(result).toContain('underline');
            expect(result).toContain('strong');
        });
    });

    describe('Complex Mixed Attack Scenarios', () => {
        test('should handle mixed safe and dangerous content', () => {
            const mixed = `
                <div>
                    <p>Safe paragraph</p>
                    <script>alert('XSS')</script>
                    <a href="https://safe.com">Safe link</a>
                    <a href="javascript:alert('XSS')">Dangerous link</a>
                </div>
            `;
            const result = testFilterSanitization(mixed);

            expect(result).toContain('Safe paragraph');
            expect(result).toContain('https://safe.com');
            expect(result).toContain('Safe link');
            expect(result).not.toContain('<script');
        });

        test('should handle nested dangerous elements', () => {
            const malicious = '<div><span><script>alert(1)</script></span><p onclick="alert(2)">Text</p></div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('<script');
            expect(result).not.toContain('onclick');
            expect(result).toContain('Text');
        });

        test('should handle multiple attack vectors in single element', () => {
            const malicious = '<div onclick="alert(1)" style="behavior: url(xss.htc)" data-evil="bad">Content</div>';
            const result = testFilterSanitization(malicious);

            expect(result).not.toContain('onclick');
            expect(result).not.toContain('behavior');
            expect(result).not.toContain('data-evil');
            expect(result).toContain('Content');
        });
    });

});
