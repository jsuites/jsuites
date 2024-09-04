const jSuites = require('../dist/jsuites');

describe('tags', () => {
    test.skip('tags methods', () => {
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv')
        var mudou = false
        let tags = jSuites.tags(div, {
            onchange: function() {
                mudou = true;
            }
        })
        // setar o valor
        tags.setValue("teste");
        expect(mudou).toBeTruthy();
        expect(tags.getValue(0)).toEqual("teste");
        // verificar a variavel mudou
        mudou = false;

    });

    test.skip('tags events', () => {   
        document.body.innerHTML = '<div id="myDiv"></div>';
        let div = document.getElementById('myDiv');

        let removedTags = [];
        
        let tags = jSuites.tags(div, {
            value: 'Canada,US,UK',
            onremoveitem: function(title) {
                removedTags.push(title);
            }
        });


        // programmatically remove the item 'US'
        
        expect(removedTags[0]).toEqual('US');

        expect(tags.getValue().split(';')).not.toContain('US');
    });

});