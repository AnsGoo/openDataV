![](./public/logo.png)


![](https://img.shields.io/github/license/AnsGoo/openDataV)
![](https://img.shields.io/github/stars/AnsGoo/openDataV)
![](https://img.shields.io/github/issues/AnsGoo/openDataV)
![](https://img.shields.io/github/forks/AnsGoo/openDataV)

## 简介
🎃OpenDataV 是一个纯前端的`拖拽式`、`可视化`、`低代码`数据可视化🌈开发平台，你可以用它自由的拼接成各种✨炫酷的大屏，同时支持用户方便的开发自己的组件并接入平台。

## 体验
🧙国外：[http://datav.byteportrait.com/](http://datav.byteportrait.com/)

🧙文档: [https://datav.byteportrait.com/#/docs/quick-satrt/quick-start](https://datav.byteportrait.com/#/docs/quick-satrt/quick-start)


## 源码地址：

🍨github: [https://github.com/AnsGoo/openDataV](https://github.com/AnsGoo/openDataV)

🍨gitee: [https://gitee.com/small_bud_star/OpenDataV](https://gitee.com/small_bud_star/OpenDataV)


## 组件包介绍

|npm包| 名称       | 用途                                             |
|--|----------|------------------------------------------------|
|@open-data-v/base| 基础公共包    | open-data-v 公共基础包                              |
|@open-data-v/designer| 页面设计器组件包 | 给open-data-v 提供页面编辑和预览能力                       |
|@open-data-v/scripts| 数据处理基础包  | 给open-data-v 提供多样化的数据预处理方式，例如自定义脚本和远程脚本        |
|@open-data-v/data| 数据加载基础包  | 给open-data-v提供多样化的数据加载方式。例如HTTP、Websocket、MQTT |
|@open-data-v/ui| 默认UI库    | 用于提供open-data-v基本的UI组件                         |

目前该项目在不断的完善中，🎉欢迎 issuer,🌹欢迎 start, 🎨欢迎 commit, 🚀欢迎 use...，💪欢迎一切技术交流活动

## 👁️预览

### 🤿 页面编辑

1. 组件添加
   ![screenshots2.gif](https://s2.loli.net/2022/10/31/nApiFm7PogI1dHS.gif)

2. 组件操作
   ![screenshots1.gif](https://s2.loli.net/2022/10/31/9lkiR15sVMLapIe.gif)

3. 组件数据配置
   ![screenshots.gif](https://s2.loli.net/2022/10/31/28lf6NK35EaY9wJ.gif)


## 💒功能
- 🎊 编辑器页面基本功能完成，包括编辑、预览、导入、导出、保存
- 🪄 图层的置顶、置底、上下移动、显示、隐藏、复制、剪切、粘贴
- 🖼️ 组件的缩放、旋转、拖动、复制、粘贴、组合、拆分、移除、自动对齐
- 🔮 支持用户操作记录的恢复、撤销功能
- 🧶 支持用户自定义组件
- 📔 支持组件的用户自定组件配置项
- 🏪 支持明暗主题切换
- 🧶 支持自定义数据加载方式
- 🔌 支持从远程脚本自定义脚本的数据预处理

## 💂开发

```shell
npm install @open-data-v/base @open-data-v/designer @open-data-v/scripts @open-data-v/data @open-data-v/ui

```

### 注册全局指令和插件
```typescript

// 注册全局指令和插件
import '@open-data-v/ui/style'
import '@open-data-v/designer/style'
import '@open-data-v/data/style'
import '@open-data-v/scripts/style'

import { Directive, useComponentPlugin } from '@open-data-v/designer'
const componentPlugin = useComponentPlugin()

app.use(Directive)
app.use(AsyncComponent)
```

### 加载编辑器组件列表

```typescript

// 组件加载器
import type { BaseComponent } from '@open-data-v/base'
import { useCanvasState } from '@open-data-v/designer'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const canvasState = useCanvasState()
const useLoadComponent = () => {
  return {
    install: (app: App) => {
      // 注册Group组件 glob函数后面的 为组件包路径
      const moduleFilesTs: any = import.meta.glob('../../resource/**/index.ts', {
        eager: true
      })
      Object.keys(moduleFilesTs).forEach((key: string) => {
        const componentOptions = moduleFilesTs[key]?.default

        if (componentOptions) {
          // 加载组件
          canvasState.loadComponent(
            componentOptions.componentName,
            componentOptions.config as BaseComponent
          )
          // 注册异步组件
          const asyncComp = defineAsyncComponent({
            loader: componentOptions.component,
            delay: 200,
            timeout: 3000
          })
          app.component(componentOptions.componentName, asyncComp)
        } else {
          console.error(`${key} is not a valid component`)
        }
      })
    }
  }
}

export { useLoadComponent }


// 全局注册
// main.ts

const AsyncComponent = useLoadComponent()
app.use(componentPlugin)
```


### 使用页面设计器


```vue
<template>
  <Designer ref="designer" />
</template>

<script setup lang="ts">
import { StaticKey, useEventBus } from '@open-data-v/base'
import { Designer, useCanvasState, useDataState, useScriptState } from '@open-data-v/designer'
import { CustomScriptPlugin, SystemScriptPlugin } from '@open-data-v/scripts'
import { useRoute, useRouter } from 'vue-router'
import {
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
} from '@open-data-v/data'

const scriptState = useScriptState()
const canvasState = useCanvasState()

const dataState = useDataState()
// 加载脚本插件
scriptState.loadPlugins([CustomScriptPlugin, SystemScriptPlugin])

useEventBus(StaticKey.STDOUT, (event) => {
  const stdout = event as { type: string; name: string; message: any }
  console.log(stdout)
})



// 加载数据插件
dataState.loadPlugins([
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
])
  
</script>

```


### 使用页面预览器

```vue

<template>
  <Previewer ref="designer" />
</template>

<script setup lang="ts">
import { StaticKey, useEventBus } from '@open-data-v/base'
import { Previewer, useCanvasState, useDataState, useScriptState } from '@open-data-v/designer'
import { CustomScriptPlugin, SystemScriptPlugin } from '@open-data-v/scripts'
import { useRoute, useRouter } from 'vue-router'
import {
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
} from '@open-data-v/data'

const scriptState = useScriptState()
const canvasState = useCanvasState()

const dataState = useDataState()
// 加载脚本插件
scriptState.loadPlugins([CustomScriptPlugin, SystemScriptPlugin])

useEventBus(StaticKey.STDOUT, (event) => {
  const stdout = event as { type: string; name: string; message: any }
  console.log(stdout)
})

// 加载数据插件
dataState.loadPlugins([
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
])

```












