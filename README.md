## 技术栈
> 本工程主要基于react16 + Mobx + Antd + webpack4 + react-router4

## 启动

```
<!--安装前请先确保已安装node和npm-->
npm start               启动项目
npm run precommit       手动触发git提交的钩子函数
npm run build           发布生产版本
npm run analyzer        打包分析
npm run dll             第一次build前需先运行此命令，依赖更新也要
npm run static          打包并在静态服务器运行打包后的文件
npm run lint:style      检查样式代码
npm run lint            eslint
npm run lint:fix        eslint修复
npm run lint-staged     暂存区lint流程
npm run lint-staged:js  暂存区js lint流程
npm run prettier        代码风格格式化
