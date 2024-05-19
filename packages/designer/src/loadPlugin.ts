import type { App, Component } from 'vue'
import { defineAsyncComponent } from 'vue'

import Group from './components/Group'
import { useIcon } from './components/xicon'
import useCanvasState from './state/canvas'

const canvasState = useCanvasState()
const useComponentPlugin = ({
  codeEditorComponent,
  icons
}: {
  codeEditorComponent?: Component
  icons?: Record<string, Component>
}) => {
  const OCodeEditor = codeEditorComponent
    ? codeEditorComponent
    : defineAsyncComponent(() => import('./components/CodeEditor.vue'))

  const groupComp = defineAsyncComponent({
    loader: Group.component,
    delay: 200,
    timeout: 3000
  })
  canvasState.loadComponent(Group.componentName, Group.config)

  const OIcon = useIcon(icons)
  return {
    install(app: App) {
      // 插入元素
      app.component('OCodeEditor', OCodeEditor)
      app.component('XIcon', OIcon)
      app.component(Group.componentName, groupComp)
    }
  }
}

export default useComponentPlugin
