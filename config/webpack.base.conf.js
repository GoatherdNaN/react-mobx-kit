const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack'); //多线程运行
const os = require('os');

var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main'], //npm读取先后方式  jsnext:main 是采用es6模块写法
    extensions: [".js", ".json", ".less"],
    alias: {
      //快捷入口
      asserts: path.resolve('src/asserts'),
      moment$: path.resolve('node_modules/moment/moment.js'),// 为了解决moment.js一个祖传的操蛋警告
      base: path.resolve('src/base'),
      components: path.resolve('src/components'),
      pages: path.resolve('src/pages'),
      utils: path.resolve('src/utils'),
      constants: path.resolve('src/constants'),
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
              name: '[name].[ext]',
              limit: 10*1024,
              outputPath: 'images'
            },
          },
          { // 压缩图片
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            }
          }
        ],
      }
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve('dll', 'manifest.json')
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