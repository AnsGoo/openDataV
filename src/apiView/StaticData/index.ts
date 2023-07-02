import { shallowRef } from 'vue'

import handler from './handler'
import Static from './View.vue'

export default {
  type: 'STATIC',
  name: '静态数据',
  component: shallowRef(Static),
  handler,
  useTo: 'COMPONENT'
}
