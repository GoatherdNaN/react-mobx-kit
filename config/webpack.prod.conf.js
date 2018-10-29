const path = require('path');
const merge = require('webpack-merge'); //webpack配置文件合并
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //多线程压缩
// const ManifestPlugin = require('webpack-manifest-plugin'); // 生成静态志愿引用表
const ExtendedDefinePlugin = require('extended-define-webpack-plugin'); //全局变量
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //视图分析webpack情况
// const { ReactLoadablePlugin } =require('react-loadable/webpack') ;
const CopyWebpackPlugin = require('copy-webpack-plugin'); //直接拷贝，比如图片文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html

const baseConfig = require('./webpack.base.conf'); //基础配置
const getLessConfig = require("./utils.js");


const plugins = [
  //压缩，生成map
  new UglifyJsPlugin({
    sourceMap: true,
    parallel: 4,
    cache: true,
    uglifyOptions: {
      output: {
        comments: false,
        beautify: false
      }
    },
    exclude: /(node_modules|bower_components)/
  }),
  new optimizeCss({
    assetNameRegExp: /\.style\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  }),
  new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry:  false
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve('dll'),
      to: path.resolve('dist'),
      ignore: ['*.html']
    }
  ]),
  new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    template: path.resolve('dll/index.html'), //源html
    minify: {
      collapseWhitespace: true,
    }
  }),
  new MiniCssExtractPlugin({
    //css添加hash
    filename: 'css/[name]-[hash].css',
    chunkFilename: 'css/[id][hash].css'
  }),
  new ExtendedDefinePlugin({
    //全局变量
    __DEV__: false
  }),
  // new ManifestPlugin({
  //   fileName: 'asset-manifest.json'
  // }),
  // new ReactLoadablePlugin({
  //   filename: path.resolve('dist/react-loadable.json'),
  // }),
];
if(+process.env.ANALYZE) {
  plugins.push(//分析依赖
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  )
}


module.exports = merge(baseConfig, {
  mode: 'production', // 设置生产环境

  output: {
    path: path.resolve('dist'), //出口路径
    filename: 'js/[name].[chunkhash:5].js', //出口文件名称
    chunkFilename: 'js/[name].[chunkhash:5].js', //按需加载名称
    publicPath: '/', //公共路径,发布CDN将其改为服务器绝对路径
  },

  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.less$/,
        include: path.resolve('src'),
        use: [
          MiniCssExtractPlugin.loader, 
          ...getLessConfig()
        ]
      }, {
        test: /\.less$/,
        include: path.resolve('node_modules/antd'),
        use: [
          MiniCssExtractPlugin.loader, 
          ...getLessConfig(true)
        ]
      }
    ]
  },

  devtool: false,

  performance: {
    maxEntrypointSize: 250000, //入口文件大小，性能指示
    maxAssetSize: 250000, //生成的最大文件
    hints: false, //依赖过大是否错误提示
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith('.js');
    // }
  },

  optimization: {
    sideEffects: false,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        common: {
          name: 'common',
          test: /node_modules/,
          chunks: 'initial',
          priority: -10,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /(\.less|\.css)$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [new optimizeCss({})],
  }
});
