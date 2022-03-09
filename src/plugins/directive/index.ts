import { App } from 'vue'

import ContextMenu from './contextmenu'

export default {
  install(app: App) {
    app.directive('contextmenu', ContextMenu)
  }
}
