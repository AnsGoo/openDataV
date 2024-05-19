import { useCanvasState } from '@open-data-v/designer'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

import components from '../../resources/components'

const canvasState = useCanvasState()
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

export { useAsyncLoadComponent }
