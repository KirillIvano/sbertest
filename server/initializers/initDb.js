const mongoose = require('mongoose');
const devConfig = require('~/configs/database/dev');
const prodConfig = require('~/configs/database/prod');

if (process.env.NODE_ENV==='production'){
    mongoose.connect(prodConfig.uri, prodConfig.options);
} else {
    mongoose.connect(devConfig.uri, devConfig.options);
}

const gracefulShutdown = (msg, callback) => {
    console.log(msg);
    mongoose.connection.close(() => {
        callback();
    });
};

process.on('SIGINT', () => {
    gracefulShutdown('Process terminated', () => {
        process.exit(0);
    });
});
