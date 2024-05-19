import type { App } from 'vue'

import ClickOutsideDirective from './clickoutside'
import ResizeDomDirective from './resize'

export default {
  install(app: App) {
    app.directive('resize', ResizeDomDirective)
    app.directive('click-outside', ClickOutsideDirective)
  }
}
export { ClickOutsideDirective, ResizeDomDirective }
