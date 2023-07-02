import { shallowRef } from 'vue'

import handler from './handler'
import Rest from './View.vue'

export default {
  type: 'REST',
  name: '动态数据',
  component: shallowRef(Rest),
  handler,
  useTo: ['COMPONENT', 'GLOBAL']
}
