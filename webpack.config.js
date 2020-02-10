const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');
const PROD = process.env.NODE_ENV === 'production';


const rules = [
    {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
    },
    {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
    },
    {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
    }
];

const plugins = [
    new HtmlWebpackPlugin({
        template: 'index.html'
    })
];

let mode = 'development';

if (PROD) {
    mode = 'production';
    plugins.push(
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                mangle: true,
                compress: {
                    booleans: true,
                    conditionals: true,
                    dead_code: true,
                    drop_console: true,
                    drop_debugger: true,
                    evaluate: true,
                    sequences: true,
                    unused: true
                }
            }
        })
    );
}

module.exports = {
    cache: true,
    context: ROOT,
    devServer: {
        contentBase: ROOT,
        historyApiFallback: true,
        stats: {
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            errors: true,
            errorDetails: false,
            hash: false,
            timings: false,
            modules: false,
            warnings: false
        },
        port: 3000
    },
    devtool: PROD ? false : 'source-map',
    entry: {
        index: ['index.ts']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-chunk.js',
        path: DESTINATION
    },
    node: {
        global: true,
    },
    module: {
        rules
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    plugins,
    mode
};