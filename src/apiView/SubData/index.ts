import { shallowRef } from 'vue'

import { DataType } from '../const'
import handler from './handler'
import Static from './View.vue'

export default {
  type: DataType.SUB,
  name: '订阅数据',
  component: shallowRef(Static),
  handler
}
