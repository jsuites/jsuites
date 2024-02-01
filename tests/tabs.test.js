const jSuites = require('../dist/jsuites');

describe('tabs', () => {
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

});