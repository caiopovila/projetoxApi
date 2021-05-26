const { Count } = require('../built/src/model/quotationSchema');


it('Count', async () => {
    await Count.deleteMany({}).exec();
    const q = new Count({
        name: 'user'
    });
    const save = await q.save();
    console.log(save, await Count.find({}).exec());
})
 
