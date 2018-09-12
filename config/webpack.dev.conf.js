const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); //webpack配置文件合并
const ExtendedDefinePlugin = require('extended-define-webpack-plugin'); //全局变量
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html

const baseConfig = require("./webpack.base.conf.js"); //基础配置

module.exports =  merge(baseConfig, {
  mode: 'development', // 设置开发环境

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },

  plugins: [
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
    new ExtendedDefinePlugin({
      //全局变量
      __DEV__: true,
    }),
  ],

  module: {
    rules: [
      {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
      {
        test: /\.less$/,
        include: [path.resolve('src')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // 启用 CSSModules, className={style.xxx}
            options: {
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:6]',
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#531dab',
              },
            }
          }
        ]
      },
    ]
  },

  devtool: 'eval-source-map', // cheap-eval-source-map是一种比较快捷的map,没有映射列

  watchOptions: {
    ignored: path.resolve('node_modules'), // 忽略不用监听变更的目录
    aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll:1000 // 每秒询问的文件变更的次数
  },

  /* 设置api转发 */
  devServer: {
    open:true,
    //port:8080,
    contentBase: path.resolve('dist'), //开发服务运行时的文件根目录
    publicPath:"/",
    quiet:true,
    historyApiFallback:true,
    overlay: true,
    compress: false, // 服务器返回浏览器的时候是否启动gzip压缩
    // proxy:{
    //   '/api': {
    //     target:"https://www.easy-mock.com/mock/5b5a7ae5b14d03439fb7f3f9",
    //     changeOrigin: true,
    //   },
    // }
  },
});
