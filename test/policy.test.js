const { Policy } = require('../built/src/model/policySchema'); 


describe('Tester', () => {
    it('policy', async () => {
        await Policy.deleteMany().exec()
        const policy = new Policy({
            n_policy: 1
        })
        const save = await policy.save()
        
        console.log(save, await Policy.find().exec())
    })
})
