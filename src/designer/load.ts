import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

// 编辑器左侧组件列表
const componentList: Record<string, any> = {}

const AsyncComponent = {
  install: (app: App) => {
    const moduleFilesTs: any = import.meta.globEager('../resource/components/**/index.ts')

    Object.keys(moduleFilesTs).forEach((key: string) => {
      const componentOptions = moduleFilesTs[key]?.default
      console.log('key', moduleFilesTs[key])
      if (componentOptions) {
        componentList[componentOptions.componentName] = componentOptions.config

        const AsyncComp = defineAsyncComponent(componentOptions.component)
        app.component(componentOptions.componentName, AsyncComp)
      } else {
        console.error(`${key} is not a valid component`)
      }
    })
  }
}

export { componentList, AsyncComponent }
