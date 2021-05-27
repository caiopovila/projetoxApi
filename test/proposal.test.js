const { Proposal } = require('../built/src/model/proposalSchema');


describe('Tester', () => {
    it('proposal', async () => {
        await Proposal.deleteMany({}).exec();
        const proposal = new Proposal({
            n_proposal: 1,
            price: 50000
        })
        const save = await proposal.save();
        console.log(save, await Proposal.find().exec());
    })
})
