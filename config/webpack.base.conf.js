const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html
const HappyPack = require('happypack'); //多线程运行

var happyThreadPool = HappyPack.ThreadPool({ size: 4 });

module.exports = {
  entry: './src/index.js',
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main'], //npm读取先后方式  jsnext:main 是采用es6模块写法
    extensions: [".js", ".json", ".less"],
    alias: {
      //快捷入口
      assets: path.resolve('src/assets'),
      moment$: path.resolve('node_modules/moment/moment.js'),// 为了解决moment.js一个祖传的操蛋警告
    },
  },
  module: {
    // noParse: /node_modules\/(moment\.js)/, //不解析
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, //排除
        include: [path.resolve('src')], //包括
        loader: 'happypack/loader?id=babel&&cacheDirectory=true',
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude: /(node_modules|bower_components)/,
        include: [path.resolve('src')],
        use: [
          {
            loader: 'url-loader', //limit 图片大小的衡量，进行base64处理
            options: {
              // name: '[path][name].[ext]',
              limit: 10000,
              outputPath: "images"
            },
          },
        ],
      },
    ],
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
    new HappyPack({
      //多线程运行 默认是电脑核数-1
      id: 'babel', //对于loaders id
      loaders: ['cache-loader', 'babel-loader?cacheDirectory'], //是用babel-loader解析
      threadPool: happyThreadPool,
      verboseWhenProfiling: true, //显示信息
    }),
  ],
};
