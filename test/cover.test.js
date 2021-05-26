const { Cover } = require('../built/src/model/coverSchema');
const { coverList } = require('../built/src/data/cover');

it('Cover', async () => {
    await Cover.deleteMany({}).exec()
    Cover.create(await coverList());
    console.log(await Cover.find().exec())
})
