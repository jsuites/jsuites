const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

class MyPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('MyPlugin', (compilation) => {
            // Get the bundled file name
            const fileName = Object.keys(compilation.assets)[1];

            // Get the bundled file content
            const fileContent = compilation.assets[fileName].source();

            const header = `
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jSuites = factory();
}(this, (function () {`;

            const footer = `    return jSuites;
})));`;

            // Updated file content with custom content added
            const updatedFileContent = header + '\n\n' + fileContent + '\n\n' + footer;

            // Replace the bundled file content with updated content
            compilation.assets[fileName] = {
                source: () => updatedFileContent,
                size: () => updatedFileContent.length,
            };
        });
    }
}

module.exports = {
    target: ['web', 'es5'],
    entry: {
        'jsuites': './src/jsuites.js',
    },
    mode: 'production',
    output: {
        library: 'jSuites',
        path: path.resolve(__dirname, 'dist'),
        libraryExport: 'default',
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
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new CopyPlugin({
           patterns: [
               { from: '**/*.d.ts', context: 'src' }
           ]
        }),
        new MyPlugin(),
    ],
    optimization: {
        minimize: true
    },
    devServer: {
        static : {
            directory : path.join(__dirname, "/public/")
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