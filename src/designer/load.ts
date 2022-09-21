import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
import Group from '@/components/Group'

// 编辑器左侧组件列表
const componentList: Record<string, any> = {}

const AsyncComponent = {
  install: (app: App) => {
    // 注册Group组件
    componentList[Group.componentName] = Group.config
    const AsyncComp = defineAsyncComponent(Group.component)
    app.component(Group.componentName, AsyncComp)

    const moduleFilesTs: any = import.meta.globEager('../resource/components/**/index.ts')
    Object.keys(moduleFilesTs).forEach((key: string) => {
      const componentOptions = moduleFilesTs[key]?.default

      if (componentOptions) {
        componentList[componentOptions.componentName] = componentOptions.config

        // 注册异步组件
        const asyncComp = defineAsyncComponent(componentOptions.component)
        app.component(componentOptions.componentName, asyncComp)
      } else {
        console.error(`${key} is not a valid component`)
      }
    })
  }
}

export { componentList, AsyncComponent }
