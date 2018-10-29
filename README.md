# mobx-admin-kit

## 前言
近日，项目中使用dva+ant完成了一个admin的开发，感觉配置上不够灵活，而且项目总体较臃肿，兼容性不能满足实际需求。于是自己尝试写一套admin的架子。这只是一个demo，所以路由、页面都是简易型，目前已完成：
- 使用 webpack4+babel7作为编译管道，做了打包、编译速度的极致优化，以及静态资源构建优化
- mobx替换掉dva，状态管理更加灵活轻便
- 权限系统优化，动态且更易维护
- 集成ant-design，easy-mock做数据模拟
- eslint集成，提交检测
- 兼容ie9及以上（为兼容ie9，mobx使用的是v4）
## 技术栈
react16 + react-router4 + mobx4 + antd + webpack4 + babel7


## 使用说明
- 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```
$ npm install
```
- 首次编译，先执行打包dll
```
$ npm run dll
```

- 启动服务器
```
$ npm run dev
```
然后你可以在localhost:8080查看效果
