import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

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
  return {
    install(app: App) {
      // 插入元素
      app.component('OCodeEditor', OCodeEditor)
      app.component('XIcon', OXIcon)
    }
  }
}

export default useComponetPlugin
