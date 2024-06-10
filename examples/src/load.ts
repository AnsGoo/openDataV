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
          const { componentName, config, manifest, component } = componentOptions
          const name = manifest ? manifest.name : componentName
          canvasState.loadComponent(name, config as BaseComponent, manifest)
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
        const { manifest, panel, component } = pkg
        const asyncComp = defineAsyncComponent({
          loader: component,
          delay: 200,
          timeout: 3000
        })
        canvasState.loadComponents(manifest.name, manifest, panel)
        app.component(manifest.name, asyncComp)
      })
    }
  }
}

export { useAsyncLoadComponent, useLoadComponent }
