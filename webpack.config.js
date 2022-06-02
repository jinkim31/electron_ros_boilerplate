const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sass = require("sass");

module.exports = {
    target: 'electron-renderer',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
        __filename: false
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss?$/,
                exclude: /node_module/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: sass, //dart-sass 적용
                            sassOptions: {},
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: "./public/popout.html",
            filename: "./popout.html"
        }),
        new MiniCssExtractPlugin({filename: '[name].css'})
    ],
    output: {
        path: __dirname + "/build"
    }
}