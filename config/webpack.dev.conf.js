const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); //webpack配置文件合并
const ExtendedDefinePlugin = require('extended-define-webpack-plugin'); //全局变量

const baseConfig = require("./webpack.base.conf.js"); //基础配置

module.exports =  merge(baseConfig, {
  mode: 'development', // 设置开发环境

  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'js/[name].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.DllReferencePlugin({
      // context: __dirname,
      manifest: path.resolve('dll', 'manifest.json')
    }),
    new ExtendedDefinePlugin({
      //全局变量
      __LOCAL__: true,
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

  devtool: 'cheap-eval-source-map', // cheap-eval-source-map是一种比较快捷的map,没有映射列

  watchOptions: {
    ignored: path.resolve('node_modules'), // 忽略不用监听变更的目录
    // aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    // poll:1000 // 每秒询问的文件变更的次数
  },

  /* 设置api转发 */
  devServer: {
    open:true,
    //port:8080,
    hot:true,
    inline:true,
    contentBase: path.join(__dirname, 'dist'), //开发服务运行时的文件根目录
    publicPath:"/",
    quiet:true,
    historyApiFallback:true,
    proxy:{
      "/api/":{
          target:"http://localhost:2620",
          secure: false,
          changeOrigin:true
      }
    }
  },
});
