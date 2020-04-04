const mongoose = require('mongoose');

const {createPasswordHash} = require('~/helpers/passwordHash');
const {createRandomKey} = require('~/helpers/createRandomKey');

const {DiagramSchema} = require('~/database/models/diagram');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    diagrams: {
        type: [DiagramSchema],
        default: () => [],
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

UserSchema.methods.setPassword = async function(password){
    const passwordSalt = createRandomKey();
    this.passwordHash = await createPasswordHash(password, passwordSalt);
    this.passwordSalt = passwordSalt;
};

UserSchema.methods.validatePassword = async function(password) {
    const hash = await createPasswordHash(password, this.passwordSalt);
    return this.passwordHash === hash;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel,
};
