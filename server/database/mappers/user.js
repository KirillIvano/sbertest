const {pick} = require('ramda');

const clientFields = ['id', 'name'];

const clientifyUser = user => pick(clientFields, user);

module.exports = {
    clientifyUser,
};
