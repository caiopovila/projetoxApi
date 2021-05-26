const { Cover } = require('../built/src/model/coverSchema');
const { User } = require('../built/src/model/userSchema');
const { Quotation } = require('../built/src/model/quotationSchema');


it('Quotation', async () => {
    await Quotation.deleteMany({}).exec();
    const q = new Quotation({
        id_user: '60abefa3d3316c5ddedcd461',
        name: 'marta',
        cpf: '00000000000',
        initiate: Date.now() + 24 * 61 * 60 * 1000,
        finish: '10/07/2026',
        value: 30000,
        cover: '60ad6de3e141831f088db01e'
    });
    const save = await q.save();
    console.log(q, save, await Quotation.find({}).populate('id_user').populate('cover').exec());
})
