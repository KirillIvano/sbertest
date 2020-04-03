const mongoose = require('mongoose');

const {createPasswordHash} = require('~/helpers/passwordHash');
const {createRandomKey} = require('~/helpers/createRandomKey');

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },
    passwordSalt: {
        type: String,
        required: true,
    },
});

UserModel.methods.setPassword = async function(password){
    const passwordSalt = createRandomKey();
    this.passwordHash = await createPasswordHash(password, passwordSalt);
    this.passwordSalt = passwordSalt;
};

UserModel.methods.validatePassword = async function(password) {
    const hash = await createPasswordHash(password, this.passwordSalt);
    return this.passwordHash === hash;
};

const AdminModel = mongoose.model('admin', UserModel);

module.exports = {
    AdminModel,
};
