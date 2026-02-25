const jSuites = require('../dist/jsuites');

describe('tabs', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('tabs methods', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        let tabs = jSuites.tabs(div, {
            animation: true,
            data: [
                {
                    title: 'Tab 1',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.',
                },
                {
                    title: 'Tab 2',
                    content: 'Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
                },
            ],
            padding: '10px',
        })
        expect(document.body.innerHTML).toContain("Tab 1")
        expect(document.body.innerHTML).toContain("Tab 2")
        expect(document.body.innerHTML).toContain("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.")
        expect(document.body.innerHTML).toContain("Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.")

    });
    test.skip('tabs methods', () =>{
        document.body.innerHTML = '<div id="myDiv"></div>';
    let div = document.getElementById('myDiv')
    let tabs = jSuites.tabs(div, {
        animation: true,
        data: [
            {
                title: 'Tab 1',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ornare dolor, tincidunt posuere ante. Sed sed lacinia lorem. In gravida tempus erat vel auctor. Quisque pharetra, metus nec congue rutrum, ligula nibh euismod nisl, at semper tortor magna a velit. Sed ut elit hendrerit, mollis velit ac, maximus justo. Aliquam erat volutpat. Duis quis dolor ultricies, laoreet dolor a, lacinia enim. Aliquam convallis sit amet urna vitae vestibulum.',
            },
            {
                title: 'Tab 2',
                content: 'Praesent non pellentesque nunc. Nam imperdiet odio ut enim molestie elementum. Proin aliquet, eros in aliquet condimentum, diam quam mollis sem, ullamcorper dapibus diam lorem at eros. Duis at ligula at sem elementum cursus. Curabitur cursus quis sapien sit amet vestibulum. Proin quis mattis elit. Ut laoreet lorem ac elit scelerisque efficitur. Praesent quis nunc quis eros bibendum lacinia. Suspendisse mattis scelerisque tellus at venenatis. Duis lobortis dui laoreet, faucibus sapien vel, pharetra lorem. Ut id libero quis arcu congue pulvinar. Donec felis nibh, imperdiet eget erat ac, pretium egestas eros.',
            },
        ],
        padding: '10px',
    })
    tabs.remove(0)
    expect(document.body.innerHTML).not.toContain("Tab 1")
    expect(document.body.innerHTML).toContain("Tab 2")
    tabs.rename(0,"Tab one")
    expect(document.body.innerHTML).not.toContain("Tab 2")
    expect(document.body.innerHTML).toContain("Tab one")

});

    test('tabs destroy removes classes and references', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        let tabs = jSuites.tabs(div, {
            animation: true,
            data: [
                { title: 'Tab 1', content: 'Content 1' },
                { title: 'Tab 2', content: 'Content 2' },
            ],
        });

        // Verify tabs was created
        expect(div.classList.contains('jtabs')).toBe(true);
        expect(div.tabs).toBe(tabs);
        expect(document.querySelector('.jtabs-headers')).not.toBeNull();
        expect(document.querySelector('.jtabs-content')).not.toBeNull();

        // Destroy
        tabs.destroy();

        // Verify cleanup
        expect(div.classList.contains('jtabs')).toBe(false);
        expect(div.classList.contains('jtabs-animation')).toBe(false);
        expect(div.tabs).toBeUndefined();
        expect(document.querySelector('.jtabs-headers')).toBeNull();
        expect(document.querySelector('.jtabs-content')).toBeNull();
    });

    test('tabs destroy after navigation works correctly', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');
        let tabs = jSuites.tabs(div, {
            data: [
                { title: 'Tab 1', content: 'Content 1' },
                { title: 'Tab 2', content: 'Content 2' },
                { title: 'Tab 3', content: 'Content 3' },
            ],
        });

        // Navigate tabs
        tabs.open(1);
        expect(tabs.getActive()).toBe(1);
        tabs.open(2);
        expect(tabs.getActive()).toBe(2);

        // Destroy should work without errors
        expect(() => tabs.destroy()).not.toThrow();
        expect(div.tabs).toBeUndefined();
    });

    test('tabs multiple create/destroy cycles', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');

        for (let i = 0; i < 10; i++) {
            let tabs = jSuites.tabs(div, {
                data: [
                    { title: 'Tab 1', content: 'Content 1' },
                    { title: 'Tab 2', content: 'Content 2' },
                ],
            });

            expect(div.classList.contains('jtabs')).toBe(true);
            expect(div.tabs).toBeDefined();

            tabs.destroy();

            expect(div.classList.contains('jtabs')).toBe(false);
            expect(div.tabs).toBeUndefined();
        }
    });

});