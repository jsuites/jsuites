const jSuites = require('../dist/jsuites');

describe('notification', () => {
    test('notification instance', () => {
        document.body.innerHTML = '<div></div>';
        
        jSuites.notification({
            title: 'Nova notificação!',
            message: 'Você recebeu uma notificação.'
        })
        
        expect(document.body.innerHTML).toContain('jnotification')
        expect(document.body.innerHTML).toContain('Você recebeu uma notificação.')
        expect(document.body.innerHTML).toContain('Nova notificação!')
    });
});