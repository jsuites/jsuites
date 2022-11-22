const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    target: ['web', 'es5'],
    entry: {
        'jsuites': './src/jsuites.js',
        'jsuites.d.ts': './src/jsuites.d.ts',
    },
    mode: 'production',
    output: {
        library: {
            name: 'jSuites',
            type: 'umd',
            export: [ 'default' ],
        },
        globalObject: 'this',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
       /* new CopyPlugin({
            patterns: [
                { from: '**!/!*.d.ts', context: 'src' }
            ]
        })*/
    ],
    optimization: {
        minimize: false
    },
    devServer: {
        static : {
            directory : path.join(__dirname, "/dist")
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        port: 3007,
        devMiddleware: {
            publicPath: "https://localhost:3000/dist/",
        },
        hot: "only",
    },
    stats: { warnings: false },
}