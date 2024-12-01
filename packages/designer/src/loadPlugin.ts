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

  const groupMeta = Group.manifest
  canvasState.loadComponent('Group', { ...groupMeta, subComponents: [] }, Group.attrs)

  const OIcon = useIcon(icons)
  return {
    install(app: App) {
      // 插入元素
      app.component('OCodeEditor', OCodeEditor)
      app.component('XIcon', OIcon)
      app.component('Group', Group.component)
    }
  }
}

export default useComponentPlugin
