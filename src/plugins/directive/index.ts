import { App } from 'vue'

import ContextMenu from './contextmenu'
import ActionDirective from './permission'
import ResizeDomDirective from './resize'

export default {
  install(app: App) {
    app.directive('contextmenu', ContextMenu)
    app.directive('resize', ResizeDomDirective)
    app.directive('action', ActionDirective)
  }
}
