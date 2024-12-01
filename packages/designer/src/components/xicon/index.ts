import type { App } from 'vue'

import icons from './icon-map'
import useIcon from './useIcon'
import XIcon from './x-icon.vue'

export { XIcon }

export const iconMap = Object.keys(icons)

export default {
  install(app: App) {
    // 插入元素
    app.component('XIcon', XIcon)
  }
}

export { useIcon }
