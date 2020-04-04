const crypto = require('crypto');

const createRandomKey = () =>
    crypto.randomBytes(16).toString('hex');

const createShortRandomKey = () =>
    crypto.randomBytes(8).toString('hex');

module.exports = {
    createRandomKey,
    createShortRandomKey,
};
