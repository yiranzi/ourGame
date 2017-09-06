/**
 * webpack config (prod)
 */
const webpackMerge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin  = require('awesome-typescript-loader');

process.env.NODE_ENV = "dev"

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
            filename: "vinda/[name].js",
        },
        plugins: [
            new webpack.DefinePlugin({
                $$webpack_dev: JSON.stringify(true),
                "process.env.NODE_ENV": JSON.stringify("testing")
            }),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                title: 'prod',
                template: 'index.html',
                filename: 'indexVinda.html',
                hash: true,
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, "..", "prod", "vinda/vendors-manifest.json")),
                name: 'dll'
            })
        ],
        devtool: false
    }
]);