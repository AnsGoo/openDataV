# OpenDataV

OpenDavaV 是仿照阿里 DataV 开发的一款拖拽式大屏应用，采用 `Vue3` + `vite` + `typescripts` 开发，目前项目在完善中,暂不接收需求...

## 实现的功能

- 页面布局的编辑、预览、自定义页面大小、页面文件的导入导出
- 图层的拖动、置顶、置底、上下移动
- 组件的缩放、拖动、复制、粘贴、组合、拆分、自动对齐
- 支持自定义组件的动态加载

## 样图

- 编辑页面

![编辑页面](https://gitee.com/Ranger313/pbed/raw/master/PyPicGo/liunx659382b8af348c9f8ff62d14bd494aa7chenghaiwen20220216191201-Snipaste_2022-02-16_19-07-09.png)

- 大屏效果1

![页面效果1](https://gitee.com/Ranger313/pbed/raw/master/PyPicGo/liunx16e1a311411c29d056c382af9ec29584chenghaiwen20220216193318-Snipaste_2022-02-16_19-24-59.png)

- 大屏效果2

![页面效果1](https://gitee.com/Ranger313/pbed/raw/master/PyPicGo/liunx3e209db87900d3e04a8ec000bc5ddb92chenghaiwen20220216194032-coal.png)

## 预览地址：

[https://ansgoo.github.io/openDataV](https://ansgoo.github.io/openDataV)

可下载 `templates` 文件夹下的`JSON`文件，点击编辑器导入预览已生成的项目

本项目有几个简单的后端用户用户页面存储,采用`Koa`+`Typescripts`开发，地址：[https://github.com/AnsGoo/DataVStore](https://github.com/AnsGoo/DataVStore)

## 启动项目

```shell
git clone git@github.com:AnsGoo/openDataV.git
# 安装依赖
yarn
    @@ -14,6 +23,4 @@ yarn
yarn dev
```

## 
