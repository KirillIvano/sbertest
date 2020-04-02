const path = require('path');

module.exports = {
    entry: './src/index.js',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        exclude: [
                            /node_modules/,
                        ],
                        'presets': ['@babel/env', '@babel/react'],
                        'plugins': ['@babel/plugin-transform-object-assign'],
                    },
                },
            },
        ],
    },
};
