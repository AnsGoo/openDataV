import type { App, Component } from 'vue'
import { defineAsyncComponent } from 'vue'

import Group from './components/group-container'
import { useIcon } from './components/xicon'
import type { IDragComponentMeta } from './state/graph'
import useGraphState from './state/graph'

const graphState = useGraphState()
const bootstrap = ({
  codeEditorComponent,
  icons
}: {
  codeEditorComponent?: Component
  icons?: Record<string, Component>
}) => {
  const OCodeEditor = codeEditorComponent
    ? codeEditorComponent
    : defineAsyncComponent(() => import('./components/code-editor.vue'))

  const manifest = Group.manifest
  const meta = { ...manifest, panel: Group.panel, isContainer: true } as IDragComponentMeta
  graphState.loadComponent(meta)

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

export default bootstrap
