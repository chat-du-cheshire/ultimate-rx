
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rules = [
    { test: /\.html$/, loader: 'html-loader' },
];

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
];

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            mangle: {
                screw_ie8: true
            },
            compress: {
                unused: true,
                dead_code: true,
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true,
                sequences: true,
                booleans: true,
                screw_ie8: true,
                warnings: false
            },
            comments: false
        })
    );
} else {
    rules.push({
        test: /\.ts$/,
        loaders: [
            'awesome-typescript-loader'
        ]
    });
    plugins.push(
        new webpack.NamedModulesPlugin()
    );
}

module.exports = {
    cache: true,
    context: __dirname,
    devServer: {
        contentBase: __dirname,
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
        publicPath: './dist/',
        port: 3000
    },
    devtool: 'source-map',
    entry: {
        app: ['./src/index.ts']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-chunk.js',
        publicPath: './dist/',
        path: path.resolve(__dirname, 'dist')
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
            'src',
            'node_modules'
        ]
    },
    plugins,
    mode
};