import type { App } from 'vue'

import ClickOutsideDirective from './clickoutside'
import type { ContextmenuItem } from './contextmenu'
import ContextMenu from './contextmenu'
import ActionDirective from './permission'
import ResizeDomDirective from './resize'

export type { ContextmenuItem }

export default {
  install(app: App) {
    app.directive('contextmenu', ContextMenu)
    app.directive('resize', ResizeDomDirective)
    app.directive('action', ActionDirective)
    app.directive('click-outside', ClickOutsideDirective)
  }
}
