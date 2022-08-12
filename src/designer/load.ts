import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

// 编辑器左侧组件列表
const componentList: Record<string, any> = {}

const AsyncComponent = {
  install: (app: App) => {
    const moduleFilesTs = import.meta.globEager('../resource/components/**/index.ts')

    Object.keys(moduleFilesTs).forEach((key: string) => {
      const componentOptions = moduleFilesTs[key]?.default
      console.log(componentOptions.componentName)
      if (componentOptions) {
        componentList[componentOptions.componentName] = componentOptions.config

        const name = key.slice(key.lastIndexOf('/') + 1, key.length - 4)
        const AsyncComp = defineAsyncComponent(componentOptions.component)
        app.component(name, AsyncComp)
      } else {
        console.error(`${key} is not a valid component`)
      }
    })
  }
}

export { componentList, AsyncComponent }
