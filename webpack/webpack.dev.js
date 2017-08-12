/**
 * webpack config (dev)
 */
const webpackMerge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            path: path.join(__dirname, "..", "dev"),
            filename: "[name].js",
            sourceMapFilename: "[name].map"
        },
        devServer: {
            contentBase: path.join(__dirname, "..", "dev"),
            compress: true,
            historyApiFallback: true,
            port: 9000,
            disableHostCheck: true
        },
        plugins: [
            new webpack.DefinePlugin({
                $$webpack_dev: JSON.stringify(true)
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'dev',
                template: 'indexICT.html',
                filename: 'indexICT.html',
                hash: true

            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, "..", "dev/vendors-manifest.json")),
                name: 'dll'
            })
        ],
        devtool: "source-map"
    }
]);