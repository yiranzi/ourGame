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
            path: path.join(__dirname, "..", "prod", "vinda"),
            filename: "[name].js",
            chunkFilename: "[chunkhash].js"
        },
        plugins: [
            new webpack.optimize.AggressiveSplittingPlugin({
                minSize: 5000,
                maxSize: 10000
            }),
            new webpack.DefinePlugin({
                $$webpack_dev: JSON.stringify(true),
                "process.env.NODE_ENV": JSON.stringify("production")
            }),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                title: 'prod',
                template: 'index.html',
                filename: 'index.html',
                hash: true,
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, "..", "prod", "vinda/vendors-manifest.json")),
                name: 'dll'
            })
        ],
        recordsOutputPath: path.join(__dirname, "..", "prod", "records.json"),
        devtool: false
    }
]);