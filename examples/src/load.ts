import components from '@resources/components'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const useAsyncLoadComponent = (graphState) => {
  return {
    install: (app: App) => {
      const keys = Object.keys(components)
      keys.forEach((el) => {
        const pkg = components[el]
        const { manifest, panel, component } = pkg
        const asyncComp = defineAsyncComponent({
          loader: component,
          delay: 200,
          timeout: 3000
        })
        graphState.loadComponent({ ...manifest, panel })
        app.component(manifest.name, asyncComp)
      })
    }
  }
}

export { useAsyncLoadComponent }
