import type { App } from 'vue'
import XIcon from './XIcon.vue'

export { XIcon }

export default {
  install(app: App) {
    // 插入元素
    app.component('XIcon', XIcon)
  }
}
