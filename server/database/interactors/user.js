const {UserModel} = require('~/database/models/user');

const getUserByLogin = name => UserModel.findOne({name: name});
const getUserById = id => UserModel.findById(id);

module.exports = {
    getUserByLogin,
    getUserById,
};


