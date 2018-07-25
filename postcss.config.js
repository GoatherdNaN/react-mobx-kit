// postcss 处理配置文件
module.exports = {
  plugins: [require('autoprefixer')({
      'add': true,
      'remove': true,
      'browsers': ['> 1%', 'last 2 versions']
    })]
};
