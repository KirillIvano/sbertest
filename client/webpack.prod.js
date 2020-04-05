const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            minify: true,
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
            SERVER_ORIGIN: '"http://194.67.113.29:5000"',
            IMAGE_HOST: '"http://194.67.113.29:5000/diagrams"',
        }),
        new CopyWebpackPlugin([
            { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
        ]),
    ],
    mode: 'production',
    watch: true,
    module: {

        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },
};

module.exports = merge(
    require('./webpack.common'),
    prod,
);
