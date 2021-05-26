const { Tender } = require('../built/src/model/tenderSchema');


describe('Tester', () => {
    it('tender', async () => {
        await Tender.deleteMany({}).exec();
        const tender = new Tender({
            n_tender: 1,
            price: 50000
        })
        const save = await tender.save();
        console.log(save, await Tender.find().exec());
    })
})
