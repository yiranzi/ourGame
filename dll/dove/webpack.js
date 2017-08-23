/**
 * Common setting for all webpack build
 */
const path = require("path");
const webpack = require("webpack");
const Visualizer = require("webpack-visualizer-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    entry: {
        "bundle": path.join(
            __dirname,
            "_dove_.init.js"
        )
    },
    output: {
        path: path.join(__dirname),
        filename: "_dove_.js",
    },
    module: {
        rules: [
            // load ts/tsx with ts-loader
            {
                test: /\.tsx?$/,
                use: {
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: process.env.NODE_ENV === "production" ? "tsconfig.webpack.prod.json" : "tsconfig.webpack.json",
                        // FIXME: needed for HMR but conflicts with `rootDir` in tsconfig.json
                        transpileOnly: true,
                        isolatedModules: true
                    }
                }
            }
        ]
    },
    devtool: false
};
