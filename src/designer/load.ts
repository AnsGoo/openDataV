import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
import type { ComponentOptions } from '@/types/component'
import { commonStyle, commonAttr, commonComponent } from './interface'

const AsyncComponent = {
  install: (app: App) => {
    const modules = import.meta.glob('../components/**/*.vue')
    Object.keys(modules).forEach((key: string) => {
      // 挂载全局组件
      const name = key.slice(key.lastIndexOf('/') + 1, key.length - 4)
      const AsyncComp = defineAsyncComponent(modules[key])
      app.component(name, AsyncComp)
    })
  }
}
// 编辑器左侧组件列表
const componentList: Record<string, ComponentOptions> = {}

const createComponentList = () => {
  const moduleFilesTs = import.meta.globEager('../components/**/config.ts')
  Object.keys(moduleFilesTs).forEach((key: string) => {
    const componentOptions = moduleFilesTs[key]?.default

    if (componentOptions) {
      componentOptions.style = [...commonStyle, ...componentOptions.style]
      componentOptions.attrs = [...commonAttr, ...componentOptions.attrs]
      componentOptions.component = { ...commonComponent, ...componentOptions.component }
      componentOptions.component.style = {
        rotate: 0,
        opacity: 1,
        ...componentOptions.component.style
      }
      componentList[componentOptions.component.component] = componentOptions
    } else {
      console.error(`${key} is not a valid component`)
    }
  })
  return componentList
}

// 创建组件列表
createComponentList()

export { componentList, AsyncComponent }
