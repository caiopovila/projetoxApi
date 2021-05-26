const { bc } = require('../built/src/bcrypt');


describe('Tester', () => {
    it('bcrypt', async () => {
        console.log(await bc.encryptPassword('caio'), await bc.compare('suplice', '$2b$10$Myktue2uoNOEz6ge/uvHKe572SmG/OBBRC7o9J1QZXeyEIibA7op2'));
    })
});
