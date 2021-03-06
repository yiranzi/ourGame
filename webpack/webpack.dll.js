const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
    entry: {
        vendors: ['react', 'react-dom', 'unfetch', "mobx", "mobx-react", "react-router-dom"]
    },

    output: {
        filename: '[name]-dll.js',
        path: path.join(__dirname, "..", "dev"),
        library: 'dll'
    },

    plugins: [
        new webpack.DllPlugin({
            context: __dirname, // 必填项，用来标志manifest中的路径
            path: path.join(__dirname, "..", "dev/vendors-manifest.json"),
            name: 'dll' // 必填项，manifest的name
        })
    ],
    devtool: false
}