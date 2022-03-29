import { App } from 'vue'

import ContextMenu from './contextmenu'
import ResizeDomDirective from './resize'
import ActionDirective from './permission'

export default {
  install(app: App) {
    app.directive('contextmenu', ContextMenu)
    app.directive('resize', ResizeDomDirective)
    app.directive('action', ActionDirective)
  }
}
