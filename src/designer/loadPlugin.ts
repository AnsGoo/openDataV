import { NSpin } from 'naive-ui'
import useCanvasState from 'open-data-v/designer/state/canvas'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

import Group from './components/Group'

const canvasState = useCanvasState()

const useComponetPlugin = ({
  codeEditorComponet,
  iconComponet
}: {
  codeEditorComponet?: any
  iconComponet?: any
}) => {
  const OXIcon = iconComponet
    ? iconComponet
    : defineAsyncComponent(() => import('./components/xicon/XIcon.vue'))

  const OCodeEditor = codeEditorComponet
    ? codeEditorComponet
    : defineAsyncComponent(() => import('./components/CodeEditor.vue'))

  const groupComp = defineAsyncComponent({
    loader: Group.component,
    loadingComponent: NSpin,
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

export default useComponetPlugin
