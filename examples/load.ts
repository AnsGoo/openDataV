import type { BaseComponent } from 'open-data-v/base'
import { useCanvasState } from 'open-data-v/designer'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const canvasState = useCanvasState()
const useLoadComponent = () => {
  return {
    install: (app: App) => {
      // 注册Group组件
      const moduleFilesTs: any = import.meta.glob('../resource/**/index.ts', {
        eager: true
      })
      Object.keys(moduleFilesTs).forEach((key: string) => {
        const componentOptions = moduleFilesTs[key]?.default

        if (componentOptions) {
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
