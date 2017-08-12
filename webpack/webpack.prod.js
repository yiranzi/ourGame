/**
 * webpack config (prod)
 */
const webpackMerge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin  = require('awesome-typescript-loader');

process.env.NODE_ENV = "production"

module.exports = webpackMerge([
    require("./webpack.base"),
    {
        entry: {
            "bundle": path.join(
                __dirname,
                "..",
                "src",
                "entrypoint.tsx"
            )
        },
        output: {
            path: path.join(__dirname, "..", "prod"),
            filename: "[name].js",
        },
        plugins: [
            new webpack.DefinePlugin({
                $$webpack_dev: JSON.stringify(true)
            }),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                title: 'prod',
                template: 'indexICT.html',
                filename: 'indexICT.html',
                hash: true
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, "..", "prod/vendors-manifest.json")),
                name: 'dll'
            })
        ],
        devtool: false
    }
]);