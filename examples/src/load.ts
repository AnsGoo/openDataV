import type { BaseComponent } from '@open-data-v/base'
import { useCanvasState } from '@open-data-v/designer'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

import components from '../../resources/components'

const canvasState = useCanvasState()
const useLoadComponent = () => {
  return {
    install: (app: App) => {
      // 注册Group组件
      const moduleFilesTs: any = import.meta.glob('../../resource/**/index.ts', {
        eager: true
      })
      Object.keys(moduleFilesTs).forEach((key: string) => {
        const componentOptions = moduleFilesTs[key]?.default

        if (componentOptions) {
          const { componentName, config, mainfest, component } = componentOptions
          const name = mainfest ? mainfest.name : componentName
          canvasState.loadComponent(name, config as BaseComponent, mainfest)
          // 注册异步组件
          const asyncComp = defineAsyncComponent({
            loader: component,
            delay: 200,
            timeout: 3000
          })
          app.component(name, asyncComp)
        } else {
          console.error(`${key} is not a valid component`)
        }
      })
    }
  }
}

const useAsyncLoadComponent = () => {
  return {
    install: (app: App) => {
      // 注册Group组件
      const keys = Object.keys(components)
      keys.forEach((el) => {
        const pkg = components[el]
        const { mainfest, panel, component } = pkg
        const asyncComp = defineAsyncComponent({
          loader: component,
          delay: 200,
          timeout: 3000
        })
        canvasState.loadComponents(mainfest.name, mainfest, panel)
        app.component(mainfest.name, asyncComp)
      })
    }
  }
}

export { useAsyncLoadComponent, useLoadComponent }
