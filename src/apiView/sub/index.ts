import { shallowRef } from 'vue'

import handler from './handler'
import Static from './View.vue'

export default {
  type: 'SUB',
  name: '订阅数据',
  component: shallowRef(Static),
  handler,
  useTo: ['COMPONENT']
}
