const { User } = require('../built/src/model/userSchema');
const { userList } = require('../built/src/data/user');


describe('user', () => {
    it('test user', async () => {
        const usertest = {name: 'caio', password: 'caio', username: 'caio'};
        const u = new User(usertest);
        await u.save();
        console.log(u, await User.find().exec());
        User.deleteMany({}).exec();
        User.create(await userList());
    })
}); 
