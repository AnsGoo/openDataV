# 教程
![](@/assets/logo.png)


![](https://img.shields.io/github/license/AnsGoo/openDataV)
![](https://img.shields.io/github/stars/AnsGoo/openDataV)
![](https://img.shields.io/github/issues/AnsGoo/openDataV)
![](https://img.shields.io/github/forks/AnsGoo/openDataV)

## 简介
  🎃OpenDataV 是一个纯前端的`拖拽式`、`可视化`、`低代码`数据可视化🌈开发平台，你可以用它自由的拼接成各种✨炫酷的大屏，同时支持用户方便的开发自己的组件并接入平台。

## 体验
🧙国外：[http://datav.byteportrait.com/](http://datav.byteportrait.com/)

🧙国内：[http://small_bud_star.gitee.io/datav](http://small_bud_star.gitee.io/datav)

## 源码地址：

🍨github:[https://github.com/AnsGoo/openDataV](https://github.com/AnsGoo/openDataV)

🍨gitee:[https://gitee.com/small_bud_star/DataV](https://gitee.com/small_bud_star/DataV)

gitee 仅做代码同步，issues 或者 PR 请在 github 提交。

目前该项目在不断的完善中，🎉欢迎 issuer,🌹欢迎 start, 🎨欢迎 commit, 🚀欢迎 use...，💪欢迎一切技术交流活动

## 👁️预览

### 🤿 页面编辑

1. 组件添加
![组件添加](screenshot/screenshots2.gif)

2. 组件操作
![组件操作](screenshot/screenshots1.gif)

3. 组件数据配置
![组件数据配置](screenshot/screenshots.gif)


### 🖇️ 接口管理

![](screenshot/API.png)


## 💒功能
- 🎊 编辑器页面基本功能完成，包括编辑、预览、导入、导出、保存
- 🪄 图层的置顶、置底、上下移动、显示、隐藏、复制、剪切、粘贴
- 🖼️ 组件的缩放、旋转、拖动、复制、粘贴、组合、拆分、移除、自动对齐
- 🔮 支持用户操作记录的恢复、撤销功能
- 🧶 支持用户自定义组件
- 📔 支持组件的用户自定组件配置项
- 🏪 支持明暗主题切换
- 🧬 使用Monorepo模式进行组件和依赖管理
- 🧶 组件数据自定义接入
- 🔌 数据动态处理（JS已完成）
- 🖇️ 接口管理(示例数据、静态数据、HTTP接口数据已完成适配)

## 🎢技术点
本项目采用`Vue3` + `vite` + `TypeScript`开发，界面库使用`NaiveUI`，使用面向对象方式封装了路由、请求、存储，组件采用自动扫描注册、异步加载，提升渲染速度；使用IndexDB存储快照数据，减少快照数据内存占用，加快访问速度；组件独立依赖，解耦了组件和基础框架的依赖库，方便后续独立开发组件。

目前仅开发了部分组件，后续还会继续完善。

## ⌛计划功能
- [ ] 组件管理
- [ ] 脚本管理（Python待支持）
- [ ] GraphQL、GRPC、WebScoket、MQTT、SocketIO多种数据接口适配
- [ ] 代码生成
- [ ] 动态文档
- [ ] 全局数据接入

## 💂开发

### 🧊开发环境
| 名称 | 版本    |
| ---- | ------- |
| node | 16.14.x |
| pnpm | 7.9.3   |
| vue  | 3.2.37  |

🚥目前仅在`Chrome`和`Microsoft Edge`最新版浏览器测试过，其他浏览器未测试

### 🎮启动项目

```shell

# 安装依赖
pnpm install
或
pnpm bootstrap

# 运行项目
pnpm dev

# 打包项目
pnpm build
```

## 🧑‍💻代码提交

git commit 信息请按照如下规范进行书写
- feat: 新功能
- fix: 修复 Bug
- docs: 文档修改
- perf: 性能优化
- revert: 版本回退
- ci: CICD 集成相关
- test: 添加测试代码
- refactor: 代码重构
- build: 影响项目构建或依赖修改
- style: 不影响程序逻辑的代码修改
- other: 不属于以上类型的其他类型(日常事务)

## ☎️联系方式

**技术交流，请加微信群**

![weixinqun](https://image.xingxingzaixian.fun/weixinqun.jpg?t=20221019)

**更新动态请关注公众号**

![wechat](https://image.xingxingzaixian.fun/uPic/gongzhonghao.jpg)