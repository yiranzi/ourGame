/**
 * Common setting for all webpack build
 */
const path = require("path");
const webpack = require("webpack");
const Visualizer = require("webpack-visualizer-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const extractLess = new ExtractTextPlugin({
    filename: "app.css",
    allChunks: true
});

module.exports = {
    resolve: {
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
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
            // load ts/tsx with awesome-typescript-loader
            {
                test: /\.tsx?$/,
                use: {
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: process.env.NODE_ENV === "production" ? "tsconfig.webpack.prod.json" : "tsconfig.webpack.json",
                        // FIXME: needed for HMR but conflicts with `rootDir` in tsconfig.json
                        transpileOnly: true,
                        isolatedModules: true,
                        babelOptions: {
                            "presets": ["react", "es2015"],
                            "plugins": [
                              ["import", [{ "libraryName": "antd-mobile", "style": true }, { "libraryName": "antd", "style": true }]]
                            ]
                        }
                    }
                }
            },
            {
                test: /\.css/,
                exclude: /(src)/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, 
                        {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less/,
                exclude: /(node_modules|bower_components)/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]"
                        }, 
                        {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less/,
                exclude: /(src)/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, 
                        {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)(\?.*)?$/,
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
        extractLess,
        new Visualizer()
    ]
};
