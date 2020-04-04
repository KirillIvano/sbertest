const {UserModel} = require('~/database/models/user');
const {clientifyUser} = require('~/database/mappers/user');

const getUserByLogin = name => UserModel.findOne({name: name});
const getUserById = id => UserModel.findById(id);

const loginUser = async (name, password) => {
    const user = await getUserByLogin(name);
    if (!user) throw {error: 'user'};

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw {error: 'password'};

    return user;
};

const createUser = async (name, password) => {
    const user = new UserModel({name});
    await user.setPassword(password);
    const userDoc = user.save();

    return clientifyUser(userDoc);
};

module.exports = {
    getUserByLogin,
    getUserById,
    loginUser,
    createUser,
};


