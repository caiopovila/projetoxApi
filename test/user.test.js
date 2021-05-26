const { User } = require('../built/src/model/userSchema');
const { userList } = require('../built/src/data/user');


it('test user', async () => {
    User.deleteMany({}).exec();
    User.create(await userList());
    console.log(await User.find().exec());
}) 
