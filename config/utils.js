const theme = require("../theme.js"); //主题配置
const isDev = process.env.NODE_ENV === 'dev';

module.exports = (modules=true) => ([
  ...isDev ? ['style-loader'] : [],
  {
    loader: 'css-loader',
    options: {
      modules,
      importLoaders: 1,
      ...modules ? {localIdentName: '[local]_[hash:base64:6]'} : {},
      ...!isDev ? {
        minimize: {
          discardComments: {
            removeAll: true
          },
          discardUnused: false,
          mergeIdents: false,
          reduceIdents: false,
          safe: true
        }
      } : {}
    }
  }, {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
      ...!modules ? {
        modifyVars:theme
      } : {}
    }
  }
])