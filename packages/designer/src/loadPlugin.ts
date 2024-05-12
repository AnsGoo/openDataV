import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

import Group from './components/Group'
import useCanvasState from './state/canvas'

const canvasState = useCanvasState()

const useComponentPlugin = ({ codeEditorComponent }: { codeEditorComponent?: any }) => {
  const OXIcon = defineAsyncComponent(() => import('./components/xicon/XIcon.vue'))

  const OCodeEditor = codeEditorComponent
    ? codeEditorComponent
    : defineAsyncComponent(() => import('./components/CodeEditor.vue'))

  const groupComp = defineAsyncComponent({
    loader: Group.component,
    delay: 200,
    timeout: 3000
  })
  canvasState.loadComponent(Group.componentName, Group.config)
  return {
    install(app: App) {
      // 插入元素
      app.component('OCodeEditor', OCodeEditor)
      app.component('XIcon', OXIcon)
      app.component(Group.componentName, groupComp)
    }
  }
}

export default useComponentPlugin
