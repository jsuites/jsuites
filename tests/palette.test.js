const jSuites = require('../dist/jsuites');

describe('palette', () => {
    test('default palettes', () => {
        let paletteDefault = jSuites.palette()
    
        expect(paletteDefault[0]).toContain('#ffebee')
        expect(paletteDefault[0]).toContain('#fce4ec')
        expect(paletteDefault[1]).toContain('#ffcdd2')
        expect(paletteDefault[2]).toContain('#ef9a9a')

        let paletteFire = jSuites.palette('fire')

        expect(paletteFire[0]).toContain('0b1a6d')
        expect(paletteFire[0]).toContain('ff0c0c')
        expect(paletteFire[1]).toContain('071147')
        expect(paletteFire[2]).toContain('03071e')

        let paletteBaby = jSuites.palette('baby')

        expect(paletteBaby[0]).toContain('eddcd2')
        expect(paletteBaby[0]).toContain('fff1e6')
        expect(paletteBaby[1]).toContain('e1c4b3')
        expect(paletteBaby[2]).toContain('daa990')

        let paletteChart = jSuites.palette('chart')

        expect(paletteChart[0]).toContain('#C1D37F')
        expect(paletteChart[0]).toContain('#4C5454')
        expect(paletteChart[0]).toContain('#FFD275')
        expect(paletteChart[0]).toContain('#66586F')
    });

    test('palette get set', () => {
        jSuites.palette.set('nicolas', [['#000000', '#A6A6A6']])

        expect(jSuites.palette.get('nicolas')[0]).toContain('#000000')
        expect(jSuites.palette.get('nicolas')[0]).toContain('#A6A6A6')
    });
});