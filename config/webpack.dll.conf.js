const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html

module.exports = {
  entry: {
    vendor: [
      "mobx",
      "mobx-react",
      "react",
      "react-dom",
      "react-router",
			"react-loadable",
      "react-router-config"
    ]
  },
  output: {
    path: path.resolve('dll'), //出口路径
    filename: '[name].dll.[hash].js',
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin(['dll'], {
        root: path.join(__dirname, '..'),
        verbose: true,
        dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'my admin',
      inject: 'body',
      filename: 'index.html',
      template: path.resolve('./index.html'), //源html
      favicon: path.resolve('favicon.ico'),
      minify: {
        collapseWhitespace: true,
      }
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve('dll/manifest.json'),
      context: __dirname
    }),
  ]
};
