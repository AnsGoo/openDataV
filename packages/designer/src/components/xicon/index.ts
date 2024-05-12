import type { App } from 'vue'

import useIcon from './useIcon'
import XIcon from './XIcon.vue'

export { XIcon }

export default {
  install(app: App) {
    // 插入元素
    app.component('XIcon', XIcon)
  }
}

export { useIcon }
