/**
 * Common setting for all webpack build
 */
const path = require("path");
const webpack = require("webpack");
const Visualizer = require("webpack-visualizer-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'containers': path.resolve(__dirname, '../src/containers'),
            '@': path.resolve(__dirname, '../src')
        }
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
            },
            {
                test: /\.less/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: path.resolve(__dirname, '../dev/img/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(mp3)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        name: path.resolve(__dirname, '../dev/audio/[name].[hash:7].[ext]')
                    }
                }
            }
        ]
    },
    plugins: [
        new Visualizer(),
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true
        })
    ]
};
