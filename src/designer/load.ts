import { NSpin } from 'naive-ui'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

import Group from '@/components/Group'
import type { CustomComponent } from '@/models'
import { Logger } from '@/utils/utils'

// 编辑器左侧组件列表
const componentList: Record<string, any> = {}

const AsyncComponent = {
  install: (app: App) => {
    // 注册Group组件
    componentList[Group.componentName] = Group.config
    const AsyncComp = defineAsyncComponent({
      loader: Group.component,
      // 加载异步组件时使用的组件
      loadingComponent: NSpin,
      // 展示加载组件前的延迟时间，默认为 200ms
      delay: 200,
      // 如果提供了一个 timeout 时间限制，并超时了
      // 也会显示这里配置的报错组件，默认值是：Infinity
      timeout: 3000
    })
    app.component(Group.componentName, AsyncComp)

    const moduleFilesTs: any = import.meta.glob('../resource/components/**/index.ts', {
      eager: true
    })
    Object.keys(moduleFilesTs).forEach((key: string) => {
      const componentOptions = moduleFilesTs[key]?.default

      if (componentOptions) {
        componentList[componentOptions.componentName] = componentOptions.config as CustomComponent

        // 注册异步组件

        const asyncComp = defineAsyncComponent({
          loader: componentOptions.component,
          delay: 200,
          timeout: 3000
        })
        app.component(componentOptions.componentName, asyncComp)
      } else {
        Logger.error(`${key} is not a valid component`)
      }
    })
  }
}

export { AsyncComponent, componentList }
