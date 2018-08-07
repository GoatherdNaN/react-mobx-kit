const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件

module.exports = {
  entry: {
    vendor: [
      "mobx",
      "mobx-react",
      "react",
      "react-dom",
      "react-router",
			"react-loadable"
    ]
  },
  output: {
    path: path.resolve('dist/dll'), //出口路径
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/dll'], {
        root: path.join(__dirname, '..'),
        verbose: true,
        dry:  false
    }),
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve('dist', 'dll', 'manifest.json'),
      context: path.resolve(__dirname,'../')
    }),
  ]
};
