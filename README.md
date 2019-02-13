# mobx-admin-kit

## 前言
近日，项目中使用dva+ant完成了一个admin的开发，感觉配置上不够灵活，而且项目总体较臃肿，兼容性不能满足实际需求。于是自己尝试写一套admin的架子，删掉了那些不实用的功能，增加了一切更实用的功能，且提升可维护性。目前已完成：
- UI参考layui、vue-element-admin、ant-design-pro，可实现定制
- 使用 webpack4+babel7作为编译管道，做了打包、编译速度的极致优化，以及静态资源构建优化
- mobx替换掉dva，状态管理更加灵活轻便
- 权限系统重构，运用高阶组件，使其动态且更易维护
- 集成ant-design，并在其基础上扩展了部分定制化功能，用easy-mock做数据模拟
- eslint集成，提交检测
- 兼容ie9及以上（为兼容ie9，mobx使用的是v4）
## 技术栈
react16 + react-router4 + mobx4 + antd + webpack4 + babel7
## 效果
![image](https://github.com/GoatherdNaN/react-mobx-kit/blob/admin/screenshots/page.png?raw=true)
## 目录结构

```
├─assets # 静态文件，包括图片、css之类
├─base # 在ant-design组件基础上扩展的基础组件
├─components #  组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
├─constants #  公用的静态变量，避免硬编码
├─layout #  容器、布局
├─pages # 页面，包含该页面的store
├─store # 数据中心
├─utils # 工具函数库
├─App.js
├─history.js # 分离出history,使可以在非页面js中使用
├─index.js # 入口
├─index.less
└─routes.js # 路由配置
```


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

